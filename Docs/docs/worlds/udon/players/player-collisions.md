---
title: "Player Collisions"
slug: "player-collisions"
hidden: false
createdAt: "2020-08-20T01:33:26.505Z"
updatedAt: "2021-06-26T18:02:40.114Z"
---
## Udon has three ways to detect when a Player and an Object Collide - **Triggers**, **Physics**, and **Particles**.

### Triggers

If you want to detect when a player has entered or exited an area, your best bet will be to use the **OnPlayerTrigger **events. There are three of these:

- **OnPlayerTriggerEnter** is called when a player's capsule enters a Trigger Collider 
- **OnPlayerTriggerStay** is called on frames while a player's capsule is inside a Trigger Collider
- **OnPlayerTriggerExit** is called when a player's capsule exits a Trigger Collider.

![A simple Box Collider with 'Is Trigger' checked.](/img/worlds/player-collisions-6d9aaf6-trigger-collider.png)
To use these events, add an object with a collider and check the 'Trigger' box on the collider. A Trigger Collider lets objects and players pass through it and calls events when those objects have colliders. You can learn more about [Collision in the Unity Manual](https://docs.unity3d.com/2019.4/Documentation/Manual/CollidersOverview.html).


:::note

There are some edge cases where one of these events could be skipped, like when a player teleports out of a collider, or is moving VERY fast. We'll add in handling in the future to catch these.",
  "title": "Edge Cases
:::
### Physics
There is another set of events you can use when you've got objects like bouncing balls or bullets that you're moving around with physics. These objects have Colliders with IsTrigger turned off so that they'll interact with the environment and each other. 

To detect events on these Colliders, you can use:
- **OnPlayerCollisionEnter** is called when a player's capsule enters a Collider.
- **OnPlayerCollisionStay** is called on frames while a player's capsule is inside a Collider.
- **OnPlayerCollisionExit** is called when a player's capsule exits a Collider.
:::caution

These events WILL NOT be called when a player 'walks into' a stationary object. If you want to handle that, use a Trigger Collider.",
  "title": "OnPlayerCollision Events are for Moving Objects
:::
### Particles
Finally, you can use **OnPlayerParticleCollision** to detect when a Particle colliders with a player, assuming that Particle System has Collision and Send Collision Messages turned on.
![This Particle System has the Collision module turned on, is set to 'World' and '3D' modes, with 'Send Collision Messages' turned on.](/img/worlds/player-collisions-40d1f44-particle-collisions.png)
### Examples
![Check out the Udon Example Scene to see how these events can be used.](/img/worlds/player-collisions-f98c33a-udonexamplescene-collisions.png)