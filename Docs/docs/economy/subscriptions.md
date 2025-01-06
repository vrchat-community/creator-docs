---
sidebar_position: 3
description: Create subscriptions in your Group.
sidebar_custom_props:
    customIcon: 👛
---


# Subscriptions

import SellerNotification from '/docs/economy/_sellers-notification.mdx';

<SellerNotification/>

Subscriptions are the easiest way to monetize your VRChat group. Users can visit your group store to buy a subscription. They receive a group role as a reward, but you can also grant them additional group permissions or Udon products.

You can choose your subscription's [visibility](#visibility). Subscriptions can appear in your group store, or you can use Udon to [open a published subscription's purchase screen](#udon-buttons-in-your-world) directly, even if your store is unpublished.

Subscriptions are similar to [listings](/economy/listings).

## Subscriptions, roles, and products

Each subscriptions consists of a subscription, a subscription role product, and a subscription role. Here's how they're related:

<Columns> 
<Column className='text--left'>

### Subscription

Users buy subscription in your group [store](/economy/store). Subscribers gain access to the subscription's [products](/economy/products/). They lose access when their subscription ends.

Each subscriptions contains exactly one [subscription role product](#subscription-role-product). You can also add multiple [Udon products](/economy/products/udon).



</Column>
<Column className='text--left'>

### Subscription role product

Users who own this [product](/economy/products/) gain access to a [subscription role](#subscription-role) in your group.

When you create a subscription, you automatically create a role product. You cannot create subscription role products manually.


</Column>
<Column className='text--left'>

### Subscription role

Users with this [group role](https://wiki.vrchat.com/wiki/Groups#Group_roles_and_permissions) can gain special permissions in your group or group instances. You can use it as a reward for your subscribers.

To learn more, read the [subscription role documentation](/economy/products/paid-role).

</Column>
</Columns>

## Create a subscription

Follow the steps below to create your first subscription. You'll create a subscription, a subscription role product, and a subscription role.

import Columns from '@site/src/components/Columns';
import Column from '@site/src/components/Column';

---

<Columns> 
<Column className='text--left'>

### 1. Create new subscription

Create a new subscription on any of the following sections of the VRChat website: 

- [My Subscriptions](https://vrchat.com/home/marketplace/storefront/subscriptions)
	- Click "Create Subscription."
- [Store Manager](https://vrchat.com/home/marketplace/storefront/stores/)
	- Select a group.
	- Click "Create Subscription."

After creating your first subscription, you can also edit your subscriptions by visiting the pages above.

</Column>
<Column className='text--right'>

![Create listing screen on VRChat.com](/img/economy/listings/subscription-create.png)

</Column>
</Columns>

---

<Columns> 
<Column className='text--left'>

### 2. Group

Choose a group for your subscription.

Each subscription is always connected to a single group. This cannot be changed later.

</Column>
<Column className='text--left'>

![Create listing screen on VRChat.com](/img/economy/listings/subscription-select-group.png)

</Column>
</Columns>

---

<Columns> 
<Column className='text--left'>

### 3. Role details

Choose the subscription role's name and description. This also determines the initial name of the name of the subscription role product.

:::tip

You can add a thumbnail to your subscription role product by editing it on the [My Products](https://vrchat.com/home/marketplace/storefront/products/). 

:::

Click "Next" to save the subscription role details.

</Column>
<Column className='text--left'>

![Create listing screen on VRChat.com](/img/economy/listings/subscription-create-role.png)

</Column>
</Columns>

---

<Columns> 
<Column className='text--left'>

### 4. Role permissions

Users who buy your subscription also receive a group role. Choose the permissions of the group role. You can allow subscribers to view all members, enter group instances, gain instance queue priority, and more.

:::tip

Turn on "Enable Free Join for Subscribers" to allow subscribers to join your group directly, even if the original group settings are set to "Request to Join" or "Invite-Only". This makes it easier for users to subscribe without needing prior group access.

:::

You can change the permissions later in your [group settings](https://vrchat.com/home/groups). Read the [subscription role documentation](/economy/products/paid-role) to learn more.

Click "Next" to create the subscription, product, and role.

</Column>
<Column className='text--left'>

![Create listing screen on VRChat.com](/img/economy/listings/subscription-choose-permissions.png)


</Column>
</Columns>

---

<Columns> 
<Column className='text--left'>

### 5. Subscription details

Choose the name, description, thumbnail, and price of your subscription. When users browse your group store, they'll see the following details:

- **Name**: The name of your subscription.
- **Description**: An description of what subscribers get.
- **Thumbnail**: An image representing the subscription.
- **Monthly price and plans**: The price of your subscription.
	- Choose a price of 100-10,000 ![VRChat Credits](/img/economy/Icons_Credits@20.svg) per month.
	- Subscribers can buy 1, 3, 6, or 12 months at once.
	- You can encourage users to subscribe by offering reduced monthly rates for multi-month plans.

Click "Next" to save the subscription details.

:::tip

You can change the subscription details later. Take your time to create an appealing thumbnail!

:::

</Column>
<Column className='text--left'>

![Create listing screen on VRChat.com](/img/economy/listings/subscription-create-details.png)

</Column>
</Columns>

---

<Columns> 
<Column className='text--left'>

### 6. Subscription products

Choose the [products](/economy/products/) that are included in this subscription. You can give subscribers access to up to 10 products.

The [role you created in step three](/economy/subscriptions#3-role-details) is always included and cannot be removed from the subscription. However, you can freely add and remove other products, such as [Udon products](/economy/products/udon), even while users are already subscribed.

Click "Next" to save your subscription as a draft.

</Column>
<Column className='text--left'>

![Create listing screen on VRChat.com](/img/economy/listings/subscription-create-choose-products.png)

</Column>
</Columns>

---

<Columns> 
<Column className='text--left'>

### 7. Publish

After you create a listing, it is saved as a draft. You must publish it before users can buy it.

Open the [Store Manager](https://vrchat.com/home/marketplace/storefront/stores/) and select your group store.

- Change the status of your store from "Unpublished" to "Published" by click the button in the top right.
- Change the status of your listing from "Draft" to "Published" by opening the listing's setting and clicking "Publish."

</Column>
<Column className='text--left'>

![Create listing screen on VRChat.com](/img/economy/listings/subscription-publish.png)

</Column>
</Columns>

Congratulations! Users can purchase published subscriptions in your group store.

## Visibility

The visibility of a subscription depends on its status. Open [My Subscriptions](https://vrchat.com/home/marketplace/storefront/subscriptions) to change the status of your subscriptions:

- "Published" subscriptions can be purchased by users.
- "Draft" listings cannot be purchased by users. If users already purchased the listing, they keep it.

After publishing a subscriptions, users can only see it if you added it to a group [store](/economy/store) or if you have a store inside your world. 

:::tip
To maximize your sales, you should use world [stores](/economy/store) **and** add Udon stores to your world!
:::

## Details about renewal, payout, and cancellation

When you use subscriptions to monetize your VRChat group, remember the following details:

- Subscriptions do not automatically renew when their duration expires.
	- Users see a notification when their subscription is about to expire.
- Users can extend their subscription before their current subscription ends.
	- For example: If a user's subscription expires in 7 days, and they buy a 12-month subscription, their subscription is extended to 12 months and 7 days
- When a user subscribes, you receive VRChat Credits for the first month immediately. If they subscribe for more than one month, you receive the remaining credits every month.
	- For example: If a user subscribes for 12 months, you immediately receive the VRChat Credits for the first month. Next month, you will receive the VRChat Credits for the second month, and so on.
- You do not receive VRChat Credits for remaining months when a user cancels their subscription.
	- For example: If a user subscribes for 12 months and immediately cancels, you only receive VRChat Credits for the first month.
- The subscription price includes a ~15.3% transaction fee.
	- See [CE Program Rules](https://hello.vrchat.com/legal/economy) and [Payout](/economy/payout).
