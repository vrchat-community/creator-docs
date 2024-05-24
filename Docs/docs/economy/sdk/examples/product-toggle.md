---
title: "Udon Product Toggle"
---

import SellerNotification from '/docs/economy/_sellers-notification.mdx';

<SellerNotification/>

Udon Product Toggle is a prefab that enables/disables a GameObject when a user owns the Udon Product assigned. This can be used for both local and instance-based objects. Use this in unique ways, like setting up doors that let subscribers into private areas, or creating fun, purchasable pop-ups for the entire instance.

### How to Import
1. Download the [Unity package directly by clicking here](https://cdn.sanity.io/files/yvg0vlb9/production/fa0b10c179c4860d392857709d68147d9fab5a33.unitypackage).
2. Make sure your project is using the World SDK `3.5.0`or newer.
3. Import the Unity package into your project.

##### Prefabs Included
* **UdonProductToggleObjectOffLocalPrefab**: Sets the target object to be disabled when the local player owns the product.
* **UdonProductToggleObjectOffAnyonePrefab**: Sets the target object to be disabled when anyone in the instance owns the product. 
    - Use these prefabs when a player must be a subscriber to remove something for either themself or the entire instance, like a door to an exclusive part of your world.  

* **UdonProductToggleObjectOnLocalPrefab**: Sets the target object to be enabled when the local player owns the product.
* **UdonProductToggleObjectOnAnyonePrefab**: Sets the target object to be enabled when anyone in the instance owns the product.
    -  Use these prefabs when a player must be a subscriber to enable something for either themself or the entire instance, like spawning cool effects or new objects.

:::caution
If viewing the example scene, you'll also need the [Open Group Page](/economy/sdk/examples/open-group-page) prefab. Otherwise, your project will be missing what it needs for a complete scene.
:::

### How to Use

For this (and most!) prefabs, you'll first need an UdonProduct to check for and a way for players to subscribe to this product. 

Once you've created a purchasable product:

1. Drag the chosen prefab into your scene. Which prefab you use depends on what logic you would like to have in your world. Each prefab has its own behavior, which you can view in the **Prefabs Included** section.

![DraggingPrefab](/img/economy/examples/ProductToggle_DragIntoScene.png "Dragging the chosen prefab.")

2. In the Inspector, add which Udon Product you would like to check for.

![AddProduct](/img/economy/examples/ProductToggle_SelectProduct.png "Adding a product to check for.")

3. In the Inspector, replace the Target object with whatever object you would like to be enabled/disabled when a player owns the Udon Product. Here's an example of **ToggleObjectOff** in action:

<div class="video-container">
    <iframe src="https://assets.vrchat.com/videos/docs/ProductToggle_Demo.mp4" title="Product Toggle" frameborder="0" allow="encrypted-media; gyroscope; web-share" allowfullscreen></iframe>
</div>

4. Run Build & Test!

### Inspector Parameters

* `Udon Product` - The Udon Product that counts as being a subscriber when owned.
* `Targets` - The objects that will be activated/deactivated when the product is bought/expired.
* `Default State` - The default state the target's active state will be set to when the product is not bought.
* `Local Only` - If true, will only activate/deactivate when it's bought/expired by the local player. If false, will activate/deactivate when it's owned by any player.
