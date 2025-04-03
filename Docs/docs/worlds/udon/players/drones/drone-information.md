---
title: "Drone Information"
slug: "drone-information"
hidden: false
createdAt: "2025-03-05T14:52:00.02Z"
updatedAt: "2025-03-05T14:52:00.02Z"
---
## Drone API

### GetPlayer

Gets the owner of the Drone.

**Output**
- `VRCPlayerApi`: The owning player object.  

### IsDeployed

Get whether the Drone is deployed in the world.

**Ouput**
- `bool`: Whether the drone is deployed.

### GetPosition

Gets the position of the Drone.

**Output**
- `Vector3`: The drone's position in world space.  

### TryGetPosition

Try to get the position of the Drone.

**Out**
- `Vector3 position`: The drone's position in world space.

**Output**
- `bool`: indicates whether it was successful

### GetRotation

Gets the rotation of the Drone.

**Output**
- `Quaternion`: The drone's rotation in world space.  

### TryGetRotation

Try to get the rotation of the Drone.

**Out**
- `Quaternion rotation`: The rotation of the Drone in world space.

**Output**
- `bool`: indicates whether it was successful

### GetVelocity

Get the speed and direction of the drone's movement.

**Output**
- `Vector3 velocity`: The drone's velocity in world space.  

### TryGetVelocity

Try to get the speed and direction of the drone's movement.

**Out**
- `Vector3 velocity`: The drone's velocity in world space.

**Output**
- `bool`: indicates whether it was successful

### TeleportTo

Set the world position and rotation of the Drone.

**Input**
- `Vector3`: The drone's position in world space.  
- `Quaternion`: The drone's rotation in world space.  
- `bool` (optional): If set to false or left unset, remote users' drones will snap to the target values. If set to true, remote users' drones will smoothly lerp to the target values.

### SetVelocity

Set the speed and direction of the drone's movement.

**Input**
- `Vector3`: The drone's velocity in world space.  