---
title: Getting Started
sidebar_position: 0
---

import SellerNotification from '/docs/economy/_sellers-notification.mdx';

<SellerNotification/>

This page explains how to get started using the Creator Economy in the VRChat Worlds SDK. Before you begin, you'll need to have created a [VRChat World in Unity](/worlds/creating-your-first-world).

You must also have created an Udon product in your Store. Please visit the [Udon product page](/economy/products/udon) if you haven't done this yet.

If you've done everything above, you're ready to edit your Unity project.

## UdonProduct Manager

The **UdonProduct Manager** is an editor window that shows you all Udon Products you've created on VRChat.com. If you haven't created any yet, this window will be blank.

You can add Udon products to your project automatically with the UdonProduct Manager.

![A screenshot of the UdonProducts manager.](/img/economy/sdk/udonproducts-manager.png)

To open the UdonProduct Manager window, open the **VRChat SDK** tab at the top of the Unity Window, then click **UdonProducts Manager**.

The manager lets you:
- Fetch the thumbnail image of the product. This creates a texture you can use in your Unity project.
- Ping the product asset in the **Project** window, making the product easy to find.
- Purchase and expire the product for debugging purposes if you have ClientSim installed.

The manager lists all products in two lists: "Used in the scene" and "Used in the project". The former will update its list whenever you save your current scene.

Any error or other information will appear at the bottom of the window.

:::note 
Fetched textures inside your project do not automatically update if you update your Udon product's image on VRChat.com. To update the fetched texture, delete and fetch it again in your Unity project.
:::

### Creating an Udon product manually

You can also create and manage your Udon Products manually.

1. Right-click in your Assets window or click "Assets" > "Create" at the top of your Unity window.
2. Click "VRChat" > "UdonProduct" to create an UdonProduct asset in your Assets folder.
3. (Optional) Choose a file name.
4. Select the UdonProduct asset and view it in Unity's inspector.

![A blank UdonProduct after creation](/img/economy/sdk/udonproduct-blank.png)

5. Copy the ID of your Udon Product from VRChat.com, and paste it in the "ID" field of your UdonProduct asset.
6. (Optional) Click "Fetch product details" to see the name and description of your product in Unity.
7. (Optional) Click "Fetch product image" to create a texture based on your product's current thumbnail image.

## Adding UdonProducts to your world

After creating UdonProduct assets, you can use them in Udon scripts.

The VRChat SDK has [examples and prefabs that can be used with your Udon product](/economy/sdk/examples/) by dragging a prefab into your scene and choosing an UdonProduct asset. The prefabs are beginner-friendly and don't require any Udon or coding knowledge.

If you're experienced with Udon and the VRChat Worlds SDK, you can create your own scripts and use them with Udon products.

To learn how, read our full documentation on the [Creator Economy's SDK features](/economy/sdk/udon-documentation).