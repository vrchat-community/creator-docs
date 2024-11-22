---
description: "Save and display high scores with PlayerData."
sidebar_custom_props:
    customIcon: 🏅
---
import HowToImportExample from '/docs/worlds/examples/persistence/_how-to-import.mdx';

# Leaderboard

![Leaderboard World Preview](/img/worlds/examples/persistence/leaderboard.jpg)

A leaderboard which uses PlayerData to persist and display high scores.

Visit the [Persistent Leaderboard Example World](https://vrchat.com/home/world/wrld_107de08b-0dfa-4ed1-a3d4-398c29616b4c) to try it for yourself!

## Using the Example

1. Open the Leaderboard scene.
2. Then enter Play Mode
3. Your name is on the leaderboard with a score of 0 score.
4. Jump and your score increases.
5. Exit and re-enter Play Mode. 
6. You are once again on the leaderboard, and your score was remembered from the previous session.

<HowToImportExample/>

## Technical Breakdown
There's a `Leaderboard` script where you can add any key you want players to be ordered by. Works with Float and Int. 

Then there's also a `LeaderboardSlot` script which is a RectTransform. This is a PlayerObject which means one will be created for each player joining. When the object is created it's automatically added to Scroll View defined by the Leaderboard. 

The Scroll View's content transform has a Vertical Layout Group which makes all children of it automatically sort by the order they are in the hierarchy. The Leaderboard script updates the position of the `LeaderboardSlot` in the hierarchy each time their persistent score changes.

---
## Changelog
- 0.0.2: Script tweaks: Use VRCEnablePersistence components on player objects