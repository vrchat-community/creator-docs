# Performance Considerations

## Introduction
Efficient networking is key to smooth multiplayer experiences in VRChat. Poorly optimized networked objects can lead to increased bandwidth usage, lag, and desynchronization issues. This guide provides best practices to ensure your networking logic is optimized.

## When to Use Variables vs. Events

### **Variables (Synced Data)**
Use synced variables for persistent states that need to be replicated across all players, such as:
- Player scores in a game.
- A door’s open/close state.
- Any data which needs to be available for [late joiners](/worlds/udon/networking/late-joiners).

#### **Best Practices:**
- Use **Continuous Sync** only when small updates are frequent (e.g., a progress bar).
- Use **Manual Sync** for data that must be accurate at all times (e.g., leaderboards).
- Avoid overusing synced variables, as excessive sync messages can cause bandwidth spikes.

### **Events (Temporary Actions)**
Use events for one-time actions that do not need to be persistent, and do not need to be received by late joiners such as:
- Playing an animation when a button is pressed.
- Firing a gun or triggering a sound effect.
- Spawning a temporary visual effect.

#### **Best Practices:**
- Use `SendCustomNetworkEvent(NetworkEventTarget.All, "EventName")` sparingly.
- Avoid using events for state persistence (e.g., setting a door to open state without synced variables).
- Consider local-only logic for effects that don’t need to be networked.

## Reducing Bandwidth Usage
### **Avoid Unnecessary Syncing**
- **Limit networked object updates**: Only send updates when values change significantly.
- **Optimize physics interactions**: Do not network rigidbodies unless necessary.
- **Use interpolation/extrapolation** to smooth movement instead of sending frequent position updates.

### **Optimizing Variable Syncing**
- **Group related variables** into arrays when possible.
- **Minimize float precision** (e.g., avoid syncing unnecessarily high-precision values).
- **Use binary flags** when syncing multiple boolean values.

## Best Practices for Ownership & Object Sync
- Only transfer ownership when required (e.g., for interactive objects like pickups).
- Avoid frequent ownership swaps, as they introduce latency and potential desync.

## Testing & Debugging Performance
- **Use the debug GUI (`--enable-debug-gui`)** to monitor bandwidth and sync behavior.
- **Test in real multiplayer conditions** to observe network behavior in different latency environments.
- **Profile network messages** to ensure minimal redundant data transmission.

## Next Steps
For further insights into optimizing networking, explore these related guides:
- [Debugging Networked Objects](/worlds/udon/networking/debugging)
- [Object Ownership & Transfers](/worlds/udon/networking/ownership)
- [Using Variables for Syncing](/worlds/udon/networking/variables)

