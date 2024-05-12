---
title: "Example Prefabs"
sidebar_position: 5
---

import SellerNotification from '/docs/economy/_sellers-notification.mdx';

<SellerNotification/>

Example Prefabs allow world creators to use the Creator Economy quickly and easily without writing their own Udon scripts. The prefabs can be tweaked and customized to create a better experience for your supporters.

Many of the examples require knowledge on how to set up Udon products, which should be done before you proceed here. Head to our [Getting Started with the Creator Economy SDK page](/economy/sdk/getting-started/) to learn more.

| Example | Description |
| --- | --- |
| [Open Group Page](/economy/sdk/examples/open-group-page) | A button that opens a group page based on the assigned group ID. Enable `Open To Store Page` to open the store page instead, or use the `OpenListingPrefab` to directly open a store listing. |
| [Store Debug Logging](/economy/sdk/examples/debug-logging) | A screen for listing, debugging, and logging products in your world. |
| [Floating Overhead Buy Indicator](/economy/sdk/examples/floating-overhead) | Spawns a floating prefab above players who own the assigned Udon product. |
| [Udon Product Toggle](/economy/sdk/examples/product-toggle) | Enables/Disables a Game Object if any player in the instance owns the assigned Udon product. Use the `Local Only` option if the local player must own the product.
| [Subscribers In Instance](/economy/sdk/examples/subs-instance) | Shows a list of all subscribers that are currently in this instance. |
| [Subscribers Only Area](/economy/sdk/examples/subs-only) | An area that only subscribers can enter or non-subscribers can't leave. Players who try to trespass are teleported away. |
| [Product Event Timed](/economy/sdk/examples/timed-event) | A button that can only be pressed by players who own the assigned Udon product. Other players can see that they pressed the button. This is an example of `OnProductEvent`. |

## Adding Prefabs

Each prefab shares the same starting steps:

1. Download the Unity package for the prefab you need, which can be found in the left sidebar.

2. Import the package into your Unity project.

![DragAndDrop](/img/economy/examples/Importing-Package_Drag-and-Drop.png "Drag your prefab into Unity.")

3. Drag the prefab into your scene.

![ImportPrefabtoUnity](/img/economy/examples/Importing-Package_Place-In-Scene.png "Drag your prefab into the scene.")

And you're ready to customize! Browse our different prefabs in the left-hand sidebar to see what they do and how to customize them.
