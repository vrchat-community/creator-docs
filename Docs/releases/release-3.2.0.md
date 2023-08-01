---
slug: release-3-2-0
date: 2023-05-03
title: Release 3.2.0
authors: [momo]
tags: [release]
draft: false
---
### Summary

Adds DataContainers, PhysBones 1.1 ('Squishy PhysBones'), AsyncGPUReadback, and more.

### Features

- **DataContainers!** Lists, Dictionaries and JSON for Udon!
    - Added DataLists and DataDictionaries, giving Udon functionality similar to Lists and Dictionaries.
        - Lists and dictionaries typically need to support Generics, and Udon does not support them, so this is being done by putting your data into DataTokens first, which are able to store any value.
    - Added VRCJSON, a helper class that can convert JSON strings (such as those received from [Remote String Loading](/worlds/udon/string-loading) to and from DataLists and DataDictionaries.
    - [Read the Data Containers / VRCJSON docs page](/worlds/udon/data-containers) to learn more.

- **AsyncGPUReadback!** This allows you to read back data from GPU and shaders without a heavy performance cost
    - Adds the `VRCAsyncGPUReadback.Request` function and corresponding `OnAsyncGpuReadbackComplete` event
    - These read data from the GPU into CPU memory without too much of a performance impact, at the expense of delaying the data for one or more frames
    - Check the [ASyncGPUReadback](/worlds/vrc-graphics/asyncgpureadback) docs for more info.

<!--truncate-->

### Improvements

- **Squishy PhysBones!** You can now implement PhysBones that can "squish" or compress instead of stretch!
    - To set up a Squishy PhysBone, swap your PhysBone component to version 1.1 and adjust the "Max Squish" value.
    - **All PhysBones are now versioned!** You can change the version in the PhysBone component. This is being done to allow us to add new features safely.
        - Old PhysBones are on Version 1.0 automatically.
        - Squishy PhysBones features are on Version 1.1. There are some other changes documented below.
        - **All versions will be maintained.** 1.0 is not being deprecated but it is feature-locked and will not have new features added. Any time we add a new "breaking" feature, we will increment the version.
    - PhysBones 1.1: **Gravity and Stiffness act differently and require new values if you are upgrading from 1.0.**
        - Gravity is now the ratio of how much the bones should point straight up/down in world space when at rest.
        - Stiffness is now the ratio of how much a bone attempts to stay in its previous orientation.
        - Previously, these values were direct forces that you needed to balance with the Pull factor. We believe this should be more direct and easier to use.
        - These changes were also necessary to support the new functionality added to the component.
    - PhysBones 1.1: **Max Squish value has been added.** This is a percentage of how much a bone can shrink.
        - The `_Squish` parameter has been added. It works similarly to the `_Stretch` parameter.
    - PhysBones 1.1: **Stretch Motion value has been added.** This is a ratio of how much motion affects a bone stretching or squishing.
    - Categories of values in the VRCPhysBone component UI can now be collapsed.
        - Categories also include a Help button which will take you to the online documentation for that subject.
    - [PhysBones](/avatars/avatar-dynamics/physbones) documentation will be updated during the Open Beta for PhysBones 1.1 and Squishy PhysBones.
- The Network ID Utility now works for PhysBones in avatar projects
    - This tool allows syncing PhysBones between avatars on different platforms, even if they have different GameObject hierarchies
        - This advanced tool is only useful if your PC and Quest avatars have different hierarchies!
        - You don't need to worry about this tool if you don't know why you'd do that.
    - [See the full docs for more info](/worlds/udon/networking/network-id-utility)

### Changes since 3.2.0-beta.1
- Re-added some public methods that got removed, including `GetOrAddComponent`
    - These are marked as `[Obsolete]` now, make sure to migrate away from using them as they will be removed properly at a later date
- Fixed some issues with grabbing PhysBones in Unity
- PhysBone stretch is no longer clamped
    - This restores previous behaviour
- DataContainers: Fixed `GetKeys` and `GetValues` returning incorrect values after using `Add`

### SDK API Changes
We're working on documenting the "Public API" of the SDK, which will be guaranteed not to change between minor and patch versions. In the meantime, here are things that have changed since 3.1.13:

#### Extension Methods
We've moved some extension methods into the VRC.Core namespace.
If you're using the `Transform.Reset()` method, you should instead use `VRC.Core.ExtensionMethods.Reset(Transform t)`.
Here are the other similar changes you should make:
- `Transform.GetHierarchyPath` > `VRC.Core.ExtensionMethods.GetHierarchyPath(Transform t, Transform relativeTransform)`
- `Transform.GetShortHierarchyPath` > `VRC.Core.ExtensionMethods.GetShortHierarchyPath(Transform t, Transform relativeTransform)`
- `GameObject.GetOrAddComponent` > `VRC.Core.ExtensionMethods.GetOrAddComponent(GameObject go)`
- `Type.GetFriendlyGenericTypeName` > `VRC.Core.ExtensionMethods.GetFriendlyGenericTypeName(Type t, bool includeNamespaces)`

#### Assembly Move

PhysBoneGrabHelper moved assemblies, you may need to reference the `VRC.SDK3A` assembly now from your code. [Here is an example fix](https://github.com/BlackStartx/VRC-Gesture-Manager/pull/22).

#### Changes not meant for public use
Additionally, we've made some changes to the following classes, which are _not_ considered part of the Public API for the SDK, and you should move away from using them as soon as possible.
We will publish a document listing all the exclusions from our SDK before the end of May.
- `ApiCacheEditor`
- `VRC.Core.ApiCache`
- `VRC.Core.ApiCache.CachedResponse`
- `VRC.Core.ApiCache.CacheEntry`
- `VRC.Core.ApiFeedback`
- `VRC.Core.ApiFile`
- `VRC.Core.ApiModel`
- `VRC.Core.ApiModel.SupportedPlatforms`
- `VRC.Core.APIResponseHandler`
- `VRC.Dynamics.PhysBoneManager.Bone`
- `VRC.Dynamics.PhysBoneManager.Chain`
- `VRC.Dynamics.PhysBoneManager.PhysBoneJob`
- `VRC.Dynamics.PhysBoneManager.Pose`
- `VRC.Dynamics.VRCPhysBoneBase`
- `VRC.SDK3.Dynamics.PhysBone.VRCPhysBoneEditor`
- `VRC.Udon.ClientBindings.UdonClientInterface`
- `VRC.Udon.Security.UnityEngineObjectSecurityBlacklist`
  The UdonManager will have parts that are part of the Public SDK API, but changes were made to 'banlisted' methods which are not meant to be used directly.