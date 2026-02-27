---
slug: release-3-10-2
date: 2026-02-05
title: Release 3.10.2
authors: [momo]
tags: [release]
---
## Summary

SDK Version `3.10.2` brings a large number of fixes and UX improvements, alongside several new Udon APIs.

<!--truncate-->

## Features

- Added `EventTiming.PostLateUpdate` and `EventTiming.FixedUpdate` as available timing options for [delayed custom events](/worlds/udon/graph/special-nodes#sendcustomeventdelayedframes) in Udon.
- Added the option to read and filter client log files within the SDK.
    - You can find this utility under `VRChat SDK/Udon Sharp/Parse Logs from File`.
    - Special thanks to "BobyStar" for [this canny](https://feedback.vrchat.com/sdk-bug-reports/p/add-parse-logs-from-file-option-from-udonsharp-12b)!
- UX improvements for the [Avatar Expressions Menu](/avatars/expression-menu-and-controls/) editor:
    - Since controls always set their associated parameters to zero when they deactivate, the SDK now warns you when you try to set the activation value to zero, too, because this would mean the parameter's value would never move off zero - which is probably not what you want.
    - When targeting a Boolean parameter, the `Value` attribute is now hidden and is always treated as enabled, since that's the only option that works for a Boolean (`true` when activated, `false` when deactivated).
- Added a parameterless version of [`VRCPlayerApi.GetPlayers()`](/worlds/udon/players/getting-players#getplayers) that returns an array of the players currently in your world.
    - The version accepting an array of players to populate also remains available, and is still preferred when getting the current list of players very regularly (for example, every frame) due to memory allocations.
- Added `matchingTags` to `ContactExitInfo`. This means you can now check what tags a VRChat Contact Sender and Receiver have in common as they stop contacting each other.
    - Previously, this was only available when the contacts started contacting each other.
    - Check [the Udon API documentation](/common-components/contacts/#udon-access-in-worlds) for details.
- [Avatar Parameter Drivers](/avatars/state-behaviors/#avatar-parameter-driver) now support preventing repeats when selecting random values, meaning the parameter will never be set to the same value twice in a row.
- The properties `enabled` and `isActiveAndEnabled` have been allowlisted for use in UdonGraph and UdonSharp. This applies to everything that derives from `UnityEngine.Behaviour`, which includes the majority of custom and built-in components.
    - Known limitation: Accessing `enabled` or `isActiveAndEnabled` on a field serialized as a `Behaviour` will not work if the component being targeted is derived from `UdonSharpBehaviour`. You should instead declare the field with your own custom U# type.


## Fixes & Changes

- In the "Authentication" tab, pressing the "Enter"/"Return" key after entering your username and password now logs you in.
    - We also shifted things around slightly to make it less likely that you accidentally hit "Logout" while trying to verify your 2FA code.
- Removed redundant spaces that were included when serializing a [data list](/worlds/udon/data-containers/data-lists) or [data dictionary](/worlds/udon/data-containers/data-dictionaries) to JSON with the `Minify` export type using [VRCJSON](/worlds/udon/data-containers/vrcjson).
- [`VRCJson.TryDeserializeFromJson()`](/worlds/udon/data-containers/vrcjson#json-functions) now always returns `false` instead of potentially throwing an exception if the input cannot be deserialized.
- Fixed [DataDictionary](/worlds/udon/data-containers/data-dictionaries) sometimes failing to get a value if the key is a data structure like `Vector3Int`.
- The [VRCMirrorReflection](/worlds/components/vrc_mirrorreflection) component now instantiates non-editable materials instead of changing the original material directly. This means the component no longer modifies the default material built into Unity when it is added to a Unity primitive.
- Passing VRChat Contact Sender or Receiver proxy objects to `Utilities.IsValid()` now gives accurate results based on whether or not the proxy is still valid.
- Fixed [VRChat Constraints](/common-components/constraints/) sometimes failing to appear properly in the inspector when viewed as prefab overrides.
- Added a validation hint to disable the "Auto Roll" option for particle systems in worlds, since this can be immersion-breaking for users in VR.
- Fixed [VRCPickup](/worlds/components/vrc_pickup/)'s "Use Text" inspector field not appearing consistently.
- Fixed an issue that could result in the `VRCFallback` tag being set incorrectly on materials after using certain community packages, which could then result in the materials not appearing correctly inside VRChat.
- The SDK no longer reverts changes made to the default world scene and UdonSharp utility scripts when you delete your world project's Library folder.
    - Additionally, UdonSharp utility scripts that come with new world projects will no longer be recreated if you delete them, provided you don't also delete the data locator next to them.
- Removed some empty entries in the default expression parameters set included in the SDK's samples.
- Fixed validation messages being generated against the wrong platform in avatar and world projects if any assets have platform-specific overrides.
- Fixed PhysBones regression which caused bones resting on PhysBone colliders to jitter.
- PhysBone roots can now be multi-edited.


## Fixes & Changes from `3.10.2-beta.1` to live

- Added 4 new [shader globals](/worlds/udon/vrc-graphics/vrchat-shader-globals/) containing information about time.
- The Toon Standard shader and its Outline variant now set `"RenderType" = "Opaque"`.
- Fixed internal exceptions caused by destroying a PhysBone that is the parent of one or more VRChat Constraints.


## Known Issues

- In rare cases, you may see an "All pipe instances are busy" error while building. This is a Unity issue - restarting your editor and trying again should fix it.