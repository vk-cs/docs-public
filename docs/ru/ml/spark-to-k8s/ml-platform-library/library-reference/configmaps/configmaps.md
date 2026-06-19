# {heading(Работа с ConfigMaps)[id=mlspark-library-reference-configmaps]}

Эти методы позволяют работать с [ConfigMaps](https://kubernetes.io/docs/concepts/configuration/configmap/) (картами конфигурации) кластера Cloud Containers, который обеспечивает работу кластера Cloud Spark. Они используются для хранения конфигурационных данных: переменных окружения, аргументов командной строки или файлов конфигурации. Применение ConfigMap позволяет отделить настройку конфигурационных данных, зависящих от конкретной среды исполнения, от кода приложения. Это облегчает перенос ваших приложений Spark между средами исполнения кода.

{note:warn}

Класс ConfigMap не обеспечивает секретность и шифрование хранимых данных. Для работы с конфиденциальными данными используйте {linkto(../secrets#mlspark-library-reference-secrets)[text=методы работы с секретами]} или сторонние инструменты.

{/note}

## {heading(create_configmap_from_yaml)[id=mlspark-library-reference-configmaps-create_configmap_from_yaml]}

Создать ConfigMap в указанном пространстве имен на основе предоставленного манифеста. Манифест должен быть в формате YAML.

Необходимая роль токена: `Администратор`. {linkto(../../authz#mlspark-library-authz)[text=Подробнее о ролях токенов]}.

### {heading(Аргументы метода)[id=mlspark-library-reference-configmaps-create_configmap_from_yaml-arguments]}

[cols="1,1,4", options="header", width=100%]
|===
|Аргумент
|Тип
|Описание

|`cluster_id`

(обязательный)
|`str`
|Идентификатор кластера Cloud Spark.

Список кластеров Cloud Spark и их идентификаторов можно получить с помощью метода [get_clusters](../clusters#mlspark-library-reference-clusters-get_clusters)

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

### {heading(Возвращаемое значение)[id=mlspark-library-reference-configmaps-create_configmap_from_yaml-result]}

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

### {heading(Сигнатура метода, примеры манифестов и пример использования метода)[id=mlspark-library-reference-configmaps-create_configmap_from_yaml-signature]}

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

{note:err}

Для простоты значение токена доступа указано в примере скрипта Python.

При работе в production-среде не оперируйте токенами в открытом виде. Используйте переменные среды окружения, хранилища секретов или другие инструменты для работы с чувствительными данными. {linkto(../../authz#mlspark-library-authz)[text=Подробнее про токены]}.

{/note}

1. {linkto(../../install#mlspark-library-install)[text=Установите библиотеку]}, если это еще не сделано.
1. {linkto(../../authz#mlspark-library-authz)[text=Создайте токен доступа]} с ролью `Администратор`, если это еще не сделано.
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

## {heading(list_configmaps)[id=mlspark-library-reference-configmaps-list_configmaps]}

Получить список имен всех ConfigMap в указанном пространстве имен.

Чтобы получить детальную информацию об отдельном ConfigMap из списка, используйте метод [get_configmap_detail](#mlspark-library-reference-configmaps-get_configmap_detail).

Необходимая роль токена: `Администратор` или `Пользователь`. {linkto(../../authz#mlspark-library-authz)[text=Подробнее о ролях токенов]}.

### {heading(Аргументы метода)[id=mlspark-library-reference-configmaps-list_configmaps-arguments]}

[cols="1,1,4", options="header", width=100%]
|===
|Аргумент
|Тип
|Описание

|`cluster_id`

(обязательный)
|`str`
|Идентификатор кластера Cloud Spark.

Список кластеров Cloud Spark и их идентификаторов можно получить с помощью метода [get_clusters](../clusters#mlspark-library-reference-clusters-get_clusters)
|`namespace`

(необязательный)
|`str`
|Имя пространства имен, для которого нужно получить список всех ConfigMap.

При отсутствии аргумента используется значение по умолчанию: `default`
|===

### {heading(Возвращаемое значение)[id=mlspark-library-reference-configmaps-list_configmaps-result]}

Объект класса `K8sObjectNamesList[str]`, который содержит список имен всех ConfigMap в указанном пространстве имен.

### {heading(Сигнатура метода и пример использования)[id=mlspark-library-reference-configmaps-list_configmaps-signature]}

{cut(Сигнатура метода)}

```python
list_configmaps(cluster_id: str,
                namespace: str = 'default',
                **kwargs
               ) -> mlplatform_client.serializers.spark_proxy.K8sObjectNamesList[str]
```

{/cut}

{cut(Пример использования метода)}

{note:err}

Для простоты значение токена доступа указано в примере скрипта Python.

При работе в production-среде не оперируйте токенами в открытом виде. Используйте переменные среды окружения, хранилища секретов или другие инструменты для работы с чувствительными данными. {linkto(../../authz#mlspark-library-authz)[text=Подробнее про токены]}.

{/note}

1. {linkto(../../install#mlspark-library-install)[text=Установите библиотеку]}, если это еще не сделано.
1. {linkto(../../authz#mlspark-library-authz)[text=Создайте токен доступа]} с ролью `Администратор` или `Пользователь`, если это еще не сделано.
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

## {heading(get_configmap_detail)[id=mlspark-library-reference-configmaps-get_configmap_detail]}

Получить информацию о ConfigMap с указанным именем.

Необходимая роль токена: `Администратор` или `Пользователь`. {linkto(../../authz#mlspark-library-authz)[text=Подробнее о ролях токенов]}.

### {heading(Аргументы метода)[id=mlspark-library-reference-configmaps-get_configmap_detail-arguments]}

[cols="1,1,4", options="header", width=100%]
|===
|Аргумент
|Тип
|Описание

|`cluster_id`

(обязательный)
|`str`
|Идентификатор кластера Cloud Spark.

Список кластеров Cloud Spark и их идентификаторов можно получить с помощью метода [get_clusters](../clusters#mlspark-library-reference-clusters-get_clusters)
|`configmap_name`

(обязательный)
|`str`
|Имя ConfigMap.

Список имен всех ConfigMap можно получить с помощью метода [list_configmaps](#mlspark-library-reference-configmaps-list_configmaps)
|`namespace`

(необязательный)
|`str`
|Имя пространства имен, в котором находится ConfigMap.

При отсутствии аргумента используется значение по умолчанию: `default`
|===

### {heading(Возвращаемое значение)[id=mlspark-library-reference-configmaps-get_configmap_detail-result]}

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

### {heading(Сигнатура метода и пример использования)[id=mlspark-library-reference-configmaps-get_configmap_detail-signature]}

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

{note:err}

Для простоты значение токена доступа указано в примере скрипта Python.

При работе в production-среде не оперируйте токенами в открытом виде. Используйте переменные среды окружения, хранилища секретов или другие инструменты для работы с чувствительными данными. {linkto(../../authz#mlspark-library-authz)[text=Подробнее про токены]}.

{/note}

1. {linkto(../../install#mlspark-library-install)[text=Установите библиотеку]}, если это еще не сделано.
1. {linkto(../../authz#mlspark-library-authz)[text=Создайте токен доступа]} с ролью `Администратор` или `Пользователь`, если это еще не сделано.
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

## {heading(delete_configmap)[id=mlspark-library-reference-configmaps-delete_configmap]}

Удалить ConfigMap с указанным именем.

Необходимая роль токена: `Администратор`. {linkto(../../authz#mlspark-library-authz)[text=Подробнее о ролях токенов]}.

### {heading(Аргументы метода)[id=mlspark-library-reference-configmaps-delete_configmap-arguments]}

[cols="1,1,4", options="header", width=100%]
|===
|Аргумент
|Тип
|Описание

|`cluster_id`

(обязательный)
|`str`
|Идентификатор кластера Cloud Spark.

Список кластеров Cloud Spark и их идентификаторов можно получить с помощью метода [get_clusters](../clusters#mlspark-library-reference-clusters-get_clusters)
|`configmap_name`

(обязательный)
|`str`
|Имя ConfigMap.

Список имен всех ConfigMap можно получить с помощью метода [list_configmaps](#mlspark-library-reference-configmaps-list_configmaps)
|`namespace`

(необязательный)
|`str`
|Имя пространства имен, в котором находится ConfigMap.

При отсутствии аргумента используется значение по умолчанию: `default`
|===

### {heading(Возвращаемое значение)[id=mlspark-library-reference-configmaps-delete_configmap-result]}

Возвращаемого значения нет.

### {heading(Сигнатура метода и пример использования)[id=mlspark-library-reference-configmaps-delete_configmap-signature]}

{cut(Сигнатура метода)}

```python
delete_configmap(cluster_id: str,
                 configmap_name: str,
                 namespace: str = 'default',
                 **kwargs)
```

{/cut}

{cut(Пример использования метода)}

{note:err}

Для простоты значение токена доступа указано в примере скрипта Python.

При работе в production-среде не оперируйте токенами в открытом виде. Используйте переменные среды окружения, хранилища секретов или другие инструменты для работы с чувствительными данными. {linkto(../../authz#mlspark-library-authz)[text=Подробнее про токены]}.

{/note}

1. {linkto(../../install#mlspark-library-install)[text=Установите библиотеку]}, если это еще не сделано.
1. {linkto(../../authz#mlspark-library-authz)[text=Создайте токен доступа]} с ролью `Администратор`, если это еще не сделано.
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

   ConfigMap с указанным именем будет удален из кластера Cloud Spark. Это можно проверить с помощью метода [list_configmaps](#mlspark-library-reference-configmaps-list_configmaps).

{/cut}
