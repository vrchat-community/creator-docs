# Video Players

You can add video players to your VRChat world with the SDK's `VRCAVProVideoPlayer` or `VRCUnityVideoPlayer`.

:::note top Community prefabs

Are you looking for community-created video player prefabs? Try [VideoTXL](https://github.com/vrctxl/VideoTXL), [ProTV](https://gitlab.com/techanon/protv), or [USharpVideo](https://github.com/MerlinVR/USharpVideo).

:::

## Using the Prefabs

The easiest way to put a Video Player in your Udon world is by using one of the Prefabs, which you can find in `Packages/VRChat SDK - Worlds/Samples/UdonExampleScene/Prefabs/VideoPlayers`.

![The two Video Player prefabs, ready to drop into your world.](/img/worlds/video-players-aae04e6-video-player-prefabs.png)

Both of these prefabs will play a video of your choosing, synchronized for everyone in your world. They won't loop - the graph turns off looping for now to get sync to work. If you want them to loop, turn on 'Loop' and remove the UdonBehaviour.

:::note These are Synced Player EXAMPLES

You don't have to use the "UdonSyncPlayer" Udon Behaviours. You can use just the VRC Video Player component if you don't need the videos synced in your world. You can also make your own Sync Graphs using the provided one as a starting point or you can make one from scratch.

:::
## Choosing AVPro or Unity Video Player

Why would you choose one or the other?
**AVPro** supports live streams on multiple platforms, like YouTube Live, Twitch, and some others! You'll need to make a graph that calls PlayURL on the Video Player to make this work. The **Unity Video** player does not support these live streams.

In addition, **AVPro** does not play in the editor - you'll need to Build & Test your world to see it working. **Unity Video** works in Play Mode in the Editor when using links that point directly to supported video file types like 'mp4' and 'webm'. Hosted services like YouTube and Vimeo will only work in the client.

Notably, the AVPro speaker component implies support for 8 channel audio. This is not correct-- only 6 channel (usually 5.1 audio) can be played. [AVPro support EAC3 7.1 audio on PCVR only]

## Android / Quest Compatibility

An application that VRChat uses to resolve links into videos is also available on Android now, so previous workarounds aren't needed.
In the past, some workarounds existed for advanced users, because Quest had no URL resolver.

## Rate Limiting

A given user is only permitted to handle a new video player URL once every five seconds. This is a global limit across all video players. This applies to the default URLs as well as those set with LoadURL and PlayURL.

With a single video player, this isn't an issue-- but if you have multiple video players, you need to ensure that a request isn't sent too quickly after a previous request.

This also applies to late-joiners. If you have 2 video players running in your world, a late-joiner will see that they must send out two video requests. Unmanaged, they will attempt to do so simultaneously and will fail. In cases where you have more than one video player playing simultaneously in a world, you'll have to account for this.

## Supported Video Hosts
To play a video, you need to provide a URL in the Video URL field when you set up your Video Player in the editor, or you can paste a URL into the VRCUrlInputField provided in the prefabs.

A full list of our supported hosts is available at [Video Player Allowlist](/worlds/udon/video-players/www-whitelist). Some recommendations are below.
:::note Disclaimer

*The listings below do not constitute partnerships or endorsements*. These are services that are widely accessible and have been tested to work properly with VRChat video players.
:::
### Your Own Host

- **Cost**: Paid - varies depending on your Provider
- **Links**: Link directly to the .mp4 or .webm file
- **Limitations**: If you have your own host outside of our allowlist, users must have the "Allow Untrusted URLs" option enabled in their Settings to see your content.

You may want to consider looking into a "content delivery network" (CDN) to host your content. This is useful if you plan on your video being accessible for many users, or to be fast for many users across the world. CDNs will distribute your file across many servers worldwide to ensure that there is a source close to the viewer to ensure fast downloads.

We have tested *Amazon Cloudfront* and *BunnyCDN*. CDN services are usually paid services, but tend to be low-cost for bulk storage/transmission of data. However, due to their openness, they are not present in our allowlist and will require that users enable the "Allow Untrusted URLs" setting.

### YouTube
- **Cost**: Free
- **Links**: Use the ['watch' url](https://www.youtube.com/watch?v=8yaQY0arCnc)
- **Limitations**: None
### Vimeo Basic
- **Cost**: Free
- **Links**: Use the [basic video url](https://vimeo.com/383935156)
- **Limitations**: None

### Vimeo Pro or Business
- **Cost**: [Paid](https://vimeo.com/upgrade)
- **Links**: Use the direct video links
- **Limitations**: None

### Optimizing your videos
When encoding your videos, we strongly recommend uploading a web-optimized version. For `.MP4` files, this option is also known as 'fast start'. It is a one-tick setting that makes a huge difference in the streamability of a self-hosted video file. Without fast start, you generally have to download the entire video file for it to play. With fast start enabled, you can stream the video file in chunks, and streams will begin immediately.

- In FFMPEG, use the parameter `-movflags +faststart`.
- In HandBrake, tick the 'Web Optimized' checkbox.
- Other software should have similar options for enabling fast start.

![Enabling Fast Start](/img/worlds/video-players-dc8e54f-image.png)
