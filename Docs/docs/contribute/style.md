# Style guide

import BrowserWindow from '@site/src/components/BrowserWindow';
import APITable from '@site/src/components/APITable';

This page explains how to write clear, concise, and friendly documentation. It's a summary of Google's free [Technical Writing](https://developers.google.com/tech-writing/overview) course ([CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)) and recommends how to apply it to VRChat's Creation documentation.

You should read this page before you contribute to VRChat's creation documentation. 

:::info

VRChat's Creation documentation predates this style guide. If you want to suggest improvements to any page, please submit a [pull request](https://github.com/vrchat-community/creator-docs/pulls).

:::

## Terms and Acronyms

Unity, VRChat, and the VRChat SDK contain [terms](https://developers.google.com/tech-writing/one/words) that your reader may not be familiar with. Identify those terms when writing your documentation. 

- If you are introducing a new term, explain it. If a term already exists, provide a link to the page that explains it.
	- For example: "The 'Marketplace' tab allows you to see all VRChat worlds that use the [Creator Economy](/economy/).
- Try to use terms consistently. Don't switch between similar versions of the same term.
	- For example: "GameObject" and "game object."
- Use **lowercase** for terms that aren't unique to VRChat or the SDK, even if they mean something specific in VRChat.
	- For example: **a**vatar, **w**orld, **c**reator.
- **Capitalize** terms that are specific to VRChat or SDK, even if they include one of the worlds above.
	- For example: **A**vatars SDK, **W**orlds SDK, **V**RChat, **C**reator **E**conomy, **C**reator **E**conomy.

You can use acronyms for terms that are used frequently in your document. When you use an acronym in your document for the first time, you should define it. For example:  

- Software Development Kit (SDK)
- VRChat Creator Companion (VCC)
- Creator Economy (CE)

Don't define acronyms that won't be used often - use the full term instead.
## Active voice

You should write most of your documentation in the [active voice](https://developers.google.com/tech-writing/one/active-voice), not in the passive voice. The following table shows how active voice can make your sentences clearer to read:

| Passive voice                       | Active Voice               |
| ----------------------------------- | -------------------------- |
| Avatars can be created by anyone.   | Anyone can create avatars. |
| Products are contained in listings. | Listings contain products. |

The active voice also helps you highlight the actor in your sentence. The passive voice sometimes omits the actor:

| Passive voice                                 | Who is the subject? | Active voice                                      |
| --------------------------------------------- | ------------------- | ------------------------------------------------- |
| Wait for your content to be uploaded.         | The SDK             | Wait for **the SDK** to upload your content.      |
| This option must be enabled in the inspector. | You (the reader)    | **You** must enable this option in the inspector. |

## Clear sentences

Use strong verbs and subjects to write [clearer sentences](https://developers.google.com/tech-writing/one/clear-sentences). Strong verbs improve the clarity of your sentences and engage your readers. Avoid weak, imprecise, or generic verbs. For example:

| Weak verb  | Weak verb                                    | Strong verb                              |
| ---------- | -------------------------------------------- | ---------------------------------------- |
| **Be**     | **Be** careful not to exceed...              | **Ensure** that you don't exceed...      |
| **Occur**  | The issue **occurs** when upgrading the SDK. | Upgrading the SDK **causes** this issue. |
| **Happen** | Avatar performance issues **happen** if...   | Avatars **reduce** performance if...     |

Forms of "be" (is, are, was, were... ) are sometimes the best choice. You don't need to always replace them - but take the time to consider alternatives.

Sentences that start with "There is" combine a weak subject ("There") with a weak verb ("is"). Improve your sentences by replacing "There is" with strong subjects and verbs:

| Sentence with there is / are                                             | Sentence with strong verb and subject                       |
| ------------------------------------------------------------------------ | ----------------------------------------------------------- |
| There is an auto-layout option that arranges your windows automatically. | The auto-layout option arranges your windows automatically. |
| There are many ways to detect the VRChat SDK.                            | You can detect the VRChat SDK in many ways.                 |
| There is no guarantee the master player will respond.                    | The master player may not respond.                          |

## Short sentences

[Short sentences](https://developers.google.com/tech-writing/one/short-sentences) are usually easier to read, understand, and maintain than long sentences.

- Focus each sentence on a single idea. If your sentence contains multiple thoughts, separate it into multiple sentences.
- When you use the conjunction "or" in a long sentence, consider turning it into a bulleted list.
- Replace extraneous phrases with concise words. For example, replace "at this point in time" with "now." 

## Lists and tables

[Lists and tables](https://developers.google.com/tech-writing/one/lists-and-tables) can make your documentation easier to understand. 

- Introduce each list and table with a sentence. Tell readers what it represents.
- Capitalize the first letter of each item. If you use sentences, punctuate them.
- Items should "belong" with each other or be in a similar category.


The following list explains how to choose which type of list you should use:

| Type of list      | Example                                                            | Description                                                                                                                                                |
| ----------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Bulleted list** | <ul><li>Avatars</li><li>Worlds</li></ul>                           | Use bulleted lists for unordered items. Changing the order does not change the meaning of the list.                                                        |
| **Numbered list** | <ul><li>1. Download the SDK.</li><li>2. Install the SDK.</li></ul> | Use numbered lists for ordered items. Changing the order changes the meaning of the list.<br/>Start each item with an imperative verb, such as "download." |


:::warning

Markdown syntax does not support line breaks or lists inside tables. You can use HTML tags like `<br/>`, `<ul>`, and `<li>` instead, but this usually affects the table's formatting.

:::

## Paragraphs

[Paragraphs](https://developers.google.com/tech-writing/one/paragraphs) help the reader by breaking up complex ideas into smaller topics. Here's how to structure good paragraphs:

- Write a great opening sentence. It should establish what the paragraph is about.
- Focus each paragraph on a single topic. Move or remove sentences that don't relate to the current topic.
- Avoid very long paragraphs. Walls of text intimidate readers.
- Avoid very short paragraphs. Combine them or turn them into lists.

## Audience

When you write documentation, consider who your [audience](https://developers.google.com/tech-writing/one/audience) is and what you want them to learn. Here are some assumptions you can almost always make:

- Your audience has access to VRChat on Steam, Oculus, Pico, Android, or iOS. 
- Your audience knows about basic VRChat concepts such as players, avatars, worlds, friends, and virtual reality.
- Your audience speaks English but might not be native speakers.
- Your audience knows how to create a VRChat world or avatar Unity project with the Creator Companion.

VRChat's Creation documentation has a wide audience. Some pages are meant for beginners who need introductory guides. Other pages are for experts who are already familiar with the basics. If your audience already knows something, you don't need to repeat it. For example: 

- The audience of [Getting Started](/sdk/) wants to create something with the SDK.
	- You want to teach them how to use the Creator Companion to create a simple Unity project with the VRChat SDK.
	- You don't need to explain what VRChat is.
- The audience of [Avatar Scaling](/avatars/avatar-scaling) knows how to use the Avatars SDK.
	- You want to give them a detailed explanation about the limitations of avatar scaling.
	- You don't need to explain how to get started with the VRChat Avatars SDK.
