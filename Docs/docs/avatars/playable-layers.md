---
title: "Playable Layers"
slug: "playable-layers"
excerpt: "Create simple or complex animations for your VRChat avatar"
hidden: false
createdAt: "2020-08-05T22:29:37.898Z"
updatedAt: "2023-02-06T14:15:33.627Z"
---
When you create animations for your VRChat avatar, you'll utilize VRChat's 'Playable Layers.' They allow cleanly separate some things you might want to do with your avatar into their own animations - such as running, jumping, giving a thumbs-up, smiling, wagging your tail, and combinations of these.
:::caution Unity Knowledge Required

This document is written with the assumption that you know a bit about [Unity Animators](https://docs.unity3d.com/2019.4/Documentation/Manual/class-AnimatorController.html).
:::

In the Avatars 3.0 Avatar Descriptor, all humanoid avatars have five buttons:
- Base
- Additive
- Gesture
- Action
- FX

Generic avatars only have three buttons:
- Base
- Action
- FX

These are **Playable Layers**. Each of them takes a Unity Animator, and they layer on top of each other. In other words, you've got five root animators to play with, and each of them can have several **Animator Layers**.

These layers apply in order-- in other words, Base gets applied, then Additive, then Gesture, Action, FX. For example, if something in Additive animates a bone (with 1.0 weight), and then something in Action animates that same bone (with 1.0 weight), the Action animation will take precedence.

We have example Playable Layers available in the SDK. Depending on how you learn and iterate on things, it might be easier for you to use and edit these default layers to figure things out!

When you are running VRChat and you're wearing (or viewing) an Avatar 3.0 avatar, all of these Playable Layers are put together into a combined Animator. This Animator is the root, main animator of your avatar, and you can control any part of it. **This means that there is no reason to add any additional animators on your avatar.** 

As an aside, you should never use the same controller in multiple Playable Layers. This may work for some setups, but it is **very** poor practice and will cause major issues as you expand the functionality of your avatar.
:::danger Only Use Animation Controllers

We only support the use of Animation Controllers in Playable Layer slots. Do not use any other type of controller-- you will run into errors or will be unable to upload the content.
:::
What do these Playable Layers do? Here's the short version:

**Base:** Stuff that should always play, react to movement (like locomotion), or the locomotion state of your avatar (running, falling, crouching, etc). Transform animations only.
**Additive:** Stuff that Base is already using, but you want to "add" to it-- like a breathing animation. Transform animations only.
**Gesture:** Things that get triggered by hand OR by the Expression menu. You can also use this for "idle animations" like a wagging tail, flapping wings, or moving ears. Transform animations only.
**Action:** Full override, similar to AV2 emotes. Transform animations only.
**FX:** Same as Gestures, but for everything that *isn't* a Transform position, rotation, or scale animation.

That's great, but let's go into some more detail.

## Base

The Base layer contains locomotion animations, including blend trees for walking, running, strafing. It also includes animation states for jumping, falling, falling fast, crouching, and crawling, among other things.

Keep in mind that if you put something in here, you'll have to redefine your locomotion animation states. This is pretty complex! Take a look at the example Base Playable Layer to see how complex it can get.

Animations in Base should _only_ affect transforms, and all layers should be using Avatar Masks to ensure you're only affecting the appropriate transforms.

## Additive

The Additive layer is meant for additive transform movement on top of humanoid bones that are animated in Base-- things like breathing animations that can "add on" to the Base layer.

**If you want to add an idle animation to non-humanoid bones-- like a tail, ears, or etc-- use Gesture instead!** Additive is *specifically* for humanoid bones.

The Additive layer is special because it is _always_ set to "Additive" blending. In short, if you've got a transform that moves during locomotion, the Additive animation will "add" its animation on top. This can act really weirdly if you do crazy things to bones in Additive, so try to keep it pretty minimal.

:::caution Additive First Layer Avatar Mask Ignored

The first layer (base layer, 0th layer, etc)'s Avatar Mask is ignored. This is for internal masking purposes. You can still mask other layers, but any mask you apply to the first layer will be ignored.
:::

Animations in Additive should _only_ affect transforms.

## Gesture

The Gesture layer is for animations that need to act on individual body parts while still playing the underlying animations for the rest of the body. Kind of like AV2 Gestures, but applied to any part of the body.

Utilize Avatar Masking to ensure that the animations *only* affect the parts of the avatar you want to animate! So, if you want your gesture parameters to only make hand shapes for left/right hand, you'll want to mask out those hands on each of the layers.

In addition, if you want to have an "idle" animation for non-humanoid bones like a tail, wings, ears, etc-- Gesture is where you should put it.

Animations in Gesture should _only_ affect transforms.

## Action

The Action layer is for bone animations that will override all other layers, when you need to take over total control of the character. Basically, think AV2 "Emotes".

This layer is **blended to zero by default.** Before you do anything in the action layer, you need to use the [Playable Layer Control State Behavior](/avatars/state-behaviors#playable-layer-control) to blend this layer up before transitioning to the actual action you're performing! Make sure you blend it back to zero when you're done.

Animations in Action should _only_ affect transforms.

## FX
FX is a **special layer.** On every other layer, you should not be using material animations, shader property animations, or blend shape animations, because they aren't copied to your mirror clone. Only transforms are.

However, in the FX layer, everything is copied over! In other words, ***everything that isn't a humanoid transform/muscle animation should go into the FX layer.*** This includes (but is not limited to) things like enabling/disabling GameObjects, components, material swaps, shader animations, particle system animating, etc.

The mask in the first FX layer, by default is empty, this will (at avatar init) create a default mask that disables all humanoid muscles, but enables all GameObject animations. This means that any animations in the hierarchy should work, although it is still NOT RECOMMENDED to animate transforms here.

If you have non-muscle animations in your gestures (eg. your Gesture [mask](https://docs.unity3d.com/2019.4/Documentation/Manual/class-AvatarMask.html) has any transforms checked at the bottom) those same transforms must be DISABLED in your FX mask. This will allow your Gesture animations to "show through" the FX layer.

:::info Example

Let's say your avatar has the following setup:
- You have a tail on your avatar (a chain of bones not part of humanoid hierarchy).
- Your Gesture animator layer for the tail has a special mask with only the chain of bones enabled.
- Your other Gesture animator layer with an "all-parts mask" also has those bones checked (along with the other body parts animated in the rest of the controller).

In this case, you'd also want to create a custom mask in the first FX layer. This would mask OFF all the muscles (human diagram all red) and mask OFF all the bones in the tail.
You'd also want to make sure this mask has the checkboxes ON for any transforms that have components you will be animating for FX. E.g. a body skinned mesh for animating blend shapes or materials.

:::

Note that if you have a game object in your hierarchy that has both an animated transform (in Gesture) and an animated effect component (in FX), this will not work with the requirements for the masks. This can occur if you have a simple static-mesh embedded in your hierarchy that you are animating in Gesture, but also applying a material change to in FX. Another example, would be putting a particle effect component directly on the example tail bones above. The simple workaround is to make a child game object and put the static-mesh or effect on that. You would not animate the transform of the child, only the parent. If you follow these steps, you should not need to put transform animations in the FX layer.

## Additional Poses
There are some additional poses available for Avatars 3.0 avatars. The buttons for these are under the Playable Layers.

### T-Pose
You can now provide your own T-Pose!

The T-Pose is used to determine various measurements of your avatar, especially for placement of your viewpoint (or view-ball). Viewpoint is dependent entirely on where your view-ball is when your avatar is in this T-Pose animation you provide.

![Standard T-Pose - [Mixamo](https://www.mixamo.com)](/img/avatars/playable-layers-1.png)

Secondly, it is important for the wrist alignment/twist. The way your wrists are lined up in relation to the palm-down position will affect how your controller twisting in space will turn your wrist and arm.

Finally, your t-pose determines your wingspan-- your full length of your arms when in T-Pose. This also determines your avatar's interpupillary distance (IPD), or the distance between your avatars eyes. Having arms that are too long will make your IPD wider, making everything seem smaller. Having arms that are too short will make your IPD narrower, making everything seem larger.

In addition, (significant) joint bends in T-Pose aren't a good thing. As an example, if your elbows are bent in T-pose, this may affect many different things about your avatar that work off your proportions.

### IK Pose
IK Pose is used to determine major joint bends. In the IK pose, your joints should be bent slightly in the direction they're intended to bend. 

As an example, VRChat will look at the elbow bend from your IK Pose and determine if there is a angle bend in any given direction. That bend determines how your elbow bends.

The foot's rotation in IK Pose will determine how the knees will bend. This is set by first assuming the knee will bend straight forward relative to the avatar, then saving that direction against the foot's rotation in IK Pose. For example if the feet are pointed toes outward in IK Pose, that means the inside edge of the foot is more forward facing and therefore the knees will bend towards the inside edge of the foot. In the opposite case, if the feet are pointing more inward in IK Pose, the outside edge of the the foot is more forward facing (straight forward direction relative to the avatar) and so the knee will tend to bend towards the outside edge of the foot in that case.

In short: if you want your knees to bend more inward, rotate your feet outward in IK Pose. If you want your knees to bend more outward, rotate your feet inward in IK pose.

### Sitting Pose
The controller used in this slot is used for both animation and posing. When you sit, the viewpoint of your avatar is used for calibration. The animation is played, allowing you to create a "sitting down" animation, as well as a "sitting" idle animation.

If you want to make your own, fair warning: this can take some significant tweaking to get right! You may want to employ transition states for sitting down/standing up that will help a bit with how your avatar looks while sitting.