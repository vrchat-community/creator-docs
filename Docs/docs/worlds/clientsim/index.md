---
sidebar_position: 0
---

# ClientSim

![ClientSim screenshot. The Scene view shows the local player and a remote player. The Game view shows ClientSim's "Pause" menu, with buttons to respawn the player, spawn remote players, close the menu, and various other options. The ClientSim Settings window and PlayerData window are also visible.](/img/worlds/clientsim/clientsim-screenshot.png)

ClientSim, short for client simulator, is a part of the Worlds SDK that replicates VRChat client behavior in the Unity editor and can be used to speed up development.

## Features

- Test your World in Unity without needing to open VRChat.
- Control the player with your Mouse and Keyboard or a Gamepad.
- Inspect Udon variables in Play Mode.
- Grab Pickups, use Interacts, UI, and Stations.
- Delete EditorOnly objects when entering Play Mode.

Always test your world in VRChat before making it public! ClientSim can't simulate all of VRChat's features. 

## Windows

ClientSim adds several Unity Editor windows to help you debug and test your world: 

- The ClientSim Settings allow you to change the local player's name and the player's height, disable ClientSim, and more.
- While in Play Mode, open an in-game settings window by pressing the "Escape" key.
- The [ClientSim PlayerData](playerdata-editor-window) window allows you to debug PlayerData.
- The [ClientSim PlayerObject](playerObject-editor) window allows you to debug PlayerObjects.

## Getting started

1. Open your VRChat world scene.
2. Press play in Unity.
3. Test your world in Unity's "Game" window.

Learn more about how all the systems work in the [Systems](systems) section

## Networking Differences in ClientSim

ClientSim only simulates the local VRChat player, not remote players. [Deserialization events](/worlds/udon/networking/network-components/#ondeserialization) are simulated for the local player, but not for spawned remote players.

Some parts of the VRChat server are simulated. For example, the local player receives a `OnPlayerRestored` events when you spawn a remote player.

ClientSim has a different implementation of VRChat's networking serializer. Due to this, there are differences in amount of data stored & serialized in event properties. Data in events like `OnPostSerialization` and `OnDeserialization` differs between ClientSim and the VRChat (see below).

### [OnPostSerialization(SerializationResult)](/worlds/udon/networking/network-components/#onpostserialization)

ClientSim only executes this event if it's part of a synced Player Object.

|                               | In ClientSim                                  | In VRChat                            |     |
| ----------------------------- | --------------------------------------------- | ------------------------------------ | --- |
| SerializationResult.success   | Always true                                   | True if serialization was successful |     |
| SerializationResult.byteCount | Number of properties serialized on the object | Number of bytes sent                 |     |


### [OnDeserialization(DeserializationResult)](/worlds/udon/networking/network-components/#ondeserializationdeserializationresult)

ClientSim only executes this event if it's part of a synced Player Object.

|                                     | In ClientSim    | In VRChat                                              |
| ----------------------------------- | --------------- | ------------------------------------------------------ |
| DeserializationResult.sendTime      | Always 0        | The time in seconds at which this message was sent.    |
| DeserializationResult.receiveTime   | Always 0        | The time in seconds at which this message was received |
| DeserializationResult.isFromStorage | Works as normal | True if sent from persistent storage                   |