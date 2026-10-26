# {heading(Problem with resource display in the management console)[id=tools-account-troubleshooting-get-har-logs]}

{include(/en/_includes/_translated_by_ai_en.md)}

In rare cases, the infrastructure in the {var(cloud)} management console may be displayed incorrectly.

This can be caused by a number of reasons, ranging from a temporary page rendering glitch to global failures in the service or partner operations.

### Solution

1. Refresh the page by pressing CTRL+F5 (for macOS SHIFT+⌘+R).
1. If the error persists, record the browser's network request logs (a file in HAR format):

    {tabs}

    {tab(Google Chrome)}

    1. Go to the {var(cloud)} management console page where the issue occurs.
    1. Click ![ ](../assets/menu.svg "inline") in the upper right corner and select **More tools** → **Developer tools**, or press CTRL+SHIFT+I (for macOS ⌥+⌘+I).
    1. In the opened panel, select the **Network** tab.
    1. Make sure network logging is enabled: the record button should be red. If it is gray or black, click it or press CTRL+E (for macOS ⌘+E) to start recording.
    1. Enable the **Preserve log** option.
    1. Click ![ ](../assets/clear.svg "inline") **Clear network log** or press CTRL+L (for macOS ⌘+K) to clear all existing logs on the **Network** tab. 
    1. Refresh the page and reproduce the sequence of actions that caused the issue.
    1. Click ![ ](../assets/export.svg "inline") **Export HAR (sanitized)...** in the panel and save the file in HAR format.

    {/tab}

    {tab(Yandex Browser)}

    1. Go to the {var(cloud)} management console page where the issue occurs.
    1. Click ![ ](../assets/menu_outline.svg "inline") in the upper right corner and select **Advanced** → **Developer tools**, or press CTRL+SHIFT+I (for macOS ⌥+⌘+I).
    1. In the opened panel, select the **Network** tab.
    1. Make sure network logging is enabled: the record button should be red. If it is gray or black, click it or press CTRL+E (for macOS ⌘+E) to start recording.
    1. Enable the **Preserve log** option.
    1. Click ![ ](../assets/clear.svg "inline") **Clear network log** or press CTRL+L (for macOS ⌘+K) to clear all existing logs on the **Network** tab.
    1. Refresh the page and reproduce the sequence of actions that caused the issue.
    1. Click ![ ](../assets/export.svg "inline") **Export HAR (sanitized)...** in the panel and save the file in HAR format.

    {/tab}

    {tab(Firefox)}

    1. Go to the {var(cloud)} management console page where the issue occurs.
    1. Click ![ ](../assets/menu_outline.svg "inline") in the upper right corner and select **More tools** → **Web Developer Tools**, or press CTRL+SHIFT+I (for macOS ⌥+⌘+I).
    1. In the opened panel, select the **Network** tab.
    1. Refresh the page and reproduce the sequence of actions that caused the issue.
    1. Right-click on the table, select **Save All As HAR** and save the file in HAR format.

    {/tab}

    {tab(Safari)}

    1. Go to the {var(cloud)} management console page where the issue occurs.
    1. In the browser menu, select **Develop** → **Show Web Inspector** or press ⌥+⌘+I.
   
       {note:info}
       
       If there is no **Develop** item in the browser menu, go to **Safari** → **Settings** → **Advanced** and select the **Show features for web developers** option. 
       
       {/note}

    1. In the opened panel, select the **Network** tab.
    1. Click the ![ ](../assets/filter.svg "inline") icon and select **Preserve log**.
    1. Refresh the page and reproduce the sequence of actions that caused the issue.
    1. Click **Export** in the panel and save the file in HAR format.

    {/tab}

    {/tabs}

1. Submit a request to [technical support](/en/contacts) and attach the saved log file to it.