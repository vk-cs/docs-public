<tabs>
<tablist>
<tab>Windows (PowerShell)</tab>
<tab>Linux (bash)/macOS (zsh)</tab>
</tablist>
<tabpanel>

1. In PowerShell, run the command:

   ```powershell
   iex (New-Object System.Net.WebClient).DownloadString( `
   'https://hub.mcs.mail.ru/repository/client-keystone-auth/latest/windows/client-install.ps1' `
   )

   ```

   The installation of the `keystone-auth` utility will begin.

1. Confirm adding the directory with the utility to the `PATH` environment variable by entering `Y` in response to the prompt:

   ```text
   Add client-keystone-auth installation dir to your PATH? [Y/n]
   ```

</tabpanel>
<tabpanel>

1. In the terminal, run the command:

   ```bash
   curl -sSL \
     https://hub.mcs.mail.ru/repository/client-keystone-auth/latest/linux/client-install.sh \
   | bash
   ```

   The installation of the `keystone-auth` utility will begin.

1. If you are using a command shell other than `bash` or `zsh`, manually add the path to the utility to the `PATH` environment variable.

1. Restart the command shell or run the `source` command.

   A prompt with the necessary commands will be displayed upon completion of the installation.

</tabpanel>
</tabs>