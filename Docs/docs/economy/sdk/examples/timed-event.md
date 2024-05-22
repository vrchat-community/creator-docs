---
title: "Product Event Timed"
---

import SellerNotification from '/docs/economy/_sellers-notification.mdx';

<SellerNotification/>

A ProductEvent is an event that only can be sent by a player who owns a product. Use this to enable GameObjects for a set amount of time when the product event is executed.

This can be customized in a variety of ways! For example, create a paid product that allows those players to set off fireworks for a certain amount of time. 

You can read more about Udon events [here](https://creators.vrchat.com/worlds/udon/graph/event-nodes/) and [here](https://udonsharp.docs.vrchat.com/events/).

<div class="video-container">
    <iframe src="https://assets.vrchat.com/videos/docs/ProductEvent_Preview.mp4" title="Timed Event" frameborder="0" allow="encrypted-media; gyroscope; web-share" allowfullscreen></iframe>
</div>

### How to Import
1. Download the [Unity package directly by clicking here](https://cdn.sanity.io/files/yvg0vlb9/production/b1547cd3c689c256299f802b3a19c8bbc9da8613.unitypackage).
2. Make sure your project is using the World SDK `3.5.0`or newer.
3. Import the Unity package into your project.

##### Prefabs Included
* **SendProductEventPrefab**: A prefab that sends the product event when the button is pressed and enables the GameObject for the set amount of time. Though only a player who owns the product can set off the event, `OnProductEvent` will be executed by all users. Meaning, only people who pay for the product can activate the event, but anyone can see or interact once the event is activated.

:::caution
If viewing the example scene, you'll also need the [Open Group Page](/economy/sdk/examples/open-group-page) prefab. Otherwise, your project will be missing what it needs for a complete scene.
:::

### How to Use

For this (and most!) prefabs, you'll first need an UdonProduct to check for and a way for players to subscribe to this product. 

Once you've created a purchasable product:

1. Drag the **ProductEventTimedSetActivePrefab** into your scene.

![EventPrefabtoScene](/img/economy/examples/ProductEvent_DragIntoScene.png "Dragging the prefab into scene.")

2. In the inspector, locate the **Udon Product** variable. Click on the circle button and replace the example file with your own product. This product must be owned by the player trying to send the event.

![EventProductAdd](/img/economy/examples/ProductEvent_SelectUdonProduct.png "Dragging the prefab into scene.")

3. Next, locate **Enable On Product Event GameObject**. This is what will be enabled when the player with the correct UdonProduct clicks the button. You can replace this with whatever GameObject you'd like.

![EventObjAdd](/img/economy/examples/ProductEvent_SelectCustomObject.png "Adding a custom GameObject.")

4. Use **Enabled Time** to how long you want this GameObject to be enabled. This can range from .5-10 seconds.

5. Run Build & Test!

### Inspector Parameters

* `UdonProduct` - The Udon product that will be used when sending the event. This product must be owned by the player sending the event.
* `Enable Product Event GameObject` - The GameObject that will be enabled when the event is executed.
* `Enabled Time` - How long the GameObject will be enabled for in seconds.
