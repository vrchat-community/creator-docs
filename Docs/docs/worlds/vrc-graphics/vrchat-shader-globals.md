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
- `float _VRChatMirrorMode`:
  - `0` - Rendering normally, not in a mirror
  - `1` - Rendering in a mirror viewed in VR
  - `2` - Rendering in a mirror viewed in desktop mode
- `float3 _VRChatMirrorCameraPos` - World space position of mirror camera (eye independent, "centered" in VR)