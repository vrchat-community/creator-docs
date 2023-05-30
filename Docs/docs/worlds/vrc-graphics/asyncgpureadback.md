---
title: "ASyncGPUReadback"
slug: "asyncgpureadback"
hidden: false
createdAt: "2023-04-26T00:51:17.446Z"
updatedAt: "2023-04-26T00:53:33.444Z"
---
AsyncGPUReadback in Unity is a feature that allows developers to copy data, such as a specific pixel's color, from textures on the GPU to code on the CPU. This function is similar to `Texture2D.GetPixels`except it does not block tasks on the main thread as it runs asynchronously.

By performing the data transfer asynchronously, Unity ensures that the process does not negatively affect the application's frame rate and overall performance. AsyncGPUReadback helps developers avoid stalling the rendering pipeline, as the data transfer occurs in the background, parallel to the main thread.

Common use cases for AsyncGPUReadback include generating CPU-side data based on the rendered output, such as creating a texture mipmap chain, implementing custom post-processing effects, or analyzing rendered frames for AI and computer vision purposes.

## Differences between Unity AsyncGpuReadback and VRCAsyncGpuReadback

VRChat's implementation of AsyncGpuReadback employs a wrapper that calls the Unity functions. This wrapper uses a different interface. The differences are as follows:

- Rather than calling AsyncGpuReadback, you need to use VRCAsyncGpuReadback.
- Rather than providing `Action<AsyncGPUReadbackRequest> callback`, you provide an UdonBehaviour, and then that UdonBehaviour will receive `OnAsyncGpuReadbackComplete` when the readback is complete.
- Rather than using `GetData` on the completed readback, you need to use `TryGetData`.

See Unity's documentation on this feature for other shared details:  
[Making a readback request](https://docs.unity3d.com/ScriptReference/Rendering.AsyncGPUReadback.Request.html)  
[Getting data from a readback](https://docs.unity3d.com/ScriptReference/Rendering.AsyncGPUReadbackRequest.html)

## Using VRCAsyncGpuReadback

When using VRCAsyncGpuReadback, there are 3 main steps that you need to follow:

1. Set up an array of data to be used.
2. Make the AsyncGpuReadback request
3. Receive the message when the request is complete
4. Get the data out of the request

## Udon Node Graph Example

![asyncgpureadback-mu8QGGS.png](/img/worlds/asyncgpureadback-mu8QGGS.png)

## UdonSharp Example

```csharp

using UdonSharp;
using UnityEngine;
using VRC.SDK3.Rendering;
using VRC.Udon.Common.Interfaces;
​
public class AGPURB : UdonSharpBehaviour
{
    public Texture texture;
​
    void Start()
    {
        VRCAsyncGPUReadback.Request(texture, 0, (IUdonEventReceiver)this);
    }
​
    public void OnAsyncGpuReadbackComplete(VRCAsyncGPUReadbackRequest request)
    {
        if (request.hasError)
        {
            Debug.LogError("GPU readback error!");
            return;
        }
        else
        {
            var px = new Color[texture.width * texture.height];
            Debug.Log("GPU readback success: " + request.TryGetData(px));
            Debug.Log("GPU readback data: " + px[0]);
        }
    }
}
```