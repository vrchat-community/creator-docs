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
Fired when the local player interacts with this game object.

### OnDrop
Fired when a VRChat player drops this object after being held.

### OnOwnershipTransferred
Fired when the ownership of this object is transferred via some mechanic.

### OnPickup
Fired when this object is picked up by a VRChat player.

### OnPickupUseDown
Fired when this object is held and the Use button is pressed. Fires on button down. Requires 'Auto Hold' on Desktop.
 
### OnPickupUseUp
Fired when this object is held and the Use button is pressed. Fires on button up. Requires 'Auto Hold' on Desktop.

### OnPlayerJoined
Outputs: `player` - `VRC.SDKBase.VRCPlayerApi`

Fired when a VRChat player joins the instance. Outputs the `player` that joined.
 
### OnPlayerLeft
`Event_OnPlayerLeft`

Outputs: `player` - `VRC.SDKBase.VRCPlayerApi`

Fired when a VRChat player leaves the instance. Outputs the `player` that left.

### OnSpawn
`Event_OnSpawn`

Deprecated. OnSpawn serves no function in VRChat's SDK3. In SDK2, this event was triggered when spawning an object for the local player.
 
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

### OnScreenUpdate
`Event_OnScreenUpdate`

Outputs: `data` - `VRC.SDK3.Platform.ScreenUpdateData`

Triggered when a player first enters the world on a Mobile Device, and whenever the orientation of their device changes. Outputs a `ScreenUpdateData` struct with the following values:
* `type` - `ScreenUpdateType` - only `OrientationChanged` for now, can be expanded in the future.
* `orientation` - `VRCOrientation` - the orientation of the player's device, as a `VRC.SDKBase.Platform.VRCOrientation` enum, which is `Landscape` or `Portrait`.
* `resolution` - `Vector2` - the resolution of the player's device, as a `Vector2` struct. 
### OnInputMethodChanged
`Event_OnInputMethodChanged`
Outputs: `inputMethod` - `VRC.SDKBase.VRCInputMethod`
Fired when a player uses a different input method - Keyboard, Mouse, Controller, etc.

### Advanced Notes
All nodes in this list have the type `System.Void`.
