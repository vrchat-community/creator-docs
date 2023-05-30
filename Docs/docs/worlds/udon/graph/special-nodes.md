---
title: "Special Nodes"
slug: "special-nodes"
hidden: false
createdAt: "2020-03-20T20:08:24.110Z"
updatedAt: "2021-09-13T22:30:33.143Z"
---
These are "Special" nodes. This includes flow control and special Udon features.

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
Recieves a custom event. Custom event name must be typed, cannot be provided via node input.

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
UdonBehaviours have a few special nodes:

### SendCustomEvent
Inputs: `instance` - `UdonBehaviour`, `eventName` - String
Runs the event 'eventName' on the target UdonBehaviour. If instance is left blank, it points to one of its own events.

### SendCustomEventDelayedFrames
Inputs: `instance` - `UdonBehaviour`, `eventName` - String, `delayFrames` - int, `eventTiming` - EventTiming
Runs the event 'eventName' on the target UdonBehaviour, after waiting for `delayFrames`. It will run the event during Update or LateUpdate, depending on which `eventTiming` is selected. Minimum of 1 frame delay.

### SendCustomEventDelayedSeconds
Inputs: `instance` - `UdonBehaviour`, `eventName` - String, `delaySeconds` - float, `eventTiming` - EventTiming
Runs the event 'eventName' on the target UdonBehaviour, after waiting for `delaySeconds`. It will run the event during Update or LateUpdate, depending on which `eventTiming` is selected.

### SendCustomNetworkEvent
Inputs: `instance` - `UdonBehaviour`, `target` - NetworkEventTarget, `eventName` - String
Runs the event 'eventName' on the target UdonBehaviour - either on the Owner of the target if 'Owner' is selected as the target, or on Everyone in the instance if 'all' is selected.