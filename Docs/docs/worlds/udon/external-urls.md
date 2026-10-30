# External URLs
Udon can use external URLs to load remote content. URLs must be wrapped in a [VRCUrl](#vrcurl) object. Users can enter URLs into `VRCUrlInputField` components at runtime, and world creators can provide pre-defined VRCUrls with their uploaded worlds.

## Allowlist
For security reasons, VRChat restricts how external URLs can be used. By default, a [VRCUrl](#vrcurl) can only be accessed if it is on VRChat's domain allowlist.
If a URL is **not** on the required allowlist for its type, it cannot be used unless the user chooses to "Allow Untrusted URLs" in VRChat's settings. This allows Udon to use load untrusted URL from `VRCUrlInputField` components and any `VRCUrl` that was uploaded alongside the world.

|                                           | On allowlist | Not on allowlist                   |
| ----                                      | ----         | ----                               |
| User enters `VRCUrl` into input field     | ✔Allowed     | ⚠ Requires "Allow Untrusted URLs" |
| Udon declares the `VRCUrl` before runtime | ✔Allowed     | ⚠ Requires "Allow Untrusted URLs" |

Video players have an extra restriction. In Public and Group Public instances, videos from domains that aren't on the [video player allowlist](/worlds/udon/video-players/www-whitelist) only play if you add the domain to your world's **Video Player Allowed Domains** on the VRChat website. The user still needs to enable "Allow Untrusted URLs". See [Video restrictions in Public instances](/worlds/udon/video-players/www-whitelist#video-restrictions-in-public-instances).

## VRCUrl
`class VRC.SDKBase.VRCUrl`

### Constructor
| Name | Summary |
| --- | --- |
| VRCUrl(string url) | Constructor that takes a URL as input.  Note that this can only be called at *editor time*. |

### Properties
| Static | Type | Name | Summary |
| :---: | --- | --- | --- |
| ✔️ | [VRCUrl](#vrcurl) | Empty | An empty URL. |

### Methods
| Static | Returns | Name | Summary |
| :---: | --- | --- | --- |
|| string | Get() | Retrieves the current string value of the URL. |
| ✔️ | bool | IsNullOrEmpty([VRCUrl](#vrcurl) vrcUrl) | Indicates whether the specified [VRCUrl](#vrcurl) is null or referencing an empty string (""). |

## VRCUrlInputField
`class VRC.SDK3.Components.VRCUrlInputField`

A UI input field that lets players type a URL at runtime. Udon can read the entered value, but the raw string is deliberately not exposed, so you only ever get a [VRCUrl](#vrcurl).

### Methods
| Static | Returns | Name | Summary |
| :---: | --- | --- | --- |
|| [VRCUrl](#vrcurl) | GetUrl() | The URL the player has entered. Returns an empty [VRCUrl](#vrcurl) if the field is part of a prefab rather than a scene. |
|| void | SetUrl([VRCUrl](#vrcurl) url) | Displays a URL in the field, replacing whatever the player typed. Does nothing if the field is part of a prefab rather than a scene. |

Use `SetUrl` to pre-fill a field with a [VRCUrl](#vrcurl) your world already holds, or to restore the last URL a player entered. Udon cannot build a [VRCUrl](#vrcurl) at runtime, so `SetUrl` can only display a URL the world shipped with or a player entered.

**Example**
```cs
using UdonSharp;
using UnityEngine;
using VRC.SDK3.Components;
using VRC.SDK3.Components.Video;
using VRC.SDK3.Video.Components.Base;

public class UrlEntry : UdonSharpBehaviour
{
    public VRCUrlInputField inputField;
    public BaseVRCVideoPlayer videoPlayer;

    public override void Interact()
    {
        videoPlayer.PlayURL(inputField.GetUrl());
    }
}
```
