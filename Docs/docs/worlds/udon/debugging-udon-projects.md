---
title: "Debugging Udon Projects"
slug: "debugging-udon-projects"
hidden: false
createdAt: "2020-08-29T21:52:15.830Z"
updatedAt: "2022-01-12T05:48:39.712Z"
---
# What is Debugging?
Debugging is how you learn about what's going on under the hood in the VRChat client and your world. It's a key skill to develop for programming in general, and for building your worlds.

# VRChat Logs
When you use the VRChat client, it saves logs about things that happen like worlds you visit, errors you encounter, and other behind-the-scenes info into text files on your machine.

# Viewing Your Logs In-Client
When you launch VRChat with the Debug GUI enabled (see below), you can turn on special Debug overlays in both Desktop and VR modes. To view your log messages as they occur, press RShift + Backtick + 3. You can find all the shortcuts available for different debug overlays on the [Keyboard and Mouse](https://docs.vrchat.com/docs/keyboard-and-mouse) page.

# Viewing Your Logs in a Text Editor
You can view these files during or after a VRChat session by finding them on your disk and opening them up. They are typically saved to the following folder, with your computer username instead of 'YourName':

`C:\Users\YourName\AppData\LocalLow\VRChat\VRChat`

In this folder, you'll find some more folders, and a handful of files with names like:
` output_log_08-55-48.txt`

These are your log files - a new one is made each time you launch VRChat, with a timestamp to keep the names unique. You can open them in any text browser to find detailed information of what happened during your session.

# Log Options
When you *Build and Test* your world using the button in the VRChat Control Panel, Unity launches VRChat and passes some command-line arguments along which turn on debugging features so you get all the information possible. When you launch VRChat another way, you will get only limited logs. In order to copy the way that *Build and Test* launches VRChat, you'll want to pass some flags along. You can do this in a few different ways.

# Batch Files
To launch VRChat with some special options, you can use a batch file. This just a plain text file you create with some special commands.
1. Make a new text file called `debug.bat` right next to the VRChat.exe on your machine.
2. Add this line to the file: `VRChat.exe --no-vr --enable-debug-gui --enable-sdk-log-levels --enable-udon-debug-logging`
3. Save the file and run it to test!

This command turns on 3 flags for extra logging, and also forces VRChat to bypass VR for desktop testing. There are more options you can pass along - you can include any of the flags from the [VRChat Launch Options](https://docs.vrchat.com/docs/launch-options) page as well as the [Unity Standalone Player command line arguments](https://docs.unity3d.com/Manual/CommandLineArguments.html).

For example, this is a batch file I use that launches with my secondary VRChat profile and forces a screen width of 720p:
`VRChat.exe --profile=1 --no-vr --enable-debug-gui --enable-sdk-log-levels --enable-udon-debug-logging -screen-width 1280 -screen-height 720`

# Steam Launch Options
If you use the Steam version of VRChat, you can set permanent launch options there as well. We don't generally recommend this since it makes it harder to switch between normal and debug launches, but here is how you do it:

1. In your Steam Library, right-click on the VRChat entry and choose 'Properties'.
2. In the 'General' tab, press the 'Set Launch Options' button.
3. In the field that appears, you can enter the VRChat-specific flags you want always enabled, like `--enable-debug-gui --enable-udon-debug-logging` to always have the Debug GUI and Udon Debugging enabled.

# Finding Udon Errors
When an UdonBehaviour runs into a major issue while running in the client, it will disable itself. If you're looking at the logs in the client, you'll see an entry like this:
`[UdonBehaviour] An exception occurred during Udon execution, this UdonBehaviour will be halted.`
To find out more about what happened, open up your log files using the instructions above under *Finding Your Logs*, and search for the world 'halted'. There, you will find some more information about what happened, like this:
```
2020.08.28 17:40:51 Error      -  [UdonBehaviour] An exception occurred during Udon execution, this UdonBehaviour will be halted.
VRC.Udon.VM.UdonVMException: An exception occurred in an UdonVM, execution will be halted. ---> VRC.Udon.VM.UdonVMException: An exception occurred during EXTERN to 'VRCSDK3VideoComponentsBaseBaseVRCVideoPlayer.__GetTime__SystemSingle'. ---> System.NullReferenceException: Object reference not set to an instance of an object.
  at VRC.SDK3.Internal.Video.Components.AVPro.AVProVideoPlayerInternal.GetTime () [0x00000] in <00000000000000000000000000000000>:0 
  at VRC.Udon.Wrapper.Modules.ExternVRCSDK3VideoComponentsBaseBaseVRCVideoPlayer.__GetTime__SystemSingle (VRC.Udon.Common.Interfaces.IUdonHeap heap, System.UInt32[] parameterAddresses) [0x00000] in <00000000000000000000000000000000>:0 
```
Ouch, so much information! The key info here is in the second line: `
An exception occurred during EXTERN to 'VRCSDK3VideoComponentsBaseBaseVRCVideoPlayer.__GetTime__SystemSingle'. ---> System.NullReferenceException: Object reference not set to an instance of an object.`
This tells us that our world is trying to access something that does not exist. Specifically, we're trying to access a VideoPlayer when we don't have one assigned. That's what ` Object reference not set to an instance of an object` means, and `VRCSDK3VideoComponentsBaseBaseVRCVideoPlayer.__GetTime__SystemSingle` tells us that it occured when we tried to call *GetTime* on a *VRCVideoPlayer*. Once you get comfortable reading logs, this kind of information is invaluable. I can now go to the graph that tries to call VRCVideoPlayer.GetTime and make sure it has a VideoPlayer hooked into it.


# Diagnosing udon not doing what you want
If you're ever in a situation where Udon is not doing something that you want it to do, a good way to diagnose it is to add `Debug Log` nodes with unique text. Put them right before you try to do something important, put them right after you try to do something important, and just put them anywhere that might be important in general. Then when you run your UdonBehaviour, you can observe the log to see how far it's getting and whether or not it is doing what you expect.