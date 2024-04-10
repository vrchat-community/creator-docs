---
sidebar_position: 2
---

# Udon Products

import SellerNotification from '/docs/economy/_sellers-notification.mdx';

<SellerNotification/>

An Udon product is a type of product you can give to your paid Group members when they purchase a listing. You can use Udon products to do various things like unlock new areas, customize your world, or display a message.

You can use the VRChat Worlds SDK to detect if a player owns a product. This allows your world to reward players for supporting you. 

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

Visit the [Creator Economy SDK documentation](/economy/sdk/udon-documentation) for next steps.
