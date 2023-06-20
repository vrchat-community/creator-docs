---
title: "Event Execution Order"
slug: "event-execution-order"
excerpt: "Udon and Unity events are executed in a specific order. Here's how!"
hidden: false
createdAt: {}
updatedAt: "2023-02-03T01:29:10.904Z"
---
Udon and Unity have built-in events that are automatically called if you include them in your scripts. For example, the `Start()` event runs once for every script, and the `Update()` event runs once per frame. When you're writing Udon scripts, it's helpful to know which of these events happen first.
:::note

Unity provides an (incomplete) list of built-in events, many of which are also available in VRChat. https://docs.unity3d.com/Manual/ExecutionOrder.html
:::
The following diagram shows the execution order of the most important events available in Udon and Unity.

![Example banner](/img/worlds/event-execution-order.svg)

:::caution

Unity and VRChat updates may change the event execution order depicted above.
Not all events are listed, and some events may be executed in a different order depending on circumstances (being an object's owner, joining a world late, etc.)

:::