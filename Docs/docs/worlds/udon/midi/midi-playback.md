import UnityVersionedLink from '@site/src/components/UnityVersionedLink.js';

# Midi Playback

You can play back MIDI data along with an audio track to control anything you want in your Udon world. You can jump to the [Example Scene](#example-midiplaybackscene) to get started right away.

## Assets: MidiFile and AudioClip

Files with the extension .mid are processed as MIDI assets. To get started with your own MIDI and Audio files:
1. Drag and drop them somewhere into your Assets folder. The MIDI file must have the extension .mid, the audio file can be of any <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/class-AudioClip.html">type supported by Unity</UnityVersionedLink> (.aif, .wav, .mp3, .ogg).
2. Select the MIDI file and set its AudioClip to the matching audio file.

![image](/img/worlds/midi-playback-214464414-32af9c18-c003-49ed-bd12-dd431367db56.png)

3. It's imperative that the BPM for your MIDI file is set correctly. If the data seems like it doesn't match the audio, this is likely the issue. You can override the BPM here by toggling on "Override Bpm" and supplying the right value. Even better would be to edit your MIDI file and add the correct BPM.


## Component: VRCMidiPlayer

![VRCMidiPlayer](/img/worlds/midi-playback-215556799-a546e119-afdb-441f-8019-70ee50b6c008.png)

This is the brains of the operation. It works similarly to an Audio Source but uses a Midi Asset instead. It sends MIDI [Note On](/worlds/udon/midi#midinoteon) and [Note Off](/worlds/udon/midi#midinoteoff) events to all target UdonBehaviours.

### Inspector Fields

Midi File

| Name                | Description                                                                                                           |
|---------------------|-----------------------------------------------------------------------------------------------------------------------|
| Midi File           | The MIDI file in SMF format whose data you want to trigger.                                                           |
| Audio Source        | The AudioSource component with the audio clip corresponding to your MIDI data.                                        |
| Target Behaviours   | An array of UdonBehaviours which will have MIDI [Note On](/worlds/udon/midi#midinoteon) and [Note Off](/worlds/udon/midi#midinoteoff) events sent to them. |
| Display Debug Blocks| When enabled, you can see a display of all the notes in your current MIDI file in the Scene View of the Unity Editor while the VRCMidiPlayer is selected. Helpful for a quick view into your data. |

### Methods

### Methods

| Name   | Description                                                                 |
|--------|-----------------------------------------------------------------------------|
| Play() | Starts the playback of MIDI events and the Audio Source.                    |
| Stop() | Stops the playback of MIDI events and the Audio Source.                     |

### Properties

| Name       | Description                                                                 |
|------------|-----------------------------------------------------------------------------|
| `float` time | Set and Get the current time of both the MIDI and Audio sources.           |
| `MidiData` midiData | Get a MidiData object containing all data about the current MIDI track. Can be used before playback to set things up. |

### Example: MidiPlaybackScene

<video controls>
  <source src="https://user-images.githubusercontent.com/737888/214626843-53a4c069-ea69-423a-926d-e2ce024c9819.mp4"/>
</video>

Example Central includes [a simple MIDI playback example](/worlds/examples/midi-playback). You can load it from the menu bar under VRChat SDK > Samples > MidiPlayback.

## Class: MidiData

When requesting MIDI data from a VRCMidiPlayer, this is what you get. It holds an array of all tracks as well as the BPM.

| Type         | Name         | Description                                             |
|--------------|--------------|---------------------------------------------------------|
| `MidiTrack[]`| Tracks       | Array of MidiTracks in the file.                        |
| `byte`       | Bpm          | Represents the BPM of the track.                        |

## Class: MidiTrack

This class simply wraps an array of MidiBlocks, and provides some handy references for note and velocity ranges discovered in the track.

| Type         | Name         | Description                                             |
|--------------|--------------|---------------------------------------------------------|
| `MidiBlock[]`| Blocks       | Array of MidiBlocks in the track.                       |
| `byte`       | minNote      | The lowest note played in the track.                    |
| `byte`       | maxNote      | The highest note played in the track.                   |
| `byte`       | minVelocity  | The lowest velocity played in the track (besides 0).    |
| `byte`       | maxVelocity  | The highest velocity played in the track.               |

## Class: MidiBlock

A MidiBlock represents a whole Midi Note event from On to Off, and some helpful metadata.

| Type   | Name        | Description                                              |
|--------|-------------|----------------------------------------------------------|
| `byte` | Note        | 0-127 range number for the note played.                  |
| `byte` | Velocity    | 0-127 range number for the velocity of the note played.  |
| `byte` | Channel     | 1-16 range number for the channel on which the note is played. |
| `float`| StartTimeMs | The start time in Milliseconds at which the Note On event starts. |
| `float`| EndTimeMs   | The end time in Milliseconds at which the Note Off event triggers. |
| `float`| StartTimeSec| The start time in Seconds at which the Note On event starts. |
| `float`| EndTimeSec  | The end time in Seconds at which the Note Off event triggers. |
| `float`| LengthSec   | The length in Seconds of the whole event from Note on to Note Off. |
