# {heading(Cloud Airflow)[id=dlh_airflow]}

{include(/en/_includes/_translated_by_ai_en.md)}

{linkto(../../../../airflow/concepts/about#airflow_info)[text=Cloud Airflow]} is a data flow orchestrator and a tool for managing the launch of ETL and ELT processes for high-performance, scalable real-time applications. It is optionally included in the DLH architecture when integration of the data warehouse with data sources is needed via the {linkto(../../architecture#dlh_data_processing_models)[text=PULL model]}.

The component performs the following functions:

- Managing the launch of ETL and ELT processes in DLH.
- Integrating unstructured data sources directly with the S3 storage in file exchange mode.
- Creating a schedule for periodic IN or OUT operations.
- Monitoring the execution of ETL and ELT processes and sending diagnostic messages.
- Reading data from the S3 storage via the API of the {linkto(../iceberg#dlh_iceberg)[text=Cloud Iceberg Metastore]} component.