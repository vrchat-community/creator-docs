---
slug: vrc_headchop
---
# VRC Head Chop

When wearing an avatar, VRChat automatically "chops off" the avatar's head bone by setting its transform scale to almost 0. This stops the head from clipping into view from the user's first-person perspective. `VRCHeadChop` is an optional avatar component that controls which specific bones are scaled down for head chopping, allowing avatar creators to:
- Keep some parts of the avatar's head visible from first-person, like its hair or nose.
- Hide parts of the avatar from first-person that aren't part of the head, such as a hood.

`VRCHeadChop` only affects how the avatar appears from the perspective of the user wearing it. It doesn't affect what the avatar looks like in mirrors or to other players.

## Component properties
![vrcheadchop-618b6e18-2024-02-06_11-48-10_Unity.png](/img/avatars/vrcheadchop-f0de7579-2024-03-15_19-46-28_Unity.png)

| Property |  | Description |
| ---- | ---- | ---- |
| **Target Bones** |  | A list of up to 32 bones to control with this component. Each bone can be configured individually: |
|  | *Transform* | A bone transform. |
|  | *Scale Factor* | Sets the scale to apply to this bone.<br/>If the scale factor is 0, the bone will be completely hidden.<br/>If the scale factor is 1, the bone will be fully visible. (Default) |
|  | *Apply Condition* | Controls under which conditions the scaling should be applied to the transform. <br/>- Always apply (Default)<br/>- VR only<br/>- Non-VR only |
| **Global Scale Factor** |  | Multiplies the scale factor of each target bone. You can generally leave this set to 1 unless you want to scale all of the bones at once.<br/>If the global scale factor is 1, each target bone will use its individual scale factor. (Default)<br/>If the global scale factor is 0, all target bones will have a scale factor of 0. |

:::info Usage tips

- Changing the `VRCHeadChop` settings for a parent bone affects all child bones, too.
- If a child bone has its own `VRCHeadChop` settings, it overrides its parent bone's settings.
- There can be a maximum of 16 `VRCHeadChop` components attached to your avatar. If you exceed this limit, the avatars SDK will display an error.
- The "Lock Hip" [lock type](https://docs.vrchat.com/docs/ik-20-features-and-options#lock-types) may cause your avatar's head to block your view if you use `VRCHeadChop`.

:::

## Basic use

The most common way to use `VRCHeadChop` is to keep your avatar's hair visible. On most avatars, hair bones are children of the avatar's head bone.

1. Add the bones you want to be visible to the "Target Bones" list.
2. Set their scale factor to 1.
3. (Optional) Set "Apply condition" to "VR Only" if you don't want these bones to be visible for non-VR players.

This causes the hair bones to be fully visible from your first-person perspective. The rest of the head and all other child bones are kept hidden.

For example, the sample Avatar Dynamics robot included with the SDK has hair and a pair of animal ears. We can keep those parts of the head visible from first-person while hiding the rest of the head by using the following setup. In this example, we're also setting the apply conditions to "VR Only", so the extra parts only appear when playing in VR.

![vrcheadchop-618b6e18-2024-02-06_11-48-10_Unity.png](/img/avatars/vrcheadchop-example-setup-f0de7579-2024-03-15_19-52-11_Unity.png)

Notice that we don't need to list any of the child transforms of the bones we want to show (for example each individual hair strand) since they'll be shown along with the root bones anyway. It also doesn't matter which transform you add the `VRCHeadChop` component to - all that matters is the list of transforms that you set for it in the inspector.

This has the following result; the hair and ears have been scaled back up so they can be seen from first-person, while the eyes are still scaled away so they don't block your view.

![vrcheadchop-618b6e18-2024-02-06_11-48-10_Unity.png](/img/avatars/vrcheadchop-example-result-f0de7579-2024-03-15_20-12-17_Unity.png)

You can also set the enabled state of this component using an animator - if the component is disabled, it won't have any effect until it's enabled again. This can used to set up expression toggles that control whether certain parts of the avatar are visible in first-person or not. It's recommended that you do this so players using your avatars have the option of turning off first-person visible features if they want to. The global scale can be controlled with an animator if you want to give finer control over how much the bones get scaled away.

## Alternative uses

It's possible to directly change the scale of the head bone itself by including the head bone in the list. In this case, VRChat will no longer scale the head bone away for you automatically, and will instead use the scaling factor you provide for it. You can then shrink away bones that are children of the head that you *don't* want to see in first-person by setting their scale factors to 0. If you take this approach, you'll most likely want to shrink away the part of the face that the viewpoint is in so the wearer doesn't see the inside of the avatar's head.

One additional way of using this component is to hide things elsewhere on the avatar that shouldn't be visible from first-person. For example, if your avatar has a hood weighted to its head that isn't actually a child of the head bone, you could use this component to hide it in first-person by giving it a scale factor of 0.
