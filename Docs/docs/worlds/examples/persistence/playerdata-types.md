---
description: "Demonstrates data types supported by the PlayerData interface."
sidebar_custom_props:
    customIcon: 📃
---
import HowToImportExample from '/docs/worlds/examples/persistence/_how-to-import.mdx';

# Player Data Types

![Player Data Types World Preview](/img/worlds/examples/persistence/playerdata_types.jpg)

A barebones examples that demonstrates data types supported by the PlayerData interface. 

Visit the [Player Data Types Example World](https://vrchat.com/home/world/wrld_f9a960d5-c282-431a-bfd0-f9bd6f1158d6) to try it for yourself!

Supported data types include:

- bool
- byte
- byte[]
- int
- float
- double
- long
- short
- string
- sbyte
- uint
- ulong
- ushort
- Vector2
- Vector3
- Vector4
- Quaternion
- Color
- Color32

## Using the Example

In Client:

1. Enter the world
2. Click button “Set Test Data”
3. Observe the display updating with the test data

In Editor:

1. Open the `VRChat SDK > ClientSim Player Data` editor window
2. Observe the test data update here, as well, as you press the button in Play Mode
3. You can clear and re-set the test data
4. You can open the JSON file containing containing the test data, update it manually, and hit Refresh in the editor window to display the updated test data

<HowToImportExample/>

## Technical Breakdown

The `PlayerDataController` has a `SetTestData` method that sets some example player data, which is triggered from the button in the scene. 

It listens for updates to player data using the `OnPlayerDataUpdated` method. It checks if the local player’s data has changed, and if so, it grabs the new data and formats it as a readable string. This string includes details like the type of data (bool, int, string) and the value associated with the player’s unique ID.

The formatted data is then displayed on screen using a `TextMeshProUGUI component`.

The script includes a helper function, `PlayerDataToString`, that checks the type of the data stored under a specific key and converts it to a string so it can be displayed. This function supports all the Persistable data types.

If the player data type is not recognized, it outputs an error message indicating that the type is unknown.