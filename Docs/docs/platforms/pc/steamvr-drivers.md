---
sidebar_label: SteamVR Drivers
---
# SteamVR Skeletal Hand Tracking Driver Guide

:::warning
Skeletal hand tracking is not fully available yet, it is currently in Open Beta.
:::


This guide is intended to help authors of custom **SteamVR Skeletal Input Drivers** get their drivers working well with VRChat, now that VRChat is updating to SteamVR Input 2.0. Whether you’ve got an existing driver you’d like to ensure works properly, or you are creating a brand new driver to use with VRChat via SteamVR, it might be a good idea to review [Valve’s documentation on creating a SteamVR Skeletal Driver](https://github.com/ValveSoftware/openvr/wiki/Creating-a-Skeletal-Input-Driver) as well as their more general [Driver API Documentation](https://github.com/ValveSoftware/openvr/blob/master/docs/Driver_API_Documentation.md)

## When & How Does VRChat use SteamVR Skeletal Data?

### Animating Avatars

For the purposes of animating an avatar’s hands, VRChat will use any skeletal data that is bound to the ```SkeletonLeftHand``` or ```SkeletonRightHand``` actions whenever they are bound to an input source and are available. In every such case, the skeletal animations for ```VRSkeletalMotionRange_WithoutController``` will be fetched from the action and stored into an intermediary. The internal representation of the intermediary will store bone *positions* as well as *rotations*, however, as of the writing of this document, the retargeting that gets applied to the avatar will *only* provide rotations. This is because, unless an avatar’s 3d hand mesh was carefully and thoughtfully designed to work well with joint positions for hands of arbitrary finger lengths, they can appear distorted or crunched. The downside to this is that an avatar hand of arbitrary proportions cannot be guaranteed to accurately serve as visual feedback for actions such as pinching and grabbing.

### As A Gameplay/Menu/etc Input

VRChat decides to use the provided skeletal animation data as an input on a per-hand basis whenever the Skeleton Action’s ```eSkeletalTrackingLevel``` value is ```VRSkeletalTrackingLevel.VRSkeletalTracking_Full``` 

As a recap, ```eSkeletalTrackingLevel``` has the following values:

* ```VRSkeletalTracking_Estimated``` - body part location can’t be directly determined by the device. Any skeletal pose provided by the device is estimated by assuming the position required to active buttons, triggers, joysticks, or other input sensors. Vive Controllers are the most well known example
* ```VRSkeletalTracking_Partial``` - body part location can be measured directly but with fewer degrees of freedom than the actual body part. Certain body part positions may be unmeasured by the device and estimated from other input data. E.g. Index Controllers, Etee controllers, gloves that only measure finger curl, etc
* ```VRSkeletalTracking_Full``` - body part location can be measured directly throughout the entire range of motion of the body part. E.g. Ultraleap tracking, Meta hand tracking, MediaPipe hand tracking, gloves that measure rotation of each finger segment

As such, it should be apparent why we use this value - it tells us directly how much *actual information* regarding the hand’s pose is available inside of the supplied skeleton. It’s the only part of the API that offers up this kind of information, so we have to use it for this purpose.


The interaction model for full fidelity skeletal hand tracking is built upon us doing quite a bit of involved processing on the skeleton data. We calculate our own **pinch detection** by doing distance checks from the thumbtip to the fingertip, and use it for ‘clicks’ in the UI, as well as gestural inputs that are built around thumb-fingertip pinches for all fingers, index, middle, ring, and pinky. Here are the current gestural actions:

Left Hand:

* thumb-index pinch:
    * when the palm is directly facing the user’s head: menu open
    * when the palm is facing away, and a raycast is active: ui click
* thumb-middle pinch: locomotion
* thumb-ring pinch & hold when generally facing the user’s head: mic mute
* thumb-pinky pinch & hold when generally facing user’s head: disable gesture inputs

Right Hand:

* thumb-index pinch: None
* thumb-middle pinch: turning
* thumb-ring pinch when generally facing user’s head: jump
* thumb-pinky pinch when generally facing user’s head: cancel/drop

This means that you **do not need to provide these actions** from any non-skeletal, non-pose (boolean, scalar, vector2, etc) [input component handles](https://github.com/ValveSoftware/openvr/blob/master/docs/Driver_API_Documentation.md#creating-components) that are related to the ‘device’ that the skeletal hand tracking is come from. In fact, doing so may cause double clicks and/or accidental activations. We’ll go into this more in the **Controller Emulation** section later.

This also means that *calculating your joint poses correctly is of utmost importance*. Most tracking systems will require some kind of coordinate space conversion to properly match SteamVR’s, and this process presents an opportunity for errors to slip in. This leads us to the next section, visually checking your skeleton data.

### Debugging Your Skeleton Data Visually

You can visualize your skeleton data for debugging purposes.

![Accurate Hands Image](/img/input/ghost-hands.png)

These are called the *accurate hands* in our menu. They always appear in menus and loading scenes, or when the avatar is a generic (non humanoid) avatar. They can optionally be enabled to *replace* the avatar’s hands locally (not visible over the network) in the controls menu

As indicated in the caption above, VRChat has a hand visualization that we are calling *Accurate Hands* (as opposed to Avatar Hands). These are the closest possible representation of the underlying tracking data that we can provide while still looking like a 3d hand mesh. These are useful in many cases, but for the purposes of this document, we invite you to use them as a debugging/confirmation tool to ensure that your provided tracking data is accurate and dialed in to provide the best input experience possible. Fingertips should touch when making pinching gestures, and if the tracking system you are using measures the length of each joint, that should be reflected in this as well. 

To activate this mode, you’ll want to open the **Main Menu**, then go to the **Settings** page, then the **Controls** category.


![Controls Page](/img/input/controls-page.png)


Click the ‘Accurate’ button to the right. The hands should switch.

## Controller Emulation

To date, the most common technique for getting optical finger tracking (or less frequently, gloves) working in SteamVR is an approach called ‘controller emulation'. This is where a custom SteamVR driver uses an [input profile](https://github.com/ValveSoftware/openvr/wiki/Input-Profiles), tracked device objects with the [properties](https://github.com/ValveSoftware/openvr/blob/master/docs/Driver_API_Documentation.md#device-properties) of, and rendermodels of, an existing, well-known device in the SteamVR ecosystem, usually Touch or Index controllers, in an attempt to pass off as them. Then sending the skeletal data from the source tracking system (such as Meta Quest or Ultraleap) along the skeletal tracking input handle so that it goes into the application’s skeletal tracking actions, and sometimes sending the fidelity level as full. While this does get the finger tracking data into an application, it is not an ideal approach.

* Applications can’t tell what the actual hardware being used is
* Some properties of a controller (such as fidelity level enum) cannot be changed after the skeletal input component is initialized, which makes multimodal switching between controllers and hands at runtime impossible for the application to respond to
* The path-of-least-resistance to filling the virtual controller’s other inputs (trigger, joysticks, buttons, etc) is to put in simple invisible gestures that are frustrating from a user experience perspective.
* The virtual inputs for other actions (the aforementioned trigger, joysticks, buttons, etc) can clash with application-side inputs generated from the tracking data. This could manifest in ways such as double-clicks for menu interactions, or a grab event being triggered by the driver and the application’s gestural input system at the same time. This can lead to unexpected and confusing outcomes for the user.
* Users will not be able to be able to have a separate binding for finger tracking vs holding a controller. If a user changes or disables an input-action mapping for hands (likely to avoid the previously listed problem), that binding will also remain when they go back to controllers. In the case of clicking or grabbing, this would leave them unable to click or grab when they go back to controllers.

For these reasons, we do not officially support this ‘controller emulation’ approach. We have some code that will try to detect when this is happening, and may tell the user that the input is unsupported, possibly having unintended side effects.

*Please* do not misrepresent the hardware/inputs you are sending to SteamVR/VRChat. You may notice that Valve indicates [in their documentation](https://github.com/ValveSoftware/openvr/blob/master/docs/Driver_API_Documentation.md#notes-on-hand-tracking-compatibility) that VRChat checks to see if the current controller is Knuckles before activating finger tracking, and that you should use their built in generic controller emulation for targeting VRChat. **This is no longer true**. This guide should be considered authoritative. If you have already set up controller emulation bindings for VRChat using this emulation system, they should be removed.

## Recommended Approaches

### Streaming Applications

If you’re building a streaming application that connects a standalone device (like Meta Quest) to SteamVR, your application will likely want to support tracked controllers like Touch in addition to controllerless-hand tracking. You may also want to support fast-switching from controllers to hands, in addition to ‘multimodal’ usage, where one hand is holding a controller and the other is tracked in a controllerless fashion. Existing SteamVR drivers such as lighthouse show us that **multiple input devices can live within a single SteamVR driver**. Our recommended approach then is to:

Make a virtual controller ([input profile](https://github.com/ValveSoftware/openvr/wiki/Input-Profiles), tracked device id & [properties](https://github.com/ValveSoftware/openvr/blob/master/docs/Driver_API_Documentation.md#device-properties), [input component handles](https://github.com/ValveSoftware/openvr/blob/master/docs/Driver_API_Documentation.md#creating-components), etc) for each pre-existing physical controller type your streaming application supports.

Make a totally new virtual controller that is just for controllerless hand-tracking.

#### Physical Controllers

For these, just replicate the controllers you’re passing through. These should have the same input profile and components as they’d normally have - thumbsticks, buttons, etc, and the same tracked device properties (model name, rendermodel, manufacturer, etc), and same input sources/roles (left/right hand for controllers, head for the HMD), and initialize the skeletal tracking level to whichever the controller offers (for touch this would be Estimated).

#### Hand Virtual Controller

For these, you’ll want an input profile and component handles that provide the minimal necessary inputs.  These are:

* Dashboard
* System click (for interacting with the dashboard)
* Hand Pose
* Skeleton

You can provide other inputs if you like (especially if your gestures are well-designed and/or you have an overlay that provides feedback for them), but we recommend leaving them out of the default bindings you provide to VRChat.

From here you’ll want to provide a descriptive set of properties for virtual your hand controller. Let’s use a hypothetical example: Your streaming app is ‘**Bitriver**,’ and it streams the skeletal hand tracking from a Meta Quest. You could do the following for each property:

Both left and right hands:

| Property                       | Value                             |
| ------------------------------ | --------------------------------- |
| Prop_ManufacturerName_String   | Meta                              |
| Prop_TrackingSystemName_String | Oculus Insight                    |
| Prop_ModelNumber_String        | Bitriver_Hand                     |
| Prop_ControllerType_String     | Bitriver_Hand                     |
| TrackedDeviceClass             | Controller                        |
| Prop_InputProfilePath_String   | *Path to input profile json file* |

For the left hand:

| Property                      | Value              |
| ----------------------------- | ------------------ |
| Prop_SerialNumber_String      | BitRiver_Left_Hand |
| Prop_ControllerRoleHint_Int32 | 1                  |


For the right hand:

| Property                      | Value               |
| ----------------------------- | ------------------- |
| Prop_SerialNumber_String      | BitRiver_Right_Hand |
| Prop_ControllerRoleHint_Int32 | 2                   |

:::note
Every controller that supports Skeletal Input will have a tracked device, and the **Pose** component of this tracked device is called the **Base Pose** of the skeleton - the skeleton’s transform coordinate space is a child of this base pose.
:::

When your user’s VR system indicates that it is switching between hand tracking and controller tracking, you will want to indicate this switch by changing the booleans you send in each tracked device’s **Base Pose** components when calling `vr::VRserverDriverHost()->  TrackedDevicePoseUpdated()`. The relevant fields in DriverPose_t are:

- `poseIsValid`
- `deviceIsConnected`

When your **controllers** are active, set their ```poseIsValid``` to ```true``` (unless your controller’s API provides better values for this, such as in the case the API you are using indicates a pose is low-confidence and should be rejected) and ```deviceIsConnected``` to true. Then set ```poseIsValid``` in your virtual hand to ```false```, and your ```deviceIsConnected``` in your virtual hand to ```false```

When your **hand tracking** is active, you will want to set the opposite values. Set your controller’s tracked device pose component’s ```poseIsValid``` and ```deviceIsConnected``` to ```false```, and your virtual hand's ```poseIsValid``` to ```true``` when the hand is tracked, and ```false``` when it is untracked, and ```deviceIsConnected``` to ```true```. 

#### PCVR Peripherals

In the case that you are building a single peripheral for PCVR (such as writing your own computer vision hand tracking system, or you are building a glove), you will only need to do the second part of the previous section - building a new virtual controller, named appropriately, to represent the hand. You will not need to do any controller vs hand hand-off. 

## Finger Tracking Exclusive Mode

:::warning Deprecated

VRChat may remove this feature in the future. Any non-conformant drivers that provide their own inputs to various actions will provide a worse user experience.

*VRChat used this feature during development. All drivers supplied inputs to SteamVR Actions that VRChat's custom tracking-based input system could infer on its own. Finger Tracking Exclusive Mode allowed full-fidelity hand tracking during development without getting double clicks, double grabs, etc.*

:::

When users enable Finger Tracking Exclusive mode, VRChat disregards any SteamVR inputs bound to actions other than Pose and SkeletonLeftHand and SkeletonRightHand. 
