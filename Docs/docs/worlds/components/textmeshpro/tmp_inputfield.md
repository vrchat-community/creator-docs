# TMP InputField
[`TMP_InputField`](https://docs.unity3d.com/Packages/com.unity.textmeshpro@4.0/api/TMPro.TMP_InputField.html) is an editable text input field. It should always be used instead of Unity's legacy `UI.InputField` component.
## Properties

| Property | Type | Description |
|----------|------|-------------|
| text | string | Gets or sets the value of the input field. |
| isFocused | bool | Gets a value indicating whether the input field currently has focus and is able to process UI events. This field is read-only. |
| readOnly | bool | Gets or sets a value indicating whether the value of the input field is read-only. |
| richText | bool | Gets or sets a value indicating whether rich text editing is allowed. |
| enable| bool | Enables/disables the attached component. |

## Methods

| Function | Input | Output | Description|
|----------|-------|--------|------------|
| SetTextWithoutNotify | string | void | Sets the value of the input field without invoking `onValueChanged`. |
