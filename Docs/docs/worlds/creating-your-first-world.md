---
sidebar_position: -2
---
# Creating Your First World

This guide explains how to create and upload a very simple VRChat world. You'll learn the basics of setting up a Unity scene, using VRChat's Control Panel, and publishing your world.

:::info

Before you get started, ensure you have a [Unity project with the SDK set up](/sdk).

Need help? Visit our Discord at [discord.gg/vrchat](https://discord.gg/vrchat) or our official forum at [ask.vrchat.com](https://ask.vrchat.com).

:::

## Step 1 - Setting up a scene

The first thing you need is a Unity scene. You can either create a new scene, or open an existing Unity scene with pre-existing content.

With the scene open, you need to add a **VRC Scene Descriptor** to your scene. You can easily add it with the VRChat SDK:

![Adding a scene descriptor automatically via the VRChat SDK build panel.](/img/worlds/build-panel-add-vrc-scene-descriptor.png)

1. Click **VRChat SDK** > **Show Control Panel**.
	- If you do not see this menu at the top of your Unity window, your SDK may not be installed correctly. Try clicking **Assets** > **Reimport All**, and check our [SDK troubleshooting guide](/sdk/sdk-troubleshooting).
2. In the **Authentication**, log into your VRChat account.
3. Switch to the **Builder** tab and click **Add a VRCSceneDescriptor**.

![Adding a scene descriptor automatically via the VRChat SDK build panel.](/img/worlds/vrcworld-prefab-in-scene.png)

A Game Object called **VRCWorld** will automatically be added to your scene. It contains a **VRC Scene Descriptor** and other helpful components. Click on VRCWorld in your hierarchy to inspect its settings.

## Step 2 - Creating spawn points

Your world needs at least one spawn point. When players join your world, that's where they'll appear. By default, players will spawn at the location of your VRCWorld prefab. Simply move the VRCWorld prefab to wherever you'd like users to spawn.

![Move your scene descriptor to change your spawn.](/img/worlds/vrc-scene-descriptor-gizmo.png)

If you'd like to create additional spawn points, create an empty Game Object and place it where you want users to appear. Add the Game Object to the **Spawns** list in the [VRC_SceneDescriptor](/worlds/components/vrc_scenedescriptor) component. Do this for as many spawn points as you want.

If you have more than one spawn point, you can choose the order in which people will spawn into them by changing the **Spawn Order** property.

## Step 3 - Descriptor Settings

There are various settings in the [VRC_SceneDescriptor](/worlds/components/vrc_scenedescriptor) that change the behavior of your world. Here are some of the more important ones.

_Spawns_ - An array of transforms where players will spawn when they join your world. By default, players spawn at your Scene Descriptor.

_Respawn Height_ - The vertical height (on the y axis) at which players respawn and pickups are respawned (or destroyed, depending on the "Object Behaviour At Respawn" setting).

_Reference Camera_ - Settings you apply to this camera will be applied to the player when they join the room. It is most often used for adjusting the clipping planes and adding post-processing effects.

More settings can be found on the [VRC_SceneDescriptor](/worlds/components/vrc_scenedescriptor) page.


## Step 4 - Configure your World in the SDK build panel

Click  `VRChat SDK > Show Control Panel`. Before you can upload your world, you need to give VRChat some basic information about it, such as the world's name, capacity, or content warnings.

![VRChat's SDK World build panel.](/img/worlds/build-panel-worlds-2023.png)

- World name - The name of your world, as shown to everyone.
- Description - This will be displayed on the 'World Details' page in VRChat and on the website.
- Content warnings - Warnings that work in conjunction with VRChat's [Content Gating system](https://hello.vrchat.com/blog/content-gating).
- Maximum capacity - The maximum amount of players allowed in your world.
  - If an instance has reached its player capacity, new players cannot join.
  - The instance creator, world creator, or group owner can always join, even if it would exceed the player capacity. (Unless they do not have permission to enter/see that instance)
- Recommended capacity - The recommended maximum amount of players for your world.
  - If a public instance has reached its recommended capacity, VRChat will discourage more players from joining. The instance will stop appearing in VRChat's list of public instances.
  - Players can still try to join the instance under some circumstances if they have a direct invite URL on vrchat.com.
- Tags - Keyworlds that help users find your world in VRChat.
- World debugging - Allows other users to debug your Udon code.
- Thumbnail - A preview image of your world.

:::note What if my world doesn't have a recommended capacity?

If you uploaded your VRChat world with an old VRChast SDK, without 'recommended capacity', player capacity works differently:

 - 'Recommended capacity' will be the same as your player capacity value
 - 'Player capacity' will be **twice** your player capacity value
 
 For example: If you set 'Player capacity' to 10 and did not set 'Recommended capacity', your _actual_ 'Player capacity' will be 20. 'Player capacity' was sometimes referred to as the 'soft cap' for this reason.

:::

## Step 5 - Check for warnings or validation messages

![Validations in the SDK build panel.](/img/worlds/build-panel-validations-everything-looks-good.png)

At the bottom of the VRChat SDK build panel, you'll find a section called **Validations**. It contains suggestions on how to set up your scene and build your world. For example:

- Is your scene missing a VRC Scene Descriptor?
- Is your scene missing VRChat's layers and collision layer matrix?
- Are there any issues with Audio Sources, textures, or Udon scripts?

The SDK will often give you the option to fix these issues automatically. If not, please read the validation messages carefully to learn how to improve your world. Some of the messages are optional and are not required for uploading your world.

## Step 6 - Building and publishing your World

Next, you need to build the world! You'll need to choose what you will be doing first: You can either make a **test build** to test your world without uploading it or **publish** your world directly to VRChat. Under both "Offline Testing" and "Online Publishing" headings, you will find buttons to publish a new build or your last build. Last Build takes the last successful build of the world to either test or upload. New Build puts a new world together to either test or upload.

![Validations in the SDK build panel.](/img/worlds/build-panel-upload-or-test.png)

_(Optional)_  
If you wish to test your world, go to **Offline Testing** and click **Build & Test New Build**. This will build a new version of your world and launch into the world in VRChat. The **Number of Clients** option is used when you want to open multiple VRChat windows for testing your world with multiple players.

Once you're ready to publish your world, go to **Online Publishing** and click **Build and Upload**! This will build you world and get it ready for upload. Keep in mind that you're not permitted to upload content to VRChat that violates our [Community Guidelines](https://vrchat.com/community-guidelines) or [Terms of Service](https://vrchat.com/legal). Doing so will result in moderation action.

After uploading your world, it will become available in VRChat! You should able to see it in-game or via the content manager in the SDK via `VRChat SDK > Show Control Panel > Content Manager`.

:::caution World Upload Failures

If your world fails to upload, [check Unity's console](https://docs.unity3d.com/Manual/Console.html) to see if there are any errors. If so, then solve them before trying to build your world again. Make sure to read the entirety of Unity's log, and click on errors to see additional information.

Check our other documentation, the [Ask Forum](https://ask.vrchat.com/),  or ask on [Discord](https://discord.com/invite/vrchat) if you need help. Make sure to provide as much information as possible, such as Unity console errors.

:::
