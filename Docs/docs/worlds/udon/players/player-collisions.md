import UnityVersionedLink from '@site/src/components/UnityVersionedLink.js';

# Player Collisions

Udon has three ways to detect when a Player and an Object Collide - **Triggers**, **Physics**, and **Particles**.

## Triggers

If you want to detect when a player has entered or exited an area, your best bet will be to use the **OnPlayerTrigger **events. There are three of these:

- **OnPlayerTriggerEnter** is called when a player's capsule enters a Trigger Collider 
- **OnPlayerTriggerStay** is called on frames while a player's capsule is inside a Trigger Collider
- **OnPlayerTriggerExit** is called when a player's capsule exits a Trigger Collider.

![A simple Box Collider with 'Is Trigger' checked.](/img/worlds/player-collisions-6d9aaf6-trigger-collider.png)

To use these events, add an object with a [collider](https://docs.unity3d.com/Manual/collider-shapes-introduction.html) component and enable the 'Is Trigger' box on the collider. A trigger collider allows objects and players pass through it and calls events when those objects have colliders. You can learn more about <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/CollidersOverview.html">Collision in Unity's documentation</UnityVersionedLink>.


:::danger

There are some edge cases where one of these events could be skipped, like when a player teleports in/out of a collider, or is moving VERY fast.

:::
## Physics
There is another set of events you can use when you've got objects like bouncing balls or bullets that you're moving around with physics. These objects have Colliders with IsTrigger turned off so that they'll interact with the environment and each other. 

To detect events on these Colliders, you can use:
- **OnPlayerCollisionEnter** is called when a player's capsule enters a Collider.
- **OnPlayerCollisionStay** is called on frames while a player's capsule is inside a Collider.
- **OnPlayerCollisionExit** is called when a player's capsule exits a Collider.
- **OnControllerColliderHitPlayer** is called when a CharacterController hits a Player.

:::caution OnPlayerCollision Events are for Moving Objects

These events WILL NOT be called when a player 'walks into' a stationary object. If you want to handle that, use a Trigger Collider.

:::
## Particles
Finally, you can use **OnPlayerParticleCollision** to detect when a Particle colliders with a player, assuming that Particle System has Collision and Send Collision Messages turned on.

![This Particle System has the Collision module turned on, is set to 'World' and '3D' modes, with 'Send Collision Messages' turned on.](/img/worlds/player-collisions-40d1f44-particle-collisions.png)
## Examples

The [Udon example scene](https://creators.vrchat.com/worlds/examples/udon-example-scene/) demonstrates how to use all three methods of detecting player collisions. 

![Check out the Udon Example Scene to see how these events can be used.](/img/worlds/player-collisions-f98c33a-udonexamplescene-collisions.png)