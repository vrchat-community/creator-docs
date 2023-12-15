---
title: "Public SDK API"
slug: "public-sdk-api"
hidden: false
createdAt: "2023-08-18T21:01:07.855Z"
updatedAt: "2023-08-18T21:04:48.137Z"
---

The VRChat SDK provides a set of interfaces and methods you can use to enhance your world and avatar build process. 

You can find the **Public SDK API** folder in both SDKs:

- For worlds: Packages/VRChat SDK - Worlds/Editor/VRCSDK/SDK3/Public SDK API
- For avatars: Packages/VRChat SDK - Avatars/Editor/VRCSDK/SDK3A/Public SDK API

However, most of the events and methods are shared between both the world and avatar SDKs and are defined in the **Base SDK Package**: `Packages/VRChat SDK - Base > Editor/VRCSDK/Dependencies/VRChat/Public SDK API`.

Other methods marked as `[PublicAPI]` are also be a part of Public SDK API. E.g., "Packages/VRChat SDK - Base/Editor/VRCSDK/Dependencies/VRChat/API/VRCApi.cs" for updating description of contents.

:::note

These types are in assembly definitions that are auto referenced. If you are writing code in your own project, the types will usually be available by default. If you're writing a redistributable package and have your own assembly definition, you will need to add the appropriate assembly definition references:

For avatars: `VRC.SDK3A.Editor`  
For worlds: `VRC.SDK3.Editor`  
For both: `VRC.SDKBase.Editor`

:::

# What's available?

For the most up-to-date list of events and methods, we recommend looking at the files directly mentioned above.

But here is a short list of what is available:

- OnEnable/OnDisable events of the main SDK Panel
- Build Start/End events
- Upload Success/Error events
- Build, Build and Test, and Build and Upload methods

:::note
If you run into exceptions during the build process, you can view the list of expected exceptions in the Interface definitions.
:::
## Examples

### Getting an instance of a builder

Connecting to `OnSdkPanelEnable` will ensure that the SDK window was opened and the builders were registered. You can then use `TryGetBuilder` to get an instance of the builder you need.

> You can call `VRCSdkControlPanel.TryGetBuilder` at any point in time, but it will return false if the SDK window is not open or the builder you're trying to access is not available.

```cs
[InitializeOnLoadMethod]
public static void RegisterSDKCallback()
{
    VRCSdkControlPanel.OnSdkPanelEnable += AddBuildHook;
}

private IVRCSdkAvatarBuilderApi _builder;

private static void AddBuildHook(object sender, EventArgs e)
{
    VRCSdkControlPanel.TryGetBuilder<IVRCSdkAvatarBuilderApi>(out _builder);
}
```

### Running code before the build

`OnSdkBuildStart` runs right before the SDK kicks off the build process, but after validations and Build Request Callbacks have passed.

```cs
[InitializeOnLoadMethod]
public static void RegisterSDKCallback()
{
    VRCSdkControlPanel.OnSdkPanelEnable += AddBuildHook;
}

private static void AddBuildHook(object sender, EventArgs e)
{
    if (VRCSdkControlPanel.TryGetBuilder<IVRCSdkAvatarBuilderApi>(out var builder))
    {
        builder.OnSdkBuildStart += OnBuildStarted;
    }
}

private static void OnBuildStarted(object sender, object target)
{
    Debug.Log("Building " + ((GameObject) target).name);
}
```

### Building from script

```cs
[MenuItem("My Tools/Build Selected Avatar")]
public static async void BuildSelectedAvatar()
{
    var avatar = Selection.activeGameObject;
    if (!VRCSdkControlPanel.TryGetBuilder<IVRCSdkAvatarBuilderApi>(out var builder)) return;
    try {
      await builder.BuildAndTest(avatar);
    } catch (Exception e) {
      Debug.LogError(e.Message);
    }
}
```
## Heads up
:::caution
If you're currently using reflection to access the SDK internals, we recommend switching to the public API as soon as possible.
:::
We're going to make our best effort to provide a stable API, but it's still subject to change in the future. We recommend leveraging semver to define which version of the SDK your tools are compatible with. [Learn more here](https://vcc.docs.vrchat.com/vpm/packages/#versions-and-ranges).

