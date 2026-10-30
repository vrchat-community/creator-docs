---
sidebar_position: 7
---
# Constraints API

This page describes the application programmer's interface for VRChat Constraints. It contains the public facing properties and methods that can be used from Udon for world development and C# for SDK tool development.

## Requirements

Before using this API, you should already understand [the basic concepts of VRChat Constraints](/common-components/constraints).

You should avoid using properties or methods that are not documented on this page, because they might be removed from the public interface at any time.

## Constraint Types

The API provides the following user-facing types for VRChat Constraints, all in the namespace `VRC.SDK3.Dynamics.Constraint.Components`:

- [**VRCAimConstraint**](/common-components/constraints/vrc-aim-constraint)
- [**VRCLookAtConstraint**](/common-components/constraints/vrc-look-at-constraint)
- [**VRCParentConstraint**](/common-components/constraints/vrc-parent-constraint)
- [**VRCPositionConstraint**](/common-components/constraints/vrc-position-constraint)
- [**VRCRotationConstraint**](/common-components/constraints/vrc-rotation-constraint)
- [**VRCScaleConstraint**](/common-components/constraints/vrc-scale-constraint)

There are also these supporting types in the namespace `VRC.Dynamics`:
- **VRCConstraintSource** - A single constraint source, containing a `SourceTransform` and a `Weight`
- **VRCConstraintSourceKeyableList** - A list of sources used by a constraint.

## Constraint Properties and Methods

### Generic Properties and Methods

All VRChat Constraints expose the properties listed below. Note that while these are fundamentally the same as the properties available to [Unity constraints](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/Animations.IConstraint.html), the two interfaces are not identical and have some structural differences that support how the VRChat client operates.

#### ApplyConfigurationChanges()

This method applies any changes made to the constraint via scripting. **You must call this after modifying the properties of a constraint via a script!** Otherwise, your changes may not be applied back to the constraint.

If you need to change several properties at the same time, aim to only call this method once after all of your changes, to minimise the performance impact.

#### IsActive

- `bool`: `true` if the constraint is currently being evaluated, otherwise `false`.

Functionally identical to Unity's [constraintActive](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/Animations.IConstraint-constraintActive.html) property.

#### GlobalWeight

- `float`: The global weight for this constraint, applied on top of all of its sources (which also have their own individual weights).

Functionally identical to Unity's [weight](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/Animations.IConstraint-weight.html) property.

#### Locked

- `bool`: `true` if the constraint is currently locked, `false` if it is unlocked.

Functionally identical to Unity's [locked](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/Animations.IConstraint-locked.html) property.

Constraints are always treated as locked in play mode.

#### Source Access

The series of methods listed below can be used to access and modify the sources belonging to a constraint via Udon.

As an example, the following code sample randomizes the weights of every source assigned to a particular constraint by getting each source, changing its weight, and then setting the source in the constraint again:

```csharp
for (int i = 0; i < constraint.SourceCount; i++)
{
    VRCConstraintSource source = constraint.GetSource(i);
    source.Weight = UnityEngine.Random.value;
    constraint.SetSource(i, source);
}
```

You can programatically add sources to a constraint with the `AddSource()` method:

```csharp
// Create a new constraint source targeting this transform with a weight of one.
VRCConstraintSource source = new VRCConstraintSource(transform, 1.0f);

// Add this source to a constraint.
constraint.AddSource(source);
```

To remove sources, use the `RemoveSource()` method. You can either pass in the specific source you want to remove, or remove a particular source by index.

```csharp
// Remove a specific source, with a return value telling us if it was removed...
bool removed = constraint.RemoveSource(source);

// ...Or remove a source at a particular index i.
int i = 0;
constraint.RemoveSource(i);
```

:::warning

While the raw `Sources` list itself is also available to Udon, **VRChat strongly recommends you use the methods listed below instead.** This is because Udon can have issues applying changes when modifying the list directly (since it's a `struct` type). It is exposed to Udon for backward compatibility reasons only.

The `Sources` list is safe to use in animation clips and non-Udon projects such as SDK tooling written in C#.

Additionally, the sources list has a special limitation where only the first sixteen elements of it can be targeted by animators. This is due to the nature of how the Unity engine handles animating elements of an array and the need to keep compatibility with certain user made animation tooling. You should keep this limitation in mind if you're planning to write tooling for the SDK that adds more than sixteen sources to a single constraint.

:::

##### SourceCount

The number of sources the constraint currently has.

##### AddSource()

- `source`: The source to add to the sources list.

Adds a new source to the list of sources. The new source will be added at the end.

##### RemoveSource()

- `index`: The index of the source to remove.
- `source`: The source to remove.

Remove a source from the list of sources either by index or by a particular source. If a specific source is passed in, the method returns true if a matching source in the list was found and removed.

##### GetSource()

- `index`: The index of the source to get.

Get a source by its index.

Logs an error and returns an empty source if the index is out of source list's bounds. Indexing starts from 0, so the first source will be at index 0, the second will be at index 1, and so on.

To safely access a source, make sure the index is in bounds first. For example:

```csharp
if (index >= 0 && index < constraint.SourceCount)
{
    constraint.GetSource(index);
}
else
{
    // No source available at this index...
}
```

##### SetSource()

- `index`: The index of the source to be replaced.
- `source`: The source to set at this index.

Sets a source in the list to the one given by overwriting what was previously there.

Logs an error and returns an empty source if the index is out of source list's bounds. Indexing starts from 0, so the first source will be at index 0, the second will be at index 1, and so on.

To set a source safely, make sure the index is in bounds first. For example:

```csharp
if (index >= 0 && index < constraint.SourceCount)
{
    constraint.SetSource(index, source);
}
else
{
    // No source available at this index...
}
```

##### GetSources()

- `sources`: An array of sources to be updated by this method.

Gets the constraint's full list of sources by placing them in the array you provide.

The method will update the sources array to contain the sources assigned to the constraint, beginning from the start of the array. If the array is too small to contain all of the sources, it will copy over as many as it can until it runs out of space. This method returns the number of sources that were actually copied over.

Here's an example of how you might use this to get the sources in a constraint:

```csharp
// Construct an array with enough space to hold all of the sources in the constraint.
VRCConstraintSource[] mySources = new VRCConstraintSource[constraint.SourceCount];

// Use this to get the sources from the constraint.
int count = constraint.GetSources(mySources);

// Iterate over the array and do something with each source.
for (int i = 0; i < count; i++)
{
    VRCConstraintSource source = mySources[i];
    // ...
}
```

##### SetSources()

- `sources`: The array of sources to set.

Updates this constraint's sources list to exactly match the array you provide. All existing sources will be replaced.

If the provided sources array is null or empty, this is equivalent to clearing the sources list.

##### ClearSources()

Clears the sources list so the constraint no longer has any sources.

#### TargetTransform

- `Transform`: The transform that's affected by the result of this constraint component.

When set to `null`, the constraint applies its result to the transform it's attached to instead.

#### SmoothingFactor

- `float`: The amount of smoothing the constraint applies, where `0` means no smoothing.

The higher the smoothing factor, the longer the motion takes. The constraint will move approximately 63% of the way to its target every `SmoothingFactor` seconds.

Smoothing is applied to the constraint's result every frame based on this formula, where `deltaTime` is the amount of time since the previous frame: `result = lerp(current, target, 1 - exp(-deltaTime / smoothingFactor))`

#### SolveInLocalSpace

- `bool`: `true` if this constraint is solved in local space, `false` if it's solved in world space.

Unity constraints always solve in world space.

#### FreezeToWorld

- `bool`: `true` if this constraint is currently attempting to stay at a fixed position/rotation/scale in world space, otherwise `false`.

The constraint captures its current pose at the time this property switches from `false` to `true` and attempts to stay there until it next switches back to `false`.

#### RebakeOffsetsWhenUnfrozen

- `bool`: `true` if the constraint should recalculate its offsets from its sources when it becomes unfrozen, `false` if it should keep its original offsets.

This is a sub-property of `FreezeToWorld` that controls how this constraint behaves when it becomes unfrozen (that is, as `FreezeToWorld` switches from `true` to `false`).

#### ActivateConstraint()

Calling this method on a constraint activates and locks it while maintaining its current offsets. Equivalent to pressing the Activate button in the inspector for a constraint in the editor.

#### ZeroConstraint()

Calling this method on a constraint activates and locks it while resetting its offsets to their default values. Equivalent to pressing the Zero button in the inspector for a constraint in the editor.

### At-Rest and Offset Values

Each type of constraint affects a transform in its own way, so each one has its own at-rest and offset values that can be accessed via the appropriately named properties. For example, position constraints have `PositionAtRest` and `PositionOffset`, each representing a distance from its sources, while rotation constraints have `RotationAtRest` and `RotationOffset`, each representing a set of Euler angles.

Parent constraints are special because they have one offset value for every source rather than just one offset affecting the whole constraint. To change the offsets applied to a parent constraint, access its sources via the `Sources` list and then modify the `ParentPositionOffset` and `ParentRotationOffset` properties in them.

### Aim Constraint Alignment

These are properties specific to VRChat aim constraints that control how they align themselves towards their target.

#### AimAxis

- `Vector3`: The axes that should face towards the sources.

This effectively defines which way should be treated as forwards.

#### UpAxis

- `Vector3`: The axes treated as upwards by this constraint.

The constraint tries to align this direction with the direction of up as specified by `WorldUp` described below.

#### WorldUpTransform

- `Transform`: A transform used to determine the upwards vector of the constraint. 

This is only used with certain values of `WorldUp` as described below.

#### WorldUpVector

- `Vector3`: A direction used to determine the upwards vector of the constraint.

This is only used with certain values of `WorldUp` as described below.

#### WorldUp

This is an enum type that determines which direction is treated as upwards for this aim constraint. The options are as follows:

- `WorldUpType.SceneUp`: Treat upwards as the positive Y axis of the scene (`Vector3.up`).
- `WorldUpType.ObjectUp`: Treat upwards as the vector pointing from the target transform of the constraint to the transform specified in the property `WorldUpTransform`.
- `WorldUpType.ObjectRotationUp`: Treat upwards as the `WorldUpVector` axis in the local space of the transform specified in `WorldUpTransform`.
- `WorldUpType.Vector`: Treat upwards as `WorldUpVector` in world space.
- `WorldUpType.None`: Do not define an upwards direction.

`WorldUp` is of type `VRCConstraintBase.WorldUpType`, which is an enum in the namespace `VRC.Dynamics`.

### Look-At Constraint Alignment

Similarly to aim constraints, look-at constraints have some properties controlling how they align themselves towards their target. Look-at constraints are effectively simplified aim constraints.

#### Roll

- `float`: Defines the angle (in degrees) around the constraint's Z axis that should be used to determine its upwards direction.

This property only has an effect when `UseUpTransform` is false.

#### WorldUpTransform

- `Transform`: A transform to roll the constraint towards.

This property only has an effect when `UseUpTransform` is true.

#### UseUpTransform

- `bool`: `false` if the constraint is using the value of `Roll` to determine how the constraint tilts; `true` when it's rolling to try and point its positive Y axis towards the transform specified by `WorldUpTransform`.

## Constraint Conversion Hooks

:::info

This section is only relevant to users that want to change how Unity Constraints are converted into VRChat Constraints on avatars.

The functionality described in this section does not apply to Udon scripting.

:::

The constraint converter runs when the SDK converts Unity constraints into VRChat constraints automatically. You can write your own C# custom editor tooling that interacts with the SDK's constraint converter.

Please view the inline documentation of the utilities for full documentation, as this section only provides a brief summary.

### Conversion Methods

The SDK class `AvatarDynamicsSetup` contains the conversion methods that the SDK uses to translate Unity constraints into equivalent VRChat constraints. The following constraint conversion methods are exposed for user tooling:

| Method                                                                                                                                                                                       | Description                                                                                                                                                                |
|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `ConvertUnityConstraintsAcrossGameObjects(List<GameObject> targetGameObjects)`                                                                                                               | Converts Unity constraints on a list of GameObjects into VRChat constraints.                                                                                               |
| `ConvertUnityConstraintsAcrossAnimationClips(List<AnimationClip> targetAnimationClips)`                                                                                                      | Modifies a list of AnimationClips so any tracks in them targeting Unity constraints are updated to target VRChat constraints instead.                                      |
| `DoConvertUnityConstraints(IConstraint[] unityConstraints, VRCAvatarDescriptor avatarDescriptor, bool convertReferencedAnimationClips)`                                                      | Converts an array of Unity constraints into VRChat constraints, optionally including any referenced animation clips. This runs immediately with no confirmation dialog.    |
| `RebindConstraintAnimationClip(AnimationClip clip, IConstraint oldConstraint)`                                                                                                               | Attempts to modify a single animation clip to retarget tracks from Unity constraints to VRChat constraints, optionally limiting conversions to the given Unity constraint. |
| `TryGetSubstituteAnimationBinding(Type unityConstraintType, string unityConstraintPropertyName, out Type vrcConstraintType, out string vrcConstraintPropertyName, out bool isArrayProperty)` | Attempts to translate a Unity constraint property name and type into an equivalent VRChat constraint property name and type.                                               |

### Conversion Delegates

To complement the above methods, the class `AvatarDynamicsSetup` also provides delegate functions that allow your tooling to control how the converter behaves. The following delegates are available:

| Delegate                                                                                      | Description                                                                                                                                                                                                                                                                                                                                                                                 |
|-----------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `bool IsUnityConstraintAutoConverted(IConstraint constraint)`                                 | Given a Unity constraint, return `true` if this constraint will be converted into a VRChat constraint at build time by user tooling. You can use this to suppress the validation warning normally generated by the SDK, prompting the user to convert their Unity constraints to VRChat constraints.                                                                                        |
| `bool ConvertUnityConstraintsAcrossGameObjects(List<GameObject> gameObjects, bool isAutoFix)` | Given a list of GameObjects, convert all of the constraints and underlying animation clips on them into VRChat constraints. The `isAutoFix` parameter is set to `true` if this was triggered by the user clicking auto-fix in the validations list, or `false` if it was triggered by a menu entry or a custom user script. Return `true` to prevent the native SDK converter from running. |
| `bool ConvertUnityConstraintsAcrossAnimationClips(List<AnimationClip> animationClips)`        | Given a list of animation clips, update all tracks referencing Unity constraints to reference VRChat constraints instead. Return `true` to prevent the native SDK converter from running.                                                                                                                                                                                                   |
