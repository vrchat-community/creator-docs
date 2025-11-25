---
slug: release-3-8-0
date: 2025-04-03
title: Release 3.8.0
authors: [momo]
tags: [release]
---
## Summary

Version `3.8.0` adds an Udon interface for the **VRChat+ Drone**, improves **PhysBones**, and fixes a variety of minor bugs.

This release went to beta as version `3.7.7`.

<!--truncate-->

## Fixes & Changes

- Added Udon API to access the **VRChat+ Drone** of players in your world!
    - Check out the [documentation](/worlds/udon/players/drones/) to get started.
- Improved the content ownership confirmation flow during uploads.
    - The old checkbox was removed in favor of a modal.
    - The modal only appears once per Unity Editor session and content ID.
- Includes [PhysBone](/common-components/physbones/) dependency sorting as introduced in VRChat client version `2025.1.3`.
    - PhysBones and PhysBone Colliders now execute in deterministic order depending on their transform relationships with other Physbones. There is a maximum dependency depth of 8 levels deep.
- Added an `ignoreOtherPhysBones` option to [PhysBone](/common-components/physbones/) components.
    - If you enable this option, the Physbone will ignore other Physbones and their affected transforms beneath itself in the scene hierarchy.
    - You should avoid disabling this option. Controlling the same Transform with multiple Physbones may lead to unsupported behaviour.
    - This option is enabled by default. For compatibility, it is disabled for existing avatars.
- Allowlisted `IVRCImageDownload.Dispose()` for Udon, allowing you to dispose individual downloaded textures once they're no longer needed.
    - This is an alternative to disposing the entire downloader at once. This makes it easier to set up a rotating carousel of images using an image downloader.
    - For more information, see our [documentation](/worlds/udon/image-loading/) for Image Loading.
    - Note that failing to dispose `IVRCImageDownload` objects can lead to excessive memory consumption of your world over time!
- Fixed avatar dynamics sometimes not simulating as soon as you enter play mode in avatar projects that have automatic [domain reloading](https://docs.unity3d.com/2022.3/Documentation/Manual/DomainReloading.html) disabled.
- Fixed four benign warning messages that always appeared in World SDK projects.

## Changes since `3.7.7-beta.1`

- Bumped version to `3.8.0` due to a minor breaking change around type signatures in the `com.vrchat.dynamics` package.
    - Note that the affected functions aren't considered part of the official public API, and may change further in the future.
- Added "Force Kinematic On Remote" option to `VRCObjectSync`. Use this for objects that simulate physics _only_ for the owner.
    - As an example, the VRChat Drone uses this option so the owner can calculate physics and collisions, while remote users do not run any physics logic.

## Known Issues

- In rare cases, you may see an "All pipe instances are busy" error while building. This is a Unity issue - restarting your editor and trying again should fix it.