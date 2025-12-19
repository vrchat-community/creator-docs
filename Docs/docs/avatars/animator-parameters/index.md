import UnityVersionedLink from '@site/src/components/UnityVersionedLink.js';

# Animator Parameters

:::caution

This document requires knowledge about Unity's <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/AnimationParameters.html">Animator Controllers</UnityVersionedLink> and <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/class-AnimatorController.html">Animation Parameters</UnityVersionedLink>.

:::

You can use animator parameters in your avatar's [Playable Layers](/avatars/playable-layers/) to control or affect your avatar's animator states.

- Some parameters are [built into VRChat](#built-in-parameters) and you can use them on any Playable Layer.
- You can also create your own [custom parameters](#custom-parameters), which requires creating an [Expression Parameters asset](#expression-parameters-asset).

:::tip 

You should assume that parameters can always change. Avoid "dead ends" - if your states don't have an exit, your avatar's animator may break.

:::
## Built-in Parameters



You can access VRChat's built-in avatar parameters by adding them to your avatar's Playable Layers.
If you add one of these parameters, VRChat automatically updates its value based on what's happening in VRChat. For example, if you add the `VelocityMagnitude` parameter, its value updates based the player's current speed.

All built-in parameters are read-only. You cannot change them with an [Expressions Menu](/avatars/expression-menu-and-controls) or [OSC](https://docs.vrchat.com/docs/osc-overview).

The list below contains all of VRChat's built-in parameters, their description, their type, and their [sync type](#sync-types).

| Name                                                                               | Description                                                                                                                                                                        | Type               | Sync           |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | -------------- |
| IsLocal                                                                            | True if the avatar is being worn locally, false otherwise                                                                                                                          | Bool               | None           |
| [PreviewMode](/avatars/animator-parameters/preview-mode)                           | Returns `1` if the avatar is being previewed, `0` if it is not                                                                                                                     | Int                | None           |
| [Viseme](/avatars/animator-parameters#viseme-values)                               | [Oculus viseme index](https://developer.oculus.com/documentation/unity/audio-ovrlipsync-viseme-reference) (`0-14`). When using Jawbone/Jawflap, range is `0-100` indicating volume | Int                | Speech         |
| Voice                                                                              | Microphone volume (`0.0-1.0`)                                                                                                                                                      | Float              | Speech         |
| [GestureLeft](/avatars/animator-parameters#gestureleft-and-gestureright-values)    | Gesture from L hand control (0-7)                                                                                                                                                  | Int                | IK             |
| [GestureRight](/avatars/animator-parameters#gestureleft-and-gestureright-values)   | Gesture from R hand control (0-7)                                                                                                                                                  | Int                | IK             |
| GestureLeftWeight                                                                  | Analog trigger L (0.0-1.0)[^1]                                                                                                                                                     | Float              | Playable       |
| GestureRightWeight                                                                 | Analog trigger R (0.0-1.0)[^1]                                                                                                                                                     | Float              | Playable       |
| AngularY                                                                           | Angular velocity on the Y axis                                                                                                                                                     | Float              | IK             |
| VelocityX                                                                          | Lateral move speed in m/s                                                                                                                                                          | Float              | IK             |
| VelocityY                                                                          | Vertical move speed in m/s                                                                                                                                                         | Float              | IK             |
| VelocityZ                                                                          | Forward move speed in m/s                                                                                                                                                          | Float              | IK             |
| VelocityMagnitude                                                                  | Total magnitude of velocity                                                                                                                                                        | Float              | IK             |
| Upright                                                                            | How "upright" you are. 0 is prone, 1 is standing straight up                                                                                                                       | Float              | IK             |
| Grounded                                                                           | True if player touching ground                                                                                                                                                     | Bool               | IK             |
| Seated                                                                             | True if player in station                                                                                                                                                          | Bool               | IK             |
| AFK                                                                                | Is player unavailable (HMD proximity sensor / End key)                                                                                                                             | Bool               | IK             |
| [TrackingType](/avatars/animator-parameters#trackingtype-parameter)                | See description below                                                                                                                                                              | Int                | Playable       |
| VRMode                                                                             | Returns `1` if the user is in VR, `0` if they are not                                                                                                                              | Int                | IK             |
| MuteSelf                                                                           | Returns `true` if the user has muted themselves, `false` if unmuted                                                                                                                | Bool               | Playable       |
| InStation                                                                          | Returns `true` if the user is in a station, `false` if not                                                                                                                         | Bool               | IK             |
| Earmuffs                                                                           | Returns `true` if the user's Earmuff feature is on, `false` if not                                                                                                                 | Bool               | Playable       |
| IsOnFriendsList                                                                    | Returns `true` if the user viewing the avatar is friends with the user wearing it. `false` locally.                                                                                | Bool               | Other          |
| [AvatarVersion](/worlds/components/vrc_station/#detecting-sdk2-avatars) | Returns `3` if the avatar was built using VRChat's SDK3 (2020.3.2) or later, `0` if not.                                                                                           | Int                | IK             |
| IsAnimatorEnabled                                                                  | Returns `false` one frame before the avatar's animator is disabled, and `true` when it's enabled.                                                                                  | Bool               | None           |

[^1]: GestureLeftWeight and GestureRightWeight go from 0.0 to 1.0 in various gestures depending on the trigger pull. For example, if you make a fist but don't pull the trigger on the left hand, GestureLeft will be 1, but GestureLeftWeight will be 0.0. When you start pulling the trigger, it will climb from 0.0 towards 1.0. This can be used to create "analog" gestures or conditionally detect various things.

### Avatar Scaling Parameters

Your Playable Layer can react to the player's current [avatar scale](/avatars/avatar-scaling) by using the parameters below:

| Name               | Description                                                                                                                                                                                     | Type  | Sync     |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- | -------- |
| ScaleModified      | Returns `true` if the user is scaled using avatar scaling, `false` if the avatar is at its default size.                                                                                        | Bool  | Playable |
| ScaleFactor        | Relation between the avatar's default height and the current height. An avatar with a default eye-height of 1m scaled to 2m will report `2`.                                                    | Float | Playable |
| ScaleFactorInverse | Inverse relation (`1/x`) between the avatar's default height and the current height. An avatar with a default eye-height of 1m scaled to 2m will report `0.5`. Might be inaccurate at extremes. | Float | Playable |
| EyeHeightAsMeters  | The avatar's eye height in meters.                                                                                                                                                              | Float | Playable |
| EyeHeightAsPercent | Relation of the avatar's eye height in meters relative to the default scaling limits (`0.2`-`5.0`). An avatar scaled to 2m will report `(2.0 - 0.2) / (5.0 - 0.2)` = `0.375`.                   | Float | Playable |


### Parameter Types

You can define the following types of parameters in your [Expression Parameters asset](#expression-parameters-asset):

| Parameter Type | Range             | Parameter Memory Usage | Notes                                |
| :------------- | :---------------- | :--------------------- | :---------------------------------   |
| `int`          | `0`-`255`         | 8 bits                 | Unsigned 8-bit int.                  |
| `float`        | `-1.0` to `1.0`   | 8 bits                 | Signed 8-bit fixed-point decimal[^2]. |
| `bool`         | `True` or `False` | 1 bit                  |                                      |

[^2]: Remotely synced `float` values have 255 possible values, giving a precision of `1/127` over the network, and can store `-1.0`, `0.0`, and `1.0` precisely. When updated locally, such as with [OSC](https://docs.vrchat.com/docs/osc-overview), float values are stored as native (32-bit) floating-point values in animators. 

Each synced parameter uses a certain amount of parameter memory. VRChat can synchronize up to 256 bits of custom parameters. VRChat also limits your avatar to 8192 total custom Expression Parameters (synced and unsynced). [Built-in parameters](#built-in-parameters) do not count toward these limits.

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

## Custom parameters

You can add your own parameters to your avatar's Playable Layers.

You must [create a Expression Parameters asset](#expression-parameters-asset), which allows you to [control parameters in VRChat](#how-to-control-custom-parameters). For example, you can set up an [expressions menu](/avatars/expression-menu-and-controls) and allow users to customize your avatar in VRChat.

### Expression Parameters Asset

An Expression Parameters asset contains the list of custom parameters that your Playable Layers can use. Each parameter has a name, type, and default value. You can also choose whether the parameter should be synchronized for other players, which allows other players to see changes caused by the animator and custom parameters.

![What expression parameters look like by default.](/img/avatars/expression-menu/default-parameters.png)

:::tip

Learn how to create an Expression Paramaters asset by reading the [Expressions Menu](/avatars/expression-menu-and-controls#creating-an-expressions-menu) documentation.

:::

### How to Control Custom Parameters

After setting up custom parameters in your avatar's Playable Layers and Expression Parameters asset, you can control them in three different ways:

- Set up an [Expressions Menu](/avatars/expression-menu-and-controls), which allows users to easily control the parameters in VRChat, e.g., switch between outfits or play custom animations. Expressions Menus are the easiest and most common method to control custom parameters.
- You can attach the state behaviour [Avatar Parameter Driver](/avatars/state-behaviors#avatar-parameter-driver) to states in your Playable Layer. It can automatically set, add, or randomize parameters that you defined in your Expression Parameters asset.
- You can set up your avatar for [OSC](https://docs.vrchat.com/docs/osc-overview), allowing users and third-party tools to control parameters. For example, [VRCFaceTracking](https://docs.vrcft.io/) uses face and eye tracking hardware to control an avatar's facial expression parameters. 

### Default AV3 Aliasing

There's a few "defaults" in use by the template AV3 VRChat controllers that you can use if you don't want to build out your own controllers. These won't collide with your own use (as long as you don't name them the same thing) thanks to aliasing.

In particular, the Default Action and FX layers use aliasing. You don't need to worry about using a Expression that is in these layers. 

Actions use aliased parameters named `VRCEmote`, which is an Int with a range of 1 to 16.

FX uses aliased Float parameters called `VRCFaceBlendH` (-1,1) and `VRCFaceBlendV` (-1,1), if you want to try out your own menus to use them. The default FX layer requires that you have a skinned mesh named `Body` with `mood_happy` , `mood_sad` , `mood_surprised` , and `mood_angry` blendshapes.

To restate, if you have an avatar that you upload as an Avatar3 avatar without any custom Playable layers, you'll be able to use some built-in emotes with them as long as you've got the above-named blendshapes.

If you also have an `eyes_closed` blendshape, it'll close them when you use the default Die emote or go AFK.

### Cross-Platform Parameter Sync

When using an avatar that has both Quest and PC versions uploaded, parameters are synced by their position in the parameters list and their parameter type, **not** by the names of the parameters. For a given parameter to sync between PC and Quest, it has to be in the same position in the parameter list, and have the same parameter type. 

Given this, you should always use the same Expression Parameters asset for both the PC and Quest versions of an avatar, even if one version doesn't make use of all the parameters.

### Mismatched Parameter Type Conversion

When you choose a [parameter type](/avatars/animator-parameters/#parameter-types) in your [animator](https://docs.unity3d.com/Manual/AnimationParameters.html), it's a good idea to choose the same type as the [built-in parameter](/avatars/animator-parameters/#built-in-parameters) or [custom parameter](/avatars/expression-menu-and-controls/#creating-an-expressions-menu) you're trying to use. For example: If you use VRChat's built-in `AFK` parameter in your animator,  you should choose the type `bool`.

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

### Trigger Typed Parameters

At this time we don't recommend using Trigger type parameters in your animation controllers.  These values can become de-synced between versions of your avatar, including remote clients viewing your avatar or in special situations like viewing your avatar in the mirror.  If you are going to represent the state of your avatar please use either Int, Float or Bool typed parameters.

## Sync Types

VRChat synchronizes most [built-in](#built-in-parameters) parameters with other players in the instance, and you can enable synchronization for your own [custom](#custom-parameters) parameters.

The sync type determines how VRChat syncs each parameter. Parameters use one of the following sync types:

- **Speech**
	- Only used for visemes.
	- Driven Oculus Lipsync output parameters depending on your speech.
	- Updated locally, not directly synced (because its driven by audio)
- **Playable**
	- A slower sync mode meant to synchronize longer-running animation states.
	- Updates every 0.1 to 1 seconds as needed based on parameter changes (1 to 10 updates per second), but you shouldn't rely on it for fast sync.
- **IK**
	- A faster sync mode meant to synchronize frequently-changing values.
	- Updates continuously every 0.1 seconds (10 updates per second), and interpolates `float` values locally for remote users.
	- Depending on the parameter, this may also just be calculated based on the avatar's locally rendered IK state.
- **None**
	- This parameter is not synchronized with other player. 
	- For example, `IsLocal` is always true for the local player's avatar and `false` for the avatars of other players. 

If you enable synchronization for your [custom](#custom-parameters) parameters, VRChat usually uses the **Playable** sync type. However, when you control a parameter with a [Puppet control](/avatars/expression-menu-and-controls#types-of-controls), VRChat switches from **Playable** to **IK** sync, improving the update rate smooth interpolation. When you close the Puppet control, it returns to Playable sync.