DB additions can significantly expand the functionality of the database as a service. For example, add monitoring, geographical objects, and cryptography.

Extensions are installed in [VK Cloud personal account](https://mcs.mail.ru/app/services/databases/). To do this, go to the "Databases" --> "Database Instances" section.

Click on the database where you want to install extensions. Go to the "Extensions" tab and click on the "Add" button.

In the window that opens, select the necessary extensions and click "Add".

After that, the installation of extensions will begin and they will appear in the list of installed ones.

## Postgis Extension

PostGIS is an extension of the PostgreSQL object-relational DBMS designed for storing geographical data in a database. PostGIS includes support for R-tree/essence spatial indexes and geodata processing functions, as well as optional extensions for working with addresses and topology.

After adding this extension to the database, you can work with it with specialized queries. The full list of requests and other useful information can be found on the [official resource](https://gis-lab.info/docs/postgis/manual/postgis-manual-ru-1.3.4.pdf).

### Available types of geometric objects

You have access to point, line, polygon, multipoint, multiline, multi polygon, and geometry collections (point, line, polygon, multipoint, multiline, multi polygon, and geometric collection). They are defined in a well-known Textual Open GIS format with extensions XYZ, XYM, and XYZM.

### How to build a spatial query?

which will contain your GIS, you must create a table with a column of type _geometria_, which will include your GIS data. Connect to your database using PSQL and execute SQL:

```
             CREATE A gtest TABLE ( ID int4, NAME varchar(20) ); SELECT AddGeometryColumn(", 'gtest','geom', -1,'LINESTRING',2);
```

If the geometry failed to add a column, then you probably haven't loaded functions and objects from PostGIS into your database. See the installation instructions.

Next, you can insert the geometry into the table using the SQL command _insert_. The GIS object will be formatted according to the format of the well-known text of the OpenGIS Consortium:

```
INSERT INTO gtest (ID, NAME, GEOM) VALUES (1, 'First Geometry', GeomFromText('LINESTRING(2 3,4 5,6 5,7 8)', -1) );
```

Detailed information about other GIS objects can be found in the object directory. Viewing your GIS data in a table:

```
SELECT ID, name, AsText(geom) AS geom FROM gtest;
```

The result should look something like this:

```
ID | name | Geom ---+------------------+----------------------------- 1 | First geometry | line(2 3,4 5,6 5,7 8) (1 row)
```

### How to insert a GIS object into a database?

Like you build other database queries using the SQL query environment to get values, functions, and logic tests.

When building spatial queries, you should take into account:

- is there a spatial index that can be used;
- whether it is necessary to perform complex calculations on a large number of geometries.

Most often you will need an "intersection operator" (&&), which checks whether the boundaries of objects intersect. The benefit of the && operator is that it can use a spatial index if it exists. This will speed up the execution of the request.

In addition, you can use spatial functions such as Distance(), ST_Intersects(), ST_Contains() and ST_Within() and others to narrow the search results. Most spatial queries include an index test and a spatial function test. The index test is useful because it limits the number of value checks to those that can fall into the required set. Next, spatial functions are used for the final verification of the condition.

```
             SELECT THE ID, the_geom FROM THE table WHERE the_geom &&'POLYGON((0 0, 0 10, 10 10, 10 0, 0 0))'              and _ST_Contains(the_geom,'POLYGON((0 0, 0 10, 10 10, 10 0, 0 0))');
```

#### Table of additions

|Name|Description|
|---|---|
|[`address_standardizer`](https://postgis.net/docs/manual-2.5/Address_Standardizer.html )|Address normalizer.|
|[`address_standardizer_data_us`](https://postgis.net/docs/manual-2.5/Address_Standardizer.html )|Address normalizer for the USA.|
|[`postgis_tiger_geocoder`](https://postgis.net/docs/manual-2.5/Extras.html )|An add-on for working with TIGER (Topologically integrated geographic coding and binding system).|
|`postgis_topology`|Add—on for working with topology - vertices, faces, polygons, etc./
|[`pgrouting`](https://pgrouting.org /)|An extension for finding the shortest path.|

#### Parameters applicable in VK Cloud infrastructure:

|Name|Description|
|---|---|
|`database`/A list of databases on which to deploy the extension. Deleting databases from this list for an installed extension is not supported.|
|`extension_list`|The list of extensions to enable (empty by default). Removing parameters from this list for an installed extension is not supported.|
