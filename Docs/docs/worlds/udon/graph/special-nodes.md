# Special Nodes

The "Special" category contains nodes for custom variables, custom events, flow control, and communicating with other UdonBehaviours.

### Block
Splits flow into multiple sections. One flow input, multiple flow output. Executes all right-side flow slots from top to bottom.

### Branch
Inputs: `Bool` - `System.Boolean`

Branches execution based on a conditional evaluation. If `Bool` is True, `True` flow path is executed. If `Bool` is False, `False` flow path is executed.

### Comment
Provides a space for the user to type a comment string. This string is not included during compilation.

### Const Null
Provides a "null" value for nullchecking purposes.

### Const This
Provides a reference to the GameObject that the UdonBehavior is a component of.

### Event Custom
Inputs: `name` - `System.String`

A a custom event that can be executed by [UdonBehaviour nodes](#udonbehaviour-nodes). 

You must name the custom event by typing its name in the Graph. The event name cannot be changed while your program is running.

### For
Inputs: `start`, `end`, `step` - `System.Int32`

Outputs: `index` - `System.Int32`

Executes flow by using a counter. A counter is initalized with the value of `start`. The `Body` flow is executed, and then the counter is incremented by the `step` value. This continues until the counter's value is greater than `end`. Once that has occured, flow continues along on the `Exit` flow.

### Get Variable
Inputs: `name` - `System.String`

Outputs: `System.Object`

Gets the Udon variable named `name` and provides it as output.

### Set Variable
Inputs: `name` - `System.String` `value` - `System.Object` `sendChange` - `Boolean`

Sets the Udon variable named `name` to `value` when flow is executed. If `sendChange` is checked, it will also trigger the OnVariableChanged event for that variable.

### Get Program Variable
Inputs: `instance` - `UdonBehaviour` `symbolName` - `string`

Get the value of an Udon variable `symbolName` from another UdonBehaviour `instance`. Works best if the target UdonBehaviour is a public variable and it's wired up in the Inspector, which allows you to choose the target variable name from a dropdown. If there's no UdonBehaviour connected to instance, it will use the current UdonBehaviour's variable names. If you instead know the name of the variable and want to set it directly, use a `String const` node to write it in by hand.

### Set Program Variable
Inputs: `instance` - `UdonBehaviour` `symbolName` - `string` `value` - `Object`

Sets the value of an Udon variable `symbolName` on another UdonBehaviour `instance` to `value`. Works best if the target UdonBehaviour is a public variable and it's wired up in the Inspector, which allows you to choose the target variable name from a dropdown. If there's no UdonBehaviour connected to instance, it will use the current UdonBehaviour's variable names. If you instead know the name of the variable and want to set it directly, use a `String const` node to write it in by hand. This node will also trigger the OnVariableChanged event for the target variable.

### On Variable Changed
Outputs: `newValue` `oldValue`

Triggers whenever SetProgramVariable is called on the target variable, or when Set Variable is called with `sendChange` checked. Works for synced variables, too!

### While
Inputs: `Bool` - `System.Boolean`

Executes the flow of `Body` while `Bool` is true. If `Bool` is false, executes `Exit` flow.

## UdonBehaviour Nodes
Udonbehaviour nodes allow your programs to interact with other UdonBehaviours - either locally, with a delay, or over the network.

:::note UdonSharp

The nodes below only work for `public` events. If you use the Udon Graph, your custom events are always `public`. If you use UdonSharp, make sure to use `public` instead of `private` events here!

:::

### SendCustomEvent
Inputs: `instance` - `UdonBehaviour`, `eventName` - String

Runs the event 'eventName' on the target UdonBehaviour. If `instance` is left blank, it points to one of its own events.

### SendCustomEventDelayedFrames
Inputs: `instance` - `UdonBehaviour`, `eventName` - String, `delayFrames` - int, `eventTiming` - EventTiming

Runs the event `eventName` on the target UdonBehaviour, after waiting for `delayFrames`. It will run the event during Update or LateUpdate, depending on which `eventTiming` is selected. Minimum of 1 frame delay.

:::note Timing issues

Note that [Unity's frame count](https://docs.unity3d.com/ScriptReference/Time-frameCount.html) is based on the Update event. If you call SendCustomEventDelayedFrames [before the Update event](/worlds/udon/event-execution-order), such as [Start](https://docs.unity3d.com/ScriptReference/MonoBehaviour.Start.html) or an [Input event](/worlds/udon/input-events), the delay may be 1 frame shorter than expected.

:::

### SendCustomEventDelayedSeconds
Inputs: `instance` - `UdonBehaviour`, `eventName` - String, `delaySeconds` - float, `eventTiming` - EventTiming

Runs the event 'eventName' on the target UdonBehaviour, after waiting for `delaySeconds`. It will run the event during Update or LateUpdate, depending on which `eventTiming` is selected.

If `delaySeconds` is zero, the event will be executed in the same frame *or* the next frame (see [SendCustomEventDelayedFrames](/worlds/udon/graph/special-nodes#sendcustomeventdelayedframes) above).

### SendCustomNetworkEvent
Inputs: `instance` - `UdonBehaviour`, `target` - NetworkEventTarget, `eventName` - String

Runs the event `eventName` on the target UdonBehaviour - either on the Owner of the target if 'Owner' is selected as the target, or on Everyone in the instance if 'all' is selected.

:::note Local only events

If the name of the event starts with an underscore (`_YourEventName`), it is considered a [local-only event](/worlds/udon/networking/#local-only-events) and will **not** be executed.

:::