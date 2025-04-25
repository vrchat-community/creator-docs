---
description: "Contains listings for your world."
sidebar_custom_props:
    customIcon: 🌏
---

# World Stores

import SellerNotification from '/docs/economy/_sellers-notification.mdx';

<SellerNotification/>

World stores allow you to showcase [listings](/economy/listings) for your world. After creating a world store, users will see it when viewing your world in the VRChat menu or website. 

![World store](/img/economy/stores/world-store/world-store.png "A world store in VRChat.")

You can also use Udon to open your world store. For example, you can add an "Open Store" button that uses the `Store.OpenWorldStorePage()` method to open your store.
## Create and publish a world store

You can create a world store for any of your worlds by following the steps below:

1. Open the [Store Manager](https://vrchat.com/home/marketplace/storefront/stores) on the VRChat website (Marketplace >My Store > Store Manager).
2. Click "Set Up New Store"

![Setup new store](/img/economy/stores/world-store/setup-new-store.png "Open the marketplace tab and set up a new store.")

3. Press "World Store", choose one of your worlds from the dropdown, then press "Create".

![Choose world](/img/economy/stores/world-store/choose-world.png "Choose a world for your world store")

4. Add published [listings](/economy/listings) to your world store.
	- You can use the [store manager](https://vrchat.com/home/marketplace/storefront/stores) to rearrange the order in which users see subscriptions in your store. 
	- Read the [listings documentation](https://creators.vrchat.com/economy/listings) to learn how to add listings to your store.

5. Open your store in the store manager and publish it.

![Publish store](/img/economy/stores/world-store/publish.png "Publish your store on the website")

6. Open your world in VRChat. You can now see the world store in the VRChat menu.

![World store in VRChat](/img/economy/stores/world-store/world-store-in-vrchat.png "View your store in VRChat")

## Limitations

Keep the following restrictions in mind when using world stores:

- You can sell the same listing to multiple world stores.
	- You can sell listings that give users benefits in multiple worlds.
	- Users can't buy the same listing if they already own it.
- You can sell [permanent](/economy/listings#permanent) or [temporary](/economy/listings#temporary) listings without adding them to your world store. 
	- You can use Udon to open listings directly, i.e. with [Store.OpenListing](/economy/sdk/udon-documentation#storeopenlisting).
	- You can't sell [instant](/economy/listings#instant) listings without adding them to your world store. In addition, only users who are currently visiting your world can buy instant listings.
- You cannot add [subscriptions](/economy/subscriptions) to your world stores.
	- Use group stores instead.
