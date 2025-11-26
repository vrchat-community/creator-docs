---
slug: release-3-9-0
date: 2025-10-06
title: Release 3.9.0
authors: [momo]
tags: [release]
---
## Summary

SDK Version `3.9.0` brings an Udon API for the camera dolly, a new Auto Hold mode for pickups, improvements to the Network ID Utility, new `VRCCameraSettings` APIs, and some changes to how Avatar IDs are assigned.

<!--truncate-->

## New Features

- Worlds can now define [Camera Dolly](https://wiki.vrchat.com/wiki/Camera_Dolly) paths and activate them via Udon!
    - Check out the [dolly documentation](/worlds/components/vrc_cameradolly) on how to use the new `VRCCameraDollyAnimation`, `VRCCameraDollyPath`, and `VRCCameraDollyPoint` components together with the `VRCCameraDollyAnimation.Import()` Udon function.
- "AutoHold" for [VRCPickup](/worlds/components/vrc_pickup/) objects is now supported across all input devices!
    - You can choose to [upgrade any pickup](/worlds/components/vrc_pickup/#versions) in your world to the new AutoHold system for improved handling (and a simpler yes/no checkbox instead of a 3-choice dropdown), then reupload your world to use the new system.
    - If you don't upgrade your pickups, your existing worlds are unaffected.
- Additions to the [VRCCameraSettings](/worlds/udon/vrc-graphics/vrc-camera-settings/) and [VRCQualitySettings](/worlds/udon/vrc-graphics/vrc-quality-settings) APIs:
    - Exposed `CullingMask` property via `VRCCameraSettings` to allow modifying active render layers at runtime. Some internal layers are excluded from this.
    - Added a `VRCCameraSettings.GetCurrentCamera` function as a proxy for Unity's `Camera.current`.
    - Added `VRCQualitySettings.ShadowCascade2Split` and `ShadowCascade2Split` properties. These are writeable.
    - Enabled setting `depthTextureMode` on `VRCCameraSettings.PhotoCamera`. Note that you cannot disable basic Depth mode on PhotoCamera, but you can additively add other flags.


## Fixes & Changes

- Removed the trust rank requirement for building & testing worlds and avatars.
    - This means that Visitor accounts can now use the SDK to locally build and test their own avatars and worlds.
    - However, Visitors still need to increase their trust rank before uploading content.
- Fixes and improvements to the Network ID Utility:
  - Improved UI responsiveness in very large projects containing a lot of networked objects.
  - Fixed a case where importing IDs would fail due to an exception being thrown.
  - The tool now warns against GameObjects with forward slashes (`/`) in their names while exporting, since this can cause problems when importing again later.
- Fixed the `_Angle` parameter on [PhysBones](/common-components/physbones/) not working if the PhysBone chain started with a scale of zero.
- Minor performance improvement to the [PhysBone](/common-components/physbones/) inspector panel.
- `VRCShader.SetGlobalInteger` now uses the correct integer variant of the backing `UnityEngine.Shader` function, preserving bit patterns.
- Improved handling of `UdonBehaviour` components with an invalid script assigned to them.
- [UdonSharp](/worlds/udon/udonsharp/) scripts are now recompiled when you switch platforms.
- Fixed world uploads sometimes failing due to the SDK trying to assign an avatar ID instead of a world ID.
- Transform animations inside the `Gesture` layer should no longer break if no custom FX Layer is provided.
- The `vrc_AvatarV3FaceLayer` sample controller now follows our animator best practices.


## About Avatar ID Assignments

This SDK update changes how content IDs (those `avtr_*` strings) are assigned in our backend.

:::info

If you only use the SDK via the built-in UI (the VRChat SDK Control Panel), nothing changes for you.

If you're a tool author or technical user, keep reading!

:::

- For tools that use the VRChat SDK's native `BuildAndUpload` method:

| | |
|---|---|
| New avatars | No change required. |
| Existing avatars | The `VRCAvatar` struct **must** now contain the avatar ID. This field was already available, but previously optional. |

- For tools that manually call the `Build` and `Upload` methods:

| | |
|---|---|
| New avatars | You need to reserve a new ID on our API via the `VRCApi.CreateAvatarRecord` method. Note that we highly encourage using the combined `BuildAndUpload` method which takes care of this for you. |
| Existing avatars | The `VRCAvatar` struct **must** now contain the avatar ID. This field was already available, but previously optional. |


As this is considered a breaking change, the version number of this update has been bumped to `3.9.0` according to our [versioning scheme](https://vcc.docs.vrchat.com/vpm/packages/#vrchats-official-packages-versioning-strategy).


## Fixes between `3.9.0-beta.1` and `3.9.0`

- Setters on `VRCCameraSettings` can now be used from `Start` in ClientSim without throwing exceptions.
- Using `Standard Lite` shaders in worlds no longer breaks lightmapping.
    - This used to result in an infinite "compiling shaders…" during bakes.


## Known Issues

- In rare cases, you may see an "All pipe instances are busy" error while building. This is a Unity issue - restarting your editor and trying again should fix it.
- The "Upgrade" button may not appear on `VRCPickup` components if multiple are selected at once.