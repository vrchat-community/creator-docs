# Built-In Contact Tags

When working with Contact Senders and Receivers, the VRChat SDK offers a number of built-in contact tags that you can use. Using these tags is optional, and you can type in whatever text you'd like for your tags instead if you'd prefer, but using the built-in tags makes it easier to create contacts that are compatible with avatars and worlds that you didn't make yourself. For example, you might have a receiver in a world that responds to an avatar's hand, or a receiver on an avatar that reacts to touching a hot or cold surface.

To use a built-in tag, select it from the drop-down list in the inspector as shown below. Remember that you can use multiple tags together on a single sender or receiver - a contact is triggered when the sender and receiver both have at least one tag in common.

![](/img/avatars/contact-receiver-built-in-tags.png)

## Body Parts

This category of tags describes parts of a humanoid avatar.

This is currently the only category that receives special treatment in VRChat. When a humanoid avatar is loaded, it will have Contact Senders generated on it automatically with these tags on the appropriate bones if they are not manually defined by the avatar author, so by using these tags for Receivers on your avatar or in your world, you'll be able to detect those body parts as they get close. This can be useful for features activated by touch like head-patting someone, or mechanisms activated by push buttons in worlds.

| Tag             | Description                                       |
|-----------------|---------------------------------------------------|
| `Head`          | An avatar's head.                                 |
| `Torso`         | An avatar's torso.                                |
| `Hand`          | Either of an avatar's hands.                      |
| `HandL`         | An avatar's left hand.                            |
| `HandR`         | An avatar's right hand.                           |
| `Foot`          | Either of an avatar's feet.                       |
| `FootL`         | An avatar's left foot.                            |
| `FootR`         | An avatar's right foot.                           |
| `Finger`        | Any finger on either of an avatar's hands.        |
| `FingerL`       | Any finger on an avatar's left hand.              |
| `FingerR`       | Any finger on an avatar's right hand.             |
| `FingerIndex`   | The index finger on either of an avatar's hands.  |
| `FingerMiddle`  | The middle finger on either of an avatar's hands. |
| `FingerRing`    | The ring finger on either of an avatar's hands.   |
| `FingerLittle`  | The little finger on either of an avatar's hands. |
| `FingerIndexL`  | The index finger on an avatar's left hand.        |
| `FingerMiddleL` | The middle finger on an avatar's left hand.       |
| `FingerRingL`   | The ring finger on an avatar's left hand.         |
| `FingerLittleL` | The little finger on an avatar's left hand.       |
| `FingerIndexR`  | The index finger on an avatar's right hand.       |
| `FingerMiddleR` | The middle finger on an avatar's right hand.      |
| `FingerRingR`   | The ring finger on an avatar's right hand.        |
| `FingerLittleR` | The little finger on an avatar's right hand.      |

## Object Traits

This category of tags describes traits an object might have. They have no special treatment in the VRChat client, but they may still be useful for creating systems that work across multiple avatars and worlds. These are broken down into the subsections below.

### Elements

The elemental properties of an object.

| Tag       | Description                                       |
|-----------|---------------------------------------------------|
| `Hot`     | An object or surface that's hot to the touch.     |
| `Cold`    | An object or surface that's cold to the touch.    |
| `Fire`    | Flames from a fire, or an object that is on fire. |
| `Freezer` | An object that can freeze objects it touches.     |
| `Wet`     | An object coated in a liquid.                     |
| `Water`   | Liquid water. Would likely make objects wet.      |
| `Wind`    | A volume that applies a wind force.               |

### Combat

Tags that might be relevant to combat systems in VRChat.

| Tag           | Description                                                                       |
|---------------|-----------------------------------------------------------------------------------|
| `Weapon`      | General tag for something usable as a weapon.                                     |
| `Shield`      | General tag for something that can block or deny damage.                          |
| `Damage`      | General tag for anything at all that could cause damage on contact.               |
| `DamageBlunt` | A specific variation of Damage for damaging objects that are blunt, like a club.  |
| `DamageSharp` | A specific variation of Damage for damaging objects that are sharp, like a sword. |
| `Ammunition`  | An object treatable as ammunition for a ranged weapon.                            |
| `Projectile`  | An object that moves through the air to deal damage, usually fired from a weapon. |

### Interaction

Common interactions between an avatar and objects in the world around it.

| Tag               | Description                                            |
|-------------------|--------------------------------------------------------|
| `Consumable`      | Some kind of consumable, like food or a potion.        |
| `ConsumableFood`  | A variation of Consumable specific to food items.      |
| `ConsumableDrink` | A variation of Consumable specific to drink items.     |
| `Brush`           | A brush affecting hair, fur, etc.                      |
| `Dye`             | An object that can change the color of another object. |