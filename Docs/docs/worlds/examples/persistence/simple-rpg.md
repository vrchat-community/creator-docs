---
description: "Save RPG-like player classes and levels."
sidebar_custom_props:
    customIcon: ⚔️
---
import HowToImportExample from '/docs/worlds/examples/persistence/_how-to-import.mdx';

# Simple RPG

![RPG World Preview](/img/worlds/examples/persistence/simple-rpg.jpg)

This scene contains an example of a simple RPG experience where you can level up, change class, and defeat enemies.

## Using the Example

Open the scene or [visit the example world in VRChat](https://vrchat.com/home/world/wrld_32b82323-1d05-4ed4-9ac1-89b437223359) using the `persistence-beta` branch.

1. Open the scene RPGExample in the Assets/Examples/RPG folder.
2. Play the scene.
3. Choose a class by walking over the corresponding pedestal.
4. Once you've gained enough experience by killing enemies, you will level up. You can tell your level by the amount of diamonds above your head.
5. Rejoin the world.
6. When you load into the world, you should be teleported to your previous position and have your last selected class with the same level and experience.

<HowToImportExample/>

## Technical Breakdown

RPGPlayer is a script attached to a GameObject, which has the PlayerObject script on it, this means that the RPGPlayer script is instantiated once for each player.
RPGPlayer is what controls so you can see the diamonds above a players head indicating their class and level, this also is what makes it so you can see others weapon.

Then there are 3 different pedestals you can walk over, which, when triggered, will tell your own RPGPlayer instance to change its class.

The class, last position, experience, and level are all persistent by being UdonSynced and being on a VRCPlayerObject. Any UdonSynced variables that are on a script that is on a GameObject that is part of a PlayerObject are automatically persistent.

Combat is done using particle collisions, so each class has a different type of particle effect as an attack, which has a collider on it.
The enemies give 1 exp when killed, and you need 4 exp for leveling up.
Enemies respawn 10–15 seconds after being killed.

---
## Changelog
- 0.0.3: Added Instructions Canvas
- 0.0.2: Script tweaks: RPG Example uses `VRCEnablePersistence` components on player objects so that they persist again