---
title: "Shader Blocking and Fallback System"
slug: "shader-fallback-system"
hidden: false
createdAt: "2018-09-25T20:49:23.385Z"
updatedAt: "2022-08-12T01:21:02.481Z"
---
This page serves as a description of the Shader Blocking System, how it operates, and how shader authors can work with it so that their shader falls back gracefully when a user has Shaders blocked on an avatar using a given shader.

## VRChat 2021.4.2 Fallback System Upgrade
Shader fallback improvements work by using the "Tags" field at the top of the shader.
```text
Tags{"Queue"="Geometry"}
```
The tags field might look like this by default.

You can now add different tags, under the `VRCFallback` name, to specify which fallback shader to try to use:
```text
Tags{"Queue"="Geometry" "VRCFallback"="Toon"}
```
Some fallback tags are combine-able, you could for instance use `ToonCutout:`
```text
Tags{"Queue"="Geometry" "VRCFallback"="ToonCutout"}
```
The supported tags are as follows:

```text
Unlit
VertexLit
Toon
Transparent
Cutout
Fade
Particle
Sprite
Matcap
MobileToon
DoubleSided
Hidden //(this will hide the mesh from view if the shader is blocked, useful for things like raymarching effects.)
```
Toon and Unlit can also be combined with Transparent, Cutout, Fade, and DoubleSided tags for more granular control. With Toon supporting such variations as DoubleSided Cutout.
:::caution

Please note that using Transparent or Fade tags with Toon will result in it falling back to Transparent Unlit. You might want to take that into account when picking fallback tags.
:::
Specifying any other tag will result in a Standard shader fallback.

If no tag is provided, the old fallback system will be used, following the pattern shader name, keywords, etc.

We now also copy ALL standard shader parameters to the fallback material, including the following:
```text
_MainTex
_MetallicGlossMap
_SpecGlossMap
_BumpMap
_ParallaxMap
_OcclusionMap
_EmissionMap
_DetailMask
_DetailAlbedoMap
_DetailNormalMap
_Color
_EmissionColor
_SpecColor
_Cutoff
_Glossiness
_GlossMapScale
_SpecularHighlights
_GlossyReflections
_SmoothnessTextureChannel
_Metallic
_SpecularHighlights
_GlossyReflections
_BumpScale
_Parallax
_OcclusionStrength
_DetailNormalMapScale
_UVSec
_Mode
_SrcBlend
_DstBlend
_ZWrite
```
## Old Fallback System
When a shader is blocked by the Safety System, it is first checked for one of the internal pre-compiled shaders in this list:
```text title="Pre-Compiled Internal Shaders"
  "Standard",
  "Standard (Specular setup)",
  "Effects/Rim",
  "Effects/GlowAdditiveSimple",
  "Legacy Shaders/Bumped Diffuse",
  "Legacy Shaders/Bumped Specular",
  "Legacy Shaders/Decal",
  "Legacy Shaders/Diffuse",
  "Legacy Shaders/Diffuse Detail",
  "Legacy Shaders/Diffuse Fast",
  "Legacy Shaders/Lightmapped/Diffuse",
  "Legacy Shaders/Lightmapped/Specular",
  "Legacy Shaders/Lightmapped/VertexLit",
  "Legacy Shaders/Parallax Diffuse",
  "Legacy Shaders/Parallax Specular",
  "Legacy Shaders/Reflective/Bumped Diffuse",
  "Legacy Shaders/Reflective/Bumped Specular",
  "Legacy Shaders/Reflective/Bumped Unlit",
  "Legacy Shaders/Reflective/Bumped VertexLit",
  "Legacy Shaders/Reflective/Diffuse",
  "Legacy Shaders/Reflective/Parallax Diffuse",
  "Legacy Shaders/Reflective/Parallax Specular",
  "Legacy Shaders/Reflective/Specular",
  "Legacy Shaders/Reflective/VertexLit",
  "Legacy Shaders/Self-Illum/Bumped Diffuse",
  "Legacy Shaders/Self-Illum/Bumped Specular",
  "Legacy Shaders/Self-Illum/Diffuse",
  "Legacy Shaders/Self-Illum/Parallax Diffuse",
  "Legacy Shaders/Self-Illum/Parallax Specular",
  "Legacy Shaders/Self-Illum/Specular",
  "Legacy Shaders/Self-Illum/VertexLit",
  "Legacy Shaders/Specular",
  "Legacy Shaders/Transparent/Bumped Diffuse",
  "Legacy Shaders/Transparent/Bumped Specular",
  "Legacy Shaders/Transparent/Cutout/Bumped Diffuse",
  "Legacy Shaders/Transparent/Cutout/Bumped Specular",
  "Legacy Shaders/Transparent/Cutout/Diffuse",
  "Legacy Shaders/Transparent/Cutout/Soft Edge Unlit",
  "Legacy Shaders/Transparent/Cutout/Specular",
  "Legacy Shaders/Transparent/Cutout/VertexLit",
  "Legacy Shaders/Transparent/Diffuse",
  "Legacy Shaders/Transparent/Parallax Diffuse",
  "Legacy Shaders/Transparent/Parallax Specular",
  "Legacy Shaders/Transparent/Specular",
  "Legacy Shaders/Transparent/VertexLit",
  "Legacy Shaders/VertexLit",
  "MatCap/Vertex/Textured Lit",
  "Mobile/Bumped Diffuse",
  "Mobile/Bumped Specular",
  "Mobile/Bumped Specular (1 Directional Light)",
  "Mobile/Diffuse",
  "Mobile/Unlit (Supports Lightmap)",
  "Mobile/Particles/Additive",
  "Mobile/Particles/Alpha Blended",
  "Mobile/Particles/Multiply",
  "Mobile/Particles/VertexLit Blended",
  "Particles/~Additive-Multiply",
  "Particles/Additive",
  "Particles/Additive (Soft)",
  "Particles/Alpha Blended",
  "Particles/Alpha Blended Premultiply",
  "Particles/Anim Alpha Blended",
  "Particles/Multiply",
  "Particles/Multiply (Double)",
  "Particles/VertexLit Blended",
  "Sprites/Default",
  "Sprites/Diffuse",
  "Toon/Lit",
  "Toon/Lit (Double)",
  "Toon/Lit Cutout",
  "Toon/Lit Cutout (Double)",
  "Toon/Lit Outline",
  "UI/Default",
  "Unlit/FailShader",
  "VRChat/UI/Default"
```
If an internal shader is matched, the fallback is a new shader of the same type, but using the internally compiled shader. All the parameters are copied. New versions or variants not included will not work, since they will be replaced.

If the shader is not internally matched, The name of the shader (not the filename, but as provided in the top line of the shader source) is used to match some identifying features and replace with a fallback shader of similar type:
```text title="Fallback Shader Name Searches"
  "Unlit",
  "VertexLit",
  "Toon",
  "Outline",
  "Transparent",
  "Fade",
  "Cutout",
  "Particle",
  "Sprite",
  "MatCap"
```
These names can fall anywhere within the full string of the shader name.

Additionally, some shader properties are searched:
```text title="Shader Properties"
"_Ramp" == "Toon"
"_ALPHABLEND_ON" == "Transparent"
"_ALPHATEST_ON" == "Cutout"
```
All matching is case-sensitive.

Attempts are made to create fallback material that approximate the matched names. For example, names containing "Sprite" fallback to the Unity built-in "Sprites/Default" shader.

You can combine "Toon" and "Cutout", or "Toon" and "Outline" for combination shaders, however "Transparent" and "Fade" do not currently have a Toon Lit shader and instead fallback to "Unlit/Transparent".

Support for "Outline" is highly experimental and may be removed if performance suffers.

For "Toon" shaders, the "_Ramp" parameter is copied (Texture2D).
For "MatCap" shaders, the "_MatCap" parameter is copied (Texture2D)

If no matches are found in the shader name, a Standard material is used.

An attempt is made to transfer parameters named "_MainTex" and "_Color" to the fallback shader. If neither parameter is matched, a Matcap shader is provided with the color set to the user's rank color.

All this is highly subject to change as we tune the shader fallback system.

## Previewing Fallback Shaders for your Avatar
It's possible to force your own avatar to use fallback shaders locally via a toggle in the Action Menu. To activate this option, open your Action Menu and choose "Options" -> "Avatar" -> "Fallback Shaders". Once toggled on, any avatar you use will display locally with fallback shaders. The option will stay active when switching avatars but will reset on world change. This option does not affect how others view your avatar.