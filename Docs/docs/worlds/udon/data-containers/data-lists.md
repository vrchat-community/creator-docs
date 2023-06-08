---
title: "Data Lists"
slug: "data-lists"
hidden: false
createdAt: "2023-04-24T23:48:11.427Z"
updatedAt: "2023-04-26T15:18:56.307Z"
---
# Data Lists

Data Lists store [Data Tokens](/worlds/udon/data-containers/data-tokens) by index, similarly to [C# Lists](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.list-1?view=net-7.0). Most Data List functions are just wrappers for the underlying C# list, so the C# list documentation also applies if you are looking for more specific details.

Data Lists can be serialized to/from JSON strings using [VRCJSON](/worlds/udon/data-containers/vrcjson). This is the current recommended method of syncing Data Lists over the network.

## Properties

| Property | Result                                                                                                                                                                                 |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Capacity | Set or get the capacity of the list. See [C# documentation](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.list-1.capacity?view=net-8.0) for further details. |
| Count    | Get the number of elements in the list                                                                                                                                                 |

## Functions

| Function        | Input                                      | Output                         | Result                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| --------------- | ------------------------------------------ | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Add             | DataToken                                  |                                | Adds a token at the end of the list                                                                                                                                                                                                                                                                                                                                                                                                           |
| AddRange \*     | DataList                                   |                                | Adds the values of another Data List at the end of this Data List.                                                                                                                                                                                                                                                                                                                                                                            |
| BinarySearch    | DataToken value                            | int index                      | Uses a binary search algorithm to locate a specific element in the List by comparison. **In order to perform a binary search, the list must be sorted**. See [C# documentation](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.list-1.binarysearch?view=net-8.0) for further details on binary search.                                                                                                               |
| BinarySearch    | DataToken value, int startIndex, int count | int index                      | Performs a binary search within the specified range, starting at the provided index and extending toward the end of the list by the provided count. Note that this function searches by comparison, and will compare dictionaries and lists by count rather than contents. This makes it unsuitable for finding a specific dictionary or list within a list.                                                                                  |
| Clear           |                                            |                                | Removes all values from this list.                                                                                                                                                                                                                                                                                                                                                                                                            |
| Contains        | DataToken value                            | bool result                    | Returns true if the Data List contains the specified value.                                                                                                                                                                                                                                                                                                                                                                                   |
| DeepClone \*    |                                            | DataList result                | Clones the DataList into a new DataList that contains all the same values. This does do a deep clone, which means that it will recursively navigate inside each DataList or DataDictionary and copy their contents as well. However, it will not look inside other structures such as arrays, and those will still have the same reference to the original.                                                                                   |
| GetRange        | int index, int count                       | DataList output                | Copies a segment of the DataList out to another DataList. Returns false if index or count were out of range.                                                                                                                                                                                                                                                                                                                                  |
| IndexOf \*      | DataToken item                             | int index                      | Searches for the specified object and returns the zero-based index of the first occurrence within the entire DataList. If not found, returns -1.                                                                                                                                                                                                                                                                                              |
| IndexOf \*      | DataToken item, int startIndex             | int index                      | Searches for the specified object and returns the zero-based index of the first occurrence within the range of elements in the DataList that extends from the specified index to the last element. If not found, returns -1.                                                                                                                                                                                                                  |
| IndexOf \*      | DataToken item, int startIndex, int count  | int index                      | Searches for the specified object and returns the zero-based index of the first occurrence within the range of elements in the DataList that starts at the specified index and contains the specified number of elements. If not found, returns -1.                                                                                                                                                                                           |
| Insert          | int index, DataToken input                 | bool success                   | Inserts a token into the middle of the list. All entries above the specified index will be shifted up one. Returns false if index was out of range.                                                                                                                                                                                                                                                                                           |
| InsertRange     | int index, DataList input                  |                                | Inserts a DataList into the middle of the DataList. All entries above the specified index will be shifted up. Returns false if index was out of range.                                                                                                                                                                                                                                                                                        |
| LastIndexOf \*  | DataToken item                             | int index                      | Searches for the specified object and returns the zero-based index of the last occurrence within the DataList. If not found, returns -1.                                                                                                                                                                                                                                                                                                      |
| LastIndexOf \*  | DataToken item, int startIndex             | int index                      | Searches for the specified object and returns the zero-based index of the last occurrence within the range of elements in the DataList that extends from the first element to the specified index. If not found, returns -1.                                                                                                                                                                                                                  |
| LastIndexOf \*  | DataToken item, int startIndex, int count  | int index                      | Searches for the specified object and returns the zero-based index of the last occurrence within the range of elements in the DataList that contains the specified number of elements and ends at the specified index. If not found, returns -1.                                                                                                                                                                                              |
| Remove \*       | DataToken value                            | bool success                   | Removes the first occurrence of the specified value. Returns true if a matching value was found, returns false if not.                                                                                                                                                                                                                                                                                                                        |
| RemoveAll \*    | DataToken value                            | bool success                   | Removes all occurrences of the specified value. Returns true if any matching values were found, returns false if not.                                                                                                                                                                                                                                                                                                                         |
| RemoveAt        | int index                                  |                                | Removes the element at the specified index.                                                                                                                                                                                                                                                                                                                                                                                                   |
| RemoveRange     | int index, int count                       |                                | Removes a range of elements from the list.                                                                                                                                                                                                                                                                                                                                                                                                    |
| Reverse         |                                            |                                | Reverses the order of all elements in the list.                                                                                                                                                                                                                                                                                                                                                                                               |
| Reverse         | int index, int count                       |                                | Reverses the order of elements within the range specified, starting at the provided index and extending toward the end of the list by the provided count.                                                                                                                                                                                                                                                                                     |
| SetValue        | int index, DataToken input                 |                                | Sets a DataToken at the specified index.                                                                                                                                                                                                                                                                                                                                                                                                      |
| ShallowClone \* |                                            | DataList result                | Clones the DataList into a new DataList that contains all the same values. This does not do a deep clone, which means that if the DataList contains references to other Data Containers, those will still be the same reference.                                                                                                                                                                                                              |
| Sort \*         |                                            |                                | Sorts all the elements in the list. If all elements are the same type, then they will be sorted by that type's native comparison operation. If a DataList contains multiple different types but those types are all numbers, then it will sort them with a numeric conversion. If a DataList contains multiple different non-numeric types, then it will sort them in this order: `Null, Number, String, DataList, DataDictionary, Reference` |
| Sort \*         | int index, int count                       |                                | Performs the same operation as Sort but only within the range specified, starting at the provided index and extending toward the end of the list by the provided count.                                                                                                                                                                                                                                                                       |
| ToArray         |                                            | DataToken\[] output            | Converts the DataList into a DataToken array                                                                                                                                                                                                                                                                                                                                                                                                  |
| TrimExcess      |                                            |                                | Sets the capacity to the actual number of elements in the DataList, if that number is less than a threshold value.                                                                                                                                                                                                                                                                                                                            |
| TryGetValue     | int index                                  | DataToken output               | Gets a token from the specified index and puts it in the `out DataToken`. Returns true if successful.                                                                                                                                                                                                                                                                                                                                         |
| TryGetValue     | int index, TokenType expected              | bool success, DataToken output | Gets a token from the specified index and puts it in the `out DataToken`. Returns true if successful. This version of `TryGetValue` includes a TokenType, which means it will do an automatic type check for you. If the type does not match, it will return false with `DataError.TypeMismatch`                                                                                                                                              |

\* Note that calling functions which affect or look at all values such as `Contains`, `IndexOf`, and `LastIndexOf` on a Data List generated from Json will parse all top-level values that have not already been parsed, which may be expensive with many values. Once they are parsed, future operations will be cheaper.

## Getting a value from a DataList

There are several different ways to get a value out of a DataList. Each one has it's own use case, and it is up to you to choose which one you want to use.

- [TryGetValue](/worlds/udon/data-containers/data-lists#trygetvalue)
- [TryGetValue with TokenType](/worlds/udon/data-containers/data-lists#trygetvalue-with-tokentype)
- [Shorthand bracket syntax](/worlds/udon/data-containers/data-lists#shorthand-bracket-syntax)

### TryGetValue

If you want to get a value out of a list safely, it is recommended to use `TryGetValue`. This is a function that returns true or false depending on whether or not getting the value was successful. It is intended to put this inside of the conditions for an `if` or a `branch` so that it is clear what happens when it succeeds and what happens when it fails.

```csharp title="Example of TryGetValue"
if (list.TryGetValue(0, out DataToken value))
{
    Debug.Log($"Success! {value}");
}
else
{
    Debug.Log("Failed! {value}");
}

```

If this does fail, the DataToken you receive is still valid, but rather than containing your data it will contain an [error](/worlds/udon/data-containers/data-tokens#errors).

This method is good for when you want to get some value from some location, but you don't care what it is exactly.

As this function does not have a type check built in, you should pair this function with some form of type checking, whether that be an `if`, `branch`, or `switch`. If you only care about one specific type, then it is recommended to just use the version of TryGetValue with TokenType, which does an automatic type check.

### TryGetValue with TokenType

If you want to get a value from a list and you don't know what type it could be, it is important to do type checks. You could do that yourself in your own code, but that can get messy. Instead, you can use the version of TryGetValue that includes a TokenType. When you do this, it indicates that you only want to retrieve the value if it is the type you expect. Otherwise, it returns false and that can be handled gracefully. 

This method is good for when you want to get a specific value from a specific location, but the data is coming from an outside source so you are not confident that the source has the right data.

```csharp title="Example of TryGetValue with TokenType"
// You could do it this way, but it's a bit ugly
if (list.TryGetValue(0, out DataToken value)) {
    if (value.TokenType == TokenType.DataDictionary)
    {
        Debug.Log($"Success! Matching dictionary has {value.DataDictionary.Count} items");
    }
}

// This approach has a type check built in! It's functionally the same, but streamlined.
if (list.TryGetValue(0, TokenType.DataDictionary, out value)) {
    Debug.Log($"Success! Matching dictionary has {value.DataDictionary.Count} items");
}
```

### Shorthand Bracket syntax

You can also set and get items from a DataList using bracket syntax such as `list[5] = "value";` in UdonSharp or `DataList Get Item` node in Udon graph. This method is smaller and easier to use. However, be aware that this is not completely safe and may halt your udonbehaviour if you attempt to perform an invalid operation. You should only use this if you have complete control over the data and can guarantee that it exists and is the type you expect. Otherwise, it is recommended to use some form of `TryGetValue`.

```csharp title="Example of Shorthand Bracket syntax"
list[0] = 5;
list[1] = 10;

// This makes the assumption that index 0 and 1 will always contain integers.
// This is a safe assumption to make since we set them just above in a controlled environment.
// If the data is coming from an external source, we shouldn't make these assumptions!
int sum = list[0].Int + list[1].Int;
```

## Initializing A Data List

In Udonsharp, Data Lists can be initialized in private variables. This allows you to have a pre-existing set of data that is defined before your code runs. This also supports nested dictionaries and anything else that DataTokens support. Here is an example of how you should use this syntax:

```csharp title="Example of initializing a Data List"
private DataList _groceries = new DataList()
{
    "Bananas",
    "Grapes",
    "Milk",
    "Soda",
    "Turkey",
    "Ham",
    "Roast Beef"
}
```

At the moment, Udonsharp does not support initializers of this type inside a function. This would be a feature request for Udonsharp.

At the moment, Unity does not serialize DataLists, which means that **this is not recommended for serialized public variables.** It should be used for `private` or `[NonSerialized] public` variables only. This is an addition to the feature that we are still working on.

## Syncing a Data List with other players over the network

Data Lists cannot be directly synced. However, they can be serialized to/from JSON strings using [VRCJson](/worlds/udon/data-containers/vrcjson). This is the current recommended method of syncing Data Lists with UdonSync.

One way to do this is to use OnPreSerialization and OnDeserialization to Serialize and Deserialize the json string. Using this method, you won't need to worry about the serialization within the rest of your code, and you can simply set values and forget.

```csharp title="Example of syncing a Data List with other players over the network"
[UdonSynced]
private string _json;
private DataList _list;

public override void OnPreSerialization()
{
    if (VRCJson.TrySerializeToJson(_list, JsonExportType.Minify, out DataToken result))
    {
        _json = result.String;
    }
    else
    {
        Debug.LogError(result.ToString());
    }
}

public override void OnDeserialization()
{
    if(VRCJson.TryDeserializeFromJson(_json, out DataToken result))
    {
        _list = result.DataList;
    }
    else
    {
        Debug.LogError(result.ToString());
    }
}
```

## FAQ

### Why not have a ToArray for each type?

It would be desirable to have a ToArray method for each data type. However, this is not currently feasible due to the lack of support for generics within Udon. While it is technically possible to create individual methods such as ToStringArray, ToFloatArray, ToDoubleArray, and others, this approach would result in excessive bloat to cover every possible type. Additionally, these methods would become deprecated once Udon 2 introduces support for generics. Furthermore, the basic ToArray methods would not provide significant added value. The real advantage would arise from the ability to execute ToArray on an object type, such as ToArray(typeof(Collider)), which would eliminate the need for casting. Nevertheless, supporting a ToArray of all possible objects is not practical, and supporting a ToArray of object specifically would be even worse than working with tokens.

Despite the fact that retrieving values from DataTokens can be a somewhat cumbersome process, they are specifically designed for this purpose and have several utilities to assist with this task.

### Arrays are similar, what's the difference?

Arrays are a similar structure, used for storing lots of values in a sequential order, accessed by index. They are also very simple, and highly efficient at doing _exactly_ that and nothing else. DataLists are a more complex type that can do a lot more. For example, an array has to be initialized with a specific length when it is first created, and you cannot add more items to it unless you create a new array to replace it. But don't be fooled - there are still good reasons to use an array instead of a list.

### When should I use a DataList instead of an array?

Picking a DataList over an array should be done when there is a particular feature you need, so not everything needs to be switched.

- When you want to add new items or remove items to the container dynamically. Arrays cannot do this.
- When you want a single container to contain multiple different types at the same time. Arrays cannot do this.
- When you want a container to contain containers arbitrarily. Arrays can do this, but they have to have a strict depth defined. DataLists can be nested arbitrarily deep however you want.

### When should I use an array instead of a DataList?

- When performance is critical, such as iterating over a container every frame. DataLists may have a very small amount of performance overhead due to pulling the value out of the token.
- When you want to sync the container over the network. DataLists technically support this through JSON if there is a reason you absolutely need a DataList, but that is going to be much more expensive on both performance and bandwidth than normal array syncing.
- When your container only needs to contain one specific type. DataLists can do this of course, but they bypass the strict typing nature of C#. This means that your code editor will be unable to know exactly what type the container contains, and this may allow you to write bugs that would have otherwise been compile errors.
- When you want to contain a type that is not directly supported by Data Tokens. Data Tokens can contain any type through the use of object references and boxing, but it's not ideal. You need to pull the reference out _and_ cast it to your desired type.