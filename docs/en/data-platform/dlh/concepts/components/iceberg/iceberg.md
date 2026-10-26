# {heading(Cloud Iceberg Metastore in the Data Lakehouse architecture)[id=dlh_iceberg]}

{include(/en/_includes/_translated_by_ai_en.md)}

{linkto(../../../../iceberg-metastore/concepts/about#iceberg_info)[text=Cloud Iceberg Metastore]} is the DLH data catalog that defines the representation of the object structure and the rules (interfaces) for accessing the S3 storage data, to organize interaction between the storage and external services. It is the preferred option for use in DLH, since the open table format enables high-performance reading of huge volumes of data from the storage through complex analytical SQL queries.

The component performs the following functions:

- Catalogs the objects of the S3 storage.
- Contains the schema, table structure, and the location of datasets in the DLH storage.
- Builds a representation of DLH objects as datasets, including information about their location and column-wise structure, names, data types, etc.
- Defines a structure similar to relational databases on top of the file storage, enabling several applications to jointly and uniformly use the objects of the S3 storage.
- Ensures consistent data processing results across different applications and simplifies data management.
- Maintains a complete history of operations with tables, including changes to the data schema and the objects themselves, as well as serializable isolation, snapshot-based time travel, and predictable schema evolution features.
- Allows external applications to work directly with tables in the DLH storage, which reduces processing costs by leveraging the advantages of the DLH architecture and significantly increases computation speed, since all applications can work with datasets right in place without transferring them between several separate and closed systems.
- Provides the ability to modify existing data, including update and delete operations.
- Guarantees the safety of concurrent writes to the same dataset without the risk of data loss.
- Helps avoid degradation when executing SQL queries as the volume of data in the S3 storage grows.