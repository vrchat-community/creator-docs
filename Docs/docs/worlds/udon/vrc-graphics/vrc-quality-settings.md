---
title: "VRC Quality Settings"
slug: "vrc-quality-settings"
hidden: false
createdAt: "2025-04-22T18:46:09.500Z"
updatedAt: "2025-04-22T18:46:09.500Z"
---

import UnityVersionedLink from '@site/src/components/UnityVersionedLink.js';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# VRCQualitySettings

A thin read-only layer over properties of <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/ScriptReference/QualitySettings.html">UnityEngine.QualitySettings</UnityVersionedLink>.

Currently exposed:

- `int AntiAliasing`
- `int PixelLightCount`
- `float LODBias`
- `int MaximumLODLevel`
- `ShadowResolution ShadowResolution`
- `float ShadowDistance`
- `int ShadowCascades`
- `int vSyncCount`

Some of these may be affected by the user's graphics settings.

### Shadow Distance

You can override the <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/shadow-distance.html">shadow distance</UnityVersionedLink> in your world using `VRCQualitySettings.SetShadowDistance()`. In VRChat, the value is clamped between `0.1f` and `10000.0f`.

`SetShadowDistance()` takes four float parameters: `low`, `medium`, `high`, and `mobile`. These correspond to the "Low", "Medium" and "High" shadow quality settings in the graphics settings menu. If you specify different values, the parameter that matches the local user's current setting is used. `mobile` applies to all non-PC platforms, regardless of settings. If you want to use the same value for all four parameters, use the overload method of `SetShadowDistance()` that accepts a single parameter.

Once you set a shadow distance using this property, the user's configured "Shadow Quality" setting will be overridden. The user will see a warning in their graphics settings. Be careful what you set as your shadow distance, since larger values can have heavy performance implications.

To disable the override and go back to the user configured shadow distance value, you can call `VRCQualitySettings.ResetShadowDistance()`.

In addition, the following 2 shadow-related properties are accessible as read-write:

- `float shadowCascade2Split`
- `Vector3 shadowCascade4Split`

All properties are reset on world load.

## OnChanged Event

When a user changes graphics settings that affect an exposed property, the [OnVRCQualitySettingsChanged](/worlds/udon/graph/event-nodes/#onvrcqualitysettingschanged) event is triggered.