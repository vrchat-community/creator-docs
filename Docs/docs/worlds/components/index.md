---
title: "Scene Components"
hidden: false
createdAt: "2017-07-11T20:33:31.318Z"
updatedAt: "2021-10-20T20:03:08.484Z"
---

Every Unity scene you'd like to bring into VRChat requires a [VRC_SceneDescriptor](/worlds/components/vrc_scenedescriptor) component. The VRChat Worlds SDK contains various other components to allow your users to interact with your world, pick up objects, see themselves in a mirror, and more.

Please consult [Whitelisted World Components](/worlds/whitelisted-world-components) for a full list of components available in the VRChat SDK.

| Parameter | Description |
| --- | --- |
| [VRC_AvatarPedestal](/worlds/components/vrc_avatarpedestal) | Used to display and / or switch to an avatar. |
| [VRC_MirrorReflection](/worlds/components/vrc_mirrorreflection) | Used to create a mirror in VRChat. |
| [VRC_ObjectSync](/worlds/components/vrc_objectsync) | Syncs the transform of a GameObject with all players in the instance. |
| [VRC_Pickup](/worlds/components/vrc_pickup) | Allows objects to be picked up, held and used by players. |
| [VRC_PortalMarker](/worlds/components/vrc_portalmarker) | Creates portals to other VRChat worlds. |
| [VRC_SceneDescriptor](/worlds/components/vrc_scenedescriptor) | Describes your VRChat world. Required for every Unity scene you'd like to use as a VRChat world. |
| [VRC_SpatialAudioSource](/worlds/components/vrc_spatialaudiosource) | Adds 3D spatialization to a Unity AudioSource. Usually automatically added with AudioSource components in editor. |
| [VRC_Station](/worlds/components/vrc_station) | Allow users to sit down. |
| [VRC_UIShape](/worlds/components/vrc_uishape) | Allow users to interact with Unity's UI system. |
