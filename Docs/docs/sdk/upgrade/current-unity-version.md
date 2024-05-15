---
sidebar_position: 1
---
import CurrentUnityVersion from '@site/src/components/UnityVersionedText.js';
import UnityVersionedLink from '@site/src/components/UnityVersionedLink.js';

# Current Unity Version

The current Unity version used by VRChat is <UnityVersionedLink versionKey="patch" url="https://unity.com/releases/editor/whats-new/<VERSION>"><CurrentUnityVersion/></UnityVersionedLink>

If you have Unity Hub installed, you can <UnityVersionedLink url="unityhub://<VERSION>">click this link</UnityVersionedLink> to install the correct version of Unity. <CurrentUnityVersion/> is also available in the [Unity editor release archive](https://unity.com/releases/editor/archive).

In the installation screen, choose "Android Build Support" if you'd like to be able to create worlds or avatars for Android or Quest.

**Unity <CurrentUnityVersion versionKey="major"/> is required to use the latest version of the VRChat SDK**, and we strongly recommend upgrading if you are still on Unity 2019. Without upgrading, you can't access any future SDK updates, and some previously made content might experience issues.

For instructions on how to upgrade, [visit our Unity 2019 to 2022 documentation](/sdk/upgrade/unity-2022).

## Differences from previous versions

Unity 2022 includes many improvements such as faster iteration times, improved asset import times, *much* faster platform switching times, better editor stability, fully featured C# 8 support, a quick search feature, [and much more!](https://unity.com/releases/lts)


## Known Issues

* The first time you open a Scene and select a GameObject inside a prefab with a U# Behaviour, the GUI for the component directly below that U# Behaviour will not show its GUI. Deselecting and re-selecting the prefab fixes this.
* Buffer Particles don't work as they did in Unity 2019, [there is a workaround to fix them from community member hfcRed here](https://x.com/hfcRedddd/status/1696915379090604179).
* Unity 2022 sometimes causes Rider's debugger to stop for unhandled exceptions in Unity's IMGUI.
    * Please refer to [this workaround](https://forum.unity.com/threads/rider-debugger-breaks-on-unhandled-exception.1135879/#post-7305256) and [Jetbrains's bug tracker](https://youtrack.jetbrains.com/issue/RIDER-64944) for more information.
* Spatialized Audio Sources can create warnings when entering playmode or adjusting their settings.