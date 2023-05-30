---
title: "Udon Video Sync Player"
slug: "udon-video-sync-player"
excerpt: "Basic example of synced video"
hidden: false
createdAt: "2021-05-14T00:58:34.059Z"
updatedAt: "2021-08-05T19:51:13.507Z"
---
![](/img/worlds/udon-video-sync-player-9000c94-udonsyncplayer-scene.png)

# Overview
There's two main things we need to sync for people to watch videos together - the URL of the video to watch, and the playback time so people are watching things simultaneously. In order to understand how we sync these two items for everyone, including late joiners - let's walk through a scenario that uses this program.

**The flow for someone entering a URL is: **
Become Owner of UdonSyncPlayer Object▸send new **_url_** ▸Try to Load & Play Url ▸When Video Starts, send Sync info out ▸Send new Sync info every **_syncFrequency_** seconds

**The flow for everyone else is:**
Receive new **_url_** value ▸Try to Load & Play Url ▸Receive Sync Info▸Jump to synced time

# Someone Loads a URL
When our hypothetical scene loads, let's say there is no video playing yet, and there are two people in the room. Someone pastes a new URL into the Input Field, which triggers the **OnURLChanged** event which is wired up in the UI.
![When someone enters a new URL, this logic runs to send the new URL to everyone else.](/img/worlds/udon-video-sync-player-c08ee3f-url-change.png)
There's a few 'IsValid' calls in here that we use just to make sure we're not trying to call methods on objects that have been destroyed or improperly set up. We'll skip describing these for the rest of this example these to keep the explanations simpler.

The Local Player has just put in a new URL, so we make them the Owner of the program so they can control its variables. We get the URL from the InputField, then call **SetProgramVariable** on the **_url_** symbol with this new value. This works the same as calling **set url** with "sendChange" enabled, it's just another way to do it, handy to know about if you want to change the variable on another UdonBehaviour. Once we've updated this variable, we call **RequestSerialization** to ask Udon to update the value of **_url_** for everyone else in the world.


# Users Get New URL
![Whenever the synced **_url_** variable changes, try to Play it!](/img/worlds/udon-video-sync-player-572ee25-playurl.png)
Since we have a **Variable Change** event for **_url_** in our graph, this event will be triggered whenever the URL is updated, and it will simply try to play the URL.


# The Video Starts
![](/img/worlds/udon-video-sync-player-8eb0c7f-onvideostart.png)

This event is triggered locally when the video actually beings playing. We call the same event for the Owner and everyone else - the different logic is handled in **UpdateTimeAndOffset**.

# Update Time and Offset
![](/img/worlds/udon-video-sync-player-3735c0c-update-time-and-offset.png)

First, this logic checks whether it's running on the Owner of the object. If it's not, it runs the **Resync** event instead. If it is on the owner, the we want to sync both _where_ in the video we are, and _when_ we were there. We should be at the very beginning of the video since this is the first time the logic is running, but by saving both of these values, we can use this for future sync updates as well. 

We want to sync two numbers to everyone else, and these two numbers are closely related, so we combine them into a single Vector2 variable in order to keep them together and simplify some of the sync logic. We construct a Vector2 where 'x' is the current time of the video and 'y' is the Server Time observed by the owner when they were at that video time. With this info, everyone else can set themselves to a matching time - see [Resync](/worlds/examples/udon-example-scene/udon-video-sync-player#resync)  below.

After **Requesting Serialization** of this synced variable, the owner calls **SendCustomEventDelayedSeconds** to update this value again. They use the variable **_syncFrequency_** to determine how long until they update the value. For a _very_ simple approach, this variable can be left at 0 if the owner never pauses, rewinds or fast-forwards the video, and everyone can sync from the start time of the video instead of updating **_timeAndOffset_** every so often.

# Resync
![](/img/worlds/udon-video-sync-player-b63cdfd-resync.png)

When non-owners start playing the video or receive an update to the **_timeAndOffset_** variable, they can use the data to figure out where to jump to in the video.

For a simple example, let's say the owner was at video-time **0** at server-time **1000**.
  * Owners sets **_timeAndOffset_** to (0,1000).
  * You join 45 seconds later and get this value. Your own server-time is **1045**, so you jump to **00:45** in the video by finding the difference in the server time (45 seconds) and adding the video-time (0 seconds).

# Improvements and Augmentations
![](/img/worlds/udon-video-sync-player-f43a120-udonsyncplayer-full-graph.png)

We kept this example pretty simple so it would be understandable and upgradeable. There's lots you could do to improve it and share your changes! Here are some ideas:

* Have non-owners wait to play the video until they receive info from the Owner
* Detect stream urls vs videos and turn off syncing
* Handle Video Error events with helpful notes for users
* Only allow certain players to change videos
* Create video playlists
* Create a video Queueing system