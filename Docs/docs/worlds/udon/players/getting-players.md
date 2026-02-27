---
title: "Getting Players"
slug: "getting-players"
hidden: false
createdAt: "2021-01-22T01:48:13.564Z"
updatedAt: "2021-11-12T01:23:15.713Z"
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

These nodes are useful for getting an individual Player, a group of them, or all of them.

### [Networking.get LocalPlayer](/worlds/udon/networking/network-components)
*VRCPlayerApi*

:::note

Please note that this function is a member of the Networking class, but it is being included here.

:::
The local player is the Player that this Udon script is currently running on-- alternately, the local player is *you*. It's very important to know yourself!

### GetPlayerCount
*int*

Gets the actual number of Players in the instance when it is called.

### GetPlayers
*VRCPlayerApi[]*

This is how you get all the Players in your world so you can go through them in a For Loop and apply settings, make changes, look for a particular name, etc.

The easiest way to do this is to use the version that doesn't accept any parameters.

<Tabs groupId="udon-compiler-language">
<TabItem value="graph" label="Udon Graph">

![The bare minimum for a working call to GetPlayers. A better approach would be to construct VRCPlayerApi[] as a variable so you can reuse it.](/img/worlds/graphgetplayers_alloc.png)

</TabItem>
<TabItem value="cs" label="UdonSharp">

```cs  
VRCPlayerApi[] players = VRCPlayerApi.GetPlayers();
for (int i = 0; i < players.Length; i++)
{
    VRCPlayerApi player = players[i];
    // Do something with the player...
}
```

</TabItem>
</Tabs>

The approach above works, but it also allocates memory each time it's used, which means it will reconstruct the VRCPlayerApi array every time.

If you're using this method frequently (for example, every frame), you should use the non-allocating version instead, where you pass in a VRCPlayerApi array stored as a variable to be reused each time. Make sure the array is large enough to hold as many players as your world can ever allow!

<Tabs groupId="udon-compiler-language">
<TabItem value="graph" label="Udon Graph">

![A more efficient pattern for using GetPlayers regularly. This approach constructs VRCPlayerApi[] as a variable that gets reused, avoiding constructing a new one in memory every time GetPlayers runs.](/img/worlds/graphgetplayers_nonAlloc.png)

</TabItem>
<TabItem value="cs" label="UdonSharp">

```cs
private VRCPlayerApi[] players;

private void Start()
{
    players = new VRCPlayerApi[100]; // The array should be large enough to hold all of your players at once.
}

private void Update()
{
    VRCPlayerApi.GetPlayers(players);
    int playerCount = VRCPlayerApi.GetPlayerCount();
    for (int i = 0; i < playerCount; i++)
    {
        VRCPlayerApi player = players[i];
        // Do something with the player...
    }
}
```

</TabItem>
</Tabs>


### GetPlayerById
*int*

Get a VRCPlayerApi object for the given player Id if it exists.

### get playerId
*int*

Get the cached PlayerId, calls GetPlayerId if it hasn't been cached yet.

### GetPlayerId
*int*

Gets the Player's Network Id from the source.

## Player Tag System
This system is a quick-and-dirty way of assigning strings to players without creating your own variables and collections.

### SetPlayerTag / GetPlayerTag
Set: *string, string*

Get: *string*

Sets a string variable that you can look up later. For example, you could set the "role" of a player in a cooking game to "chef" or "customer". Then you could GetPlayerTag for "role" and get back either "chef" or "customer".

### ClearPlayerTags
*VRCPlayerApi*

Remove all tags that you've set on a Player.

### GetPlayersWithTag

:::caution

Not currently working. Returns a List, which is unavailable in Udon.

You will be able to pass in an array of VRCPlayerApi objects and a tag and the method will fill the array with Players who have that tag set.

:::