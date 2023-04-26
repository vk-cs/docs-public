A Keystone token is required to access the API and resources of the VK Cloud platform.

To get an access token:

1. Go to your VK Cloud [personal account](https://mcs.mail.ru/app/en/main).
1. Make sure that [two-factor authentication](/en/base/account/instructions/account-manage/security#vklyuchenie-2fa) and [API access](/en/base/account/instructions/account-manage/security#dostup-po-api) are enabled.
1. Select the project where you need to use the token.
1. Get the project and user data for whom the token should be generated

   1. In your personal account, go to the [Project Settings](https://mcs.mail.ru/app/en/mainproject/keys/) section.
   1. Click **Download openrc version 3**. A file with the name `<project name>-openrc.sh` will be uploaded.

1. Load the data obtained in the previous step into the environment variables.

   <tabs>
   <tablist>
   <tab>Linux</tab>
   <tab>Windows</tab>
   </tablist>
   <tabpanel>

   1. Execute the downloaded file:

      ``` bash
      source <project name>-openrc.sh
      ```

   1. Enter the password of the project user.

   </tabpanel>
   <tabpanel>

   1. Open the downloaded file in a text editor and copy the parameter values from it.
   1. Load the copied parameters into the environment variables. Also load the OS\_PASSWORD variable.

      ``` powershell
      set OS_PROJECT_ID=<OS_PROJECT_ID>
      set OS_REGION_NAME=<OS_REGION_NAME>
      set OS_USER_DOMAIN_NAME=<OS_USER_DOMAIN_NAME>
      set OS_USERNAME=<OS_USERNAME>
      set OS_PASSWORD=<user password>
      ```

   </tabpanel>
   </tabs>

1. Get a token using one of the following methods.

   - Using the OpenStack CLI:

      1. Make sure you have the OpenStack client [installed](/en/base/account/project/cli/setup).
      1. Execute the command:

         ```
         openstack token issue -c id -f value
         ```

         The token value will be output to the console.

   - Use the cURL [utility](https://github.com/curl/curl/blob/master/docs/INSTALL.md):

      <tabs>
      <tablist>
      <tab>Linux</tab>
      <tab>Windows</tab>
      </tablist>
      <tabpanel>

      ```bash
      curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
          "auth": {
              "identity": {
                  "methods": [
                      "password"
                  ],
                  "password": {
                      "user": {
                          "domain": {
                              "id": "'$OS_USER_DOMAIN_NAME'"
                          },
                          "name": "'$OS_USERNAME'",
                          "password": "'$OS_PASSWORD'"
                      }
                  }
              },
              "scope": {
                  "project": {
                      "id": "'$OS_PROJECT_ID'",
                      "region": "'$OS_REGION_NAME'"
                  }
              }
          }
      }' \
      -i "https://infra.mail.ru:35357/v3/auth/tokens"
      ```

     </tabpanel>
     <tabpanel>

     ``` bash
      curl -X POST ^
      -H "Content-Type: application/json" ^
      -d "{\"auth\": {\"identity\": {\"methods\": [\"password\"], \"password\": {\"user\": {\"domain\": {\"id\": \"%OS_USER_DOMAIN_NAME%\"}, \"name\": \"%OS_USERNAME%\",\"password\": \"%OS_PASSWORD%\"}}}, \"scope\": {\"project\": {\"id\": \"%OS_PROJECT_ID%\"}}}}" ^
      -i "https://infra.mail.ru:35357/v3/auth/tokens"
      ```

      </tabpanel>
      </tabs>

     The token value will be output in the `X-Subject-Token` parameter.

      <details>
      <summary markdown="span">Example of a response to a request to get a token</summary>

      ``` bash
      HTTP/1.1 201 Created

      date: Wed, 18 Jan 2023 15:02:04 GMT
      server: Apache/2.4.6 (CentOS) mod_wsgi/3.4 Python/2.7.5

      X-Subject-Token: XXXXXXXXXnsH_iUvos_UFSveInsHgPAKnBefJn_TghGVIBjDEDo4vLYU9xWnDrVIBp3el87i5vtrknja14Gcgc9uTgXdRyr3hm8isz8iAPp5FEq27-WLZQAwfhCfGB4sNdlpAjWYZrNYmUbglgqzoTqqwQXXXXXXX

      vary: X-Auth-Token
      x-openstack-request-id: req-7de8bc92-0000-0000-0000-906e6e63f956
      content-length: 322
      content-type: application/json
      set-cookie: PROXYSRV_ADMIN=acadfd0285XXXXXX|XXXXX|XXXXX; path=/; Secure
      connection: close

      {"token": {"issued_at": "2023-01-18T15:02:04.000000Z", "audit_ids": ["XXXX-iu5TeiUOU66VNO_-g"], "methods": ["password"], "expires_at": "2023-01-18T16:02:04.000000Z", "user": {"password_expires_at": null, "domain": {"id": "users", "name": "users"}, "id": "00000000000000XXX", "name": "example@example.ex"}}}
      ```

      </details>

<warn>

The received token is valid for one hour.

</warn>

## Usage example for the token

Task: to get a list of networks via the REST API (Neutron service).

1. In your personal account, [find](https://mcs.mail.ru/app/en/mainproject/endpoints) the endpoint for the Neutron service. For this example it is `https://infra.mail.ru:9696`.
1. Get the token and copy its value.
1. Execute the command using the cURL utility:

   ``` bash
   curl https://infra.mail.ru:9696/v2.0/networks -H "Accept: application/json" -H "X-Auth-Token: <token generated in the previous step>"
   ```

   <details>
   <summary markdown="span">An example of the result</summary>

   ``` json
   {
        "networks": [
            {
                "ipv6_address_scope": null,
                "dns_domain": null,
                "revision_number": 6,
                "port_security_enabled": true,
                "id": "0e4d7c1e-ba20-0000-0000-7623648487a6",
                "router:external": false,
                "availability_zone_hints": [],
                "availability_zones": [
                    "nova"
                ],
                "ipv4_address_scope": null,
                "shared": false,
                "project_id": "b5b7ffd4ef0547e5b222f44500000000",
                "status": "ACTIVE",
                "subnets": [
                    "5ab0164b-2528-0000-0000-b2a8d5e62661"
                ],
                "private_dns_domain": "mcs.local.",
                "description": "",
                "tags": [],
                "updated_at": "2022-11-22T07:24:53Z",
                "name": "demoNet2",
                "admin_state_up": true,
                "tenant_id": "b5b7ffd4ef0547e5b222f44500000000",
                "created_at": "2022-11-22T07:24:51Z",
                "mtu": 1500,
                "sdn": "neutron"
            },
        ]
   }
   ```

   </details>

Other examples of token usage:

- [viewing logs](/ru/manage/logging/start/view-logs) in the Cloud Logging service;
<!-- @TODO change for EN version -->
- [working](/ru/additionals/api/api-dns) with public DNS.
