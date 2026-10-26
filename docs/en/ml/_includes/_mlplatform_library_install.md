To install the Cloud ML Platform library for Python:

1. Prepare an environment for working with Python in any convenient way:

   {tabs}

   {tab(Using VK Cloud)}

   [Create a JupyterHub instance](/en/ml/mlplatform/jupyterhub/instructions/create) in a VK Cloud project. It already contains configured Python 3.x and pip, which you can use from the JupyterHub notebook.

   {/tab}

   {tab(On your own)}

   1. Install Python 3.9 or higher and pip.
   1. If necessary, set up a virtual environment for Python.

   For example, you can use [conda](https://conda.io/projects/conda/en/latest/index.html) or perform these steps manually.

   {/tab}

   {/tabs}

1. Install the library:

   {tabs}

   {tab(JupyterHub)}

   1. [Connect to the JupyterHub instance](/en/ml/mlplatform/jupyterhub/instructions/connect).
   1. In the JupyterHub notebook, create and run a cell with the following content:

      ```console
      %pip install https://mlplatform.hb.ru-msk.vkcloud-storage.ru/mlplatform_client.tar.gz
      ```

   {/tab}

   {tab(pip)}

   Run the command:

   ```console
   pip install https://mlplatform.hb.ru-msk.vkcloud-storage.ru/mlplatform_client.tar.gz
   ```

   {/tab}

   {/tabs}

   The link above provides the current version of the library.
