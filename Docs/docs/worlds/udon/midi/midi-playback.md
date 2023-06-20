---
title: "Midi Playback"
slug: "midi-playback"
hidden: false
createdAt: "2023-02-16T02:12:05.772Z"
updatedAt: "2023-02-16T02:12:05.772Z"
---
You can play back MIDI data along with an audio track to control anything you want in your Udon world. You can jump to the [Example Scene](#example-midiplaybackscene) to get started right away.

## Assets: MidiFile and AudioClip

Files with the extension .mid are processed as MIDI assets. To get started with your own MIDI and Audio files:
1. Drag and drop them somewhere into your Assets folder. The MIDI file must have the extension .mid, the audio file can be of any [type supported by Unity](https://docs.unity3d.com/Manual/class-AudioClip.html) (.aif, .wav, .mp3, .ogg).
2. Select the MIDI file and set its AudioClip to the matching audio file.

![image](/img/worlds/midi-playback-214464414-32af9c18-c003-49ed-bd12-dd431367db56.png)

3. It's imperative that the BPM for your MIDI file is set correctly. If the data seems like it doesn't match the audio, this is likely the issue. You can override the BPM here by toggling on "Override Bpm" and supplying the right value. Even better would be to edit your MIDI file and add the correct BPM.


## Component: VRCMidiPlayer

![VRCMidiPlayer](/img/worlds/midi-playback-215556799-a546e119-afdb-441f-8019-70ee50b6c008.png)

This is the brains of the operation. It works similarly to an Audio Source but uses a Midi Asset instead. It sends MIDI [Note On](/worlds/udon/midi#midinoteon) and [Note Off](/worlds/udon/midi#midinoteoff) events to all target UdonBehaviours.

### Inspector Fields

<dl>
<dt>Midi File</dt>
<dd>The MIDI file in SMF format whose data you want to trigger.</dd>
<dt>Audio Source</dt>
<dd>The AudioSource component with the audio clip corresponding to your MIDI data.</dd>
<dt>Target Behaviours</dt>
  <dd>An array of UdonBehaviours which will have MIDI <a href="/worlds/udon#midinoteon">Note On</a> and <a href="/worlds/udon#midinoteoff">Note Off</a> events sent to them</dd>
<dt>Display Debug Blocks</dt>
<dd>When enabled, you can see a display of all the notes in your current MIDI file in the Scene View of the Unity Editor while the VRCMidiPlayer is selected. Helpful for a quick view into your data.</dd>
</dl>

### Methods

<dl>
<dt>Play()</dt>
<dd>Starts the playback of MIDI events and the Audio Source.</dd>
<dt>Stop()</dt>
<dd>Stops the playback of MIDI events and the Audio Source.</dd>
</dl>

### Properties

<dl>
<dt>`float` time</dt>
<dd>Set and Get the current time of both the MIDI and Audio sources.</dd>
<dt>`MidiData` midiData</dt>
<dd>Get a MidiData object containing all data about the current MIDI track. Can be used before playback to set things up.</dd>
</dl>

## Example: MidiPlaybackScene

https://user-images.githubusercontent.com/737888/214626843-53a4c069-ea69-423a-926d-e2ce024c9819.mp4

The SDK includes a simple MIDI playback example. You can load it from the menu bar under VRChat SDK > Samples > MidiPlayback.

After loading the scene, press 'Play' in Unity to see and hear the MIDI playback! As the short loop plays, differently colored images will flash in time with the music.

The important objects in the scene are the VRCMidiPlayer and the MidiGrid.

### VRCMidiPlayer

This GameObject has a VRCMidiPlayer component as well as an AudioSource, and they're all set up with an example MIDI File and AudioClip. It has the MidiGrid set as its one and only targetBehaviour.

### MidiGrid

This GameObject has an UdonBehaviour for receiving MIDI Events, and several Canvases as children.

Each Canvas has a "Grid" with 12 child Image components. These Images will be enabled and disabled when MIDI notes are played. An octave has 12 notes in it, so this allows visualizing each note as a separate Image.

### MidiGrid Program

#### Swapping the Data

If you have MIDI and Audio files, you can import them and replace the existing assets with your own to see how they look in the scene.

#### Changing the Channels

The MidiGrid program has a variable called `channels`. This array matches channels from the MIDI data to grids on-screen. By default, the order is "3 4 1 2". This means that the first grid will show data from channel 3, the second grid will show channel 4, etc. You can switch the order here to change the visuals a little.

If you load your own MIDI data file, you can check Unity's console to see the channels and notes being played. Each Note On event will log a message like "3:75". This shows you that channel 3 played note 75.

#### Adding Grids

If you want to use a song with more than 4 channels, you can duplicate the grids and add them to the `grids` variable on the program. Make sure to add more `channels` as well!

#### The Whole Program, Explained.

Here's a breakdown of what happens in the MidiGrid Program.

**Start Event:**
![image](/img/worlds/midi-playback-214465917-450d04cc-e7ce-4551-a3cd-f4feddd124b2.png)

On Start, it goes through each object in the `grids` array, finds the 'Image' component on its child, and sets its `enabled` value to `false`, effectively hiding all the Images to start.

It also waits 1 second after loading and then calls `Play()` on the VRCMidiPlayer to start the music and data flow.

**Note Events:**

![image](/img/worlds/midi-playback-214465984-fea32000-04c3-42f3-bf7f-cef471d2b46f.png)


When it receives a `Midi Note On` event, it will loop through each entry in the `channels` array and check if the incoming note's channel matches one of the entries. If a match is found, that number is used as the `index` for the `grids` array to find the matching grid. The incoming note is run through `int.Remainder()` to find its index in the octave - a C will be 0, a C# will be 1, etc. This index is used to find the right child of the grid, and then set `enabled` on the 'Image' to `true`. Finally, the note's channel and note number are logged to the console. 

When the script receives a `Midi Note Off` event, it goes through a similar process as above. To hide the 'Image' component again, it sets `enabled` to `false`.

## Class: MidiData

When requesting MIDI data from a VRCMidiPlayer, this is what you get. It holds an array of all tracks as well as the BPM.

<dl>
<dt>`MidiTrack[]` Tracks</dt>
<dd>Array of MidiTracks in the file.</dd>
<dt>`byte` Bpm</dt>
<dd>Represents the BPM of the track.</dd>
</dl>

## Class: MidiTrack

This class simply wraps an array of MidiBlocks, and provides some handy references for note and velocity ranges discovered in the track.
<dl>
<dt>`MidiBlock[]` Blocks</dt>
<dd>Array of MidiBlocks in the track.</dd>
<dt>`byte` minNote</dt>
<dd>The lowest note played in the track.</dd>
<dt>`byte` maxNote</dt>
<dd>The highest note played in the track.</dd>
<dt>`byte` minVelocity</dt>
<dd>The lowest velocity played in the track (besides 0).</dd>
<dt>`byte` maxVelocity</dt>
<dd>The highest velocity played in the track.</dd>
</dl>

## Class: MidiBlock

A MidiBlock represents a whole Midi Note event from On to Off, and some helpful metadata.

<dl>
<dt>`byte` Note</dt>
<dd>0-127 range number for the note played.</dd>
<dt>`byte` Velocity</dt>
<dd>0-127 range number for the velocity of the note played.</dd>
<dt>`byte` Channel</dt>
<dd>1-16 range number for the channel on which the note is played.</dd>
<dt>`float` StartTimeMs</dt>
<dd>The start time in Milliseconds at which the Note On event starts.</dd>
<dt>`float` EndTimeMs</dt>
<dd>The end time in Milliseconds at which the Note Off event triggers.</dd>
<dt>`float` StartTimeSec</dt>
<dd>The start time in Seconds at which the Note On event starts.</dd>
<dt>`float` EndTimeSec</dt>
<dd>The end time in Seconds at which the Note Off event triggers.</dd>
<dt>`float` LengthSec</dt>
<dd>The length in Seconds of the whole event from Note on to Note Off.</dd>
</dl>