---
title: "Data Tokens"
slug: "data-tokens"
hidden: false
createdAt: "2023-04-24T23:48:30.309Z"
updatedAt: "2023-04-25T00:01:54.599Z"
---
# Data Tokens

Data Tokens store data. Each token stores one and only one variable. Data Tokens are used in [Data Dictionaries](/worlds/udon/data-containers/data-dictionaries) and [Data Lists](/worlds/udon/data-containers/data-lists).

Data Tokens can contain the following Token Types:

- Null
- Boolean
- SByte
- Byte
- Short
- UShort
- Int
- UInt
- Long
- ULong
- Float
- Double
- String
- Data Lists (Stores other DataTokens)
- Data Dictionaries (Stores other DataTokens)
- Object Reference (Able to store **anything** through boxing, but cannot be serialized)
- Data Errors (An enum that indicates what went wrong)

## Properties

| Property       | Result                                                                                                                                                                                                                                                                                                           |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TokenType      | Returns the current TokenType of variable that this DataToken contains                                                                                                                                                                                                                                           |
| IsNumber       | Returns true if the DataToken contains any numeric type. Otherwise, returns false.                                                                                                                                                                                                                               |
| IsNull         | Returns true if the value contained within this DataToken is null in any form. Numbers and bools are never null, TokenType.Null is always null, strings check for null but not emptiness, and references use Utilities.IsValid internally to handle players that have left and objects that have been destroyed. |
| Boolean        | Returns a bool if the DataToken contains a bool. Otherwise, throws an exception.                                                                                                                                                                                                                                 |
| Number         | Returns a double if the DataToken contains any numeric type. Otherwise, throws an exception.                                                                                                                                                                                                                     |
| SByte          | Returns an 8-bit signed sbyte if the DataToken contains an sbyte. Otherwise, throws an exception.                                                                                                                                                                                                                |
| Byte           | Returns an 8-bit unsigned byte if the DataToken contains a byte. Otherwise, throws an exception.                                                                                                                                                                                                                 |
| Short          | Returns a 16-bit signed short if the DataToken contains a short, sbyte, or byte. Otherwise, throws an exception.                                                                                                                                                                                                 |
| UShort         | Returns a 16-bit unsigned ushort if the DataToken contains a ushort or byte. Otherwise, throws an exception.                                                                                                                                                                                                     |
| Int            | Returns a 32-bit signed int if the DataToken contains an int, sbyte, byte, short, or ushort. Otherwise, throws an exception.                                                                                                                                                                                     |
| UInt           | Returns a 32-bit unsigned uint if the DataToken contains a uint, byte, or ushort. Otherwise, throws an exception.                                                                                                                                                                                                |
| Long           | Returns a 64-bit signed long if the DataToken contains a long, sbyte, byte, short, ushort, or uint. Otherwise, throws an exception.                                                                                                                                                                              |
| ULong          | Returns a 64-bit unsigned ulong if the DataToken contains a ulong, byte, ushort, or uint. Otherwise, throws an exception.                                                                                                                                                                                        |
| Float          | Returns a 32-bit float if the DataToken contains a float, sbyte, byte, short, ushort, int, uint, long, or ulong. Otherwise, throws an exception.                                                                                                                                                                 |
| Double         | Returns a 32-bit double if the DataToken contains a double or any other numeric type. Otherwise, throws an exception.                                                                                                                                                                                            |
| String         | Returns a string if the DataToken contains a string. Otherwise, throws an exception.                                                                                                                                                                                                                             |
| DataDictionary | Returns a Data Dictionary if the DataToken contains a Data Dictionary. Otherwise, throws an exception.                                                                                                                                                                                                           |
| DataList       | Returns a Data List if the DataToken contains a Data List. Otherwise, throws an exception.                                                                                                                                                                                                                       |
| Reference      | Returns an object reference if the DataToken contains an object reference. Otherwise, throws an exception.                                                                                                                                                                                                       |
| Error          | Returns the error associated with this token. Otherwise, returns DataError.None. Unlike others, accessing this property will never throw an exception. If you attempt to access Error from a token that is not an error, it will simply return DataError.None.                                                   |

## Functions

| Function    | Result                                                                                                                                                                                                                                                                                                                                           |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ToString    | Converts the contents of the token to a string. Unlike accessing the String property, this function will always succeed because it will use the underlying value's ToString                                                                                                                                                                      |
| GetHashCode | Returns a hashcode of the contents of the token. This is mostly used for internal operations of dictionary keys.                                                                                                                                                                                                                                 |
| CompareTo   | Compares this token to another token, returning -1 if the other token is larger, 0 if they are equal, and 1 if the other token is smaller. Containers such as lists and dictionaries will be compared by count. When comparing two tokens that are not the same type and not numerical values, they will use the ordering of the TokenType enum. |

## Creating Data Tokens

### UdonSharp

In UdonSharp, DataTokens can be created "implicitly" which means that when a function asks for a DataToken, you do not need to do `new DataToken(value)`. Instead you can just pass the value in directly and it will create a DataToken for you automatically.

```csharp title="DataToken Creation"
// You could do this
DataToken _explicitFloat = new DataToken(5.3f);
DataToken _explicitInt = new DataToken(5);
DataToken _explicitString = new DataToken("value");
DataToken _explicitBool = new DataToken(true);

// But this is easier and simpler
DataToken _float = 5.3f;
DataToken _Int = 5;
DataToken _String = "value";
DataToken _Bool = true;
```

### Udon Graph

In Udon Graph, you'll need to use the `DataToken Implicit` or `DataToken Constructor` nodes to create a DataToken with the value inside.  
![data-tokens-7GAcVrY.png](/img/worlds/data-tokens-7GAcVrY.png)

## Getting values out of a Data Token

Before getting a value out of a DataToken you need to be sure of what type it contains because if you try to pull an incompatible type, it will halt your UdonBehaviour. There are several ways to ensure that the type contained is compatible with what you want to pull out.

- You can check the `DataToken.TokenType` property to get the exact type
- When retrieving a value out of a Data List or Data Dictionary, you can use `TryGetValue` and specify a TokenType. If the TokenType is incorrect, that function will return false.
- You can check the `DataToken.IsNumber` property to get if it is a number. If it is, then you can safely pull the `Number` property which will give you a double upcasted from whichever type it actually was. This may lose precision if the type was `long` or `ulong`.
- Regardless of the type of the token, `ToString` is always a valid option and will never throw errors.

```csharp title="DataToken Retrieval in U#"
// If we know that it's a string, we can safely pull the string out of the token
if (unknownToken.TokenType == TokenType.String)
{
    Debug.Log(unknownToken.String);
}

// We can use IsNumber to see if it's some type of number, even if we don't know which.
if (unknownToken.IsNumber)
{
    Debug.Log(unknownToken.Number);
}

// If we're pulling a value from a container, we can use the version that does its own type check
if (dictionary.TryGetValue("key", TokenType.String, out DataToken value))
{
    Debug.Log(value.String);
}
```

![data-tokens-SqQqE5w.png](/img/worlds/data-tokens-SqQqE5w.png)

Once you are sure that you have the right type, you can get the value out of the DataToken by accessing value properties such as `DataToken.Float` and `DataToken.Boolean`. Each type has it's own property which can be used to pull that specific type out.

If you have complete control over the data that you're working with, then you can skip all the TokenType checking and just get the value from the token directly. This can save some extra code, but make sure that you're not doing this if the data is coming from an outside source or there is any possibility that the type could be something else.

```csharp title="Example of Shorthand Bracket syntax"
dictionary["A"] = 5;
dictionary["B"] = 10;

// This makes the assumption that A and B will always contain integers.
// This is a safe assumption to make since we set them just above in a controlled environment.
// If the data is coming from an external source, we shouldn't make these assumptions!
int sum = dictionary["A"].Int + dictionary["B"].Int;
```

## Errors

When operations on a Data List or Data Dictionary fail and give a DataToken back, they will produce an error token. Error tokens contain both an enum classifying the type of error, as well as a string that elaborates on the error more specifically. Not all errors will produce a string because there is no need to elaborate further.

If you have an Error token, you can use `DataToken.Error` to get the error enum and `DataToken.String` to get the message. You can also use `DataToken.ToString()` which will automatically combine the enum and the string into a nice complete message, which makes it convenient to simply call `Debug.Log(token)`

An error token can be one of several different things:

| Value            | Meaning                                                                                                                                                                                                            |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| KeyDoesNotExist  | You tried to access a key from a data dictionary but that key does not exist                                                                                                                                       |
| IndexOutOfRange  | You tried to access an index from a data array but that index was either less than 0 or greater than or equal to the count of the array.                                                                           |
| TypeMismatch     | You tried to access a value but the value was not the type you expected. Note that this can only happen if you are using a version of TryGetValue that accepts a type.                                             |
| TypeUnsupported  | The data container had a type that is not supported by the serialization format you tried to use. This can happen if you put reference tokens into a Data Container and then try to serialize it into Json.        |
| ValueUnsupported | The data container had a value that is not supported by the serialization format you tried to use. This can happen if you put NaN or Infinity floats into a Data Container and then try to serialize it into Json. |
| UnableToParse    | The serialized format could not be parsed. This happens if the source Json is invalid.                                                                                                                             |

```csharp title="TryGetValue with TokenType"
if (dictionary.TryGetValue("key", TokenType.Float out DataToken value)) {
    // If TryGetValue succeeds, we can do things with the token
    Debug.Log($"Successfully retrieved value {token.Float}");
} else {
    // If TryGetValue fails, the token will instead be an error
    Debug.Log($"Failed to retrieve value with error {token.Error}");
}
```

![data-tokens-zcqKePv.png](/img/worlds/data-tokens-zcqKePv.png)

## FAQ

### What is the difference between String and ToString?

`DataToken.String` and `DataToken.ToString()` are similar but not quite the same, because `DataToken.String` is specifically accessing the string value inside the DataToken, while `DataToken.ToString()` is converting whatever exists into a string. 

As a result, `ToString` is always valid no matter what the DataToken contains and will never halt your UdonBehaviour. If it contains a bool, then it will give you either true or false. If it contains a number, it will create a string representation of that number using `ToString("G", CultureInfo.InvariantCulture)`.

On the other hand, accessing `DataToken.String` is only valid if the DataToken contains a string. If the DataToken contains a float and you attempt to access `DataToken.String`, then an exception will be thrown and your UdonBehaviour will halt. 

DataErrors are unique in that they contain both an Error enum and a string. It is recommended to use `ToString()` on DataErrors simply because `ToString()` will combine the enum and the string together into a single message that contains both the error and the reason for the error.

### Why not have a TryGetValue that gives the value directly, skipping tokens?

It would be beneficial to have a TryGetValue method that directly provides the value, bypassing the need for tokens. This is a valid question as it can be tedious to constantly retrieve the token from the container and then access the value within the container separately. There have been several options considered to simplify this process, and one such solution that has been implemented is to include a built-in type check with TryGetValue.

Another approach that was contemplated involved creating a generic version of TryGetValue where a system type is specified using a T argument. Although UdonSharp supports this approach (at least within static methods), Udon itself does not. Additionally, while this option would be advantageous, it would prevent the return of a DataError through the DataToken in case of an error, resulting in the default value being returned instead. Ultimately, we chose not to implement this approach as it would conceal the error from the user and make it more difficult to identify the problem. Fortunately, users have the ability to create their own solution for generic value retrieval using UdonSharp. This is made possible due to the availability of Generics, Statics, and extension methods within UdonSharp.