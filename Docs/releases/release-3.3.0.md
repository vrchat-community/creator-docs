---
slug: release-3-3-0
date: 2023-09-11
title: Release 3.3.0
authors: [momo]
tags: [release]
draft: false
---
### Summary

This release reworks the main user interface for the VRChat SDK (the 'Build panel'). It includes a new UI, quality-of-life improvements, and easier ways to build and update your content.

This update also adds support for the new 'Maximum capacity' and 'Recommended capacity' settings for worlds. You can learn more about these settings [in our documentation](/worlds/creating-your-first-world/#step-5---building-your-world).

<!--truncate-->

### Changes

* Fully rebuilt the SDK Builder panel with new UI and features
* Uploading Worlds and Avatars no longer requires entering Play Mode
* Updating the thumbnail no longer requires a full content rebuild and reupload
* You can now select any file to be uploaded as a thumbnail
* Standardized public API has been added for tool developers
* Content Manager now marks the currently selected world and allows quickly setting any uploaded world as current
* Countless bug fixes and improvements across Worlds and Avatars SDKs

### Important note for Tool Developers

If you're making tools that integrate with VRChat SDK - this is an important release, as it makes quite substantial changes to the SDK internals.

We now also provide public APIs for you to integrate with, and we highly recommend migrating your tools to utilize them if you were relying on reflection or similar techniques before.

[You can read more about the Public SDK APIs here](/sdk/public-sdk-api).
