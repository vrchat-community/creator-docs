---
title: "Public SDK API"
slug: "public-sdk-api"
hidden: false
createdAt: "2023-08-18T21:01:07.855Z"
updatedAt: "2023-08-18T21:04:48.137Z"
---

VRChat SDK provides a set of Interfaces and methods you can use to enhance your World and Avatar build process.

> 🚧 While we're going to make our best effort to provide a stable API, it is still subject to change in the future. We recommend leveraging semver to define which version of the SDK your tools are compatible with, [learn more here](https://vcc.docs.vrchat.com/vpm/packages/#versions-and-ranges).

## Where to find the API

The majority of the public API is contained and documented inside `Public SDK API` folder in the SDK packages. E.g., "Packages/VRChat SDK - Avatars/Editor/VRCSDK/SDK3A/Public SDK API" for the avatars API.

Most of the events and methods are shared between the SDKs and are defined in the Base SDK Package.

## What is available

For the most up-to-date list of events and methods, we recommend looking at the interface definition files directly as per the section above.

But here is a short list of what is available:

- OnEnable/OnDisable events of the main SDK Panel
- Build Start/End/Success/Error events
- Upload Start/End/Success/Error events
- Build/Build & Test/Build & Upload methods

If you're currently using reflection to access the SDK internals, we recommend switching to the public API as soon as possible. As we might be changing/removing those APIs in the future.

## Usage Examples

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

SDK can throw a variety of exceptions during the build process, you can see the list of expected exceptions in the Interface definitions.
