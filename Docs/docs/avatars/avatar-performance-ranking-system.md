---
title: "Performance Ranks"
slug: "avatar-performance-ranking-system"
hidden: false
createdAt: "2018-12-13T04:25:32.791Z"
updatedAt: "2023-03-10T00:59:33.636Z"
---
The Avatar Performance Ranking System allows you to see how much a user's avatar is affecting performance via analysis of the components on that user's avatar. You can also use it on yourself to see how performant your avatar is.

This system is provided to inform users what is likely the most performance-heavy components on their avatars, and offer basic advice on what to look into when optimizing their avatar.

It is also used to drive the [Minimum Displayed Performance Rank](/avatars/avatar-performance-ranking-system#section-minimum-displayed-performance-rank) system, which is a way for users to decide what avatars they wish to show based on their Performance Rank.

**This system is not meant to be an end-all-be-all authority on avatar performance**, but is a good general guide to indicate if an avatar needs a bit more work to be performant.
:::danger Perf Ranks are not the final word!

Although the Performance Rank system does as best as it can to judge the "worst case" scenario of an avatar's performance, there are many ways to have a well-optimized avatar appear as Very Poor, and have a FPS hog rank as Excellent.\n\nFor the technically inclined: the Performance Rank system is based on a static analysis of the avatar's properties without any consideration paid to things like animators, shaders, texture resolution, pixel lights, and many more factors. *However*, it tends to provide an excellent litmus test for detecting problematic avatars 95% of the time!
:::

# Short Version
**Aim for Good ranking.** If you can't hit that, **Medium is perfectly fine.** 

Creating avatars is already hard, and creating optimized avatars is even harder. It is a skill that takes a long time to build!

Keep in mind that many events, groups, and locations in VRChat may ask you to change your avatar if you show up in a Very Poor avatar. As such, even if you choose to use a Very Poor avatar in small instances with your friends, make sure you also have one meant for usage in instances with more people.

Your avatar affects everyone else's framerate, so be mindful of how your choices affect other people's experiences. Otherwise, they might see you as your Fallback!
# Performance Ranking Icons
When you open your Quick Menu, you'll see icons appear on top of the nameplates of users. 

The ranks are as follows:

| Icon                                                  | Performance Rank | Description                                                                                                                                                                       |
|-------------------------------------------------------|------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ![image](/img/avatars/performance-rank/excellent.png) | Excellent        | This is as good as you can get! The "Gold Star on the Fridge" rank.                                                                                                               |
| ![image](/img/avatars/performance-rank/good.png)      | Good             | Good enough! A great target to aim for.                                                                                                                                           |
| ![image](/img/avatars/performance-rank/medium.png)    | Medium           | Don't let the name fool you, Medium is plenty good. If you're here and don't want to work any farther up, you're fine.                                                            |
| ![image](/img/avatars/performance-rank/poor.png)      | Poor             | Could use some work.                                                                                                                                                              |
| ![image](/img/avatars/performance-rank/very-poor.png) | Very Poor        | This avatar has some serious performance problems. Since this rank is unbounded, it is very possible that your performance is suffering as a result of this avatar being visible. |

# Viewing Detailed Avatar Stats
If you click on a user with your Quick Menu open, you'll notice a new **"Show Avatar Stats"** button on the left side, displaying the icon of that user's Performance Rank.
:::caution

This graphic is out of date! Update pending.
:::

![image](/img/avatars/avatar-performance-ranking-system-05c612d-image_4.png)

If you click this icon, you can view the detailed **Avatar Stats** of that avatar. You can get to this for your own avatar by going to your Avatar Menu, clicking one of your avatars, and clicking the **Avatar Stats** button in the bottom left of the screen.
:::caution

This graphic is out of date! Update pending.
:::

![avatar-performance-ranking-system-7a362c2-fixedTrogPerf.png](/img/avatars/avatar-performance-ranking-system-7a362c2-fixedTrogPerf.png)

When you click the **Avatar Stats** button, you'll get a screen pop up with the details of avatar you're looking at, or your own avatar (if you clicked the button in the Avatar tab).
:::caution

This graphic is out of date! Update pending.
:::

<iframe src='https://gfycat.com/ifr/ImpossibleFarawayLamprey?hd=1' frameborder='0' scrolling='no' allowfullscreen width='640' height='506'></iframe>
The color of the text matches the rank that the particular stat "drags" the rank down to.

You'll also see a "before and after" in the form of the "Original" and "Perf Filtered" lines. If you're using the [Minimum Displayed Performance Rank](/avatars/avatar-performance-ranking-system#section-minimum-displayed-performance-rank) system, you can see what the stats were before and after the system removed components. In the case of the Minimum Displayed Performance Rank system blocking an avatar for performance reasons, you'll only see the original stats.

In the example given above, Lights and Particle Systems are disabled due to exceeding the limit defined. Because Particle Systems employ at least one material each, the count of materials from Particle Systems is also subtracted from the pre-filtered avatar. 

You can also see that we link to our **Documentation**, in particular our [Avatar Optimization Tips](/avatars/avatar-optimizing-tips).
# Avatar Performance Ranking Stats
Here is a listing of all of the statistics that the system looks at and their description.

Bolded stats will cause the avatar to be fully blocked if they exceed the Minimum Displayed Performance Rank. If other stats (except for bounds) exceed the Minimum Displayed Performance Rank the avatar will only be partially blocked. The avatar will be shown with any components related to the exceeded stats will be removed. 

For example with the Minimum Displayed Performance Rank set to Poor an avatar with 9 Trail Renderers (Very Poor) will be displayed with all of its Trail Renderers removed. Refer to [Minimum Displayed Performance Rank](/avatars/avatar-performance-ranking-system#section-minimum-displayed-performance-rank) for more information.

Certainly! Here's the information reformatted into a two-column markdown table:

| Avatar Quality             | Quality Description                                                                                                                       |
| --------------------------| ---------------------------------------------------------------------------------------------------------------------------------------- |
| Polygons                   | The polygon count of the model in question, counted in triangles.                                                                        |
| Bounds Size                | The total size of the avatar. If this is really huge, that user probably has a large animation on the avatar that isn't showing all the time. Important note: Bounds Size will not cause the avatar to be blocked even if it is below the Minimum Displayed Performance Rank setting. |
| Texture Memory             | The amount of memory estimated to be in use by the avatar's textures. These textures occupy space in both system RAM and in the video card's memory.                                                     |
| Skinned Meshes             | The number of Skinned Mesh components on the avatar.                                                                                     |
| Meshes                     | The number of non-Skinned Mesh components on the avatar.                                                                                 |
| Material Slots             | The number of material slots on the avatar. Material slots are the slots on the mesh where you fit materials in. This is what counts toward Submesh creation, which incurs further draw calls. Keep in mind that Particle Systems will use one material slot, Particle System with trails use two, and Line Renderers use one material slot. |
| Dynamic Bone Components    | The number of Dynamic Bone scripts on the avatar.                                                                                        |
| Dynamic Bone Transforms    | The number of transforms animated by any given Dynamic Bone script on the avatar.                                                        |
| Dynamic Bone Colliders     | The number of Dynamic Bone Collider scripts on the avatar.                                                                               |
| Dynamic Bone Collision Check Count | The total number of DynamicBone transforms affected by the Dynamic Bone Collider scripts on the avatar. This can count transforms twice or more, because a single transform can be affected by multiple colliders. |
| PhysBones Components       | The number of PhysBone components on the avatar.                                                                                          |
| PhysBones Affected Transforms | The total number of transforms affected by PhysBones components on the avatar.                                                          |
| PhysBones Colliders        | The number of PhysBone collider scripts on the avatar.                                                                                    |
| PhysBones Collision Check Count | The sum of how many PhysBone transforms each collider can affect. This can count transforms twice or more, because a single transform can be affected by multiple colliders. |
| Avatar Dynamics Contacts   | The number of Avatar Dynamics Contacts on the avatar.                                                                                     |
| Animators                  | The number of Animators on the avatar. Important note: This will always be at least 1 due to the root animator being counted. This means that for the Excellent ranking, you can have no additional animators. |
| Bones                      | The number of Bones in the avatar's rig.                                                                                                 |
| Lights                     | The number of Light components on the avatar.                                                                                            |
| Particle Systems           | The number of Particle System components on the avatar.                                                                                   |
| Total Particles Active     | The sum of maxParticles across all particle systems on the avatar.                                                                        |
| Mesh Particle Active Polys | The total number of polygons of Mesh Particles emitted by Particle Systems that are active. In other words, maxEmission * meshParticleVerts. |
| Particle Trails Enabled    | If any Particle Systems on the avatar have Particle Trails enabled, this will be True.                                                   |
| Particle Collision Enabled | If any Particle Systems on the avatar have Particle Collision enabled, this will be True.                                                |
| Trail Renderers            | The number of Trail Renderers on the avatar.                                                                                             |
| Line Renderers             | The number of Line Renderers on the avatar.                                                                                              |
| Cloths                     | The total number of Cloth components on the avatar.                                                                                     |


# Avatar Performance Ranks - Value Maximums per Rank
Below, you'll find the limits for each of the Performance Ranks. If you go above these numbers for any category, you'll be bumped into the next rank.

For example (on PC), if your avatar has 2 Skinned Meshes, your avatar will be ranked as Good, as that exceeds the rating for Excellent, but does not exceed the rating for Good. 
:::caution All GameObjects and Components are counted!

All GameObjects and Components, **including those that are currently disabled**, count towards the Avatar Performance Rank.
:::

:::caution Mesh Read/Write Disabled

If you disable Mesh Read/Write on **any** mesh on the avatar (including particle systems), the "Polygons" count will read "Mesh Read/Write Disabled" and the avatar's Performance Rank will be immediately downgraded to "Very Poor" regardless of the actual triangle count on the avatar.\n\nThe SDK warns you of this and will require that you fix it before you upload.
:::

# PC Limits
On PC, the default Minimum Displayed Performance Rank level is set to "Very Poor". **Currently, no avatars will be blocked by default due to performance ranking on PC, unless you've enabled the [Minimum Displayed Performance Rank](/avatars/avatar-performance-ranking-system#section-minimum-displayed-performance-rank) system.**

Triangles (polygons) are a somewhat special case-- if you are 32k or less, you are marked as Excellent. Any number higher than 32,000 but lower than 70,001 will be marked as Good (unless some other stat pulls you down). If you exceed 70,000 polygons, the avatar will be marked as Very Poor immediately.

| Avatar Quality                                                        | Excellent          | Good         | Medium       | Poor         |
|-----------------------------------------------------------------------| ------------------ | ------------ | ------------ | ------------ |
| Polygons                                                              | 32,000             | 70,000       | 70,000       | 70,000       |
| Bounds Size<sup>1</sup>                                               | 2.5m x 2.5m x 2.5m | 4m x 4m x 4m | 5m x 6m x 5m | 5m x 6m x 5m |
| Texture Memory                                                        | 40 MB              | 75 MB        | 110 MB       | 150 MB       |
| Skinned Meshes                                                        | 1                  | 2            | 8            | 16           |
| Meshes                                                                | 4                  | 8            | 16           | 24           |
| Material Slots                                                        | 4                  | 8            | 16           | 32           |
| Dynamic Bone Components                                               | 0                  | 4            | 16           | 32           |
| Dynamic Bone Transforms                                               | 0                  | 16           | 32           | 256          |
| Dynamic Bone Colliders                                                | 0                  | 0            | 4            | 32           |
| Dynamic Bone Collision Check Count                                    | 0                  | 0            | 8            | 256          |
| [PhysBones](/avatars/avatar-dynamics/physbones) Components            | 4                  | 8            | 16           | 32           |
| [PhysBones](/avatars/avatar-dynamics/physbones) Affected Transforms   | 16                 | 64           | 128          | 256          |
| [PhysBones](/avatars/avatar-dynamics/physbones) Colliders             | 4                  | 8            | 16           | 32           |
| [PhysBones](/avatars/avatar-dynamics/physbones) Collision Check Count | 32                 | 128          | 256          | 512          |
| Avatar Dynamics [Contacts](/avatars/avatar-dynamics/contacts)         | 8                  | 16           | 24           | 32           |
| Animators                                                             | 1                  | 4            | 16           | 32           |
| Bones                                                                 | 75                 | 150          | 256          | 400          |
| Lights                                                                | 0                  | 0            | 0            | 1            |
| Particle Systems                                                      | 0                  | 4            | 8            | 16           |
| Total Particles Active                                                | 0                  | 300          | 1000         | 2500         |
| Mesh Particle Active Polys                                            | 0                  | 1000         | 2000         | 5000         |
| Particle Trails Enabled                                               | False              | False        | True         | True         |
| Particle Collision Enabled                                            | False              | False        | True         | True         |
| Trail Renderers                                                       | 1                  | 2            | 4            | 8            |
| Line Renderers                                                        | 1                  | 2            | 4            | 8            |
| Cloths                                                                | 0                  | 1            | 1            | 1            |
| Total Cloth Vertices                                                  | 0                  | 50           | 100          | 200          |
| Physics Colliders                                                     | 0                  | 1            | 8            | 8            |
| Physics Rigidbodies                                                   | 0                  | 1            | 8            | 8            |
| Audio Sources                                                         | 1                  | 4            | 8            | 8            |

Footnotes:
1: Bounds Size is determined by the maximum size of all components on your avatar. Trail and Line Renderers do not count for this calculation.
# Quest Limits
### Default Performance Rank Blocking
On Quest, the Minimum Displayed Performance Rank is set to Medium by default. This means you will not see any avatars ranked as Poor or Very Poor.

You can set your Performance Rank Block level to Poor to allow the display of Poor avatars. However, you cannot set your Performance Rank Block level to "Very Poor".

For example, if an avatar on Quest exceeds 20,000 triangles (polygons), it will not display by default in the application. These avatars can be forced to show by clicking on each user and clicking "Show Avatar". 

Notably, **there is a hard cap on [Avatar Dynamics](/avatars/avatar-dynamics) systems on Quest.** It cannot be bypassed by using "Show Avatar". This is the hard cap:

- 8 [PhysBone](/avatars/avatar-dynamics/physbones) components
- 64 [PhysBones](/avatars/avatar-dynamics/physbones) affected transforms
- 16 [PhysBones](/avatars/avatar-dynamics/physbones) colliders
- 64 [PhysBones](/avatars/avatar-dynamics/physbones) collider checks
- 16 [Avatar Dynamics Contacts](/avatars/avatar-dynamics/contacts) 

If this cap is exceeded on Quest, all [Avatar Dynamics](/avatars/avatar-dynamics) components will be removed from the avatar, even if Show Avatar is enabled.
:::danger

**"Show Avatar" for Very Poor avatars functionality may be removed in the future, and Very Poor avatars may be removed from Quest entirely.** Please keep this in mind when creating avatars for VRChat on the Oculus Quest.
:::

| Avatar Quality                                                                    | Excellent          | Good         | Medium       | Poor         |
|-----------------------------------------------------------------------------------| ------------------ | ------------ | ------------ | ------------ |
| Polygons                                                                          | 7,500              | 10,000       | 15,000       | 20,000       |
| Bounds Size <sup>1</sup>                                                          | 2.5m x 2.5m x 2.5m | 4m x 4m x 4m | 5m x 6m x 5m | 5m x 6m x 5m |
| Texture Memory                                                                    | 10 MB              | 18 MB        | 25 MB        | 40 MB        |
| Skinned Meshes                                                                    | 1                  | 1            | 2            | 2            |
| Meshes                                                                            | 1                  | 1            | 2            | 2            |
| Material Slots                                                                    | 1                  | 1            | 2            | 4            |
| Animators                                                                         | 1                  | 1            | 1            | 2            |
| Bones                                                                             | 75                 | 90           | 150          | 150          |
| [PhysBones](/avatars/avatar-dynamics/physbones) Components<sup>2</sup>            | 0                  | 4            | 6            | 8            |
| [PhysBones](/avatars/avatar-dynamics/physbones) Affected Transforms<sup>2</sup>   | 0                  | 16           | 32           | 64           |
| [PhysBones](/avatars/avatar-dynamics/physbones) Colliders<sup>2</sup>             | 0                  | 4            | 8            | 16           |
| [PhysBones](/avatars/avatar-dynamics/physbones) Collision Check Count<sup>2</sup> | 0                  | 16           | 32           | 64           |
| Avatar Dynamics [Contacts](/avatars/avatar-dynamics/contacts)<sup>2</sup>         | 2                  | 4            | 8            | 16           |
| Particle Systems                                                                  | 0                  | 0            | 0            | 2            |
| Total Particles Active                                                            | 0                  | 0            | 0            | 200          |
| Mesh Particle Active Polys                                                        | 0                  | 0            | 0            | 400          |
| Particle Trails Enabled                                                           | False              | False        | False        | True         |
| Particle Collision Enabled                                                        | False              | False        | False        | True         |
| Trail Renderers                                                                   | 0                  | 0            | 0            | 1            |
| Line Renderers                                                                    | 0                  | 0            | 0            | 1            |

Footnotes:
1: Bounds Size is determined by the maximum size of all components on your avatar. Trail and Line Renderers do not count for this calculation.
2: If the Very Poor value is exceeded on Quest, no matter the current "Show Avatar" state of the avatar, all Avatar Dynamics-related components will be removed.

### Removed Categories
The following categories are disabled on Quest since they can never appear on avatars:

  * Dynamic Bone Components
  * Dynamic Bone Transforms
  * Dynamic Bone Colliders
  * Dynamic Bone Collision Check Count
  * Lights
  * Cloths
  * Total Cloth Vertices
  * Physics Colliders
  * Physics Rigidbodies
  * Audio Sources

These values may still appear in the in-app stats readout, but will always be zero.

# Minimum Displayed Performance Rank
You can choose to manage avatars based on their Avatar Performance Rank. This option is available in the "Performance Options" menu, accessible as a button in the top-right of the Safety tab in the main menu.

When you choose a Performance Rank in this menu, all avatars that are below that level will have their components/display managed as described below.

| Parameter                                                                         | Description                                                                                                          |
| :-- |:---------------------------------------------------------------------------------------------------------------------|
| Polygons                                                                          | **Avatar replaced with [Fallback](https://docs.vrchat.com/docs/avatar-fallback-system)**                     |
| Bounds Size                                                                       | No change                                                                                                            |
| Texture Memory                                                                    | **Avatar replaced with [Fallback](https://docs.vrchat.com/docs/avatar-fallback-system)**                             |
| Skinned Meshes                                                                    | **Avatar replaced with [Fallback](https://docs.vrchat.com/docs/avatar-fallback-system)**                             |
| Meshes                                                                            | **Avatar replaced with [Fallback](https://docs.vrchat.com/docs/avatar-fallback-system)**                             |
| Material Slots                                                                    | **Avatar replaced with [Fallback](https://docs.vrchat.com/docs/avatar-fallback-system)**                             |
| Physics Bone Components, Transforms, Colliders, CollisionCheckCount, or Contacts  | All PhysBone, PhysBone Collider,and Contact components removed                                                       |
| Dynamic Bone Components or Transforms                                             | All Dynamic Bones components removed                                                                                 |
| Dynamic Bone Colliders or Collision Check Count                                   | All Dynamic Bone Collider components removed                                                                         |
| Animators                                                                         | All animators (aside from root animator) removed                                                                     |
| Bones                                                                             | **Avatar replaced with [Fallback](https://docs.vrchat.com/docs/avatar-fallback-system)**                             |
| Lights                                                                            | All Lights removed                                                                                                   |
| Particle Systems                                                                  | All Particle Systems removed                                                                                         |
| Total Particles Active                                                            | All Particle Systems removed                                                                                         |
| Mesh Particle Active Polys                                                        | All Particle Systems removed                                                                                         |
| Particle Trails Enabled                                                           | All Particle Systems removed                                                                                         |
| Particle Collision Enabled                                                        | All Particle Systems removed                                                                                         |
| Trail Renderers                                                                   | All Trail Renderers removed                                                                                          |
| Line Renderers                                                                    | All Line Renderers removed                                                                                           |
| Cloths                                                                            | All Cloth components removed                                                                                         |
| Total Cloth Vertices                                                              | All Cloth components removed                                                                                         |
| Physics Colliders                                                                 | All Physics Colliders removed                                                                                        |
| Physics Rigidbodies                                                               | All Physics Rigidbodies removed                                                                                      |
| Audio Sources                                                                     | All Audio Sources removed                                                                                            |

### Minimum Displayed Performance Rank on PC
On VRChat for PC, the Minimum Displayed Performance Rank is set to "Very Poor" by default. This means that, by default, no avatars will have their components or display affected for performance reasons on PC. If you wish to change this, you can choose between "Medium", "Poor", or "Very Poor" options.

### Avatar Performance Rank Blocking on Quest
On VRChat for the Oculus Quest, the Avatar Performance Rank Block is set to "Medium" by default. You can choose to change this to "Poor" to see avatars of that rank, but your performance may suffer as a result.

You cannot disable the Avatar Performance Rank Block system on Quest. In other words, avatars that are ranked as "Very Poor" will always have their display managed VRChat for the Oculus Quest, and may not display at all.

No matter what setting you choose, if the [Avatar Dynamics](/avatars/avatar-dynamics) component limits are exceeded on Quest, all of those components will be removed. In short, there is a hard cap for Avatar Dynamics components on Quest avatars.

### Overriding Individual Avatars
:::danger

**"Show Avatar" for Very Poor avatars functionality may be removed in the future, and Very Poor avatars may be removed from Quest entirely.** Please keep this in mind when creating avatars for VRChat on the Oculus Quest.
:::
You can choose to override the the entirety of the system (and the Safety system) by selecting "Show Avatar" on each user you wish to show.