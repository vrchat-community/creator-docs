# PlayerObject Editor

ClientSim can simulate how PlayerObjects work. When entering play mode, PlayerObjects will be spawned in, and their synced properties restored.

## Usage

![ClientSim PlayerObject Inspector](/img/worlds/clientsim/clientsim-playerobject.png)

When you enter play mode, ClientSim spawns PlayerObjects and restores their persistent properties. Select any PlayerObject in your [Hierarchy window](https://docs.unity3d.com/Manual/Hierarchy.html) to see its `ClientSimNetworkingView` and `ClientSimNetworkIdHolder` components. 

The `ClientSimNetworkIdHolder` component shows the names and values of a component's synced properties.

1. **Network Id**: The network ID of the game object.
    - This property is filled in just before Unity loads the scene. The scene will not run if it has network ID issues.
2. **Network Components**: A list of saved components on this game object.
    - This property contains all the persisted data of this object.

The data used by ClientSim for PlayerObjects is stored in your project at `projectName/ClientSimStorage/PlayerObjects/PlayerObjects_#_SceneName.json`. You can find this file using your standard file browser.
