---
sidebar_position: -1
---

# Getting Started

Before you can create [avatars](/avatars) and [worlds](/worlds), you need to perform the following steps.

:::tip

If you're new to VRChat, read the [VRChat's "Getting Started"](https://vrch.at/getting-started) page.

:::

The **[VRChat Creator Companion](https://vcc.docs.vrchat.com/)** is the easiest and quickest way to get started. It installs [Unity](https://unity.com/) and the VRChat software development kit (SDK) for you.

- VRChat uses the Unity game engine. Avatars and worlds are also created in Unity.
- The VRChat SDK allows you to use Unity to create avatars and worlds. 

## Your first project
You should use Windows to create your first project.

1. [Download the VRChat Creator Companion (VCC)](https://vrchat.com/download/vcc).
    - Read the [documentation](https://vcc.docs.vrchat.com/). 
2. Install the VCC.
	- The default install location is `%LocalAppData%/Programs/VRChat Creator Companion`, but you can change this as you'd like.
4. The VCC should open automatically. If not, search for "Creator Companion" in Windows.
5. Click "Create New Project".
6. Choose "Avatar" or "World project".
7. Name your project.
8. Choose a location.
9. Click "Create Project".

:::note
Do you want to upload to Android, Quest, or iOS? Read the [platforms](/platforms) page.
:::

## Opening your project

You can now open your new project! After creating a new project, the next page in the Creator Companion will show an **Open Project** button. You can also access it from the **Projects** tab on the left sidebar.

If your project isn't listed, click the dropdown menu next to **Create New Project** and then **Add Existing Project** via the project screen and select it. After the project is open:

1. Check the title bar to ensure it ends with `PC, Mac & Linux Standalone <DX11>`. 
    - If it does not, then go to `File > Build Settings...`, select `PC, Mac & Linux Standalone`, then click `Switch Platform` in the bottom left.

2. Navigate to `VRChat SDK > Show Control Panel > Authentication`. 

3. Sign into your VRChat account. You'll need to do this to upload any content you create.
    - You must have a VRChat account of at least "New User" [Trust Rank](https://docs.vrchat.com/docs/vrchat-safety-and-trust-system) to upload content. You cannot use a Steam, Meta, or Viveport account to upload content.

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
* If you know how to use version control software like [Git](https://git-scm.com/) or [Unity Version Control](https://unity.com/solutions/version-control), use it! It makes it very easy to roll back changes that break your project.

### What's Next?
Your project is ready! You can move on to [World Creation](/worlds) or [Avatar Creation](/avatars).

If there are any errors, even with a brand new empty project, [please contact our Support team](https://vrch.at/support).