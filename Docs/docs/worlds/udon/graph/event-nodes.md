---
title: "Event Nodes"
slug: "event-nodes"
hidden: false
createdAt: "2020-03-20T20:08:22.541Z"
updatedAt: "2022-10-18T23:46:02.951Z"
---
This is a list of Udon Nodes that are considered "Events".

Events are used to detect actions and set off chains of action or logic. [Input Events](/worlds/udon/input-events)  have their own special page. To jump to an Event in the graph, click it in the Graph Sidebar.

All below nodes have flow nodes where logic requires it.

### Interact
Fired when a VRChat player interacts with this object.

### OnDrop
Fired when a VRChat player drops this object after being held.

### OnOwnershipTransferred
Fired when the ownership of this object is transferred via some mechanic.

### OnPickup
Fired when this object is picked up by a VRChat player.

### OnPickupUseDown
Fired when this object is held and the Use button is pressed. Fires on button down.
 
### OnPickupUseUp
Fired when this object is held and the Use button is pressed. Fires on button up.

### OnPlayerJoined
Outputs: `player` - `VRC.SDKBase.VRCPlayerApi`
Fired when a VRChat player joins the instance. Outputs the `player` that joined.
 
### OnPlayerLeft
`Event_OnPlayerLeft`
Outputs: `player` - `VRC.SDKBase.VRCPlayerApi`
Fired when a VRChat player leaves the instance. Outputs the `player` that left.
 
### OnSpawn
`Event_OnSpawn`
Fired when this object spawns for the local player. Unbuffered, so late joiners do not get this event. Only fires when the object is spawned via network instantiation. Will not fire if the object is present in the base scene.
 
### OnStationEntered
`Event_OnStationEntered`
Fired when a VRChat player enters the station on this object.
 
### OnStationExited
`Event_OnStationExited`
Fired when a VRChat player exits the station on this object.
 
### OnVideoEnd
`Event_OnVideoEnd`
Fired when the video player on this object is finished playing, either via the end of the video or via player interaction.

### OnVideoError
`Event_OnVideoError`
Outputs: `videoError` - `VRC.SDK3.Components.Video.VideoError`
Fired when the video player encounters an error loading the video.

### OnVideoLoop
`Event_OnVideoLoop`
If looping is enabled, fired when the video player finishes a loop.
 
### OnVideoPause
`Event_OnVideoPause`
Fired when the video player on this object is paused.
 
### OnVideoPlay
`Event_OnVideoPlay`
Fired when the video player on this object starts playback, either via the start of a new video in a queue, unpausing, or via player interaction.

### OnVideoStart
`Event_OnVideoStart`
Fired when the video player on this object starts playback from a stopped state.

### OnVideoReady
`Event_OnVideoReady`
Fired when the video player loads a new video.
# Player Events
### OnPlayerTriggerEnter
`Event_OnPlayerTriggerEnter`
Outputs: `player` - `VRC.SDKBase.VRCPlayerApi`
Fired when a player's capsule enters a trigger collider.

### OnPlayerTriggerStay
`Event_OnPlayerTriggerStay`
Outputs: `player` - `VRC.SDKBase.VRCPlayerApi`
Fired on frames while a player's capsule is inside a Trigger Collider

### OnPlayerTriggerExit
`Event_OnPlayerTriggerExit`
Outputs: `player` - `VRC.SDKBase.VRCPlayerApi`
Fired when a player's capsule exits a Trigger Collider.

### OnPlayerCollisionEnter
`Event_OnPlayerCollisionEnter`
Outputs: `player` - `VRC.SDKBase.VRCPlayerApi`
 Fired when a player's capsule enters a Collider.

### OnPlayerCollisionStay
`Event_OnPlayerCollisionStay`
Outputs: `player` - `VRC.SDKBase.VRCPlayerApi`
Fired on frames while a player's capsule is inside a Collider.

### OnPlayerCollisionExit
`Event_OnPlayerCollisionExit`
Outputs: `player` - `VRC.SDKBase.VRCPlayerApi`
Fired when a player's capsule exits a Collider.

### OnPlayerParticleCollision
`Event_OnPlayerParticleCollision`
Outputs: `player` - `VRC.SDKBase.VRCPlayerApi`
Fired when a particle collides with a player's capsule, assuming that Particle System has Collision and Send Collision Messages turned on.

### OnPlayerRespawn
`Event_OnPlayerRespawn`
Outputs: `player` - `VRC.SDKBase.VRCPlayerApi`
Fired when a player respawns using their menu.

### Advanced Notes
All nodes in this list have the type `System.Void`.