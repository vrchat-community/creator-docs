# Constraints

VRChat provides its own custom constraints system, which allows bones on your avatar to move, rotate, and scale relative to other bones.

This is intended to be a like-for-like replacement of Unity's constraints system, with a few additional features based on how VRChat avatars typically use constraints. If you've never used constraints before, you may find it useful to refer to [Unity's documentation for constraints](https://docs.unity3d.com/Manual/Constraints.html).

You should use VRChat's constraints instead of Unity's when creating avatars. If your avatar contains any Unity constraints, they will be automatically converted into VRChat constraints when your avatar is loaded in-game, so using VRChat constraints directly will give you a more accurate representation of how your avatar will behave as well as a more accurate performance rank.

## Constraint Types

VRChat currently provides the following constraint types, which are designed to work in the same way as Unity's six built-in constraints:
- [**VRCAimConstraint**](/avatars/avatar-dynamics/constraints/vrc-aim-constraint) - Rotates the target transform so it aims towards the sources. You can customize which direction is treated as forwards.
- [**VRCLookAtConstraint**](/avatars/avatar-dynamics/constraints/vrc-look-at-constraint) - A simplified Aim Constraint that rotates the target transform to keep its positive Z axis facing towards the sources.
- [**VRCParentConstraint**](/avatars/avatar-dynamics/constraints/vrc-parent-constraint) - Moves and rotates the target transform as if it were a child of its sources.
- [**VRCPositionConstraint**](/avatars/avatar-dynamics/constraints/vrc-position-constraint) - Changes the position of the target transform to match the positions of its sources.
- [**VRCRotationConstraint**](/avatars/avatar-dynamics/constraints/vrc-rotation-constraint) - Changes the rotation of the target transform to match the rotations of its sources.
- [**VRCScaleConstraint**](/avatars/avatar-dynamics/constraints/vrc-scale-constraint) - Changes the scale of the target transform to match the scales of its sources.

Visit the links above for more information about the settings available for each constraint type.

## Advanced Constraint Settings

The Advanced Settings foldout contains some additional functions provided by VRChat constraints.

### Target Transform

The `Target Transform` setting allows you to change the transform targeted by this constraint. By default, this setting is empty, and the constraint is applied to the transform that the constraint component is attached to. Note that changing this transform with an animation is not possible.

This may be useful if you'd like to keep all of the constraint components on your avatar in one place, or if you're setting up a system that uses constraints and you want it to be transferrable between different avatars.

### Solve In Local Space

Normally, a constraint is solved in world space, which means it will match the **world** position/rotation/scale of its sources. If the `Solve In Local Space` option is enabled, the constraint will match the **local** position/rotation/scale of its sources instead.

This can be useful in situations such as setting up additional fake limbs for avatars. You might, for example, have a chain of locally solved rotation constraints that refer to each bone of the avatar's real arm, which would then cause that chain to rotate around as the real arm does. This isn't limited to rotation constraints, however - all types can use local solving.

The video below illustrates the difference between globally and locally solved rotation constraints as an example. In this clip, the middle and right arrows each use rotation constraints to match the rotation of the left arrow, where the middle arrow uses world space solving and the right arrow uses local space solving. Notice how the world solved constraint always matches the rotation of the target in world space. In contrast, the locally solved constraint always matches the direction the target is facing relative to its parent bone.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/6iBJ5QntrMU?si=YxAkg17x3LvinnL_" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

### Freeze To World

When `Freeze To World` is enabled, the constraint ignores all of its sources and locks its target transform in world space. The transform's position/rotation/scale will stay the same until `Freeze To World` is disabled.

This setting works best when animated on and off. For example:

 1. Set up an [expressions toggle](/avatars/expression-menu-and-controls/#types-of-controls) for `Freeze To World` and disable it by default.
 2. When `Freeze To World` is enabled in your Animation Clip, the transform is locked in world space.
 3. When `Freeze To World` is disabled in your Animation Clip, the transform follows the constraint's sources again.

This allows avatars to drop an object at a fixed position in the world. When you walk away, the object won't follow your avatar. Parent constraints are most suitable for this because they can freeze both the position _and_ rotation of the target transform. However, `Freeze To World` is also available for all the other constraint types.

The `Freeze To World` property only affects axes that are selected as frozen in the Constraint Settings section. You must freeze all axes if you want to stop the object in place completely. Otherwise, those axes will not be updated and the transform will not remain locked in world space.

:::note

Enabling `Freeze To World` is not the same as disabling the constraint component!

- When the constraint is disabled, the affected transform stops moving in **local** space. It still follows your avatar movement.
- When you enable `Freeze To World`, the constraint actively moves the transform in local space to prevent it from moving in **world** space.

:::

#### Rebake Offsets When Unfrozen

When `Rebake Offsets When Unfrozen` is enabled, the constraint will recalculate its offset relative to its sources when it is unfrozen by having `Freeze To World` disabled, instead of the usual behavior of keeping its original offset.

Toggling this value itself has no effect - it just determines what should happen when `Freeze To World` is disabled.

## Performance

There are two performance categories related to constraints. Refer to the [Performance Ranks](/avatars/avatar-performance-ranking-system#avatar-performance-ranks---value-maximums-per-rank) page for the limits applied to each platform.

### Constraint Count

The constraint count is fairly straightforward - it's the total number of constraints attached to your avatar, including disabled constraints. This includes both VRChat constraints and Unity constraints. Unity constraints are automatically converted into VRChat constraints when your avatar is loaded in-game.

Decreasing the total number of constraints can improve your avatar's performance.

### Constraint Depth

When you set up a chain of constraints on your avatar (for example, a chain of rotation constraints along an extra limb), those constraints need to be evaluated one at a time in a specific order, running from the constraint at the base of the chain up to the constraint at the tip. If the chain has 3 constraints along it, then that means the chain has a constraint depth of 3. The avatar's overall constraint depth rating is the longest chain of dependencies across the entire avatar.

Constraint depth can be lowered by reducing the length of the longest chain of constraints. Keep in mind that this category searches for the *longest* chain rather than the sum of all chains - if your avatar has several arms that all have a depth of 3, the overall score for the avatar would still be 3 (assuming there are no longer chains anywhere else on the avatar).

Constraint depth is important because it gives a better estimate of how the constraints on an avatar will perform than just counting how many constraints there are in total. By organizing constraints to minimize the dependencies between them, many of them will be able to run at the same time, which results in better performance compared to situations where the constraints must run one after another.

:::info[Constraint Depth with Unity Constraints]

The constraint depth of an avatar can only be accurately calculated when it uses VRChat constraints exclusively.

If your avatar contains any Unity constraints, the constraint depth is likely to be over-estimated, as the category assumes that Unity constraints can only run one at a time. You can convert all of the Unity constraints on your avatar into equivalent VRChat constraints by using the relevant Auto Fix option in the control panel in the SDK.

:::

## Usage Tips

- If your constraint doesn't seem to work, make sure it's actually running.
	- The `Is Active` option should be enabled.
	- The component itself should be enabled (the tick-box next to its name) and should be attached to an active game object on your avatar.
	- Make sure the `Lock` option is enabled. Otherwise, the constraint will re-evaluate its `At Rest` and `Offset` values instead of affecting the transform.
- The `Target Transform` reference cannot be changed by animations. This is because changing the transform targeted by the constraint would require recalculating the avatar's performance rank. If you want to change the targeted transform of a constraint, you could instead try toggling between several different constraint components each with a different target transform.
- If you can avoid it, don't use animations to change which transforms are referenced by your constraints. Animating a transform reference can cause performance issues for your avatar, as the constraints may need to be re-evaluated each time the references change.
    - This specifically refers to animating a constraint's _reference_ to a transform - animating the transform's position, rotation and scale is okay!
	- It isn't possible to animate transform references for individual sources due to technical limitations. As a simpler alternative to this, you can set up several sources with different transforms and animate their weights instead.

## Editor Tooling Info

If you're an advanced Unity user, you can write your own custom editor tooling in C# that interacts with the constraints converter.

These utilities are only briefly summarized here. Please see the inline documentation for them for full descriptions of how they work.

### Conversion Methods

The SDK class `AvatarDynamicsSetup` contains the conversion methods that the SDK uses to translate Unity constraints into equivalent VRChat constraints. The following constraint conversion methods are exposed for user tooling:
| Method | Description |
|---|---|
| `ConvertUnityConstraintsAcrossGameObjects(List<GameObject> targetGameObjects)` | Converts Unity constraints on a list of GameObjects into VRChat constraints. |
| `ConvertUnityConstraintsAcrossAnimationClips(List<AnimationClip> targetAnimationClips)` | Modifies a list of AnimationClips so any tracks in them targeting Unity constraints are updated to target VRChat constraints instead. |
| `DoConvertUnityConstraints(IConstraint[] unityConstraints, VRCAvatarDescriptor avatarDescriptor, bool convertReferencedAnimationClips)` | Converts an array of Unity constraints into VRChat constraints, optionally including any referenced animation clips. This runs immediately with no confirmation dialog. |
| `RebindConstraintAnimationClip(AnimationClip clip, IConstraint oldConstraint)` | Attempts to modify a single animation clip to retarget tracks from Unity constraints to VRChat constraints, optionally limiting conversions to the given Unity constraint. |
| `TryGetSubstituteAnimationBinding(Type unityConstraintType, string unityConstraintPropertyName, out Type vrcConstraintType, out string vrcConstraintPropertyName, out bool isArrayProperty)` | Attempts to translate a Unity constraint property name and type into an equivalent VRChat constraint property name and type. |

### Delegate Functions

To complement the above methods, the class `AvatarDynamicsSetup` also provides delegates that allow your tooling to control how the converter behaves. The following delegates are available:
| Delegate | Description |
|---|---|
| `bool IsUnityConstraintAutoConverted(IConstraint constraint)` | Given a Unity constraint, return `true` if this constraint will be converted into a VRChat constraint at build time by user tooling. You can use this to suppress the validation warning normally generated by the SDK prompting the user to convert their Unity constraints to VRChat constraints. |
| `bool ConvertUnityConstraintsAcrossGameObjects(List<GameObject> gameObjects, bool isAutoFix)` | Given a list of GameObjects, convert all of the constraints and underlying animation clips on them into VRChat constraints. The `isAutoFix` parameter is set to `true` if this was triggered by the user clicking auto-fix in the validations list, or `false` if it was triggered by a menu entry or a custom user script. Return `true` to prevent the native SDK converter from running. |
| `bool ConvertUnityConstraintsAcrossAnimationClips(List<AnimationClip> animationClips)` | Given a list of animation clips, update all tracks referencing Unity constraints to reference VRChat constraints instead. Return `true` to prevent the native SDK converter from running. |
