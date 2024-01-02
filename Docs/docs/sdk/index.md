---
title: "Getting Started"
excerpt: "Learn how to create a Unity project for VRChat worlds or avatars"
sidebar_position: -1
createdAt: "2017-09-15T23:23:08.394Z"
updatedAt: "2023-02-27T18:28:17.748Z"
---

The **[VRChat Creator Companion](https://vcc.docs.vrchat.com/)** is the easiest and quickest way to get started on creating amazing avatars and worlds for VRChat.

Before you begin creating any content, you'll need to set up the software development kit, or **SDK**. An SDK is like a toolkit of programs needed to build on a specific platform. 

The **VRChat Creator Companion** will download and install both SDKs for avatars and worlds, and will also install and manage **Unity**! Unity is the engine VRChat is developed on, and is the engine you'll need to create all your content in.

This is the easiest way of getting started, and we highly recommend using it! If you don't, you'll have to do more steps later, and your projects will be prone to error.

## Your first project
For our first project, we'll assume you're building content for Windows PC.

1. Click [here to download the VRChat Creator Companion](https://vrchat.com/download/vcc).
    - You can check out Creator Companion docs [here](https://vcc.docs.vrchat.com/). 

:::note
If you're looking for the process to build content for VRChat on Quest, check out [Setting up Unity for Creating Quest Content](/platforms/android/setting-up-unity-for-creating-quest-content).
:::

2. Continue in the installation window. The install location will default to `:\Users\UserName\AppData\Local\Programs`, but you can change this as you'd like.

3. The VCC should open automatically after installation. If not, searching **Creator Companion** in your Windows search will help you find it.

4. Click **Create New Project**.

5. Decide if you want it to be an avatar or world project.

6. Name it!

7. Make sure the save location is correct.

8. Click **Create Project!**

## Opening your project

You can now open your new project! After creating a new project, the next page in the Creator Companion will show an **Open Project** button. You can also access it from the **Projects** tab on the left sidebar.

If your project isn't listed, click the dropdown menu next to **Create New Project** and then **Add Existing Project** via the project screen and select it. After the project is open:

1. Check the title bar to ensure it ends with `PC, Mac & Linux Standalone <DX11>`. 
    - If it does not, then go to `File > Build Settings...`, select `PC, Mac & Linux Standalone`, then click `Switch Platform` in the bottom left.

2. Navigate to `VRChat SDK > Show Control Panel > Authentication`. 

3. Sign into your VRChat account. You'll need to do this to upload any content you create.
    - You must have a VRChat account of at least "New User" [Trust Rank](https://docs.vrchat.com/docs/vrchat-safety-and-trust-system) to upload content. You cannot use a Steam, Oculus, or Viveport account to upload content.

## Using Unity Hub instead
Though we don't recommend this, if you'd like to install Unity yourself without the VCC, check the [Current Supported Unity Version](/sdk/upgrade/current-unity-version) page and install the version of Unity that VRChat currently supports using the Unity Hub.

If you didn't use the VCC to set up your project, you'll also need to install the SDK. Do so via the [VRChat Creator Companion](https://vcc.docs.vrchat.com/guides/getting-started).

To create projects using just the Unity Hub:
* Open Unity Hub (or just the editor, if you chose to go that route).
* Create a new project, **set it to 3D, and save it**.
* Don't use HDRP or URP. VRChat doesn't use it.

To open projects using just the Unity Hub:
* Click **Open** in the top right, then select the directory where your project lives.

## Tips 

* If you're building content for VRChat for Meta Quest, you should also be building for Android. Check our [Android documentation](/platforms/android/index.md) for more details.
* Save your projects in a mass-storage drive with a lot of space. Unity projects can get quite large, especially if you use versioning software
* Do not use a single project for tons of different avatars or worlds. This is a quick way to make future migrations a huge pain in the butt!
* If you know how to use version control software like [Git](https://git-scm.com/) or [Plastic SCM](https://www.plasticscm.com/), use it! It makes it very easy to roll back changes that break your project.

### What's Next?
Your project is ready! You can move on to [World Creation](/worlds) or [Avatar Creation](/avatars).

If there are any errors, even with a brand new empty project, [please contact our Support team](https://vrch.at/support).