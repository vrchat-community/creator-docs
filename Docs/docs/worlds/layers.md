---
title: "Unity Layers in VRChat"
slug: "layers"
excerpt: "What Unity Layers are used by VRChat and Untiy?"
hidden: false
createdAt: "2023-04-03T21:22:34.611Z"
updatedAt: "2023-04-24T16:23:07.971Z"
---
[Layers](https://docs.unity3d.com/2019.4/Documentation/Manual/Layers.html) are used in Unity to organize your Game Objects, determine [collisions ](https://docs.unity3d.com/Manual/LayerBasedCollision.html) and [Raycasts](https://docs.unity3d.com/ScriptReference/Physics.Raycast.html) between Game Objects, selectively [render](https://docs.unity3d.com/ScriptReference/Camera-cullingMask.html) parts of the scene, and more.

**You can freely use most Layers in your VRChat world.** Some Layers are shared and used Unity and VRChat.

When you create a Unity project with VRChat's Worlds SDK, your project will automatically be configured to use VRChat's built-in layers. If you change the collision matrix, rename, or remove built-in layers, your changes will be overridden when you upload your world to VRChat.

- Layers 0-7 are 'Builtin' Unity layers.
- Layers 3, 6, and 7 are internal Unity layers. They cannot be used.
- Layers 8-21 are 'User' Unity layers managed by VRChat's SDK.
- Layers 22-31 are unused 'User' Unity layers. You can edit them freely, and changes to these layers will not be discarded when you build & upload your world.

## Unity's built-in layers

| Layer number | Layer Name          | Description  |
| :-- | :-- | :-- |
| 0            | Default             | Used for Unity's Game Objects by default. Used by VRChat's Avatar Pedestals.                                                                                                                                                                                         |
| 1            | TransparentFX       | Used for Unity's Flare Assets.                                                                                                                                                                                                                                       |
| 2            | IgnoreRaycast       | Ignored by Unity's Physics Raycasts if no layer mask is provided. Not ignored by VRChat's Physics Raycasts.                                                                                                                                                         |
| 4            | Water               | Used by Unity's Standard Assets. Used by VRChat's Portals. Used by VRChat's Mirrors. Often used for Unity's Post Processing.                                                                                                                                          |
| 5            | UI                  | ⚠ You may not want to use this layer. Used by Unity's UI by default. Ignored by VRChat's UI pointer unless the player has the VRChat menu open. Ignored by the VRChat's camera unless 'UI' is enabled in the camera.                                                    |
| 8            | Interactive         | Unused by Unity and VRChat.                                                                                                                                                                                                                                          |
| 9            | Player              | Used for VRChat's players, except the local player.                                                                                                                                                                                                                  |
| 10           | PlayerLocal         | Used by VRChat to render the local player. Humanoid avatars are rendered without their head bone.                                                                                                                                                                   |
| 11           | Environment         | Unused by Unity and VRChat.                                                                                                                                                                                                                                          |
| 12           | UiMenu              | ⚠ Avoid using this layer. Used by VRChat's nameplates. Ignored by VRChat's UI pointer unless the player has the VRChat menu open.                                                                                                                                   |
| 13           | Pickup              | Used by VRChat's Pickups by default when you add a pickup component. Does not collide with players.                                                                                                                                                                 |
| 14           | PickupNoEnvironment | Colliders on this Layer only collide with 'Pickup.'                                                                                                                                                                                                                  |
| 15           | StereoLeft          | Unused by Unity and VRChat. |
| 16           | StereoRight         | Unused by Unity and VRChat.                                                                                                                                                                                                                                          |
| 17           | Walkthrough          | Colliders on this layer do not collide with players. |
| 18           | MirrorReflection    | Used by VRChat to render the local player in Mirrors. <br />Renderers on this Layer will only appear in Mirrors. <br />Renderers on this Layer are not rendered in VRChat's main camera.<br /> Colliders on this Layer do not block VRChat's Raycasts.                                      |
| 19           | reserved2                    | ⚠ Avoid using this layer. Reserved by VRChat. When you upload your world, any Game Object on a reserved Layer will be moved to Layer 0 (Default). |
| 20           | reserved3                    | ⚠ Avoid using this layer. Reserved by VRChat. When you upload your world, any Game Object on a reserved Layer will be moved to Layer 0 (Default). |                                                                                                                       
| 21           | reserved4           |  ⚠ Avoid using this layer. Reserved by VRChat. When you upload your world, any Game Object on a reserved Layer will be moved to Layer 0 (Default).                                                                                                                                                                                                                                                                    |
| 22-31        |                     | Unused by Unity and VRChat. VRChat will not override the name and collision matrix of these Layers in uploaded worlds.                                                                                                                                               |