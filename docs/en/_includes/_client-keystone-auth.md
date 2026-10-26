{tabs}

{tab(Linux (bash))}

1. Install the `zip` and `unzip` packages if they are not already installed:

   ```console
   sudo apt install zip unzip
   ```

1. Run the command in the terminal:

   ```console
   curl -sSL \
     https://hub.mcs.mail.ru/repository/client-keystone-auth/latest/linux/client-install.sh \
   | bash
   ```

   Installation of the `keystone-auth` utility will begin.

1. If you use a shell other than `bash`, add the path to the utility to the `PATH` environment variable.

1. Restart the shell or run the `source` command.

   A hint with the required commands will be displayed once the installation is complete.

{/tab}

{tab(macOS (zsh))}

1. Run the command in the terminal:

   ```console
   curl -sSL \
     https://hub.mcs.mail.ru/repository/client-keystone-auth/latest/linux/client-install.sh \
   | bash
   ```

   Installation of the `keystone-auth` utility will begin.

1. If you use a shell other than `zsh`, add the path to the utility to the `PATH` environment variable.

1. Restart the shell or run the `source` command.

   A hint with the required commands will be displayed once the installation is complete.

{/tab}

{tab(Windows (PowerShell))}

1. Run the command in PowerShell:

   ```console
   iex (New-Object System.Net.WebClient).DownloadString( `
   'https://hub.mcs.mail.ru/repository/client-keystone-auth/latest/windows/client-install.ps1' `
   )

   ```

   Installation of the `keystone-auth` utility will begin.

1. Confirm adding the utility's directory to the `PATH` environment variable by entering `Y` in response to the prompt:

   ```text
   Add client-keystone-auth installation dir to your PATH? [Y/n]
   ```

{/tab}

{/tabs}