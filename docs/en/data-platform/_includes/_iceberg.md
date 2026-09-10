{includetag(open)}

{ifdef(public)}
1. [Go](https://msk.cloud.vk.ru/app/) to the {var(cloud)} management console.
{/ifdef}

1. Go to the **Data Platform → Service instances** section.
1. Click the name of the required instance.

{/includetag}

{includetag(login)}

Login requirements:

- Only digits, Latin letters, and the `_` character are allowed.
- The first character must be a Latin letter of any case or `_`.
- Disallowed names: `os_admin`, `root`, `dataplatform_moth`.

{/includetag}


{includetag(password)}

Password requirements:

- at least 16 characters;
- at least one uppercase and one lowercase letter of the Latin alphabet;
- at least one digit;
- at least one of the characters: `!`, `?`, `%`, `#`, `/`, `(`, `)`, `-`, `+`, `*`.

{note:warn}
Save the password. Password recovery is not supported.
{/note}

{/includetag}


{includetag(maintenance)}

1. Select the days of the week and the start time of maintenance, considering the time zone specified in the block.

   The duration of maintenance, including backup, is 4 hours. During this time, the service may be unavailable.

1. Set the maximum number of full backups. This number depends on the data archival retention requirements or may be dictated by regulatory requirements. When the maximum number is exceeded, older backups will be overwritten.

   A full backup includes files, databases, settings, and configurations necessary to restore the system in case of failure, data loss, or other issues.
{/includetag}

   
