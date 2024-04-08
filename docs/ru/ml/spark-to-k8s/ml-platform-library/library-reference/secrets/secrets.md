Эти методы позволяют работать с секретами кластера Cloud Containers, который обеспечивает работу кластера Cloud Spark. [Секреты Kubernetes](https://kubernetes.io/docs/concepts/configuration/secret/) позволяют организовать безопасное хранение и использование чувствительных данных, которые могут понадобиться во время выполнения задания Spark.

## create_secret_from_yaml

Создает секрет в указанном пространстве имен на основе предоставленного манифеста. Манифест должен быть в формате YAML.

Необходимая роль токена: `Администратор`. [Подробнее о ролях токенов](../../authz).

### Аргументы метода

[cols="1,1,5", options="header", width=100%]
|===
|Аргумент
|Тип
|Описание

|`cluster_id` (**обязательный**)
|`str`
|Идентификатор кластера Cloud Spark, в котором нужно создать секрет. Список кластеров Cloud Spark и их идентификаторов можно получить с помощью метода [get_clusters](../clusters#get_clusters)

|`secret_yaml_path` (**обязательный**)
|`str`
|Путь к YAML-файлу с манифестом

|`namespace`
|`str`
|Имя пространства имен, в котором нужно создать секрет. Это пространство имен должно существовать, иначе секрет не будет создан.<br><br>Если опустить этот аргумент при вызове метода, то будет использовано значение по умолчанию: `default`
|===

### Возвращаемое значение

Возвращает объект класса K8sSecret с информацией о созданном секрете.

[cols="1,1,5", options="header", width=100%]
|===
|Поле
|Тип
|Описание

|`name`
|`str`
| Имя секрета

|`type`
|`str`
|Тип секрета

|`namespace`
|`str`
|Имя пространства имен, в котором находится секрет

|`data`
|`dict[str,str]`
|Данные секрета в виде пар `ключ: значение`. Для безопасности данные не выводятся в открытом виде
|===

### Дополнительная информация

<details>
<summary>Полная сигнатура метода</summary>

```python
create_secret_from_yaml(self, 
                        cluster_id: str,
                        secret_yaml_path: str,
                        namespace: str = 'default',
                        **kwargs
                       ) -> mlplatform_client.serializers.spark_proxy.K8sSecret
```
</details>

<details>
<summary>Пример использования метода</summary>

<warn>

Для простоты значение токена доступа указано в примере скрипта Python.

При работе в production-среде не оперируйте токенами в открытом виде. Используйте переменные среды окружения, хранилища секретов или другие инструменты для работы с чувствительными данными. [Подробнее про токены](../../authz).

</warn>

1. [Установите библиотеку](../../install), если это еще не сделано.
1. [Создайте токен доступа](../../authz) с ролью `Администратор`, если это еще не сделано.
1. Выполните скрипт Python:

   ```python
   from mlplatform_client import MLPlatform
   
   REFRESH_TOKEN = '<значение токена доступа>'
   
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)
   secret = mlp.create_secret_from_yaml(
               cluster_id='XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
               secret_yaml_path='/home/user/sample-secret.yaml',
               namespace='sample-namespace')
   
   print(secret)
   ```

</details>

## list_secrets

Получает список имен секретов в указанном пространстве имен. Возвращает объект класса `K8sObjectNamesList`, который содержит в себе список имен секретов.

Чтобы получить детальную информацию об отдельном секрете из списка, используйте метод [get_secret_detail](#get_secret_detail).

Необходимая роль токена: `Администратор` или `Пользователь`. [Подробнее о ролях токенов](../../authz).

### Аргументы метода

[cols="1,1,5", options="header", width=100%]
|===
|Аргумент
|Тип
|Описание

|`cluster_id`
|`str`
|Идентификатор кластера Cloud Spark, для которого нужно получить список секретов.<br><br>Список кластеров Cloud Spark и их идентификаторов можно получить с помощью метода [get_clusters](../clusters#get_clusters)

|`namespace`
|`str`
|Имя пространства имен, из которого нужно получить список секретов.<br><br>Если опустить этот аргумент при вызове метода, то будет использовано значение по умолчанию: `default`
|===

### Возвращаемое значение

Объект класса `K8sObjectNamesList`, который содержит в себе список имен секретов.

### Дополнительная информация

<details>
<summary>Полная сигнатура метода</summary>

```python
list_secrets(self, 
             cluster_id: str,
             namespace: str = 'default',
             **kwargs
            ) -> mlplatform_client.serializers.spark_proxy.K8sObjectNamesList[str]
```

</details>

<details>
<summary>Пример использования метода</summary>

<err>

Для простоты значение токена доступа указано в примере скрипта Python.

При работе в production-среде не оперируйте токенами в открытом виде. Используйте переменные среды окружения, хранилища секретов или другие инструменты для работы с чувствительными данными. [Подробнее про токены](../../authz).

</err>

1. [Установите библиотеку](../../install), если это еще не сделано.
1. [Создайте токен доступа](../../authz) с ролью `Пользователь`, если это еще не сделано.
1. Выполните скрипт Python:

   ```python
   from mlplatform_client import MLPlatform
   
   REFRESH_TOKEN = '<значение токена доступа>'
   
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)
   secrets = mlp.list_secrets(
                cluster_id='XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
                namespace='sample-namespace')

   print(secrets)
   ```

   В случае успеха будут выведен список секретов в пространстве имен `sample-namespace`.

</details>

## get_secret_detail

Получает подробную информацию о [секрете Kubernetes](https://kubernetes.io/docs/concepts/configuration/secret/) по его имени.

Необходимая роль токена: `Администратор` или `Пользователь`. [Подробнее о ролях токенов](../../authz).

### Аргументы метода

[cols="1,1,5", options="header", width=100%]
|===
|Аргумент
|Тип
|Описание

|`cluster_id` (**обязательный**)
|`str`
|Идентификатор кластера Cloud Spark, для которого нужно получить информацию о секрете.<br><br>Список кластеров Cloud Spark и их идентификаторов можно получить с помощью метода [get_clusters](../clusters#get_clusters)

|`secret_name` (**обязательный**)
|`str`
|Имя секрета, информацию о котором нужно получить.<br><br>Список имен секретов можно получить с помощью метода [list_secrets](#list_secrets)

|`namespace`
|`str`
|Имя пространства имен, в котором находится секрет.<br><br>Если опустить этот аргумент при вызове метода, то будет использовано значение по умолчанию: `default`
|===

### Возвращаемое значение

Возвращает объект класса `K8sSecret` с информацией о секрете.

[cols="1,1,5", options="header", width=100%]
|===
|Поле
|Тип
|Описание

|`name`
|`str`
|Имя секрета

|`type`
|`str`
|Тип секрета

|`namespace`
|`str`
|Имя пространства имен, в котором находится секрет

|`data`
|`dict[str,str]`
|Данные секрета в виде пар `ключ: значение`.<br><br>Для безопасности данные не выводятся в открытом виде
|===

### Дополнительная информация

<details>
<summary>Полная сигнатура метода</summary>

```python
get_secret_detail(self,
                  cluster_id: str,
                  secret_name: str,
                  namespace: str = 'default',
                  **kwargs
                 ) -> mlplatform_client.serializers.spark_proxy.K8sSecret
```

</details>

<details>
<summary>Пример использования метода</summary>

<err>

Для простоты значение токена доступа указано в примере скрипта Python.

При работе в production-среде не оперируйте токенами в открытом виде. Используйте переменные среды окружения, хранилища секретов или другие инструменты для работы с чувствительными данными. [Подробнее про токены](../../authz).

</err>

1. [Установите библиотеку](../../install), если это еще не сделано.
1. [Создайте токен доступа](../../authz) с ролью `Пользователь`, если это еще не сделано.
1. Выполните скрипт Python:

   ```python
   from mlplatform_client import MLPlatform
   
   REFRESH_TOKEN = '<значение токена доступа>'
   
   mlp = MLPlatform(refresh_token=REFRESH_TOKEN)
   secret_details = mlp.get_secret_detail(
                        cluster_id='XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
                        secret_name='sample-secret',
                        namespace='sample-namespace')

   print(secret_details)
   ```

   В случае успеха будет выведена информация о секрете `sample-secret`.

</details>

## delete_secret

Удаляет секрет по его имени.

Необходимая роль токена: `Администратор`. [Подробнее о ролях токенов](../../authz).

### Аргументы метода

[cols="1,1,5", options="header", width=100%]
|===
|Аргумент
|Тип
|Описание

|`cluster_id` (**обязательный**)
|`str`
|Идентификатор кластера Cloud Spark, для которого нужно получить информацию о секрете.<br><br>Список кластеров Cloud Spark и их идентификаторов можно получить с помощью метода [get_clusters](../clusters#get_clusters)

|`secret_name` (**обязательный**)
|`str`
|Имя секрета, который нужно удалить.<br><br>Список имен секретов можно получить с помощью метода [list_secrets](#list_secrets)

|`namespace`
|`str`
|Имя пространства имен, в котором находится секрет.<br><br>Если опустить этот аргумент при вызове метода, то будет использовано значение по умолчанию: `default`
|===

### Возвращаемое значение

Возвращаемого значения нет.

### Дополнительная информация

<details>
<summary>Полная сигнатура метода</summary>

```python
delete_secret(self,
              cluster_id: str,
              secret_name: str,
              namespace: str = 'default',
              **kwargs)
```

</details>

<details>
<summary>Пример использования метода</summary>

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
   mlp.delete_secret(
        cluster_id='XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
        secret_name='sample-secret',
        namespace='sample-namespace')
   ```

   Секрет будет удален из кластера Cloud Spark. Это можно проверить с помощью метода [list_secrets](#list_secrets).

</details>
