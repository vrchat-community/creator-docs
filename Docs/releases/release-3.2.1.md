---
slug: release-3-2-1
date: 2023-06-12
title: Release 3.2.1
authors: [momo]
tags: [release]
draft: false
---
### Summary

Small fixes for Midi, PhysBones, and Udon's interaction with Blocked Users and Stations.

<!--truncate-->

### Changes
* A few MIDI input timing fixes, including improved note processing, more consistent looping, and fixed Note On events with a velocity of '0' turning into Note Off events, which broke MIDI file parsing.
* Scaling PhysBones to zero or very small values and back no longer breaks behavior
* Fixed VRCPhysBone position unable to be animated when very tiny
* Udon can now be used to eject players from "standing" stations, with or without station exit disabled
