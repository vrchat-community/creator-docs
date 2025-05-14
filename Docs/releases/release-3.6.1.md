---
slug: release-3-6-1
date: 2024-05-29
title: Release 3.6.1
authors: [momo]
tags: [release]
---
## Summary

This release exposes additional [TextMesh Pro](/worlds/components/textmeshpro) components and other useful properties to Udon.

<!-- truncate -->

## New features

- Exposed three new [TextMeshPro](/worlds/components/textmeshpro/) components to Udon.
    - Added [TMP Dropdown](/worlds/components/textmeshpro/tmp_dropdown), [TMP InputField](/worlds/components/textmeshpro/tmp_inputfield), and [TMP Text](/worlds/components/textmeshpro/tmp_text) to Udon.
    - TextMeshProUGUI and TextMeshPro and exposed through [TMP Text](/worlds/components/textmeshpro/tmp_text).
    - VRChat will now open the on-screen keyboard when selecting a [TMP InputField](/worlds/components/textmeshpro/tmp_inputfield).
- Added two properties to `BaseVRCVideoPlayer` and exposed them to Udon.
    - `int VideoWidth { get; }`
    - `int VideoHeight { get; }`
    - These are also available in the subclasses `VRCUnityVideoPlayer` and `VRCAVProVideoPlayer`.
- Added five voice-related getter methods to `VRCPlayerApi` and exposed them to Udon.
    - `float GetVoiceGain()`
    - `float GetVoiceDistanceNear()`
    - `float GetVoiceDistanceFar()`
    - `float GetVoiceVolumetricRadius()`
    - `bool GetVoiceLowpass()`


## Fixes

- Worlds with vastly more renderers than materials will now build faster.
- Fixed a performance bottleneck when validating avatars after a local test build, especially when multiple avatars are present in the scene.
- Fixed some issues where the Network ID Utility could get confused about duplicate GameObject paths.
    - Note that it still is not recommended or fully supported to have networked objects share the same hierarchy paths!
- Fixed a missing reference error locking up the build panel if an audio clip was deleted or missing from an VRC_AnimatorPlayAudio state behaviour on the avatar.

## Changes between 3.6.1-beta.2 and final release

- Udon can now access the three new TextMeshPro components directly.
  - Only the properties listed in VRChat's documentation have been exposed.
  - The previously new `VRC_TMP` wrapper components have been removed.
- ClientSim: Udon behaviours instantiated via other Udon scripts will now initialize right away and have variables and functions ready.


## Known Issues

- The first time you open a Scene and select a GameObject inside a prefab with a U# Behaviour, the GUI for the component directly below that U# Behaviour will not show its GUI. Deselecting and re-selecting the prefab fixes this.
- Buffer Particles don't work as they did in Unity 2019, [there is a workaround to fix them from community member hfcRed here](https://x.com/hfcRedddd/status/1696915379090604179).
- Unity 2022 sometimes causes Rider's debugger to stop for unhandled exceptions in Unity's IMGUI.
    - Please refer to [this workaround](https://forum.unity.com/threads/rider-debugger-breaks-on-unhandled-exception.1135879/#post-7305256) and [Jetbrains's bug tracker](https://youtrack.jetbrains.com/issue/RIDER-64944) for more information.
