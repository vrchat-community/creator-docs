# Persistence

## What is Persistence?

Persistence allows worlds to save high scores, inventories, the player's last position, currency, unlocks, preferences, and much more. When a player leaves a world and returns later, Udon can access their saved data.

This data is stored on VRChat's servers and is accessible on all platforms and in all instances of the same world. It is connected to the user's account, so if a player visits a world on a completely different device, Udon will still have access to that world's data.

One of the primary ways to use persistence is with [PlayerData](/worlds/udon/persistence/player-data). PlayerData is a key-value storage system associated with each player. Any script can access the data, and it's capable of storing all integer types, floats, doubles, vectors, colors, strings, and byte arrays.

Persistence also includes [PlayerObjects](/worlds/udon/persistence/player-object). Any game object with this component is automatically instantiated for each player. Udon scripts can be attached to PlayerObjects, and if a `VRCEnablePersistence` component is added to them then all synced data on those objects will persist. PlayerObjects also have many uses outside of persistence, serving a similar use-case as per-player object pools. They can be used for anything that should be tied to each player in the instance, such as health bars, colliders for combat systems, and robust networked systems without ownership transfers.

## Examples of using Persistence

You can find all our [Persistence Examples here](/worlds/examples/persistence).

## Persistent User Data

Data saved by Persistence is called "User Data." Persistence has two types of User Data that Udon can save and load from VRChat's servers:

- [PlayerData](/worlds/udon/persistence/player-data) is a key-value database that allows Udon scripts to save and load User Data.
- [PlayerObject](/worlds/udon/persistence/player-object) are GameObjects that automatically instantiate themselves for each player. All their synced Udon variables can be persistent, if marked with a `VRCEnablePersistence` component.

## Data storage in different environments

User Data is stored in different locations if you're testing your world during development: 

- **Uploaded World**:
	- Persistent data is stored on VRChat's servers connected to your account. You can visit your world on any device and the data will be available.
	- If you open VRChat multiple times on the same account in the same world at the same time, you may cause conflicts and accidently overwrite your own data.
- **[Local Test World](/worlds/udon/graph/#running-build--test)**
	- User Data is stored locally if you "Build & Test."
		- When you launch a test client, it starts with no User Data.
		- When you rejoin or "Build & Reload," User Data is **not** reset.
		- When you close a test client, it deletes its User Data.
	- If you set "Number of Clients" to two or higher, User Data is stored separately for each test client.
- **ClientSim**
	- Persistent data is stored in JSON files within your project
	- See [ClientSim Persistence documentation](/worlds/clientsim/) for more details.

## Limitations

Please consider the following limitations when using Persistence in your world:

- Each world may store 100 kilobytes(KB) of PlayerData and 100 KB of PlayerObject data per player on VRChat's servers.
	- VRChat stores User Data in a compressed format. If your world's data is easy to compress, you may be able to store more than 300 KB (compressed into 100 KB by VRChat).
	- You cannot save data that would cause you to exceed this limit. Instead, VRChat logs an error and your data won't be saved. Reduce the size of your data to avoid this.
- The local player's User Data must be saved before they leave the world. Persistent data cannot be saved in the local player's [OnPlayerLeft](https://creators.vrchat.com/worlds/udon/graph/event-nodes/#onplayerleft) event. 
- Persistent data cannot be shared between different worlds.
- Persistence does not have a feature for "save slots" built-in. However, world creators can use Udon to build a save slot system inside their worlds.

## Making Persistent Prefabs

When building prefabs that have persistent behavior, it's important to consider how they will interact with other prefabs in creators' projects.

First, consider using PlayerObjects rather than PlayerData, which are a better fit for _most_ prefabs. PlayerObjects are nicely contained within a Prefab's hierarchy and are a better fit for persist large amounts of data and/or data that changes frequently. Remember that 
when you change **any** PlayerData for the local player, **all** of their PlayerData is sent, including data that hasn't changed. Every prefab in a world which uses PlayerData will add to this collection and require sending each time, which could quickly expand the networking usage in a world and could lead to bandwidth issues.

If PlayerData is _still_ a better place for some of your prefab's data, consider adding a prefix to all the keys your prefab uses. For example, Momo's Persistent Post-Processing settings could pick the prefix "Momo-PPP-" and then use the keys:
- Momo-PPP-BloomAmount
- Momo-PPP-Vignette
- Momo-PPP-Weight

This approach will greatly reduce the likelihood of the name colliding with another Prefab. The "Weight" key above, for example, could easily run into an issue if you had two different prefabs with a "Weight" parameter, but it's not very likely that another prefab will use "Momo-PPP" as their prefix.

## Reset User Data

:::danger

This is irreversible! You cannot restore your user data after deleting it.

:::

You can delete your own persistent user data. This allows you (or your players) to "start over" or to resolve technical issues.

There are multiple ways to reset user data, both in VRChat and on our website.
### In VRChat

Resetting your user data in VRChat is the easiest option.

#### A specific world

You can delete your User Data for any world (that you're not currently in). Follow the steps below:

1. Select a world in VRChat's main menu.
2. Scroll down to the "Actions" section.
3. Select "Reset User Data."
    - This button only appears if you have User Data for this world.
5. Select "YES, RESET."

#### All worlds

You can also delete your User Data for all worlds that you have visited (except for the world that you are currently in) by following the steps below:

1. Open your settings in VRChat's main menu.
2. Select the "Debug" section.
3. Scroll down to the "User Data" section.
4. Select "Reset All User Data"
5. Select "YES, RESET."

### On the VRChat Website

You can reset your User Data on the VRChat website. Please ensure that you have a VRChat account. If you only have a Meta, Pico, or Viveport account, you must [link it to a VRChat account](https://help.vrchat.com/hc/en-us/articles/360062659053-I-want-to-turn-my-platform-account-through-Steam-Meta-Pico-or-Viveport-into-a-VRChat-account) first.

#### A specific world

You can reset your own User Data for a specific world by following the steps below:

1. Open [a world on VRChat.com.](https://vrchat.com/home/world/wrld_4432ea9b-729c-46e3-8eaf-846aa0a37fdd)
2. Scroll down to the "User Data" section
    - This section will not exist if you do not have User Data for that world.
4. Click **Reset User Data**.
5. After reading the warning, click **Yes** to confirm.

#### All worlds

You can reset your own User Data for all worlds you visited by going to the VRChat website:

1. Open the [settings page on VRChat.com.](https://vrchat.com/home/profile).
2. Scroll down to the **Persistent Data** section.
3. Click **Reset All User Data**.
4. After reading the warning, click **Yes** to confirm.
