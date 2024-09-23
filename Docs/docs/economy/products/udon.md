---
description: "Unlock benefits in your worlds with Udon scripts and prefabs."
sidebar_custom_props:
    customIcon: 🌍
---

# Udon Products

import SellerNotification from '/docs/economy/_sellers-notification.mdx';

<SellerNotification/>

An Udon product is a type of product you can give to your paid Group members when they purchase a listing.

Your world can detect Udon products and reward players for supporting you. You can unlock new areas, customize your world, or display a nice "Thank you" message.

Before you can use Udon products in your world, you need to create them on the VRChat website by following these steps:

## Creating Udon products

1. Navigate to [vrchat.com/home](https://vrchat.com/home)
2. Go to the **Marketplace** tab in the left-hand sidebar, then open **Storefront**.
3. Scroll down and select **My Products**.

![How to create Udon products on VRChat.com..](/img/economy/products/web-create-udon-product-button.png)

4. Click on **Create Udon Product**.
5. Enter a display name.
6. Add a description and image for your Udon product. This is optional, but we recommend doing so.

![How to create Udon products on VRChat.com..](/img/economy/products/web-create-udon-product-popup.png)

7. Click **Create**. 

## Editing Udon products

![How to create Udon products on VRChat.com..](/img/economy/products/web-create-udon-product-list-entry.png)

1. Click "Edit" next to any Udon product.
2. Change the name, description, or upload an image.
3. Click **Save Changes**.

You can change the product's name, description, image, and the 'Owner Names in Udon' setting. Any changes you make will apply to all your VRChat worlds without needing to reupload them. 

![How to create Udon products on VRChat.com..](/img/economy/products/web-enable-owner-names-in-udon.png)

If you'd like to use the VRChat SDK's [Store.ListProductOwners](/economy/sdk/udon-documentation#storelistproductowners) to list the owners of a Udon product in your world, 'Owner Names in Udon' must be enabled.


## Udon products and the VRChat SDK

Adding an Udon product to your store is just the first step. You need to actually create something for people to buy, and then attach it to an Udon product in your store.

- Use VRChat's [example prefabs](/economy/sdk/examples/) to get started with Udon products.
- Use the [Creator Economy SDK](/economy/sdk/) if you're experienced with Udon. You can write your own scripts to detect if a player owns a product.
