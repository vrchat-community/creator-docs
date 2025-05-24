# Attributes

Attributes extend the functionality of your UdonSharp classes, fields, and methods. UdonSharp adds new attributes, but also supports many existing C# and Unity attributes.

:::tip

For a helpful overview of UdonSharp attributes, read [Varneon's UdonSharp Development Practices](https://vrclibrary.com/wiki/books/varneons-udonsharp-development-practices/page/attributes). 
:::

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
| None           | Enforces no synced variables on the behaviour and hides the selection dropdown in the UI for the sync mode. Nothing is synced and SendCustomNetworkEvent will not work on the behaviour.             |
| NoVariableSync | Enforces that there are no synced variables on the behaviour, hides the sync mode selection dropdown, and allows you to use the behaviours on GameObjects that use either Manual or Continuous sync. |
