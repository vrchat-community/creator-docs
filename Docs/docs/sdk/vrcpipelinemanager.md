---
title: "VRCPipelineManager"
slug: "vrcpipelinemanager"
hidden: false
createdAt: "2017-11-22T18:54:45.512Z"
updatedAt: "2019-10-28T19:23:09.669Z"
---
Used to store the ID of a world or avatar.
:::note Added Automatically

This component is added automatically when the component it depends on is added to an object. You should not need to add this component manually.
:::

| Parameter    | Description                           |
|--------------|---------------------------------------|
| Blueprint ID | The unique id for the avatar or world |

If you want to upload the world or avatar to a different blueprint you can press the `Detach (Optional)` button
:::danger Required Blueprint Format

Blueprint IDs can only be of the following format where 0 is replaced with [0-9] [a-f]:

`avtr_00000000-0000-0000-0000-000000000000`

`wrld_00000000-0000-0000-0000-000000000000`

Any other ID format will not be accepted. This is normally done automatically, so you shouldn't ever have to create your own Blueprint ID-- just click "Attach" and one will be generated for you.
:::

![vrcpipelinemanager-7d57e76-Unity_2017-12-10_01-35-44.png](/img/sdk/vrcpipelinemanager-7d57e76-Unity_2017-12-10_01-35-44.png)

If you have a blueprint id that you want to upload to you can attach a new one with the `Attach (Optional)` button

![vrcpipelinemanager-db63e77-Unity_2017-12-10_01-37-47.png](/img/sdk/vrcpipelinemanager-db63e77-Unity_2017-12-10_01-37-47.png)

:::caution TIP

Don't have more than one PipelineManager in the scene when building a world! You may end up uploading to the wrong blueprint ID.

:::