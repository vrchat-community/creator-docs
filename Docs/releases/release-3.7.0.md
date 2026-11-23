---
slug: release-3-7-0
date: 2024-08-16
title: Release 3.7.0
authors: [momo]
tags: [release]
---
## Summary

This update adds VRChat Constraints, Unity AI Navigation, improves Avatar editor panels, upgrades Standard Lite, implements new Player State APIs, and more!

<!-- truncate -->

## New features

- ⚠️ The SDK now blocks uploads if the last built avatar exceeds the new reduced download or uncompressed size limits for Avatars.
- This release integrates [Unity 2022's AI Navigation](https://docs.unity3d.com/Packages/com.unity.ai.navigation@1.1/manual/index.html) package, which allows you to create non-player characters (NPCs) that can intelligently move around the game world, using navigation meshes that are created automatically from your Scene geometry.
    - As the VRChat SDK now includes a reference to the AI navigation package, an "AI Navigation" window appears when you upgrade your scene. You can close it by right-clicking and selecting "Close."
    - We published [AI Navigation documentation for VRChat Worlds](https://creators.vrchat.com/worlds/udon/ai-navigation/) and an [AI Navigation Example Scene](https://creators.vrchat.com/worlds/examples/ai-navigation-example/) to help you get started.
- Some Avatar editor panels have been updated:
    - The Expression Parameters and Expressions Menu editors have been rebuilt from the ground up.
    - The updated Expression Parameters editor:
        - Allows you to reorder elements via drag & drop easily
        - Uses a progress bar style meter to indicate how many synced bytes the parameters use
        - The Expression Parameters assets now have a new icon, making them easier to see in your Assets folder
    - The updated Expressions Menu editor:
        - Shows the current Menu Controls count alongside the maximum number of Controls you can add
        - Shows the types of each Control at-a-glance
        - Allows you to reorder the Controls via drag & drop easily
        - Has improved and updated warnings and errors
        - Has improved layout for editing all the Control types
        - For Sub-Menu Controls - allows for quick creation of a new Menu asset and provides a button to open the editor for the submenu with a single click
        - The Expressions Menu assets now have a new icon, so they're easier to see in your Assets folder
- Massively upgraded `Standard Lite` shader!
    - Considerably improved performance in the baseline.
    - *Non-linear Lightprobe sampling*: This will avoid unusual stark contrast for real-time objects in a scene.
    - *Lightprobe specularity*: This will fall back to using lightprobes in the scene to generate specular highlights if no reflection probes are present.
    - *Geometric Specular AA*: This will avoid jagged/aliased edges for shiny objects at a distance/at sharp angles by tweaking the roughness to add just enough to stretch any highlights over at least one extra pixel - this should reduce the apparent 'screen door' effect on a lot of geometry.
    - *Spherical Harmonics lightmap compatibility through MonoSH* (Bakery): This allows you to have the appearance of real-time lighting without the cost, by having every pixel of a lightmap encode light spread and direction, and otherwise treating it as being lit that way. The MonoSH version in particular avoids additional memory cost by squeezing everything into just one extra map. Baking MonoSH-compatible lightmaps requires the external Bakery plugin.
- Added [OnLanguageChanged](/worlds/udon/graph/event-nodes/#onlanguagechanged) Udon event that gets called on join and when users select a new display language.
- Added an info-level message in the SDK build panel that encourages using Kaiser mipmapping for higher clarity.
    - We talked about the new DPID mipmapping algorithm [in a dev update](https://ask.vrchat.com/t/developer-update-11-july-2024/25514#mipmapping-experiments-8) before. This is a first step towards that - though the algorithm is not included yet, so this will recommend default Unity Kaiser mips for now.
- Added a gizmo to `VRCSceneDescriptor` to visualize the respawn height.
- The VRC Scene Descriptor now shows a gizmo in your scene for each spawn defined in the spawns list.
- Auto-converting Dynamic Bones components into PhysBones is now required before uploading.
- Implemented some new player state APIs available via Udon:
    - event [`OnPlayerSuspendChanged(VRCPlayerApi player)`](/worlds/udon/graph/event-nodes/#onplayersuspendchanged)
    - event [`OnMasterTransferred(VRCPlayerApi newMaster)`](/worlds/udon/networking/network-components#onmastertransferred)
    - [`VRCPlayerApi Networking.Master { get; }`](/worlds/udon/networking/network-components#networking-properties)
    - [`VRCPlayerApi Networking.InstanceOwner { get; }`](/worlds/udon/networking/network-components#networking-properties)
    - [`bool VRCPlayerApi.isSuspended { get; }`](/worlds/udon/players/#get-issuspended)

## VRChat Constraints

VRChat Constraints are a full-featured replacement for Unity's built-in "Constraint" components. These are available to use on avatars. Existing constraint setups can be auto-converted.

In the client, all constraints will be auto-converted on load, but it is still recommended to use the SDK option to do so, as it allows direct testing and even further improved performance.

VRChat Constraints are supported on Mobile avatars! Check out our updated [performance rank page](/avatars/avatar-performance-ranking-system) for limits.

VRChat Constraints also have a few unique features, like native "world constraints". Go check out [the extensive documentation](/common-components/constraints/) for more info!

## Fixes

- Fixed issue with broken input events in ClientSim, addressing [this Canny issue](https://feedback.vrchat.com/admin/feedback/sdk-bug-reports/p/sdk-361-broke-inputgetkey?boards=sdk-bug-reports).
- Fixed world uploads failing in some cases when using inline sprites in TextMeshPro labels.

## Breaking API Changes

As the minor version bump indicates, `3.7.0` contains breaking changes for user tooling. In particular, all exposed information and APIs related to _DynamicBones_ have been removed without replacement. As uploading with DynamicBones is no longer supported, user tooling should be updated to reflect that and only support PhysBones going forward.

## Fixes & Changes relative to `3.6.2-beta.1`

This supercedes the `3.6.2` series.

- Improved stability of the new editor panels.
- Fixed some issues displaying code-generated avatar asset files, as many community tools do.
- Fixed avatar expression menu missing parameters between SDK upgrades and restarts.
- Fixed empty control names being incorrectly overwritten with "New Control".
- Fixed boolean Toggle menu entries not working as expected in-game (toggles created in `3.6.2-beta.1` or `3.6.2-constraints.4` may need to be recreated).
- Sub-assets of expression menus will now copy the target parameter object from the root asset if set.
- Fixed network IDs not being displayed in the Scene Descriptor inspector.

## Fixes & Changes in `3.7.0-beta.2`

- Fixed inconsistent loading of Expression Menu and Parameter icons in editor.
- Fixed issue that caused Diffuse and BumpedDiffuse mobile shaders to appear all white.

#### Constraints Fixes

- Fixed rotation constraints locked in exactly one axis sometimes appearing at the wrong rotation. (Woo, gimbal lock.)
- Fixed parent constraints potentially shifting in the SDK when Activate is pressed.
- Improved stability for constraints that reference one another in a loop.
- Fixed more issues with super-low weight constraints.
- Fixed offsets not always being calculated correctly for unlocked VRChat position constraints.
- Made corrections to how aim and look-at constraints behave when they are solving in local space.
- Fixed constraint sources losing their references when selecting multiple VRChat constraints and editing their sources lists at the same time.

- Improved support for community made tools interacting with the constraints auto-converter in the SDK.
    - Please refer to [our documentation](/common-components/constraints/#editor-tooling-info) for more info.

## Fixes & Changes in the final version

- Further adjustments to the exposed API for constraints. Refer to the [constraints documentation](/common-components/constraints/#editor-tooling-info) for more info.
    - This includes a parameter to indicate if a conversion was triggered by clicking "Auto-Fix".
- Improved parameter assignment for submenus in the expression menu editor.
- Fixed incorrect LFS references in .dylib files.

## Known Issues

- The first time you open a Scene and select a GameObject inside a prefab with a U# Behaviour, the GUI for the component directly below that U# Behaviour will not show its GUI. Deselecting and re-selecting the prefab fixes this.
- Buffer Particles don't work as they did in Unity 2019, [there is a workaround to fix them from community member hfcRed here](https://x.com/hfcRedddd/status/1696915379090604179).
- Unity 2022 sometimes causes Rider's debugger to stop for unhandled exceptions in Unity's IMGUI.
    - Please refer to [this workaround](https://forum.unity.com/threads/rider-debugger-breaks-on-unhandled-exception.1135879/#post-7305256) and [Jetbrains's bug tracker](https://youtrack.jetbrains.com/issue/RIDER-64944) for more information.
