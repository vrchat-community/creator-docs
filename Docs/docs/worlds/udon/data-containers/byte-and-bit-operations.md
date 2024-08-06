---
title: "Byte and Bit Operations"
slug: "byte-and-bit-operations"
hidden: false
sidebar_position: 10
createdAt: "2024-02-26T18:00:00.000Z"
updatedAt: "2024-02-26T18:00:00.000Z"
---
# Byte and Bit Operations

:::info

This page describes lower level concepts of working with binary data and is intended for advanced creators.
:::

You can use the `Bitcast` method on DataTokens to do value-preserving type changes ("unsafe casts") on primitive data types in Udon.

Some standard C# classes for operating on raw binary data are also available, including `BitConverter` and `Buffer`.

## Example Code

```csharp title="Byte and Bit Operations Example, Basic Serializer"
using System;
using System.Text;
using UdonSharp;
using UnityEngine;
using VRC.SDK3.Data;

public class BitConverterExample : UdonSharpBehaviour
{
    void Start()
    {
        //Create test data
        int originalInt = 63;
        double originalDouble = 734531.433d;
        string originalString = "Test string";
        float[] originalFloatArray = new float[] { 543, 12.6f, 63.1231f };

        //Serialize and then deserialize
        byte[] serialized = Serialize(originalInt, originalDouble, originalString, originalFloatArray);
        Deserialize(serialized, out int newInt, out double newDouble, out string newString, out float[] newFloatArray); 
        
        //Print the results to see if everything matches
        Debug.Log($"{originalInt} - {newInt}");
        Debug.Log($"{originalDouble} - {newDouble}");
        Debug.Log($"{originalString} - {newString}");
        Debug.Log($"{originalFloatArray.Length} - {newFloatArray.Length}");
        for (int i = 0; i < originalFloatArray.Length && i < newFloatArray.Length; i++)
        {
            Debug.Log($"{originalFloatArray[i]} - {newFloatArray[i]}");
        }

        //For individual values we can also use DataToken Bitcasting to get bit access
        double doubleValue = 123.456d;
        DataToken doubleToken = new DataToken(doubleValue);
        //We used ulong because it has the same size as a double (8 bytes)
        DataToken ulongToken = doubleToken.Bitcast(TokenType.ULong);
        DataToken resultDoubleToken = ulongToken.Bitcast(TokenType.Double);
        Debug.Log($"{doubleToken} - 0x{ulongToken:02X} - {resultDoubleToken}");
    }

    /// <summary>
    /// An example function which serializes a pre-determined set of data into a byte array
    /// </summary>
    /// <param name="intValue">Integer which will be encoded into the output</param>
    /// <param name="doubleValue">Double which will be encoded into the output</param>
    /// <param name="stringValue">String which will be encoded into the output</param>
    /// <param name="floatArrayValues">Float array which will be encoded into the output</param>
    /// <returns></returns>
    byte[] Serialize(int intValue, double doubleValue, string stringValue, float[] floatArrayValues)
    {
        int size = 0;
        byte[] intBytes = BitConverter.GetBytes(intValue); //Convert int to bytes
        size += intBytes.Length;
        
        byte[] doubleBytes = BitConverter.GetBytes(doubleValue); //Convert int to bytes
        size += doubleBytes.Length;
        
        byte[] stringBytes = Encoding.UTF8.GetBytes(stringValue); //Convert string to bytes
        size += stringBytes.Length;
        Debug.Log($"String byte length {stringBytes.Length}");
        
        byte[] stringLengthBytes = BitConverter.GetBytes(stringBytes.Length); //Convert string length to bytes
        size += stringLengthBytes.Length;
        
        byte[] floatArrayLengthBytes = BitConverter.GetBytes(Buffer.ByteLength(floatArrayValues));
        size += floatArrayLengthBytes.Length;
        
        //It is not necessary to convert the float array into a byte array because we can BlockCopy it directly
        size += Buffer.ByteLength(floatArrayValues);

        byte[] output = new byte[size]; //Allocate an array of the correct size that should fit all of our items
        int offset = 0;

        Buffer.BlockCopy(intBytes, 0, output, offset, intBytes.Length); //Write int - this should take up 4 bytes
        offset += intBytes.Length; //Increment offset so the next item can write to the correct location
        
        Buffer.BlockCopy(doubleBytes, 0, output, offset, doubleBytes.Length); //Write double - this should take up 8 bytes
        offset += doubleBytes.Length;
        
        Buffer.BlockCopy(stringLengthBytes, 0, output, offset, stringLengthBytes.Length); //Write the length of the string so the decoder knows how much to decode - this should take up 4 bytes
        offset += stringLengthBytes.Length;

        Buffer.BlockCopy(stringBytes, 0, output, offset, stringBytes.Length); //Write string - this is variable, which is why we need to encode the length of the string above
        offset += stringBytes.Length;

        Buffer.BlockCopy(floatArrayLengthBytes, 0, output, offset, floatArrayLengthBytes.Length); //Write the length of the float array so the decoder knows how much to decode - this should take up 4 bytes
        offset += floatArrayLengthBytes.Length;
        
        Buffer.BlockCopy(floatArrayValues, 0, output, offset, Buffer.ByteLength(floatArrayValues)); //Write float array - this can be done directly without a byte array conversion because it's already an Array
        offset += Buffer.ByteLength(floatArrayValues);
        
        Debug.Log($"Encoded data in {output.Length} bytes");
        return output;
    }

    /// <summary>
    /// An example function which deserializes a pre-determined set of data described in the Serialize function above
    /// </summary>
    /// <param name="input">Input bytes - must be formatted in the expected manner by the Serialize function above</param>
    /// <param name="intValue">Output int value deserialized from the data inside the input</param>
    /// <param name="doubleValue">Output double value deserialized from the data inside the input</param>
    /// <param name="stringValue">Output string value deserialized from the data inside the input</param>
    /// <param name="floatArrayValues">Output float array value deserialized from the data inside the input</param>
    /// <returns></returns>
    bool Deserialize(byte[] input, out int intValue, out double doubleValue, out string stringValue, out float[] floatArrayValues)
    {
        int offset = 0;
        
        intValue = BitConverter.ToInt32(input, offset);
        offset += 4; //Increment the offset so the next item reads from the correct location. Ints should be 4 bytes long
        
        doubleValue = BitConverter.ToDouble(input, offset);
        offset += 8; //Doubles should be 8 bytes long
        
        int stringLength = BitConverter.ToInt32(input, offset);
        offset += 4; //String length is an int, which should be 4 bytes long
        
        Debug.Log($"Decoding string length {stringLength} at offset {offset} for buffer length {input.Length}");
        stringValue = Encoding.UTF8.GetString(input, offset, stringLength);
        offset += stringLength; //Strings are variable length

        int floatArrayByteLength = BitConverter.ToInt32(input, offset);
        offset += 4; //Float array length is an int, which should be 4 bytes long
        
        floatArrayValues = new float[floatArrayByteLength / 4]; //Create a new float array of the correct size to receive the data
        Buffer.BlockCopy(input, offset, floatArrayValues, 0, floatArrayByteLength); //Copy the data from the input into the float array
        
        return true;
    }
}
```