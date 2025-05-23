# Event Nodes

This is a list of Udon Nodes that are considered "Events".

Your scripts can use events to detect actions and set off chains of action or logic. [Input Events](/worlds/udon/input-events)  have their own special page. To jump to an Event in the graph, click it in the Graph Sidebar.

All below nodes have flow nodes where logic requires it.

:::note

More events specifically related to networking are listed on the [Network Components](/worlds/udon/networking/network-components/#networking-events) page.

:::

### Interact
Fired when the local player interacts with this GameObject.

- Players can only interact with GameObjects that have a Collider component and an UdonBehaviour component.
- If you want players to interact with a 2D UI, use [VRC Ui Shape](/worlds/components/vrc_uishape/) and a Button component instead.

### OnDrop
Fired when the local player drops this object after being held.

### OnPickup
Fired when this object is picked up by the local player.

### OnPickupUseDown
Fired when the local player is holding this object presses the "Use" button. Fires when the button is pressed. Requires 'Auto Hold' on Desktop.
 
### OnPickupUseUp
Fired when the local player is holding this object presses the "Use" button. Fires when the button is released. Requires 'Auto Hold' on Desktop.

### OnPlayerJoined
Outputs: `player` - `VRC.SDKBase.VRCPlayerApi`

Fired when any player joins the instance. Outputs the `player` that joined.

When you join an instance, you execute OnPlayerJoined for every player in the instance, including yourself. When another player joins your instance, you only execute OnPlayerJoined for the player who joined.
 
### OnPlayerLeft
`Event_OnPlayerLeft`

Outputs: `player` - `VRC.SDKBase.VRCPlayerApi`

Fired when any player in the instance leaves. Outputs the `player` that left.

### OnPlayerRestored
`Event_OnPlayerRestored`

Outputs: `player` - `VRC.SDKBase.VRCPlayerApi`

Triggered after all persistent data of a player in the instance has finished loading, including all of their [PlayerData](/worlds/udon/persistence/player-data) and [PlayerObjects](/worlds/udon/persistence/player-object). Outputs the `player` whose data was loaded.

When you join an instance, you execute OnPlayerRestored for every player in the instance, including yourself. When another player joins your instance, you only execute OnPlayerRestored for the player who joined.

### OnStationEntered
`Event_OnStationEntered`

Fired when the local player enters the station on this object.
 
### OnStationExited
`Event_OnStationExited`

Fired when the local player exits the station on this object.
 
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
## Player Events
### OnPlayerTriggerEnter
`Event_OnPlayerTriggerEnter`

Outputs: `player` - `VRC.SDKBase.VRCPlayerApi`

Fired when the capsule collider of any player in the instance enters a trigger collider.

### OnPlayerTriggerStay
`Event_OnPlayerTriggerStay`

Outputs: `player` - `VRC.SDKBase.VRCPlayerApi`

Fired every frame while the capsule collider of any player in the instance is inside a trigger collider.

### OnPlayerTriggerExit
`Event_OnPlayerTriggerExit`

Outputs: `player` - `VRC.SDKBase.VRCPlayerApi`

Fired when the capsule collider of any player in the instance exits a trigger collider.

### OnPlayerCollisionEnter
`Event_OnPlayerCollisionEnter`

Outputs: `player` - `VRC.SDKBase.VRCPlayerApi`

Fired when the capsule collider of any player in the instance enters a collider.

### OnPlayerCollisionStay
`Event_OnPlayerCollisionStay`

Outputs: `player` - `VRC.SDKBase.VRCPlayerApi`

Fired every frame while the capsule collider of any player in the instance is inside a collider.

### OnPlayerCollisionExit
`Event_OnPlayerCollisionExit`

Outputs: `player` - `VRC.SDKBase.VRCPlayerApi`

Fired when the capsule collider of any player in the instance exits a collider.

### OnPlayerParticleCollision
`Event_OnPlayerParticleCollision`

Outputs: `player` - `VRC.SDKBase.VRCPlayerApi`

Fired when a particle collides with the capsule collider of any player in the instance, assuming that particle system has "Collision" and "Send Collision Messages" turned on.

### OnPlayerRespawn
`Event_OnPlayerRespawn`

Outputs: `player` - `VRC.SDKBase.VRCPlayerApi`

Fired when the local player respawns by clicking "Respawn" in their menu.

### OnScreenUpdate
`Event_OnScreenUpdate`

Outputs: `data` - `VRC.SDK3.Platform.ScreenUpdateData`

Triggered when the local player first enters the world on a Mobile Device, and whenever the orientation of their device changes. Outputs a `ScreenUpdateData` struct with the following values:
* `type` - `ScreenUpdateType` - only `OrientationChanged` for now, can be expanded in the future.
* `orientation` - `VRCOrientation` - the orientation of the player's device, as a `VRC.SDKBase.Platform.VRCOrientation` enum, which is `Landscape` or `Portrait`.
* `resolution` - `Vector2` - the resolution of the player's device, as a `Vector2` struct. 

### OnInputMethodChanged
`Event_OnInputMethodChanged`
Outputs: `inputMethod` - `VRC.SDKBase.VRCInputMethod`
Fired when the local player uses a different input method - Keyboard, Mouse, Controller, etc.

### OnLanguageChanged
`Event_OnLanguageChanged`
Outputs: `language` - `string`
Fired when the local player updates their display language.

### OnPlayerSuspendChanged
`Event_OnPlayerSuspendChanged`

Outputs: `player` - `VRC.SDKBase.VRCPlayerApi`

Fired when the device of any player in the instance becomes suspended. A device is suspended if it enters sleep mode or switches to a different app. For the player that is being suspended, this event will fire on wakeup. Check `VRCPlayerApi.isSuspended` to know if this is a wakeup or suspend event.

While suspended, devices don't run Udon code or respond to network events until the player reopens VRChat.

When you create multiplayer interactions in VRChat, you should react to suspended players to ensure that your Udon code continues running as intended. For example, you may want to transfer the ownership of important objects to [a player who is not suspended](/worlds/udon/players/#get-issuspended).

Your code should account for any device becoming suspended at any time, regardless of platform. PC players currently never become suspended, but this should not be assumed.

### OnVRCPlusMassGift
`Event_OnVRCPlusMassGift`

Outputs: 
* `gifter` - `VRC.SDKBase.VRCPlayerApi`
* `numGifts` - `int`

Fired when any player in the instance drops a gift bomb.

### OnVRCCameraSettingsChanged
`Event_OnVRCCameraSettingsChanged`

Outputs: `camera` - `VRC.SDK3.Rendering.VRCCameraSettings`

Fired when the user changes certain options in the VRChat graphics settings, e.g. "Near Clip Override" or "Field of View."

Changing values yourself via `VRCCameraSettings` will _not_ trigger this event! Similarly, camera `Position` and `Rotation` will not trigger it, since those change almost every frame anyway.

The `camera` object passed in refers to either the `ScreenCamera` or the `PhotoCamera` (see [VRCCameraSettings](/worlds/udon/vrc-graphics/vrc-camera-settings)). Note that this event will trigger every frame while the user is using the zoom slider on the `PhotoCamera` or a Dolly path is adjusting the zoom value, since they affect the `FieldOfView` value.

Changing the screen resolution, including by resizing the VRChat window, will also call this event every frame. It is recommended to do minimal processing to avoid affecting performance.

This event may trigger multiple times per frame.

### OnVRCQualitySettingsChanged
`Event_OnVRCQualitySettingsChanged`

Fired when the user adjust Graphics settings affecting one or more values in `VRC.SDK3.Rendering.VRCQualitySettings`.

Similarly to `OnVRCCameraSettingsChanged`, this event may trigger often, and it is recommended to keep processing light.

### Advanced Notes
All nodes in this list have the type `System.Void`.
