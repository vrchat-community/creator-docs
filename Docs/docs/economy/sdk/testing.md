---
title: Testing Udon Products
sidebar_position: 3
---

import SellerNotification from '/docs/economy/_sellers-notification.mdx';

<SellerNotification/>

When you add Creator Economy features to your VRChat World, you should test it before publishing.

## Testing in ClientSim

While developing your world in Unity, you can use ClientSim in conjunction with the [UdonProducts Manager](/economy/sdk/getting-started#how-to-use-the-udonproduct-manager). It allows you to activate and expire products without launching VRChat.

![A screenshot of the UdonProducts manager.](/img/economy/sdk/udonproducts-manager.png)

## Testing in VRChat

You can test Creator Economy SDK features with the "Build & Test" option.
- When testing locally or logged into a live client as a Group's owner, all of that Group's listings will be free. No VRChat Credits will be spent.
- When testing locally, purchased listings automatically expire after 60 seconds, no matter how many months you choose when purchasing it.
