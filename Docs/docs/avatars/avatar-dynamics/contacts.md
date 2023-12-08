---
title: "Contacts"
slug: "contacts"
hidden: false
createdAt: "2022-03-03T00:07:46.847Z"
updatedAt: "2022-05-03T19:31:41.007Z"
---
Contacts are a system that allows avatars to detect collisions with itself or other avatars. These collisions can then be used to drive the animation controller and perform all sorts of fun effects. 

These are separate from standard Unity colliders. Contacts are broken down into senders and receivers. Senders simply exist to be detected. Receivers detect senders and then update parameters accordingly.

The amount of contacts on your avatar affect its [performance rank](/avatars/avatar-performance-ranking-system#pc-limits).

## VRCContactSender
The Contact Sender component defines a volume of space that will send a Contact signal upon contact with a Contact Receiver.
![contacts-59b6e82-2022-04-19_11-53-01_Unity.png](/img/avatars/contacts-59b6e82-2022-04-19_11-53-01_Unity.png)
- `Root Transform` - Transform where this contact is placed. If empty, we use this game object's transform.

### Shape
This section contains settings that define the shape of the ContactSender.
- `Shape Type` - Type of collision shape used by this contact. You can choose between Sphere and Capsule.
- `Radius` - Size of the collider extending from its origin.
- `Height` - Height of the capsule along the chosen axis.
- `Position` - Position offset from the root transform.
- `Rotation` - Rotation offset from the root transform.

### Filtering
This section contains settings allowing you to adjust and define how this ContactSender will interact with  [ContactReceivers](/avatars/avatar-dynamics/contacts/#vrccontactreceiver).

- `Collision Tags` - List of strings that specify what it can affect/be affected by. For a successful collision to occur, both the sender and receiver need at least one matching pair of strings. Collision tags are case sensitive.

As an example, the tags below will cause the Sender to send a contact signal when they come into contact with the default Head [ContactReceiver](/avatars/avatar-dynamics/contacts/#vrccontactreceiver) or any custom [ContactReceiver](/avatars/avatar-dynamics/contacts/#vrccontactreceiver) with the tag `Face`-- note the capital F!
![contacts-de34d55-2022-04-19_11-53-34_NVIDIA_Share.png](/img/avatars/contacts-de34d55-2022-04-19_11-53-34_NVIDIA_Share.png)
### Standard Colliders
A set of "Standard Colliders" are defined in the Avatar Descriptor, in a new section called “Colliders”. This section lets you define a number of standard colliders that exist on every avatar. These will be setup automatically if you don’t touch this, but they may also be tweaked to exactly fit your avatar. These colliders do not affect the performance rating.

- Head
- Torso
- Hands L/R
- Feet L/R
- Fingers L/R
  - Index
  - Middle
  - Ring
  - Little

These colliders act primarily as Contact Senders that other people can detect with their avatars. However, the finger and hand colliders are also used to create global [PhysBone](/avatars/avatar-dynamics/physbones) Colliders that can be used to affect other people’s PhysBones.

## VRCContactReceiver
The Contact Receiver component defines a volume of space that will receive a Contact signal upon contact with a Contact Sender. It will then set an [Animator Parameter](/avatars/animator-parameters) in a certain way, as defined by the user.
![contacts-6f84ac4-2022-04-19_11-57-25_NVIDIA_Share.png](/img/avatars/contacts-6f84ac4-2022-04-19_11-57-25_NVIDIA_Share.png)
- `Root Transform` - Transform where this contact is placed. If empty, we use this game object's transform.

### Shape
This section contains settings that define the shape of the ContactReceiver.

- `Shape Type` - Type of collision shape used by this contact.
- `Radius` - Size of the collider extending from its origin.
- `Height` - Height of the capsule along the chosen axis.
- `Position` - Position offset from the root transform.
- `Rotation` - Rotation offset from the root transform.
- `Collision Tags` - List of strings that specify what it can affect/be affected by. For a successful collision to occur, both the sender and receiver need at least one matching pair of strings. Collision tags are case sensitive.

### Filtering
This section contains settings allowing you to adjust and define how this ContactReceiver will interact with  [ContactSenders](/avatars/avatar-dynamics/contacts/#vrccontactsender).

- `Allow Self` - Allow this contact to be affected by yourself.
- `Allow Others` - Allow this contact to be affected by other people.
- `Local Only` - Limit this contact to only work on the local client.
- `Collision Tags` - List of strings that specify what it can affect/be affected by. For a successful collision to occur, both the sender and receiver need at least one matching pair of strings. Collision tags are case sensitive.

### Receiver
This section contains settings defining what the Receiver does when it gets a signal.

`Receiver Type` defines the behavior of the parameter setting when a signal is received.
- `Constant` - Informs you when any contacts are present. Resets when no contact is detected. Ideally, use a bool parameter here. Sets `1.0` for a Float, `True` for a Bool, and `1` for an Int.
- `OnEnter` - Informs you the frame a contact is detected. Resets immediately the next frame. Ideally, use a bool parameter here. Sets `1.0` for a Float, `True` for a Bool, and `1` for an Int. Can optionally have a `Min Velocity` defined.
- `Proximity` - Gives you a Float value of `0.0-1.0` depending how close a contact is to the trigger's center. This is calculated as the closest point of the sender onto the receiver. You must use a Float. If multiple contacts are detected, it will give you the closest. 

:::note
If you want to have a more precise measurement of proximity, you need to adjust the Sender's radius to be very small.
:::

- `Parameter` - The parameter updated on the animation controller. This parameter DOES NOT need to be defined on the synced Avatar Parameter list. The parameter can be a Float, Bool, or Int, depending on the Receiver Type used.
- `Value` - Value the parameter is updated to when a collision is detected. Parameter will reset to zero when no collisions are present.
- `Min Velocity` - Minimum velocity needed from an incoming collider to affect this trigger, only active in `OnEnter` type.
