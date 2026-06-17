---
sidebar_position: 3
---

# Settings and Control

This page covers how to control, configure, and query tweens after creation.

## Control Methods

Control tweens using instance methods on `VRCTweenHandle`:

| Method | Description |
|--------|-------------|
| `tweenHandle.Play()` | Resumes a paused tween. |
| `tweenHandle.Pause()` | Pauses a playing tween. Returns the handle for chaining. |
| `tweenHandle.Kill()` | Stops and removes a tween. |
| `tweenHandle.Complete()` | Instantly completes the tween and jumps to its end values. |
| `tweenHandle.Restart()` | Restarts the tween from the beginning. |
| `tweenHandle.Flip()` | Flips the playback direction. Does not start playing if paused. |
| `tweenHandle.PlayBackwards()` | Sets direction to backwards and plays. |
| `tweenHandle.PlayForwards()` | Sets direction to forwards and plays. |
| `tweenHandle.Goto(float to, bool andPlay)` | Seeks to a time position in seconds. If `andPlay` is true, plays after seeking; otherwise pauses. Useful for syncing tweens to network time. |
| `VRCTween.KillAll()` | Kills all active tweens. |
| `gameObject.KillAllTweens()` | Kills all tweens on a GameObject. |

## Query Properties

Query tween state using properties on `VRCTweenHandle`:

| Property | Type | Description |
|----------|------|-------------|
| `tweenHandle.IsValid` | bool | True if the handle refers to a tween (false for `default` handles). |
| `tweenHandle.IsPlaying` | bool | True if the tween is currently playing. |
| `tweenHandle.IsActive` | bool | True if the tween exists and hasn't been killed. |
| `tweenHandle.Elapsed` | float | The elapsed time in seconds. |
| `tweenHandle.Duration` | float | The total duration in seconds. |
| `tweenHandle.IsBackwards` | bool | True if the tween is currently playing backwards. |

## Tween Settings

Config methods return the handle for chaining. Most settings (`OnComplete`, `SetLoops`, `SetDelay`, `SetUpdate`, `From`, `SetSpeedBased`) should be applied **immediately after creating the tween**. Settings applied after the tween has started playing (i.e., after the current frame) may not take effect. However, `SetDuration`, `SetEase`, and `ChangeEndValue` can be called at any time on an active tween.

### OnComplete

Sets a callback that triggers when the tween completes. Returns the handle for chaining. The target callback method **must be public**.

```cs
// Use custom event names for different tweens.
door.TweenPosition(openPosition, 1f, VRCTweenEase.OutQuad)
    .OnComplete(this, nameof(OnDoorOpened));

window.TweenScale(Vector3.zero, 2f, VRCTweenEase.InQuad)
    .OnComplete(this, nameof(OnWindowClosed));

public void OnDoorOpened()
{
    Debug.Log("Door opened!");
}

public void OnWindowClosed()
{
    Debug.Log("Window closed!");
}
```

- **callback**: The UdonBehaviour to receive the callback (pass `this`).
- **eventName**: The name of the custom event to call. **Must be public.**

### OnRewind

Sets a callback that fires when the tween rewinds to its start position (reaches position 0 during backwards playback). Returns the handle for chaining. The target callback method **must be public**.

```cs
audioSource.TweenVolume(1f, 2f, VRCTweenEase.InSine)
    .OnRewind(this, nameof(OnFadeComplete));

public void OnFadeComplete()
{
    Debug.Log("Backwards playback reached start!");
}
```

- **callback**: The UdonBehaviour to receive the callback (pass `this`).
- **eventName**: The name of the custom event to call. **Must be public.**

:::note

`OnRewind` only fires when backwards playback reaches position 0. It does not fire on `Restart()`.

:::

### SetLoops

Sets the number of times a tween should loop. Returns the handle for chaining.

```cs
tweenHandle.SetLoops(5, VRCTweenLoopType.Restart);
```

- **loops**: Number of loops. Use `-1` for infinite loops.
- **loopType**: Loop behavior:
  - `VRCTweenLoopType.Restart` (0): Restarts from the beginning.
  - `VRCTweenLoopType.Yoyo` (1): Plays forward then backward.
  - `VRCTweenLoopType.Incremental` (2): Adds each loop to the previous end value.

### SetDelay

Sets a delay before the tween starts. Returns the handle for chaining. Negative, NaN, or Infinity values are silently ignored. See [Input validation](./index.md#input-validation).

```cs
tweenHandle.SetDelay(1.5f);
```

- **delay**: Delay in seconds.

### SetUpdate

Sets the update type for a tween. Returns the handle for chaining.

```cs
tweenHandle.SetUpdate(VRCTweenUpdateType.LateUpdate);
```

- **updateType**: When to update the tween:
  - `VRCTweenUpdateType.Update` (0): During Update.
  - `VRCTweenUpdateType.LateUpdate` (1): During LateUpdate.
  - `VRCTweenUpdateType.FixedUpdate` (2): During FixedUpdate.
  - `VRCTweenUpdateType.PostLateUpdate` (3): After all LateUpdate calls. Useful for overriding camera, IK, or other LateUpdate-driven transforms.

### From

Reverses the tween so it starts at the target value and animates to the object's current value. This is useful for "appear from" animations where an object animates into its placed position. Only works on non-virtual tweens (transform, UI, sprite, etc.). Must be called immediately after creation. Returns the handle for chaining.

```cs
public GameObject notification;

void Start()
{
    // Object is at its final position in the scene.
    // This tween starts it at (0, 10, 0) and animates TO the current position.
    notification.TweenPosition(new Vector3(0, 10, 0), 1f, VRCTweenEase.OutBounce)
        .From();
}
```

### SetSpeedBased

Sets the tween as speed-based. When enabled, the `duration` parameter becomes **units per second** instead of total seconds. This is useful when you want consistent movement speed regardless of distance. Returns the handle for chaining.

```cs
// Move at 5 units per second, regardless of distance
gameObject.TweenPosition(targetPos, 5f, VRCTweenEase.Linear)
    .SetSpeedBased();

// Walk along a path at 3 units per second
gameObject.TweenPath(waypoints, 3f, VRCTweenPathType.CatmullRom, false, 10, VRCTweenEase.Linear)
    .SetSpeedBased();
```

:::note

`SetSpeedBased` must be called immediately after creating the tween. It has no effect if applied after the tween has started playing.

:::

### SetEase

Overrides the tween's ease. You can pass either a `VRCTweenEase` preset or a custom `AnimationCurve`. For curves, the time axis (0 to 1) maps to the tween's progress, and the value axis maps to the interpolation factor. Returns the handle for chaining. Can be called on an active tween.

```cs
// Preset ease
tweenHandle.SetEase(VRCTweenEase.OutBounce);

// Custom curve
public AnimationCurve customEase;

void Start()
{
    gameObject.TweenPosition(new Vector3(0, 5, 0), 2f, VRCTweenEase.Linear)
        .SetEase(customEase);
}
```

- **easeType**: A `VRCTweenEase` value.
- **curve**: A Unity `AnimationCurve`. Edit it in the Inspector to shape the easing visually.

### SetDuration

Changes the duration of a tween in seconds. Returns the handle for chaining. Can be called on an active tween. Negative, NaN, or Infinity values are silently ignored. See [Input validation](./index.md#input-validation).

```cs
tweenHandle.SetDuration(3f);
```

- **duration**: New duration in seconds.

### ChangeEndValue

Changes the tween's target value. Returns the handle for chaining. Can be called on an active tween. Unsafe values (NaN, Infinity, or extreme magnitudes) are silently ignored. See [Input validation](./index.md#input-validation).

When `snapStartValue` is `true`, the start value snaps to the tween's current value. This is useful for reusing tweens so the animation starts from wherever the object is now, rather than jumping back to the original start position.

```cs
tweenHandle.ChangeEndValue(new Vector3(10, 0, 0), true);
```

- **newEndValue**: The new target value. Must match the tween's type (`Vector3` for position/rotation/scale, `float` for fades, `Color` for color tweens, `Vector2` for RectTransform tweens).
- **snapStartValue**: If `true`, the start value updates to the current value.

:::note

`ChangeEndValue` works with transform, UI, sprite, audio, and virtual float/int tweens. It is not supported for virtual Color/Vector3 tweens, renderer (MaterialPropertyBlock) tweens, light tweens, or path tweens.

:::

## Tween Reuse

For tweens that redirect frequently (e.g., every frame or in response to rapid input), reusing a handle avoids per-frame allocations. For one-shot animations triggered by interactions, creating fresh tweens is simpler and works well. DOTween pools internally, so the overhead is minimal.

```cs
VRCTweenHandle _moveHandle;

void Start()
{
    // Create the tween once with infinite loops so it stays alive after completing.
    _moveHandle = gameObject.TweenPosition(Vector3.zero, 1f, VRCTweenEase.OutQuad)
        .SetLoops(-1, VRCTweenLoopType.Restart)
        .Pause();
}

public void MoveTo(Vector3 target, float duration)
{
    // Reconfigure and restart without allocating.
    _moveHandle.ChangeEndValue(target, true)
        .SetDuration(duration)
        .SetEase(VRCTweenEase.OutCubic);
    _moveHandle.Restart();
}
```

## Direction Control

You can reverse a tween's playback direction mid-animation. Unlike killing and creating a new tween in the opposite direction, this preserves the easing curve. The animation smoothly changes direction without restarting the ease.

```cs
VRCTweenHandle _fadeHandle;

void Start()
{
    _fadeHandle = audioSource.TweenVolume(1f, 2f, VRCTweenEase.InSine)
        .OnRewind(this, nameof(OnFadeOut))
        .Pause();
}

public void OnZoneEnter()
{
    _fadeHandle.PlayForwards();
}

public void OnZoneExit()
{
    _fadeHandle.PlayBackwards();
}

public void OnFadeOut()
{
    // Backwards playback reached the start
}
```

- `Flip()` toggles direction but does not start playing. Call `Play()` separately if the tween is paused.
- `PlayBackwards()` and `PlayForwards()` both set direction **and** start playing.
- Tweens that play backwards to the start are **not** automatically killed. They stay alive so you can reverse direction again. Kill them manually in `OnDestroy` if needed.
- `OnRewind` only fires when backwards playback reaches position 0. It does not fire on `Restart()`.

## Seeking With Goto

Use `Goto` to jump a tween to a specific time position. This is particularly useful for syncing long-running tweens to network time so late joiners see the correct state.

```cs
[UdonSynced] float _tweenStartTime;
VRCTweenHandle _syncedTween;

void Start()
{
    _syncedTween = gameObject.TweenPosition(targetPos, 10f, VRCTweenEase.Linear)
        .SetLoops(-1, VRCTweenLoopType.Restart);
}

public override void OnDeserialization()
{
    float elapsed = (float)(Networking.GetServerTimeInSeconds() - _tweenStartTime);
    _syncedTween.Goto(elapsed, true);
}
```

The `andPlay` parameter controls whether the tween plays or pauses after seeking. Pass `true` to continue playback from the new position, or `false` to pause there.

## Path Types

| Path type | Description |
|-----------|-------------|
| `VRCTweenPathType.Linear` | Straight-line segments between waypoints. |
| `VRCTweenPathType.CatmullRom` | Smooth curved path using Catmull-Rom splines. |

## Ease Types

| Ease type | Description |
|-----------|-------------|
| `VRCTweenEase.Linear` | Constant speed. |
| `VRCTweenEase.InSine` | Sine wave - Smooth acceleration. |
| `VRCTweenEase.OutSine` | Sine wave - Smooth deceleration. |
| `VRCTweenEase.InOutSine` | Sine wave - Smooth in both directions. |
| `VRCTweenEase.InQuad` | Quadratic - Accelerates. |
| `VRCTweenEase.OutQuad` | Quadratic - Decelerates. |
| `VRCTweenEase.InOutQuad` | Quadratic - Accelerates then decelerates. |
| `VRCTweenEase.InCubic` | Cubic - Accelerates (more pronounced). |
| `VRCTweenEase.OutCubic` | Cubic - Decelerates (more pronounced). |
| `VRCTweenEase.InOutCubic` | Cubic - Accelerates then decelerates (more pronounced). |
| `VRCTweenEase.InQuart` | Quartic - Strong acceleration. |
| `VRCTweenEase.OutQuart` | Quartic - Strong deceleration. |
| `VRCTweenEase.InOutQuart` | Quartic - Strong acceleration then deceleration. |
| `VRCTweenEase.InQuint` | Quintic - Very strong acceleration. |
| `VRCTweenEase.OutQuint` | Quintic - Very strong deceleration. |
| `VRCTweenEase.InOutQuint` | Quintic - Very strong acceleration then deceleration. |
| `VRCTweenEase.InExpo` | Exponential - Explosive acceleration. |
| `VRCTweenEase.OutExpo` | Exponential - Explosive deceleration. |
| `VRCTweenEase.InOutExpo` | Exponential - Explosive acceleration then deceleration. |
| `VRCTweenEase.InCirc` | Circular - Smooth, rounded acceleration. |
| `VRCTweenEase.OutCirc` | Circular - Smooth, rounded deceleration. |
| `VRCTweenEase.InOutCirc` | Circular - Smooth, rounded in both directions. |
| `VRCTweenEase.InElastic` | Elastic - Springy start. |
| `VRCTweenEase.OutElastic` | Elastic - Springy end. |
| `VRCTweenEase.InOutElastic` | Elastic - Springy in both directions. |
| `VRCTweenEase.InBack` | Back - Slight overshoot at start. |
| `VRCTweenEase.OutBack` | Back - Slight overshoot at end. |
| `VRCTweenEase.InOutBack` | Back - Slight overshoot in both directions. |
| `VRCTweenEase.InBounce` | Bounce - Bouncing start. |
| `VRCTweenEase.OutBounce` | Bounce - Bouncing end. |
| `VRCTweenEase.InOutBounce` | Bounce - Bouncing in both directions. |

:::tip

Try different ease types to find the right feel for your animation. `VRCTweenEase.OutQuad` is great for UI, `VRCTweenEase.OutElastic` adds playful bounce, and `VRCTweenEase.InOutSine` creates smooth, natural motion.

:::
