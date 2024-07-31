
# Avatar Size Limits

Uploading a custom avatar is a great way to express yourself in VRChat. However, unoptimized avatars require more bandwidth, RAM, and VRAM, which decreases VRChat's performance.

This page explains VRChat's maximum **download size** and **uncompressed size** for avatars, and how to decrease your avatar's size.
## Download size and uncompressed size
Here's how VRChat calculates your avatar's file size:
- When you build and upload an avatar, the VRChat SDK packages it into a [Unity asset bundle](https://docs.unity3d.com/Manual/AssetBundlesIntro.html) and compresses it. The **download size** is the file size of your avatar's compressed asset bundle.
- When VRChat downloads an avatar, VRChat decompresses the asset bundle. The **uncompressed size** is the uncompressed bundle size.

When calculating your avatar's size, VRChat does _not_ decompress individual assets! For example: If you set "Compression" to "High Quality" in a [texture's import settings](https://docs.unity3d.com/Manual/class-TextureImporter.html), it increases your avatar's download size **and** uncompressed size.

## Avatar size limits
The maximum size limit depends on the platform you're playing on:

| Platform                | Download Size | Uncompressed Size |
| ----------------------- | ------------- | ----------------- |
| Android                 | 10 MB         | 40 MB             |
| PC      | 200 MB        | 500 MB            |
| PC (before July 17th)[^1]     | 500 MB        | 1.2 GB            |

[^1]: Avatars uploaded prior to July 17th, 2024, are subject to older limits. A short grace period is present for new uploads past this date. At a later date, older avatars will be forced to comply with the newer reduced limits.

## How to know if you are below these limits
Within the SDK it will inform you when making a build if your avatar is breaking either limit and prevent upload, post build it will remind you what the download / uncompressed size was along with the limit. When using Build & Test size limits are not enforced.

:::caution Keep your SDK up to date!
The android uncompressed size was not enforced in the SDK until 3.5.2, ensure you are _at least_ on this version otherwise if you upload it will just fail server-side security checks! The reduced PC limits are yet to be released in SDK, as such keep an eye out and update when it releases
:::

Within the client you can see both stats within the avatar details, either within the quick menu or main menu.

## How to decrease your avatar's size
You can reduce the size of your avatar by optimizing your assets:
- Textures
  - Reduce the max size in the [texture import settings](https://docs.unity3d.com/Manual/class-TextureImporter.html).
  - Use fewer texture files by deleting/merging textures or materials.
  - Resize your texture to a [power of two](https://en.wikipedia.org/wiki/Power_of_two) (i.e. 512, 1024, 2048) or enable "Non-Power of 2" in the [texture import settings](https://docs.unity3d.com/Manual/class-TextureImporter.html) to improve Unity's texture compression.
- Audio clips
  - Shorten long clips.
  - Reduce the quality of clips or enable "Force to Mono" in the [Audio Clip import settings](https://docs.unity3d.com/Manual/class-AudioClip.html).
- Animation clips
  - Reduce the number of keyframes.
- Blend shapes
  - Remove unused blend shapes.
  - Reduce the number of vertices affected by blend shapes, especially if your model has a high number of blend shapes.

You can find more optimization tips on the [Avatar Optimizing Tips page](/avatars/avatar-optimizing-tips).
