---
sidebar_position: -99
---
import CurrentUnityVersion from '@site/src/components/UnityVersionedText.js';

# Welcome!

VRChat is a social platform where you can meet people, explore user-created worlds, and express yourself through custom avatars. Whether you're a seasoned developer or a newcomer, the VRChat SDK helps you bring your own ideas to life.

- [Get started with the VRChat SDK](/sdk)
- Design custom [avatars](/avatars)
- Build immersive [worlds](/worlds)
- Develop for multiple [platforms](platforms)
- Join the [Creator Economy](/economy)
- [Contribute](/contribute) to our documentation
- Explore our [creators roadmap](/roadmap)

## Quickstart

Follow the steps below to quickly set up the VRChat SDK:

<div class="video-container">
    <iframe src="https://www.youtube.com/embed/0u1g0TYoJsU" title="VRChat Creator Companion" frameborder="0" allow="encrypted-media; gyroscope; web-share" allowfullscreen></iframe>
</div>

1. Download & Install [the Creator Companion](https://vrchat.com/download/vcc).
2. If Unity is not installed, the Creator Companion will help you download Unity Hub, install Unity version [<CurrentUnityVersion/>](/sdk/upgrade/current-unity-version/) (VRChat SDK 3.4.2 or earlier is Unity 2019.4.31f1), and [create a Unity Account](https://id.unity.com/account/new).
3. Use the Creator Companion to create a new Worlds or Avatar project, and open it with Unity.
4. Build your [world](/worlds/creating-your-first-world) or [avatar](/avatars/creating-your-first-avatar) in Unity, and test it in VRChat using the SDK Control Panel.
5. Once ready, use the SDK control panel to publish your world or avatar to VRChat!

## World Creation

To make a VRChat world, you construct a scene in Unity using typical 3D models, materials and lighting. You can add interactivity with [Udon](/worlds/udon), our custom scripting system. Udon can be built with the visual [Udon Graph](/worlds/udon) or by writing C#-like code using [UdonSharp](https://udonsharp.docs.vrchat.com). You can use our [Networking](/worlds/udon/networking) system to synchronize experiences between players.

## Avatar Creation

To make a VRChat avatar, you must first create or find a 3D character, then ensure that it is [rigged](/avatars/creating-your-first-avatar#rigging-your-avatar) to work with VRChat. You can then [import your rigged model](/avatars/creating-your-first-avatar#importing-your-avatar) into Unity and add [Expressions and Controls](/avatars/expression-menu-and-controls), [Avatar Dynamics](/avatars/avatar-dynamics) and much more. 
