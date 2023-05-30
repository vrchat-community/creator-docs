---
title: "Player Forces"
slug: "player-forces"
hidden: false
createdAt: "2021-01-22T00:32:15.132Z"
updatedAt: "2021-01-22T01:07:11.156Z"
---
Here are the nodes relating to forces that act on Players. For nodes that deal with Player positions, see [Player Positions](/worlds/udon/players/player-positions) 

### GetWalkSpeed / SetWalkSpeed
*float, working range around 0-5*
The speed at which a Player can walk around your world. Set this below your Run Speed.

### GetRunSpeed / SetRunSpeed
*float, working range around 0-10*
The speed at which a Player can run around your world. Set this above your Walk Speed.

### GetStrafeSpeed / SetStrafeSpeed
*float, working range around 0-5*
The speed at which a Player can move sideways through your world. Recommended to be set to the same as Walk Speed. Not affected by running.

### GetJumpImpulse / SetJumpImpulse
*float, working range around 0-10*
How much force applied when a player jumps. Default is 0, so set this if you want to enable jump in your world. The default VRCWorld prefab sets this to 3.

### GetGravityStrength / SetGravityStrength
*float, working range around 0-10*
Multiplier for the Gravity force of the world (set to Earth's default). Don't change Unity's Physics.Gravity in your project, get and set it here instead. Default is 1.

### Immobilize
*Boolean*
Set to true to keep a Player stuck in place, turning off their Locomotion. Note that VR Players may be able to move their viewpoint around a bit anyways, but their Avatar will stay in place.