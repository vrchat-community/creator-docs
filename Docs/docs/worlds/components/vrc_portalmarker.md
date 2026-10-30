# VRC Portal Marker

Creates a portal to another VRChat world. Users can walk into the portal to travel to other worlds. While the user's VRChat menu is open, they can also select the portal to learn more about the portal's world. 

## Usage

Set the World ID property to a specific world, and the portal will lead to an existing public instance of that world. If no public instance exists, the portal leads to a new instance.

To create a portal to the user's home world or the VRChat Hub world, use the "World" option instead of specifying a world ID.

## Properties

VRC Portal Marker offers the following properties:

| Parameter | Udon property | Description |
|-----|-----|-----|
| World ID | `roomId` | The world ID to create a portal to, like `wrld_f995a2eb-7ddc-4558-aef1-815c3b23df6c`. |
| Custom Portal Name | — | Overrides the world name users see above the portal. |
| World | — | <ul><li>**None** - Creates a portal for the world ID you specified above.</li><li>**Home** - Creates a portal to the user's current home world.</li><li>**Hub** - Creates a portal to the VRChat Hub world.</li></ul> |

## Udon API

`class VRC.SDK3.Components.VRCPortalMarker`

You can change the portal's destination from Udon at runtime by setting `roomId`, the Udon property for **World ID**.

| Name | Returns | Summary |
| --- | --- | --- |
| RefreshPortal() | void | Rebuilds the portal. Call this after changing `roomId` at runtime so the portal points at the new world. |
