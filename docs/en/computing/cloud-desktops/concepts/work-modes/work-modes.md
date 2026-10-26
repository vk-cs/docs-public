# {heading(Desktop work modes)[id=desktops-work-modes]}

{include(/en/_includes/_translated_by_ai_en.md)}

## {heading(Fullscreen and windowed modes)[id=desktops-display-modes]}

The Cloud Desktop Client application supports fullscreen and windowed modes for displaying the desktop. Depending on the current {linkto(../../../../computing/cloud-desktops/user-instructions#desktops-change-hotkey-mode)[text=settings]}, these modes may differ in how {linkto(#desktops-hotkey-modes)[text=Windows hotkey presses are handled]}.

By default, the desktop opens in fullscreen mode when you connect to it. You can {linkto(../../../../computing/cloud-desktops/user-instructions#desktops-change-display-mode)[text=switch]} from fullscreen mode to windowed mode and back at any time.

## {heading(Windows hotkey handling modes)[id=desktops-hotkey-modes]}

By default, Windows hotkey presses on the keyboard are handled by the OS of the local computer from which you connect to the desktop. You can {linkto(../../../../computing/cloud-desktops/user-instructions#desktops-change-hotkey-mode)[text=change]} the settings so that the local computer's OS forwards hotkey presses to the guest OS of the desktop.

You can forward the following key combinations to the guest OS, for example:

- the WIN key and combinations with it (WIN+R, WIN+X, etc.);
- ALT+TAB;
- ALT+F4 and similar combinations.

The CTRL+ALT+DEL and WIN+L hotkeys are not forwarded to the guest OS and are always handled by the OS of the local computer.

## {heading(Office video streaming mode)[id=desktops-office-mode]}

Office mode is a video streaming mode with a frame rate limit (no more than 33 frames per second). At a reduced frame rate, the amount of Internet traffic between {var(cloud)} and the user's computer is reduced. In conditions of an unstable Internet connection or a narrow data channel, this increases the likelihood of frames being transmitted without delays or losses. When working with office applications and other programs that do not require a high screen refresh rate, office mode is a way to achieve a stable and high-quality "picture".

In addition to reducing Internet traffic, office mode also reduces the load on the CPU of the desktop VM (if the VM has no GPU). Therefore, it is recommended to {linkto(../../../../computing/cloud-desktops/user-instructions#desktops-enable-office-mode)[text=use]} office mode at all times, except when working with programs that display dynamic multimedia content, such as games and simulators.

## {heading(Using peripheral devices)[id=desktops-peripherals]}

Peripheral devices can be {linkto(../../../../computing/cloud-desktops/user-instructions#desktops-client-connect-peripherals)[text=connected]} to the virtual desktop. The types of available devices are specified by the service administrator when {linkto(../../../../computing/cloud-desktops/instructions/desktops-pool/add#desktops-pool-configure-peripherals)[text=creating]} a desktop pool.

For desktops running Windows, macOS, or Linux OS, the following may be available:

- printing from the desktop to any printer available on the local computer;
- exchanging files and folders between the local computer and the desktop;
- a clipboard between the local computer and the desktop;
- USB devices connected to the local computer, including USB tokens and smart cards;
- streaming sound to the desktop from a microphone connected to the local computer.