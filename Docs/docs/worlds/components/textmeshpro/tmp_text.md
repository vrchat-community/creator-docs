# TMP Text
`TMP_Text` is the base class of two TextMesh Pro components:

- [`TextMeshProUGUI`](https://docs.unity3d.com/Packages/com.unity.textmeshpro@1.1/api/TMPro.TextMeshProUGUI.html) allows you to display text with a [canvas renderer](https://docs.unity3d.com/Packages/com.unity.ugui@2.0/manual/UICanvas.html).
	- This component is an ideal replacement for the UI.Text component.
	- Change the "Render Mode" of your canvas depending on how you want to display your text.
		- "World Space" allows you to place text anywhere in your world.
		- "Screen Space" allows you to display text directly on the user's screen.
- [`TextMeshPro`](https://docs.unity3d.com/Packages/com.unity.textmeshpro@1.1/api/TMPro.TextMeshPro.html) allows you to display text with a [mesh renderer](https://docs.unity3d.com/Manual/class-MeshRenderer.html).
	- This component does not require a canvas. It's an ideal replacement for the legacy TextMesh components.

# Properties
Use the `TMP_Text` base class to access these properties. Both `TextMeshProUGUI` and `TextMeshPro` inherit from `TMP_Text`.

| Property           | Type | Result |
|--------------------|------|--------|
| text               | String | Accesses the text.|
| isRightToLeftText  | Bool | Gets/sets if the text needs to be displayed right to left. Useful when implementing a variety of languages.|
| fontMaterial       | Material | Gets/sets the font material. Take note that accessing this field will clone the material.|
| fontSharedMaterial | Material | Gets/sets the shared font material. This returns null if this component's FontAsset is null.|
| color              | Color | Gets/sets the color of the text.|
| alpha              | Float | Gets/sets the opacity of the text.|
| fontSize           | Float | Gets/sets the size of the text.|
| enableAutoSizing   | Bool | Gets/sets if the text should try to size itself as big as possible and still be visible within the range of FontSizeMin and FontSizeMax.| 
| fontSizeMin        | Float | The minimum font size if AutoSizing is enabled.|
| fontSizeMax        | Float | The maximum font size if AutoSizing is enabled.|
| horizontalAlignment| HorizontalAlignmentOptions | How the text will be aligned horizontally.|
| verticalAlignment  | VerticalAlignmentOptions | How the text will be aligned vertically.|
| alignment          | TextAlignmentOptions | How the text will be aligned overall.|
| characterSpacing   | Float | The amount of space between characters.|
| wordSpacing        | Float | The amount of space between words.|
| lineSpacing        | Float | The amount of vertical space between text lines.|
| paragraphSpacing   | Float | The amount of vertical space between paragraphs.|
| characterWidthAdjustment| Float | The amount of overlap characters have.|
| enableWordWrapping | Bool | Controls whether words that exceed the available space will be put on a new line.|
| overflowMode       | TextOverflowModes | Controls how the text will be treated if it overflows its available space.|
| richText           | Bool | Gets/sets if [Rich Text](https://docs.unity3d.com/Packages/com.unity.textmeshpro@3.2/manual/RichText.html) is enabled.|
| parseCtrlCharacters| Bool | Enables or Disables parsing of escape characters typed into input text fields, such as `\n`, `\r`, `\t`, or `\\`. |
| firstVisibleCharacter | Int | The first character that should be made visible in conjunction with the Text Overflow Linked mode.|
| maxVisibleCharacters | Int | Controls how many characters are visible from the input.|
| maxVisibleWords    | Int | Controls how many words are visible from the input.|
| maxVisibleLines    | Int | Controls how many lines of text are displayed.|
| enable             | bool | Enables/disables the attached component. |

