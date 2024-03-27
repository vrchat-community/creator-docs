---
title: "Avatars"
excerpt: "Learn about VRChat's Avatars 3.0 SDK"
hidden: false
createdAt: "2020-07-08T17:39:44.315Z"
updatedAt: "2023-04-03T18:46:53.072Z"
sidebar_position: 0
---

VRChat allows you to create and upload custom avatars!

# Creating Avatars

To get started, check out [Creating your first avatar](/avatars/creating-your-first-avatar).

There's a whole 'Avatars' category on the sidebar to check out. Here are some of the more impactful and important pages:

- [Rig Requirements](/avatars/rig-requirements) explains how to set up your custom 3D model's hierarchy for VRChat.
- [Avatar Performance Ranking System](/avatars/avatar-performance-ranking-system) explains how some avatars achieve an 'Excellent' performance, and others 'Very Poor'.
- [Avatar Optimization Tips](/avatars/avatar-optimizing-tips) - Now that you know _why_, check out this page to learn how to get all your frames back.
- Continue reading this page to learn more about important Avatars 3.0 SDK concepts.

## What is Avatars 3.0?

**Avatars 3.0** is our name for all the features available for avatars in VRChat. AV3's features are focused on improving expression, performance, and the abilities of avatars in VRChat.

Avatars 3.0 is heavily integrated with the [Action Menu](https://docs.vrchat.com/docs/action-menu) for controlling and interacting with the avatar you're wearing. It's probably best if you hop in and try out the Action Menu before building an AV3 avatar!

## Prerequisites

- [Install & set up the VRChat Avatars SDK](/sdk)
- [Create your first avatar](/avatars/creating-your-first-avatar)

## Understanding the Concepts

In order to understand and use Avatars 3.0, you need to know a few concepts. These concepts will help you understand the construction of avatars, how best to assemble them, and the intended use of various systems.

### Unity Systems

This document is written with the assumption that you know a bit about [Unity Animators](https://docs.unity3d.com/2019.4/Documentation/Manual/class-AnimatorController.html). In particular, you should ensure you have basic working knowledge of:

- Animators and animations
- Animator layers, layer weights, and blending
- States and transitions
- Animator parameters
- State behaviors
- Avatar masks

It can also help to know about things like:

- State exit time
- Loop Time for animations
- (Advanced) Time Sync between layers
- (Advanced) Blend trees

### Basics

With Avatars 3.0, you can create a basic avatar with simulated eye movement and visemes very quickly. 

1. Import your avatar, rig as humanoid. Set up your materials, etc.
2. Add the Avatar Descriptor component.
3. Define the eye bones, if you want simulated eye movement.
4. Define the viseme type, if you want visemes. Assign the jaw-flap bone in the Rigging Configuration Screen, or define your visemes by blendshapes. Same as Avatar 2.0.
5. Set your viewpoint.
6. Build and upload!

If you are making a non-humanoid avatar please read the Generic Avatars section below.

You're done! This will create a basic avatar with default gestures and actions. There's some built-in things you can take advantage of, so even if someone slaps in an avatar with blendshapes/bones named a certain way, you'll get some basic Avatar 3.0 features.

However, even with these basic upgraded systems, there are some new features.

### Local Avatar Testing

Ever wanted to iterate and test an avatar without uploading it? Well, with Avatars 3.0, now you can!

In the "Builder" tab of VRChat SDK control panel, you can now select "Build & Test" at "Offline Testing" section. When you click this, your avatar will be built, and then copied into a folder.

When you launch VRChat, you'll be able to access this avatar locally by looking in the "Other" section of the Avatar menu! Only you will be able to see it, but you can make changes to your avatar, click "Build & Test" again, and after a short build, your avatar will be updated. Simply re-select the avatar in your menu and click "Change" again, and you'll swap into the new testing avatar.

This avatar is _only_ visible to you! To everyone else, you'll look like you're wearing the last avatar you were wearing before swapping into the local test avatar. For our AV3 testers, this made iteration a TON faster. We hope you like it!

To delete the copied local test avatar, go to "Content Manager" tab of the VRChat SDK control panel. You will see your avatar in "Test Avatars" section at the bottom. Click "Delete" and it will disappear from "Other" section of the Avatar menu when you reopen it.

### Simulated Eye Movement

Simulated eye movement is where your eyes will move around, looking at things around you. This isn't _eye tracking_ but it is a pretty good way of making your avatar look more "alive".

You can preview your setup in the editor and adjust how your avatar's eyes look in a combination of states, which are used to determine how your eye bones are set up.

Blinking can be handled via blendshapes or bones. Blendshapes are the usual method, but we included bones as well to allow for more setups.

Blinking blendshapes are defined by three blendshapes, described below:

- Blink - Both eyes blinking
- Looking Up - Blendshape used when looking up-- use this to tweak eye/iris/lid/eyebrow positioning
- Looking Down - Blendshape used when looking down, use this similarly to LookUp

You can set these blendshapes to `-none-` if you don't want to use them.

In addition, you'll notice two sliders-- one goes from Calm to Excited, and the other goes from Shy to Confident. Calm / Excited affects how often you blink. Shy / Confident affects how often you look at other players, and how long your gaze remains on other player's faces until you look away.

You'll learn more about this when we talk about state behaviors, but you can set states in your animator to **disable eye animations** when you reach that state. You can set it up such that you don't have to worry about your blendshapes being overdriven because your "happy" mood closes your eyes, and your blinking is still firing off. 

### Blendshape / Bone-based Visemes

If you just want to stick with the standard jaw-flap bone or blendshape-based visemes, we've got you covered. Both are still present and work just fine.

In addition, you can now configure the angle of the jaw-flap bone viseme for some additional customization!

However, in Avatars 3.0, you can also access an Animator Parameter which indicates which viseme should be currently playing! This means if you can animate it, **you can use it in a viseme.** No more trickery for 2D mouths, robots, whatever-- you can just animate whatever you like for your visemes.

The `Viseme` animator parameter is updated in all viseme modes.

### Proxy Animations

You'll probably notice that the SDK includes a bunch of animations named `proxy_animationName`. These animations are "placeholders" for a variety of default VRChat animations. If you use an animation that starts with `proxy_`, VRChat will attempt to replace it with a built-in animation. This can be done in any playable layer.

Although we will not replace an animation with a `proxy_` prefix if the suffix does not match one of our built-in animations, it is probably best practice to avoid naming any of your animations with the prefix `proxy_`.

### Use Auto Footstep

This is an option in the AV3 Avatar Descriptor. It is on by default.

**"Use Auto Footstep"** only applies to 3-point or 4-point tracking. Turning it off means you're disabling the procedural lower body animation for room-scale movement. This procedural animation is what plays when you move around in room-space while in 3 or 4-point tracking.

Leaving Auto Footsteps on (which is the default state) will still allow you to enable/disable tracking via the Tracking Control state behavior.

If Auto Footsteps is off, enabling/disabling tracking on your legs and hips won't do anything, and you're relying on your animations to drive your lower body at all times.

### Force Locomotion Animations

This is an option in the AV3 Avatar Descriptor. It is on by default.

**"Force Locomotion Animations"** is on by default. It only applies to 6-point tracking (Full-Body Tracking). When "Locomotion Animations" is on, locomoting in FBT (as in, moving your joysticks) will play a walking/running animation as determined by your Base playable layer.

When "Locomotion Animations" is off, locomoting in FBT will NOT play the walking/running animation. This is useful if you wish to "mime" your walking with your full-body tracking movement. **If you are turning off "Locomotion Animations", do not use the default Base and Additive layers.** You're expected to make your own!

### Write Defaults on States

[Write Defaults](https://docs.unity3d.com/2019.4/Documentation/Manual/class-State.html) is an option available for each state in an Animator Controller.

Write Defaults "Off" states will set only the animated property values, and those values will not change unless animated again. This can make it easier to keep track of what properties are animated through any specific layer.

Write Defaults "On" states will set default values for properties that are not being animated. This means that if you are animating a property value to "1" from "0", the value will revert to the default "0" upon exiting the state, unless the subsequent state continues to animate the value as "1".

Regardless of which option you choose, **we recommend keeping your usage of Write Defaults consistent across the entire avatar** - in other words, have Write Defaults "Off" for all states, or "On" for all states. Having both "Off" and "On" states on an avatar is known to cause unexpected property values to be set. This is commonly known as "Mixed Write Defaults". The SDK will give you a warning if it detects that you've done this.

VRChat uses Write Defaults set to "Off" in its built-in and example animators.

If you decide to set Write Defaults to "Off":
- Write Defaults is set to **On** for newly created states, so you'll need to change this value for each new state you create.
- You may need to add animations to initialize or reset properties with specific values.
- It's recommended that for all states in a layer, you explicitly animate every property affected by that layer.
- Each state should have an animation clip ("motion" in the state options) that animates at least one property. It does not have to be a valid property reference. States with "None" motion or entirely empty clips will behave as if Write Defaults is "On".

:::caution Additive layers and direct blend trees

VRChat's avatar creator community recommends setting Write Defaults to "On" for:
- Layers that use additive blending
- Blend trees that use direct blending

You should do this even if you are using "Off" for the rest of the avatar. The SDK will avoid generating warnings about mixed Write Defaults settings in these cases.

:::

### Generic Avatars

Avatar 3.0 also supports non-humanoid generic avatars. If you want access to similar features that AV3 Humanoids have access to, you'll need to follow a few guidelines:

- Import your generic model as an FBX and assign it the 'Generic' rig type, so that an "avatar" object is created
- Make sure this avatar object is referenced in the avatar field of the Animator component at the root of your avatar (the same Game Object as the avatar descriptor).
- Leave the animator controller blank (it will be stripped at runtime) and use the Playable Layers to define your custom animation controllers. Generic avatars have 3 Playable layers: Base, Action, and FX, as the other layers are specific to Humanoids.

If you do not follow these steps, your generic avatar will not have access to many Avatars 3.0 features such as Expression Parameters and State Behaviours. If you are fine with that, you can add an animation controller directly into the root animator, leaving the avatar field blank. This method could be useful if you are just building a hierarchy of static objects in Unity and want a simple animation.
