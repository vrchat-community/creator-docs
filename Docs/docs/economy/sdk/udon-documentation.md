---
sidebar_position: 4
---

import UnityVersionedLink from '@site/src/components/UnityVersionedLink.js';

# Udon Documentation

import SellerNotification from '/docs/economy/_sellers-notification.mdx';

<SellerNotification/>

This page documents all Udon types, methods, and events related to the VRChat Creator Economy. You can use them to create your own [Udon scripts](/worlds/udon) with the [Udon Node Graph](/worlds/udon/graph) or [UdonSharp](https://udonsharp.docs.vrchat.com).

## Types

VRChat's SDK contains objects types to support the management of Udon products that your customers can purchase.

### UdonProduct
UdonProduct is a <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/class-ScriptableObject.html">ScriptableObject</UnityVersionedLink> that you can create in your project. It represents a product from your store, allowing you to interact with it in Udon.
A world will only receive events based on products that are being used within it, therefore it is necessary to reference a product's UdonProduct equivalent in any UdonBehaviour at least once before uploading.

For example, even if you don't directly use the UdonProducts anywhere, you would need to have an array of UdonProducts on at least one UdonBehaviour somewhere in the scene to receive OnPurchaseConfirmed, OnPurchaseExpired or OnPurchasesLoaded events for those products across all UdonBehaviours.

UdonProducts can be created with the UdonProductManager ("VRChat SDK" → "UdonProduct Manager") or by creating an UdonProduct asset manually ("Assets" → "Create" → "VRChat" → "UdonProduct").

Read [Getting Started](/economy/sdk/getting-started) to learn more about creating an UdonProduct asset in your project.

![A blank UdonProduct after creation](/img/economy/sdk/udonproduct-blank.png)

#### Fields

| Field name | Type | Description |
| - | - | - |
| ID | string | Unique identifier of your Udon product. Enter it by copying it from your store on the VRChat website. |
| Name | string | The name of your Udon product. | 
| Description | string | The description of your Udon product. | 

#### Equals

**Description**
This method compares if the product ID is equal to another product's ID.

**Input**
- `IProduct` or `UdonProduct`: Product to compare this product to.

**Output**
- `bool`:  `true` if the two products are equal, otherwise `false`.

### IProduct
This is the equivalent of a UdonProduct returned by all the Udon Creator Economy methods and events.

| Field name | Type | Description |
| - | - | - |
| ID | string | Unique identifier of your Udon product. |
| Name | string | The name of your Udon product. | 
| Description | string | The description of your Udon product. | 
| Buyer | VRCPlayerAPI | The player who purchased this product. |

#### Equals

**Description**
This method compares if the product ID is equal to another product's ID.

**Input**
- `IProduct` or `UdonProduct`: Product to compare this product to.

**Output**
- `bool`:  `true` if the two products are equal, otherwise `false`.

:::note

UdonProduct's and IProduct's "Name" & "Description" fields are currently filled in from the UdonProducts present in the world.

:::

## Methods

The SDK contains methods for interacting with player purchases or VRChat's store pages. These methods can be found under the 'Store' namespace.

### Store.DoesPlayerOwnProduct
This method will check if a player owns a certain product.

**Input**
- `VRCPlayerApi`: Player that you want to check the product ownership of.
- `UdonProduct` or `IProduct`: Product that you want to check the ownership of.

**Output**
- `bool`: `true` if the player owns the product, otherwise `false`.

:::caution Race condition

It is not advised to use this immediately after the "Start" event. Udon may not have received players purchases yet. It is advised to use the [OnPurchasesLoaded](#onpurchasesloaded) event instead.
:::

### Store.DoesAnyPlayerOwnProduct
This method will check if any player in the instance owns a certain product.

**Input**
- `UdonProduct` or `IProduct`: Product that you want to check the ownership of.

**Output**
- `bool`: `true` if any player in the instance owns the product, otherwise `false`.

### Store.GetPlayersWhoOwnProduct
This method will get all the players who own a certain product.

**Input**
- `UdonProduct` or `IProduct`: Product that you want to check the ownership of.

**Output**
- `VRCPlayerApi[]`: An array of players that own this product.

### Store.OpenGroupPage
Opens a group's **Group Info** page in VRChat's main menu.

**Input**
- `string`: ID of a group (i.e. `grp_00000000-0000-0000-0000-000000000000`)
  - To find the group ID, open the group on VRChat.com and copy the ID from your browser's address bar.

### Store.OpenGroupStorePage
Opens a group's **Store** page in VRChat's main menu.

**Input**
- `string`: ID of a group (i.e. `grp_00000000-0000-0000-0000-000000000000`)
  - To find the group ID, open the group on VRChat.com and copy the ID from your browser's address bar.

### Store.OpenGroupListing
Opens a specific **listing** on a group's Store page.

**Input**
- `string`: ID of the listing (i.e. `prod_00000000-0000-0000-0000-000000000000`)

### Store.SendProductEvent
Sends the [OnProductEvent](#onproductevent) event to all players in the instance on the target UdonBehaviour.
Before sending or receiving the networked event, this method checks if the player using `SendProductEvent` has purchased the product.

**Input**
- `UdonBehaviour`: The Udon Behaviour that will receive the resulting [OnProductEvent](#onproductevent) event.
- `UdonProduct` or `IProduct`: Product that you want to use for the event.

### Store.ListPurchases
Sends an [OnListPurchases](#onlistpurchases) event to the target UdonBehaviour with an array of all the purchases made by a target player.

**Input**
- `UdonBehaviour`: Udon Behaviour that will receive the resulting [OnListPurchases](#onlistpurchases) event.
- `VRCPlayerApi`: Player that you want to check the purchased products from.

### Store.ListAvailableProducts
Sends an [OnListAvailableProducts](#onlistavailableproducts) event to the target UdonBehaviour with an array containing all  products used in the world.

**Input**
- `UdonBehaviour`: An UdonBehaviour that will receive the resulting [OnListAvailableProducts](#onlistavailableproducts) event.

### Store.ListProductOwners
Sends an [OnListProductOwners](#onlistproductowners) event to the target UdonBehaviour. This event allows you to retrieve the names of all your supporters and, for example, display their user names in your world.

For this event to work properly, you'll first need to enable the ["Owners Names in Udon" setting](/economy/products/udon#getting-udon-products-owners-in-the-sdk) for the Udon product on [VRChat.com](https://vrchat.com/home/marketplace/storefront/products). Otherwise, [OnListProductOwners](#onlistproductowners) will not fire.

If your GameObject contains multiple UdonBehaviour components, this event may not work properly.

**Input**
- `UdonBehaviour`: An UdonBehaviour that will receive the resulting [OnListProductOwners](#onlistproductowners) event.
- `UdonProduct`: The UdonProduct for which to retrieve the owner's user names.

## Events

:::info Don't disable your script

If a game object or its Udon behaviour is disabled, it won't execute most of the events related to the Creator Economy.

:::

### OnPurchaseConfirmed
This event is triggered once for any purchase that is received from VRChat servers. Purchases are loaded
- when joining the instance, both for the local player and any other players,
- when any new players join the instance, and
- when any player in the instance purchases one of the world's products.

**Output**
- `IProduct`: The product that has been purchased.
- `VRCPlayerApi`: The player who has purchased the product.
- `bool`: `true` if the purchase was just made, `false` if it was made as part of loading the player's purchases upon joining the world.

### OnPurchaseExpired
This event is triggered when the local client detects that one of the products owned by a player in the instance has expired.

**Output**
- `IProduct`: Product that has expired.
- `VRCPlayerApi`: The player whose product has expired.


### OnPurchasesLoaded
This event is triggered when all of a player's purchases have been loaded, either when the local player joins an instance or when another player has joined later.
If the player does not own any products, the event will still fire, and the IProduct[] array will be empty.

**Outputs**
- `IProduct[]`: An array of products owned by the player.
- `VRCPlayerApi`: The player whose purchases have been loaded.

### OnProductEvent
This event is triggered when a player uses [Store.SendProductEvent](#storesendproductevent). Both the local player and VRChat's servers will check that the local player has purchased the product before executing this event.

**Output**
- `IProduct`: The product that has been 'sent' alongside the event.
- `VRCPlayerApi`: The player who has used their product.

### OnListPurchases
This event is triggered when the local player uses [Store.ListPurchases](#storelistpurchases). It returns an array of all the purchases made by the target player.

**Outputs**
- `IProduct[]`: An array of products owned by the target player.
- `VRCPlayerApi`: The target player whose purchases have been retrieved.

### OnListAvailableProducts
This event is triggered when the local player uses [Store.ListAvailableProducts](#storelistavailableproducts). It returns an array of all the products (UdonProduct) used in the world.

**Outputs**
- `IProduct[]`: An array of IProducts representing all UdonProducts used in the world.

### OnListProductOwners
This event is triggered after an Udon script calls [Store.ListProductOwners](#storelistproductowners). It returns an array containing the display names of all players who own the target product. The list includes **every** user who owns that product, not just users in the current instance.

To check if a player in the instance owns an Udon product, [Store.DoesPlayerOwnProduct](#storedoesplayerownproduct) should be used instead.

**Outputs**
- `IProduct`: The product passed in the initial [Store.ListProductOwners](#storelistproductowners) call.
- `string[]`: An array of strings containing the names of all users who own this product.
