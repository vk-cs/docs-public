**pgBadber** is a program for analyzing PostgreSQL logs to detect potential database problems. The extension generates reports in HTML format at regular intervals and stores them in object storage. Users can also set up report rotation.

More information about using the extension can be found on the extension [documentation page](https://github.com/darold/pgbadger).

#### Parameters applicable in VK Cloud infrastructure:

| Name                         | Description                                                                                                                                                                            | Example                       |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `period`                     | Report generation frequency (in hours), default is 24 hours.                                                                                                                           | `--period="24"`               |
| `s3_bucket`                  | Name of an existing object storage bucket into which reports will be stored. The reports will be stored in subfolders of the bucket, named after the id of the corresponding instance. | `--s3_bucket="pdbadger_logs"` |
| `log_min_duration_statement` | Minimum duration of a logged SQL query (in milliseconds). Default - 0 (log all requests), -1 - do not log                                                                              |
| nothing.                     | `--log_min_duration_statement="0"`                                                                                                                                                     |
| `log_rotation`               | How many days to keep logs, older logs will be deleted. The default is 0 (do not delete anything).                                                                                     | `--log_rotation="0"`          |
