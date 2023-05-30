---
title: "Graph Elements"
slug: "graph-elements"
hidden: false
createdAt: "2020-06-24T22:08:14.066Z"
updatedAt: "2022-10-18T23:46:16.884Z"
---
# Overview
When you build programs in the graph, you mostly use Nodes. There are a few other items available, described here.

# Groups
Groups are helpful for organizing and describing your graph. They don't *change* the way your graphs function or compile.
![You can select elements and right-click to get the *Create Group* function.](/img/worlds/graph-elements-e9a0713-create-group.gif)
To create Groups, you can:
* Right-Click in the graph and choose 'Create Group', then drag and drop elements into the group.
* Select elements with a box-drag or by holding Ctrl while you click on them, then right-click on the graph and choose 'Create Group', or press 'Ctrl+G' for quick grouping.

To remove items from Groups, you can:
* Select the items, hold shift, then drag the items out of the group.
* Select the items, right-click and choose 'Remove From Group'.

To jump to a Group in the graph, click it in the Graph Sidebar.
:::note Nested Groups

Currently, nested groups are not supported. The current grouping behavior is to delete the existing group if you try to select and enclose it with a new group.
:::
# Comments

Comments are simple blocks of text that you can place near items that need more information.
![A comment next to a node.](/img/worlds/graph-elements-80881a1-simple-comment.png)
You can create comments by right-clicking on the Graph and choosing *Create Comment*. They can be added to groups, as well. You can use comments and groups together for ultimate readability!
![The 'SendEventOnTimer' graph included in the VRChat Examples folder uses groups and comments to explain what's happening in the graph.](/img/worlds/graph-elements-ab506db-comments-and-groups.png)
# Noodles
The noodles of a graph are what connect everything together, and how Udon gets its name! They connect nodes together through their ports. They are colored according to the ports to which they connect, so if you connect two ports with different types, you'll see the color change halfway through. In Unity documentation and elsewhere, they are called 'edges' - so if you see a reference to edges, they're talking about our tasty noodles.