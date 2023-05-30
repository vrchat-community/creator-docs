---
title: "Build Pipeline Callbacks and Interfaces"
slug: "build-pipeline-callbacks-and-interfaces"
hidden: false
createdAt: "2023-04-11T21:01:07.855Z"
updatedAt: "2023-04-11T21:04:48.137Z"
---
VRChat SDK contains multiple interfaces that can be used via Editor Scripts to enhance the World and Avatar build process.

## For Scene Components

The interfaces outlined below can be used in combination with `MonoBehaviours` and as such - be placed on scene objects directly, which can be useful in a situation where you need to hold some specific scene references to perform your modifications.

### IEditorOnly

`VRC.SDKBase.IEditorOnly`

The interface has no members to implement.

You can use `IEditorOnly` to mark a script Editor-only for the SDK Validation. This will make it so the SDK ignores it when scanning your World or Avatar for incompatible scripts.

### IPreprocessCallbackBehaviour

`VRC.SDKBase.IPreprocessCallbackBehaviour`

Members to implement

```csharp
public void OnPreprocess()
{
}

public int PreprocessOrder { get; }
```

This interface allows you to execute custom code when the build process is about to begin. This can be useful if you need to perform modifications before content gets built and uploaded to VRChat.

> 🚧 Note that this does not automatically bypass the SDK validation. You should also use `IEditorOnly` if your scripts exist directly on the avatar you're uploading

## For Project-Wide Scripts

These interfaces are suited for anything that does not rely on particular scene objects and performs bulk modifications to the scene/avatar before it gets uploaded to VRChat.

### IVRCSDKBuildRequestedCallback

`VRC.SDKBase.Editor.BuildPipeline.IVRCSDKBuildRequestedCallback`

Members to implement

```csharp
    public int callbackOrder => 0;

    public bool OnBuildRequested(VRCSDKRequestedBuildType requestedBuildType)
    {
        return true;
    }
```



Where `VRCSDKRequestedBuildType` is an enum of the following shape

```csharp
public enum VRCSDKRequestedBuildType
{
    Avatar,
    Scene,
}
```



This interface allows you to perform some logic before the VRChat SDK starts building the content. 

`OnBuildRequested` can also abort the build by returning `false`.