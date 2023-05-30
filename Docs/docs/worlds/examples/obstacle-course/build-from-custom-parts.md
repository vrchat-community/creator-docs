---
title: "Obstacle Course: Build From Custom Parts"
slug: "build-from-custom-parts"
hidden: false
createdAt: "2021-08-10T19:34:59.759Z"
updatedAt: "2021-08-18T20:57:33.538Z"
---
:::note Make a Simple Course First

It's highly recommended to work with the Demo prefabs and Starter Scene first. Read through the instructions to [Build From Demo Parts](/worlds/examples/obstacle-course/build-from-demo-parts).
:::
# Customizations
Ok, you've made a simple remix of our demo parts, and you're now ready to add your own custom PowerUps, Hazards and more. Read on to learn how to make new prefabs that interact with the existing systems.

# Making Custom Checkpoints

Here is the hierarchy of the Checkpoint prefab we include:

![build-from-custom-parts-692d375-checkpoint-hierarchy.png](/img/worlds/build-from-custom-parts-692d375-checkpoint-hierarchy.png)

## Trigger Requirements
![build-from-custom-parts-f72c567-checkpoint-inspector.png](/img/worlds/build-from-custom-parts-f72c567-checkpoint-inspector.png)

:::note It's a Pattern!

The "Trigger" object on this prefab uses a pattern that you'll see repeated on nearly every object that detects the player - Checkpoints, PowerUps, Hazards, Respawners, etc. We'll go into detail on this first prefab, and we can skip past it for the rest.
:::
Your checkpoint needs a **Collider** on the **CourseTrigger** layer with _isTrigger_ turned on and an UdonBehaviour with the **OnPlayerDataEnter** program.

![build-from-custom-parts-f896bef-checkpoint-inspector.png](/img/worlds/build-from-custom-parts-f896bef-checkpoint-inspector.png)

This UdonBehaviour needs the following variables set:
1. _fxPrefab_ should reference a Prefab which has some fun effects on it, and either the Udon Program **DestroyAfterXSeconds** or some other way that it destroys itself after some time.
2. _program_ should reference an UdonBehaviour on another object under this prefab, which has a **Checkpoint** program on it.
3. _eventName_ should be set to an Event that exists on the UdonBehaviour referenced above.
4. _deactivateOnTrigger_ should be checked for Checkpoints so that it can only be activated once per run until a player finishes the course.
5. _sendPlayerData_ is only required for a Checkpoint being used as a StartGate.
:::note OnPlayerDataEnter details

If you want to learn more about what's going on in this program, you can find the full documentation here: [OnPlayerDataEnter](/worlds/examples/obstacle-course/uoc-how-stuff-works#onplayerdataenter)
:::
## Checkpoint Program Requirements
All the above setup just detects the player, creates an FX object, and then triggers an event on the _real_ program. In this case, that's a program called **Checkpoint** on an object called "UdonProgram". The program on the collider will try to run a program called "Trigger" on this UdonBehaviour. 

All you need to do is have an object with an UdonBehaviour, with the **Checkpoint** program on it. all the variables of this program will be set automatically when you place it, or realtime when someone Triggers it in your world.

## Start / Finish Program Requirements
If you're making a Checkpoint to be used as a Start or Finish Gate, you'll set up your program slightly differently. The Trigger Collider will be the same, and you'll use the same **Checkpoint** program, but you'll need to make the following changes:

### For a **StartGate**:
* Set the _eventName_ to "StartRace"
* Make sure _sendPlayerData_ is on.

### For a **FinishGate**:
* Set the _eventName_ to "FinishRace"

## Customize It!
As long as you have the **Trigger Collider** and **Checkpoint Program** set up as described above, you have a working checkpoint prefab you can use in your world. Note that when someone Triggers your checkpoint, the GameObject on which the Trigger Collider sits will be set to **inactive**. So if you want to hide the whole checkpoint, put the collider on the topmost object. If you want to just hide some parts like we do in the demo prefabs, make those parts children of the Trigger Collider object.

When the someone finishes running the course or Respawns themselves through their menu, the Course is **Reset**. When this method is called, the Course program will search every checkpoint for Trigger Colliders. It will set all the GameObjects with Trigger Colliders to inactive, except for the first one, which it will set to active (your **Start Gate**). Keep this in mind if you have additional colliders on your prefabs - their GameObjects will be set to inactive if the colliders have _isTrigger_ turned on.

## Add it to your Checkpoint Prefabs list

The Utility Window lists your "Checkpoint Prefabs" for easily adding them to your scene. You can drag and drop your new custom prefabs into this list to swap them out, or change the "Size" of the list first to add new empty slots to which you can add your new prefabs.

# Making Custom PowerUps
Read through "Making Custom Checkpoints" above first to understand how the Trigger Collider system works, since it's the same for PowerUps. Once you've got a your Trigger Collider set up, you can work on the **PowerUp** program.

## PowerUp Program Requirements
![build-from-custom-parts-c3ecfa0-speed-up-program.png](/img/worlds/build-from-custom-parts-c3ecfa0-speed-up-program.png)

* First, make sure you have a Trigger Collider set up which calls "Trigger" on this UdonBehaviour.
* _playerModsManager_ can be left alone, this will be injected when you create the PowerUp through the Utility window, or when you press "Refresh".
* Either _speedChange_ or _jumpChange_ should be set to something other than 0. Positive values will be added to the default **MoveSpeed* or **Jump Impulse** you set as defaults in the **Power Ups** section of your Utility Window. Negative values will be subtracted. You can combine them - a PowerUp that makes you jump high but move really slow is totally valid.
* The _effectDuration_ should be something higher than 0 (no negative numbers). This is how long the  PowerUp will last. The player will get a message on their HUD that shows the change, this will fade away at the speed you've set here.

## Add it to your PowerUps Prefabs list

The Utility Window lists your "PowerUp Prefabs" for easily adding them to your scene. You can drag and drop your new custom prefabs into this list to swap them out, or change the "Size" of the list first to add new empty slots to which you can add your new prefabs.

# Making Custom Hazards

Hazards use the Trigger Collider setup that we documented under **Checkpoints** above, so make sure you've read through that first.

We've created two types of Hazard that you can work from - **Respawn** hazards and **Spawned** Hazards.

## Respawn Hazards
This is the most common Hazard in our demo course. It uses a Trigger Collider to Respawn the player to the last Checkpoint. You need a trigger collider set up to run the "Trigger" event on another object which has the **RespawnOnCourse** program on it.
![build-from-custom-parts-752dc13-moving-wall-hazard.png](/img/worlds/build-from-custom-parts-752dc13-moving-wall-hazard.png)

The RespawnOnCourse program will automatically have the _course_ variable set when you Refresh your UtilityWindow.

## Spawned Hazards
This hazard is made up of two parts, it's the most customized single-purpose Hazard we provide, as an example of extending our basic system to add functionality.

### HazardSpawner Program
![build-from-custom-parts-3ab9259-hazardspawner.png](/img/worlds/build-from-custom-parts-3ab9259-hazardspawner.png)

This program will spawn its _prefab_ every _delay_ seconds. It has a reference to _playerModsManager_ which will be injected when the Utility Window is Refreshed.
When it spawns a Hazard, it will look for an UdonBehaviour on the new object, and set its _playerModsManager_ variable to the reference it has. This is needed so the spawned Hazard can reduce the player's speed.

### SpawnedHazard Program
![build-from-custom-parts-a85b1af-barrel-hazard.png](/img/worlds/build-from-custom-parts-a85b1af-barrel-hazard.png)

This prefab has a TriggerCollider on the "Trigger" child object which runs the event "HitPlayer" on the SpawnedHazard program. 

* _lifeDuration_ controls how long this prefab will exist after spawning, to ensure it doesn't stick around forever if there are no players around.
* _playerModsManager_ is set by the **HazardSpawner** program
* _speedChange_ works like a typical **PowerUp**. The 'x' value is the change to apply to the player's default speed, and the 'y' value is the duration of the effect. The default setting of (-3,3) on this prefab will subtract 3 from the player's speed for 3 seconds when they touch it.
:::danger UNPACK YOUR HAZARD PREFABS

Since these prefabs are not created and managed through the Utility Window, it's important to unpack them after you place them in your scene. Otherwise the auto-injection might not stick.
:::
# Other Customizations
Here are some other things you can play with:

## Score Fields
![build-from-custom-parts-60cfc05-ScoreManager.png](/img/worlds/build-from-custom-parts-60cfc05-ScoreManager.png)

If you want to change the look of the Score Fields or the number of scores that are shown, you can duplicated the "ScoreField" prefab, drop your new version into the "Score Object Prefab" slot in the "Score Manager" section of the Utility Window, and set the "Number of Scores to Show" to regenerate the UI that displays the scores.

## HUD
You can change the look and layout of HUD items - just look through the hierarchy of the "HUD" object.

## Minimap
If you want to change the camera angle, smoothing amount, etc of the Minimap, you can find the **CinemachineVirtualCamera** which it uses under "MinimapCameraSystem/VCam-Follow". Its _Follow_ and _LookAt_ variables are set at runtime, so if you want to test it in the Editor, you can drop in a Capsule, set that as the target for those two variables, and drag it around your course to see how it looks in the Minimap.

## Advanced Stuff
You can click on the new Course Asset you made in your Project pane to see its raw data, and access all kinds of stuff that you can change **_at your own risk_**, like the default Udon Programs. You can also modify the "Variable to Scene Object Lookup" section:

![build-from-custom-parts-489afea-lookup.png](/img/worlds/build-from-custom-parts-489afea-lookup.png)

This is where the UtilityWindow looks when it runs Refresh() to inject the right objects into UdonBehaviours. On the left are variable names, and on the right are the names of objects in the scene on which the correct Component can be found. Right now, the system supports finding and injecting these Component Types:
* GameObject
* UdonBehaviour
* CinemachineVirtualCamera

So you can make a new Udon Program with a public variable called "course", and it will automatically be injected with the CourseManager UdonBehaviour. You can add your own items here, and even add additional types if you like - just modify the **InjectVariableReferences** method on the **ObstacleCourseEditorWindow** class, adding extra types in the if-chain. If you write a good generic Component handler, make a Pull Request to the git repo!