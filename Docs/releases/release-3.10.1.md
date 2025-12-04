---
slug: release-3-10-1
date: 2025-12-02
title: Release 3.10.1
authors: [momo]
tags: [release]
---
## Summary

SDK Version `3.10.1` fixes two critical bugs in the avatars SDK. Check out the [3.10.0 changelog](/releases/release-3-10-0) for the latest features.

<!--truncate-->

## Fixes & Changes

- Fixed a performance regression caused by nesting avatars under a shared root game object. This caused delays as you opened or refreshed the Builder tab in the VRChat SDK control panel.
- Choosing a high resolution image for an avatar thumbnail no longer breaks first time avatar creation.


## Known Issues

- In rare cases, you may see an "All pipe instances are busy" error while building. This is a Unity issue - restarting your editor and trying again should fix it.