---
sidebar_position: 2
sidebar_custom_props:
    description: Create listings, add products, and sell them.
    customIcon: 🛍
---

# Listings

import SellerNotification from '/docs/economy/_sellers-notification.mdx';

<SellerNotification/>

Listings allow you to monetize your VRChat world by selling permanent or temporary rewards. Users can unlock new areas of the world, customization options, limited-time benefits, and more.

Listings contain [products](/economy/products/), which are the rewards users receive for buying your listings. Users keep the rewards until the listing expires, depending on its [duration type](#2-duration-type).

You can choose your listings' [visibility](#visibility). Listings can appear in your [world store](#world-stores), or you can use Udon to [open a listing's purchase screen](#udon-buttons-in-your-world) directly, even if your store is unpublished.

Listings are similar to [subscriptions](/economy/subscriptions).

## Create a listing

You can create your first listing by following the steps below:

---

import Columns from '@site/src/components/Columns';
import Column from '@site/src/components/Column';

<Columns> 
<Column className='text--left'>

### 1. Create new listing

Open the [My Listings](https://vrchat.com/home/marketplace/storefront/listings) section of your [Storefront](https://vrchat.com/home/marketplace/storefront/) on [VRChat.com](https://vrchat.com/home/) to create a listing.

Click "Create Listing" to create your first listing.

:::info

After creating your first listing, return to this screen to edit, publish, unpublish, or delete your listings.

:::

</Column>
<Column className='text--left'>

![Create listing screen on VRChat.com](/img/economy/listings/listing-create.png)

</Column>
</Columns>

---

<Columns> 
<Column className='text--left'>

### 2. Duration Type

Choose one of the three duration type for your listing:

- Instant
- Temporary
- Permanent

You cannot change the type after creating your listing.

The differences between duration types are explained below.

</Column>
<Column className='text--left'>

![Choose listing duration on VRChat.com](/img/economy/listings/listing-choose-duration.png)

</Column>
</Columns>

<Columns> 
<Column className='text--left'>
#### Instant
Instant listings **do not have a duration**. Instead, you give buyers an immediate reward with Udon. Buyers can purchase the listing as many times as they want.

For example, you could sell:
- Spawnable items or pickups
- Short animations that everyone in the instance to see
- Virtual persistent currency

Only users who are currently in your world can buy instant listings. Otherwise, the purchase screen asks them to visit your world first.

</Column>
<Column className='text--left'>
#### Temporary
The duration of temporary listings is **five minutes to three months**. Buyers own the listing until the duration expires, similar to [group subscriptions](./subscriptions).

For example, you could sell:
- Access to temporary events, boosts, or season passes
- Cosmetics or customization options
- Trials for permanent listings

You choose the duration of a temporary listing by editing its [details](#3-details). Buyers can't purchase the listing again until its duration expires.

</Column>
<Column className='text--left'>
#### Permanent
The duration of permanent listings is **unlimited**. Buyers gain lifetime access to the listing.
<br />

For example, you could sell:
- Permanent access to new areas of your world
- Cosmetics or customization options
- Unlockable abilities or gimmicks

Buyers can't buy the same permanent listing more than once.
	
</Column>
</Columns>

Click "Next" after choosing a duration type.

---

<Columns>
<Column  className='text--left'>

### 3. Details

Choose the name, price, and other details of your listing.

- **Add Products**: Choose 1 to 10 [products](./products).
	- Users own these products until the [duration](#2-duration-type) expires.
	- You can add the same products to different listings.
	- Users who look at your listing can see the name, description, and thumbnail of the products.
- **Name**: The name of your listing.
- **Description**: The description of your listing.
- **Thumbnails**: The image representing your listing.
- **Duration**: The duration of the listing. (Only appears for [temporary](#temporary) listings)
- **Price**: The purchase price of your listing in VRChat Credits.

:::tip

You can change all details later. Take your time to create an eyecatching thumbnail and an accurate description!

:::

Click "Next" after choosing the details. You can edit the details later.

</Column>
<Column className='text--right'>

![Create listing screen on VRChat.com](/img/economy/listings/listing-edit-details.png)

</Column>

</Columns>

---

<Columns>
<Column  className='text--left'>

### 4. Visibility

Choose where users can see your listing.

- **Store Availability**: Choose the world stores where users can buy this listing.
	- You can add the same listing to multiple world stores.
	- You can create new stores in the [store manager](https://vrchat.com/b/home/marketplace/storefront/stores).
- **Visibility**: Choose whether to save the listing as a draft or publish it immediately.

:::tip

You can sell listings without selecting a world store. Simply use [Store.OpenListing](/economy/sdk/udon-documentation#storeopenlisting) to open your listing with Udon, like in the [Open Listing example prefab](/economy/sdk/examples/open-listing).

:::

Click "Next" to save your listing. Congratulations!

</Column>
<Column className='text--right'>
	
![Create listing screen on VRChat.com](/img/economy/listings/listing-edit-visibility.png)

</Column>
</Columns>

## Edit your listing

You can edit the details of your listings on the [My Listings](https://vrchat.com/home/marketplace/storefront/listings/) page.

### Details

You can freely edit all details of your listing, such as its name, description, thumbnail, price, and [temporary](#temporary) duration.

You can also change, add, or remove products from your listing. This is helpful if you want to reorganize your store or to give your supporters additional rewards. However, be careful when removing products, as you may accidently remove benefits that your customers expect to own.

You cannot change the [duration type](#2-duration-type) of listings after creating them.

### Delete

Click "Delete" on [My Listings](https://vrchat.com/home/marketplace/storefront/listings/) to delete a listing. You only delete listings that don't have any owners.

- [Instant](#instant) listings can always be deleted.
- [Temporary](#temporary) listings can be deleted after you [unpublish](#unpublish-listings) them and wait for all current owners to expire.
- [Permanent](#permanent) listings **cannot be deleted** after any user has purchased them.

### Visibility

The visibility of a listing depends on its status. Open [My Listings](https://vrchat.com/home/marketplace/storefront/listings/page/1) to change the status of your listings:

- "Published" listings can be purchased by users.
- "Draft" listings cannot be purchased by users. If users already purchased the listing, they keep it.

After publishing a listing, users can only see it if you added it to a world [store](/economy/store) or if you have a store inside your world. 

:::tip
To maximize your sales, you should use world [stores](/economy/store) **and** add Udon stores to your world!
:::

#### World stores

- Users see your world [store](/economy/store) when looking at your world in VRChat's menu.
- World stores are easy to create and manage from the [Store Manager](https://vrchat.com/home/marketplace/storefront/stores)
- The world store is visible when users look at your world details in VRChat's menu.
- Users don't have to be in your world to use your world store.

#### Udon buttons in your world

- You can use [Udon](/worlds/udon/) to create "Buy" buttons or custom stores inside your world.
- The [Open Listing](/economy/sdk/examples/open-listing) prefab allows you to easily add a "Buy" button that users can press when visiting your world.
- You can also create "hidden" listings that users can't find in your world store or elsewhere.
- If you're experienced with Udon, write your Udon scripts with the [Store.OpenListing](/economy/sdk/udon-documentation#storeopenlisting) method.

## Refunds

Refunds are processed on a case-by-case basis by VRChat. You cannot directly issue refunds to your buyers. If you need help issuing refunds to buyers of your listings, please contact VRChat.