---
title: "Detecting the VRChat SDK"
slug: "detecting-vrcsdk"
hidden: false
createdAt: "2023-10-31T07:18:15.860Z"
updatedAt: "2023-10-31T07:18:15.860Z"
---

There are several ways to detect the VRChat SDK in a Unity project. This can be helpful when developing Unity tools or libraries that do not depend on the VRChat SDK, but may still want to utilize [VRChat's SDK API](/sdk/public-sdk-api).

## Using Version Defines (Recommended) {#using-version-defines}

The best way to detect the VRChat SDK is with [Version Defines in your assembly definition file][version-defines].

You can define symbols in your assembly when `com.vrchat.base`, `com.vrchat.avatars`, or `com.vrchat.worlds` are installed.
It is recommended to only use the "Expression" property to define your symbol when the installed VRChat SDK version is compatible with your tool.
For versioning of VRChat SDK, please refer to the [Creation Companion documentation][versioning].

Since Version Defines is a feature for UPM packages, this method only works for VPM-based SDKs, which are treated as UPM packages by Unity.
If you also want to detect legacy `.unitypackage`-based SDKs, use legacy method below by defining the same symbol as the VRCSDK defines, or adding the following code to every file:

```csharp
#if !YOUR_VRCSDK3_AVATARS && !YOUR_VRCSDK3_WORLDS && VRC_SDK_VRCSDK3
    #if UDON
        #define YOUR_VRCSDK3_WORLDS
    #else
        #define YOUR_VRCSDK3_AVATARS
    #endif
#endif
```

[version-defines]: https://docs.unity3d.com/2019.4/Documentation/Manual/ScriptCompilationAssemblyDefinitionFiles.html#define-symbols
[versioning]: https://vcc.docs.vrchat.com/vpm/packages/#brandingbreakingbumps

## Using Legacy VRCSDK-defined scripting symbols (Deprecated) {#using-scripting-symbols}

The other method to detect VRChat SDK installation is with VRCSDK-defined scripting symbols.
For all VRCSDK projects, `VRC_SDK_VRCSDK3` will be defined, and for world projects, `UDON` will be defined.

This method is deprecated and will be removed in the future. Do not solely depend on this method.

In the old VRChat SDK, `VRC_SDK_VRCSDK3` and `UDON` symbols were used internally. But because those symbols are active in the whole project, many tools depend on those symbols for detecting the VRChat SDK.

Currently, in the VRChat SDK, all those symbol usages are migrated to Version Defines. Please migrate to Version Defines as soon as possible!

