# Accessibility

import BrowserWindow from '@site/src/components/BrowserWindow';
import APITable from '@site/src/components/APITable';

You can make your documentation more accessible and inclusive by structuring it well and providing helpful metadata.

This page summarizes some key points from Google's free [Tech Writing for Accessibility](https://developers.google.com/tech-writing/accessibility/self-study) course ([CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)).

## Use simple language

Most users who read VRChat's Creation documentation speak English. But they may not understand complex words or phrases.

- Avoid unfamiliar jargon, US-based slang, pop-cultural references, and complicated linguistic constructions.
- Follow the [style guide](/contribute/style) to improve the clarity of your documentation.

## Create helpful headings

Markdown support different levels of headings. Headings improve the structure of your document and help your readers understand it.

- Every document should use a level-1 heading (`#`) for its title.
- Use other heading levels (`##`, `###`... ) to create sections.
- Don't skip heading levels (i.e., jumping from `##` to `#####`).

## Include informative link text

People who use screen readers often use them to scan a page to hear just the links. Use informative link text to ensure that your audience hears meaningful information, not just "Learn more, learn more, learn more."

- Avoid: [Learn more](/roadmap), [Click here](/roadmap), [This page](/roadmap)
- Better: Learn more about [our roadmap](/roadmap).

## Write helpful alt text

Markdown allows you to provide [alternative text](https://developers.google.com/tech-writing/accessibility/self-study/write-alt-text) for your images. Screen readers narrate alt text for readers who are blind or who have low vision.

Use a short phrase or one or two sentences. Long descriptions interrupt the reading flow for screen reader users.

- Don't include extra words like "Image of" or "Photo of."
- Capitalize the first word and include a final period.
- Use other punctuation as necessary.

For example:

```md
![An avatar with a backpack walks into a blue, holographic world. It's surrounded by floating objects from Unity and Udon.](/img/homepage/ill-overview.png)
```

```mdx-code-block
<BrowserWindow>
```
![An avatar with a backpack walks into a blue, holographic world with floating Unity objects and Udon Graph elements .](/img/homepage/ill-overview.png)
```mdx-code-block
</BrowserWindow>
```

