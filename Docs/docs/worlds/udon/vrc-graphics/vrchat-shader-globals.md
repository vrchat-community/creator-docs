---
title: "VRChat Shader Globals"
slug: "vrchat-shader-globals"
hidden: false
createdAt: "2023-04-11T20:25:09.753Z"
updatedAt: "2023-04-11T20:28:55.746Z"
---
VRChat provides multiple global shader parameters Shader creators can use to implement VRChat-specific features.

The following shader globals are currently available:

- `float _VRChatCameraMode`:
  - `0` - Rendering normally
  - `1` - Rendering in VR handheld camera
  - `2` - Rendering in Desktop handheld camera
  - `3` - Rendering for a screenshot
- `uint _VRChatCameraMask` - The `cullingMask` property of the active camera, available if `_VRChatCameraMode != 0`
- `float _VRChatMirrorMode`:
  - `0` - Rendering normally, not in a mirror
  - `1` - Rendering in a mirror viewed in VR
  - `2` - Rendering in a mirror viewed in desktop mode
- `float _VRChatFaceMirrorMode` - `1` when rendering the face mirror (VR and Desktop use different camera types!), `0` otherwise
- `float3 _VRChatMirrorCameraPos` - World space position of mirror camera (eye independent, "centered" in VR), `(0,0,0)` when not rendering in a mirror
- `float3 _VRChatScreenCameraPos` - World space position of main screen camera
- `float4 _VRChatScreenCameraRot` - World space rotation (quaternion) of main screen camera
- `float3 _VRChatPhotoCameraPos` - World space position of handheld photo camera (first instance when using Dolly Multicam), `(0,0,0)` when camera is not active
- `float4 _VRChatPhotoCameraRot` - Look, you get the idea