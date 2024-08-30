# VRC Ui Shape

The VRC Ui Shape component allows you to create [Canvas](https://docs.unity3d.com/Manual/UICanvas.html) components that players can interact with.

- Players can point, click, or scroll your UIs to interact with them, similar to the VRChat menu.
- Players can interface from a distance. This often makes them easier to use than [Interact](/worlds/examples/udon/#interact) events.

![Two examples UIs: A "Toggle Mirror" setting with a checkbox, and a page indicator with a "Previous" and "Next" button.](/img/worlds/components/VRC_UiShape.png)

VRC Ui Shape only has one configurable parameter:

| Parameter        | Description                                                                                         |
| ---------------- | --------------------------------------------------------------------------------------------------- |
| Allow Focus View | Whether this canvas should allow users to enter [Focus View](#focus-view) if they're playing on a phone or tablet. |

## How to set up your Canvas

When you right-click your hierarchy window and click "UI" -> "TextMeshPro (VRC)", the SDK automatically sets up your Canvas. The SDK automatically configures your Canvas and adds other required components.

![Two examples UIs: A "Toggle Mirror" setting with a checkbox, and a page indicator with a "Previous" and "Next" button.](/img/worlds/components/vrc-ui-components.png)

If you want to configure a Canvas manually, follow the steps below. Otherwise, your Canvas may not work in VRChat.

1. Add a [Canvas](https://docs.unity3d.com/Packages/com.unity.ugui@1.0/manual/class-Canvas.html) component to your GameObject, or create a new GameObject.
    - Unity automatically adds other helpful components to your Canvas.
2. Add a "VRC_UIShape" component to the same GameObject as your Canvas.
3. Change the GameObject's layer from "UI" to "Default" or another layer.
	- The UI layer would prevent users from interacting with your UI unless the VRChat menu is open.
4. Reduce the GameObject's `x`, `y`, and `z` scale.
	- By default, the scale is 1, which is too large. (1 pixel = 1 meter)
	- Reduce the scale to something like `0.01`. (1 pixel = 0.01 meters) 
5. Change the Canvas's "Render Mode" property from "Screen Space" to "World Space".
	- World Space Canvases are shown inside your world instead of directly on your screen. 
6. Add UI elements to the Canvas.
	- For example, you can add text, buttons, toggles, scroll views, input fields, and more.
	- Set the "Navigation" property to of your UI elements to "None". This prevents players from accidently using the UI while moving in your world.
	- Use TextMeshPro instead of Unity's built-in components for higher text quality.

If you follow these steps, players can interact with your UI by clicking on it.

## Common problems

If your Canvas is not configured correctly, players may be unable to interact with it. Here's how you can fix common issues:

### If you have a canvas that does not make the VRChat pointer show up:

* **The canvas must have a** `VRC_UIShape` **component on it.** Make sure that you didn't place it on some other child object.
* **The layer of the Canvas cannot be UI.** Setting the canvas and all it's children to default will work.
* **The object with the** `VRC_UIShape` **must have a box collider.** If there is none, one will be added automatically after the world is uploaded. However if you have added a collider yourself, you must make sure that it is the correct size.
* **Make sure you do not have some other collider blocking the canvas.** 

### If the pointer shows up but the UI is not responsive:
* **The scene must have an EventSystem.** This is added automatically when you make the canvas, so don't delete it.
* **Make sure that interact-able elements are not covered by invisible elements.** This often happens when a text box overlaps and covers a button. There's a few solutions: You can rearrange the button so it is on top (lower in the hierarchy), you can resize the text so that it does not cover the button, or you can set the text's `raycast target` to `false`.
* **Make sure that the UI you are trying to interact with has an image with `Raycast Target` enabled.** This is auto-generated if you create UI elements with the right-click menu in the hierarchy.
* **Make sure that the canvas has the `Graphic Raycaster` component.** This component is automatically added to your GameObject when you add a Canvas component.
* **Make sure that you are looking at the canvas from the correct side. The Z-forward axis of the canvas should be facing _away_ from you.

### If the UI is responsive but does not do what you expect it to do:

* Some UI events get removed in VRChat for security reasons. Make sure that the events you are trying to use are on [this list](/worlds/udon/ui-events)
* If you are using `SendCustomEvent`, make sure to type the event exactly the same both in the UI button and in the UdonBehaviour's `event custom` node
* If you are using `SendCustomEvent` to an UdonSharp behaviour, the event must be set to public. If it is set to private, it will not work.
* If something is wrong with an UdonBehaviour, it might halt which will stop it from doing anything. See [this documentation](/worlds/udon/debugging-udon-projects#finding-udon-errors) for more details

### If the UI is moving when you move, press a key, or move a joystick:

* Set `Navigation` to `None` on all UI elements.
- Set `Scroll Sensitivity` to `0` if your UI has a scroll bar.
### If you'd like a TextField not to show VRChat's keyboard:

* Add the `VRCInputFieldKeyboardOverride` component to prevent VRChat's keyboard from appearing.

## Focus view

VRChat's "Focus View" feature allows users to expand, pan, and zoom your world's UI on their phone or tablet. This makes it easier for them to read and interact with small text on their screen.

<div class="video-container">
    <video src="https://assets.vrchat.com/videos/docs/focusViewDemo.mp4" title="Focus View demo" muted autoplay controls></video>
</div>


Your canvas must meet the following conditions for Focus View to be available: 

- The canvas is configured correctly and has a [`VRC_UIShape`](https://creators.vrchat.com/worlds/components/vrc_uishape) component. 
- The `VRC_UIShape` component's "Allow Focus View" parameter is enabled.
- You have not disabled Focus View in your world's settings on VRChat.com.

In addition, users in your world must meet the following conditions:

- The user is playing VRChat on a phone or tablet.
- The user is using the touchscreen as their only input device.
- The user has not disabled Focus View in their VRChat settings.
- The user is less than 3-6 meters away from the canvas (depending on the canvas's size)
- The user is more than 0.6-2 meters away from the canvas (depending on the canvas's size)

While a user is in focus view:
- The user's nameplate displays a focus view icon that's visible to other players.
- Users stay in focus view until they manually close it.