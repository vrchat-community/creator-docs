---
title: "Whitelisted Avatar Components"
slug: "whitelisted-avatar-components"
hidden: false
createdAt: "2017-09-10T03:41:08.259Z"
updatedAt: "2022-11-15T23:12:29.563Z"
---
Here is a list of the components permitted on avatars. Any component not on this list will be removed at runtime, and may prevent upload.

Custom scripts/components are not permitted on avatars, and will be removed at upload and runtime.
:::caution Oculus Quest

The Quest version of VRChat has some exceptions to this list. Check [here](/platforms/android/quest-content-limitations#components) for more info.
:::
## VRChat

- VRCAvatarDescriptor 
- PipelineManager
- [VRCStation](/worlds/components/vrc_station)
- [VRCPhysBone](/avatars/avatar-dynamics/physbones#vrcphysbone)
- [VRCPhysBoneCollider](/avatars/avatar-dynamics/physbones#vrcphysbonecollider)
- [VRCContactSender](/avatars/avatar-dynamics/contacts#vrccontactsender)
- [VRCContactReceiver](/avatars/avatar-dynamics/contacts#VRCContactReceiver)
- [VRCSpatialAudioSource](/worlds/components/vrc_spatialaudiosource#spatial-audio-on-avatars)
- [*VRC_IKFollower*](https://docs.vrchat.com/docs/vrc_ikfollower) - Deprecated! You should use Constraints instead.

## Unity

- [Transform](https://docs.unity3d.com/2019.4/Documentation/Manual/class-Transform.html)
- [Animator](https://docs.unity3d.com/2019.4/Documentation/Manual/class-Animator.html)
- [SkinnedMeshRenderer](https://docs.unity3d.com/2019.4/Documentation/Manual/class-SkinnedMeshRenderer.html)
- [MeshFilter](https://docs.unity3d.com/2019.4/Documentation/Manual/class-MeshFilter.html)
- [MeshRenderer](https://docs.unity3d.com/2019.4/Documentation/Manual/class-MeshRenderer.html)
- [Animation](https://docs.unity3d.com/2019.4/Documentation/Manual/class-Animation.html)
- [ParticleSystem](https://docs.unity3d.com/2019.4/Documentation/Manual/class-ParticleSystem.html)
- [ParticleSystemRenderer](https://docs.unity3d.com/2019.4/Documentation/Manual/PartSysRendererModule.html)
- [ParticleRenderer](https://docs.unity3d.com/Documentation/Manual/class-ParticleRenderer.html)
- [ParticleAnimator](https://docs.unity3d.com/Documentation/Manual/class-ParticleAnimator.html)
- [EllipsoidParticleEmitter](https://docs.unity3d.com/Documentation/Manual/class-EllipsoidParticleEmitter.html)
- [MeshParticleEmitter](https://docs.unity3d.com/Documentation/Manual/class-MeshParticleEmitter.html)
- [TrailRenderer](https://docs.unity3d.com/2019.4/Documentation/Manual/class-TrailRenderer.html)
- [LineRenderer](https://docs.unity3d.com/2019.4/Documentation/Manual/class-LineRenderer.html)
- [Cloth](https://docs.unity3d.com/2019.4/Documentation/Manual/class-Cloth.html)
- [Light](https://docs.unity3d.com/2019.4/Documentation/Manual/class-Light.html)
- [Collider](https://docs.unity3d.com/2019.4/Documentation/Manual/CollidersOverview.html)
- [Rigidbody](https://docs.unity3d.com/2019.4/Documentation/Manual/class-Rigidbody.html)
- [Joints](https://docs.unity3d.com/2019.4/Documentation/Manual/Joints.html)
- [Camera](https://docs.unity3d.com/2019.4/Documentation/Manual/class-Camera.html)\*
- [FlareLayer](https://docs.unity3d.com/2019.4/Documentation/Manual/class-FlareLayer.html)
- [GUILayer](https://docs.unity3d.com/Documentation/Manual/class-GUILayer.html)
- [AudioSource](https://docs.unity3d.com/2019.4/Documentation/Manual/class-AudioSource.html)
- [AimConstraint](https://docs.unity3d.com/2019.4/Documentation/Manual/class-AimConstraint.html)
- [LookAtConstraint](https://docs.unity3d.com/2019.4/Documentation/Manual/class-LookAtConstraint.html)
- [ParentConstraint](https://docs.unity3d.com/2019.4/Documentation/Manual/class-ParentConstraint.html)
- [PositionConstraint](https://docs.unity3d.com/2019.4/Documentation/Manual/class-PositionConstraint.html)
- [RotationConstraint](https://docs.unity3d.com/2019.4/Documentation/Manual/class-RotationConstraint.html)
- [ScaleConstraint](https://docs.unity3d.com/2019.4/Documentation/Manual/class-ScaleConstraint.html)

\* For the wearer and their friends, camera components are disabled on load. Use an animation to enable the component. For non-friends of the wearer, camera components are removed completely on load.

## [Root Motion (FinalIK)](http://www.root-motion.com/finalikdox/html/index.html)
:::caution FinalIK Components Modified

VRChat has highly modified its implementation of FinalIK. As such, these components may not work as documented.\n\nWe do not directly support or test custom FinalIK implementations on avatars. However, they *should* work fine, and if we must intentionally break one or more of these, we will try our best to inform creators. \n\nIf you discover a bug, please [let us know](https://feedback.vrchat.com).
:::
- [Aim IK](http://www.root-motion.com/finalikdox/html/page1.html)
- [Biped IK](http://www.root-motion.com/finalikdox/html/page4.html)
- [CCDIK](http://www.root-motion.com/finalikdox/html/page5.html)
- [FABRIK](http://www.root-motion.com/finalikdox/html/page6.html)
- [Full Body Biped IK](http://www.root-motion.com/finalikdox/html/page8.html)\*
- [Grounder](http://www.root-motion.com/finalikdox/html/page9.html)
- [Limb IK](http://www.root-motion.com/finalikdox/html/page12.html)
- [Rotation Limits](http://www.root-motion.com/finalikdox/html/page14.html)
- [VRIK](http://www.root-motion.com/finalikdox/html/page16.html)\*
- Twist Relaxer
- Shoulder Rotator

\* Using this script on a humanoid avatar will break it.

## [DynamicBone](https://assetstore.unity.com/packages/tools/animation/dynamic-bone-16743)
:::danger Dynamic Bone Deprecated

Support for Dynamic Bone is deprecated. You should use [PhysBones](/avatars/avatar-dynamics/physbones) instead.
  
:::

- DynamicBone
- DynamicBoneCollider