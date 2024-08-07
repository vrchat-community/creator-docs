---
sidebar_position: -1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Udon Basics

This page contains examples of how to use [Udon](/worlds/udon/). All examples can be viewed as an [Udon Graph](/worlds/udon/graph) or in UdonSharp.

## Rotating cube

This behaviour rotates a game object (such as a cube) by 90 degrees every second on its local Y-axis.

<Tabs groupId="udon-compiler-language">
<TabItem value="graph" label="Udon Graph">

![An Udon Graph for a spinning cube.](\img\worlds\udon\examples\spinning-cube.png)

</TabItem>
<TabItem value="cs" label="UdonSharp">

```cs showLineNumbers
using UnityEngine;
using VRC.SDKBase;

public class RotatingCubeBehaviour : UdonSharpBehaviour
{
    private void Update()
    {
        transform.Rotate(Vector3.up, 90f * Time.deltaTime);
    }
}
```

</TabItem>
</Tabs>

## Interact

This behaviour uses [Interact](/worlds/udon/graph/event-nodes/#interact) to allow players interact with a object to disable it. This can be used for a message or a door that disappears when players click on it, for example. The game object must have a collider component to allow players to interact with it.

<Tabs groupId="udon-compiler-language">
<TabItem value="graph" label="Udon Graph">

![An Udon Graph that disables an object when interacting with it. It has several comments. For example, it demonstrates that leaving "instance" empty in the "Get gameObject" node causes it to retrieve to game object that this script is attached to.](\img\worlds\udon\examples\interact.png)

</TabItem>
<TabItem value="cs" label="UdonSharp">

```cs showLineNumbers
using UnityEngine;
using VRC.SDKBase;

public class ClickMe: UdonSharpBehaviour
{
    public override void Interact()
    {
        gameObject.SetActive(false);
    }
}
```

</TabItem>
</Tabs>

## Teleport player

This behaviour uses [Interact](/worlds/udon/graph/event-nodes/#interact) and [TeleportTo](/worlds/udon/players/player-positions/#teleportto) to teleport the player. The `targetPositon` transform determines the player's destination position and rotation after teleporting. Don't forget to add a collider component to the targetPosition GameObject.


<Tabs groupId="udon-compiler-language">
<TabItem value="graph" label="Udon Graph">

![An Udon Graph program that teleports the player to a target position. Comment points out that "targetPosition" must be defined as "public" to allow setting it in the inspector for instances of this script.](\img\worlds\udon\examples\teleport-player.png)

</TabItem>
<TabItem value="cs" label="UdonSharp">
```cs showLineNumbers
using UnityEngine;
using VRC.SDKBase;

public class TeleportPlayer : UdonSharpBehaviour
{
    public Transform targetPosition;
    
    public override void Interact()
    {
        Networking.LocalPlayer.TeleportTo(
            targetPosition.position,   
            targetPosition.rotation);
    }
}
```
</TabItem>
</Tabs>

## Sending events

This behaviour shows how to interact with other behaviours. UdonBehaviours can communicate with each other through variables and custom events.

<Tabs groupId="udon-compiler-language">
<TabItem value="graph" label="Udon Graph">

![An Udon Graph that communicates with other graph programs. Public variables and custom event names from other scripts are specified as constant strings and fed into the "symbolName" parameter of various nodes.](\img\worlds\udon\examples\custom-events.png)

</TabItem>
<TabItem value="cs" label="UdonSharp">
```cs showLineNumbers
using UdonSharp;  
using UnityEngine;  
using VRC.Udon.Common.Interfaces;  
  
public class SomeExample : UdonSharpBehaviour  
{  
    [SerializeField] private SomeOtherExample otherBehaviour;  
  
    void Start()  
    {  
        if(otherBehaviour.somePublicBoolean)  
        {  
            otherBehaviour.SomeCustomEvent();  
        }  
    }  
      
    public override void Interact()  
    {  
        DoStuff();  
    }  
  
    private void DoStuff()  
    {  
        SendCustomNetworkEvent(NetworkEventTarget.All, nameof(DoNetworkEventStuff));  
    }  
  
    public void DoNetworkEventStuff()  
    {  
        otherBehaviour.somePublicBoolean = false;  
        otherBehaviour.SomeCustomEvent();  
        otherBehaviour.SendCustomNetworkEvent(NetworkEventTarget.Owner, nameof(DoOwnerStuff));  
    }  
}
```
</TabItem>
</Tabs>
