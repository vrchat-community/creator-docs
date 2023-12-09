---
slug: release-3-5-0
date: 2023-12-08
title: Release 3.5.0
authors: [momo]
tags: [release]
draft: false
---
## Summary

This is the first SDK that works with Unity 2022!

<!--truncate-->

## Notes on Usage

You will need to update your Creator Companion to version 2.2.0 in order to manage the 2022-based Unity Editor and make 2022-compatible projects. You can check your current version by clicking on "Settings" and looking in the upper-right corner.

## New Features

* There is a new "Default VRChat Scene" that you can choose when making a new scene which has all the basics needed for a VRChat World.
* `OnScreenUpdateEvent` is a new event triggered in Udon when a player visits on a mobile device. It contains information about the Orientation and Resolution of the screen when they first enter the world, and whenever the Orientation of their device changes. 

## Changes

* Switches from .NET Framework 4.x to .NET Standard 2.1.
* Restores UdonSharp Samples, now  listed under World Samples.
* Restores UdonSharp and ClientSim legacyFiles.

## Known Issues

* The first time you open a Scene and select a GameObject inside a prefab with a U# Behaviour, the GUI for the component directly below that U# Behaviour will not show its GUI. Deselecting and re-selecting the prefab fixes this.
* Buffer Particles don't work as they did in Unity 2019, [there is a workaround to fix them from community member hfcRed here](https://x.com/hfcRedddd/status/1696915379090604179).
* The Editor may crash when updating a shader graph reference by another shader using UsePass. This is an issue with Unity 2022.3.6f1 and is fixed in 2022.3.14f1.
* Unity 2022 sometimes causes Rider's debugger to stop for unhandled exceptions in Unity's IMGUI.
	* Please refer to [this workaround](https://forum.unity.com/threads/rider-debugger-breaks-on-unhandled-exception.1135879/#post-7305256) and [Jetbrains's bug tracker](https://youtrack.jetbrains.com/issue/RIDER-64944) for more information.
* Spatialized Audio Sources can create warnings when entering playmode or adjusting their settings.