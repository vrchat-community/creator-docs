import UnityVersionedLink from '@site/src/components/UnityVersionedLink.js';

# Event Execution Order

Udon and Unity have built-in events that are automatically called if you include them in your scripts. For example, the `Start()` event runs once for every script, and the `Update()` event runs once per frame. When you're writing Udon scripts, it's helpful to know which of these events happen first.
:::note

Unity provides an (incomplete) <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/ExecutionOrder.html">list of built-in events</UnityVersionedLink>, many of which are also available in VRChat.
:::
The following diagram shows the execution order of the most important events available in Udon and Unity.

![Example banner](/img/worlds/event-execution-order.svg)

:::caution

Unity and VRChat updates may change the event execution order depicted above.
Not all events are listed, and some events may be executed in a different order depending on circumstances (being an object's owner, joining a world late, etc.)

:::