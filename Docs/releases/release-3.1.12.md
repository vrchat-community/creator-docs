---
slug: release-3-1-12
date: 2023-03-29
title: Release 3.1.12
authors: [momo]
tags: [release]
draft: false
---
### Summary

New VRCGraphics features for Udon, new avatar performance metrics, and bug fixes. Now up-to-date with VRChat 2023.1.2p4.

<!--truncate-->

### New Features

* Constraints are now counted in Avatar Stats. They do not currently affect your performance ranking.
* Added support for "VelocityMagnitude" animator property for avatars.
* Added "Snap To Hand" option for VRCPhysBone. When enabled, grabbing a bone will have it snap to the user's hand, otherwise the grab is offset so it won't initially move unless dragged around.
* Added "Reset When Disabled" option for VRCPhysBones. When enabled, bones will reset to their rest position when the component becomes disabled.
* Added Self/Other filtering to various permissions in VRCPhysBones.
    * Allow Collision
    * Allow Grabbing
    * Allow Posing
* Texture VRAM usage now counts towards your avatar's overall performance rating.
* Added ability to set avatar parameters to not sync, addressing [Control the not sync parameters from Expressions Menu](https://vrchat.canny.io/avatar-30/p/feedback-control-the-not-sync-parameters-from-expressions-menu).
* Udon now has access to temporary RenderTextures as well as constructors for RenderTexture, Texture2D, Texture3D, and Sprite via [VRCGraphics](https://docs.vrchat.com/docs/vrcgraphics).


### Bug Fixes

* GraphicsSettings are only saved to disk when changes are made, to prevent unnecessary cache busting.
* Fixes issues that could cause jittering in PhysBones when isAnimated was enabled.
* Reconnects to the Creator Companion when the connection is lost.
* Ensures that the UdonEvent is called from the main thread. This avoids unexpected threading errors when the image download fails and the UdonBehaviour tries to use Unity API methods.

### Other Changes

* OnDeserializationResult parameter added to OnDeserialization() method of UdonBehaviours. This enables you to see the time at which this data was sent and received.