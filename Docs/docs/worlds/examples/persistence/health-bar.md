---
description: "Save player health amounts in a PlayerObject."
sidebar_custom_props:
    customIcon: 💗
---
import HowToImportExample from '/docs/worlds/examples/persistence/_how-to-import.mdx';

# Health Bar

![Health Bar World Preview](/img/worlds/examples/persistence/health-bar.jpg)

A simple health bar which uses a PlayerObject to sync and persist players' health amounts.

Visit the [HealthBar Persistence Example World](https://vrchat.com/home/world/wrld_012ab69b-74d8-439a-ae13-db42478d8680) to try it for yourself!

## Using the Example

1. Open the HealthBar_ExampleScene.
2. Run it in the editor or Build & Test.
3. Walk over to the red 'lava' and stand in it.
4. Look directly up to see your health bar, which will be shrinking as you continue to stand in the lava.
5. Exit the lava, take note of your health bar, and rejoin the world.
6. Your health will be restored to its previous level. Note that if you let your health bar run out entirely, you will respawn and your health will be restored to its full amount.

<HowToImportExample/>

## Technical Breakdown
The lava stores a reference to the local player's health bar. Upon entering the trigger, it will start damaging the player through the health bar's `TakeDamage` function (which should only be called on the local client).

### Inspector Parameters

You can customize the prefabs by changing their parameters:

#### HealthBar

* `float` **MaxHealth** - The player's maximum health.
* `Vector3` **Offset Above Head** - The distance of the health bar above the player's head.
* `Slider` **Health Bar Slider** - The UI slider that shows the player's health.

#### Lava

* `float` **Damage per second** - The damage per second that the lava deals to players touching it.

---
## Changelog
- 0.0.1 - Initial Version
- 0.0.2 - Added in-world UI, thumbnail, published world