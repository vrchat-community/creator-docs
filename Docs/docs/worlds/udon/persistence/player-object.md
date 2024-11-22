# PlayerObject

PlayerObjects allow you to automatically give each player who joins your world a copy of a GameObject, such as a flashlight, a health bar, or a sword.

- VRChat automatically spawns a copy of the GameObject for each player when they join your world.
- The copy includes all components and child GameObjects.
- The copy spawns with the same position, rotation, scale and parent as the original [PlayerObject Template](#playerobject-templates).


## Setup

Follow the instructions below to create a simple PlayerObject. When a player joins an instance, VRChat will spawn the PlayerObject for them.

1. Create a GameObject in your scene's hierarchy.
2. Add the `VRCPlayerObject` component 
	- This turns your GameObject into a PlayerObject [template](#playerobject-templates).
3. (Optional) Add an `UdonBehaviour` component to the GameObject (or one of its children).
4. (Optional) Add the `VRCEnablePersistence` to the same GameObject as the `UdonBehaviour` if you want synced variables to persist.

## Loading Persistent User Data

VRChat automatically loads Persistent User Data on PlayerObject that fulfill these conditions:

- The PlayerObject (or a child GameObject) has an `UdonBehaviour` component.
- The `UdonBehaviour` has synced variables.
- The `UdonBehaviour`'s GameObject also has a `VRCEnablePersistence` component.

Use the [`OnPlayerRestored`](/worlds/udon/graph/event-nodes#onplayerrestored) to detect that a PlayerObject has finished loading User Data. This event is executed once for every player in the instance, including the owner of the PlayerObject.

OnPlayerRestored includes a reference to the player whose data was just restored. You can use this to make the Owner of the GameObject 

In the `Start` and `OnDeserialization` events, ownership is guaranteed to be correct. However, you should avoid reading or writing a PlayerObject's User Data before the `OnPlayerRestored` event. You might accidently read or write outdated User Data, and your changes may be overwritten when User Data is received from VRChat's server.

## Ownership

When players own a PlayerObject, they also own all GameObjects with synced `UdonBehaviours` within their PlayerObject. They cannot transfer them to anyone else.

This is convenient for giving players tools or pickups that can never be "stolen" by other players. You can guarantee that they will always own their own PlayerObjects. 

## PlayerObject Templates

PlayerObject templates are the original GameObjects that you create in the editor by adding a `VRCPlayerObject`. VRChat copies your Template to spawn PlayerObjects.

Components on Templates and PlayerObjects can contain references to other components: 
- Templates can reference their own components or child components.
- Templates can reference other components in your scene.
- Components in your scene can **not** reference Templates.
	- Instead, your scene objects must use direct references to spawned PlayerObjects.
	- Templates are automatically disabled by VRChat, but still exist in the scene.
	- Do not modify, destroy, or edit your Template after it has been disabled! This may cause errors or unexpected behaviour.
  
Use the following methods in your scripts to find references to PlayerObjects and their components:
- Use `Networking.GetPlayerObjects` to get all the PlayerObjects associated with a player, then sort through that array and find the specific thing you are looking for.
- Use `Networking.FindComponentInPlayerObjects` to translate a reference from a PlayerObject template into a specific player's PlayerObject.
- See the [examples](#examples) below.

## Events

There is only one event related to PlayerObjects:

| Event | Output | Notes |
| -------- | -------- | -------- |
| [OnPlayerRestored](/worlds/udon/graph/event-nodes#onplayerrestored) | VRCPlayerApi player | Triggered after all of a VRChat player's persistent data has been loaded. |

## Methods

PlayerObject methods are in the `VRC.SDKBase.Networking` namespace.

| Function | Input | Output | Notes |
| -------- | -------- | -------- | ------- |
| GetPlayerObjects | VRCPlayerApi target | GameObject[] objects | Returns an array of all the PlayerObjects associated with the player provided |
| FindComponentInPlayerObjects | VRCPlayerApi player, Component referenceComponent | Component | Using the `referenceComponent` which must be a child of a PlayerObject template, this function returns the corresponding component associated with the provided player. |

Utility wrappers to these methods are found on the `VRCPlayerApi` class.

| Function | Input | Output | Notes |
| -------- | -------- | -------- | ------- |
| GetPlayerObjects | | GameObject[] objects | Returns an array of all the PlayerObjects associated with the provided player. |

## Examples

### Finding a custom script on a PlayerObject

This example automatically looks through all PlayerObjects and finds a specific component that you're looking for. Replace `CustomPlayerObjectScript` with the type of component that you want to find.

```cs
public CustomPlayerObjectScript Find(VRCPlayerApi player)
{
    var objects = Networking.GetPlayerObjects(player);
    for (int i = 0; i < objects.Length; i++)
    {
        if (!Utilities.IsValid(objects[i])) continue;
        CustomPlayerObjectScript foundScript = objects[i].GetComponentInChildren<CustomPlayerObjectScript>();
        if (Utilities.IsValid(foundScript)) return foundScript;
    }
    return null;
}
```

### Finding a component on a PlayerObject

This example will use the `FindComponentInPlayerObjects` function to translate a reference from the PlayerObject template into a reference from a specific player's PlayerObject. 

```cs
[SerializeField]
public Transform referenceChildTransform; // A reference to a Transform on a PlayerObject or a child of a PlayerObject

public void Find(VRCPlayerApi targetPlayer)
{
    Component foundComponent = Networking.FindComponentInPlayerObjects(targetPlayer, referenceChildTransform);
    // foundComponent will be of type Transform and will correspond to the targetPlayer's PlayerObject that matches the reference.
}
```
