---
title: "Realtime Midi"
slug: "realtime-midi"
hidden: false
createdAt: "2023-02-16T02:10:03.798Z"
updatedAt: "2023-02-16T02:10:03.798Z"
---
# Realtime Midi

You can use MIDI devices to control your Udon world in realtime using MIDI Notes and controller changes.

## Components

To get started with Midi in your scene, add a **VRC Midi Listener** component to one of your GameObjects.

![VRCMidiListener](/img/worlds/realtime-midi-215557542-bf65a6ef-47d0-4e2f-8d39-337847db461c.png)

This component informs VRChat that you want to receive MIDI events and starts up the MIDI system if needed. **You need to select the events you want to receive** by pressing the 'Active Events' toggles to select them - no events are selected by default, so turn them on before you start testing. **You also need to choose an UdonBehaviour** that will receive these events by selecting it as the 'Behaviour' on the VRC Midi Listener. This UdonBehaviour can be on the same GameObject as the MIDI Listener, or any other object.

When you start your scene, you may notice a **VRCMidiHandler** GameObject that is added automatically. This handles the MIDI device driver and sends events to all the Listeners. DO NOT add this component anywhere yourself - it is meant to be automatically added and removed so that MIDI Devices are only connected to once, and disconnected when someone leaves your world.

## Device Selection - Editor

You can test your MIDI events in the Unity Editor by selecting your device through the VRChat SDK. It is saved in your Editor preferences, so Unity will remember your device for every project.

![Midi Utility Window](/img/worlds/realtime-midi-215557576-5414eb63-a857-4334-8a8c-05f3b6436773.png)

![Midi Utility Selector](/img/worlds/realtime-midi-215557616-8cc3fd99-0fe4-4564-9413-cc805708cf89.png)

## Device Selection - Runtime

When you visit a world with MIDI events, VRChat will try to open the first MIDI device it can find on your machine. If you have multiple devices and want to specify which one to use, you can pass part of its name as a command-line argument. For example, if you have a device that appears in Windows as "SchneebleCo MidiKeySmasher 89", you can add this to your launch options/script:
``--midi=midikeysmasher`
VRChat will match partial names and ignore capitalization. Learn about all other Launch Options: [Launch Options](https://docs.vrchat.com/docs/launch-options)

## Example Scene

You can download a demo scene that reads and displays all three message types here: [Demo Scene Download](https://www.dropbox.com/s/83zili4e8lkszu7/MidiCubeExample_v4.unitypackage)
You can visit the world here: [Udon Midi Test](https://vrchat.com/home/world/wrld_f8bc6485-dcdf-4646-89d8-14e4772561ee).