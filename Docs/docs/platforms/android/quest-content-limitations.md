---
title: "Quest Content Limitations"
slug: "quest-content-limitations"
hidden: false
createdAt: "2019-05-15T01:40:38.749Z"
updatedAt: "2022-07-04T09:34:33.253Z"
---
This page will describe various limits in place for the Oculus Quest version of VRChat. These limitations are in place in the interest of performance, user safety, and discouraging malicious behavior.

Find more information about limited components on our [Quest Content Optimization](/platforms/android/quest-content-optimization) page.
## Avatar-Specific Limitations
Although the current version of VRChat does not implement a hard limit, **we may implement a hard limit for avatars based on triangle count, material counts, mesh counts, and other qualities in the future.** Please keep our recommendations in mind as described in [Quest Content Optimization](/platforms/android/quest-content-optimization).

Currently, if you upload an avatar or avatar world that features avatars exceeding our recommendations, that world or avatar may be removed from public access.
## Shaders
VRChat on Quest only permits the shaders provided with the latest SDK on avatars. The shaders are listed below with a short description and their inputs. This list may change, and we'll announce in our patch notes when new shaders are available.

All of the shaders listed below are under `VRChat/Mobile` in the shader selection dialog.

**For performance reasons, make sure you always enable "Enable GPU Instancing" on your materials.**

| Shader Name                | Shader Description |
| :-- | :-- |
| Standard Lite              | A "Lite" version of Unity Standard that requires less VRAM. <ul> <li> Supports the channel mappings of Unity's Standard Metallic setup, except Alpha and Parallax. </li> <li> The diffuse texture is tinted by the mesh's vertex colors. </li> <li> You can optimize different channels by packing them into the same texture: <ul> <li> Texture 1: Albedo (RGB) and Detail Mask(A) </li> <li> Texture 2: Metallic (R), Occlusion (G), and Smoothness (A) </li> </ul> </li> <li> Not recommended on PC because it does not support real-time lighting. </li> </ul> |
| Bumped Diffuse             | Diffuse but with a normal map. The diffuse texture is tinted by the vertex colours.                                                                                                                                                                                 |
| Bumped Mapped Specular     | Diffuse, but with a specular map (shininess) on the alpha channel. The diffuse texture is tinted by the vertex colours. Normal map also supported.                                                                                                                |
| Diffuse                    | Just diffuse! The diffuse texture is tinted by the vertex colours.                                                                                                                                                                                                 |
| Matcap Lit                 | Diffuse, but with a matcap input. Can be used to simulate a shiny metal surface. The diffuse texture is tinted by the vertex colours.                                                                                                                               |
| Toon Lit                   | Provides toon-like shading and shadows. Should be used on cartoon-like characters with flat colors. The diffuse texture is tinted by the vertex colours.                                                                                                          |
| Particles/Additive         | Should be used on particles. Blends using Additive mode.                                                                                                                                                                                                             |
| Particles/Multiply         | Should be used on particles. Blends using Multiply mode.                                                                                                                                                                                                             |
| Lightmapped (Only for worlds) | A basic diffuse shader that supports lightmapping. This shader is only meant for use on worlds. It cannot be used on avatars. It does not support real-time lighting.                                                                                          |
| Skybox (Only for worlds)      | This shader is an optimized skybox shader, meant for use in worlds.                                                                                                                                                                                                    |
| Supersampled UI (Only for worlds) | An unlit shader which is is supersampled at the texture sample phase. Use with mipmapping to make in-world UI text crisp without being grainy or distracting.

## Components

The following components are not supported on Android or Quest and will not work. This list may change. We'll note in the Patch Notes and updated documentation when these change.

| Shader Name                | Shader Description |
| :-- | :-- |
| Dynamic Bones              | Completely disabled on Android and Quest. Use [PhysBones](/avatars/avatar-dynamics/physbones) instead!! |
| Cloth                      | Completely disabled on Android and Quest. |
| Cameras                    | Completely disabled for avatars on Android and Quest. Permitted for use in Worlds. Be careful with overuse. |
| Lights                     | Completely disabled for avatars on Android and Quest. |
| Video Players | Works with some limitations. Read more in [Video Players](/worlds/udon/video-players). |
| Post-Processing | Post processing systems are disabled completely on Android and Quest. The GPU is not designed to handle these effects very well. |
| Audio Sources | Audio sources are disabled completely for avatars on Android and Quest. Audio sources consume a significant amount of CPU resources and voices have priority. |
| Physics Objects | Rigidbodies, colliders, and joints are disabled completely for avatars on Android and Quest. <br /> They are permitted in worlds, but you should be careful not to go overboard with them. |
| Particle Systems | Particles are limited heavily on avatars for Android and Quest, with settings mirroring the [Avatar Particle System Limits](https://docs.vrchat.com/docs/avatar-particle-system-limits) on PC. |
| Constraints | Unity constraints are disabled completely for avatars on Android and Quest due to complex performance issues. Use [VRChat Constraints](/avatars/avatar-dynamics/constraints) instead.<br /><br />Permitted for use in Worlds. Be careful with overuse, as they impact performance more than previously thought, especially with the limited resources of Quest and mobile devices. |
| FinalIK | Custom FinalIK components are completely disabled for avatars on Android and Quest.<br />FinalIK components are an unbounded source of resource usage. We do not currently plan to enable them on these platforms. |
