# PlayerData


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

PlayerData is a [key-value database](https://en.wikipedia.org/wiki/Key%E2%80%93value_database) for storing [persistent data](/worlds/udon/persistence/) about players, such as their score in a game or their preferences in a world.

## Setup

In order for an UdonBehaviour to use PlayerData, you simply need to use the various PlayerData functions described below. Any Udonbehaviour can access those functions anywhere, at almost any time.

## Best Practices

* When using `OnPlayerDataUpdated`, consider whether your script can be limited to trigger on changes for the local player, or if it needs to trigger for every remote player, as well. 
    * For example - a user setting for video player volume can just update for the local player, but a co-op dog-petting game that tallies a "total dogs pet" score for the instance can react to the increase of any player's score to increment the global score.
* Wait for the `OnPlayerRestored` event before using Player Data. `OnPlayerRestored` indicates that the player's saved data has been loaded and is safe to access with Udon. This event will run even if you have no save data.
* Iterating through all Player Keys can be slow if you have many of them. As a general guideline, use the `TryGet` methods to directly check the values of specific keys if you're only checking a few keys or you have more than ten keys to check through.

## Networking

PlayerData does not rely on an UdonBehaviour's [synchronization](/worlds/udon/networking/) settings because it is not tied to any one specific UdonBehaviour. Setting a script to "None" instead of "Manual" or "Continuous" will not stop that script from being able to access and modify PlayerData, nor will it negatively affect the operation of PlayerData as a whole.

When an UdonBehaviour sets a value in PlayerData, PlayerData automatically synchronizes that value. Internally, PlayerData sends the value in a similar manner as manual synchronization with the `RequestSerialization` event. This means that an UdonBehaviour can set multiple PlayerData keys simultaneously and send them together. The UdonBehaviour won't need to send each key separately. Similarly, if an UdonBehaviour sets a key to one value and then immediately changes to something else, remote users don't receive the intermediate value. If data is changed too quickly, only the final state is received by remote users.

PlayerData has a similar [bandwidth cost](/worlds/udon/networking/network-details) as one UdonBehaviour with [synchronization](/worlds/udon/networking/) set to "Manual."

All UdonBehaviours in your world share access to your world's PlayerData. When you set a PlayerData key, any UdonBehaviour in your world can access it. PlayerData is not 'separated' between different UdonBehaviours.

When you change **any** data for the local player, **all** of their PlayerData is sent, including data that hasn't changed. You are unlikely to run into [Udon's bandwidth limits](/worlds/udon/networking/network-details#data-and-specs) if you have a small amount of data that updates very frequently or a large amount of data that updates slowly. But if you use PlayerData to synchronize **large amounts** of data and also **high-frequency** data, you should consider moving one of those to a [player object](/worlds/udon/persistence/player-object). You can use player objects to sync persistent variables, but each object is synced separately. This allows you to separate your fast data from your big data, reducing your world's networking bandwidth.

## Events

| Event | Output | Notes |
| -------- | -------- | -------- |
| OnPlayerDataUpdated | VRCPlayerApi player, PlayerData.Info[] infos | Triggered at the end of the frame if the PlayerData of any player has changed or been received.<br/>Provides the VRCPlayerApi of the player associated with that data, along with an array of information on all the keys in that data. The information in the array includes both the keys used for the data and the state of that data, such as whether it was changed, added, or unchanged. |
| [OnPlayerRestored](/worlds/udon/graph/event-nodes#onplayerrestored) | VRCPlayerApi player | Triggered after a VRChat player's persistent data has been loaded.

:::info Watch out for timing issues

Wait for the `OnPlayerRestored` event before you read or write PlayerData.

When a player joins, the [OnPlayerJoined](/worlds/udon/graph/event-nodes#onplayerjoined) event is called. However, it may take some additional time before their PlayerData is received. If you set PlayerData too early, it may be overwritten when the persistent data is received. 

:::

## PlayerData Info

The `OnPlayerDataUpdated` event provides a `PlayerData.Info` array. This array contains all the current PlayerData keys associated with that player. Each element contains the following information:

| Property | Type | Notes |
| -------- | -------- | -------- |
| Key | String | The string associated with the PlayerData key, which can be used in queries and mutators. |
| State | Enum | The most recent state of the PlayerData Key at the point in which this OnPlayerDataUpdated has happened. |

The `State` enum describes these possible states:

| State     | Index | Notes                                                                                                                                                                                  |
| --------- | ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unchanged | 0     | Indicates that the data in this key has not changed since the last update.                                                                                                             |
| Added     | 1     | Indicates that this key has been added since the last update.                                                                                                                          |
| Removed   | 2     | Indicates that this key has been removed since the last update. Keys which have been removed will only appear in this array once with this state, and the next time they will be gone. |
| Changed   | 3     | Indicates that the data in this key has been changed since the last update.                                                                                                            |
| Restored  | 4     | Indicates that this key has been restored from persistent records. This only happens when you join the instance after having been there before.                                        |

## Best Practices

* When using `OnPlayerDataUpdated`, consider whether your script can be limited to trigger on changes for the local player, or if it needs to trigger for every remote player, as well. 
    * For example - a user setting for video player volume can just update for the local player, but a co-op dog-petting game that tallies a "total dogs pet" score for the instance can react to the increase of any player's score to increment the global score.
* Wait for the `OnPlayerDataRestored` event before using PlayerData. `OnPlayerRestored` indicates that the player's saved data has been loaded and is safe to access with Udon.
* Iterating through all Player Keys can be slow if you have many of them. As a general guideline, use the `TryGet` methods to directly check the values of specific keys if you're only checking a few keys or you have more than ten keys to check through.

## Methods

### Queries

Use these methods to retrieve more information about the value associated with a key. They are helpful to gather more information about what exists at a key before attempting to do something with it.

| Function | Input | Output | Notes |
| -------- | -------- | -------- | ------- |
| HasKey | VRCPlayerApi player, string key     | bool value     | Returns true if a value exists in PlayerData at that key |
| GetType | VRCPlayerApi player, string key | Type | Gets the type of the value contained in PlayerData at that key |
| TryGetType | VRCPlayerApi player, string key | out Type t, bool success | Gets the type of the value contained in PlayerData at that key. Returns false if that key does not exist |

### Mutators

Use these methods to save PlayerData for the local player. It is not possible to set a remote player's data.

Values can be overwritten, even if they previously had a different type. **Keys cannot be deleted after being written.**

| Function | Input |
| ---- | ---- |
| SetString | string key, string value |  
| SetBool | string key, bool value |  
| SetSByte | string key, sbyte value |  
| SetByte | string key, byte value |  
| SetBytes | string key, byte[] value |  
| SetShort | string key, short value |  
| SetUShort | string key, ushort value |  
| SetInt | string key, int value |  
| SetUInt | string key, uint value |  
| SetLong | string key, long value |  
| SetULong | string key, ulong value |  
| SetFloat | string key, float value |  
| SetDouble | string key, double value |  
| SetQuaternion | string key, Quaternion value |  
| SetVector4 | string key, Vector4 value |  
| SetVector3 | string key, Vector3 value |  
| SetVector2 | string key, Vector2 value |  
| SetColor | string key, Color value |  
| SetColor32 | string key, Color value |  

### Accessors

Use these methods to get PlayerData for any player in the instance.

If a key does not exist, the default value for that type is returned. For example, calling `PlayerData.GetInt()` would return `0`.

Default values are also returned when using the wrong accessor type, such as using `GetInt` on a key which contains a `string`.

If default values are undesirable, use `TryGet` or Queries to distinguish default values from missing keys. 

| Function | Input | Output |
| -------- | -------- | -------- |
| GetString | VRCPlayerApi player, string key | string value |  
| TryGetString | VRCPlayerApi player, string key | string value, bool success | 
| GetBool | VRCPlayerApi player, string key | bool value | 
| TryGetBool | VRCPlayerApi player, string key | bool value, bool success | 
| GetSByte | VRCPlayerApi player, string key | sbyte value | 
| TryGetSByte | VRCPlayerApi player, string key | sbyte value, bool success | 
| GetByte | VRCPlayerApi player, string key | byte value | 
| TryGetByte | VRCPlayerApi player, string key | byte value, bool success | 
| GetBytes | VRCPlayerApi player, string key | byte[] value | 
| TryGetBytes | VRCPlayerApi player, string key | byte[] value, bool value | 
| GetShort | VRCPlayerApi player, string key | short value | 
| TryGetShort | VRCPlayerApi player, string key | bool value | 
| GetUShort | VRCPlayerApi player, string key | ushort value | 
| TryGetUShort | VRCPlayerApi player, string key | ushort value, bool success | 
| GetInt | VRCPlayerApi player, string key | int value | 
| TryGetInt | VRCPlayerApi player, string key | int value, bool success | 
| GetUInt | VRCPlayerApi player, string key | uint value | 
| TryGetUInt | VRCPlayerApi player, string key | uint value, bool success | 
| GetLong | VRCPlayerApi player, string key | long | 
| TryGetLong | VRCPlayerApi player, string key | long value, bool success | 
| GetULong | VRCPlayerApi player, string key | ulong | 
| TryGetULong | VRCPlayerApi player, string key | ulong value, bool success | 
| GetFloat | VRCPlayerApi player, string key | float | 
| TryGetFloat | VRCPlayerApi player, string key | float value, bool success | 
| GetDouble | VRCPlayerApi player, string key | double | 
| TryGetDouble | VRCPlayerApi player, string key |  double value, bool success | 
| GetQuaternion | VRCPlayerApi player, string key | Quaternion | 
| TryGetQuaternion | VRCPlayerApi player, string key |  Quaternion value, bool success | 
| GetVector4 | VRCPlayerApi player, string key | Vector4 | 
| TryGetVector4 | VRCPlayerApi player, string key | Vector4 value, bool success | 
| GetVector3 | VRCPlayerApi player, string key | Vector3 | 
| TryGetVector3 | VRCPlayerApi player, string key | Vector3 value, bool success | 
| GetVector2 | VRCPlayerApi player, string key | Vector2 | 
| TryGetVector2 | VRCPlayerApi player, string key | Vector2 value, bool success | 
| GetColor | VRCPlayerApi player, string key | Color | 
| TryGetColor | VRCPlayerApi player, string key | Color value, bool success | 
| GetColor32 | VRCPlayerApi player, string key | Color32 | 
| TryGetColor32 | VRCPlayerApi player, string key | Color32 value, bool success | 

## Examples

### Persistent Jumps Counter

<Tabs>
<TabItem value="graph" label="Udon Graph">


![The persistent jump counter example script in the Udon Graph.](/img/worlds/udon/persistence/graph-jump-counter.png)


</TabItem>
<TabItem value="cs" label="UdonSharp">

```cs
using TMPro;
using UdonSharp;
using VRC.SDK3.Persistence;
using VRC.SDKBase;
using VRC.Udon.Common;

public class JumpCounter : UdonSharpBehaviour
{
    public TextMeshProUGUI jumpText;
    private const string JumpsKey = "jumps";
    public override void InputJump(bool value, UdonInputEventArgs args)
    {
        if (value)
        {
            AddJump();
        }
    }

    public override void OnPlayerDataUpdated(VRCPlayerApi player, PlayerData.Info[] infos)
    {
        if (player.isLocal)
        {
            UpdateTextComponent();
        }
    }

    private void AddJump()
    {
        var currentJumps = PlayerData.GetInt(Networking.LocalPlayer, JumpsKey);
        PlayerData.SetInt(JumpsKey, currentJumps + 1);
    }
    
    private void UpdateTextComponent()  
    {  
        jumpText.text = $"Jumps: {PlayerData.GetInt(Networking.LocalPlayer, JumpsKey)}";    
    }
}
```

</TabItem>
</Tabs>
