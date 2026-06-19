# {heading(Работа с кластерами Cloud Spark)[id=mlspark-library-reference-clusters]}

Эти методы позволяют управлять доступными в проекте кластерами Cloud Spark.

## {heading(get_clusters)[id=mlspark-library-reference-clusters-get_clusters]}

Получить список всех доступных кластеров Cloud Spark.

Необходимая роль токена: `Администратор` или `Пользователь`. {linkto(../../authz#mlspark-library-authz)[text=Подробнее о ролях токенов]}.

### {heading(Аргументы метода)[id=mlspark-library-reference-clusters-get_clusters-arguments]}

Аргументов нет.

### {heading(Возвращаемое значение)[id=mlspark-library-reference-clusters-get_clusters-result]}

Список объектов класса `K8sClusterInfo` с информацией о доступных кластерах Cloud Spark.

{include(/ru/_includes/_spark_methods_return_value.md)}

### {heading(Сигнатура метода и пример использования)[id=mlspark-library-reference-clusters-get_clusters-sinature]}

{cut(Сигнатура метода)}

```python
get_clusters(**kwargs
            ) -> List[mlplatform_client.serializers.spark_proxy.K8sClusterInfo]

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
      clusters = mlp.get_clusters()

      print(clusters)
   ```

{/cut}

## {heading(get_cluster_info)[id=mlspark-library-reference-clusters-get_cluster_info]}

Получить подробную информацию о кластере Cloud Spark по его идентификатору.

Необходимая роль токена: `Администратор` или `Пользователь`. {linkto(../../authz#mlspark-library-authz)[text=Подробнее о ролях токенов]}.

### {heading(Аргументы метода)[id=mlspark-library-reference-clusters-get_cluster_info-arguments]}

[cols="1,1,4", options="header", width=100%]
|===
|Аргумент
|Тип
|Описание

|`cluster_id`

(обязательный)
|`str`
|Идентификатор кластера Cloud Spark

Список кластеров Cloud Spark и их идентификаторов можно получить с помощью метода [get_clusters](../clusters#mlspark-library-reference-clusters-get_clusters)
|===

### {heading(Возвращаемое значение)[id=mlspark-library-reference-clusters-get_cluster_info-result]}

Объект класса `K8sClusterInfo` с информацией о кластере.

{include(/ru/_includes/_spark_methods_return_value.md)}

### {heading(Сигнатура метода и пример использования)[id=mlspark-library-reference-clusters-get_cluster_info-signature]}

{cut(Сигнатура метода)}

```python
get_cluster_info(cluster_id: str,
                 **kwargs
                ) -> mlplatform_client.serializers.spark_proxy.K8sClusterInfo
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
   cluster_info = mlp.get_cluster_info(
      cluster_id='XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX')

   print(cluster_info)
   ```

   В случае успеха будет выведена информация о кластере.

{/cut}

## {heading(set_cluster_delete_time)[id=mlspark-library-reference-clusters-set_cluster_delete_time]}

Установить время бездействия кластера, по истечении которого кластер будет автоматически удален.

Необходимая роль токена: `Администратор`. {linkto(../../authz#mlspark-library-authz)[text=Подробнее о ролях токенов]}.

### {heading(Аргументы метода)[id=mlspark-library-reference-clusters-set_cluster_delete_time-arguments]}

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

|`minutes`

(обязательный)
|`int`
|Предельное время бездействия кластера в минутах
|===

### {heading(Возвращаемое значение)[id=mlspark-library-reference-clusters-set_cluster_delete_time-result]}

Объект класса `K8sClusterInfo`. В случае успеха поле `delete_after_inactive_min` объекта будет содержать заданное предельное время бездействия кластера.

{include(/ru/_includes/_spark_methods_return_value.md)}

### {heading(Сигнатура метода и пример использования)[id=mlspark-library-reference-clusters-set_cluster_delete_time-signature]}

{cut(Сигнатура метода)}

```python
set_cluster_delete_time(cluster_id: str,
                        minutes: int,
                        **kwargs
                       ) -> mlplatform_client.serializers.spark_proxy.K8sClusterInfo
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
   cluster = mlp.set_cluster_delete_time(
      cluster_id='XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
      minutes=1440)

   print(cluster.delete_after_inactive_min)
   ```
   В случае успеха будет выведено число `1440`.

{/cut}

## {heading(remove_cluster_delete_time)[id=mlspark-library-reference-clusters-remove_cluster_delete_time]}

Удалить предельное время бездействия кластера, по истечении которого кластер будет автоматически удален.

Необходимая роль токена: `Администратор`. {linkto(../../authz#mlspark-library-authz)[text=Подробнее о ролях токенов]}.

### {heading(Аргументы метода)[id=mlspark-library-reference-clusters-remove_cluster_delete_time-arguments]}

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
|===

### {heading(Возвращаемое значение)[id=mlspark-library-reference-clusters-remove_cluster_delete_time-result]}

Объект класса `K8sClusterInfo`. В случае успеха поле `delete_after_inactive_min` объекта будет содержать значение `None`.

{include(/ru/_includes/_spark_methods_return_value.md)}

### {heading(Сигнатура метода и пример использования)[id=mlspark-library-reference-clusters-remove_cluster_delete_time-signature]}

{cut(Сигнатура метода)}

```python
remove_cluster_delete_time(cluster_id: str,
                           **kwargs
                          ) -> mlplatform_client.serializers.spark_proxy.K8sClusterInfo
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
   cluster = mlp.remove_cluster_delete_time(
      cluster_id='XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX')
   
   print(cluster.delete_after_inactive_min)
   ```

   В случае успеха будет выведено значение `None`.

{/cut}

## {heading(set_cluster_suspend_time)[id=mlspark-library-reference-clusters-set_cluster_suspend_time]}

Установить время бездействия кластера, по истечении которого кластер будет автоматически остановлен.

Необходимая роль токена: `Администратор`. {linkto(../../authz#mlspark-library-authz)[text=Подробнее о ролях токенов]}.

### {heading(Аргументы метода)[id=mlspark-library-reference-clusters-set_cluster_suspend_time-arguments]}

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

|`minutes`

(обязательный)
|`int`
|Предельное время бездействия кластера в минутах
|===

### {heading(Возвращаемое значение)[id=mlspark-library-reference-clusters-set_cluster_suspend_time-result]}

Объект класса `K8sClusterInfo`. В случае успеха поле `suspend_after_inactive_min` объекта будет содержать заданное предельное время бездействия кластера.

{include(/ru/_includes/_spark_methods_return_value.md)}

### {heading(Сигнатура метода и пример использования)[id=mlspark-library-reference-clusters-set_cluster_suspend_time-signature]}

{cut(Сигнатура метода)}

```python
set_cluster_suspend_time(cluster_id: str,
                         minutes: int,
                         **kwargs
                        ) -> mlplatform_client.serializers.spark_proxy.K8sClusterInfo
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
   cluster = mlp.set_cluster_suspend_time(
      cluster_id='XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
      minutes=120)
   
   print(cluster.suspend_after_inactive_min)
   ```

   В случае успеха будет выведено число `120`.

{/cut}

## {heading(remove_cluster_suspend_time)[id=mlspark-library-reference-clusters-remove_cluster_suspend_time]}

Удалить предельное время бездействия кластера, по истечении которого кластер будет автоматически остановлен.

Необходимая роль токена: `Администратор`. {linkto(../../authz#mlspark-library-authz)[text=Подробнее о ролях токенов]}.

### {heading(Аргументы метода)[id=mlspark-library-reference-clusters-remove_cluster_suspend_time-arguments]}

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
|===

### {heading(Возвращаемое значение)[id=mlspark-library-reference-clusters-remove_cluster_suspend_time-result]}

Объект класса `K8sClusterInfo`. В случае успеха поле `suspend_after_inactive_min` объекта будет содержать значение `None`.

{include(/ru/_includes/_spark_methods_return_value.md)}

### {heading(Сигнатура метода и пример использования)[id=mlspark-library-reference-clusters-remove_cluster_suspend_time-signature]}

{cut(Сигнатура метода)}

```python
remove_cluster_suspend_time(cluster_id: str,
                            **kwargs
                           ) -> mlplatform_client.serializers.spark_proxy.K8sClusterInfo
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
   cluster = mlp.remove_cluster_suspend_time(
      cluster_id='XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX')
   
   print(cluster.suspend_after_inactive_min)
   ```

   В случае успеха будет выведено значение `None`.

{/cut}

## {heading(stop)[id=mlspark-library-reference-clusters-stop]}

Завершить все текущие подключения к кластеру.

Необходимая роль токена: `Администратор`. {linkto(../../authz#mlspark-library-authz)[text=Подробнее о ролях токенов]}.

{note:info}

При выполнении данного метода кластер не останавливается.

{/note}

### {heading(Аргументы метода)[id=mlspark-library-reference-clusters-stop-arguments]}

Аргументов нет.

### {heading(Возвращаемое значение)[id=mlspark-library-reference-clusters-stop-result]}

Возвращаемого значения нет.

### {heading(Сигнатура метода и пример использования)[id=mlspark-library-reference-clusters-stop-signature]}

{cut(Сигнатура метода)}

```python
stop() 
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
   mlp.stop()
   ```

{/cut}

## {heading(wake_up_cluster)[id=mlspark-library-reference-clusters-wake_up_cluster]}

Активировать кластер.

Необходимая роль токена: `Администратор`. {linkto(../../authz#mlspark-library-authz)[text=Подробнее о ролях токенов]}.

{note:warn}

Активировать можно только остановленный кластер.

{/note}

### {heading(Аргументы метода)[id=mlspark-library-reference-clusters-wake_up_cluster-arguments]}

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
|===

### {heading(Возвращаемое значение)[id=mlspark-library-reference-clusters-wake_up_cluster-result]}

Возвращаемого значения нет.

### {heading(Сигнатура метода и пример использования)[id=mlspark-library-reference-clusters-wake_up_cluster-signature]}

{cut(Сигнатура метода)}

```python
wake_up_cluster(cluster_id: str,
                **kwargs
               )
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
   mlp.wake_up_cluster(
      cluster_id='XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX')
   ```

   Начнется запуск кластера.

{/cut}
