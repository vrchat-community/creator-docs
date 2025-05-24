---
sidebar_position: 0
---

# Cross-Platform Setup

Setting up a cross-platform world or avatar is actually quite straightforward! In short, all you have to do is switch Unity to the desired target platform and build the content.

If you need a bit more detail on how to do this properly, here's a short guide.

## Setting up for Android

First, you'll want to switch your project to target Android to perform first-time setup and ensure your content can be built for the platform.

1. Open the SDK Control Panel and switch to the Builder tab
2. In the "Build" section select the platforms dropdown. Uncheck "Windows" and check "Android"
3. In the popup that appears, click "Switch" to confirm the change
4. Inspect the validation messages that appear in the SDK control panel to ensure your content is compatible with Android

## Fine-tuning and Optimization

Now that you've got your project ready, you'll need to start optimizing. **You cannot skip this.** Modern android devices are pretty powerful, but not nearly as powerful as a typical VR-ready PC. You'll need to check out our [Quest Content Optimization](/platforms/android/quest-content-optimization) page to see what you need to do. For worlds this means baking lighting, lowering geometry complexity, avoiding transparency, and lowering texture resolution. For avatars, this means removal of excess components, excess bones, lowering geometry complexity, avoiding transparency, and reducing texture size.

This will take a while, and is expected to be challenging. Optimizing for mobile hardware is difficult! Thankfully, there's a ton of resources out there, and even a cursory YouTube search for "optimizing Unity for mobile" reveals a ton of good content.

You can also check out some of our documentation on optimizing content for Oculus Quest.

- [Quest Content Optimization](/platforms/android/quest-content-optimization)
- [Quest Content Limitations](/platforms/android/quest-content-limitations)
- [Avatar Performance Ranking System](/avatars/avatar-performance-ranking-system)

We also highly recommend using tools like EasyQuestSwitch (available as a package in the VRChat Creator Companion) to adjust the content per-platform.

:::info

If you have multiple version of your avatar available for different platforms. E.g. a dedicated PC version and a Quest version - you can use the [Per-Platform Override](/avatars/per-platform-avatar-overrides) functionality in the SDK to use them.

:::

## Uploading Content

Once your world or avatar is ready, you can upload! This upload process is identical to the VRChat PC upload process, although the SDK will be a lot more aggressive with warning you about performance issues.

If you want to upload your content for all the platforms at once - you can select multiple targets in the "Platforms" dropdown of the Build section in the SDK Control Panel.

**You need to upload your world or avatar to the same blueprint ID as you have for the VRChat PC version of the content.** Blueprint ID is defined by a [Pipeline Manager component](/sdk/vrcpipelinemanager) on a Game Object, which usually accompanies a VRC Scene Descriptor, typically on your VRCWorld prefab. Press the "Detach" button to edit the blueprint ID, and paste in the ID from the first version that you uploaded (you can also find this in the "Content Manager" tab of the VRChat SDK control panel).

The version you're uploading depends on the originating project's build target. If you're on a project set up for Android, it'll upload for Quest. If the build target is Windows, then you're uploading a PC version. That's basically it-- once you've uploaded, any client that views your content will talk to our servers a bit like this:

>"Hey, I'm a Meta Quest and I want this content."
>"Ok, here's a VRChat Android version."

>"Hey I'm a VRChat PC user and I want this content."
>"Ok, here's the VRChat PC version."

>"Hey, I'm a VRChat iOS user and I want this content."
>"OK, here's the VRChat iOS version."

:::info

VRChat is experimenting with content fallback systems for iOS. If your world is available on Android but not iOS, VRChat attempts to load the Android version on iOS.

This tends to work well for content that primarily uses the Standard Lite shader as outlined by [Quest Content Limitations](/platforms/android/quest-content-limitations). Uploading an iOS version of your content using the SDK is recommended for best results.

:::

If an avatar isn't available for the platform you're on, you'll see an [impostor avatar](https://creators.vrchat.com/avatars/avatar-impostors/) instead.

If a world isn't available for the platform you're on, you'll be unable to enter portals to that world or join it through the UI.

**However**, if you join a world that has both Android and PC versions, and the people in the instance have both Android and PC versions of their avatars, you'll view the world appropriately for your platform and be able to hang out with everyone, with no issues!

:::danger Armatures MUST be identical!

For avatars to work properly cross-platform, the armature path MUST be identical between the PC and Quest versions to essential bones like the head, hands, and feet. Additionally, the scale and rotation of the "root bone" (the first bone in the hierarchy) MUST be identical between versions.

:::

The rigging (armatures) between Android and PC avatars must be mostly identical. If you want to remove non-essential bones like skirt/hair/etc bones for the Android version, that's fine-- but do not change the base structure of the armature layout. Doing so will result in strange behavior when viewed across platforms.

Most importantly, the "root bone" (as in, Hips) should be the first bone in the hierarchy after the Armature GameObject. To be specific, as long as the setup (scale, rotation) of the "root bones" is identical, you should have no problems.

## Tips

- Your VRChat PC avatar can have all kinds of bells and whistles that the VRChat Android avatar can't have. Depending on the platform, users will see whatever version is appropriate for their client.
- You can be a bit creative with this as well-- you could have a high-poly world or avatar for PC users, and then a low-fi (but still stylish) version for Quest users.
- Define a set of box colliders or a low-poly mesh collider for both the PC and Quest versions of the world and use that instead of a mesh collider. Parent the colliders to an empty GameObject at a specific coordinate, and if you update one project, you can copy/paste that object to the other project easily. That way you'll never see users on different platforms "float", and you won't have issues with expensive and complex high vertex count mesh colliders.
- Remember, avoid transparency at all costs! It is quite expensive.
  - As an aside, yes, "alpha cutout" counts as transparency.
