---
slug: release-3-5-2
date: 2024-03-27
title: Release 3.5.2
authors: [momo]
tags: [release]
---
## Summary

This release brings new functionality for avatar creators and various fixes.

<!--truncate-->

## New features

- Added the [`VRCHeadChop` component](/avatars/avatar-dynamics/vrc-headchop) to the avatars SDK.
    - This component allows avatar authors to control which parts of their avatar are hidden from the perspective of the user wearing it.
- Added the [`AnimatorPlayAudio` state behaviour](/avatars/state-behaviors#animator-play-audio) to the avatars SDK.
    - This allows you to modify an AudioSource when transitioning to an animation state.
    - It can change the audio clip, volume, pitch, or loop. It can also play or stop the AudioSource automatically.
- Added new [`OnInputMethodChanged` Event to Udon](/worlds/udon/input-events/#oninputmethodchanged), which is triggered whenever the user switches Input Methods, from a Keyboard to a Game Controller, or a Game Controller to a Touchscreen, for example.

## Changes

- The worlds SDK will now suggest replacing Unity's default UI shader with a [super-sampled shader](/platforms/android/quest-content-limitations/#shaders) where appropriate.
    - This can help improve the readability of text elements when viewed in VR.
    - TextMeshPro components are not affected by this change. Their readability is very high without supersampling.
- Added [Byte and Bit operations](/worlds/udon/data-containers/byte-and-bit-operations) to Udon.
    - Exposed `System.BitConverter`, `System.Buffer`, and `System.Text.Encoding` to Udon.
    - Added `DataToken.BitCast` method.
- Added [ResultBytes field to string downloader event](/worlds/udon/string-loading) to allow raw data downloads.
- The avatars SDK now warns against using [_mixed_ Write Defaults settings](/avatars/#write-defaults-on-states) across avatar animators.

## Fixes

- If an Udon script uses `[RequireComponent]`, the SDK will now silence some harmless errors while building.
- Updated `UnityEngine.Timeline` package version & added to base SDK package dependencies.
- Changed "Polygons" to "Triangles" in SDK avatar performance stats for a more accurate description of recommended limits.
- Fixed issues with `InputUse` Udon events firing constantly when using VRChat Mobile. They should now only fire when a genuine tap is done, not while swiping or long-pressing.

## ClientSim

- Added [all languages supported by VRChat](/worlds/udon/players/#language).
- Added support for [player scaling APIs](/worlds/udon/players/player-avatar-scaling).
- Fixed EditorOnly objects not getting removed in Play Mode.
- The stacked camera is now enabled/disabled depending on the state of the pause menu to improve performance.

## Known Issues

- The first time you open a Scene and select a GameObject inside a prefab with a U# Behaviour, the GUI for the component directly below that U# Behaviour will not show its GUI. Deselecting and re-selecting the prefab fixes this.
- Buffer Particles don't work as they did in Unity 2019, [there is a workaround to fix them from community member hfcRed here](https://x.com/hfcRedddd/status/1696915379090604179).
- The Editor may crash when updating a shader graph reference by another shader using UsePass. This is an issue with Unity 2022.3.6f1 and is fixed in 2022.3.14f1.
- Unity 2022 sometimes causes Rider's debugger to stop for unhandled exceptions in Unity's IMGUI.
    - Please refer to [this workaround](https://forum.unity.com/threads/rider-debugger-breaks-on-unhandled-exception.1135879/#post-7305256) and [Jetbrains's bug tracker](https://youtrack.jetbrains.com/issue/RIDER-64944) for more information.
