---
title: "VRCGraphics"

sidebar_position: 2
createdAt: "2022-10-27T00:44:59.293Z"
updatedAt: "2023-02-14T13:45:29.978Z"
---
# Types

## VRCShader

Overarching class for global shader setters. See [functions documented below](#vrcshaderpropertytoid) for more.

## VRCGraphics

Exposes a subset of Unity’s built-in \`Graphics\` class. See documented functions for more.

# Exposed Functions

## VRCGraphics.Blit()

Copies source texture into destination RenderTexture with a shader. Note that we do not allow you to supply a null destination.

See: https://docs.unity3d.com/2019.4/Documentation/ScriptReference/Graphics.Blit.html

### Minimap Example
The version of the SDK installed by [the Creator Companion](https://vcc.docs.vrchat.com) includes an example scene that provides a performant Minimap as an example use of Graphics.Blit. You can open it from the Unity Menu Bar under VRChat SDK > Samples > Minimap. This example uses the Udon Graph, it's also available as [an UdonSharp example](https://assets.vrchat.com/sdkExamples/com.vrchat-examples.minimap-1.0.0.unitypackage).

![index-aecb84d-minimap-example.png](/img/worlds/index-aecb84d-minimap-example.png)

### Meta Quest Exceptions

VRCGraphics.Blit will not work on the Quest GPU unless you:

Add ZTest Always to the shader
OR
Turn off the depth on the target RenderTexture.

Failing to do so will cause the operation to fail.

## VRCGraphics.DrawMeshInstanced()

Draw the same mesh multiple times using GPU instancing.

See: https://docs.unity3d.com/2019.4/Documentation/ScriptReference/Graphics.DrawMeshInstanced.html

## VRCShader.PropertyToID()

Use PropertyToID to get an ID based on a shader property name. Call this function only once during initialization, the ID can be reused and will not change, even between different materials and shaders.

Note that the property name must be prefixed with “\_Udon”, or be the literal string “\_AudioTexture” in order to be used with VRCShader.SetGlobal, however, will still return the ID regardless of this.

See: https://docs.unity3d.com/2019.4/Documentation/ScriptReference/Shader.PropertyToID.html

## VRCShader.SetGlobal\*()

Use the ID acquired with PropertyToID as a key and specify a value of the correct type. The value will be available in _all_ shaders in the world (including ones on avatars!) under the name passed into PropertyToID.

Available variants:

  * VRCShader.SetGlobalColor()
  * VRCShader.SetGlobalFloat()
  * VRCShader.SetGlobalFloatArray()
  * VRCShader.SetGlobalInteger() still sets the value as `float` for now, due to a Unity bug
  * VRCShader.SetGlobalMatrix()
  * VRCShader.SetGlobalMatrixArray()
  * VRCShader.SetGlobalTexture()
  * VRCShader.SetGlobalVector()
  * VRCShader.SetGlobalVectorArray()