---
description: "Save and restore player positions using PlayerObjects."
sidebar_custom_props:
    customIcon: 📌
---
import HowToImportExample from '/docs/worlds/examples/persistence/_how-to-import.mdx';

# Position Sync

![Position Sync World Preview](/img/worlds/examples/persistence/position-sync.png)

A simple PlayerObject prefab which saves each player's position and rotation, then restores them when they rejoin the world.

Visit the [PositionSync Example World](https://vrchat.com/home/world/wrld_7be7b189-7ac8-4cf1-8d0a-1b7743edcacc) to try it for yourself!

## Using the Example

In the VRChat Client:
1. Join the world, move to a spot away from the Spawn point.
2. Rejoin  the world, you should be around the same position and rotation.

In the Unity Editor:
Add the prefab: `PositionSync` to the scene, and done.

<HowToImportExample/>

## Technical Breakdown

If you are standing on the ground, the script will save your position and rotation every 0.5 seconds. Upon receiving the persistent data from the server, it will return you to the position you originally found yourself in.


### Inspector Parameters

* `string` **Synced Position key** - The key name for the position you want to use from PlayerData.
* `string` **Synced Rotation key** - The key name for the rotation you want to use from PlayerData.

---
## Changelog

- 0.0.1: Initial Publish
- 0.0.2: Added in-world instructions, swapped to OnPlayerRestored.