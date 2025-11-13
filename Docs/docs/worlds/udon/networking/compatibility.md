import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Network Compatibility

If you update your world it can become incompatible with all active VRChat instances that were launched with a prior version of the World. This may occur if you modify objects that synchronize data over the network and alter how or what they communicate.

## Determining Compatibility

If an object exists in both versions of the World, and that object synchronizes network data, then it is _incompatible_ under the following conditions:
- It does not have matching component types, count, **and** order.
- _Or_ the components do not have matching variable types, count, **and** order.

Adding a new component or a new synchronized variable to a synchronized object is likely to render the next uploaded version of a world  _incompatible_ with previous versions.

## Impact

When changes are made that render a World incompatible with previous versions, any user joining an _active_ instance launched with a previous World version will be notified that the instance is operating with an incompatible version of the World. The user will be removed from the instance and must acknowledge the notification to continue in VRChat.

When all users exit an instance, it becomes inactive. If a user rejoins the instance, they can use a newer version of the old without triggering incompatibility issues.