# Items in Udon Worlds

Users in your world can spawn **items**, which are tools, toys, and gadgets that enhance the user's experience. It's important to prepare your world for the existence of items.

:::note
Items are a new feature, and may have unintended effects on some world. You can [disable them](#disabling-items-in-your-worlds) for now if they are breaking functionality.

We aim to fix issues related to items and worlds so that all creators can enable them!
:::


## Disabling Items in your Worlds

If items are causing issues in your world, you can disable them by following these steps:
1. Visit the [My Worlds](https://vrchat.com/home/content/worlds) page and log in if needed.
2. Press on the thumbnail for your world to open its "Edit" page (if you press the title, you'll go to the details page for your world where you can press the "Edit" button to get to this page).
3. In the "Default Content Settings" list, look for "Items Enabled". It is enabled by default, meaning that users can spawn items in this world.

![World Details page with Items Enabled](/img/worlds/items/items-worldinfo-enabled.png)

4. Press the button to disable items, and use the text box underneath to explain why you need to disable items.
![World Details page with Items Disabled](/img/worlds/items/items-worldinfo-disabled.png)

5. Scroll to the top of the page and press "Save".

## Showing Items in World Mirrors

Items spawn on the "Item" layer, which used to be named "reserved3" in old SDK versions. The latest version of the [VRCMirror prefab](/worlds/sdk-prefabs/#vrcmirror) reflects items correctly if the layers have not been changed.

However, if your world uses an old SDK or mirror prefabs, or you've changed the layers in the VRCMirror prefab, your mirrors probably don't reflect items. That's because mirrors were not configured to reflect the (previously unused) "reserved3" layer.

![A mirror ignoring a held Item](/img/worlds/items/items-mirror-ignore.png)

If items do not appear in your world's mirrors, add the "Item" layer to the mirror's "Reflect Layers" dropdown. (In older SDKs, selecting "reserved3" works just as well.)

![Enabling Item reflections in mirrors](/img/worlds/items/items-enable-mirror-layer.png)

## Avoiding Items in Physics Methods

Udon programs in your world cannot reference items. If one of your scripts finds an item, it appears as a `null` object. If an UdonBehaviour tries to process an item, it throws an exception and disables itself, so it's best to avoid items.

The following two tips should keep your Udon logic running by avoiding items in Physics methods:
1. Use a [LayerMask](https://docs.unity3d.com/ScriptReference/LayerMask.html) when possible, and avoid the "Item" layer (previously "reserved3").
2. Call `Utilities.IsValid` on any object passed back through a Physics call and look for a `true` result to ensure you don't operate further on a "protected" object. See [Physics and Layers](/worlds/layers#physics-and-layers) for a list of all methods that should do this.
