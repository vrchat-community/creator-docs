# Network Stats
A number of networking stats are available to Udon via the `VRC.SDK3.Network.Stats` static class.

## Global Network Statistics

`ThroughputPercentage` - a running average of the amount of allowed output data throughput currently in use.

`RoundTripVariance` - the statistical variance in transport time to our servers and back again.

`RoundTripTime` - the current time it takes for our servers to respond to a message.

`BytesInMax` - the maximum bytes received in a second.

`BytesOutMax` - the maximum bytes sent in a second.

`BytesOutAverage` - the running average of bytes sent per second.

`BytesInAverage` - the running average of bytes received per second.

`HitchesPerNetworkTick` - a running average the recorded number of missing samples.

`Suffering` - a measure of the number of queued outbound messages.

`TimeInRoom` - the length of time spent in the current instance.

## Per Game Object and Per Player Statistics

All game object statistics will return the default value if the object is not synchronized over the network, or is not in any other way networked.

`UpdateInterval` - the running average of time between the sending of network messages for this object.

`ReceiveInterval` - the running average of time between the receipt of network messages for this object.

`FinalDelay` - the synchronization time adjustment for the object.

`Group` - all objects are grouped with nearby relevant objects for the purposes of network synchronization; this number represents the group the object is currently associated with.

`GroupDelay` - the running average of the synchronization adjustment for all objects in the object's associated group.

`Sleeping` - true if the object is at rest and not sending or receiving network messages.

`Size` - the size, in bytes, of the most recent network message associated with this object.

`BytesPerSecondAverage` - the running average of the network throughput for the object, in bytes.

`TotalBytes` - the total network data consumption for the object.

`ReliableEventsInOutboundQueue` - the number of manual synchronization and other reliable events currently enqueued to send for the object.

`LastSendTime` - the last time a message was sent on behalf of the object.

`LastReceiveTime` - the last time a message was received for the object.