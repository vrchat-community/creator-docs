import UnityVersionedLink from '@site/src/components/UnityVersionedLink.js';

# State Behaviors

:::caution Unity Knowledge Required

This document is written with the assumption that you know a bit about <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/class-AnimatorController.html">Unity Animators</UnityVersionedLink>.
:::
When you've got a specific state selected in the Animator view, you'll be able to add State Behaviors. They're a bit like components for states. They do different things. Try adding them, and you'll see what they can do!

All state behaviors run on the first frame of the transition into that state. 

State behaviors *should* run no matter how long the state machine remains in the state containing the state behavior.

:::caution

The term "should" is deliberately used here, as in the <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/StateMachineBehaviours.html">Unity documentation</UnityVersionedLink> does not define any guarantee that state behaviors will execute given very small transition or state durations.

If you wanted to be **completely** safe, ensure the total time spent in the state containing the state behavior and any transitions directly to that state is a minimum of 0.02 seconds-- although in practice, this doesn't seem to be required.

:::

## Animator Layer Controller

![Unity_2020-07-08_12-50-04.png](/img/avatars/state-behaviors-e78eb77-Unity_2020-07-08_12-50-04.png)

The Animator Layer Control allows you to blend the weight of a specific Animator Layer inside any given Playable Layer over any given time.

If the state is exited mid-blend duration, the target layer is immediately set to the goal weight.

The layer weight will remain until some other state runs this State Behavior again and resets it.

| Property Name  | Purpose                                                                                       |
| -------------- | -------------------------------------------------------------------------------------------- |
| Playable       | Allows you to select which Playable Layer you're affecting.                                  |
| Layer          | The Index of the Playable Layer you wish to affect. You can't change the weight of the 0th (base) layer-- it is always set to 1.0 weight. |
| Goal Weight    | Define the weight you want to blend to.                                                      |
| Blend Duration | Define the time period (in seconds) that you want the blend to take. 0 means instant.        |
| Debug String   | When this StateBehavior runs, this string will be printed to the output log. Useful for debugging. |


## Animator Locomotion Control

![state-behaviors-f6f3250-Unity_2020-07-08_13-16-13.png](/img/avatars/state-behaviors-f6f3250-Unity_2020-07-08_13-16-13.png)

The Animator Locomotion Control allows you to disable locomotion in a given state of an animator. The Locomotion state will remain until some other state runs this State Behavior again and changes it.

In Desktop mode, this disables translational movement, and restricts rotational (view) movement to the vertical axis. In VR, this disables translational and rotational controller movement and restricts half-body IK (full-body IK is unaffected). In both modes, the player's capsule is frozen in place.

| Parameter | Description |
| - | - |
| Disable Locomotion | If set to True, locomotion (moving with the controls) will be disabled. Roomscale movement will still be possible. If set to False, will enable locomotion. |
| Debug String | When this StateBehavior runs, this string will be printed to the output log. Useful for debugging. |

## Animator Temporary Pose Space
![state-behaviors-467daaf-Unity_2020-07-14_21-38-14.png](/img/avatars/state-behaviors-467daaf-Unity_2020-07-14_21-38-14.png)

The Animator Temporary Pose Space control allows you to move the viewpoint of the person wearing the avatar to the head at that given point of the animator state.

The view will remain set until some other state runs this State Behavior again and resets or clears it.

This behavior is executed when the delay time has elapsed.

Animator Temporary Pose Space should **only** be used when the view height needs to update due to a posture change, like sitting or laying on the ground. It cannot be used to "scale" the avatar being worn, and will cause major breaking problems if used in this manner.
:::danger

This state behavior **will not execute** if the state this behavior is on is exited or interrupted before `Delay Time` elapses!
:::

| Property Name | Purpose                                                                                                                                                   |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pose Space    | Enter or exit. Enter sets the pose space, exit will clear it to default.                                                                                    |
| Fixed Delay   | Should the delay time be a fixed period of time, or a percentage of the state's duration?                                                                   |
| Delay Time    | If given a value, the viewpoint will be set after a delay. Useful if you're blending into an animation over a certain time.                                |
| Debug String  | When this StateBehavior runs, this string will be printed to the output log. Useful for debugging.                                                          |


## Animator Tracking Control

![state-behaviors-076baca-Unity_2020-07-08_13-26-00.png](/img/avatars/state-behaviors-076baca-Unity_2020-07-08_13-26-00.png)

The Animator Tracking Control allows you to enable or disable IK or simulated movement on various different parts of the avatar body. Setting the option to "No Change" will not change the body part from its current value. "Tracking" will set it to following IK or simulated movement. "Animation" will force that body part to respect values as given by the avatar's Animator.

If you set all IK tracking points to Animation, your animation will play as the Animation remotely, instead of being translated through Networked IK. For the various types of tracking, these "IK tracking points" are:

- Desktop: Head, Left Hand, Right Hand
- 3pt Tracking: Head, Left Hand, Right Hand
- 6pt / FBT Tracking: Head, Left Hand, Right Hand, Hip, Left Foot, Right Foot

:::note

All parts are IK-driven, aside from the Eyes and Eyelid, which are simulated. Mouth and Jaw are driven by visemes.

As an example, setting Left and Right Hand to Animation will ignore the position of the hands (and arms) as defined by IK, and will instead use any currently-active state's motion to define the position of the hands and arms. Setting them back to Tracking will use IK instead. 

Setting Eyes & Eyelid to Animation will disable eye movement and eyelid blinking. Setting Eyes & Eyelid to Tracking will re-enable the simulated eye movement and blinking.

Setting Mouth and Jaw to Animation will disable visemes, and viseme parameters will stop being updated. Setting Mouth and Jaw will re-enable visemes and they will start updating again.
:::
The Tracking setting will be kept until some other state runs this State Behavior again and resets it.

| Parameter | Description                                                                                         |
| :-- |:----------------------------------------------------------------------------------------------------|
| Tracking Control | See description above.                                                                              |
| Debug String | When this State Behavior runs, this string will be printed to the output log. Useful for debugging. |

## Avatar Parameter Driver

![image](/img/avatars/state-behaviors-fa19a1d-2022-06-02_18-11-06_Unity.png)

The Avatar Parameter Driver can manipulate Animator Parameters in a variety of ways. A single Avatar Parameter can perform multiple operations, and they are done in order from top to bottom. These operations are completed *once* upon entry to the State upon which the behavior resides.

`Local Only` will cause the driver to only operate locally, as a shortcut instead of detecting `isLocal`.

Clicking "Add" will add a new operation to the Driver. The first type (which is selected by default) is "Set".

If modifying a synced parameter (anything defined in the VRCExpressionParameters object) those values will be clamped to their maximum range. Int [0,255] Float [-1,1].

However, Parameters only defined in the Animation Controller (aka, "local parameters") can still be modified by a parameter driver. Those values aren't clamped.

You also cannot drive any of the [VRChat-defined Animator Parameters](/avatars/animator-parameters).

Set, Add, Random, and Copy work for `float` and `int`. Set, Random, and Copy work for `bool`.

### Set
Set will simply set the Value to the named Parameter in Destination.

![state-behaviors-121fe2a-2022-06-02_18-11-13_NVIDIA_Share.png](/img/avatars/state-behaviors-121fe2a-2022-06-02_18-11-13_NVIDIA_Share.png)

### Add
Add will add the Value to the named Parameter in Destination.

As the component points out, using Add may not produce the same result when run on a remote instance of the avatar. When using Add, it is suggested to use a synced Destination Parameter and only run the driver locally.

![state-behaviors-e10bb6a-2022-06-02_18-11-17_Unity.png](/img/avatars/state-behaviors-e10bb6a-2022-06-02_18-11-17_Unity.png)
        
### Random
Random will set the Destination Parameter to a random number between Min Value and Max Value.

As the component points out, using Random may not produce the same result when run on a remote instance of the avatar. When using Random, it is suggested to use a synced Destination Parameter and only run the driver locally.

![state-behaviors-99c6248-2022-06-02_18-11-23_Unity.png](/img/avatars/state-behaviors-99c6248-2022-06-02_18-11-23_Unity.png)

### Copy
Copy will set the value of the Source Parameter to the Destination Parameter. This can be used to set one float to match another float, to remap one float into a different range, or to convert between two different types entirely.
:::caution

VRChat's built-in parameters, such as `GestureLeftWeight`, **can** be specified but do not work as source parameters.
:::

![state-behaviors-bffdb10-2022-06-02_18-11-30_Unity.png](/img/avatars/state-behaviors-bffdb10-2022-06-02_18-11-30_Unity.png)

#### Converting between types
When converting from a `bool`, False counts as 0 and True counts as 1.

When converting to a `bool`, 0 is False and *anything* else is True.
When converting to an `int`, it will always round *down* to the nearest whole number.
When converting to a `float`, it will directly copy the value, even if it goes outside the range that it is capable of syncing to other players.

#### Custom Ranges
You can also use the `Convert Range` checkbox to enable some additional UI that allows you to set custom conversion ranges. This can be used to remap values or to have more control over exactly how it converts from one type to another type.

![state-behaviors-cab639b-2022-06-02_18-35-32_Unity.png](/img/avatars/state-behaviors-cab639b-2022-06-02_18-35-32_Unity.png)

## Playable Layer Control

![state-behaviors-33760a2-Unity_2020-07-08_13-36-13.png](/img/avatars/state-behaviors-33760a2-Unity_2020-07-08_13-36-13.png)
        
The Playable Layer Control allows you to blend the weight of the entire Playable Layer to a specified value over specified duration. Very similar to Animator Layer Control, but instead controls the entire Playable Layer.

The Action Playable layer will use this State Behavior often, as the Action layer has weight zero by default, and should always be blended back to zero after the animation is complete.

If the state is exited mid-blend duration, the playable layer is immediately set to the goal weight.

| Property Name  | Purpose                                                                                                        |
| -------------- | -------------------------------------------------------------------------------------------------------------- |
| Layer          | The Playable Layer to affect.                                                                                   |
| Goal Weight    | The Playable layer weight to target after blending is complete.                                                 |
| Blend Duration | The amount of time to take to blend to the layer. Zero is instant.                                              |
| Debug String   | When this StateBehavior runs, this string will be printed to the output log. Useful for debugging.             |

## Animator Play Audio

![image](/img/avatars/state-behaviors-animatorplayaudio.png)

The "Animator Play Audio" behavior modifies an AudioSource when transitioning to the animation state. It can change the audio clip, pitch, or loop value, and it can play the AudioSource.

The relative path of the AudioSource (i.e. `Armature/Hips/Spine/`) must be entered into the "Source Path" property. This property can be filled out automatically by selecting an audio source component. If the audio source is on the root of the avatar, "Source Path" should be blank.


The "Playback order" property does not guarantee that audio clips are played in the same order for all players. For example, the "Random" setting may choose a different clip for each player. If you want to guarantee that all players hear the same clip, use multiple animation states or change "Playback Order" to "Parameter" in conjunction with a synced animator parameter. 

"Animator Play Audio" can be added to states inside a sub-state machine. However, adding it to the sub-state machine itself is not recommended. The state behavior will be applied for every state transition in the sub-state machine, which may cause unintended interactions with other state behaviors.

| Property Name | Purpose |
| ---- | ---- |
| Source Path | The path to the AudioSource relative to the avatar's root transform.<br/>If the AudioSource is not found when transitioning to this state for the first time, AnimatorPlayAudio will be disabled. |
| Playback Order | Determines which audio clip is chosen when transitioning to this state.<br/>• Random: Chooses a random clip. (Default)<br/>• Unique Random: Chooses a random audio clip, but not the same clip twice in a row.<br/>• Roundabout: Chooses the first clip, then the second, and so on. After the last clip, the first clip is chosen again.<br/>• Parameter: Chooses a clip based on an ["int" type avatar parameter](/avatars/animator-parameters#parameter-types). For example, if the parameter is 0, the first clip is chosen. The parameter must be defined in the avatar's Expressions Parameters. If the parameter cannot be found, the first clip is chosen instead. |
| Clips | A list of AudioClips that can be applied to the AudioSource when transitioning to this state. |
| Random Volume | The random volume that is applied to the AudioSource when transitioning to this state. Clamped from 0 to 1.<br/>• Min: The minimum random volume. (Default: 1)<br/>• Max: The maximum random volume. (Default: 1) |
| Random Pitch | The random pitch that is applied to the AudioSource when transitioning to this state. Clamped from -3 to 3.<br/>• Min: The minimum random pitch. (Default: 1)<br/>• Max: The maximum random pitch. (Default: 1) |
| Loop | Whether the AudioSource's looping should be set enabled or disabled when transitioning to this state. |
| On Enter | Whether to start or stop the AudioSource when transitioning into this state. Executed before "On Exit".<br/>🗹 Stop Audio Source (Default: Enabled)<br/>🗹 Play Audio Source (Default: Enabled) |
| On Exit | Whether to start or stop the AudioSource when transitioning into this state. Executed before "On Enter".<br/>☐ Stop Audio Source (Default: Disabled)<br/>☐ Play Audio Source (Default: Disabled) |
| Play On Enter Delay In Seconds | The delay before "Play On Enter" plays a clip, if enabled. Clamped from 0 to 60 seconds. (Default: 0 seconds) |

Each audio setting has an additional property. By default, it's set to "Apply If Stopped". This prevents the setting from being applied if the audio source has not finished playing its previous clip and "Stop Audio Source On Enter" is disabled.

| Setting name     | On Enter |
|------------------|------------------------------------------------------------------------------------------- |
| Always Apply     | The setting is applied to the audio source, even if it is currently playing a clip.               |
| Apply If Stopped | The setting is applied to the audio source unless it's already playing a clip. (Default)   |
| Never Apply      | The setting is unused and greyed out in the inspector.                                     |
