---
title: "Avatar Events"
slug: "avatar-events"
hidden: false
createdAt: "2023-06-22T01:23:45.678Z"
updatedAt: "2023-06-22T01:23:45.678Z"
---
These events allow Udon to react to changes regarding player avatars.

## OnAvatarChanged

Returns `VRCPlayerApi` object for the instigating player. Called when a player's avatar has finished loading.

## OnAvatarEyeHeightChanged

Returns `VRCPlayerApi` object for the instigating player and a `float` describing their new eye height in meters. Called when a player has their eye height change via switching to another avatar or being scaled. 

For more information on scaling player avatars, see [Player Avatar Scaling](/worlds/udon/players/player-avatar-scaling).