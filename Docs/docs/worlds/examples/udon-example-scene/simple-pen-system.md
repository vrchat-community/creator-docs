---
title: "Simple Pen System"
slug: "simple-pen-system"
excerpt: "Simple is a relative term."
hidden: false
createdAt: "2021-05-14T00:44:52.076Z"
updatedAt: "2021-05-20T23:00:49.470Z"
---
The Simple Pen system consists of two programs - one for the Pen, and one for each Line that will be drawn

# How the Pen and Lines Work Together

### Pen
The pen has VRCPickup and VRCObjectSync components, which provide the basic pickup and sync functionality. The program itself is uses Continuous sync since that works well with these components.

### Lines
Each line object has its own LineRenderer and a program with Manual Sync, since it doesn't need to update as often as the pen. The line has a **points** variable which is Vector3 array. This variable is the main way that data for the lines are synced for everyone in the instance.

## Drawing Starts
When someone uses the Pen, this calls **OnPickupUseDown** on the pen. This will cause a few things to happen in the program:
* A new Line is retrieved from the pool and saved in a variable
*The player with the pen is made the Owner of the line
* *isDrawing* is set to true
* The line is reset to have two points with their positions at the tip of the pen
* a variable is incremented to track which line will be used next.

## Drawing Continues
Every frame, the **Update** event is called on the pen, and the following logic is run:
* If *isDrawing* is true, we continue:
* If the pen has moved more than *minMoveDistance*, we continue:
* We add a new point to the LineRenderer at the position of the *penTip*
* We check if we've queued up enough points to send by comparing currentIndex against pointsPerUpdate
* If we're ready to update the data, we call **OnUpdate** on the UdonBehaviour on the target line.

When this **OnUpdate** method is called on the line, the program retrieves the current positions of the points in the line, updates the synced *points* variable, and calls **RequestSerialization**, which is how Manual-synced UdonBehaviours tell VRChat to send out the queued data. This method is only called on the owner of the line. Everyone else receives the data, and then has their **OnDeserialization** method called. When this method triggers on a line, the line program reads the positions from the *points* array, and uses them to update the positions in their own line.

## Drawing Finishes
When the user lets go of the Use button, the **OnPickupUseUp** event is called on the pen. This event simply sets *isDrawing* to false, and calls **OnFinish** on the target line's UdonBehaviour. This will send the **OnUpdate** method one more time to make sure the **points** data is up-to-date for everyone.