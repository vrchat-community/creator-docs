---
title: "VRC Pickup"
slug: "vrc_pickup"
hidden: false
createdAt: "2017-07-06T00:55:36.747Z"
updatedAt: "2023-05-04T21:43:45.162Z"
---
Allows objects to be picked up, held and used by players.

## Versions

![Pickup Version Dropdown in Inspector](/img/worlds/components/pickup_version.png)

You can now select the version of VRCPickup you would like to use directly on the component. By default the latest version will be chosen when creating a new component. Existing pickups will continue to use their previous version unless they are updated and their world re-uploaded.

Version 1.0:

The base version of the VRCPickup component.

Version 1.1:

The Auto Hold property has been simplified to a checkbox - if checked, the item will attach the player's hand when they first perform a "grab" action, and drop when they perform a second "grab" (or use a "drop" action they've mapped to their controller). If unchecked, the item will be dropped as soon as the initial grab is released.

## Proximity Rules

:::note

All of the rules described in this section also apply to "Interactables", i.e. UdonBehaviours that have an `Interact` event (they will also show a "Proximity" slider in the Inspector).
:::

The "Proximity" value defines from how far away your pickup will be grabbable. It is given in meters, aka. "Unity units", where the side-length of one default Cube equals 1 unit.

There are 2 mechanisms of grabbing where the Proximity value will be in play:

- **Raycast:** If you are far away from a pickup, or you are running in desktop mode, pickups will be highlighted if the "laser" coming out of your hands (in VR) or your head (desktop) intersects the collider on a pickup object. The distance calculation to compare against Proximity is different in VR and Desktop mode:
    - VR: The distance between the origin of the laser (i.e. your hand controllers) and the impact point on the collider, in meters
    - Desktop: The distance between the origin of the laser (i.e. your head or main camera position) minus an "extra reach" value to compensate for being unable to move your hands forward. This is an approximate value that also takes your avatar scale into account ("longer arms"). Since it is subtracted from the distance, it will allow you to grab objects that are technically outside of the "Proximity" range, but could be grabbed by moving your arms while standing in this position in VR.
- **Hover (VR only):** If your hands are close enough to an object, pickups will be highlighted even if a ray in the direction of the UI laser would not intersect the object. This allows more natural "grabbing" of objects. The distance of reach is a sphere centered on your hands with a radius of 0.4 meters times your avatar scale (note that this value is not directly comparable to the "avatar scaling" system available to users, although changing the avatar scale that way can affect the reach). 
    - The "Proximity" value is still compared against the raw distance between your hand and the collider on the pickup, meaning the "reach distance" described is only an upper bound for the closeness at which "Hover" mode will engage.
    - For example, setting the Proximity to 0 will require the hand to be _inside_ the collider for the pickup to be highlighted (it will still be grabbable in Desktop mode however, because of the "extra reach" desktop users get to compensate).
    - As an advanced technique, you may want to adjust the Proximity value based on the data provided via the [avatar scaling system](/worlds/udon/players/player-avatar-scaling).

## Requires:

- Rigidbody
- Collider

| Parameter | Description |
| - | - |
| Momentum Transfer Method         | This defines how the collision force will be added to the other object which was hit, using Rigidbody.AddForceAtPosition.<br />Note: the force will only be added if 'AllowCollisionTransfer' is on. |
| Disallow Theft                   | If other users are allowed to take the pickup out of someone else's grip |
| Exact Gun                        | The position object will be held if set to Exact Gun |
| Exact Grip                       | The position object will be held if set to Exact Grip. |
| Allow Manipulation When Equipped | Should the user be able to manipulate the pickup while the pickup is held if using a controller? |
| Orientation                      | What way the object will be held. |
| Auto Hold                        | Should the pickup remain in the user's hand after they finish the Grab action?.<br />- Yes: The pickup remains in the user's hand until either the grab or drop actions are triggered.<br />- No: The pickup is released once the initial Grab action is completed. <br /><br />- Sometimes: Like "Yes" above, except it only applies to users using Keyboard, Mouse, Gamepad and Vive Wand inputs. This is an old type which should not be used in most cases.<br />- Auto: Applies the same logic as "Sometimes" but also requires a Gun or Grip defined in order to AutoHold.  This is an old type which should not be used in most cases<br /> |
| Use Text                         | Text that appears when the user has an object equipped, prompting them to "fire" the object.<br />Requires "Auto Hold" to be set to "Yes". |
| Throw Velocity Boost Min Speed   | How fast the object needs to move to be thrown. |
| Throw Velocity Boost Scale       | How much throwing should scale. Higher = faster thrown while lower means slower throw speed. |
| Pickupable                       | Can you pick up the pickup? |
| Proximity                        | The maximum distance this pickup is reachable from. See section above for more details. |