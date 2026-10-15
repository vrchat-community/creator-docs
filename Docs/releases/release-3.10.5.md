---
slug: release-3-10-5
date: 2026-09-04
title: Release 3.10.5
authors: [momo]
tags: [release]
---
## Summary


SDK Version `3.10.5` brings a big collection of fixes and workflow improvements, [AudioLink](https://github.com/llealloo/audiolink) support for [Toon Standard](/platforms/android/quest-content-limitations/#shaders), as well as Realtime Reflection Probe and Shadowmask Mode access from Udon.


<!--truncate-->

## Features

- [AudioLink](https://github.com/llealloo/audiolink) support for [Toon Standard](/platforms/android/quest-content-limitations/#shaders), including on mobile platforms!
  - AudioLink is a community package that allows shaders to react to music playing in a world.
  - Note that AudioLink only works in worlds that are using the AudioLink community prefab as well.
    - For worlds with no AudioLink, you can enable "Fallback Mode" to trigger the effects at a fixed rhythm.
  - Supports 3 built-in effect types:
    - **Pulse**: Pulses the emission to the selected audio band.
    - **Scroll**: Scrolls the selected audio band activity over the surface.
    - **Bar**: Shows the intensity of a selected audio band.
    - You can also combine all of the effects by using a UV-based mode.
- You can now enable/disable Realtime Reflection Probes on all platforms. Use `VRCQualitySettings.RealtimeReflectionProbes` from Udon.
- You can now enable "Distance Shadowmask" mode on PC, allowing for mixed realtime and baked shadows. Use `VRCQualitySettings.ShadowmaskMode` from Udon.
- UdonSharp scripts can now use Assembly Version Defines in their code.
  - For example, you can detect if the current VRC SDK is version 3.10 or newer by using 3.10 as the Version Define Expression in your Assembly Definition file. This then allows you to gate code with an `#if` condition like `#if SDK_310_OR_NEWER` at compile-time.
- Added an "Outline Renderers" property to [VRCPickup](/worlds/components/vrc_pickup/), which can be used to manually specify which parts of the pickup are highlighted when you hover over it in VRChat.
- Added a `Root Transform` property to [VRCRaycast](/avatars/avatar-components/raycast/), which allows the ray to start from a different transform to the one holding the component.
- Added `Allow Self` and `Allow Others` options for global [PhysBone Colliders](/common-components/physbones#vrcphysbonecollider) on avatars. This allows them to optionally not collide with PhysBones on this avatar or on avatars used by other people.


## Fixes & Changes

- Reloading the editor domain in an SDK project (for example, by adding a new asset to the project) while it is in play mode no longer causes PhysBones and Contacts to stop working.
- Resolved a null reference exception from ClientSim's network utilities caused by disabling domain reloading when entering play mode in the SDK.
- The Activate and Zero actions in the inspector on [VRChat Constraints](/common-components/constraints/) can now be undone, and they will mark the scene/prefab as having unsaved changes when used.
- [VRCRaycast](/avatars/avatar-components/raycast/) now sets its parameters as if it missed when the component becomes disabled. Previously, it left these parameter values as they were before getting disabled.
- Fixed an issue that could cause contacts in worlds to get the wrong contact point when colliding with a sphere shaped contact sender that has an offset.
- The SDK now strips scripting define symbols beginning with `VRC_ENABLE_` that it doesn't recognize.
- General improvements to the robustness of [VRCJson](/worlds/udon/data-containers/vrcjson/) deserialization.
  - Collections that are closed in the wrong way (for example, `[}`) are no longer interpreted as valid.
  - Characters that open and close collections are now handled correctly when used inside strings (for example, `["["]` and `["{"]` are now interpreted as valid).
- Built assets are now scanned for duplicate `PipelineManager` components before they're uploaded.
  - Having more than one can cause subtle issues after uploading.
  - Additionally, it's no longer possible to have multiple `PipelineManager` components on the same game object.
- Fixed an issue where humanoid avatars without any eye bones could have head contacts generated at the wrong position and size.
- Reorganized several VRChat components under the "Add Components" menu so they're all placed into a shared "VRChat" category. Some components only intended for internal use are now hidden from the Add Components menu.
- The engine's XR settings files in the `XR` directory are now moved to the SDK package as the project loads to keep it clear of your project files.
- In avatar projects, auto-generated Contacts and PhysBone Colliders (for example, the ones appearing on your hands and fingers) now correctly mirror to the other side of the avatar if the entire avatar has been moved or rotated away from the origin of the scene.
- In avatar projects, if you have manually changed the effective transform of an auto-generated Contact or PhysBone Collider on the avatar, that custom transform is now preserved unless the transform is completely missing. Previously, these would be automatically reset to the expected transforms when viewing the avatar's descriptor in the inspector.
  - These transforms are now validated on upload too.
  - Manually reassigning the transforms of these auto-generated shapes is not officially supported. If you want global colliders elsewhere on your avatar, VRChat recommends using [global PhysBone colliders](/common-components/physbones/#vrcphysbonecollider) instead.
- Fixed an edge case that could cause the Unity Animator window to open by itself in very specific circumstances.
- Fixed an issue that would cause multi-platform builds for an avatar to fail when the avatar is nested under one or more other game objects.
- Resolved a case where the "Animator Play Audio" animation behavior could stop working in the editor under specific circumstances.
- In avatar projects, the Unity warning "Animator is not playing an AnimationController" should no longer be logged when entering play mode in an avatar project containing PhysBones or Contacts while no animation controller is assigned to it.
- Stability improvements for the "Builder" window when logging out of an account in the SDK and then into another.
- Fixed layout issues related to the UdonBehaviour component where either the component itself or the component after it in the game object would not draw at the correct height.
- Fixed some cases of the Unity-side warning `Value cannot be null` based on community reports.
- The UdonSharp script creation dialog now explicitly limits script creation to the Assets folder. This means the SDK no longer misbehaves when creating a script in a folder other than this project's Assets folder.
- UdonBehaviours in ClientSim will no longer run Unity events such as `OnDisable()` while the SDK is switching from play mode to edit mode. This better reflects how the VRChat client behaves.
- When player persistence is updated repeatedly in succession by a world, ClientSim will no longer attempt to save simulated changes to player persistence while an existing save is already in progress.
- Corrected a logic fault in the SDK that meant Unity's primitive meshes (cube, capsule, etc.) could visibly appear at the world origin for a single frame when entering play mode.
- Fixed an issue where avatar uploads could fail due to a missing "tags" array.
- Fixed an issue that could cause SDK imports to fail in projects that contain custom SDK packages whose names contain non-Latin characters.
- The SDK now correctly treats "Build & Reload" for worlds as a Test build in `VRC_SdkBuilder.ActiveBuildType`. Previously, no build type was set.
- When entering play mode, game objects tagged with `EditorOnly` are now only removed after the scene is loaded, not before. This resolves exceptions that could trigger when the SDK project is configured by the user or custom tooling to not reload the scene when entering play mode.
- Asset importing is now paused during UdonSharp updates. This may improve performance by collapsing multiple asset reimports into one.
- Resolved a case where the count of lights on an avatar reported by the validations section could be made to overflow.
- Corrected a case where a [DataToken](/worlds/udon/data-containers/) storing an `int` could not be converted into a `long`.
- Reduced the verbosity of internal SDK logging to try and reduce confusion from messages that are not relevant.


## Fixes & Changes in `3.10.5-beta.2`

- In avatar projects, switching the type of an expressions menu from "SubMenu" to any other type now clears its sub menu reference automatically.
  - This avoids validation errors referring to a sub menu that's no longer visible in the inspector.
- Resolved cases where avatar uploads could fail if no description was set.
- UdonSharp scripts can now be created in the Packages folder again as well as in the Assets folder.
  - Directly creating scripts outside of the project entirely is still not supported, but is now handled cleanly with a descriptive error message.
- [VRCJson](/worlds/udon/data-containers/vrcjson/): Fixed some objects with nested braces, such as `{ "x": { "y": "{" } }`, failing to deserialize.
- PhysBones now reset animator parameters and Udon state when becoming disabled if "Reset When Disabled" is set.


## Known Issues

- In rare cases, you may see an "All pipe instances are busy" error while building. This is a Unity issue - restarting your editor and trying again should fix it.
