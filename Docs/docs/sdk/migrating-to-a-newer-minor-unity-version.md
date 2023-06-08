---
title: "Migrating to a newer Minor Unity Version"
slug: "migrating-to-a-newer-minor-unity-version"
hidden: false
createdAt: "2022-11-30T18:50:12.586Z"
updatedAt: "2022-11-30T18:50:12.586Z"
---
Occasionally, VRChat will update within major Unity versions. 

Upgrading your projects between these is easy in comparison to major version switches.

## Upgrade Steps

### Step 1 - Install the New Unity Version

Close all of your open projects.

Check the [Currently Supported Unity Version](/sdk/current-unity-version) and install the new version of Unity via Unity Hub. 

Although we list the standalone installer on that page, you *really* should be using Hub. We're assuming you're using it in these steps.

### Step 2 - Make a Copy of your Project

Always create a backup of your project before making big, potentially destructive changes. You can do this by just making a copy of the project folder and migrating that instead of your main project. That way, if it messes up, you can delete it and start over.

If you're an advanced user and know how to use version control like [git](https://git-scm.com/), you definitely should use that. It makes managing backups like this trivial.

### Step 3 - Open Your Project

Open the copy of your project in the new version. 

You'll get some upgrade warnings. This is fine! Click "Yes", "OK", or whatever the "affirmative" button may be.

After some time, your migration will be complete. That's it!

### Step 4 - Update your SDK

SDK updates aren't always needed in minor version upgrades. If they are, this is when you'd do it.

Close your project after migration, and use the [VCC](https://vcc.docs.vrchat.com/) to upgrade your SDK.

## Tips and Other Info

Here are a few additional tips that may help you out in the process.

### Unity Warnings

There are a few Unity warnings that may pop up during migration that you can safely click past. Here are a few you may see.
![migrating-to-a-newer-minor-unity-version-f3995eb-image_10.png](/img/sdk/migrating-to-a-newer-minor-unity-version-f3995eb-image_10.png)

![migrating-to-a-newer-minor-unity-version-b20553b-image_11.png](/img/sdk/migrating-to-a-newer-minor-unity-version-b20553b-image_11.png)

### Clean Up the Copy

If your project is large, migration might take a long time. There are a few folders that you don't need to migrate over if the project is especially huge. You can delete these folders safely from the copy.

You probably won't have all of these folders in your project.
```text
/Library/
/Temp/
/Obj/
/Build/
/Builds/
/Logs/
/UserSettings/
```
## Version Warnings

The SDK may warn you that you're on the wrong version, even though you _know_ you're on the correct one.
![migrating-to-a-newer-minor-unity-version-1b8194d-2022-11-30_10-35-54_chrome.png](/img/sdk/migrating-to-a-newer-minor-unity-version-1b8194d-2022-11-30_10-35-54_chrome.png)
This is fine! If you know for a fact you're on the correct version, you can ignore this message.