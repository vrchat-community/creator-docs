# Avatar Optimization Tips

:::caution

**This guide is not meant to be the end-all, be-all of avatar optimization!** Optimizing your avatar properly requires pretty wide knowledge of a ton of things. We don't expect everyone to know everything.

However, we try our best to keep this document updated with the most common things people miss, and the most important targets to hit.

If you have input on optimization tips, please use the **Suggest Edits** button in the top right and add your own!
:::
Do you want your avatar to be efficient and be loved by everyone because of all the frames you're saving them? Follow these tips and you should be good!

Any recommended numbers or limits in this document are subject to change at any time. Although some of the descriptions provided below are not precise in a technical manner, this document is intended to assist novice users in learning how to optimize their avatars.

Community-created tools like [Cats Blender Plugin](https://github.com/michaeldegroot/cats-blender-plugin) (MIT license) allow users to very easily optimize their models and assist with common VRChat avatar problems. We strongly recommend using tools like this! It makes your job easier, and improves performance for all.

As a sidenote, the SDK's Build Control panel provides numbers of components on avatars to help with optimization.

## Optimize your content for Android/Quest

When developing content for Android, please keep the [Content Limitations](/platforms/android/quest-content-limitations) in mind! For example, avatars don't have access to all shaders and avatar components.

In addition, you should [optimize your content for Android](/platforms/android/quest-content-optimization). This improves your avatar's [performance rank](/avatars/avatar-performance-ranking-system) and allows more players to see your avatar.

## Do not use Dynamic Bones!
Dynamic Bones is a Unity Asset that you can purchase that allows you to define bones on your avatar's rig to move around as if they were hanging. You can also define static forces like gravity which can make hair fall more realistically. 

Dynamic Bones is deprecated and will be removed eventually. Use [PhysBones](/avatars/avatar-dynamics/physbones) instead.

VRChat will automatically convert Dynamic Bones to PhysBones at runtime.

## Limit usage of Cloth
Cloth is a default Unity component that has a similar cost to Dynamic Bones and is more difficult to set up. Limit your use of Cloth heavily, and do not apply it to meshes that have greater than 200 or so vertices.

## Reduce the amount of meshes on your avatar
There's two types of Mesh Renderers that your avatar could have on it-- Static Mesh Renderers and Skinned Mesh Renderers. Static Meshes do not deform. Skinned Meshes, however, usually have rigs (bones) that tell the engine how to move and deform the mesh based on the position of the bones. These Skinned Meshes are significantly more expensive, and you should only have one skinned Mesh Renderer on your avatar. There is very little reason to have more than one-- most of the time, additional items can be built into the original model.

On top of that, each additional mesh on your avatar incurs one or more additional "Draw Calls"-- essentially, time spent by your processor telling your graphics card to draw something on the screen.

Therefore, **VRChat recommends that you have one Skinned Mesh Renderer at maximum, and 3 static mesh renderers at maximum.** Merging meshes together is very simple in Blender, and is shown in the Meshes video below.

Finally, ensure that you're not using an excessive amount of triangles. The SDK will warn you if you're trying to upload a model that exceeds 70,000 triangles for PC or 20,000 on Quest. It is very rare that you need even this many polygons for details-- look into baking a normal map and simplifying your mesh via decimation or retopology.

Creating avatars for the Quest can be more challenging due to the reduced limits. The most effective optimization tends to occur during initial design and avatar creation. In other words, you're going to have problems if you try to take a 120,000 made-for-rendering model and squeeze it into 20,000 polygons. Don't make things harder than they have to be-- find a model that starts low! 20k is quite a large amount of leeway.

Notably if you are using Cats Blender Plugin, it merges meshes automatically when you "Fix Model". **If you seperate meshes by Material or by Loose Parts using Cats to assist with decimation or editing, do not forget to merge the meshes again.** 
<iframe class="embedly-embed" src="//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2F1fco-G2j0Jg%3Ffeature%3Doembed&url=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D1fco-G2j0Jg&image=https%3A%2F%2Fi.ytimg.com%2Fvi%2F1fco-G2j0Jg%2Fhqdefault.jpg&key=f2aa6fc3595946d0afc3d76cbbd25dc3&type=text%2Fhtml&schema=youtube" width="854" height="480" scrolling="no" frameborder="0" allow="autoplay; fullscreen" allowfullscreen="true"></iframe>

## Reduce the amount of material slots you use
Each additional material slot is also a draw call, which eats more processor time! If you have a lot of materials (more than 10), look into Texture Atlasing. With Community-created tools, atlasing is exceedingly easy. Check out the Materials video for more details.

As an aside, what is important is the number of **material slots on the Renderer components** in your avatar. If you have the same material in 20 slots, you still technically have 20 "materials". 

This is due to the way that Unity splits meshes into submeshes. What really matters for performance is the number of submeshes created, which Unity creates based on Material slots.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/5LwRi26RxSQ?si=_TuNCYuWLrsWrVIm" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Watch your VRAM usage!

Even if you use texture atlases, you might end end up using more VRAM than you did before!

Textures eat up VRAM. The higher the resolution of each texture, the more VRAM it consumes. Avoid using several high-resolution textures, or reduce their size by reducing the "Max Size" parameter in [Unity's import settings](https://docs.unity3d.com/Manual/class-TextureImporter.html). 

For example: A 30 MB avatar *can* use 3 GB of VRAM if it uses inefficient high-resolution textures. Don't be fooled by an avatar's download size.

Check out [Poiyomi's Texture Optimization guide](https://www.poiyomi.com/blog/2022-10-17-texture-optimization). It's an excellent and comprehensive guide on how to optimize your avatar's textures.

## Avoid expensive shaders
Some shaders can cause excessive time spent rendering on the GPU. Try to stick with the Unity Standard shaders, or shaders that you know perform well. If you don't know how to tell if a shader is well-optimized, that's fine! Here are some examples-- these certainly aren't all the shaders available, but are all well-made and well-optimized with a variety of features.
  * [Xiexe's "XSToon" Unity Shaders](https://github.com/Xiexe/Xiexes-Unity-Shaders) (MIT) - A collection of PBR 'Toon' shaders for Unity.
  * [Silent's Shaders](https://gitlab.com/s-ilent/SCSS) (MIT) - Shaders for Unity for cel shading, originally based off the discontinued CubedParadox's Flat Lit Toon, featuring a number of handy features.
  * [Poiyomi's Toon Shader](https://github.com/poiyomi/PoiyomiToonShader/releases) (MIT) - A very robust, powerful shader with a lot of options. 

### Minimize Excess Shader Passes
Speaking more technically, you want to avoid shaders that have excess shader passes. This incurs additional draw calls. This might be a bit too much for most users to worry about, so if you stick with commonly used and proven community shaders, that should suffice.

### Avoid Tessellation
**You should always avoid using shaders on avatars that use Tessellation.** This is very common in "fur" shaders. [Tessellation](https://en.wikipedia.org/wiki/Tessellation_%28computer_graphics%29) is a method by which your graphics card can take meshes and subdivide them for various effects. However, this effect is **extremely expensive** and will slow down even the most powerful of graphics cards. **Do not use shaders with tessellation effects.** If you want a fur effect, consider looking into shaders that reproduce the effect without tessellation, such as [XSFur](https://xiexe.booth.pm/items/1084711) and [Warren's Fast Fur Shader](https://warrenwolfy.gumroad.com/l/atntv).

### Keywords
You should also avoid shaders that use excessive amounts of shader keywords. This can cause serious and unpredictable issues with rendering your view in VRChat, and will fill your output log with a lot of redundant error messages. There is no need to include excessive shader keywords in your shader, so please only use the ones that are required for the features you are targeting.

#### Clearing Keywords
When you change or upgrade your shader, ensure that you remove old, unused keywords from your materials. Having excessive keywords in use is very bad for performance and optimization. Not only will it cause issues with your own avatar, but it may prevent others from seeing **all shaders** properly.

The VRChat SDK contains a tool to remove keywords from materials on your avatar. This tool can also remove keywords you need, so be careful!

Usually, it is best to check the keywords with this tool-- **if you've got too many keywords, you probably need to find another shader.** Swap to Standard, clear keywords, then swap to your new shader. 

#### Note for Shader Authors
You may want to consider using the keywords reserved by the Standard shader as your own keywords. These are essentially guaranteed to already be reserved, so if you must use keywords, use the ones already defined by Standard and Post Processing v2. Here's a [list of recommended keywords to use](https://pastebin.com/83fQvZ3n).

### Alpha Transparency
Alpha transparency is also another expensive part of shaders-- typically you want to be using Cutout or Opaque modes on shaders. Transparency can be quite expensive, so only use it if you know what you're doing! 

### Measuring Draw Calls
The Unity Profiler can be very useful when judging for how many draw calls you're incurring-- just make sure you turn off shadows on your Directional Light for a level playing field.

## Reduce the amount of bones
Even if you have a bunch of bones sitting in a scarf, skirt, or your hair that you're not using for anything, they can incur additional costs during skinning calls that your GPU has to worry about. If you're not going to use a bone, consider deleting the bone and merging it into the parent bone. If you want to know how to merge the weights of a bone into its parent, check out the video on Dynamic Bones above, which includes a part on bone merging.

## Reduce the emission amount/amount of particle systems
Although particle systems can result in a lot of cool effects, having excessively large amounts of them can cause issues for some PCs. Limit the number of particle systems that you're using, and limit the maximum amount of particles emitting at any one given moment.

There are ways to have particle systems with large numbers of particles and retain performance. If you are interested in this, look into dynamic batching for sprite particles, don't use collision, and ensure the movement of your particles is simplistic.

If you're more technically inclined, you can try looking into Unity's Profiler view to judge how much CPU time your particle simulation is taking. Generally speaking, large transparent particles are worse than a lot of smaller, opaque ones. Unity's Particle System is actually quite optimized and runs quickly *if used well.*

## Limit the number of Lights your avatar uses
Lights on avatars are real-time, and as such, are exceedingly expensive. Adding a light to your avatar means that everything that your Light touches will render with *double* the draw calls. Additional lights multiply the effect. This is obviously *very bad for performance.* Do not use Lights that are always on. Try using an Animation Override to turn a flashlight on and off, or alternately, do not use Lights at all.

If you do use a Light, turn off Shadows for the Light. Shadows on Realtime lights are VERY expensive and often don't look that great on something that moves around.

Particle Systems can be configured to have a light on for a number of particles. *Never do this!* Each particle with a light counts as a real-time light, which is (once again) extremely expensive.

**In total, VRChat recommends that you do not use Lights of any type on avatars at all.** Not only do they adversely affect your own avatar's performance, they multiply performance cost of avatars the light is hitting as well.

## Recommended Software/Plugins
There's a large amount of software available to help you optimize your avatar and make it easier to build avatars. 

For example, check out [Pumkin's Avatar Tools](https://github.com/rurre/PumkinsAvatarTools) (MIT) for the Unity Editor. Among other things, this Editor script allows you to quickly see stats on your avatars. This tool is in beta, and may have bugs-- please report any issues on Pumkin's GitHub.

The following software has not been authored by VRChat. Please read and respect the licensing provided with each individual product.

* [Unity](/sdk/upgrade/current-unity-version) 
* [Blender](https://blender.org)
* [Cats Blender Plugin
](https://github.com/absolute-quantum/cats-blender-plugin)
* [Shotariya's Material Combiner](https://github.com/Grim-es/material-combiner-addon)
* [Pumkin's Avatar Tools](https://github.com/rurre/PumkinsAvatarTools)