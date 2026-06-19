# {heading(Работа в DLH)[id=jupyterhub_dlh]}

Для работы JupyterHub в DLH необходимо настроить подключение к Cloud Iceberg Metastore и S3.

Все необходимые команды и код для настройки подключений содержатся в [примере Jupyter-ноутбука](./assets/iceberg.ipynb "download"). Загрузите его и импортируйте в ваш Jupyter-ноутбук или настройте подключения самостоятельно по инструкции ниже.

{note:info}
Каждый шаг с кодом в этой инструкции можно выполнять в одной или разных ячейках для кода Jupyter-ноутбука.
{/note}

## {heading(Подготовка к настройке подключений)[id=jupyterhub_dlh_connection_preparation]}
1. Откройте JupyterHub.
1. Создайте новый Jupyter-ноутбук и откройте его.
1. Обновите менеджер пакетов и установите библиотеку pyiceberg с дополнительными пакетами. В ячейке для кода укажите и выполните: `pip install --upgrade pip`.
1. В верхней панели Jupyter-ноутбука нажмите на значок ![Значок](./assets/jh_restart.svg "inline") для перезагрузки ядра.

{note:info}
Экземпляр сервиса JupyterHub содержит необходимые библиотеки и пакеты для работы в DLH: pyiceberg, pandas, pyarrow и boto3. Чтобы убедиться в наличии библиотек, выполните перед настройкой подключений команду `pip list`. Если одна из библиотек отсутствует, установите ее с помощью команды `pip install <НАЗВАНИЕ_БИБЛИОТЕКИ>`.
{/note}

## {heading(Подключение к Cloud Iceberg Metastore)[id=jupyterhub_dlh_iceberg_connection]}

1. Откройте Data Platform и перейдите в раздел **Экземпляры сервисов**.
1. Нажмите на название экземпляра сервиса Cloud Iceberg Metastore.
1. На вкладке **Общая информация** скопируйте IP-адрес из поля **Iceberg Metastore bouncer connection string**.
1. Вернитесь в Jupyter-ноутбук, в ячейке для кода задайте переменные и укажите в них учетные данные:
   
    ```python
    uri = "postgres://<ЛОГИН>:<ПАРОЛЬ>@<IP-АДРЕС>:8001/<БД>"
    s3_bucket_name = "<БАКЕТ>"
    db_name = "<БД>"
    ```
   
    Здесь:
   
    - `<ЛОГИН>` — логин пользователя, указанный при создании экземпляра сервиса Cloud Iceberg Metastore;
    - `<ПАРОЛЬ>` — пароль пользователя, указанный при создании экземпляра сервиса Cloud Iceberg Metastore;
    - `<IP-АДРЕС>` — внешний IP-адрес, скопированный из поля **Iceberg Metastore bouncer connection string**;
    - `<БАКЕТ>` — название бакета, указанное при создании экземпляра сервиса Cloud Iceberg Metastore;
    - `<БД>` — название базы данных, указанное при создании экземпляра сервиса Cloud Iceberg Metastore.

1. Укажите и выполните код, который загружает каталог с данными из S3, создает пространство имен и загружает таблицы:

   ```python
   from pyiceberg.catalog import load_catalog
   
   # Загрузка каталога
   catalog = load_catalog(
       "my_catalog",
       **{
           "type": "sql",
           "uri": uri,
           "warehouse": f"s3://{s3_bucket_name}/"
       }
   )
    
   # Создание пространства имен
   try:
       catalog.create_namespace(db_name)
       print(f"Namespace {db_name} создан успешно!")
   except Exception as e:
       print(f"Ошибка при создании namespace: {e}")
   
   # Просмотр всех пространств имен
   catalog.list_namespaces()
   
   # Просмотр таблиц
   catalog.list_tables(db_name)
   ```

   {note:info}
   Если во время подключения к Cloud Iceberg Metastore произошла ошибка, проверьте корректность значений в переменных и перезагрузите ядро Jupyter-ноутбука.
   {/note}


## {heading(Подключение к S3)[id=jupyterhub_dlh_s3_connection]}

1. Создайте публичный и приватный ключи доступа к S3.
1. В текущем Jupyter-ноутбуке в ячейке для кода задайте переменные и укажите в них учетные данные:

    ```python
    uri = "postgres://<ЛОГИН>:<ПАРОЛЬ>@<IP-АДРЕС>:8001/<БД>"
    s3_bucket_name = "<БАКЕТ>"
    ENDPOINT = "https://hb.bizmrg.com"
    ACCESS_KEY = "<ПУБЛИЧНЫЙ_КЛЮЧ_ДОСТУПА_К_S3>"
    SECRET_KEY = "<ПРИВАТНЫЙ_КЛЮЧ_ДОСТУПА_К_S3>"
    ```

   Здесь:

    - `<ЛОГИН>` — логин пользователя, указанный при создании экземпляра сервиса Cloud Iceberg Metastore;
    - `<ПАРОЛЬ>` — пароль пользователя, указанный при создании экземпляра сервиса Cloud Iceberg Metastore;
    - `<IP-АДРЕС>` — внешний IP-адрес, скопированный из поля **Iceberg Metastore bouncer connection string**;
    - `<БАКЕТ>` — название бакета, указанное при создании экземпляра сервиса Cloud Iceberg Metastore;
    - `<БД>` — название базы данных, указанное при создании экземпляра сервиса Cloud Iceberg Metastore.
1. Укажите и выполните код для проверки подключения к S3 и вывода информации о содержании бакета:

   ```python
   import boto3
   
   # Проверка подключения к S3
   try:
       s3_client = boto3.client(
           's3',
           endpoint_url=ENDPOINT,
           aws_access_key_id=ACCESS_KEY,
           aws_secret_access_key=SECRET_KEY
   )

   # Проверка доступа к бакету
   response = s3_client.list_objects_v2(Bucket=s3_bucket_name, MaxKeys=1)
   print(f"Подключение к S3 успешно. Bucket: {s3_bucket_name}")
     
   if 'Contents' in response:
       print("Bucket не пустой")
       print("Первые объекты:")
       for obj in response['Contents'][:3]:
           print(f"  - {obj['Key']}")
   else:
       print("Bucket пустой")

   except Exception as e:
       print(f"Ошибка подключения к S3: {e}")
   ```

   {note:info}
   Если во время подключения к S3 произошла ошибка, проверьте корректность значений в переменных и перезагрузите ядро Jupyter-ноутбука.
   {/note}

## {heading(Запись и чтение данных в Iceberg Metastore)[id=jupyterhub_iceberg_data]}

Чтобы записать данные в Iceberg-таблицу, нужно: 
1. {linkto(#jupyterhub_iceberg_data_dataframe_conversion)[text=Привести типы данных]} датафрейма pandas в формат, совместимый с Iceberg.
1. {linkto(#jupyterhub_iceberg_data_schema_create)[text=Создать схему]} на основе преобразованного датафрейма.
1. {linkto(#jupyterhub_iceberg_data_append)[text=Записать данные]} в Iceberg-таблицу.

### {heading(Преобразование датафрейма pandas)[id=jupyterhub_iceberg_data_dataframe_conversion]}

1. Импортируйте необходимые библиотеки:

    ```python
    import os
    import boto3
    import pyarrow as pa
    from pyiceberg.catalog import load_catalog
    from pyiceberg.schema import Schema
    from pyiceberg.types import NestedField, StringType, IntegerType
    from typing import Union
    from pyiceberg.table import Table
    import pandas as pd
    import pyarrow as pa
    ```
   
1. Создайте функцию `prepare_dataframe_for_iceberg`. Функция принимает в качестве аргумента исходный датафрейм pandas и возвращает датафрейм с приведенными типами данных:

    ```python
    def prepare_dataframe_for_iceberg(data_df: pd.DataFrame) -> pd.DataFrame:
        prepared_df = data_df.copy()
          
        for col in prepared_df.columns:
            dtype = prepared_df[col].dtype
              
            if dtype == 'object':
                prepared_df[col] = prepared_df[col].astype('string')
              
            elif pd.api.types.is_integer_dtype(dtype):
                # Конвертация типов в формат, совместимый с Iceberg
                prepared_df[col] = prepared_df[col].astype('int64')
       
            elif pd.api.types.is_float_dtype(dtype):
                prepared_df[col] = prepared_df[col].astype('float64')
              
      
            elif pd.api.types.is_bool_dtype(dtype):
                prepared_df[col] = prepared_df[col].astype('boolean')
              
            elif pd.api.types.is_datetime64_any_dtype(dtype):
                prepared_df[col] = prepared_df[col].astype('datetime64[us]')
          
        return prepared_df
    ```

### {heading(Создание схемы)[id=jupyterhub_iceberg_data_schema_create]}

Создайте функцию `create_pyarrow_scheme` и передайте в качестве аргумента переменную `pd.DataFrame` (преобразованный датафрейм из функции `prepare_dataframe_for_iceberg`):

```python
def create_pyarrow_scheme(prepared_df: pd.DataFrame) -> pa.schema:
    fields = []
    for col in prepared_df.columns:
        if pd.api.types.is_datetime64_any_dtype(prepared_df[col].dtype):
            fields.append(pa.field(col, pa.timestamp('us')))
        elif prepared_df[col].dtype == 'string':
            fields.append(pa.field(col, pa.string()))
        elif prepared_df[col].dtype == 'int64':
            fields.append(pa.field(col, pa.int64()))
        elif prepared_df[col].dtype == 'float64':
            fields.append(pa.field(col, pa.float64()))
        elif prepared_df[col].dtype == 'boolean':
            fields.append(pa.field(col, pa.bool_()))
        else:
            fields.append(pa.field(col, pa.from_pandas_dtype(prepared_df[col].dtype)))
       
    return pa.schema(fields)
```

### {heading(Запись данных в Iceberg-таблицу)[id=jupyterhub_iceberg_data_append]}

1. Создайте функцию `add_data_to_iceberg_table`, в качестве аргументов передайте целевую Iceberg-таблицу и переменную `pd.DataFrame`:

    ```python
    def add_data_to_iceberg_table(table: Table, data_df: pd.DataFrame) -> None:
        # Подготовка данных для Iceberg
        prepared_df = prepare_dataframe_for_iceberg(data_df)
         
        # Создание схемы PyArrow
        schema = create_pyarrow_scheme
         
        arrow_table = pa.Table.from_pandas(prepared_df, schema=schema)
     
        table.append(arrow_table)
     
        print(f"Добавлено {len(data_df)} записей в таблицу")
    ```
    Результат выполнения функции — количество записей, добавленных в Iceberg-таблицу.

1. Импортируйте необходимые библиотеки и создайте каталог:

    ```python

    from pyiceberg.types import NestedField, StringType, IntegerType, DoubleType, BooleanType, TimestampType
   
    catalog = load_catalog(
        "my_catalog",
        **{
            "type": "sql",
            "uri": uri,
            "warehouse": f"s3://{s3_bucket_name}/",
            "s3.endpoint": ENDPOINT,
            "s3.access-key-id": ACCESS_KEY,
            "s3.secret-access-key": SECRET_KEY
        }
    )
    ```
1. Удалите существующую таблицу, если она есть:

    ```python
    try:
        catalog.drop_table("metastore.test_table")
        print("Старая таблица удалена")
    except:
        print("Старая таблица не найдена")
    ```

1. Создайте тестовые данные:

    ```python
    test_data = pd.DataFrame({
        'id': [1, 2, 3], 
        'name': ['Alice', 'Bob', 'Charlie'],
        'price': [10.5, 20.3, 30.1],
        'is_active': [True, False, True],
        'created_at': pd.to_datetime(['2024-01-01', '2024-01-02', '2024-01-03'])
    })
    ```

1. Определите схему таблицы:

    ```python
    schema = Schema(
        NestedField(1, "id", IntegerType(), required=False),
        NestedField(2, "name", StringType(), required=False),
        NestedField(3, "price", DoubleType(), required=False),
        NestedField(4, "is_active", BooleanType(), required=False),
        NestedField(5, "created_at", TimestampType(), required=False)
    )
    ```

1. Создайте таблицу и добавьте в нее данные:

    ```python
    try:
        table = catalog.create_table(
            "metastore.test_table",
            schema=schema,
            location=f"s3://{bucket_name}/metastore/test_table"
    )
        print("Таблица 'metastore.test_table' создана успешно!")
 
        # Добавление данных
        add_data_to_iceberg_table(table, test_data)

        except Exception as e:
            print(f"Ошибка при создании таблицы: {e}")
    ```

1. Добавьте новые данные в таблицу:

    ```python
    new_data = pd.DataFrame({
        'id': [4, 5, 6],
        'name': ['Diana', 'Eve', 'Frank'],
        'price': [40.5, 50.3, 60.1],
        'is_active': [False, True, False],
        'created_at': pd.to_datetime(['2024-01-04', '2024-01-05', '2024-01-06'])
    })

    add_data_to_iceberg_table(table, new_data)
    ```
   
1. Прочтите все данные из таблицы:

    ```python
    df_all = table.scan().to_pandas()
    print("Все данные в таблице:")
    print(df_all)
    ```
