# Network Events

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Network events allow simple one-way network communication between your scripts. When a script executes a network event, it executes the event once for the target players currently in the instance.

Network events are not repeated for late joiners, so they're best for temporary actions that are only relevant for a short time, such as cosmetic effects. Don't use network events for important logic or state changes that are relevant for late joiners. Instead, use [network variables](/worlds/udon/networking/variables).

## Defining an Event

To declare an event, you have to give it a name. This has to be unique per Udon behaviour, but can be reused across different behaviours. The name is determined by the text field on the Udon Graph event node, or the UdonSharp method definition, and is case-sensitive. In UdonSharp, use `nameof` to allow your IDE to check this for you.

When [calling an event](#calling-an-event) using `SendCustomNetworkEvent`, the event name determines which method will be excecuted.

To allow a method or graph event node to be executed remotely, it must follow the rules listed below. For both Graph and UdonSharp, the *receiving* UdonBehaviour **must not** use [sync mode](/worlds/udon/udonsharp/attributes/#behavioursyncmode) `None`.

<Tabs groupId="udon-compiler-language">
<TabItem value="graph" label="Udon Graph">

For an Udon Graph custom event node to be network-callable, the following requirements have to be met:

- The name of the custom event **must not** start with an underscore `_`.
- The event node must have an active Flow connection.

</TabItem>

<TabItem value="cs" label="UdonSharp">

For an UdonSharp method to be network-callable, the following requirements have to be met:

* The method **must** use the attribute `[NetworkCallable]` (see [Legacy Events and Security](#legacy-events-and-security) for an exception).
* The method **must** use the access modifier `public`.
* The method **must not** use the modifier `static`, `virtual`, or `override`.
* The method **must not** use [**member overloading**](https://learn.microsoft.com/en-us/dotnet/standard/design-guidelines/member-overloading), including methods without a `[NetworkCallable]` attribute.
* The method **must not** have a return value, data can not be returned over the network this way.

In addition, if the method uses parameters, they must fulfill the following requirements:

* The method **must not** use more than 8 parameters.
* All parameters **must** be of a [supported type](/worlds/udon/networking/network-details#synced-variables).
* Parameters **must not** use the modifier `params`.
* Parameters **must not** have default values.

</TabItem>
</Tabs>

## Calling an Event

To trigger a network event, use the `SendCustomNetworkEvent` method available on `UdonBehaviour` and `UdonSharpBehaviour`, or make an explicit call via `NetworkCalling.SendCustomNetworkEvent`. These are identical and only provided for compatibility.

The `UdonBehaviour` you are targeting with the call can be different than the one executing `SendCustomNetworkEvent`. It is possible to target disabled behaviours.

### Example

Follow the example below to trigger a custom network event for players in your instance:

<Tabs groupId="udon-compiler-language">
<TabItem value="graph" label="Udon Graph">

![Udon graph for an object that logs a message when it is interacted with.](/img/worlds/udon/networking/custom-event-example-graph.png)

1. Ensure that your UdonBehaviour's sync mode is set to "Continuous" or "Manual", not "None".
2. Create an "Event Custom" node.
3. Give this node a unique name using its input box.
4. Add a "Send Custom Network Event Node."
5. In the `eventName` dropdown, select the name you assigned to the event. You can also attach a string flow do dynamically choose the event name, or enter a name from a different behaviour.
6. Leave the default `All` as the target to trigger this event on each Player in your room, or change it to a [different option](#event-targeting).
7. You can leave the `instance` input empty to target the current UdonBehaviour, or connect a reference to another UdonBehaviour to fire a Custom Event on that one instead.

</TabItem>

<TabItem value="cs" label="UdonSharp">

```cs
using UdonSharp;  
using VRC.SDK3.UdonNetworkCalling;  
using VRC.Udon.Common.Interfaces;  
  
public class SyncedHelloOnInteract : UdonSharpBehaviour  
{  
    public override void Interact()  
    {  
        SendCustomNetworkEvent(NetworkEventTarget.All, nameof(SayHello));  
    }  
      
    [NetworkCallable]  
    public void SayHello()  
    {  
        Debug.Log("Hello, World!");  
    }  
}
```

</TabItem>
</Tabs>

Note that your Udon code will not wait for these events to be called on the remote players - it simply sends them off and continues on immediately. If your event will be received by the sender itself however, it _will_ trigger locally before moving on, just like a regular function call would.

The order in which events are sent and received is guaranteed as long as you don't hit your own defined [rate-limit](#rate-limiting). If you send event `A` followed by event `B`, the receiving side will receive them in the order `A, B` as well. This guarantee is valid across all behaviours in your scene, but not across multiple players sending events at the same time.

However, if an event is [rate-limited](#rate-limiting) by the `[NetworkCallable(maxEventsPerSecond: X)]` attribute (not including VRChat-internal rate or throughput limits!), it will not prevent other queues from draining. For example, if event A has a limit of 3 per second, and you send five events at once: `A1, A2, A3, A4, B1` - then they will arrive in order `A1, A2, A3, B1, A4`, since A4 will hit the rate limit, and so event B1 can "skip the queue".

## Event Targeting

Network events always target one or more players in the instance. You can choose between the following targets:

| Target | Description |
| - | - |
| `NetworkEventTarget.All` | All players in the instance receive the event. |
| `NetworkEventTarget.Others`| All players in the instance receive the event, excluding the local player. |
| `NetworkEventTarget.Owner` | The owner of the object receives the event. |
| `NetworkEventTarget.Self` | "Loopback" target. Only the sending player receives the event. This will bypass all [rate-limiting](#rate-limiting), since it never actually gets sent over the network. |

If the local player sends a network event to themselves, they execute it immediately. For example, `NetworkEventTarget.All` sends a network event to all other players, but the local player executes the event immediately without waiting.

To send an event to a specific player, you can include the target player's [`playerId`](/worlds/udon/players/getting-players#get-playerid) as a parameter and only execute your event if the received ID matches the local player. Use `NetworkEventTarget.All` in that case, or add a special case for triggering the event locally.

## Sending Events with Parameters

A network event can carry up to **eight** parameters. Each parameter must be a [syncable variable type](/worlds/udon/networking/network-details#synced-variables) (`int`, `string`, `float`, `bool`, …), and in UdonSharp, the receiving method must be marked `[NetworkCallable]`.

<Tabs groupId="udon-compiler-language">
<TabItem value="graph" label="Udon Graph">

When creating your custom event in Udon Graph, you can select how many parameters it should have. The default variant has no parameters. You can always change the amount of parameters later using the dropdown on the node.

On a node with parameters, you can select the types in dropdowns on the left. The output data ports will automatically change type.

To send parameters from a "Send Custom Network Event" node, choose the overload with the correct amount of parameters from the dropdown.

For example, here is a simple graph receiving a string and an integer:

![Udon graph that sends an event with 2 parameters of different types on Interact.](/img/worlds/udon/networking/custom-event-parameters-example-graph.png)

</TabItem>

<TabItem value="cs" label="UdonSharp">

You can declare network callable functions with parameters just like usual in UdonSharp.

```cs
using UdonSharp;  
using UnityEngine;  
using VRC.SDK3.UdonNetworkCalling;  
using VRC.Udon.Common.Interfaces;  
  
public class EventParameterExample : UdonSharpBehaviour  
{  
    public override void Interact()  
    {  
        NetworkCalling.SendCustomNetworkEvent((IUdonEventReceiver)this, NetworkEventTarget.All, nameof(PrintMessage), "VRCat", 11);  
        // or: this.SendCustomNetworkEvent(NetworkEventTarget.All, nameof(PrintMessage), "VRCat", 11);  
    }  
      
    [NetworkCallable]  
    public void PrintMessage(string name, int age)  
    {  
        Debug.Log($"Congratulations on your {age}th birthday, {name}!");  
    }  
}
```

</TabItem>
</Tabs>

You need to ensure that the parameter types you pass to `SendCustomNetworkEvent` match the types you declared on the event, otherwise sending will fail!

When passing `null` as an input to `SendCustomNetworkEvent`, the method called on the receiving side will receive `default(T)` where `T` is the type of the parameter as declared in the method signature. This means nullable types will be received as `null`, while non-nullable types will receive a default value (e.g. `int` parameters sent as `null` will receive `0`, which is `default(int)`).

### Parameter Size Limits and Event Splitting

In general, keep parameter sizes minimal and avoid sending large objects or complex structures to avoid issues. There are a few hard-limits in place:

* The total size of all parameters in a single network event cannot exceed 16 KB.
* The size of a single parameter is not limited, other than by the total size of the event.
* Total outgoing data is hard-capped at approximately 18 KB/s. This includes _all_ network overhead however, so in practice it is unlikely you will see more than 8-10 KB/s.

In addition, there are two levels of limitation that may cause events to be delayed:

* Throughput-based limiting – This applies to the total amount of network data being processed at any time and follows the same rules as regular Udon sync.
* User-configured rate limiting – This controls how often network events can be sent per second and can be adjusted using the `[NetworkCallable(maxEventsPerSecond: X)]` attribute.

:::note

If you send an event containing more than **1024 bytes** (1 kilobyte) of parameter data, it will be split into multiple events internally. This process is _almost_ transparent to Udon, as the receiving size will re-assemble the event and call it only once on the targeted `UdonBehaviour`.

However, these internal events are visible in the [rate-limiting queue](#rate-limiting), and from the `Get(All)QueuedEvents` functions. For example, if you configure your rate-limit to be "2 events per second", but call `SendCustomNetworkEvent` with 2048 bytes of data, then the effective allowed rate will be only 1 event call per second. This is because at 2048 bytes, the single custom network event turns into 2 internal events.

:::

"Parameter Size" refers to the number of bytes your parameter data will be encoded as. This does **not** include internal headers or other overhead outside of your control. A few examples to demonstrate:

```cs
// fits into 1 internal event:
int x = 0; // = 4 bytes, sizeof(int)
Vector3 v = Vector3.zero; // = 12 bytes, sizeof(float) * 3
new string('x', 400); // = 400 bytes, UTF-8 encoded
"うどんは美味しい"; // = 24 bytes, UTF-8 encoded with non-ASCII characters
new char[128]; // = 256 bytes, UTF-16 (following C# spec)
new byte[1024]; // = 1024 bytes

// requires more than 1 internal event:
new byte[1025]; // = 1025 bytes, 2 events sent
new byte[16 * 1024] // = 16384 bytes, 16 events sent, maximum allowed size
new int[512]; // = 2048 bytes, sizeof(int) * 512, 2 events sent

// string[] and VRCUrl[] are special cases:
new string[2] { "test", "foobar" }; // = 18 bytes, 4 + 6 from UTF-8 encoded strings, 8 additional for a length value per array entry ( 2 * sizeof(int) )
```

## Rate Limiting

Network events are **rate-limited** to prevent excessive usage:
- Default rate: **5 events per second**
- Maximum configurable rate: **100 events per second**

To modify the rate limit, use the `[NetworkCallable(maxEventsPerSecond: X)]` attribute. `X` can be any integer between 1 and 100, inclusive range.

In Udon Graph, simply set the desired value in the corresponding input field on the node. Note that for events without parameters, you can set this to 0 to make it a [legacy event](#legacy-events-and-security).

This parameter specifies how quickly events can be sent. It is given in "Events per Second", e.g. a value of 5 means "maximum 5 events per second". **One call to `SendCustomNetworkEvent` may issue multiple events as far as the rate limiting is concerned, see [Event Splitting](#parameter-size-limits-and-event-splitting)!**

All rate-limiting is applied on a best-effort basis, it may not match the configured or specified values exactly based on local performance, network utilization, or server load.

:::warning

This limit exists so you can use it as a safety measure! It is strongly recommended to set this value **as low as you can** to mitigate malicious actors abusing your events to cause issues in your world.

:::

Note that this rate limit is enforced both on the sending client and server-side. In regular use, the server-side is only for protection against malicious users and generally not visible. The local client behaviour is that of queuing, meaning that if too many events are sent in short succession, they will be queued until the rate limit allows them to be sent. There is no limit on the amount of queued messages, so be careful not to send messages too quickly indefinitely as that will cause issues with _all_ Udon networking in your world.

Since events are executed immediately for the local player, there is no rate-limit applied in that case. This means that events may end up in a queue for remote players after already having executed locally.

Lastly, note that there is a global overall limit on outgoing events too, which is currently also approximately 100 events per second. This limit is dynamic and not configurable - it may change at any time, although VRChat will communicate any substantial decrease ahead of the change. This limit applies in the same way as the configurable one where events will be queued.

### Congestion Monitoring

The following functions in `NetworkCalling` are available to help work with rate limits:

| Function | Description |
|----------|-------------|
| `int NetworkCalling.GetQueuedEvents(udonBehaviour, eventName)` | Returns how many events are currently queued for sending. In normal operation, this number will be between 0 and your configured rate limit. If it exceeds your rate limit, you are sending events too quickly and they will be queued until the rate limit allows them to be drained. |
| `int NetworkCalling.GetAllQueuedEvents()` | Returns how many events are queued across your entire world. A number above 0 does not automatically indicate bad network conditions, as events may end up queued for a short duration even under low load. |

You can also use the overall `Networking.IsClogged` property to determine network conditions. This will be affected by excessive event sending.

For example:

```cs
using TMPro;  
using UdonSharp;  
using UnityEngine;  
using VRC.SDK3.UdonNetworkCalling;  
using VRC.Udon.Common.Interfaces;  
  
public class EventQueueExample : UdonSharpBehaviour  
{  
    [SerializeField] private TextMeshProUGUI queueStatus;  
      
    void Update()  
    {  
        queueStatus.text = $"Queue: {NetworkCalling.GetAllQueuedEvents()}";  
        queueStatus.text += $"\nSpecific Event Queue: {NetworkCalling.GetQueuedEvents((IUdonEventReceiver)this, "SomeNetworkEvent")}";  
        queueStatus.text += $"\nClogged: {Networking.IsClogged}";  
    }  
      
    // some network events...  
}  
```

### Mismatched World Versions in the Same Instance

As a very special edge-case, there is one scenario where server-side rate limiting may actively drop events without malicious action. Since rate limits are applied based on every client's _local_ view of the world, if you upload a new version of your world with reduced rate limits and have users in the same instance spread across world versions, a sending client may exceed a receiving client's rate limit expectations. In this case, and _only_ then, the server may silently drop events and not deliver them.

## Accessing the Sender of an Event

The `NetworkCalling` class has some useful properties for working with events:

| Property                                    | Description                                                                                        |
|---------------------------------------------|----------------------------------------------------------------------------------------------------|
| `VRCPlayerApi NetworkCalling.CallingPlayer` | The `VRCPlayerApi` of the player who initiated this network call. `null` if not in a network call. |
| `bool NetworkCalling.InNetworkCall`         | Indicates if the current line is executed as part of a network call. Note that this is only reset once the entry function terminates, i.e. calling a secondary script or different function from your Event entrypoint will keep this state. |

## Legacy Events and Security

`[NetworkCallable]` was introduced in SDK 3.8.1 - Udon used to allow any public method to be called, unless it started with an underscore like `_MethodName`. For backwards compatibility, you can still call any parameter-less public method which doesn't start with an underscore, but it's not recommended. Adding the `[NetworkCallable]` attribute to a method with an underscore _will_ allow it to be called over the network.

In Udon Graph, a custom event node is considered "Legacy" if the `MaxEventsPerSecond` input field is set to 0.

:::warning

To prevent a public method or graph event from ever being called over the network, you should use a name starting with an underscore `_`. This can increase the security of your world or prefab.

:::

### Component Index Targeting

As an extra special note about legacy events, consider the semantics of sending an event to a `GameObject` vs a specific `Component` on an object.

Calling a function marked via `[NetworkCallable]` will make that call use `Component` targeting semantics. This means that even if you have 2 or more `UdonBehaviour`s on a GameObject, only the specified `UdonBehaviour` will receive the event.

The legacy case - meaning sending an event with no parameters to a function _not_ marked with `[NetworkCallable]` - will use `GameObject` semantics. That is, it operates similar to Unity's built-in [`GameObject.SendMessage`](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/GameObject.SendMessage.html) and will call the function on _all_ `UdonBehaviours` on the object containing the behaviour you targeted.

Note that `Component` targeting relies on component indices (order), meaning it is not recommended to use `Destroy` with components on a `GameObject` that uses networked `UdonBehaviour`s. Doing so will result in undefined behaviour.
