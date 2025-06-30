---
slug: release-3-8-2
date: 2025-06-25
title: Release 3.8.2
authors: [momo]
tags: [release]
---
## Summary

SDK version `3.8.2` brings a spawn radius setting to worlds, matches the new `Item` Unity layer to the VRChat client, and fixes several issues.

<!--truncate-->

## Fixes & Changes

### For World Creators

- The `reserved3` [Unity layer](/worlds/layers/) has been renamed to `Item`, and is now set up in the physics collision matrix to match the VRChat client (items only collide with other items).
- Worlds now support a spawn radius for players!
    - The SDK now lets you define a circular `Spawn Radius` in the [scene descriptor component](/worlds/components/vrc_scenedescriptor). The radius applies to all spawn points, and the editor visualizes the radius when you select a spawn point in the scene view.
    - The spawn radius defaults to `0.2m` for new worlds (as defined in the default VRC world scene template).
    - Players spawn randomly within this radius. New and existing worlds where the radius is set to `0` continue to work as before, with players spawning at the exact spawn point.
- Fixed the `DownloadImage()` method in `VRCImageDownloader` throwing an exception when called from Udon Sharp with no event receiver.
- Fixed `VRCObjectPool`'s `StartPositions` and `StartRotations` showing as exposed in the Udon class exposure tree window.
- Fixed ClientSim not letting you enter Play Mode without a Scene Descriptor.

### For Avatar Creators

- You can now edit avatar tags in the SDK.
- Added a validation error that prevents a humanoid avatar from being uploaded if it has a nested armature.
    - "Nested armature" means the root of the armature is not a direct child of the GameObject containing the avatar's animator. Avatars set up this way have previously not had animations play for other users when seen in VRChat.
    - Specifically, this means the `avatarRoot` on the root `Animator` is not the same transform as the `VRC_AvatarDescriptor`.
    - This is not a supported configuration.
- Opening the VRChat SDK Build Panel no longer creates an empty "VRC Per-Platform Overrides" component.
- When all [per-platform overrides](/avatars/per-platform-avatar-overrides) are removed from an avatar, the "VRC Per-Platform Overrides" component will now be removed as well.


## Fixes & Changes between `3.8.2-beta.1` and live

- `Toon Standard` shader updates:
    - Fixed "Outline from Albedo" not taking Tint and Vertex Color (if enabled) into account.
    - Fixed normal maps being inverted on backfaces and outlines sometimes glitching through on "Cull Off" (double-sided) materials.
- Updated the performance rank message in the SDK Build Panel to mention that it is only an estimate.
- Adjusted the messaging on avatar pedestals with private avatar IDs to be more accurate.
- All custom events are visible in the Udon Graph editor's sidebar again.
- Added a warning when any of the Spawns in the `VRC Scene Descriptor` are too far from origin (more than 1000 units on any axis).
    - Moving the player this far out can cause issues with rendering or UI interaction and is not recommended.


## Known Issues

- In rare cases, you may see an "All pipe instances are busy" error while building. This is a Unity issue - restarting your editor and trying again should fix it.