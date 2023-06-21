---
title: "Rig Requirements"
slug: "rig-requirements"
hidden: false
createdAt: "2017-09-22T20:23:26.818Z"
updatedAt: "2022-03-03T01:55:44.258Z"
---
:::caution

This page is significantly out of date, but should still be mostly accurate.
:::
## Export Settings

When exporting your rig from your 3D editor of choice, ensure your coordinate settings are correct. Most of the time, the defaults are correct.

For Blender, ensure that your rest X rotation is 90 degrees.
### Humanoid Rig
Unity will flag your humanoid rig configuration if it does not meet the Mecanim requirements for a humanoid. Please read and be familiar with the [Unity Documentation on configuring avatars](https://docs.unity3d.com/2019.4/Documentation/Manual/ConfiguringtheAvatar.html).

:::danger Humanoid avatar must have head, hands and feet bones mapped.

You will see this message from the VRChat Build Control Panel if your avatar rig is humanoid but does not have the essential bones mapped.",

:::

:::note Non-human avatars

If your avatar diverges greatly from a human (ie. quadruped, hunching monster, etc), you should consider using a Generic rig and your own Animation Controller. See the SimpleAvatarController for an example. This is more advanced than making a humanoid, so you should be very familiar with Unity's Animation Controller system.
:::

### Finger Mappings

:::caution Thumb, Index, and Middle finger bones are not mapped, Full-Body IK will be disabled.

**This warning does not appear for SDK3 avatars, as they have no problem with using armatures without finger bones.** This error only occurs when using VRChat SDK2, which is deprecated and should not be used.

In order to have full IK (allowing crouching and automatic foot placement) you need to have these three finger bones mapped. If you ignore this warning, your avatar will not be able to crouch, and it's feet will not automatically step (unless you use controller locomotion).

It will also prevent custom animation overrides on hand gestures from being played back. (This is **not** currently mentioned by the warning in the SDK.)
:::

### Spine Hierarchy

:::danger Your rig has the UPPERCHEST mapped in the Humanoid Rig. This will cause problems with IK.

**This warning does not appear for SDK3 avatars, as they have no problem with using armatures with a mapped upper chest.** This error only occurs when using VRChat SDK2, which is deprecated and should not be used.

If you must use SDK2, leave the upper chest bone blank when configuring your humanoid.
:::

:::danger Spine hierarchy missing elements, make sure that Pelvis, Spine, Chest, Neck and Shoulders are mapped.

These bones must all be mapped. If you get this message make sure none of these slots are empty. Note that the Neck and Chest slots are optional for Mecanim, but required for VRChat.
:::

:::danger Spine hierarchy incorrect. Make sure that the parent of both Shoulders and the Neck is the Chest.

For the IK to work properly, you must have a specific hierarchy of bones around the chest. In your rig, your shoulder bones (mapped into Left Arm > Shoulder, Right Arm > Shoulder slots) must be direct children of your chest bone (mapped into Body > Chest slot). Also, the neck bone (mapped into Head > Neck slot) must also be a direct child of the Chest.
:::

### Arm and Leg Hierarchy

:::caution LowerArm is not first child of UpperArm or Hand is not first child of LowerArm: you may have problems with Forearm rotations.

VRChat's IK system looks at the first child of a bone when determining the bone layout. If you have other child bones, like prop-placement bones or twist-bones in your rig, they can confuse the IK. In this particular case, the SDK is seeing that your LowerArm is not the first-listed child of your UpperArm bone.

To fix this, move the child bone to the first position in the list of children of the parent bone. **You will have to unpack your avatar prefab to do this.** 

Note that this message is naming the slot, not the actual bone name in your rig, so you'll have to look to see what bone is in that slot.
:::

:::caution LowerLeg is not first child of UpperLeg or Foot is not first child of LowerLeg: you may have problems with Shin rotations.

See above.
:::

### General Hierarchy

:::caution This avatar has a split heirarchy (Hips bone is not the ancestor of all humanoid bones). IK may not work correctly.

Some rigs split the hierarchy into two sections, upper and lower body. In this case the bone you put into the Body > Hips slot must be the ancestor (parent or higher) of the rest of the human bones you are mapping. Be very careful with these kinds of rigs! Often, the ancestor of these bones is a root bone on the ground or another placement which is a bad placement for a hip bone. Many of these rigs are unsuitable for use with VRChat and need to be re-rigged to work properly.
:::

### Full-Body Tracking
There are special considerations if you are using Full-Body tracking, ie. you have 3 HTC Tracking Pucks connected. There are several recommendations that will ensure that your avatar works well when using Full-Body tracking.

To see more detailed information on Full-Body Tracking rigging requirements, see our [Full-Body Tracking system guide](https://docs.vrchat.com/docs/full-body-tracking).
:::caution The angle between pelvis and thigh bones should be close to 180 degrees (this avatar's angle is ___). Your avatar may not work well with full-body IK and Tracking.

Full-body tracking is sensitive to the angle between the hip and upper leg bones. It's best to measure this angle when the AvatarTPoseController is applied to your avatar. Ideally, the hip bone is pointing straight up and the upper leg bones point straight down in the TPose, but slight divergence is okay. You can ignore this message if you are not going to use Full-Body Tracking.
:::

### Toe Bones
It is not required to map the Toe bones in a humanoid avatar. However, if you DO map them, your avatar is able to move up and down on their tiptoes. Mapping the toes also makes the automatic foot-stepping look more natural, as well as improving the appearance of balance by aligning the auto stance to the beginning of the toe bone rather than the heel.