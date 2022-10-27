`client-keystone-auth` is required to pass the Single Sign-On (SSO) procedure when connecting to the cluster.

<tabs>
<tablist>
<tab>Windows</tab>
<tab>Linux/Mac</tab>
</tablist>
<tabpanel>

1. Run the command in PowerShell:

```bash
iex(New-Object System.Net.WebClient).DownloadString('https://hub.mcs.mail.ru/repository/client-keystone-auth/latest/windows/client-install.ps1')
```

2. Add the path to `client-keystone-auth` to your environment variables:

```bash
Add client-keystone-auth installation dir to your PATH? [Y/n]
```

3. Enter "Y". After that, the installation will be completed.

</tabpanel>
<tabpanel>

1. Run the command in the terminal:

```bash
curl -sSL https://hub.mcs.mail.ru/repository/client-keystone-auth/latest/linux/client-install.sh | bash
```

2. The script will install `client-keystone-auth` and automatically add the path to it to the environment variables.

<warn>

If you are using a shell other than Bash and Zsh, you will need to add the path to `client-keystone-auth` to your environment variables yourself.

</warn>

3. Restart the command shell.

In case of problems, contact technical support.

</tabpanel>
</tabs>
