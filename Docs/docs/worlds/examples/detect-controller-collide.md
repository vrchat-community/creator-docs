---
title: Detect Controller Collide
description: "Detect a Character Controller colliding with something."
sidebar_custom_props:
    customIcon: 🧱
---
import HowToImportExample from '/docs/worlds/examples/_how-to-import.mdx';
import UnityVersionedLink from '@site/src/components/UnityVersionedLink.js';

![Detect Controller Collide](/img/worlds/examples/detect-controller-collide.png)

The Unity event <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/ScriptReference/MonoBehaviour.OnControllerColliderHit.html">OnControllerColliderHit</UnityVersionedLink> is useful for knowing when a <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/ScriptReference/CharacterController.html">CharacterController</UnityVersionedLink> has collided with another object. VRChat adds the event [OnControllerColliderHitPlayer](/worlds/udon/players/player-collisions#physics) to detect when a CharacterController collides with another Player. This event includes a `ControllerColliderPlayerHit` struct with a reference to the [VRCPlayerApi](https://udonsharp.docs.vrchat.com/vrchat-api/#vrcplayerapi) object for the player that was collided with.

Visit the [Detect Controller Collide Example World](https://vrchat.com/home/world/wrld_7da557ad-3584-4b0a-bf61-6cbba33701d4) to try it for yourself!

## Using the Example

Start the scene in the Unity Editor or visit the world in VRChat. Look at the canvas in the world, and observe that the empty space below the "Last hit:" label changes to "Wall" when the capsule "character" collides with it. 

Stand in-between the spawn point for the capsule and the wall so that it runs into you on the way to the wall, and you should see the label change to your display name when it collides with you! It will reset to its spawn point and continue running into you until you move aside. At that point, it will collide with the wall again and change the label back to "Wall".

<HowToImportExample/>

## Technical Breakdown

The scene has a `DetectControllerCollide` GameObject which contains the main prefabs and logic for the example.

The first child object, `CharacterController`, has a CharacterController component on it as well as an UdonBehaviour with a Graph Program with the logic for detecting collisions.

### OnCharacterControllerHitExampleGraph

#### Variables

This graph has the following public variables:

| **Name**                           | **Description**                                                                                   |
|------------------------------------|---------------------------------------------------------------------------------------------------|
| `CharacterController`              | Reference to the CharacterController, included to run the `Move()` method during `Update()`.      |
| `float` moveSpeed                  | The speed at which the characterController will move, multiplied internally by `Time.deltaTime`.  |
| `TextMeshProUGUI` hitNameText      | A reference to the target textField to update when a collision is detected.                       |
| `Transform` characterControllerStartPos | The position from which the characterController will start its journey each time.            |

#### Events

The graph has four events:

* `Update()` runs continuously, calling `Move()` on the characterController to move it forward.
* `OnControllerColliderHit()` runs whenever the characterController collides with a non-player object. The name of the object is extracted from the `ControllerColliderHit` struct passed through by the event, and set on the `hitNameText` field.
* `OnControllerColliderHitPlayer()` runs whenever the characterController collides with a Player. The name of the Player is extracted from the `ControllerColliderPlayerHit` struct passed through by the event, and set on the `hitNameText` field.
* `__ResetCharacterController()` is a custom event which is called from the two collision events to reset the characterController back to its starting position.