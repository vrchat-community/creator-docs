---
title: Player Mod Setter
createdAt: 2023-01-02
updatedAt: 2023-01-02
excerpt: Sets the player's default movement speed.
---
This UdonBehaviour example script allows you configure the movement of players in your world.

This script sets these values once when a player joins your world. You may use other scripts to change these values later.
## Variables
| Name                  | Type  | Default | Description |
| -                     | -     | -       | - |
| Jump Height           | float | 3       | The jump strength of players. Affected by gravity.
| Run Speed             | float | 4       | The movement speed when moving forward or backward. (If the player is using a keyboard, they must hold `Shift`.) 
| Walk Speed            | float | 2       | (Keyboard only) The movement speed without holding the `Shift` key.
| Strafe Speed          | float | 2       | The movement speed when moving left or right.
| Gravity               | float | 1       | The amount that [gravity](https://docs.unity3d.com/ScriptReference/Physics-gravity.html) affects players.
| Use Legacy Locomotion | bool  | false   | Enables VRChat's deprecated legacy locomotion system. Cannot be disabled by Udon later.