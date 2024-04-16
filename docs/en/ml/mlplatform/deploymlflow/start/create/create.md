The MLflow Deploy service provides the ability to automatically package ML models into Docker containers and make them available via REST API to solve real-time maintenance problems.

The service is integrated with Cloud ML Platform components: JupyterHub and MLflow.

Creating MLflow Deploy instances is available both through your VK Cloud personal account and through [MLflow Client](../../manage/manage-mlflow-client/).

## Before starting

1. [Create](../../../jupyterhub/start/create/) a JupyterHub instance.
2. [Create](../../../mlflow/start/create/) an MLflow instance.

## Основные шаги

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
2. Перейдите в раздел **ML Platform**.
3. В блоке **Инстанс MLflow Deploy** нажмите кнопку **Создать инстанс**.
4. Настройте конфигурацию инстанса:

| Параметр               | Описание                                                               |
| ---                    | ---                                                                    |
| Имя инстанса           | Отображаемое имя инстанса. Также задает `hostname` в ОС                |
| Категория виртуальной машины | Категории предустановленных конфигураций ВМ. Подробнее в [обзоре сервиса Cloud Servers](/ru/base/iaas/concepts/vm-concept#shablony_konfiguraciy) |
| Тип виртуальной машины | Предустановленная конфигурация ВМ (CPU и RAM)                          |
| Зона доступности       | Выбор датацентра, где будет запущен инстанс                            |
| Размер диска           | Задает размер диска ВМ в ГБ                                            |
| Тип диска              | Тип создаваемого диска инстанса                                        |
| Инстанс MLflow         | Выбор инстанса MLflow к которому будет подключен инстанс MLflow Deploy |

5. Нажмите кнопку **Следующий шаг**.
6. Настройте сеть:

| Параметр                | Описание                                                                                           |
| ---                     | ---                                                                                                |
| Сеть                    | Выберите существующую приватную сеть или создайте новую.                                           |
| Ключ виртуальной машины | Используется для расшифровки пароля администратора. Выберите существующий ключ или создайте новый  |

   <info>

   Инстанс MLflow Deploy должен быть создан в сети, в которой находятся JupyterHub и MLflow.

   </info>

7. Нажмите кнопку **Создать инстанс**.

## Creating an instance

1. [Open](https://msk.cloud.vk.com/app/) your VK Cloud personal account.
2. Open the **ML Platform** section.
3. In the **MLflow Deploy Instance** block, click the **Create Instance** button.
4. Set up the instance configuration:

   - **Instance name**: a name of the instance. Also sets `hostname` in OS.
   - **Virtual machine category**: a category of preinstalled VM configurations. More details in [review of the Cloud Servers service](/en/base/iaas/concepts/vm-concept#flavors).
   - **Virtual machine type**: pre-installed VM configuration (CPU and RAM).
   - **Availability zone**: a data center where the instance will be launched.
   - **Disk size**: the VM disk size in GB.
   - **Disk type**: a type of instance disk to be created.
   - **MLflow instance**: select the MLflow instance which will be connected with the MLflow Deploy instance.

5. Click the **Next Step** button.
6. Set up the network:

   - **Network**: select an existing network or create a new one.
   - **Virtual machine key**: decrypts the administrator password. Select an existing key or create a new one.

    <info>

    The MLflow Deploy instance must be created on the network that hosts JupyterHub and MLflow.

    </info>

7. Click the **Create Instance** button.
