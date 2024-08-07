---
excerpt: Sets the player's default movement speed.
---
# Player Mod Setter

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This UdonBehaviour example script allows you configure the movement of players in your world.

## Variables

| Name                  | Type  | Default | Description                                                                                                                                                                                     |
| --------------------- | ----- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Jump Height           | float | 3       | The jump strength of players. Affected by gravity.                                                                                                                                              |
| Run Speed             | float | 4       | - Keyboard input: The movement speed when moving forward or backward without holding the 'Shift' key.<br />- Analog stick input: The movement speed when tilting the stick forward or backward. |
| Walk Speed            | float | 2       | - Keyboard input: The movement speed when moving forward or backward without holding the 'Shift' key.<br />- Analog stick input: Always uses "Run Speed" instead of "Walk Speed."               |
| Strafe Speed          | float | 2       | The movement speed when moving left or right.                                                                                                                                                   |
| Gravity               | float | 1       | The amount that [gravity](https://docs.unity3d.com/ScriptReference/Physics-gravity.html) affects players.                                                                                       |
| Use Legacy Locomotion | bool  | false   | Enables VRChat's deprecated legacy locomotion system. Cannot be disabled by Udon later.                                                                                                         |

## Example

The UdonSharp program is called `PlayerModSetter.cs` and the Udon Graph program is called `VRCWorldSettings.asset`. They work very similarly, and either one can be used in your VRChat world.

<Tabs groupId="udon-compiler-language">
<TabItem value="graph" label="Udon Graph">

This Graph program can be found in `Packages/com.vrchat.worlds/Samples/UdonExampleScene/UdonProgramSources/VRCWorldSettings.asset/`.

![An Udon Graph program that sets various attributes for the player when they join the world. It contains several text comments explaining basic Graph syntax.](/img/worlds/udon/examples/vrcworldsettings.png)

</TabItem>
<TabItem value="cs" label="UdonSharp">

This is a simplified example of the UdonSharp script `\Assets\UdonSharp\UtilityScripts\PlayerModSetter.cs`.

```cs showlinenumbers
using UnityEngine;
using VRC.SDKBase;

public class PlayerModSettings : UdonSharpBehaviour
{
    VRCPlayerApi playerApi;

    [Header("Player Settings")]
    [SerializeField] float jumpImpulse = 3;
    [SerializeField] float walkSpeed = 2;
    [SerializeField] float runSpeed = 4;
    [SerializeField] float gravityStrength = 1;

    void Start()
    {
        playerApi = Networking.LocalPlayer;
        playerApi.SetJumpImpulse(jumpImpulse);
        playerApi.SetWalkSpeed(walkSpeed);
        playerApi.SetRunSpeed(runSpeed);
        playerApi.SetGravityStrength(gravityStrengh);
    }
}
```

</TabItem>
</Tabs>