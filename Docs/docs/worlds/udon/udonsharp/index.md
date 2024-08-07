---
sidebar_position: -1
---
# UdonSharp

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

UdonSharp allows you to create Udon scripts in C#. UdonSharp is included in the VRChat worlds SDK and compiles your C# to Udon Assembly code.

- Add helpful [attributes](./attributes) to extend the functionality of your UdonSharp scripts. 
- Open the [class exposure tree](./class-exposure-tree) to see which C# classes and methods are available in UdonSharp.
- Change your [configuration](./configuration) to disable auto-compilation or change other settings.
- Learn how to write [custom editor scripts](./editorscripting).
- Learn how to [migrate](./migration) projects that use very old versions of UdonSharp.

## How to create an UdonSharp script

You can create an UdonSharp script the project window or the hierarchy window by following the steps below.

### In the Project window
1. Right-click in your project's asset explorer.
2. Navigate to "Create" > "U# script".
3. Click "U# script". This will open a file creation dialog.
4. Choose a name for your script and click "Save".
5. This will create a `.cs` script file and an UdonSharp program asset that's set up for the script in the same directory.
### In the Hierarchy window
1. Create a new game object in your scene.
2. Add an `Udon Behaviour` component to the object.
3. Below the "New Program" button click the dropdown and select "Udon C# Program Asset".
4. Now click the "New Program" button. This will create a new UdonSharp program asset for you.
5. Click the "Create Script" button and choose a save destination and name for the script.

When you create a new UdonSharp script, you end up with two files:
- An "UdonSharp Program Asset" file. (You don't need to edit this file after creating it.)
- A `.cs` file. It has the class `UdonSharpBehaviour` and looks like this:

<Tabs>
<TabItem value="cs" label="UdonSharp">

```cs
using UdonSharp;
using UnityEngine;
using VRC.SDKBase;
using VRC.Udon;

public class YourScriptName : UdonSharpBehaviour
{
    void Start()
    {
        
    }
}
```

</TabItem>
</Tabs>

Edit the UdonSharpBehaviour in your editor of choice and start programming. You can add the UdonSharpBehaviour to any GameObject in your scene.



## Supported C# Features

UdonSharp support most of C#'s basic syntax:

- Flow control: `if`, `else`, `while`, `for`, `do`, `foreach`, `switch`, `return`, `break`, `continue`, `ternary operator (condition ? true : false)`, `??`
- Implicit and explicit type conversions
- Arrays and array indexers
- All built-in arithmetic operators
- Conditional short circuiting `(true || CheckIfTrue())` will not execute `CheckIfTrue()`
- `typeof()`
- Extern methods with `out` or `ref` parameters, such as many variants of `Physics.Raycast()`
- User defined methods with parameters and return values, supports out/ref, extension methods, and `params`
- User defined properties
- Static user methods
- UdonSharpBehaviour inheritence, virtual methods, etc
- Unity/Udon event callbacks with arguments. For instance, registering an `OnPlayerJoined` event with a `VRCPlayerApi` argument is valid.
- String interpolation
- Field initializers
- Jagged arrays
- Referencing other custom UdonSharpBehaviour classes, accessing fields, and calling methods on them
- Recursive method calls are supported via the `[RecursiveMethod]` attribute

## Differences from Unity/C# Features

UdonSharp is not conformant to any version of the C# language specification. Some C# features are not implemented or will not work.

- For the best experience when creating UdonSharp scripts, make your scripts inherit from `UdonSharpBehaviour` instead of `MonoBehaviour`.
- If you need to call `GetComponent<UdonBehaviour>()`, you will need to use `(UdonBehaviour)GetComponent(typeof(UdonBehaviour))` since the generic get component is not exposed for UdonBehaviours yet. `GetComponent<T>()` works for other Unity component types though.
- Udon currently only supports array `[]` collections. By extension, UdonSharp only supports arrays at the moment. `List<T>` is not supported yet.
- Field initializers are evaluated at compile time. If you have any initialization logic that depends on other objects in the scene you should use `Start`.
- Use the `[UdonSynced]` attribute on fields that you want to sync over the network for all players.
- Numeric casts are checked for overflow due to UdonVM limitations.
- The internal type of variables returned by `.GetType()` will not always match what you may expect since U# abstracts some types in order to make them work in Udon. For instance, any jagged array type will return a type of `object[]` instead of something like `int[][]` for a 2D `int` jagged array.


## Example scripts

### The rotating cube demo

This rotates the object that it's attached to by 90 degrees every second.

```cs
using UnityEngine;
using UdonSharp;

public class RotatingCubeBehaviour : UdonSharpBehaviour
{
    private void Update()
    {
        transform.Rotate(Vector3.up, 90f * Time.deltaTime);
    }
}
```

### Other examples

- The VRChat Worlds SDK contains UdonSharp examples in `Assets/UdonSharp/UtilityScripts`. 
	- These scripts can be safely deleted if they are not used.
- For more example scripts, take a look at the [GitHub wiki examples](https://github.com/vrchat-community/UdonSharp/wiki/examples) or the Examples folder included with U#.
- Visit the [VRChat Creator Hub](https://ask.vrchat.com/c/creator-hub/63/none) to speak to other creators and see their examples.

## Frequently asked questions

### Does UdonSharp support all Udon features?
Yes. If Udon supports it, then so does UdonSharp. You can check the [class exposure tree](https://github.com/Merlin-san/UdonSharp/wiki/class-exposure-tree) to see everything UdonSharp has access to.

### Can I access the player camera?
No, Udon can not access the player's camera. You can, however, get the head position and rotation. For example, you can use [VRCPlayerApi.GetTrackingData](https://github.com/Merlin-san/UdonSharp/wiki/vrchat-api#vrchatplayerapi) like this:
 
`var headPosition = localPlayer.GetTrackingData(TrackingData.Head).position`

### Can I have more than one UdonSharp UdonBehavior on a GameObject?
Yes.

### I'm starting from scratch and need to use C# tutorials. What common aspects of C# don't work in UdonSharp?
If you are learning UdonSharp and not familiar with C# already, you may run across some commonly used techniques that don't work in Udon and UdonSharp yet. These include, but are not limited to, the following:
- Generic classes (`Class<T>`) and generic non-static methods,
- Interfaces
- Method overloads
- Properties