---
slug: release-3-7-2
date: 2024-10-21
title: Release 3.7.2
authors: [momo]
tags: [release]
---
## Summary

This update adds [Build & Test for Mobile](/platforms/android/build-test-mobile), [Example Central](/sdk/example-central) and some fixes for [Spookality '24](http://hello.vrchat.com/blog/spookality-2024-arrives-october-1)! It also introduces _Udon Code Signing_ for improved security.

<!-- truncate -->

## New features

- [Build & Test for Mobile](/platforms/android/build-test-mobile) - send worlds directly to a connected Android Device while working on it for _much_ quicker testing and iteration.
- [Example Central](/sdk/example-central) - browse and import SDK Examples from within the Unity Editor.

## Fixes & Changes

- `VRCPlayerAPI.SetAvatarEyeHeightByMultiplier` now works properly in ClientSim.

## Changes in `3.7.2-beta.2`

- Added _Udon Code Signing_!
    - Any worlds uploaded with this SDK (or newer) receive a server-side signature. This helps ensure only authentic (unmodified) versions of your world can be loaded into VRChat.
      - This makes it significantly harder for malicious players to cheat or bypass scripts in your worlds.
    - Each platform (PC, Android, iOS) has a different signature, so you need to upgrade all of your world's platforms.
    - Udon code signing does not affect non-malicious users, and will not change anything about your Unity editor experience.
    - This SDK also upgrades all your Udon scripts to a more efficient storage format (only relevant for very old world projects).
    - We recommend upgrading and re-uploading your worlds with this SDK to make your worlds more secure!

## Changes in `3.7.2-beta.3`

- Fixed timing of Udon Code Signature calculation.
    - It is now calculated during the [`IProcessSceneWithReport`](https://docs.unity3d.com/ScriptReference/Build.IProcessSceneWithReport.html) callback with an execution order of `int.MaxValue - 8192` when you build a world.
    - This fixes an issue with some Udon compilers (e.g. CyanTrigger) that modify code after signature calculation, making uploaded worlds fail verification.

## Changes between `beta.3` and the the final release

- Fixed several bugs with Build & Test for Mobile from open beta feedback.
- Added a number of helpful error messages when incorrectly setting up Build & Test for Mobile.
    - For example, we will now warn you if your device's screen is locked.

## Known Issues

- The first time you open a Scene and select a GameObject inside a prefab with a U# Behaviour, the GUI for the component directly below that U# Behaviour will not show its GUI. Deselecting and re-selecting the prefab fixes this.
- Buffer Particles don't work as they did in Unity 2019, [there is a workaround to fix them from community member hfcRed here](https://x.com/hfcRedddd/status/1696915379090604179).
- Unity 2022 sometimes causes Rider's debugger to stop for unhandled exceptions in Unity's IMGUI.
    - Please refer to [this workaround](https://forum.unity.com/threads/rider-debugger-breaks-on-unhandled-exception.1135879/#post-7305256) and [Jetbrains's bug tracker](https://youtrack.jetbrains.com/issue/RIDER-64944) for more information.
