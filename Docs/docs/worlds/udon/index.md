---
sidebar_position: 1
---
# Udon

Udon allows players to interact with your world in interesting ways! Use scripts written by other creators, or create your own games, prefabs, and other experiences.

## What is Udon?

Udon is a programming language[^1] for VRChat worlds. Scripts can interact with scene objects, [players](./players), [synced networked variables](./networking), and more. Udon makes your world come to life!

Udon runs in both VRChat *and* the Unity Editor. You can test and debug your scripts without needing to build and upload your VRChat world. You can also use [Udon's debugging features](debugging-udon-projects).

After you [create your VRChat world](/sdk/), there are two main ways to create Udon scripts:
- The [Udon Node Graph](./graph) is a visual programming interface that uses nodes and wires to connect flow, inputs, and outputs.
	- The Graph is similar to Unity animators, Blender shaders, geometry nodes, or Unreal blueprints.
	- The Graph is unique to the VRChat SDK does not require any third-party tools.
	- Use the Graph if you're very new to programming or only want to create very simple scripts.
- [UdonSharp](./udonsharp) allows you to use C# to create scripts.
	- UdonSharp is similar to Unity's built-in C# scripting system.
	- Most UdonSharp users use an [IDE](https://en.wikipedia.org/wiki/Integrated_development_environment). [Visual Studio](https://visualstudio.microsoft.com/vs/unity-tools/) is free, and [Rider](https://www.jetbrains.com/rider/) is free for non-commercial use.
	- Use UdonSharp if you're already familiar with programming or want to create powerful scripts.


And if you're an expert user:

- You can write your own compiler to generate Udon Assembly code.
	- VRChat Udon is technically a [virtual machine](https://en.wikipedia.org/wiki/Virtual_machine) running bytecode compiled from Udon Assembly.
	- You *can* write Udon Assembly code manually, though this is extremely uncommon.

## Bug Reports and Feature Requests
To submit bug reports or feature requests, use VRChat's [Canny feedback board](https://vrchat.canny.io/udon).

[^1]: For the more technically inclined: **VRChat Udon** is a VM running bytecode compiled from **Udon Assembly**. You can generate **Udon Assembly** using the built-in **VRChat Udon Node Graph** UI, writing your own **Udon Assembly**, or even by writing your own compiler to generate **Udon Assembly** or bytecode programs directly.

