---
title: "World Creation, Optimization, and Community Labs Tips"
slug: "submitting-a-world-to-be-made-public"
sidebar_position: -1
hidden: false
createdAt: "2018-12-29T00:05:06.003Z"
updatedAt: "2023-04-21T14:54:14.165Z"
---
Want to make your world public? You've come to the right place! You need to submit your world to **Community Labs**.

There are a few things you should take into consideration before submitting your world to Community Labs. **Make sure you read all of this!** Failure to do so may result in your world being taken down, or never leaving Community Labs.

You can submit your world to Community Labs on VRChat.com (Edit World Info -> Danger Zone -> World Visibility -> Publish) or whenever you upload a new version in Unity.

Publishing your world will make it immediately available to all users that opt-in for Community Labs. Eventually, your world will go public and become accessible to all users outside Community Labs! [Read more about Labs here.](https://docs.vrchat.com/docs/vrchat-community-labs)

## Important Info

- **You can only submit one world per user per seven days to Community Labs.** 
- **You can update your world as often as you like.** Just push an update! It won't change the status of your world.
- **If your world is already Public, you don't need to re-submit the world if you update it.** It should update automatically and you will not lose your Public status.
- If your world or any content in the world (videos, avatars, images) violates the VRChat Terms of Service or the Community Guidelines, your ability to submit worlds to Community Labs will be suspended for a period of time. Repeated suspensions may result in in-app moderation action.
- **Content Warnings are deprecated and not used at this time.** You cannot upload content to VRChat that violates our [Community Guidelines](https://vrchat.com/community-guidelines) or [Terms of Service](https://vrchat.com/legal). Doing so (even if you have checked off a content warning) will result in moderation action.
- We do not approve worlds via Discord DMs, emails to VRChat, or any other channel.
- If your world is _very large in filesize_, we may ask you to reduce the size of the world and remove it from Public in the meantime. **Try to keep your worlds under 200MB.**

## Avatar Worlds / All Avatar Pedestals in any World

- **Avatars on pedestals are expected to be "reasonably optimized."** Check out our [Avatar Optimization Docs](/avatars/avatar-optimizing-tips) for more details.  
  Avoid sharing very poor avatars. This applies to all worlds, not just avatar worlds. If avatars in your world have severe performance issues, your world may be removed from Public or Community Labs.
- **If you upload a world with placeholder avatars and replace them with TOS-violating avatars after being made public, you will be suspended from submitting worlds for a month. You may be moderated in-app, depending on the offense severity.**
- **If you have an avatar world, none of your avatars may violate TOS/Community Guidelines.**
- Look into using [Cat's Blender Plugin](https://github.com/absolute-quantum/cats-blender-plugin) and Shotariya's Texture Combiner addons for Blender to optimize your models. 

## Performance Tips

- **Aim for at least 45 FPS with a single VR user at the spawn.** If you do not have VR, have a friend test the world for you. Having a badly performing world will mean people don't spend time in your world, and you probably won't make it out of Labs very easily.
- **Don't use shaders that are not VR-compatible.**Shaders must support single-pass stereo rendering. If you are looking for a good water shader, [check out Silent's Water Shader](https://gitlab.com/s-ilent/clear-water).
- **Use mobile shaders on Android.** Most shaders will _work_ on Android but usually take more processing power to render. Stick to mobile shaders if you can.
- **Be very careful with post-processing effects.** Some screen-space post-processing effects cause major issues for VR users. In particular, be careful with chromatic aberration, screen-space reflection, and screen-space ambient occlusion. 
- **Bad things happen when you put more than 2 video players in a room.** It usually impacts performance negatively.
- **Bad things also happen when you put more than 1 mirror in your room.**  Mirrors severely affect a world's performance. If you have 1 mirror in the room, make sure to set it to toggle.
- **We** **_STRONGLY SUGGEST_** **not enabling mirrors by default.** Add a toggle that can be activated by players or activated automatically when players enter a certain area.
- **Do NOT overuse real-time lights.** They are **very** expensive and can kill your world's performance if used incorrectly.
- **Baking your lighting is exceedingly important and can give you huge performance gains.** 

## General Tips

- Test your world! It isn't uncommon for us to see worlds where you immediately drop out of the portal forever.
- Test your world in VR, as well. Check to ensure your shaders are working properly and display properly in VR. If you don't have a VR headset, ask a friend to take a look around.
- **_TEST YOUR LIGHTING!_** Lighting a world is very important and doing it properly is wildly important. Don't just test using Toon shaders as they do not represent lighting properly, use Standard or a PBR shader to see how lighting affects it. If you look blown-out, you probably have too many lights, your intensity is too high, or you need to look into using Tonemapping.
- Want to make your world private again?  Edit your world on the website and you can set it to Private.
- Avoid directly using `.blend` files. Exporting FBX files from Blender for use in VRChat usually causes fewer issues.

If you have any questions about the process, [visit our forum](https://ask.vrchat.com/c/worlds/27) or email hello@vrchat.com with your question.  If you run an event or have a highly trafficked world in the app and need a world made public at a different time, please reach out to us via email at least 48 hours in advance.

## Submitting to Community Labs

Once you've read everything above, submit your new world to Community Labs! If you're curious about how Community Labs works, check out our [VRChat Community Labs](https://docs.vrchat.com/docs/vrchat-community-labs) documentation.

## Becoming a Game or Avatar World

If you want your world to be categorized as an Avatar World or Game World, just add the appropriate tag during upload.

> 🚧 Don't Abuse The World Rows
> 
> These rules are in place to give **all** worlds a chance to be discovered. Utilizing "SEO-like" techniques is not permitted and will result in actions such as tag removal, or in repeated/worse cases, moderation of the author.
> 
> VRChat reserves the right to action users that abuse our systems to unfairly or misleadingly promote their own content.

### Avatar Worlds

**An Avatar World is a world where gaining and sharing avatars is the** **_primary focus._** Finding an avatar in worlds tagged as Avatar Worlds should be quick and easy, and should not be an afterthought or "addition" to another clearly primary functionality of the world.

To categorize your world as an avatar world, add the tag `avatar`.

### Game Worlds

**A Game World is a world where playing a game or set of games is the** **_primary focus._** Playing games in worlds tagged as Game Worlds should be quick and easy, and should not be an afterthought or "addition" to another clearly primary functionality of the world.

To categorize your world as a game world, add the tag `game`.