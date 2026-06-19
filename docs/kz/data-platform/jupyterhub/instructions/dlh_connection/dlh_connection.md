# {heading(DLH жүйесінде жұмыс істеу)[id=jupyterhub_dlh]}

{include(/kz/_includes/_translated_by_ai.md)}

JupyterHub-пен DLH жүйесінде жұмыс істеу үшін Cloud Iceberg Metastore және S3-ке қосылымды баптау қажет.

Қосылымдарды баптауға арналған барлық қажетті командалар мен код [Jupyter-ноутбуктің мысалында](./assets/iceberg.ipynb "download") берілген. Оны жүктеп алып, Jupyter-ноутбукке импорттаңыз немесе төмендегі нұсқаулық бойынша қосылымдарды өзіңіз баптаңыз.

{note:info}
Осы нұсқаулықтағы коды бар әрбір қадамды Jupyter-ноутбуктің кодқа арналған бір немесе әртүрлі ұяшықтарында орындауға болады.
{/note}

## {heading(Қосылымдарды баптауға дайындық)[id=jupyterhub_dlh_connection_preparation]}
1. JupyterHub-ты ашыңыз.
1. Жаңа Jupyter-ноутбук жасаңыз және оны ашыңыз.
1. Пакеттер менеджерін жаңартып, pyiceberg кітапханасын қосымша пакеттерімен бірге орнатыңыз. Кодқа арналған ұяшықта мынаны көрсетіп, орындаңыз: `pip install --upgrade pip`.
1. Ядроны қайта жүктеу үшін Jupyter-ноутбуктің жоғарғы панеліндегі ![Белгіше](./assets/jh_restart.svg "inline") белгішесін басыңыз.

{note:info}
JupyterHub сервис данасында DLH жүйесінде жұмыс істеуге қажетті кітапханалар мен пакеттер бар: pyiceberg, pandas, pyarrow және boto3. Кітапханалардың бар екеніне көз жеткізу үшін қосылымдарды баптамас бұрын `pip list` командасын орындаңыз. Егер кітапханалардың бірі жоқ болса, оны `pip install <КІТАПХАНА_АТАУЫ>` командасы арқылы орнатыңыз.
{/note}

## {heading(Cloud Iceberg Metastore-ға қосылу)[id=jupyterhub_dlh_iceberg_connection]}

1. Data Platform-ты ашып, **Сервис даналары** бөліміне өтіңіз.
1. Cloud Iceberg Metastore сервис данасының атауын басыңыз.
1. **Жалпы ақпарат** қойындысында **Iceberg Metastore bouncer connection string** өрісінен IP-мекенжайды көшіріп алыңыз.
1. Jupyter-ноутбукке оралып, кодқа арналған ұяшықта айнымалыларды беріп, оларға тіркелгі деректерін көрсетіңіз:

    ```python
    uri = "postgres://<ЛОГИН>:<ҚҰПИЯСӨЗ>@<IP-МЕКЕНЖАЙ>:8001/<БД>"
    s3_bucket_name = "<БАКЕТ>"
    db_name = "<БД>"
    ```

    Мұнда:

    - `<ЛОГИН>` — Cloud Iceberg Metastore сервис данасын құру кезінде көрсетілген пайдаланушы логині;
    - `<ҚҰПИЯСӨЗ>` — Cloud Iceberg Metastore сервис данасын құру кезінде көрсетілген пайдаланушы құпиясөзі;
    - `<IP-МЕКЕНЖАЙ>` — **Iceberg Metastore bouncer connection string** өрісінен көшірілген сыртқы IP-мекенжай;
    - `<БАКЕТ>` — Cloud Iceberg Metastore сервис данасын құру кезінде көрсетілген бакет атауы;
    - `<БД>` — Cloud Iceberg Metastore сервис данасын құру кезінде көрсетілген дерекқор атауы.

1. S3-тен деректері бар каталогты жүктейтін, аттар кеңістігін жасайтын және кестелерді жүктейтін кодты көрсетіп, орындаңыз:

    ```python
    from pyiceberg.catalog import load_catalog

    # Каталогты жүктеу
    catalog = load_catalog(
        "my_catalog",
        **{
            "type": "sql",
            "uri": uri,
            "warehouse": f"s3://{s3_bucket_name}/"
        }
    )

    # Аттар кеңістігін құру
    try:
        catalog.create_namespace(db_name)
        print(f"Namespace {db_name} сәтті құрылды!")
    except Exception as e:
        print(f"Namespace құру кезінде қате шықты: {e}")

    # Барлық аттар кеңістігін қарау
    catalog.list_namespaces()

    # Кестелерді қарау
    catalog.list_tables(db_name)
    ```

    {note:info}
    Егер Cloud Iceberg Metastore-ға қосылу кезінде қате орын алса, айнымалылардағы мәндердің дұрыстығын тексеріп, Jupyter-ноутбук ядросын қайта жүктеңіз.
    {/note}


## {heading(S3-ке қосылу)[id=jupyterhub_dlh_s3_connection]}

1. S3-ке қол жеткізуге арналған жария және құпия кілттерді жасаңыз.
1. Ағымдағы Jupyter-ноутбукта кодқа арналған ұяшықта айнымалыларды беріп, оларға тіркелгі деректерін көрсетіңіз:

    ```python
    uri = "postgres://<ЛОГИН>:<ҚҰПИЯСӨЗ>@<IP-МЕКЕНЖАЙ>:8001/<БД>"
    s3_bucket_name = "<БАКЕТ>"
    ENDPOINT = "https://hb.bizmrg.com"
    ACCESS_KEY = "<S3_ҚОЛЖЕТКІЗУГЕ_АРНАЛҒАН_ЖАРИЯ_КІЛТ>"
    SECRET_KEY = "<S3_ҚОЛЖЕТКІЗУГЕ_АРНАЛҒАН_ҚҰПИЯ_КІЛТ>"
    ```

   Мұнда:

    - `<ЛОГИН>` — Cloud Iceberg Metastore сервис данасын құру кезінде көрсетілген пайдаланушы логині;
    - `<ҚҰПИЯСӨЗ>` — Cloud Iceberg Metastore сервис данасын құру кезінде көрсетілген пайдаланушы құпиясөзі;
    - `<IP-МЕКЕНЖАЙ>` — **Iceberg Metastore bouncer connection string** өрісінен көшірілген сыртқы IP-мекенжай;
    - `<БАКЕТ>` — Cloud Iceberg Metastore сервис данасын құру кезінде көрсетілген бакет атауы;
    - `<БД>` — Cloud Iceberg Metastore сервис данасын құру кезінде көрсетілген дерекқор атауы.
1. S3-ке қосылымды тексеру және бакет мазмұны туралы ақпаратты шығару үшін кодты көрсетіп, орындаңыз:

    ```python
    import boto3

   # S3-ке қосылуды тексеру
    try:
        s3_client = boto3.client(
            's3',
            endpoint_url=ENDPOINT,
            aws_access_key_id=ACCESS_KEY,
            aws_secret_access_key=SECRET_KEY
    )

    # Бакетке қолжетімділікті тексеру
    response = s3_client.list_objects_v2(Bucket=s3_bucket_name, MaxKeys=1)
    print(f"S3-ке қосылу сәтті аяқталды. Bucket: {s3_bucket_name}")

    if 'Contents' in response:
        print("Bucket бос емес")
        print("Алғашқы объектілер:")
        for obj in response['Contents'][:3]:
            print(f"  - {obj['Key']}")
    else:
        print("Bucket бос")

    except Exception as e:
        print(f"S3-ке қосылу қатесі: {e}")
    ```

    {note:info}
    Егер S3-ке қосылу кезінде қате орын алса, айнымалылардағы мәндердің дұрыстығын тексеріп, Jupyter-ноутбук ядросын қайта жүктеңіз.
    {/note}

## {heading(Iceberg Metastore-ға деректерді жазу және оқу)[id=jupyterhub_iceberg_data]}

Iceberg-кестесіне деректерді жазу үшін мыналар қажет: 
1. {linkto(#jupyterhub_iceberg_data_dataframe_conversion)[text=Pandas датафреймінің деректер типтерін]} Iceberg-пен үйлесімді форматқа келтіру.
1. {linkto(#jupyterhub_iceberg_data_schema_create)[text=Схеманы құру]} түрлендірілген датафрейм негізінде.
1. {linkto(#jupyterhub_iceberg_data_append)[text=Деректерді жазу]} Iceberg-кестесіне.

### {heading(Pandas датафреймін түрлендіру)[id=jupyterhub_iceberg_data_dataframe_conversion]}

1. Қажетті кітапханаларды импорттаңыз:

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

1. `prepare_dataframe_for_iceberg` функциясын жасаңыз. Функция аргумент ретінде бастапқы pandas датафреймін қабылдайды және деректер типтері келтірілген датафреймді қайтарады:

    ```python
    def prepare_dataframe_for_iceberg(data_df: pd.DataFrame) -> pd.DataFrame:
        prepared_df = data_df.copy()

        for col in prepared_df.columns:
            dtype = prepared_df[col].dtype

            if dtype == 'object':
                prepared_df[col] = prepared_df[col].astype('string')

            elif pd.api.types.is_integer_dtype(dtype):
                # Типтерді Iceberg-пен үйлесімді форматқа түрлендіру
                prepared_df[col] = prepared_df[col].astype('int64')

            elif pd.api.types.is_float_dtype(dtype):
                prepared_df[col] = prepared_df[col].astype('float64')


            elif pd.api.types.is_bool_dtype(dtype):
                prepared_df[col] = prepared_df[col].astype('boolean')

            elif pd.api.types.is_datetime64_any_dtype(dtype):
                prepared_df[col] = prepared_df[col].astype('datetime64[us]')

        return prepared_df
    ```

### {heading(Схеманы құру)[id=jupyterhub_iceberg_data_schema_create]}

`create_pyarrow_scheme` функциясын жасаңыз және аргумент ретінде `pd.DataFrame` айнымалысын беріңіз (`prepare_dataframe_for_iceberg` функциясынан түрлендірілген датафрейм):

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

### {heading(Iceberg-кестесіне деректерді жазу)[id=jupyterhub_iceberg_data_append]}

1. Аргументтер ретінде мақсатты Iceberg-кестесін және `pd.DataFrame` айнымалысын беріп, `add_data_to_iceberg_table` функциясын жасаңыз:

    ```python
    def add_data_to_iceberg_table(table: Table, data_df: pd.DataFrame) -> None:
        # Iceberg үшін деректерді дайындау
        prepared_df = prepare_dataframe_for_iceberg(data_df)

        # PyArrow схемасын құру
        schema = create_pyarrow_scheme

        arrow_table = pa.Table.from_pandas(prepared_df, schema=schema)

        table.append(arrow_table)

        print(f"Кестеге {len(data_df)} жазба қосылды")
    ```
    Функцияны орындау нәтижесі — Iceberg-кестесіне қосылған жазбалар саны.

1. Қажетті кітапханаларды импорттап, каталог құрыңыз:

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
1. Егер бар болса, қолданыстағы кестені жойыңыз:

    ```python
    try:
        catalog.drop_table("metastore.test_table")
        print("Ескі кесте жойылды")
    except:
        print("Ескі кесте табылмады")
    ```

1. Тестілік деректер жасаңыз:

    ```python
    test_data = pd.DataFrame({
        'id': [1, 2, 3], 
        'name': ['Alice', 'Bob', 'Charlie'],
        'price': [10.5, 20.3, 30.1],
        'is_active': [True, False, True],
        'created_at': pd.to_datetime(['2024-01-01', '2024-01-02', '2024-01-03'])
    })
    ```

1. Кесте схемасын анықтаңыз:

    ```python
    schema = Schema(
        NestedField(1, "id", IntegerType(), required=False),
        NestedField(2, "name", StringType(), required=False),
        NestedField(3, "price", DoubleType(), required=False),
        NestedField(4, "is_active", BooleanType(), required=False),
        NestedField(5, "created_at", TimestampType(), required=False)
    )
    ```

1. Кестені құрып, оған деректерді қосыңыз:

    ```python
    try:
        table = catalog.create_table(
            "metastore.test_table",
            schema=schema,
            location=f"s3://{bucket_name}/metastore/test_table"
    )
        print("«metastore.test_table» кестесі сәтті құрылды!")

        # Деректерді қосу
        add_data_to_iceberg_table(table, test_data)

        except Exception as e:
            print(f"Кестені құру кезінде қате шықты: {e}")
    ```

1. Кестеге жаңа деректерді қосыңыз:

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

1. Кестеден барлық деректерді оқыңыз:

    ```python
    df_all = table.scan().to_pandas()
    print("Кестедегі барлық деректер:")
    print(df_all)
    ```
