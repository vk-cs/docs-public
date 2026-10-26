# {heading(Connecting to a Bare Metal server via the VNC console)[id=bare-metal-console]}

{include(/en/_includes/_translated_by_ai_en.md)}

The VNC console is a way to connect to a server directly from a browser. Use the VNC console if:

- the server has no external IP address or is not connected to the internet;
- connecting to the server via SSH does not work.

Access to the VNC console is always available, which allows you to check the server state at any time. For example, during OS boot.

Peculiarities of working with the VNC console:

- only Latin characters can be used for text input;
- the clipboard is unavailable in the VNC console; you cannot copy or paste text.

## {heading(Connecting to the console)[id=bare-metal-connect-console]}

{tabs}

{tab(Personal account)}

1. [Go to](https://msk.cloud.vk.ru/app/) the management console of {var(cloud)}.
1. Go to the **Cloud Computing** → **Bare Metal** section.
1. In the list of virtual machines, click the name of the desired server.
1. On the server page, go to the **Console** tab.

{/tab}

{/tabs}