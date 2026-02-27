---
title: "VRChat Shader Globals"
slug: "vrchat-shader-globals"
hidden: false
createdAt: "2023-04-11T20:25:09.753Z"
updatedAt: "2023-04-11T20:28:55.746Z"
---
VRChat provides multiple global shader parameters Shader creators can use to implement VRChat-specific features.

:::warning

Do not use the `_VRChat` prefix for shader variables in custom shaders outside of what is documented on this page. That prefix is considered a protected namespace, and new variables may be introduced at any time, including undocumented ones.

:::

The following shader globals are currently available:

| Variable                                               | Type     | Contents                                                                                                                                                                             |
| ------------------------------------------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `_VRChatCameraMode`                                    | `float`  | <ul><li>`0` - Rendering normally</li><li>`1` - Rendering in VR handheld camera</li><li>`2` - Rendering in Desktop handheld camera</li><li>`3` - Rendering for a screenshot</li></ul> |
| `_VRChatCameraMask`                                    | `uint`   | The `cullingMask` property of the active camera, available if `_VRChatCameraMode != 0`                                                                                               |
| `_VRChatMirrorMode`                                    | `float`  | <ul><li>`0` - Rendering normally, not in mirror</li><li>`1` - Rendering in a mirror viewed in VR</li><li>`2` - Rendering in a mirror viewed in desktop mode</li></ul>                |
| `_VRChatFaceMirrorMode`                                | `float`  | `1` when rendering the face mirror (VR and Desktop use different camera types!), `0` otherwise                                                                                       |
| `_VRChatMirrorCameraPos`                               | `float3` | World space position of mirror camera (eye independent, "centered" in VR), `(0,0,0)` when not rendering in a mirror                                                                  |
| `_VRChatScreenCameraPos`/<br />`_VRChatPhotoCameraPos` | `float3` | World space position of main screen camera/<br />handheld photo camera (`(0,0,0)` when camera is not active)                                                                         |
| `_VRChatScreenCameraRot`/<br />`_VRChatPhotoCameraRot` | `float4` | World space rotation (quaternion) of main screen camera/<br />handheld photo camera (`(0,0,0,0)` when camera is not active)                                                          |

## VRChat Time Global

The `_VRChatTime` globals provide various information about time. You can use them for clocks or animation syncing.

All globals listed below contain unsigned integer bit-patterns and should be defined as `uint`. The following tables list the contents of each one, the numbers in brackets are bit-ranges (inclusive, zero-indexed).

| Variable | Contents |
| --- | --- |
| `_VRChatTimeUTCUnixSeconds` | The lower 32 bits of the current UTC time in seconds since the Unix epoch. Note that this should be treated as an unsigned number and will thus not (yet) overflow in 2038. If system time is set to pre-1970 this value is undefined. |
| `_VRChatTimeNetworkMs` | Synchronized network time in milliseconds. This is the same value as returned by `Networking.GetServerTimeInMilliseconds` in Udon. This is technically a signed value, but may be treated as unsigned. It should only be used for synchronization and offsets, as the absolute value does not represent any meaningful quantity. This value can wrap. |

| Variable (Bits) | Contents |
| --- | --- |
| `_VRChatTimeEncoded1` (0-4) | Hour component of the current time of day (UTC). |
| `_VRChatTimeEncoded1` (5-10) | Minute component of the current time of day (UTC). |
| `_VRChatTimeEncoded1` (11-16) | Second component of the current time of day (UTC & Local, shared). |
| `_VRChatTimeEncoded1` (17-21) | Hour component of the current time of day (Local). |
| `_VRChatTimeEncoded1` (22-27) | Minute component of the current time of day (Local). |
| `_VRChatTimeEncoded1` (28-31) | Reserved. |

| Variable (Bits) | Contents |
| --- | --- |
| `_VRChatTimeEncoded2` (0-9) | Millisecond component of the current time of day (UTC & Local, shared). |
| `_VRChatTimeEncoded2` (10) | Sign bit of timezone offset. 1 if offset is negative. |
| `_VRChatTimeEncoded2` (11-26) | Timezone offset from UTC to Local time in seconds. |
| `_VRChatTimeEncoded2` (27-31) | Reserved. |

All timezone offsets from UTC and local time values are affected by the "preferred timezone" setting in the VRChat menu.

"Current time of day" always refers to the local user's time of day. That is, if a custom shader on an avatar uses these values to display a clock for example, it will always show the local time of the observer, not the wearer.

Time values are available in the VRChat client and all VRChat SDKs while in play mode.

The VRChat SDK ships a header file with helper functions to decode the time formats. The HLSL code snippet below shows the include path and lists available functions:

```c
#include "Packages/com.vrchat.base/ShaderLibrary/VRCTime.cginc"

uint VRC_GetUTCUnixTimeInSeconds();
uint VRC_GetNetworkTimeInMilliseconds();
void VRC_GetUTCTime(out uint hours, out uint minutes, out uint seconds, out uint milliseconds);
void VRC_GetLocalTime(out uint hours, out uint minutes, out uint seconds, out uint milliseconds);
int VRC_GetTimezoneOffsetSeconds();
```