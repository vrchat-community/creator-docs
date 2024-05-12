---
title: "Your Store"
sidebar_position: 2
---

import SellerNotification from '/docs/economy/_sellers-notification.mdx';

<SellerNotification/>

Your Store is where **verified sellers** can manage all products they're selling. The Store automatically creates listings for any new Paid Role products you create for your groups, but must be activated them before a user can purchase them.

### Accessing Your Store

To view and update your Store:

1. Navigate to [vrchat.com/home](https://vrchat.com/home)
2. Go to the **Marketplace** tab in the left-hand sidebar.
3. Click **Storefront**.

***
## Managing Your Store

Your VRChat store is divided into four parts:
1. Dashboard
2. My Listings
3. My Products
4. My Sales

Your dashboard and sales show you information and statistics on your sales and earnings data. We'll be focusing on Listings and Products here.

- **Products** are what you create to sell in VRChat, like paid roles and Udon products. A user cannot purchase products directly. They must be part of a **listing**.

- **Listings** are how a user sees and purchases products, like putting items on display in a store. Listings can also hold multiple products you’d to sell as a bundle. You can add up to 10 products to a listing.

### Viewing and editing products

Each listing automatically contains a **Paid Role Product**. In addition, you can add several **Udon Products**.

When you create a paid role, a paid role product is automatically created as well. This product is what gets added to a **listing** in your Store. Group roles are tied to their listings, so by buying the role product, users receive the associated Group role.
You can customize the role after creation, change its permissions, or add a thumbnail.

#### To edit the paid role: 

1. Open the Marketplace tab on the VRChat website and go to [Storefront](https://vrchat.com/home/marketplace/storefront/dashboard).
2. Click **My Products** and select your paid role product. Here, you can change all Group settings of your paid role.

![Edit role product](/img/economy/Store-EditRoleProduct.png "Click Edit Paid Role")

3. Decide if you want to enable "Bypass Join Rules." If enabled, users can buy the role to enter a Group regardless of that Group's join rules or restrictions
    1. If enabling "Bypass Join Rules," choose to enable or disable **Remove Members After Expiration**.
    2. If enabled, when the subscription of a user who joined via bypassing expires, they will be removed from the group if the Group is not open and the user has no other active paid roles in it.

![Edit role product page](/img/economy/Store-EditRoleProductInfo.png "Edit Role Product")

***
### Customizing your listing

**Listings** are created automatically with each **Paid Group Role**. These listings are what users see in your Group's store. By default, the listing will contain just your paid role product. You can add additional products to give your supporters more benefits.

![Click Edit listing](/img/economy/Store-Listings.png "Click Edit Listing")

#### To customize your listing:

1. Pick a name for your Listing. By default, this uses the name chosen when creating the Paid Role.
2. You may select the image you want to display as the icon.
    1. It must be less than 3MB, larger than 64x64 pixels, and smaller than 512x512 pixels.
3. Set a VRChat Credit amount from 100 to 10,000 credits for this role.
    1. **Optional:** You can offer lower discounts based on monthly purchases. For example, if your base price is 200 credits a month, you could offer 3 months for 150 credits per month, 6 months for 150 credits per month, etc.
4. Add Udon Products to your listing. By default, this listing only contains the Group Role listing, but you can add up to 9 Udon Products to the listing as well.

![Edit listing](/img/economy/Store-EditListing.png "Edit Listing")

You need to activate the listing before users can buy it. "Activating" a listing allows it to appear in the store menu. One use is to have "Seasonal" listings, where users can purchase a listing that you only have activated for a period of time.

Deactivating a listing does **not** cancel active user subscriptions, it only stops users from purchasing new ones.

![Activate listing](/img/economy/Store-ActivateListing.png "Activate Listing")

### To add and edit an Udon product:

The steps for this are smiliar to adding a paid role to your Store. 

1. Click on the **My Products** button at the top of your Store page.
2. Click on the **Create Udon Product** button.

![Creating a new Udon prodcut](/img/economy/Store-CreateUdonProduct.png "Creating a new Udon product")

3. Add a name, description, and image.
4. Click the **ID** button on your new Udon product to copy the product ID. You'll need to add this ID to the object you're trying to sell in Unity.
5. [Head to our Udon Products page](/economy/products/udon) for next steps on creating UdonProducts in Unity.

![Editing a new Udon Product](/img/economy/Store-CreateUdonProductEdit.png "Editing a new Udon Product")

### Restrictions

* Your listing cannot violate our [Community Guidelines](https://hello.vrchat.com/community-guidelines) or [Terms of Service](https://hello.vrchat.com/legal).
* Your listing must contain at least one Group Role.
* You cannot add products from different groups into one listing. For example, you cannot add a paid role from Group A and a paid role from Group B into the same listing.

## Viewing my Store

Any user can view and purchase from your Store via your Group. They can see a **Store** tab in VRChat and the website, which will list everything for purchase from your Store.

![Store page](/img/economy/Store-PreviewStoreWeb.png "Opening your Store page")

![Store page in-game](/img/economy/Store-PreviewStoreClient.png "Opening your group's Store page in VRChat")

You can either link them directly to your Group on the web by copying and pasting its link.

![Copy group URL](/img/economy/Store-CopyShortCode.png "Copying your group's VRChat.com URL")

Or have a user navigate to the **Groups** tab in VRChat.

From here, they can either join your Group by typing in the Group code, which will look something like Test.0000, or they can search for it via the Group search function.