# VRC Avatar Pedestal

Displays an avatar and allows users interact with the pedestal to switch into the avatar.

You can find an example in the SDK named [AvatarPedestal](/worlds/examples/udon-example-scene#avatarpedestal). This example calls the `SetAvatarUse` method when a user interacts with the pedestal.

## Parameters

| Parameter            | Description                                                                                                                                                                                                                                                                                                                                                                                  |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Blueprint Id         | Blueprint ID of the avatar to show.                                                                                                                                                                                                                                                                                                                                                       |
| Placement(optional)  | Transform to display the avatar on.                                                                                                                                                                                                                                                                                                                                                          |
| Change Avatar On Use | If `true`, you can call `SetAvatarUse` the change the local player's avatar. |
| Scale                | How big or small the avatar should be. Only affects the pedestal avatar.                                                                                                                                                                                                                                                                                                                      |


## Avatar ownership

Avatar pedestals behave differently depending on whether the avatar is public, private, or published on the marketplace:

- Public avatar: All users can see and use the pedestal.
- Private avatar: Only the uploader can see the pedestal and use it. Other users see an error.
- [Marketplace](/economy/store/avatar-marketplace) avatar: All users can see and use the pedestal. If a user doesn't own the avatar, they see the avatar details page instead.