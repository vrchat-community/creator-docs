# Setting up Unity for Creating iOS Content

:::warning
VRChat on iOS is currently in Beta. Please report issues on [Canny](https://feedback.vrchat.com/ios-mobile-beta).
:::
This page explains how to publish your World or Avatar on iOS.

If you're starting a brand new project, this won't take long at all. However, if you're converting a Windows or Android platform project to an iOS platform project, the SDK has to reimport your assets appropriately. This can take quite a while for larger projects.

For more details on best practices when working with cross-platform projects, read our documentation on [Cross-Platform Setup](/platforms/android/cross-platform-setup).

## 3 Steps to get your Content on VRChat for iOS

### 1. Open the VRChat SDK Panel

1. Open the VRChat SDK Panel by clicking on the VRChat SDK menu in the top bar of Unity and selecting "Show Control Panel".
2. Switch to the "Builder" tab.

### 2. Switch Platform to iOS

1. In the Build section, click on the "Platform" dropdown.
2. Deselect "Windows" and select "iOS". Click anywhere outside of the dropdown to close it.

![Select iOS](/img/platforms/ios-switch-platform.png)

3. In the window that appears, click "Confirm" to start the switching process.

![Select Confirm](/img/platforms/ios-switch-platform-confirm.png)

:::caution Requires Additional Setup

In some situations the "iOS" option will not be selectable in the dropdown. If that's the case - you may need to install the iOS Build Support module. You can follow the [Set Up iOS Build Support Unity Module](/platforms/iOS/build-test-mobile#set-up-ios-build-support-unity-module) guide to install it.

:::

## 3. Publish -> New Build

That's it! You can now publish your content to VRChat for iOS using the "Build and Publish" button. Make sure to read through [Content Limitations](/platforms/android/quest-content-limitations.md) and [Content Optimization](/platforms/android/quest-content-optimization.md) to ensure your content is optimized for mobile devices. Since the limits are shared between iOS and Android, you can reference the same limits for both platforms.

To learn more about publishing content for all platforms supported by VRChat, check out our [Cross-Platform Setup](/platforms/android/cross-platform-setup.md) documentation.
