---
sidebar_position: 1
---
import CurrentUnityVersion from '@site/src/components/UnityVersionedText.js';
import UnityVersionedLink from '@site/src/components/UnityVersionedLink.js';

# Current Unity Version

The current Unity version used by VRChat is <UnityVersionedLink versionKey="patch" url="https://unity.com/releases/editor/whats-new/<VERSION>"><CurrentUnityVersion/></UnityVersionedLink>

The simplest way to install the latest Unity version is with the [Creator Companion](https://vcc.docs.vrchat.com/#download-it). After installing the Creator Companion, simply follow the instructions. 

Alternatively, if you have Unity Hub installed, you can <UnityVersionedLink url="unityhub://<VERSION>">click this link</UnityVersionedLink> to install the correct version of Unity. <CurrentUnityVersion/> is also available in the [Unity editor release archive](https://unity.com/releases/editor/archive).

In the installation screen, choose "iOS Build Support" and "Android Build Support" if you'd like to be able to create worlds or avatars for iOS, Android, and Quest.

For instructions on how to upgrade from Unity 2019, [visit our Unity 2019 to 2022 documentation](/sdk/upgrade/unity-2022).

## October 2025 Unity Security Vulnerability Warning

In October of 2025, Unity [disclosed a vulnerability](https://unity.com/security/sept-2025-01) in standalone Unity applications built with unpatched versions of Unity. This is targeting developers shipping standalone Unity games or applications.

If Unity Hub warns you to upgrade your Unity version due to a known security issue, you can safely ignore the warning for VRChat World or Avatar projects.

The October 2025 vulnerability does not apply when using the Unity Editor to create content for VRChat. It is safe to remain on VRChat's supported version of the Unity editor (`2022.3.22f1`). Upgrading your version will result in content not loading once uploaded to VRChat - make sure to stay on our recommended version.

![Screenshot of the Unity Hub with text instructing the user to ignore the red warning triangle indicating security issues for the purpose of VRChat content.](/img/sdk/unity-sec-issue-warning-banner.png)


## Differences from previous versions

Unity 2022 includes many improvements such as faster iteration times, improved asset import times, *much* faster platform switching times, better editor stability, fully featured C# 8 support, a quick search feature, [and much more!](https://unity.com/releases/lts)


## Known Issues

* The first time you open a Scene and select a GameObject inside a prefab with a U# Behaviour, the GUI for the component directly below that U# Behaviour will not show its GUI. Deselecting and re-selecting the prefab fixes this.
* Buffer Particles don't work as they did in Unity 2019, [there is a workaround to fix them from community member hfcRed here](https://x.com/hfcRedddd/status/1696915379090604179).
* Unity 2022 sometimes causes Rider's debugger to stop for unhandled exceptions in Unity's IMGUI.
    * Please refer to [this workaround](https://forum.unity.com/threads/rider-debugger-breaks-on-unhandled-exception.1135879/#post-7305256) and [Jetbrains's bug tracker](https://youtrack.jetbrains.com/issue/RIDER-64944) for more information.
* Spatialized Audio Sources can create warnings when entering playmode or adjusting their settings.