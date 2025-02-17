Чтобы установить библиотеку Cloud ML Platform для Python:

1. Подготовьте окружение для работы с Python любым удобным способом:

   <tabs>
   <tablist>
   <tab>С помощью VK Cloud</tab>
   <tab>Самостоятельно</tab>
   </tablist>
   <tabpanel>

   [Создайте инстанс JupyterHub](/ru/ml/mlplatform/jupyterhub/service-management/create) в проекте VK Cloud. Он уже содержит настроенные Python 3.x и pip, с которыми можно работать из блокнота JupyterHub (notebook).

   </tabpanel>
   <tabpanel>

   1. Установите Python версии 3.9 или выше и pip.
   1. При необходимости настройте виртуальное окружение (virtual environment) для Python.

   Например, можно воспользоваться [conda](https://conda.io/projects/conda/en/latest/index.html) или выполнить эти шаги вручную.

   </tabpanel>
   </tabs>

1. Установите библиотеку:

   <tabs>
   <tablist>
   <tab>JupyterHub</tab>
   <tab>pip</tab>
   </tablist>
   <tabpanel>

   1. [Подключитесь к инстансу JupyterHub](/ru/ml/mlplatform/jupyterhub/service-management/connect).
   1. В блокноте JupyterHub создайте и выполните ячейку со следующим содержимым:

      ```bash
      %pip install https://mlplatform.hb.ru-msk.vkcloud-storage.ru/mlplatform_client.tar.gz
      ```

   </tabpanel>
   <tabpanel>

   Выполните команду:

   ```bash
   pip install https://mlplatform.hb.ru-msk.vkcloud-storage.ru/mlplatform_client.tar.gz
   ```

   </tabpanel>
   </tabs>

   По приведенной ссылке доступна актуальная версия библиотеки.
