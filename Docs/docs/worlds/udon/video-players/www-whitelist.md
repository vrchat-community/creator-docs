---
title: "Video Player Allowlist"
slug: "www-whitelist"
hidden: false
createdAt: "2020-09-10T18:56:07.748Z"
updatedAt: "2024-06-28T22:55:53.659Z"
---

The following services are on the video player allowlist.

If a service is not on this list, it will not play unless "Allow Untrusted URLs" is checked in Settings.

VRChat on Android will not play video if the host is not using HTTPS protocol.

:::caution

The example video player in the SDK will not handle cases in which the master has "Untrusted URLs" disabled, which will result in videos being unable to play. User-created video players may want to modify the Udon code to give sync ownership to the user requesting the video.
:::

## Allowlisted Services
The services listed below are inherently trusted and are permitted with our default URL allowlist. The resource being accessed (as in, the URL you enter into/use in the video player) must reside in the service domain listed next to the service name. This means that short-links may not work!

:::note

*The listings below do not constitute partnerships or endorsements and may change at any time without notice*.
:::

| Service | Domain |
| --- | --- |
| --- | --- |
| Soundcloud | `soundcloud.com` |
| Facebook Video | `*.facebook.com` |
| Mixcloud | `*.mixcloud.com` |
| NicoNico | `*.nicovideo.jp` |
| Twitch.TV | `*.twitch.tv` |
| Vimeo | `*.vimeo.com` |
| Youku | `*.youku.com` |
| YouTube | `*.youtube.com`,`youtu.be` |
| VRCDN | `*.vrcdn.live`,`*.vrcdn.video` |
| Topaz Chat | `ciel.topaz.chat` |
