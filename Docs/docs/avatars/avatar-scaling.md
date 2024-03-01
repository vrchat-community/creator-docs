---
title: "Avatar Scaling"
slug: "avatar-scaling"
hidden: false
createdAt: "2023-07-26T15:58:00.000Z"
updatedAt: "2023-07-26T15:58:00.000Z"
---

# Technical Considerations around Avatar Scaling

Avatar scaling allows players to change the height of their current avatar.

This page documents how VRChat's avatar scaling works internally to the extent that may be useful for developing community resources around it.

Read the [Avatar Events documentation](/worlds/udon/players/player-avatar-scaling) documentation or our [example script](/worlds/examples/udon-example-scene/avatar-scaling-settings) to learn how to use avatar scaling with Udon. 
Read the [Avatar Parameters](/avatars/animator-parameters) page for available avatar parameters related to scaling.


## Term Definitions

* **Eye Height**: The height above 0 (Y component in transform position) of an avatar's viewpoint while in a T-Pose.
* **Prefab Height**: The eye height of an avatar when scaling is at its default value. This is what you configure in the SDK by placing the "View Position".
* **Target Eye Height**: The eye height an avatar wants to be scaled to, as set by either the player or Udon.
* **Avatar Scale**: The ratio between "Prefab Height" and "Target Eye Height". For example, if the target is 4.5 meters, and the prefab height is 1.5 meters, then "Avatar Scale" is 3.

## Range of Values

The "Prefab Height" is not limited. You can put your avatar's "View Position" at any height in the SDK. Note, however, that your overall avatar scale will affect your performance rank.

The "Target Eye Height" is clamped between 0.1 and 100 meters for Udon, and the usable range of scaling in your Action Menu goes from 0.2 to 5.0 meters. But by uploading an avatar that is outside this range and _not_ using the scale dial, you can still exceed those limits. In that case, "Target Eye Height" will match "Prefab Height," which is not limited.

This restriction means that Udon _must_ re-apply scales on "avatar eye height changed" events to fully enforce scale. Otherwise, users can switch to shorter or taller avatars to bypass the limits put in place by the world.

In worlds where scaling is disabled via the website, "Target Eye Height" will _always_ match "Prefab Height."

## How Scaling is Applied

Scaling an avatar works by changing the "localScale" of the avatar's root transform. **This scale is enforced**. There is no user-accessible way to override the scale of the root of an avatar other than the Udon functions relating to avatar scaling.

Whenever the scale is changed (i.e., whenever you switch avatars, or reset/reload your current one), the avatar is "remeasured" locally. This process adjusts your viewpoint to match the new height and repositions a few internal components, such as your voice position.

Scale is automatically synchronized for each player as "eye height", quantized to 3 decimal points. For remote users, scale changes are smoothed over a short period any time a new height is received.

While using the scale dial in your Action Menu, your avatar is only scaled in mirrors. When confirming the scale on the dial, the new scale will instantly be applied to your avatar and then sent to remote users.