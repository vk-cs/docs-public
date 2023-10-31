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
             SELECT id, the_geom FROM thetable              WHERE              the_geom && 'POLYGON((0 0, 0 10, 10 10, 10 0, 0 0))'              AND              _ST_Contains(the_geom,'POLYGON((0 0, 0 10, 10 10, 10 0, 0 0))');
```
