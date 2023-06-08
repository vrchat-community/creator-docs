---
title: "Using Build & Test"
slug: "using-build-test"
excerpt: "Learn how to get set up to create Udon-powered Worlds in VRChat."
sidebar_position: 1
hidden: false
createdAt: "2020-08-21T19:34:22.325Z"
updatedAt: "2023-02-16T22:38:16.295Z"
---
:::note Prerequisites

Before you read this page, you should read [What is Udon](/worlds/udon) and [Getting Started with Udon](/worlds/udon/getting-started-with-udon).
:::

<iframe class="embedly-embed" src="//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2Fvideoseries%3Flist%3DPLe9XHNvXcouQjg5GULWGLj1tMzeythnQi%26start%3D0&display_name=YouTube&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D8yaQY0arCnc&image=https%3A%2F%2Fi.ytimg.com%2Fvi%2F8yaQY0arCnc%2Fhqdefault.jpg&key=f2aa6fc3595946d0afc3d76cbbd25dc3&type=text%2Fhtml&schema=youtube" width="854" height="480" scrolling="no" title="YouTube embed" frameborder="0" allow="autoplay; fullscreen" allowfullscreen="true"></iframe>
Some simple things in your world will work just by pressing 'Play' in the Editor - mouse events, timers, things that don't need interaction from avatars or networking. For a lot of the interesting functionality, you're going to need to make a build of your world that runs in the actual VRChat Client.

# Open the UdonExampleScene

Open the UdonExampleScene from the VRChat Examples folder - this scene has lots of great reusable Graphs from which you can learn. It's all set up to work as-is, so we can use it to make sure everything's working.

# Setting Up Your Settings

1. Start by creating a new project, making sure the Worlds SDK has been imported correctly, and opening up the VRChat Control panel through the Menu Bar under VRChat SDK > Show Control Panel
![](/img/worlds/using-build-test-e47cc0f-show-control-panel.png)

2. Enter your Login information on the 'Authentication' tab and press 'Sign In'.
![](/img/worlds/using-build-test-8c5c7ff-sign-in.png)

3. Click on the Settings tab and look for the 'VRChat Client' entry at the bottom. This is the VRChat Client that Unity will use to test your worlds. If you don't set this, your worlds may not launch correctly. 
![](/img/worlds/using-build-test-69f8274-installed-client-path.png)

Press 'Edit' to bring up a File Chooser, then navigate to the place you installed VRChat and choose the VRChat.exe program. Here are some default places it might be:
* Steam: C:\Program Files (x86)\Steam\steamapps\common\VRChat\VRChat.exe
* Oculus: C:\Program Files\Oculus\Software\Software\vrchat-vrchat\VRChat.exe
* Viveport: C:\Viveport\ViveApps\469fbcbb-bfde-40b5-a7d4-381249d387cd\1597468388\VRChat.exe

4. Switch to the 'Builder' tab. We need to set up our Layers and Collision Matrix to the way that VRChat expects.  Just press the 'Setup Layers for VRChat' button, then 'Do it!' on the popup that appears.
![](/img/worlds/using-build-test-5f05f9b-setup-layers.png)

Next, do the same thing for the 'Set Collision Matrix' button.
![](/img/worlds/using-build-test-7ccc247-set-collision-matrix.png)

# Running Your First Test

With all of our settings correct, we're ready to make a build of the scene. Once you've cleared the issues from the Builder tab by following the instructions above, you have access to the 'Build & Test' button. For this first test, turn on 'Force Non-VR', then press Build & Test.
![](/img/worlds/using-build-test-8712faf-build-and-test.png)

Your VRChat client should launch into a local copy of this world where you can run around and try everything out!
![](/img/worlds/using-build-test-2acac91-UdonExampleScene.jpg)

# Launching Multiple Clients
In order to test Synced Variables and Custom Network Events, you need multiple people in the same world. The easiest way to accomplish this is to use the Builder tab to launch multiple clients. Close the VRChat client window you just launched if it's still open, and change the 'Number of Clients' to 2, then press Build and Test again. This time, Unity will open up two VRChat clients, with your same avatar in both of them. You can swap between the windows to control your two avatars, and even see yourself talking in both of them. Try playing with the Synced Variables area. The first avatar that loads in will be the Master of the instance and therefore Owner of those GameObjects, so they will be able to update the UI Elements, whereas the second avatar can only see the updates. The one exception in this scene is the 'SyncButtonAnyone' which transfers ownership to whoever clicks on it.
:::danger Bug: Don't use the Chair when running Build & Test with multiple clients.

There's an issue right now that all of your avatars will get 'sat' into the chair, and it will be difficult to get them out. We'll remove this warning when that's fixed. For now, you'll need to Publish the scene to test out Stations in your world.
:::
# Build & Reload
When testing many clients, it can be a hassle to arrange your windows and wait for VRChat to login every time you make a change to your world. You can change the 'Number of Clients' to launch to 0 to change "Build & Test" into "Build & Reload"
![Build & Reload!](/img/worlds/using-build-test-07685ac-build-and-reload.png)
This will build a new version of your world and move all open clients into that new local instance, skipping the VRChat startup sequence altogether.

You can also do this for clients you launch yourself, if you want to test with multiple profiles. You can use the new command-line flag `--watch-worlds` to turn this functionality on. For example, this command launches VRChat with my main profile in desktop mode, with full debugging, at 1920x1080, with reloading worlds turned on.
```shell
VRChat.exe --watch-worlds --profile=0 --no-vr --enable-debug-gui --enable-sdk-log-levels --enable-udon-debug-logging -screen-width 1920 -screen-height 1080
```

:::danger New 'Build & Test' Clients Don't Join Reloaded Worlds

If you Build & Reload some clients, then choose 'Build & Test' to add more clients, they may not be joined into the right room. However, you can simply reduce the number of clients back to 0 and then 'Build & Reload' or 'Reload Last Build' in order to join them all together again.
:::