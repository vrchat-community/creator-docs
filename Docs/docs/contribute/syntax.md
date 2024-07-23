# Syntax guide

import BrowserWindow from '@site/src/components/BrowserWindow';
import APITable from '@site/src/components/APITable';

Most documentation pages consist of text. However, you can use additional syntax to make your pages easier to read.

## Markdown

Your pages are written in [Markdown](https://en.wikipedia.org/wiki/Markdown). Markdown documents are easy to edit and preview in any text editor. Here is a very simple example of a documentation page:

```md
# Example page

This is an example page with a title and some text.
```

The VRChat Creation documentation is built with [Docusaurus](https://docusaurus.io/). Docusaurus turns your Markdown file into a web page:

```mdx-code-block
<BrowserWindow>
```

# Example page

This is an example page with a title and some text.

```mdx-code-block
</BrowserWindow>
```

Docusaurus uses [MDX](https://mdxjs.com/), an extension of Markdown. You can use Docusaurus and MDX to enhance your documentation in various ways.

:::tip

You can learn how any page was created by clicking "Edit this page" at the bottom of any page.

:::

## Preview your changes

If you want to submit complex changes to VRChat's documentation, you should preview them on your computer. This allows you to see how your changes will look on the website.

To preview your changes, follow the [instructions on GitHub](https://github.com/vrchat-community/creator-docs?tab=readme-ov-file#local-development):
1. [Create your fork](https://github.com/vrchat-community/creator-docs/fork) of the [creator documentation repository](https://github.com/vrchat-community/creator-docs) on GitHub.
2. Clone your fork with [Git](https://www.git-scm.com/).
3. Install Docusaurus with [npm](https://www.npmjs.com/) by running `npm install` in the `Docs/` folder. 
4. Start Docusaurus with [npm](https://www.npmjs.com/) by running `npm run start` in the `Docs/` folder. 

## Front matter

[Front matter](https://docusaurus.io/docs/markdown-features#front-matter) is optional data about your markdown file. You can use it to change how Docusaurus presents your page in the documentation.

You can add front matter at the top of the file, enclosed by three dashes (`---`). The content is parsed as [YAML](https://yaml.org/spec/1.2.2/).

```
---
unlisted: true
---
```

The following table shows the most useful frontmatter fields. You can find a [full list in Docusaurus's documentation](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs#markdown-front-matter). 

```mdx-code-block
<APITable>
```

| Name                    | Type      | Default value         | Description                                                                                                | Recommendation                                                       |
| ----------------------- | --------- | --------------------- | ---------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `sidebar_label`         | `string`  | Markdown title (`#`)  | The title of your page in the sidebar.                                                                     | Consider improving your page title instead of using `sidebar_label`. |
| `sidebar_position`      | `number`  | Alphabetical ordering | The position of your page in the sidebar.                                                                  | Only use `sidebar_position` when the sidebar order is important.     |
| `slug`                  | `string`  | Markdown file name    | The URL of your document.                                                                                  | Consider using an appropriate file name instead of using `slug`.     |
| `toc_min_heading_level` | `number`  | `2` (`##`)            | The minimum heading level shown in the table of contents. Must not be higher than `toc_max_heading_level`. | Consider creating multiple pages instead.                            |
| `toc_max_heading_level` | `number`  | 3 (`###`)             | The max heading level shown in the table of contents. Must be between `2` and `6`.                         | Consider creating multiple pages instead.                            |
| `unlisted`              | `boolean` | `false`               | Hides the page from the sidebar after being published on `creators.vrchat.com`.                            | Do not unlist pages that readers may find important.                 |
```mdx-code-block
</APITable>
```

- Do not use the [`title`](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs#unlisted) property. Use a Markdown title (`#`) instead.
- Do not use the [`last_update`](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs#last_update) property. It is automatically calculated.

## Admonitions

You can use admonitions to highlight short, important information. Admonitions stand out from the rest of our text.

- Don't overuse admonitions.
- Don't override admonition titles.


```
:::tip

Use this for important recommendations or shortcuts.

:::

:::info

Use this for important limitations or context.

:::

:::warning

Use this important warnings or potential errors.

:::

:::danger

Use this for actions that can lead to irreversible damage. 

:::
```

```mdx-code-block
<BrowserWindow>
```
:::tip

Use this for important recommendations or shortcuts.

:::

:::info

Use this for important limitations or context.

:::

:::warning

Use this for potential errors or how to avoid them.

:::

:::danger

Use this for actions that can lead to irreversible damage. 

:::
```mdx-code-block
</BrowserWindow>
```

## Code blocks

To include UdonSharp code on your page, use three backticks to create a [code block](https://docusaurus.io/docs/markdown-features/code-blocks). This is especially helpful for examples.

````md
```
// This is an example code block.
Debug.Log("Hello, world!");
```
````

```mdx-code-block
<BrowserWindow>
```

```
// This is an example code block.
Debug.Log("Hello, world!");
```

```mdx-code-block
</BrowserWindow>
```

You can make code blocks easier to read by enabling additional options:

````md
```csharp showLineNumbers title="Assets/Example.cs"
// This is an example code block.
Debug.Log("Hello, world!");
```
````

```mdx-code-block
<BrowserWindow>
```
```csharp showLineNumbers title="Assets/Example.cs"
// This is an example code block.
Debug.Log("Hello, world!");
```
```mdx-code-block
</BrowserWindow>
```

- Enable C# [syntax highlighting](https://docusaurus.io/docs/markdown-features/code-blocks#syntax-highlighting) with `csharp` or `cs`.
- Enable [line numbering](https://docusaurus.io/docs/markdown-features/code-blocks#line-numbering) with `showLineNumbers`,
- Show a [file name](https://docusaurus.io/docs/markdown-features/code-blocks#code-title) with `title=""`, if appropriate.

## Code Tabs

You can show an Udon Graph screenshot and UdonSharp code side by side. Readers can choose which language they prefer, and all code tab components synchronize the reader's preference.

Here's an example of how to import and use `Tabs` and `TabItem`:

````md
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="udon-compiler-language">
<TabItem value="graph" label="Udon Graph">

![Three Udon Graph nodes that gets all players.](/img/worlds/graphgetplayers.png)

</TabItem>
<TabItem value="cs" label="UdonSharp">

```cs showLineNumbers
var players = new VRCPlayerApi[VRCPlayerApi.GetPlayerCount()];  
VRCPlayerApi.GetPlayers(players);
```

</TabItem>
</Tabs>
````

```mdx-code-block
<BrowserWindow>
```

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="udon-compiler-language">
<TabItem value="graph" label="Udon Graph">

![A screenshot of the Udon Graph.](/img/worlds/graphgetplayers.png)

</TabItem>
<TabItem value="cs" label="UdonSharp">

```cs showLineNumbers
var players = new VRCPlayerApi[VRCPlayerApi.GetPlayerCount()];  
VRCPlayerApi.GetPlayers(players);
```

</TabItem>
</Tabs>

```mdx-code-block
</BrowserWindow>
```
