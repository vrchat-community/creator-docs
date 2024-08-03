import UnityVersionedLink from '@site/src/components/UnityVersionedLink.js';

# Expressions Menu and Controls

:::tip
You need basic knowledge about <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/class-AnimatorController.html">Unity Animators</UnityVersionedLink> to use expression parameters in your avatar's animators.
:::

You can control your avatar's animators in VRChat with an Expressions Menu. This allows you to play animations or change your avatar's appearance with VRChat's radial menu.

To use the Expressions Menu in VRChat, you need to create (at least) two assets:

- One (or more) Expressions Menu asset
- One Expression Parameters asset

After creating and configuring these assets, make sure to add them to your avatar descriptor in the "Expressions" section.

## Creating an Expressions Menu

1. Create an **Expressions Menu asset** by selecting `Assets > Create > VRChat > Avatars > Expressions Menu`.

![The default view of the Avatar Expressions Menu.](/img/avatars/expression-menu/default-expressions.png)

2. Create an **Expression Parameters asset** by selecting your Expressions Menu asset and clicking the "Create" button. This allows you to create custom parameters for your Expressions Menu. 
	- When you click "Create", the Expression Parameters asset is automatically assigned to your Expressions Menu asset.
	- You can also create an Expression Parameters asset by selecting `Assets > Create > VRChat > Avatars > Expression Parameters`.
    - Expression Parameters have an option to copy parameters from of an `Animator` to creator your parameters quickly.

![What expression parameters look like by default.](/img/avatars/expression-menu/default-parameters.png)


3. Select the Expression Parameters asset to customize it.
    - The asset contains [three parameters by default](https://creators.vrchat.com/avatars/animator-parameters/#default-av3-aliasing): `VRCEmote`, `VRCFaceBlendH`, and `VRCFaceBlendV`. You can safely delete them unless you use them in your avatar or don't want to create your own Expression menu.
    - Your animators always have access to VRChat's [built-in parameters](/avatars/animator-parameters). For example, you shouldn't add the "AFK" or "GestureLeft" parameters to your Expression Parameters asset.
4. Enter the names of your custom parameters.
    - These names should match the parameters in your animators.
    - You can categorize your parameters by using `/`. For example, `Clothing/Hoodie` and `Clothing/Hat`.
    - VRChat has a few [built-in parameters](https://creators.vrchat.com/avatars/animator-parameters/#parameters).
    You can always use them in animators - don't add them to your own Expression Parameters.
5. Choose a type for each parameter. The type should match your [Animator's Parameter type](https://docs.unity3d.com/Manual/AnimationParameters.html).
	- `Int` can be any whole number between 0 and 255.
	- `Float` can be any number between -1.0 and 1.0.
	- `Bool` can be either `true` or `false`.
6. Select the `Default` value to set the default value of each parameter.
	- When the avatar is reset, the parameter will revert to this value.
7. Enable `Saved` for parameters that shouldn't reset themselves whenever the avatar is loaded. If your avatar has customization options or settings, `Saved` will prevent them from being reset after switching to a different world or avatar.
8. Enable `Synced` if the state of this parameter should be sent to all other players over the network.

Next, you should add both assets to your avatar descriptor.

![What expression parameters look like by default.](/img/avatars/expression-menu/avatar-descriptor-params.png)

9. Select your avatar descriptor and scroll down to the "Expressions" section.
10. Change the "Menu" property to your expressions menu.
11. Change the "Parameters" property to your expression parameters.

After adding both assets to your avatar descriptor, all your expression parameters will now be available in the expression menu, allowing you to customize it.

![What expression parameters look like by default.](/img/avatars/expression-menu/populated-menu.png)

12. In the inspector, click "Add Control." Up to 8 controls can be added to a single menu.
13. Choose a name and [type](/avatars/expression-menu-and-controls#types-of-controls). 
14. You can also add icons, and submenus, or change the order of the controls here.
  - You can find some default icons in `VRCSDK/Assets3/Expression Menu Icons/` .

## Types of Controls

The Expressions Menu supports different types of controls. Choose the type that's most suitable for your use case.

| Type             | Description                                                                                                                                                                                     |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Button           | Sets a parameter when clicked, then resets after the sync/reset has been sent-- usually after about a second. Cannot be held down.                                                              |
| Toggle           | Sets a parameter when the toggle is on, resets when the toggle is turned off.                                                                                                                   |
| Sub-Menu         | Opens another Expression Menu.  Additionally it may also set a parameter when entered, if so that parameter is reset to zero when you exit that menu. You can put sub-menus into sub-menus!     |
| Two-Axis Puppet  | Opens an axis puppet menu that controls two float parameters depending on the joystick position. The parameters are mapped to vertical and horizontal. The float values range from -1.0 to 1.0. |
| Four-Axis Puppet | Opens an axis puppet menu that controls four float parameters depending on the joystick position.  The parameters are mapped in order, up, right, down, left. The float values are 0.0 to 1.0.  |
| Radial Puppet    | Open a radial puppet menu that controls a single float parameter, kind of like a progress bar that you can fill! The float value is 0.0 to 1.0.                                                 |

Controls of the "Puppet" type have two special features:
- The "Parameter" property is optional for puppet controls. If you use it, it will be set while the puppet control is open. This allows your animators to detect whether the puppet control is currently open.
- When you exit a puppet control in VRChat, it keeps the "Parameter Horizontal/Vertical/Radial" value (until you re-open the control or change the value elsewhere). This allows you to navigate your radial menu while "freezing" the puppet control in any state.

### Puppet menu sync

The **Puppet** controls use [**IK Sync**](/avatars/animator-parameters#sync-types) when open. If you want sync that is as close as possible to your inputs for fast/quick movements, you should use a Puppet menu.

**Button**/**Toggle** uses **Playable Sync** which updates on-demand, instead of continuously, and is appropriate for things you "turn on/off" but don't need highly precise syncing.

Puppet menu sync always updates at the maximum rate available, and it smooths the values for remote users - much better when timed replication is important.


