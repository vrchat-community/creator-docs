---
title: Upgrading Projects to 2022
sidebar_position: 2
---
import CurrentUnityVersion from '@site/src/components/UnityVersionedText.js';

This page explains how to upgrade your VRChat project from version 2019.4.31f1 to Unity <CurrentUnityVersion/>.
Unity <CurrentUnityVersion versionKey="major"/> is required to use the latest version of the VRChat SDK. You can check out the [benefits to upgrading here](/sdk/upgrade/current-unity-version).

If you're using the Creator Companion, upgrading your project is easy! But first, make sure you create backups of your projects.

## Backing up your Unity project

If you're using the [VRChat Creator Companion](https://creators.vrchat.com/), it will automatically suggest backing up your project before migrating it.

1. To back up your project, click the three dot menu next to the Manage Project button, then choose the "Create Backup" option. This is the recommended method of backup, especially for newer creators! 
	- Note that "Create Backup" will not back up the `Udon`,  `UdonSharp`, or `VRChat Examples` folder. If you made changes to those folders, choose a different backup option.
	- You can also back up the project by duplicating the whole project folder with a new name, such as `MyProject-Backup`.  
	- You *can* export your entire project as a Unity Package, but this takes a long time and may cause errors. We don't recommend it.

![Creating a backup.](/img/sdk/migrate-2019-2022/creating_backup.png)

:::danger Don't skip this step!
Keeping a backup when making major changes to your precious project is always a good idea.

Upgrades can fail. If they do, your backup can be used as a checkpoint. If you keep your original project files safe, you can restore them, try again, and find out what went wrong.

**Without a backup, you don't get a second try.** If you make a mistake or the upgrade fails, fixing it may be difficult or even **impossible.**
:::

1. Open your project in Unity 2019 to see if there are any errors or warnings in [Unity's console](https://docs.unity3d.com/Manual/Console.html) or the [VRChat SDK Build panel](https://creators.vrchat.com/worlds/creating-your-first-world#step-4---configure-your-world-in-the-sdk-build-panel).
	- If you don't fix issues in your Unity 2019 project, they may cause issues in Unity 2022.
	- *Some* warnings can be safely ignored, but you should try to understand why they're present.

Now you're ready to upgrade!

:::danger Test your content before uploading it

After successfully uploading a world or avatar with Unity 2022, you won't be able to upload it again with Unity 2019.

:::

## Using the Creator Companion 

There are two ways you can upgrade your project from the VCC: Directly from your Projects page or from each Manage Project page. **Make sure the project you are trying to upgrade is closed before proceeding.**

1. Go to Settings, then click Updates to see if your Creator Companion needs to be updated. Without updating, prompts to upgrade to Unity 2022 will not show.

![Check VCC updates.](/img/sdk/migrate-2019-2022/updating_vcc.png)

2. On the Projects page, you'll see a new **Unity** column with a version switcher for each of your projects. Click this, then click Migrate to Unity 2022.

![Click the correct project.](/img/sdk/migrate-2019-2022/updating_vcc_via_projects.png)

Otherwise, click **Manage Project** on any project and you'll see an Upgrade to 2022 banner.

![Upgrade via Manage Project.](/img/sdk/migrate-2019-2022/manage_project_upgrade.png)

## Using the Unity Hub

Unity Hub is a separate application that allows you to seamlessly install and work with multiple Unity versions at one time. You can also use it to install Unity 2022 if you do not wish to use the Creator Companion.

1. Install the [Unity Hub](https://unity.com/download).
	- You can follow Unity's official [installation guide](https://learn.unity.com/tutorial/install-the-unity-hub-and-editor).
	- You'll need to create a [Unity account](https://id.unity.com/account/new) after installing Unity Hub.
2. Visit [Unity's download archive](https://unity.com/releases/editor/archive).
3. Click **Unity 2022.x**.
4. Scroll down until you see Unity <CurrentUnityVersion versionKey="patch"/> and click the blue **Unity Hub** button.
	- Do not choose the first Unity version in the list!
	- You can also go to the [Current Unity Version page](/sdk/upgrade/current-unity-version) to find a link to download the correct version of Unity.

![Select the right version to install in the Unity Archive.](/img/sdk/migrate-2019-2022/unity_webpage_search.png)

![Accept the browser prompt to open Unity Hub.](/img/sdk/migrate-2019-2022/browser-prompt-unity-hub.png)

5. Click **Open Unity Hub** in your web browser.

![Enable Android Build support if you'd like to be able to develop content for Android devices.](/img/sdk/migrate-2019-2022/unity_version_hub_upgrade_android.png)

6. Enable **Android Build Support** in the Unity installation screen.
	- You can skip this if you're not planning on uploading content to Android or Quest yet.
	- You can complete this step later by choosing [Add modules](https://docs.unity3d.com/hub/manual/AddModules.html) in the Unity Hub.
7. Click **Continue** to install Unity <CurrentUnityVersion versionKey="patch"/>.

## Managing Unity versions

It's easy to check what versions of Unity are available on your PC for use with the Creator Companion. You can also change what version of Unity is used to open all *new* projects.

1. In the CC, go to **Settings**.
2. Under **Unity Editors**, use the dropdown menu to change the default Unity editor. This will **not** apply retroactively to any projects already created.
3. If you have not already installed Unity <CurrentUnityVersion versionKey="patch"/>, [follow the instructions above](unity-2022.md#Using-the-Creator-Companion). 
4. If you don't see a version of Unity here that you've installed, try using the refresh button or finding the path directly using the file button.

## Packages

If you are trying to add packages to your 2022 project, please keep in mind:

- Every Curated Package has a version which works in 2022.
- Other packages *may* work, but some may need a new version from the package author!
- Many errors will result from using out of date packages, so make sure anything you import is compatible with Unity 2022.

# Troubleshooting

- Test your world before uploading it. Check Unity's console for errors, and test your world in VRChat to see if it work.
	- After successfully uploading a world with Unity 2022, you won't be able to upload that same world with Unity 2019.
- [Make sure to activate your Unity Personal license](https://support.unity.com/hc/en-us/articles/211438683-How-do-I-activate-my-license-) before using VRChat's SDK. Unity is free for personal use.
- To learn more about the Unity Hub, visit [Unity's documentation](https://docs.unity3d.com/hub/manual/index.html).
- If you're experiencing issues related to the SDK itself, please read our [SDK Troubleshooting](/sdk/sdk-troubleshooting) page.
