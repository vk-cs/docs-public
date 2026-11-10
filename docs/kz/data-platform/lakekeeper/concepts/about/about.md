# {heading(Сервис туралы)[id=lakekeeper_info]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{ifdef(public)}
{include(/kz/_includes/_dp-unavailable.md)}
{/ifdef}

Lakekeeper — Data Lakehouse үшін деректер каталогы (data catalog), Apache Iceberg REST Catalog API негізінде іске асырылған. Каталог кеңістіктерге (namespace) топтастырылған кестелер жинақтарын басқарады. Lakekeeper туралы толығырақ [ресми құжаттамадан](https://docs.lakekeeper.io/docs/nightly/concepts/) қараңыз.

Сервис Data Lakehouse-тің басқа компоненттеріне ({linkto(../../../spark/concepts/about#spark_info)[text=Cloud Spark]}, {linkto(../../../trino/concepts/about#trino_info)[text=Cloud Trino]}, {linkto(../../../iceberg-metastore/concepts/about#iceberg_info)[text=Cloud Iceberg Metastore]}) біртұтас каталог арқылы деректерге қол жеткізуге мүмкіндік береді.

Сервисді пайдаланудың мүмкін сценарийлері:

- Data Lakehouse-тегі кестелер жинақтарын және олардың метадеректерін біртұтас каталог арқылы орталықтандырылған басқару.
- Деректерді өңдеудің әртүрлі құралдары арасында деректер үйлесімділігін қамтамасыз ету.
- Деректер схемаларының нұсқалығын бақылау және өзгерістерді қадағалау.