---
title: "Obstacle Course: How Stuff Works"
slug: "uoc-how-stuff-works"
excerpt: "How all the different programs and custom editor scripts work together in the Udon Obstacle Course"
hidden: false
createdAt: "2021-08-10T19:42:13.400Z"
updatedAt: "2021-08-18T20:57:54.974Z"
---
Each system was designed to have a specific set of responsibilities, and to know about other systems as little as necessary. 

# Overview
* The **PlayerDataManager** assigns **PlayerData** objects to each player who enters the world.
* When a **PlayerData** object enters the Start Gate **Checkpoint**, the **Course** they just entered starts tracking their time, and activates the next **Checkpoint**.
* When the **PlayerData** object passes through the last **Checkpoint**, their time is added to the Scoreboard.
* If the **PlayerData** object enters a **PowerUp** trigger, the **PlayerModsManager** temporarily changes their speed and/or jump abilities, resetting them to default after a set duration
* If the **PlayerData** object enters a **Respawn** trigger, the **Course** will respawn them at the last **Checkpoint** through which they passed.

The following sections describe the programs and scripts that combine to make the whole experience.

# Players
Each player who joins the world gets a 'PlayerData' object to manage their state and progress through a course. The **PlayerDataManager** assigns **PlayerData** objects, which can trigger **OnPlayerDataEnter** programs.

## PlayerDataManager
You can find this program on the "PlayerDataManager" GameObject under the "Udon" object in the scene. It has two important public variables:
**dataPool**: Reference to the VRC Object Pool component on the same object as this Manager. When a Player Joins the world, this manager will TryToSpawn a PlayerData object for them, and give them ownership.
**followCam**: Reference to the camera that will follow above a Player as they run through the course. Set here so the PlayerDataManager can assign the reference to each PlayerData object when they are refreshed.

When you change the 'Number of Players' option in the Toolkit Window, all the existing PlayerData objects will be removed from the scene, then new copies of them will be added as children of the PlayerDataManager. Each one will have its public variables set up properly, and the Object Pool will be updated to hold all the new PlayerData objects.

## PlayerObject
The PlayerObject prefab has a Rigidbody and Capsule Collider component, which are needed to trigger PowerUps, Hazards, etc. It's on a custom layer **CoursePlayer** which only collides with **CourseTrigger** to interact with Hazards and PowerUps. It also has an UdonBehaviour with an important program on it:

## PlayerData
This program is the main connector between the player running the course and all the other systems. Its variables are:
**timeElapsed**: Synced Float which is updated by the **Course** program when they cross the Finish Gate. When it changes, the owner of the PlayerData object will show this time on the scoreboard so they can see their latest time locally. The owner of the ScoreManager object will see this change and add the new time and displayName of the Player to the scoreboard.

**isRacing**: Boolean which is set true by the **Course** when the player has entered a start gate. It's set to false when the player enters a finish gate, manually respawns using their menu, or **Reset** is called on the **Course**. Used by the **Course**, see that program for more info.

**rigidbody**: Cached on Start by the program, it doesn't need to be set in the inspector. It's moved to the position and rotation of the player during every Update.

**player**: Reference to the actual VRCPlayerApi object of the local player. Cached when the synced _playerId_ on this program is changed. Used to retrieve the _displayName_ of the player.

**timeDisplay**: Reference to the UdonBehaviour which displays the latest time for the local player.

**scoreManager**: Reference to the **ScoreManager** UdonBehaviour. When the owner of that object receives a _timeElapsed_ change from a **PlayerData** object which just finished the course, it sets the public variable _scoreToProcess_ on the **ScoreManager** object to a string which combines the _displayName_ and _elapsedTime_ into a single string to be processed.

**scoreManagerObject**: Reference to the GameObject which holds the UdonBehaviour with the **ScoreManager** program. Needed to ensure we only run the Score Processing logic on the owner of the **ScoreManager** object. We can't get this GameObject from an UdonBehaviour reference, so we include it here.

**followCam**: Reference to the CinemachineVirtualCamera which follows the player around the course. The program sets its own Transform as both the _follow_ and _lookAt_ targets for the camera, and changes the priority on this camera when _isRacing_ changes.

## OnPlayerDataEnter
This program is used on objects which should detect the **PlayerData** object entering its Trigger Collider. We use the custom layers **CoursePlayer** and **CourseTrigger** ensure that only certain objects will trigger this collider. When they do, it fires the internal event **OnPlayerDataEnter** to do a multitude of things. This program has the following variables:

**fxPrefab**: A GameObject to spawn when on **Trigger**, meant to play a sound, show some particles, etc so the Player knows that something has happened.

**program**: A target UdonBehaviour with an event we want to run on **Trigger**. This _program_ contains the specific logic for a **Checkpoint**, **PowerUp**, **Hazard**, etc.

**eventName**: The event name to run on the target _program_.

**deactivateOnTrigger**: Whether this object should deactivate itself after a single **Trigger**. This is useful for **Checkpoints** and other items that should only activate once per run.

**lastCollider**: Collider which started the Trigger logic, which is temporarily cached before **Trigger** is called and used to find the **PlayerData** UdonBehaviour if needed.

**fxSpawn**: A Transform we use to set the position of the FX we will spawn. Defaults to the Transform of the object with the collider if not set, useful if you want to trigger Fireworks in another location when running through a collider, like we do for the Finish Gate.

**sendPlayerData**: A Boolean that decides whether or not to try to pass along the **PlayerData** program that Triggered the logic. Used when entering a Start Gate, could be useful for other things as well.

When a **PlayerData** collider trigger entry is detected, this program does the following:
* If we have set an _eventName_ variable, then we will check whether _sendPlayerData_ is true. If it is, we will try to set the _playerData_ variable on the target UdonBehaviour program to the UdonBehaviour with which we just collided.
* We will then run the event _eventName_ on the target program.
* If the _fxPrefab_ GameObject on this program was set (not left at default of 'self'), then we will **Instantiate** a copy of the prefab and set its position and rotation from the _fxSpawn_ variable.
* If _deactivateOnTrigger_ is true, then we will set **this** GameObject to inactive.

# Course & Checkpoints
This is the heart of the project, the gates and checkpoints that you need to move through to complete the time trial.

# Course
This program lives on the CourseManager object and manages the state of the time trial for the local player. It doesn't have any synced variables - it only knows about the Local Player who is running through it.

On **Start**, it calls **Reset** to set itself up properly.
If the player Respawns themselves, the Course will **Reset**.

On **Reset**, we turn off all of the **Checkpoint** triggers except for the Start Gate, which we turn on. We do this by looping through each GameObject in the _checkpoints_ array, finding every Trigger Collider, and calling **SetActive** on that collider's GameObject to true for index 0 and false for all the others.
We also set _nextIndex_ to -1 and set _isRacing_ to false.

On **StartRace**, we:
* set _startTime_ from the current time
* set _isRacing_ to true
* set _nextIndex_ to 1 (since the race is started by passing through Checkpoint 0)

When a **Checkpoint** is triggered, it sets the _nextIndex_ on the Course to its own index + 1. This triggers the **nextIndexChange** event on the Course program, which will then activate the GameObject for the next Checkpoint.

During **Update**, we check whether a player _isRacing_, and if so we get the elapsed time of the run and set it on the _timeDisplay_ Text object.

On **FinishRace**, we:
* set _isRacing_ to false
* set _timeElapsed_ on the target **PlayerData** program to the current time minus _startTime_.
* set _playerData_ to null since we no longer have a player running the course.
* wait for _resetDelay_ seconds and then **Reset** the course.

On **Respawn**, we check whether the player _isRacing_. If so, we send them back to the transform position of the last checkpoint. If not, we teleport them down low enough that they will be respawned by the world, back at one of the original spawn points.

## ObstacleCourseData
This custom script just holds a reference to the **ObstacleCourseAsset** with all the info about your course like which prefabs to use, the number of players, the default speeds, etc. It's loaded by the Utility Window so you should have one in your scene. You should create your own so it's not overwritten if you update your project with a newer version of this package. Do this by duplicating an existing asset, which will ensure the default values are correct.

## Checkpoint
The Checkpoint objects each have an index which represents their order in the time trial, this is automatically set when placing Checkpoints through the Utility Window or modifying their order. 
They have a Trigger Collider with an **OnPlayerDataEnter** program which call into a **Checkpoint** program that we have on an object called "UdonProgram" in our example prefabs. The program is simple, with three possible events that can be triggered on it:

**StartRace** will set the _playerData_ variable on the **Course** program to the UdonBehaviour that just entered this checkpoint. The Course will start the race when that happens.

**Trigger** will set the _nextIndex_ variable on the **Course** program to the _index_ + 1.

**FinishRace** will simply call **FinishRace** on the **Course** program.

# Score
What's a time trial without some friendly competition? The Score system syncs the names and times of the latest runs, as well as the best run so far in the instance.

## ScoreManager
This program sits on an Object called "ScoreManager" under the "Udon" GameObject. It uses a queue system to process incoming scores and sync them. It doesn't actually have _any synced variables_ itself, relying on the *ScoreFields* to sync the values instead. These fields are automatically populated by the Utility Window when you change the Number of Scores to Show.

On **Start**, this program calls its own **Render** event once.

On **Render**, the program calls **Render** on the _scoreCam_, which will render its current view to a RenderTexture used all over the course to show the current score.

When _scoretoProcess_ is changed on the Owner of this Object, we call **MakeRoom** and then **ProcessNextScore**. This works because every player in your instance will receive an update to _timeElapsed_ when someone finishes a run, and that program will update _scoreToProcess_ on this object if they are the owner.

On **MakeRoom**, we check if our scoreFields are all full already, and if so we'll copy the values down iteratively to make room at the top.

On **ProcessNextScore**:
* Pull apart the score into displayName and time again in order to format them nicely, and then set the _targetVarName_ value on the corresponding **ScoreField** to this. This target variable is synced, so we set it this way to update it for everyone. 
* Compare the time of this score against the time of our High Score and update the **HighScoreField** if necessary. 
* Set the value of _scoreToProcess_ to an empty string so its ready to process the next score that comes in. 
* Send the **Render** event to everyone to update their score texture.

## ScoreField
This program uses a simple and effective pattern - it has a public synced variable called _log_. When log changes, it updates the text in the field to the new value. In this way, the values are synced and updated for everyone when the owner of the object updates it, which can be done easily from another program. In our case, we update this value from the **ScoreManager**.

## HighScoreField
This program uses the same pattern as the score field above, but also has a synced _score_ float that can be used to compare scores and update only if the new score is better. It also has a "prefix" which is a string injected before any changes. In this case, the string "High Score:" is prepended to the incoming string.

# PowerUps
It's fun to offer speed and jump boosts for players looking to maximize their scores, You can also use speed and jump penalties as part of obstacles and hazards to give your players some choice in strategy. PowerUps are all placed as children of the "PlayerModsManager" object when you create them with the Utility Window. They also have the *PlayerModsManager* UdonBehaviour set on them automatically so they can apply their effects.

They have a very simple program. It's called from an **OnPlayerDataEnter** program of course, and has a single **Trigger** event. Its variables are:

**playerModsManager**: Automatically set when creating PowerUps through the Utility window. Used to actually apply the effects.

**speedChange**: Effect to apply to the Player's speed when triggered. 0 will skip, positive will increase speed, negative will decrease it.

**jumpChange**: Same as speedChange, but for Jump Impulse.

**effectDuration**: How long until the effect wears off.

On **Trigger**, the program will set _speedToProcess_ on the **PlayerModsManager** if it's not 0, and it will set _jumpToProcess_ if it's not 0. In order to simplify the logic, we bundle the _amount_ and _duration_ values into a single Vector2, where the _x_ is amount and _y_ is duration.

## PlayerModsManager
It's useful to have a central place to manage changes to a Player's abilities, especially when you consider that someone could run through a "Speed + 3" with a 2 second duration, and then a "Speed - 1" with a 3 second duration. In our program, speed mods cancel each other out, and jump mods cancel each other out. So in the example above, as soon as the Player triggered the "Speed- 1" PowerUp, they would reset to their default speed - 1, with a new 3 second timer running.

The program works with a queue, like the **ScoreManager**. When _speedToProcess_ is changed, it will figure out the new speed to use, apply that to the VRCPlayerApi of the Local Player, and start a countdown based on the _effectDuration_ of the PowerUp. The program displays the mod on the user's HUD and fades it out along with the timing so they Player can intuitively understand how much time is left. When the timer runs out, it resets the target property on the VRCPlayerApi to the default value, which is why we store and set those here instead of in the "VRCWorldSettings" program.

## DestroyAfterXSeconds
This simple program is useful for locally-instantiated objects, like the FX Prefabs created by **OnPlayerDataEnter** programs. It will ensure that the object destroys itself so you don't wind up with hundreds of old sound effects and particle systems sitting around.

## PlayClipFromArray
This program is useful for introducing some variety in your sounds, for use on FX Prefabs for example. Instead of a single AudioClip, you can set a group of them on this program and it will randomly choose one when it is created and play that one. Could also be useful for a Footsteps program.

# Hazards
If you want to challenge your players, you can add a variety of hazards. We included a couple example programs, feel free to make your own!

## Autorotate
This program simply rotates the Transform on which it lives. You can adjust the _amount_ for each axis, which will be multiplied by Time.deltaTime to ensure it rotates smoothly. An animator would have better performance, but this works when you're experimenting.

## SpawnedHazard
This hazard will reduce the speed of the Player who comes into contact with it. You can set _speedChange_ like you would on a PowerUp - the x is the amount to add to the Players' speed, and the y is the duration of the effect. To reduce a player's speed by 3 for 1 second, you would set _speedChange_ to (-3,1). They find the "PlayerModsManager" GameObject and UdonBehaviour by name when they are created - not very performant but it works.

## HazardSpawner
This program uses **SendCustomEventDelayedSeconds** to spawn hazards every _delay_ seconds. In our example project, we use slightly different delays to make a tricky hill of barrels for our players to dodge.

## FallingBlock
This program is the only one we include that interacts with a player and doesn't use **OnPlayerDataEnter**. This is because we want to know when a Player Enters _and_ when they Exit, which isn't accounted for in that program. When a player enters, we use **SendCustomEventDelayedSeconds** to run **CheckForDrop** after _triggerTime_ seconds.

On **CheckForDrop**, if the player has not yet exited the collider, it will set its Rigidbody to non-kinematic, causing it to fall (and the player along with it). It will then call **Reset** after _resetTime_ seconds.

# Misc

## Injection
This project has a system to inject references to certain components. It is described [here](/worlds/examples/obstacle-course/build-from-custom-parts#advanced-stuff).