---
title: "VRCJSON"
slug: "vrcjson"
hidden: false
createdAt: "2023-04-24T23:48:39.230Z"
updatedAt: "2023-04-26T15:25:05.803Z"
---
# VRC JSON

[Data Dictionaries](/worlds/udon/data-containers/data-dictionaries) and [Data Lists](/worlds/udon/data-containers/data-lists) include functions to convert to and from JSON. A Data List is equivalent to a JSON array, and a JSON object is equivalent to a Data Dictionary with string keys.

See [Json documentation](https://www.json.org/json-en.html) for further details on the JSON schema itself. Everything in this page is relating to this particular implementation of the JSON schema.

## JSON functions

| Function                       | Inputs                          | Outputs                        | Result                                                                                                                                                                                                                                                                           |
| ------------------------------ | ------------------------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| VRCJson.TryDeserializeFromJson | String input                    | success bool, DataToken result | Creates a DataList or DataDictionary from JSON string input. If successful, this returns true and the result token will be either a DataDictionary or DataList. If not successful, this returns false and puts an error explaining what the issue was in the result token.       |
| VRCJson.TrySerializeToJson     | DataToken input, JsonExportType | success bool, DataToken result | Attempts to convert a DataDictionary or DataList into JSON string output. If successful, this returns true and the result token will be a string with the final Json. If not successful, this returns false and puts an error explaining what the issue was in the result token. |

Note that in Udon Graph, "VRC" is removed from the beginning of all class names, so you need to search for "Json" to find these functions.

## Supported types and values

JSON is a small, simple, and strict specification. DataLists and DataDictionaries are capable of supporting a much wider range of configurations, which means that you may face some limitations when going from Data container to JSON. Make sure you are aware of these limitations and avoid using these configurations in situations where you intend to use JSON.

**JSON does not support `Object Reference` Data Tokens.** If you have any object references in your Data containers when you try to serialize to JSON, the SerializeToJson function will return false with `DataError.TypeUnsupported`

**JSON only supports string-keyed dictionaries.** If you have any keys in your DataDictionaries that are not strings when you try to serialize to JSON, the SerializeToJson function will return false with `DataError.TypeUnsupported`.

**JSON does not support NaN or Infinity.** If you have any floats or doubles that contain NaN or Infinity, the SerializeToJson function will return false with `DataError.ValueUnsupported`.

**JSON does not support anything other than Dictionary or List as the root.** If you use a simple value DataToken without any children, the SerializeToJson function will return false with `DataError.TypeUnsupported`.

**JSON only supports one type of number.** It does not differentiate between all the different types. As a result, deserializing from JSON will store all numbers in `Double` format. If you have Data Tokens containing other types of numbers such as `int`, `byte`, or `float` then they can serialize to JSON, however if you Deserialize that same JSON back into Data Containers, you will find that they are now `Doubles` instead.

## Deserializing from JSON

`VRCJson.TryDeserializeFromJson` is the function you should use when you want to go from Json to Data containers. It is recommended to use it as the condition for an `if` or `branch` so that you can choose what happens if it fails and what happens if it succeeds.

If TryDeserializeFromJson returns true, then that means it has successfully turned your Json string into a DataList or DataDictionary. You should then do a type check on the result to determine what happens for each case. 

If this returns false, then the string you provided was not valid JSON. The DataToken you are given will be a DataError, and if you run DataToken.ToString on it, it will give you both the error and a string explaining more details about exactly what went wrong.

For performance reasons, VRCJSON does not parse everything immediately. Instead, it only parses the top level of JSON first. if the top level is valid, but you have have invalid JSON further down inside a nested structure, it is possible for the initial DeserializeFromJson to return true. Later, if you use TryGetValue to pull values from something that was invalid, it will return false and give you DataError.UnableToParse.

```csharp title="Deserializing from JSON"
if (VRCJson.DeserializeFromJson(json, out DataToken result))
{
    // Deserialization succeeded! Let's figure out what we've got.
    if (result.TokenType == TokenType.DataDictionary)
    {
        Debug.Log($"Successfully deserialized as a dictionary with {result.DataDictionary.Count} items.");
    }
    else if (result.TokenType == TokenType.DataList)
    {
        Debug.Log($"Successfully deserialized as a list with {result.DataList.Count} items.");
    }
    else 
    {
        // This should not be possible. If DeserializeFromJson returns true, this it *must* be either a dictionary or a list.
    }
} else {
    // Deserialization failed. Let's see what the error was.
    Debug.Log($"Failed to Deserialize json {json} - {result.ToString()}");
}
```

## Serializing to JSON

`VRCJson.TrySerializeToJson` is the function you should use when you want to go from Data containers to Json. It is recommended to use it as the condition for an `if` or `branch` so that you can choose what happens if it fails and what happens if it succeeds.

If TrySerializeToJson returns true, then that means it has successfully converted your DataList or DataDictionary into a Json string, and you can safely pull the string out of the result token.

```csharp title="Serializing to JSON"
if (VRCJson.SerializeToJson(dictionary, JsonExportType.Beautify, out DataToken json))
{
    // Successfully serialized! We can immediately get the string out of the token and do something with it.
    Debug.Log($"Successfully serialized to json: {json.String}");
} 
else 
{
    // Failed to serialize for some reason, running ToString on the result should tell us why.
    Debug.Log(json.ToString());
}
```

### JsonExportType

When serializing to Json, you can choose the JsonExportType you would like. If you want something human-readable, Beautify is better. If you want something compact for sending over the network, Minify is better.

- Beautify: Expands each element to a new line and adds one tab per depth.
- Minify: Keeps everything in one line and minimizes whitespace.