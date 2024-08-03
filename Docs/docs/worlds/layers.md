import UnityVersionedLink from '@site/src/components/UnityVersionedLink.js';

# Unity Layers in VRChat 

<UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/Layers.html">Layers</UnityVersionedLink> are used in Unity to organize your Game Objects, determine <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/LayerBasedCollision.html">collisions</UnityVersionedLink> and <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/ScriptReference/Physics.Raycast.html">Raycasts</UnityVersionedLink> between Game Objects, selectively <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/ScriptReference/Camera-cullingMask.html">render</UnityVersionedLink> parts of the scene, and more.

**You can freely use most Layers in your VRChat world.** Some Layers are shared and used by Unity and VRChat.

When you create a Unity project with VRChat's Worlds SDK, your project will automatically be configured to use VRChat's built-in layers. If you change the collision matrix, rename, or remove built-in layers, your changes will be overridden when you upload your world to VRChat.

Layers 22-31 are unused 'User' Unity layers. You can edit them freely, and changes to these layers will not be discarded when you build & upload your world.

## Unity's built-in layers

| Layer number | Layer Name          | Description                                                                                                                                                                                                                                            |
| :----------- | :------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0            | Default             | Used for Unity's Game Objects by default. Used by VRChat's Avatar Pedestals.                                                                                                                                                                           |
| 1            | TransparentFX       | Used for Unity's Flare Assets.                                                                                                                                                                                                                         |
| 2            | IgnoreRaycast       | Ignored by Unity's Physics Raycasts if no layer mask is provided. Not ignored by VRChat's Physics Raycasts.                                                                                                                                            |
| 3            | reserved3           | ⚠ Avoid using this layer. Reserved by VRChat. When you upload your world, any Game Object on a reserved Layer will be moved to Layer 0 (Default).                                                                                                      |
| 4            | Water               | Used by Unity's Standard Assets. Used by VRChat's Portals. Used by VRChat's Mirrors. Often used for Unity's Post Processing.                                                                                                                           |
| 5            | UI                  | ⚠ You may not want to use this layer. Used by Unity's UI by default. Ignored by VRChat's UI pointer unless the player has the VRChat menu open. Ignored by the VRChat's camera unless 'UI' is enabled in the camera.                                   |
| 6            | reserved6           | ⚠ Avoid using this layer. Reserved by VRChat. When you upload your world, any Game Object on a reserved Layer will be moved to Layer 0 (Default).                                                                                                      |
| 7            | reserved7           | ⚠ Avoid using this layer. Reserved by VRChat. When you upload your world, any Game Object on a reserved Layer will be moved to Layer 0 (Default).                                                                                                      |
| 8            | Interactive         | Unused by Unity and VRChat.                                                                                                                                                                                                                            |
| 9            | Player              | Used for VRChat's players, except the local player.                                                                                                                                                                                                    |
| 10           | PlayerLocal         | Used by VRChat to render the local player. Humanoid avatars are rendered without their head bone.                                                                                                                                                      |
| 11           | Environment         | Unused by Unity and VRChat.                                                                                                                                                                                                                            |
| 12           | UiMenu              | ⚠ Avoid using this layer. Used by VRChat's nameplates. Ignored by VRChat's UI pointer unless the player has the VRChat menu open.                                                                                                                      |
| 13           | Pickup              | Used by VRChat's Pickups by default when you add a pickup component. Does not collide with players.                                                                                                                                                    |
| 14           | PickupNoEnvironment | Colliders on this Layer only collide with 'Pickup.'                                                                                                                                                                                                    |
| 15           | StereoLeft          | Unused by Unity and VRChat.                                                                                                                                                                                                                            |
| 16           | StereoRight         | Unused by Unity and VRChat.                                                                                                                                                                                                                            |
| 17           | Walkthrough         | Colliders on this layer do not collide with players.                                                                                                                                                                                                   |
| 18           | MirrorReflection    | Used by VRChat to render the local player in Mirrors. <br />Renderers on this Layer will only appear in Mirrors. <br />Renderers on this Layer are not rendered in VRChat's main camera.<br /> Colliders on this Layer do not block VRChat's Raycasts. |
| 19           | InternalUI          | ⚠ Avoid using this layer. Used by VRChat for internal UI elements such as debug consoles.                                                                                                                                                              |
| 20           | HardwareObjects     | ⚠ Avoid using this layer. Used by VRChat to render virtual representations of physical hardware in-game i.e. controllers and trackers                                                                                                                  |
| 21           | reserved4           | ⚠ Avoid using this layer. Reserved by VRChat. When you upload your world, any Game Object on a reserved Layer will be moved to Layer 0 (Default).                                                                                                      |
| 22-30        |                     | Unused by Unity and VRChat. VRChat will not override the name and collision matrix of these Layers in uploaded worlds.                                                                                                                                 |
| 31           |                     | ⚠ Avoid using this layer. Used by Unity's Editor’s Preview window mechanics.                                                                                                                                                                           |

## Interaction Block and Passthrough on VRChat Layers

Interaction (grabbing an item from a distance, toggling a UI element with the laser) is blocked by most VRChat layers. The following layers are transparent to interaction and allow you to interact through them:
 - UiMenu
 - UI
 - PlayerLocal
 - MirrorReflection

 ## Interaction Passthrough for User Layers

Interaction through User layers is blocked by default. Use the "Interact Passthrough" mask to define layers that will be transparent to interaction (allow interactions to pass through). Note that collision test rays originate differently from Desktop/Mobile players (inside the player capsule) versus VR players (from the user's tracked hand). This means that VR players can penetrate colliders with their hand even when the player collider is blocked. Those same colliders will therefore not block interaction from the VR player, since the hand has penetrated.
