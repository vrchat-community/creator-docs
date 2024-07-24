# AI Navigation

AI Navigation allows you to create non-player characters (NPCs) that can intelligently move around the game world, using navigation meshes that are created automatically from your Scene geometry. Dynamic obstacles allow you to alter the navigation of the characters at runtime, while offmesh links let you build specific actions like opening doors or jumping over gaps or down from a ledge.

:::tip

AI Navigation is a built-in Unity feature. Read [Unity's official documentation](https://docs.unity3d.com/Packages/com.unity.ai.navigation@1.1/manual/index.html) to understand important concepts on how to use it.

:::

## Differences from Unity 2019 Navigation Features

Compared to previous versions, Unity 2022 has changed how AI Navigation works in Unity:

* The system is now a separate package maintained by Unity rather than integrated into the core.
* Runtime generation! You can now create and update your navigation meshes at runtime in the VRChat client. This was only possible in the Unity Editor before.
* [NavMesh Links](https://docs.unity3d.com/Packages/com.unity.ai.navigation@1.1/manual/NavMeshLink.html) and [Off-Mesh Links](https://docs.unity3d.com/Packages/com.unity.ai.navigation@1.1/manual/CreateOffMeshLink.html) are simpler to use.
* NavMesh generation is generally improved and more robust.
* Obstacles can be dynamic now.
* You can use multiple [NavMesh Surfaces](https://docs.unity3d.com/Packages/com.unity.ai.navigation@1.1/manual/NavMeshSurface.html) within your world.
* NavMesh Surfaces, [Modifiers](https://docs.unity3d.com/Packages/com.unity.ai.navigation@1.1/manual/NavMeshModifier.html) and [Modifier Volumes](https://docs.unity3d.com/Packages/com.unity.ai.navigation@1.1/manual/NavMeshModifierVolume.html) provide more granular control over the system.
* Area costs are now properly exported into the world data and restored when joining a world.

## Limitations in VRChat

Some of the features of AI Navigation cannot be used in the VRChat client or are not currently useful:

### Custom Agent Types

[Unity lets you declare different types of agents](https://docs.unity3d.com/Packages/com.unity.ai.navigation@1.1/manual/NavMeshAgent.html), which can have different values for Radius, Height, Step Height, Max Slope, and more. This info is bundled into the world data, but VRChat does not currently have a method for retrieving and applying custom agent types. This feature is being considered, but you need to use the default agent type for now.

### Various Methods and Properties

* `NavMeshLink.agentTypeID` - runtime baking does not work for custom agents, so this is not very useful.
* `NavMeshSurface.CollectObjects` - Enum arrays are not available in Udon.
* `NavMeshSurface.agentTypeID` - runtime baking will not work with custom agents, so this is not useful.
* `NavMeshSurface.UpdateNavMesh()` - returns an AsyncOperation, which is not usable. The method itself should still work.
