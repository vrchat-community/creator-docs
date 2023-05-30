---
title: "Image Loading"
slug: "image-loading"
excerpt: "Display image files from the internet in your VRChat world"
hidden: false
createdAt: "2023-02-07T01:09:55.404Z"
updatedAt: "2023-05-15T15:20:08.022Z"
---
Image Loading allows you to download images from the internet and use them as textures in your materials. The SDK includes an easy-to-use `ImageDownload` script, or you can make your own script with the new `VRCImageDownloader` object.

- The maximum resolution is 2048 × 2048 pixels.
  - Attempting to download larger images will result in an error.
- One image can be downloaded every five seconds.
  - If this limit is exceeded, images downloads are queued and downloaded in a random order.
  - This limit applies to your entire scene, regardless of the amount of VRCImageDownload components used.
- The URL must point directly at an image file.
  - URL redirection is not allowed and will result in an error.
- Downloaded images are automatically interpreted as RGBA, RGB, or RG images.
  - For example, a grayscale image with an alpha channel is interpreted as an RG image.
- There is a limit of 1000 elements in the queue
- Both the Input and Output buffers are limited to a maximum of 32MB, images exceeding these will result in an error.

## Trusted URLs

The following domains are allowed to be used with Image Loading. If a domain is not on the list, images will not download unless 'Allow Untrusted URLs' has been enabled in the user's settings.

- Discord (`cdn.discordapp.com`)
- Dropbox (`dl.dropbox.com`)
- GitHub (`*.github.io`)
- ImageBam (`images4.imagebam.com`)
- ImgBB (`i.ibb.co`)
- imgbox (`images2.imgbox.com`)
- Imgur (`i.imgur.com`)
- Postimages (`i.postimg.cc`)
- Reddit (`i.redd.it`)
- Twitter (`pbs.twimg.com`)
- VRChat (`assets.vrchat.com`)

## Guides

### Using the `ImageDownload` script to download an image

The SDK includes a script to easily download images:

1. Create a new GameObject in your scene.
2. Add an UdonBehaviour component.
3. Select `ImageDownload` as the program source.
4. Select a Material to apply the downloaded texture to
5. (Optional) Customize `TextureInfo` to change the downloaded texture's settings 

### Create your own script for `VRCImageDownloader`

You can use `VRCImageDownloader` in your own Udon Graph scripts. Here's how:

1. Create a new `VRCImageDownloader` object with its Constructor node.
2. Save the newly created `VRCImageDownloader` as a variable. (This **required**, see 'Notes'.)
3. Execute the `DownloadImage` function on the `VRCImageDownloader` instance.
4. (Optional) Wait for the `OnImageLoadSuccess` or `OnImageLoadFailure` event to execute.

## UdonGraph Nodes

### Type Nodes

#### VRCImageDownloader

Use `VRCImageDownloader`'s constructor to create an image downloader, which can download image from the internet during runtime.

##### DownloadImage

Downloads an image, and calls an event indicating success or failure (see 'New Events').  
Returns an `IVRCImageDownload`, which can be used to track the progress of the download.

- **Instance**: The `ImageDownloader` component to download the image with.  
- **Url** : The `VRCURL` of the texture to download.  
- **Material** (optional): The Material to automatically apply the downloaded image to, as a main texture.
- **UdonBehavior** (optional): The `Udonbehavior` to send `VRCImageDownloader` events to. If `udonBehavior` is empty, the current UdonBehaviour will receive all events.
  - Note that UdonSharp will not receive any events unless `udonBehavior` is specified.
- **TextureInfo** (optional):  The `TextureInfo` object containing settings for the newly created texture.

##### Dispose

Cleans up the `VRCImageDownloader`. Frees up downloaded textures from memory.  
(Calling `Dispose` invalidates the VRCImageDownloader object, and a new one must be instantiated to download images).  

###### Note on disposal and garbage collection

- Calling `Dispose` will invalidate the `VRCImageDownloader`, the associated `IVRCImageDownload`, and the downloaded texture.
  - After calling `Dispose`, the `VRCImageDownloadState` `State` of `IVRCImageDownload` will change to `Unloaded` until it is garbage collected.
- `VRCImageDownloader` keeps textures in memory until it is destroyed or disposed using its `Dispose` function.
- Make sure to save the reference to your `VRCImageDownloader` as a variable to prevent it (and any downloaded texture) from randomly being garbage collected.

#### TextureInfo

Contains settings to apply to a downloaded texture. 

- **GenerateMipmaps**: Enables Mipmap generation. (Default: `false`)
- **FilterMode**: Sets the `FilterMode` of the texture. (Default: `Bilinear`)
- **WrapModeU**: The `TextureWrapMode` along the U (horizontal) axis (Default: `Repeat`)
- **WrapModeV**: The `TextureWrapMode` along the V (vertical) axis  (Default: `Repeat`)
- **WrapModeW**: The `TextureWrapMode` along the W (depth, only relevant for Texture3D) axis. (Default: `Repeat`)
- **AnisoLevel**: The `anisoLevel` of the texture. A value of 0 disables filtering, 16 equals full filtering. (Default: `9`)
  - VRChat uses forced anisotropic filtering. When the anisoLevel value is between 1 and 9, Unity sets the anisoLevel to 9. If the value is higher than 9, Unity clamps it between 9 and 16.
- **MaterialProperty**: Overrides which `MaterialProperty` to apply the downloaded texture to, if a `material` was specified in `DownloadImage`. (Default: `_MainTex`)

#### IVRCImageDownload

Contains information about the downloaded image. Returned by `VRCImageDownloader`'s `DownloadImage` function, by `OnImageLoadSuccess`, and by `OnImageLoadError`.  
Note that many of these fields will be invalid until the download has completed or failed.

- **Get Error**: Gets the `VRCImageDownloadError` associated with the event. 
- **Get Errormessage**: Gets the error message as a `string`.  
- **Get Material**: Gets the Material sent into the `DownloadImage` function.  
- **Get Progress**:`Gets the progress of the image download as a`float\` between 0 and 1. Use this to track the progress of the download, i. e. for custom loading bars.
- **Get Result**: The `Texture2d` of the downloaded image.  
- **Get SizeInMemoryBytes**: Gets the size of the texture in bytes as an `int`. 
- **Get State**: Gets the `VRCImageDownloadState` indicating the state of the image download.  
- **Get TextureInfo**: The texture info given to the DownloadImage function (TextureInfo)  
- **Get Udonbehavior**: Gets the given udonbehavior the events of the download image are being send to (UdonBehavior)  
- **Get URL**: Gets the `VRCURL` of the image download.

#### VRCImageDownloadState

Indicates the state of the image download in `IVRCImageDownload`:

- **Pending**: Not been started or still in progress.
- **Error**: Download failed an error (see `VRCImageDownloadError`).
- **Complete**: Download complete, texture is ready to use.
- **Unloaded**: Pending garbage collection after `Dispose` has been called on `IVRCImageDownload`.
- **Unknown**: Unknown state.

#### VRCImageDownloadError

When an image download fails, `OnImageLoadError` is called. `IVRCImageDownload`'s `Error` field will contain one of the following error states:

- **InvalidURL**: The download URL used in `DownloadImage` is invalid.
- **AccessDenied**: Access to the URL was denied.
- **InvalidImage**: The downloaded image is invalid.
- **DownloadError**: A web request error occured.
- **Unknown**: Unknown error state.

### Events

#### OnImageLoadSuccess

Returns `IVRCImageDownload`. Called when a `VRCImageDownloader` has successfully download an image.

#### OnImageLoadError

Returns `IVRCImageDownload`. Called when a `VRCImageDownloader` has failed to download an image.