# Networking

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Multiplayer experiences are at the heart of VRChat. To create a world that reacts to players and synchronizes data between them, you need to understand networking in VRChat.

This guide introduces the core networking concepts, with a path to deeper learning.

<iframe class="embedly-embed" src="//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2FMb6ZYBEhxiI%3Flist%3DPLe9XHNvXcouQjg5GULWGLj1tMzeythnQi&display_name=YouTube&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DMb6ZYBEhxiI&image=https%3A%2F%2Fi.ytimg.com%2Fvi%2FMb6ZYBEhxiI%2Fhqdefault.jpg&key=f2aa6fc3595946d0afc3d76cbbd25dc3&type=text%2Fhtml&schema=youtube" width="854" height="480" scrolling="no" title="YouTube embed" frameborder="0" allow="autoplay; fullscreen" allowfullscreen="true"></iframe>

## Overview

VRChat networking is built around three key concepts:

- **Variables** – Variables store data that can be shared across all players in a world. These values can represent anything from numerical scores to object positions or player states. When a variable is synchronized, its updates are sent to all players in the instance.

- **Events** – Events are triggered actions that occur at specific moments in time. Unlike variables, which hold persistent values, events execute once and then disappear. They can be used to create interactions, trigger animations, or activate scripted behaviors.

- **Ownership** – Ownership determines which player can modify and update a networked object. By default, the first player to enter an instance owns all networked objects. Ownership can be transferred between players, allowing different users to control objects and sync their interactions with others.

Understanding these core concepts is essential for building networked experiences in VRChat. The following sections will explore how to use variables, events, and ownership effectively.

## Using Variables for Syncing

There are two types of sync available:
1. **Continuous** – Best for frequently updating values (e.g., a growing tree).
2. **Manual** – Best for crucial values that must always be correct (e.g., a scoreboard).

<Tabs groupId="udon-compiler-language">
<TabItem value="graph" label="Udon Graph">

![The Variables window in an Udon Graph shows the variables you've created, and lets you edit their properties.](/img/worlds/index-e057e35-slider-program-variables.png)

In the image above, we have three different variables, with the 'synced' box checked for the 'sliderValue' variable. The Owner of this GameObject will be in charge of this variable value, and their changes will be sent to everyone else.

</TabItem>
<TabItem value="cs" label="UdonSharp">

```cs
[SerializeField] private Slider slider;
[SerializeField] private Text sliderValueText;
[SerializeField, UdonSynced] private float sliderValue;
```

In the code above, we have three different variables, with the 'UdonSynced' attribute for the 'sliderValue' variable. The Owner of this GameObject will be in charge of this variable value, and their changes will be sent to everyone else.

</TabItem>
</Tabs>


### Example: Synced Slider
![](/img/worlds/udon-networking-8472b6b-synced-slider.png)

In this example, the Owner of a Slider syncs its value to everyone else. Note that this is meant to illustrate the concepts - we'll release a separate example that goes into the nitty-gritty 'how-to' details.

The slider's value is a number between 0 and 1, which we call a floating point value, or a float for short. So we make a variable to save and sync this value named *sliderValue*, with a type of **float**. 

We set up our slider to update *sliderValue* whenever the Owner moves it. This variable is then packed up and sent to everyone else, to update their own *sliderValue* variable to match. 

The process of packing and sending the variable is called **Serialization**, and **Deserialization** is when the data is received and unpacked.

When a new Player joins a instance, all of the synced variables in that world are sent to them so they can see what everyone else sees.

## Using Events for Syncing
Unlike variables, **events do not stick around**—they happen and then disappear. If we used an Event in the Synced Slider example above, any new Players who joined the instance would not have their Sliders synced up. So events are useful for things that you want to happen **right away** for everyone who's in the instance **right now**.

### Example: Bubble Gun
![](/img/worlds/udon-networking-33702b1-bubble-gun-shooting.png)

In this example, we have an object with a particle system and an animator that spins its bubble wand and generates bubble particles. We want this to happen for everyone in the world when the user holding the wand presses the trigger.

In our Udon Graph, we have a custom event we call "Trigger" which Plays the 'Spin' animation and triggers 22 Particles to Emit - this is just a local event in our graph.

To make this happen for everyone, we tie the **OnPickupUseDown** event which is triggered when someone presses Use while holding our Bubble Gun, and we use **SendCustomNetworkEvent** with a target of *All* to fire the "Trigger" event for everyone, including the Owner of the object.

<Tabs groupId="udon-compiler-language">
<TabItem value="graph" label="Udon Graph">

![Networked pickup particles in the Udon Graph](/img/worlds/udon-networking-e21b3b0-bubble-gun-graph.png)

</TabItem>
<TabItem value="cs" label="UdonSharp">

```cs
using UdonSharp;  
using UnityEngine;  
using VRC.Udon.Common.Interfaces;  
  
[UdonBehaviourSyncMode(BehaviourSyncMode.Manual)]  
public class BubbleGun : UdonSharpBehaviour  
{  
    [SerializeField] private Animator animator;  
    [SerializeField] private ParticleSystem particles;  
      
    public override void OnPickupUseDown()  
    {  
        SendCustomNetworkEvent(NetworkEventTarget.All, nameof(Trigger));  
    }  
  
    public void Trigger()  
    {  
        animator.Play("Spin");  
        particles.Emit(22);  
    }  
}
```

</TabItem>
</Tabs>

## Example Package & Next Steps
To see these concepts in action, download the example package:

[UdonNetworkingConcepts.unitypackage](https://assets.vrchat.com/sdk/UdonNetworkingConcepts.unitypackage)

After you've read the above and explored the example, continue below to dig deeper into VRChat Networking.

## More Networking Concepts

- **[Custom Network Events](/worlds/udon/networking/events)**
  - How to send and receive events over the network, including parameters.
- **[Network Variables](/worlds/udon/networking/variables)**
  - More info on how to best use variables to keep your players synced up.
- **[Late Joiners](/worlds/udon/networking/late-joiners)**
  - Learn how to quickly sync up anyone who joins your world with the rest of the players, instead of hanging up a "late joiners not supported" sign.
- **[Object Ownership](/worlds/udon/networking/ownership)**
  - Changing ownership of objects dynamically.
- **[Debugging Network Issues](/worlds/udon/networking/debugging)**
  - Using debug tools to track sync issues.

See the navigation bar for the full list of networking-related topics to learn about!