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

You can define symbols in your assembly when `com.vrchat.base`, `com.vrchat.avatars`, or `com.vrchat.worlds` are installed.
It's highly recommended to use Expression to define your symbol only when installed VRChat SDK version is compatible with your tool.
For versioning of VRChat SDK, please refer [VCC Docs][versioning].

Since Version Defines is feature for UPM packages, this method only works for VPM-based SDKs.
If you also want to detect legacy unitypackage-based SDKs, you can combine with legacy way.

[version-defines]: https://docs.unity3d.com/2019.4/Documentation/Manual/ScriptCompilationAssemblyDefinitionFiles.html#define-symbols
[versioning]: https://vcc.docs.vrchat.com/vpm/packages/#brandingbreakingbumps

## Using Legacy VRCSDK-defined scripting symbols (Deprecated) {#using-scripting-symbols}

The other method to detect VRChat SDK installation is that using VRCSDK-defined scripting symbols.
For all VRCSDK projects, `VRC_SDK_VRCSDK3` will be defined and for worlds projects, `UDON` will be defined.

This method is legacy, obsoleted method that will be removed in the feature so please do not depend (only) on this method.

In the old VRChat SDK, we use `VRC_SDK_VRCSDK3` and `UDON` symbol for internal usages but since those symbols are
active whole project, many tools depends on those symbols for detecting VRChat SDK.
Currently, in the VRChat SDK, all those symbol usages are migrated to VersionDefines.
Please migrate to Version Defines as soon as possible!

