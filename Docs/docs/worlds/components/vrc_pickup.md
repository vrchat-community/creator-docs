---
title: "VRC Pickup"
slug: "vrc_pickup"
hidden: false
createdAt: "2017-07-06T00:55:36.747Z"
updatedAt: "2023-05-04T21:43:45.162Z"
---

import UnityVersionedLink from '@site/src/components/UnityVersionedLink.js';

# VRC Pickup

Allows objects to be picked up, held and used by players.

To work properly, pickups require both a Rigidbody and a Collider component on the same game object.

By default, if the local player picks up a game object, remote players don't see it move. Add a [VRC Object Sync](/worlds/components/vrc_objectsync) component if you want to synchronize the pickup's movement between players. 

## Component Properties

To change how VRC Pickup behaves, you can change its properties in the Unity inspector and through Udon programs.

![The VRC Pickup component in the Unity inspector](/img/worlds/components/vrcpickup.png)

The following table lists all the parameters you can configure:

| Parameter                        | Udon property | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
|----------------------------------|---------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Auto Hold                        | `AutoHold` (`VRC_Pickup.AutoHoldMode`) | Controls whether the pickup should remain in the player's hand after they finish the Grab action. See [Versions](#versions) for more info.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| Use Text                         | `UseText` | Text that appears when the player has this object equipped, prompting them to use it.<br/><br/>Requires "Auto Hold" to be enabled.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Interaction Text[^2]             | `InteractionText` | Text that appears when the user is hovering over the object with their hand in VR or looking at it when not in VR. If empty, a default label is displayed instead.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Proximity[^2]                    | `Proximity` (read-only)<br/>`proximity` (writable) | The maximum distance from which users can pick up the object. See [Proximity Rules](#proximity-rules) for more details.<br/><br/>In Udon, read `Proximity` and assign to the lowercase `proximity`. `Proximity` has no setter.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Orientation                      | `orientation` (`VRC_Pickup.PickupOrientation`) | How the object is held. See [Orientation Rules](#orientation-rules) for more details.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Exact Gun                        | `ExactGun` | Controls how the object is held when Orientation is set to Gun. See [Orientation Rules](#orientation-rules) for more details.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Exact Grip                       | `ExactGrip` | Controls how the object is held when Orientation is set to Grip. See [Orientation Rules](#orientation-rules) for more details.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Pickupable                       | `pickupable` | Controls whether this object can currently be picked up.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| Disallow Theft                   | `DisallowTheft` | Controls whether to prevent the object from being picked up while already being held by a remote player.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| Allow Manipulation When Equipped | `allowManipulationWhenEquipped` | Controls whether the player can manipulate the pickup while holding it if using a keyboard or controller.[^1]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Momentum Transfer Method         | `MomentumTransferMethod` (`ForceMode`) | When this pickup hits a physics synced object, this defines how the collision force is transferred to the other object, using <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/ScriptReference/Rigidbody.AddForceAtPosition.html">Rigidbody.AddForceAtPosition</UnityVersionedLink>.<br/><br/>The force will only be added if 'AllowCollisionTransfer' is on for the other object.                                                                                                                                                                                                                                                              |
| Throw Velocity Boost Min Speed   | `ThrowVelocityBoostMinSpeed` | How fast the object needs to move when released for the boost scale to be applied, in world units per second. A negative value means no boost is applied.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Throw Velocity Boost Scale       | `ThrowVelocityBoostScale` | How much the throw speed should scale when this object is thrown fast enough, as a multiplier applied to the actual throw speed.<br/><br/>1 means no change, 2 means double the speed, 0.5 means half the speed, and so on.                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Outline Renderers[^2]            | `OutlineRenderers` | The array of renderers that are outlined when the pickup is hovered over. Only <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/ScriptReference/MeshRenderer.html">Mesh Renderers</UnityVersionedLink> and <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/ScriptReference/SkinnedMeshRenderer.html">Skinned Mesh Renderers</UnityVersionedLink> are supported. If no valid renderers are listed, the outlined renderers will be determined automatically.<br/><br/>You generally shouldn't need to change this unless your object contains "hidden" meshes that shouldn't be part of the outline. |

[^1]: When allowed, keyboard and mouse users can rotate held pickups with the I, J, K, L, U and O keys, while controller users can rotate pickups by holding L1 and moving the joysticks around.
[^2]: These properties also appear in the inspector for any UdonSharp behavior that implements the [Interact event](/worlds/udon/graph/event-nodes#interact). They work the same way on interactable objects as they do on pickups.

## Versions

![Pickup Version Dropdown in Inspector](/img/worlds/components/pickup_version.png)

You can select the version of VRCPickup you would like to use on the component. By default, the latest version is chosen when creating a new component.

VRChat recommends using the latest available version.

### Version 1.0

The base version of the VRCPickup component.

In this version, the Auto Hold property is a drop-down with the following choices:

- **Yes:** The pickup remains in the player's hand until either the grab or drop actions are triggered.
- **No:** The pickup is released once the initial Grab action is completed.
- **Sometimes:** Like "Yes" above, except it only applies to players using Keyboard, Mouse, Gamepad and Vive Wand inputs. This is an old type that should not be used in most cases.
- **Auto Detect:** Applies the same logic as "Sometimes" but also requires a Gun or Grip defined in order to AutoHold. This is an old type that should not be used in most cases.

### Version 1.1

The Auto Hold property is simplified to a checkbox - if checked, the item attaches to the player's hand when they first perform a "grab" action, and drops when they perform a second "grab" (or use a "drop" action they've mapped to their controller). If unchecked, the item drops as soon as the initial grab is released.

## Proximity Rules

The "Proximity" value defines from how far away your pickup will be grabbable. It is given in world units (meters) where the side-length of one default Cube equals 1 unit.

:::note

All the rules described in this section also apply to UdonBehaviours which have an `Interact` event, which also show a "Proximity" slider in the Inspector.

:::

There are 2 mechanisms of grabbing where the Proximity value will be in play:

### Raycast

If you are far away from a pickup, or you are not playing in VR, pickups will be highlighted if the "laser" coming out of your hands (VR) or your head (non-VR) intersects the collider on a pickup object. The distance calculation to compare against Proximity is different depending on whether you are in VR:

- VR: The distance in meters between the origin of the laser (i.e. your hand controllers) and the impact point on the collider
- Non-VR: The distance in meters between the origin of the laser (i.e. your head or main camera position) and the impact point on the collider, minus an "extra reach" value to compensate for being unable to move your hands forward. This is an approximate value that also takes your avatar scale into account ("longer arms"). Since it is subtracted from the distance, it will allow you to grab objects that are technically outside of the "Proximity" range, but could be grabbed by moving your arms while standing in this position in VR.

### Hover (VR only)

If your hands are close enough to an object, pickups will be highlighted even if a ray in the direction of the UI laser would not intersect the object. This allows more natural "grabbing" of objects. The distance of reach is a sphere centered on your hands with a radius of 0.4 meters times your avatar scale (note that this value is not directly comparable to the "avatar scaling" system available to users, although changing the avatar scale that way can affect the reach). 

- The "Proximity" value is still compared against the raw distance between your hand and the collider on the pickup, meaning the "reach distance" described is only an upper bound for the closeness at which "Hover" mode will engage.
- For example, setting the Proximity to 0 will require the hand to be _inside_ the collider for the pickup to be highlighted (it will still be grabbable when not in VR however, because of the "extra reach" that non-VR users get to compensate).
- As an advanced technique, you may want to adjust the Proximity value based on the data provided via the [avatar scaling system](/worlds/udon/players/player-avatar-scaling).

## Orientation Rules

A pickup can be held in one of three orientations assigned through the Orientation property.

When using the Gun or Grip orientations, it is recommended that the Exact Gun and Exact Grip transforms are child transforms of your pickup. Assigning a transform that is not a child or not assigning one at all is not recommended because it can lead to unexpected behavior.

### Any

The pickup can be freely held facing in any direction. This is the default behavior, and it requires no additional setup.

### Gun

When picked up, the pickup rotates so the +X of Exact Gun faces forwards (in the direction the player is aiming), and its +Z faces up.

This is useful for any pickup that you want to always be held in a specific orientation.

### Grip

Similar to Gun, except the orientation changes based on whether the grabbing player is in VR or not:

- In VR, the pickup rotates so the +X of Exact Grip faces forwards, and its +Z faces up. From there, it is then pitched forwards by 30 degrees.
- In non-VR, the pickup instead rotates so the +Z of Exact Grip faces forwards, and its +X faces down.

This has the effect of the object being held pointing roughly upwards in VR, but forwards in non-VR. This can be useful for pickups that need a specific orientation that differs between VR and non-VR. For example, a wand or similar object might be held across the palm by a VR player, but pointing directly forwards by a non-VR player.

## Udon API

`class VRC.SDK3.Components.VRCPickup`

You can read and control a pickup from Udon at runtime. To change a setting, use the Udon property listed in [Component Properties](#component-properties). The Udon names don't always match the inspector labels, so check the capitalization.

### Properties

These properties describe the pickup's current state and have no inspector equivalent.

| Name | Type | Summary |
| --- | --- | --- |
| currentPlayer | [VRCPlayerApi](/worlds/udon/players) | The player currently holding this pickup, or `null` if nobody is holding it. Read-only. |
| IsHeld | bool | Whether a player is currently holding this pickup. Read-only. |
| currentHand | PickupHand | Which hand is holding this pickup: `None`, `Left`, or `Right`. Read-only. |

### Methods

| Name | Returns | Summary |
| --- | --- | --- |
| Drop() | void | Forces the player currently holding this pickup to drop it. Does nothing if nobody is holding it. |
| Drop([VRCPlayerApi](/worlds/udon/players) instigator) | void | Forces the specified player to drop this pickup. |
| GenerateHapticEvent(float duration, float amplitude, float frequency) | void | Plays a haptic pulse on the controller holding this pickup. Does nothing in non-VR. In UdonSharp the three parameters are optional and default to `0.25`, `0.5` and `0.5`. In the Udon Graph there is only one node and all three inputs are required. |
| PlayHaptics() | void | Plays a haptic pulse using the default duration, amplitude, and frequency. Equivalent to calling `GenerateHapticEvent()` with no arguments. |

### Example

This pickup plays a haptic pulse when a player picks it up, and drops itself after five seconds.

Each pickup schedules its own delayed event, so a player who drops the pickup and grabs it again within five seconds causes two events to fire. The `_pendingDrops` counter makes sure only the most recent one drops the pickup.

```cs
using UdonSharp;
using UnityEngine;
using VRC.SDK3.Components;

public class BuzzyPickup : UdonSharpBehaviour
{
    private VRCPickup _pickup;

    void Start()
    {
        _pickup = GetComponent<VRCPickup>();
    }

    public override void OnPickup()
    {
        _pickup.PlayHaptics();
    }
}
```
