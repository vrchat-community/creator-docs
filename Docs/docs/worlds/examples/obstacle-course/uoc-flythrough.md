---
title: "Obstacle Course: Flythrough"
slug: "uoc-flythrough"
hidden: false
createdAt: "2021-08-12T22:56:42.710Z"
updatedAt: "2021-08-18T20:58:14.295Z"
---
We included a Cinemachine system to easily generate a fly-through video of your course!

# Basic Setup
* Drag and Drop the **Flythrough** prefab from **Assets/_WorldJam2/_SubSystems/Flythrough** into your scene.
* Press "Refresh" in the Obstacle Utility Window. This will generate a path based on all the Checkpoints in your scene!
* Select the **FlythroughPrefab/RecordCamPath** object in your hierarchy to see the path that was created.
![uoc-flythrough-2114971-flythrough-path.png](/img/worlds/uoc-flythrough-2114971-flythrough-path.png)

* Press 'Play' in the Game View to see your flythrough! Exit Play Mode once you have an idea of how it looks.

# Modifying the Path

By default, the path will be generated 0.5 units above each checkpoint's origin. If this is too high or low for your particular scene, you can modify the "Record Path Y Offset" in the **Recording** section of the VRC Obstacle Window to change the height of every checkpoint at the same time. You can click and drag left and right on the label to easily dial in the right spot.

If you want to add / remove / reposition the waypoints in the path, turn off 'Auto Update Checkpoints' in the Recording section, then select the **RecordCamPath** in the hierarchy. Here, you can change the numbers directly, or press the number of the waypoint on the left side of the inspector to select the waypoint in the scene view and move it using the standard transform tool.

You can change the speed of the flythrough by selecting the *RecordCamTarget* object in the hierarchy and changing the _Speed_ parameter on the **Cinemachine Dolly Cart* component. The default setting uses Normalized Position Units with a Speed of .03 to make it through the course in about 30 seconds.
![uoc-flythrough-5f34a79-waypoints.png](/img/worlds/uoc-flythrough-5f34a79-waypoints.png)

# Recording the Output
You can use a screen recorder to directly record your Game View in the Editor, or use the Unity Recorder Package to generate a higher-quality output. You can add this from the Package Manager. It has been tested and works with this setup. If you want full instructions on using the Recorder, you can find the official Unity Manual here: [Unity Recorder 1.0 User Manual.](https://unitytech.github.io/unity-recorder/manual/index.html) and a tutorial here: [Working with Unity Recorder](https://learn.unity.com/tutorial/working-with-unity-recorder).

# Cleaning Up
Make sure to remove the recorder from your scene before you publish! If you customized a path, you can make a copy of the prefab with your new path to use it again later.

# Extra Credit
You could integrate this flythrough camera with the existing Cinemachine system in the scene (which renders to the Minimap and in-game jumbotrons), or create a separate system for high-quality in-game recording!