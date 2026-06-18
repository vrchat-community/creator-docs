---
sidebar_position: 1
---

# Built-In Tween Types

Detailed examples for each built-in VRCTween type.

## Transform Tweens

Transform tweens animate a GameObject's position, rotation, or scale. These are the most commonly used tweens for moving objects around a scene. All transform tweens can be called on either a `GameObject` or a `Transform`:

```cs
// Both are equivalent
myObject.TweenPosition(target, 1f, VRCTweenEase.OutQuad);
myObject.transform.TweenPosition(target, 1f, VRCTweenEase.OutQuad);
```

### TweenPosition and TweenLocalPosition

Animate a GameObject's world or local position:

```cs
public GameObject door;

public void OpenDoor()
{
    // Move to a world position
    door.TweenPosition(new Vector3(0, 3, 0), 1f, VRCTweenEase.OutQuad);
}

public void CloseDoor()
{
    // Move to a local position (relative to parent)
    door.TweenLocalPosition(Vector3.zero, 1f, VRCTweenEase.InOutQuad);
}
```

### TweenRotation and TweenLocalRotation

Animate a GameObject's rotation using euler angles:

```cs
public GameObject lever;

public void PullLever()
{
    // Rotate to world euler angles
    lever.TweenRotation(new Vector3(-45, 0, 0), 0.5f, VRCTweenEase.OutBack);
}

public void ResetLever()
{
    // Rotate to local euler angles (relative to parent)
    lever.TweenLocalRotation(Vector3.zero, 0.5f, VRCTweenEase.InOutQuad);
}
```

### TweenScale

Animates `transform.localScale`. Unity's world-space scale is read-only, so there's no `TweenGlobalScale` variant.

```cs
public GameObject pickup;

public void OnPickedUp()
{
    // Shrink to nothing
    pickup.TweenScale(Vector3.zero, 0.3f, VRCTweenEase.InBack);
}

public void OnDropped()
{
    // Pop back to full size
    pickup.TweenScale(Vector3.one, 0.3f, VRCTweenEase.OutBack);
}
```

## Path Tweens

Path tweens move a GameObject along a series of waypoints. Use `TweenPath` for world-space paths and `TweenLocalPath` for local-space paths. Like transform tweens, these can be called on either `GameObject` or `Transform`.

### TweenPath and TweenLocalPath

Animate a GameObject along a multi-point path:

```cs
public GameObject platform;

public void StartPatrol()
{
    Vector3[] route = new Vector3[] {
        new Vector3(0, 0, 0),
        new Vector3(10, 0, 0),
        new Vector3(10, 0, 10),
        new Vector3(0, 0, 10)
    };

    // Linear path that loops back to the start
    platform.TweenPath(route, 8f, VRCTweenPathType.Linear, true, 10, VRCTweenEase.Linear)
        .SetLoops(-1, VRCTweenLoopType.Restart);
}
```

Use `VRCTweenPathType.CatmullRom` for smooth curved paths instead of straight segments:

```cs
public GameObject camera;

public void StartCameraFlythrough()
{
    Vector3[] cameraPath = new Vector3[] {
        new Vector3(0, 2, 0),
        new Vector3(5, 4, 3),
        new Vector3(10, 2, 8),
        new Vector3(15, 3, 5)
    };

    // Smooth curved path
    camera.TweenPath(cameraPath, 6f, VRCTweenPathType.CatmullRom, false, 10, VRCTweenEase.InOutSine)
        .OnComplete(this, nameof(OnFlythroughDone));
}

public void OnFlythroughDone()
{
    Debug.Log("Camera flythrough complete!");
}
```

| Parameter | Description |
|-----------|-------------|
| **waypoints** | Array of `Vector3` positions (minimum 2). World or local space depending on method. Waypoints containing NaN, Infinity, or extreme magnitudes are rejected. See [Input validation](./index.md#input-validation). |
| **pathType** | `VRCTweenPathType.Linear` for straight segments, `VRCTweenPathType.CatmullRom` for smooth curves. |
| **closePath** | If `true`, the path auto-closes from the last waypoint back to the first. |
| **resolution** | Curve smoothness for CatmullRom paths (default 10, higher = smoother). Ignored for Linear. Silently clamped to the range 1–50. |

:::tip

For looping patrol routes, set `closePath` to `true` and use `.SetLoops(-1, VRCTweenLoopType.Restart)`. This creates a seamless loop without a visible snap at the end.

:::

## UI Tweens

UI tweens work on Unity UI components. These are perfect for animating menus, HUDs, and interactive elements.

### TweenColor and TweenFade (Graphic)

`Graphic` is the base class for `Image`, `Text`, `RawImage`, and other UI elements. These methods work on all of them:

```cs
public Image myImage;
public Text myText;

void Start()
{
    // Fade an image to red
    myImage.TweenColor(Color.red, 1f, VRCTweenEase.OutQuad);

    // Fade text to transparent
    myText.TweenFade(0f, 1f, VRCTweenEase.OutQuad);
}
```

### TweenFade (CanvasGroup)

Fade entire UI panels and groups:

```cs
public CanvasGroup menuPanel;

public void ShowMenu()
{
    menuPanel.gameObject.SetActive(true);
    menuPanel.TweenFade(1f, 0.5f, VRCTweenEase.OutQuad);
}

public void HideMenu()
{
    menuPanel.TweenFade(0f, 0.5f, VRCTweenEase.OutQuad)
        .OnComplete(this, nameof(OnMenuHidden));
}

public void OnMenuHidden()
{
    menuPanel.gameObject.SetActive(false);
}
```

### TweenValue (Slider)

Animate slider values for health bars, progress indicators, and more:

```cs
public Slider healthBar;

public void TakeDamage(float damage)
{
    float newHealth = healthBar.value - damage;
    healthBar.TweenValue(newHealth, 0.3f, VRCTweenEase.OutQuad);
}
```

### TweenAnchorPos

Animate a RectTransform's anchored position. This is the correct way to move UI elements within a Canvas layout:

```cs
public RectTransform notificationPanel;

public void SlideIn()
{
    // Slide from off-screen to center
    notificationPanel.anchoredPosition = new Vector2(-500, 0);
    notificationPanel.TweenAnchorPos(Vector2.zero, 0.5f, VRCTweenEase.OutQuad);
}

public void SlideOut()
{
    notificationPanel.TweenAnchorPos(new Vector2(500, 0), 0.5f, VRCTweenEase.InQuad);
}
```

### TweenSizeDelta

Animate a RectTransform's sizeDelta (width and height). This is useful for resizing UI panels, expanding/collapsing sections, or animating pop-ups:

```cs
public RectTransform tooltip;

public void ExpandTooltip()
{
    tooltip.TweenSizeDelta(new Vector2(400, 200), 0.3f, VRCTweenEase.OutQuad);
}

public void CollapseTooltip()
{
    tooltip.TweenSizeDelta(Vector2.zero, 0.3f, VRCTweenEase.InQuad);
}
```

## Renderer Tweens

Tween a Renderer's material properties using `MaterialPropertyBlock`. This is the recommended way to animate material properties on 3D objects -- it avoids creating material instances and works with GPU instancing.

### TweenColor (Renderer)

Animate a Renderer's color. By default, this tweens the `_Color` shader property:

```cs
public Renderer myRenderer;

void Start()
{
    // Tween to red over 1 second
    myRenderer.TweenColor(Color.red, 1f, VRCTweenEase.OutQuad);
}
```

To tween a different shader property, pass the property name explicitly:

```cs
// Tween the emission color
myRenderer.TweenColor("_EmissionColor", Color.yellow, 1f, VRCTweenEase.OutQuad);
```

### TweenFloat (Renderer)

Animate a Renderer's float shader property. This is useful for dissolve effects, emission intensity, cutoff values, and other shader-driven VFX:

```cs
public Renderer myRenderer;

void Start()
{
    // Dissolve effect
    myRenderer.TweenFloat("_DissolveAmount", 1f, 2f, VRCTweenEase.InQuad);

    // Adjust metallic
    myRenderer.TweenFloat("_Metallic", 0.8f, 1f, VRCTweenEase.OutQuad);
}
```

:::tip

Check your shader's property names in the material inspector. Common names are `_Color` for the main color, `_EmissionColor` for emission, `_Metallic`, `_Glossiness`, and `_Cutoff`. If a property doesn't produce a visible change, the shader may use a different property name.

:::

## Light Tweens

Tween Light component properties for dynamic lighting effects like day/night cycles, flickering lights, and reactive environments.

### TweenIntensity (Light)

Animate a Light's intensity:

```cs
public Light myLight;

public void FadeOutLight()
{
    myLight.TweenIntensity(0f, 2f, VRCTweenEase.OutQuad);
}

public void FlashLight()
{
    myLight.TweenIntensity(5f, 0.1f, VRCTweenEase.OutQuad);
}
```

### TweenColor (Light)

Animate a Light's color:

```cs
public Light myLight;

void Start()
{
    // Sunset color shift
    myLight.TweenColor(new Color(1f, 0.5f, 0.2f), 3f, VRCTweenEase.InOutSine);
}
```

## Audio Tweens

### TweenVolume (AudioSource)

Fade audio volume in or out:

```cs
public AudioSource musicSource;

public void FadeOutMusic()
{
    musicSource.TweenVolume(0f, 2f, VRCTweenEase.OutQuad);
}

public void FadeInMusic()
{
    musicSource.Play();
    musicSource.TweenVolume(1f, 2f, VRCTweenEase.InQuad);
}
```

### TweenPitch (AudioSource)

Animate an AudioSource's pitch. The typical range is -3 to 3, though any finite value is accepted:

```cs
public AudioSource engineSource;

public void AccelerateEngine()
{
    engineSource.TweenPitch(2f, 1f, VRCTweenEase.OutQuad);
}

public void DecelerateEngine()
{
    engineSource.TweenPitch(0.5f, 1.5f, VRCTweenEase.InOutQuad);
}
```

## Sprite Tweens

Perfect for 2D games and sprite-based UI:

```cs
public SpriteRenderer mySprite;

void Start()
{
    // Fade sprite color
    mySprite.TweenColor(Color.blue, 1f, VRCTweenEase.OutQuad);

    // Fade sprite to transparent
    mySprite.TweenFade(0f, 1f, VRCTweenEase.OutQuad);
}
```
