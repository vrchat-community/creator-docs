---
slug: release-3-4-0
date: 2023-09-19
title: Release 3.4.0 Beta 1
authors: [momo]
tags: [release]
draft: false
---
### Summary

This update merges the ClientSim and UdonSharp packages into the Worlds package so they will be available in all projects moving forward. It also updates the Content Tags available in the Build panel to support the new Content Gating system (blog post coming soon!).

:::caution

Make sure you update to [Creator Companion 2.1.3](https://vcc.docs.vrchat.com/news/release-2.1.3) before updating to this version of the SDK!

:::

:::danger

Worlds published with this Beta SDK will ONLY have their Udon Programs work in the current Open Beta client, due to Udon Programs being compressed now.

:::

<!--truncate-->

### Changes

* UdonSharp and ClientSim are now both included in the Worlds package within the "Integrations" folder.
* UdonSharp and ClientSim added as "legacyPackages" in the Worlds package manifest to have the Creator Companion and Resolver properly remove them.
* Updates Content Tags from "Nudity/Sexuality", "Realistic Violence", "Blood/Gore", "Other NSFW" to "Sexually Suggestive", "Graphic Violence", "Extreme Horror", "Adult Language and Themes" and "Excessive Gore".
* SerializedUdonProgram now uses compressed byte[] instead of base64 string. This avoids a giant string allocation in some worlds which persisted until the world was exited.
