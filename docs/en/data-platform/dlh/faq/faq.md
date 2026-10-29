# {heading(Frequently asked questions)[id=dlh_faq]}

{ifdef(public)}
{include(/en/_includes/_dp-unavailable.md)}
{/ifdef}

{include(/en/_includes/_translated_by_ai_en.md)}

{cut(Which tools should be used for data ingestion?)}

The choice of tools depends on the selected {linkto(../concepts/architecture#dlh_data_processing_models)[text=data ingestion model]}

[cols="1,1", options="header"]
|===
|Model
|Tools

|PULL model
|{linkto(../concepts/components/airflow#dlh_airflow)[text=Cloud Airflow]}, {linkto(../concepts/components/spark#dlh_spark)[text=Cloud Spark]} (batch processing), {linkto(../concepts/components/trino#dlh_trino)[text=Cloud Trino]}

|PUSH model
|{linkto(../concepts/components/spark#dlh_spark)[text=Cloud Spark]} (stream processing)

|===

{/cut}

{cut(What are the advantages and disadvantages of the PULL model?)}

The main advantage of ingesting data using the PULL model is that data is requested on demand, when it is actually needed.

Disadvantages:

- Delayed data delivery to the storage, since data is updated only on schedule or manually.
- Risk of overloading the source, since constant data requests can slow down the system.

For more details on the specifics of the PULL model, see the {linkto(../concepts/architecture#dlh_data_processing_models)[text=DLH architecture article]}.

{/cut}

{cut(What are the advantages and disadvantages of the PUSH model?)}

The main advantage of ingesting data using the PUSH model is that there is no need to request data — it arrives without delays in real time.

The main disadvantage is the need to develop a component for sending data (Producer API) when connecting a new data source to the storage. This increases integration costs.

For more details on the specifics of the PUSH model, see the {linkto(../concepts/architecture#dlh_data_processing_models)[text=DLH architecture article]}.

{/cut}

{cut(What is the main difference between Cloud Spark and Cloud Trino?)}

The main difference lies in their purpose and the way they process data.

[cols="1,1,1", options="header"]
|===
|Criterion
|Cloud Spark
|Cloud Trino

|Data processing model
|PULL model (batch processing), PUSH model (stream processing, micro-batches)
|PULL model

|Resource intensity
|Requires long-lived clusters
|Temporary resource allocation — worker nodes (Workers) are automatically removed after processing is completed

|Data handling
|Can modify data
|Does not modify the source data

|Tasks
|Used for complex ETL and ELT processes
|Specializes in optimizing and executing SQL queries

|Primary purpose
|Machine learning
|Interactive analytics

|===

In the Data Lakehouse, the {linkto(../concepts/components/spark#dlh_spark)[text=Cloud Spark]} and {linkto(../concepts/components/trino#dlh_trino)[text=Cloud Trino]} components complement each other: Spark prepares the data, while Trino provides fast access to it.

{/cut}