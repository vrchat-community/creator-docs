---
description: "Contains subscriptions for your group."
sidebar_custom_props:
    customIcon: 👥
---

# Group Stores

import SellerNotification from '/docs/economy/_sellers-notification.mdx';

<SellerNotification/>

Group stores allow you to easily sell [subscriptions](/economy/subscriptions) for your group. After you publish a group store, users can use your group's "Store" tab to discover and buy subscriptions.

If you have a VRChat world, you can add a button that opens your store. Use the [Open Group Page prefab](/economy/sdk/examples/open-group-page) or [`Store.OpenGroupStorePage`](/economy/sdk/udon-documentation#storeopengroupstorepage).

## Create a Group Store

The easiest way to create a group store is to create a [subscription](/economy/subscriptions). If your group does not have a store, creating a subscription also creates a group store.

Alternatively, you can create a group store from the [Store Manager](https://vrchat.com/home/marketplace/storefront/stores) by following the steps below:

1. Open the [store manager](https://vrchat.com/home/marketplace/storefront/stores) on the VRChat website.
2. Click the "Set up new store" button.
3. Select "Group Store."
4. Select one of your groups.
5. Click "Create" to create your group store.
	  - After creating your group store, users won't see it until you publish subscriptions and publish the store.
6. Create [subscriptions](/economy/subscriptions) and add them to your group.
	- You can use the [store manager](https://vrchat.com/home/marketplace/storefront/stores) to rearrange the order in which users see subscriptions in your store. 
7. Publish the subscriptions.
8. Publish your group store in the [store manager](https://vrchat.com/home/marketplace/storefront/stores).

![Publish store](/img/economy/stores/world-store/publish.png "Publish your store on the website")

:::info

If you have a world, use [Udon](/economy/sdk/udon-documentation) to sell your published listings and subscriptions. For example, the [Open Listing prefab](/economy/sdk/examples/open-listing) makes it easier for users to buy subscriptions, increasing your sales.

If you don't want to publish a world store at all, you can use Udon to sell subscriptions instead!

:::

## Viewing your Group Store

After you publish your group store, users can find it by opening the group in VRChat (or the VRChat website) and pressing the "Store" button. They can browse your published subscriptions and buy them.


![Store page](/img/economy/Store-PreviewStoreWeb.png "Opening your Store page")

![Store page in-game](/img/economy/Store-PreviewStoreClient.png "Opening your group's Store page in VRChat")

You can share your group by copying its URL from the VRChat website or by sharing its group ID (e.g., `GROUP.1234`). Users can enter the ID in the Groups tab in VRChat, allowing them to view or join your group.

![Copy group URL](/img/economy/Store-CopyShortCode.png "Copying your group's VRChat.com URL")


## Limitations

- Group stores cannot contain [listings](/economy/listings).
- You cannot transfer your group if it has any subscribers.
