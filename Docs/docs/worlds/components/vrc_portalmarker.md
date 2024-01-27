---
title: "VRC Portal Marker"
slug: "vrc_portalmarker"
hidden: false
createdAt: "2017-07-07T19:29:17.097Z"
updatedAt: "2019-10-28T19:23:09.654Z"
---
Creates portals to other VRChat worlds.
There are two main ways to use this component:
1. Link to a public instance: Set the Room Id property to a specific world, and the portal will lead to an existing or new public instance of that world.
2. Link to a somewhat-random world via search: Set the `Search Term`, `Sort Heading`, `Sort Order` and optionally the `Offset` to perform a search for worlds, and the portal will lead to the world at the specified offset in the search results. **Do NOT set the Room Id property if you want to use this method.**

| Parameter | Description |
|-----|-----|
| World | Contains a specific VRChat location such as the Hub or Home, if one is selected portal will go there. |
| Room Id | Id of the destination world, like `wrld_f995a2eb-7ddc-4558-aef1-815c3b23df6c`. |
| Custom Portal Name | Overrides the name shown above the Portal. |
| Sort Heading | How to sort the search results - by Featured, Trending, Updated, Created, Active or None. |
| Sort Order | Whether to sort the results in Ascending or Descending order. Descending order would have the "Most Trending" worlds appear first, for example, while Ascending would have the "Least Trending" worlds first. |
| Offset | The offset to use for choosing the portal to visit. Useful if you want to make 5 portals to the top 5 worlds in a category, for example, by using Offsets of zero through four. |
| Search Term | The words to use when searching for worlds. |
| Tag | A comma-separated list of tags to search for, if `Room Id` is not set, and `Sort Heading` is set to `None`. |
