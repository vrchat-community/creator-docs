---
title: "Player Audio"
slug: "player-audio"
hidden: false
createdAt: "2020-09-24T22:05:44.842Z"
updatedAt: "2023-01-10T00:35:37.776Z"
---
Players have two sources of audio: the voice coming through their microphone, and sounds attached to their Avatar. With Udon, you can change how a Player hears *other* players' voices and avatar sounds. For example, this graph makes a player quieter by setting their gain to 5 dB (which is lower than the default of 15 dB):
![player-audio-8e50220-setvoicegain.png](/img/worlds/player-audio-8e50220-setvoicegain.png)

Here are all the properties you can access:

# Voice

### Set Voice Gain
*in Decibels, Range 0-24*
Add boost to the Player's voice in decibels. Default is 15.

### Set Voice Distance Near
*in Meters, Range 0 - 1,000,000*
The near radius, in meters, where volume begins to fall off. It is strongly recommended to leave the Near value at zero for realism and effective spatialization for user voices.

### Set Voice Distance Far
*in Meters, Range is 0 - 1,000,000*
This sets the end of the range for hearing the user's voice. Default is 25 meters. You can lower this to make another player's voice not travel as far, all the way to 0 to effectively 'mute' the player.

### Set Voice Volumetric Radius
*in Meters, Range is 0 -1,000*
Default is 0.
A player's voice is normally simulated to be a point source, however changing this value allows the source to appear to come from a larger area. This should be used carefully, and is mainly for distant audio sources that need to sound "large" as you move past them. **Keep this at zero unless you know what you're doing.** The value for Volumetric Radius should always be lower than Voice Distance Far.

If you want a user's voice to sound like it is close no matter how far it is, increase the Voice Distance Near range to a large value.

### Set Voice Lowpass
*On/Off*
When a voice is some distance off, it is passed through a low-pass filter to help with understanding noisy worlds. You can disable this if you want to skip this filter. For example, if you intend for a player to use their voice channel to play a high-quality DJ mix, turning this filter off is advisable.

# Avatar

### SetAvatarAudioGain
*in Decibels, Range 0-10*
Set the Maximum Gain allowed on Avatar Audio. Default is 10.

### SetAvatarAudioFarRadius
*in Meters, Range is not limited*
This sets the maximum end of the range for hearing the avatar's audio. Default is 40 meters. You can lower this to make another player's avatar not travel as far, all the way to 0 to effectively 'mute' the player. Note that this is compared to the audio source's maxDistance, and the smaller value is used.

### SetAvatarAudioNearRadius
*in Meters, Range is not limited*
This sets the maximum start of the range for hearing the avatar's audio. Default is 40 meters. You can lower this to make another player's avatar not travel as far, all the way to 0 to effectively 'mute' the player. Note that this is compared to the audio source's minDistance, and the smaller value is used.

### SetAvatarAudioVolumetricRadius
*in Meters, Range is not limited*
An avatar's audio source is normally simulated to be a point source, however changing this value allows the source to appear to come from a larger area. This should be used carefully, and is mainly for distant audio sources that need to sound "large" as you move past them. Keep this at zero unless you know what you're doing. The value for Volumetric Radius should always be lower than Avatar AUdio Far Radius. Default is 40 meters.

### SetAvatarAudioForceSpatial
*On/Off*
If this is on, then Spatialization is enabled for the source, and the spatialBlend is set to 1. Default is Off.

### SetAvatarAudioCustomCurve
*On/Off*
This sets whether the audio source should use a pre-configured custom curve. Default is Off.