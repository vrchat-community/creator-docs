# Expression Menu and Controls

:::caution Unity Knowledge Required

This document is written with the assumption that you know a bit about [Unity Animators](https://docs.unity3d.com/2019.4/Documentation/Manual/class-AnimatorController.html).

:::

## Creating an Expression Menu

1. Right-click in your Assets folder and select `Create/VRC Scriptable Objects/Expressions Menu`
2. Open your expressions menu to customize it. (See step 13)

Before you continue, you'll need to create an **ExpressionParameters** asset, where you can define all of the avatar's custom parameters.

![What expression parameters look like by default.](/img/avatars/animator-parameters/params-default.png)

3. Right-click in your Assets folder and select **Create > VRC Scriptable Objects > Expression Parameters**.
4. Select the expression parameters asset to customize it.

    - The asset contains [three parameters by default](https://creators.vrchat.com/avatars/animator-parameters/#default-av3-aliasing) (`VRCEmote`, `VRCFaceBlendH`, `VRCFaceBlendV`). You can safely delete them unless you use them in your avatar or don't want to create your own expression menu.
5. Enter the names of your parameters.
    - These names should match the parameters in your animators.
    - You can categorize your parameters by using `/`. For example, `Clothing/Hoodie` and `Clothing/Hat`.
    - VRChat has a few [built-in parameters](https://creators.vrchat.com/avatars/animator-parameters/#parameters). You can always use them in animators - don't add them to your own expression parameters.
6. Choose a type for each parameter.

    - `Int` has a range of 0-255.
    - `Float` has a range of -1.0 to 1.0.
    - `Bool` is either true or false.
7. Change the `Default` value to set the default value of each parameter. When the avatar is reset, the parameter will revert to this value.
8. Enable `Saved` for parameters that shouldn't reset themselves whenever the avatar is loaded. If your avatar has customization options or settings, `Saved` will prevent them from being reset after switching to a different world or avatar.
9. Enable `Synced` if the state of this parameter should be sent to all other players over the network.

Next, you should add both assets to your avatar descriptor.

![What expression parameters look like by default.](/img/avatars/animator-parameters/avatar-descriptor-params.png)

10. Select your avatar descriptor and scroll down to the "Expressions" section.
11. Change the "Menu" property to your expressions menu.
12. Change the "Parameters" property to your expression parameters.

After adding both assets to your avatar descriptor, all your expression parameters will now be available in the expression menu, allowing you to customize it.

![What expression parameters look like by default.](/img/avatars/animator-parameters/menu-default.png)

13. In the inspector, click "Add Control." Up to 8 controls can be added to a single menu.
14. Choose a name and [type](/avatars/expression-menu-and-controls#types-of-controls). 
15. You can also add icons, and submenus, or change the order of the controls here.
  - You can find some default icons in `VRCSDK/Assets3/Expression Menu Icons/` .

### Types of Controls

* **Button** - Sets a parameter when clicked, then resets after the sync/reset has been sent-- usually after about a second. Cannot be held down.
* **Toggle** - Sets a parameter when the toggle is on, resets when the toggle is turned off
* **Sub-Menu** - Opens another Expression Menu.  Additionally it may also set a parameter when entered, if so that parameter is reset to zero when you exit that menu. 
  * **Important note:** You can put sub-menus into sub-menus!
* **Two Axis Puppet** - Opens an axis puppet menu that controls two float parameters depending on the joystick position. The parameters are mapped to vertical and horizontal. The float values range from -1.0 to 1.0.
* **Four Axis Puppet** - Opens an axis puppet menu that controls four float parameters depending on the joystick position.  The parameters are mapped in order, up, right, down, left. The float values are 0.0 to 1.0.
* **Radial Puppet** - Open a radial puppet menu that controls a single float parameter, kind of like a progress bar that you can fill! The float value is 0.0 to 1.0.

:::note Puppet Menu Sync

The **Puppet** controls use [**IK Sync**](/avatars/animator-parameters#sync-types) when open. If you want sync that is as close as possible to your inputs for fast/quick movements, you should use a Puppet menu.

**Button**/**Toggle** uses **Playable Sync** which updates on-demand, instead of continuously, and is appropriate for things you "turn on/off" but don't need highly precise syncing.

Puppet menu sync always updates at the maximum rate available, and it smooths the values for remote users - much better when timed replication is important.

:::

Puppet controls may also set a parameter when entering the menu. 

If you use Joystick press to exit, then the parameters being puppeted will remain as their value until you change them again-- either by re-entering a puppet menu that uses those params, or using them elsewhere.
