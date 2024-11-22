---
description: "Save points & upgrades in a simple Idle Game."
sidebar_custom_props:
    customIcon: 👆
---
import HowToImportExample from '/docs/worlds/examples/persistence/_how-to-import.mdx';

# Persistent Idle Game

![Persistent Idle Game World Preview](/img/worlds/examples/persistence/persistent-idle-game.png)

This scene implements a simple [idle game](https://en.wikipedia.org/wiki/Incremental_game) that uses PlayerData to save the points and auto-clicker count for each player.

Visit the [Persistent Idle Game Example World](https://vrchat.com/home/world/wrld_42ba5f54-7fab-4f3a-8fc3-8d2f2ccbb33e) to try it for yourself!

## Using the Example
Load the scene and tweak the Udon values on the "IdleGame" object to your liking.
Play the scene, click the button to collect cheese, buy auto-clickers, leave play mode, and observe that the values are saved under their respective keys in the ClientSim PlayerData window.

<HowToImportExample/>

## Technical Breakdown
The main script is `IdleGame.cs`. It handles the gameplay, saving, and loading.
The only other script, `IdleGameButton.cs` communicates the player's button click to the main script.

Whenever the player clicks the button, they gain one point. The script saves the points in PlayerData using the `POINTS_KEY` string value.

Similarly, when the player buys an auto-clicker, they gain one auto-clicker and lose points. The script saves the amount of autoclickers using the `AUTOCLICKERS_KEY` string value.

The script gives the player one point per second for every auto-clicker. The price of the auto-clickers is multiplied by a fixed amount for every purchased auto-clicker.

Reloading the scene loads the points and auto-clicker value using `POINTS_KEY` and `AUTOCLICKERS_KEY` and calculates the auto-clicker price.

---
## Changelog
- 0.0.2: Script tweaks: The code uses OnPlayerRestored to load player data