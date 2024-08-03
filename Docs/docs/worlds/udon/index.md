---
sidebar_position: 1
---
# Udon

You can use Udon to allow players to interact with your world! Use scripts created by other players, or create your own games, prefabs, and more. 

Read the [Getting Started with Udon](/worlds/udon/getting-started-with-udon) page to learn more.
## What is Udon?
**VRChat Udon** is a programming language[^1] built completely in-house by the VRChat Development Team. It is designed to be secure, performant, and easy to use.

You can create your own behaviors, sync variables with others, interact with scenes, interact with players, and more. In addition, Udon runs in both the VRChat client *and* the Unity Editor, allowing you to test and debug your creations with ease.

There are two main ways to use Udon:
- You can use the [Udon Node Graph](/worlds/udon/graph) to create Udon programs with a graphical interface.
	- The Udon Graph is built into the VRChat Worlds SDK. It's a visual programming interface that uses nodes and wires (we call them “noodles”) to connect flow, inputs, and outputs.
	- This is a lot like Unity animators, Blender shaders or geometry nodes, Unreal blueprints, and many other similar methods. It's a great starting point-- but also, some people just prefer nodes over code!
- If you do prefer code, you can  write Udon using [UdonSharp](https://udonsharp.docs.vrchat.com/)!
	- UdonSharp is a way to write Udon in a way very similar to C#. If you're already familiar with programming, U# might be the easiest way forward for you!
	- VRChat does not support Unity's traditional MonoBehaviours. If you want to use C# in your VRChat worlds, use UdonSharp.

## Bug Reports and Feature Requests
We use Canny across all of VRChat to receive reports of bugs and feature requests. For Udon specifically, use these links:
* [Bugs](https://feedback.vrchat.com/vrchat-udon-closed-alpha-bugs)
* [Feature Requests](https://feedback.vrchat.com/vrchat-udon-closed-alpha-feedback)

[^1]: For the more technically inclined: **VRChat Udon** is a VM running bytecode compiled from **Udon Assembly**. You can generate **Udon Assembly** using the built-in **VRChat Udon Node Graph** UI, writing your own **Udon Assembly**, or even by writing your own compiler to generate **Udon Assembly** or bytecode programs directly.