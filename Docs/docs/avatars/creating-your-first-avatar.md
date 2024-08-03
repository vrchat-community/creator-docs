---
sidebar_position: -1
---
# Creating Your First Avatar

VRChat has tens of millions of avatars, and anyone can create them! This page explains how you can create your first VRChat avatar. There are two ways to create an avatar:

- You can use an [avatar creation tool](https://hello.vrchat.com/avatar-systems) to create simple avatars without Unity.
- You can use the [Creator Companion](https://vcc.docs.vrchat.com/) to install [Unity](https://unity.com/), install the [VRChat Software Development Kit (SDK)](https://creators.vrchat.com/sdk/), and to upload a custom avatar.

## Requirements

To upload a custom avatar with Unity and the VRChat SDK, you must meet the following requirements:

- You must have an account on [VRChat.com](https://vrchat.com/).
  - If you're playing on a Steam or Meta account, you'll need to [link your account first](https://help.vrchat.com/hc/en-us/articles/360062659053-I-want-to-turn-my-platform-account-through-Steam-Meta-Pico-or-Viveport-into-a-VRChat-account).
- Your VRChat account must have a [trust rank](https://docs.vrchat.com/docs/vrchat-safety-and-trust-system#trust-rank) of "New User" or higher.
  - If you're new to VRChat, you'll receive an email once you're allowed to upload avatars.

:::tip Need help?

If you get stuck or need help,  here's where you can get help:
- Browse VRChat's [official documentation](https://creators.vrchat.com/). 
- Visit VRChat's [official forum](https://ask.vrchat.com/) or [Discord server](https://discord.com/invite/vrchat) and ask the community.

:::

## Step 1 - Choose a 3D model

Maybe you already have a 3D model that you want to use as an avatar - or you might be downloading a 3D model for the first time. Here are a few ways you can get started:

### Option 1: Use an avatar creation tool
Instead of finding or creating a 3D model, you can try using an avatar creation tool:

- The [VRChat Avatar Systems](https://hello.vrchat.com/avatar-systems) page lists several beginner-friendly avatar creation tools.
 	- These tools are similar to customizing your character in a video game.
 	- These tools do not require the VRChat SDK! If you use them, you can skip all other steps on this page.
        - Any VRChat user can use these tools. You do not need the ["New User" trust rank](https://docs.vrchat.com/docs/vrchat-safety-and-trust-system#trust-rank).
- [VRoid Studio](https://vroid.com/en/studio) is an anime-theme character creator for creating VTuber-style models.
	- Characters have hundreds of customization sliders and can be hand-painted.
	- For some examples of what it can do, check out the [VRoid subreddit](https://www.reddit.com/r/VRoid/).
	- It's also available on [Steam](https://store.steampowered.com/app/1486350/VRoid_Studio_v1263/).
	- ⚠VRoid Studio outputs avatars in the **.vrm** format, which isn't natively supported by Unity!
		- If you'd like to import a VRoid Studio model directly for use in VRChat, you may want to look into the community-created [VRMtoVRChat converter](https://github.com/esperecyan/VRMConverterForVRChat) for .vrm avatars. Be sure to [read the documentation for this plugin](https://www.store.vket.com/ec/items/122/detail/) if you use it.

### Option 2: Use VRChat's example avatar

If you want to learn more about the VRChat SDK before choosing a model, [try the SDK's example avatar](/avatars/creating-your-first-avatar#try-vrchats-example-avatar). You can always come back and try your own 3D model later.

### Option 3: Find a model

There are many stores on the internet where you can download free or paid VRChat avatars.

Some stores sell 3D models that can be used in VRChat or in other applications. These avatars are great for learning about the VRChat SDK and creating your own VRChat avatar.

- [100 avatars](https://www.100avatars.com/) is a free collection of hundreds of avatars. They're simple and easy to import into the VRChat SDK. 
- The [Unity Asset Store](https://assetstore.unity.com/) has free and paid 3D models. They're easy to import into Unity and usually compatible with the VRChat SDK, but they may include assets or scripts that won't work.

Some stores sell avatars that are already prepared for VRChat. They may allow you to skip some steps when setting up the avatar in Unity but might also include advanced features that aren't covered in this article. They are suitable if you want a cool-looking avatar and care less about learning how to create your own. 

- [BOOTH](https://booth.pm/en/items?tags%5B%5D=VRChat) is a Japanese store for VRChat avatars. It's the largest store for anime-style avatars, but you can also find other types of avatars there.
- [Gumroad](https://gumroad.com/discover) is more popular among Western creators and focuses on anime-style and furry avatars.

When you look for a model, try to keep the following things in mind:
- If you decide to get your model outside of an asset store, ensure the model is fully "rigged" by the author.
	- A "rigged" model has a skeleton that allows it to move. Creating a rig can be very difficult, but tools like [Mixamo](https://www.mixamo.com/) and [Rigify](https://docs.blender.org/manual/en/latest/addons/rigging/rigify/index.html) can do it automatically.
	- You should also check that the model is in [a format compatible with Unity](https://docs.unity3d.com/Manual/3D-formats.html), such as `.fbx`.
- Ensure that you have a license to use the model in VRChat.
	- Most asset stores display their license on the 3D model's store page.
	- Using them without a license is a violation of the model author's rights and the [VRChat Terms of Service](https://hello.vrchat.com/legal). 
- Ensure that the model that you're using is [below 20,000 for VRChat on Meta Quest](/avatars/avatar-performance-ranking-system#android-limits) and [below 70,000 triangles on PC](/avatars/avatar-performance-ranking-system#pc-limits).
	- Uploading an avatar with an excessive triangle count can cause performance issues.
	- On PC, you can upload models above this limit, but the avatar will be ranked as having "Very Poor" performance, which means that fewer players will see it.

### Option 4: Create a model

While most users choose to find a model as a starting point, anyone can create an avatar model from scratch. You can use any 3D software you like, as long as it supports exporting an FBX with an armature. [Blender](https://www.blender.org/) is free and a very common choice.

If you've never modeled in 3D before, this might be the beginning of a long journey. Learning how to model, rig, and texture a 3D model is very complex. Creating a VRChat avatar combines _all of those skills_!

If you choose to create your model, we suggest starting with something very simple. Even if you don't look as flashy as pre-made models, it is _your_ model, and you can do whatever you'd like with it.

To get you started, here's a VRChat-centric tutorial one of our community members has created:
- [Rainhet's Blender 3D Virtual Avatar Tutorial 2022](https://www.youtube.com/watch?v=OKWsUAIsgpg&list=PL2EEbgwoJzdsC9wfKA2ZO2kAf4HDqC8a8&index=1) - Rainhet's tutorial is long-form, and she explains everything thoroughly as she works through it.
- [Rainhet's 3D Avatar Class](https://www.youtube.com/watch?v=w-yhjgnhaNw) - An older version of Rainhet's tutorial series. Also has a [10-minute version](https://www.youtube.com/watch?v=in9rNze4FD4) that gives you a big-picture view of the process.

import FeedbackButton from "@site/src/components/FeedbackButton";

If you have a tutorial you'd like to suggest, please suggest it by clicking the <FeedbackButton /> button.

## Step 2 - Set up the VRChat SDK

Congratulations on choosing or building a model! Before you continue, you'll need to set up the [VRChat Creator Companion](https://vcc.docs.vrchat.com/). It will help you install [Unity](https://unity.com/) and create projects with the [VRChat SDK](/sdk). Watch the video below to get started!

<div class="video-container">
    <iframe src="https://www.youtube.com/embed/0u1g0TYoJsU" title="VRChat Creator Companion" frameborder="0" allow="encrypted-media; gyroscope; web-share" allowfullscreen></iframe>
</div>

Read the Creator Companion's [Getting Started](https://vcc.docs.vrchat.com/guides/getting-started) page to learn more. After setting creating your Unity project, you're ready to continue!

:::tip New to Unity?

Visit [Unity Learn](https://learn.unity.com/) for free tutorials on how to use Unity.

:::

### Try VRChat's example avatar

Before you import your own 3D model into Unity, you can try using VRChat's example avatar instead. This allows you to learn how to upload an avatar without worrying about problems related to your 3D model.

Open your avatar project and go to 'VRChat SDK > Samples > Avatar Dynamics Robot Avatar.'

![The example avatar can help you understand what a complete VRChat avatar project might look like.](/img/avatars/creating-your-first-avatar-3dfc191-Unity_YrUFLEWWDe.png)

If the example avatar loaded successfully, you can skip to [step 6](/avatars/creating-your-first-avatar#step-6---going-to-the-build-tab--checking-if-the-avatar-is-ok). If you'd rather import your own avatar, continue with step 3 below.

## Step 3 - Get the model into your project
Now that you've set up the VRChat SDK, it's time to import your model into your project. If you're getting it from an asset store, then you can download and directly import it into your project. If you got the model from elsewhere, then you need to import it and any related textures into your 'Assets' folder.

If you are importing your model from a 3D editor, please ensure you keep in mind the difference between coordinate systems. For example, [**Blender**](https://blender.org)'s default coordinate and unit system differs from Unity's. You must export FBX files from Blender and define the exporter as such:

![image](/img/avatars/creating-your-first-avatar-b066a1b-2022-05-27_11-13-48_blender.png)

After you get the model in your assets, select it, you'll want to ensure it has the correct settings in the rig tab in the inspector. Make sure the Animation Type is set to Humanoid.

## Step 4 - Get the model into a scene
Now that you have the model in your Assets folder, with the correct settings applied, you need to put it into a scene. To do so, either drag it into your [Hierarchy](https://docs.unity3d.com/Manual/Hierarchy.html) or directly into the Scene View window. We recommend having one scene per avatar and placing it at the coordinates (0, 0, 0). If needed, rotate the avatar so it is standing up straight, and ensure that its size is what you expect. You can add a Cube to your scene to compare - the cube will be 1 meter on each side and your Avatar will best function between about 0.5-5m tall. The average person is around 1.65 meters tall.
:::caution Avatar Optimization

It is very important that your avatar is optimized so that you do not cause low FPS for yourself and others. The SDK will inform you if something looks wrong. Check out our [Avatar Optimization Tips](/avatars/avatar-optimizing-tips) to check out methods to improve your avatar's Performance Rank.
:::
## Step 5 - Adding an Avatar Descriptor 
The next step is to add a 'VRC Avatar Descriptor' component and prepare its settings.
1. Select the avatar in your hierarchy.
2. Click 'Add Component' in the inspector.
3. Search for the 'VRC Avatar Descriptor' component and add it.
4. Customize its settings, as explained below.

![Add a `VRC Avatar Descriptor` to get started with your avatar.](/img/avatars/creating-your-first-avatar-fd027ea-Unity_qH7NJfAzzn.png)
### View position
First, you'll want to set the view position. This will be where your camera will be positioned in VRChat. You can see a visual representation of it as a small white sphere in the scene.

If your avatar has a head, place the view position between the avatar's eyes. If your avatar's head is unusually large, its feet may lift off the ground when looking up and down. To avoid this, place the view position closer to where a regular-sized head would be.

If your avatar doesn't have a head, place the view position wherever you think it's appropriate.

![Use the Avatar Descriptor to configure your avatar for VRChat. Make sure to adjust the view position!](/img/avatars/creating-your-first-avatar-5afcbf1-Unity_lsTjP8qDqO.png)
### Lip sync mode
When you talk, you can make your avatar's mouth (or anything else) react automatically.  Open your `VRC Avatar Descriptor` and expand the `LipSync` dropdown. You can choose one of five lip sync modes:

#### Default
![Pressing 'Auto Detect!' is usually enough to let your VRChat avatar react to your speech.](/img/avatars/creating-your-first-avatar-d69289f-Unity_FgsAtEU75F.png)

Press 'Auto Detect!' to let the VRChat SDK automatically detect the appropriate lip sync mode. The mode will then switch to one of the modes below.

#### Jaw Flap Bone
If your avatar uses a single bone to animate the jaw, you can specify it here. Your character's jaw will open depending on how loudly you speak in VRChat. Ensure you've configured the jaw bone in Unity's Humanoid rig for your avatar.

#### **Viseme Blend Shape** (recommended)
Blend shapes/shape keys (named depending on what software you're using) modify the mesh based on vertex positions.  Many models use this for detailed animations for speaking. If your model has these, you should use them!

We use the Oculus Audio library to detect and set visemes. [You can see a reference to what all the visemes should look like and what sound triggers them here](https://developer.oculus.com/documentation/unity/audio-ovrlipsync-viseme-reference). 

VRChat can usually detect your avatar's visemes automatically. If not, you can choose visemes from the dropdown list.

![The 'Viseme Blend Shape' mode is the most common method of making your character's face move when you speak.](/img/avatars/creating-your-first-avatar-6272723-Unity_w5nQONGtcb.png)

:::caution SIL shape

Unity will delete shape keys/blend shapes that are empty on import, so make sure your "SIL" shape (the shape your mouth makes when no sound is detected, but the mic is active - such as the space between words) moves a single vertex a very small, imperceptible amount. This will prevent Unity from deleting that key.
:::

:::note Viseme Performance Tip!

If you're an avatar creator, consider splitting your avatar into two skinned meshes - one for your body, and one for your head/face.
The performance cost of blend shapes depends on how much of your 3D model they affect. Keeping blend shapes on a separate head mesh and having fewer blend shapes on your body mesh may improve your avatar's performance.
:::

##### Jaw Flap Blend Shape
If your avatar only uses a single blend shape to animate its mouth, configure it here. It will behave similarly to 'Jaw Flap Bone' by animating the jaw blend shape instead of a jaw bone.

##### Viseme Parameter Only
If you're an advanced creator, you can use this mode to control how your avatar reacts to speech with VRChat's built-in [Animator Parameters](/avatars/animator-parameters).

## Step 6 - Going to the build tab / Checking if the avatar is ok
Next, we'll want to check that everything is good in the build window. To do that, you'll need to use the menu item `VRChat SDK > Show Control Panel`, which will open up the VRChat SDK Control panel. After signing in, switch to the "Builder" tab to see the avatar's GameObject mentioned with a Build & Publish button below it. In between you will see settings, content tags, an 'Overall performance' rank, errors, and warnings.

![The VRChat SDK build panel.](/img/avatars/build-panel-avatars-2023.png)

Simply follow the steps in VRChat's SDK build panel: 
- Give your avatar a name. You can add a description, too.
- Make sure to tag your avatar with the appropriate content tags to comply with [VRChat's content gating system](https://hello.vrchat.com/blog/content-gating).
- Choose your avatar's visibility. Private avatars can can't be cloned or used by other VRChat users.
- Select a thumbnail image. You can select an image or use a capture from your Unity scene.
- Read the 'Validations' section. It contains many useful errors and warnings. For example, the SDK may warn you about your avatar having too many polygons, which you can fix by optimizing mesh(es). If you're unable to optimize the mesh, you may need to go back and choose another model.
- When you're ready, continue building your avatar

## Step 7 - Building and uploading the avatar!
Now everything is ready. Press the "Build & Publish" button, and the SDK will start building and uploading your avatar. Before uploading your avatar, you should double-check that it complies with VRChat's [Terms of Service](https://hello.vrchat.com/legal) and [Community Guidelines](https://hello.vrchat.com/community-guidelines).

After uploading your avatar, it should be available in VRChat. You can also see your avatar in  `VRChat SDK > Show Control Panel > Content Manager`.

You can also test your avatar without uploading it. To do this, click "Build & Test" instead. Your avatar will appear in the "Other" section of your VRChat Avatars menu. Test avatars can only be seen by you. In order for other players to see your avatar, you need to upload it.

## Step 8 - Enjoy your avatar!

Congratulations on creating your first avatar! We hope everything went smoothly. If you need any help, consider visiting our [Ask Forum](https://ask.vrchat.com/) or our [Discord server](https://discord.com/invite/vrchat).

Creating and uploading VRChat avatars can be fun and creatively fulfilling. If you'd like to improve your avatar creation skills, take a look at the rest of our [Avatars documentation](https://creators.vrchat.com/avatars/).

## Learn more

If you'd like to become better at avatar creation, check out these pages:
- [Quest Content Optimization](/platforms/android/quest-content-optimization) - Learn how to create avatars that work well on Android and Quest.
- [Avatar Optimization Tips](/avatars/avatar-optimizing-tips) - Learn general advice on creating optimized PC or Android avatars.
- [VRChat's performance ranking system?](/avatars/avatar-performance-ranking-system) - Learn why certain avatars are visible or hidden to other players by default.
- [Avatar Dynamics](/avatars/avatar-dynamics/) - Learn how to create physics-driven interactions on your avatar. 

