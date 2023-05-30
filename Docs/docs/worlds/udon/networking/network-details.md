---
title: "Network Specs and Tips"
slug: "network-details"
hidden: false
createdAt: "2021-05-13T17:51:06.418Z"
updatedAt: "2021-05-18T23:37:43.783Z"
---
# Tips

Try not to sync everything; consider what you can determine from the minimal amount of information shared. For example: if an object will move on a fixed or predictable path, then its position may not need to be synchronized and instead its initial location and velocity may be sufficient.

If there exists complicated game logic then try to have it on one object; having important logic state shared across many objects may cause de-synchronization due to ownership differences.

Continuous synchronization is intended for data that changes frequently and where intermediary values don't matter; like the position of an erratically moving transform. VRChat will perform intermediary value approximation to recover lost data, and will attempt to optimize network data for continuous synchronization.

Manual synchronization is intended for data that changes infrequently and where intermediary values matter; like the positions of pieces on a chess board.
**Users should not expect high speed updates with manual serialization.**

If you have multiple UdonBehaviours on an object, the sync method will default to the most restrictive settings - a Manual UdonBehaviour and a Continuous one on the same object will both act as manual.
# Data and Specs
Note: all specs subject to change, they will be updated here if they do. 

You can see some specific information about the data used per-object in Debug View 6.

Continuous sync is limited to roughly **200 bytes** per serialization.

Manual sync is limited to roughly **49 Kilobytes** per serialization.

Each manually-synced object is rate limited as a factor of the data size. The more it sends, the more its send rate is limited. You can call RequestSerialization as many times as you want, but it will wait until enough time has passed before calling OnPreSerialization, sending the data, and calling OnPostSerialization with the result.

A single synced string can have roughly **126 characters** in Continuous sync mode.

You can send out about **11kb per second**.

The latency between invoking SetOwner and the new values being sent out is roughly the round-trip time between the executor and the owner or if the owner did it, the owner and the receiver.

If you exceed limits, the UdonBehaviour will fail to raise the network event and write errors in the logs. The logic of the UdonBehaviour will continue to work, but the data will not be sent nor received.