# TMP Dropdown

[`TMP_Dropdown`](https://docs.unity3d.com/Packages/com.unity.textmeshpro@4.0/api/TMPro.TMP_Dropdown.html) is a standard dropdown that presents a list of options when clicked, of which one can be chosen. It should always be used instead of Unity's legacy `UI.Dropdown` component.

## Properties 

| Property | Type | Description |
|----------|------|-------------|
| value    | int  | Gets or sets the index of the selected element in the dropdown. |
| IsExpanded| bool | Gets a value indicating whether the dropdown is expanded. |
| enable| bool | Enables/disables the attached component |

## Methods

| Function              | Input        | Output | Description                                                                                                                                                                                                                                                           |
| --------------------- | ------------ | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SetValueWithoutNotify | int          | void   | Sets the value of the input field without invoking `onValueChanged`.                                                                                                                                                                                                  |
| RefreshShownValue     |              |        | Refreshes the text and image (if available) of the currently selected option.                                                                                                                                                                                         |
| ClearOptions          |              |        | Removes all options from the dropdown.                                                                                                                                                                                                                                |
| Show                  |              |        | Shows the dropdown. Plan for dropdown scrolling to ensure dropdown is contained within screen. [TMP assumes the Canvas is the screen that the dropdown must be kept inside.](https://docs.unity3d.com/Packages/com.unity.textmeshpro@2.0/api/TMPro.TMP_Dropdown.html) |
| Hide                  |              |        | Hides the dropdown list.                                                                                                                                                                                                                                              |

## Related classes

Udon has access to two additional classes related to TMP_Dropdown. 

### VRCTMPDropdownExtension
This class is part of the VRChat SDK. It allows you to add options to your dropdown.

| Function   | Input                           | Output | Description                                                                              |
| ---------- | ------------------------------- | ------ | ---------------------------------------------------------------------------------------- |
| AddOptions | TMP_Dropdown,<br/> string[]     |        | Adds the array of strings to the dropdown.                                               |
| AddOptions | TMP_Dropdown,<br/> sprite[]     |        | Adds the array of sprites to the dropdown.                                               |
| AddOptions | TMP_Dropdown,<br/> OptionData[] |        | Adds the array of [TMP_Dropdown.OptionData](tmp_dropdown#vrcoptiondata) to the dropdown. |

:::note Extension method
In UdonSharp, AddOptions is an [extension method](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/extension-methods).

Instead of `AddOptions(dropdown, options)`, you can type `dropdown.AddOptions(options)`. Make sure you have the namespace `VRC.SDK3.Components` included in the file.
:::
### TMP_Dropdown.OptionData
This is built into TextMesh Pro. It allows you to add a combination of strings and sprites to a dropdown. 

| Functions  | Input | Output | Description|
|------------|-------|--------|------------|
| Constructor| string |OptionData| Creates an OptionData object with text as the option. |
| Constructor| sprite|OptionData| Creates an OptionData object with a sprite as the option |
| Constructor| string, sprite |OptionData| Creates an OptionData object with text and a sprite as the option |

## How to add sprites to a dropdown

Dropdowns can display a different sprite for each option. You need to set up your dropdown correctly:

1. Add an image to the dropdown.

![Add an image to the dropdown hierarchy, moving the label out of the way - part 1](/img/worlds/components/VRC_DropdownAddLabelScene.png)
![part 2](/img/worlds/components/VRC_DropdownAddLabelHierarchie.png)

2. Add an image to the template.

![Add an image to the template hierarchy, moving the label out of the way - part 1](/img/worlds/components/VRC_DropdownAddLabelTemplateScene.png)
![part 2](/img/worlds/components/VRC_DropdownAddLabelTemplateHierarchie.png)

3. Add the correct references to `Caption Image` and `Item Image` fields in the dropdown.

![part 2](/img/worlds/components/VRC_DropdownAddLabelInspector.png)

4. Success! The dropdown can now display sprites.
