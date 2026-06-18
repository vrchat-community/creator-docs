# VRCTween

VRCTween allows you to create smooth animations in your VRChat worlds using the powerful DOTween library. You can animate positions, rotations, scales, and more with a few lines of code.

## Overview

VRCTween is a built-in tweening system that smoothly interpolates (or "tweens") values over time. Instead of manually updating positions or rotations frame-by-frame, VRCTween handles the math and timing for you.

Common use cases:
- Animate UI elements such as buttons, panels, and menus.
- Create smooth object movements.
- Add polish to your world.

VRCTween uses [DOTween](http://dotween.demigiant.com/), a popular Unity tweening library, and works with both UdonSharp and Udon Graph.

## Basic Usage

### Create a Tween

Create tweens using extension methods on the target type, or static methods on `VRCTween`. Each method returns a `VRCTweenHandle` that you can use to control and configure the tween:

```cs
using VRC.SDK3.Components;


public class MyScript : UdonSharpBehaviour
{
    public GameObject cube;

    void Start()
    {
        // Move the cube up over 2 seconds.
        VRCTweenHandle tweenHandle = cube.TweenPosition(new Vector3(0, 5, 0), 2f, VRCTweenEase.OutQuad);
    }
}
```

### Receive Callbacks

To receive a notification when a tween completes, chain `.OnComplete()` on the handle:

```cs
public class MyScript : UdonSharpBehaviour
{
    void Start()
    {
        gameObject.TweenScale(Vector3.one * 2f, 1f, VRCTweenEase.OutBounce)
            .OnComplete(this, nameof(OnScaleComplete));
    }

    public void OnScaleComplete()
    {
        Debug.Log("Scale animation complete!");
    }
}
```

## Tween Types

Tween creation methods are available as extension methods on the target type (e.g., `gameObject.TweenPosition(...)`) or as static methods on `VRCTween`. All return a `VRCTweenHandle`.

- **Transform**: TweenPosition, TweenLocalPosition, TweenRotation, TweenLocalRotation, TweenScale
- **Path**: TweenPath, TweenLocalPath
- **UI**: TweenColor, TweenFade (Graphic), TweenFade (CanvasGroup), TweenValue (Slider), TweenAnchorPos, TweenSizeDelta
- **Sprite**: TweenColor, TweenFade (SpriteRenderer)
- **Renderer**: TweenColor, TweenFloat (Renderer)
- **Light**: TweenIntensity, TweenColor (Light)
- **Audio**: TweenVolume, TweenPitch (AudioSource)

For detailed code examples, see [Built-in Tween Types](./tween-types).

### Virtual Tweens

Virtual tweens animate arbitrary values (float, int, Color, Vector3) by writing into a variable on your UdonBehaviour each frame. Use them when none of the built-in tween types cover what you need. See [Virtual Tweens](./virtual-tweens) for details and examples.

## Controlling and Configuring Tweens

Control and configure tweens using instance methods on `VRCTweenHandle`. Config methods return the handle for chaining:

```cs
cube.TweenPosition(new Vector3(0, 5, 0), 2f, VRCTweenEase.OutQuad)
    .From()
    .SetDelay(0.5f)
    .SetLoops(2, VRCTweenLoopType.Yoyo)
    .OnComplete(this, nameof(OnDone));
```

See [Settings and Control](./settings) for the full API reference and ease type table.

## Example

This example demonstrates handle storage, callbacks, and cleanup:

```cs
using UdonSharp;
using UnityEngine;
using VRC.SDK3.Components;


public class TweenExample : UdonSharpBehaviour
{
    public GameObject button;
    private VRCTweenHandle scaleTween;

    public override void Interact()
    {
        // Scale up and down when clicked.
        scaleTween = button.TweenScale(Vector3.one * 1.2f, 0.15f, VRCTweenEase.OutQuad)
            .OnComplete(this, nameof(OnTweenComplete));
    }

    public void OnTweenComplete()
    {
        // Scale back down.
        button.TweenScale(Vector3.one, 0.15f, VRCTweenEase.OutQuad);
    }

    void OnDestroy()
    {
        // Clean up tweens when object is destroyed.
        button.KillAllTweens();
    }
}
```

## Best Practices

### Store Tween Handles

Save tween handles if you need to control them later:

```cs
private VRCTweenHandle myTween;

void Start()
{
    myTween = gameObject.TweenPosition(Vector3.up, 2f, VRCTweenEase.OutQuad);
}

public void StopTween()
{
    myTween.Kill();
}
```

### Clean Up Tweens

Tweens are automatically cleaned up when they complete. However, tweens that are still running (e.g., infinite loops or long-duration tweens) should be killed when their object is destroyed:

```cs
void OnDestroy()
{
    gameObject.KillAllTweens();
}
```

### Chain Tweens with Callbacks

Create sequences by using callbacks and custom event names:

```cs
void Start()
{
    cube.TweenPosition(Vector3.up * 5, 1f, VRCTweenEase.OutQuad)
        .OnComplete(this, nameof(OnFirstTweenComplete));
}

public void OnFirstTweenComplete()
{
    cube.TweenRotation(new Vector3(0, 180, 0), 1f, VRCTweenEase.InOutQuad)
        .OnComplete(this, nameof(OnSecondTweenComplete));
}

public void OnSecondTweenComplete()
{
    Debug.Log("Sequence complete!");
}
```

### Use DelayedCall for Cancelable Timers

`VRCTween.DelayedCall` is a cancelable alternative to `SendCustomEventDelayedSeconds`:

```cs
private VRCTweenHandle timerHandle;

void Start()
{
    // Schedule a delayed callback.
    timerHandle = VRCTween.DelayedCall(this, nameof(OnTimerFinished), 3.0f);
}

public void CancelTimer()
{
    // Cancel the timer at any time.
    timerHandle.Kill();
}

public void OnTimerFinished()
{
    Debug.Log("3 seconds have passed!");
}
```

## Udon Graph

VRCTween works in Udon Graph. Look for the `VRCTween` and `VRCTweenHandle` nodes in the node search:

1. Search for "VRCTween TweenPosition" (or any creation method) to create a tween.
2. Connect your GameObject and parameters.
3. The node outputs a `VRCTweenHandle`.
4. Use `VRCTweenHandle` nodes (Kill, Pause, SetDelay, OnComplete, etc.) to control and configure it.

For callbacks, use the `VRCTweenHandle OnComplete` node:
- Connect the tween handle and your UdonBehaviour (usually "this").
- Provide a custom event name string.
- Implement the corresponding custom event in your graph.

## Limitations

- Tweens are local to each player and don't sync across the network automatically.
- For networked animations, consider using Udon's networking features alongside tweens.
- Very short tween durations (less than 0.01 seconds) may not animate smoothly.
- Tween handles are unique per scene instance.

## Input Validation

VRCTween rejects values that would corrupt DOTween state or Unity transforms. Rejections do not raise exceptions to avoid crashing the containing UdonBehavior, so a tween that "did nothing" usually means one of the inputs below was invalid.

Creation methods return an invalid handle (and skip creating the tween) when:

- `target` is `null`.
- `duration` is negative, NaN, or Infinity. Zero is allowed for [creating reusable tweens](./settings#tween-reuse).
- A position, scale, or path waypoint contains NaN, Infinity, or a component whose absolute value exceeds roughly 520,000 units. Rotation tweens only require finite values; large euler angles are allowed.
- A path's `resolution` is silently clamped to the range 1–50; values outside that range still create the tween, just with a clamped resolution.

Config and control methods silently no-op when given invalid arguments:

- `SetDuration` ignores negative, NaN, or Infinity values. Zero is allowed.
- `SetDelay` ignores negative, NaN, or Infinity values.
- `Goto` ignores NaN or Infinity, and otherwise clamps to the tween's duration.
- `ChangeEndValue` ignores floats/vectors that fail the same finite/magnitude checks used at creation.

Check `handle.IsValid` after creation if you need to branch on whether a tween was actually started.

## Performance Tips

### General Tips

- Use `KillAllTweens()` to clean up all tweens on an object at once.
- Avoid creating hundreds of simultaneous tweens. Stagger them across frames to spread the load (see example below).
- For most worlds (5 to 50 tweens triggered by interactions), creating fresh tweens is perfectly fine. DOTween pools tween objects internally, so the overhead is minimal.

### Staggering Many Tweens

If you need to animate a large number of objects like a grid of tiles, avoid creating all tweens in the same frame. Instead, spread them over time with a small delay between each:

```cs
[SerializeField] private GameObject[] tiles;
[SerializeField] private float delayBetween = 0.05f;

private int _nextIndex;

public void AnimateAll()
{
    _nextIndex = 0;
    _AnimateNext();
}

public void _AnimateNext()
{
    if (_nextIndex >= tiles.Length) return;

    tiles[_nextIndex].TweenScale(Vector3.one, 0.3f, VRCTweenEase.OutBack);
    _nextIndex++;

    SendCustomEventDelayedSeconds(nameof(_AnimateNext), delayBetween);
}
```

This creates one tween per call, spreading the work across many frames. The visual result is a staggered cascade rather than everything changing at once, which could be a more interesting look anyway!

### Reuse Tweens in Hot Paths

If you have tweens that redirect frequently, such as UI elements following a moving target, or objects responding to player input every frame, reusing handles with `ChangeEndValue`, `SetDuration`, and `SetEase` avoids per-frame allocations. In internal benchmarks with 500 tweens updating over 300 frames, the reuse pattern allocated **46× less memory** and ran **10× faster** than kill-and-recreate.

This optimization matters when tweens are created and destroyed at high frequency. For one-shot animations (doors, buttons, scale pops), simple kill-and-create code is easier to read and works great.

```cs
VRCTweenHandle _moveHandle;

void Start()
{
    // Create once with infinite loops so it stays alive after completing.
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

See [Tween reuse](./settings#tween-reuse) in Settings and Control for more details.

## Resources

- [DOTween Documentation](http://dotween.demigiant.com/documentation.php) - Learn about the underlying library.
- [Ease Visualizer](https://easings.net/) - See how different ease types look.
