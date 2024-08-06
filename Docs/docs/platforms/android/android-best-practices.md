---
sidebar_position: 1
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Mobile Best Practices

Making your VRChat worlds cross-platform is a great way of allowing more players to enjoy it. Most VRChat players are on Android, so it’s worth creating an Android of your VRChat world.

However, mobile players and VR players will experience your world quite differently! In this guide, we’ll explain a few ways to make your mobile VRChat world more comfortable and enjoyable.
:::info

VRChat is available on Android as an [open beta](https://play.google.com/store/apps/details?id=com.vrchat.mobile.playstore).

:::
## 1. Publish Your VRChat World to Android

To make your world accessible to more users, publish it on all platforms supported by VRChat.

Any worlds uploaded to Android are available on Oculus Quest and Android mobile devices. If you’ve previously published a Quest version of your world, it’ll be available on phones and tablets as well!

To learn how to upload your world to Android, please refer to our [cross-platform setup documentation](https://creators.vrchat.com/platforms/android/cross-platform-setup).

:::note

If you see the term ‘Quest’ in reference to the VRChat SDK, it generally applies to Android, too.

For example: Existing tools like [EasyQuestSwitch](https://vcc.docs.vrchat.com/vpm/curated-community-packages#easyquestswitch) are great for cross-platform development. A Meta Quest isn’t required!

:::

## 2. Detect Mobile Players in Your World Automatically

When an Android player joins your world, you may want to tweak certain aspects of it. Players on an Android mobile device won’t have access to VR controllers, just like VR players won’t have access to a touchscreen.

Use [OnInputMethodChanged](/worlds/udon/input-events/#oninputmethodchanged) to detect whenever the player's input method has changed. For example:

<Tabs groupId="udon-compiler-language">
<TabItem value="graph" label="Udon Graph">

![A screenshot of an Udon Graph. The OnInputMethodChanged event is used to branch the execution based on whether the inputMethod parameter is Touch.](/img/worlds/OnInputMethodChanged.png)

</TabItem>
<TabItem value="cs" label="UdonSharp">

```cs
public override void OnInputMethodChanged(VRCInputMethod inputMethod)  
{  
    if (inputMethod == VRCInputMethod.Touch)  
    {  
        // Run code for touch input  
    }  
    else  
    {  
        // Run code for non-touch input  
    }  
}
```

</TabItem>
</Tabs>

You can also use GetLastUsedInputMethod to detect the input method at any time. For example:

<Tabs groupId="udon-compiler-language">
<TabItem value="graph" label="Udon Graph">

![A screenshot of an Udon Graph. GetLastUsedInputMethod is used to branch the execution based on whether the inputMethod parameter is Touch.](/img/worlds/GetLastUsedInputMethod.png)

</TabItem>
<TabItem value="cs" label="UdonSharp">

```cs
if (VRC.SDKBase.InputManager.GetLastUsedInputMethod() == VRCInputMethod.Touch)  
{  
    // Run code for touch input
}  
else  
{  
    // Run code for non-touch input  
}
```

</TabItem>
</Tabs>

## 3. Optimize Your World for Android

Android devices are usually less powerful than PCs. Read our [Quest Content Optimization guide](https://creators.vrchat.com/platforms/android/quest-content-optimization/) to optimize your world’s performance.

Good news: If your world runs OK on the Quest, it will probably run well on Android mobile devices. Phones and tablets usually have a lower resolution than VR headsets, and performance issues will cause less nausea than in VR.

You should still ensure that Quest players have an acceptable frame rate.

## 4. Test Your World on Android

Testing your world on an Android phone will help you improve the experience of mobile players. Even if your world is still in the early stages of development, consider how it will play on a mobile device.

When rapidly iterating on VRChat worlds, it may be convenient to test them in the Unity Editor or the Steam version of VRChat. A joystick gamepad can be an appropriate substitute for VRChat’s mobile control screen.

- On a touchscreen, _virtual_ joysticks control the player’s movement and camera.
- Touchscreens make screen-space interfaces easier to interact with other input devices.
- Playtest your world with mobile players

## 5. Design Your User Interfaces for Touchscreen

Phone screens are different from PC and VR devices. You may want to adjust your user interfaces to make them easier for mobile users to read and interact with.

- Make text easy to read. Use legible fonts, large text sizes, and big buttons.
- Remove unnecessary text. Reading large amounts of text is difficult on a mobile device.
- Localize text. Mobile users user a much wider spectrum of languages than on other platforms.
- Avoid relying on interactions that require a VR device or complex camera movements.
- Try using [screen-space user interfaces](https://docs.unity3d.com/Packages/com.unity.ugui@2.0/manual/UICanvas.html). On a touchscreen, they are easier to interact with than world space canvases. Consider adding a user interface that users can open from anywhere without needing to walk over to an in-world menu panel.
- Use the `OnScreenUpdateEvent` to get the orientation and resolution of the player's screen. This will trigger once when they first load into the world, and whenever the orientation of their device changes.


## In Conclusion: Give Players a Smooth User Experience

When a player joins your world, try to make the experience as smooth as possible. Try to apply the other tips mentioned in this article, and think of how you could use them in your world.

- **Don't** reupload your PC world without optimizing your materials.
- **Do** optimize your world for users on Android and enhance their experience.

- **Don't** force players to follow complex steps before enjoying your world.
- **Do** make your world enjoyable automatically, without any user input.

- **Don't** upload your world without testing it.
- **Do** listen to user feedback.

---

Following these steps will help make your world an excellent experience for mobile players.

Do you have any tips or tricks you’d like us to include in this article? Submit your feedback below, and we’ll do our best to help share your knowledge with the VRChat Community.
