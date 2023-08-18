---
slug: release-3-2-3
date: 2023-08-09
title: Release 3.2.3
authors: [momo]
tags: [release]
draft: false
---
### Summary

Adds "interaction passthrough" to the World Descriptor and fixes a bug in the Avatar Scaling Example Graph.

<!--truncate-->

### Changes
* Added a mask for "interaction passthrough" in the WorldDescriptor, so that world creators can allow interaction and grabs to occur through user defined layers. By default (Nothing) they will use the legacy behaviour, which was to always block interactions and grabs.
  * Note: This does not change the normal Unity behaviour that if a ray begins inside a collider, it ignores that collider. This means that desktop (which begins its ray from the center of the Player Capsule) will behave differently than VR, where the tracked hand can enter colliders that the Player Capsule cannot.
* Updates the Avatar Scaling Example Graph to prevent errors when running without ClientSim or when building the world.

## Features
* Adds `VRCPlayerApi.GetAvailableLanguages()` and `VRCPlayerApi.GetCurrentLanguage()`
