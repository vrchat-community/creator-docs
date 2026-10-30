---
slug: release-3-10-6
date: 2026-10-30
title: Release 3.10.6
authors: [momo]
tags: [release]
---
## Summary


SDK Version `3.10.6` brings support for native face tracking, [additional contact parameters](/common-components/contacts/#advanced-proximity-parameters) and [material contacts](/common-components/contacts/#material-contacts), placeable [exclusion zones](/worlds/components/vrc_placementzone), the [VRCVelocityTracker](/worlds/components/vrc_velocitytracker) and [VRCBillboard](/worlds/udon/vrc-billboard) components, and a variety of bug fixes to UdonSharp and [VRChat Constraints](/common-components/constraints/). In addition, [Avatar Expressions](/avatars/animator-parameters/#custom-parameters) now provide options for interpolation, bit width, and signed/unsigned representation.

:::warning

**This SDK version still uses Unity 2022.3!**

Do NOT upgrade your projects to Unity 6!

:::

<!--truncate-->

## Native Face Tracking

The Avatar Descriptor has a new [**Face Tracking** section](/avatars/face-tracking)!

- Tracking keys are based on the Unified Expressions standard [established by VRCFT](https://docs.vrcft.io/docs/tutorial-avatars/tutorial-avatars-extras/unified-blendshapes).
- Drive blendshapes and visemes across multiple meshes, with **Viseme Dampen** to balance tracked and audio-driven mouth movement.
- Layer **Blendshapes Sets** and control their weights from the animator or via Parameter Behaviors (see below).
- Use **Parameter Behaviors** to combine tracking inputs, drive or limit blendshapes, and forward values to the animator.
- Network synced face tracking is now possible without using your synced parameter budget.
- Supports **Selfie Expression** on desktop PC and Android, plus [OSC tracking](/avatars/face-tracking/osc) via `/tracking/face/v1`.

New **Face Tracking Operations** and **Forwarded Parameters** statistics contribute to [Performance Ranks](/avatars/avatar-performance-ranking-system#face-tracking).

There are lots of details, so be sure to [**check the docs!**](/avatars/face-tracking)


## Features

- Added the [VRCBillboard](/worlds/udon/vrc-billboard) component for worlds.
    - This provides an efficient way to "billboard" any transform, that is, make it point at the player's camera in desktop, or their head in VR.
    - You can also register transforms for billboarding directly from Udon.
- New functionality for [contact receivers](/common-components/contacts/#vrccontactreceiver):
    - [Advanced Proximity Parameters](/common-components/contacts/#advanced-proximity-parameters): Allows contact receivers to pass additional information about the nearest ongoing contact, including the type of sender it is contacting, its local position, local velocity, and more.
    - [Material Contacts](/common-components/contacts/#material-contacts): Allows contact receivers to write world-space transform data and other information about the nearest eight contact senders to the material properties of up to four mesh renderers.
        - If you're a shader author, check the included `VRCContacts.cginc` helper in the SDK for usage details.
- Added a [Smoothing Factor](/common-components/constraints/#smoothing-factor) option for VRChat Constraints.
    - When set to a value above zero, this allows a constraint to move smoothly towards its target over time rather than immediately snapping to it.
- Added the [VRCVelocityTracker](/worlds/components/vrc_velocitytracker) component for use in worlds.
    - It provides an efficient way to read velocity from Udon programs without running its own update loop.
- Added the [VRCPlacementZone](/worlds/components/vrc_placementzone) component for use in worlds.
    - This allows you to control the placement of user portals, stickers, sharing pedestals and world-attached items in specified areas of your worlds.
    - World creators can either block content of a given type within a zone, only allow content of that type within a zone, or leave that content unaffected.
- Added version 1.1 of [VRCRaycast](/avatars/avatar-components/raycast/) for avatars. Similar to PhysBones, existing avatars will continue to use version 1.0 of the component until they are upgraded in their SDK projects.
    - Rays now support hitting other users (the `Player` layer). Previously, rays were passing through other users without hitting them.
    - It is no longer required to assign a result transform to use a raycast, since it can still write avatar parameters without one.
    - _Note: In client version 2026.4.1 the collider shape on remote players has been adjusted to match the capsule of the local player._


## Fixes & Changes

- Added a series of helper methods to VRChat Constraints for adding, removing, getting, and setting sources, similar to Unity's constraints API.
    - In Udon, these methods should be used instead of the `Sources` list. Changing that list directly has been shown to have reliability issues, but it remains whitelisted to Udon for now to avoid backwards compatibility issues in worlds that already use it. We recommend switching to the new methods instead.
    - Additionally, VRChat constraints in SDK projects now respond to changes to their Target Transform made through C# while the project is in play mode.
    - Check our [documentation](/common-components/constraints/constraints-api#source-access) for more info.
- Added an `Outline Renderers` property to Udon behaviors that implement `Interact()`.
    - This lets you select which child renderers should be used to create an outline while the object is being hovered over, similar to the matching property for [VRCPickup](/worlds/components/vrc_pickup).
    - Pickups and interactables in worlds will no longer highlight skinned mesh renderers by default if the Outline Renderers list is empty, due to pre-existing content that relies on this. (_Starting in client version 2026.4.1_)
- Re-added the `Value` option when changing a Boolean avatar parameter with an expression. This was previously removed in 3.10.2.
    - This option sets what the parameter is set to when the expression is activated.
    - Toggling `Value` off means the expression will set the parameter to false both when it activates and when it deactivates.
    - The SDK will now display a warning against this, as we still recommend using an integer parameter for mutually exclusive states instead.
- Improved how contact receivers with no volume behave when generating proximity values.
- Improved detection of sphere-shaped contact senders with an extremely small radius.
- Improved contact detection and proximity calculation when using very thin box-shaped contact receivers.
- Resolved a case where avatar uploads could fail if no description is set.
- Fixed bit-swizzled normal map textures not rendering correctly when using DPID.
- Corrected several issues with the `?` help links appearing on nodes in UdonGraph.
- The SDK splash screen for new users now links to Android and iOS guides individually.
- Fixed a miscalculation of performance rank in the SDK compared to client when using a particle system at 0 max particles.
- Added validation warnings against incorrectly configured avatar playable layer slots.
- Improved PhysBone stability when using non-uniformly scaled transforms.
    - This is still not entirely supported and not recommended, but it should perform better in some situations.
- Resolved Udon exceptions when attempting to sync null VRCUrl objects in a world that uses persistence.
- Fixed an Udon compiler inconsistency between comparing enums by enum value vs. by integer value.
    - For example, `enum Test { A } [...] Test foo = Test.A, bar = Test.A; bool result = (foo >= bar);` used to return `false`, and will now correctly return `true` without requiring a cast to `int`.
- The UdonSharp compiler now handles named arguments which skip optional parameters.
    - For example, given the method `void MyMethod(int a, int b = 0, int c = 0)`, calling `MyMethod(1, c:3)` would actually compile as `MyMethod(1)` and quietly drop the `c` argument.


## Fixes in `3.10.6-beta.2`

- Corrected a compatibility-breaking rename of `ContactReceiver.SetParameter` that was causing some tools to break.
- Fixed an issue where "Auto-Fill Blendshapes" would fill viseme keys that were hidden by the search filter in a Blendshapes Set.
- Added a reminder dialog to the worlds SDK when using thumbnail images from external sources. Thumbnails are required to accurately represent what a user will experience in the world.


## Fixes in `3.10.6-beta.3`

- Changes to [Advanced Contact Parameters](/common-components/contacts/#advanced-parameters) and [Material Contacts](/common-components/contacts/#material-contacts):
    - Both Advanced Parameters and Material Contacts now apply their effects regardless of what type the contact receiver is set to. Previously, they only worked on Proximity contacts.
        - `Advanced Proximity Parameters` was renamed to `Advanced Parameters` to account for this.
    - Added the following advanced parameters:
        - Sender lossy scale, giving the lossy scale of the transform the contact sender is associated with.
        - Point separation, giving the world space distance between the nearest inner points of the sender and receiver.
    - When two senders both have a proximity value of 1 to the same receiver, the receiver will now use whichever sender has the lower point separation (closest approach) when applying Advanced Parameters and Material Contacts.
    - Contact receivers can now specify a separate parameter name for writing to material properties that differs from the one they access on animators.
    - Fixed a bug where Material Contacts would stop working when targeting Renderers with "Cast Shadows" disabled.
- Face Tracking related fixes:
    - Fixed the SDK editor preview for `Eye Gaze Mode: Face Tracking`.
        - Previously it incorrectly behaved like "Bone Rotation" mode. This was a preview-only issue, it already worked fine in VRChat.
    - Improved SDK editor performance when using a large number of Parameter Behaviors.
- [VRCBillboard](/worlds/udon/vrc-billboard)'s `_smoothingFactor` field now presents as a slider instead of a write-in value, since it's meant to be a normalized 0...1 property in most cases.
- Fixed a minor issue with the `VRC_CONTACT_BUFFER_SIZE` define in `VRCContacts.cginc`.


## Fixes in `3.10.6-beta.4`

- Three new options for expression parameters are now available in avatar projects. Check our [documentation](/avatars/animator-parameters/#custom-parameters) for more info on how to use them.
    - "Lerp Duration", which allows values to move linearly towards their target value over time.
    - "Bit Width", which allows parameters to use fewer than 8 bits. This can help to free up space for synced parameters in exchange for some accuracy/range.
    - "Representation", which allows float parameters to be unsigned (0 to 1 instead of -1 to 1) and integer parameters to be signed (-128 to 127 instead of 0 to 255).
- Changed the `Advanced Parameters` option from a toggle into a multiselect dropdown. This lets you choose which specific advanced parameters you need, and avoids generating unused ones for performance reasons.
- You can now drag-and-drop onto the "Face Tracking Meshes" header to add new entries to the list.
- The `IsBasicFaceTrackingKey` C# API now also accepts `FaceTrackingKey` enums directly.


## Changes between `beta.4` and live

- Increased [face tracking expression](/avatars/face-tracking/#custom-expressions) instruction limits.
    - The avatar-wide limit of 512 instructions has been increased to 2048.
    - The per-behaviour limits have increased as follows: Instruction limit from 64 to 256, character limit from 512 to 1024, and token limit from 128 to 256.


## Known Issues

- In rare cases, you may see an "All pipe instances are busy" error while building. This is a Unity issue - restarting your editor and trying again should fix it.
