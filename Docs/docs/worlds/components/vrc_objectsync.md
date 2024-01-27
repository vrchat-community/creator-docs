---
title: "VRC Object Sync"
slug: "vrc_objectsync"
hidden: false
createdAt: "2017-07-07T19:28:16.383Z"
updatedAt: "2021-10-20T20:08:39.807Z"
---
The VRC Object Sync component synchronizes the transform of a GameObject with all players in the instance. It synchronizes the object's:

- position
- rotation
- kinematic state (see `SetKinematic`)
- and gravity state (see `SetGravity`).

## Properties

| Parameter | Description |
| --- | --- |
| Allow Collision Ownership Transfer | If checked, ownership of the object will transfer if it collides with another object owned by another player. |

## Methods

| Name | Summary |
| --- | --- |
| SetKinematic(bool value) | Changes the kinematic state, usually handled by the Rigidbody of the object but controlled here for sync purposes. When the kinematic state is on, this Rigidbody ignores forces, collisions and joints. |
| SetGravity(bool value) | Changes the gravity state, usually handled by the Rigidbody of the object but controlled here for sync purposes. |
| FlagDiscontinuity() | Trigger this when you want to teleport the object - the changes you make this frame will be applied without smoothing. |
| TeleportTo([Transform](https://docs.unity3d.com/ScriptReference/Transform.html) targetLocation) | Moves the object to the specified location. |
| Respawn() | Moves the object back to its original spawn location. |