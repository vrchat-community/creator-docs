---
title: "Creating Your First World"
slug: "creating-your-first-world"
hidden: false
sidebar_position: -2
createdAt: "2017-09-10T16:37:57.021Z"
updatedAt: "2023-03-30T16:55:26.082Z"
---
> 🚧 
> 
> Parts of this page are in the process of being updated.  
> Need help? Visit our Discord at [discord.gg/vrchat](https://discord.gg/vrchat) or our official forum at [ask.vrchat.com](https://ask.vrchat.com).

Before getting started, ensure you have a [Unity project with the SDK set up](/sdk).

## Step 1 - Setting up a scene

The first thing you need is a scene. This can either be an existing one with content or a new one. With the scene open, you should drag and drop the VRCWorld prefab into your scene.

You can find the VRCWorldPrefab by searching for it in your 'Project' tab, and setting your search to 'In Packages' or 'All'.

![](/img/worlds/creating-your-first-world-b1946d4-Unity_4t4quWsgTY.png)

## Step 2 - Creating spawn points

You now need to set up at least one point in the scene where users can spawn in. By default, players will spawn at the location of your VRCWorld object. This is the simplest setup and the setup that most users employ.

If you'd like to create additional spawn points, create an empty GameObject and place it where you want users to appear. Add the GameObject to the `spawns` list in the [VRC_SceneDescriptor](/worlds/components/vrc_scenedescriptor). Do this for as many spawn points as you want.

If you have more than one spawn point, you can choose the order in which people will spawn into them by changing the Spawn Order property.

## Step 3 - Descriptor Settings

There are various different options you can set the [VRC_SceneDescriptor](/worlds/components/vrc_scenedescriptor) which change the behaviour of the room. Here are some of the more important ones.

_Spawns_ - An array of transforms where players will spawn when they join your world. By default, players spawn at your Scene Descriptor's transform.

_Respawn Height_ - Y-Height at which players respawn and pickups are respawned or destroyed. Anything that exists below this Y level will be respawned (or destroyed, in the case of configured objects).

_Reference Camera_ - A camera which you can apply settings onto that are applied to the player when they join the room. Most often used for adjusting the clipping planes and adding post-processing effects.

More settings can be found on the [VRC_SceneDescriptor](/worlds/components/vrc_scenedescriptor) page.

## Step 4 - Setting up the Scene

Let's get started! Go to `VRChat SDK > Show Control Panel > Builder`. There, you'll see optional things you can set up in your scene as well as options to build your world. Go ahead and run through these operations:

- Setting up layers to match VRChat's layers. You should definitely do this, otherwise your world may not work properly.
- Setting up the collision layer matrix to match VRChat's. See above. Don't skip this!
- Apply 3D spatialization to 3D AudioSources automatically at runtime. Use this if all AudioSources in your scene are going to be spatialized.
- Apply 3D spatialization to 3D AudioSources in the scene currently. You should use this if you want to later add AudioSources that are 2D, like background music.

## Step 5 - Building your World

Next you need to build the world! You'll need to choose what you will be doing first: you can either make a test build to test your world without uploading it, or publish your world directly to VRChat. Under both Test and Publish headings you will find Last Build and New Build buttons. Last Build takes the last successful build of the world to either test or upload. New Build puts a new world together to either test or upload.

_(Optional)_  
If you wish to test your world, press the New Build button under the Test heading. This will build a new version of your world and launch into the world in VRChat. The Number of Clients option is used for when you want to open multiple clients for testing networked behaviour.

Now, we can build and upload your world by pressing the New Build button found under the Publish heading! This will build you world and get it ready for upload. Unity should go into Play mode showing a screen in which you can enter details about the upload which includes:

- World name - The name of your world, as shown to everyone!
- _(Coming soon)_ Recommended capacity - The recommended maximum amount of players for your world.
  - If a public instance has reached its recommended capacity, VRChat will discourage more players from joining. The instance will stop appearing VRChat's list of public instances.
  - Players can still try to join the instance under some circumstances if they have a direct invite URL on vrchat.com.
- Player capacity - The maximum amount of players allowed in your world.
  - If an instance has reached its player capacity, new players cannot join.
  - The instance creator, world creator, or group owner can always join, even if it would exceed the player capacity. (Unless they do not have permission to enter/see that instance)

> 🤔 What if my world doesn't have 'Recommended capacity'?
> 
> If you uploaded your VRChat world without 'recommended capacity', player capacity works differently:
> 
> - 'Recommended capacity' will be the same as your player capacity value
> - 'Player capacity' will be **twice** your player capacity value
> 
> For example: If you set 'Player capacity' to 10 and did not set 'Recommended capacity', your _actual_ 'Player capacity' will be 20. 'Player capacity' was sometimes referred to as the 'soft cap' for this reason.

- Description - This will be displayed on the 'World Details' page in VRChat and on the website.
- Content Warnings - **Content Warnings are deprecated and not used at this time.** You cannot upload content to VRChat that violates our [Community Guidelines](https://vrchat.com/community-guidelines) or [Terms of Service](https://vrchat.com/legal). Doing so (even if you have checked off a content warning) will result in moderation action.

You can also go back into the Scene view and adjust the VRCCam Camera so that the thumbnail looks great.

After all that is entered, you must confirm that you have the right to upload the content to VRChat. After you have done so, you can click the "Upload" button. The room will then upload to VRChat! When finished, you should able to see it in-game, or via the content manager in the SDK via `VRChat SDK > Show Control Panel > Content Manager`.

> 🚧 Upload Failures
> 
> If your world fails to upload check the console to see if there are any errors, if so then solve them before trying to build your world again. Check our other documentation or ask in [Discord](https://discord.com/invite/vrchat) if you need help.