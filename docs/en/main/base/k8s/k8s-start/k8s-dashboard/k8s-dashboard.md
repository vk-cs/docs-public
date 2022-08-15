## Description

Kubernetes Dashboard is a universal web interface for Kubernetes clusters. It allows users to manage and troubleshoot applications running in the cluster, as well as manage the cluster itself.

## Connection

<tabs>
<tablist>
<tab>kubectl version >v1.23</tab>
<tab>kubectl version v1.23+</tab>
</tablist>
<tabpanel>

1. Get a Secret to access the Kubernetes Dashboard cluster in one of the following ways:

    1. Using the VK CS interface: navigate to the cluster, select "Get Secret to log in to Kubernetes dashboard" in the menu.
    1. Using kubectl: execute the command and copy its output.

        ```bash
        kubectl get secret $(kubectl get sa dashboard-sa -o jsonpath='{.secrets[0].name}') -o jsonpath='{.data.token}' | base64 --decode
        ```

2. Launch kubectl proxy:

    ```bash
    kubectl proxy
    ```

3. Open the browser and go to [link](http://localhost:8001/api/v1/namespaces/kube-system/services/https:kubernetes-dashboard:/proxy/).

    The Kubernetes Dashboard web interface will load.

4. You will be prompted to log in. Select the "Token" option.
5. Insert the token received in step 1 and click "Sign In".

    Kubernetes Dashboard opens with superadmin rights.

</tabpanel>
<tabpanel>

To connect to the Kubernetes Dashboard cluster using kubectl version v.1.23 and higher, you need to install the client-keystone-auth utility.

#### Installation instructions for client-keystone-auth

### Windows

1. Run the command in PowerShell:

```bash
iex (New-Object System.Net.WebClient).DownloadString('https://hub.mcs.mail.ru/repository/client-keystone-auth/latest/windows/client-install.ps1')
```

2. During the installation process, you will be prompted to add the path to **client-keystone-auth** to the environment variables:

```bash
Add client-keystone-auth installation dir to your PATH? [Y/n]
```

3. Enter **Y**. After that, the installation will be completed.

### Linux / MacOS

1. Run the command:

```bash
curl -sSL https://hub.mcs.mail.ru/repository/client-keystone-auth/latest/linux/client-install.sh | bash
```

2. The script will install **client-keystone-auth** and automatically add the path to it to the environment variables.

<note>

If you are using a command shell other than Bash and Zsh, then you will have to add the path to **client-keystone-auth** to the environment variables yourself.

</note>

3. Restart the command shell.

In case of problems, contact technical support.

</tabpanel>
</tabs>
