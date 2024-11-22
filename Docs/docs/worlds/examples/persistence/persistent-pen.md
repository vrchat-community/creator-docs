---
description: "Save Pen Lines with PlayerObjects."
sidebar_custom_props:
    customIcon: 🖊️
---
import HowToImportExample from '/docs/worlds/examples/persistence/_how-to-import.mdx';

# Persistent Pen

![Persistent Idle Game World Preview](/img/worlds/examples/persistence/persistent-pen.jpg)

This example allows players to use a pen to draw up to 20 colored lines. Lines are synchronized for all players. The eraser can highlight and delete lines drawn by the local player.

Visit the [Persistent Pen Example World](https://vrchat.com/home/world/wrld_e24ce788-1fda-42dc-912b-69cd9e51140c) to try it for yourself!

## Using the Example

Play the scene, pick up the pen, and tap "Use" without moving the pen much to cycle through the available colors. Hold "Use" and move the pen to make lines in 3D space, release "Use" to finish the line.

Drop the pen and pick up the eraser, then stick the eraser directly into any of your lines. Known Issue: In ClientSim, this does not highlight the line - it works in the VRChat Client. 

Press "Use" to delete the selected line - this adds it back to your collection of 20 lines.

Stop the scene and then restart it to see your lines restored!

<HowToImportExample/>

## Technical Breakdown
The `SimplePenSystem` has a `VRCPlayerObject` component on it, which instructs VRChat to automatically spawn it for each player in the world, and remove it when they leave. [VRCEnablePersistence](/worlds/components/vrc_enablepersistence) ensures that all synced properties of the pen system, such as the positions, points, and colors of each line, are automatically saved and loaded.

### Udon Program Details

This experience is powered by two programs - one for the [Pen](#udon-pen), and another for each [Line](#lines).

#### Udon Pen

Check out the `Udon Pen` script in the scene under `SimplePenSystem/Pen`. 
- Change the gradient used as the `Palette Color` to swap the available colors.

#### Lines
You can find the Lines the pen uses under `SimplePenSystem/Lines`.
- If you want more lines available per pen, just duplicate some of the existing lines! No other changes are needed.
- You can make changes per line, like setting different widths or materials.

---

## Roadmap
We plan to make the following improvements to this example in the future:
- Respawn the pen whenever it's more than X units away from you.
- Add a color picker where you hold a button to show a palette, then move to the color you want to use.
- Refactor the prefab to allow infinite lines.