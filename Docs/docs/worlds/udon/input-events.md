---
title: "Input Events"
slug: "input-events"
hidden: false
createdAt: "2021-03-06T00:42:21.796Z"
updatedAt: "2021-04-30T05:46:19.513Z"
---
You can read the input of a Player's controller in a unified way across all platforms by using Udon Input Events. These events will work correctly even when the player has remapped their controls. 

There are currently two types of events - Button and Axis, which include boolean and float values. Each event also holds a special [UdonInputEventArgs ](/worlds/udon/input-events#UdonInputEventArgs) object.
# Button Events
Button events include a *bool* value which is **true** when the button is pressed and **false** when it is released. 

### InputJump
Spacebar on Desktop, typically a face button on controllers.

### InputUse
Left-Click on Desktop, typically a trigger button on controllers.

### InputGrab
Left-Click on Desktop, typically a grip button on VR controllers.

### InputDrop
Right-Click on Desktop, press grip button on Vive Wands and some Windows Mixed Reality Controllers, release grip button on others.
# Axis Events
Axis events have a **float** value which typically ranges between -1 and 1. When using a controller with analog sticks, a new event will be triggered for each change in value, from 0 to 0.1, then to 0.2, etc. Desktop users will output whole numbers: -1, 0, 1, etc.

### InputMoveHorizontal
A and D on Desktop, typically the left stick/pad moving left and right on controllers.

### InputMoveVertical
W and S on Desktop, typically the left stick/pad moving up and down on controllers.

### InputLookVertical
Moving the mouse up and down on Desktop, typically the right stick up and down on gamepad and VR controllers.

### InputLookHorizontal
Moving the mouse left and right on Desktop, turning left and right using the right stick/pad without Comfort Turning on VR controllers, typically the right stick left and right on gamepad controllers.
# UdonInputEventArgs
This object is included in every input event, and holds additional data for the event which may be useful. We may add more data into this object in the future, let us know if you think of something handy you'd like to reference here. For now, it includes:

**UdonInputEventType**: BUTTON or AXIS
**boolValue**: True/False if this is a button event, false if it's an axis event (default value)
**floatValue**: Number between -1 and 1 for an axis event, 0 if it's a button event (default value)
**handType**: LEFT or RIGHT. Included for keyboard and mouse users as well (mouse is RIGHT, keyboard is LEFT).