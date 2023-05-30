---
title: "Searching for Nodes"
slug: "searching-for-nodes"
hidden: false
createdAt: "2020-06-24T04:27:16.858Z"
updatedAt: "2022-10-18T23:45:45.454Z"
---
# Quick Search

Press the **Spacebar** to open up Quick Search, then type in the first few letters of the class you want to interact with.
![](/img/worlds/searching-for-nodes-b2c9ea7-gameobject-search.png)

# Full Search

Press **Tab** to open up Full Search, then you can search for any method on any object. For GameObject.GetName, you could just search for 'getname' and see all the objects that have a way to get the name of the object. You could also search directly for 'gameobject.getname' and you will be directed to exactly the right node. This search method is slower than Quick Search, so it should be used only when you're not sure which class to look for in Quick Search.
![image](/img/worlds/searching-for-nodes-0f8fb2b-fullsearch.png)
# Search Bar

There is a searchbar at the top of the Udon Graph Sidebar which allows you to search through your graph. 
You can use "Ctrl+F" to to focus it from the Graph Window.
The search will begin to return results after you enter more than 3 characters.
Pressing "Enter" when there are search results, will jump between the results, in the order of "best match first".
![](/img/worlds/searching-for-nodes-4647159-search.png)

# Focused Search

This mode is turned off by default, so first you need to go to your Welcome Screen by clicking on 'Welcome' in the upper-left corner of a graph. Then check the box next to 'Focus Search On Selected Node'. This gives you a shortcut to skip to Quick Search part two - if you have a GameObject.GetName node, you can select it and press **Spacebar** to open up a search for more **GameObject** methods.
![Search on particular classes by pressing **Spacebar** with a Node selected](/img/worlds/searching-for-nodes-3ef349a-focused-search.png)
# Search on Noodle Drop

This mode is also off by default - you'll need to open your Welcome Screen and check the box next to 'Search on Noodle Drop'. Once it's on, you can drag a noodle from any port and drop it into empty space to open up a search for **any** node that could connect to that port. This works forwards and backwards, and will also search for Variables that could be connected.
![image](/img/worlds/searching-for-nodes-8656333-portsearch.gif)
# Search on Noodle Drop

This mode is also off by default - you'll need to open your Welcome Screen and check the box next to 'Search on Noodle Drop'. Once it's on, you can drag a noodle from any port and drop it into empty space to open up a search for **any** node that could connect to that port. This works forwards and backwards, and will also search for Variables that could be connected.
![image](/img/worlds/searching-for-nodes-8656333-portsearch.gif)