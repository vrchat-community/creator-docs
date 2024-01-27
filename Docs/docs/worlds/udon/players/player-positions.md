---
title: "Player Positions"
slug: "player-positions"
hidden: false
createdAt: "2021-01-22T00:32:00.432Z"
updatedAt: "2023-03-28T19:07:26.827Z"
---
The player's position, rotation, and velocity can be accessed and changed with Udon. All of the following nodes require `VRCPlayerAPI` as an input.

For nodes that deal with forces relating to Players, see [Player Forces](/worlds/udon/players/player-forces). 
### GetPosition

Gets the position of the Player.

**Output**
- `Vector3`: The player's position in world space.  


### GetRotation

Gets the rotation of the Player.

**Input**

**Output**
- `Quaternion`: The player's rotation in world space.  

### GetBonePosition

Gets the position of the specified Bone in the Player's Avatar, or Vector3.Zero (0,0,0) if the bone does not exist. Note that Avatars may not have all the same bones in the places you expect, so be careful making assumptions about attributes like a player's height, pose etc based on the position of bones.

**Input**
- `HumanBodyBones`: The bone to check.

**Output**
- `Vector3`: The bone position in world space.
### GetBoneRotation

Gets the rotation of the specified Bone in the Player's Avatar, or Quaternion.Identity (0,0,0,1) if the bone does not exist. Note that Avatars may not have all the same bones in the places you expect, so be careful making assumptions about attributes like a player's height, pose etc based on the rotation of bones.

**Output**
- `Quaternion`: The bone rotation in world space.

### GetTrackingData

Gets a struct called TrackingData, which contains separate Position and Rotation data. This is the suggested way to get position and rotation data for a Player's head and hands. This returns data from the TrackingManager for a Local Player (ie the data coming from their headset / trackers) and from the RightHand, LeftHand and Head bones for a Remote Player. Origin returns the center of the local VR user's playspace, while returning the player's position for local Desktop users and all remote users. AvatarRoot returns data for the root transform of the avatar (the same transform that the player capsule is attached to). For users in Fully-Body Tracking, AvatarRoot will not rotate with the head facing direction. If you need data reflecting the general forward facing direction of a Player, consider using GetRotation instead.

**Input**
- `TrackingDataType`: The tracking data to check.

**Output**
- `TrackingData`: The player's tracking data of the specified type.  

### GetVelocity

Get the speed and direction of the player's movement.

**Output**
- `Vector3 velocity`: The player's velocity in world space.  

### SetVelocity

Set the speed and direction of the player's movement. If SetVelocity is called on the local player, their 'IsGrounded' property is set to false since they are not in direct control of their movements while this is happening.

**Input**
- `Vector3`: The player's velocity in world space.  

### IsPlayerGrounded

Get whether the player is touching the ground, which enables Jump.

**Ouput**
- `bool IsPlayerGrounded`: Whether the player is grounded.  

### TeleportTo

:::note Teleporting other players

TeleportTo only works with the [local player](/worlds/udon/players/getting-players/#networkingget-localplayer). You can use [networking](/worlds/udon/networking/) to cause other players to teleport themselves. 

:::

Send a player to a new spot and specified rotation, unless a Station does not allow it.

**Inputs**
- `Vector3 teleportPos`: The target position in world space.
- `Quaternion teleportRot`: The target rotation in world space.
- `SceneDescriptorSpawnOrientation TeleportOrientation` (optional): How to align players with the destination position and rotation. 
- `bool lerpOnRemote` (optional): Whether to interpolate the player's movement. If true, the teleportation is instantaneous and incurs and additional network bandwidth cost. If false, the teleportation is treated as normal player movement.



