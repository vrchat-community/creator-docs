# PlayerData Editor

ClientSim can simulate the VRChat SDK's "Persistence" feature. The PlayerData editor window allows you to debug persistent data in your world. You can open it by going to "VRChat SDK" > "ClientSim PlayerData".

## Usage

![ClientSim PlayerData Window](/img/worlds/clientsim/clientsim-player-data-window.png)

1. A dropdown for selecting which player's PlayerData to display.
	* By default, the local player is selected.
	 * If a remote player has been spawned in Play Mode, they can be selected as well.
2. The list of selected player's PlayerData keys, values, and data types.
	* The display updates in real-time as PlayerData is updated.
3. "Clear All PlayerData" deletes all PlayerData for the current scene.
	* For example, this allows you to "start over" if you change how your world uses PlayerData.
4. "Refresh" allows you to refresh the PlayerData list.
	* You can manually view or edit the scene's JSON file. The changes apply immediately while in Play Mode, but you must click the "Refresh" button to see the changes.
5. "Open Local Data Folder" opens the folder where ClientSim stores JSON files for this scene's persistent data.
	* If your scripts use PlayerData, ClientSim automatically creates the JSON files. They're saved in your project and persist between Play Mode sessions.
	* PlayerData files are unique to scenes. Each scene using PlayerData will have a JSON file associated with it. The scene name is used for this association: If you rename a scene and want to keep your data, you must rename the corresponding JSON file to match the new scene name. 
7. "Add Test Data For Remote Player" allows you to create PlayerData for remote players.
	* This button is only displayed while a remote player is selected in Play Mode and the local player has data.
	* Since PlayerData can only be set for the local player, this button duplicates the local player's test data JSON file and randomizes each value. The assumption here is that the structure of PlayerData should be consistent between players, but values can be different.
	* Creating test data like so posts the corresponding OnPlayerDataUpdated events and allows creators to verify that their world handles data updates between multiple players correctly.
	* The remote player's data is randomized every time you click the button.

The data for PlayerData can be found in the root of your project (next to the Assets folder, not inside of it) in `<root>/ClientSimStorage/PlayerData`.