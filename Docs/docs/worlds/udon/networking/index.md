---
title: "Networking"
sidebar_position: 1
createdAt: "2020-12-15T00:35:42.570Z"
updatedAt: "2023-01-16T15:28:57.978Z"
---
:::note Overview

Multiplayer experiences are the heart of VRChat, so creating a world that reacts to players and synchronizes the data between them is key.

This page introduces the concepts that power our networking system. Once you've understood the basics, you can dig into specifics:
* [Network Components](/worlds/udon/networking/network-components)
* [Network Specs and Tips](/worlds/udon/networking/network-details)
:::

# Overview: How Networking Works in Udon

<iframe class="embedly-embed" src="//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2FMb6ZYBEhxiI%3Flist%3DPLe9XHNvXcouQjg5GULWGLj1tMzeythnQi&display_name=YouTube&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DMb6ZYBEhxiI&image=https%3A%2F%2Fi.ytimg.com%2Fvi%2FMb6ZYBEhxiI%2Fhqdefault.jpg&key=f2aa6fc3595946d0afc3d76cbbd25dc3&type=text%2Fhtml&schema=youtube" width="854" height="480" scrolling="no" title="YouTube embed" frameborder="0" allow="autoplay; fullscreen" allowfullscreen="true"></iframe>

The three main concepts used for networking in Udon are **Variables**, **Events** and **Ownership**.

**Variables** are containers for values - like a number, a set of colors or a 3D position.
**Events** are things that happen at a moment in time.
**Ownership** is the system that decides which user can update a variable, which is then sent to every other user.

For a scoreboard in a game, you might use a variable to store and update user scores, and an event to trigger fireworks for the winner.

# Ownership

Objects in a world are *local* by default. That means that an object you pick up **only moves for you**, no one else sees it moving. To synchronize the object, you need to tell VRChat that you want it to be a **Networked Object**.

To make an object **Networked**, you can add an UdonBehaviour and/or a VRC Object Sync component to it

The first player who opens a world becomes the owner of all the Networked Objects. They can make changes to those objects and the changes will be sent to everyone else. When you change the Owner of an object, the new owner is in charge of the network data and everyone else will listen for their changes.

## Example: The Simplest Networked Object

If you have a 3D object with a renderer and a collider, you can easily make it something that people can pick up and sync.

All you need to do is add a VRCPickup component and a VRCObjectSync Component to its GameObject.
![](/img/worlds/udon-networking-025d543-pickup-object-sync.png)

VRCPickup adds a Rigidbody to your GameObject if it doesn't already have one, and signals VRChat to allow the item to be picked up, and transfer ownership of the item to whoever grabs it.

VRCObjectSync automatically syncs the object - sending its position, rotation, scale and some physics properties to the other players so that it looks the same to everyone. To sync other data, you need variables.

# Variables
A variable is a container for a value. UdonBehaviours run Udon Programs, and you can add variables to these programs.
![The Variables window in an Udon Graph shows the variables you've created, and lets you edit their properties.](/img/worlds/index-e057e35-slider-program-variables.png)
In the image above, I've made three different variables, and you can see that I've checked the 'synced' box for the 'sliderValue' variable. The Owner of this GameObject will be in charge of this variable value, and their changes will be sent to everyone else.

## Example: Synced Slider
![](/img/worlds/udon-networking-8472b6b-synced-slider.png)

In this example, the Owner of a Slider syncs its value to everyone else. Note that this is meant to illustrate the concepts - we'll release a separate example that goes into the nitty-gritty 'how-to' details.

To sync the Slider, we just need to get its number value. This will be a number with a decimal point between 0 and 1, which we call a floating point value, or a float for short. So we make a variable called *sliderValue*, with a type of **float**. 

We set up our slider to update this value whenever the slider is moved. For the owner, this is straightforward - when the slider moves, we get its new value, and update our variable. This value will be packed up and sent to everyone else, which is called Serialization. When it's received and unpacked by the other users, that's called Deserialization. 

So the owner moves the slider and sets *sliderValue*. VRChat updates *sliderValue* on the other players, and triggers an event called **OnDeserialization** on the other users. When this event is triggered, they use *sliderValue* to update the position of the slider and the text in the readout.

Owner: Moves Slider > OnValueChanged > set *sliderValue* from **UISlider.value** > Update readout.
Others: *sliderValue* updated by VRChat > OnDeserialization triggered > set **UISlider.value** > OnValueChanged > Update readout.

# Events
Events happen, and then they're gone. Unlike variables, which can only be updated by the Owner of an object, anyone can call an event on an Object. You can choose to send it to everyone, or just to the owner of that object. This is done by selecting target: All or target: Owner when sending the event.
![](/img/worlds/udon-networking-c764485-scne.png)

## Example: Bubble Gun
![](/img/worlds/udon-networking-33702b1-bubble-gun-shooting.png)

In this example, we have an object with a particle system and an animator that spins its bubble wand and generates bubble particles. We want this to happen for everyone in the world when the user holding the wand presses the trigger.

In our Udon Graph, we have a custom event we call "Trigger" which Plays the 'Spin' animation and triggers 22 Particles to Emit - this is just a local event in our graph.

To make this happen for everyone, we tie the **OnPickupUseDown** event which is triggered when someone presses Use while holding our Bubble Gun, and we use **SendCustomNetworkEvent** with a target of *All* to fire the "Trigger" event for everyone, including the Owner of the object.
![](/img/worlds/udon-networking-e21b3b0-bubble-gun-graph.png)

# Bonus Concept: Late Joiners
What happens to people who join your world after some synchronization has happened? It's straightforward: Variables will be updated, events will not. When someone joins your world, the OnDeserialization event will fire for every Networked Object in the world with the latest data, and they'll run whatever logic you have in place to update things based on that data. Events are gone, however - there's no reason for them to fire off the bubble particles an hour after someone pressed the trigger.

# Overview Recap
Sync is done through Variables and Events. For variables, the owner of a Networked Object updates a variable and sends that data to all the other players who Deserialize it. Anyone who enters a world gets the latest data to Deserialize. For events, anyone can send a NetworkEvent. It will either be received by the owner or by everyone in the world at that time. 

# Example Package
[UdonNetworkingConcepts.unitypackage](https://assets.vrchat.com/sdk/UdonNetworkingConcepts.unitypackage)

We've included the three examples above in a simple package you can import into any project which has the Udon SDK in order to see them working and explore the graphs yourself.
:::note More Details

This first section serves as a broad overview of networking with Udon in VRChat. Once you feel like you've got a grasp of the concepts and you've explored the example package above, you can learn further details of each aspect of the system below.
:::

# The Ways You Can Sync
There are four ways you can synchronize data and events in your world:

### 1. Continuous Variable
Use this when you have a variable that you want to update frequently, and it's ok if it sometimes doesn't update to save bandwidth for other things. This will sync for late joiners.

**Example**: A tree that grows as someone waters it, with a continuous 'size' variable. It's ok if you miss a few updates since it will jump to the right position on the next update you get. See [Using Variables](/worlds/udon/networking#using-variables) below. 

### 2. Manual Variable
Use this when you have a variable that will update less frequently, and it's super important that its value is always up-to-date. This will sync for late joiners. This option is not compatible with Object Sync. See [Using Variables](/worlds/udon/networking#using-variables) below. 

**Example**: The 'score' of each team in a basketball game. This only changes when someone makes a basket and you definitely don't want to miss an update.

### 3. Custom Network Events
Use this to trigger an event for every player currently in the instance, or for the owner of an object. It is guaranteed to arrive, but will have a fair amount of delay and overhead. It will not be received by anyone who joins after the event was sent. See [Using Events](/worlds/udon/networking#using-events) below. 

**Example**: A laser effect that fires as part of your Dance Club. You want everyone in the club to see it around the same time, but if someone comes in 20 minutes later, it's ok that they missed it.

### 4. Automatic
Some VRChat-specific objects are automatically synced. This includes:
* Avatars: Includes their colliders, voice, and IK movement. 
* VRCObjectSync: Includes the Transform and Rigidbody of the object.

# Object Ownership
In VRChat, every GameObject is 'owned' by one player (`VRCPlayerApi`) at a time. Only the owner of an object can change its synced Udon variables. Those changes can then be sent to everyone else in the instance. If you want a player to be able to change a variable on an object, make sure to check or request ownership first!

The ownership of an object can be changed with Udon by calling `Networking.SetOwner(VRCPlayerApi player, GameObject obj)`. This will cause every player in the instance to call `OnOwnershipTransferred(VRCPlayerApi player)`, where `player` is a reference to the new owner of the object. The new owner can immediately change synced variables.
If your script is using manual sync, don't forget to call `RequestSerialization()`.

## Requesting Ownership (Advanced)

If you'd like the owner of an object to be able to accept or refuse ownership transfers, add the event `OnOwnershipRequest(VRCPlayerApi requester, VRCPlayerApi newOwner)` to your script.

By adding `OnOwnershipRequest()` to your script, additional steps are performed during an ownership transfer:

1.  As before, the **requesting player** must call `Networking.SetOwner(VRCPlayerApi player, GameObject obj)` to begin the ownership transfer. 
    - The 'requesting' player can be any player, or the owner. If a (former) owner made the request, they skip step 4 and 5.
	- Owners can give ownership to anyone, but non-owners can only request ownership for themselves. (Scripts without `OnOwnershipRequest()` do not have this restriction.)
2. `OnOwnershipRequest(VRCPlayerApi requester, VRCPlayerApi newOwner)` is called by the **requesting player**.
	- The requesting player must return `true` to the request. Otherwise, the request is cancelled early.
3. `OnOwnershipTransferred(VRCPlayerApi player)` is called by the **requesting player**.
	- This happens *before* ownership has been confirmed by the owner. Ownership may change back if the transfer is rejected.
4. `OnOwnershipRequest(VRCPlayerApi requester, VRCPlayerApi newOwner)` is called by the **owner**.
	- If the owner returns `true`, the ownership transfer is accepted. (In the Udon Graph, `SetReturnValue` is used to return `true`.) 
	- If the owner returns `false` or doesn't return a value at all, the ownership transfer is rejected. `OnOwnershipTransferred()` called for the requesting player, informing them that the initial owner still owns the object.
	- This step is skipped if the owner is transferring ownership to someone. The new player cannot reject ownership.
5. If the request was accepted, `OnOwnershipTransferred(VRCPlayerApi player)` is called by the **former owner** and **all other players**.
![](/img/worlds/udon-networking-813f99e-OnOwnershipRequest_Activity.svg)

# Using Variables

:::note Using a variable to sync data takes three steps:

1. Create the variable.\n2. Update the value on the Owner.\n3. React to changes in value received from the Owner.
:::
### Create the variable
1. Click the + button in the Variables window
2. Choose your variable type
3. Rename your variable (optional, but do it)
4. Click the arrow next to the variable name to show more options, turn on 'synced'. (The default value of 'none' is fine - this just means the value is not automatically smoothed out)

### Update the value on the Owner
1. Drag and drop the variable onto your graph while holding 'Ctrl' to make a 'Set Variable' node.
2. Connect an event or flow to the Flow Port on this node, and connect a new value to the Value Port.
3. If this UdonBehaviour is using Continuous Sync (selected on the UdonBehaviour itself in the inspector) then you're done with updating the value. If you're using Manual Sync, then you need to add an "UdonBehaviour.RequestSerialization" node and connect the output from your Set Variable Flow Port to the Flow Input port on this node. You can leave the 'instance' Value Port on this node empty, it will default to the current UdonBehaviour, which is what we want.

### React to changes in value received from the Owner.
1. Add an "OnDeserialization" node to this same graph.
2. Drag and Drop the variable onto your graph without holding Ctrl to create a 'Get Variable' node.
3. Use the flow coming from the OnDeserialization node and the value from the Get Variable node to update another node with this new value.

## RequestSerialization
This node is used in Manual Sync mode to flag the variables on the target UdonBehaviour for Serialization during the next Network Tick, which does not happen every frame. This node works will with the OnPreSerialization Event node. You trigger "RequestSerialization" and then the OnPreSerialization event will trigger during the next Network Tick. At that point, you can update any variables to the values you would like to be synced.
:::note Variable Sync

You can sync variables and arrays of variables of the following types:\nbool, char, byte, sbyte, short, ushort, int, uint, long, ulong, float, double, Vector2, Vector3, Vector4, Quaternion, string, VRCUrl, Color and Color32.
:::

:::caution Array Sync

When syncing behaviours with synced array variables on them - make sure to always initialize those arrays to some value, e.g. an empty array. If any of the synced arrays are left uninitialized - the behaviour will not sync! You can check the serialization success via the [OnPostSerialization](/worlds/udon/networking/network-components#onpostserialization) node
:::

# Using Custom Events

:::note Using an Event to fire a change takes 2 steps:

1. Add a Custom Event node\n2. Use a SendCustomNetworkEvent node to trigger this event on your target(s).
:::
### Add a Custom Event node
1. Create an "Event Custom" node.
2. Give this node a unique name using its input box
3. Add a "Send Custom Network Event Node"
4. Enter this same event name in the 'eventName' input.
5. Leave the default 'All' as the target to trigger this event on each Player in your room, or change it to 'Owner' to only fire this event on the Owner.
6. You can leave the 'instance' input empty to target the current UdonBehaviour, or connect a reference to another UdonBehaviour to fire a Custom Event on that one instead.
:::note

SendCustomNetworkEvent will work as a 'SendCustomEvent' node in the Editor to allow for some basic testing.",
  "title": "Editor Shortcut
:::
### Local-Only Events
If you start your Event names with an underscore, you will not be able to call them over the network. We do this to safeguard our internal methods like _start, _update, _interact against malicious network calls. We have plans to add an attribute to events to mark them as 'local-only' without the need for an underscore. If you want to block events from remote execution in the meantime, you can use a unique underscore prefix like '_u_eventName' to make sure it doesn't match any existing or future VRC methods.
# Debugging
You can view some information about your networked objects in the client if you launch with `--enable-debug-gui` and press RightShift + ` + 8 while in the client.
These overlays show you the NetworkId, name of the GameObject, **P**ing time, **Q**uality of the data (100% is no dropped packets) and **O**wner of the GameObject.
![](/img/worlds/udon-networking-9b0721f-network-debug.png)

You can see some per-object information in list form using RightShift + ` + 6 in the client:
![](/img/worlds/udon-networking-dde0d15-networking-debug-6.png)

:::danger Known Issues

The latest build & SDK have these issues:\n\n* isInstanceOwner returns true when spawning (thanks [FSP](https://feedback.vrchat.com/udon-networking-update/p/unu-v5-isinstanceowner-returns-true-when-spawning))\n* OnOwnershipRequest sometimes logs that it rejects transferring ownership when it actually succeeds (thanks [AirGamer](https://feedback.vrchat.com/udon-networking-update/p/1069-strange-logging-when-networksetowner-is-called-within-onownershiprequest))\n* Teleporting a player during Network Update (OnDeserialization) will not teleport the player's avatar. To fix this issue currently, use `SendCustomEventDelayedFrames` and delay the teleport by 1 frame.
:::