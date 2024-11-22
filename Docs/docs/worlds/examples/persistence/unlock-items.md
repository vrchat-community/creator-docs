---
description: "Unlock items forever, using PlayerData."
sidebar_custom_props:
    customIcon: 🔒
---
import HowToImportExample from '/docs/worlds/examples/persistence/_how-to-import.mdx';

# Unlock Items

![Unlock Items World Preview](/img/worlds/examples/persistence/unlock_items.jpg)

How to persistently unlock items using PlayerData, using simple in-world achievements as a demo.

Visit the [Unlock Items Example World](https://vrchat.com/home/world/wrld_abe04fe4-583e-44d3-ae89-29bc9f60d166) to try it for yourself!

## Using the Example

1. Enter the world
2. Perform actions to unlock achievements
   - Spend time in the world (10sec,2min, 5min)
   - Move around (10 units, 100 units, 300 units)
   - Respawn
   - Find the secret
   - All of the above
3. Observe the UI showing your unlocked achievements
4. Leave and return - your achievements and stats (time spent in world, distance travelled) should persist

<HowToImportExample/>

## Technical Breakdown

The main `UnlockItems` script checks for the local player's achievements when their data first loads in during the `OnPlayerRestored` method, and restores all the unlocked items that are found.

It then triggers the `UpdateStats` method to run, which runs the following methods:

* CheckTimeInWorld();
* CheckDistanceMoved();
* CheckHasPlayerRespawned();
* CheckHasFoundSecret();
* CheckAllAchievementsUnlocked();

After all methods are run and achievements updated, this method calls itself to run again after a delay of `UPDATE_STATS_TIME`.

For each achievement that is unlocked during the `UpdateStats` check, the `UnlockAchievement` method is called, which updates the sprite, color and text of the target achievement.