---
title: "String Loading"
slug: "string-loading"
excerpt: "Load text files from the internet in your VRChat worlds"
hidden: false
createdAt: "2023-02-07T01:10:57.067Z"
updatedAt: "2023-03-26T00:35:05.784Z"
---
String Loading allows you to download text files from the internet and use them in your VRChat world. You can either use the `DownloadString` script included in the SDK, or you can make your own script using the new `VRCStringDownloader.LoadUrl` function.

* One string can be downloaded every five seconds.
If this limit is exceeded, string downloads are queued and downloaded in a random order.
* One string can only be of a maximum of 100MB
* You can only have 1000 elements in the queue

# Trusted URLs
If a site is not on the list, it will not download unless ‘Allow Untrusted URLs’ has been enabled in the user’s settings.

The following URLs are available:

* GitHub (`*.github.io`)
* Pastebin (`pastebin.com`)
* Github Gist (`gist.githubusercontent.com`)

# Guides
## Using the `DownloadString` script to download a string
The SDK includes a script to download strings easily:

1. Create a new GameObject in your scene.
2. Add an `UdonBehaviour` component.
3. Select `DownloadString` as the program source.
4. Enter the URL and select the text component where you'd like to display the downloaded text.

## Create your own script for LoadUrl
You can use the function `VRCStringDownloader.LoadUrl` to download Strings in your own graphs.

1. Execute `VRCStringDownloader.LoadUrl` with a URL and specify an UdonBehaviour.
2. Wait for the `OnStringLoadSuccess` or `OnStringLoadError` event to be called on the specified UdonBehaviour.
3. Use the event's `IVRCStringDownload` to get the `Result` of the string download. 
# New UdonGraph Nodes
## New events
### OnStringLoadSuccess
Returns `IVRCStringDownload`. Called when the function `LoadUrl` has successfully downloaded the string from the internet.

### OnStringLoadError
Returns `IVRCStringDownload`. Called when the function `LoadUrl` has failed to download the string.

## New types
### VRCStringDownloader

Use this static class to download strings from the web.

#### VRCStringDownloader.LoadUrl
* **Url**: the URL to load from the internet.
* **UdonBehaviour**: the UdonBehaviour to send the events to. 
    * In Udon Graph, this defaults to the current UdonBehaviour
    * In Udon Sharp, you can use `(IUdonEventReceiver)this`


### IVRCStringDownload
Result from the string load events.

* **Get Error (`string`)**: The error message for `OnStringLoadError`.
* **Get ErrorCode (`int`)**: The HTTP Error code for `OnStringLoadError`.
* **Get Response (`string`)**: The string that was downloaded.
* **Get UdonBehaviour (`UdonBehaviour`)**: The UdonBehaviour to which events are sent.
* **Get Url (`VRCUrl`)**: Gets the URL from which the download was attempted.