# VRC Station

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Allow users to sit down by interacting with an object. An example can be found in the SDK as [VRCChair3](/worlds/examples/udon-example-scene#vrcchair3).

This component can also be used on avatars to create seats on avatars!

## Parameters and Options

| Parameter                    | Description                                                                                             |
| ---------------------------- | ------------------------------------------------------------------------------------------------------- |
| Player Mobility              | Should the player be able to move, options include:                                                     |
|                              | - Mobile: Allow users to move when seated in the station.                                               |
|                              | - Immobilize: Prevents the user from moving.                                                            |
|                              | - Immobilize For Vehicle: Same as Immobilized but optimized for moving stations.                        |
| Can Use Station From Station | If the user can switch stations when sitting in a station.                                              |
| Animation Controller (optional) | Used to override normal seating animations with a custom one.                                        |
| Disable Station Exit         | If the user cannot exit the station by usual means, use triggers to unseat the user.                    |
| Seated                       | Is this a station that the user should be sitting in? See the details above to see what this indicates. |
| Station Enter Player Location | Transform that defines where the user should be transported to when seated.                            |
| Station Exit Player Location  | Transform that defines where the user should be transported to when they are unseated.                  |
| Controls Object              | This is used for stations where you can control an object, such as a vehicle.                           |
## Creating a station with Udon

You can use stations in your own custom Udon scripts. Making a chair to sit in is fairly straightforward. The [VRCChair3](/worlds/examples/udon-example-scene#vrcchair3) prefab included with the VRCSDK shows how to setup one. 

All you need for a chair is a GameObject with the following components:
1. `VRC_Station` with an entry and exit point set to itself or another transform that designates where the player is rooted to the station.
2. A collider, usually with "Is Trigger" enabled.
3. An UdonBehaviour with an Udon program that handles sitting in the station.
4. (Optional) A mesh that looks like a chair.

The VRChat SDK comes with a program that handles step 3, which is called **StationGraph**.

<Tabs groupId="udon-compiler-language">
<TabItem value="graph" label="Udon Graph">

![The station graph, part of the VRCChair3 prefab.](/img/worlds/station-graph.png)

</TabItem>
<TabItem value="cs" label="UdonSharp">

```cs
using UdonSharp;  
using UnityEngine;  
using VRC.SDKBase;  
  
public class StationGraph : UdonSharpBehaviour  
{  
    public override void Interact()  
    {  
        Networking.LocalPlayer.UseAttachedStation();  
    }  
  
    public override void OnStationEntered(VRCPlayerApi player)  
    {  
        Debug.Log($"{player.displayName} Entered");  
    }  
  
    public override void OnStationExited(VRCPlayerApi player)  
    {  
        Debug.Log($"{player.displayName} Exited");  
    }  
}
```

</TabItem>
</Tabs>

Udon's "OnStationEntered" and "OnStationExited" events can be very useful for advanced use cases, such as detecting which player has entered or exited a moving vehicle.

## Stations used in Worlds

Your Animator can access avatar parameters to react to avatars entering the station. 

- Use the `InStation` parameter to detect whether an avatar has entered a station. but might not have Seated-IK enabled.
- Use the `Seated` parameter to detect whether Seated-IK is enabled for the avatar in the station.
	- The `Seated` parameter only used if the `Seated` property on the station is enabled.

### Detecting SDK2 Avatars

Station behave slightly differently for avatars that were uploaded with very old versions of the VRChat SDK (SDK2).

Check the `AvatarVersion` parameter to detect SDK2 avatars. For example:
- If `AvatarVersion` is `3`, then the avatar uses the modern SDK3.
- If `AvatarVersion` is less than `3`, then the avatar uses the outdated SDK2.

Use `AvatarVersion` and `InStation` to transition to different custom seated animations. The differences are described below.

### SDK2 avatars

If an SDK2 avatar uses your station, your Animator should apply a fixed seated pose (if `Seated` is enabled), or a full-body animation if `Seated` is not enabled.

### SDK3 avatars

If an SDK3 avatar uses your station, your Animator can choose to do any combination of animations, Tracking Control changes, and Pose Space changes that are available for SDK3 avatar. However, there will be no behind-the-scenes State Behaviors applied (which does occur in SDK2 stations).

Note that since the creator decides what type of Tracking Control to apply, the Seated property on a station does not necessarily indicate the tracking type on SDK3 avatars. 

Our example Seated controllers show this branching behavior and the proper transitions and State Behavior setup for applying a seated animation.

:::caution

Stations can only affect parameters that already existed on an avatar. You can't use [State Behaviors](/avatars/state-behaviors) to create new parameters.

:::
## Stations used on Avatars
The default `VRCChair` prefab included in the SDK can be used on avatars to let other players "sit" on you. You can use this to make your avatar into a car, a dinner table that moves around, and more! An avatar can have up to 6 stations.

When using stations on an avatar that you want to animate on or off, you need to toggle specific objects and components.

![image](/img/worlds/vrc_station-0adc923-av-station-fix.png)

**The red box (in the screenshot above) needs to be enabled upon upload. If it is disabled upon upload, the station will not work!**

Toggling the red box will remove any player currently sitting in the station. Toggling the green boxes will only stop new players from sitting in the station. Since this involves disabling/enabling components and objects, this **must** be done in the FX layer.

Keep in mind that users can disable animations with the [Safety system](https://docs.vrchat.com/docs/vrchat-safety-and-trust-system). If an avatar station is on by default (as in, having the toggles on by default), the stations remain active, even if the wearer has used an animation to turn them off.

There are two other restrictions upon upload:
- The Entry and Exit points must not be more than 2 meters apart.
- There can be up to 6 stations on the avatar. Any more will be disabled.

## Parameters and Options

| Parameter | Description |  
| - | - |  
| Player Mobility                 | Whether players are allowed to walk around while using the station. |  
|                                 | - Mobile: Allows players to move when seated in the station. |  
|                                 | - Immobilize: Prevents user from moving and moves them to "Station Enter Location." |  
|                                 | - Immobilize For Vehicle: Same as "Immobilize" but optimized for moving stations.  |  
| Can Use Station From Station    | Whether the players can switch stations when sitting in a station.  |  
| Animation Controller (optional) | Overrides the "Sitting" playable layer in the avatar controller. |  
| Disable Station Exit            | Prevents the player from exiting the station by moving or jumping.<br />Use the `ExitStation` node to remove the player from the station. |  
| Seated                          | Whether the player's avatar will sit or stand when using the station.<br />This affects the "Seated" parameter of the avatar’s playable layers. |  
| Station Enter Player Location   | The player is moved to the position of this Transform when they enter the station. |  
| Station Exit Player Location    | The player is moved to the position of this Transform when they exit the station. |
