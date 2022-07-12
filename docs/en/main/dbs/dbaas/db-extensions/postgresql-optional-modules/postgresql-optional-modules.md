Database additions can significantly expand the functionality of the database as a service. For example, add monitoring, cryptography, additional data types, and much more.

When installing the Postgres Extensions extension, you can choose which add-ons will be installed.

### User parameters

- **database** — the name of the databases for which the extension will be installed. Deleting databases from this list for an installed extension is not supported.
- **extension_list** — list of add-ons to install. If the parameter is omitted, all available add-ons will be installed. Removing parameters from this list for an installed extension is not supported.

Add-ons available for installation:

|Name|Description|
|----------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| dblink | The module provides the ability to connect to other PostgreSQL databases within a database session.                                    |
| dict_int | The module provides an example of a dictionary template for a full-text search.                                                                       |
| dict_xsyn | The module provides a dictionary template for full-text search.                                                                              |
| earthdistance | The module provides methods for calculating the distance between points on the Earth's surface.                                                         |
| fuzzystrmatch | The module provides methods for determining similarity and distance between strings.                                                             |
| hstore | The module provides a data type for storing key/value pairs within a single PostgreSQL value.                                          |
| intarray | The module provides useful functions and operators for working with arrays of integers without NULL.                                                |
| isn | The module provides data types for international product numbering standards.                                                              |
| lo | The module provides support for managing Large Objects.                                                                 |
|ltree | The module provides a data type for storing data labels in a hierarchical tree structure.                                              |
| moddatetime | The module provides functions for tracking the time of the last change.                                                                   |
| pg_buffercache | The module provides a means to check what is happening in the shared cache of real-time buffers.                                        |
| pgcrypto | The module provides cryptographic functions for PostgreSQL.                                                                                |
| pg_trgm | The module provides functions and operators for determining the similarity of alphanumeric text based on the trigram method.                  |
| pgrowlocks | The module provides a function to show information about locking rows in the specified table.                                                    |
| pgstattuple | The module provides functions for determining statistics at the tuple level.                                                                   |
| postgres_fdw | The module provides a third-party data wrapper that can be used to access data stored on external PostgreSQL servers.    |
 The |seg| module provides a data type for representing segments or intervals of floating-point numbers.                                           |
| tablefunc | The module provides various functions that return tables.                                                                                 |
| uuid-ossp | The module provides functions for generating universal unique identifiers (UUIDs) using one of the standard algorithms. |
| xml2 | The module provides functionality for XPATH and XSLT queries.                                                                              |

<warn>

When installing the _earthdistance_ add-on, the cube add-on will be installed, which is required for the first one to work. At the same time, the _cube_ add-on, if it was not specified for manual installation, may not be displayed in the list of add-ons.

The pgcrypto and _uuid-ossp_ extensions exist as separate extensions. It is not recommended to install them separately, as they will be removed soon. To install these add-ons, use the _postgres_extensions_ extension.

</warn>
