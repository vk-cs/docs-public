To migrate data from a local database to the cloud, you need to complete three steps:

- Select the connector type for the database
- Connect to the instance
- Upload your data

## Selecting the connector type

The connector type is selected depending on which local applications are installed and used. Below is an example of a connector for Python:

```python
from pymongo import MongoClient

client = MongoClient("mongodb://<USERNAME>:<PASSWORD>@172.00.0.0")

db = client.<DATABASE>
```

## Connecting to the instance

To view the connection methods for the instance, click the instance name in the list of virtual machines, or hover over the information icon (**i**).

The instance card displays all the necessary information.

The **Connection parameters** section provides code examples in popular languages.

When using the examples, replace the `<DATABASE>`, `<USERNAME>`, `<PASSWORD>` placeholders with the actual values:

- `<DATABASE>` - the database name specified during creation.
- `<USERNAME>` - the username (specified during creation).
- `<PASSWORD>` - the user password (specified during creation).

For more information, see the documentation for the connector you are using (a connector is the entity through which the connection to the database is established).

## Uploading data

Below is an example of code for uploading data to an SQL database using PHP:

```php
<?php$servername = "mysql.hostinger.co.uk";$database = "u266072517\_name";$username = "u266072517\_user";$password = "buystuffpwd";// **Establishing the connection**$conn = mysqli\_connect($servername, $username, $password, $database);// **Checking the connection**if (!$conn) {die("Connection failed: " . mysqli\_connect\_error()); }echo "Connected successfully";$sql = "INSERT INTO Students (name, lastname, email) VALUES ('Test', 'Testing', 'Testing@tesing.com')";if (mysqli\_query($conn, $sql)) {      echo "New record created successfully";} else {      echo "Error: " . $sql . "<br>" . mysqli\_error($conn);}mysqli\_close($conn);?>
```

### Important

You cannot directly restore a local database dump in VK Cloud. You can only transfer the data using connectors as described in the instructions above.
