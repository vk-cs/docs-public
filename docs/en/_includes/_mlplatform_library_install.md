To install the Cloud ML Platform library for Python:

1. Prepare the environment for Python in any way you like:

   <tabs>
   <tablist>
   <tab>With VK Cloud</tab>
   <tab>On your own</tab>
   </tablist>
   <tabpanel>

   [Create a JupyterHub instance](/en/ml/mlplatform/jupyterhub/service-management/create) in the VK Cloud project. It already contains configured Python 3.x and pip, which you can work with from the JupyterHub notebook.

   </tabpanel>
   <tabpanel>

   1. Install Python version 3.9 or higher and pip.
   1. If necessary, set up a virtual environment for Python. 

   For example, you can use [conda](https://conda.io/projects/conda/en/latest/index.html) or perform these steps manually.

   </tabpanel>
   </tabs>

1. Install the library:

   <tabs>
   <tablist>
   <tab>JupyterHub</tab>
   <tab>Pip</tab>
   </tablist>
   <tabpanel>

   1. [Connect to the JupyterHub instance](/en/ml/mlplatform/jupyterhub/service-management/connect).
   1. In JupyterHub notepad, create and execute a cell with the following contents:

      ```bash
      %pip install https://mlplatform.hb.ru-msk.vkcloud-storage.ru/mlplatform_client.tar.gz
      ```

   </tabpanel>
   <tabpanel>

   Run the command:

   ```bash
   pip install https://mlplatform.hb.ru-msk.vkcloud-storage.ru/mlplatform_client.tar.gz
   ```

   </tabpanel>
   </tabs>

    An up-to-date version of the library is available at the link provided. 
