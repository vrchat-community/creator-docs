# Debugging Avatar Components

As Avatar Components can get fairly complex, it’s understandably easy to make a mistake while building your avatar. To help with both testing and debugging problems, we’ve provided users with a few tools to help make the process easier.

### In Game Debugging

:::info

In the video below, "Avatar Dynamics" refers to PhysBones and Contacts. Over time, VRChat added more features to avatars, and the term "Avatar Dynamics" is used less often now.

:::

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/8hqDquZWvhY?si=Mp7pM80fCYZPei81" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Using the Action Menu, you can use the Avatar Overlay option to show visual representations of both [PhysBones](/avatars/avatar-dynamics/physbones) and [Contacts](/avatars/avatar-dynamics/contacts) live in game. These are useful for seeing exactly what is happening, or if objects have been set up properly.

### In-Editor Debugging
Both [PhysBones](/avatars/avatar-dynamics/physbones) and [Contacts](/avatars/avatar-dynamics/contacts) run in the editor as they would in the client. By entering Play mode you are able to simulate these systems and see how your avatar will react without needing to upload your avatar. [Constraints](/avatars/avatar-dynamics/constraints) can be tested in the editor in both Play mode and Edit mode.

As long as an animation controller has been added to the Animator component of your avatar, parameters will be updated as they would be in game. Remember to add the animation controller before entering play mode!

Additionally, even if no animation controller is set up, you can still look at each component and see the values they would be giving for each parameter.