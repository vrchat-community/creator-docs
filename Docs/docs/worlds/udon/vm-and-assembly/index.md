# The Udon VM and Udon Assembly

:::info
This page was written by a member of the VRChat community. Thank you for your contribution!
The VRChat team can't guarantee the validity of the information on this page. If you would like to suggest changes, go to the bottom of this page and click "Edit this page."
:::

## Overview of the Udon VM

The Udon VM is a bytecode interpreter designed to run compiled Udon Graph programs.

As such, it's important to keep in mind what it has and doesn't have:

* The Udon VM is expected to be running inside a .NET environment. While reflection is not used to access functions, the Udon VM is 'styled' like it is.
* It doesn't directly implement call/return or subroutines (though `JUMP_INDIRECT` exists and can be used for the purpose).
* It has flow control, via `JUMP`, `JUMP_INDIRECT`, and `JUMP_IF_FALSE`.
* It can call functions from C# (where allowed).
* It doesn't have local variables; only fields on the object.
* It has an integer stack, but this integer stack should be treated as essentially "extra parameters" for opcodes in most cases. It is possible to use it as part of a call/return mechanism, but remember that there are no local variables, so recursive functions must be implemented very carefully.

:::tip

You can export Udon Assembly from Udon Graph and UdonSharp programs.

This can help in getting an idea of how the code you write is compiled, and help you find extern names!

:::

## Udon Types

"Udon Types" are how Udon refers to C# types. 

The easiest way to understand these type names is to start with the corresponding .NET name, such as `System.Int32[]`.

There are various rules in the construction of Udon Types:

* All `.`s and `+`s are removed, i.e. `VRC.SDKBase.VRCPlayerApi+TrackingData` becomes `VRCSDKBaseVRCPlayerApiTrackingData`.
* The type may have `Array` appended, representing `[]`.

As such, the example above is `SystemInt32Array`.

## Udon Assembly

Udon Assembly programs are made up of two sections: The data section, and the code section.

These sections are marked with start/end directives, as so:

```
.data_start
    # Data goes here!
.data_end
.code_start
    # Code goes here, instead!
.code_end
```

### The Data Section

The data section marks the behaviour's variables, and which are exported (public).

Data in these sections is stored in the "Udon Heap", which, despite the name, is in fact a flat array of values with their types. A "heap index" is an index in this array.

An example of defining a variable in Udon Assembly:

```
message: %SystemString, "Hello, world!"
```

Here, the variable's symbol is `message`, the type is `SystemString`, and the contents are `"Hello, world!"`.

Note that the type may be better described as the _initial_ type, as variables can change type at runtime (but probably shouldn't if public).

Values can be `null`, `this`, `true`, `false`, strings, character constants, integers, unsigned integers (integers ending with `u`), and floats, though the assembler is strict about which of these can be specified when.

In particular:

* `SystemSingle` and `SystemDouble` must be numbers or `null`.
* `SystemInt32` and `SystemUInt32` must be integers of either kind or `null`.
* `SystemString` must be a string literal or `null`.
* All other types, including `SystemObject`, can only be `this` or `null`.

`this` does not have its "traditional" meaning per-se. Depending on the type of the variable, it can be:

* `GameObject`: The `GameObject` of the `UdonBehaviour`.
* `Transform`: `GameObject.transform`.
* `UdonBehaviour`, `IUdonBehaviour`, or `Object`: The `UdonBehaviour` itself.

If it is none of these, an error occurs.

:::caution

It is not presently possible to specify a non-null value for `SystemType` in Udon Assembly, but it is possible in Udon Graph and UdonSharp. Similar issues exist for `SystemInt64`, `SystemUInt64`, `SystemSByte`, `SystemByte`, `SystemInt16`, `SystemUInt16`, and `SystemBoolean` (yes, it is impossible to actually _successfully_ specify `true` or `false`).

These are Udon Assembly limitations. They can only be circumvented by not using Udon Assembly.

Floating-point numbers are always read as floats, even if the intended type is a double.

:::

These variables can also be marked as public, using, i.e. `.export message`, and can be marked with sync metadata, i.e. `.sync message, none`.

Marking a variable with sync metadata is equivalent to the `synced` checkbox; see [Networking](../networking#variables) for details.

`none` here is the interpolation mode. The interpolation modes are `none`, `linear`, and `smooth`, though not all interpolation modes are valid for all types.

### The Code Section

The code section is a list of opcodes with labels and possible exports.

```
.export _start
_start:
	PUSH, message
	EXTERN, "UnityEngineDebug.__Log__SystemObject__SystemVoid"
	JUMP, 0xFFFFFFFC
```

`.export _start` (an example; replace `_start` with whatever symbol you're exporting) is used to export code symbols for event handlers.

Standard events start with `_` and have their parameters passed in variables, not public, which you are expected to create; this is a long list, and best explored via Udon Graph.

However, importantly, the first two events that run are `_onEnable` and `_start`, in that order. There is no gap between them in this initial run, and these will always run before any other event; if something attempts to bypass that, the invocation will be ignored. See [Event Execution Order](../event-execution-order) for more details.

Custom events never take parameters (outside of whatever mechanism you define), and don't start with `_`.

The actual opcodes are reasonably simple. There is the opcode name, and then for some opcodes, a parameter. This parameter can be an integer, a symbol (integer value of that symbol, i.e. heap index or code address), or a string. When it is a string, the assembler will create a hidden, unnamed variable for that string, and the actual value will be the heap index.

:::caution

For some reason, defining two code symbols that point to the same position is not allowed, causing an `Address aliasing detected` error.

:::

## Udon Opcodes

### `NOP`

* Opcode: 0
* Parameters: 0

This opcode does nothing. There is generally no reason to use this, unless you get the `Address aliasing detected:` error.

### `PUSH, parameter`

* Opcode: 1
* Parameters: 1

This opcode pushes an integer to the top of the stack.

Udon Assembly may give the impression that a value is being pushed; this is not the case.

In these cases, it is the heap address that is being pushed.

Unless you are very dedicated to size-optimizing your Udon programs (even at the expense of runtime speed in some cases), or trying to obfuscate, there is never any reason to use this in a conditional fashion. Simply push everything immediately before `EXTERN`, `COPY` or `JUMP_IF_FALSE`.

### `POP`

* Opcode: 2
* Parameters: 0

This opcode removes the top integer from the stack, with no further effects.

### `JUMP_IF_FALSE, parameter`

* Opcode: 4
* Parameters: 1

Pops a heap index from the stack and reads a `SystemBoolean` from it.

If this value is `false`, jumps to the parameter as a bytecode position. Otherwise, continues to the next instruction.

### `JUMP, parameter`

* Opcode: 5
* Parameters: 1

Jumps to the bytecode position given by the parameter.

`JUMP, 0xFFFFFFFC` is also used to end execution (i.e. return from Udon code).

### `EXTERN, parameter`

* Opcode: 6
* Parameters: 1

This opcode is how Udon performs any useful operation whatsoever.

The first thing to note is that the parameter is a heap index, initially containing the extern name (as a string), _but this is also written to._

As an optimization, Udon caches information about the extern after it is first run in the given heap index. These values are still heap values and can be copied.

The parameters to the extern are given in `PUSH` order; that is, the first value pushed is the first argument. 

These heap values are read for normal (i.e. `in`) arguments, read and written for `ref` arguments, and written for `out` arguments.

If the extern is not static (i.e. if it has a `this` argument), the `this` argument is added at the start. If there is a return value (i.e. the return type is not `SystemVoid`), it is treated like an `out` argument at the end.

### `ANNOTATION, parameter`

* Opcode: 7
* Parameters: 1

This is effectively a "long NOP". The parameter is ignored.

### `JUMP_INDIRECT, parameter`

* Opcode: 8
* Parameters: 1

Gets a heap index from the parameter and reads a `SystemUInt32` from it.

Interprets this as a bytecode position and jumps to it.

### `COPY`

* Opcode: 9
* Parameters: 0

Pops two heap indexes. The value from the second heap index popped (aka the first heap index pushed) is copied to the first heap index popped (aka the second heap index pushed).

## Externs Reference

:::caution

Relying on the exact format of extern signatures is less than advisable, outside of relying on specific externs that are already known to exist.

The format can be weird at the best of times and inferring attributes such as 'is this a static method' from a signature is impossible, not to mention the specifics of generics.

If you are trying to make something which relies on total knowledge of the API, you will likely need to write C# code to scrape the list of Udon Graph nodes.

:::

Externs have the form `SomeUdonTypeName.SomeSignature`. (There is one case where the Udon type name is "falsified", that being `VRCInstantiate`.)

Here, the example will be `SystemDateTimeOffset.__TryParseExact__SystemString_SystemStringArray_SystemIFormatProvider_SystemGlobalizationDateTimeStyles_SystemDateTimeOffsetRef__SystemBoolean`.

This is `System.DateTimeOffset.TryParseExact(string, string[], System.IFormatProvider, System.Globalization.DateTimeStyles, out System.DateTimeOffset)`. This is a static method. It is worth noting that if it was not a static method, the 'this' parameter would still not be marked in the signature.

The signature itself always starts with `__`, followed by the function name, followed by `__`. The function name is `ctor` for constructors; here it is `TryParseExact`.

Each non-`this` parameter then follows as its Udon type name, separated by `_`. There is a special modifier to the Udon type name in the case of `ref` and `out` parameters, that being the `Ref` suffix.

Finally, the signature ends with `__` followed by the Udon type name of the returned type.

There are some particularly weird cases:

* Generics list their type parameters as "Udon types" such as `T` in their signature, and have invisible `SystemType` parameters.
* `VRCUdonUdonBehaviour` becomes `VRCUdonCommonInterfacesIUdonEventReceiver`. (`Array` is still appended if relevant, etc.)

_There is presently no complete reference of externs._

However:

* [The UdonSharp documentation has an API reference for the VRChat methods.](https://udonsharp.docs.vrchat.com/vrchat-api)
* UdonSharp provides a way to explore what's available, using the [Class Exposure Tree](https://udonsharp.docs.vrchat.com/class-exposure-tree).

:::caution

The ability to copy member names in the UdonSharp Class Exposure Tree is broken at this time. This is a good way to quickly scout what's available, but you'll still need to actually get the extern name using Udon Graph.

:::