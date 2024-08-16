# Setting up Unity for Creating iOS Content
:::warning
VRChat on iOS is currently in Beta. Please report issues on [Canny](https://feedback.vrchat.com/ios-mobile-beta).
:::
This page explains how to publish your World or Avatar on iOS.

![Building for iOS instructions](/img/setting-up-unity-for-creating-ios-content-iOSContent-QuickStart.png)

If you're starting a brand new project, this won't take long at all. However, if you're converting a Windows or Android platform project to an iOS platform project, the SDK has to reimport your assets appropriately. This can take quite a while for larger projects.

For more details on best practices when working with cross-platform projects, read our documentation on [Cross-Platform Setup](/platforms/android/cross-platform-setup).


## 1. Open Your Build Settings

You can access your [Build Settings](https://docs.unity3d.com/Manual/BuildSettings.html) from Unity's main menu by going to "File" -> "Build Settings". Or you can use the keyboard shortcut `Ctrl` + `Shift` + `B`.

## 2. Switch Platform to iOS

:::caution Requires Additional Setup

If the iOS option isn't appearing, [you need to install Unity's iOS module.](https://docs.unity3d.com/hub/manual/AddModules.html)
You do not need a macOS device or XCode installed to create iOS content for VRChat! Adding the iOS module to your Unity editor is sufficient.

:::

Click "iOS" -> "Switch Platform". Unity will reimport your assets for iOS. This will take a while for larger projects with many assets.

## 3. Publish -> New Build

That's it! Your content is now available on iOS! Note that you must **upload** your content to test it.
