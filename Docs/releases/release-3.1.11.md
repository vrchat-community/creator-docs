---
slug: release-3-1-11
date: 2023-02-16
title: Release 3.1.11
authors: [momo]
tags: [release]
draft: false
---
Starting with this version, we will no longer be releasing the legacy `.unitypackage` files that extract into your `Assets` folder. This page will serve as a changelog for the SDK moving forward!

### Summary

Adds Remote String Loading, Remote Image Loading, MIDI Playback, and Simulation Time!

<!--truncate-->

### New Features

* Udon can now [load remote images](https://docs.vrchat.com/docs/image-loading). Closes [this Canny](https://feedback.vrchat.com/feature-requests/p/hey-when-will-dynamic-image-be-implemented)
* Udon can now [load remote strings](https://docs.vrchat.com/docs/string-loading). Closes [this Canny](https://feedback.vrchat.com/vrchat-udon-closed-alpha-feedback/p/vrchat-udon-web-api)
* Udon can [play back MIDI data](https://docs.vrchat.com/docs/midi-playback) in time with audio.
* Udon can now access the simulation time of [Players](https://docs.vrchat.com/docs/players#simulationtime) and [GameObjects with networking](https://docs.vrchat.com/docs/network-components#networking-properties).
* OnDeserialization now contains DeserializationResult [DeserializationResult](https://docs.vrchat.com/docs/network-components#ondeserializationdeserializationresult).

### Bug Fixes
![UdonBehaviour Inspector With Warning](https://user-images.githubusercontent.com/737888/218818072-92616039-c135-4c6c-86f0-02195bddffcd.png)
* The Unity Inspector for UdonBehaviours will now detect missing `VRCUrlInputField` variables and offer to reload the SDK in case this component did not load correctly. Closes [this Canny](https://feedback.vrchat.com/sdk-bug-reports/p/vrc-url-input-field-component-missing-from-project-randomly). (This is a known issue, will be fixed when we can upgrade to Unity 2020 or newer.)
* Fixes duplication of FX layer in Avatar Descriptor when switching rig from generic to humanoid.
* Fixes issue where Unity gets stuck infinitely reloading assemblies.
* Clamps the number of clients you can Build & Test from the SDK Window to a minimum of 0 and a maximum of 8.

### Other Changes

* Adds `MidiPlaybackExampleScene.scene` and related assets to demonstrate Midi Playback.
* Adds a simple Remote Image Loader to the `UdonExampleScene.scene`.
* Speeds up loading of Udon Programs.
* Removes old SDK updater window.

### Known Issues

* If you change the midi track in a Midi Player while the visualizer is open, the visualizer doesn’t update to the new track until it is closed and then reopened.