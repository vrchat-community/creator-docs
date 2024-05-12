---
title: "Animator Parameters"
slug: "animator-parameters"
hidden: false
createdAt: "2020-08-05T22:30:32.065Z"
updatedAt: "2023-04-07T14:38:34.913Z"
---
:::caution Unity Knowledge Required

This document is written with the assumption that you know a bit about [Unity Animators](https://docs.unity3d.com/2019.4/Documentation/Manual/class-AnimatorController.html).

:::

This is a list of Parameters (**case-sensitive**) that can be added to any Playable Layer (animation controller) and change across all Playable Layers that include this parameter. User created parameters that are not in this list will exist only locally within that animation controller and are not currently changeable by the avatar.

You'll need to add these to your Playable Layer animators to use them. **They are case-sensitive!**

:::danger Don't Dead-End!

You should assume that parameter values may change. If you "dead-end" your animators, which means you don't have an "exit" in any particular branch, you may end up having a broken avatar.

:::
## Parameters

| Name                               | Description                                                  | Type        | Sync           |
| ---------------------------------- | ------------------------------------------------------------ | ----------- | -------------- |
| IsLocal                            | True if the avatar is being worn locally, false otherwise    | Bool        | None           |
| [Viseme](/avatars/animator-parameters#viseme-values)                             | [Oculus viseme index](https://developer.oculus.com/documentation/unity/audio-ovrlipsync-viseme-reference) (`0-14`). When using Jawbone/Jawflap, range is `0-100` indicating volume  | Int         | Speech         |
| Voice                              | Microphone volume (`0.0-1.0`)                                  | Float       | Speech         |
| [GestureLeft](/avatars/animator-parameters#gestureleft-and-gestureright-values)                        | Gesture from L hand control (0-7)                            | Int         | IK             |
| [GestureRight](/avatars/animator-parameters#gestureleft-and-gestureright-values)                       | Gesture from R hand control (0-7)                            | Int         | IK             |
| GestureLeftWeight                  | Analog trigger L (0.0-1.0)†                                  | Float       | Playable       |
| GestureRightWeight                 | Analog trigger R (0.0-1.0)†                                  | Float       | Playable       |
| AngularY                           | Angular velocity on the Y axis                               | Float       | IK             |
| VelocityX                          | Lateral move speed in m/s                                    | Float       | IK             |
| VelocityY                          | Vertical move speed in m/s                                   | Float       | IK             |
| VelocityZ                          | Forward move speed in m/s                                    | Float       | IK             |
| VelocityMagnitude                  | Total magnitude of velocity                                  | Float       | IK             |
| Upright                            | How "upright" you are. 0 is prone, 1 is standing straight up | Float       | IK             |
| Grounded                           | True if player touching ground                               | Bool        | IK             |
| Seated                             | True if player in station                                    | Bool        | IK             |
| AFK                                | Is player unavailable (HMD proximity sensor / End key)       | Bool        | IK             |
| Expression1 - Expression16         | User defined param, Int (`0`-`255`) or Float (`-1.0`-`1.0`)        | Int / Float | IK or Playable |
| [TrackingType](/avatars/animator-parameters#trackingtype-parameter)                       | See description below                                        | Int         | Playable       |
| VRMode                             | Returns `1` if the user is in VR, `0` if they are not           | Int         | IK             |
| MuteSelf                           | Returns `true` if the user has muted themselves, `false` if unmuted  | Bool        | Playable       |
| InStation                          | Returns `true` if the user is in a station, `false` if not           | Bool        | IK             |
| Earmuffs                           | Returns `true` if the user's Earmuff feature is on, `false` if not   | Bool        | Playable       |
| IsOnFriendsList                    | Returns `true` if the user viewing the avatar is friends with the user wearing it. `false` locally. | Bool        | Other          |
| [AvatarVersion](/worlds/components/vrc_station/#sdk3-station-with-sdk2sdk3-avatar)                    | Returns `3` if the avatar was built using VRChat's SDK3 (2020.3.2) or later, `0` if not. | Int | IK | 

"Supine" and "GroundProximity" are visible in the Debug display, but are not implemented yet. They currently do nothing and never change values.

† GestureLeftWeight and GestureRightWeight go from 0.0 to 1.0 in various gestures depending on the trigger pull. For example, if you make a fist but don't pull the trigger on the left hand, GestureLeft will be 1, but GestureLeftWeight will be 0.0. When you start pulling the trigger, it will climb from 0.0 towards 1.0. This can be used to create "analog" gestures or conditionally detect various things.

### Avatar Scaling Parameters

| Name               | Description                                                                                                                                                                                     | Type  | Sync     |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- | -------- |
| ScaleModified      | Returns `true` if the user is scaled using avatar scaling, `false` if the avatar is at its default size.                                                                                        | Bool  | Playable |
| ScaleFactor        | Relation between the avatar's default height and the current height. An avatar with a default eye-height of 1m scaled to 2m will report `2`.                                                    | Float | Playable |
| ScaleFactorInverse | Inverse relation (`1/x`) between the avatar's default height and the current height. An avatar with a default eye-height of 1m scaled to 2m will report `0.5`. Might be inaccurate at extremes. | Float | Playable |
| EyeHeightAsMeters  | The avatar's eye height in meters.                                                                                                                                                              | Float | Playable |
| EyeHeightAsPercent | Relation of the avatar's eye height in meters relative to the default scaling limits (`0.2`-`5.0`). An avatar scaled to 2m will report `(2.0 - 0.2) / (5.0 - 0.2)` = `0.375`.                   | Float | Playable |

All of these parameters are read-only.

### Parameter Types

You have access to three types of variable when defining your parameters in your Parameters object.

You can use up to a total of 256 bits of "memory". This isn't strictly memory in the sense of memory usage of the avatar, but has to do with the bandwidth you use when syncing parameters.

| Parameter Type | Range             | Memory Usage | Notes                              |
| :------------- | :---------------- | :----------- | :--------------------------------- |
| `int`          | `0`-`255`         | 8 bits       | Unsigned 8-bit int.                |
| `float`        | `-1.0` to `1.0`   | 8 bits       | Signed 8-bit fixed-point decimal†. |
| `bool`         | `True` or `False` | 1 bit        |                                    |

† Remotely synced `float` values have 255 possible values, giving a precision of `1/127` over the network, and can store `-1.0`, `0.0`, and `1.0` precisely. When updated locally, such as with [OSC](https://docs.vrchat.com/docs/osc-overview), float values are stored as native (32-bit) floating-point values in animators. 

### GestureLeft and GestureRight Values

GestureLeft and GestureRight use these as their values:

| Index | Gesture     |
| ----- | ----------- |
| 0     | Neutral     |
| 1     | Fist        |
| 2     | HandOpen    |
| 3     | FingerPoint |
| 4     | Victory     |
| 5     | RockNRoll   |
| 6     | HandGun     |
| 7     | ThumbsUp    |

### Viseme Values

We use the [Oculus viseme index](https://developer.oculus.com/documentation/unity/audio-ovrlipsync-viseme-reference), top to bottom, where `sil` is 0. For reference:

| Viseme Parameter | Viseme |
| :--------------- | :----- |
| 0                | `sil`  |
| 1                | `pp`   |
| 2                | `ff`   |
| 3                | `th`   |
| 4                | `dd`   |
| 5                | `kk`   |
| 6                | `ch`   |
| 7                | `ss`   |
| 8                | `nn`   |
| 9                | `rr`   |
| 10               | `aa`   |
| 11               | `e`    |
| 12               | `i`    |
| 13               | `o`    |
| 14               | `u`    |

### Sync Types

- **Speech** - Only used for visemes, is driven by the Oculus Lipsync output parameters depending on your speech. Updated locally, not directly synced (because its driven by audio)
- **Playable** - A slower sync mode meant to synchronize longer-running animation states. Updates every 0.1 to 1 seconds as needed based on parameter changes (1 to 10 updates per second), but you shouldn't rely on it for fast sync.
- **IK** - A faster sync mode meant to synchronize frequently-changing values. Updates continuously every 0.1 seconds (10 updates per second), and interpolates `float` values locally for remote users. Depending on the parameter, this may also just be calculated based on the avatar's locally rendered IK state.

When an Expression Parameter is in-use in a Puppet menu, it automatically swaps from Playable to IK sync so you get the continuous update rate and smooth interpolation. When the menu is closed, it returns to Playable sync.

### Driving Expression Parameters

In addition, Expression parameters can be "driven" to a value via State Behaviors. They can be set using the `Avatar Parameter Driver` State Behavior on a state in an animator.

### AFK State

The AFK state is triggered by:

- The user removing the headset and the HMD proximity sensor returning that the headset is not being worn
- A system menu is open. This depends on how the platform you're using delivers data when system menus are up-- for example, the Oculus Dash doesn't register as AFK, but SteamVR's menu **does** register as AFK. This is kind of a knock-on, and not a designed behavior.
- The user has pressed the End key, toggling the AFK state.

### TrackingType Parameter

`TrackingType` indicates a few pieces of information. 

If the value is 3, 4, or 6 while `VRMode` is 1, the value is indicating how many tracked points the wearer of the avatar has enabled and currently tracked. **This value can change!** If a user in 6-point tracking removes their extra three points of tracking, they will go from a value of 6 to a value of 3. Take this into account when you design your animator. 

If the value is 0, 1, or 2 while `VRMode` is 1, the value indicates that the avatar is still initializing. You should not design animators to branch based off this combination of values, and it should instead wait for a "valid" value of 3, 4, or 6.

:::caution Account for changes

During avatar initialization, this value may change! Ensure that your animator accounts for possible changes, and that it doesn't "dead-end" into any branch.

:::

| Parameter | Description |
| --- | :-- |
| 0 | Uninitialized. Usually only occurs when the user is switching avatars and their IK isn't sending yet. |
| 1 | Generic rig. The user might have tracking of any kind on, but the avatar is rigged as Generic,so tracking is ignored. _Might_ be a desktop user if `VRMode` is 0. |
| 2 | _Only occurs with AV2,and therefore isn't a state you should expect to be in for very long for AV3 controllers on avatars. May still occur with SDK3 stations._ <br />Hands-only tracking with no fingers. This will only occur in states that are transitions-- as in, you should expect `TrackingType` to change again, and the avatar should not stay in this state. |
| 3 | Head and hands tracking. If `VRMode` is `1`, this user is in 3-point VR. If `VRMode` is `0`, this is a Desktop user in a humanoid avatar. |
| 4 | 4-point VR user. Head, hands, and hip. |
| 5 | 5-point VR user. Head, hands and feet tracked. Basically full Body Tracking but without the hip. |
| 6 | Full Body Tracking VR user. Head, hands, hip, and feet tracked. |


### Expression Parameter Aliasing

You **must** create names (or "aliases") for Expression parameters. **You cannot (and shouldn't!) use the default Expression name for the parameters. **

Once you have created names for any Expression parameter you want to use, you can use that name directly in your Controller. This means can come up with your own standard naming for your parameters. This _also_ means that Menu definitions and Controllers can be mixed and matched as long as they use the same names. You can get prefab controllers from others and create your own menu styles based on your preferences, without worrying about Expression parameter conflicts.

When naming your own parameters, using forward slashes (`/`) will cause parameters to automatically organize in various selection dropdowns. For example, naming a parameter `Toggles/Hat` will make the menu selection show up as Toggles -> Hat when selecting parameters for things like Animator transitions and Expression Menus, while keeping the underlying parameter the same name. This doesn't change how parameters behave, it just makes it easier to work with large parameter lists. 

### Default AV3 Aliasing

There's a few "defaults" in use by the template AV3 VRChat controllers that you can use if you don't want to build out your own controllers. These won't collide with your own use (as long as you don't name them the same thing) thanks to aliasing.

In particular, the Default Action and FX layers use aliasing. You don't need to worry about using a Expression that is in these layers. 

Actions use aliased parameters named `VRCEmote` , which is an Int with a range of 1 to 16.

FX uses aliased Float parameters called `VRCFaceBlendH` (-1,1) and `VRCFaceBlendV` (-1,1), if you want to try out your own menus to use them. The default FX layer requires that you have a skinned mesh named `Body` with `mood_happy` , `mood_sad` , `mood_surprised` , and `mood_angry` blendshapes.

To restate, if you have an avatar that you upload as an Avatar3 avatar without any custom Playable layers, you'll be able to use some built-in emotes with them as long as you've got the above-named blendshapes.

If you also have an `eyes_closed` blendshape, it'll close them when you use the default Die emote or go AFK.

### Cross-Platform Parameter Sync

When using an avatar that has both Quest and PC versions uploaded, parameters are synced by their position in the parameters list and their parameter type, **not** by the names of the parameters. For a given parameter to sync between PC and Quest, it has to be in the same position in the parameter list, and have the same parameter type. 

Given this, it can be a good idea to use the same Expression Parameters asset for both the PC and Quest versions of an avatar, even if one version doesn't make use of all the parameters.

### Mismatched Parameter Type Conversion

When you choose a [parameter type](/avatars/animator-parameters/#parameter-types) in your [animator](https://docs.unity3d.com/Manual/AnimationParameters.html), it's a good idea to choose the same type as the [built-in parameter](/avatars/animator-parameters/#parameters) or [custom parameter](/avatars/expression-menu-and-controls/#creating-an-expression-menu) you're trying to use. For example: If you use VRChat's built-in `AFK` parameter in your animator,  you should choose the type `bool`.

However, you *can* choose a mismatched type for your parameters. VRChat will try convert the parameter's value to the type used by the animator. For example, if you choose the type `float` for your `AFK` parameter, VRChat will automatically set `AFK` to `1.0` or `0.0` instead of `true` or `false`. This also allows you to use the `AFK` parameter in your Animator's [Blend Tree](https://docs.unity3d.com/Manual/class-BlendTree.html).

The table below shows how converting a mismatched parameter changes it. 

| Source Type | Animator Type |                                              Conversion Behavior                                              | Example                               |
|:-----------:|:-------------:|:-------------------------------------------------------------------------------------------------------------:|---------------------------------------|
| `int`       | `float`       | Directly converted to `float`.                                                                                | `1` → `1.0`                           |
| `int`       | `bool`        | `0` is `false`, anything else is `true`                                                                       | `1` → `true`                          |
| `float`     | `int`         | Rounded to closest `int` (same as [`Mathf.Round`](https://docs.unity3d.com/ScriptReference/Mathf.Round.html)) | `0.5` → `0`, `0.6` → `1`, `1.5` → `2` |
| `float`     | `bool`        | `0.0` is `false`, anything else is `true`                                                                     | `0.5` → `true`                        |
| `bool`      | `int`         | `true` is `1`, `false` is `0`                                                                                 | `true` → `1`                          |
| `bool`      | `float`       | `true` is `1.0`, `false` is `0.0`                                                                             | `true` → `1.0`                        |
