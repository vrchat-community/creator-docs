---
slug: release-3-8-1
date: 2025-05-22
title: Release 3.8.1
authors: [momo]
tags: [release]
---
## Summary

Version `3.8.1` adds the mobile-compatible `Toon Standard` shader, [Udon network events with parameters](/worlds/udon/networking/events/#sending-events-with-parameters), exposes several new VRChat-specific classes to Udon (including [Camera access](/worlds/udon/vrc-graphics/vrc-camera-settings) and [Network Debug Stats](/worlds/udon/networking/network-stats)), and [adds Build & Test for iOS](/platforms/iOS/build-test-mobile).

This update also allows specifying [per-platform overrides](/avatars/per-platform-avatar-overrides) for Multi-Platform Build & Publish, and fixes several UI issues in the SDK Control Panel.

<!--truncate-->

## Udon Network Events with Parameters

Please read the extensive [network events documentation](/worlds/udon/networking/events) for details! It includes several examples, network specifications for events, explanations around rate limiting, detailed notes on backward compatibility and security notes.

TL;DR: You can now specify up to 8 parameters on custom network events sent via `SendCustomNetworkEvent`. All types supported by Udon Sync work. In UdonSharp, you need to use the new `[NetworkCallable]` attribute. Your existing Udon scripts will continue to work without any changes.

- Added `[NetworkCallable]` attribute to UdonSharp, and extended the Udon Graph UI for the `Custom Event` node to allow parameters to be added.
    - Optionally takes a rate limit parameter, defaulting to 5 per second, per event (max 100 per second). Check out the [docs on rate-limiting](/worlds/udon/networking/events#rate-limiting).
- Added `NetworkEventTarget.Others`, which acts similarly to `All` but excludes the sender from receiving their own event.
- Added `NetworkEventTarget.Self`, which bypasses rate limits and can be used to send local events with parameters.
- Added functions `NetworkCalling.GetQueuedEvents` and `NetworkCalling.GetAllQueuedEvents` to monitor outgoing event queues (useful when working with rate-limiting).
    - See [docs on congestion monitoring](/worlds/udon/networking/events#congestion-monitoring).
- Added `VRCPlayerApi NetworkCalling.CallingPlayer { get; }` to get the sender of any event (including legacy ones!) while inside a function triggered remotely.
    - Includes `bool NetworkCalling.InNetworkCall { get; }` as a shortcut for `Utilities.IsValid(NetworkCalling.CallingPlayer)`.


## `Toon Standard` Shader

- Added the `Toon Standard` shader, available as `VRChat/Mobile/Toon Standard`!
- This is a full-featured toon shader that is compatible with mobile versions of VRChat. It can be used on PC, Android and iOS.
- It comes with many highly requested features that you may know from community-made PC shaders. For example:
   - Custom shadow ramps with configurable toon-style shading
   - Detail maps with selectable UV channel and render mode
   - Packable Metallic, Gloss and Occlusion maps, with configurable color channels
   - Configurable backface culling
   - Matcap support, additive and multiplicative
   - Toggleable vertex color support
   - Hue shift effect
   - Rim lighting
- The focus of this shader is on performance, which means the feature set is limited. Transparency is not supported.
- There is also a `Toon Standard (Outline)` variant that is PC-only. Uploading an avatar with the outline variant to a non-PC platform will automatically fall back to the non-outline variant.
- You can select Toon Standard as a PC [fallback shader](https://creators.vrchat.com/avatars/shader-fallback-system/) by specifying `toonstandard` or `toonstandardoutline` as the `VRCFallback` tag, making it opt-in.


## Even More New Features

- Added Build & Test support for iOS.
    - This works a bit different than other platforms, so check out [the documentation](/platforms/iOS/build-test-mobile)!
- You can now specify per-platform versions of the avatar to be used during multi-platform build & publish
    - Full documentation for this feature, including public API, is available [here](/avatars/per-platform-avatar-overrides).
- Exposed [Screen & Photo Camera](/worlds/udon/vrc-graphics/vrc-camera-settings) as well as certain [Quality Settings](/worlds/udon/vrc-graphics/vrc-quality-settings) to Udon via appropriate wrapper classes.
    - Also exposes certain quality settings, including [shadow distance](/worlds/udon/vrc-graphics/vrc-quality-settings#shadow-distance), to Udon.
    - Includes 2 new events, `OnVRCCameraSettingsChanged` and `OnVRCQualitySettingsChanged`, for when the local user changes camera or quality settings, documented [here](/worlds/udon/graph/event-nodes/#onvrccamerasettingschanged).
- Added several Udon interfaces to access network debug information.
    - These are meant for advanced Udon networking creators. Check the full documentation [here](/worlds/udon/networking/network-stats).


## Fixes & Changes

- Fixed the "Alerts" section not updating after docking the SDK Build panel and switching tabs.
- Fixed an issue where failing to build a world bundle could result in uploading a previous bundle (e.g. a bundle for a different platform).
- Slightly changed how default scale factors are assigned when adding new targets to a `VRCHeadChop` component.
    - The component will now copy the weight from the previous target in the list. This change has been made to improve support for user made tools that assign scale factors from code.
- Fixed VRChat aim and look-at constraints calculating incorrect offsets in some specific situations with the component active and the offset unlocked.
- The Avatar SDK no longer blocks the build button due to validation errors.
    - The builds will still fail if validations do not pass after all the avatar processing callbacks finish.
- SDK no longer becomes unresponsive when encountering API issues during thumbnail and content info updates.
- SDK no longer gets stuck in a disabled state when attempting to save changes when the content name is empty.
- Includes PhysBone fixes and changes up to VRChat client `2025.2.1`, build `1622`.


## Fixes & Changes in `3.8.1-beta.2`

- The copyright ownership confirmation modal has been moved to appear right after clicking "Build & Publish" instead of before upload.
- Clicking "Build & Publish" on an avatar that has [per-platform overrides](/avatars/per-platform-avatar-overrides) set up will now use the override even without multiple platforms being selected.
- Avatars with [per-platform overrides](/avatars/per-platform-avatar-overrides) configured now show a blue badge 🔵 near the "⋮" button of the avatar selector.
- Moved `PerPlatformOverrides` code into the `VRC.SDK3A.Editor` assembly. This avoids breaking changes made in `3.8.1-beta.1`.
    - Updated [the documentation](/avatars/per-platform-avatar-overrides) to reflect the revised API for getting and setting per-platform avatar overrides.
    - See [this canny](https://feedback.vrchat.com/open-beta/p/vrcsdk-381-beta1-vrcsdk-381-beta1-has-breaking-changes-for-ivrcsdkavatarbuildera) for details.
- Fixed a case where the content blueprint ID could get cleared when `BuildAndUpload` is called right after switching Scenes.
- Reserved layers can no longer have their culling distance modified via `VRCCameraSettings.LayerCullDistances`.


## Features & Changes in `3.8.1-beta.3`

- Added the `Toon Standard` shader, available as `VRChat/Mobile/Toon Standard`!
- The SDK no longer gets stuck on "Building Avatar" when building many avatars consecutively.


## Fixes & Changes in `3.8.1-beta.4`

- New features for `Toon Standard` based on your feedback!
    - Added toggleable vertex color support.
    - Added `MultiplyX2` detail map mode, similar to Standard Lite.
    - Removed `Mask` detail map mode. Instead, all modes now apply the mask texture.
        - The detail mask is now also applied to the detail normal map.
    - Added Hue Shift slider for emission, as well as a Hue Shift Mask affecting all 3 sliders.
        - Hue Shift is now a toggleable feature that can be turned off to improve performance if unused.
    - All mask textures can now select which color channel they use. You can configure this by clicking the `>` arrow to the left of each texture slot.
        - By default, the setup matches Standard Lite, just like in `beta.3`.
    - Removed `Anisotropy` slider and switched Specular implementation to regular isotropic GGX.
        - The anisotropic mode caused more confusion than it helped and had a non-insignificant performance overhead. If you have a specific use-case you consider important that requires this, let us know on our Feedback board.
    - Added `Albedo Tint` slider for Rim light.
    - Light clamping is now applied on direct and indirect lighting together, instead of individually, and can be toggled on or off via the "Limit Brightness" option.
    - Also fixed a couple of bugs:
        - Switching to a built-in Shadow Ramp now resets Scale/Offset properly.
        - Selecting multiple materials using Toon Standard at once no longer resets their Shadow Ramp setting.
        - Detail and Emission maps no longer appear pixelated at high Scale/Offset values on certain hardware.
        - Matcaps in Multiplicative mode now apply correctly to additional lights in the ADD pass.


## Fixes & Changes in the final release

- `Toon Standard` fixes:
    - Improved specular stability on mobile devices, which should help reduce bright flashes/"sparkles".
    - The `Gloss Map` now applies to `Reflectivity` as well.
    - Fixed `Hue Shift` foldout incorrectly being synced to the topmost one.
    - Fixed default values for the `Shadow Ramp` slot.
- [Per-platform overrides](/avatars/per-platform-avatar-overrides) now work correctly with prefabs and prefab variants.


## Known Issues

- In rare cases, you may see an "All pipe instances are busy" error while building. This is a Unity issue - restarting your editor and trying again should fix it.