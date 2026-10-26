# {heading(Connecting to JupyterHub using Visual Studio Code)[id=mlplatform-jupyterhub-htg-vscode]}

{include(/en/_includes/_translated_by_ai_en.md)}

This guide will help you connect to a JupyterHub server in the cloud using VS Code installed on your local workstation. This way, you can use powerful cloud servers that outperform your local laptop to run resource-intensive computations.

You can deploy JupyterHub in the cloud on a VM with multiple GPUs, dozens of cores, and hundreds of gigabytes of RAM.

To get started with JupyterHub via Visual Studio Code on your local computer, follow these steps:

1. Obtain a JupyterHub access token.

    {note:info}

    JupyterHub allows you to create your own tokens for use by third-party applications. These tokens can be used anywhere a Jupyter Notebook access token is required. Visual Studio Code requires this token.

    {/note}

    1. Log in to JupyterHub by entering your username and password.

    1. Go to the Hub Control Panel. You can find this option by selecting **File -> Hub Control Panel**. Then go to the **Token** tab by selecting this item at the top of the menu.

    1. Enter a description for the new token, select the token expiration period, and click «Request new API token».

    1. Copy the generated token and store it in a safe place. You should treat it as the password for your JupyterHub. You can and should revoke the token using the same Hub Control Panel section when you stop using it.

1. Connect VS Code to the JupyterHub instance in the cloud.

    1. Open the command palette in Visual Studio Code (CMD+SHIFT+P on MacOS, CTRL+SHIFT+P on other OSes).

    1. Select «Python: Specify local or remote Jupyter server for connections».

    1. Generate a server URL of the form `https://<your-hub-url>/jh/user/<your-hub-user-name>/?token=<your-token>`.

        Example:

        ```http
        https://ml-platform-3c000000000000.ml.msk.vkcs.cloud/jh/user/admin/?token=000f00bdf7d00fbd0000000c0006ebfd
        ```

        {note:warn}

        Note that your JupyterHub username may be escaped if it contains special characters. You can see the correct username for composing the server URL in the browser address bar after the `/user/` part.

        In our example, it is `admin`:

        ```http
        https://ml-platform-3c000000000000.ml.msk.vkcs.cloud/jh/user/admin/lab
        ```

        {/note}

1. (Optional) Install the [Jupyter Extension](https://devblogs.microsoft.com/python/introducing-the-jupyter-extension-for-vs-code/) extension for VS Code.
1. Verify the created connection.

    Create or open a new Notebook in VS Code. Its Kernel will now run on your cloud JupyterHub.

    You can verify this by running the `!hostname` command, which should return the hostname of your remote JupyterHub server instead of your local hostname.

    You can also try importing libraries that are located on the remote JupyterHub server but not in your local environment.

    {note:info}

    The remote JupyterHub server for the user must already be running when you try to open a Notebook — Visual Studio Code will not start it automatically. If it is stopped, you need to log in to your JupyterHub and start it again. In this case, you do not need a new token.

    {/note}

    {note:warn}

    Keep track of file system access. When you call `open()` (or a helper function that ultimately accesses a file for reading), the file will be read from the home directory of your remote JupyterHub server, not from the current directory of your local system.

    If you add a new file next to the Jupyter notebook locally, it will not automatically become readable in the Jupyter notebook in VS Code.

    {/note}

    {note:warn}

    Installing `pip` or `conda` packages locally will have no effect, since your Python kernel runs on your remote JupyterHub server in the cloud. The required packages can be installed in the environment in JupyterHub in the cloud using `pip` or `conda`.

    {/note}

{note:info}

For more information on connecting to a JupyterHub server, see the [official VS Code documentation](https://code.visualstudio.com/docs/datascience/jupyter-notebooks#_connect-to-a-remote-jupyter-server).

{/note}