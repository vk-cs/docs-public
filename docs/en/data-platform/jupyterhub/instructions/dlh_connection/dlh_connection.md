# {heading(Working in DLH)[id=jupyterhub_dlh]}

{ifdef(public)}
{include(/en/_includes/_dp-unavailable.md)}
{/ifdef}

{include(/en/_includes/_translated_by_ai_en.md)}

To use JupyterHub in DLH, you need to configure a connection to Cloud Iceberg Metastore and S3.

All the necessary commands and code for configuring connections are contained in a [sample Jupyter notebook](./assets/iceberg.ipynb "download"). Download it and import it into your Jupyter notebook, or configure the connections yourself by following the instructions below.

{note:info}
Each step with code in this instruction can be performed in one or several cells of the Jupyter notebook code.
{/note}

## {heading(Preparing to configure connections)[id=jupyterhub_dlh_connection_preparation]}
1. Open JupyterHub.
1. Create a new Jupyter notebook and open it.
1. Update the package manager and install the pyiceberg library with additional packages. In a code cell, enter and run: `pip install --upgrade pip`.
1. In the top panel of the Jupyter notebook, click the ![Icon](./assets/jh_restart.svg "inline") icon to restart the kernel.

{note:info}
The JupyterHub service instance contains the necessary libraries and packages for working in DLH: pyiceberg, pandas, pyarrow, and boto3. To verify that the libraries are present, run the `pip list` command before configuring the connections. If any of the libraries is missing, install it with the `pip install <LIBRARY_NAME>` command.
{/note}

## {heading(Connecting to Cloud Iceberg Metastore)[id=jupyterhub_dlh_iceberg_connection]}

1. Open Data Platform and go to the **Service instances** section.
1. Click the name of the Cloud Iceberg Metastore service instance.
1. On the **General information** tab, copy the IP address from the **Iceberg Metastore bouncer connection string** field.
1. Return to the Jupyter notebook, define the variables in a code cell and specify the credentials in them:
   
    ```python
    uri = "postgres://<ЛОГИН>:<ПАРОЛЬ>@<IP-АДРЕС>:8001/<БД>"
    s3_bucket_name = "<БАКЕТ>"
    db_name = "<БД>"
    ```
   
    Where:
   
    - `<ЛОГИН>` — the user login specified when creating the Cloud Iceberg Metastore service instance;
    - `<ПАРОЛЬ>` — the user password specified when creating the Cloud Iceberg Metastore service instance;
    - `<IP-АДРЕС>` — the external IP address copied from the **Iceberg Metastore bouncer connection string** field;
    - `<БАКЕТ>` — the bucket name specified when creating the Cloud Iceberg Metastore service instance;
    - `<БД>` — the database name specified when creating the Cloud Iceberg Metastore service instance.

1. Enter and run the code that loads the catalog with data from S3, creates a namespace, and loads the tables:

   ```python
   from pyiceberg.catalog import load_catalog

# Loading the catalog
   catalog = load_catalog(
       "my_catalog",
       **{
           "type": "sql",
           "uri": uri,
           "warehouse": f"s3://{s3_bucket_name}/"
       }
   )

# Creating a namespace
   try:
       catalog.create_namespace(db_name)
       print(f"Namespace {db_name} created successfully!")
   except Exception as e:
       print(f"Error creating namespace: {e}")

# Viewing all namespaces
   catalog.list_namespaces()

# Viewing tables
   catalog.list_tables(db_name)
   ```

   {note:info}
   If an error occurred while connecting to Cloud Iceberg Metastore, check that the values in the variables are correct and restart the Jupyter notebook kernel.
   {/note}

## {heading(Connecting to S3)[id=jupyterhub_dlh_s3_connection]}

1. Create public and private access keys for S3.
1. In the current Jupyter notebook, define the variables in a code cell and specify the credentials in them:

    ```python
    uri = "postgres://<ЛОГИН>:<ПАРОЛЬ>@<IP-АДРЕС>:8001/<БД>"
    s3_bucket_name = "<БАКЕТ>"
    ENDPOINT = "https://hb.bizmrg.com"
    ACCESS_KEY = "<ПУБЛИЧНЫЙ_КЛЮЧ_ДОСТУПА_К_S3>"
    SECRET_KEY = "<ПРИВАТНЫЙ_КЛЮЧ_ДОСТУПА_К_S3>"
    ```

   Where:

    - `<ЛОГИН>` — the user login specified when creating the Cloud Iceberg Metastore service instance;
    - `<ПАРОЛЬ>` — the user password specified when creating the Cloud Iceberg Metastore service instance;
    - `<IP-АДРЕС>` — the external IP address copied from the **Iceberg Metastore bouncer connection string** field;
    - `<БАКЕТ>` — the bucket name specified when creating the Cloud Iceberg Metastore service instance;
    - `<БД>` — the database name specified when creating the Cloud Iceberg Metastore service instance.
1. Enter and run the code to verify the connection to S3 and output information about the bucket contents:

   ```python
   import boto3

# Checking the connection to S3
   try:
       s3_client = boto3.client(
           's3',
           endpoint_url=ENDPOINT,
           aws_access_key_id=ACCESS_KEY,
           aws_secret_access_key=SECRET_KEY
   )

# Checking access to the bucket
   response = s3_client.list_objects_v2(Bucket=s3_bucket_name, MaxKeys=1)
   print(f"Connection to S3 successful. Bucket: {s3_bucket_name}")
     
   if 'Contents' in response:
       print("Bucket is not empty")
       print("First objects:")
       for obj in response['Contents'][:3]:
           print(f"  - {obj['Key']}")
   else:
       print("Bucket is empty")

   except Exception as e:
       print(f"S3 connection error: {e}")
   ```

   {note:info}
   If an error occurred while connecting to S3, check that the values in the variables are correct and restart the Jupyter notebook kernel.
   {/note}

## {heading(Writing and reading data in Iceberg Metastore)[id=jupyterhub_iceberg_data]}

To write data to an Iceberg table, you need to:
1. {linkto(#jupyterhub_iceberg_data_dataframe_conversion)[text=Convert the data types]} of a pandas dataframe to a format compatible with Iceberg.
1. {linkto(#jupyterhub_iceberg_data_schema_create)[text=Create a schema]} based on the converted dataframe.
1. {linkto(#jupyterhub_iceberg_data_append)[text=Write the data]} to the Iceberg table.

### {heading(Converting a pandas dataframe)[id=jupyterhub_iceberg_data_dataframe_conversion]}

1. Import the necessary libraries:

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
   
1. Create the `prepare_dataframe_for_iceberg` function. The function takes the original pandas dataframe as an argument and returns a dataframe with converted data types:

    ```python
    def prepare_dataframe_for_iceberg(data_df: pd.DataFrame) -> pd.DataFrame:
        prepared_df = data_df.copy()
          
        for col in prepared_df.columns:
            dtype = prepared_df[col].dtype
              
            if dtype == 'object':
                prepared_df[col] = prepared_df[col].astype('string')
              
            elif pd.api.types.is_integer_dtype(dtype):

# Converting types to a format compatible with Iceberg
                prepared_df[col] = prepared_df[col].astype('int64')
       
            elif pd.api.types.is_float_dtype(dtype):
                prepared_df[col] = prepared_df[col].astype('float64')
              
      
            elif pd.api.types.is_bool_dtype(dtype):
                prepared_df[col] = prepared_df[col].astype('boolean')
              
            elif pd.api.types.is_datetime64_any_dtype(dtype):
                prepared_df[col] = prepared_df[col].astype('datetime64[us]')
          
        return prepared_df
    ```

### {heading(Creating a schema)[id=jupyterhub_iceberg_data_schema_create]}

Create the `create_pyarrow_scheme` function and pass a `pd.DataFrame` variable as an argument (the dataframe converted by the `prepare_dataframe_for_iceberg` function):

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

### {heading(Writing data to an Iceberg table)[id=jupyterhub_iceberg_data_append]}

1. Create the `add_data_to_iceberg_table` function and pass the target Iceberg table and a `pd.DataFrame` variable as arguments:

    ```python
    def add_data_to_iceberg_table(table: Table, data_df: pd.DataFrame) -> None:

# Preparing data for Iceberg
        prepared_df = prepare_dataframe_for_iceberg(data_df)

# Creating a PyArrow schema
        schema = create_pyarrow_scheme
         
        arrow_table = pa.Table.from_pandas(prepared_df, schema=schema)
     
        table.append(arrow_table)
     
        print(f"Added {len(data_df)} records to the table")
    ```
    The result of the function execution is the number of records added to the Iceberg table.

1. Import the necessary libraries and create a catalog:

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
1. Delete the existing table, if any:

    ```python
    try:
        catalog.drop_table("metastore.test_table")
        print("Old table deleted")
    except:
        print("Old table not found")
    ```

1. Create test data:

    ```python
    test_data = pd.DataFrame({
        'id': [1, 2, 3], 
        'name': ['Alice', 'Bob', 'Charlie'],
        'price': [10.5, 20.3, 30.1],
        'is_active': [True, False, True],
        'created_at': pd.to_datetime(['2024-01-01', '2024-01-02', '2024-01-03'])
    })
    ```

1. Define the table schema:

    ```python
    schema = Schema(
        NestedField(1, "id", IntegerType(), required=False),
        NestedField(2, "name", StringType(), required=False),
        NestedField(3, "price", DoubleType(), required=False),
        NestedField(4, "is_active", BooleanType(), required=False),
        NestedField(5, "created_at", TimestampType(), required=False)
    )
    ```

1. Create the table and add data to it:

    ```python
    try:
        table = catalog.create_table(
            "metastore.test_table",
            schema=schema,
            location=f"s3://{bucket_name}/metastore/test_table"
    )
        print("Table 'metastore.test_table' created successfully!")

# Adding data
        add_data_to_iceberg_table(table, test_data)

        except Exception as e:
            print(f"Error creating table: {e}")
    ```

1. Add new data to the table:

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
   
1. Read all data from the table:

    ```python
    df_all = table.scan().to_pandas()
    print("All data in the table:")
    print(df_all)
    ```