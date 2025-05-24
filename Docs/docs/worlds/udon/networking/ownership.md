# Object Ownership

## Introduction
In VRChat, every networked GameObject has an owner. Ownership determines which player can modify and update a networked object. Understanding and managing ownership is crucial for properly synchronizing objects across all players in an instance.

## How Ownership Works
- The **first player** to join an instance becomes the owner of all networked objects by default.
- Ownership can be **transferred** from one player to another dynamically.
- Only the **owner** of a networked object can modify its synchronized Udon variables.
- If the owner leaves the instance, VRChat **automatically assigns** a new owner.

## Transferring Ownership
You can transfer ownership of an object using Udon:

```cs
Networking.SetOwner(VRCPlayerApi player, GameObject obj);
```

### Example: Changing Object Ownership
If you want a player to take ownership of an object when they interact with it:

```cs
public override void Interact()
{
    Networking.SetOwner(Networking.LocalPlayer, gameObject);
}
```

After this function runs, the local player will become the new owner of the object.

## Ownership Events
VRChat provides two key events related to ownership:

### OnOwnershipRequest

This event is called **before** ownership is transferred, allowing you to **approve or reject** the request.

```cs
public override bool OnOwnershipRequest(VRCPlayerApi requestingPlayer, VRCPlayerApi newOwner)
{
    return true; // Approve transfer
}
```

### OnOwnershipTransferred
Triggered when ownership of an object changes. You can use this to update UI elements or other behaviors when ownership shifts.

```cs
public override void OnOwnershipTransferred(VRCPlayerApi newOwner)
{
    Debug.Log($"New owner: {newOwner.displayName}");
}
```

## Transfer Events Diagram
This image shows the order of events so you can understand the steps involved in successfully transferring ownership of an object.

![](/img/worlds/udon-networking-813f99e-OnOwnershipRequest_Activity.svg)

## The Instance Master

The instance master is the player that owns any object that never had its ownership manually set or transferred. You can check if a player is the master via [`VRCPlayerApi.isMaster`](/worlds/udon/players/#get-ismaster).

Whether a player is the instance master should _not_ be used as a way to gate access to certain features of a world. For that, consider using "instance owner" instead.

The master player selection follows these rules:

- There will always be a valid master player in an instance.
- The first player to enter a previously empty instance will become the initial master.
- The master player changes when the current master leaves the instance.
	- The master player may also change if they're on Android and kept VRChat in the background for too long.
- When the current master leaves, a new master is chosen from the other players in the instance before `OnPlayerLeft` is called.
- You must not rely on any particular player becoming master. The new master player will be chosen based on various criteria on the server side (platform, network conditions, etc.).

These are the _only_ guarantees VRChat currently makes about network master behaviour. Any other observed behaviour is subject to change.

:::note Don't rely on master if you can avoid it!

It is recommended to use ownership checks for your networking logic instead of checking for instance master wherever possible.
There are scenarios where a master player might become unresponsive for a while, and events during that time might not be executed.
:::

## Best Practices
- If you want a player to be able to change a variable on an object, make sure to check or request ownership first.
- Ensure that ownership-related logic accounts for **player disconnects** and **late joiners**.
- Avoid relying on **Instance Master** if you can — use proper ownership handling instead.

## Next Steps
For further details, explore these networking topics:
- [Using Variables for Syncing](/worlds/udon/networking/variables)
- [Using Events for Syncing](/worlds/udon/networking/events)
- [Debugging Networked Objects](/worlds/udon/networking/debugging)

