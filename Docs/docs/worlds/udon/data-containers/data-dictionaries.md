---
title: "Data Dictionaries"
slug: "data-dictionaries"
hidden: false
createdAt: "2023-04-24T23:48:21.052Z"
updatedAt: "2023-05-04T21:39:11.809Z"
---
# Data Dictionaries

Data Dictionaries store [Data Tokens](/worlds/udon/data-containers/data-tokens) by key-value pair, similarly to [C# Dictionaries](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.dictionary-2?view=net-7.0). Most Data Dictionary functions are just wrappers for the underlying C# dictionary, so the C# dictionary documentation also applies if you are looking for more specific details.

Both the keys and the values of a Data Dictionary are Data Tokens. This means that you can effectively use anything for your keys. However, if you intend to serialize to [VRCJSON](/worlds/udon/data-containers/vrcjson), only string keys are supported.

## Properties

| Property | Result                                       |
| -------- | -------------------------------------------- |
| Count    | Get the number of elements in the dictionary |

## Functions

| Function         | Input                             | Output                         | Result                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ---------------- | --------------------------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Add              | DataToken key, DataToken value    |                                | Adds the value at the specified key. The entire purpose of this function that sets it apart from SetValue is that an exception will be thrown if the key already exists. This is useful for initialization because it will cause a compile error, but it's not recommended for normal usage where it could cause a runtime error and halt your UdonBehaviour.                                                                         |
| Clear            |                                   |                                | Removes all keys and values from this dictionary                                                                                                                                                                                                                                                                                                                                                                                       |
| ContainsKey      | DataToken key                     | bool result                    | Returns true if the specified key exists on this dictionary.                                                                                                                                                                                                                                                                                                                                                                           |
| ContainsValue \* | DataToken key                     | bool result                    | Returns true if the specified value exists on this dictionary.                                                                                                                                                                                                                                                                                                                                                                         |
| DeepClone \*     |                                   | DataDictionary result          | Clones the DataDictionary into a new DataDictionary that contains all the same values. Unlike ShallowClone, deep clone means that it will recursively navigate inside each DataList or DataDictionary and copy their contents as well. Items with the TokenType "Reference" will maintain the same reference as the original and not be deep cloned, which includes arrays.                                                            |
| GetKeys          |                                   | DataList keys                  | Returns a [Data List](/worlds/udon/data-containers/data-lists) of all keys that exist in this Data Dictionary. **Use this to iterate over all items in a Data Dictionary in a for loop.**                                                                                                                                                                                                                                    |
| GetValues \*     |                                   | DataList values                | Returns a [Data List](/worlds/udon/data-containers/data-lists) of all values that exist in this Data Dictionary.                                                                                                                                                                                                                                                                                                             |
| Remove           | DataToken key                     | bool success                   | Removes a specific key from this dictionary. Returns true if anything was successfully removed.                                                                                                                                                                                                                                                                                                                                        |
| Remove           | DataToken key                     | bool success, DataToken value  | Removes a specific key from this dictionary. Returns true if anything was successfully removed. If successful, copies the value that was removed into the `out DataToken`.                                                                                                                                                                                                                                                             |
| SetValue         | DataToken key, DataToken value    |                                | Sets the value at the specified key. If that key does not exist, a new one will be added.                                                                                                                                                                                                                                                                                                                                              |
| ShallowClone \*  |                                   | DataDictionary result          | Clones the DataDictionary into a new DataDictionary that contains all the same values. Unlike DeepClone, this means that if the DataDictionary contains other DataLists and DataDictionaries, those will still be the same reference.                                                                                                                                                                                                  |
| TryGetValue      | DataToken key                     | bool success, DataToken output | Gets a token from the specified key and puts it in the `out DataToken`. Returns true if the retrieval was successful, and false if it was not. Failing to retrieve a value will put a DataError in the `out DataToken` instead of a result.                                                                                                                                                                                            |
| TryGetValue      | DataToken key, TokenType expected | bool success, DataToken output | Gets a token from the specified key and puts it in the `out DataToken`. Returns true if the retrieval was successful, and false if it was not. Failing to retrieve a value will put a DataError in the `out DataToken` instead of a result. This version of `TryGetValue` includes a TokenType, which means it will do an automatic type check for you. If the type does not match, it will return false with `DataError.TypeMismatch` |

\* Note that calling functions which affect or look at all values such as `ContainsValue`, `ShallowClone`, and `GetValues` on a Data Dictionary generated from Json will parse all top-level values that have not already been parsed, which may be expensive with many values. Once they are parsed, future operations will be cheaper.

## Getting a value from a DataDictionary

There are several different ways to get a value out of a dictionary. Each one has it's own use case, and it is up to you to choose which one you want to use.

- [TryGetValue](/worlds/udon/data-containers/data-dictionaries#trygetvalue)
- [TryGetValue with TokenType](/worlds/udon/data-containers/data-dictionaries#trygetvalue-with-tokentype)
- [Shorthand bracket syntax](/worlds/udon/data-containers/data-dictionaries#shorthand-bracket-syntax)

### TryGetValue

If you want to get a value out of a dictionary safely, but you don't care what type exists at that location, it is recommended to use `TryGetValue`. This is a function that returns true or false depending on whether or not getting the value was successful. It is intended to put this inside of the conditions for an `if` or a `branch` so that it is clear what happens when it succeeds and what happens when it fails.

```csharp title="Example of TryGetValue"
if (dictionary.TryGetValue("key", out DataToken value)) {
    Debug.Log($"Success! {value}");
} else {
    Debug.Log($"Failed! {value}");
}
```

If this does fail, the DataToken you receive is still valid, but rather than containing your data it will contain an [error](/worlds/udon/data-containers/data-tokens#errors).

This method is good for when you want to get some value from some location, but you don't care what it is exactly.

As this function does not have a type check built in, you should pair this function with some form of type checking, whether that be an `if`, `branch`, or `switch`. If you only care about one specific type, then it is recommended to just use the version of TryGetValue with TokenType, which does an automatic type check.

### TryGetValue with TokenType

If you want to get a value from a dictionary and you don't know what type it could be, it is important to do type checks. You could do that yourself in your own code, but that can get messy. Instead, you can use the version of TryGetValue that includes a TokenType. When you do this, it indicates that you only want to retrieve the value if it is the type you expect. Otherwise, it returns false and that can be handled gracefully. 

This method is good for when you want to get a specific value from a specific location, but the data is coming from an outside source so you are not confident that the source has the right data.

```csharp title="Example of TryGetValue with TokenType"
// You could do it this way, but it's a bit ugly
if (dictionary.TryGetValue("key", out DataToken value)) {
    if (value.TokenType == TokenType.DataDictionary)
    {
        Debug.Log($"Success! Matching dictionary has {value.DataDictionary.Count} items");
    }
}

// This approach has a type check built in! It's functionally the same, but streamlined.
if (dictionary.TryGetValue("key", TokenType.DataDictionary, out value)) {
    Debug.Log($"Success! Matching dictionary has {value.DataDictionary.Count} items");
}
```

### Shorthand Bracket syntax

You can also set and get items from a Data Dictionary using bracket syntax such as `dictionary["key"] = "value";` in UdonSharp or `DataDictionary Get Item` node in Udon graph. This method is smaller and easier to use. However, be aware that this is not completely safe and may halt your udonbehaviour if you attempt to perform an invalid operation such as trying to get a value from a key that does not exist. 

This method is good for when you have complete control over your data, can guarantee that it exists, and that it is the type you expect. Otherwise, it is recommended to use some form of `TryGetValue`.

```csharp title="Example of Shorthand Bracket syntax"
dictionary["A"] = 5;
dictionary["B"] = 10;

// This makes the assumption that A and B will always contain integers.
// This is a safe assumption to make since we set them just above in a controlled environment.
// If the data is coming from an external source, we shouldn't make these assumptions!
int sum = dictionary["A"].Int + dictionary["B"].Int;
```

## Initializing a Data Dictionary

In Udonsharp, Data Dictionaries can be initialized in private variables. This allows you to have a pre-existing set of data that is defined before your code runs. This also supports nested dictionaries and anything else that DataTokens support. Here is an example of how you should use this syntax:

```csharp title="Example of initializing a Data Dictionary"
private DataDictionary users = new DataDictionary()
    {
        { "John Doe", new DataDictionary()
            {
                {"email", "johndoe@example.com"},
                {"age", 35},
                {"address", new DataDictionary()
                    {
                        {"street", "123 Main St"},
                        {"city", "Anytown"},
                        {"state", "CA"},
                        {"zip", 12345}
                    }
                }
            }
        },
        { "Jane Smith", new DataDictionary()
            {
                {"email", "janesmith@example.com"},
                {"age", 28},
                {"address", new DataDictionary()
                    {
                        {"street", "456 Elm St"},
                        {"city", "Anytown"},
                        {"state", "CA"},
                        {"zip", 12345}
                    }
                }
            }
        },
        { "Bob Johnson", new DataDictionary()
            {
                {"email", "bobjohnson@example.com"},
                {"age", 42},
                {"address", new DataDictionary()
                    {
                        {"street", "789 Oak St"},
                        {"city", "Anytown"},
                        {"state", "CA"},
                        {"zip", 12345}
                    }
                }
            }
        }
    };
```

At the moment, Udonsharp does not support initializers of this type inside a function. This would be a feature request for Udonsharp.

At the moment, Unity does not serialize DataDictionaries, which means that **this is not recommended for serialized public variables.** It should be used for `private` or `[NonSerialized] public` variables only. This is an addition to the feature that we are still working on.

## Iterating over all entries in a dictionary

Iterating over all the entries in a dictionary is a bit different from a list because a dictionary is not ordered. You can't index directly into a dictionary, you must use a key. To do this, we have the `GetKeys()` function. This function gives you a DataList of all the keys in a dictionary. Once you have that, you can use a for loop to iterate over all the keys and access the value at each key.

```csharp title="Example of iterating over all entries in a dictionary"
// First get all the keys in the dictionary
DataList keys = dictionary.GetKeys();

// For loop over all the keys
for (int i = 0; i < keys.Count; i++)
{
    // Get the key at the current index
    DataToken key = keys[i];
    
    // Access the entry connected to that key
    Debug.Log(dictionary[key].ToString());
}
```

GetKeys may appear to be expensive at first glance, but it is cached so long as a key is not added or removed so it is generally performant to access frequently, aside from the overhead of Udon itself.

If you need to iterate over a dictionary in a sorted manner, a neat trick you can do thanks to this method is to `GetKeys()` then `Sort()` the keys, then go through the for loop. The dictionary itself doesn't have any context of ordering and cannot be sorted, but you can sort the list that you use to access it!

If you want to work with the values of the dictionary separately from the keys, you can also use `GetValues()`. This can be useful for some applications where you explicitly need all the values laid out, but it is worth mentioning that if you are not familiar with dictionaries, this method can be deceptive. Among other reasons, dictionaries have no order, and so you should never rely on a particular item to always be at a particular index when retrieved by `GetValues()`, nor should you expect the index of these items to correctly match with the index found in `GetKeys()`. In most cases, `GetKeys()` is all you need, and `GetValues()` is more of an option for people who need more advanced control over dictionaries.

## Syncing a Data Dictionary with other players over the network

Data Dictionaries cannot be directly synced. However, they can be serialized to/from JSON strings using [VRCJson](/worlds/udon/data-containers/vrcjson). This is the current recommended method of syncing Data Dictionaries with UdonSync. 

One way to do this is to use OnPreSerialization and OnDeserialization to Serialize and Deserialize the json string. Using this method, you won't need to worry about the serialization within the rest of your code, and you can simply set values and forget.

```csharp title="Example of syncing a Data Dictionary with other players over the network"
[UdonSynced]
private string _json = "";
private DataDictionary _dictionary;

public override void OnPreSerialization()
{
    if (VRCJson.TrySerializeToJson(_dictionary, JsonExportType.Minify, out DataToken result))
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
        _dictionary = result.DataDictionary;
    }
    else
    {
        Debug.LogError(result.ToString());
    }
}
```