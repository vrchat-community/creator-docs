---
title: "Expression Menu and Controls"
slug: "expression-menu-and-controls"
hidden: false
createdAt: "2020-08-05T22:34:37.899Z"
updatedAt: "2022-11-08T23:54:49.666Z"
---
:::caution Unity Knowledge Required

This document is written with the assumption that you know a bit about [Unity Animators](https://docs.unity3d.com/2019.4/Documentation/Manual/class-AnimatorController.html).

:::

## Creating An Expression Menu

1. Right-click in the Unity project, select `Create/VRC Scriptable Objects/Expressions Menu`
2. Select the new object in the project

You'll also need to create a ExpressionParameters object, where you can define all of the custom parameters you're using. You can name them here, as well as define their type. You create one the same way as above:

3. Right-click in the Unity project, select `Create/VRC Scriptable Objects/Expression Parameters`
4. Select the new object in the project.
5. Set up your custom parameters with names and types. `Int` has a range of 0-255, Float has a range of -1.0 to 1.0. You can access your parameters with your custom names to make organization easier.

After this, you'll need to go back to your Expressions Menu.

6. In the inspector click "Add Control".  Up to 8 controls can be added to a menu.
7. You can also name states, add icons, and change the order of the controls here.
8. When complete, drag this object to the "Expressions Menu" property in the Avatar Descriptor.
9. Drag your Expressions Parameters object to the "Expressions Parameters" property in the Avatar Descriptor.

FYI: we've included some default icons you can use in `VRCSDK/Assets3/Expression Menu Icons/` .

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