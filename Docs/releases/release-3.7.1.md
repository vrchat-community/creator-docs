---
slug: release-3-7-1
date: 2024-09-20
title: Release 3.7.1
authors: [momo]
tags: [release]
---
## Summary

This update exposes some highly-requested functions to Udon, adds high-quality DPID mipmapping support (opt-in beta), and optimizes PhysBone gizmos.

<!-- truncate -->

## New features

- Exposed the following C# features to Udon:
    - `Array.Sort()` allows Udon to sort Arrays in various ways, which is useful for managing Players in an Udon world. Addresses [this Canny post](https://feedback.vrchat.com/udon/p/arraysort).
    - `System.Random` allows Udon to create deterministic random seeds, as well as random Bytes and Doubles, extending the possibilities for randomness in Udon Worlds beyond what `UnityEngine.Random` can do. We exposed 4 new functions, addressing [this Canny post](https://feedback.vrchat.com/udon/p/expose-systemrandom).
    - `System.Text.StringBuilder` allows Udon to build and reformat strings with better performance than the existing string functions. We exposed 18 new functions and properties, addressing [this Canny post](https://feedback.vrchat.com/udon/p/please-expose-stringbuilder).
    - `System.Text.RegularExpressions` - [RegEx](https://learn.microsoft.com/en-us/dotnet/api/system.text.regularexpressions.regex?view=net-8.0) is a powerful system for searching, matching and replacing patterns within strings of text. We exposed 14 new functions and properties, addressing [this Canny post](https://feedback.vrchat.com/udon/p/feedback-expose-systemtextregularexpressions-namespace).
    - `System.Type` allows Udon to interact with data types, and can be useful to advanced creators who want to validate object types at runtime. We exposed 67 new functions and properties, addressing [this Canny post](https://feedback.vrchat.com/udon/p/expose-systemtypeissubclassof-isinstanceoftype-issubclassof-and-basetype)
- The SDK now supports "Detail Preserving Image Downscaling" (DPID) mipmaps, which greatly improve the sharpness of world/avatar textures.
    - :warning: We're still working on this one! It is currently a BETA feature and requires explicit opt-in via the "Settings" panel in the SDK control panel.
    - DPID replaces the mipmapping algorithm on all textures with the "Kaiser" filtering algorithm selected. "Box" filtering is unaffected.
        - The SDK build panel already encourages you to enable "Kaiser" filtering, which in turn now enables DPID.
    - Unlike the original algorithm, VRChat's version of DPID supports transparency. Enable [Alpha is Transparency](https://docs.unity3d.com/Manual/texture-type-default.html) to avoid filtering artifacts on the edges of transparent textures.
    - The original algorithm implementation was published under BSD 3-Clause (a permissive license like MIT). To 'pay it forward,' we've released our compute shader version under the same license! You can find it in the SDK: `com.vrchat.base\Editor\VRCSDK\Dependencies\VRChat\Resources\PerceptualMipmapping\PerceptualPostProcessor.compute`.
- PhysBone gizmo rendering has been optimized.
    - Editor gizmos for PhysBones with non-0 radius setting now render 2-3x faster.
    - Editor gizmos of multiple PhysBone components in the hierarchy of the selected object now render 1.5-2x faster.
    - Addresses [this Canny post](https://feedback.vrchat.com/avatar-dynamics-reports-and-feedback/p/1181-many-physbone-gizmos-lag-editor).

## Fixes & Changes

- The SDK now blocks avatars containing particle systems or trail renderers set to destroy themselves when they finish. Particle systems on the avatar's root that disable themselves when they finish are also not allowed.
- Fixed typo in the Expression Parameters inspector showing used memory as bytes rather than bits.
- Fixed SDK Control Panel setting scripting defines every IMGUI redraw (improves performance slightly).
- Improved Lightprobe Hack behavior in situations with lots of ambient lighting.
- Fixed how empty expression parameter lists are filled with default parameters. Expression parameter lists can be empty again.
- Removed internal warning messages related to PhysBone and Constraint Burst jobs sometimes appearing when opening a project or recompiling scripts.

## Fixes & Changes to DPID in `3.7.1-beta.2`

- Fixed `alphaIsTransparent` over-emphasising incorrect details.
- Fixed non-sRGB textures (e.g. normal maps) diverging at higher mip levels.
    - This should now be consistent with sRGB behavior.
- Fixed edge cases where a single fully-transparent pixel would get counted when the others are all the same color.
- Fixed null reference exceptions being spammed in the log when importing SDK 3.7.1 for the first time.
    - DPID is now correctly applied to all mipmaps that previously used Kaiser.
- Simplified and streamlined the compute shader.
- Reduced DPID-related log spam.

## Fixes & Changes to DPID in the final version

- Marked DPID as "BETA" and switched to opt-in.
- Set "conservative mode" to be the default, since it seems to give better results overall.
- Fixed normal maps (again).
- Fixed support for lightmaps.
- Support DPID mipmaps on HDR and Float format textures.

## Known Issues

- The first time you open a Scene and select a GameObject inside a prefab with a U# Behaviour, the GUI for the component directly below that U# Behaviour will not show its GUI. Deselecting and re-selecting the prefab fixes this.
- Buffer Particles don't work as they did in Unity 2019, [there is a workaround to fix them from community member hfcRed here](https://x.com/hfcRedddd/status/1696915379090604179).
- Unity 2022 sometimes causes Rider's debugger to stop for unhandled exceptions in Unity's IMGUI.
    - Please refer to [this workaround](https://forum.unity.com/threads/rider-debugger-breaks-on-unhandled-exception.1135879/#post-7305256) and [Jetbrains's bug tracker](https://youtrack.jetbrains.com/issue/RIDER-64944) for more information.
