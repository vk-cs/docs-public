Чтобы установить библиотеку Cloud ML Platform для Python:

1. Подготовьте окружение для работы с Python любым удобным способом:

   {tabs}

   {tab(С помощью VK Cloud)}

   [Создайте инстанс JupyterHub](/ru/ml/mlplatform/jupyterhub/instructions/create) в проекте VK Cloud. Он уже содержит настроенные Python 3.x и pip, с которыми можно работать из блокнота JupyterHub (notebook).

   {/tab}

   {tab(Самостоятельно)}

   1. Установите Python версии 3.9 или выше и pip.
   1. При необходимости настройте виртуальное окружение (virtual environment) для Python.

   Например, можно воспользоваться [conda](https://conda.io/projects/conda/en/latest/index.html) или выполнить эти шаги вручную.

   {/tab}

   {/tabs}

1. Установите библиотеку:

   {tabs}

   {tab(JupyterHub)}

   1. [Подключитесь к инстансу JupyterHub](/ru/ml/mlplatform/jupyterhub/instructions/connect).
   1. В блокноте JupyterHub создайте и выполните ячейку со следующим содержимым:

      ```console
      %pip install https://mlplatform.hb.ru-msk.vkcloud-storage.ru/mlplatform_client.tar.gz
      ```

   {/tab}

   {tab(pip)}

   Выполните команду:

   ```console
   pip install https://mlplatform.hb.ru-msk.vkcloud-storage.ru/mlplatform_client.tar.gz
   ```

   {/tab}

   {/tabs}

   По приведенной ссылке доступна актуальная версия библиотеки.
