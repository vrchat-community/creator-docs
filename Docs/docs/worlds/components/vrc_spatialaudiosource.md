---
title: "VRC Spatial Audio Source"
slug: "vrc_spatialaudiosource"
excerpt: "Creates a spatial audio source in VRChat"
hidden: false
createdAt: "2019-07-08T14:35:40.642Z"
updatedAt: "2021-10-20T20:02:34.121Z"
---
Use `VRC_SpatialAudioSource` to add 3D spatialization to a Unity `Audio Source`.

When added, `VRC_SpatialAudioSource` will automatically add a Unity `Audio Source` component.

This component can be used on both avatars and worlds.

![image](/img/worlds/vrc_spatialaudiosource-1.png)
## Unity Editor Interface

The component generates two [Unity Gizmos](https://docs.unity3d.com/ScriptReference/Gizmos.html) that show:

- Far
- Near

In addition, the `Audio Source` component generates a "Volumetric Radius" gizmo.

Here's what the gizmos look like:
![Component in this image is a bit out of date, but the gizmos are the same.](/img/worlds/vrc_spatialaudiosource-e975780-Unity_2019-07-09_11-51-13.png)
The component contains tooltips for all properties. Hover over the name of the property to see a short description.

## Falloff Mechanics

All units are in *meters*. Falloff of audio intensity is roughly inverse-square by default, as illustrated below:
![](/img/worlds/vrc_spatialaudiosource-c969d41-crowhurst_basic_audio_vol1-39.gif)

You can override the curve using the graph on the `Audio Source`. This curve determines the intensity of the audio at a given distance.

At ranges approaching the `Far` value, audio may fade out more quickly depending on your settings.

### Using 2D Audio

2D audio is where the audio's volume is constant no matter where you are in a world. This might be used for background noise that is already recorded as a spacialized source (a field recording) or background music.

**You can use 2D avatar audio if you like** by disabling the `Use Spatialized Audio` option in the component. Unless you choose to use a different audio falloff curve, the intensity will still drop off over distance as before, it just won't be spatialized.

All that being said, **we do not recommend using 2D audio.** All real-world sources of sound have distinct point or volumetric sources. If you wish to use 2D audio regardless, ensure that you:
- Uncheck `Use Spatialized Audio` on the `VRC_SpatialAudioSource`
- Adjust Spatial Blend on the `Audio Source` to be 100% 2D

## Spatial Audio on Avatars

VRChat supports using `VRC_SpatialAudioSource` on avatars, albeit with some [limitations](/worlds/components/vrc_spatialaudiosource#section-avatar-limitations). These limitations are in place to prevent abuse and malicious sounds.

Other than these limitations, `VRC_SpatialAudioSource` works precisely the same on avatars as it does in worlds.
:::danger Don't Forget to add a SpatialAudioSource!

If you don't add a `VRC_SpatialAudioSource` with your avatar audio sources, one will be added by the SDK with default settings.\n\nIf you use a pre-existing avatar-based `Audio Source` without a `VRC_SpatialAudioSource` or ONSP (legacy) component, you may get unexpected, undocumented, and undesired behavior. We **strongly recommend** always using `VRC_SpatialAudioSource` with any avatar-based `Audio Sources`.
:::
## Component Properties
:::caution

Adjusting these properties via animations during runtime is not supported. These values are set at initialization.\n\nAnimating properties of the `Audio Source` should still work for properties that are not related to spatialization settings, like pitch.",
  "title": "Dynamic Adjustment at Runtime
:::

:::caution Disabling / Enabling Sound Sources

On avatars, it is best to disable and enable the Audio Source components rather than the entire GameObject.
:::

Here's the information converted into a two-column markdown table:

| Property                         | Description     |
| :-- | :-- |
| Gain                             | An additional boost to volume. By default, world audio sources get a 10dB boost. Avatar audio sources are limited to a maximum gain of 10dB. |
| Far                              | The far radius, in meters, where volume falls off to silence. By default, it is set to 40m. Avatar audio is limited to a maximum of 40m. <br /> Far only overrides an Audio Source curve if you turn on the "Use Spatializer Falloff" checkbox on VRC_SpatialAudioSource. |
| Advanced: Near                   | The near radius, in meters, where volume begins to fall off. We recommend keeping this at zero for realism and effective spatialization. Defaults to 0m. <br /> Near only overrides an Audio Source curve if you turn on the "Use Spatializer Falloff" checkbox on VRC_SpatialAudioSource.  |                                                                                                                                                 |
| Advanced: Volumetric Radius      | An audio source is normally simulated to be a point source, however changing this value allows the source to appear to come from a larger area. This should be used carefully and is mainly for distant audio sources that need to sound "large" as you move past them. <br /> The listener should not ever get close to the radius for best results. Keep this at zero unless you know what you're doing. Defaults to 0m. <br />  The value for Volumetric Radius should always be lower than Far. |
| Advanced: Use AudioSource Volume Curve | Use the AudioSource's '3D Sound Settings' volume curve. If unchecked, use Inverse Square falloff. It is recommended to keep this disabled to ensure realistic and authentic spatialization. <br /> <br /> Defaults to False. |
| Advanced: Enable Spatialization  | Uncheck this to disable the default inverse-square falloff curve and instead use the Audio Source's spatialization settings. <br /><br /> Defaults to True.|

The table above represents the "Property" and "Description" columns of the information you provided.

If you have any further questions or need additional assistance, feel free to ask!

## Avatar Limitations
You are permitted to adjust the fall-off curve on avatar-based `Audio Sources`. Simply set `Use AudioSource Volume Curve` to True, adjust the curve in the `Audio Source`, and VRChat will use that fall-off curve instead of the default inverse-square.

However, as noted above, there are some limitations on `VRC_SpatialAudioSource` components on avatars. These limits are enforced at run-time.

- `Gain` cannot exceed 10db
- `Far` cannot exceed 40m

[Player Audio](/worlds/udon/players/player-audio) can override these settings.

### Curve Squashing

If you attempt to play avatar audio with a custom curve in a world with a shorter `Far` distance than normal, Unity "squashes" the curve. You can see what happens by adjusting the `maxDistance` range on the Audio Source.

### Avatar Audio Compressor
There is a compressor on the Avatar audio channel that prevents sounds from being maliciously loud. This should not affect normal use of avatar audio sources that have reasonable volume levels.

### Tips for Avoiding the Compressor

If you've got audio on your avatar, there's a few things you can do with your audio beforehand to ensure you're not going to hit the compressor.

1. Try to get "dry" audio files-- that is, audio files with no effects. Reverb and delay are the most egregious in causing compressor "pumping".
2. Leave a bit of headroom in the audio file. In other words, don't fit the waveform to the very top and bottom of the range. In Audacity (or other wave editor), normalize your audio between -6 and -12db.
3. Try to avoid extremely high peaks in the waveform with very short attack-- in other words, don't suddenly "pump" the audio to very high levels. If you normalize, this should drop out of the file regardless.

## Replacing ONSP in Old Scenes

Using the "Enable 3D Spatialization on all AudioSources" button in the Build Control Panel now converts any `ONSPAudioSource` to `VRC_SpatialAudioSource` components. Some of these sources may require tweaking after the conversion.