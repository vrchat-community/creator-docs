---
slug: release-3-1-10
date: 2022-10-18
title: Release 3.1.9
authors: [momo]
tags: [release]
draft: false
---
### Summary

Major Updates to Udon Graph Usability.

<!--truncate-->

### Udon Graph Updates

* Udon Node Graph: Added lots of hotkeys!
    * Press and hold one of the following keys, then click anywhere on the graph to create the corresponding node:
        * `1` : float
        * `2` : Vector2
        * `3` : Vector3
        * `4` : Vector4
        * `b` : Branch
        * `+` : float addition
        * `-` : float subtraction
        * `=` : float equality comparison
        * `Shift+B` : Block
    * Press and hold `C`, then click on a constant to convert it into a variable
        * You can also do this by right-clicking the constant
    * `Ctrl+G` for quick grouping
    * `L+Click` logs the value of the selected node
    * `Shift+A` for aligning nodes
    * Press and hold `Shift+F`, then click on a node that outputs an array type, to generate a ForEach loop automatically
    * Most of the above are also available via the right-click menu
* Added a new topbar that shows the currently open graph and opens new "tabs" to it when you open more graphs
    * You can close each tab with the X button
* Events/Groups entries are clickable in the sidebar for fast navigation
* Added search bar at the top which allows you to search through your active graph
    * Press `Ctrl+F` to move focus to the search bar
    * Search activates after entering at least 3 letters
    * Pressing Enter while having multiple search results will jump between them
* There is a new "Highlight flow" toggle on the topbar, which, when enabled, will highlight the nodes connected via the flow edges
    * Use this to quickly see how the program arrives at the particular node
    * If the node doesn't have any flow connections - nothing will happen

### Changes
* Changes video link in UdonSyncPlayer example to point to new location
