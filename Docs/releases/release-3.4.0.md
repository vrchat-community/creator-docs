---
slug: release-3-4-0
date: 2023-10-04
title: Release 3.4.0
authors: [momo]
tags: [release]
draft: false
---
## Summary

This update merges the ClientSim and UdonSharp packages into the Worlds package so they will be available in all projects moving forward. It also updates the Content Tags available in the Build panel to support the new [Content Gating system](https://hello.vrchat.com/blog/content-gating).

:::caution

Make sure you update to [Creator Companion 2.1.6](https://vcc.docs.vrchat.com/news/release-2.1.6) or higher before updating to this version of the SDK!

:::

<!--truncate-->

## Changes

* UdonSharp and ClientSim are now both included in the Worlds package within the "Integrations" folder.
* UdonSharp and ClientSim added as "legacyPackages" in the Worlds package manifest to have the Creator Companion and Resolver properly remove them.
* Fixed an issue where Unity Editor would constantly use more memory if Thumbnail "Capture From Scene" is left enabled while tabbed out to a different window.
* Updates Content Tags from "Nudity/Sexuality", "Realistic Violence", "Blood/Gore", "Other NSFW" to "Sexually Suggestive", "Graphic Violence", "Extreme Horror", "Adult Language and Themes" and "Excessive Gore".
* SerializedUdonProgram now uses compressed byte[] instead of base64 string. This avoids a giant string allocation in some worlds which persisted until the world was exited.
* Restores the checkbox for the rights statement within the Build panel.
* Timeout for SDK uploads increased from 30 seconds to 1 hour, addresses [this Canny](https://feedback.vrchat.com/sdk-bug-reports/p/upload-timeout-in-vrcsdk-330-is-too-short).
