---
title: Minimap
description: "Displays a live minimap using Graphics.Blit"
sidebar_custom_props:
    customIcon: 📌
---
import HowToImportExample from '/docs/worlds/examples/_how-to-import.mdx';

![Minimap Example World](/img/worlds/examples/minimap-example-world.png)

This example includes a minimap that you can pickup and take around the world with you. Your position is shown as a blue dot on the map, and other players are shown as green dots.

Visit the [Minimap Example World](https://vrchat.com/home/world/wrld_12492ad5-ff17-445d-9f90-7b14376b1f32) to try it for yourself!

## Using the Example

Grab the minimap from the instruction area and walk around the world. Observe how the blue dot (you) stays centered as the map updates around you. 

Return to the instructions near spawn and press the button labeled "Toggle Visibility of Other Players", to turn it on. If you're testing in ClientSim, use the pause menu to Spawn a Remote Player. If you're testing in VRChat, join the world with an alt account or invite a friend. The remote player should show up on your map in green. You can press the button again to hide the green dot(s).

<HowToImportExample/>

## Technical Breakdown

### Udon Program

The Udon program works in the following way:
  - On Start: A camera, which is a part of a prefab, captures your scene from above. As a world creator - you can place it anywhere in your world.
  - On Update: The position of the local player is taken and passed through to a special shader (`MiniMap Blit`).
  - The shader then overlays a dot at the player's position onto the map capture.
  - If you allow showing other players - you can then use the `_ShowOthersToggle` to toggle dots of other players on and off. Try it out with friends!

### Pickup

The pickup, in turn, is incredibly simple. It simply uses a material with the final output texture `MiniMap RT` assigned as its Main Texture and Emission.

### Other Notes

One of the benefits of `Graphics.Blit` is that you get a regular texture out of it, which you can in turn use for anything you want!

You can also control the update rate by simply calling `Graphics.Blit` more or less often.

Almost all of the parameters you can think of are adjustable via `MiniMap` program, so feel free to experiment!

If you're going to use this Example Prefab in your world, don't forget to adjust `MaxPlayers` variable to match your `World Capacity`.