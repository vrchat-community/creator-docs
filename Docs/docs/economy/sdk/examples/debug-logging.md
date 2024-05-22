---
title: "Store Debug Logging"
---

import SellerNotification from '/docs/economy/_sellers-notification.mdx';

<SellerNotification/>

Store Debug Logging is a prefab that helps log store-related events on an in-world console or screen. You can set this up in your worlds to give supporters a way to check what purchases they've made, what purchases they can make, and to open your store.

### How to Import
1. Download the [Unity package directly by clicking here](https://cdn.sanity.io/files/yvg0vlb9/production/44219d76aa08adb0b6511e37891a0011f40e8dcb.unitypackage).
2. Make sure your project is using the World SDK `3.5.0` or newer. 
3. Import the Unity package into your project.

##### Prefabs Included
* **StoreDebugLoggingPrefab**: A prefab that contains a store-related console window, which supporters can interact with.

:::caution
If viewing the example scene, you'll also need the [Open Group Page](/economy/sdk/examples/open-group-page) prefab. Otherwise, your project will be missing what it needs for a complete scene.
:::

### How to Use

For this (and most!) prefabs, you'll first need an UdonProduct to check for and a way for players to subscribe to this product. 

Once you've created a purchasable product:

1. Drag the **StoreDebugLoggingPrefab** into your scene.

![EventPrefabtoScene](/img/economy/examples/DebugLogging_AddToScene.png "Dragging the prefab into scene.")

2. In the inspector, locate the **Products** drop down and drag a product over. You can also drag multiple products at once. The order in the inspector is not important, but make sure you only list each product once. 

<div class="video-container">
    <iframe src="https://assets.vrchat.com/videos/docs/DebugLogging_AddProduct.mp4" title="Overhead Indicator" frameborder="0" allow="encrypted-media; gyroscope; web-share" allowfullscreen></iframe>
</div>

3. Fill the **Group Id** variable with your group ID. 
   -   Find your group ID by opening your group [on the website](https://vrchat.com/home/groups) and copying the ID in the address bar of your browser. For example: `grp_a4f791af-a167-4c91-b849-2e37e37f509a`. Any short code (i.e. `EXAMPL.9920`) will **not** work.

![DebugGroupID](/img/economy/examples/DebugLogging_GroupId.png "Adding your Group ID.")

4. The **Debug Text** object, **Scrollbar**, and **Auto Scroll Toggle** are text and UI elements that should be left as is.

5. Run Build & Test!

### Inspector Parameters

* `Products` - The Udon products a user can purchase, with a `Size` value for the number of products and `Element` values for each product link.
* `Debug Text` - The text that appears when a player clicks one of the buttons on the console.
* `Group Id` - The ID for your group, which contains your store and purchasable products.
* `Scrollbar` - The scrollbar that shows up in the console.
* `Auto Scroll Toggle` - The toggle that lets players turn auto scrolling on or off.
