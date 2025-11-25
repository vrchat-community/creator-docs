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

There are also these supporting classes in the namespace `VRC.Dynamics`:
- **VRCConstraintSource** - A single constraint source, containing a `SourceTransform` and a `Weight`
- **VRCConstraintSourceKeyableList** - A list of sources used by a constraint.

## Constraint Properties and Methods

### Generic Properties and Methods

All VRChat Constraints expose the properties listed below. Note that while these are fundamentally the same as the properties available to [Unity constraints](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/Animations.IConstraint.html), the two interfaces are not identical and have some structural differences that support how the VRChat client operates.

#### ApplyModifiedChanges()

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

#### Sources

- `VRCConstraintSourceKeyableList`: The list of sources belonging to this constraint.

As an example, the following code sample randomizes the weights of every source assigned to a particular constraint by iterating over each source, changing its weight, and then assigning it back to the list again:

```csharp
for (int i = 0; i < constraint.Sources.Count; i++)
{
    VRCConstraintSource source = constraint.Sources[i];
    source.Weight = UnityEngine.Random.value;
    constraint.Sources[i] = source;
}
```

You can programatically add sources to a constraint by getting the sources list and calling `Add()` on it:

```csharp
// Create a new constraint source targeting this transform with a weight of one.
VRCConstraintSource source = new VRCConstraintSource(transform, 1.0f);

// Add this source to a constraint.
constraint.Sources.Add(source);
```

To remove sources, you can either use `Remove()` with the same source struct as when you added it, or find a particular existing source by index and use `RemoveAt()`.

```csharp
// Remove a specific source...
constraint.Sources.Remove(source);

// ...Or remove a source at a particular index i.
constraint.Sources.RemoveAt(i);
```

:::warning

The sources list has a special limitation where only the first sixteen elements of it can be targeted by animators on avatars. This is due to the nature of how the Unity engine handles animating elements of an array and the need to keep compatibility with certain user made animation tooling. You should keep this limitation in mind if you're planning to write tooling for the Avatars SDK that adds more than sixteen sources to a single constraint.

:::

#### TargetTransform

- `Transform`: The transform that's affected by the result of this constraint component.

When set to `null`, the constraint applies its result to the transform it's attached to instead.

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