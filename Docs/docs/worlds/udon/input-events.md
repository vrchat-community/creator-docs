# Input Events

You can read the input of a Player's controller in a unified way across all platforms by using Udon Input Events. These events will work correctly even when the player has remapped their controls. 

There are currently two types of events - Button and Axis, which include boolean and float values. Each event also holds a special [UdonInputEventArgs ](/worlds/udon/input-events#UdonInputEventArgs) object.
## Button Events
Button events include a *bool* value which is **true** when the button is pressed and **false** when it is released. 

### InputJump
Spacebar on Desktop, typically a face button on controllers.

### InputUse
Left-Click on Desktop, typically a trigger button on controllers.

### InputGrab
Left-Click on Desktop, typically a grip button on VR controllers.

### InputDrop
Right-Click on Desktop, press grip button on Vive Wands and some Windows Mixed Reality Controllers, release grip button on others.

## Axis Events
Axis events have a **float** value which typically ranges between -1 and 1. When using a controller with analog sticks, a new event will be triggered for each change in value, from 0 to 0.1, then to 0.2, etc. Desktop users will output whole numbers: -1, 0, 1, etc.

### InputMoveHorizontal
A and D on Desktop, typically the left stick/pad moving left and right on controllers.

### InputMoveVertical
W and S on Desktop, typically the left stick/pad moving up and down on controllers.

### InputLookVertical
Moving the mouse up and down on Desktop, typically the right stick up and down on gamepad and VR controllers.

### InputLookHorizontal
Moving the mouse left and right on Desktop, turning left and right using the right stick/pad without Comfort Turning on VR controllers, typically the right stick left and right on gamepad controllers.

## UdonInputEventArgs
This object is included in every input event, and holds additional data for the event which may be useful. We may add more data into this object in the future, let us know if you think of something handy you'd like to reference here. For now, it includes:

- **UdonInputEventType**: BUTTON or AXIS
- **boolValue**: True/False if this is a button event, false if it's an axis event (default value)
- **floatValue**: Number between -1 and 1 for an axis event, 0 if it's a button event (default value)
- **handType**: LEFT or RIGHT. Included for keyboard and mouse users as well (mouse is RIGHT, keyboard is LEFT).

## OnInputMethodChanged
This event fires whenever a user switches input methods, like from Keyboard to Mouse, Controller, or Touchscreen. It includes a [VRCInputMethod](/worlds/udon/graph/type-nodes/#vrcsdkbasevrcinputmethod) enum as its parameter.

:::note Ambiguous Vive input names 

- `VRCInputMethod.Vive` is a Vive controller running through SteamVR.
- `VRCInputMethod.ViveXr` is a Vive XR Elite Controller running via OpenXR.

:::

## Unity Input Methods and Properties

Udon can access some methods and properties from the [`UnityEngine.Input`](https://docs.unity3d.com/ScriptReference/Input.html) namespace. They provide detailed information about user input.

The following methods and properties are available in Udon: 
- [`Input.anyKey`](https://docs.unity3d.com/ScriptReference/Input-anyKey.html), [`Input.anyKeyDown`](https://docs.unity3d.com/ScriptReference/Input-anyKeyDown.html)
- [`Input.inputString`](https://docs.unity3d.com/ScriptReference/Input-inputString.html)
- [`Input.imeIsSelected`](https://docs.unity3d.com/ScriptReference/Input-imeIsSelected.html)
- [`Input.GetAxis()`](https://docs.unity3d.com/ScriptReference/Input.GetAxis.html), [`Input.GetAxisRaw()`](https://docs.unity3d.com/ScriptReference/Input.GetAxisRaw.html)
- [`Input.GetButton()`](https://docs.unity3d.com/ScriptReference/Input.GetButton.html), [`Input.GetButtonDown()`](https://docs.unity3d.com/ScriptReference/Input.GetButtonDown.html), [`Input.GetButtonUp()`](https://docs.unity3d.com/ScriptReference/Input.GetButtonUp.html)
- [`Input.GetMouseButton()`](https://docs.unity3d.com/ScriptReference/Input.GetMouseButton.html), [`Input.GetMouseButtonDown()`](https://docs.unity3d.com/ScriptReference/Input.GetMouseButtonDown.html), [`Input.GetMouseButtonUp()`](https://docs.unity3d.com/ScriptReference/Input.GetMouseButtonUp.html)
- [`Input.GetJoystickNames()`](https://docs.unity3d.com/ScriptReference/Input.GetJoystickNames.html)
- [`Input.GetKey()`](https://docs.unity3d.com/ScriptReference/Input.GetKey.html), [`Input.GetKeyUp()`](https://docs.unity3d.com/ScriptReference/Input.GetKeyUp.html), [`Input.GetKeyDown()`](https://docs.unity3d.com/ScriptReference/Input.GetKeyDown.html)

:::note Menus block Unity input

Udon can't detect Unity input while any of the following VRChat menus are open:
- Any text input popup
- Main menu
- Quick menu (Desktop or mobile only)

While the user's VRChat menu is open, `UnityEngine.Input` releases all held inputs. For example: If you hold a key and open VRChat's menu, `GetKeyUp()` returns true, even though you're still holding the key. Likewise, if hold the key and close the menu, `GetKeyDown()` returns `true`.

:::
