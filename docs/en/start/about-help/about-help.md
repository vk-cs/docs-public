# {heading(About the documentation portal)[id=about-help]}

{include(/en/_includes/_translated_by_ai_en.md)}

## {heading(Bookmarks)[id=about-help-marker]}

For quick access to favorite articles, the {var(cloud)} documentation has a special section called **Bookmarks**.

{note:info}Bookmarks are saved separately for each browser.{/note}

{tabs}

{tab(Open the bookmarks section)}
To open the **Bookmarks** section, click the ![Bookmark](../assets/bookmark-icon.svg "inline") icon in the page header.
{/tab}

{tab(Add a bookmark)}
To add a page to bookmarks, click the ![Bookmark](../assets/bookmark-icon.svg "inline") icon next to the title of the desired article or section. On section pages, the bookmark icon is only visible when hovering the pointer over an article card.
{/tab}

{tab(Remove a bookmark)}
To remove a page from bookmarks, click the ![Bookmark](../assets/active-bookmark-icon.svg "inline") icon next to the title of the desired article or section.
{/tab}

{/tabs}

## {heading(Feedback)[id=about-help-feedback]}

### {heading(Article rating)[id=about-help-grade]}

To rate the usefulness of an article, use the icons at the bottom of the page:

* ![ ](../assets/like-icon.svg "inline") — if the article was useful to you.
* ![ ](../assets/dislike-icon.svg "inline") — if you did not find an answer to your question in the documentation. For help or consultation, contact [technical support](/en/contacts).

When you click an icon:

* your feedback on the article will be sent to VK;
* the icon will change color, preserving your rating: ![ ](../assets/color-like-icon.svg "inline");
* a pop-up message with the corresponding text will appear.

### {heading(Suggestions for documentation changes)[id=about-help-suggestion]}

If you notice a typo or an error in the documentation or want to supplement a section, suggest changes directly in the source texts. To do this, click the **Edit on GitHub** button at the bottom of the page.

For more information, see the [repository on GitHub](https://github.com/vk-cs/docs-public/blob/master/README.md).

## {heading(Content formatting)[id=about-help-formatting]}

The {var(cloud)} documentation uses several ways to highlight different types of information.

### {heading(Information inserts)[id=about-help-info]}

Three types of information inserts are used:

{note:info}
A comment with additional information that may be useful.
{/note}

{note:warn}
Information that is important to know before continuing work.
{/note}

{note:err}
Critical information related to security or the risk of data loss.
{/note}

### {heading(Code blocks)[id=about-help-codeblocks]}

Executable commands, configuration files, and program code are displayed in special blocks with syntax highlighting.

To copy the contents of such a block, click the ![Copy](../assets/copy-icon.svg "inline") icon in its header.

```javascript
// пример кода на JavaScript
console.log('Hello World');
```

### {heading(Hidden text)[id=about-help-cut]}

Collapsible text blocks are used for large code blocks and long examples:

{cut(A collapsed block looks like this)}
Example of hidden text.
{/cut}

Click the block to see its contents. Click again if you want to hide the text block.

### {heading(Tabs)[id=about-help-tabs]}

Tabs are used for alternative instructions. For example, commands for terminals of different operating systems.

{tabs}

{tab(First tab)}
This is what the text looks like on the first tab.

Click the second tab to switch to it.
{/tab}

{tab(Second tab)}
This is what the text looks like on the second tab.

Click the first tab to switch to it.
{/tab}

{/tabs}

If the tabs contain steps of an instruction that are performed sequentially, the tabs are numbered.