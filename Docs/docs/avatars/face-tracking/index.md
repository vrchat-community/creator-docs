# Face Tracking

The **Face Tracking** section of the VRC Avatar Descriptor maps facial expressions to blendshapes and animator parameters. It supports the [Unified Expressions standard from VRCFaceTracking (VRCFT)](https://docs.vrcft.io/docs/tutorial-avatars/tutorial-avatars-extras/unified-blendshapes), and integrates with VRChat's audio-driven visemes, eye look, and eyelids.

You can use face tracking to:

- Drive face tracking expressions across [multiple meshes](#face-tracking-meshes).
- Layer full or partial [Blendshapes Sets](#blendshapes-sets). For example, add a set that re-authors the whole face with a happier look, or a set that only changes the eyelids.
- Use an animator state behavior to [switch between or layer Blendshapes Sets](#changing-blendshapes-set-weights) while VRChat handles tracking and blendshape updates outside the animator.
- Use [Parameter Behaviors](#parameter-behaviors) to combine tracking inputs and apply the result to a blendshape, a Blendshapes Set's weight, or an avatar parameter.
- Forward calculated values to the animator to keep using animator-based techniques without syncing those parameters.

The same system also supports advanced viseme and automatic eye movement setups without requiring face tracking hardware.

## Getting started

The following is a simplified guide for setting up an avatar that has face tracking blendshapes already available on one or more of its meshes:

1. Select your avatar and open its **VRC Avatar Descriptor**.
2. Expand **Face Tracking** and click **Enable**.
3. Enable **Use All Tracking Keys** if the avatar supports face tracking from a webcam or OSC. Leave it unchecked for an avatar that only uses advanced visemes or automatic eye movement.
4. Use **Add Mesh** to assign the Skinned Mesh Renderers whose blendshapes you want to control. Face Tracking drives blendshapes with matching names equally on all meshes.
5. Configure [LipSync and Eye Look](#lipsync-and-eye-look) to route those features through Face Tracking as needed, so their mappings are available for **Auto-Fill Blendshapes**.
6. Expand **Blendshapes Sets**. The SDK names the initial Blendshapes Set `unnamed1` and gives it a **Default Weight** of `1`. You can rename it using **Blendshapes Set Name**.
7. Click **Auto-Fill Blendshapes** to map blendshapes with names that match common face tracking standards to Tracking Keys, then review the results.
   - To fine-tune a mapping, choose a different blendshape from a Tracking Key's **Blendshape** dropdown, or adjust its **Multiplier**.
   - Not every Tracking Key needs a blendshape, and several Tracking Keys can share the same blendshape. Tracking Keys follow the Unified Expressions standard, which serves as a superset of various face tracking standards, so most avatars only support a subset of them.
8. Use [Build & Test](/avatars/creating-your-first-avatar#step-6---going-to-the-build-tab--checking-if-the-avatar-is-ok) to try the avatar in VRChat with your tracking source.

You do not need custom synced parameters for basic face tracking. See [Networking and synced parameters](#networking-and-synced-parameters).

## LipSync and Eye Look

The Avatar Descriptor's **LipSync** and **Eye Look** settings determine how those features use Face Tracking. Enable the **Face Tracking** section and configure its mappings when selecting these modes.

### LipSync Mode

Set **LipSync > Mode** to **Viseme Blend Shape Face Tracking** to route audio-driven visemes through the Face Tracking system. Configure the viseme mappings in each Blendshapes Set.

This mode allows you to:

- Apply visemes to multiple meshes in the Face Tracking Meshes list.
- Adjust the **Blendshape** and **Multiplier** for each viseme in each Blendshapes Set.
- Balance audio-driven mouth movement with tracked mouth movement using [Viseme Dampen](#viseme-dampen).
- Forward individual viseme strengths to animator parameters through [Parameter Behaviors](#parameter-behaviors).

The `Viseme_*` inputs are individual float strengths from `0` to `1`. They are separate from the built-in [`Viseme` animator parameter](/avatars/animator-parameters#built-in-parameters), which identifies the current viseme.

### Eye Gaze Mode

Enable **Eye Look** and choose an **Eye Gaze Mode**:

| Mode | Behavior |
| --- | --- |
| Bone Rotation | Uses the configured eye bones and rotations. |
| Face Tracking | Uses eye direction mappings in the Face Tracking section. |
| Both | Uses bone rotation and Face Tracking eye direction mappings together. |

For example, use **Both** to rotate the eye bones while also driving blendshapes that adjust the surrounding face to match the gaze direction. Map the `EyeLook*` keys in your Blendshapes Sets for the blendshape-driven part of the setup.

Gaze follows eye tracking when available and uses simulated eye movement otherwise.

### Eyelids Type

Set **Eye Look > Eyelids Type** to **Face Tracking** to handle eyelid closing and opening through the Face Tracking section. Map `EyeClosedLeft` and `EyeClosedRight` to the appropriate eyelid blendshapes.

## Use All Tracking Keys

**Use All Tracking Keys** exposes the full set of Unified Expressions keys and identifies the avatar as supporting full face tracking in VRChat, including the Avatar Details UI page where it will add an icon indicating face tracking support.

Leave this unchecked if you only need advanced viseme or automatic eye movement features. With it unchecked, you can still use:

- Eye direction keys (`EyeLook*`).
- Blink keys (`EyeClosedLeft` and `EyeClosedRight`).
- The `Voice` input.
- Viseme mappings and `Viseme_*` inputs, when using **Viseme Blend Shape Face Tracking** lip sync.

For example, an avatar using multiple meshes for audio-driven visemes does not need to be marked as a full face tracking avatar.

## Face Tracking Meshes

Add each Skinned Mesh Renderer that should receive face tracking blendshape updates to **Face Tracking Meshes**. The inspector supports up to 16 meshes.

Face Tracking matches blendshapes by exact name. A tracking key mapping or Parameter Behavior that targets a blendshape applies to every mesh in this list that contains that name. Meshes without that blendshape are unaffected.

You do not need a mesh if you only use Parameter Behaviors to forward values to the animator.

## Viseme Dampen

**Viseme Dampen** balances audio-driven visemes with tracked mouth movement to help prevent the combined expressions from overdriving the face. It requires **Use All Tracking Keys** and **LipSync > Mode > Viseme Blend Shape Face Tracking**.

| Mode | Behavior |
| --- | --- |
| None | Applies no dampening. |
| Dampen Visemes | Strong mouth tracking activity reduces associated audio-driven viseme activity. |
| Dampen Tracking | Strong audio-driven viseme activity reduces associated mouth tracking strength. |

Use **Dampen Amount** (`0` to `1`) to adjust how strongly the selected mode reduces the other source. Test while speaking and making facial expressions to choose an amount that suits the avatar.

## Blendshapes Sets

A **Blendshapes Set** contains mappings from tracking keys and visemes to blendshape names. Create multiple Blendshapes Sets to map the same tracking input to different blendshapes or use different **Multiplier** values. A Blendshapes Set can contain mappings for the whole face or just part of it.

| Property | Purpose |
| --- | --- |
| Blendshapes Set Name | The name used by Parameter Behaviors and animator state behaviors to reference this Blendshapes Set. Give each Blendshapes Set a unique name. |
| Default Weight | The initial weight of the Blendshapes Set when the avatar loads, from `0` to `1`. A weight of `0` disables its mappings. |
| Tracking Key | The tracking key or viseme that drives the mapping. |
| Blendshape | The blendshape name driven by the Tracking Key, across all Face Tracking Meshes containing that name. |
| Multiplier | Scales the strength of an individual mapping. `1` uses the input's original strength. |

For example, copy a Blendshapes Set and increase its **Multiplier** values to exaggerate the tracked movements. A **Multiplier** of `10` amplifies small input movements, reaching full strength sooner. You can also create a Blendshapes Set containing only eyelid mappings and use it alongside a Blendshapes Set with mappings for the whole face.

### Layering Blendshapes Sets

Multiple Blendshapes Sets can be active at the same time. When tracking mappings in multiple Blendshapes Sets drive the same blendshape, the highest value wins. Face Tracking does not add the contributions together. Viseme mappings also use the strongest contribution across Blendshapes Sets.

For example, if two tracking mappings contribute `0.3` and `0.7` to the same blendshape, the result is `0.7`, not `1.0`. A Blendshapes Set containing only eyelid mappings does not replace unrelated mappings from other Blendshapes Sets. The Parameter Behavior targets [Limit Blendshape (Min) and Limit Blendshape (Max)](#targets) can constrain the final value.

### Changing Blendshapes Set weights

Use the [VRC Animator Face Tracking Blendshapes Set](/avatars/state-behaviors#animator-face-tracking-blendshapes-set) state behavior to change the weights of one or more Blendshapes Sets when entering an animator state. Enter the **Blendshapes Set Name** for each entry, then configure:

- **Type > Value** and **Apply Weight** for a constant weight.
- **Type > Parameter** and **Source Parameter** to read an animator parameter when the state is entered, with optional **Convert Range** remapping.
- A **Lerp Speed** for a smooth transition to the requested weight.

For example, create Blendshapes Sets named `Happy` and `Angry`. On entering a happy state, use **Apply Weight** to set the weight of `Happy` to `1` and `Angry` to `0`. Reverse those weights in the angry state. This lets the animator select the active Blendshapes Sets while Face Tracking samples tracking input and applies blendshapes.

To drive a Blendshapes Set's weight continuously from tracking data, it's best to use a Parameter Behavior with **Apply Blend Set Weight** instead of an animator state behavior. However if necessary, it's possible to trigger an animator state behavior repeatedly to update the weight continuously from the animator.

## Parameter Behaviors

**Parameter Behaviors** combine tracking inputs and apply the result to a target. They let you perform calculations without building equivalent animator layers or blend trees.

To configure a behavior:

1. Add an entry under **Parameter Behaviors**.
2. Choose a target mode and enter or select its target.
3. Choose a combine mode.
4. Add keys under **Input Tracking Keys**, or enter a calculation in **Expression** for **Custom** mode.

### Targets

| Target mode | Result |
| --- | --- |
| Forward to Animator | Applies the result to the named Avatar Parameter, which updates matching parameters in the animator. Use a Float parameter to preserve the calculated strength. |
| Apply Blend Set Weight | Uses the result as the weight of the named Blendshapes Set. "Blend Set" is an abbreviation for "Blendshapes Set" here. |
| Apply to Blendshape | Applies the result directly to the named blendshape on all matching Face Tracking Meshes. |
| Limit Blendshape (Min) | Sets a lower limit for the named blendshape's final value. |
| Limit Blendshape (Max) | Sets an upper limit for the named blendshape's final value. |

**Apply to Blendshape**, **Limit Blendshape (Min)**, and **Limit Blendshape (Max)** use normalized values: `0` to `1` corresponds to Unity blendshape weights of `0` to `100`.

For these targets, you can optionally assign a Blendshapes Set to the Parameter Behavior. The behavior then scales with that Blendshapes Set's weight, so you can adjust its strength or turn it off the same way you control Blendshapes Set weights. Leave the field empty to always apply the behavior at full strength.

Limits are useful for shapes that would clip when fully active together. For example, a **Limit Blendshape (Max)** behavior using `1 - JawOpen` can reduce a conflicting shape's allowed strength as the jaw opens.

### Combine modes

| Combine mode | Calculation |
| --- | --- |
| Max | Takes the largest input value. |
| Min | Takes the smallest input value. |
| Add | Adds the input values. |
| Multiply | Multiplies the input values. |
| Custom | Evaluates a math expression. |

For **Max**, **Min**, **Add**, and **Multiply**, each entry under **Input Tracking Keys** has an **Invert** option that replaces its value with `1 - value` before combining it. Their results are clamped to `0` to `1`.

For example, choose **Forward to Animator**, name the target `CheekPuff`, select **Max**, and add `CheekPuffLeft` and `CheekPuffRight`. The animator receives one value representing the stronger cheek puff.

### Custom expressions

In **Custom** mode, the **Expression** field accepts:

- [Unified Expressions tracking key names](/avatars/face-tracking/osc#tracking-key-order), such as `EyeClosedLeft` or `JawOpen`.
- `Voice`, the built-in voice volume input from `0` to `1`.
- Individual viseme inputs from `0` to `1`: `Viseme_sil`, `Viseme_pp`, `Viseme_ff`, `Viseme_th`, `Viseme_dd`, `Viseme_kk`, `Viseme_ch`, `Viseme_ss`, `Viseme_nn`, `Viseme_rr`, `Viseme_aa`, `Viseme_e`, `Viseme_ih`, `Viseme_oh`, and `Viseme_ou`.
- Numbers, parentheses, and the operators `+`, `-`, `*`, and `/`.
- The functions `abs(value)`, `min(a, b)`, `max(a, b)`, and `clamp(value, min, max)`.

Use the exact input names and capitalization shown above. Viseme inputs require **Viseme Blend Shape Face Tracking** lip sync. Hardware tracking keys require **Use All Tracking Keys**.

The following table shows example expressions:

| Expression | Result |
| --- | --- |
| `max(EyeClosedLeft, EyeClosedRight) * 0.5` | Half the strength of the more closed eye. |
| `max(CheekPuffLeft, CheekPuffRight)` | The stronger cheek puff. |
| `clamp(JawOpen * 2, 0, 1)` | Amplified jaw opening, limited to full strength. |
| `max(Voice, Viseme_aa)` | The larger of voice volume and the `aa` viseme strength. |
| `EyeClosedLeft - EyeClosedRight` | A signed difference between the two eyelids. |

With **Custom** and **Forward to Animator**, the result is clamped between `-1` and `1`. Results for **Apply Blend Set Weight**, **Apply to Blendshape**, **Limit Blendshape (Min)**, and **Limit Blendshape (Max)** are clamped between `0` and `1`.

#### Custom expression limits

VRChat limits the length and complexity of custom expressions to prevent abuse. These limits are separate from the [Face Tracking Operations performance ranking](#performance).

The following table lists the limits for custom expressions in terms of tokens, instructions, and general length in characters:

A **token** is a piece of expression syntax: an input name, number, operator, function name, parenthesis, or comma. Whitespace does not count as a token.

An **instruction** is a step used to evaluate a custom expression: reading an input, loading a numeric constant, or applying an operator or function. Parentheses and commas affect how the expression is parsed but do not add instructions. For example, `JawOpen * 2` uses three instructions: read `JawOpen`, load `2`, and multiply.

| Limit | Maximum |
| --- | --- |
| Expression length | 1024 characters per expression |
| Tokens | 256 per expression |
| Instructions before constant simplification | 256 per expression |
| Total instructions after constant simplification | 2048 across all custom expressions on the avatar |

VRChat simplifies calculations involving only constants before applying the shared 2048-instruction budget. For example, `JawOpen * (2 + 3)` simplifies to `JawOpen * 5`. The 256-instruction limit for an individual expression applies before this simplification.

If an expression exceeds a per-expression limit, VRChat ignores its Parameter Behavior. When loading the avatar, VRChat also skips any custom Parameter Behavior that would exceed the shared 2048-instruction budget. The SDK warns about expressions that may exceed these limits. Its instruction estimate is conservative and may report more instructions than VRChat uses, because it doesn't account for constant simplification.

## Networking and synced parameters

VRChat synchronizes the full set of Unified Expressions tracking data to remote viewers. Remote avatars run the same native mappings and Parameter Behaviors using the received data, including forwarding calculated values to their animators. **This does not consume your custom synced parameter budget.**

Like NetIK (networked body motion), face tracking synchronization can be lossy, with fidelity varying based on factors such as distance from the avatar. Nearby avatars receive higher-fidelity tracking. Conceptually, network degradation resembles less accurate tracking hardware. If an avatar is set up to be flexible across a range of tracking hardware quality, it would also be flexible across a range of network conditions.

If a particular value must avoid the face tracking system's dynamic lossy synchronization, forward it to an animator parameter and enable **Synced** for that parameter in the avatar's [Expression Parameters asset](/avatars/animator-parameters#expression-parameters-asset). That parameter uses the normal synced parameter budget and synchronization rules. Most face tracking setups do not need this.

## Detecting tracking availability

Use the built-in **Bool** animator parameters [`UserEyeTracking` and `UserFaceTracking`](/avatars/animator-parameters#eye-and-face-tracking-parameters) to choose animations based on the user's tracking availability. For example, use `UserFaceTracking` to select gesture-driven facial expressions when face tracking is unavailable.

External applications can read these values and check whether the avatar has **Use All Tracking Keys** enabled through the [OSC tracking status outputs](/avatars/face-tracking/osc#tracking-status-outputs).

## Tracking sources

### Selfie Expression

VRChat's **Selfie Expression** drives Unified Expressions using a webcam on desktop PC or the camera on Android phones and tablets. You can enable Selfie Expression in the "Camera Tracking" section of the "Tracking & IK" main menu settings page.

### OSC

External tracking applications can send Unified Expressions data to `/tracking/face/v1`. See [OSC Face Tracking](/avatars/face-tracking/osc) for the blob format and the complete tracking key order.

## Performance

Face tracking contributes two statistics to your avatar's [Performance Rank](/avatars/avatar-performance-ranking-system#face-tracking): **Face Tracking Operations** and **Forwarded Parameters**.

**Face Tracking Operations** estimates work across the Face Tracking system, including standard tracking and viseme blendshape mappings in Blendshapes Sets, inputs to non-custom Parameter Behaviors, and input references and operators or functions in custom expressions. Numeric constants do not count as performance operations.

Custom expressions also have separate [instruction limits](#custom-expression-limits) that don't affect your Performance Rank.

Use Blendshapes Sets and Parameter Behaviors to drive blendshapes directly, and use **Forward to Animator** only for the values your animator needs. Each blendshape mapping is counted for every mesh in **Face Tracking Meshes** containing the target shape, so adding meshes and duplicate Blendshapes Sets increases the operation count even when some Blendshapes Sets have a **Default Weight** of `0`.
