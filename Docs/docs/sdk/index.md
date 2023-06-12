---
title: "Setting up the SDK"
excerpt: "Learn how to create a Unity project for VRChat worlds or avatars"
sidebar_position: -1
createdAt: "2017-09-15T23:23:08.394Z"
updatedAt: "2023-02-27T18:28:17.748Z"
---
## Requirements & Downloads
There are multiple ways of downloading the VRChat SDK.
- Click [here](https://vrchat.com/download/vcc) to download the [VRChat Creator Companion](https://vcc.docs.vrchat.com/). This is the easiest way of getting started. The Creator companion can automatically install the Unity Editor, the Worlds SDK, and the Avatars SDK for you.
- Alternatively, you can use one of our [template projects on GitHub](https://vcc.docs.vrchat.com/guides/using-project-template-repos). If you're not using the Creator Companion, you'll also need to download the [current Version of Unity](/sdk/current-unity-version). We strongly recommend using Unity Hub for downloading Unity, available [here](/sdk/current-unity-version).


## Step 0 - Installing Unity
If you already have Unity up and running, you can skip to [Step 1](#section-step-1-creating-a-project). The [Creator Companion](https://vcc.docs.vrchat.com/) automatically installs Unity for you.

If you'd like to install Unity yourself, check the [Current Supported Unity Version](/sdk/current-unity-version) page, and install the version of Unity that VRChat currently supports-- ideally using Unity Hub.


## Step 1 - Creating a project
For our first project, we'll assume you're building content for Windows PC. If you're looking for the process to build content for VRChat on Quest, check out [Setting up Unity for Creating Quest Content](/platforms/android/setting-up-unity-for-creating-quest-content).

The easiest way to create a pre-set project is to use the [VRChat Creator Companion!](https://vcc.docs.vrchat.com/guides/getting-started) We **strongly recommend** using the VRChat Creator Companion for this. If you don't, you'll have to do a bunch of extra steps later that could be prone to error.

Some quick tips:

* Save your projects in a mass-storage drive with a lot of space-- Unity projects can get quite large, especially if you use versioning software
* Do not use a single project for tons of different avatars or worlds. This is a quick way to make future migrations a huge pain in the butt!
* If you know how to use version control software like [Git](https://git-scm.com/) or [Plastic SCM](https://www.plasticscm.com/), use it! It makes it very easy to roll back changes that break your project.
* If you don't know how to use those, you should learn how! They're great. Sadly, a Git tutorial is way beyond the scope of our documentation 😰

You can create a project manually if you'd like, but you'll need to use the [Creator Companion](https://vcc.docs.vrchat.com/) anyway later on to install the SDK (unless you started with one of our [template repos](https://vcc.docs.vrchat.com/guides/using-project-template-repos).

If you're using Unity Hub:
* Open Unity Hub (or just the editor if you chose to go that route).
* Create a new project, **set it to 3D, and save it**.
* Don't use HDRP or URP. We don't use it.

## Step 2 - Open Your Project
However you create it, you can now open your project. If your project isn't listed, click 'Add' in the project screen and select it. If you're using Unity Hub, click 'Open' in the top right, then select the directory where your project lives.

After the project is open, check the title bar to ensure it ends with `PC, Mac & Linux Standalone <DX11>`. If it does not, then go to `File > Build Settings...`, select `PC, Mac & Linux Standalone`, then click `Switch Platform` in the bottom left.

If you're building content for VRChat for Meta Quest or Android phones, you should also be building for Android. Check our [Android documentation](/platforms/android/index.md) for more details.

## OPTIONAL Step 3 - Installing the SDK
If you didn't use the VCC to set up your project, you'll need to install the SDK. Do so via the [VRChat Creator Companion](https://vcc.docs.vrchat.com/guides/getting-started).

If there are any errors, even with a brand new empty project, [please contact our Support team](https://vrch.at/support).

## Step 4 - Logging in
To use the SDK, you will need to log in. To do so, navigate to `VRChat SDK > Show Control Panel > Authentication`. You can sign into your VRChat account there.

Keep in mind that you must have a VRChat account of at least "New User" [Trust Rank](https://docs.vrchat.com/docs/vrchat-safety-and-trust-system) to upload content. You cannot use a Steam, Oculus, or Viveport account to upload content.

### What's Next?
Your project is ready! You can move on to [World Creation](/worlds) or [Avatar Creation](/avatars).