# {heading(Step-by-step instructions for the user)[id=desktops-user-instructions]}

{include(/en/_includes/_translated_by_ai_en.md)}

These instructions will help you connect to a virtual desktop and start working with it. Before you begin, install the application required for connection on your computer — Cloud Desktop Client.

## {heading(Installing the Cloud Desktop Client application)[id=desktops-install-client]}

{tabs}
{tab(Windows)}

1. {ifdef(public)}Download the installation file [cloud-desktop-setup.exe](https://hub.mcs.mail.ru/repository/client-agent-remoteclick/client/release/win/cloud-desktop-setup.exe){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf)}Request the installation file `cloud-desktop-setup.exe` from the Cloud Desktop administrator{/ifdef}.
1. Run the file and wait for the Cloud Desktop Client application to be installed.

   {note:warn}
   Administrator rights are required to install Cloud Desktop Client.
   {/note}

1. Restart your computer.

{/tab}
{tab(macOS)}

1. {ifdef(public)}Download the installation file [cloud-desktop-setup.dmg](https://hub.mcs.mail.ru/repository/client-agent-remoteclick/client/release/mac/cloud-desktop-setup.dmg){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf)}Request the installation file `cloud-desktop-setup.dmg` from the Cloud Desktop administrator{/ifdef}.
1. Run the file.
1. Move the application to the **Applications** folder.

{note:warn}
When you run the application for the first time, a warning will appear stating that it was downloaded from the internet. Ignore the warning and agree to open the application.
{/note}

{/tab}
{tab(РЕД ОС)}

1. {ifdef(public)}Download the installation file [cloud-desktop-setup.rpm](https://hub.mcs.mail.ru/repository/client-agent-remoteclick/client/release/redos/cloud-desktop-setup.rpm){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf)}Request the installation file `cloud-desktop-setup.rpm` from the Cloud Desktop administrator{/ifdef}.
1. Run the file and wait for the Cloud Desktop Client application to be installed.

   {note:warn}
   Administrator rights are required to install Cloud Desktop Client.
   {/note}

1. Restart your computer.

{/tab}
{/tabs}

## {heading(Connecting to the Cloud Desktop server and to the desktop)[id=desktops-client-connect]}

1. Get the information required to connect to the desktop from the Cloud Desktop administrator:

   - The name and IP address of the Cloud Desktop server.
   - The port for connecting to the server. Port `5031` is usually used.
   - Whether two-factor authentication is required to connect to the server and, if so, how to configure the second authorization factor.
   - The names of the desktop pool and the desktop assigned to you.
   - The login and password for the desktop. They usually match the login and password used for authentication in your organization.
   - {linkto(../../../computing/cloud-desktops/concepts/about#desktops-about-pool)[text=The type of the desktop pool]}: session-based or personalized.

   {note:info}
   Any changes to the settings and contents of a session-based desktop will be lost after you {linkto(#desktops-end-of-work)[text=finish working]} with it.

   A personalized desktop can be configured, data can be stored on it, and applications can be installed. All changes will be preserved from one connection to another, just like on a regular computer.
   {/note}

1. {linkto(#desktops-install-client)[text=Install]} and run the Cloud Desktop Client application.
1. Click the ![](../../../assets/settings-icon.svg "inline") icon.
1. In the window that opens, select the **Use HTTPS** and **Ignore certificates** options and click the **Apply** button.
1. Click the **Add server** button and in the **Server connection settings** window specify the parameters:

   - The name of the Cloud Desktop server.
   - The IP address of the Cloud Desktop server.
   - The port for connecting to the server.
   - The login and password for connecting to the server. They match the login and password used for authentication in your organization.

1. Click the **Apply** button.

   {note:info}
   On subsequent launches of Cloud Desktop Client, the added server will be immediately available for connection.
   {/note}

1. Select the server and click **Connect**.

   If two-factor authentication is configured for the Cloud Desktop service, perform one of the following actions:

   {ifdef(public)} 
   - When connecting to the server for the first time, configure the second authorization factor. The specific scenario depends on the two-factor authorization provider. For example, you may need to scan a QR code using the Google Authenticator app and then enter the code from the app in the field on the web page.
   - When reconnecting to the server, enter the second authorization factor.
   {/ifdef}

   The list of available desktop pools will open.

1. Select the desired pool and the desired desktop and click the **Connect** button.

   The virtual desktop will open in a separate window.

1. If the OS settings provide for a **Security screen**, click the ![](../../../assets/command-icon.svg "inline") icon and select the **Security screen** option. On the security screen that opens, press the CTRL+ALT+DEL key combination.
1. Enter the login and password for the desktop.

## {heading(Creating a shortcut for quick access to the desktop)[id=desktops-shortcut]}

{tabs}
{tab(Windows)}

1. {linkto(#desktops-install-client)[text=Install]} and run the Cloud Desktop Client application.
1. Select the desired server and click **Connect**.

   The list of available desktop pools will open.

1. Click ![](../../../assets/more-icon.svg "inline") for the desired virtual desktop and select the **Add to desktop** option.

A shortcut for quickly connecting to the selected virtual desktop without launching Cloud Desktop Client will appear on your desktop. 

{/tab}
{/tabs}

## {heading(Switching between full-screen and windowed modes)[id=desktops-change-display-mode]}

By default, the desktop opens in full-screen mode when you connect to it. If needed, you can switch to windowed mode and back:

- To exit full-screen mode, click the **Collapse to window** icon in the menu at the top edge of the screen or press ALT+ENTER.
- To return to full-screen mode, click the standard **Maximize** icon in the upper right corner of the window or press ALT+ENTER.
- To move the cursor outside the desktop window, press CTRL+ALT.

## {heading(Configuring the use of Windows hotkeys)[id=desktops-change-hotkey-mode]}

1. Click the ![Command](../../../assets/command-icon.svg "inline") icon in the menu at the top edge of the screen or the desktop window.
1. Select the desired mode in the **Use Windows key combinations** list:

   - `On this computer`: hotkeys work only on the local computer.
   - `On the remote computer`: hotkeys work only on the virtual desktop.
   - `Only in full-screen mode`: in windowed mode, hotkeys work only on the local computer; in full-screen mode, they work only on the virtual desktop.

## {heading(Enabling the office video streaming mode)[id=desktops-enable-office-mode]}

The office mode {linkto(../../../computing/cloud-desktops/concepts/work-modes#desktops-office-mode)[text=improves image quality]} in cases where a high screen refresh rate is not required, for example, when working with office applications.

To enable the office mode:

1. Click the ![](../../../assets/settings-icon.svg "inline") icon in the menu at the top edge of the screen or the desktop window.
1. In the **Video streaming mode** list, select the `Office` option.

## {heading(Connecting peripheral devices)[id=desktops-client-connect-peripherals]}

To connect {linkto(../../../computing/cloud-desktops/concepts/work-modes#desktops-peripherals)[text=available]} peripheral devices to the desktop:

1. Click the desired icon in the menu at the top edge of the screen or the desktop window, for example, the printer icon.

   A list of peripheral devices of the selected type will open, for example, a list of available printers.

1. Select the desired devices in the list using checkboxes.
1. Similarly, select peripheral devices of other types, such as local computer folders or USB devices.

   All selected devices will become available on the virtual desktop.

## {heading(Disconnecting from the desktop)[id=desktops-end-of-work]}

Disconnect from the desktop in one of the following ways:

- Log out of the desktop guest OS in the standard way.
- Close the Cloud Desktop Client application.

  A session-based desktop will be deleted, while a personalized one will be locked until the next connection.

## {heading(Disconnecting from the Cloud Desktop server)[id=desktops-client-disconnect]}

1. Click the ![](../../../assets/exit-icon.svg "inline") icon in the menu at the top edge of the screen or the desktop window.
1. In the **End session** window, click the **End** button.

{note:warn}
Desktops from which you have not {linkto(#desktops-end-of-work)[text=disconnected]} will remain on and continue to consume computing resources.
{/note}