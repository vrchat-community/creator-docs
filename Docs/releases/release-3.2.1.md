---
slug: release-3-2-1
date: 2023-06-12
title: Release 3.2.1
authors: [momo]
tags: [release]
draft: false
---
### Summary

Small fixes for Midi, PhysBones, and Udon's interaction with Blocked Users and Stations. Updates Newtonsoft Dependency to 3.0.2.

## Requires Resolver 0.1.20!

This version of the SDK updates the Newtonsoft package used by the Base SDK as well as the [Resolver](https://vcc.docs.vrchat.com/vpm/resolver/). You may see warnings or errors about conflicting package versions for Newtonsoft.Json until you update the resolver with the Creator Companion.

<!--truncate-->

### Changes
* A few MIDI input timing fixes, including improved note processing, more consistent looping, and fixed Note On events with a velocity of '0' turning into Note Off events, which broke MIDI file parsing.
* Scaling PhysBones to zero or very small values and back no longer breaks behavior
* Fixed VRCPhysBone position unable to be animated when very tiny
* Blocked users will sync their position and motion state again for querying in local Udon scripts
* Udon can now be used to eject players from "standing" stations, with or without station exit disabled