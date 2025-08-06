# Networking Specs & Tricks

Networking in Udon can be challenging! Try to keep things simple until you're more experienced.

## Specs
### Bandwidth limits

:::note

Note: All specs subject to change. You can see some specific information about the data used per-object in [Debug Menu 6](/worlds/udon/world-debug-views/#debug-menu-6).

:::

- Udon scripts can send out about **11 kilobytes** per second.
- Udon scripts with manual sync are limited to roughly **280,496 bytes** per serialization.
- Udon scripts with continuous sync are limited to roughly **200 bytes** per serialization.

If a world exceeds limits, its networking will become clogged (see [IsClogged](/worlds/udon/networking/network-components/#networking-properties)). This has a different effect depending on the sync type of the UdonBehaviour:
* Continuous behaviours will fail to raise the network event and write errors in the logs.
* Manual behaviours will cache the event and try again. 
In both cases, the logic of the UdonBehaviour will continue to work, but the data will not be sent nor received.

Try designing your scripts in ways that reduce the amount of networking required. For example: If an object will move on a fixed or predictable path, then its position may not need to be synchronized. Instead, its initial location, velocity, and time of departure may be sufficient.

### Continuous synchronization

Continuous synchronization is intended for data that changes frequently and where intermediary values don't matter, like the position of an erratically moving transform. VRChat performs intermediary value approximation to recover lost data, and will attempt to optimize network data for continuous synchronization.

Continuous sync is limited to roughly 200 bytes per serialization.

### Manual synchronization

Manual synchronization is good for variables that update infrequently, but quickly, and where intermediary values matter. For example, positions of pieces on a chess board should be synced manually.

Each manually-synced object is rate limited as a factor of the data size. The more it sends, the more its send rate is limited. Scripts can call RequestSerialization as often as they want, but Udon will wait until enough time has passed before calling OnPreSerialization, sending the data, and calling OnPostSerialization with the result.

Manual sync is limited to **280,496 bytes** per serialization.

## Synced Variables
These variables are available for syncing across the network.

:::note
In the lists below, 'size' refers to the **approximate** size in memory. When networked, the data is serialized, which may lead to more data being transmitted. For example, syncing a `bool` will send **at least** 1 byte of data (instead of 1 bit) in addition to any networking overhead.
To find out how many bytes of serialized data were, use `byteCount` in the [`OnPostSerialization`](/worlds/udon/networking/network-components/#onpostserialization) event.
:::

### Boolean  types
| Type | Size    |
| ---- | ------- |
| bool | 1 byte  |
### Integral numeric types
| Type   | Range                           | Size    |
|--------|---------------------------------|---------|
| sbyte  | -128 to 127                     | 1 byte  |
| byte   | 0 to 255                        | 1 byte  |
| short  | -32,768 to 32,767               | 2 bytes |
| ushort | 0 to 65,535                     | 2 bytes |
| int    | -2,147,483,648 to 2,147,483,647 | 4 bytes |
| uint   | 0 to 4,294,967,295              | 4 bytes |
| long   | -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807 | 8 bytes |
| ulong  | 0 to 18,446,744,073,709,551,615 | 8 bytes |
### Floating-point numeric types
| Type   | Approximate range             | Precision     | Size    |
|--------|-------------------------------|---------------|---------|
| float  | ±1.5 x 10^(−45) to ±3.4 x 10^(38)   | ~6-9 digits   | 4 bytes |
| double | ±5.0 × 10^(−324) to ±1.7 × 10^(308) | ~15-17 digits | 8 bytes |
### Vector mathematics types and structures (Unity)
| Type        | Range         | Size     |
|-------------|---------------|----------|
| [Vector2](https://docs.unity3d.com/ScriptReference/Vector2.html)   | same as float | 8 bytes  |
| [Vector3](https://docs.unity3d.com/ScriptReference/Vector3.html)   | same as float | 12 bytes  |
| [Vector4](https://docs.unity3d.com/ScriptReference/Vector4.html)   | same as float | 16 bytes |
| [Quaternion](https://docs.unity3d.com/ScriptReference/Quaternion.html)| same as float | 16 bytes  |
### Color structures
| Type     | Range / Precision | Size    |
|----------|-------------------|---------|
| [Color](https://docs.unity3d.com/ScriptReference/Color.html)  | same as float     | 16 bytes |
| [Color32](https://docs.unity3d.com/ScriptReference/Color32.html)| same as byte      | 4 bytes |
### Text types and structures
| Type   | Range            | Size           |
|--------|------------------|----------------|
| char   | U+0000 to U+FFFF | 2 bytes        |
| string | same as char     | 2 bytes / char |
### Other structures
| Type   | Range            | Size           |
|--------|------------------|----------------|
| [VRCUrl](#vrcurl) | U+0000 to U+FFFF | 2 bytes / char |


---

If you have multiple UdonBehaviours on an object, the sync method will default to the most restrictive settings - a Manual UdonBehaviour and a Continuous one on the same object will both act as manual.

### Prioritization of visible objects

Udon's networking prioritizes synchronized game objects that are currently visible to the local user.

Udon *periodically* checks the visibility of all mesh renderer children of synchronized objects. This is used in the quality of service behaviour of Udon's network load balancing.