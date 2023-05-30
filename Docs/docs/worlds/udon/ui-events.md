---
title: "UI Events"
slug: "ui-events"
hidden: false
createdAt: "2020-09-10T18:40:43.256Z"
updatedAt: "2021-11-12T01:19:47.826Z"
---
You can use Unity UI events to directly call methods for simple interactions, rather than building an UdonBehaviour. 
![ui-events-3c37d22-UIEventTarget.png](/img/worlds/ui-events-3c37d22-UIEventTarget.png)

However, we've limited what can be called to this list:
# Allowed UI Event Targets
### Animator
* Play
* PlayInFixedTime
* Rebind
* SetBool
* SetFloat
* SetInteger
* SetTrigger
* ResetTrigger
* speed

### AudioSource
* Pause
* Play
* PlayDelayed
* PlayOneShot
* Stop
* UnPause
* bypassEffects
* bypassListenerEffects
* bypassReverbZones
* dopplerLevel
* enabled
* loop
* maxDistance
* rolloffMode
* minDistance
* mute
* pitch
* playOnAwake
* priority
* spatialize
* spread
* time
* volume

### AudioDistortionFilter
* decayRatio
* delay
* dryMix
* enabled
* wetMix

### AudioEchoFilter
* decayRatio
* delay
* dryMix
* enabled
* wetMix

### AudioHighPassFilter
* cutoffFrequency
* enabled
* highpassResonanceQ

### AudioLowPassFilter
* cutoffFrequency
* enabled
* lowpassResonanceQ

### AudioReverbFilter
* decayHFRatio
* decayTime
* density
* diffusion
* dryLevel
* enabled
* hfReference
* reflectionsDelay
* reflectionsLevel
* reverbDelay
* reverbLevel
* room
* roomHF
* roomLF

### AudioReverbZone
* decayHFRatio
* decayTime
* density
* diffusion
* enabled
* HFReference
* LFReference
* maxDistance
* minDistance
* reflections
* reflectionsDelay
* room
* roomHF
* roomLF

### Button
* enabled
* interactable
* targetGraphic

### Collider
* enabled
* isTrigger

### Dropdown
* captionText
* enabled
* interactable
* itemText
* targetGraphic
* template
* value

### Image
* alphaHitTestMinimumThreshold
* enabled
* fillAmount
* fillCenter
* fillClockwise
* fillOrigin
* maskable
* preserveAspect
* raycastTarget
* useSpriteMesh

### GameObject
* SetActive

### InputField
:::caution Character limit

Please note that input fields are limited to 16.000 characters, which is the maximum amount of characters a text component can render.
:::
* ForceLabelUpdate
* caretBlinkRate
* caretPosition
* caretWidth
* characterLimit
* customCaretColor
* enabled
* interactable
* readOnly
* selectionAnchorPosition
* text
* textComponent
* selectionFocusPosition


### Light
* Reset
* bounceIntensity
* colorTemperature
* cookie
* enabled
* intensity
* range
* shadowBias
* shadowNearPlane
* shadowNormalBias
* shadowStrength
* spotAngle

### LineRenderer
* allowOcclusionWhenDynamic
* shadowCastingMode
* enabled
* endWidth
* loop
* motionVectorGenerationMode
* numCapVertices
* numCornerVertices
* probeAnchor
* receiveShadows
* shadowBias
* startWidth
* lightProbeUsage
* useWorldSpace
* widthMultiplier

### Mask
* enabled
* showMaskGraphic

### MeshRenderer
* shadowCastingMode
* enabled
* probeAnchor
* probeAnchor
* receiveShadows
* lightProbeUsage

### ParticleSystem
* Clear
* Emit
* Pause
* Pause
* Play
* Simulate
* Stop
* Stop
* TriggerSubEmitter
* time
* useAutoRandomSeed

### ParticleSystemForceField
* endRange
* gravityFocus
* length
* multiplyDragByParticleSize
* multiplyDragByParticleVelocity
* startRange

### Projector
* aspectRatio
* enabled
* nearClipPlane
* farClipPlane
* fieldOfView
* orthographic
* orthographicSize

### RawImage
* enabled
* maskable
* raycastTarget

### RectMask2D
* enabled

### Scrollbar
* enabled
* handleRect
* interactable
* numberOfSteps
* size
* targetGraphic
* value

### ScrollRect
* content
* decelerationRate
* elasticity
* enabled
* horizontal
* horizontalNormalizedPosition
* horizontalScrollbar
* horizontalScrollbarSpacing
* inertia
* scrollSensitivity
* vertical
* verticalNormalizedPosition
* verticalScrollbar
* verticalScrollbarSpacing
* viewport

### Selectable
* enabled
* interactable
* targetGraphic

### SkinnedMeshRenderer
* allowOcclusionWhenDynamic
* shadowCastingMode
* enabled
* lightProbeProxyVolumeOverride
* motionVectorGenerationMode
* probeAnchor
* receiveShadows
* rootBone
* skinnedMotionVectors
* updateWhenOffscreen
* lightProbeUsage

### Slider
* enabled
* fillRect
* handleRect
* interactable
* maxValue
* minValue
* normalizedValue
* targetGraphic
* value
* wholeNumbers

### Text
* alignByGeometry
* enabled
* fontSize
* lineSpacing
* maskable
* raycastTarget
* resizeTextForBestFit
* resizeTextMaxSize
* resizeTextMinSize
* supportRichText
* text

### Toggle
* enabled
* group
* interactable
* isOn
* targetGraphic

### ToggleGroup
* allowSwitchOff
* enabled

### TrailRenderer
* Clear
* allowOcclusionWhenDynamic
* autodestruct
* shadowCastingMode
* enabled
* emitting
* endWidth
* motionVectorGenerationMode
* numCapVertices
* numCornerVertices
* probeAnchor
* receiveShadows
* shadowBias
* startWidth
* lightProbeUsage
* widthMultiplier


### UdonBehaviour
* RunProgram
* SendCustomEvent
* Interact