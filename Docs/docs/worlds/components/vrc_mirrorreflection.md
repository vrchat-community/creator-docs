---
title: "VRC Mirror Reflection"
slug: "vrc_mirrorreflection"
hidden: false
createdAt: "2017-07-06T06:10:45.478Z"
updatedAt: "2022-08-17T20:23:01.162Z"
---
This component can be used to create a mirror in your VRChat world.

It requires a [mesh renderer component](https://docs.unity3d.com/Manual/class-MeshRenderer.html) on the same game object. It writes to the `_MainTex` value of the mesh renderer's first material. You can find an example in the [SDK prefabs](/worlds/sdk-prefabs#vrcmirror) called `VRCMirror.prefab`.

| Parameter | Description |
| --- | --- |
| Disable Pixel Lights | Disables real-time pixel shaded point and spot lighting. Pixel shaded lights will fall-back to vertex lighting when this is enabled. |
| Turn Off Mirror Occlusion | Disables occlusion culling on the mirror. Enable this if you see objects flickering in the mirror. |
| Reflect Layers | Only objects on the selected layers will be rendered in the mirror. <br />⚠ Objects on the `Water` layer are never rendered in mirrors. |
| Mirror Resolution | Rendering resolution of the mirror (per eye in VR). Auto renders at the same resolution as the user's HMD or monitor up to the maximum of 2048x2048. |
| Maximum Antialiasing | The maximum level of MSAA applied to the image rendered in the mirror. Can be overruled by client graphics settings. |
| Custom Shader | The mirror will use this shader instead of the default shader if one is provided. |
| Camera Clear Flags | Specifies the CameraClearFlags that the mirror will use to clear the background before rendering. The default "From Reference Camera" will use the same flags as the camera rendering the mirror plane. |
| Custom Skybox | If "Camera Clear Flags" is set to "Custom Skybox," this skybox will be shown in the mirror. If "Custom Skybox" mode is selected but nothing is provided, the background will be black. |
| Custom Clear Color | If "Camera Clear Flags" is set to "Solid Color," this color will be used as the background. Note that the alpha channel will be respected, so you can use this to clear alpha and use it in a custom shader (e.g., for cutout-style mirrors). |

Mirrors can drastically reduce the framerate of your VRChat world. To avoid this, try the following:
- Keep mirrors off by default. Enable them automatically when users get near, or allow users to enable them manually.
- Don't reflect every layer, or allow users to choose which layers to reflect. ("High quality" and "low quality" mirrors.)
- If your users still experience performance issue, reduce the mirror resolution.

:::caution Required Layers
The VRChat Community recommends the following Layers to always be used in Mirrors, as these two show both yourself and other players in the Mirror:

- `Player`
- `MirrorReflection`

:::

It is up to your discretion if you want to show the `Default` Layer as well, if you want to reflect the surrounding World environment. **However, this can cost performance.**

:::danger Use only a minimal amount of Reflect Layers!
Proper filtering of the Reflect Layers will ensure unnecessary graphics such as the HUD, Name Tags, or the Quick Menu, will never appear in Mirrors. If they are shown, it can heavily cost performance.
:::