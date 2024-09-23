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
- When testing locally or logged into a live client as a Group's owner, all of that Group's listings will be free. No VRChat Credits will be spent.
- When testing locally, purchased listings automatically expire after 60 seconds, no matter how many months you choose when purchasing it.
