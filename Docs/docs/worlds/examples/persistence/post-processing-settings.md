---
description: "Save and load bloom settings with PlayerData."
sidebar_custom_props:
    customIcon: 🎚️
---
import HowToImportExample from '/docs/worlds/examples/persistence/_how-to-import.mdx';

# Post-Processing Settings

![Persistent Post-Processing Settings World Preview](/img/worlds/examples/persistence/post-processing-weight-slider.png)

This scene saves and loads its bloom settings by saving the weight of a PostProcessing Volume into PlayerData.

Visit the [Persistence Post-Processing Settings Example World](https://vrchat.com/home/world/wrld_ccc0b71a-63ea-4476-bcc2-25dd1b24745d) to try it for yourself!

## Using the Example

Play the scene, and use the "Post-Processing Weight" slider to set the Bloom level. It should appear in your ClientSim PlayerData window as a float named "settings_pp_weight".

<HowToImportExample/>

## Technical Breakdown

There is an UdonSharp script called "UdonPostProcessing" on a GameObject with the same name.

When the Slider found at "UI for Post-Processing > Content > Slider" is moved, it calls `UdonPostProcessing.SliderUpdated` via a Unity UI Event. This method sets the target PlayerData value whenever the slider is updated.

Whenever PlayerData is updated, the `OnPlayerDataUpdated` event will trigger on this script, and do two things:

- Set the weight on the target PostProcessingVolume, which will change the local bloom strength.

- Update the slider's value and position to match the stored weight. This is done so that the slider will match the value when a player first loads into the instance and the values are restored from the server.
