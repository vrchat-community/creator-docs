# External URLs
Udon can use external URLs to load remote content. URLs must be wrapped in a [VRCUrl](#vrcurl) object. Users can enter URLs into `VRCUrlInputField` components at runtime, and world creators can provide pre-defined VRCUrls with their uploaded worlds.

## Allowlist
For security reasons, VRChat restricts how external URLs can be used. By default, a [VRCUrl](#vrcurl) can only be accessed if it is on VRChat's domain allowlist.
If a URL is **not** on the required allowlist for its type, it cannot be used unless the user chooses to "Allow Untrusted URLs" in VRChat's settings. This allows Udon to use load untrusted URL from `VRCUrlInputField` components and any `VRCUrl` that was uploaded alongside the world.

|                                           | On allowlist | Not on allowlist                   |
| ----                                      | ----         | ----                               |
| User enters `VRCUrl` into input field     | ✔Allowed     | ⚠ Requires "Allow Untrusted URLs" |
| Udon declares the `VRCUrl` before runtime | ✔Allowed     | ⚠ Requires "Allow Untrusted URLs" |

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
