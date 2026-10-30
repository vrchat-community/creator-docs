# Attributes

Attributes extend the functionality of your UdonSharp classes, fields, and methods. UdonSharp adds new attributes, but also supports many existing C# and Unity attributes.

## Attribute reference

UdonSharp supports the following attributes, grouped by where they're defined.

| Source | Attributes |
| --- | --- |
| UdonSharp | [`UdonSynced`](#udonsynced), [`UdonBehaviourSyncMode`](#udonbehavioursyncmode), [`RecursiveMethod`](#recursivemethod), [`FieldChangeCallback`](#fieldchangecallback) |
| VRChat SDK | [`NetworkCallable`](#networkcallable) |
| Unity | [`DefaultExecutionOrder`](#defaultexecutionorder), [`SerializeField`](#serialization-attributes), [`SerializeReference`](#serialization-attributes), [`OdinSerialize`](#serialization-attributes), [`NonSerialized`](#serialization-attributes), [`Header`](#inspector-attributes), [`Space`](#inspector-attributes), [`Tooltip`](#inspector-attributes), [`TextArea`](#inspector-attributes), [`Multiline`](#inspector-attributes), [`Range`](#inspector-attributes), [`ColorUsage`](#inspector-attributes), [`GradientUsage`](#inspector-attributes), [`HideInInspector`](#inspector-attributes) |

## UdonSharp Attributes

The following attributes are to unique to UdonSharp and the VRChat SDK.

### UdonSynced
`[UdonSynced]` / `[UdonSynced(UdonSyncMode)]`

Fields with this attribute are synchronized over the network for all players in the instance. Read VRChat's [networking documentation](/worlds/udon/networking/) to learn more.

**Example**
```cs
public class Example : UdonSharpBehaviour 
{
    [UdonSynced]
    public bool synchronizedBoolean;

    [UdonSynced(UdonSyncMode.Linear)]
    // This float will be linearly interpolated
    public float synchronizedFloat;
}
```
### UdonSyncMode
`UdonSharp.UdonSyncMode`

By default, `[UdonSynced]` fields are not interpolated. When the field changes, it changes instantly. You can change the sync mode to smoothly interpolate between the old and new value.

| Name        | Summary                                   |
| ----------- | ----------------------------------------- |
| None        | No interpolation (Default)                |
| Linear      | Linear interpolation                      |
| Smooth      | Smooth interpolation                      |
| *NotSynced* | *(Default when not using `[UdonSynced]`)* |
### UdonBehaviourSyncMode
`[UdonBehaviourSyncMode]` / `[UdonBehaviourSyncMode(BehaviourSyncMode)]`

This attribute allows you to choose a [sync mode](#behavioursyncmode) that is applied to all instances of this UdonBehaviour. If you add this attribute, UdonSharp will hide the dropdown for choosing a sync mode in Unity. It also enabled additional validations to ensure that your synced variables are suitable for the chosen sync mode.

**Example**
```cs
[UdonBehaviourSyncMode(BehaviourSyncMode.Manual)]
public class Example : UdonSharpBehaviour 
{
  // This class's sync mode is manual.
}
```

### BehaviourSyncMode
`UdonSharp.BehaviourSyncMode`

Use this in conjunction with [UdonBehaviourSyncMode](#udonbehavioursyncmode) to choose a sync mode for your behaviour.

| Name           | Summary                                                                                                                                                                                              |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Any            | Nothing is enforced. You can set any sync type in Unity. (Default)                                                                                                                                   |
| Continuous     | Synced variables will be updated automatically at a very frequent rate, but may not always reliably update to save bandwidth.                                                                        |
| Manual         | Synced variables are updated manually by the user less frequently, but ensures that updates are reliable when requested.                                                                             |
| None           | Enforces no synced variables on the behaviour and hides the selection dropdown in the UI for the sync mode. Nothing is synced and SendCustomNetworkEvent/NetworkCalling will not work on the behaviour.             |
| NoVariableSync | Enforces that there are no synced variables on the behaviour, hides the sync mode selection dropdown, and allows you to use the behaviours on GameObjects that use either Manual or Continuous sync. |

### RecursiveMethod
`[RecursiveMethod]`

Marks a method as safe to call recursively. Apply it to the method that calls itself. You don't need to mark the methods that call *into* it.

Recursive methods save and restore their local variables on a separate stack at every call site. This makes them slower and generates more garbage than regular methods, so only use the attribute on methods that actually need it.

**Example**
```cs
[RecursiveMethod]
int Factorial(int input)
{
    if (input == 1)
        return 1;

    return input * Factorial(input - 1);
}
```

:::note

You can't call a user-defined method that has `ref` or `out` parameters from inside a `[RecursiveMethod]` method. Doing so fails to compile.

:::

### FieldChangeCallback
`[FieldChangeCallback(string)]`

Redirects writes to a field into a property's setter, so you can react when a variable changes. The attribute takes the name of a property on the same class. Use [`nameof`](https://learn.microsoft.com/dotnet/csharp/language-reference/operators/nameof) so the reference survives renaming.

The setter runs when the field is written by **network sync** or by **`SetProgramVariable`**. It does *not* run when you assign the field directly from inside the same behaviour.

The setter receives the new value as `value`, while the field itself still holds the previous value. This lets you compare the two, but it also means **your setter must assign the field** if you want the field to change.

**Example**
```cs
using UdonSharp;
using UnityEngine;
using VRC.SDKBase;
using VRC.Udon;

[UdonBehaviourSyncMode(BehaviourSyncMode.Manual)]
public class ExampleOfFieldChangeCallback : UdonSharpBehaviour
{
    public GameObject toggleObject;

    [UdonSynced, FieldChangeCallback(nameof(SyncedToggle))]
    private bool _syncedToggle;

    public bool SyncedToggle
    {
        set
        {
            Debug.Log("toggling the object...");
            _syncedToggle = value;
            toggleObject.SetActive(value);
        }
        get => _syncedToggle;
    }

    public override void Interact()
    {
        Networking.SetOwner(Networking.LocalPlayer, gameObject);
        SyncedToggle = !SyncedToggle;
        RequestSerialization();
    }
}
```

Notice that `Interact` assigns `SyncedToggle`, the property, not `_syncedToggle`, the field. Assigning the field directly would skip the setter entirely, so the object would never toggle. Always go through the property.

A few rules the compiler enforces:

- The property named by the attribute must exist on the same class, and its type must match the field's type.
- Assigning the field from *another* behaviour (`other._syncedToggle = true`) is a compile error. Use the property, or call `SetProgramVariable` explicitly.
- Reading the field from another behaviour is allowed, but it reads the field directly and does not call the property's getter.

## VRChat SDK Attributes

### NetworkCallable
`[NetworkCallable]` / `[NetworkCallable(int maxEventsPerSecond)]`

Marks a method that can be called over the network **with parameters** using `SendCustomNetworkEvent`. Without this attribute, networked events can't take arguments.

`maxEventsPerSecond` defaults to 5. Read the [network events documentation](/worlds/udon/networking/events#sending-events-with-parameters) for the full details, including parameter size limits.

**Example**
```cs
using UdonSharp;
using VRC.SDK3.UdonNetworkCalling;
using VRC.Udon.Common.Interfaces;

public class Example : UdonSharpBehaviour
{
    [NetworkCallable]
    public void SetScore(int score)
    {
        // Runs on every client.
    }

    public override void Interact()
    {
        SendCustomNetworkEvent(NetworkEventTarget.All, nameof(SetScore), 10);
    }
}
```

The method must be `public`, must not return a value, and can't be `static`, `generic`, `virtual`, `abstract`, `override` or `sealed`. You also can't put `[NetworkCallable]` on a built-in Udon event such as `Interact` or `Start`.

## Unity & Other Attributes

Your UdonSharp scripts are regular `MonoBehaviour` scripts in the Unity Editor, so Unity draws their inspectors. That means standard Unity attributes work as you'd expect.

### DefaultExecutionOrder
`[DefaultExecutionOrder(int)]`

Sets the order in which this behaviour's `Update`, `LateUpdate`, `FixedUpdate` and `PostLateUpdate` events run, relative to other Udon behaviours in the scene.

Every behaviour is `0` by default. Lower values run earlier, and the value can be negative.

**Example**
```cs
[DefaultExecutionOrder(-10)]
public class Example : UdonSharpBehaviour
{
    // This behaviour's Update runs before behaviours that use the default order.
}
```

:::note

This attribute only affects the four update events listed above. It does not change the order of any other event, such as `Start`, `Interact`, or network events.

The attribute is also not inherited, so put it on the class you're actually using, not on a base class it derives from.

:::

### Serialization attributes

These control which fields UdonSharp saves and exposes as Udon variables.

| Attribute | Effect |
| --- | --- |
| [`SerializeField`](https://docs.unity3d.com/ScriptReference/SerializeField.html) | Serializes a non-public field. |
| [`SerializeReference`](https://docs.unity3d.com/ScriptReference/SerializeReference.html) | Serializes a field by reference. |
| [`NonSerialized`](https://learn.microsoft.com/dotnet/api/system.nonserializedattribute) | Stops a public field from being serialized. |
| [`OdinSerialize`](https://github.com/TeamSirenix/odin-serializer#how-odinserializer-works-in-unity) | Serializes types Unity can't, such as jagged arrays. Takes priority over `NonSerialized`. |

### Inspector attributes

These only change how a field is drawn in the Unity Inspector. They have no effect at runtime.

[`Header`](https://docs.unity3d.com/ScriptReference/HeaderAttribute.html),
[`Space`](https://docs.unity3d.com/ScriptReference/SpaceAttribute.html),
[`Tooltip`](https://docs.unity3d.com/ScriptReference/TooltipAttribute.html),
[`TextArea`](https://docs.unity3d.com/ScriptReference/TextAreaAttribute.html),
[`Multiline`](https://docs.unity3d.com/ScriptReference/MultilineAttribute.html),
[`Range`](https://docs.unity3d.com/ScriptReference/RangeAttribute.html),
[`ColorUsage`](https://docs.unity3d.com/ScriptReference/ColorUsageAttribute.html),
[`GradientUsage`](https://docs.unity3d.com/ScriptReference/GradientUsageAttribute.html),
[`HideInInspector`](https://docs.unity3d.com/ScriptReference/HideInInspector.html)
