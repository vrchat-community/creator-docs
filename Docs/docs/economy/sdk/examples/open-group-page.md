---
title: "Open Group Page"
sidebar_position: 1
---

OpenGroupPage is a prefab that makes it easier for users to access purchasable CE listings. Use it to create buttons that open group pages or specific listings.

### How to Import
1. Download the [Unity package directly by clicking here](https://cdn.sanity.io/files/yvg0vlb9/production/c659160083f6a0f3448e7a3f6936289aaade5c9b.unitypackage).
2. Make sure your project is using the World SDK `3.5.0`or newer.
3. Import the Unity package into your project.
4. Drag your chosen prefab into your scene. The options are:

##### Prefabs included
* **OpenGroupPagePrefab**: Includes a button that opens a group page. Also includes a text description.
* **OpenGroupPageSimplePrefab**: Includes a button that opens a group page. Does not include a text description.

![OpenGroupPrefab](/img/economy/examples/Comparison-OpenGroupPage.png "Compares group prefabs.")

* **OpenListingPrefab**: Includes a button to open to a listing page. Also includes a text description.
* **OpenListingSimplePrefab**: Includes a button to open to a listing page. Does not include a text description.

![OpenListingPrefab](/img/economy/examples/Comparison-OpenListing.png "Compares listing prefabs.")

### How to Use

For each prefab, you'll need to replace any ID with the ID of your own group or product.

1. Select the chosen prefab in your Unity scene.
2. For **OpenGroupPage/OpenGroupPageSimple:** Set the ID of the group that owns the product in the `Group ID` field in the inspector window.
    -   Find your group ID by opening your group [on the website](https://vrchat.com/home/groups) and copying the ID in the address bar of your browser. For example: `grp_a4f791af-a167-4c91-b849-2e37e37f509a`. Any short code (i.e. `EXAMPL.9920`) will **not** work.

![DragGroupID](/img/economy/examples/Group-Id-Copying.png "Where to put the group ID.")

3. For **OpenListing/OpenListingSimple:** Set the ID of the listing in the `Listing ID` field in the inspector window.
    - Find your listing ID by [opening the listing section](https://vrchat.com/b/monetization/home/marketplace/storefront/listings) of your store and copying its ID. 

![DragListingID](/img/economy/examples/Listing-Id-Copying.png "Where to put the listing ID.")

4. Toggle the **OpenToStorePage** toggle on the prefab if you want to open to your store page directly. If unchecked, the button will open to your group page instead of directly to your store.
![IDPasting](/img/economy/examples/Group-versus-Store-links.png "Instructions on finding and pasting IDs.")

4. Run Build & Test!

### Inspector Parameters

#### OpenGroupPage 
* `Group ID` - The group ID of the group you want to open.
* `Open To Store Page` - If true, will open the store page for the group instead of the group info page.

#### OpenListing 
* `Listing ID` - The listing ID of the listing you want to open.
