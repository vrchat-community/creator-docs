---
title: "Light Baking"
hidden: false
---

# What is light baking?
Light baking is the process of pre-computing virtual rays of light and saving that to a texture. If you know a light in your world will never move or change then you can save **a lot** of performance by baking it. Light baking can give your world more colorful and realistic lighting, as well as *greatly* improve performance for a small amount of file size!

# Preparing your World
Unity has an extremely efficient optimization system to make your world run extremely smoothly. The only problem is Unity *doesn't know* what it should and should not optimize; we need to explicitly tell Unity what to optimize. 

Marking objects as "Static" at the top right of the inspector window tells Unity that the object will never move. This lets Unity know it's completely safe ignore a large variety of dynamic stuff. This also lets unity know that our objects are safe to bake into permanent lightmaps.

*"If you know something will never change; make it static." -VRCat*


# The basics of Lighting
There are three types of lights in Unity; realtime, baked, and mixed.  

- **Realtime (Dynamic)** lights run and calculate illumination and shadows entirely live, in-game.
- **Baked** lights are permanent light sources baked into the static surface of the world. 
- **Mixed** is a hybrid of the other two types. Mixed lights will act like Baked lights for static objects, but will still compute dynamic lighting and shadows for objects that need it.

For best performance, **always** use Baked lights by default unless you specifically need the abilities of a different type.

:::note Warning!
**Misusing realtime lights is possibly the single fastest and most efficient way to destroy the performance of your world!**
:::

# Lets Get Baking!
First make sure you've set the objects you want to bake to be `Static` and set your permanent lights to the `Baked` lighting mode as discussed above!! Next, open the Lighting settings tab by going to:

```Window > Rendering > Lighting Settings```

Here you can see all the settings for Unity's lightmapper! Here are some notable settings to consider:
- **Environment**
    - **Skybox Material & Sun Source** - Make sure these are properly set to your world's sun light source and skybox!
- **Lightmap Settings**
    - **Lightmapper** - This is the light baking algorithm that unity will use to compute lighting. As of writing; the only stable supported one is `Progressive CPU` which is *extremely* slow. There is a faster GPU based option that is unstable and may cause ugly artifacts. You are welcome to experiment!
    - **Bounces** - How many objects simulated photons will bounce off of. The higher the number the prettier it may be and longer it will take to bake.
    - **Lightmap Resolution** - This represents the number of pixels unity will use to represent each geometric unit in the scene. Higher means higher resolutions but more and larger lightmap textures. It's recommeded to set this to `20`, the default of `40` is set for games that have the filesize to spare. But VRChat content needs to be small and lightweight enough to be downloaded off the internet at a moments notice.
    - **Lightmap Size** - The resolution of the final lightmap textures the lightmapper will export. If it runs out of space one one lightmap it will simply start another. Be careful not to set the resolution unnessecarily high or low.

- **Auto Generate Lighting** - Does exactly what it says, if checked, it will automatically compute your baked lighting in the background while using the editor. This can be *extremely* usefull but is also *extremely* taxing on your hardware. User discretion is advised.
- **Generating Lighting** - Click this to get baking! This button is also a dropdown! Click the arrow on the right to wipe the baked lightmaps or recompute just the reflection probes.


# Adding Reflections
Calculating realtime reflections is too expensive to do at runtime; and VRChat doesn't have raytracing support (...yet...). So to counteract this, we use Reflection Probes! Reflection probes are just low resolution panoramas that are used by reflective shaders to calculate *vaguely* what a realistic reflection would look like.

To create a reflection probe go to:

```GameObject > Light > Reflection Probe```

The box gizmo surrounding the reflection probe represents it's area of effect. Reflection probes are often placed in the center of points of interest. Try using one reflection probe per discrete area. You can tweak the `Box Size` and `Box Offset` settings to suit your needs.

Smaller rooms may only need one probe in the middle; whereas larger rooms with multiple zones may need a probe for each zone. If you have a particularly important reflective object or surface it may even be worthwhile to give it it's own probe.
