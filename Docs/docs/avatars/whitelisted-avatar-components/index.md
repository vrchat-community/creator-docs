---
slug: "whitelisted-avatar-components"
---
# Allowed Avatar Components

import UnityVersionedLink from '@site/src/components/UnityVersionedLink.js';

Here is a list of the components permitted on avatars. Any component not on this list will be removed at runtime, and may prevent upload.

Custom scripts/components are not permitted on avatars, and will be removed at upload and runtime.
:::caution Oculus Quest

The Quest version of VRChat has some exceptions to this list. Check [here](/platforms/android/quest-content-limitations#components) for more info.
:::
## VRChat

- VRCAvatarDescriptor
- [VRCPipelineManager](/sdk/vrcpipelinemanager/)
- [*VRC_IKFollower*](https://docs.vrchat.com/docs/vrc_ikfollower) - Deprecated! You should use Constraints instead.
- [VRCContactReceiver](/avatars/avatar-dynamics/contacts#vrccontactreceiver)
- [VRCContactSender](/avatars/avatar-dynamics/contacts#vrccontactsender)
- [VRCPhysBoneCollider](/avatars/avatar-dynamics/physbones#vrcphysbonecollider)
- [VRCPhysBone](/avatars/avatar-dynamics/physbones#vrcphysbone)
- [VRCHeadChop](/avatars/whitelisted-avatar-components/vrc_headchop)
- [VRCSpatialAudioSource](/worlds/components/vrc_spatialaudiosource#spatial-audio-on-avatars)
- [VRCStation](/worlds/components/vrc_station)

## Unity

- <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/class-AimConstraint.html">AimConstraint</UnityVersionedLink>
- <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/class-Animation.html">Animation</UnityVersionedLink>
- <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/class-Animator.html">Animator</UnityVersionedLink>
- <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/class-AudioSource.html">AudioSource</UnityVersionedLink>
- <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/class-Camera.html">Camera</UnityVersionedLink>
  - For avatars worn by the local user, Camera components are fully whitelisted.
  - For avatars worn by remote users, the following rules apply:
    - In all cases, the Camera components of remote users are disabled when the avatar is loaded.
      - You can use animations to enable Camera components.
    - If the local user and remote user are friends, Camera components are not removed.
      - Note that becoming friends with a user does not automatically reload their avatar.
    - If the local user has selected "Show Avatar" for the remote user in VRChat's quick menu, Camera components are not removed.
    - If neither of the above is true, Camera components are removed and cannot be enabled.
- <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/class-Cloth.html">Cloth</UnityVersionedLink>
- <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/CollidersOverview.html">Collider</UnityVersionedLink>
- <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/class-FlareLayer.html">FlareLayer</UnityVersionedLink>
- <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/Joints.html">Joints</UnityVersionedLink>
- <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/class-Light.html">Light</UnityVersionedLink>
- <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/class-LineRenderer.html">LineRenderer</UnityVersionedLink>
- <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/class-LookAtConstraint.html">LookAtConstraint</UnityVersionedLink>
- <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/class-MeshFilter.html">MeshFilter</UnityVersionedLink>
- <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/class-MeshRenderer.html">MeshRenderer</UnityVersionedLink>
- <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/class-ParentConstraint.html">ParentConstraint</UnityVersionedLink>
- <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/PartSysRendererModule.html">ParticleSystemRenderer</UnityVersionedLink>
- <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/class-ParticleSystem.html">ParticleSystem</UnityVersionedLink>
- <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/class-PositionConstraint.html">PositionConstraint</UnityVersionedLink>
- <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/class-Rigidbody.html">Rigidbody</UnityVersionedLink>
- <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/class-RotationConstraint.html">RotationConstraint</UnityVersionedLink>
- <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/class-ScaleConstraint.html">ScaleConstraint</UnityVersionedLink>
- <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/class-SkinnedMeshRenderer.html">SkinnedMeshRenderer</UnityVersionedLink>
- <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/class-TrailRenderer.html">TrailRenderer</UnityVersionedLink>
- <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/class-Transform.html">Transform</UnityVersionedLink>

## [Root Motion (FinalIK)](http://www.root-motion.com/finalikdox/html/index.html)
:::caution FinalIK Components Modified

VRChat has highly modified its implementation of FinalIK. As such, these components may not work as documented.

We do not directly support or test custom FinalIK implementations on avatars. However, they *should* work fine, and if we must intentionally break one or more of these, we will try our best to inform creators. 

If you discover a bug, please [let us know](https://feedback.vrchat.com).
:::
- [Aim IK](http://www.root-motion.com/finalikdox/html/page1.html)
- [Biped IK](http://www.root-motion.com/finalikdox/html/page4.html)
- [CCDIK](http://www.root-motion.com/finalikdox/html/page5.html)
- [FABRIK](http://www.root-motion.com/finalikdox/html/page6.html)
- [Full Body Biped IK](http://www.root-motion.com/finalikdox/html/page8.html)
- [Grounder](http://www.root-motion.com/finalikdox/html/page9.html)
- [Limb IK](http://www.root-motion.com/finalikdox/html/page12.html)
- [Rotation Limits](http://www.root-motion.com/finalikdox/html/page14.html)
- Shoulder Rotator
- Twist Relaxer
- [VRIK](http://www.root-motion.com/finalikdox/html/page16.html)

 Using this script on a humanoid avatar will break it.

## [DynamicBone](https://assetstore.unity.com/packages/tools/animation/dynamic-bone-16743)
:::danger Dynamic Bone Deprecated

Support for Dynamic Bone is deprecated. You should use [PhysBones](/avatars/avatar-dynamics/physbones) instead.
  
:::

- DynamicBone
- DynamicBoneCollider