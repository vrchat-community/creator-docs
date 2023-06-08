---
title: "Video Player Whitelist"
slug: "www-whitelist"
hidden: false
createdAt: "2020-09-10T18:56:07.748Z"
updatedAt: "2023-03-09T22:55:53.659Z"
---
:::note

VRChat on Quest can play videos from direct links to video files. These URLs typically end with a filename ending in a supported video type like http://something.com/video.mp4 or http://test.com/cats.webm. If you visit the link and see a whole website around a video, that link will probably not play on Android / Quest because the application that VRChat uses to resolve these links into videos does not run on Android.  Creators will need to move the video to a host that supports direct links, or find another way to work around this issue.

Some workarounds exist for advanced users. VRChat has not reviewed these methods, does not condone them, and cannot guarantee their continued operation, but they have been recommended by suggested edits to our documentation.

* [Streamlink](https://streamlink.github.io)
* [ArchiTechAnon's "Understanding URLs in VRChat" post](https://ask.vrchat.com/t/protv-by-architechanon-usage-guides-and-walkthroughs/7029/11)",

:::

The following services are on the video player whitelist.

If a service is not on this list, it will not play unless "Allow Untrusted URLs" is checked in Settings.

VRChat on Android will not play video if the host is not using HTTPS protocol.

:::caution

The example video player in the SDK will not handle cases in which the master has "Untrusted URLs" disabled, which will result in videos being unable to play. User-created video players may want to modify the Udon code to give sync ownership to the user requesting the video.
:::

## Whitelisted Services
The services listed below are inherently trusted and are permitted with our default URL whitelist. The resource being accessed (as in, the URL you enter into/use in the video player) must reside in the service domain listed next to the service name. This means that short-links may not work!

:::note

*The listings below do not constitute partnerships or endorsements and may change at any time without notice*.
:::

| Parameter | Description |
| --- | --- |
| Soundcloud | `soundcloud.com` |
| FacebookVideo | `facebook.com` |
| NicoNico | `*.nicovideo.jp` |
| Twitch.TV | `*.twitch.tv` |
| Vimeo | `*.vimeo.com` |
| Youku | `*.youku.com` |
| YouTube | `*.youtube.com`,`youtu.be` |
| Mixcloud | `mixcloud.com` |
| VRCDN | `*.vrcdn.live`,`*.vrcdn.video` |
