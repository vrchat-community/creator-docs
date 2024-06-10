# TextMesh Pro

[TextMesh Pro](https://docs.unity3d.com/Packages/com.unity.textmeshpro@4.0/manual/index.html) is a tool for displaying high-quality 2D and 3D text in Unity and VRChat worlds. Currently, the following components are exposed to Udon:

- [TMP Text](./tmp_text) (TextMeshProUGUI and TextMeshPro)
- [TMP Dropdown](./tmp_dropdown)
- [TMP InputField](./tmp_inputfield)

You can also user other TextMeshPro components from VRChat's [allowlisted world components](/worlds/whitelisted-world-components#text-mesh-pro), but they aren't available in Udon. 

:::caution

Avoid using Unity's built-in [text components](https://docs.unity3d.com/2018.1/Documentation/ScriptReference/UI.Text.html).

- Unity's built-in text causes aliasing and is limited to 16250 characters.
- TextMesh Pro has better text rendering, [rich text](http://digitalnativestudios.com/textmeshpro/docs/rich-text/), and doesn't have a character limit.

:::

## Installation

The TextMesh Pro package is included in the Unity editor. When you use it for the first time in a project, Unity will prompt you to add essential files to your "Assets" folder. 
For example, creating any TMP component will show the following prompt:

![TextMesh Pro prompt for importing essential assets.](/img/worlds/components/textmeshpro-essentials.png)

TextMesh Pro's assets can also be imported by selecting "Window" > "TextMeshPro" > "Import TMP Essential Resources".

## Importing fonts

TextMesh Pro includes a default font called "LiberationSans SDF." This allows you to get started with TextMesh Pro right away.

You can import your own font into TextMesh Pro with the [font asset creator](https://docs.unity3d.com/Packages/com.unity.textmeshpro@4.0/manual/FontAssetsCreator.html). This generated a font asset that you can use in your TextMesh Pro components.

<div class="video-container">
    <iframe src="https://www.youtube.com/embed/qzJNIGCFFtY?si=JsAJMtzdp3KC-8tJ" title="TextMesh Pro - Font Asset Creation" frameborder="0" allow="encrypted-media; gyroscope; web-share" allowfullscreen></iframe>
</div>

:::tip Optimize your font assets!

Font assets increase the download size and RAM requirements of your world. When importing fonts, reduce your atlas resolution and don't import unused characters.

:::

## Using VRChat's built-in fallback font

When you [import a font](https://docs.unity3d.com/Packages/com.unity.textmeshpro@4.0/manual/FontAssetsCreator.html) into TextMeshPro, it usually won't include every Unicode character. If your world contains strings or user names that aren't in your font asset, TextMeshPro won't be able to render them. For example, instead of "何？！", you may see "□□□".

To use VRChat's TextMeshPro Fallback fonts, go to "Project Settings" > "TextMeshPro settings" remove all "Fallback Font Assets."

This allows your TextMeshPro components to use VRChat's fallback fonts. When you visit your world in VRChat, almost all Unicode characters are rendered correctly.

![When configured correctly, missing Unicode characters will appear as boxes in the Unity editor, but appear correctly after uploading your world to VRChat.](/img/worlds/components/textmeshpro-editor-vs-fallback-vrchat.png)

## See also

- [TextMeshPro documentation](https://docs.unity3d.com/Packages/com.unity.textmeshpro@4.0/api/TMPro.html) (Unity scripting API)
- [Text in Unity - Working with TextMesh Pro](https://learn.microsoft.com/en-us/windows/mixed-reality/develop/unity/text-in-unity) (Microsoft Learn)