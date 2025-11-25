---
slug: release-3-7-3
date: 2024-11-05
title: Release 3.7.3
authors: [momo]
tags: [release]
---
## Summary

This update fixes multiple issues with [VRChat Constraints](/common-components/constraints).

<!-- truncate -->

## New features

- Added an option to the Settings tab of the SDK Control Panel to prevent VRChat constraints from running while in Edit mode.
- It is now possible to trigger the "Activate" and "Zero" functions on a VRChat constraint from C# Unity Editor scripts by using the new `ActivateConstraint()` and `ZeroConstraint()` methods, [addressing this Canny request](https://feedback.vrchat.com/sdk-bug-reports/p/expose-activate-button-procedure-of-vrcconstraint-components-to-api).

## Fixes & Changes

- Improved [Physbone](/common-components/physbones) and [Contact](/common-components/contacts) behavior when used beneath [VRChat Constraints](/common-components/constraints) to reduce jittering.
    - They sort their internal execution orders properly within a frame now.
- Fixed a case where toggled constraints could misbehave when three or more constraints are used on the same GameObject at once.
- Fixed the "Activate" and "Zero" functions of VRChat Constraints not applying as overrides to prefab instances.
- Fixed `VRCConstraintSource` having its values overwritten with defaults when created with the default constructor in C#.
- Fixed rotation, aim and look-at constraints drifting very gradually when one or more axes are unfrozen in certain configurations.
- Fixed constraints applying incorrect positions when the target transform is scaled to zero in any axis.
- Fixed constraints sometimes having their position or rotation shifted by a tiny amount every frame under certain conditions when they should be staying still.
    - This should make it easier to work with prefabs containing constraints.
- [Physbone](/common-components/physbones) stats now recalculate properly when reloading a scene or switching platform.
- Fixed [Physbone](/common-components/physbones) jitter by including fixes from client release [2024.3.3](https://docs.vrchat.com/docs/vrchat-202433).
- Fixed "Avatar Options" incorrectly being shown twice in the Settings tab of the SDK Control Panel.
- Fixed `com.unity.ugui` missing as a dependency of the Worlds SDK, addressing [this Canny request](https://feedback.vrchat.com/sdk-bug-reports/p/vrcsdk-packagejson-is-missing-dependency-on-unity-ui).
- Added a new "ExampleData" type to the SDK, which will be used to hold metadata for Examples in the future.

## Known Issues

- The first time you open a Scene and select a GameObject inside a prefab with a U# Behaviour, the GUI for the component directly below that U# Behaviour will not show its GUI. Deselecting and re-selecting the prefab fixes this.
- Buffer Particles don't work as they did in Unity 2019, [there is a workaround to fix them from community member hfcRed here](https://x.com/hfcRedddd/status/1696915379090604179).
- Unity 2022 sometimes causes Rider's debugger to stop for unhandled exceptions in Unity's IMGUI.
    - Please refer to [this workaround](https://forum.unity.com/threads/rider-debugger-breaks-on-unhandled-exception.1135879/#post-7305256) and [Jetbrains's bug tracker](https://youtrack.jetbrains.com/issue/RIDER-64944) for more information.
