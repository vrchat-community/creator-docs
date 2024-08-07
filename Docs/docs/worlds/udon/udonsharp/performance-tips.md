
# Performance Tips

This page contains a few tips on how to improve the performance of your UdonSharp scripts.

## UdonSharp is slower than C\#
Udon can take about 200x to 1000x longer to run a piece of code than the equivalent in normal C#, depending on what you're doing. 
- Avoid massive complex algorithms that iterate over thousands of elements.
- Avoid iterating over very long arrays every frame.
	- Consider "time-slicing" your array by only processing only a liminted amount of array elements per frame.
- Use native Unity components or VRChat SDK components whenever possible.
	- For example: Instead of rotating 40 GameObjects in Udon, use an animation.
- Cache method results to improve performance.
	- For example: Instead of getting [`GameObject.transform`](https://docs.unity3d.com/ScriptReference/GameObject-transform.html) or [`Networking.LocalPlayer`](/worlds/udon/players/getting-players/#networkingget-localplayer) every frame, use the `Start()` event to save them as variables and reuse them later.

## Use `private` methods
You should mark methods as `private` if they are not being called from other scripts. Due to how Udon searches for methods to call, the fewer public methods you have, the better the performance of your custom events.

Calls across behaviours are slower than local method calls. If you can, keep similar behavior in one UdonSharpBehaviour rather than separating it into different behaviours.

Don't forget that in order to send a [CustomNetworkEvent](/worlds/udon/graph/special-nodes#udonbehaviour-nodes), the target method must be `public`. If it is not public, it will not fire. Additionally, any methods that start with an underscore such as `_MyLocalMethod` will not receive network events.

## Don't use `GetComponent<T>` frequently
You should only use `GetComponent<T>` in the `Start()` event or event that happen that don't happen frequently.

`GetComponent<T>()` is slow, especially when retrieving an UdonSharpBehaviour type in Udon. That's because UdonSharp needs to insert a loop that checks all UdonBehaviours to make sure they're the correct UdonSharpBehaviour type. 