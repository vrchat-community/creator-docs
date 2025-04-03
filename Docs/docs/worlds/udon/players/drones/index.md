---
sidebar_position: 1
---
# Drone API

You can use Udon to retrieve information about the player drones in your world instance.

Udon interacts with Drones through the `VRCDroneApi`. You can retrieve the `VRCDroneApi` object from each Player that is using it.

Your world can detect a Drone interacting with a Trigger Collider and execute the following events:

- [OnDroneTriggerEnter](/worlds/udon/players/drones/getting-drones#ondronetriggerenter)
- [OnDroneTriggerExit](/worlds/udon/players/drones/getting-drones#ondronetriggerexit)
- [OnDroneTriggerStay](/worlds/udon/players/drones/getting-drones#ondronetriggerstay)

See these pages for more details on working with Drones via Udon:
* [Getting Drones](/worlds/udon/players/drones/getting-drones)
* [Drone Information](/worlds/udon/players/drones/drone-information)