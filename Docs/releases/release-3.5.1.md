---
slug: release-3-5-1
date: 2024-01-26
title: Release 3.5.1
authors: [momo]
tags: [release]
draft: false
---
## Summary

This release contains multiple Unity 2022 follow-up fixes and overall quality-of-life improvements.

<!--truncate-->

## New features

* New methods have been added to the Worlds SDK. These methods were previously only available to Creator Economy sellers but can now be used by all world creators.
    * Store.OpenGroupPage: Opens a group page based on its `grp_` ID.
    * Store.OpenGroupStorePage: Opens a seller's store page.
    * Store.OpenGroupListing: Open a seller's listing.
* Various features for sellers have been added to the Worlds SDK.
    * These features cannot be used in an uploaded world unless you are a seller.

## Changes
* The VRChat SDK now automatically enables "Clamp BlendShape Weights" option in VRChat projects. This mirrors VRChat Client behaviour and prevents BlendShapes from moving beyond their maximum (100) offset.

## Fixes

* Fixed spatialized audio sources creating warnings when entering play mode or adjusting their settings. Users might be prompted to restart their editor when adding the 3.5.1 SDK for the first time.
* Fixed upload speed increase logic breaking on macOS/Linux, preventing users from uploading.
* Fixed an issue where the SDK would not detect if the blueprint ID of a world / avatar is taken by another user or invalid, and attempt to upload a new world / avatar to that ID. That would result in an "Application Error" message. The blueprint ID is now cleared correctly in this case.
* Fixed an issue where builds that went above the upload limit, e.g. 10 MB for Android Avatars, reported the size incorrectly. The SDK now correctly shows all the decimal points for the size. You should no longer see error messages like "10.00 MB > 10.00 MB".

## Known Issues

* The first time you open a Scene and select a GameObject inside a prefab with a U# Behaviour, the GUI for the component directly below that U# Behaviour will not show its GUI. Deselecting and re-selecting the prefab fixes this.
* Buffer Particles don't work as they did in Unity 2019, [there is a workaround to fix them from community member hfcRed here](https://x.com/hfcRedddd/status/1696915379090604179).
* The Editor may crash when updating a shader graph reference by another shader using UsePass. This is an issue with Unity 2022.3.6f1 and is fixed in 2022.3.14f1.
* Unity 2022 sometimes causes Rider's debugger to stop for unhandled exceptions in Unity's IMGUI.
	* Please refer to [this workaround](https://forum.unity.com/threads/rider-debugger-breaks-on-unhandled-exception.1135879/#post-7305256) and [Jetbrains's bug tracker](https://youtrack.jetbrains.com/issue/RIDER-64944) for more information.
