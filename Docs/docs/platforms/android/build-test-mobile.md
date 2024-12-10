---
sidebar_position: 0
---

import CurrentUnityVersion from '@site/src/components/UnityVersionedText.js';

# Build and Test for Android Mobile

You can test a VRChat world on your Android device without publishing it using the Build and Test feature. This document describes how you can set up and use this functionality to build worlds more quickly!

## Set Up For Build and Test

To use Build and Test for Android Mobile you need to set up your Unity Android Tools, your Project, and your Device.

### Set Up Unity Android Tools

You need the Android Build Support module installed for your VRChat-compatible Unity Editor to work on Android worlds in the first place. You may already have this, as the VRChat Creator Companion installs it by default. Follow the steps below to check this.

1. Open Unity Hub and navigate to "Installs" on the left.
2. Find the install for the Unity version that your project uses (the current recommended version is [<CurrentUnityVersion/>](/sdk/upgrade/current-unity-version/)). If your install lists "Android" below the Editor path, then you already have the module installed, and you can move on to Setting up your Project. Otherwise, continue to step 3.

![Unity Install with Android Module](/img/platforms/unity-hub-modules.png)

3. Click on the gear icon next to that install and click "Add modules".
4. Find "Android Build Support". If the box and check the box next to it if 
5. Click continue to install the Android build support module.

You should now be able to build worlds for Android.

### Set Up Your Project to Target Android

Open the SDK panel by selecting "VRChat SDK"->"Show Control Panel" and then select the Builder tab.

Find the "Select Platform" section and change it to "Android".

### Set Up Your Android Device to Test Worlds

Build and Test for Mobile makes use of the [Android Debug Bridge](https://developer.android.com/tools/adb) (ADB) to transfer built world files to your android device.

ADB uses USB debugging on an android device to communicate with the device. This allows ADB to send files and launch apps, among many other debug related features.

Enabling USB debugging also requires you to enter developer mode on your device.

:::caution Warning

USB debugging allows your computer to perform many potentially dangerous operations without any notification. You should only use it with applications that you trust. 

The VRChat SDK uses USB debugging to send files to your device, open the VRChat app, and launch your test world.

:::

#### 📱 Enabling Developer Mode on Android Phones and Tablets

To enable developer mode on your Android phone or tablet you must do the following:

1. Ensure that your phone is plugged in to your computer with a USB cable capable of data transfer.
2. Enable developer mode by going to "Settings"->"About Phone" and scrolling down to the "Build number" at the bottom. Tap the build number 7 times to enable Developer mode.
3. Now that developer mode is enable you can see more developer options. Go to "Settings"->"System"->"Developer Options" and locate the "USB Debugging" checkbox. Check "USB Debugging".

#### 🥽 Enabling Developer Mode on a Meta Quest Headset

To build and test on your Meta Quest device, you also need to enable developer mode and allow USB debugging.

You must use the [Meta Quest Developer Hub](https://developers.meta.com/horizon/documentation/unity/ts-odh/) to switch your Meta Quest headset into developer mode.

To learn how to set up developer mode on your headset, read [Meta's instructions](https://developers.meta.com/horizon/documentation/unity/unity-quickstart-mqdh/#connect-headset-to-meta-quest-developer-hub).

## Use Build and Test

With developer mode enabled, USB debugging enabled, and your Android device plugged in, you should now be able to build and test.

### First Launch

* Ensure that you have launched the app at least once to allow app directories to be generated before trying to test a world, and then close VRChat. 
* The VRChat appplication must be closed before launching into a test world for the first time.
* Your Android device must remain unlocked for ADB to be able to launch the VRChat app into a test world.

With everything above set up, and your Project in Android mode, press the "Build and Test New Build" button to test the world on your device.

After the world is built you should see the VRChat app automatically open. If you are not already logged into the app you will be sent directly to the login screen. After logging in you will be sent directly to the test world.

If you were already logged in, you should be sent directly to the test world after the client is done loading. The play button at the bottom indicates the loading status of the client, and once it's done loading you should be sent to the world after a short delay.

When making future changes to your world, press "Build and Test New Build" again. Your world will be rebuilt, sent to your device, and reloaded without any further action.

## Tools & Troubleshooting

This section describes how to fix some common issues as well as some tools that can help in your mobile development journey.

### Troubleshooting

If you're a developer who uses debugging mode for other reasons, please make sure to unplug or disable USB debugging on all other devices except the Android device that you would like to build and test on.

For Android phones and tablets, if USB debugging is enabled but your computer is unable to see your phone/tablet, the best way to troubleshoot this is to completely restart the USB debugging process.
   1. Unplug the Android device.
   2. Disable developer mode and USB debugging.
   3. Plug in the Android device.
   4. Enable developer mode by tapping "About Phone"->"Build Number" 7 times.
   5. Enable USB debugging in the "System"->"Developer Options" section.
   6. Attempt to Build and Test again.

If for some reason your VRChat app does not have the package name `com.vrchat.mobile.playstore` you can modify which package name the SDK looks for in the project settings. This can be found at "VRChat"->"SDK"->"Android App Package Name"

This may be useful if you are trying to build and test on a beta build of the VRChat app, or for some reason you are not using the live version from the Google Play store. Keep this as `com.vrchat.mobile.playstore` unless you have good reason to change it.

### Useful Device Mirroring Tool

You may want to be able to view your phone from a window on your desktop instead of having to look down at your phone every time. There is a useful open source tool called [scrcpy](https://github.com/Genymobile/scrcpy) which can facilitate this. 

[scrcpy](https://github.com/Genymobile/scrcpy) makes use of ADB to display a screen capture of your device in a small window on your desktop. You can use this to interact with your phone using a mouse instead of having to use your phone.

To use this tool, download the [latest release](https://github.com/Genymobile/scrcpy/releases) for your platform (For example, download the `scrcpy-win64` zip file on Windows). This will give you a zipped folder with all the required files to run `scrcpy.exe`. Unzip this somewhere convenient.

You can run `scrcpy.exe` either by double clicking it or running `scrcpy.exe` in a command prompt in that folder. If you've successfully set up USB debugging, this will display a window mirroring what you see on your device.

Please note that ADB is unable to record the lock screen so the preview window will be completely black while trying to unlock the phone. You can unlock your phone physically and continue interacting through the mirror window.

Also it is recommended to launch scrcpy *after* launching Unity. This is because scrcpy will launch it's own ADB server if there isn't one running already, but Unity will kill any existing ADB servers when it launches, which will close your device mirror window.

You may also find it useful to enable the "Stay Awake" in "System"->"Developer Options" to avoid having to tap the device to keep it awake and prevent locking. This keeps the device awake forever as long as it is plugged in and charging.

### Build and Test Over Wi-Fi

You can also build and test wirelessly. This may be more convenient for some setups, but it also requires some command line interaction in order to connect, so this is not recommended over USB debugging in general.

In order to enable wireless debugging you will need to interact with ADB directly on the command line.

1. First make sure Unity is open so ADB will use Unity's ADB server process
2. Navigate to the Unity install folder for the version of Unity you are using for your project.
    * This can be found by opening Unity Hub, click "Installs" on the left, click the gear next to your install, click "Show in Explorer".
    * `adb.exe` can be found in Data/PlaybackEngines/AndroidPlayer/SDK/platform-tools
    * Open a command prompt in this folder by launching command prompt and navigating to the folder using `cd [your unity install path]/Data/PlaybackEngines/AndroidPlayer/SDK/platform-tools`.

Now you can use ADB commands. If you still have USB debugging enabled, a good command to test if things are working is to use `adb devices -l` which should list all debugging-enabled devices. You can also try `adb shell ls` to print out some of the top level folders on the device, again requiring debugging to be enabled.

Now that we've located ADB, what about that fancy Wi-Fi debugging?
1. Disable USB debugging and just to be sure unplug the device
2. Enable System->Developer Options->Wireless Debugging.
3. Tap Wireless Debugging to find more options.
4. Tap "Pair device with pairing code" and you should get a 6 digit code to pair with, along with an IP address and port to use.
5. Run `adb pair [ip]:[port]` 
    * For example `adb pair 127.0.0.1:1234` if the pairing screen had IP address `127.0.0.1` and port `1234`
    * Note that the port will be randomized every time, so you will have to come back to this step every time you want to debug over Wi-Fi.
6. Enter the pairing code when asked.
7. Now type `adb connect [ip]:[port]` to connect to the device

You should be able to use ADB over Wi-Fi now.

Try running `adb devices -l` to see if it's working. You should see your device in the list of devices now.

You can now go back to the SDK and click "Build & Test New Build" to test a world over Wi-Fi.
