---
slug: "vrc_velocitytracker"
---

# VRC Velocity Tracker

VRCVelocityTracker provides an efficient way to read velocity from Udon programs without running its own update loop.

## Usage

Add the VRCVelocityTracker a GameObject

Call one of the methods to read the current velocity:

```csharp
VRCVelocityTracker tracker;

void Update()
{
    Vector3 speed = tracker.GetLinearVelocity();
}
```

## Methods

| Name | Summary |
| --- | --- |
| GetLinearVelocity() | Returns the linear velocity in meters per second, measured over the last rendered frame. |
| GetAngularVelocity() | Returns the angular velocity in radians per second, measured over the last rendered frame. |
| GetFixedLinearVelocity() | Returns the linear velocity in meters per second, measured over the last physics step. |
| GetFixedAngularVelocity() | Returns the angular velocity in radians per second, measured over the last physics step. |

## Notes
- The above methods return zero when the VRCVelocityTracker component is disabled.
