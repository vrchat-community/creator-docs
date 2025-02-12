---
description: "Opens a listing."
sidebar_position: 0
sidebar_custom_props:
    customIcon: 🔗
---

# Open Listing

This example contains two prefabs that allow users to open one of your listings by pressing a button.

import HowToImportExample from '/docs/economy/_ce-how-to-import.mdx';

<HowToImportExample/>

## Prefabs included

* **OpenListingPrefab**: Includes a button to open to a listing page. Also includes a text description.
* **OpenListingSimplePrefab**: Includes a button to open to a listing page. Does not include a text description.
* **OpenListingAndReactToPurchasePrefab**: Includes a button to open to a listing page. Plays a sound effect when a given product is purchased.

![OpenListingPrefab](/img/economy/examples/Comparison-OpenListing.png "Compares listing prefabs.")

* **OpenListingDeluxePrefab**: Includes a thumbnail, and fields for the name, type and price of the listing.

![OpenListingPrefab](/img/economy/examples/OpenListingDeluxe_GameView.png "Shows OpenListing Deluxe as it appears in the Game View")

## How to Use

For each prefab, you'll need to replace any ID with the ID of your own group or product.

1. Select the chosen prefab in your Unity scene.

2. Set the ID of the listing in the `Listing ID` field in the inspector window.
    - Find your listing ID by [opening the listing section](https://vrchat.com/home/marketplace/storefront/listings) of your store and copying its ID. 

![DragListingID](/img/economy/examples/Listing-Id-Copying.png "Where to put the listing ID.")

3. For **OpenListingAndReactToPurchase** only:
    - Use the [UdonProducts Manager](https://creators.vrchat.com/economy/sdk/getting-started#udonproducts-manager) to locate the `UdonProduct` asset of the product that should play a sound effect when purchased.
    - Set the `Trigger Product` field to the `UdonProduct` asset.

4. For **OpenListingDeluxe** only:
    - Set the Thumbnail for the listing using the `Thumbnail` field in the inspector window. It's best if you use the same thumbnail that the user will see when opening your listing, but you have the ability to use any square Sprite in your project.
    - Set the three text lines using the `Display Name`, `Type` and `Price` fields. Just like the thumbnail, it's best if these match what the user will see in your listing, but you can enter any information you like.

![OpenListingDeluxeFields](/img/economy/examples/OpenListingDeluxe_Inspector.png "The Fields for OpenListingDeluxe")

5. Run Build & Test!

### Inspector Parameters

The prefabs have the following parameters:

### OpenListing & OpenListingSimple
* `Listing ID` - The listing ID of the listing you want to open.

### OpenListingAndReactToPurchase
* `Trigger Product` - The `UdonProduct` asset that triggers the sound effect when purchased.
* `Optional Purchase Sfx` - The sound effect that plays when purchasing the product.
* `Optional Purchase Sfx Source` - The `AudioSource` component that plays the sound effect.

### OpenListingDeluxe
* `Thumbnail` - The sprite shown in the prefab, typically the same as the thumbnail set for the listing.
* `Display Name` - The first line of text, typically the Display Name of the listing.
* `Type` - The second line of text, typically the Type of the listing - Consumable, Instant, etc.
* `Price` - The third line of text, typically the Price of the listing in VRChat Credits.
