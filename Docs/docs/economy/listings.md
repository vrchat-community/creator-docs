---
sidebar_position: 2
sidebar_custom_props:
    description: Create listings, add products, and sell them.
    customIcon: 🛍
---

# Listings

import SellerNotification from '/docs/economy/_sellers-notification.mdx';
import ThemedCreditIcon from '/docs/economy/_credit-icon.mdx';

<SellerNotification/>

Listings allow you to monetize your VRChat content by selling rewards, such as unlocking avatars or world features.

Users can buy listings, which contain [products](/economy/products/). Each listing can contain 1-15 products. Users keep the products until the listing expires, depending on its [duration type](#2-duration-type). For example, [permanent](#%EF%B8%8Fpermanent) listings never expire, and [instant](#instant) listings expire immediately.

You can choose your listing's [visibility](#visibility). Listings can appear in your [store](/economy/store), or you can use Udon in your world to [open a listing](#udon-store-prefabs-in-your-world) directly, even if your store is not published.

Listings are similar to [subscriptions](/economy/subscriptions).

## Create a listing

Create your first listing by following the steps below:

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
#### ♾️Permanent
The duration of permanent listings is **unlimited**. Buyers gain lifetime access to the listing.

You can add the following products:
- [Udon products](/economy/products/udon)
- [Avatar products](/economy/products/avatar)

For example, you could sell permanent access to avatars, world features, or world cosmetics. 

</Column>
<Column className='text--left'>
#### ⌛Temporary
The duration of temporary listings is **five minutes to three months**. Buyers own the listing until the duration expires, similar to [group subscriptions](./subscriptions).

You can add the following products:
- [Udon products](/economy/products/udon)

For example, you could sell temporary benefits for your VRChat world, such as boosts, cosmetics, features, or trials.

You choose the duration of a temporary listing by editing its [details](#3-details). Buyers can't purchase the listing again until its duration expires.

</Column>
<Column className='text--left'>
#### ⚡Instant

Instant listings **do not have a duration**. Instead, you give buyers an immediate reward with Udon. Buyers can purchase the listing as many times as they want.

You can add the following products:
- [Udon products](/economy/products/udon)

For example, you could sell spawnable items, pickups, animations, or virtual persistent currencies for your world.

Only users who are currently in your world can buy instant listings. Otherwise, the purchase screen asks them to visit your world first.

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
- **Price**: Choose the  purchase price of your listing (see [pricing](#31-pricing) below).

:::tip

You should create an eyecatching thumbnail and an accurate description - but you don't need to do it immediately. You can edit the listing later.

:::

</Column>
<Column className='text--right'>

![Create listing screen on VRChat.com](/img/economy/listings/listing-edit-details.png)

</Column>

</Columns>

#### 3.1 Pricing

You may choose a price of 100-100,000<ThemedCreditIcon/> for most listing types.[^1] You can change the price later - users who currently own your listing are be affected.

However, non-[permanent](/economy/listings#%EF%B8%8Fpermanent) listings and [avatar products](/economy/products/avatar) have the following limitations:

- Your [instant](/economy/listings#instant) listings, [temporary](/economy/listings#temporary) listings, and [subscriptions](/economy/subscriptions) may not be priced higher than 10,000<ThemedCreditIcon/>.
- If your listing contains [avatar products](/economy/products/avatar), its price must be least 1,200<ThemedCreditIcon/> per different avatar product in the listing, excluding variants of the same avatar. For example:
	1. If your listing contains two different avatars, it must cost at least 2,400<ThemedCreditIcon/> (1,200 <ThemedCreditIcon/> × 2).
	2. If your listing contains two variants of the same avatar, i.e. different colors or outfits, it must cost at least 1,200<ThemedCreditIcon/>.
	3. If your listing contains a single avatar, it must cost at least 1,200<ThemedCreditIcon/>.


You can also find this information in our [guidelines](/economy/guidelines#avatars).

Click "Next" after choosing the listing details.

---

<Columns>
<Column  className='text--left'>

### 4. Visibility

Choose where users can see your listing.

- **Store Availability**: Choose the world stores where users can buy this listing.
	- You can add the same listing to multiple world stores.
	- You can create new stores in the [store manager](https://vrchat.com/b/home/marketplace/storefront/stores).
	- If your listing contains [avatar products](/economy/products/avatar), the [avatar marketplace](/economy/store/avatar-marketplace) is automatically chosen.
- **Visibility**: Choose whether to save the listing as a draft or publish it immediately.
	- Users can't see or buy your listing until you publish it.
	- You can publish listings without selecting any stores.

</Column>
<Column className='text--right'>
	
![Create listing screen on VRChat.com](/img/economy/listings/listing-edit-visibility.png)

</Column>
</Columns>

Click "Next" to save your listing. Congratulations! Users can now buy your listing in the stores you chose.

:::tip

If you have a world, you can use the [open listing example prefab](/economy/sdk/examples/open-listing) to open any published listing.

:::

## Edit your listing

You can edit the details of your listings on the [My Listings](https://vrchat.com/home/marketplace/storefront/listings/) page.

### Details

You can edit most details of your listing at any time, even after publishing it:
- ✅You can edit listing's **name, description, thumbnail,** and other general properties.
- ✅You can edit the **product name, description, thumbnail**, and other properties of products in your listing.
	- If you reupload an [avatar product](/economy/products/avatar), VRChat must review it first.
- ✅You can edit your listing's **price**.
    - If your listing is a subscription, existing owners are unaffected by the price change.
- ✅You can **add products** to your listing.
	- New and existing owners gain access to the products you added.
- ✅You can **remove [Udon products](/economy/products/udon) and [subscription role products](/economy/products/paid-role)** from your listing.
    - This is helpful if you want to reorganize your store or to give your supporters additional rewards.
	- Careful when removing these products - don't accidently remove benefits that your customers expect to own.
- ✅You can **change the duration** of [temporary](#temporary) listings.

Some aspects of your listing cannot be changed:
- ❌You cannot **change the [duration type](#2-duration-type)** of listings after creating them.
- ❌You cannot **remove [avatar products](/economy/products/avatar)** that any user currently owns.



### Delete

Click "Delete" on [My Listings](https://vrchat.com/home/marketplace/storefront/listings/) to delete a listing. You only delete listings that don't have any owners.

- [Instant](#instant) listings can always be deleted.
- [Temporary](#temporary) listings can be deleted after you [unpublish](#4-visibility) them and wait for all current owners to expire.
- [Permanent](#%EF%B8%8Fpermanent) listings **cannot be deleted** after any user has purchased them.

### Visibility

The visibility of a listing depends on its status. Open [My Listings](https://vrchat.com/home/marketplace/storefront/listings/page/1) to change the status of your listings:

- "Published" listings can be purchased by users.
- "Draft" listings cannot be purchased by users. If users already purchased the listing, they keep it.

If your listing contains any [avatar products](/economy/products/avatar), it's automatically published on VRChat's avatar marketplace. In addition, you may add it to a [world store](/economy/store).

If your listing does not contain any avatar products, users can only find it if you add it to your [world store](/economy/store) or if you have a store prefab in your world that uses Udon to open listings. (Use both to make your listings easier to find.)

:::tip
Use a combination of [stores](/economy/store) and Udon [store prefabs](/economy/sdk/examples/) to make your world listings easier for users to find.
:::

#### World stores

- Users see your world [store](/economy/store) when looking at your world in VRChat's menu.
- World stores are easy to create and manage from the [Store Manager](https://vrchat.com/home/marketplace/storefront/stores)
- The world store is visible when users look at your world details in VRChat's menu.
- Users don't have to be in your world to use your world store.

#### Avatar marketplace

- If your published listing contains any [avatar products](/economy/products/avatar), users automatically see your listing on the avatar marketplace. 

#### Udon store prefabs in your world

- You can use [Udon](/worlds/udon/) to create "Buy" buttons or custom stores inside your world.
- The [Open Listing](/economy/sdk/examples/open-listing) prefab allows you to easily add a "Buy" button that users can press when visiting your world.
- You can also create "hidden" listings that users can't find in your world store or elsewhere.
- If you're experienced with Udon, write your Udon scripts with the [Store.OpenListing](/economy/sdk/udon-documentation#storeopenlisting) method.

### Quantity Purchases

You can allow users to buy [instant](#instant) listings in large quantities. Go to the listing details and select "Enable Quantity Purchases". When users buy the listing, they can choose to buy it up to 99 times at once.

You should use the Udon method (OnPurchaseConfirmedMultiple)[/economy/sdk/udon-documentation#onpurchaseconfirmed] to detect the quantity of the purchase and give users an appropriate reward.


## Refunds

Refunds are processed on a case-by-case basis by VRChat. You cannot directly issue refunds to your buyers. If you need help issuing refunds to buyers of your listings, please contact VRChat.

[^1]: VRChat may change the Creator Economy's minimum and maximum listing price in the future. We will inform you in advance before we implement a new minimum or maximum.