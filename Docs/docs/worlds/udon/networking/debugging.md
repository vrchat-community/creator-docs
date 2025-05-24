# Debugging Network Issues

The [World Debug Views](/worlds/udon/world-debug-views) are useful tools that can help you understand the ownership and network state of objects and data in your scene.

### Issue: Object Sync Not Working
#### Possible Causes:
- The object is missing a `VRCObjectSync` component.
- The object's ownership hasn't been transferred correctly.
- The object is not set to use Continuous syncing.

#### Fix:
- Ensure `VRCObjectSync` is added.
- Check ownership with:
  ```cs
  Debug.Log("Owner: " + Networking.GetOwner(gameObject).displayName);
  ```
- Use `RequestSerialization()` to send updates when using manual sync mode.

### Issue: Late Joiners See Incorrect State
#### Possible Causes:
- The object relies on events instead of synced variables.
- Missing serialization step for critical state updates.

#### Fix:
- Use synced variables for persistent state.
- Ensure data is serialized correctly using:
  ```cs
  public override void OnDeserialization()
  {
      Debug.Log("Synced data received: " + syncedVariable);
  }
  ```

### Issue: Ownership Conflicts
#### Possible Causes:
- Multiple scripts attempt to transfer ownership simultaneously.
- Unchecked ownership requests allow unexpected takeovers.

#### Fix:
- Verify ownership using:
  ```cs
  if (Networking.IsOwner(Networking.LocalPlayer, gameObject))
  {
      Debug.Log("I am the owner");
  }
  ```
- Use `OnOwnershipRequest()` to handle transfer conditions.

## Best Practices
- Use the debug overlays to check ownership and network quality.
- Minimize unnecessary ownership transfers to prevent desync.
- Test with multiple players to catch issues related to sync delays and ownership changes.
- Log key networking actions (`Debug.Log`) for analysis.

## Next Steps
For further networking troubleshooting, explore these topics:
- [Object Ownership & Transfers](/worlds/udon/networking/ownership)
- [Using Variables for Syncing](/worlds/udon/networking/variables)
- [Performance Considerations](/worlds/udon/networking/performance)