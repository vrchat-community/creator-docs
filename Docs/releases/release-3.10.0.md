---
slug: release-3-10-0
date: 2025-10-24
title: Release 3.10.0
authors: [momo]
tags: [release]
---
## Summary

SDK Version `3.10.0` brings **VRChat Dynamics** to **Worlds**! This includes [PhysBones](/common-components/physbones), [Contacts](/common-components/contacts), [VRC Constraints](/common-components/constraints), and Udon integration for all of them. Additionally, [world persistence](/worlds/udon/persistence/) now exposes data usage information and limits.

<!--truncate-->

:::info

This release was originally versioned `3.9.1`, then bumped due to incompatible APIs.

:::

## New Features

- **VRChat Dynamics are now supported in Worlds**!
    - [PhysBones](/common-components/physbones), [Contacts](/common-components/contacts) and [VRC Constraints](/common-components/constraints) are now available in worlds projects.
    - All of these components have new Udon APIs and events that allow your scripts to work with them!
    - This is one of the [most requested features](https://feedback.vrchat.com/udon/p/physbones-in-the-worlds-sdk) for our Worlds SDK - we can't wait to see what you will create with it!
- World persistence now has an API to retrieve [Storage Information](/worlds/udon/persistence/player-data/#storage-information).
    - This includes 3 new functions, `GetPlayerDataStorageUsage`, `GetPlayerDataStorageLimit`, and `RequestStorageUsageUpdate`.
    - The `Request` function pairs with the new `OnPersistenceUsageUpdated` event.
    - There are also 2 new events for `PlayerData` usage: `OnPlayerDataStorageWarning` and `OnPlayerDataStorageExceeded`.


## Fixes & Changes

- A validation warning is now shown in world projects where any spawn point is below the respawn height for the world.
- Improved handling of missing spawn points in world projects.
- Reduced internal log output when a project loads and when assemblies are reloaded.
- Avatar and world IDs now have leading and trailing whitespace removed.
- Fixed an SDK crash triggered by deleting any source transform for a VRChat constraint while that constraint component was still visible in the inspector.
- Fixed the validations window inadvertently resetting custom poses or animations applied to the avatar in the scene every time it was refreshed.


## Fixes & Changes from `3.9.1-beta.1` to `3.9.1-beta.2`

- Changed `VRCContactReceiver.UpdateContentTypes()` to take an array of strings instead of an `IEnumerable` of strings. This should fix Udon graphs containing this method not compiling correctly.
    - If you were previously using this method in U# and passing anything other than a `string[]` to it, you'll now need to update your scripts to pass a string array.
- Resolved an unintended compatibility breaking change with some community made tools.
    - Specifically, the class `PhysBoneGrabHelper` has been moved back to its original assembly location.
- Removed `name` from the list of symbols exposed to Udon for PhysBones, Contacts and VRC Constraints in worlds.
    - This was causing confusion and can be accessed via the `.gameObject` property anyway.
- On contact receivers, the "Allow Self" and "Allow Others" options now only apply when the incoming sender is part of an avatar, meaning these settings are unused when dealing with a contact sender in a world.
    - Remember, you can disable "World" in "Content Types" if you don't want a receiver on your avatar to detect world contact senders.
- PhysBones, Contacts and VRC Constraints now behave properly when used on a `VRCPlayerObject`.
- PhysBones instantiated in a world using `Object.Instantiate()` now simulate properly instead of staying rigid.
    - Grabs and poses will not synchronize between clients on PhysBones that are instantiated in this way, similarly to how Udon behaviors on instantiated objects are also unsynced.
- Fixed some entries in the Udon Class Exposure Tree showing as "not exposed" when they actually are. This mostly affected the recently added dynamics components.
- Fixed avatar uploads failing with an incorrect "missing thumbnail" error if the upload process was interrupted part way through.


## Fixes & Changes from `3.9.1-beta.2` to `3.10.0-beta.1` and `3.10.0`

- Compatibility changes related to the `PermissionFilter` struct used by PhysBones.
    - New constructors have been added, including a default constructor that takes no parameters. These constructors set the `contentTypes` property to `Everything`, which resolves an incompatibility with some existing community packages.
    - The planned SDK release version has been moved from `3.9.1` to `3.10.0` due to remaining incompatibilities that we were unable to resolve sufficiently.
- Fixed `OnPhysBoneGrabbed()` not receiving the player that initiated the grab when using ClientSim in a world project.
- Resolved a case that would allow uploading an avatar with no thumbnail attached to it.


## Known Issues

- In rare cases, you may see an "All pipe instances are busy" error while building. This is a Unity issue - restarting your editor and trying again should fix it.