---
title: "Detecting VRChat SDK"
slug: "detecting-vrcsdk"
hidden: false
createdAt: "2023-10-31T07:18:15.860Z"
updatedAt: "2023-10-31T07:18:15.860Z"
---

If your unity tools or libraries want to use APIs of VRChat SDK but not depends on VRChat SDK,
there are several ways to detect VRChat SDK installation.

## Using Version Defines (Recommended) {#using-version-defines}

The best way to detect VRChat SDK installation is that using [Version Defines of assembly definition file][version-defines].

You can define symbols in your assembly if `com.vrchat.base`, `com.vrchat.avatars`, or `com.vrchat.worlds` are installed.
It's highly recommended to use Expression to define your symbol only if your tool is compatible with installed VRChat SDK versions.
For versioning of VRChat SDK, please refer [VCC Docs][versioning].

Since Version Defines is feature for UPM packages, this method only works for VPM-based SDKs.
If you also want to detect legacy unitypackage-based SDKs, you can combine with legacy way.

[version-defines]: https://docs.unity3d.com/2019.4/Documentation/Manual/ScriptCompilationAssemblyDefinitionFiles.html#define-symbols
[versioning]: https://vcc.docs.vrchat.com/vpm/packages/#brandingbreakingbumps
