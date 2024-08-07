# Networking Specs & Tricks

Networking in Udon can be challenging! Try to keep things simple until you're more experienced.

## Specs
### Bandwidth limits

:::note

Note: All specs subject to change. You can see some specific information about the data used per-object in [Debug Menu 6](/worlds/udon/world-debug-views/#debug-menu-6).

:::

- Udon scripts can send out about **11 kilobytes** per second.
- Udon scripts with manual sync are limited to roughly **64690 bytes** per serialization.
- Udon scripts with continuous sync are limited to roughly **200 bytes** per serialization.

If a world exceeds limits, its networking will become clogged (see [IsClogged](https://creators.vrchat.com/worlds/udon/networking/network-components/#networking-properties)). The UdonBehaviour will fail to raise the network event and write errors in the logs. The logic of the UdonBehaviour will continue to work, but the data will not be sent nor received.


Try designing your scripts in ways that reduce the amount of networking required. For example: If an object will move on a fixed or predictable path, then its position may not need to be synchronized. Instead, its initial location, velocity, and time of departure may be sufficient.

### Continuous synchronization

Continuous synchronization is intended for data that changes frequently and where intermediary values don't matter, like the position of an erratically moving transform. VRChat will perform intermediary value approximation to recover lost data, and will attempt to optimize network data for continuous synchronization.

Continuous sync is limited to roughly 200 bytes per serialization.

### Manual synchronization

Manual synchronization is good for variables that are updated frequently, but quickly. It is intended for data that changes infrequently and where intermediary values matter; like the positions of pieces on a chess board.

Each manually-synced object is rate limited as a factor of the data size. The more it sends, the more its send rate is limited. Scripts can call RequestSerialization as often as they want, but Udon will wait until enough time has passed before calling OnPreSerialization, sending the data, and calling OnPostSerialization with the result.

Manual sync is limited to **280,496 bytes** per serialization.

---

If you have multiple UdonBehaviours on an object, the sync method will default to the most restrictive settings - a Manual UdonBehaviour and a Continuous one on the same object will both act as manual.

