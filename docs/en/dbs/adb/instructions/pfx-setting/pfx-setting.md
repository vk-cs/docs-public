# {heading(Setting up ADB connections)[id=adb-pfx-setting]}

{include(/en/_includes/_translated_by_ai_en.md)}

## {heading(Adding a PXF connection)[id=adb-pfx-add-pxf]}

A PXF connection allows Arenadata DB to work with external data sources. These can be both third-party DBMSs and data in text and binary formats.

{tabs}

{tab(Личный кабинет)}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Go to the **Аналитические БД → Инстансы АБД** section.
1. Click the name of the desired ADB instance.
1. On the **PXF подключения** tab, click the **Добавить PXF подключение** button.
1. In the **Подключение** field, select the desired connection type and set the corresponding parameters:

    {tabs}
    
    {tab(S3)}
        
    - **Название PXF подключения**: enter the PXF connection name.
    - **Бакет S3**: select a VK Object Storage bucket or [create a new bucket](../../../../storage/s3/instructions/buckets/create-bucket).

        The bucket name must comply with the [recommended rules](../../../../storage/s3/concepts/about).

        The bucket name cannot be changed after creation.

    - **Путь внутри бакета**: specify the path inside the bucket in the `/folder1/` format.

        This directory can contain files in text and binary formats [supported by the Greenplum kernel](https://techdocs.broadcom.com/us/en/vmware-tanzu/data-solutions/tanzu-greenplum-platform-extension-framework/7-0-0/gp-pxf/nfs_pxf.html).

    - **S3 Access Key ID**: specify the access key identifier.
    - **S3 Secret Key**: specify the secret access key.

    {/tab}
    
    {tab(Kafka)}
    
    - **Название PXF подключения**: enter the PXF connection name.
    - **Bootstrap Servers**: specify the list of Kafka brokers separated by commas in the `<HOST_NAME>:<PORT>` or `<IP_ADDRESS>:<PORT>` format.
    - **Kafka-Топик**: specify the Kafka topic name.

    {/tab}
    
    {tab(Hive)}
    
    - **Название PXF подключения**: enter the PXF connection name.
    - **Hostname**: enter the name of the Hive host for which the PXF connection will be added.
    - **Порт**: specify the port number for the Hive host. The default value is `10000`.
    - **Наименование базы данных**: enter the name of the database you want to connect as a source.
    - **Логин**: enter the database administrator login.
    - **Пароль**: enter the database administrator password.

    {/tab}
    
    {tab(Postgres)}
    
    - **Название PXF подключения**: enter the PXF connection name.
    - **Hostname/IP**: enter the name or IP address of the Postgres host for which the PXF connection will be added.
    - **Порт**: specify the port number for the Postgres host. The default value is `5432`.
    - **Наименование базы данных**: enter the name of the database you want to connect as a source.
    - **Логин**: enter the database administrator login.
    - **Пароль**: enter the database administrator password.
    - **TLS-сертификат**: enter the TLS certificate in the PEM format. Using a TLS certificate helps protect data during transmission and improve connection security.

    {/tab}

    {/tab}
    
    {tab(Clickhouse)}
    
    - **Название PXF подключения**: enter the PXF connection name.
    - **Hostname/IP**: enter the name or IP address of the Clickhouse host for which the PXF connection will be added.
    - **Порт**: specify the port number for the Clickhouse host. The default value is `8123`.
    - **Наименование базы данных**: enter the name of the database you want to connect as a source.
    - **Логин**: enter the database administrator login.
    - **Пароль**: enter the database administrator password.
    - **TLS-сертификат**: enter the TLS certificate in the PEM format. Using a TLS certificate helps protect data during transmission and improve connection security.

    {/tab}
    
    {tab(HDFS)}
    
    - **Название PXF подключения**: enter the PXF connection name.
    - **Hostname/IP**: enter the name or IP address of the HDFS host for which the PXF connection will be added.
    - **Порт**: specify the port number for the HDFS host. The default value is `8020`.

    {/tab}

    {tab(Oracle)}
    
    - **Название PXF подключения**: enter the PXF connection name.
    - **Hostname/IP**: enter the name or IP address of the Oracle DB host for which the PXF connection will be added.
    - **Порт**: specify the port number for the Oracle DB host. The default value is `1521`.
    - **Наименование базы данных**: enter the name of the database you want to connect as a source.
    - **Логин**: enter the database administrator login.
    - **Пароль**: enter the database administrator password.
    - **TLS-сертификат**: enter the TLS certificate in the PEM format. Using a TLS certificate helps protect data during transmission and improve connection security.

    {/tab}

    {tab(MS SQL)}
    
    - **Название PXF подключения**: enter the PXF connection name.
    - **Hostname/IP**: enter the name or IP address of the MS SQL host for which the PXF connection will be added.
    - **Порт**: specify the port number for the MS SQL host. The default value is `1433`.
    - **Наименование базы данных**: enter the name of the database you want to connect as a source.
    - **Логин**: enter the database administrator login.
    - **Пароль**: enter the database administrator password.
    - **TLS-сертификат**: enter the TLS certificate in the PEM format. Using a TLS certificate helps protect data during transmission and improve connection security.

    {/tab}

    {tab(MySQL)}
    
    - **Название PXF подключения**: enter the PXF connection name.
    - **Hostname/IP**: enter the name or IP address of the MySQL host for which the PXF connection will be added.
    - **Порт**: specify the port number for the MySQL host. The default value is `3306`.
    - **Наименование базы данных**: enter the name of the database you want to connect as a source.
    - **Логин**: enter the database administrator login.
    - **Пароль**: enter the database administrator password.
    - **TLS-сертификат**: enter the TLS certificate in the PEM format. Using a TLS certificate helps protect data during transmission and improve connection security.

    {/tab}

    {/tabs}

1. Click the **Добавить** button.

{/tab}

{/tabs}

## {heading(Viewing PXF connections)[id=adb-pfx-view-pxf]}

{tabs}

{tab(Личный кабинет)}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Go to the **Аналитические БД → Инстансы АБД** section.
1. Click the name of the desired ADB instance, and then select the **PXF подключения** tab.

    A list of PXF connections with the specified profile type will be displayed.

1. Click the connection name to view detailed information about its parameter values.

{/tab}

{/tabs}

## {heading(Deleting a PXF connection)[id=adb-pfx-delete-pxf]}

{tabs}

{tab(Личный кабинет)}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Go to the **Аналитические БД → Инстансы АБД** section.
1. Click the name of the desired ADB instance, and then select the **PXF подключения** tab.
1. Click ![](../../../../assets/more-icon.svg "inline") for the desired connection and select the **Удалить** option.
1. Confirm the deletion.

{/tab}

{/tabs}