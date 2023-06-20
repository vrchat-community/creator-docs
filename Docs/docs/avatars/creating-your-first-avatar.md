---
title: "Creating Your First Avatar"
slug: "creating-your-first-avatar"
hidden: false
createdAt: "2017-09-10T16:36:41.979Z"
updatedAt: "2023-03-15T23:26:32.023Z"
sidebar_position: -1
---
## Requirement: Set up the SDK first!
Before getting started, ensure you have a [Unity project with the SDK set up](/sdk).

After setting up the SDK, check out our example **example avatar**. Open your avatar project and go to
'VRChat SDK > Samples > Avatar Dynamics Robot Avatar.'

![The example avatar can help you understand what a complete VRChat avatar project might look like.](/img/avatars/creating-your-first-avatar-3dfc191-Unity_YrUFLEWWDe.png)

:::note Need help?

Making your first avatar can be challenging. If you get stuck, here's where you can get help:
- Read our documentation (you're doing it!) 
- Visit our [official forum](https://ask.vrchat.com/)
- Join our [Discord server](https://discord.com/invite/vrchat)

:::
## Step 0 - Create a model!
Although most users choose to find a model instead (see step 1), it is TOTALLY possible to create an avatar model from scratch. You can use any 3D software you like, as long as it supports exporting an FBX with an armature! Blender and Maya are very common choices.

Let's be completely clear: For people who have never modeled in 3D before, this is the beginning of a long journey. Learning how to 3D model is complex, as is learning how to rig and texture. Creating a rigged character combines _all of those skills_!

If you choose to create your model, we suggest starting with something simple. Even if you don't look as flashy as pre-made models, it is _your_ model, and you can do whatever you'd like with it.

To get you started, here's a VRChat-centric tutorial one of our community members has created:
- [Rainhet's Blender 3D Virtual Avatar Tutorial 2022](https://www.youtube.com/watch?v=OKWsUAIsgpg&list=PL2EEbgwoJzdsC9wfKA2ZO2kAf4HDqC8a8&index=1) - Rainhet's tutorial is long-form, and she explains everything thoroughly as she works through it.
- [Rainhet's 3D Avatar Class](https://www.youtube.com/watch?v=w-yhjgnhaNw) - An older version of Rainhet's tutorial series. Also has a [10-minute version](https://www.youtube.com/watch?v=in9rNze4FD4) that gives you a big-picture view of the process.

If you have a tutorial you'd like to suggest, please submit it to our docs via the '[Edit this Page](https://github.com/vrchat-community/creator-docs/edit/main/Docs/docs/avatars/creating-your-first-avatar.md)' feature!

## Step 0.5 - Use an avatar creator!
You can also try using an avatar creator! There are several out there of varying complexity.

### I basically want an RPG character creator, then click upload
[VRChat Avatar Systems Page](https://hello.vrchat.com/avatar-systems) - We list several easy-to-use creators on this page. It's kept up to date.

### OK, give me some sliders and the ability to paint things on
You may want to look into [VRoid Studio](https://vroid.com/en/studio), which is also available on Steam. It is an anime-themed character creator intended primarily to create VTuber-style models, but it is very flexible! For some examples of what it can do, check out the [VRoid subreddit](https://www.reddit.com/r/VRoid/).
:::note A note about VRoid Studio

VRoid Studio outputs avatars in the **.vrm** format, which isn't natively supported by Unity! If you'd like to import a VRoid Studio model directly for use in VRchat, you may want to look into the community-created [VRMtoVRChat converter](https://github.com/esperecyan/VRMConverterForVRChat) for .vrm avatars. Be sure to [read the documentation for this plugin](https://www.store.vket.com/ec/items/122/detail/) if you use it.
:::
## Step 1 - Find a model
Arguably the most important part, you must find a 3D model to be used as your avatar. As this is your first avatar we recommend getting one from the [Unity Asset Store](https://assetstore.unity.com/) as they usually come fully rigged meaning you don't have to do anything special to get it uploaded. If you decide to get your model outside of the asset store, ensure the model is fully rigged and is in a format Unity accepts.

**Ensure that you obtain a license to use the model that you wish to use.** Artists put hundreds of hours into their models. Using them without a license is a violation of the VRChat Terms of Service as well as a violation of the model author's rights.

Ensure that the model that you're using is below 70,000 triangles (7,500 for VRChat on Oculus Quest). On PC, you can upload models above this amount, but the avatar will be automatically marked as "Very Poor" performance, as excessive polygon count can cause performance problems.

## Step 2 - Get the model into your project
Now that you have found the model you want it's time to get it into your project. If you're getting it from the asset store, then you can download and directly import it into your project. If you got the model from elsewhere, then you need to import it and any related textures into your 'Assets' folder.

If you are importing your model from a 3D editor, please ensure you keep in mind the difference between coordinate systems. For example, [**Blender**](https://blender.org)'s default coordinate and unit system differs from Unity's. You must export FBX files from Blender and define the exporter as such:

![image](/img/avatars/creating-your-first-avatar-b066a1b-2022-05-27_11-13-48_blender.png)
After you get the model in your assets select it, you'll want to ensure it has the correct settings set, under the rig tab in the inspector make sure the Animation Type is set to Humanoid.

## Step 3 - Get the model into a scene
With the model in your assets and with the correct settings on it you will next want to put it into a scene To do so, either drag it into your Hierarchy or into the scene. We recommend having one scene per avatar and placing it at 0, 0, 0. If the avatar isn't standing up straight, rotate it so it is. Also, ensure the avatar isn't really small or bigger than 5x5x5m, you can use a default unity cube which is 1x1x1m to compare.
:::caution Avatar Optimization

It is very important that your avatar is optimized so that you do not cause low FPS for yourself and others. The SDK will inform you if something looks awry. Check out our [Avatar Optimization Tips](/avatars/avatar-optimizing-tips) to check out methods to improve your avatar's Performance Rank.
:::
## Step 4 - Adding an Avatar Descriptor 
After doing so, we now want to add a 'VRC Avatar Descriptor' component and then set up the settings for it.
1. Select the avatar in your hierarchy.
2. Click 'Add Component' in the inspector.
3. Search for the 'VRC Avatar Descriptor' component and add it.
4. Customize its settings, explained below.

![Add a `VRC Avatar Descriptor` to get started with your avatar.](/img/avatars/creating-your-first-avatar-fd027ea-Unity_qH7NJfAzzn.png)
### View position
First, you'll want to set the view position. This will be where your camera will be positioned in VRChat. You can see a visual representation of it as a small white sphere in the scene. If your avatar has a head, then the best position for the view is between the eyes. If it doesn't have a head, place it wherever you think it's appropriate.
![Use the Avatar Descriptor to configure your avatar for VRChat. Make sure to adjust the view position!](/img/avatars/creating-your-first-avatar-5afcbf1-Unity_lsTjP8qDqO.png)
### Lip sync mode
When you talk, you can make your avatar's mouth (or anything else) react automatically.  Open your `VRC Avatar Descriptor` and expand the `LipSync` dropdown. There are five modes to choose from:

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

If you're an avatar creator, consider splitting your avatar into two skinned meshes - one for your body, and one for your head/face.\nThe performance cost of blend shapes depends on how much of your 3D model they affect. Keeping blend shapes on a separate head mesh and having fewer blend shapes on your body mesh may improve your avatar's performance.
:::

##### Jaw Flap Blend Shape
If your avatar only uses a single blend shape to animate its mouth, configure it here. It will behave similarly to 'Jaw Flap Bone' by animating the jaw blend shape instead of a jaw bone.

##### Viseme Parameter Only
If you're an advanced creator, you can use this mode to control how your avatar reacts to speech with VRChat's built-in [Animator Parameters](/avatars/animator-parameters).

## Step 5 - Going to the build tab / Checking if the avatar is ok
Next we'll want to check that everything is good in the build window, to do that you'll need to open `VRChat SDK > Show Control Panel > Builder`, within you should see the avatars gameobject mentioned with a Build & Publish button below it. In between you will see a polygon count, errors and warnings. If there's any errors you will need to fix them first, the most common error is too many polygons though to fix this you will need to decimate your avatars mesh(es) which if you know how to do then go do so but if not just go back and choose another model for now.

## Step 6 - Uploading the avatar!
Now everything is ready. Press the Build & Publish button, the SDK will then build you avatar and get it ready for upload. You will next be brought to the upload screen where you can name your avatar, set a image for it and other metadata. To alter the image move the VRCCam around the scene.
:::caution

**Content Warnings are deprecated and not used at this time.** You cannot upload content to VRChat that violates our [Community Guidelines](https://vrchat.com/community-guidelines) or [Terms of Service](https://vrchat.com/legal). Doing so (even if you have checked off a content warning) will result in moderation action.
:::
After all that is entered you need to confirm you have the rights to upload the content to VRChat then you can press the upload button, the avatar will then start uploading and when finished you should able to see it in-game or via the content manager in the SDK via `VRChat SDK > Show Control Panel > Content Manager`.