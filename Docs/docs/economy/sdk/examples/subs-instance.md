---
title: "Subscribers In Instance"
---

import SellerNotification from '/docs/economy/_sellers-notification.mdx';

<SellerNotification/>

Subscribers In Instance is a prefab that lists the subscribers or non-subscribers who are currently in the instance via a text console.

### How to Import
1. Download the [Unity package directly by clicking here](https://cdn.sanity.io/files/yvg0vlb9/production/437a711b7800ff57f4a931f792aec104a447225e.unitypackage).
2. Make sure your project is using the World SDK `3.5.0`or newer.
3. Import the Unity package into your project.

##### Prefabs Included
* **SubscribersInInstancePrefab**: A prefab with a console that shows all the subscribers in the instance.
* **NonSubscribersInInstancePrefab**: A prefab with a console that shows all the non-subscribers in the instance.

:::caution
If viewing the example scene, you'll also need the [Open Group Page](/economy/sdk/examples/open-group-page) prefab. Otherwise, your project will be missing what it needs for a complete scene.
:::

### How to Use

For this (and most!) prefabs, you'll first need an UdonProduct to check for and a way for players to subscribe to this product. 

Once you've created a purchasable product:

1. Drag the **SubscribersInInstance** prefab into your scene.

![EventPrefabtoScene](/img/economy/examples/SubsInInstance_AddToScene.png "Dragging the prefab into scene.")

2. In the inspector, locate the **Udon Product** variable. Click on the circle button and replace the example file with your own product.

![ProductAdd](/img/economy/examples/SubsInInstance_SelectProduct.png "Adding a product via the inspector.")

3. If you'd like the console to show non-subs instead, you can check **List Non Subscribers Instead,** or use the **NonSubscribersInInstance** prefab. Otherwise, leave this unchecked.

![NonSubsvsSubs](/img/economy/examples/SubsInInstance_SubsVersusNonSubs.png "Difference between non subs and subs list.")

4. Run Build & Test!

### Inspector Parameters

* `Udon Product` - The Udon Product that counts as being a subscriber when owned.
* `Subscribers Text` - The textfield that will be updated with the list of subscribers. Each subscriber will be on a new line.
* `List Non Subscribers Instead` - If true, all the players who don't own the product will be listed instead.
