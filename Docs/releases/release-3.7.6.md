---
slug: release-3-7-6
date: 2025-03-05
title: Release 3.7.6
authors: [momo]
tags: [release]
---
## Summary

Version `3.7.6` reworks the SDK's Build Panel, adds multi-platform Build & Publish, and allows you to Build & Test Android/Quest avatars. It also improves ClientSim's pause menu and fixes several bugs.

<!--truncate-->

## Fixes & Changes

* The VRChat SDK's Build Panel has received a major overhaul.
    * You can now target multiple platforms at the same time when publishing!
        * Multi-Platform Build & Publish goes through each selected platform in sequence and build your content for that platform, always starting with PC (if selected).
        * You can monitor the progress in both the Builder panel and in Unity's Background Processes window accessed in the bottom right area of the editor.
        * Once the builds are done, the editor returns to the platform you started the build on.
        * The updated UI also incorporates all of the changes made to support Build & Test for Android/Quest.
    * Content Info editing has been improved.
        * The Content Warnings section has been changed into a simple dropdown.
        * The tag editor has moved to a new popup.
    * Capturing thumbnails is significantly easier and more responsive.
        * Likewise, this new method addresses past Color Space and Post Processing issues.
* You can now build and test avatars on Android/Quest.
    * This requires connecting a phone (or any ADB device) to your PC.
    * Check out [our documentation](https://creators.vrchat.com/platforms/android/build-test-mobile/)!
* Added support for [Contact Senders](/avatars/avatar-dynamics/contacts/#vrccontactsender) to be local only.
    * If you enable "local only", the Contact Sender only exists on the local avatar in a similar way to local only [Contact Receivers](/avatars/avatar-dynamics/contacts/#vrccontactreceiver).
    * These do not contribute to an avatar's performance ranking, but still count towards the hard Contact limit.
* Fixed an exeception that could appear when toggling VRChat Contacts in Play mode.
* Implemented all VRChat Constraint fixes from client version `2025.1.2` (and older).

## Client Sim

* Added a new ClientSim setting, `Hide Menu on Launch`.
    * This setting automatically closes the ClientSim pause menu when entering Play Mode, after you've accepted the warning about differences between ClientSim and the VRChat Client.
    * In addition, the ClientSim pause menu now automatically closes when you move your player, similar to how the Quick Menu works in the Client.
* Fixed multiple `UdonBehaviour` scripts on one GameObject not functioning correctly in ClientSim.

## Changes & Fixes in `3.7.6-beta.2`

- Fixed UdonSharp's log watcher by updating it to VRChat's new log file format.
- Fixed an issue with uploading worlds on Linux.
    - Linux is not a supported platform for our SDK, but internal tests show that you should now be able upload both worlds and avatars.
- The "Prepare Your Content" panel should no longer auto-collapse whenever "Show All Avatar Performance Details" is checked.
- The "Validations" panel now only rescans the scene when something in the scene changes.
    - This should generally improve editor performance.
- The checkbox confirming "The information provided above is accurate (...)" will now reset correctly when switching between different worlds or avatars.
- ASTC compression setting for Android builds are now correctly applied during multi-platform builds.
    - Fixed the beta SDK not preventing Android uploads if textures don't use ASTC compression.
- The SDK validation message list should now wrap text correctly at smaller window sizes.
- Fixed an issue with execution order when a PhysBone and Constraint component are used together on the same game object.

## Changes & Fixes in final release

- The performance stats in the Avatar SDK validations list are now correctly sorted by rank.
- The "Build & Publish" button now correctly specifies "... the terms below ..." when builds are blocked in the Avatar SDK.

## Known Issues

- In rare cases you may see an "All pipe instances are busy" error while building. This is a Unity issue, restarting your editor and trying again should fix it.