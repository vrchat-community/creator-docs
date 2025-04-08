---
description: "Opens your world store."
sidebar_position: 1
sidebar_custom_props:
    customIcon: 🏪
---

# Open World Store

The OpenWorldStore prefab offers visitors a convenient way to access your world store. Customize its appearance to attract visitors and highlight your store.

You can visit the [Open World Store Example World](https://vrchat.com/home/world/wrld_fef974b9-fe44-4731-8bd1-7629e80eccc9) to see how it works first-hand. Notice that there is a real product available in the store - don't buy it!

import HowToImportExample from '/docs/economy/_ce-how-to-import.mdx';

<HowToImportExample/>

## Prefabs included
* **OpenWorldStorePrefab**: A vending machine that opens a world store when the user interacts with it. Includes a customizable graphic and interaction text.

![OpenWorldStorePrefab](/img/economy/examples/OpenWorldStore_Prefab.png "The OpenWorldStorePrefab model in the demo scene")

## How to Use

1. Create a [world store](/economy/store/world-store), publish the store, and add at least one published listing.
2. Set the Interaction Text you want users to see when approaching the prefab.

![OpenWorldStoreInteractionText](/img/economy/examples/OpenWorldStore_InteractionText.png)

3. Set the Door Graphic you want displayed on the front of your vending machine by selecting a texture in the "Door Graphic" picker.

![OpenWorldStoreDoorGraphic](/img/economy/examples/OpenWorldStore_DoorGraphic.png)

4. Build & Publish your world.
  - "Build & Test" does _not_ allow you to open world stores. You must "Build & Publish" to test your world store in VRChat.
  - If you're adding a world store to an existing world, you should "Build & Publish" to a new world ID. This allows you to test the prefab before publishing it to your existing world.

## Creating a New Door Graphic

You can create a graphic using Photoshop or any other image editor.

### Using Photoshop

The example includes a Photoshop file for easy editing at the path `Assets/Examples/OpenWorldStore/Prop_VendingMachine/Textures/glass_Screen_TEMPLATE.psd`.

![OpenWorldStorePhotoshopTemplate](/img/economy/examples/OpenWorldStore_PhotoshopTemplate.png)

1. Replace the contents of the "REPLACE ME!" layer with a graphic that represents your listing(s).
2. Update the text in the "FeaturedText" layer with your own words.
3. Edit any of the other layers as you see fit, keeping the overall size and masking of the graphic the same.
4. Export your new version as a 24-bit PNG with transparency - you can save it directly into the Assets folder of your project.

### Using Another Image Editor

The example includes a PNG for easy editing at the path `Assets/Examples/OpenWorldStore/Prop_VendingMachine/Textures/glass_Screen_UV_Map`.

1. Open "glass_Screen_UV_Map.png" in an image editor.
2. Edit the white area of the template. You can add whatever graphics you want.
3. Save your file as a 24-bit PNG with alpha transparency.
4. Move the file into your project.
5. Select the texture in the Project window, and set its Alpha Source to "Input Texture Alpha" in the inspector.
6. Drag and drop the file from your project window to the "Door Graphic" input slot in the OpenWorldStorePrefab's inspector.