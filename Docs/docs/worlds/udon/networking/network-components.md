---
title: "Network Components"
slug: "network-components"
createdAt: "2021-05-13T17:19:13.691Z"
updatedAt: "2023-02-26T20:26:03.564Z"
---
This doc covers Networking Components, Properties and Events you can use in your Udon Programs.

## Networking Properties

Special properties you can *get* from Networking:

**IsClogged **- returns true if there is too much data trying to get out. You can use this to hold off some operations or adjust your logic.

**IsInstanceOwner **- returns true if the Local Player is the one who created the instance. False when in Build & Test and Unity Playmode.

**IsMaster** - returns true if the Local Player is the 'Master' - either the first person who entered the instance or the person automatically designated as Master when the last Master left. Old logic, not recommended for use. IsOwner should be used instead.

**IsNetworkSettled** - returns true once all the data in the instance has been deserialized and applied, and it's ready for use.

**LocalPlayer** - returns the [VRC Player API](/worlds/udon/players) object of the local player. Will be null in the editor - use Utilities.IsValid to easily branch your logic on this.

**SimulationTime** - returns the current simulation time of a player or object with networking components.
Simulation time is a timestamp that refers to how far back in time an object is simulated. This value is used internally for [`VRCObjectSync`](/worlds/udon/networking/network-components#vrc-object-sync) and [players](/worlds/udon/players#simulationtime), but can be used in Udon scripts as well. For example, if your ` Time.realtimeSinceStartup ` is 45 and the SimulationTime of an object is 44.5, then VRChat believes 500ms of delay is necessary to smoothly replicate the object at that moment. You can use that number to learn some information about what `VRCObjectSync` is doing, or to create your own system similar to `VRCObjectSync`. For example, if you do `Time.realTimeSinceStartup - SimulationTime(player)` then that will tell you exactly how much latency that player has at that moment.
 
Simulation time is frequently adjusted depending on network conditions, including many factors such as latency, reliability, and frequency of the packets being received. The goal of this adjustment is to be as close to real-time as possible to reduce latency, but to leave enough room to prevent hitching. There are a variety of factors that can cause hitching, but one example can be running out of received packets from the owner.

## Networking Events

These are the events available as part of the Networking system to control how your data is synced.

## OnPreSerialization:
This event triggers just before serialized data will be sent out, it's a good place to set synced variables that you want to be updated for other players.

## OnDeserialization:
This event triggers when sync data has been transformed from bytes back into usable variables. It does not tell you *which* data has been updated, but serves as a jumping-off point to either update everything that watches synced variables, or a place to check new data against old data and make specific updates.

## OnDeserialization(DeserializationResult)
Same as OnDeserialization, but with additional information about the time at which the request was sent and received.

 ### DeserializationResult
`DeserializationResult` contains two properties:
- `sendTime`: The time in seconds at which this message was sent.
- `receiveTime`: The time in seconds at which this message was received.

Both `sendTime` and `receiveTime` measure based on the time in seconds since VRChat has started, from your perspective (see [Time.realtimeSinceStartup](https://docs.unity3d.com/ScriptReference/Time-realtimeSinceStartup.html)). This means that if you want to know how many seconds ago a certain Deserialization was sent, you can calculate it with `Time.realtimeSinceStartup - sendTime`.

Note that every user's `Time.realtimeSinceStartup` is different, so one player's `sendTime` is going to be different from another player's `sendTime`. As a result, if you want to sync a specific `sendTime` to other players, you will need to calculate its offset by subtracting your `Time.realtimeSinceStartup`. Then, when the other players receive that offset, they can add back their own `Time.realtimeSinceStartup` to the offset in order to determine the absolute time relative to their own clock.

SendTime can be a negative number if the message was sent by someone else before you ever launched VRChat.

## OnPostSerialization:
This event triggers just after an attempt was made to send serialized data. It returns a **SerializationResult** struct with a 'success' bool and 'byteCount' int with the number of bytes sent.

## OnSpawn:
This event is deprecated - use the typical OnEnabled event if you want to do something when an object is 'Spawned' from the pool.

## OnOwnershipRequest:
This event is triggered when someone has requested to take ownership. It includes the Player Objects for the Requester and the Requested Owner. To approve or deny the change, set a boolean value into a "Set Return Value" node. This logic runs locally on both the requester and the owner, so be aware that disagreements in logic between the two will cause a desync. This is most likely to be expressed by the ownership transfer being unexpectedly rejected by the owner.

## OnOwnershipTransferred:
This event is triggered for everyone in the instance when an objects ownership is changed, and includes the Player Object for the new owner.

## OnVariableChanged:
This is a special type of event that you can create for any variable. In Udon Graph, you create it by dragging and dropping a variable into the graph while holding alt. This event detects when the variable changes, which can include when you receive synced variables from other players. 
* changing the contents of an array does not trigger a change, because the array itself is still the same.
* OnVariableChanged triggers immediately when the variable itself is written to, unlike OnDeserialization which triggers after it has finished writing all the synced variables. This means that if you use OnVariableChanged from one synced variable and try to get the contents of a different synced variable, it is not guaranteed that it has been updated with the latest synced data yet.
# VRC Object Sync
This component will automatically sync the Transform (position, rotation scale) and Rigidbody (physics) of the object you put it on. It has a few special methods and properties you can access:

#### FlagDiscontinuity
Trigger this when you want to teleport the object - the changes you make this frame will be applied without smoothing.

#### Set/Get Gravity
When gravity is on, this rigidbody is affected by gravity and will fall to the ground. Normally, gravity is a property of the rigidbody. However, when you have VRCObjectSync, this property must be controlled by the VRCObjectSync component instead. You can use these functions to do that. This effectively behaves like a synced variable, so **only the owner can set gravity.**

#### Set/Get Kinematic:
When kinematic is on, this rigidbody ignores forces, collisions and joints. Normally, kinematic is a property of the rigidbody.  However, when you have VRCObjectSync, this property must be controlled by the VRCObjectSync component instead. You can use these functions to do that. This effectively behaves like a synced variable, so **only the owner can set kinematic.**

#### Respawn:
Teleports this object back to its starting Position and Rotation, and removes its Velocities. 
Specifically, it sets **DiscontinuityHint** to true to make the following changes instant instead of smooth. Then it:
* sets transform.position to initial position
* sets transform.rotation to initial rotation

If the object has a rigidbody:
* sets the rigidbody.velocity to Vector3.zero
* sets the rigidbody.angularVelocity Vector3.zero
* sets the rigidbody.position to initial position
* sets the rigidbody.rotation to initial rotation
# VRC Object Pool
VRC Object Pool provides a lightweight method of managing an array of game objects. The pool will manage and synchronize the active state of each object it holds.

To make an object active, the Owner of the pool triggers the **TryToSpawn** node, which will return the object that was made active, or a null object if none are available. Objects may be returned to the pool by the pool's owner, and automatically disabled, via the **Return** node.

Late joiners will have the objects automatically made active or inactive where appropriate.