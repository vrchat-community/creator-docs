---
title: "Minor Unity Upgrades"
---
Occasionally, VRChat will update within minor Unity versions. For example, VRChat might update from Unity 2022.1.**1** to Unity 2022.1.**2**.

## Install the new Unity version

1. Close all of your open Unity projects.

2. Check the [Currently Supported Unity Version](/sdk/upgrade/current-unity-version) and install the new version of Unity via Unity Hub. 
    - Although we list the standalone installer on that page, we strongly recommend using the Hub. For this doc, we're assuming you're using it.

## Copy your project

1. Copy or back up your project.
	- If you're using the [VRChat Creator Companion](https://creators.vrchat.com/), it will automatically suggest copying your project before migrating it. You can create a backup of your project with the "Make Backup" button.
	- Otherwise, duplicate the whole project folder and give it a new name.
	- Export your entire project as a Unity Package. This takes a long time and may cause errors.

:::danger Don't skip this step!
Upgrades can fail. If you keep your original project files safe, you can restore them, try again, and find out what went wrong.

Without a backup, you don't get a second try. If you make a mistake or the upgrade fails, fixing it may be difficult or even impossible.
::: 

If you're an advanced user and know how to use version control like [Git](https://git-scm.com/), you should use that.

## Open your project

1. Open the copy of your project in the new version. 
    - You'll get some upgrade warnings. This is fine! Click the affirmative button.

2. After some time, your migration will be complete. That's it!

## Optional info and tips

SDK updates aren't always needed in minor version upgrades. If they are, this is when you'd do it.

1. Close your project after upgrading.
2. Use the [VCC](https://vcc.docs.vrchat.com/) to upgrade your SDK.

#### Unity warnings

There are a few Unity warnings that may pop up during migration that you can safely click past. Here are a few you may see:

![migrating-to-a-newer-minor-unity-version-f3995eb-image_10.png](/img/sdk/migrating-to-a-newer-minor-unity-version-f3995eb-image_10.png)

![migrating-to-a-newer-minor-unity-version-b20553b-image_11.png](/img/sdk/migrating-to-a-newer-minor-unity-version-b20553b-image_11.png)

#### Clean up the copy

If your project is large, migration might take a long time. There are a few folders that you don't need to migrate over if the project is especially huge. You can delete any of these folders safely from the copy.

```text
/Library/
/Temp/
/Obj/
/Build/
/Builds/
/Logs/
/UserSettings/
```
#### Version warnings

The SDK may warn you that you're on the wrong version, even though you _know_ you're on the correct one.

![migrating-to-a-newer-minor-unity-version-1b8194d-2022-11-30_10-35-54_chrome.png](/img/sdk/migrating-to-a-newer-minor-unity-version-1b8194d-2022-11-30_10-35-54_chrome.png)

This is fine! If you know for a fact you're on the correct version, you can ignore this message.