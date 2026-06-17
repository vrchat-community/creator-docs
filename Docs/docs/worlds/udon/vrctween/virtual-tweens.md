---
sidebar_position: 2
---

# Virtual Tweens

Virtual tweens smoothly animate a value (like a float or color) over time and write the result into a variable on your UdonBehaviour. Each frame, your callback runs so you can apply the updated value however you like. Use virtual tweens when none of the built-in tween types (position, rotation, scale, etc.) cover what you need. For example, animating a score counter, a camera's field of view, or an Animator parameter.

| Method | Example |
|--------|---------|
| **TweenFloat** | `VRCTween.TweenFloat(0f, 100f, 2f, this, nameof(myValue), nameof(OnUpdate), VRCTweenEase.Linear)` |
| **TweenInt** | `VRCTween.TweenInt(0, 100, 5f, this, nameof(myValue), nameof(OnUpdate), VRCTweenEase.Linear)` |
| **TweenColor** | `VRCTween.TweenColor(Color.red, Color.blue, 2f, this, nameof(myValue), nameof(OnUpdate), VRCTweenEase.Linear)` |
| **TweenVector3** | `VRCTween.TweenVector3(Vector3.zero, Vector3.one, 2f, this, nameof(myValue), nameof(OnUpdate), VRCTweenEase.Linear)` |
| **DelayedCall** | `VRCTween.DelayedCall(this, nameof(OnTimer), 5f)` |
| **DelayedSetActive** | `VRCTween.DelayedSetActive(myObject, false, 2f)` |

All methods return a **VRCTweenHandle** that you can use to control the tween.

## TweenFloat

Animates float values:

```cs
[System.NonSerialized] public float fovValue;

VRCTweenHandle tweenHandle = VRCTween.TweenFloat(60f, 90f, 2f, this, nameof(fovValue), nameof(OnFovUpdate), VRCTweenEase.OutQuad);

public void OnFovUpdate()
{
    myCamera.fieldOfView = fovValue;  // smoothly widens the camera's field of view
}
```

## TweenInt

Animates integer values. This is perfect for counters and scores:

```cs
[System.NonSerialized] public int scoreValue;

VRCTweenHandle tweenHandle = VRCTween.TweenInt(0, 100, 5f, this, nameof(scoreValue), nameof(OnCountUpdate), VRCTweenEase.Linear);

public void OnCountUpdate()
{
    scoreText.text = scoreValue.ToString();  // updates scoreValue smoothly as it ticks up
}
```

## TweenColor

Animates Color values:

```cs
[System.NonSerialized] public Color lightColor;

VRCTweenHandle tweenHandle = VRCTween.TweenColor(Color.red, Color.blue, 2f, this, nameof(lightColor), nameof(OnColorUpdate), VRCTweenEase.Linear);

public void OnColorUpdate()
{
    myLight.color = lightColor;  // Value is stored in lightColor.
}
```

## TweenVector3

Animates Vector3 values. This is useful for tweening custom positions, directions, or any three-component value as a single unit (with the easing curve applied to the vector as a whole, rather than per-axis):

```cs
[System.NonSerialized] public Vector3 targetPosition;

VRCTweenHandle tweenHandle = VRCTween.TweenVector3(Vector3.zero, new Vector3(5, 10, 0), 2f, this, nameof(targetPosition), nameof(OnPositionUpdate), VRCTweenEase.OutQuad);

public void OnPositionUpdate()
{
    // Use the interpolated value however you like.
    myParticleSystem.transform.position = targetPosition;
}
```

:::tip

Variables must be declared as `public` to work with virtual tweens. Use `[System.NonSerialized]` to prevent Unity from saving the transient tween value to your scene. You can use properly-typed variables (float, int, Color, Vector3) and run multiple tweens simultaneously by using different variable names.

:::

## DelayedCall

Creates a cancelable delayed event. This is an alternative to `SendCustomEventDelayedSeconds`:

```cs
VRCTweenHandle timerHandle = VRCTween.DelayedCall(this, nameof(OnTimerFinished), 5.0f);

// Cancel the timer anytime.
timerHandle.Kill();

public void OnTimerFinished()
{
    Debug.Log("5 seconds elapsed!");
}
```

## DelayedSetActive

Enables or disables a GameObject after a delay. This is a shorthand for the common pattern of using `DelayedCall` with a callback that just calls `SetActive`. If the target is destroyed before the delay elapses, the action is silently skipped.

```cs
// Disable an object after 3 seconds.
VRCTweenHandle handle = VRCTween.DelayedSetActive(myObject, false, 3f);

// Cancel it if needed.
handle.Kill();
```
