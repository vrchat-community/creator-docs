---
slug: release-3-1-8
date: 2022-9-18
title: Release 3.1.8
authors: [momo]
tags: [release]
draft: false
---
### Summary

Adds New Shader GLobals and VRCGraphics Methods

<!--truncate-->

### Changes

Added 3 shader globals that can be accessed by any avatar or world shader:
* float _VRChatCameraMode:
    * 0 - Rendering normally
    * 1 - Rendering in VR handheld camera
    * 2 - Rendering in Desktop handheld camera
    * 3 - Rendering for a screenshot

* float _VRChatMirrorMode:
    * 0 - Rendering normally, not in a mirror
    * 1 - Rendering in a mirror viewed in VR
    * 2 - Rendering in a mirror viewed in desktop mode


* float3 _VRChatMirrorCameraPos - World space position of mirror camera (eye independent, "centered" in VR)

* World InputFields will now open the keyboard modal when interacted with. If this behavior is not desired, add the newly created `VRCInputFieldKeyboardOverride` component to specify how to override this behavior.  Setting its setting to `Default` will open the touch modal while `Override` will not.
* New option `cameraClearFlags` on VRCMirrorReflection that overrides the camera clear flags used in the mirror
    * The default is `MirrorClearFlags.FromReferenceCamera` which retains the current behaviour of rendering the same as the active camera
* Options `customSkybox` and `customClearColor` allow mirror-specific skyboxes and clear colors
* You can now set gravity in a world to 0 or negative values
* Fixed: user-supplied masks on the FX layer were ignored, and prevented Gesture transform animations from working. [Docs updated](https://docs.vrchat.com/docs/playable-layers#fx).
* Added several new Udon nodes related to graphics and shader manipulation:
    * VRCGraphics.DrawMeshInstanced
    * VRCShader.SetGlobalFloat
    * VRCShader.SetGlobalFloatArray
    * VRCShader.SetGlobalVector
    * VRCShader.SetGlobalVectorArray
    * VRCShader.SetGlobalMatrix
    * VRCShader.SetGlobalMatrixArray
    * VRCShader.SetGlobalInteger
    * VRCShader.SetGlobalTexture
    * VRCShader.SetGlobalColor
* VRCShader functions accept string input in some cases (for texture names, mostly). You must use the _Udon prefix for these inputs
    * There is one exception. VRCShader functions will also accept the exact string _AudioTexture to accommodate for the existing widespread community-created AudioLink system