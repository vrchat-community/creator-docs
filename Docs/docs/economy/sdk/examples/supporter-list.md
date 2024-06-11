# Supporter List

import SellerNotification from '/docs/economy/_sellers-notification.mdx';

<SellerNotification/>

The Supporter List prefab displays all the names of users that have purchased an UdonProduct. This can be customized for how many UdonProducts are displayed, their color, text size, and more.

![SupporterListPreview](/img/economy/examples/SupporterList-Preview.png "Preview of the supporter list prefab.")

## How to Import
1. Download the [Unity package directly by clicking here](https://cdn.sanity.io/files/yvg0vlb9/production/ba12246609ebc690682fd8707ae46aad211755f5.unitypackage).
2. Make sure your project is using the World SDK `3.5.0` or newer.
3. Import the Unity package into your project.

:::caution
If viewing the example scene, you'll also need the [Open Group Page](/economy/sdk/examples/open-group-page) prefab. Otherwise, your project will be missing what it needs for a complete example scene.
:::

### Prefabs Included
* **SupporterListPrefab**: The full panel with the default settings.
* **SupporterListPrefabAutoScrolling**: The full panel, but scrolling is handled automatically.

## How to Use

This prefab requires an Udon Product for each "Tier" you'd like to include in your supporter list.

Importantly, this Udon Product **must** have "Owner Names in Udon" enabled on the VRChat website. You can enable this setting by navigating to ["My Products"](https://vrchat.com/home/marketplace/storefront/products) (`Marketplace > Storefront > My Products`) and editing the Udon Products you would like to use.

1. Drag either "SupporterListPrefab" or "SupporterListPrefabAutoScrolling" into your scene and unpack it. (This allows you to customize your supporter list.)
2. Find the "SupportTiers" GameObjects within the prefab.

![SupportTiersHierarchy](/img/economy/examples/SupporterList-SupportTiersHierarchy.png "Location of the SupportTiers object in the hierarchy.")

3. The prefab has three "SupportTier" objects by default. If you need more or fewer than the three tiers, feel free to duplicate, modify, or delete them as needed. (This is why you unpacked the prefab in step 1.)
4. Customize each [Support Tier](supporter-list#support-tier) with your Udon Product, the title, the color that you want, and any font sizing you'd like to use.

## Inspector Parameters

### Supporter List

![SupporterListInspector](/img/economy/examples/SupporterList-Inspector.png "Preview of the supporter list inspector.")

This prefab controls the scrolling and update behavior of the supporter list.

| Parameter | Type | Description |
| --- | --- | --- |
| **References** | --- | --- |
| Label | TextMeshPro UGUI | The text label that displays the list. |
| Scroll Rect | Scroll Rect | The scroll rect for scrolling the list up and down. |
| View Port Rect Transform | Rect Transform | The rect transform for the viewport of the scroll view. |
| **Settings** | --- | --- |
| Auto Scroll | Bool | If true, the list scrolls automatically. |
| Scroll Speed | Float | The speed at which the list scrolls. If 0, the list will not scroll. Value is in pixels per second. |
| Fade Time | Float | The time it takes for the list to fade in and out. |
| Time Between States | Float | The time before it starts scrolling after fade in and time before it starts fading out after scrolling to bottom. |
| **Performance** | --- | --- |
| Update When Player Is Behind | Bool | If true, the list updates when the player is physically standing behind the list and cannot see the front. Only use if the list is visible from the back. |
| Update When Player Not Looking | Bool | If true, the list only updates when the player is not looking at it. Improves performance but can result in the list not immediately updating when the player looks at it. |
| Min Update Delay | Float | The minimum time between updates. At 0, the list updates every frame. Increase this value to improve performance at cost of list scrolling looking choppy. |
| Max Update Delay | Float | The maximum time between updates. This value is used when the player is behind the list, not looking at the list, or outside the "Distance Outside Max Update Delay" distance. |
| Distance Within Min Update Delay | Float | If the player is this close to the prefab, the min update delay is used. |
| Distance Outside Max Update Delay | Float | If the player is this far away from the prefab, the max update delay is used.  |


### Support Tier

Each tier of your supporter list is represented by a customizable supporter tier object.

![SupportTierInspector](/img/economy/examples/SupporterList-TierInspector.png "Preview of the support tier inspector.")

| Parameter | Type | Description |
| --- | --- | --- |
| **References** | --- | --- |
| Ownership Product | UdonProduct | The product that is checked for ownership. |
| **Tier Settings** | --- | --- |
| Product Label | String | The name of the tier. |
| Name Separation String | String | The string that separates each supporter's name. |
| Add Product Label | Bool | If true, the product label is added to the board content. |
| **Text Settings** | --- | --- |
| Text Color | Color | The color of the text. |
| Product Label Font Size | Integer | The font size of the product label. |
| Name Label Font Size | Integer | The font size of the name label. |
| Max Names Per Line | Integer | The maximum amount of names per line. If 0, there is no limit. |