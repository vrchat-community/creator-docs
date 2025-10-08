---
title: "VRC Camera Dolly"
slug: "vrc_cameradolly"
hidden: false
---
Allow camera dolly animations to be applied to the VRChat user camera.
Three components are used to define animations:
* `VRC Camera Dolly Animation`: The top level component representing the entire animation
* `VRC Camera Dolly Path`: An individual animation path. Animations can contain any number of paths. However, the number of points per path and animation are limited.
* `VRC Camera Dolly Point`: A point represents an animation keyframe.


## Example Hierarchy
Game objects with these components should be nested as follows:
```
Animation
├── Path 1
│   ├── Point 1
│   └── Point 2
└── Path 2
    ├── Point 1
    ├── Point 2
    ├── Point 3
    └── Point 4
```

## Usage
1. Add a `VRC Camera Dolly Animation` component to any game object and define animation parameters
2. Add a `VRC Camera Dolly Path` component to a child of the above
3. Add a set of game objects each with a `VRC Camera Dolly Point` component and define keyframe parameters
4. Select the top-level object and click `Collect Paths & Points`. This needs to be done anytime this hierarchy is updated.
5. Call `VRCCameraDollyAnimation.Import()` to apply the defined settings and animation to the local player's VRC user camera

Editor gizmos will give you an idea of what a particular animation looks like. 
However, there is no ClientSim support for previewing camera animations at this time.
To see the animation in actions, please use Build and Test.


## VRC Camera Dolly Animation

| Parameter             | Description                                                                             |
|-----------------------|-----------------------------------------------------------------------------------------|
| Is Relative To Player | Should this animation be applied relative to the world origin or the player?            |
| Is Speed Based        | Is this animation time-based (using durations) or speed-based (using fly speed values)? |
| Is Using Look At Me   | Does this animation use Look-At-Me offsets?                                             |
| Is Using Greenscreen  | Does this animation use Green Screen HSL values?                                        |
| Is Using Multi Stream | Is this a multi stream animation?                                                       |
| Path Type             | Defines the interpolation for all animation paths                                       |
| Loop Type             | Defines how the animation should loop                                                   |
| Capture Type          | Defines how the animation should be captured                                            |
| Focus Mode            | Which focus mode should the camera use for this animation?                              |
| Anchor Mode           | Which anchor mode should the camera use for this animation?                             |
| Paths                 | List of paths belonging to this animation                                               |


## VRC Camera Dolly Animation

| Parameter            | Description                           |
|----------------------|---------------------------------------|
| Points               | List of points belonging to this path |


## VRC Camera Dolly Animation

| Parameter           | Description                                                         |
|---------------------|---------------------------------------------------------------------|
| Zoom                | The keyframe's zoom value                                           |
| Duration            | The keyframe's duration (when using time-based motion)              |
| Speed               | The keyframe's speed value (when using speed-based motion)          |
| Focal Distance      | The keyframe's focal distance (when using manual focus)             |
| Aperture            | The keyframe's aperture (when using manual or semi-auto focus)      |
| Hue                 | The keyframe's greenscreen hue (when using greenscreen)             |
| Saturation          | The keyframe's greenscreen saturation (when using greenscreen)      |
| Lightness           | The keyframe's greenscreen lightness (when using greenscreen)       |
| Look At Me X Offset | The keyframe's horizontal Look At Me offset (when using Look At Me) |
| Look At Me Y Offset | The keyframe's vertical Look At Me offset (when using Look At Me)   |