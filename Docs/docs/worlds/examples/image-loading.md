# Image Loading

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Udon can load images from the internet and display them as UI elements or as textures on world objects. Our example world below demonstrates how the system works and how to use GitHub to host the images and captions.

## Example World

[Download the example project](https://github.com/vrchat-community/examples-image-loading/archive/refs/heads/main.zip) or [visit the GitHub repo](https://github.com/vrchat-community/examples-image-loading) to clone it for yourself.

This scene has a picture frame that automatically changes to show different images with matching captions. The images and captions are both hosted for free on GitHub Pages and are included in the GitHub repository above.

<video loop="loop" autoplay="autoplay" muted>
  <source src="/img/worlds/image-loader.mp4" type="video/mp4" />
    Your browser does not support the video tag.
</video>

Scene File: `Assets/_Project/Gallery`

## Using the Prefab in Your World

To use the prefab, you'll need to add it to your project and set up the image caption URLs.

This repo publishes to [GitHub Pages](https://pages.github.com/) for free hosting. You can host the images and captions anywhere you want, but we recommend using GitHub Pages because it's free, easy to set up, and you can keep the images and captions in the same repository as your world. If you're hosting them elsewhere, skip to step 4.

1. [Fork the example repo](https://github.com/vrchat-community/examples-image-loading/fork) to your own GitHub account.

2. Edit the images and captions in the "Web" directory. You can ignore or delete the `index.html` page, it's just there as an example to test the images and captions in a browser. You can keep the images named 1.jpg, etc to make it easier to use the prefab, or rename them and update the prefab URLs. 

:::tip
When the files in the "Web" directory are edited, the website is re-published. As long as the filenames stay the same (images are 1.jpg, 2.jpg, etc.), the URLs in the world will point to the newly published files. Republishing happens automatically through [an included GitHub Action](https://github.com/vrchat-community/examples-image-loading/actions/workflows/static.yml).
:::
3. Clone the repo to your computer.

4. Make sure your project has SDK 3.2.3 or newer as well as ClientSim and UdonSharp, which you can easily add through the [Creator Companion](https://vcc.docs.vrchat.com/).

5. Import the [Prefab Unitypackage](https://github.com/vrchat-community/examples-image-loading/releases/download/0.2.0/SlideshowFrame.unitypackage) into your project.

6. Drag the **SlideshowFrame** prefab into your scene.

7. Select the **SlideshowFrame** in your scene's Inspector.

8. In the **SlideshowFrame** component, set the **Image Urls** array size to match the number of images you want to load, then update the URLs to match your image URLs. If you're using GitHub Pages, the URLs will be in the format `https://<your-github-username>.github.io/<your-repo-name>/1.jpg`.

9. Update the **String Url** to match your caption URL. If you're using GitHub Pages, the URL will be in the format `https://<your-github-username>.github.io/<your-repo-name>/captions.csv`.

#### Testing it Out

If you're using GitHub to host the images and captions, make sure you've committed and pushed your changes to GitHub, which will trigger the GitHub Action to publish the files to GitHub Pages.

1. Enter Play Mode in Unity.
2. The images and captions should load automatically. If they don't, check the Console for errors.
3. Run a Build and Test to make sure it works in VRChat as well. You may need to turn on "Untrusted URLs" in your settings.

## Important GameObjects

The most important objects to inspect in the scene are [TheFrame](#theframe) and [SlideshowFrame](#slideshowframe). 


![image](https://user-images.githubusercontent.com/737888/219288603-2fc2753b-27a1-4f61-ad22-a51df527907d.png)

### TheFrame

TheFrame is a GameObject with a couple of important pieces:
* **SlideshowFrame**: an `UdonBehaviour` which loads the images and captions from the web server.
* **Mesh**: Is the black frame around the picture.
* **Picture**: Is a `Mesh` which renders the downloaded textures.
* **UI**: Is a World-Space `Canvas` which renders the captions.

### SlideshowFrame

The **SlideshowFrame** `UdonBehaviour` has all of the logic to download the images and captions from the web server.

![image](https://user-images.githubusercontent.com/737888/219288738-ace09705-18d4-4f8e-bb45-792ff662bf7b.png)

It has these public variables:
* **Image Urls**: An `Array` of all the `VRCUrls` for the images to download.
* **String Url**: Is a single `VRCUrl` where the caption text can be downloaded.
* **Renderer**: This target `Renderer's` **sharedMaterial** will have its texture set from the downloaded textures.
* **Field**: This `UI Element's` **text** property will be set from the downloaded caption for the matching texture.
* **Slide Duration Seconds**: How long to show each image.

The basic logic flow of the script is this:

## Creating an Image Downloader

### Using the `ImageDownload` script to download an image

The SDK includes a script to easily download images:

1. Create a new GameObject in your scene.
2. Add an UdonBehaviour component.
3. Select `ImageDownload` as the program source.
4. Select a Material to apply the downloaded texture to
5. (Optional) Customize `TextureInfo` to change the downloaded texture's settings. 

### Create your own script for `VRCImageDownloader`

You can use `VRCImageDownloader` in your own Udon Graph scripts.

1. Create a new `VRCImageDownloader` object with its Constructor node.
2. Save the newly created `VRCImageDownloader` as a variable. (This **required**.)
3. Execute the `DownloadImage` function on the `VRCImageDownloader` instance.
4. (Optional) Wait for the `OnImageLoadSuccess` or `OnImageLoadError` event to execute.

#### The basic logic flow of the script is:

1. On Start, construct a `VRCImageDownloader` to reuse for downloading all the images. It's important to keep this around so the textures will persist.

```csharp
// It's important to store the VRCImageDownloader as a variable, to stop it from being garbage collected!
_imageDownloader = new VRCImageDownloader();
```

2. Download the captions/strings from the `String Url`.

If the String downloads successfully, split it up line-by-line into separate strings, and save those to a `_captions` array. If it doesn't download, log the error message.


<Tabs groupId="udon-compiler-language">
<TabItem value="graph" label="Udon Graph">

![An example of how to use image loading in the Udon Graph. The Udon Graph can't use newline characters directly, so an integer conversion to a character is used instead.](/img/worlds/string-load-graph-example.png)

</TabItem>
<TabItem value="cs" label="UdonSharp">

```cs
private void Start()
{
    // To receive Image and String loading events, 'this' is casted to the type needed
    _udonEventReceiver = (IUdonEventReceiver)this;
        
    // Captions are downloaded once. On success, OnImageLoadSuccess() will be called.
    VRCStringDownloader.LoadUrl(stringUrl, _udonEventReceiver);
}

public override void OnStringLoadSuccess(IVRCStringDownload result)
{
    _captions = result.Result.Split('\n');
    UpdateCaptionText();
}

public override void OnStringLoadError(IVRCStringDownload result)
{
    Debug.LogError($"Could not load string {result.Error}");
}
```

</TabItem>
</Tabs>

3. Try to Load the next Image. Increment the `_loadedIndex` to keep track of our place, then call `DownloadImage()` on the downloader we saved earlier.

If the Image downloads successfully, save a reference to it and then load it up on the `Renderer`. If it fails, log the error message.

4. Call the function to Load the next Image again, delayed by `SlideDurationSeconds`. The `_loadedIndex` is incremented during each Load call, and starts over after reaching the last url in the array.

When each image is visited for the second+ time, it will be displayed from its saved Texture2D reference instead of loaded fresh, unless it failed to download the first time.

:::tip Source Code
View the full source code for [SlideshowFrame.cs on GitHub](https://github.com/vrchat-community/examples-image-loading/blob/main/Assets/_Project/Frame/SlideshowFrame.cs).
:::

## Known Issues

* The first image doesn't have its caption loaded quickly enough, so it doesn't show until the first loop around.

:::tip Udon

View the [main Image Loading docs page](/worlds/udon/image-loading) for full details on the Image Loading system, including domain and file limits.

:::
