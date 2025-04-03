---
title: "Getting Drones"
slug: "getting-drones"
hidden: false
createdAt: "2025-03-05T14:52:00.02Z"
updatedAt: "2025-03-05T14:52:00.02Z"
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Methods

### VRCPlayerApi.GetDrone
Gets the Drone API that belongs to the target player.

**Output**
- `VRCDroneApi`


### VRCDroneApi.GetPlayer
Gets the owning player for the target drone.

**Output**
- `VRCPlayerApi`

## Events

### OnDroneTriggerEnter
This event is invoked when a Drone enters a trigger.

**Output**
- `VRCDroneApi`


### OnDroneTriggerExit
This event is invoked when a Drone exits or is despawned inside of a trigger.

**Output**
- `VRCDroneApi`


### OnDroneTriggerStay
This event is invoked when a Drone stays inside of a trigger.

**Output**
- `VRCDroneAPi`
