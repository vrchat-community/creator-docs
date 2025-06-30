---
title: "Setting up Unity for Creating Android Content"
slug: "setting-up-unity-for-creating-quest-content"
hidden: false
createdAt: "2019-04-10T00:53:35.417Z"
updatedAt: "2019-10-28T19:23:09.636Z"
sidebar_position: -1
---

If you're starting a brand new project, this won't take long at all. However, if you're converting a Windows platform project to an Android platform project, you will have to convert your assets appropriately. This can take quite a while for larger projects.

For more details on best practices when working with dual-platform projects, read our documentation on [Cross-Platform Setup](/platforms/android/cross-platform-setup).

## 3 Steps to get your Content on VRChat for Android

### 1. Open the VRChat SDK Panel

1. Open the VRChat SDK Panel by clicking on the VRChat SDK menu in the top bar of Unity and selecting "Show Control Panel".
2. Switch to the "Builder" tab

### 2. Switch Platform to Android

1. In the Build section, click on the "Platform" dropdown
2. Deselect "Windows" and select "Android". Click anywhere outside of the dropdown to close it.

![Select Android](/img/platforms/android-switch-platform.png)

3. In the window that appears click "Confirm" to start the switching process.

![Select Confirm](/img/platforms/android-switch-platform-confirm.png)

:::caution Requires Additional Setup

If you installed Unity via the Unity Hub and not the Creator Companion, and the "Android" option is not selectable in the dropdown - you may need to install the Android Build Support module. You can follow the [Set Up Unity Android Tools](/platforms/android/build-test-mobile#set-up-unity-android-tools) guide to install it.

:::

### 3. Publish a New Build

That's it! You can now publish your content to VRChat for Android using the "Build and Publish" button. Make sure to read through the [Android Content Limitations](/platforms//android//quest-content-limitations.md) and [Android Content Optimization](/platforms/android/quest-content-optimization.md) pages to ensure your content is optimized for Android devices.

To learn more about publishing content for all platforms supported by VRChat, check out our [Cross-Platform Setup](/platforms/android/cross-platform-setup.md) documentation.
