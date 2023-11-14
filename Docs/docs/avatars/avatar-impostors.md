---
title: "Impostors"
slug: "avatar-impostors"
hidden: false
---

# Impostors
## What are Impostors
An impostor is your avatar's body double. It's what others will see when your avatar can't load for whatever reason, like if your avatar was uploaded for PC only but your friend is using a Quest. Typically, you'd show as a fallback avatar or robot, but creating an impostor will let you keep your unique style.

## Creating an Impostor
You can only generate impostors for avatars you [own and have uploaded](/avatars/creating-your-first-avatar), and impostors currently only support humanoid avatars.

To create your first impostor:

1. Log in to the VRChat website.

2. Navigate to "Avatars", then "My Avatars", then the name and icon of the avatar you'd like to make an impostor of.

3. Click "Generate Impostors", or, if the avatar already has an impostor that you'd like to be updated, "Regenerate Impostors".

4. Wait.

5. Refresh the page, after some time you should now see that your avatar has impostors for Quest and PC.

![image](/img/avatars/impostors/generation.png)

 You can toggle impostors on and off. When off, your fallback avatar will be shown instead.


## Previewing an Impostor
Once you've got your impostor generated, you're probably going to be pretty excited to see how it looks!

1. Log into VRChat.

2. Open the Avatar Menu via your Main Menu.

3. Click the avatar that you generated an impostor for.

4. You should notice that the "Features" of the avatar now includes "Impostor". 

![image](/img/avatars/impostors/features-row.png)

You should also see a new button underneath the avatar model preview, which will allow you to switch between previewing the impostor and the normal avatar.

**Note: Impostors that are previewed in this menu may exhibit some bugs not visible to other players.**

![image](/img/avatars/impostors/preview-avatar.png)
![image](/img/avatars/impostors/preview-impostor.png)

## Customizing an Impostor
Impostors come out pretty good by default, but complex avatars may benefit from some customization using the VRChat SDK.

To customize, simply add the VRCImpostorSettings Script to your avatar before uploading.

## VRCImpostorSettings

### Resolution Scale
Changes the amount of space on the impostors texture atlas that is dedicated to this body part's texture. 

For instance, you can place this script on the head bone and change this value to make the head take up more or less of the texture atlas, increasing or decreasing the overall texture quality. Note that this may shrink other parts of the body on the atlas it if needs to. 

_This is relative to the bone that VRCImpostorSettings is placed on._

### Transforms To Ignore
Ignores these transforms when capturing data for the impostor. This will hide them from the final result.

_This is independent of the bone that VRCImpostorSettings is placed on._

### Extra Child Transforms
This is good for things like wings and tails, as it will tell the impostor generator to make a separate sprite for the bone this script is on.

We don't recommend using this on smaller things like individual fingers as all sprites share a single texture sheet. Doing so would cause quality to decrease elsewhere.

_This is independent of the bone that VRCImpostorSettings is placed on._

### Re-parent Here
Re-parents another bone to this impostor sprite. This means that it will be impostorized with this body part, and be a part of that sprite.

For instance, if you'd like your wings to be a part of the upper body, you can re-parent the root wing bone to the chest bone during impostorization with this.

_This is relative to the bone that VRCImpostorSettings is placed on._

## When is an impostor visible?
Currently, there are only three ways to see an impostor:

- Avatar Preview

- Performance Blocking (e.g. avatar is very poor but you have performance limit set to medium)

- Platform Mistmatch (e.g. avatar is uploaded for PC, but you're on a Quest)

**Note: Impostor auto-generation and support for non-humanoid avatars is coming in the future!**