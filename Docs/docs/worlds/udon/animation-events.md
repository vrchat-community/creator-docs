import UnityVersionedLink from '@site/src/components/UnityVersionedLink.js';

# Animation Events

You can <UnityVersionedLink versionKey="minor" url="https://docs.unity3d.com/<VERSION>/Documentation/Manual/script-AnimationWindowEvent.html">call events from your Animations</UnityVersionedLink>. This page lists the events that are allowlisted for use in this way. If an event is not in this allow list, it will not be called when your world runs in VRChat.

![animation-events-af04d2a-AnimationEventInspector.png](/img/worlds/animation-events-af04d2a-AnimationEventInspector.png)

## Allowed Animation Events
* RunProgram
* SendCustomEvent
* Play
* Pause
* Stop
* PlayInFixedTime
* Rebind
* SetBool
* SetFloat
* SetInteger
* SetTrigger
* ResetTrigger
* SetActive