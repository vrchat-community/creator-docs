---
title: "Obstacle Course Toolkit"
slug: "uoc-window"
hidden: false
createdAt: "2021-08-10T19:19:18.669Z"
updatedAt: "2021-08-18T20:56:44.155Z"
---
![Obstacle Course Toolkit](/img/worlds/uoc-window-0a203a2-obstacle-course-toolkit.png)

We created a special window to help manage all the special prefabs and programs in the project. Here's what you can do in each section:

## Checkpoints

### Checkpoint Prefabs
![image](/img/worlds/uoc-window-a05aa7a-checkpoint-prefabs.png)
You can set all the prefabs you would like to use for your start gate, checkpoints and finish gate here. They can then be easily placed into your scene: [Add Checkpoints](/worlds/examples/obstacle-course/build-from-demo-parts#add-checkpoints).

### Checkpoints In Scene
![uoc-window-f588547-checkpoints-in-scene.png](/img/worlds/uoc-window-f588547-checkpoints-in-scene.png)

Select one of these to zoom to the selected checkpoint in Scene View. You can re-order the checkpoints (which will rename them as well) and delete them. Changes made here will properly update the variables on the CourseManager.

## Player Manager

### Player Object Prefab
![uoc-window-b781ee6-playerobjectprefab.png](/img/worlds/uoc-window-b781ee6-playerobjectprefab.png)

Change this object if you make your own Player Object, which holds the PlayerData program and follows each local player around. Most creators won't need to do this.

### Number of Players
![uoc-window-0aa8cd9-number-of-players.png](/img/worlds/uoc-window-0aa8cd9-number-of-players.png)

Change this number to generate the right number of Player Objects and automatically populate the ObjectPool.

## Score Manager

### Score Object Prefab
![uoc-window-c808c71-score-object-prefab.png](/img/worlds/uoc-window-c808c71-score-object-prefab.png)

Change this object if you make your own ScoreField, which will display the player scores as they finish a run.

### Number of Scores to Show
![uoc-window-778d7ed-number-of-scores.png](/img/worlds/uoc-window-778d7ed-number-of-scores.png)

Change this number to generate the right number of Score Fields and populate the ScoreManager references to them.

## Power Ups

### Power Up Prefabs
![uoc-window-d656caf-power-up-prefabs.png](/img/worlds/uoc-window-d656caf-power-up-prefabs.png)

You can set all the prefabs you would like to use for your Power Ups here. They can then be easily placed into your scene (link to powerUp placement) and automatically wired up.

## Power Ups In Scene
![uoc-window-4bf4a4c-power-ups-in-scene.png](/img/worlds/uoc-window-4bf4a4c-power-ups-in-scene.png)

Select one of these to zoom to the selected Power Up in Scene View. You can change the effects they will have on Speed and Jump for the player, as well as how long those effects will last after they touch the pickup.

## Defaults
![uoc-window-f1374e0-defaults.png](/img/worlds/uoc-window-f1374e0-defaults.png)

Here is where you set the Move and Jump speeds instead of on the VRCWorld object. Walk, Run and Strafe are all set to the same speed by default, and they're modified together when the player touches  Power Ups.