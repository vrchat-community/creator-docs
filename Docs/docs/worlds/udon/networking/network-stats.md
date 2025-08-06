# Network Stats
A number of networking stats are available to Udon via the `VRC.SDK3.Network.Stats` static class.

## Global Network Statistics

| Name                    | Type    | Description                                                                         |
| ----------------------- | ------- | ----------------------------------------------------------------------------------- |
| `ThroughputPercentage`  | `float` | A running average of the amount of allowed output data throughput currently in use. |
| `RoundTripVariance`     | `float` | The statistical variance in transport time to our servers and back again.           |
| `BytesInMax`            | `float` | The maximum bytes received in a second.                                             |
| `BytesOutMax`           | `float` | The maximum bytes sent in a second.                                                 |
| `BytesOutAverage`       | `float` | The running average of bytes sent per second.                                       |
| `BytesInAverage`        | `float` | The running average of bytes received per second.                                   |
| `HitchesPerNetworkTick` | `float` | A running average the recorded number of missing samples.                           |
| `Suffering`             | `float` | A measure of the number of queued outbound messages.                                |
| `TimeInRoom`            | `float` | The length of time spent in the current instance.                                   |

## Per Game Object and Per Player Statistics

All game object statistics will return the default value if the object is not synchronized over the network, or is not in any other way networked.

| Name                            | Type    | Description                                                                                                                                                                 |
| ------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `UpdateInterval`                | float   | The running average of time between the sending of network messages for this object.                                                                                        |
| `ReceiveInterval`               | `float` | The running average of time between the receipt of network messages for this object.                                                                                        |
| `FinalDelay`                    | `float` | The synchronization time adjustment for the object.                                                                                                                         |
| `Group`                         | `int`   | All objects are grouped with nearby relevant objects for the purposes of network synchronization; this number represents the group the object is currently associated with. |
| `GroupDelay`                    | `float` | The running average of the synchronization adjustment for all objects in the object's associated group.                                                                     |
| `Sleeping`                      | `bool`  | `true` if the object is at rest and not sending or receiving network messages.                                                                                              |
| `Size`                          | `int`   | The size, in bytes, of the most recent network message associated with this object.                                                                                         |
| `BytesPerSecondAverage`         | `float` | The running average of the network throughput for the object, in bytes.                                                                                                     |
| `TotalBytes`                    | `int`   | The total network data consumption for the object.                                                                                                                          |
| `ReliableEventsInOutboundQueue` | `int`   | The number of manual synchronization and other reliable events currently enqueued to send for the object.                                                                   |
| `LastSendTime`                  | `float` | The last time a message was sent on behalf of the object.                                                                                                                   |
| `LastReceiveTime`               | `float` | The last time a message was received for the object.                                                                                                                        |
