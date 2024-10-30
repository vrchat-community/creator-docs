---
description: "Basic lobby functionality."
sidebar_custom_props:
    customIcon: 🚪
---
import HowToImportExample from '/docs/worlds/examples/_how-to-import.mdx';

# Player Join Zones

![Player Join Zones World Preview](/img/worlds/examples/player-join-zones.png)

This example shows how to collect players based on their position, and handle basic lobby functionality, enabling users to join a game, play it, see results, then start a new game. It can be used to build opt-in experiences, like a game played by only some of the players in the instance. It also shows how to randomly choose a player to make larger, and extend the prefab’s logic with additional modes.

Visit the [Player Join Zones Example World](https://vrchat.com/home/world/wrld_12492ad5-ff17-445d-9f90-7b14376b1f32) to try it for yourself!

## Using the Example

These examples work with one player, but benefit from testing with two or more.
Open the `player-join-zones` scene to first test it out in the Unity Editor, or visit the example world linked above in the VRChat Client.
This example requires TextMeshPro, a window will offer to "Import TMP Essentials" if you don't already have TextMeshPro in your project. Accept this offer and re-open the scene after it's done importing.

### Player Join Zone:
1. First, notice that the button at the bottom of the canvas reads "Players Needed", and is not interactable. 
2. Walk into the highlighted area on the floor and see your displayName appear on the board in front of it. 
3. Your name should appear and disappear as you walk in and out of the zone. 
4. Press the "Start Game" button to lock-in the list of players, it will no longer change as players enter and exit.
5. Press the button that now reads "Reset", and the list of players clears to make a new one.

### Boss Picker:
1. Walk into the highlighted area on the floor and see your displayName appear on the board in front of it under the label "Possible Bosses:". 
2. Your name should appear and disappear as you walk in and out of the zone. 
3. Press the "Start Game" button to randomly choose one Player to make large, they are now the "Boss". Notice that the label reads "Boss:" instead of "Possible Bosses:".
4. Press the button that now reads "Reset", the Boss should shrink to their original size and the list of players clears to make a new one.

<HowToImportExample/>

## Technical Breakdown

This section explains the base program and its two extensions - `JoinZoneWithDisplay` and `BossPicker`.

The `PlayerJoinZone` program is a base class for managing Players within a specific zone. It handles the following:
* **Modes**: It defines three modes - `MODE_JOIN` accepts changes to the player list, `MODE_GAME` freezes the player list for gameplay, and `MODE_END` offers a place to show end-of-game information. This mode is synced to all players, and uses a [FieldChangeCallback](https://udonsharp.docs.vrchat.com/udonsharp/#fieldchangecallback) to call additional functionality when the mode is changed.
* **Player Tracking**: It uses three events to track players, adding them to a [DataList](/worlds/udon/data-containers/data-lists) called `Players`.
    * `OnPlayerTriggerStay` detects players entering the zone, as well as players who were in the zone when the mode was changed.
    * `OnPlayerTriggerExit` detects players leaving the zone.
    * `OnPlayerLeft` detects players leaving the instance, who may otherwise get 'stuck' in the list.
* **Interaction**: It has a method `_ToggleMode` designed to be triggered from a UI Button. This method will toggle between the three modes when anyone presses it.

Example Interaction:
1. The zone sets the mode to `MODE_JOIN`, which triggers the Owner of the GameObject with this program to run `ResetPlayers()`.
    1. `ResetPlayers()` creates a new `Players` Datalist on the Owner.
2. A player "Dingbat" enters the zone's collider, triggering the `OnPlayerTriggerStay` event for everyone in the instance.
    1. The Owner checks whether Dingbat is already in the list, everyone else ignores the trigger. Dingbat is not found in the list, so the Owner adds them.
    2. Dingbat will continue to trigger this event as they stay in the zone, but no further action will be taken since they are already in the Datalist.
3. A player "SquirrelFam" enters the zone's collider, triggering the above action again, so there are now two players in the `Players` Datalist.
4. Dingbat decides to play a different game and leaves the instance.
5. The zone receives the `OnPlayerLeft` event for Dingbat, and removes them from the `Players` Datalist, now only SquirrelFam remains.
6. SquirrelFam exits the zone, triggering the `OnPlayerTriggerExit` event, which the Owner will respond to by removing them from the Datalist. There are no more players in the Datalist.

### Extending the Class

In the interaction described above, the `Players` list was created and updated several times, but no information was shown to any users in the instance. This is because the base class contains logic which is useful for many scenarios, but is incomplete on its own. We include two extensions of this base class to demonstrate how you can add functionality.

#### JoinZoneWithDisplay

This extension connects some UI fields and a button to the core logic to make it all usable. The base class doesn't contain any references to UI items so that it can be more easily reused and extended in your own projects.

It includes these UI objects:
* _playerNamesField: A Textfield to display the names of all players currently in the Zone.
* _buttonLabelField: The Textfield within the Button is used to toggle the current `Mode`, which is updated whenever the Mode changes.
* _toggleButton: A UI Button to trigger the `_ToggleMode` method.
* _ownerField: A Textfield which shows the owner of this GameObject for debugging.

This class adds a new string `PlayerNamesString`, which is a line of text containing all the current player names with commas between them. This is constructed on the Owner and then Synced to all other players and uses a FieldChangeCallback to update the `_playerNamesField`. It also adds a new mode called `MODE_WAIT` which freezes the UI Button for 3 seconds to keep the 'game' from ending too quickly. The duration can be set in the Inspector field for `_waitDuration`.

Revisiting the Example Interaction for the `PlayerJoinZone` program above, here is what would happen differently when using the `JoinZoneWithDisplay` program:
1. After creating the `Players` Datalist, the method `OnPlayersChanged()` is called. This method is empty in the base class, but in our extension it will set the synced string `PlayerNamesString` by running the method `GetPlayersAsStringList()` from the base class. 
    1. All the players in the instance receive this updated string, and set the text in their `_playerNamesField` from the value.
    1. Each player will also call `SetupButtonFromPlayers()`, which will update the text of their `_toggleButton` to show "Players Needed" if no one is in the zone.
2. After the Owner adds Dingbat to the `Players` Datalist, the method `OnPlayersChanged()` is triggered again, which will propagate the same changes above, updating the synced `PlayerNamesString` value and triggering updates the text field and button label if needed.

Every change the Owner makes to the `Players` list is followed by a call to `OnPlayersChanged()` to update the data and display it for everyone else in the instance.

This example also has a Button to toggle the mode like this:
1. Any player presses the Button, which has been linked to `UdonBehavior.SendCustomEvent(_ToggleMode)`. If they are not the owner, then the event `ToggleModeRPC()` will be sent to the Owner. If they are the owner, then they will call `ToggleModeRPC()` themselves. Either way, that method runs and flips switches to the next `Mode`.
2. `Mode` is a synced variable with a FieldChangeCallback, so its value will be updated for everyone in the instance, and the function `OnModeChanged()` will be run locally for each player.
3. This method is mostly empty in the base class (it only contains logic to propagate its logic to external listeners), but in this example, it will set the label of the `_toggleButton` to "Reset" if the mode is now `MODE_CHOSEN`.

All the text set by this class is defined in a few strings near the top of the class for easy updating.

#### BossPicker

This extension has some of the same fields as [JoinZoneWithDisplay](#joinzonewithdisplay), adds logic to pick one player from the chosen group and apply some scaling to them, which is useful if you're making a game where one character should be bigger than the others. It also adds another Mode called `MODE_GAMEOVER` for reviewing scores.

It includes a synced `PlayerNamesString` field and uses the same logic to create the list, sync it to all players in the instance, and update the text field. 

When the `Mode` is changed to `MODE_CHOSEN`, the Owner chooses one Player from the Datalist at random, and saves their PlayerId as `_bossPlayerId`, which is a new synced field with a FieldChangeCallback that triggers `_OnBossChanged()`.
In `OnBossChanged()`, each player will check if they are the Boss. If they are, then they will set their AvatarEyeHeight to the maximum possible size (currently 5 units). All other players will only have their height changed if it is bigger than `_maxPlayerHeight`, which can be adjusted in the program's Inspector.
The `ToggleModeRPC()` method has been overridden in this class in order to handle the new Mode. Now, `MODE_CHOSEN` will start a timer to automatically transition to `MODE_END` after 5 seconds, or whatever value you've set for `gameDuration` in the Inspector. This method also disables the button while in the `MODE_CHOSEN` state so the game can't be ended early. Finally, it has logic to transition from `MODE_END` to `MODE_JOIN` when the UI button is pressed.
In `OnModeChanged()`, each player resets to their original height when the mode changes back to `MODE_JOIN`, which would typically happen after a game finishes and a new round is opened up.

### Integration with Udon Graph & Existing Programs

Each of these programs has a `targets` field, which is an array of UdonBehaviours. You can write / modify Udon Programs to include some special variables which will be kept up-to-date. They are:
* `int` Mode - updated during `OnModeChanged()` in all programs
* `Datalist` Players - updated during `OnPlayersChanged()` in all programs
* `int` BossPlayerId - updated during `OnBossChanged()` in the BossPicker program

The "Graph Listener" canvas demonstrates this, updating a display with the latest events and updates from both programs. Its Udon Graph program simply implements all three public variables, and used `OnVariableChanged` nodes to react to their changes, writing the results to a text field.