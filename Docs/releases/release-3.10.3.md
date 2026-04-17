---
slug: release-3-10-3
date: 2026-04-16
title: Release 3.10.3
authors: [momo]
tags: [release]
---
## Summary

SDK Version `3.10.3` brings Toon Standard improvements, the [VRCRaycast](/avatars/avatar-components/raycast) component, and exposes VRC+ subscription status to Udon!

<!--truncate-->

## Features

- Added the [VRCRaycast](/avatars/avatar-components/raycast) component.
    - It allow avatars to fire rays through the scene that hit against colliders in the world or on players. A transform is positioned at the point the raycast hits.
    - This provides similar functionality to [FinalIK](/avatars/whitelisted-avatar-components/whitelisted-avatar-components/#root-motion-finalik), but is much more optimized and easier to use.
- The [Toon Standard](/platforms/android/quest-content-limitations/#shaders) shader now supports a "Color Mask" property.
    - This allows you to apply different Tint values based on an RGB(A) mask texture.
    - Every channel can additionally be configured with Emission.
    - The additional Tint can be applied in Multiply and Additive modes.
    - Color masks without an alpha channel will automatically disable the 4th Tint option to avoid confusion.
- Added an [isVRCPlus](/worlds/udon/players/#get-isvrcplus) property to `VRCPlayerApi` to allow Udon to query if a user has an active VRC+ subscription.


## Fixes & Changes

- Fix String and Image URL loading features not working in ClientSim since `3.10.2`.
- Mirrors now render in `Camera.onPreCull` instead of `OnWillRenderObject` to match the 2026.1.3 client.


## Fixes & Changes from `3.10.3-beta.1` to `3.10.3-beta.2`

- Improvements to [VRCRaycast](/avatars/avatar-components/raycast):
    - Changed the editor gizmo to be orange instead of blue.
    - Added avatar animator parameters set by VRCRaycast:
        - `{Name}_Hit` is a boolean parameter set to `true` while the ray is hitting a collider and false while it isn't.
        - `{Name}_Ratio` is a float ranging from zero to one that gives the ratio of the full distance covered by the raycast. For example, if the hit is 50% of the way along the ray's maximum distance, this value will be set to `0.5`.
        - `{Name}_Distance` is a float giving the actual distance traveled by the ray in world units before it hit something.
    - Fixed the result transform facing the wrong way when the ray misses when configured to snap on miss.
    - Renamed `Positioning On Miss` to `Behavior On Miss` to better reflect that this option also affects rotation while `Apply Rotation` is turned on.
    - VRCRaycast now behaves correctly in SDK projects where domain reloading is disabled.
    - Added an option to allow raycast distance to change with the Z scale of the transform the component is attached to.
        - It's still limited to a maximum distance of 1000 units.
    - Added `public` C# properties to the raycast component for user-made SDK tooling.

## Fixes & Changes from `3.10.3-beta.2` to live

- Removed `Disable On Miss` from [VRCRaycast](/avatars/avatar-components/raycast), since it's redundant now that avatar animator parameters are available instead.


## Known Issues

- In rare cases, you may see an "All pipe instances are busy" error while building. This is a Unity issue - restarting your editor and trying again should fix it.