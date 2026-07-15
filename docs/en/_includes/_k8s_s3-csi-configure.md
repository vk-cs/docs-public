1. Edit if necessary:

   - selected version 
   - application name
   - the name of the namespace where the add-on will be installed

1. Configure the addon code to work with the S3-compatible storage. To do this, add the required values to the `secret` block:

   ```console
   secret:
    ...
    # S3 Access Key ID
    accessKey: "<ACCESS_KEY_ID>"
    # S3 Secret Key
    secretKey: "<SECRET_KEY>"
    # The endpoint of the S3 service to be used. You can provide a custom S3 endpoint address.
    # Defaults to the VK Object Storage URL.
    endpoint: "{{ <STORAGE_URL> }}"
    # The S3 service region to be used.
    region: "<REGION>"
   ```
   Here:

    - `<ACCESS_KEY_ID>` ans `<SECRET_KEY>` are the values you copied when creating the VK Object Storage account.
    - `<STORAGE_URL>` is the endpoint of the S3-compatible storage API. If you are using VK Object Storage, you do not need to specify this parameter, it is set by default.
    - `<REGION>` is the region of the object storage. If you are using VK Object Storage, you do not need to specify this parameter. For other object storages, refer to the official documentation of your vendor to learn whether this parameter is required.

1. If necessary, add other changes to the [add-on settings code](#edit-code).

   {note:warn}
   Incorrect configuration of the add-on code might lead to issues during the installation process or render the add-on inoperable.
   {/note}