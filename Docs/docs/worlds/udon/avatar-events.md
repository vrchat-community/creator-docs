# Avatar Events

These events allow Udon to react to changes regarding player avatars.

## OnAvatarChanged

Returns `VRCPlayerApi` object for the instigating player. Called when a player's avatar has finished loading.

### Persisted eye heights
Players will sync any variance from their prefab eye height after their avatar loads, triggering an `OnAvatarEyeHeightChanged` event.

If the `VRCPlayerApi` object is for the local player, retrieving its eye height will return the prefab height during this event.

If the `VRCPlayerApi` object is for a remote player, be aware that the remote player may not have synced their new eye height yet, and you should not rely on the returned value in this case.

## OnAvatarEyeHeightChanged

Returns a `VRCPlayerApi` object for the instigating player and a `float` describing their previous or previously synced eye height in meters. Called when a player has their eye height change via switching to another avatar or via the [avatar scaling system](/worlds/udon/players/player-avatar-scaling).

### First avatar load
When a local or remote user joins a world, the first previous eye height value received for that user may be `0`.

### Avatar changes, remote players, and event ordering
When a **local** user changes their avatar and applies a persisted eye height (if they have one saved that differs from their prefab height), this event should only execute for their persisted height.

When a **remote** user changes their avatar and applies a persisted eye height (if they have one saved that differs from their prefab eye height), this event may execute more than once. 

For remote players, you will receive this event every time a new eye height is synced to you by the remote player. This means that you could receive an `OnAvatarEyeHeightChanged` event prior to an `OnAvatarChanged` event, but you should not receive `OnAvatarEyeHeightChanged` events out of order.


:::note More Info

See [Player Avatar Scaling](/worlds/udon/players/player-avatar-scaling) for more info about this feature.

:::