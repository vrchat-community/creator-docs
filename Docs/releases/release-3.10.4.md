---
slug: release-3-10-4
date: 2026-06-17
title: Release 3.10.4
authors: [momo]
tags: [release]
---
## Summary


SDK Version `3.10.4` brings [VRCTween](/worlds/udon/vrctween/), box-shaped [Contacts](/common-components/contacts/), and [global PhysBone colliders](/common-components/physbones#vrcphysbonecollider).


<!--truncate-->

## Features

- Added [VRCTween](/worlds/udon/vrctween/), which exposes select functionality from the powerful [DOTween](https://dotween.demigiant.com/) library to Udon.
    - You can now animate positions, rotations, scales, and more with a few lines of code.
    - [Virtual tweens](/worlds/udon/vrctween/virtual-tweens) provide advanced interpolation functionality and more for experienced creators.
    - Includes cancelable delayed calls. [`VRCTween.DelayedCall`](/worlds/udon/vrctween/virtual-tweens#delayedcall) works like `SendCustomEventDelayedSeconds`, but returns a handle you can `Kill()` to cancel.
    - All functionality is compatible with UdonSharp and Graph.
- In avatar projects, you can now mark [PhysBone colliders](/common-components/physbones#vrcphysbonecollider) as global. This allows them to collide with PhysBones in worlds or other avatars (if they also allow collision against avatars).
    - This is the same system that already powers your finger and hand colliders for ~~headpatting~~ touching PhysBones.
    - You can mark up to four additional PhysBone colliders as global per avatar.
- [Contact senders](/common-components/contacts/#vrccontactsender) and [contact receivers](/common-components/contacts/#vrccontactreceiver) on avatars and worlds can now be box shaped.
    - You can adjust the width, height and depth of the box shape independently.
    - Proximity can be calculated as either distance from the center like other contact types, or distance from a face of the box.
- Exposed [PhysBone colliders](/common-components/physbones#vrcphysbonecollider) in worlds to Udon, allowing their properties to be changed dynamically via Udon scripts.
    - After modifying a `VRCPhysBoneCollider`, you need to call `ApplyConfigurationChanges()` on it to apply the changes, similar to how PhysBone components behave.


## Fixes & Changes

- Gizmo previews for avatar fingers in the SDK should now exactly match the shapes in the client.
    - Previously, the capsules shown in the SDK were from tip-to-tip. They're now correctly shown as center-to-center.
- The SDK now highlights that plane-shaped physbone colliders don't support global collision.
- All SDK projects now enforce [shader chunking](https://discussions.unity.com/t/dynamic-shader-variant-loading/894939) at a size of 4 MB each.
    - This allows content to be loaded more efficiently, especially for shaders with many variants.
- Updates to VRChat [Data Containers](/worlds/udon/data-containers/):
    - `VRCDataList` and `VRCDataDictionary` can now be constructed with a custom capacity.
    - `VRCDataDictionary` now exposes an `EnsureCapacity()` method that ensures the dictionary can hold at least the specified number of elements.
- GameObjects are now automatically moved to the `Pickup` layer again when adding a `VRCPickup` component to them.
- Fixed an issue where UdonSharp could miscompile enum usage with a specific amount of members.
- `UdonSharpBehaviour` now implements `IUdonEventReceiver`, saving you some type casting.


## Fixes in `3.10.4-beta.2`

- Fixed VRCTween's integration into the Worlds SDK.


## Fixes in `3.10.4-beta.3`

- Added `DelayedSetActive` to [VRCTween](/worlds/udon/vrctween/), enabling you to set a target `GameObject` as active/inactive after a given delay.
- Added `TweenPitch` for AudioSources, enabling you to animate the pitch of audio playback.
- You can now create paused, zero-duration tweens for reuse.
- In avatar projects, when you have multiple avatars in the same scene, the `Allow Self` and `Allow Others` properties on [Contacts](/common-components/contacts/) and [PhysBones](/common-components/physbones/) now behave as if each avatar is its own player while the project is in play mode.
- Fixed a regression preventing the sample scene from being created in new world projects if the UDON scripting define was set at first launch.
- Avatar performance rankings now correctly ignore [VRCRaycast](/avatars/avatar-components/raycast/) components on game objects tagged as `EditorOnly`.


## Known Issues

- In rare cases, you may see an "All pipe instances are busy" error while building. This is a Unity issue - restarting your editor and trying again should fix it.
