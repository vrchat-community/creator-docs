---
title: "VRC Scene Descriptor"
slug: "vrc_scenedescriptor"
hidden: false
createdAt: "2017-07-06T00:43:48.565Z"
updatedAt: "2019-11-23T01:41:31.381Z"
---
Describes your VRChat world. Required for every Unity scene you'd like to use as a VRChat world.

| Parameter                    | Description                                                                                                     |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Spawns                       | An array of transforms used as reference for spawn points of the world.                                        |
| Spawn Order                  | Order in which spawn locations should be used, options include:                                                |
|                              | - First: Always use the first spawn                                                                             |
|                              | - Sequential: In the order that spawns are listed                                                               |
|                              | - Random: Spawns users randomly                                                                                  |
|                              | - Demo: The spawn point represents the center of your room scale meaning, for example, if you're a meter away from the center of your room scale, you spawn a meter away from the spawn. |
| Spawn Orientation            | Orientation the user will be spawned in at, options include:                                                   |
|                              | - Default: The VRChat Default spawn setting (Currently Align Player With Spawn Point)                         |
|                              | - Align Player With Spawn Point: Aligns player with the rotation of the spawn transform                         |
|                              | - Align Room With Spawn Point: Aligns players' room scale to be centered on the spawn point                    |
| Reference Camera             | Settings from this camera are applied to users in the room. Can be an object in the scene or prefab.            |
| Respawn Height -Y            | Height at which players respawn and pickups are respawned or destroyed.                                        |
| Object Behaviour At Respawn  | What should pickups do when they fall out of the world, options include:                                        |
|                              | - Destroy: Delete the pickup                                                                                    |
|                              | - Respawn: Respawn the pickup to the location it started at                                                     |
| Forbid Free Modification     | If true, non-sync'd objects can't be manipulated by non-master.                                                 |
| Forbid User Portals          | Prevent users from opening portals from the world menu.                                                         |
| User Custom Voice Falloff Range | Enable the next couple options which control the voice falloff range.                                           |
| Voice Falloff Near           | The distance where users' voices start reducing in volume.                                                      |
| Voice Falloff Far            | The distance where users' voices become inaudible.                                                              |
| Unity Version                | Unity version being used; you should never need to touch this.                                                  |
| Dynamic Prefabs              | An array of prefabs that can be dynamically spawned at runtime. Any prefab that isn't referenced in the scene but needs to be spawned should be listed here. |
| Dynamic Materials            | An array of materials that can be dynamically changed at runtime. Any material that isn't referenced in the scene but needs to be set to an object should be listed here. |
