---
slug: release-3-2-2
date: 2023-07-31
title: Release 3.2.2
authors: [momo]
tags: [release]
draft: false
---
### Summary

Adds Udon support for Avatar Scaling (along with an Udon Example) and enforces new Avatar Dynamic Component limits.

## Requires Resolver 0.1.20!

You may see warnings or errors about conflicting package versions for Newtonsoft.Json until you update the resolver with the Creator Companion.

<!--truncate-->

### Changes
* Adds [Player Avatar Scaling](/worlds/udon/players/player-avatar-scaling) and [Avatar Events](/worlds/udon/avatar-events) to integrate with the new Avatar Scaling system.
* Includes new limits for avatar dynamic components. The SDK will give a build error if you exceed these:
  * VRCPhysBone: 256 Max
  * VRCPhysBoneCollider: 256 Max
  * VRCContact: 256 Max
