Эти методы позволяют выполнять следующие операции:

- Получать информацию, необходимую для создания инстансов JupyterHub, MLflow и MLflow Deploy.
- Создавать инстансы JupyterHub, MLflow и MLflow Deploy и управлять ими.
- Развертывать на инстансах MLflow Deploy ML-модели и проверять их работоспособность.
- Получать предсказания ML-моделей.

## get_flavors

Получить список всех [шаблонов конфигурации ВМ](/ru/computing/iaas/concepts/about#flavors), доступных для создания инстансов JupyterHub, MLflow, MLflow Deploy.

Необходимая роль токена: `Администратор`. [Подробнее о ролях токенов](../lib-authz).

### Аргументы метода

Аргументов нет.

### Возвращаемое значение

Список доступных шаблонов конфигурации ВМ. Каждый элемент списка содержит следующую информацию:

- ID шаблона;
- имя шаблона;
- объем оперативной памяти;
- количество ядер CPU;
- дополнительные спецификации.

### Сигнатура метода и пример использования

<details>
<summary>Сигнатура метода</summary>

```python
get_flavors(**kwargs
           ) -> List[mlplatform_client.serializers.nova.NovaFlavor]
```

</details>

<details>
<summary>Пример использования метода</summary>

<err>

Для простоты значение токена доступа указано в примере скрипта Python.

При работе в production-среде не оперируйте токенами в открытом виде. Используйте переменные среды окружения, хранилища секретов или другие инструменты для работы с чувствительными данными. [Подробнее про токены](../lib-authz).

</err>

1. [Установите библиотеку](../lib-install), если это еще не сделано.
1. [Создайте токен доступа](../lib-authz) с ролью `Администратор`, если это еще не сделано.
1. Выполните скрипт Python:

   ```python
   from mlplatform_client import MLPlatform

   # Авторизоваться в библиотеке по токену доступа
   REFRESH_TOKEN = '<значение токена доступа>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   # Получить и вывести на экран список всех шаблонов конфигурации
   flavors = mlp.get_flavors()
   print(flavors)
   ```

   В случае успеха будет выведена информация обо всех шаблонах конфигурации, доступных для создания инстансов JupyterHub, MLflow, MLflow Deploy. Пример части вывода:

   ```txt
    [
    ---------------
    Flavor Info:
    ---------------
    id: 00bbf595-XXXX
    name: STD2-16-32
    ram: 32768
    vcpus: 16
    extra_specs: 
        cpu_sockets: 2
        cpu_type: standard
        agg_gpu: None
        filter_gpu: None
        availability_zone: None
        gpu_info: , 
    ---------------
    Flavor Info:
    ---------------
    id: 04db9642-XXXX
    name: STD2-6-24
    ram: 24576
    vcpus: 6
    extra_specs: 
        cpu_sockets: 1
        cpu_type: standard
        agg_gpu: None
        filter_gpu: None
        availability_zone: None
        gpu_info: , 
    # конец фрагмента
   ```

</details>

## get_internal_networks

Получить список всех [стандартных сетей](/ru/networks/vnet/concepts/net-types#standartnaya_set), доступных в проекте.

Необходимая роль токена: `Администратор`. [Подробнее о ролях токенов](../lib-authz).

### Аргументы метода

Аргументов нет.

### Возвращаемое значение

Список стандартных сетей проекта. Каждый элемент списка содержит ID, имя, [SDN](/ru/networks/vnet/concepts/sdn) и другие параметры сети.

### Сигнатура метода и пример использования

<details>
<summary>Сигнатура метода</summary>

```python
get_internal_networks(**kwargs
                     ) -> List[mlplatform_client.serializers.gateway.NetworkOut]
```

</details>

<details>
<summary>Пример использования метода</summary>

<err>

Для простоты значение токена доступа указано в примере скрипта Python.

При работе в production-среде не оперируйте токенами в открытом виде. Используйте переменные среды окружения, хранилища секретов или другие инструменты для работы с чувствительными данными. [Подробнее про токены](../lib-authz).

</err>

1. [Установите библиотеку](../lib-install), если это еще не сделано.
1. [Создайте токен доступа](../lib-authz) с ролью `Администратор`, если это еще не сделано.
1. Выполните скрипт Python:

   ```python
   from mlplatform_client import MLPlatform

   # Авторизоваться в библиотеке по токену доступа
   REFRESH_TOKEN = '<значение токена доступа>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   # Получить и вывести на экран список всех стандартных сетей
   networks = mlp.get_internal_networks()
   print(networks)
   ```

   В случае успеха будет выведена информация обо всех доступных стандартных сетях. Пример части вывода:

   ```txt
    [
    ---------------
    Network Info:
    ---------------
    id: 1996dbe9-XXXX
    name: first_net
    admin_state_up: True
    created_at: 2024-05-18 14:57:35+00:00
    updated_at: 2024-06-18 12:58:47+00:00
    sdn: neutron
    external: False, 
    ---------------
    Network Info:
    ---------------
    id: 2a443a80-XXXX
    name: second_net
    admin_state_up: True
    created_at: 2023-12-11 06:59:00+00:00
    updated_at: 2023-12-11 12:32:24+00:00
    sdn: neutron
    external: False, 
    # конец фрагмента
   ```

</details>

## get_external_networks

Получить список всех [внешних сетей](/ru/networks/vnet/concepts/net-types#vneshnyaya_set), доступных в проекте.

Необходимая роль токена: `Администратор`. [Подробнее о ролях токенов](../lib-authz).

### Аргументы метода

Аргументов нет.

### Возвращаемое значение

Список внешних сетей проекта. Каждый элемент списка содержит ID, имя, [SDN](/ru/networks/vnet/concepts/sdn) и другие параметры сети.

### Сигнатура метода и пример использования

<details>
<summary>Сигнатура метода</summary>

```python
get_external_networks(**kwargs
                     ) -> List[mlplatform_client.serializers.gateway.NetworkOut]
```

</details>

<details>
<summary>Пример использования метода</summary>

<err>

Для простоты значение токена доступа указано в примере скрипта Python.

При работе в production-среде не оперируйте токенами в открытом виде. Используйте переменные среды окружения, хранилища секретов или другие инструменты для работы с чувствительными данными. [Подробнее про токены](../lib-authz).

</err>

1. [Установите библиотеку](../lib-install), если это еще не сделано.
1. [Создайте токен доступа](../lib-authz) с ролью `Администратор`, если это еще не сделано.
1. Выполните скрипт Python:

   ```python
   from mlplatform_client import MLPlatform

   # Авторизоваться в библиотеке по токену доступа
   REFRESH_TOKEN = '<значение токена доступа>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   # Получить и вывести на экран список всех внешних сетей
   ext_networks = mlp.get_external_networks()
   print(ext_networks)
   ```

   В случае успеха будет выведена информация обо всех доступных внешних сетях. Пример вывода:

   ```txt
    [
    ---------------
    Network Info:
    ---------------
    id: 298117ae-XXXX
    name: ext-net
    admin_state_up: True
    created_at: 2017-03-27 13:50:05+00:00
    updated_at: 2024-03-29 13:25:58+00:00
    sdn: neutron
    external: True]
   ```

</details>

## create_jupyter_hub

Создать инстанс JupyterHub.

<info>

В рамках Cloud ML Platform инстанс JupyterHub используется для разработки и обучения ML-моделей.

</info>

Необходимая роль токена: `Администратор`. [Подробнее о ролях токенов](../lib-authz).

### Аргументы метода

[cols="1,1,4", options="header", width=100%]
|===
|Аргумент
|Тип
|Описание

|`instance_name`

(обязательный)
|`str`
|Имя инстанса JupyterHub

|`domain_name`

(необязательный)
|`str`
|Доменное имя инстанса. Если не указано, будет создано автоматически.

Требования к доменному имени:

- максимальная длина — 63 символа;
- может содержать только цифры, строчные латинские буквы и спецсимволы `.`, `-`;
- не может начинаться и оканчиваться спецсимволом `-`

|`jh_admin_name`

(обязательный)
|`str`
|Логин администратора инстанса

|`jh_admin_password`

(обязательный)
|`str`
|Пароль администратора инстанса.

Требования к паролю:

- должен состоять как минимум из 8 символов;
- может содержать только цифры, спецсимволы `!`,`#`,`$`,`%`,`&`,`(`,`)`,`*`,`+`,`,`,`.`,`:`,`;`,`<`,`=`,`>`,`?`,`@`,`[`,`]`,`^`,`_`,`{`,<code>&#124;</code>,`}`,`~`,`-`, заглавные и строчные латинские буквы

|`flavor`

(обязательный)
|`str`
|Идентификатор шаблона конфигурации для создания ВМ инстанса.

Список шаблонов конфигурации и их идентификаторов можно получить с помощью метода [get_flavors](#get_flavors)

|`volumes`

(обязательный)
|`List[MLPlatformVolumeIn]`
|Список дисков инстанса.

Каждый диск описывается объектом класса `MLPlatformVolumeIn` с полями:

- `size`: объем диска в ГБ (тип `int`).
- `volume_type`: [тип диска](/ru/computing/iaas/concepts/about#disk_types). Допустимые значения — `VolumeType.ceph_ssd` и `VolumeType.high_iops`.
- `availability_zone`: [зона доступности](/ru/intro/start/concepts/architecture#az). Допустимые значения — `AvailabilityZone.GZ1` и `AvailabilityZone.MS1`.

<warn>

Поддерживаются инстансы JupyterHub только с одним диском.

</warn>

Пример описания диска:

```python
MLPlatformVolumeIn(
    size=50,
    volume_type=VolumeType.ceph_ssd,
    availability_zone=AvailabilityZone.GZ1)
```

|`networks`

(обязательный)
|`MLPlatformNetworkIn`
|Сеть, к которой будет подключен инстанс.

Сеть описывается объектом класса `MLPlatformVolumeIn` с полем `network_id`, содержащим идентификатор сети. Списки стандартных и внешних сетей проекта и их идентификаторов можно получить с помощью методов [get_internal_networks](#get_internal_networks) и [get_external_networks](#get_external_networks).

Пример описания сети:

```python
MLPlatformNetworkIn(network_id="net-12345")
```

|`s3fs_bucket`

(необязательный)
|`str`
|Имя бакета, который будет подключен к инстансу.

Если указано несуществующее имя бакета, будет создан новый бакет с указанным именем.

Требования к имени нового бакета:

- должно быть уникальным для сервиса Cloud Storage в целом (не только в рамках проекта);
- должно содержать от 4 до 63 символов;
- может содержать только цифры, строчные латинские буквы и спецсимволы `.`, `-`;
- должно начинаться и оканчиваться только строчными латинскими буквами или цифрами
|===

### Возвращаемое значение

Объект класса `VmDetailInfo` с информацией о созданном инстансе JupyterHub.

### Сигнатура метода и пример использования

<details>
<summary>Сигнатура метода</summary>

```python
create_jupiter_hub(instance_name: str,
                   domain_name: Optional[str] = None,
                   jh_admin_name: str,
                   jh_admin_password: str,
                   flavor: str, 
                   volumes: List[mlplatform_client.serializers.gateway.MLPlatformVolumeIn],
                   networks: mlplatform_client.serializers.gateway.MLPlatformNetworkIn,
                   s3fs_bucket: Optional[str] = None,
                   **kwargs
                  ) -> mlplatform_client.serializers.gateway.VmDetailInfo
```

</details>

<details>
<summary>Пример использования метода</summary>

<err>

Для простоты значение токена доступа указано в примере скрипта Python.

При работе в production-среде не оперируйте токенами в открытом виде. Используйте переменные среды окружения, хранилища секретов или другие инструменты для работы с чувствительными данными. [Подробнее про токены](../lib-authz).

</err>

1. [Установите библиотеку](../lib-install), если это еще не сделано.
1. [Создайте токен доступа](../lib-authz) с ролью `Администратор`, если это еще не сделано.
1. Выполните скрипт Python:

   ```python
   from mlplatform_client import MLPlatform
   from mlplatform_client.serializers.gateway import MLPlatformVolumeIn, MLPlatformNetworkIn, VolumeType, AvailabilityZone

   # Авторизоваться в библиотеке по токену доступа
   REFRESH_TOKEN = '<значение токена доступа>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   # Получить ID одного из шаблонов конфигурации в списке доступных
   flavors = mlp.get_flavors()
   FLAVOR_ID = flavors[0].id

   # Получить ID одной из стандартных сетей в списке доступных
   networks = mlp.get_internal_networks()
   NETWORK_ID = networks[0].id
   
   # Создать инстанс JupyterHub
   jh = mlp.create_jupyter_hub(
       instance_name="jh-test",
       jh_admin_name="admin",
       jh_admin_password="Admin123@",
       flavor=FLAVOR_ID,
       s3fs_bucket=<имя бакета>,  # Опционально
       volumes=[MLPlatformVolumeIn(
           size=50,
           volume_type=VolumeType.ceph_ssd,
           availability_zone=AvailabilityZone.GZ1,
       )],
       networks=MLPlatformNetworkIn(
           network_id=NETWORK_ID,
       )
    )
    print(jh)

   ```

   В случае успеха будет выведена информация о создаваемом инстансе JupyterHub. Пример вывода:

   ```txt
    ---------------
    Jupyter Hub Detail Info:
    ---------------
    id: 6178700a-XXXX
    name: jh-test
    status: CREATING
    flavor_id: 00bbf595-XXXX
    created_dt: 2024-08-01T09:28:44.221252Z
    public_ip: None
    private_ip: None
    domain_name: None
    status_reason: None
    instance_type: JUPYTERHUB
    mlflow_jh_instance_id: None
    mlflow_deploy_instance_id: None
    jh_admin_name: admin
    availability_zone: GZ1
    volumes: [
    ---------------
        name: None
        size: 50
        volume_type: ceph-ssd
        imageRef: None
        availability_zone: GZ1
        cinder_id: None]
   ```

   Сразу после вызова метода `create_jupyter_hub` инстанс находится в процессе создания, поэтому некоторые параметры не определены, например: доменное имя и IP-адрес.

</details>

## attach_s3_bucket_to_jh

Подключить бакет к инстансу JupyterHub.

<info>

К одному инстансу можно подключить только один бакет.

</info>

Необходимая роль токена: `Администратор`. [Подробнее о ролях токенов](../lib-authz).

### Аргументы метода

[cols="1,1,4", options="header", width=100%]
|===
|Аргумент
|Тип
|Описание

|`jh_id`

(обязательный)
|`str`
|Идентификатор инстанса JupyterHub.

Список всех инстансов Cloud ML Platform и их идентификаторов можно получить с помощью метода [get_all_instances_info](#get_all_instances_info)

|`s3fs_bucket`

(обязательный)
|`str`
|Имя бакета, который будет подключен к инстансу.

Если указано несуществующее имя бакета, будет создан новый бакет с указанным именем.

Требования к имени нового бакета:

- должно быть уникальным для сервиса Cloud Storage в целом (не только в рамках проекта);
- должно содержать от 4 до 63 символов;
- может содержать только цифры, строчные латинские буквы и спецсимволы `.`, `-`;
- должно начинаться и оканчиваться только строчными латинскими буквами или цифрами
|===

### Возвращаемое значение

Возвращаемого значения нет.

### Сигнатура метода и пример использования

<details>
<summary>Сигнатура метода</summary>

```python
attach_s3_bucket_to_jh(
                       jh_id: str,
                       s3fs_bucket: str,
                       **kwargs
                      ) -> None
```

</details>

<details>
<summary>Пример использования метода</summary>

<err>

Для простоты значение токена доступа указано в примере скрипта Python.

При работе в production-среде не оперируйте токенами в открытом виде. Используйте переменные среды окружения, хранилища секретов или другие инструменты для работы с чувствительными данными. [Подробнее про токены](../lib-authz).

</err>

1. [Установите библиотеку](../lib-install), если это еще не сделано.
1. [Создайте токен доступа](../lib-authz) с ролью `Администратор`, если это еще не сделано.
1. Выполните скрипт Python:

   ```python
   from mlplatform_client import MLPlatform

   # Авторизоваться в библиотеке по токену доступа
   REFRESH_TOKEN = '<значение токена доступа>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   # Подключить бакет 
   mlp.attach_s3_bucket_to_jh(jh_id=<ID инстанса JupyterHub>,
                              s3fs_bucket="jh-bucket-1234")
   ```

   Подключенный бакет будет доступен на инстансе JupyterHub с указанным идентификатором как папка `/shared/s3fs`.

</details>

## create_mlflow

Создать инстанс MLflow, подключенный к существующему инстансу JupyterHub.

<info>

В рамках Cloud ML Platform инстанс MLflow используется для хранения ML-моделей и их параметров.

</info>

Необходимая роль токена: `Администратор`. [Подробнее о ролях токенов](../lib-authz).

### Аргументы метода

[cols="1,1,4", options="header", width=100%]
|===
|Аргумент
|Тип
|Описание

|`instance_name`

(обязательный)
|`str`
|Имя инстанса MLflow

|`jh_id`

(обязательный)
|`str`
|Идентификатор существующего инстанса JupyterHub, к которому будет подключен инстанс MLflow.

Список всех инстансов Cloud ML Platform и их идентификаторов можно получить с помощью метода [get_all_instances_info](#get_all_instances_info)

|`domain_name`

(необязательный)
|`str`
|Доменное имя инстанса. Если не указано, будет создано автоматически.

Требования к доменному имени:

- максимальная длина — 63 символа;
- может содержать только цифры, строчные латинские буквы и спецсимволы `.`, `-`;
- не может начинаться и оканчиваться спецсимволом `-`

|`flavor`

(обязательный)
|`str`
|Идентификатор шаблона конфигурации для создания ВМ инстанса.

Список шаблонов конфигурации и их идентификаторов можно получить с помощью метода [get_flavors](#get_flavors)

|`volumes`

(обязательный)
|`List[MLPlatformVolumeIn]`
|Список дисков инстанса.

Каждый диск описывается объектом класса `MLPlatformVolumeIn` с полями:

- `size`: объем диска в ГБ (тип `int`).
- `volume_type`: [тип диска](/ru/computing/iaas/concepts/about#disk_types). Допустимые значения — `VolumeType.ceph_ssd` и `VolumeType.high_iops`.
- `availability_zone`: [зона доступности](/ru/intro/start/concepts/architecture#az). Допустимые значения — `AvailabilityZone.GZ1` и `AvailabilityZone.MS1`.

<warn>

Поддерживаются инстансы MLflow только с одним диском.

</warn>

Пример описания диска:

```python
MLPlatformVolumeIn(
    size=50,
    volume_type=VolumeType.ceph_ssd,
    availability_zone=AvailabilityZone.GZ1)
```

|`networks`

(обязательный)
|`MLPlatformNetworkIn`
|Сеть, к которой будет подключен инстанс. Должна совпадать с сетью инстанса JupyterHub, к которому будет подключен инстанс MLflow.

Сеть описывается объектом класса `MLPlatformVolumeIn` с полем `network_id`, содержащим идентификатор сети. Списки стандартных и внешних сетей проекта и их идентификаторов можно получить с помощью методов [get_internal_networks](#get_internal_networks) и [get_external_networks](#get_external_networks).

Пример описания сети:

```python
MLPlatformNetworkIn(network_id="net-12345")
```
|`is_mlflow_demo_mode`

(обязательный)
|`bool`
|Создание инстанса MLflow в деморежиме:

- `True` — инстанс будет создан в деморежиме. На ВМ инстанса будет создана локальная база данных SQLite.
- `False` — инстанс будет создан в PRO-режиме. В сервисе [Cloud Databases](/ru/dbs/dbaas) будет создана база данных PostgreSQL, доступная на инстансе MLflow.

Значение по умолчанию: `True`.

<warn>

Чтобы сохранить ML-модели и их результаты, рекомендуется использовать деморежим только для ознакомления с функциональностью

</warn>
|===

### Возвращаемое значение

Объект класса `VmDetailInfo` с информацией о созданном инстансе MLflow.

### Сигнатура метода и пример использования

<details>
<summary>Сигнатура метода</summary>

```python
create_mlflow(instance_name: str,
              jh_id: str,
              domain_name: Optional[str] = None,              
              flavor: str,
              volumes: List[mlplatform_client.serializers.gateway.MLPlatformVolumeIn],
              networks: mlplatform_client.serializers.gateway.MLPlatformNetworkIn,
              is_mlflow_demo_mode: bool = True,
              **kwargs
             ) -> mlplatform_client.serializers.gateway.VmDetailInfo
```

</details>

<details>
<summary>Пример использования метода</summary>

<err>

Для простоты значение токена доступа указано в примере скрипта Python.

При работе в production-среде не оперируйте токенами в открытом виде. Используйте переменные среды окружения, хранилища секретов или другие инструменты для работы с чувствительными данными. [Подробнее про токены](../lib-authz).

</err>

1. [Установите библиотеку](../lib-install), если это еще не сделано.
1. [Создайте токен доступа](../lib-authz) с ролью `Администратор`, если это еще не сделано.
1. Выполните скрипт Python:

   ```python
   from mlplatform_client import MLPlatform
   from mlplatform_client.serializers.gateway import MLPlatformVolumeIn, MLPlatformNetworkIn, VolumeType, AvailabilityZone

   # Авторизоваться в библиотеке по токену доступа
   REFRESH_TOKEN = '<значение токена доступа>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   # Получить ID одного из шаблонов конфигурации в списке доступных
   flavors = mlp.get_flavors()
   FLAVOR_ID = flavors[0].id

   # Получить ID одной из стандартных сетей в списке доступных
   networks = mlp.get_internal_networks()
   NETWORK_ID = networks[0].id
   
   # Создать инстанс MLflow
   mlflow = mlp.create_mlflow(
       instance_name="mlflow-test",
       jh_id="6178700a-ХХХХ", # Инстанс JupyterHub уже должен быть создан
       flavor=FLAVOR_ID,
       volumes=[MLPlatformVolumeIn(
           size=30,
           volume_type=VolumeType.ceph_ssd,
           availability_zone=AvailabilityZone.GZ1,
       )],
       networks=MLPlatformNetworkIn(
           network_id=NETWORK_ID,
       ),
       is_mlflow_demo_mode=True
   )
   print(mlflow)
   ```

   В случае успеха будет выведена информация о создаваемом инстансе MLflow. Пример вывода:

   ```txt
    ---------------
    MLflow Detail Info:
    ---------------
    id: f8258286-ХХХХ
    name: mlflow-test
    status: CREATING
    flavor_id: 1b624937-ХХХХ
    created_dt: 2024-08-02T11:02:27.752687Z
    public_ip: None
    private_ip: None
    domain_name: None
    status_reason: None
    instance_type: MLFLOW
    mlflow_jh_instance_id: 6178700a-ХХХХ
    mlflow_deploy_instance_id: None
    jh_admin_name: jh_default_admin
    availability_zone: GZ1
    volumes: [
    ---------------
        name: None
        size: 30
        volume_type: ceph-ssd
        imageRef: None
        availability_zone: GZ1
        cinder_id: None]
   ```

   Сразу после вызова метода `create_mlflow` инстанс находится в процессе создания, поэтому некоторые параметры не определены, например: доменное имя и IP-адрес.

</details>

## create_deploy

Создать инстанс MLflow Deploy, подключенный к существующему инстансу MLflow или [MLflow Standalone](../../concepts/mlflow-modes#standalone).

<info>

В рамках Cloud ML Platform инстанс MLflow Deploy используется для развертывания на нем ML-моделей.

</info>

Необходимая роль токена: `Администратор`. [Подробнее о ролях токенов](../lib-authz).

### Аргументы метода

[cols="1,1,4", options="header", width=100%]
|===
|Аргумент
|Тип
|Описание

|`instance_name`

(обязательный)
|`str`
|Имя инстанса MLflow Deploy

|`mlflow_id`

(обязательный)
|`str`
|Идентификатор существующего инстанса MLflow или [MLflow Standalone](../../concepts/mlflow-modes#standalone), к которому будет подключен инстанс MLflow Deploy.

Список всех инстансов Cloud ML Platform и их идентификаторов можно получить с помощью метода [get_all_instances_info](#get_all_instances_info)

|`username`

(обязательный)
|`str`
|Логин администратора инстанса JupyterHub или [MLflow Standalone](../../concepts/mlflow-modes#standalone)

|`password`

(обязательный)
|`str`
|Пароль администратора инстанса JupyterHub или [MLflow Standalone](../../concepts/mlflow-modes#standalone)

|`domain_name`

(необязательный)
|`str`
|Доменное имя инстанса. Если не указано, будет создано автоматически.

Требования к доменному имени:

- максимальная длина — 63 символа;
- может содержать только цифры, строчные латинские буквы и спецсимволы `.`, `-`;
- не может начинаться и оканчиваться спецсимволом `-`

|`flavor`

(обязательный)
|`str`
|Идентификатор шаблона конфигурации для создания ВМ инстанса.

Список шаблонов конфигурации и их идентификаторов можно получить с помощью метода [get_flavors](#get_flavors)

|`volumes`

(обязательный)
|`List[MLPlatformVolumeIn]`
|Список дисков инстанса.

Каждый диск описывается объектом класса `MLPlatformVolumeIn` с полями:

- `size`: объем диска в ГБ (тип `int`).
- `volume_type`: [тип диска](/ru/computing/iaas/concepts/about#disk_types). Допустимые значения — `VolumeType.ceph_ssd` и `VolumeType.high_iops`.
- `availability_zone`: [зона доступности](/ru/intro/start/concepts/architecture#az). Допустимые значения — `AvailabilityZone.GZ1` и `AvailabilityZone.MS1`.

<warn>

Поддерживаются инстансы MLflow Deploy только с одним диском.

</warn>

Пример описания диска:

```python
MLPlatformVolumeIn(
    size=50,
    volume_type=VolumeType.ceph_ssd,
    availability_zone=AvailabilityZone.GZ1)
```

|`networks`

(обязательный)
|`MLPlatformNetworkIn`
|Сеть, к которой будет подключен инстанс. Должна совпадать с сетью инстанса JupyterHub или [MLflow Standalone](../../concepts/mlflow-modes#standalone), к которому будет подключен инстанс MLflow Deploy.

Сеть описывается объектом класса `MLPlatformVolumeIn` с полем `network_id`, содержащим идентификатор сети. Списки стандартных и внешних сетей проекта и их идентификаторов можно получить с помощью методов [get_internal_networks](#get_internal_networks) и [get_external_networks](#get_external_networks).

Пример описания сети:

```python
MLPlatformNetworkIn(network_id="net-12345")
```
|`is_mlflow_demo_mode`

(обязательный)
|`bool`
|Создание инстанса MLflow Deploy в деморежиме:

- `True` — инстанс будет создан в деморежиме.
- `False` — инстанс будет создан в PRO-режиме.

Значение по умолчанию: `True`.

<warn>

Режим работы инстанса MLflow Deploy должен совпадать с режимом работы инстанса MLflow или [MLflow Standalone](../../concepts/mlflow-modes#standalone), к которому он будет подключен.

</warn>
|===

### Возвращаемое значение

Объект класса `VmDetailInfo` с информацией о созданном инстансе MLflow Deploy.

### Сигнатура метода и пример использования

<details>
<summary>Сигнатура метода</summary>

```python
create_deploy(instance_name: str,
              mlflow_id: str, 
              username: str, 
              password: str, 
              domain_name: Optional[str] = None, 
              flavor: str, 
              volumes: List[mlplatform_client.serializers.gateway.MLPlatformVolumeIn], 
              networks: mlplatform_client.serializers.gateway.MLPlatformNetworkIn, 
              is_mlflow_demo_mode: bool = True, 
              **kwargs
              ) -> mlplatform_client.serializers.gateway.VmDetailInfo
```

</details>

<details>
<summary>Пример использования метода</summary>

<err>

Для простоты значение токена доступа указано в примере скрипта Python.

При работе в production-среде не оперируйте токенами в открытом виде. Используйте переменные среды окружения, хранилища секретов или другие инструменты для работы с чувствительными данными. [Подробнее про токены](../lib-authz).

</err>

1. [Установите библиотеку](../lib-install), если это еще не сделано.
1. [Создайте токен доступа](../lib-authz) с ролью `Администратор`, если это еще не сделано.
1. Выполните скрипт Python:

   ```python
   from mlplatform_client import MLPlatform
   from mlplatform_client.serializers.gateway import MLPlatformVolumeIn, MLPlatformNetworkIn, VolumeType, AvailabilityZone

   # Авторизоваться в библиотеке по токену доступа
   REFRESH_TOKEN = '<значение токена доступа>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   # Получить ID одного из шаблонов конфигурации в списке доступных
   flavors = mlp.get_flavors()
   FLAVOR_ID = flavors[0].id

   # Получить ID одной из стандартных сетей в списке доступных
   networks = mlp.get_internal_networks()
   NETWORK_ID = networks[0].id
   
   # Создать инстанс MLflow Deploy
   mlflow_deploy = mlp.create_deploy(
       instance_name="mlflow-deploy-test",
       mlflow_id="f8258286-ХХХХ", # Инстанс MLflow уже должен быть создан
       username="admin",
       password="Admin123@",
       flavor=FLAVOR_ID,
       volumes=[MLPlatformVolumeIn(
           size=30,
           volume_type=VolumeType.ceph_ssd,
           availability_zone=AvailabilityZone.GZ1,
       )],
       networks=MLPlatformNetworkIn(
           network_id=NETWORK_ID,
       ),
       is_mlflow_demo_mode=True
   )
   print(mlflow_deploy)
   ```

   В случае успеха будет выведена информация о создаваемом инстансе MLflow Deploy. Пример вывода:

   ```txt
    ---------------
    MLflow Deploy Detail Info:
    ---------------
    id: b27fdd89-XXXX
    name: mlflow-deploy-test
    status: CREATING
    flavor_id: 1b624937-XXXX
    created_dt: 2024-08-05T08:48:45.698165Z
    public_ip: None
    private_ip: None
    domain_name: None
    status_reason: None
    instance_type: DEPLOY
    mlflow_jh_instance_id: None
    mlflow_deploy_instance_id: f8258286-XXXX
    jh_admin_name: admin
    availability_zone: GZ1
    volumes: [
    ---------------
        name: None
        size: 30
        volume_type: ceph-ssd
        imageRef: None
        availability_zone: GZ1
        cinder_id: None]

   ```

   Сразу после вызова метода `create_deploy` инстанс находится в процессе создания, поэтому некоторые параметры не определены, например: доменное имя и IP-адрес.

</details>

## get_all_instances_info

Получить список всех инстансов Cloud ML Platform: JupyterHub, MLflow и MLflow Deploy.

Необходимая роль токена: `Администратор`. [Подробнее о ролях токенов](../lib-authz).

### Аргументы метода

Аргументов нет.

### Возвращаемое значение

Список объектов класса `VmDetailInfo` с информацией обо всех имеющихся в проекте инстансах JupyterHub, MLflow и MLflow Deploy.

### Сигнатура метода и пример использования

<details>
<summary>Сигнатура метода</summary>

```python
get_all_instances_info(**kwargs
                      ) -> List[mlplatform_client.serializers.gateway.VmDetailInfo]
```

</details>

<details>
<summary>Пример использования метода</summary>

<err>

Для простоты значение токена доступа указано в примере скрипта Python.

При работе в production-среде не оперируйте токенами в открытом виде. Используйте переменные среды окружения, хранилища секретов или другие инструменты для работы с чувствительными данными. [Подробнее про токены](../lib-authz).

</err>

1. [Установите библиотеку](../lib-install), если это еще не сделано.
1. [Создайте токен доступа](../lib-authz) с ролью `Администратор`, если это еще не сделано.
1. Выполните скрипт Python:

   ```python
   from mlplatform_client import MLPlatform

   # Авторизоваться в библиотеке по токену доступа
   REFRESH_TOKEN = '<значение токена доступа>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   # Получить и вывести на экран список всех инстансов Cloud ML Platform
   instances = mlp.get_all_instances_info()
   print(instances)
   ```

   В случае успеха будет выведена информация обо всех имеющихся в проекте инстансах Cloud ML Platform. Пример части вывода:

   ```txt
    ---------------
    Jupyter Hub Detail Info:
    ---------------
    id: 6178700a-ХХХХ
    name: jh-test
    status: RUNNING
    flavor_id: 00bbf595-ХХХХ
    created_dt: 2024-08-01T09:28:44.221252Z
    public_ip: None
    private_ip: 10.0.2.40
    domain_name: jh-test-mlp-ХХХХ.ml.msk.vkcs.cloud/jh
    status_reason: None
    instance_type: JUPYTERHUB
    mlflow_jh_instance_id: f8258286-ХХХХ
    mlflow_deploy_instance_id: None
    jh_admin_name: admin
    availability_zone: GZ1
    volumes: [
    ---------------
        name: ml_platform_boot_volume
        size: 50
        volume_type: ceph-ssd
        imageRef: None
        availability_zone: GZ1
        cinder_id: ba1b3d71-ХХХХ, 
    ---------------
        name: ml_platform_data_volume
        size: 50
        volume_type: ceph-ssd
        imageRef: None
        availability_zone: GZ1
        cinder_id: d6ee2d16-ХХХХ],
    # конец фрагмента
    ```

</details>

## get_instance_info

Получить информацию об инстансе Cloud ML Platform (JupyterHub, MLflow, MLflow Deploy) по его идентификатору.

Необходимая роль токена: `Администратор`. [Подробнее о ролях токенов](../lib-authz).

### Аргументы метода

[cols="1,1,4", options="header", width=100%]
|===
|Аргумент
|Тип
|Описание

|`instance_id`

(обязательный)
|`str`
|Идентификатор инстанса Cloud ML Platform.

Список всех инстансов Cloud ML Platform и их идентификаторов можно получить с помощью метода [get_all_instances_info](#get_all_instances_info)
|===

### Возвращаемое значение

Объект класса `VmDetailInfo` с информацией об инстансе Cloud ML Platform с указанным идентификатором.

### Сигнатура метода и пример использования

<details>
<summary>Сигнатура метода</summary>

```python
get_instance_info(instance_id: str,
                  **kwargs
                 ) -> mlplatform_client.serializers.gateway.VmDetailInfo
```

</details>

<details>
<summary>Пример использования метода</summary>

<err>

Для простоты значение токена доступа указано в примере скрипта Python.

При работе в production-среде не оперируйте токенами в открытом виде. Используйте переменные среды окружения, хранилища секретов или другие инструменты для работы с чувствительными данными. [Подробнее про токены](../lib-authz).

</err>

1. [Установите библиотеку](../lib-install), если это еще не сделано.
1. [Создайте токен доступа](../lib-authz) с ролью `Администратор`, если это еще не сделано.
1. Выполните скрипт Python:

   ```python
   from mlplatform_client import MLPlatform

   # Авторизоваться в библиотеке по токену доступа
   REFRESH_TOKEN = '<значение токена доступа>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   # Получить список всех инстансов Cloud ML Platform
   instances = mlp.get_all_instances_info()
   
   # Получить и вывести на экран информацию о втором инстансе в списке
   INSTANCE_ID = instances[1].id
   instance_info = mlp.get_instance_info(instance_id=INSTANCE_ID)
   print(instance_info)
   ```

   В случае успеха будет выведена информация об инстансе с указанным идентификатором. Пример вывода:

   ```txt
    ---------------
    Jupyter Hub Detail Info:
    ---------------
    id: 6178700a-ХХХХ
    name: jh-test
    status: RUNNING
    flavor_id: 00bbf595-ХХХХ
    created_dt: 2024-08-01T09:28:44.221252Z
    public_ip: None
    private_ip: 10.0.2.40
    domain_name: jh-test-mlp-ХХХХ.ml.msk.vkcs.cloud/jh
    status_reason: None
    instance_type: JUPYTERHUB
    mlflow_jh_instance_id: f8258286-ХХХХ
    mlflow_deploy_instance_id: None
    jh_admin_name: admin
    availability_zone: GZ1
    volumes: [
    ---------------
        name: ml_platform_boot_volume
        size: 50
        volume_type: ceph-ssd
        imageRef: None
        availability_zone: GZ1
        cinder_id: ba1b3d71-ХХХХ, 
    ---------------
        name: ml_platform_data_volume
        size: 50
        volume_type: ceph-ssd
        imageRef: None
        availability_zone: GZ1
        cinder_id: d6ee2d16-ХХХХ],
    ```

</details>

## delete_instance

Удалить инстанс Cloud ML Platform (JupyterHub, MLflow или MLflow Deploy).

Необходимая роль токена: `Администратор`. [Подробнее о ролях токенов](../lib-authz).

### Аргументы метода

[cols="1,1,4", options="header", width=100%]
|===
|Аргумент
|Тип
|Описание

|`instance_id`

(обязательный)
|`str`
|Идентификатор инстанса Cloud ML Platform.

Список всех инстансов Cloud ML Platform и их идентификаторов можно получить с помощью метода [get_all_instances_info](#get_all_instances_info)
|===

### Возвращаемое значение

Возвращаемого значения нет.

### Сигнатура метода и пример использования

<details>
<summary>Сигнатура метода</summary>

```python
delete_instance(instance_id: str,
                **kwargs
               ) -> None
```

</details>

<details>
<summary>Пример использования метода</summary>

<err>

Для простоты значение токена доступа указано в примере скрипта Python.

При работе в production-среде не оперируйте токенами в открытом виде. Используйте переменные среды окружения, хранилища секретов или другие инструменты для работы с чувствительными данными. [Подробнее про токены](../lib-authz).

</err>

1. [Установите библиотеку](../lib-install), если это еще не сделано.
1. [Создайте токен доступа](../lib-authz) с ролью `Администратор`, если это еще не сделано.
1. Выполните скрипт Python:

   ```python
   from mlplatform_client import MLPlatform

   # Авторизоваться в библиотеке по токену доступа
   REFRESH_TOKEN = '<значение токена доступа>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   # Получить и вывести на экран список всех инстансов Cloud ML Platform
   instances = mlp.get_all_instances_info()
   print(instances)
   
   # Удалить первый инстанс в списке
   INSTANCE_ID = instances[0].id
   mlp.delete_instance(instance_id=INSTANCE_ID)
   
   # Получить и вывести на экран список инстансов еще раз для проверки
   instances = mlp.get_all_instances_info()
   print(instances)
   ```

   Дважды будет выведен список инстансов Cloud ML Platform:

   - список инстансов до удаления;
   - список инстансов после удаления.

   В случае успеха во втором списке будет отсутствовать удаленный инстанс.

</details>

## create_deployment

Создать развертывание удаленной ML-модели.

<info>

Развертывание создается как Docker-контейнер с упакованной в нем ML-моделью, запущенный на инстансе MLflow Deploy. Доступ к контейнеру обеспечивается по REST API.

</info>

Необходимая роль токена: `Пользователь` или `Администратор`. [Подробнее о ролях токенов](../lib-authz).

### Аргументы метода

[cols="1,1,4", options="header", width=100%]
|===
|Аргумент
|Тип
|Описание

|`deploy_server_name`

(обязательный)
|`str`
|Имя инстанса MLflow Deploy, на котором будет развернута удаленная ML-модель.

Список всех инстансов Cloud ML Platform и их имен можно получить с помощью метода [get_all_instances_info](#get_all_instances_info)

|`deployment_name`

(обязательный)
|`str`
|Имя развертывания удаленной ML-модели

|`model_uri`

(обязательный)
|`str`
|URI ML-модели в хранилище артефактов инстанса MLflow

|`username`

(обязательный)
|`str`
|Логин администратора инстанса JupyterHub или [MLflow Standalone](../../concepts/mlflow-modes#standalone), с которым связан инстанс MLflow Deploy

|`password`

(обязательный)
|`str`
|Пароль администратора инстанса JupyterHub или [MLflow Standalone](../../concepts/mlflow-modes#standalone), с которым связан инстанс MLflow Deploy

|`model_username`

(обязательный)
|`str`
|Логин пользователя для доступа к методам удаленной ML-модели, т.е. к методам [predict_model](#predict_model) и [ping_model](#ping_model)

|`model_password`

(обязательный)
|`str`
|Пароль пользователя для доступа к методам удаленной ML-модели

|`port_out`

(обязательный)
|`int`
|Порт инстанса MLflow Deploy, через который будет доступна удаленная ML-модель.

Если указано значение `None`, будет выбран первый свободный порт в диапазоне 62000–65000
|===

### Возвращаемое значение

Объект класса `DeployOut` с информацией о созданном развертывании ML-модели: его имени, статусе и других параметрах.

### Сигнатура метода и пример использования

<details>
<summary>Сигнатура метода</summary>

```python
create_deployment(deploy_server_name: str,
                  deployment_name: str, 
                  model_uri: str, 
                  username: str, 
                  password: str, 
                  model_username: str, 
                  model_password: str, 
                  port_out: int = None, 
                  **kwargs
                 ) -> mlplatform_client.serializers.deployment.DeployOut
```

</details>

<details>
<summary>Пример использования метода</summary>

<err>

Для простоты значение токена доступа указано в примере скрипта Python.

При работе в production-среде не оперируйте токенами в открытом виде. Используйте переменные среды окружения, хранилища секретов или другие инструменты для работы с чувствительными данными. [Подробнее про токены](../lib-authz).

</err>

1. [Установите библиотеку](../lib-install), если это еще не сделано.
1. [Создайте токен доступа](../lib-authz) с ролью `Пользователь`, если это еще не сделано.
1. Авторизуйтесь в библиотеке по токену доступа, выполнив скрипт Python:

   ```python
   from mlplatform_client import MLPlatform
  
   # Авторизоваться в библиотеке по токену доступа
   REFRESH_TOKEN = '<значение токена доступа>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)
   ```

1. [Создайте](../../jupyterhub/service-management/create) инстанс JupyterHub, если это еще не сделано.
1. [Создайте](../../mlflow/service-management/create) инстанс MLflow, если это еще не сделано.
1. Создайте и обучите ML-модель, если это еще не сделано.
1. [Создайте](../../deploymlflow/quick-start/create) инстанс MLflow Deploy, если это еще не сделано.
1. Выполните скрипт Python:

   ```python
   # Создать развертывание ML-модели
   deployment = mlp.create_deployment(
       deploy_server_name="mlflow-deploy-test",
       deployment_name="test_deployment_1", 
       model_uri="mlflow-artifacts:/2/bc303eb8eXXXX/artifacts/model", 
       username="admin", 
       password="Admin123@", 
       model_username="user123", 
       model_password="Password123!",
       port_out = None
   )
   print(deployment)

   ```

   В случае успеха будет выведена информация о созданном развертывании ML-модели. Пример вывода:

   ```txt
   2024-08-08 04:57:50,907 [ WARNING ]  Time-consuming operation was started, need to wait 2-3 mins or above

   ---------------
   Deployment Info:
   ---------------
   name: test_deployment_1
   status: running
   port: 62001
   image_tags: ['test_deployment_1_image:latest', 'test_deployment_image:latest']
   model_ref: https://jh-test-mlp-XXXX.ml.msk.vkcs.cloud/deploy/f27bd56d-XXXX/test_deployment_1
   predict_ref: https://jh-test-mlp-XXXX.ml.msk.vkcs.cloud/deploy/f27bd56d-XXXX/test_deployment_1/invocations
   ```

   О подготовке к созданию развертывания — в разделе [Управление инстансом с помощью MLflow Client](../../deploymlflow/how-to-guides/manage-mlflow-client).

</details>

## list_deployments

Получить список всех развертываний ML-моделей, доступных на инстансе MLflow Deploy.

Необходимая роль токена: `Пользователь` или `Администратор`. [Подробнее о ролях токенов](../lib-authz).

### Аргументы метода

[cols="1,1,4", options="header", width=100%]
|===
|Аргумент
|Тип
|Описание

|`deploy_server_name`

(обязательный)
|`str`
|Имя инстанса MLflow Deploy.

Список всех инстансов Cloud ML Platform и их имен можно получить с помощью метода [get_all_instances_info](#get_all_instances_info)

|`username`

(обязательный)
|`str`
|Логин администратора инстанса JupyterHub или [MLflow Standalone](../../concepts/mlflow-modes#standalone), с которым связан инстанс MLflow Deploy

|`password`

(обязательный)
|`str`
|Пароль администратора инстанса JupyterHub или [MLflow Standalone](../../concepts/mlflow-modes#standalone), с которым связан инстанс MLflow Deploy
|===

### Возвращаемое значение

Список объектов класса `DeployOut` с информацией о доступных на указанном инстансе развертываниях ML-моделей: их именах, статусах и других параметрах.

### Сигнатура метода и пример использования

<details>
<summary>Сигнатура метода</summary>

```python
list_deployments(deploy_server_name: str,
                 username: str,
                 password: str, 
                 **kwargs
                ) -> List[mlplatform_client.serializers.deployment.DeployOut]
```

</details>

<details>
<summary>Пример использования метода</summary>

<err>

Для простоты значение токена доступа указано в примере скрипта Python.

При работе в production-среде не оперируйте токенами в открытом виде. Используйте переменные среды окружения, хранилища секретов или другие инструменты для работы с чувствительными данными. [Подробнее про токены](../lib-authz).

</err>

1. [Установите библиотеку](../lib-install), если это еще не сделано.
1. [Создайте токен доступа](../lib-authz) с ролью `Пользователь`, если это еще не сделано.
1. Выполните скрипт Python:

   ```python
   from mlplatform_client import MLPlatform
  
   # Авторизоваться в библиотеке по токену доступа
   REFRESH_TOKEN = '<значение токена доступа>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   # Получить и вывести на экран список развертываний ML-моделей
   deployments = mlp.list_deployments(
       deploy_server_name="mlflow-deploy-test", # Инстанс MLflow Deploy должен существовать
       username="admin", 
       password="Admin123@"
   )
   print(deployments)

   ```

   В случае успеха будет выведен список с информацией о доступных на инстансе развертываниях ML-моделей. Пример вывода:

   ```txt
   [
   ---------------
   Deployment Info:
   ---------------
   name: test_deployment_1
   status: running
   port: 62001
   image_tags: ['test_deployment_1_image:latest', 'test_deployment_image:latest']
   model_ref: https://jh-test-mlp-XXXX.ml.msk.vkcs.cloud/deploy/f27bd56d-XXXX/test_deployment_1
   predict_ref: https://jh-test-mlp-XXXX.ml.msk.vkcs.cloud/deploy/f27bd56d-XXXX/test_deployment_1/invocations, 
   ---------------
   Deployment Info:
   ---------------
   name: test_deployment
   status: running
   port: 62000
   image_tags: ['test_deployment_1_image:latest', 'test_deployment_image:latest']
   model_ref: 
   predict_ref: ]
   ```

</details>

## get_deployment

Получить информацию о развертывании ML-модели по его имени.

Необходимая роль токена: `Пользователь` или `Администратор`. [Подробнее о ролях токенов](../lib-authz).

### Аргументы метода

[cols="1,1,4", options="header", width=100%]
|===
|Аргумент
|Тип
|Описание

|`deploy_server_name`

(обязательный)
|`str`
|Имя инстанса MLflow Deploy.

Список всех инстансов Cloud ML Platform и их имен можно получить с помощью метода [get_all_instances_info](#get_all_instances_info)

|`deployment_name`

(обязательный)
|`str`
|Имя развертывания удаленной ML-модели.

Список всех развертываний и их имен можно получить с помощью метода [list_deployments](#list_deployments)

|`username`

(обязательный)
|`str`
|Логин администратора инстанса JupyterHub или [MLflow Standalone](../../concepts/mlflow-modes#standalone), с которым связан инстанс MLflow Deploy

|`password`

(обязательный)
|`str`
|Пароль администратора инстанса JupyterHub или [MLflow Standalone](../../concepts/mlflow-modes#standalone), с которым связан инстанс MLflow Deploy
|===

### Возвращаемое значение

Объект класса `DeployOut` с информацией об указанном развертывании ML-модели: его имени, статусе и других параметрах.

### Сигнатура метода и пример использования

<details>
<summary>Сигнатура метода</summary>

```python
get_deployment(deploy_server_name: str,
               deployment_name: str, 
               username: str, 
               password: str, 
               **kwargs
              ) -> mlplatform_client.serializers.deployment.DeployOut
```

</details>

<details>
<summary>Пример использования метода</summary>

<err>

Для простоты значение токена доступа указано в примере скрипта Python.

При работе в production-среде не оперируйте токенами в открытом виде. Используйте переменные среды окружения, хранилища секретов или другие инструменты для работы с чувствительными данными. [Подробнее про токены](../lib-authz).

</err>

1. [Установите библиотеку](../lib-install), если это еще не сделано.
1. [Создайте токен доступа](../lib-authz) с ролью `Пользователь`, если это еще не сделано.
1. Выполните скрипт Python:

   ```python
   from mlplatform_client import MLPlatform
  
   # Авторизоваться в библиотеке по токену доступа
   REFRESH_TOKEN = '<значение токена доступа>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   # Инстанс MLflow Deploy должен существовать и на нем должно быть доступно хотя бы одно развертывание

   # Получить список развертываний ML-моделей
   deployments = mlp.list_deployments(
       deploy_server_name="mlflow-deploy-test",
       username="admin", 
       password="Admin123@"
   )

   # Получить и вывести на экран информацию о первом развертывании в списке
   DEPLOYMENT_NAME = deployments[0].name
   deployment_info = mlp.get_deployment(
       deploy_server_name="mlflow-deploy-test",
       deployment_name=DEPLOYMENT_NAME,
       username="admin", 
       password="Admin123@"
   )
   print(deployment_info)

   ```

   В случае успеха будет выведена информация о первом в списке развертывании ML-модели на указанном инстансе MLflow Deploy. Пример вывода:

   ```txt
   ---------------
   Deployment Info:
   ---------------
   name: test_deployment_1
   status: running
   port: 62001
   image_tags: ['test_deployment_1_image:latest', 'test_deployment_image:latest']
   model_ref: https://jh-test-mlp-XXXX.ml.msk.vkcs.cloud/deploy/f27bd56d-XXXX/test_deployment_1
   predict_ref: https://jh-test-mlp-XXXX.ml.msk.vkcs.cloud/deploy/f27bd56d-XXXX/test_deployment_1/invocations
   ```

</details>

## delete_deployment

Удалить развертывание ML-модели.

Необходимая роль токена: `Пользователь` или `Администратор`. [Подробнее о ролях токенов](../lib-authz).

### Аргументы метода

[cols="1,1,4", options="header", width=100%]
|===
|Аргумент
|Тип
|Описание

|`deploy_server_name`

(обязательный)
|`str`
|Имя инстанса MLflow Deploy.

Список всех инстансов Cloud ML Platform и их имен можно получить с помощью метода [get_all_instances_info](#get_all_instances_info)

|`deployment_name`

(обязательный)
|`str`
|Имя развертывания ML-модели.

Список всех развертываний и их имен можно получить с помощью метода [list_deployments](#list_deployments)

|`username`

(обязательный)
|`str`
|Логин администратора инстанса JupyterHub или [MLflow Standalone](../../concepts/mlflow-modes#standalone), с которым связан инстанс MLflow Deploy

|`password`

(обязательный)
|`str`
|Пароль администратора инстанса JupyterHub или [MLflow Standalone](../../concepts/mlflow-modes#standalone), с которым связан инстанс MLflow Deploy
|===

### Возвращаемое значение

Возвращаемого значения нет.

### Сигнатура метода и пример использования

<details>
<summary>Сигнатура метода</summary>

```python
delete_deployment(deploy_server_name: str,
                  deployment_name: str, 
                  username: str, 
                  password: str, 
                  **kwargs
                 ) -> None
```

</details>

<details>
<summary>Пример использования метода</summary>

<err>

Для простоты значение токена доступа указано в примере скрипта Python.

При работе в production-среде не оперируйте токенами в открытом виде. Используйте переменные среды окружения, хранилища секретов или другие инструменты для работы с чувствительными данными. [Подробнее про токены](../lib-authz).

</err>

1. [Установите библиотеку](../lib-install), если это еще не сделано.
1. [Создайте токен доступа](../lib-authz) с ролью `Пользователь`, если это еще не сделано.
1. Выполните скрипт Python:

   ```python
   from mlplatform_client import MLPlatform
  
   # Авторизоваться в библиотеке по токену доступа
   REFRESH_TOKEN = '<значение токена доступа>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)

   # Инстанс MLflow Deploy должен существовать и на нем должно быть доступно хотя бы одно развертывание
   
   # Получить и вывести на экран список развертываний ML-моделей
   deployments = mlp.list_deployments(
       deploy_server_name="mlflow-deploy-test",
       username="admin", 
       password="Admin123@" 
   )
   print(deployments)

   # Удалить первое развертывание в списке
   DEPLOYMENT_NAME = deployments[0].name
   mlp.delete_deployment(
       deploy_server_name="mlflow-deploy-test",
       deployment_name=DEPLOYMENT_NAME,
       username="admin", 
       password="Admin123@" 
   )
   
   # Повторно получить и вывести на экран список развертываний
   deployments_after_deletion = mlp.list_deployments(
       deploy_server_name="mlflow-deploy-test",
       username="admin", 
       password="Admin123@"
   )
   print(deployments_after_deletion)

   ```

   Дважды будет выведен список развертываний ML-моделей:

   - список развертываний до удаления;
   - список развертываний после удаления.

   В случае успеха во втором списке будет отсутствовать удаленное развертывание.

</details>

## ping_model

Проверить готовность удаленной ML-модели к работе.

Необходимая роль токена: `Пользователь` или `Администратор`. [Подробнее о ролях токенов](../lib-authz).

### Аргументы метода

[cols="1,1,4", options="header", width=100%]
|===
|Аргумент
|Тип
|Описание

|`deploy_server_name`

(обязательный)
|`str`
|Имя инстанса MLflow Deploy, на котором развернута ML-модель.

Список всех инстансов Cloud ML Platform и их имен можно получить с помощью метода [get_all_instances_info](#get_all_instances_info)

|`deployment_name`

(обязательный)
|`str`
|Имя развертывания удаленной ML-модели.

Список всех развертываний и их имен можно получить с помощью метода [list_deployments](#list_deployments)

|`model_username`

(обязательный)
|`str`
|Логин пользователя для доступа к методам удаленной ML-модели, который был указан в вызове метода [create_deployment](#create_deployment)

|`model_password`

(обязательный)
|`str`
|Пароль пользователя для доступа к методам удаленной ML-модели, который был указан в вызове метода [create_deployment](#create_deployment)
|===

### Возвращаемое значение

Символ новой строки `\n`, если модель готова к работе.

### Сигнатура метода и пример использования

<details>
<summary>Сигнатура метода</summary>

```python
ping_model(deploy_server_name: str,
           deployment_name: str, 
           model_username: str, 
           model_password: str, 
           **kwargs
          ) -> str
```

</details>

<details>
<summary>Пример использования метода</summary>

<err>

Для простоты значение токена доступа указано в примере скрипта Python.

При работе в production-среде не оперируйте токенами в открытом виде. Используйте переменные среды окружения, хранилища секретов или другие инструменты для работы с чувствительными данными. [Подробнее про токены](../lib-authz).

</err>

1. [Установите библиотеку](../lib-install), если это еще не сделано.
1. [Создайте токен доступа](../lib-authz) с ролью `Пользователь`, если это еще не сделано.
1. Авторизуйтесь в библиотеке по токену доступа, выполнив скрипт Python:

   ```python
   from mlplatform_client import MLPlatform
  
   # Авторизоваться в библиотеке по токену доступа
   REFRESH_TOKEN = '<значение токена доступа>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)
   ```

1. [Создайте](../../jupyterhub/service-management/create) инстанс JupyterHub, если это еще не сделано.
1. [Создайте](../../mlflow/service-management/create) инстанс MLflow, если это еще не сделано.
1. Создайте и обучите ML-модель, если это еще не сделано.
1. [Создайте](../../deploymlflow/quick-start/create) инстанс MLflow Deploy, если это еще не сделано.
1. Разверните ML-модель на инстансе MLflow Deploy с помощью метода [create_deployment](#create_deployment).
1. Выполните скрипт Python:

   ```python
   # Проверить готовность ML-модели к работе
   result = mlp.ping_model(deploy_server_name="mlflow-deploy-test", 
       deployment_name="test_deployment_1", 
       model_username="user123", 
       model_password="Password123!"
   )
   print(result)
   ```

   В случае успеха будет выведена пустая строка.

   О подготовке к использованию ML-модели — в разделе [Управление инстансом с помощью MLflow Client](../../deploymlflow/how-to-guides/manage-mlflow-client).

</details>

## predict_model

Получить предсказание ML-модели для заданных входных данных.

Необходимая роль токена: `Пользователь` или `Администратор`. [Подробнее о ролях токенов](../lib-authz).

### Аргументы метода

[cols="1,1,4", options="header", width=100%]
|===
|Аргумент
|Тип
|Описание

|`data`

(обязательный)
|`Dict`
|Входные данные для ML-модели

|`deploy_server_name`

(обязательный)
|`str`
|Имя инстанса MLflow Deploy, на котором развернута ML-модель.

Список всех инстансов Cloud ML Platform и их имен можно получить с помощью метода [get_all_instances_info](#get_all_instances_info)

|`deployment_name`

(обязательный)
|`str`
|Имя развертывания удаленной ML-модели.

Список всех развертываний и их имен можно получить с помощью метода [list_deployments](#list_deployments)

|`model_username`

(обязательный)
|`str`
|Логин пользователя для доступа к методам удаленной ML-модели, который был указан в вызове метода [create_deployment](#create_deployment)

|`model_password`

(обязательный)
|`str`
|Пароль пользователя для доступа к методам удаленной ML-модели, который был указан в вызове метода [create_deployment](#create_deployment)
|===

### Возвращаемое значение

Предсказание ML-модели для заданных входных данных в формате `Dict[str, Any]`.

### Сигнатура метода и пример использования

<details>
<summary>Сигнатура метода</summary>

```python
predict_model(data: Dict,
              deploy_server_name: str, 
              deployment_name: str, 
              model_username: str, 
              model_password: str, 
              **kwargs
             ) -> Dict[str, Any]
```

</details>

<details>
<summary>Пример использования метода</summary>

<err>

Для простоты значение токена доступа указано в примере скрипта Python.

При работе в production-среде не оперируйте токенами в открытом виде. Используйте переменные среды окружения, хранилища секретов или другие инструменты для работы с чувствительными данными. [Подробнее про токены](../lib-authz).

</err>

1. [Установите библиотеку](../lib-install), если это еще не сделано.
1. [Создайте токен доступа](../lib-authz) с ролью `Пользователь`, если это еще не сделано.
1. Авторизуйтесь в библиотеке по токену доступа, выполнив скрипт Python:

   ```python
   from mlplatform_client import MLPlatform
  
   # Авторизоваться в библиотеке по токену доступа
   REFRESH_TOKEN = '<значение токена доступа>'
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)
   ```

1. [Создайте](../../jupyterhub/service-management/create) инстанс JupyterHub, если это еще не сделано.
1. [Создайте](../../mlflow/service-management/create) инстанс MLflow, если это еще не сделано.
1. Создайте и обучите ML-модель, если это еще не сделано.
1. [Создайте](../../deploymlflow/quick-start/create) инстанс MLflow Deploy, если это еще не сделано.
1. Разверните ML-модель на инстансе MLflow Deploy с помощью метода [create_deployment](#create_deployment).
1. Выполните скрипт Python:

   ```python
   # Определить входные данные для ML-модели
   data = {"inputs":[[0.045341,  0.050680,  0.060618,  0.031065,  0.028702, -0.047347, -0.054446, 0.071210,  0.133597, 0.135612],
                     [0.075341,  0.010680,  0.030618,  0.011065,  0.098702, -0.007347, -0.014446, 0.071210,  0.093597, 0.115612]
                    ]}

   # Получить и вывести на экран предсказание ML-модели
   result = mlp.predict_model(data=data,
       deploy_server_name="mlflow-deploy-test", 
       deployment_name="test_deployment", 
       model_username="user123", 
       model_password="Password123!"
   )
   print(result)
   ```

   В случае успеха будет выведено предсказание ML-модели. Пример вывода:

   ```txt
   {'predictions': [262.3591008044226, 215.47878674779508]}
   ```

   О подготовке к использованию ML-модели — в разделе [Управление инстансом с помощью MLflow Client](../../deploymlflow/how-to-guides/manage-mlflow-client).

</details>
