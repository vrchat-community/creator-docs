# Preview Mode

Preview Mode is an [animator parameter](/avatars/animator-parameters/) that indicates whether the user is currently previewing your avatar in the VRChat menu. Your Animator Controller can use this parameter to play a specific animation to make your avatar preview look more appealing.

## Usage

To set up a preview mode animation for your avatar, follow the steps below:

1. Open your existing Base (Locomotion) Animator Controller.
   - If you do not have a Base layer set up in your Avatar descriptor, you can copy the existing Animator Controller provided by VRChat. It is located under `Packages/VRChat SDK Avatars/Samples/AV3 Demo Assets/Animation/Controllers/vrc_AvatarV3LocomotionLayer`. Copy this animator controller into your assets and assign it to the `Base` slot of your Avatar Descriptor.

![Base Layer Sample](/img/avatars/preview-mode/preview-mode-sample-layer.png)

2. Create a new Animator parameter of type `Int` and name it `PreviewMode`.

![PreviewMode Parameter](/img/avatars/preview-mode/preview-mode-param.png)

3. Create an Animation Clip to house your preview animation, choose a name (e.g., `PreviewOn`), and drag it into the Animator Controller.
4. Set up a transition between the `Standing` locomotion blend tree (usually the Default state, marked in orange) to the `PreviewOn` state, and set the condition to "`PreviewMode` Equals 1". Uncheck the "Has Exit Time" checkbox.

![PreviewOn Transition](/img/avatars/preview-mode/preview-mode-transition-in.png)

5. Create another Transition in reverse from `PreviewOn` to `Standing` and set the condition to "`PreviewMode` equals 0". Uncheck the "Has Exit Time" checkbox.

![PreviewOff Transition](/img/avatars/preview-mode/preview-mode-transition-out.png)

6. The final setup should look something like this:

![PreviewMode Setup](/img/avatars/preview-mode/preview-mode-final-setup.png)

7. Now assign your Base Animator Controller to the `Controller` slot of your Avatar's Animator component, and set up the animation to your preference.

![Plug In Animator](/img/avatars/preview-mode/preview-mode-plug-in-animator.png)

:::caution
Please note that Material swapping animations do not work correctly when previewed in the menu. However, you can still do most other things like toggling objects, or adjusting BlendShapes.
:::

8. When you're done - you can Build & Test your avatar.

![Pose Sample](/img/avatars/preview-mode/preview-mode-final-pose.png)

9. When you preview your avatar in the "Other" section of the Avatars list - you should see it animate into the pose you set up in the `PreviewOn` Animation Clip.

![In Game View](/img/avatars/preview-mode/preview-mode-in-game-view.png)

You can use different kinds of animations for the preview mode, so feel free to experiment.
