---
slug: release-3-6-2
date: 2024-07-23
title: Release 3.6.2-beta.2
authors: [momo]
tags: [release]
---
## Summary

This update adds AI Navigation, improves Avatar editor panels, implements new Player State APIs, fixes input events in ClientSim, and fixes World uploads failing when using inline sprites.

<!-- truncate -->

## New features

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
- The VRC Scene Descriptor now shows a gizmo in your scene for each spawn defined in the spawns list.
- The SDK now blocks uploads if the last built avatar exceeds the new reduced download or uncompressed size limits for Avatars.
- Implemented some new player state APIs available via Udon:
    - event [`OnPlayerSuspendChanged(VRCPlayerApi player)`](/worlds/udon/graph/event-nodes/#onplayersuspendchanged)
    - event [`OnMasterTransferred(VRCPlayerApi newMaster)`](/worlds/udon/networking/network-components#onmastertransferred)
    - [`VRCPlayerApi Networking.Master { get; }`](/worlds/udon/networking/network-components#networking-properties)
    - [`VRCPlayerApi Networking.InstanceOwner { get; }`](/worlds/udon/networking/network-components#networking-properties)
    - [`bool VRCPlayerApi.isSuspended { get; }`](/worlds/udon/players/#get-issuspended)

## Fixes

- Fixed issue with broken input events in ClientSim, addressing [this Canny issue](https://feedback.vrchat.com/admin/feedback/sdk-bug-reports/p/sdk-361-broke-inputgetkey?boards=sdk-bug-reports).
- Fixed world uploads failing in some cases when using inline sprites in TextMeshPro labels.

## Fixes between 3.6.2-beta.1 and 3.6.2-beta.2

- Improved stability of the new editor panels.
- Fixed avatar expression menu missing expression parameters between SDK upgrades and restarts.

## Known Issues

- The first time you open a Scene and select a GameObject inside a prefab with a U# Behaviour, the GUI for the component directly below that U# Behaviour will not show its GUI. Deselecting and re-selecting the prefab fixes this.
- Buffer Particles don't work as they did in Unity 2019, [there is a workaround to fix them from community member hfcRed here](https://x.com/hfcRedddd/status/1696915379090604179).
- Unity 2022 sometimes causes Rider's debugger to stop for unhandled exceptions in Unity's IMGUI.
    - Please refer to [this workaround](https://forum.unity.com/threads/rider-debugger-breaks-on-unhandled-exception.1135879/#post-7305256) and [Jetbrains's bug tracker](https://youtrack.jetbrains.com/issue/RIDER-64944) for more information.
