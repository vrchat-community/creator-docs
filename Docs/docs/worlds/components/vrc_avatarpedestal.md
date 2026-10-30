# VRC Avatar Pedestal

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Displays an avatar and allows users interact with the pedestal to switch into the avatar.

You can find an example in the SDK named [AvatarPedestal](/worlds/examples/udon-example-scene#avatarpedestal). This example calls the `SetAvatarUse` method when a user interacts with the pedestal.

## Parameters

| Parameter            | Udon property | Description |
| -------------------- | ------------- | ----------- |
| Blueprint Id         | `blueprintId` | Blueprint ID of the avatar to show. |
| Placement(optional)  | `Placement` | Transform to display the avatar on. |
| Change Avatar On Use | `ChangeAvatarsOnUse` | If `true`, you can call `SetAvatarUse` the change the local player's avatar. |
| Scale                | `scale` | How big or small the avatar should be. Only affects the pedestal avatar. |


## Udon API

`class VRC.SDK3.Components.VRCAvatarPedestal`

You can change which avatar the pedestal displays, and switch the local player into it, from Udon at runtime. To change a setting, use the Udon property listed in [Parameters](#parameters).

### Methods

| Name | Returns | Summary |
| --- | --- | --- |
| SwitchAvatar(string id) | void | Changes which avatar the pedestal displays. Takes a blueprint ID, like `avtr_c38a1615-5bf5-42b4-84eb-a8b6c37cbd11`. |
| SetAvatarUse([VRCPlayerApi](/worlds/udon/players) instigator) | void | Switches the player into the avatar displayed on the pedestal. Only works if `instigator` is the local player and **Change Avatar On Use** is enabled. |

`SwitchAvatar` only changes the avatar shown on the pedestal. It doesn't change any player's avatar. To let players switch into the displayed avatar, call `SetAvatarUse`.

### Example

This script allows the local player to cycle through a list of avatars. Each time they interact with it, the pedestal displays the next avatar ID in `avatarIds`, wrapping back to the first one at the end of the list.

<Tabs groupId="udon-compiler-language">
<TabItem value="graph" label="Udon Graph">

![An Udon Graph that switches the pedestal to the next avatar ID in an array each time a player interacts with it.](/img/worlds/udon/examples/pedestal-swapper.png)

</TabItem>
<TabItem value="cs" label="UdonSharp">

```cs
using UdonSharp;
using VRC.SDK3.Components;

public class PedestalSwapper : UdonSharpBehaviour
{
    public VRCAvatarPedestal pedestal;
    public string[] avatarIds;
    private int _index;

    public override void Interact()
    {
        pedestal.SwitchAvatar(avatarIds[_index]);
        _index = (_index + 1) % avatarIds.Length;
    }
}
```

</TabItem>
</Tabs>

## Avatar ownership

Avatar pedestals behave differently depending on whether the avatar is public, private, or published on the marketplace:

- Public avatar: All users can see and use the pedestal.
- Private avatar: Only the uploader can see the pedestal and use it. Other users see an error.
- [Marketplace](/economy/store/avatar-marketplace) avatar: All users can see and use the pedestal. If a user doesn't own the avatar, they see the avatar details page instead.