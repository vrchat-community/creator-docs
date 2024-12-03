---
description: "Lists all product owners in the current instance."
sidebar_custom_props:
    customIcon: 👥
---

# Product Owners In Instance

import SellerNotification from '/docs/economy/_sellers-notification.mdx';

<SellerNotification/>

Product Owners In Instance is a prefab that lists the product owners or non-product owners who are currently in the instance via a text console.

import HowToImportExample from '/docs/economy/_ce-how-to-import.mdx';

<HowToImportExample/>

##### Prefabs Included
* **ProductOwnersInInstancePrefab**: A prefab with a console that shows all the product owners in the instance.
* **NonProductOwnersInInstancePrefab**: A prefab with a console that shows all the non-owners in the instance.

:::caution
If viewing the example scene, you'll also need the [Open Group Page](/economy/sdk/examples/open-group-page) prefab. Otherwise, your project will be missing what it needs for a complete scene.
:::

### How to Use

For this (and most!) prefabs, you'll first need an UdonProduct to check for and a way for players to buy this product. 

Once you've created a purchasable product:

1. Drag the **ProductOwnersInInstance** prefab into your scene.

![EventPrefabtoScene](/img/economy/examples/SubsInInstance_AddToScene.png "Dragging the prefab into scene.")

2. In the inspector, locate the **Udon Product** variable. Click on the circle button and replace the example file with your own product.

![ProductAdd](/img/economy/examples/SubsInInstance_SelectProduct.png "Adding a product via the inspector.")

3. If you'd like the console to show non-owners instead, you can check **List Non Product Owners Instead,** or use the **NonProductOwnersInInstance** prefab. Otherwise, leave this unchecked.

![NonOwnersvsOwners](/img/economy/examples/SubsInInstance_SubsVersusNonSubs.png "Difference between non product owners and product owners list.")

4. Run Build & Test!

### Inspector Parameters

* `Udon Product` - The Udon Product which will be checked for ownership.
* `Product Owners Text` - The textfield that will be updated with the list of product owners. Each product owner will be on a new line.
* `List Non Product Owners Instead` - If true, all the players who don't own the product will be listed instead.
