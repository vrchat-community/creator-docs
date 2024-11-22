---
slug: release-3-7-4
date: 2024-11-21
title: Release 3.7.4 - Persistence!
authors: [momo]
tags: [release]
---
## Summary

This update adds [Persistence](/worlds/udon/persistence) to Udon! Persistence allows you to build VRChat worlds that store data between sessions.

This update also fixes a few minor issues around [VRCJSON](/worlds/udon/data-containers/vrcjson) and [VRChat Constraints](/avatars/avatar-dynamics/constraints).

<!--truncate-->

## Persistence!

Persistence allows worlds to save high scores, inventories, the player's last position, currency, unlocks, preferences, and much more. When a player leaves a world and returns later, Udon can access their saved data.

Learn all about the new features in our [Persistence SDK docs](/worlds/udon/persistence).

## Other Fixes

- Fixed [VRChat Constraints](/avatars/avatar-dynamics/constraints) that need to run before [Physbones](/avatars/avatar-dynamics/physbones) not updating while in edit mode.
- Fixed [VRChat Constraints](/avatars/avatar-dynamics/constraints) that have a child [Physbone](/avatars/avatar-dynamics/physbones), but also depend on one, not following their sources correctly.
- Several fixes for [VRCJSON](/worlds/udon/data-containers/vrcjson):
    - Fixed an issue where braces inside strings can fail to deserialize.
    - Fixed an issue where empty arrays can fail to deserialize if there is whitespace between the opening and closing, such as `[ ]`.
    - JSON which starts with a BOM (Byte Order Mark, `\uFEFF`) would fail to deserialize. This character will now be ignored if it is at the start of the input.