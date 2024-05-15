---
sidebar_position: -99
---
import CurrentUnityVersion from '@site/src/components/UnityVersionedText.js';

# Welcome!

Your VRChat Creator Journey begins here! 

Whether you're a seasoned developer or a curious enthusiast, the VRChat SDK provides you with the tools and resources to unleash your creativity and bring your imagination to life.

## Quickstart

<div class="video-container">
    <iframe src="https://www.youtube.com/embed/0u1g0TYoJsU" title="VRChat Creator Companion" frameborder="0" allow="encrypted-media; gyroscope; web-share" allowfullscreen></iframe>
</div>

1. Download & Install [the Creator Companion](https://vrchat.com/download/vcc).
2. If Unity is not installed, the Creator Companion will help you download Unity Hub, install Unity version [<CurrentUnityVersion/>](/sdk/upgrade/current-unity-version/) (VRChat SDK 3.4.2 or earlier is Unity 2019.4.31f1), and [create a Unity Account](https://id.unity.com/account/new).
3. Use the Creator Companion to create a new Worlds or Avatar project, and open it with Unity.
4. Build your world or avatar in Unity, and test it in VRChat using the SDK Control Panel.
5. Once ready, use the Control Panel to publish your World or Avatar to VRChat!

## World Creation

To make a VRChat world, you construct a scene in Unity using typical 3D models, materials and lighting. You can add interactivity with [Udon](/worlds/udon), our custom scripting system. Udon can be built with the visual [Udon Graph](/worlds/udon) or by writing C#-like code using [UdonSharp](https://udonsharp.docs.vrchat.com). You can use our [Networking](/worlds/udon/networking) system to synchronize experiences between players.

## Avatar Creation

To make a VRChat avatar, you must first create or find a 3D character, then ensure that it is [rigged](/avatars/creating-your-first-avatar#rigging-your-avatar) to work with VRChat. You can then [import your rigged model](/avatars/creating-your-first-avatar#importing-your-avatar) into Unity and add [Expressions and Controls](/avatars/expression-menu-and-controls), [Avatar Dynamics](/avatars/avatar-dynamics) and much more. 