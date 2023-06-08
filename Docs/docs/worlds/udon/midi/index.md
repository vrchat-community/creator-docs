---
title: "Midi in Udon"
excerpt: "Use midi data in your worlds, from midi files, or in real-time"
sidebar_position: 1
createdAt: "2021-02-26T21:32:09.385Z"
updatedAt: "2023-02-22T21:48:25.610Z"
---
Since the 1980s, MIDI has connected musical instruments in imaginative ways. We've included it in VRChat so you can build worlds that respond to real-time instruments and prerecorded performances. 

>Read more about [MIDI on Wikipedia](https://en.wikipedia.org/wiki/MIDI).

![image](/img/worlds/index-215557268-2d85f551-8fff-4990-a95a-c8a2d412d6a2.png)

There are two ways to work with MIDI in your Udon worlds:
- ## [Realtime](realtime-midi) data from an instrument plugged into your computer.
- ## [Playback](midi-playback) of MIDI data along with audio files.

Either way, you'll be working with Udon's MIDI Events, detailed below.

## Midi Events

### MidiNoteOn
Triggered when a 'Note On' message is received. Either triggered by MIDI playback, or by pressing a key/button on your device.
Outputs:
* `int channel` MIDI Channel that received the event, 0-15.
* `int number` Note number from 0-127 (your MIDI Device may not output the full range)
* `int velocity` Number from 0-127 representing the speed at which the note was triggered, if supported by your MIDI device.

### MidiNoteOff
Triggered when a 'Note Off' message is received, typically by releasing a key/button on your device.
Outputs:
* `int channel` Midi Channel that received the event, 0-15.
* `int number` Note number from 0-127 (your midi Device may not output the full range)
* `int velocity` This value is typically 0 for Note Off events, but may vary depending on your device.

### MidiControlChange
Triggered when a control change is received. These are typically sent by knobs and sliders on your Midi device.
Outputs:
* `int channel` Midi Channel that received the event, 0-15.
* `int number` Control number from 0-127.
* `int value` Number from 0-127 representing the value sent by your controller. For some knobs that can spin endlessly rather than being limited by physical start/end positions, this value might be simply 0 and 1 or some other range indicating "positive" and "negative" increments that you must manage on your own.