---
slug: release-3-4-2
date: 2023-12-05
title: Release 3.4.2
authors: [momo]
tags: [release]
draft: false
---
## Summary

This update fixes an issue where legacy folders were not removed as part of migrating a project which used the old Assets-based SDK.

<!--truncate-->

## Changes

* Adds all the 'legacyFolders' from the UdonSharp and ClientSim packages into the Worlds package.