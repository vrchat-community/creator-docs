---
title: "Udon Example Scene"
createdAt: "2021-05-13T19:15:33.839Z"
updatedAt: "2021-10-07T17:09:09.342Z"
---
This scene is ready to [Build & Test](/worlds/udon/using-build-test) or Publish, and it demonstrates many common interactive items.

# Prefabs
These objects show off some of the Prefabs included with the SDK which demonstrate default interactions with the VRChat components for Avatar Pedestals, Stations and Mirrors.
 ![](/img/worlds/udon-example-scene-prefab-scene.png)

## AvatarPedestal
This is available as a prefab, and has a program to switch a user into an avatar when they Interact with the pedestal, which is the default behavior of the prefab.

## VRCChair3
This is available as a prefab, and has a program to sit a player in a station when they Interact with it, and logs their displayName when they enter or exit.

## MirrorSystem
This object has a **ToggleGameObject** program on it which uses the Interact event to flip a target object between Active/Inactive. In this case, it controls a VRCMirror object which is a child of this one.

# Cubes
These objects demonstrate some simple things you can do with Cubes, mostly reusing a **ChangeMaterialOnEvent** program to show how you can trigger custom events from other objects.
![](/img/worlds/udon-example-scene-7038b64-cubes-scene.png)

## ClickableCube
This object has a **SendEventOnMouseDown** program on it - which responds to mouse clicks to send an event to another object. In this case, it sends a custom event called "changeMaterial" to a **ChangeMaterialOnEvent** program on a child object, which changes out materials from an array whenever it receives this event. Both of these programs are reusable - you can change the eventName sent from the **SendEventOnMouseDown** program in the inspector on the UdonBehaviour component. Note that using the MouseDown event isn't as useful as the Interact event, but it does work in the editor, which is why it's used here.

## TimerCube
This object has a **SendEventOnTimer** program on it - which runs a timer for a given *duration* and then sends the specified event. In this case, it sends a custom event called "changeMaterial" to a **ChangeMaterialOnEvent** program on a child object, which changes out materials from an array whenever it receives this event. Both of these programs are reusable - you can change the eventName sent from the **SendEventOnTimer** program in the inspector on the UdonBehaviour component, and change its *duration* in seconds to change how often it triggers.

## InteractCube
This object has a **SendEventOnInteract** program on it - which listens for the Interact event, triggered when a player points at an object and presses their 'use' button. In this case, it sends a custom event called "changeMaterial" to a **ChangeMaterialOnEvent** program on a child object, which changes out materials from an array whenever it receives this event. Both of these programs are reusable - you can change the eventName sent from the **SendEventOnInteract** program in the inspector on the UdonBehaviour component.

## PickupCube
This object has two important components on it - and UdonBehaviour with a **PickupAndUse** program and a VRCObjectSync component. The Object Sync component will sync the movement of this object to other users, and the **PickupAndUse** program changes the color of the cube's material when the "Use" button is pressed, by listening for **OnPickupUseDown** and **OnPickupUseUp** events.

## ClickableCubeForLoop
This object uses the **SendEventOnMouseDown** program from the ClickableCube, and uses it to run a custom event called "runLoop" which is on a child Text field. This field has a **SimpleForLoop** program which demonstrate the basic usage of a For loop - in this case, just creating a string and adding the current *index* of the loop to the string for every loop, then updating the text field with that final string.

#Udon Variable Sync
These objects demonstrate different ways to sync variable values from the owner of an object to everyone else in the instance. 
![](/img/worlds/udon-example-scene-01fa074-variable-sync-scene.png)

The "Canvas" item has many UI items with synced variables:

## ButtonSyncOwner
This is the first program described here which uses the [Manual Sync](/worlds/udon/networking#2-manual-variable) method. In the image below, you can see it has an OnClick() handler which calls UdonBehaviour.SendCustomEvent with a value of "OnClick". It's targeting the UdonBehaviour just below it, where it will run the custom event "OnClick". This is how UI Elements can run events on UdonBehaviours.
![Triggering Custom Events from Unity UI controls](/img/worlds/index-2c98f4e-onclick-manual-sync.png)
In the Graph Program, the OnClick event checks whether the player who clicked is the Owner of the object. If they are, it increases the "clickCount" variable by 1 and then calls **RequestSerialization**, which signals Udon to update the data on this Manual-synced UdonBehaviour.
![OnClick ▸ If Owner ▸ Set clickCount to clickCount + 1 ▸ Serialize.](/img/worlds/index-f0a3ff2-bso-gaph.png)
Notice that the 'Set clickCount' node has the 'sendChange' toggle turned on. this will trigger an event for everyone when they receive the new clickCount value.
![Variable Change events are very powerful! You can use them to run the same logic on the owner and others whenever a synced variable is changed.](/img/worlds/index-4590d3e-clickCount-change.png)
When clickCount is updated, this Change event triggers, which will then set the text of the button to the new value no matter who is the 'owner' of this program.

## ButtonSyncAnyone
This object uses a program very similar to **ButtonSyncOwner** above, but adds logic for users who click the button and are *not* the Owner of the object. In that case, they send the Custom Event "OnClick" to the Owner of the object. That's it! The owner will receive this event and process it as if they'd just clicked the button themselves.
![Non-Owners will send an event to the Owner to easily update the number.](/img/worlds/index-2b1a9c3-ButtonSyncAnyone.png)
## ButtonSyncBecomeOwner
This object builds on the now-familiar ButtonSync program to demonstrate how to easily change ownership of an Object. When a non-owner clicks on the button, it will assign them ownership, and then update the variable. This is useful when you want to change multiple variables, or do logic more complicated than simply incrementing a value.
![](/img/worlds/udon-example-scene-1372141-button-sync-become-owner.png)

When changing ownership of an object, some logic is run to decide whether or not the transfer is allowed. You can learn more about that here: [Networking](/worlds/udon/networking#object-ownership). If you don't add any custom logic, all Requests for Ownership will be approved. The nodes below show a simple setup checks a boolean variable called 'someSpecialLogic' to decide whether the Transfer will be approved. You could build your own logic based on the 'requester', the 'newOwner', or both.
![Does someone want to be the new owner? Check 'someSpecialLogic' that you've updated elsewhere.](/img/worlds/index-91b3564-onOwnershipRequest.png)
## SliderSync
![](/img/worlds/udon-example-scene-080c991-syncSlider.png)

This object has a program called **SliderSync** that works similar to **ButtonSyncBecomeOwner**. When someone moves the slider, they become the owner, and send the new value to everyone else. One difference is that when the "OnValueChanged" event is triggered from the UI, it will check whether this new value is different from the current value of the slider. This is because updating the value of the slider from Udon will also trigger this event, which would cause an infinite loop. So instead, we have some logic that makes sure the 'sliderValue' variable is different than the Slider's value before we run the rest of our logic. 

It also uses the Variable Change event to update a text field with the value of the slider whenever anyone becomes the owner and updates it.

## Toggle

This object has a program called **ToggleSync** which works the same as the Slider above. When someone changes the value to something Inequal to the current value, they become the owner, and send the new value to everyone else, 
![](/img/worlds/udon-example-scene-f8def0e-syncToggle.png)

## Dropdown
 
![](/img/worlds/udon-example-scene-502661a-dropdown-onvaluechanged.png)

This object has a program called **DropdownSync** which works the same as the Toggle and Slider above. When someone changes the value, they make sure it's different than the current value, then become the owner and send the new value to everyone else.

## InputField
 
![](/img/worlds/udon-example-scene-5d240b9-inputfield-object.png)

This object has a program called **InputFieldSync** which works similar to the Dropdown above. When someone changes the value, they check that it's different, become the owner, and send the new value to everyone else.

## PickupCube
 
![](/img/worlds/udon-example-scene-3ae6dab-pickup-cube.png)

This object has VRC Pickup and VRC Object Sync components which enable it to be picked up and moved around, automatically syncing it to other users. The UdonBehaviour is set to "Continuous" instead of "Manual" like the sync programs above, since it needs to update more often to keep its Transform up-to-date. This UdonBehaviour has a **SyncPickupColor** program on it which smoothly changes the color while it's being held. It does this by checking during the Update event to see if the local player is the Owner of the object AND VRCPickup.get isHeld is true. Notice that it doesn't use RequestSerialization since it's set to Continuous - it will simply update the values as often as it can.
![This is run every frame, and when it's true the program will use some fun math to slowly change between two colors specified in the inspector.](/img/worlds/index-03b983d-pickup-isheld.png)
## PickupSphere
This object doesn't actually have any Udon on it! It simply uses VRC Pickup and VRC Object Sync components to let users pick it up and move it around in a synced manner.
![](/img/worlds/udon-example-scene-ea9afda-pickup-sphere.png)

# PlayerDetection
It can be very useful to respond to a player moving into a certain area, or colliding with a physics object. These example programs illustrate a few ways that can be done.

## PlayerTrigger
![](/img/worlds/udon-example-scene-c3a6c06-OnPlayerTriggerScene.png)

This is the most commonly used way to detect a player entering or leaving an area. The "TriggerArea" object has a see-through blue material on it, a Box Collider with *IsTrigger* checked, and an UdonBehaviour with a **PlayerTrigger** program source. 

In this program, the **OnPlayerTriggerEnter** and **OnPlayerTriggerExit** events are triggered whenever any player enters or exists the collider. The program then gets the **displayName** of that player and updates the text on the target canvas.
![](/img/worlds/udon-example-scene-b7cd2a0-onplayertriggerenter-program.png)

## PlayerCollision
This setup demonstrates how to trigger and respond to the **OnPlayerCollisionEnter/Exit** events, which are triggered when a Physics object moves into a player's collider.
![](/img/worlds/udon-example-scene-bec891f-playercollision-scene.png)

The *TriggerArea* object has a **FireOnTrigger** Udon Program which detects a player entering its trigger area, just like in the **PlayerTrigger** program above. In this case, this event is used to send the custom event "Fire" to the *Projectile* object. This will cause the Projecticle cube to add a force to itself which will move it towards the player. When it collides with the player, it will write that player's displayName into a target Text field.

Note that the PlayerCollision events here will only fire locally for the player that experienced them. If you want to inform other players of these events, you will need to add that functionality yourself through Synced Variables or Custom Network Events.

## PlayerParticleCollision
![](/img/worlds/udon-example-scene-01bddee-particle-collision-scene.png)

 This demo has a setup similar to PlayerCollision above, where it uses a Trigger Area to start other events. In this case, when a player enters the Trigger Area, the **SetActiveFromPlayerTrigger** program will turn on the *CollisionParticles* object. This object has a ParticleSystem which fires at the player with World Collision and Send Collision Messages turned on. The Udon Program **PlayerCollisionParticles** attached to this object will fire the **OnPlayerParticleCollision* events in the graph, which write the displayName of the affected player into the target text field.
![](/img/worlds/udon-example-scene-3266c29-onplayerparticlecollision.png)

# [Udon Sync Player](/worlds/examples/udon-example-scene/udon-video-sync-player)
![](/img/worlds/udon-example-scene-344ca0e-udonsyncplayer-scene.png)

This setup demonstrates one way to use the Unity / AVPro video players to load and sync video playback. It's a big program, so we've separated it out to its own page.

# CubeArraySync
![](/img/worlds/udon-example-scene-fe7260d-cubearraysync-scene.png)

This simple program makes a grid of cubes that randomly flip on and off when anyone clicks on them while using very little data, demonstrating the power of syncing arrays. The **CubeArraySync** program has a variable called *data* which is a Boolean Array with 25 values. This means it has 25 simple yes/no values which are synced to every user. It also has a GameObject array called *cubes* with 25 cubes.

When anyone clicks on the object containing all the cubes, a Custom Network Event called "Randomize" is sent to the owner of the CubeArraySync object. The owner then uses a **For** loop to randomly set each value to on or off, by generating a number between 0 and 1 and checking if that value is greater than 0.5. Once it updates the array variable, it calls **RequestSerialization** and then calls the custom event **UpdateCubes**. 
![Each user will turn on/off each cube based on the random value from Boolean array.](/img/worlds/index-735f048-update-cubes-from-data.png)
The **UpdateCubes** event uses another **For** loop to step through each yes/no variable in the array and set its corresponding Cube to on or off. This event is triggered by the owner after updating the array, or by **OnDeserialization** after VRChat has updated the array variable for all the other users. We use OnDeserialization here instead of OnVariableChange because Array Variables don't currently fire Variable Change events, so we wait until we have new data in OnDeserialization and update our scene then.

# ObjectPool
![These cubes will never be this neat again once they start dropping and bouncing around.](/img/worlds/index-474fac9-object-pool.png)
The [Object Pool](/worlds/udon/networking/network-components#vrc-object-pool) is a component that helps you manage a collection of objects. It will automatically sync its objects' Active state. This example program will drop boxes from the sky one at a time into a stacked grid, and when you click on a box, it is removed and respawned from the sky.

To do this, the **ObjectPool** program runs a simple timer and tries to **Spawn** an object at a regular interval. Each *Pooled Box* in its Pool has a simple **Pooled Box** program which saves its initial position on Start, restores that position whenever it is Enabled (which happens when it is spawned by the pool), and returns each object when you click on it.

# [Simple Pen System](/worlds/examples/udon-example-scene/simple-pen-system)
Even a basic pen takes quite a bit of work, so this example gets its own page.

# ChooserContainer
![](/img/worlds/udon-example-scene-b58f65b-chooser-container.png)

### ChooserContainer
A canvas that follows the local player around the world. Uses a 'FollowPlayer' program which can be easily reused for other objects.

### Chooser
Toggles on/off all the prefabs which contain the examples for this world. Shows how to manage sync for an array of objects in a way that anyone can control