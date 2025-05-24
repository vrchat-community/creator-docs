# Per-Platform Avatar Overrides

Per-platform overrides allow you to configure different versions of your [cross-platform](/platforms/android/cross-platform-setup) avatar for multiple platforms. When you build & publish your avatar to more than one platform, the SDK automatically uploads different versions of your avatar to each selected platform under the same avatar ID.

Per-platform overrides make it easy to upload an optimized version of your avatar for Android and a fully featured version of your avatar for PC.

:::note

You can manually upload different versions of your avatar for different platforms by performing multiple uploads without changing the avatar ID. However, this is more cumbersome and time-consuming than cross-platform overrides.

:::

# Setup

To set up per-platform overrides, follow these steps:

1. Set up all the versions of the avatar you want to use in the same scene.
2. Switch to the Builder tab in the SDK.
3. Select the avatar you want to use as a base for the overrides. This will be the avatar you select in the Builder panel of the SDK to click "Multi-Platform Build & Publish"
4. Click the `⋮` button next to the "Selected Avatar" dropdown.

![Options Menu](/img/avatars/per-platform-avatar-overrides/options-menu.png)

5. In the popup that appears, press "Add per-platform override".
6. Select the platform for the override, then select the avatar to use for that platform.

![Per-Platform Overrides](/img/avatars/per-platform-avatar-overrides/per-platform-override.png)

- Repeat the process for all the platforms for which you want to set up overrides.
- The changes are saved automatically, so you can proceed with a multi-platform build & publish.

After setting up per-platform overrides, the SDK will build and upload the "override" version of the avatar for each platform when you do a multi-platform build.

After the overrides are set up - you will also see a new component added to the root of the avatar object called "VRC Per Platform Overrides". This component has the same functionality as the per-platform overrides in the Builder panel, however, we encourage you to use the Builder panel for setting up the overrides. This component is primarily intended for viewing existing overrides and for use in community-made tools.

## Editor Tooling

If you want to create an editor tool that can query the per-platform overrides for an avatar, use the following method:

```cs
using VRC.SDK3A.Editor;

//...

PerPlatformOverrides.GetPlatformOverrides(myAvatarGameObject);
```

It will either return a `List<PerPlatformOverrides.Option>` or `null` if no overrides are set up.

You can also setup the overrides yourself using the following method:

```cs
using VRC.SDK3A.Editor;

//...

PerPlatformOverrides.SetPlatformOverrides(myAvatarGameObject, new List<PerPlatformOverrides.Option> {
    new PerPlatformOverrides.Option {
        platform = BuildTarget.Android,
        avatar = myAndroidAvatarDescriptor
    }
});
```

This will automatically add the override component to the avatar if it doesn't already exist.

The per-platform overrides are currently only set up on the "main" avatar object. So you would generally want to scan every object with a `VRC_AvatarDescriptor` on it for presence of the overrides to get the full picture.
