---
title: "Quest Content Optimization"
slug: "quest-content-optimization"
hidden: false
createdAt: "2019-04-08T23:52:28.397Z"
updatedAt: "2023-02-03T01:02:49.409Z"
---
Creating content for VRChat Quest is a challenge-- you have to create attractive, compelling content all the while keeping the content optimized for a mobile device. These are the same challenges that game developers must deal with while building for mobile. 

Here, we'll give you some general guidelines of what you need to keep in mind while building content for VRChat Quest.

The items below will apply to both avatars and worlds unless otherwise noted.

Unity has a guide for [Optimizing your VR/AR Experiences ](https://learn.unity.com/tutorial/optimizing-your-vr-ar-experiences) which has quite a lot of good points.

There's also this [excellent video on optimizing your VR content by Lucas Rizzotto](https://www.youtube.com/watch?v=w0n4fuC4fNU)! It is very well done and covers a lot of what we cover here. **This video was not created by VRChat or for VRChat specifically, and as a fair warning, contains some harsh language.** A lot of the items in this post are covered in this video.

As a final note, all items on this list are subject to change. In other words, we're not quite done nailing down restrictions and recommendations, so keep that in mind.
# Limit Enforcement
The Oculus Quest has several hard (and soft) limits for content on avatars. Check out [Quest Content Limitations](/platforms/android/quest-content-limitations) to find out more, as well as our page [Avatar Performance Ranking System](/avatars/avatar-performance-ranking-system) for some more details on how blocking works.

If you upload an avatar or avatar world that features avatars greatly exceeding our recommendations, that world or avatar may be removed from public access.
# Unity Profiler
We strongly, strongly recommend that you check out the [Unity Profiler](https://docs.unity3d.com/Manual/Profiler.html). Using the profiler, you can quantify precise values for  various performance metrics for your world or avatar. Of particular interest is probably the number of draw calls in a scene, or the proportional amount of frame time a component uses. 

Of course, the profiler on your powerful PC won't represent how a profiler on the Quest might look, but you can still see that X component is using a ton of frame time versus rendering, or etc. Its all relative!

There's lots of tutorials on how to use the Unity Profiler out there, including two from Unity: [Profiler Overview for Beginners](https://unity3d.com/learn/tutorials/topics/interface-essentials/profiler-overview-beginners) and the [intermediate Introduction to the Profiler](https://unity3d.com/learn/tutorials/topics/interface-essentials/introduction-profiler). These tutorials were made for older versions of Unity, but still cover the basic concepts quite well.
# File Size
You've only got a limited amount of memory on mobile platforms, and keeping that in mind is extremely important. You can see the size of your assets once you've built the content (press "Build & Publish" in the SDK) and search your Editor log for "statistics". The pre-compressed size is what you're looking for.

As a rule of thumb, avoid large (>1k) textures. They are the primary culprit of high memory usage. Utilization of vertex colors and flat colors can help greatly with reducing texture size.

Please note that Crunch compression does _not_ help with in-memory size! Crunch compression only helps with download size. Your content package should be within the limits without Crunch.

### Worlds

You cannot upload or access worlds that exceed 100MB in size after build-time compression for VRChat Quest.

### Avatars

You should be aiming for a maximum of 5-8 MB. You cannot upload or wear/view avatars that exceed 10MB in size after build-time compression for VRChat Quest.
# Polygon Count
Keeping polygon count low is very important on mobile platforms. Although the Quest is quite powerful for a mobile headset, its hardware does have limits. Keeping an eye on your polygon count is very important to keep performance high.

These recommendations are technically enforced via our [Avatar Performance Ranking System](/avatars/avatar-performance-ranking-system).

### Worlds

While building worlds, you should try to keep polygon count low. You want to leave room for the user's avatars as well. **We recommend that you budget approximately 50,000 triangles for your world in total.**

### Avatars

The same general rules apply for avatars that apply for worlds. Keep in mind that you may have 10 or more users in the same room, so you'll want to budget your triangle usage pretty heavily. **We recommend that you aim for under 10,000 triangles for your avatar.**

**A hard polygon limit may be established in the near future for VRChat Quest avatars. It will not be much higher than 5,000 triangles, hence our suggestion.**

This will be a challenge for avatar authors that prefer to import characters from various sources rather than create an avatar themselves. Decimation down to this level can be destructive, and you may need to look into techniques like retopologizing geometry to keep your polygon count low.
# Mesh Count
This applies to both worlds and avatars.

No matter what tool you use to do it, you should limit the number of meshes you use in your content. For static objects in worlds, this isn't so important (due to the need for occlusion culling) but for avatars, it is exceedingly important.

You should only ever have one Skinned Mesh Renderer on your avatar. Any accessories or additions to your avatar should be done in 3D editing software like Blender, and merged into the original mesh. Any animations or movement should be handled via shape keys or bones.

A hard Mesh Count limit will be established in the near future for VRChat Quest avatars.

For worlds, you should think in terms of "objects" in the world. A set of pots on the ground could be a single object, but you probably wouldn't want to merge the set of pots into the ground mesh. Otherwise, you might run into various optimization issues as well as difficulty with editing the world later on.
# Materials
Reducing material count is important for both avatars and worlds. Additional materials creates additional submeshes, which costs draw calls. Reducing the number of draw calls necessary to render your viewport is very important.

### Worlds

You should aim to have the minimal possible material count for your world. That being said, you can be a little less careful with the world than you are with avatars. Its best to think of your world as a collection of objects, and combine materials accordingly.

For example, if you have a beach scene, a chair/umbrella/blanket set should probably be a single material on a single texture atlas. A set of rocks a little bit farther down the beach would be another material and texture. That way, you can separate out the object for occlusion culling purposes.

Getting too aggressive with combining materials and atlasing in worlds results in some non-optimal behavior when Unity does batching and its own runtime optimization.

### Avatars

You should be aiming for 1 material on your avatar, although having 2 in cases where you need a different shader variant may be permissible. Atlasing textures is essential.

A hard Material limit will be established in the near future for VRChat Quest avatars.

### Avatars and Worlds

You should be enabling GPU Instancing on all of your materials. Although the actual use case of this is more complex and technical, it is best just to turn it on.
# Textures
Concerns for texture size apply evenly across both avatars and worlds, but keep in mind that avatar texture size should be reduced, as you'll have multiple avatars in a single instance (but only one world).

Keeping texture size low is important. You should aim for using 1k (1024x1024) resolution textures at maximum. You should also create efficiently packed atlases, allowing for more texture resolution in the same size.

Avatars cannot exceed 10MB in size after compression, and worlds cannot exceed 100MB after compression. Since most of this is usually texture data, you should keep your textures small and compress them. 

Consider using Crunch compression, but keep in mind that this may break your avatars later on if a new Unity version employs an incompatible version of Crunch.
# Lighting
This section only applies for worlds.

Baking lighting for your world is **essential**. It is not unreasonable to write off real-time lights completely, as they are very expensive. Make extensive use of baked lighting and light probes. Keep your lightmap resolution low. Even with low lightmap resolution, lighting can look very good.
# Occlusion Culling
This section only applies for worlds.

Baking occlusion culling is exceedingly important. Doing so will allow the hardware to only render what it needs to, and ignore what you can't see. Setting up occlusion culling doesn't take long at all.

This is also the reason you don't want to be too aggressive in merging meshes in worlds-- if you've got some objects like a building set on some ground, you probably don't want to merge the building mesh into the ground mesh so you can cull out the building.
# Bone Count
Keeping bone count low is important to keep the cost of skinning calls low. If a bone isn't animated by an animation or by the rig, you should merge its weights into its parent and delete the original bone. Tools like [Cat's Blender Plugin](https://github.com/michaeldegroot/cats-blender-plugin) make this exceedingly easy.

Since Dynamic Bones is disabled on VRChat Quest, this means that there's no need for extra bones for dynamic bits. You'll want to merge the weights for those bones into their parents.

A hard Bone limit will be established in the near future for VRChat Quest avatars.
:::caution Matching Rigs

Ensure that the basic bone layout and hierarchy of your rigs are identical, including scale, rotation, and position. This especially applies to your root (usually hip) bone. Having a mismatch can result in strange behavior when viewing content cross-platform.
:::

# Shaders
### Avatars

Shaders are restricted for avatars in VRChat Quest, and you can only use the VRChat Mobile shaders included in the VRChat SDK.

You can read about these variants on our [Quest Content Limitations](/platforms/android/quest-content-limitations) page.

If you don't have a normal map for your avatar, don't use Bumped variants. It won't do anything for you, and you'll incur a little bit of a performance cost. Same for Specular.

### Worlds

Shaders are not restricted for worlds in VRChat Quest. However, you should be *extremely careful* when writing and using custom shaders. Aim for performance above all else. If you're looking for a highly optimized basic world shader, use `Mobile/VRChat/Lightmapped` and bake your lighting.

You should avoid needing transparency completely. Alpha fill rate is a significant performance sink for mobile GPUs, so design around not having transparency whenever possible.
# Other Components
### Dynamic Bones

Dynamic Bones is disabled completely in VRChat Quest.

### Cloth

Cloth components are disabled completely in VRChat Quest.

### Cameras

Camera components are disabled on avatars in VRChat Quest.

They are permitted in worlds, but you should be careful not to go overboard with them.

### Lights

Lights are disabled completely on avatars in VRChat Quest.

### Video Sync Panels
:::caution

Placing either of these components in your Quest world will break compatibility between your Quest and PC world! Simply remove it from the Quest version.",
  "title": "VRC_SyncVideoPlayer and VRC_SyncVideoStream
:::
VRC_SyncVideoPlayer and VRC_SyncVideoStream are both completely disabled in worlds in VRChat Quest.

### Post Processing (v1 and v2)

Post processing systems are disabled completely in VRChat Quest.

### Audio Sources

Audio sources are disabled completely on avatars in VRChat Quest.

Audio sources are restricted in worlds in VRChat Quest.

### Rigidbodies, Colliders, and Joints

Rigidbodies, colliders, and joints are disabled completely on avatars in VRChat Quest.

They are permitted in worlds, but you should be careful not to go overboard with them.

### Particles

Particles are limited heavily on avatars in VRChat Quest.

Numbers for limits pending.