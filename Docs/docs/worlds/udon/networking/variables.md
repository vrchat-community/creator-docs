import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Network Variables

Network variables (also known as synced variables) allow Udon scripts to share data across all players in a VRChat instance. Unlike network events, which trigger once and do not persist, network variables ensure that all players—including late joiners—see the correct state of an object.

This guide covers how network variables work, when to use them, and best practices for keeping your networking efficient.

## How Synced Variables Work

<Tabs groupId="udon-compiler-language">
<TabItem value="graph" label="Udon Graph">

VRChat synchronizes variables if you tick the "synced" checkox.

![An Udon Graph screenshot showing the OnPlayerLeft event connected to an IsValid node.](/img/worlds/udon/networking/graph-synced-variable.png)

</TabItem>
<TabItem value="cs" label="UdonSharp">

VRChat synchronizes variables marked with the `[UdonSynced]` attribute.

```cs
[UdonSynced] private string score;
```

</TabItem>
</Tabs>

Synced variables behave differently than other variables:

- If your UdonBehaviour uses [manual sync](/worlds/udon/networking/network-details/#manual-synchronization), it must call `RequestSerialization()` to synchronize the variable from the owner to all players.
- If your UdonBehaviour uses [continuous sync](/worlds/udon/networking/network-details/#continuous-synchronization), variables will update for all players automatically.
- Your script must perform an [ownership transfer](/worlds/udon/networking/ownership) to allow another player to modify synced variables.
- [Late joiners](/worlds/udon/networking/late-joiners) receive the latest state of the variable, just like other users in the instance. This works regardless of sync type, you do not need to manually call `RequestSerialization` when a user joins.
- Not all types of variables can be synced. For example, you cannot sync references to scene objects. Supported types are listed [here](/worlds/udon/networking/network-details#synced-variables).

## Types of Variable Syncing

There are two types of syncing available:

### **1. Continuous Sync**
- Updates automatically when the owner changes the value.
- Best for frequently updated values (e.g., a progress bar, a player position tracker).
- Can apply interpolation to smooth changes between updates.
- Does not require calling `RequestSerialization()` - updates will be sent out regularly.

### **2. Manual Sync**
- Requires calling `RequestSerialization()` to send data updates.
- Best for crucial values that do not change often (e.g., a scoreboard, a game state variable).
- Helps reduce unnecessary network traffic.

### Setting the Sync Mode

![Showing how to set the Sync Type in the inspector](/img/worlds/udon/networking/set-sync-inspector.png)

You can use the Synchronization dropdown in the inspector for an UdonBehaviour to set its sync mode, as shown in the image above.

For UdonSharpBehaviours, you can alternatively use the [UdonBehaviourSyncMode](/worlds/udon/udonsharp/attributes/#udonbehavioursyncmode) attribute to control this from a script, as shown below.

```cs
[UdonBehaviourSyncMode(BehaviourSyncMode.Manual)]
public class Example : UdonSharpBehaviour 
{
  // This class's sync mode is manual.
}
```


### Example: Using Manual Sync
```cs
[SerializeField, UdonSynced] private bool isDoorOpen;

public void ToggleDoor()
{
    isDoorOpen = !isDoorOpen;
    RequestSerialization(); // Manually send update to all players
}
```

## Handling Late Joiners with Variables

Make sure to learn about how to sync variables for [late joiners](/worlds/udon/networking/late-joiners)!

## Handling Network Compatibility

Be certain to review how [network compatibility](/worlds/udon/networking/compatibility) is determined for worlds across platform variants and release versions.