---
slug: release-3-4-1
date: 2023-10-13
title: Release 3.4.1
authors: [momo]
tags: [release]
draft: false
---
## Summary

This update addresses post-3.4.0 issues and makes minor usability improvements to the SDK.

:::caution

Make sure you update to [Creator Companion 2.1.6](https://vcc.docs.vrchat.com/news/release-2.1.6) or higher before updating to this version of the SDK!

:::

<!--truncate-->

## Changes

* Fixes an issue causing the SDK to fail to upload with a "Missing Credentials" error.
* Fixes an issue where avatars without Animators would break the validation messages in the SDK Builder Panel. Addresses [this Canny](https://feedback.vrchat.com/sdk-bug-reports/p/add-a-message-to-the-sdk-window-about-missing-animator-component-when-it-is-miss).
* Changes "Last Updated" time to show Local Time instead of UTC. Addresses [this Canny](https://feedback.vrchat.com/sdk-bug-reports/p/label-last-updated-date-and-time-in-upload-panel-as-utc).
