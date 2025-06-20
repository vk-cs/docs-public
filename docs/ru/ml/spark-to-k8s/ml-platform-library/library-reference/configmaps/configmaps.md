Эти методы позволяют работать с [ConfigMaps](https://kubernetes.io/docs/concepts/configuration/configmap/) (картами конфигурации) кластера Cloud Containers, который обеспечивает работу кластера Cloud Spark. Они используются для хранения конфигурационных данных: переменных окружения, аргументов командной строки или файлов конфигурации. Применение ConfigMap позволяет отделить настройку конфигурационных данных, зависящих от конкретной среды исполнения, от кода приложения. Это облегчает перенос ваших приложений Spark между средами исполнения кода.

<warn>

Класс ConfigMap не обеспечивает секретность и шифрование хранимых данных. Для работы с конфиденциальными данными используйте [методы работы с секретами](../secrets) или сторонние инструменты.

</warn>

## create_configmap_from_yaml

Создать ConfigMap в указанном пространстве имен на основе предоставленного манифеста. Манифест должен быть в формате YAML.

Необходимая роль токена: `Администратор`. [Подробнее о ролях токенов](../../authz).

### Аргументы метода

[cols="1,1,4", options="header", width=100%]
|===
|Аргумент
|Тип
|Описание

|`cluster_id`

(обязательный)
|`str`
|Идентификатор кластера Cloud Spark.

Список кластеров Cloud Spark и их идентификаторов можно получить с помощью метода [get_clusters](../clusters#get_clusters)

|`configmap_yaml_path`

(обязательный)
|`str`
|Путь к YAML-файлу с манифестом, который нужно передать кластеру Cloud Spark

|`namespace`

(необязательный)
|`str`
|Имя пространства имен, в котором нужно создать ConfigMap. Пространство имен должно существовать, иначе ConfigMap не будет создан.

При отсутствии аргумента используется значение по умолчанию: `default`
|===

### Возвращаемое значение

Объект класса `K8sConfigmap` с информацией о созданном ConfigMap.

[cols="1,1,4", options="header", width=100%]
|===
|Поле
|Тип
|Описание

|`data`
|`dict[str,str]`
|Данные ConfigMap в виде пар `ключ: значение`

|`name`
|`str`
|Имя ConfigMap

|`namespace`
|`str`
|Имя пространства имен, в котором создан ConfigMap
|===

### Сигнатура метода, примеры манифестов и пример использования метода

{cut(Сигнатура метода)}

```python
create_configmap_from_yaml(cluster_id: str,
                           configmap_yaml_path: str,
                           namespace: str = 'default',
                           **kwargs
                          ) -> mlplatform_client.serializers.spark_proxy.K8sConfigmap
```

{/cut}

{cut(Пример манифеста с кодом приложения для кластера Cloud Spark)}

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: custom-job-py
  namespace: default
data:
  custom_job.py: |
    import sys
    import os

    from random import random
    from operator import add

    from pyspark.sql import SparkSession


    """
        Usage: pi [partitions]
    """
    spark = SparkSession\
        .builder\
        .appName("PythonPi")\
        .getOrCreate()
    spark.sparkContext.setLogLevel('DEBUG')

    partitions = int(sys.argv[1]) if len(sys.argv) > 1 else 2
    n = 100000 * partitions

    def f(_: int) -> float:
        x = random() * 2 - 1
        y = random() * 2 - 1
        return 1 if x ** 2 + y ** 2 <= 1 else 0

    count = spark.sparkContext.parallelize(range(1, n + 1), partitions).map(f).reduce(add)
    print("Pi is roughly %f" % (4.0 * count / n))

    spark.stop()
```

{/cut}

{cut(Пример манифеста с настройками доступа к инстансу базы данных MongoDB (mongodb_configmap.yaml))}

```yaml
kind: ConfigMap
apiVersion: v1
metadata:
  name: example-configmap
data:
  # Configuration values can be set as key-value properties
  database: mongodb
  database_uri: mongodb://localhost:27017
  # Or set as complete file contents (even JSON!)
  keys: | 
    image.public.key=771 
    rsa.public.key=42
```

{/cut}

{cut(Пример использования метода для манифеста mongodb_configmap.yaml)}

<err>

Для простоты значение токена доступа указано в примере скрипта Python.

При работе в production-среде не оперируйте токенами в открытом виде. Используйте переменные среды окружения, хранилища секретов или другие инструменты для работы с чувствительными данными. [Подробнее про токены](../../authz).

</err>

1. [Установите библиотеку](../../install), если это еще не сделано.
1. [Создайте токен доступа](../../authz) с ролью `Администратор`, если это еще не сделано.
1. Выполните скрипт Python:

```python
   from mlplatform_client import MLPlatform

   REFRESH_TOKEN = '<значение токена доступа>'

   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)
   configmap = mlp.create_configmap_from_yaml(
               cluster_id='XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
               configmap_yaml_path='/home/user/mongodb_configmap.yaml',
               namespace='default')
 
   print(configmap)
```

В случае успеха отобразится ответ:

```txt
data:
  database: mongodb
  database_uri: mongodb://localhost:27017
  keys: "image.public.key=771 \nrsa.public.key=42"
name: example-configmap
namespace: default      
```

{/cut}

## list_configmaps

Получить список имен всех ConfigMap в указанном пространстве имен.

Чтобы получить детальную информацию об отдельном ConfigMap из списка, используйте метод [get_configmap_detail](#get_configmap_detail).

Необходимая роль токена: `Администратор` или `Пользователь`. [Подробнее о ролях токенов](../../authz).

### Аргументы метода

[cols="1,1,4", options="header", width=100%]
|===
|Аргумент
|Тип
|Описание

|`cluster_id`

(обязательный)
|`str`
|Идентификатор кластера Cloud Spark.

Список кластеров Cloud Spark и их идентификаторов можно получить с помощью метода [get_clusters](../clusters#get_clusters)
|`namespace`

(необязательный)
|`str`
|Имя пространства имен, для которого нужно получить список всех ConfigMap.

При отсутствии аргумента используется значение по умолчанию: `default`
|===

### Возвращаемое значение

Объект класса `K8sObjectNamesList[str]`, который содержит список имен всех ConfigMap в указанном пространстве имен.

### Сигнатура метода и пример использования

{cut(Сигнатура метода)}

```python
list_configmaps(cluster_id: str,
                namespace: str = 'default',
                **kwargs
               ) -> mlplatform_client.serializers.spark_proxy.K8sObjectNamesList[str]
```

{/cut}

{cut(Пример использования метода)}

<err>

Для простоты значение токена доступа указано в примере скрипта Python.

При работе в production-среде не оперируйте токенами в открытом виде. Используйте переменные среды окружения, хранилища секретов или другие инструменты для работы с чувствительными данными. [Подробнее про токены](../../authz).

</err>

1. [Установите библиотеку](../../install), если это еще не сделано.
1. [Создайте токен доступа](../../authz) с ролью `Администратор` или `Пользователь`, если это еще не сделано.
1. Выполните скрипт Python:

   ```python
   from mlplatform_client import MLPlatform

   REFRESH_TOKEN = '<значение токена доступа>'

   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)
   configmap_names = mlp.list_configmaps(
      cluster_id='XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
      namespace='default')

   print(configmap_names)
   ```

   В случае успеха будут выведены имена всех ConfigMap в пространстве имен `default`.

{/cut}

## get_configmap_detail

Получить информацию о ConfigMap с указанным именем.

Необходимая роль токена: `Администратор` или `Пользователь`. [Подробнее о ролях токенов](../../authz).

### Аргументы метода

[cols="1,1,4", options="header", width=100%]
|===
|Аргумент
|Тип
|Описание

|`cluster_id`

(обязательный)
|`str`
|Идентификатор кластера Cloud Spark.

Список кластеров Cloud Spark и их идентификаторов можно получить с помощью метода [get_clusters](../clusters#get_clusters)
|`configmap_name`

(обязательный)
|`str`
|Имя ConfigMap.

Список имен всех ConfigMap можно получить с помощью метода [list_configmaps](#list_configmaps)
|`namespace`

(необязательный)
|`str`
|Имя пространства имен, в котором находится ConfigMap.

При отсутствии аргумента используется значение по умолчанию: `default`
|===

### Возвращаемое значение

Объект класса `K8sConfigmap` с информацией о ConfigMap с указанным именем.

[cols="1,1,4", options="header", width=100%]
|===
|Поле
|Тип
|Описание

|`data`
|`dict[str,str]`
|Данные ConfigMap в виде пар `ключ: значение`

|`name`
|`str`
|Имя объекта ConfigMap

|`namespace`
|`str`
|Имя пространства имен, в котором находится ConfigMap
|===

### Сигнатура метода и пример использования

{cut(Сигнатура метода)}

```python
get_configmap_detail(cluster_id: str,
                     configmap_name: str,
                     namespace: str = 'default',
                     **kwargs
                    ) -> mlplatform_client.serializers.spark_proxy.K8sConfigmap
```

{/cut}

{cut(Пример использования метода)}

<err>

Для простоты значение токена доступа указано в примере скрипта Python.

При работе в production-среде не оперируйте токенами в открытом виде. Используйте переменные среды окружения, хранилища секретов или другие инструменты для работы с чувствительными данными. [Подробнее про токены](../../authz).

</err>

1. [Установите библиотеку](../../install), если это еще не сделано.
1. [Создайте токен доступа](../../authz) с ролью `Администратор` или `Пользователь`, если это еще не сделано.
1. Выполните скрипт Python:

   ```python
   from mlplatform_client import MLPlatform
   
   REFRESH_TOKEN = '<значение токена доступа>'
   
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)
   configmap_details = mlp.get_configmap_detail(
      cluster_id='XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
      configmap_name='example-configmap',
      namespace='default')

   print(configmap_details)
   ```

   В случае успеха будет выведена информация о ConfigMap с именем `example-configmap`.

{/cut}

## delete_configmap

Удалить ConfigMap с указанным именем.

Необходимая роль токена: `Администратор`. [Подробнее о ролях токенов](../../authz).

### Аргументы метода

[cols="1,1,4", options="header", width=100%]
|===
|Аргумент
|Тип
|Описание

|`cluster_id`

(обязательный)
|`str`
|Идентификатор кластера Cloud Spark.

Список кластеров Cloud Spark и их идентификаторов можно получить с помощью метода [get_clusters](../clusters#get_clusters)
|`configmap_name`

(обязательный)
|`str`
|Имя ConfigMap.

Список имен всех ConfigMap можно получить с помощью метода [list_configmaps](#list_configmaps)
|`namespace`

(необязательный)
|`str`
|Имя пространства имен, в котором находится ConfigMap.

При отсутствии аргумента используется значение по умолчанию: `default`
|===

### Возвращаемое значение

Возвращаемого значения нет.

### Сигнатура метода и пример использования

{cut(Сигнатура метода)}

```python
delete_configmap(cluster_id: str,
                 configmap_name: str,
                 namespace: str = 'default',
                 **kwargs)
```

{/cut}

{cut(Пример использования метода)}

<err>

Для простоты значение токена доступа указано в примере скрипта Python.

При работе в production-среде не оперируйте токенами в открытом виде. Используйте переменные среды окружения, хранилища секретов или другие инструменты для работы с чувствительными данными. [Подробнее про токены](../../authz).

</err>

1. [Установите библиотеку](../../install), если это еще не сделано.
1. [Создайте токен доступа](../../authz) с ролью `Администратор`, если это еще не сделано.
1. Выполните скрипт Python:

   ```python
   from mlplatform_client import MLPlatform
   
   REFRESH_TOKEN = '<значение токена доступа>'
   
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)
   mlp.delete_configmap(
      cluster_id='XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
      configmap_name='example-configmap',
      namespace='default')
   ```

   ConfigMap с указанным именем будет удален из кластера Cloud Spark. Это можно проверить с помощью метода [list_configmaps](#list_configmaps).

{/cut}
