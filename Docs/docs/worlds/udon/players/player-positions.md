---
title: "Player Positions"
slug: "player-positions"
hidden: false
createdAt: "2021-01-22T00:32:00.432Z"
updatedAt: "2023-03-28T19:07:26.827Z"
---
Here are the nodes relating to Players' positions. For nodes that deal with forces relating to Players, see [Player Forces](/worlds/udon/players/player-forces) 

### GetPosition

_returns Vector3 in World Space_  
Gets the position of the Player.

### GetRotation

_returns UnityEngine.Quaternion in World Space_  
Gets the rotation of the Player.

### GetBonePosition

_returns Vector3 in World Space_  
Gets the position of the specified Bone in the Player's Avatar, or Vector3.Zero (0,0,0) if the bone does not exist. Note that Avatars may not have all the same bones in the places you expect, so be careful making assumptions about attributes like a player's height, pose etc based on the position of bones.

### GetBoneRotation

_returns Quaternion in World Space_  
Gets the rotation of the specified Bone in the Player's Avatar, or Quaternion.Identity (0,0,0,1) if the bone does not exist. Note that Avatars may not have all the same bones in the places you expect, so be careful making assumptions about attributes like a player's height, pose etc based on the rotation of bones.

### GetTrackingData

_returns TrackingData for the given TrackingDataType: Head, LeftHand, RightHand, or Origin_  
Gets a struct called TrackingData, which contains separate Position and Rotation data. This is the suggested way to get position and rotation data for a Player's head and hands. This returns data from the TrackingManager for a Local Player (ie the data coming from their headset / trackers) and from the RightHand, LeftHand and Head bones for a Remote Player. Origin returns the center of the local VR user's playspace, while returning the player's position for local Desktop users and all remote users.

### GetVelocity / SetVelocity

_returns Vector3 in World Space_  
Get and set the speed and direction of the player's movement. If SetVelocity is called on a LocalPlayer, their 'IsGrounded' property is set to false since they are not in direct control of their movements while this is happening.

### IsPlayerGrounded

_returns Boolean_  
Get whether the player is touching the ground, which enables Jump.

### TeleportTo

_takes a Vector3 World Position and Quaternion World Rotation_  
Send a Player to a new spot and specified rotation, unless a Station does not allow it.