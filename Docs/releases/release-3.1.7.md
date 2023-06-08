---
slug: release-3-1-7
date: 2022-8-18
title: Release 3.1.7
authors: [momo]
tags: [release]
draft: false
---
### Summary

A few small changes.

<!--truncate-->

### Changes

* Checks Scene Descriptor for null spawns object before trying to get length, fixing issue when adding a Scene Descriptor to your world manually.
* Prompts user to save their scene before loading a Sample Scene, fixing [this Canny issue](https://feedback.vrchat.com/sdk-bug-reports/p/switching-to-the-example-scene-deletes-unsaved-changes.