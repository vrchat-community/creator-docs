# OSC Face Tracking

External applications can send face tracking data directly to VRChat's [Face Tracking system](/avatars/face-tracking) using OSC. The input uses the Unified Expressions tracking keys established by [VRCFaceTracking (VRCFT)](https://docs.vrcft.io/docs/tutorial-avatars/tutorial-avatars-extras/unified-blendshapes).

Enable [OSC in VRChat](https://docs.vrchat.com/docs/osc-overview) and use an avatar configured for Face Tracking with **Use All Tracking Keys** enabled. The avatar's Blendshapes Sets and Parameter Behaviors determine how the incoming values affect its appearance.

## Tracking status outputs

VRChat exposes the following read-only OSC outputs so external applications can check tracking availability and avatar support. Each output sends one OSC boolean argument (`T` for `true` or `F` for `false`).

| Address | Meaning |
| --- | --- |
| `/avatar/parameters/UserEyeTracking` | Whether eye tracking data is available for the local user. Automatic eye movement alone does not count as eye tracking. |
| `/avatar/parameters/UserFaceTracking` | Whether face tracking is allowed and a face tracking source is active for the local user. |
| `/avatar/avatarfullfacetracking` | Whether the current avatar has **Face Tracking** enabled with **Use All Tracking Keys** enabled in its VRC Avatar Descriptor. |

`UserEyeTracking` and `UserFaceTracking` are [built-in animator parameters](/avatars/animator-parameters#eye-and-face-tracking-parameters). The addresses above are their default OSC output mappings. Sending values to these parameters does not enable tracking.

`/avatar/avatarfullfacetracking` reports the avatar's configuration, regardless of whether the user has an active tracking source. An avatar that only uses advanced visemes or automatic eye movement with **Use All Tracking Keys** disabled reports `false`. This endpoint is separate from avatar parameters: `AvatarFullFaceTracking` is not a built-in animator parameter.

VRChat exposes `/avatar/avatarfullfacetracking` through OSCQuery and sends its value after `/avatar/change`. Use it to check whether the newly loaded avatar supports native face tracking input through `/tracking/face/v1`.

## Message format

| Field | Value |
| --- | --- |
| Address | `/tracking/face/v1` |
| Arguments | One OSC blob (type tag `b`; OSC type-tag string `,b`). |
| Blob payload size | Exactly 102 bytes. |
| Byte order | One unsigned byte per tracking key, in the order below. |
| Value range | `0` to `255`. VRChat decodes each byte as `byte / 255.0` to produce a tracking strength from `0` to `1`. |

Send the complete 102-byte payload in every message. Set any key your tracking source does not provide to `0`. Preserve its position in the payload; do not omit unsupported keys. VRChat ignores messages with the wrong number of arguments or the wrong blob payload size.

Use your OSC library's blob argument type to send the byte array. The 102 bytes are the blob's data payload, excluding the OSC blob length field and alignment padding. `Voice` and `Viseme_*` are inputs supplied by VRChat and are not part of this payload.

For example, a payload with byte `36` set to `255` and all other bytes set to `0` sends `JawOpen = 1` with all other tracking keys at `0`.

## Tracking key order

Indices are zero-based. These names are also the tracking key names used in **Blendshapes Sets** and **Parameter Behaviors**, including the **Expression** field in **Custom** mode.

| Index | Tracking key |
| --- | --- |
| 0 | `EyeLookOutRight` |
| 1 | `EyeLookInRight` |
| 2 | `EyeLookUpRight` |
| 3 | `EyeLookDownRight` |
| 4 | `EyeLookOutLeft` |
| 5 | `EyeLookInLeft` |
| 6 | `EyeLookUpLeft` |
| 7 | `EyeLookDownLeft` |
| 8 | `EyeClosedRight` |
| 9 | `EyeClosedLeft` |
| 10 | `EyeDilationRight` |
| 11 | `EyeDilationLeft` |
| 12 | `EyeConstrictRight` |
| 13 | `EyeConstrictLeft` |
| 14 | `EyeSquintRight` |
| 15 | `EyeSquintLeft` |
| 16 | `EyeWideRight` |
| 17 | `EyeWideLeft` |
| 18 | `BrowPinchRight` |
| 19 | `BrowPinchLeft` |
| 20 | `BrowLowererRight` |
| 21 | `BrowLowererLeft` |
| 22 | `BrowInnerUpRight` |
| 23 | `BrowInnerUpLeft` |
| 24 | `BrowOuterUpRight` |
| 25 | `BrowOuterUpLeft` |
| 26 | `NasalDilationRight` |
| 27 | `NasalDilationLeft` |
| 28 | `NasalConstrictRight` |
| 29 | `NasalConstrictLeft` |
| 30 | `CheekSquintRight` |
| 31 | `CheekSquintLeft` |
| 32 | `CheekPuffRight` |
| 33 | `CheekPuffLeft` |
| 34 | `CheekSuckRight` |
| 35 | `CheekSuckLeft` |
| 36 | `JawOpen` |
| 37 | `JawRight` |
| 38 | `JawLeft` |
| 39 | `JawForward` |
| 40 | `JawBackward` |
| 41 | `JawClench` |
| 42 | `JawMandibleRaise` |
| 43 | `MouthClosed` |
| 44 | `LipSuckUpperRight` |
| 45 | `LipSuckUpperLeft` |
| 46 | `LipSuckLowerRight` |
| 47 | `LipSuckLowerLeft` |
| 48 | `LipSuckCornerRight` |
| 49 | `LipSuckCornerLeft` |
| 50 | `LipFunnelUpperRight` |
| 51 | `LipFunnelUpperLeft` |
| 52 | `LipFunnelLowerRight` |
| 53 | `LipFunnelLowerLeft` |
| 54 | `LipPuckerUpperRight` |
| 55 | `LipPuckerUpperLeft` |
| 56 | `LipPuckerLowerRight` |
| 57 | `LipPuckerLowerLeft` |
| 58 | `MouthUpperUpRight` |
| 59 | `MouthUpperUpLeft` |
| 60 | `MouthUpperDeepenRight` |
| 61 | `MouthUpperDeepenLeft` |
| 62 | `NoseSneerRight` |
| 63 | `NoseSneerLeft` |
| 64 | `MouthLowerDownRight` |
| 65 | `MouthLowerDownLeft` |
| 66 | `MouthUpperRight` |
| 67 | `MouthUpperLeft` |
| 68 | `MouthLowerRight` |
| 69 | `MouthLowerLeft` |
| 70 | `MouthCornerPullRight` |
| 71 | `MouthCornerPullLeft` |
| 72 | `MouthCornerSlantRight` |
| 73 | `MouthCornerSlantLeft` |
| 74 | `MouthFrownRight` |
| 75 | `MouthFrownLeft` |
| 76 | `MouthStretchRight` |
| 77 | `MouthStretchLeft` |
| 78 | `MouthDimpleRight` |
| 79 | `MouthDimpleLeft` |
| 80 | `MouthRaiserUpper` |
| 81 | `MouthRaiserLower` |
| 82 | `MouthPressRight` |
| 83 | `MouthPressLeft` |
| 84 | `MouthTightenerRight` |
| 85 | `MouthTightenerLeft` |
| 86 | `TongueOut` |
| 87 | `TongueUp` |
| 88 | `TongueDown` |
| 89 | `TongueRight` |
| 90 | `TongueLeft` |
| 91 | `TongueRoll` |
| 92 | `TongueBendDown` |
| 93 | `TongueCurlUp` |
| 94 | `TongueSquish` |
| 95 | `TongueFlat` |
| 96 | `TongueTwistRight` |
| 97 | `TongueTwistLeft` |
| 98 | `SoftPalateClose` |
| 99 | `ThroatSwallow` |
| 100 | `NeckFlexRight` |
| 101 | `NeckFlexLeft` |

## Synchronization

VRChat synchronizes received face tracking data to remote viewers through its native face tracking synchronization. You do not need to send each key through a custom synced avatar parameter. See [Networking and synced parameters](/avatars/face-tracking#networking-and-synced-parameters) for fidelity considerations and when to use a synced parameter instead.
