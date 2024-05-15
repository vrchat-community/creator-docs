---
slug: release-3-5-3
date: 2024-04-11
title: Release 3.5.3 Beta
unlisted: true
authors: [momo]
tags: [release]
---
## Summary

This release overhauls the World SDK UI, exposes new Udon functions, and fixes some issues across the SDK and ClientSim.

Superceded by [version 3.6.0](/releases/release-3-6-0). Version 3.5.3 entered beta testing but was not launched officially.
<!--truncate-->

## New features

- Big updates to the Worlds SDK for creators! This is a major update with a lot of additions including:
    - A rewrite of all almost all custom inspectors in the World's SDK.
    - Updated HelpURLs (the question mark on a component) to *actually* taking you to the VRC docs (gasp).
    - Properly added almost 20 components to the **Add Component -> VRChat** section.
    - The Two-Factor Authentication field in the SDK automatically submits once you enter six digits, instead of requiring you to press the Verify button.
- World creators now have the ability to modify the value of `UnityEngine.Physics.bounceThreshold` via Udon. Addresses [this Canny request](https://feedback.vrchat.com/feature-requests/p/allow-world-creators-to-change-physics-settings).
    - This allows world creators to have better control over when objects should or shouldn't bounce, which can be important for physics-based worlds.

## Changes

- Layers 3, 6, and 7 are now reserved layers for VRChat. Previously, these were internally reserved by Unity and were freed up in Unity 2022.
    - VRChat now reserves them for internal use moving forward and will move any objects in this layer to the default layer. Reflected [here](/worlds/layers/#unitys-built-in-layers) in our creator docs.

## Fixes

- Fixed the broken Standard Lite shader **Emission** feature.
- Fixed an error about failing to assign network IDs when trying to upload the default VRC world scene right after initialization.
- Fixed Unity warning when using the sample dynamic Robot Avatar from the VRChat Avatars SDK.
- Exposed missing string methods to Udon. Addresses [this Canny request](https://feedback.vrchat.com/sdk-bug-reports/p/350-beta1-stringtrim-stringtrimstart-and-stringtrimend-are-not-exposed-to-udon-i).
    - Certain variants of `Trim`, `TrimStart`, `TrimEnd`, and others were previously available in Unity 2019 but caused compilation issues in Unity 2022. This fixes those regressions.

## ClientSim

- Fixed joystick drift issues by adding input axis deadzones. Addresses [this GitHub issue](https://github.com/vrchat-community/ClientSim/issues/1).
- Updated ClientSim to use IETF language codes instead of full language names to more accurately simulate VRChat's behavior.

## Public API Changes

- SDK methods from `ShaderValidation` have been moved into the `ValidationUtils` class.
- Method signatures from `ValidationUtils` have been modified. **Anyone using these methods may need to update their code!**

## Known Issues

- The first time you open a Scene and select a GameObject inside a prefab with a U# Behaviour, the GUI for the component directly below that U# Behaviour will not show its GUI. Deselecting and re-selecting the prefab fixes this.
- Buffer Particles don't work as they did in Unity 2019, [there is a workaround to fix them from community member hfcRed here](https://x.com/hfcRedddd/status/1696915379090604179).
- The Editor may crash when updating a shader graph reference by another shader using UsePass. This is an issue with Unity 2022.3.6f1 and is fixed in 2022.3.14f1.
- Unity 2022 sometimes causes Rider's debugger to stop for unhandled exceptions in Unity's IMGUI.
    - Please refer to [this workaround](https://forum.unity.com/threads/rider-debugger-breaks-on-unhandled-exception.1135879/#post-7305256) and [Jetbrains's bug tracker](https://youtrack.jetbrains.com/issue/RIDER-64944) for more information.
