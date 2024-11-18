---
sidebar_custom_props:
    customIcon: 🛝
---

# Udon Example Scene

This scene contains examples on how worlds can use Udon. You can [build & test](/worlds/udon/using-build-test) or publish this world to try it in VRChat.

## Prefabs
The Prefabs in this scene demonstrate common interactions with the VRChat components for buttons, avatar pedestals, stations, mirrors, and more.

All of the following Prefabs are included in the VRChat Worlds SDK. You can add them to any of your own worlds. For example, the [VRCWorld](#vrcworld) is included in most VRChat scenes by default.

 ![UdonExampleScene](/img/worlds/udon/examples/UdonExampleScene/prefab-scene.png)

### VRCWorld
This prefab makes it easy to upload your Unity scene to VRChat. It has four components:
- The [VRC Scene Descriptor](/worlds/components/vrc_scenedescriptor/) script, which defines basic properties of your world. It is required for every VRChat world.
- The [VRC Pipeline Manager](/sdk/vrcpipelinemanager/) script, which contains the world ID. It is added automatically with the VRC Scene Descriptor.
- The [VRCWorldSettings](/worlds/examples/udon-example-scene/player-mod-setter) Udon Graph program, which allows you to change the movement speed of players in your world.
- The [Avatar Scaling Settings](/worlds/examples/udon-example-scene/avatar-scaling-settings) Udon Graph program, which allows you to limit the avatar scale of players in your world.

If you'd like to use the VRCWorld prefab in your own Unity scene, you can find it in `\Packages\com.vrchat.worlds\Samples\VRCPrefabs\VRCWorld.prefab`.

### AvatarPedestal
This is available as a prefab, and has a program to switch a user into an avatar when they Interact with the pedestal, which is the default behavior of the prefab.

### VRCChair3
This is available as a prefab, and has a program called `StationGraph`. It seats a player in the station when they Interact with it, and logs their display name when they enter or exit.

### MirrorSystem
This object has a **ToggleGameObject** program on it which uses the Interact event to flip a target object between Active/Inactive. In this case, it controls a VRCMirror object which is a child of this one.

### Cubes
These objects demonstrate some simple things you can do with Cubes, mostly reusing a **ChangeMaterialOnEvent** program to show how you can trigger custom events from other objects.

![Cube Examples](/img/worlds/udon/examples/UdonExampleScene/cubes-scene.png)

### InteractCube
This object has a **SendEventOnInteract** program on it - which listens for the Interact event, triggered when a player points at an object and presses their 'use' button. In this case, it sends a custom event called "changeMaterial" to a **ChangeMaterialOnEvent** program on a child object, which changes out materials from an array whenever it receives this event. Both of these programs are reusable - you can change the eventName sent from the **SendEventOnInteract** program in the inspector on the UdonBehaviour component.

### TimerCube
This object has a **SendEventOnTimer** program on it - which runs a timer for a given *duration* and then sends the specified event. In this case, it sends a custom event called "changeMaterial" to a **ChangeMaterialOnEvent** program on a child object, which changes out materials from an array whenever it receives this event. Both of these programs are reusable - you can change the eventName sent from the **SendEventOnTimer** program in the inspector on the UdonBehaviour component, and change its *duration* in seconds to change how often it triggers.

### UseCube
The `Model` child of this object has a **SendEventOnUse** program on it - which can send out an event when the object is picked up and "Used". In this case, it sends a custom event called "changeMaterial" to a **ChangeMaterialOnEvent** program on a the `MaterialChanger` object, which changes out materials from an array whenever it receives this event. Both of these programs are reusable - you can change the eventName sent from the **SendEventOnUse** program in the inspector on the UdonBehaviour component. The `Model` object also has a `VRCObjectSync` component, which syncs the movement of this object to other users as it is moved around.

## Udon Variable Sync
These objects demonstrate different ways to sync variable values from the owner of an object to everyone else in the instance. 
![Udon Variable Sync Examples](/img/worlds/udon/examples/UdonExampleScene/variable-sync-scene.png)

The "Canvas" item has many UI items with synced variables:

### ButtonSyncOwner
This is the first program described here which uses the [Manual Sync](/worlds/udon/networking#2-manual-variable) method. In the image below, you can see it has an OnClick() handler which calls UdonBehaviour.SendCustomEvent with a value of "OnClick". It's targeting the UdonBehaviour just below it, where it will run the custom event "OnClick". This is how UI Elements can run events on UdonBehaviours.

![Triggering Custom Events from Unity UI controls](/img/worlds/udon/examples/UdonExampleScene/buttonsyncowner-inspector.png)

In the Graph Program, the OnClick event checks whether the player who clicked is the Owner of the object. If they are, it increases the "clickCount" variable by 1 and then calls **RequestSerialization**, which signals Udon to update the data on this Manual-synced UdonBehaviour.

![OnClick ▸ If Owner ▸ Set clickCount to clickCount + 1 ▸ Serialize.](/img/worlds/index-f0a3ff2-bso-gaph.png)

Notice that the 'Set clickCount' node has the 'sendChange' toggle turned on. this will trigger an event for everyone when they receive the new clickCount value.

![Variable Change events are very powerful! You can use them to run the same logic on the owner and others whenever a synced variable is changed.](/img/worlds/index-4590d3e-clickCount-change.png)

When clickCount is updated, this Change event triggers, which will then set the text of the button to the new value no matter who is the 'owner' of this program.

### ButtonSyncAnyone
This object uses a program very similar to **ButtonSyncOwner** above, but adds logic for users who click the button and are *not* the Owner of the object. In that case, they send the Custom Event "OnClick" to the Owner of the object. That's it! The owner will receive this event and process it as if they'd just clicked the button themselves.

![Non-Owners will send an event to the Owner to easily update the number.](/img/worlds/index-2b1a9c3-ButtonSyncAnyone.png)

### ButtonSyncBecomeOwner
This object builds on the now-familiar ButtonSync program to demonstrate how to easily change ownership of an Object. When a non-owner clicks on the button, it will assign them ownership, and then update the variable. This is useful when you want to change multiple variables, or do logic more complicated than simply incrementing a value.
![ButtonSyncBecomeOwner](/img/worlds/udon-example-scene-1372141-button-sync-become-owner.png)

When changing ownership of an object, some logic is run to decide whether or not the transfer is allowed. You can learn more about that here: [Networking](/worlds/udon/networking#object-ownership). If you don't add any custom logic, all Requests for Ownership will be approved. The nodes below show a simple setup checks a boolean variable called 'someSpecialLogic' to decide whether the Transfer will be approved. You could build your own logic based on the 'requester', the 'newOwner', or both.

![Does someone want to be the new owner? Check 'someSpecialLogic' that you've updated elsewhere.](/img/worlds/index-91b3564-onOwnershipRequest.png)

### SliderSync
![SliderSync](/img/worlds/udon-example-scene-080c991-syncSlider.png)

This object has a program called **SliderSync** that works similar to **ButtonSyncBecomeOwner**. When someone moves the slider, they become the owner, and send the new value to everyone else. One difference is that when the "OnValueChanged" event is triggered from the UI, it will check whether this new value is different from the current value of the slider. This is because updating the value of the slider from Udon will also trigger this event, which would cause an infinite loop. So instead, we have some logic that makes sure the 'sliderValue' variable is different than the Slider's value before we run the rest of our logic. 

It also uses the Variable Change event to update a text field with the value of the slider whenever anyone becomes the owner and updates it.

### Toggle

This object has a program called **ToggleSync** which works the same as the Slider above. When someone changes the value to something Inequal to the current value, they become the owner, and send the new value to everyone else, 
![Toggle](/img/worlds/udon-example-scene-f8def0e-syncToggle.png)

### Dropdown
 
![Dropdown](/img/worlds/udon/examples/UdonExampleScene/dropdown-target-inspector.png)

This object has a program called **DropdownSync** which works the same as the Toggle and Slider above. When someone changes the value, they make sure it's different than the current value, then become the owner and send the new value to everyone else.

### InputField
 
![InputField](/img/worlds/udon-example-scene-5d240b9-inputfield-object.png)

This object has a program called **InputFieldSync** which works similar to the Dropdown above. When someone changes the value, they check that it's different, become the owner, and send the new value to everyone else.

### PickupCube
 
![PickupCube](/img/worlds/udon/examples/UdonExampleScene/pickup-cube.png)

This object has VRC Pickup and VRC Object Sync components which enable it to be picked up and moved around, automatically syncing it to other users. The UdonBehaviour is set to "Continuous" instead of "Manual" like the sync programs above, since it needs to update more often to keep its Transform up-to-date. This UdonBehaviour has a **SyncPickupColor** program on it which smoothly changes the color while it's being held. It does this by checking during the Update event to see if the local player is the Owner of the object AND VRCPickup.get isHeld is true. Notice that it doesn't use RequestSerialization since it's set to Continuous - it will simply update the values as often as it can.

![This is run every frame, and when it's true the program will use some fun math to slowly change between two colors specified in the inspector.](/img/worlds/index-03b983d-pickup-isheld.png)

### PickupSphere
This object doesn't actually have any Udon on it! It simply uses VRC Pickup and VRC Object Sync components to let users pick it up and move it around in a synced manner.

![PickupSphere](/img/worlds/udon-example-scene-ea9afda-pickup-sphere.png)

## PlayerDetection
It can be very useful to respond to a player moving into a certain area, or colliding with a physics object. These example programs illustrate a few ways that can be done.

### PlayerTrigger

![PlayerTrigger](/img/worlds/udon/examples/UdonExampleScene/onplayertrigger-scene.png)

This is the most commonly used way to detect a player entering or leaving an area. The "TriggerArea" object has a see-through blue material on it, a Box Collider with *IsTrigger* checked, and an UdonBehaviour with a **PlayerTrigger** program source. 

In this program, the **OnPlayerTriggerEnter** and **OnPlayerTriggerExit** events are triggered whenever any player enters or exists the collider. The program then gets the **displayName** of that player and updates the text on the target canvas.
![PlayerTrigger Program](/img/worlds/udon-example-scene-b7cd2a0-onplayertriggerenter-program.png)

### PlayerCollision
This setup demonstrates how to trigger and respond to the **OnPlayerCollisionEnter/Exit** events, which are triggered when a Physics object moves into a player's collider.
![PlayerCollision](/img/worlds/udon/examples/UdonExampleScene/onplayercollision-scene.png)

The *TriggerArea* object has a **FireOnTrigger** Udon Program which detects a player entering its trigger area, just like in the **PlayerTrigger** program above. In this case, this event is used to send the custom event "Fire" to the *Projectile* object. This will cause the Projecticle cube to add a force to itself which will move it towards the player. When it collides with the player, it will write that player's displayName into a target Text field.

Note that the PlayerCollision events here will only fire locally for the player that experienced them. If you want to inform other players of these events, you will need to add that functionality yourself through Synced Variables or Custom Network Events.

### PlayerParticleCollision

![PlayerParticleCollision Scene](/img/worlds/udon/examples/UdonExampleScene/particlecollision-scene.png)

 This demo has a setup similar to PlayerCollision above, where it uses a Trigger Area to start other events. In this case, when a player enters the Trigger Area, the **SetActiveFromPlayerTrigger** program will turn on the *CollisionParticles* object. This object has a ParticleSystem which fires at the player with World Collision and Send Collision Messages turned on. The Udon Program **PlayerCollisionParticles** attached to this object will fire the **OnPlayerParticleCollision* events in the graph, which write the displayName of the affected player into the target text field.

![PlayerParticleCollision Program](/img/worlds/udon-example-scene-3266c29-onplayerparticlecollision.png)

## [Udon Sync Player](/worlds/examples/udon-example-scene/udon-video-sync-player)

![Udon Sync Player](/img/worlds/udon-example-scene-344ca0e-udonsyncplayer-scene.png)

This setup demonstrates one way to use the Unity / AVPro video players to load and sync video playback. It's a big program, so we've separated it out to its own page.

## CubeArraySync

![CubeArraySync](/img/worlds/udon/examples/UdonExampleScene/cube-array-sync.png)

This simple program makes a grid of cubes that randomly flip on and off when anyone clicks on them while using very little data, demonstrating the power of syncing arrays. The **CubeArraySync** program has a variable called *data* which is a Boolean Array with 25 values. This means it has 25 simple yes/no values which are synced to every user. It also has a GameObject array called *cubes* with 25 cubes.

When anyone clicks on the object containing all the cubes, a Custom Network Event called "Randomize" is sent to the owner of the CubeArraySync object. The owner then uses a **For** loop to randomly set each value to on or off, by generating a number between 0 and 1 and checking if that value is greater than 0.5. Once it updates the array variable, it calls **RequestSerialization** and then calls the custom event **UpdateCubes**. 

![Each user will turn on/off each cube based on the random value from Boolean array.](/img/worlds/index-735f048-update-cubes-from-data.png)

The **UpdateCubes** event uses another **For** loop to step through each yes/no variable in the array and set its corresponding Cube to on or off. This event is triggered by the owner after updating the array, or by **OnDeserialization** after VRChat has updated the array variable for all the other users. We use OnDeserialization here instead of OnVariableChange because Array Variables don't currently fire Variable Change events, so we wait until we have new data in OnDeserialization and update our scene then.

## ObjectPool

![These cubes will never be this neat again once they start dropping and bouncing around.](/img/worlds/udon/examples/UdonExampleScene/objectpool-scene.png)

The [Object Pool](/worlds/udon/networking/network-components#vrc-object-pool) is a component that helps you manage a collection of objects. It will automatically sync its objects' Active state. This example program will drop boxes from the sky one at a time into a stacked grid, and when you click on a box, it is removed and respawned from the sky.

To do this, the **ObjectPool** program runs a simple timer and tries to **Spawn** an object at a regular interval. Each *Pooled Box* in its Pool has a simple **Pooled Box** program which saves its initial position on Start, restores that position whenever it is Enabled (which happens when it is spawned by the pool), and returns each object when you click on it.

## [Simple Pen System](/worlds/examples/udon-example-scene/simple-pen-system)
Even a basic pen takes quite a bit of work, so this example gets its own page.