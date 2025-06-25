---
title: "VRC Camera Settings"
slug: "vrc-camera-settings"
hidden: false
createdAt: "2025-02-21T18:46:09.500Z"
updatedAt: "2025-02-21T18:46:09.500Z"
---

import UnityVersionedLink from '@site/src/components/UnityVersionedLink.js';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# VRCCameraSettings

Exposes information and limited control over the user's screen camera, the handheld camera, and Unity's global quality settings via APIs listed here.

You can access 2 instances of this class via the following static accessors:

- `VRCCameraSettings.ScreenCamera`: The user's screen camera, i.e. what is rendering their current view (will be a stereo camera if the user is in VR)
- `VRCCameraSettings.PhotoCamera`: The user's handheld photo camera. Note that properties on this instance will only update if the user has the camera enabled, you can use the `Active` property to check for that. Further note that this property will always point to the camera rendering the preview image, not the one used for taking pictures itself or rendering the view for the stream camera (although most properties will by synced from and to those whenever the Shutter is pressed).
  - ⚠️ In ClientSim, this property will be `null` as there is no photo camera available. In a real VRChat client, it will never be `null`.

:::note

These two properties may not always refer to a single real `Camera` component under the hood. VRChat abstracts away some of the complexity for you, and you should never need to worry about this. But for completeness, note the following:

- The [Focus View](/worlds/components/vrc_uishape/#focus-view) camera will be affected when changing properties on `VRCCameraSettings.ScreenCamera`.
- Similarly, the component used while the handheld camera is opened in "Stream Camera" mode will be affected when accessing `VRCCameraSettings.PhotoCamera`.
- The `VRCCameraSettings.PhotoCamera` is also linked to all cameras used in a Dolly Multi Cam setup, although some properties like `FieldOfView` may differ between them. In this case, the first camera's settings will be returned.

For advanced use-cases this state can be read via the [`CameraMode`](#camera-mode) property.

:::

### Exposed properties

These instances will expose certain properties of Unity's <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/ScriptReference/Camera.html">Camera</UnityVersionedLink> class (you can reference the Unity docs for detailed information on these properties). Note that for safety reasons, you will not be able to access the raw `Camera` components. The `Camera` class is exposed for components that you have placed into your world manually however.

Currently exposed as **read-only**:

- `Vector3 Position`: World-space position
- `Quaternion Rotation`: World-space rotation
- `Vector3 Forward`: World-space forward vector, convenience
- `Vector3 Up`: World-space up vector, convenience
- `Vector3 Right`: World-space right vector, convenience
- `int PixelWidth` and `int PixelHeight`: The current render target's size in pixels (may be affected by VR super-sampling settings)
- `float Aspect`: The current aspect ratio of the render target
- `float FieldOfView`: The camera's current _vertical_ field of view (this may be inaccurate for VR users)
- `bool Active`: If the camera is currently rendering. Will always be true for `ScreenCamera`, useful to detect the handheld camera via `PhotoCamera`. Also `true` for `PhotoCamera` while Spout streaming is enabled.
- `bool StereoEnabled`: `true` for `ScreenCamera` if the user is in VR. It is recommended to check the [Player API](/worlds/udon/players) to detect VR users instead.


:::note

Transform data like `Position` and `Rotation` will be all 0 if `Active` is `false`. `Forward/Up/Right` will return `Vector3.forward/up/right` respectively in that case.

:::

Currently exposed as **read-write**:

- `float NearClipPlane` and `float FarClipPlane`: You can adjust the camera's clipping planes at runtime. This follows similar restrictions to setting them via the Reference Camera in your scene descriptor:
  - `NearClipPlane` may be adjusted by the user's "Forced Camera Near Distance" settings. You can detect this happening by reading the value back after setting it.
  - `NearClipPlane` will be clamped between `0.001` and `0.05`
  - `FarClipPlane` can only be set to `0.1` higher than `NearClipPlane` at the lowest, this will be clamped
  - Adjusting the `FarClipPlane` may also adjust the `NearClipPlane` if the user has "Forced Camera Near Distance" set to "Dynamic"
- `bool AllowHDR`: If the camera will submit HDR values to the render target
- `DepthTextureMode DepthTextureMode`: Can be used to enable camera depth texture rendering, which is useful for certain shader effects. This can be used instead of a realtime-light with shadows enabled to force a camera depth texture. Note however, that having such a light in your scene will not change the `DepthTextureMode` property, meaning that reading a value of `None` from this property does _not_ mean there is no depth-light in the scene forcing a depth-pass to render regardless.
- `bool UseOcclusionCulling`: Whether or not the Camera will use occlusion culling during rendering. Defaults to `true`, but will only have an effect if your world has baked occlusion data.
- `bool AllowMSAA`: Disable all MSAA (anti-aliasing) on this camera if set to `false`, regardless of user settings. Defaults to `true`, where it will use the user's graphics settings.
- `CameraClearFlags ClearFlags`: Sets the background clear mode used when rendering this camera.
  - `Color BackgroundColor`: The color to use when `ClearFlags` is set to `SolidColor`.
- `bool LayerCullSpherical`: ~~See <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/ScriptReference/Camera-layerCullSpherical.html">Unity Docs</UnityVersionedLink>.~~ This API is currently disabled in Udon as it causes UI culling issues. Setting it is a no-op.
- `float[] LayerCullDistances`: See <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/ScriptReference/Camera-layerCullDistances.html">Unity Docs</UnityVersionedLink>. Array must have 32 entries, corresponding to GameObject layers. A value of `0` for a layer means it will use the value of `FarClipPlane`. Setting this property to `null` is the same as passing in `0` for every layer.
  - Just like `FarClipPlane`, this will be clamped to a minimum of `NearClipPlane + 0.1`. Any `reserved` [layer](/worlds/layers) and `InternalUI` cannot be changed and will always read `0`.

### Camera Mode

The `CameraMode` property is available on the `ScreenCamera` and `PhotoCamera`.

`ScreenCamera` has the following camera modes:

| Mode        | Description                                                                                            |
|-------------|--------------------------------------------------------------------------------------------------------|
| Screen      | The default mode for rendering the user's current view.                                                |
| FocusView   | Active when the user is in [Focus View](/worlds/components/vrc_uishape/#focus-view) on mobile devices. |

`PhotoCamera` has the following camera modes:

| Mode            | Description                                                                   |
|-----------------|-------------------------------------------------------------------------------|
| PhotoOrVideo    | Camera is in Photo or Stream mode. Includes modes such as Emoji and Stickers. |
| Print           | Camera has the "Prints" skin active.                                          |
| DroneHandheld   | Camera is in Drone mode.                                                      |
| DroneFPV        | The user is flying the Drone in FPV mode.                                     |
| Unknown         | Set when `Active` is `false`.                                                 |

### Static functions

Mostly useful for VR users, 2 static functions are exposed on `VRCCameraSettings`:

* `Vector3 GetEyePosition(Camera.StereoscopicEye eye)`: Returns the specified eye's world space position. Equivalent to `ScreenCamera.Position` for non-VR users.
* `Quaternion GetEyeRotation(Camera.StereoscopicEye eye)`: Returns the specified eye's world space rotation. Equivalent to `ScreenCamera.Rotation` for non-VR users.

## OnChanged Event

When a user changes certain graphics settings, such as "Near Clip Override", the [OnVRCCameraSettingsChanged](/worlds/udon/graph/event-nodes/#onvrccamerasettingschanged) event is triggered.

This event may trigger every frame, or even multiple times per frame. It is recommended to do minimal processing to avoid affecting performance.

## Example

<Tabs groupId="udon-compiler-language">
<TabItem value="graph" label="Udon Graph">

![Udon graph that prints screen size and FOV on Start and whenever it changes.](/img/worlds/udon/vrc-graphics/basic-camera-settings-example.png)

</TabItem>
<TabItem value="cs" label="UdonSharp">

```cs
using TMPro;
using UdonSharp;
using UnityEngine;
using UnityEngine.UI;
using VRC.SDK3.Rendering;
​
public class CameraInfoDisplay : UdonSharpBehaviour
{
    [SerializeField] private TextMeshProUGUI info;

    void Start()
    {
        // call it once to initialize
        OnVRCCameraSettingsChanged(VRCCameraSettings.ScreenCamera);

        Debug.Log($"Started CameraInfoDisplay at resolution of {VRCCameraSettings.ScreenCamera.PixelWidth}x{VRCCameraSettings.ScreenCamera.PixelHeight}");
        Debug.Log($"The handheld photo camera is {(VRCCameraSettings.PhotoCamera.Active ? "enabled" : "disabled")}");
    }
​
    // will be called if resolution or a couple other properties change
    public override void OnVRCCameraSettingsChanged(VRCCameraSettings camera)
    {
        // ignore handheld photo camera
        if (camera != VRCCameraSettings.ScreenCamera)
            return;

        info.text = $"{camera.PixelWidth}x{camera.PixelHeight} fov={camera.FieldOfView} frame={Time.frameCount}°";
    }
}
```

</TabItem>
</Tabs>