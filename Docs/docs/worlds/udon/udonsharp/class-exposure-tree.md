# Class Exposure Tree

The Class Exposure Tree shows you which classes and methods are available in UdonSharp.

You can open the window by going to "VRChat SDK" > "Udon Sharp" > "Class Exposure Tree."

- Red = Not exposed to Udon
- Green = Exposed to Udon

![Udon Type Exposure Tree](/img/worlds/udon/udonsharp/type-exposure-tree.png)

The "Show base members" toggle shows methods inherited from base classes that are exposed. For example, any class inheriting from `UnityEngine.Component` will show `GetComponent<T>()` functions because they're defined in the base class.