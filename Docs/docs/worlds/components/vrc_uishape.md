---
title: "VRC Ui Shape"
slug: "vrc_uishape"
excerpt: "Allows players to interact with Unity UI in your world"
hidden: false
createdAt: "2017-07-07T19:34:10.176Z"
updatedAt: "2023-01-31T17:09:17.157Z"
---
Make Unity's UI interactable in VRChat. Requires a Unity [UICanvas](https://docs.unity3d.com/Manual/UICanvas.html) element on the same GameObject.

## Steps to making an Interact-able UI with VRC_UiShape

1. Add a Canvas using the right-click menu in your hierarchy.
2. Add a `VRC_UIShape` component to the Canvas.
3. Set the Canvas Render Mode to World Space.
4. Reduce the `x`, `y`, and `z` scale of the Canvas. Usually somewhere between `0.001` and `0.005` will work well. This is the size in meters of a single pixel on the canvas.
5. Set the Canvas GameObject layer to Default
6. Add your UI elements to the Canvas using the right-click menu in the hierarchy
7. Set your UI elements to `Navigation: None` to prevent the UI from moving when pressing keys or moving joysticks.

## Common problems

### If you have a canvas that does not make the VRChat pointer show up:

* **The canvas must have a** `VRC_UIShape` **component on it.** Make sure that you didn't place it on some other child object.
* **The layer of the Canvas cannot be UI.** Setting the canvas and all it's children to default will work.
* **The object with the** `VRC_UIShape` **must have a box collider.** If there is none, one will be added automatically after the world is uploaded. However if you have added a collider yourself, you must make sure that it is the correct size.
* **Make sure you do not have some other collider blocking the canvas.** 

### If the pointer shows up but the UI is not responsive:
* **The scene must have an EventSystem.** This is added automatically when you make the canvas, so don't delete it.
* **Make sure that interact-able elements are not covered by invisible elements.** This often happens when a text box overlaps and covers a button. There's a few solutions: You can rearrange the button so it is on top (lower in the hierarchy), you can resize the text so that it does not cover the button, or you can set the text's `raycast target` to `false`.
* **Make sure that the UI you are trying to interact with has an image with `Raycast Target` enabled.** This is auto-generated if you create UI elements with the right-click menu in the hierarchy.
* **Make sure that the canvas has the `Graphic Raycaster` and `Canvas Scaler` components.** These are auto-generated if you create the canvas with the right-click menu in the hierarchy.

### If the UI is responsive but does not do what you expect it to do:

* Some UI events get removed in VRChat for security reasons. Make sure that the events you are trying to use are on [this list](/worlds/udon/ui-events)
* If you are using `SendCustomEvent`, make sure to type the event exactly the same both in the UI button and in the UdonBehaviour's `event custom` node
* If you are using `SendCustomEvent` to an UdonSharp behaviour, the event must be set to public. If it is set to private, it will not work.
* If something is wrong with an UdonBehaviour, it might halt which will stop it from doing anything. See [this documentation](/worlds/udon/debugging-udon-projects#finding-udon-errors) for more details

### If the UI is moving when you move, press a key, or move a joystick:

* Set** `Navigation: None` **on all UI elements.

### If you'd like a TextField not to show VRChat's keyboard:

* Add the `VRCInputFieldKeyboardOverride` component to prevent VRChat's keyboard from appearing.