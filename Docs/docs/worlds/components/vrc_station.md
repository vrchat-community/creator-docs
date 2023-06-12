---
title: "VRC Station"
slug: "vrc_station"
hidden: false
createdAt: "2017-07-06T02:54:59.005Z"
updatedAt: "2023-03-15T22:59:46.292Z"
---
Allow users to sit down. Example can be found in the SDK as [VRCChair](/worlds/examples/udon-example-scene#vrcchair3).

This component can also be used on avatars to create seats on avatars!

This component acts a bit differently in VRCSDK2 and VRCSDK3. We support SDK2 and SDK3 stations that have animations to drive either SDK2 or SDK3-based avatars.

There is a new parameter `InStation`, which can be used to indicate that an avatar has entered a station, but might not have Seated-IK enabled. The `Seated` parameter is now only true if the `Seated` property was checked on the station.

# Stations used in Worlds

### SDK2 Station with SDK2 Avatar
The Seated property is used to decide what kind of IK the occupant should get when playing the animation.

**If Seated is checked**, the standard seated IK is applied to SDK2 avatars. This is where the hip and lower body is locked into place, and the head/hands are tracked.

**If Seated is unchecked**, the SDK2 avatar plays the animation with no IK applied.

### SDK2 Station with SDK3 Avatar
The animation in the station will automatically have Tracking Control applied based on the Seated property of the station.

Additionally, if Seated is checked, a Temporary Pose Space is applied to adjust the viewpoint.

### SDK3 Station with SDK2/SDK3 Avatar
SDK3 stations support the `AvatarVersion` parameter. It is currently only set by SDK3 avatars (where `AvatarVersion` will have a value of `3`), so SDK2 avatars will remain at the default value (check for `AvatarVersion < 3`).

Transitions to begin a seated animation should branch on `AvatarVersion` combined with `InStation` to begin the custom animation. 

The SDK2 branch should apply a fixed seated pose (if Seated is enabled), or a full-body animation if Seated is not enabled.

The SDK3 branch can choose to do any combination of animations, Tracking Control changes, and Pose Space changes that are available for SDK3 avatar. However, there will be no behind-the-scenes State Behaviors applied (which does occur in SDK2 stations).

Note that since the creator decides what type of Tracking Control to apply, the Seated property on a SDK3 station does not necessarily indicate the tracking type on SDK3 avatars. 

Our example Seated controllers show this branching behavior and the proper transitions and State Behavior setup for applying a seated animation.

:::caution Stations cannot create new Parameters via Drivers, only affect existing ones

Parameter driver [State Behaviors](/avatars/state-behaviors) in animators specified on stations will only be able to drive existing avatar parameters, not create new ones.\n\nGenerally speaking, using parameter drivers in station animators is not a supported use-case.
:::
# Stations used on Avatars
The default `VRCChair` prefab included in the SDK can be used on avatars to let other players "sit" on you. You can use this to make your avatar into a car, a dinner table that moves around, and more!

When using stations on an avatar that you want to animate on or off, you need to toggle specific objects and components. 
![image](/img/worlds/vrc_station-0adc923-av-station-fix.png)
**Do not animate or disable the toggle in the red box. Only animate the toggles in the green boxes.** Since this involves disabling/enabling components and objects, this **must** be done in the FX layer.

Attempting to work around this by enabling/disabling a parent object of the chair will also cause problems. You must explicitly animate the objects highlighted above in green.

Keep in mind that having avatar stations on by default (as in, having the green toggles on by default) means that if a user disables animations with the Safety System, the stations remain active, even if the wearer has animated them off.

# Parameters and Options

Certainly! Here's the information reformatted into a two-column markdown table:

| Parameter                    | Description                                                                                             |
| ---------------------------- | ------------------------------------------------------------------------------------------------------- |
| Player Mobility              | Should the player be able to move, options include:                                                      |
|                              | - Mobile: Allow users to move when seated in station                                                    |
|                              | - Immobilize: Prevents user from moving                                                                 |
|                              | - Immobilize For Vehicle: Same as Immobilized but optimized for moving stations                        |
| Can Use Station From Station | If the user can switch stations when sitting in a station                                                |
| Animation Controller (optional) | Used to override normal seating animations with a custom one.                                           |
| Disable Station Exit         | If the user cannot exit the station by usual means, use triggers to unseat the user                      |
| Seated                       | Is this a station that the user should be sitting in? See the details above to see what this indicates. |
| Station Enter Player Location | Transform used to define where the user should be transported to when seated                             |
| Station Exit Player Location  | Transform used to define where the user should be transported to when they are unseated                  |
| Controls Object              | This is used for having a station where you can control an object, such as vehicles.                     |

The table above represents the "Parameter" and "Description" columns of the information you provided.

If you have any further questions or need additional assistance, feel free to ask!