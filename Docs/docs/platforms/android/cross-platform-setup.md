---
title: "Cross-Platform Setup"
slug: "cross-platform-setup"
sidebar_position: 0
createdAt: "2019-04-09T22:29:12.157Z"
updatedAt: "2022-10-26T22:10:52.879Z"
---
Setting up a cross-platform world or avatar is actually quite straightforward! In short, all you have to do is use a duplicate project to build an Android version of the asset, and upload it to the same content ID as the VRChat PC asset. The client will manage which version it needs to download. 

If you need a bit more detail on how to do this properly (and easily), here's a short guide.
# Duplicating your Project (Deprecated)

:::caution

With the advent of Asset Database v2, swapping between platforms doesn't take nearly as long! Duplicating your project isn't really necessary anymore. You can skip this part.\n\nYou can also use [EasyQuestSwitch](https://github.com/JordoVR/EasyQuestSwitch), which helps make switching even easier.",
  "title": "Asset Database v2
:::
We'll be making the assumption that you already have a VRChat PC project set up with your world or avatar. If this isn't the case, you'll need to set up and create your project for PC first. You could also build for Android/Quest first, but that's your call.

After you've got your project at the point where you want to build and upload for VRChat PC, go ahead and do so. This process is identical to our standard setup.

Once you've got your VRChat PC build up, you'll need to duplicate the project for the Quest (Android) version. To do this, close Unity, **copy your project folder, and paste the copy elsewhere.** Basically, you're duplicating your project. The location doesn't matter much, as long as they are separate and distinct projects. You might want to name the project something like `MyVRChatProject-Quest` just to keep organized.

Keep in mind that any changes you make to one project, you should make to both. If it is something simple like moving an object, you can simply move the object in one project, then copy/paste the transform values to the second project.

For more complex or wider-reaching changes, you may have to re-duplicate the project, or be very careful with how duplicate the changes.
# Setting up for Quest
Open your Quest project in Unity. Since it is a duplicate, you shouldn't have any changes. However, we're about to change that. Let's swap your build target to Android. Here's how to do that:
![cross-platform-setup-dfca62a-VRChat_QuestContent_QuickStart.png](/img/cross-platform-setup-dfca62a-VRChat_QuestContent_QuickStart.png)

There's some important notes here:
- [You need to install Unity's Android SDK](https://docs.unity3d.com/Manual/android-sdksetup.html). Otherwise the option won't pop up.
- Although you *can* swap back and forth between Windows and Android, **you probably don't want to do this.** It changes files around, you probably want to maintain a scaled-back version of your world for Quest, and...
- It can take a **significant** amount of time to swap to the Android platform. Thankfully, if you maintain two separate projects, you only do this once. If your project is huge or has dozens of avatars, you'll probably want to just export the content you want as Prefabs or UnityPackages, and then create an empty Android project from scratch.
:::note Local Cache Server

You can reduce the time it takes to swap platforms by using Unity's Cache Server, which you can run locally. [Read more about the cache server here](https://docs.unity3d.com/Manual/CacheServer.html). Keep in mind this can take up a significant amount of disk space.
:::

# Fine-tuning and Optimization
Now that you've got two separate projects set up appropriately, you'll need to start optimizing. **You cannot skip this.** Quest is a powerful headset, but not nearly as powerful as a typical VR-ready PC. You'll need to check out our [Quest Content Optimization](/platforms/android/quest-content-optimization) page to see what you need to do. For worlds this means baking lighting, lowering geometry complexity, avoiding transparency, and lowering texture resolution. For avatars, this means removal of excess components, excess bones, lowering geometry complexity, avoiding transparency, and reducing texture size.

This will take a while, and is expected to be challenging. Optimizing for mobile hardware is difficult! Thankfully, there's a ton of resources out there, and even a cursory YouTube search for "optimizing Unity for mobile" reveals a ton of good content.

You can also check out some of our documentation on optimizing content for Oculus Quest.
 - [Quest Content Optimization](/platforms/android/quest-content-optimization) 
 - [Quest Content Limitations](/platforms/android/quest-content-limitations) 
 - [Avatar Performance Ranking System](/avatars/avatar-performance-ranking-system) 

:::caution SyncVideoStream and SyncVideoPlayer Components

Currently, neither SyncVideoStream nor SyncVideoPlayer is supported on Quest. Putting these into a Quest world will cause severe issues! Simply remove them from the Quest version. However,  having a video player only in the PC version can cause problems as well. If the Master of the instance is a Quest user, you'll run into further problems.\n\nAlthough getting synced video playback working on Quest is an eventual goal, we suggest not using them until we have official support on the platform.
:::

# Uploading Content
Once your world or avatar is ready, you can upload! This upload process is identical to the VRChat PC upload process, although the SDK will be a lot more aggressive with warning you about performance issues.

**You need to upload your world or avatar to the same blueprint ID as you have for the VRChat PC version of the content.** Blueprint ID is defined by a [Pipeline Manager component](/sdk/vrcpipelinemanager) on a Game Object, which usually accompanies a VRC Scene Descriptor, typically on your VRCWorld prefab. Press the "Detach" button to edit the blueprint ID, and paste in the ID from the first version that you uploaded (you can also find this in the "Content Manager" tab of the VRChat SDK control panel).

The version you're uploading depends on the originating project's build target. If you're on a project set up for Android, it'll upload for Quest. If the build target is Windows, then you're uploading a PC version. That's basically it-- once you've uploaded, any client that views your content will talk to our servers a bit like this:

>"Hey, I'm an Oculus Quest and I want this content."
>"Ok, here's a Quest version."

>"Hey I'm a VRChat PC user and I want this content."
>"Ok, here's the VRChat PC version."

If an avatar isn't available for the platform you're on, you'll see a placeholder avatar indicating what platform that user is on.

If a world isn't available for the platform you're on, you'll be unable to enter portals to that world or join it through the UI.

**However**, if you join a world that has both Quest and PC versions, and the people in the instance have both Quest and PC versions of their avatars, you'll view the world appropriately for your platform and be able to hang out with everyone, with no issues!
:::danger Armatures MUST be identical!

For avatars to work properly cross-platform, the armature path MUST be identical between the PC and Quest versions to essential bones like the head, hands, and feet. Additionally, the scale and rotation of the "root bone" (the first bone in the hierarchy) MUST be identical between versions.
:::
The rigging (armatures) between Quest and PC avatars must be mostly identical. If you want to remove non-essential bones like skirt/hair/etc bones for the Quest version, that's fine-- but do not change the base structure of the armature layout. Doing so will result in strange behavior when viewed across platforms.

Most importantly, the "root bone" (as in, Hips) should be the first bone in the hierarchy after the Armature GameObject. To be specific, as long as the setup (scale, rotation) of the "root bones" is identical, you should have no problems.
# Caveats
We know that maintaining two **"separately optimized, but identical in content"** projects for PC and Quest isn't ideal, and the process is a bit of an exercise in repetition. However, this process gives you a massive amount of control, and lets you be quite creative with the different platforms while sticking to the appropriate level of optimization for whichever platform you're targeting.

We'll be looking into ways to improve this process over time, but keep in mind many of these limitations are due to the way projects are managed in Unity.
# Tips
- Your VRChat PC avatar can have all kinds of bells and whistles that the VRChat Quest avatar can't have. Depending on the platform, users will see whatever version is appropriate for their client.
- You can be a bit creative with this as well-- you could have a high-poly world or avatar for PC users, and then a low-fi (but still stylish) version for Quest users.
- Define a set of box colliders or a low-poly mesh collider for both the PC and Quest versions of the world and use that instead of a mesh collider. Parent the colliders to an empty GameObject at a specific coordinate, and if you update one project, you can copy/paste that object to the other project easily. That way you'll never see users on different platforms "float", and you won't have issues with expensive and complex high vertex count mesh colliders.
- Remember, avoid transparency at all costs! It is quite expensive. 
  - As an aside, yes, "alpha cutout" counts as transparency.