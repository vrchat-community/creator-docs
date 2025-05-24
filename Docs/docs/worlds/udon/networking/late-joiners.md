# Late Joiners & Sync Issues

When a player joins a VRChat instance after some synchronized variables have been changed, they need to be caught up to the latest state of the world. This guide explains how to ensure late joiners experience a consistent and synchronized world.

## How VRChat Handles Late Joiners
When a new player joins an instance, VRChat does the following:
- Sends them the latest **synced variable** values, via the `OnDeserialization` event.
- Sets objects' owners to the proper Players. 
- Events are **not** replayed.

## Ensuring Late Joiners See the Correct State
### **1. Use Synced Variables Instead of Events for State**
Events trigger once and do not persist, meaning late joiners **miss any event-based changes**. Instead:

- Store important data in `UdonSynced` variables.
- Ensure owners call `RequestSerialization()` after modifying synced data for Manually-synced UdonBehaviours.

Example: Instead of sending an event to open a door, sync a variable:
```cs
[SerializeField, UdonSynced] private bool isDoorClosed;

public void OpenDoor()
{
    isDoorClosed = false;
    RequestSerialization();
}
```
Late joiners will receive the `isDoorClosed` state correctly when they join.

### **2. Catch up Objects for Late Joiners**

Apply changes when they join. You can accomplish this in the `OnDeserialization` event which triggers for them once they've loaded in:
```cs
private GameObject lockedDoor;

public override void OnDeserialization()
{
    // show or hide the door depending on its synced state
    lockedDoor.SetActive(isDoorClosed);
}
```

### **3. Combine Events and Synced Variables when Needed**
You can change a synced variable from an Event if needed. For example, to update the synced state of a door whenever anyone opens it, you can send an event to the object's owner:
```cs
public override void Interact()
{
    SendCustomNetworkEvent(NetworkEventTarget.Owner, nameof(OpenDoor));
}
```
This saves you from needing to change the Owner of the door to the player who Interacted with it just to set its variable.