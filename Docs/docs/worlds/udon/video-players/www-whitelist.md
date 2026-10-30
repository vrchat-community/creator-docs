---
slug: "www-whitelist"
sidebar_position: 2
---

# Video Player Allowlist

Videos in your world only play if their domain is on the allowlist below, or if the viewer has enabled "Allow Untrusted URLs" in their settings. Short-links may not work - the resolved URL must match an allowlisted domain.

VRChat on Android does not play video if the host is not using HTTPS.

:::warning

The example video player in the SDK does not handle cases where the instance master has "Allow Untrusted URLs" disabled, which prevents videos from playing. Consider modifying the Udon code to give sync ownership to the user requesting the video.
:::

## Allowlisted services

The services listed below are trusted by default. The video URL must resolve to a domain listed in this table.

:::note

The listings below do not constitute partnerships or endorsements and may change at any time without notice.
:::

| Service | Domain |
| --- | --- |
| Akamai CDN | `vod-progressive.akamaized.net` |
| Facebook Video | `*.facebook.com`,`*.fbcdn.net` |
| Google Video | `*.googlevideo.com` |
| Hyperbeam | `*.hyperbeam.com`,`*.hyperbeam.dev` |
| Mixcloud | `*.mixcloud.com` |
| NicoNico | `*.nicovideo.jp` |
| Soundcloud | `soundcloud.com`,`*.sndcdn.com` |
| Topaz Chat | `*.topaz.chat` |
| Twitch.TV | `*.twitch.tv`,`*.ttvnw.net`,`*.twitchcdn.net` |
| VRCDN | `*.vrcdn.live`,`*.vrcdn.video`,`*.vrcdn.cloud` |
| Vimeo | `*.vimeo.com` |
| Youku | `*.youku.com` |
| YouTube | `*.youtube.com`,`youtu.be` |

## Video restrictions in Public instances

In Public and Group Public instances of your world, videos from untrusted URLs cannot be played unless you add their domain to your world's allowlist. This applies to all video URLs, including URLs hardcoded in Udon and URLs entered by users at runtime.

Videos from [allowlisted services](#allowlisted-services) can always be played by all users in all instance types. Users can enable "Allow Untrusted URLs" in their settings to permit videos from other domains. However, in Public and Group Public instances, video players impose the following restrictions:

- **Public and Group Public**: Videos from untrusted domains can only be played if you added them to your world's "Video Player Allowed Domains" (and the user enabled "Allow Untrusted URLs").
- **Other instance types**: Videos from all untrusted domains can be played (if the user enabled "Allow Untrusted URLs").

### Adding allowed domains

If your world plays videos from a domain not in the [allowlisted services](#allowlisted-services) list, add it to your world's allowed domains:

1. Sign in to [VRChat.com](https://vrchat.com/home/).
2. Go to [My Worlds](https://vrchat.com/home/content/worlds).
3. Select your world to go to **Edit World Info**.
4. Add domains to the **Video Player Allowed Domains** field. Use full domain names (e.g., `example.com`).
