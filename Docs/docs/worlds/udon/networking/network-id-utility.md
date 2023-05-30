---
title: "Network ID Utility"
slug: "network-id-utility"
hidden: false
createdAt: "2022-10-26T00:03:35.308Z"
updatedAt: "2022-10-26T00:03:35.308Z"
---
A network ID is the identifier that is used to determine which object is which when it comes to networking. In most cases, you don’t need to worry about this, but it can come up when working with cross-platform worlds where players are technically loading two different versions of your world. 

Network IDs are the link between those different versions, to make sure that everybody is seeing the same thing and that the data is being transmitted to the correct objects.

To be more specific, a network ID is simply a number assigned to a GameObject. For example, let's assume you have a beach ball with the ID 1 and an ice cream cone with the ID 2. If these get mixed up, then you may try to kick around a beach ball while somebody else sees you kicking around an ice cream!

To deal with these potential issues and to make sure that your different scenes are in sync, we have created a network ID utility.

# Network ID Import and Export Utility

This utility allows you to save and transfer network IDs between scenes or projects. It can be found in the Unity Editor, under `VRChat SDK/Utilities/Network ID Import and Export Utility`. 
:::note

You should only need to use this utility if you are developing a cross-platform world and your different versions are in different scenes or projects.
:::

![network-id-utility-9936cee-image1.png](/img/worlds/network-id-utility-9936cee-image1.png)

When using this tool, you will see a list of all your network IDs in the entire scene. If you don’t have this yet, you can click Regenerate Scene IDs.
![network-id-utility-05130bf-image4.png](/img/worlds/network-id-utility-05130bf-image4.png)

When you are ready to transfer network IDs from one scene to another, click on the **Export** button to save the file somewhere. Then go to the other scene and click **Import**, and select that file.

**Network IDs in this format are saved as a path to the object.** As such, try to keep the path to each object the same between your scenes. Other objects in the scene that do not have any networking (such as meshes) do not matter and they can be different between your scenes, as long as they do not conflict with something that does need to be synced.
![network-id-utility-3b30a4e-image5.png](/img/worlds/network-id-utility-3b30a4e-image5.png)

If everything matches between your two scenes, you should see one big block with an **Accept All** button. Go ahead and click that, and you’re good to go!

# Resolving Conflicts

There are several conflict resolution tools within this utility.
![network-id-utility-22a9bcf-image3.png](/img/worlds/network-id-utility-22a9bcf-image3.png)

Here is an example of an object that exists in the file but does not exist in the scene. The file says that there is a network ID at this path, but it can’t find an object with that path. At this point, you can choose to either ignore it or specify a different object. If you know for sure that this is an object which doesn’t need to exist in this scene, then you can safely ignore it. However, if it is an object that should exist in your scene but simply has a different name, then you can select it. Once you’ve resolved this conflict, it will move down to the section where you can accept the network ID.
![network-id-utility-c5175f8-image2.png](/img/worlds/network-id-utility-c5175f8-image2.png)

Here's another example where an object says it has the network ID of 25, but the file says that a different path should have 25. 

This, and many other odd situations, can only happen if the scene has existing network IDs before you tried to import a new file on top. If you are copying IDs between scenes, then most likely you will want to clear IDs before importing so that you don’t get this issue. However, these options do exist in case you need to do something very specific like attempt to repair a scene without breaking some existing network IDs.

If you need to resolve these conflicts, you can choose to either click the Ignore All button which will not touch the scene at all, or you can hand-pick which one gets the ID. When you click the “Select” button that will resolve the conflict by applying the ID to the object that you have selected. This can resolve one or more conflicts, so don't be surprised if many conflicts disappear when you resolve just one.