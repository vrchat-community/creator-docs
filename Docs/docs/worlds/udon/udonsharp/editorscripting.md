# Editor Scripting

UdonSharp includes an editor scripting API that allows you to make custom editors and editor scripts that interact with UdonSharpBehaviours the same as you would interact with the normal C# version of a behaviour.

For the most part the editor scripting API allows you to write C# code that just works the same as it would for the C# version of the script, but there are some things to keep in mind while working with the scripts. 

The basis for U# editor scripting is that UdonSharp will create instances of the C# version of your behaviour script and copy the fields from the UdonBehaviour version of the script to the C# 'proxy' behind the scenes. This proxy is what you'll be interacting with most of the time from editor scripts.

## Proxies
UdonSharp scripts are valid C#, which allows you to add them to GameObjects as Proxies alongside typical standalone components. Proxies are similar to Unity's `SerializedObject` type, where any changes you apply to the SerializedObject need to be applied to the original object, and any changes to the original object need to be updated on the serialized object.

Proxies are created on the same GameObject as their backing UdonBehaviour and are disabled. They should remain disabled at all times so Unity does not execute events on them. They are marked as hidden in the GameObject inspector so you cannot see them on the GameObject directly, but they are there. Proxies are also flagged to not be saved in the scene and not be saved in builds so you don't have to worry about them bloating package or download size since they only exist in the editor. 

You can execute methods on the proxies and have them work the same as running events on UdonBehaviours. The main thing you need to keep in mind is that in C# UdonSharpBehaviours are not UdonBehaviours, this is explained in further detail below.

## Differences from regular C# behaviours and from U#
### UdonSharpBehaviours are not UdonBehaviours
In UdonSharp code, it is possible to treat **UdonBehaviours** as **UdonSharpBehaviours**, since they are represented as the same object internally. Technically, UdonSharpBehaviours do not actually inherit from UdonBehaviours, so it's best to use `UdonSharpBehaviour` as variable types instead of `UdonBehaviour` when working in UdonSharp.

Because of this, unless you want to allow people to plug in Udon behaviours built from the graph, you should always prefer to use `UdonSharpBehaviour` as variable types instead of `UdonBehaviour`.

### Proxy references are automatically handled only for UdonSharpBehaviour variables
Only variable types for UdonSharpBehaviours will have their proxies handled automatically. When you reference another proxy behaviour in a proxy behaviour, its reference will automatically be converted to the UdonBehaviour reference by the proxy system. Because of this, variables that reference other **UdonSharpBehaviours** should be stored as the specific **UdonSharpBehaviour** type, or as the base **UdonSharpBehaviour** type if any **UdonSharpBehaviour** type can be stored in the variable. 

If you use variables of the type `UdonBehaviour`, store plain `Component` references, or anything ambiguous at all, the proxy system will just populate the reference to the underlying UdonBehaviour. This is good if you want to allow references to graph assets since they do not fall under the proxy API.

An important thing to keep in mind is that if you store references to the proxy behaviours directly in a variable that is not an UdonSharpBehaviour variable or some subclass of UdonSharpBehaviour, the reference will get cleared to null on build. For instance, if you want to have an `Component` reference, make sure it's referencing the UdonBehaviour and not the proxy UdonSharpBehaviour.

### Proxies are always disabled and should remain disabled
Proxies get disabled to prevent Unity from calling events and running the same logic twice during gameplay on them. You should never re-enable the proxy behaviours. Because proxy behaviours are disabled, if you run methods on the proxy behaviour that call things like GetComponentInChildren without telling it to get disabled behaviours as well, it will not return the proxies.

## Making a custom inspector for your UdonSharpBehaviour
When making custom editors for UdonSharpBehaviours, most things are abstracted to the point that it's exactly like making a normal custom inspector. You just need to make a class that inherits from `Editor` and add the `CustomEditor` attribute with the type of your UdonSharpBehaviour.

When making custom editors for any U# or C# scripts, you must ensure that your editor code is not included in the game build since it uses Editor libraries that are not allowed in Unity games (your world will fail to build if it includes them).

There are two recommended ways to exclude Editor code from your world.
- Place your inspector scripts inside a folder named **Editor**.
- Wrap your code in a check for the preprocessor definition `UNITY_EDITOR`, for example:
```cs
#if UNITY_EDITOR
[CustomEditor(typeof(CustomInspectorBehaviour))]
public class CustomInspectorEditor : Editor
{
    ...
}
#endif
```

Using statements for editor only namespaces like `UnityEditor` will also need to be wrapped in the same `UNITY_EDITOR` check

If you want to write your inspector in the same script file as your UdonSharpBehaviour script, you will need to use the `COMPILER_UDONSHARP` preprocessor definition to prevent UdonSharp from parsing the editor only code. Using the above example with this it would look like the following:
```cs
public class CustomInspectorBehaviour : UdonSharpBehaviour 
{
    ...
}

#if !COMPILER_UDONSHARP && UNITY_EDITOR
[CustomEditor(typeof(CustomInspectorBehaviour))]
public class CustomInspectorEditor : Editor
{
    ...
}
#endif
```

:::warning

The `COMPILER_UDONSHARP` preprocessor definition will only ever be `true` inside the same script as the UdonSharpBehaviour. External scripts that do not contain an UdonSharpBehaviour and are not connected to an UdonSharpProgramAsset will never set `COMPILER_UDONSHARP` to `true`.

:::

:::warning

Do not use `COMPILER_UDONSHARP` or `UNITY_EDITOR` to conditionally remove or add fields to UdonSharpBehaviours. This will result in unexpected behavior

:::

When you make a custom inspector, you should always start the OnInspectorGUI with 
```cs
if (UdonSharpGUI.DrawDefaultUdonSharpBehaviourHeader(target)) return;
```
This handles drawing the default UdonSharp header that contains the convert to behaviour button for C# scripts, the syncing settings, the interact settings, and the utilities. You can draw each individual section as well, look at the implementation of `DrawDefaultUdonSharpBehaviourHeader()` for what you can draw.

### Example inspector
This example is included with UdonSharp

```cs
using UnityEngine;
using VRC.SDK3.Components;
using VRC.SDKBase;
using VRC.Udon;

#if !COMPILER_UDONSHARP && UNITY_EDITOR // These using statements must be wrapped in this check to prevent issues on builds
using UnityEditor;
using UdonSharpEditor;
#endif

namespace UdonSharp.Examples.Inspectors
{
    /// <summary>
    /// Example behaviour that has a custom inspector
    /// </summary>
    public class CustomInspectorBehaviour : UdonSharpBehaviour 
    {
        public string stringVal;

        private void Update()
        {
            Debug.Log($"CustomInspectorBehaviour: {stringVal}");
        }
    }

    // Editor scripts must be wrapped in a UNITY_EDITOR check to prevent issues while uploading worlds. The !COMPILER_UDONSHARP check prevents UdonSharp from throwing errors about unsupported code here.
#if !COMPILER_UDONSHARP && UNITY_EDITOR 
    [CustomEditor(typeof(CustomInspectorBehaviour))]
    public class CustomInspectorEditor : Editor
    {
        public override void OnInspectorGUI()
        {
            // Draws the default convert to UdonBehaviour button, program asset field, sync settings, etc.
            if (UdonSharpGUI.DrawDefaultUdonSharpBehaviourHeader(target)) return;

            CustomInspectorBehaviour inspectorBehaviour = (CustomInspectorBehaviour)target;

            EditorGUI.BeginChangeCheck();

            // A simple string field modification with Undo handling
            string newStrVal = EditorGUILayout.TextField("String Val", inspectorBehaviour.stringVal);

            if (EditorGUI.EndChangeCheck())
            {
                Undo.RecordObject(inspectorBehaviour, "Modify string val");

                inspectorBehaviour.stringVal = newStrVal;
            }
        }
    }
#endif
}
```

## Using [Handles](https://docs.unity3d.com/ScriptReference/Handles.html)
This works the same as making a custom inspector GUI, everything is handled automatically for the most part. You just use the OnSceneGUI event on the Editor and it should work as expected.

## Using [Gizmos](https://docs.unity3d.com/ScriptReference/Gizmos.html)
Gizmos need a little special handling to work as you'd expect. One of the [example scripts](https://github.com/vrchat-community/UdonSharp/blob/master/Packages/com.vrchat.UdonSharp/Samples~/CustomInspectors/CustomInspectorChildBehaviour.cs#L33) makes use of Gizmos. For Gizmos you should wrap the OnDrawGizmos events themselves in the same `#if !COMPILER_UDONSHARP && UNITY_EDITOR` check that we wrapped the editor in, and the **OnDrawGizmos** and **OnDrawGizmosSelected** events should go on the behaviour itself.

Gizmos draw using the proxy behaviour that gets attached to all UdonBehaviours with UdonSharpProgramAssets. They do not get executed through Udon since Udon does not run UdonBehaviours when not in play mode. The Gizmos events are not managed by UdonSharp so you need to do a little to make sure your proxy behaviour is up to date. To do this, call either of these two methods, both do the same thing, `UpdateProxy` is just made to emulate the Unity API's for serialized objects.
```cs
// Call this
UdonSharpEditorUtility.CopyUdonToProxy(this);
// Or this
this.UpdateProxy();
// Do not call both since you'd be doing redundant work
```
You can see an example of this in the example script linked above.

## Non-inspector Editor Scripts
When you are creating editor scripts that create/delete/modify UdonSharpBehaviours, you need to manage updating the proxy and applying its modifications yourself. 

### Adding an UdonSharpBehaviour
Adding a new UdonSharpBehaviour is as simple as getting the GameObject you want to attach it to and calling .`AddUdonSharpComponent<T>()` on it.
```cs
GameObject targetGameObject = ... // Get some game object from somewhere here
MyComponentType newComponent = targetGameObject.AddUdonSharpComponent<MyComponentType>();
```
Now newComponent is a valid UdonSharpBehaviour proxy of your component type MyComponentType. You can interact with this like any other C# component from the editor script. If you want the component creation to be undoable, instead use:
```cs
GameObject targetGameObject = ... // Get some game object from somewhere here
MyComponentType newComponent = UdonSharpUndo.AddComponent<MyComponentType>(targetGameObject);
```

### Getting an existing UdonSharpBehaviour
UdonSharp has equivalents for GetComponent(s) defined as extension methods to GameObject. When you are working with editor scripts, instead of calling `GetComponent<T>()`, you should call its equivalent `GetUdonSharpComponent<T>()`.

In order to get all UdonSharpBehaviours of the type `MyComponentType` on children of a GameObject, you would do the following:
```cs
GameObject sourceGameObject = ... // Get some game object from somewhere here
MyComponentType[] myComponents = sourceGameObject.GetUdonSharpComponentsInChildren<MyComponentType>();
```

### Working with an UdonSharpBehaviour and modifying it
Once you have an UdonSharpBehaviour to work with, you will need to handle making sure any modifications to the proxy get propagated to Udon.

If Udon is making any changes to the behaviour, the behaviour should get updated if you are using GetUdonSharpComponent(s) since those will automatically update the behaviour. If you store a reference to the behaviour, you will need to update it yourself. This can be done by calling `UpdateProxy()` on the behaviour.

Once you have modified your behaviour, you must apply the modifications on the proxy behaviour to Udon. This can be done by calling `ApplyProxyModifications()` on the behaviour.

You can think of this as being similar to working with Unity SerializedObjects.

```cs
MyComponentType myComponent = ...
// We only need to update the proxy if we storing some persistent reference to it
myComponent.UpdateProxy();
// Add 5 to a `float` on our behaviour
myComponent.myFloatField += 5f;
// Apply the changes to myComponent to the Udon copy of it
myComponent.ApplyProxyModifications();
```

## Destroying UdonSharpBehaviours
You should use the UdonSharpEditorUtility.DestroyImmediate() method to destroy UdonSharpBehaviours and delete their underlying UdonBehaviour.
