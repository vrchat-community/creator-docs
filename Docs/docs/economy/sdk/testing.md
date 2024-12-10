---
description: "Test your Udon products before publishing your world."
sidebar_position: 3
sidebar_custom_props:
    customIcon: 🪲
---

# Testing Udon Products

import SellerNotification from '/docs/economy/_sellers-notification.mdx';

<SellerNotification/>

When you add Creator Economy features to your VRChat World, you should test it before publishing.

## Testing in ClientSim

While developing your world in Unity, you can use ClientSim in conjunction with the [UdonProducts Manager](/economy/sdk/getting-started#udonproduct-manager). It allows you to activate and expire products without launching VRChat.

## Testing in VRChat

You can test Creator Economy SDK features with the "Build & Test" option.

:::warning

Some features of the Creator Economy cannot be tested locally and require a private world upload instead.

:::

- When testing locally or logged into VRChat as the world/group owner, all listings/subscription are free. Your VRChat wallet balance does not decrease.
- When testing locally, purchased listings automatically expire after 60 seconds, no matter how many months you choose when purchasing it.
- You can purchase published listings/subscriptions without publishing them in your store. This allows you to make test purchases without allowing users to see or buy your listings/subscriptions. 