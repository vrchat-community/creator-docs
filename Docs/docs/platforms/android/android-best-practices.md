---
title: "Mobile Best Practices"
sidebar_position: 1
createdAt: "2023-06-08T20:00:00.157Z"
updatedAt: "2023-06-08T20:00:00.157Z"
---
Making your VRChat worlds cross-platform is a great way of allowing more players to enjoy it. Most VRChat players are on Android, so it’s worth creating an Android of your VRChat world.

However, smartphone players and VR players will experience your world quite differently! In this guide, we’ll explain a few ways to make your mobile VRChat world more comfortable and enjoyable.
:::info

VRChat is not available on Android _yet_.
It is scheduled to release later this year.

:::
## 1. Publish Your VRChat World to Android

It’s always a good idea to publish your world on PC and all other platforms supported by VRChat.

Any worlds uploaded to Android are available on the Oculus Quest 2 and Android phones. If you’ve previously published a Quest version of your world, it’ll be available on phones as well!

To learn how to upload your world to Android, please refer to our [cross-platform setup documentation](https://creators.vrchat.com/platforms/android/cross-platform-setup).

:::note

If you see the term ‘Quest’ in reference to the VRChat SDK, it generally applies to Android, too.

For example: Existing tools like [EasyQuestSwitch](https://vcc.docs.vrchat.com/vpm/curated-community-packages#easyquestswitch) are great for cross-platform development. A Meta Quest isn’t required!

:::

## 2. Detect Mobile Players in Your World Automatically

When an Android player joins your world, you may want to tweak certain aspects of it. Players on an Android phone won’t have access to VR controllers, just like VR players won’t have access to a touchscreen.

You can use [UdonSharp](https://udonsharp.docs.vrchat.com/) to detect Android players in your world:

```
public bool _IsUsingPhone()
{
  #if UNITY_ANDROID
  return !VRC.SDKBase.Networking.LocalPlayer.IsUserInVR();
  #endif
  return false;
}
```

Here’s how it works:

- Use [conditional compilation](https://docs.unity3d.com/Manual/PlatformDependentCompilation.html) to detect the current platform
- Use [Networking.LocalPlayer](https://creators.vrchat.com/worlds/udon/players/) to retrieve data about the local player
- Use [IsUserInVR](https://creators.vrchat.com/worlds/udon/players/#isuserinvr) to check if the local player is in VR.

If the local player is on Android, but not in VR, that mean that they’re playing on an Android phone.

We’re working on a way to easily detect platforms like this for both Udon Graph and UdonSharp.

## 3. Optimize Your World for Android

Android devices are usually less powerful than PCs. Read our [Quest Content Optimization guide](https://creators.vrchat.com/platforms/android/quest-content-optimization/) to optimize your world’s performance.

Good news: If your world runs OK on the Quest 2, it will probably run well on Android phones. Phones have a lower resolution than VR headsets, and performance issues will cause less nausea than in VR.

You should still ensure that Quest 2 players have an acceptable frame rate.

## 4. Test Your World on Android

Testing your world on an Android phone will help you improve the experience of mobile players. Even if your world is still in the early stages of development, consider how it will play on a mobile device.

When rapidly iterating on VRChat worlds, it may be convenient to test them in the Unity Editor or the Steam version of VRChat. A joystick gamepad can be an appropriate substitute for VRChat’s mobile control screen.

- On a touchscreen, _virtual_ joysticks control the player’s movement and camera.
- Touchscreens make screen-space interfaces easier to interact with other input devices.
- Playtest your world with mobile players

## 5. Design Your User Interfaces for Touchscreen

Phone screens are different from PC and VR devices. You may want to adjust your user interfaces to make them easier for mobile users to read and interact with.

- Text in your user interface should be easy to read. Use legible fonts, large text sizes, and big buttons.
- Avoid relying on interactions that require a VR device or complex camera movements.
- Try using [screen-space user interfaces](https://docs.unity3d.com/Packages/com.unity.ugui@2.0/manual/UICanvas.html). On a touchscreen, they are easier to interact with than world space canvases. Consider adding a user interface that users can open from anywhere without needing to walk over to an in-world menu panel.

---

Following these steps will make your world an excellent experience for mobile players.

Do you have any tips or tricks you’d like us to include in this article? Submit your feedback below, and we’ll do our best to help share your knowledge with the VRChat Community.
