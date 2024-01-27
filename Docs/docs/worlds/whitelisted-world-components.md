---
title: "Allowlisted World Components"
slug: "whitelisted-world-components"
hidden: false
createdAt: "2018-12-13T22:11:19.350Z"
updatedAt: "2021-09-15T23:15:28.795Z"
---
The following is the complete list of scripts usable within worlds. Components that are not in this list will not work.
:::caution Oculus Quest

The Android version of VRChat has some exceptions to this list. Check [here](/platforms/android/quest-content-limitations#components) for more info.
:::
## Unity Components
- Animator
- AudioChorusFilter
- AudioDistortionFilter
- AudioEchoFilter
- AudioHighPassFilter
- AudioLowPassFilter
- AudioReverbFilter
- AudioReverbZone
- AudioSource
- BillboardRenderer
- BoxCollider
- Camera
- Canvas
- CanvasGroup
- CanvasRenderer
- CapsuleCollider
- CharacterJoint
- Cloth
- Collider
- ConfigurableJoint
- ConstantForce
- EllipsoidParticleEmitter
- FixedJoint
- FlareLayer
- GUIElement
- GUILayer
- Grid
- GridLayout
- Halo
- HingeJoint
- Joint
- LODGroup
- LensFlare
- Light
- LightProbeGroup
- LightProbeProxyVolume
- LineRenderer
- MeshCollider
- MeshFilter
- MeshParticleEmitter
- MeshRenderer
- NavMeshAgent
- NavMeshObstacle
- OcclusionArea
- OcclusionPortal
- OffMeshLink
- ParticleAnimator
- ParticleEmitter
- ParticleRenderer
- ParticleSystem
- ParticleSystemRenderer
- PlayableDirector
- Projector
- RectTransform
- ReflectionProbe
- Rendering.SortingGroup
- Rigidbody
- SkinnedMeshRenderer
- Skybox
- SphereCollider
- SpringJoint
- SpriteMask
- SpriteRenderer
- Terrain
- TerrainCollider
- TextMesh
- Tilemap
- TilemapRenderer
- TrailRenderer
- Transform
- Tree
- VideoPlayer
- WheelCollider
- WorldParticleCollider
- WindZone

### Unity Components
- [AimConstraint](https://docs.unity3d.com/2019.4/Documentation/Manual/class-AimConstraint.html)
- [LookAtConstraint](https://docs.unity3d.com/2019.4/Documentation/Manual/class-LookAtConstraint.html)
- [ParentConstraint](https://docs.unity3d.com/2019.4/Documentation/Manual/class-ParentConstraint.html)
- [ParticleSystemForceField](https://docs.unity3d.com/2019.4/Documentation/Manual/class-ParticleSystemForceField.html)
- [PositionConstraint](https://docs.unity3d.com/2019.4/Documentation/Manual/class-PositionConstraint.html)
- [RotationConstraint](https://docs.unity3d.com/2019.4/Documentation/Manual/class-RotationConstraint.html)
- [ScaleConstraint](https://docs.unity3d.com/2019.4/Documentation/Manual/class-ScaleConstraint.html)

## VRChat Components
- [VRC_AvatarPedestal](/worlds/components/vrc_avatarpedestal)
- [VRC_IKFollower](https://docs.vrchat.com/docs/vrc_ikfollower) - Deprecated. Use [Constraints](https://docs.unity3d.com/2019.4/Documentation/Manual/Constraints.html) instead!
- [VRC_MirrorReflection](/worlds/components/vrc_mirrorreflection)
- [VRCPipelineManager](/sdk/vrcpipelinemanager)
- [VRC_PortalMarker](/worlds/components/vrc_portalmarker)
- [VRC_SceneDescriptor](/worlds/components/vrc_scenedescriptor)
- [VRC_SpatialAudioSource](/worlds/components/vrc_spatialaudiosource)
- [VRC_Station](/worlds/components/vrc_station)
- [VRC_UiShape](/worlds/components/vrc_uishape)

## Dynamic Bone
- DynamicBone
- DynamicBoneCollider

## Text Mesh Pro
- TMP_Dropdown
- TMP_InputField
- TMP_ScrollbarEventHandler
- TMP_SelectionCaret
- TMP_SpriteAnimator
- TMP_SubMesh
- TMP_SubMeshUI
- TMP_Text
- TextContainer
- TextMeshPro
- TextMeshProUGUI

## Unity Event System
- BaseInput
- BaseInputModule
- BaseRaycaster
- EventSystem
- EventTrigger
- PhysicsRaycaster
- PointerInputModule
- StandaloneInputModule
- TouchInputModule
- UIBehaviour

## Unity UI
- AspectRatioFitter
- BaseMeshEffect
- Button
- CanvasScaler
- ContentSizeFitter
- Dropdown
- Dropdown
- Graphic
- GraphicRaycaster
- GridLayoutGroup
- HorizontalLayoutGroup
- HorizontalOrVerticalLayoutGroup
- Image
- InputField
- LayoutElement
- LayoutGroup
- Mask
- MaskableGraphic
- Outline
- PositionAsUV1
- RawImage
- RectMask2D
- ScrollRect
- Scrollbar
- Selectable
- Shadow
- Slider
- Text
- Toggle
- ToggleGroup
- VerticalLayoutGroup

## Post Processing Stack V2
:::caution Post Processing Stack v1

PPSv1 is not supported in either VRCSDK2 or VRCSDK3. It has been deprecated by Unity.
:::
- PostProcessDebug
- PostProcessLayer
- PostProcessVolume

## AVPro
- ApplyToMaterial
- ApplyToMesh
- AudioOutput
- DisplayIMGUI
- DisplayUGUI
- MediaPlayer
- SubtitlesUGUI

## Oculus Spatializer Unity
- ONSPAmbisonicsNative
- ONSPAudioSource
- ONSPReflectionZone
- OculusSpatializerUnity

## Final IK

:::caution FinalIK Components Modified

VRChat has highly modified its implementation of FinalIK. As such, these components may not work as documented.

We do not directly support or test custom FinalIK implementations in worlds. However, they *should* work fine, and if we must intentionally break one or more of these, we will try our best to inform creators.

If you discover a bug, please [let us know](https://feedback.vrchat.com).
:::

- AimIK
- AimPoser
- Amplifier
- AnimationBlocker
- BehaviourBase
- BehaviourFall
- BehaviourPuppet
- BipedIK
- BipedRagdollCreator
- BodyTilt
- CCDIK
- FABRIK
- FABRIKRoot
- FBBIKArmBending
- FBBIKHeadEffector
- FingerRig
- FullBodyBipedIK
- GenericPoser
- Grounder
- GrounderBipedIK
- GrounderFBBIK
- GrounderIK
- GrounderQuadruped
- GrounderVRIK
- HandPoser
- HitReaction
- HitReactionVRIK
- IK
- IKExecutionOrder
- Inertia
- InteractionObject
- InteractionSystem
- InteractionTarget
- InteractionTrigger
- JointBreakBroadcaster
- LegIK
- LimbIK
- LookAtIK
- MuscleCollisionBroadcaster
- OffsetModifier
- OffsetModifierVRIK
- OffsetPose
- Poser
- PressureSensor
- Prop
- PropRoot
- PuppetMaster
- PuppetMasterSettings
- RagdollCreator
- RagdollEditor
- RagdollUtility
- Recoil
- RotationLimit
- RotationLimitAngle
- RotationLimitHinge
- RotationLimitPolygonal
- RotationLimitSpline
- ShoulderRotator
- SolverManager
- TriggerEventBroadcaster
- TrigonometricIK
- TwistRelaxer
- VRIK