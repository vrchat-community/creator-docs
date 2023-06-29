---
title: "Player Avatar Scaling"
slug: "player-avatar-scaling"
hidden: false
createdAt: "2023-06-22T01:23:45.678Z"
updatedAt: "2023-06-22T01:23:45.678Z"
---
Udon provides functions allowing world creators to
- Permit or enforce avatar scaling features and parameters.
- React to changes in player height.

To see relevant events to use in concert with these functions, including "OnAvatarChanged" and "OnAvatarEyeHeightChanged", see [Avatar Events](/worlds/udon/avatar-events)

:::note Scaling and collision
Please note that scaling an avatar to another size does **not** affect its collision with the environment -- just as uploading an avatar that you've scaled up in Unity would not do so.
:::

Avatar Scaling operates in two modes and can be adjusted individually on a player-by-player basis:

1. A player-controlled mode, where the player is allowed to utilize a radial puppet in their action menu or a "Match Eye Height" button in their quick menu to adjust their own height.
2. A world-authoritative mode where these features are disabled, and player heights can only be set by an Udon program running in the world.

In either case, avatar changes and eye height changes will fire "OnAvatarChanged" and "OnAvatarEyeHeightChanged" events so that an Udon program can react to these occurrences.

:::note World-authoritative by default

Currently, avatar scaling is operating in the world-authoritative mode by default. If you wish to operate in the player-controlled mode, you must enable it on the website or with the Udon functions below.

:::

## Enabling player-controlled scaling via the website
If you simply wish to enable player-controlled scaling in your world but don't want to dip into Udon and reupload it, you can simply log into the [My Worlds section of the VRChat Website](https://vrchat.com/home/content/worlds), select your world, toggle it on, and save your changes.

![It's really easy!](/img/worlds/udon/website_avatar_scaling_enabled.png)

## Functions for player-controlled scaling
:::note Local player only
Unless otherwise stated, all of the functions below can only be used by an Udon program affecting the local player and cannot be called on a `VRCPlayerApi` object belonging to another player successfully.
:::

### GetManualAvatarScalingAllowed
Checks if the local player is allowed to control their avatar scale.

**Output**
- `bool`: `true` if the local player is in the player-controlled avatar scaling mode, or `false` if they're in the world-authoritative avatar scaling mode.

### SetManualAvatarScalingAllowed
Toggles between player-controlled and world-authoritative scaling modes.

**Input**
- `bool`: `true` sets the player-controlled mode, and `false` sets the world-authoritative mode.

### GetAvatarEyeHeightMinimumAsMeters

Returns the minimum eye height in meters that the local player is permitted to scale themselves to in the player-controlled avatar scaling mode. (Greater than or equal to 0.2 meters.)

**Output**
- `float`: The minimum eye height in meters.

### SetAvatarEyeHeightMinimumByMeters
Sets the minimum height in meters that the local player is permitted to scale themselves to in the player-controlled avatar scaling mode. (Must be greater than or equal to 0.2 meters.)

**Input**
- `float`: Sets the minimum avatar eye height in meters.

### GetAvatarEyeHeightMaximumAsMeters

Returns the maximum eye height that the local player is permitted to scale themselves to in the player-controlled avatar scaling mode. (Less or equal to 5 meters )

**Output**
- `float`: The maximum avatar eye height in meters.

### SetAvatarEyeHeightMaximumByMeters
Sets the maximum eye height in meters that the local player is permitted to scale themselves to in the player-controlled avatar scaling mode. (Must be less or equal to 5 meters.)

**Input**
- `float`: Sets the maximum eye height in meters.

## Functions for world-authoritative scaling

:::note Local player only
Unless otherwise stated, all of the functions below can only be used by an Udon program affecting the local player and cannot be called on a `VRCPlayerApi` object belonging to another player successfully.
:::

### GetAvatarEyeHeightAsMeters

Returns the configured eye height for the target player's avatar. This function works for the local player **and** remote players.

**Output**
- `float`: The configured eye height for the target player's avatar.

### SetAvatarEyeHeightByMeters

**Input**
- `float`: Sets the eye height in meters for the current player avatar.

### SetAvatarEyeHeightByMultiplier

**Input**
- `float`: Sets the eye height as a multiple of the target player's avatar eye height at its prefab scale.
