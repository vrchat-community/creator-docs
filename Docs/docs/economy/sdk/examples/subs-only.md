---
title: "Subscribers Only Area"
---

import SellerNotification from '/docs/economy/_sellers-notification.mdx';

<SellerNotification/>

Subscribers Only Area is a prefab that sets up an area where only subscribers can enter or non subscribers cannot leave from. Use this to create exclusive areas, events, and experiences in your world.

### How to Import
1. Download the [Unity package directly by clicking here](https://cdn.sanity.io/files/yvg0vlb9/production/277cc7e138047d7c34451d52123607fc9970dbd4.unitypackage).
2. Make sure your project is using the World SDK `3.5.0`or newer.
3. Import the Unity package into your project.

##### Prefabs Included
* **SubscribersOnlyAreaExamplePrefab**: A prefab that contains a full example of how to use the SubcribersOnlyArea script.

:::caution
If viewing the example scene, you'll also need the [Open Group Page](/economy/sdk/examples/open-group-page) and [Udon Product Toggle](/economy/sdk/examples/product-toggle) prefabs. Otherwise, your project will be missing what it needs for a complete example scene.
:::

### How to Use

For this (and most!) prefabs, you'll first need an UdonProduct to check for and a way for players to subscribe to this product. 

Once you've created a purchasable product:

1. Open the **SubscribersOnlyAreaExampleScene** from your Project window. The scene will contain a building asset to help you test and understand how the prefab works.

![PrefabScene](/img/economy/examples/SubsOnlyArea_DragIntoScene.png "Opening the example scene.")

2. In the Hierarchy, click on the **SubcribersOnlyAreaExamplePrefab**. 

![HierarchyClick](/img/economy/examples/SubsOnlyArea_SelectInHierarchy.png "Finding the prefab in the hierarchy.")

3. In the Inspector, add which Udon Product you would like to check for when a player enters or is inside of a certain area.

![AddProduct](/img/economy/examples/SubsOnlyArea_SelectProduct.png "Adding a product to check for.")

5. In the Hierarchy, select **OpenListingSimplePrefab**. Paste your listing ID here. This will show a link to purchase the product where necessary.
    -   To get your listing ID, go to [vrchat.com/home](https://vrchat.com/home), then Marketplace -> Storefront -> My Listings.

![AddListingID](/img/economy/examples/SubsOnlyArea_OpenListingPrefab.png "Adding a listing ID.")

6. In the Hierarchy, click on the **SubcribersOnlyAreaExamplePrefab** again. You'll see a few different settings:

    -    **Trespassing Message** is what appears if a player enters/is inside a subscriber-only area and does not own the correct Udon Product.

    - **Trespassing Teleport Location** is where the player is sent if they try and enter or have ended up in a location they do not have access to. You can move this in your scene to wherever you like, just make sure it's outside of the subscriber-only area.

    - **Area Colliders** are what keep non-subs out of your exclusive area. In this prefab, it is a box collider inside of our example asset. You should adjust this in your scenes to best fit your needs.

![TrespassingText](/img/economy/examples/SubsOnlyArea_TresspassingMessage.png "Trespassing message text.")

7. If you would like to keep non subscribers inside of a specific area instead, enable **Keep People In Area**. If enabled, make sure your spawn and Trespassing Teleport Location are within the collider instead of outside the collider. 

:::tip
Enable this if you are creating a large, exclusive area, and want to keep all non-subs together. Think lining up to buy tickets before getting into an amusement park. We recommend you keep it disabled if you're only sectioning off a small part of your world, like an exclusive room.
:::

8. In the Hierarchy, click on the drop down arrow next to **SubcribersOnlyAreaExamplePrefab**. Click on **SubscribersOnlyAreaBlockerToggle**. 

9. In the Inspector, select the same Udon Product you chose earlier. Now, when a player owns this product, this door will be disabled.
    -  You can read more about disabling and enabling blockers like doors and walls on the [Udon Product Toggle](/economy/sdk/examples/product-toggle) prefab page.

9. Run Build & Test!

### Inspector Parameters

* `Udon Product` - The Udon Product that counts as being a subscriber when owned.
* `Trespassing Message` - The GameObject that will be activated and shown when the player is trespassing to show them the trespassing message.
* `Trespassing Teleport Location` - The location the player will be teleported to when they have trespassed.
* `Area Colliders` - The colliders that define the area that is for subscribers/non subscribers only depending on the Keep People In Area Toggle. These will be disabled at runtime to save performance.
* `Keep People In Area` - Toggle this on to force players to stay in area instead of keeping them outside the area. Make sure your spawn and Teleport Location are inside the area if you use this.
