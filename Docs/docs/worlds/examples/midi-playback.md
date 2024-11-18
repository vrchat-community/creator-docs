---
title: MIDI Playback
description: "Play synchronized MIDI and audio files."
sidebar_custom_props:
    customIcon: 🎵
---
import HowToImportExample from '/docs/worlds/examples/_how-to-import.mdx';
import UnityVersionedLink from '@site/src/components/UnityVersionedLink.js';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<video controls>
  <source src="https://user-images.githubusercontent.com/737888/214626843-53a4c069-ea69-423a-926d-e2ce024c9819.mp4"/>
</video>

This example plays back a [MIDI file](https://midi.org/standard-midi-files) synchronized to an audio file made from the MIDI. You can use this to synchronize events in your world from a MIDI track, to tie music and visuals together for an immersive experience.

Visit the [Midi Playback Example World](https://vrchat.com/home/world/wrld_57799f09-406a-4c8c-9c42-e593cae6305a) to try it for yourself!

## Using the Example

Play the scene in the Unity Editor or visit the world in VRChat to see and hear the MIDI playback. As the short loop plays, differently colored images will flash in time with the music - these are visualizations of the MIDI Note events happening on four different channels in the MIDI file.

<HowToImportExample/>

## Technical Breakdown

The [VRCMidiPlayer](/worlds/udon/midi/midi-playback/#component-vrcmidiplayer) is similar to an <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/ScriptReference/AudioSource.html">AudioSource</UnityVersionedLink> but it uses a Midi Asset instead, and sends [Note On](/worlds/udon/midi#midinoteon) and [Note Off](/worlds/udon/midi#midinoteoff) events to the [MidiGrid UdonBehaviour](#midigrid).

### MidiGrid

This program visualizes Midi Note On and Off events using colored blocks. 

Whenever a Note On event is sent from the VRCMidiPlayer, the program will check if its channel matches one of the grids (see the `channels` field below). If there is a match, then the program chooses the corresponding block to enable by calculating the [remainder](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/language-specification/expressions#12104-remainder-operator) of the note number with 12 to find the corresponding image. For example, note numbers 11 and 12 will trigger the 11th and 12th images in the grid, while numbers 13 and 14 will trigger images 0 and 1, rolling over to fit the note numbers to the grid. Once the target image is calculated, it is enabled.

When a Note Off event is sent from the VRCMidiPlayer, the program makes the same calculations to find the target grid and image, but disables it to make it invisible.

### Inspector Fields

| Name | Description |
|---|---|
| grids | References to <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/ScriptReference/RectTransform.html">RectTransform</UnityVersionedLink> which have a [GridLayoutGroup](https://docs.unity3d.com/Packages/com.unity.ugui@2.0/manual/script-GridLayoutGroup.html) on them, with 12 child [Images](https://docs.unity3d.com/Packages/com.unity.ugui@2.0/manual/script-Image.html) corresponding to the notes in a full octave. |
| channels | Array of integers used to remap MIDI channels to the four image grids in the scene. The default value of `[3, 4, 1, 2]` will show note events from channel 3 on grid 0, events from channel 4 on grid 1, etc. |
| player | Reference to the VRCMidiPlayer sending events to the MidiGrid. |

#### Swapping the Data

If you have MIDI and Audio files, you can import them and replace the existing assets with your own to see how they look in the scene.

#### Changing the Channels

The MidiGrid program has a variable called `channels`. This array matches channels from the MIDI data to grids on-screen. By default, the order is "3 4 1 2". This means that the first grid will show data from channel 3, the second grid will show channel 4, etc. You can switch the order here to change the visuals a little.

If you load your own MIDI data file, you can check Unity's console to see the channels and notes being played. Each Note On event will log a message like "3:75". This shows you that channel 3 played note 75.

#### Adding Grids

If you want to use a song with more than 4 channels, you can duplicate the grids and add them to the `grids` variable on the program. Make sure to add more `channels` as well!

#### The Whole Program, Explained

Here's a breakdown of what happens in the MidiGrid Program.

<Tabs groupId="udon-compiler-language">
<TabItem value="graph" label="Udon Graph">

**Start Event:**

![Start event for the midi playback example in the Udon Graph](/img/worlds/midi/midi-sample-graph-start.png)

On Start, it goes through each object in the `grids` array, finds the 'Image' component on its child, and sets its `enabled` value to `false`, effectively hiding all the Images to start.

It also waits 1 second after loading and then calls `Play()` on the VRCMidiPlayer to start the music and data flow.

**Note Events:**

![Midi note on event for the midi playback example in the Udon Graph](/img/worlds/midi/midi-sample-graph-on.png)


When it receives a `Midi Note On` event, it will loop through each entry in the `channels` array and check if the incoming note's channel matches one of the entries. If a match is found, that number is used as the `index` for the `grids` array to find the matching grid. The incoming note is run through `int.Remainder()` to find its index in the octave - a C will be 0, a C# will be 1, etc. This index is used to find the right child of the grid, and then set `enabled` on the 'Image' to `true`. Finally, the note's channel and note number are logged to the console. 

![Midi note off event for the midi playback example in the Udon Graph](/img/worlds/midi/midi-sample-graph-off.png)

When the script receives a `Midi Note Off` event, it goes through a similar process as above. To hide the 'Image' component again, it sets `enabled` to `false`.

</TabItem>
<TabItem value="cs" label="UdonSharp">

```cs
using UdonSharp;  
using UnityEngine;  
using UnityEngine.UI;  
using VRC.SDK3.Midi;  
  
[UdonBehaviourSyncMode(BehaviourSyncMode.None)]  
public class LogoButton : UdonSharpBehaviour  
{  
    [SerializeField] private Transform[] grids;  
    [SerializeField] private VRCMidiPlayer player;  
    [SerializeField] private int[] channels;  
      
    private void Start()  
    {  
        // Disable Image components of all grid children  
        foreach (var grid in grids)  
        {  
            for (var i = 0; i < grid.childCount; i++)  
            {  
                var child = grid.GetChild(i);  
                var image = child.GetComponent<Image>();  
                image.enabled = false;  
            }  
        }  
  
        SendCustomEventDelayedSeconds(nameof(_PlayAudio), 1);  
    }  
  
    public void _PlayAudio()  
    {  
        player.Play();  
    }  
  
    public override void MidiNoteOn(int channel, int number, int velocity)  
    {  
        UpdateGridState(channel, number, true);  
        Debug.Log($"{channel} : {number}");  
    }  
  
    public override void MidiNoteOff(int channel, int number, int velocity)  
    {  
        UpdateGridState(channel, number, false);  
    }  
  
    private void UpdateGridState(int midiEventChannel, int midiEventNoteNumber, bool isEnabled)  
    {  
        // Find all grids that are mapped to the midi event's channel.  
        for (var gridIndex = 0; gridIndex < grids.Length; gridIndex++)  
        {  
            var gridChannel = channels[gridIndex];  
            if (midiEventChannel != gridChannel) continue;  
              
            // Enable/Disable image, quantized by chromatic 12 note scale.  
            var child = grids[gridIndex].GetChild(midiEventNoteNumber % 12);  
            var image = child.GetComponent<Image>();  
            image.enabled = isEnabled;  
        }  
    }  
}
```

</TabItem>
</Tabs>