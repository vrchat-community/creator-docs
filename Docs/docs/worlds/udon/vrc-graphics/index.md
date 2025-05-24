import UnityVersionedLink from '@site/src/components/UnityVersionedLink.js';

# VRCGraphics

Udon has access to a variety of Unity's graphics functions.

## Types

### VRCShader

Overarching class for global shader setters. See [functions documented below](#vrcshaderpropertytoid) for more.

### VRCGraphics

Exposes a subset of Unity’s built-in \`Graphics\` class. See documented functions for more.

## Exposed Functions

### VRCGraphics.Blit()

Copies source texture into destination RenderTexture with a shader. Note that we do not allow you to supply a null destination.

See <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/ScriptReference/Graphics.Blit.html">Graphics.Blit</UnityVersionedLink>.

Check out the [Minimap Example](/worlds/examples/minimap) to learn more about how to use VRCGraphics.Blit().

![Minimap Example World](/img/worlds/examples/minimap-example-world.png)

#### Meta Quest Exceptions

VRCGraphics.Blit will not work on the Quest GPU unless you:

Add ZTest Always to the shader
OR
Turn off the depth on the target RenderTexture.

Failing to do so will cause the operation to fail.

### VRCGraphics.DrawMeshInstanced()

Draw the same mesh multiple times using GPU instancing.

See <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/ScriptReference/Graphics.DrawMeshInstanced.html">Graphics.DrawMeshInstanced</UnityVersionedLink>.

### VRCShader.PropertyToID()

Use PropertyToID to get an ID based on a shader property name. Call this function only once during initialization, the ID can be reused and will not change, even between different materials and shaders.

Note that the property name must be prefixed with “\_Udon”, or be the literal string “\_AudioTexture” in order to be used with VRCShader.SetGlobal, however, will still return the ID regardless of this.

See <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/ScriptReference/Shader.PropertyToID.html">Shader.PropertyToID</UnityVersionedLink>.

### VRCShader.SetGlobal()

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