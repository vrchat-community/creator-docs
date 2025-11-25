# Debugging Avatar Components

As Avatar Components can get fairly complex, it’s understandably easy to make a mistake while building your avatar. To help with both testing and debugging problems, we’ve provided users with a few tools to help make the process easier.

### In Game Debugging

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/8hqDquZWvhY?si=Mp7pM80fCYZPei81" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Using the Action Menu, you can use the Avatar Overlay option to show visual representations of both [PhysBones](/common-components/physbones) and [Contacts](/common-components/contacts) on avatars live in game. These are useful for seeing exactly what is happening, or if objects have been set up properly.

:::tip

Are you a world creator using these components in your world? There's a [debug view](/worlds/udon/world-debug-views#debug-view-7) you can use to visualize them instead.

:::

### In-Editor Debugging
Both [PhysBones](/common-components/physbones) and [Contacts](/common-components/contacts) run in the editor as they would in VRChat. By entering Play mode you can simulate these systems and see how your avatar will react without needing to upload it.

You can test [Constraints](/common-components/constraints) in the editor in both Play mode and Edit mode. If you prefer, you can stop constraints running in Edit mode via the SDK Control Panel (VRChat SDK > Show Control Panel > Settings > Execute VRChat Constraints in Edit Mode).

If you add an Animator Controller to your avatar's Animator component before entering Play mode, the parameters on your avatar will be updated just like in VRChat.

Additionally, even if no animation controller is set up, you can still look at each component and see the values they would be giving for each parameter.