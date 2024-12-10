---
slug: release-3-7-5
date: 2024-12-11
title: Release 3.7.5
authors: [momo]
tags: [release]
---
## Summary

Version `3.7.5` adds Build & Test for Quest, similar to how it works on Android phones. Local-only contact receivers no longer count towards an avatar's performance rank. And there's also a new Udon event, `OnVRCPlusMassGift`, to make your worlds react to Gift Drops!

<!--truncate-->

## Fixes & Changes

- Build & Test mode is now available for Quest!
- DPID has been reworked to have much sharper visuals when operating on `AlphaIsTransparency` textures.
    - When you import textures with DPID and `AlphaIsTransparency` enabled, the SDK now considers the alpha channel separately, making alpha masks as sharp as equivalent color masks.
- Resolved an issue where the DPID setting in the SDK would not persist between sessions.
- Fixed issue where running "Build and Test" before setting the`blueprintId` of a world or avatar would trigger the error "Attempted to load the data for a world we do not own, clearing blueprint ID". This error has also been downgraded to a warning.
- Contact receivers marked as local-only no longer count towards an avatar's performance rank.
- Fixed more cases of jittering with specific configurations of [VRChat Constraints](/avatars/avatar-dynamics/constraints).

## Udon

- Added a new [OnVRCPlusMassGift](/worlds/udon/graph/event-nodes/#onvrcplusmassgift) event that allows worlds to react to Gift Drops.
- Added the ability for `GetComponent` to be called on all TextMeshPro Components and `VRCMidiPlayer`.

## ClientSim

- Fixed a ClientSim bug where the first `OnAvatarEyeHeightChanged` call after entering Play Mode would cause a type mismatch error.
- Fixed [Interaction Passthrough](/worlds/layers/#interaction-passthrough-for-user-layers) layers in ClientSim to more closely match client behavior.

## Video Players

- Video players no longer play untrusted URLs in public instances unless the world creator adds the domain to the world's allowlist via the VRChat website.
    - Video players in private instances can play any untrusted URL.