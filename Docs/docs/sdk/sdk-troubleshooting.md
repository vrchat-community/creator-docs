---
title: "SDK Troubleshooting"
slug: "sdk-troubleshooting"
excerpt: "Common SDK issues and how to solve them"
hidden: false
createdAt: "2017-09-29T02:44:14.279Z"
updatedAt: "2020-04-23T03:39:19.161Z"
---
Here are common issues you may come across when using the SDK and how to solve them. You can find some additional assistance at our [Help Knowledgebase](http://help.vrchat.com).

## The build control panel isn't appearing in the VRChat SDK menu dropdown!
There are two main reasons this might be happening: 

Make sure you're using the recommended version for VRChat. (See [Setting up the SDK](/sdk))

Check your console tab to ensure there aren't any compilation errors from third-party scripts or components. If there are, you may need to remove those components/scripts.

## I uploaded my content but I can't see it in-game!
There are a few reasons this might be the case. Here are some things to check:
- Make sure you are using the [correct version of Unity](/sdk/current-unity-version).
- Make sure you are using the correct account in-game and are not logged into a platform account.
- Check the `Content Manger` tab found in the control panel window to see if your content is there.
- Check the editor console to see if there were any errors when uploading.

## I can't see one of the windows but there aren't any errors!
In rare cases, Unity tabs can go off screen and become inaccessible. You'll need to delete some registry keys to get these windows back on your screen. 

1. Close Unity.
2. Press your Windows key and type `regedit`. Press Enter. You'll be prompted by UAC to permit Administrator access.
3. Be very careful in `regedit`! This application contains all of the settings for your PC.
4. Find the following key: `Computer\HKEY_CURRENT_USER\Software\Unity Technologies\Unity Editor 5.x`. You can do by pasting it into the bar at the top of `regedit`, or if you don't have a bar at the top of the window, navigating through the directory listing on the left.
5. Remove ALL keys in that directory that start with `VRC`, including `VRCSDK2` or any other related keys.
6. Close `regedit`.
7. Reopen Unity. You should be good to go!

## I'm getting errors related to SDK3 or Udon in a project using SDK2 or VRC_SpatialAudioSource in a project using SDK3!

1. Follow [the correct steps](/sdk/updating-the-sdk) on removing your SDK by closing Unity and removing all the SDK related folders and their related `.meta` files.
2. Go to your `Project Settings` and find `Scripting Define Symbols` under `Player > Other Settings`.
3. Remove the symbols that are not associated with the SDK your project was made on. For projects made with SDK2 remove `UDON` and `VRC_SDK_VRCSDK3`. For projects made with SDK3 remove `VRC_SDK_VRCSDK2`. The symbols are separated by `;`. Afterwards save changes by pressing `Enter`.
4. Import the correct SDK into the project.

## I have a problem that the Knowledgebase doesn't solve and isn't listed here!

Sorry about that! Please let us know by [creating a ticket](http://help.vrchat.com/new) and we'll help you out.