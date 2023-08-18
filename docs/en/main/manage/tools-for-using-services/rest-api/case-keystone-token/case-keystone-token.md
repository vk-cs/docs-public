A Keystone token is required to work with some components and resources of the VK Cloud platform via their API. The examples of such are the Virtual networks (Neutron) service and the backups component of the Cloud computing service.

## Preparatory steps

1. Go to your VK Cloud [personal account](https://mcs.mail.ru/app/en/main).
1. Make sure that [two-factor authentication](/en/base/account/instructions/account-manage/manage-2fa) and [API access](/en/manage/tools-for-using-services/rest-api/enable-api) are enabled.
1. At the top of your personal account page, select the project for which you need a token.

## Token generation

<warn>

A generated token is valid for one hour. All generated tokens remain valid for their lifetime.

</warn>

Get a token:

<tabs>
<tablist>
<tab>Personal account</tab>
<tab>OpenStack CLI</tab>
<tab>cURL</tab>
</tablist>
<tabpanel>

1. On the [Project settings](https://mcs.mail.ru/app/en/project/keys/) page of the personal account, open the **API access** tab.

    A new token is generated automatically when you open the page. If the page remains open, the token is automatically regenerated once in an hour.

1. In the lower part of the page, click on the ![Copy](./assets/copy-icon.svg "inline") icon next to the **API access token** parameter. The token will be copied to clipboard.

    The token lifetime is shown when you hover your mouse over the ![Copy](./assets/copy-icon.svg "inline") icon. If the token expires soon, use the **Reissue** button.

</tabpanel>
<tabpanel>

1. Make sure you have the OpenStack client [installed](/en/manage/tools-for-using-services/openstack-cli#1_install_the_openstack_client) and [authenticate yourself](/en/manage/tools-for-using-services/openstack-cli#3_complete_authentication) in the project.

1. Execute the command:

    ```
    openstack token issue -c id -f value
    ```

    The token value will be output to the console.

</tabpanel>
<tabpanel>

1. Install the cURL [utility](https://github.com/curl/curl/blob/master/docs/INSTALL.md), if not already installed.

1. [Authenticate yourself](/en/manage/tools-for-using-services/openstack-cli#3_complete_authentication) in the project. The authentication procedure is the same for OpenStack client and for cURL utility.

1. Perform the command for your operating system:

    <tabs>
    <tablist>
    <tab>Linux</tab>
    <tab>Windows (cmd)</tab>
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
    -i "https://infra.mail.ru:35357/v3/auth/tokens" | grep -i '^x-subject-token'| cut -d ':' -f 1,2
    ```

    </tabpanel>
    <tabpanel>

    ``` bash
    curl -X POST ^
    -H "Content-Type: application/json" ^
    -d "{\"auth\": {\"identity\": {\"methods\": [\"password\"], \"password\": {\"user\": {\"domain\": {\"id\": \"%OS_USER_DOMAIN_NAME%\"}, \"name\": \"%OS_USERNAME%\",\"password\": \"%OS_PASSWORD%\"}}}, \"scope\": {\"project\": {\"id\": \"%OS_PROJECT_ID%\"}}}}" ^
    -i "https://infra.mail.ru:35357/v3/auth/tokens" | findstr /B x-subject-token | findstr x-subject-token
    ```
    </tabpanel>
    </tabs>

The token value will be output in the `x-subject-token` parameter.

<details>
<summary markdown="span">Examples of responses to a token generation request</summary>

<tabs>
<tablist>
<tab>Linux</tab>
<tab>Windows (cmd)</tab>
</tablist>
<tabpanel>

```bash
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 27038  100 26470  100   568  99259   2129 --:--:-- --:--:-- --:--:-- 99138
x-subject-token: gAAAAABkirBWYerPg-2A_W0blpcg_qcmTck9K3cC1zf4JUnP3lnpq-bf3W_AXbMx8wDd7PNO704lf00QX3--BRvFB-UcI5IQq5GtVNVzkHoqem4Ocg_-fmRgCdtSSrKvw_KqjpxoksOi2EocauqogKJebeYgAoheSMEnrSz4G70OrTHwUmhI4z0
```
</tabpanel>
<tabpanel>

```bash
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   230    0     0  100   230      0    920 --:--:-- --:--:-- --:--:--   923FINDSTR: Слишком длинная строка 12.
FINDSTR: Line 12 is too long.
100 26700  100 26470  100   230  49114    426 --:--:-- --:--:-- --:--:-- 49628
FINDSTR: Line 12 is too long.
x-subject-token: gAAAAABkirQja1Lgr9psuyf6fC6e3Sy5WMYubpmwMNPXuT6APQkf-BPRRAySTBGP2h9Iq2U533pi13h_ZIHa0viga7HxmSsEeCZ_Fq1CEy0m75lmpDtZYd8SAazmjqbV5Kf4ygGnp77kPadkL0hAgC0b7vKjgNGoZ9bLZDBQmlEivNMlptyZKcQ
```
</tabpanel>
</tabs>

</details>

</tabpanel>
</tabs>

## Usage example for the token

Task: to get a list of networks via the REST API (Neutron service).

1. In your personal account, [find](https://mcs.mail.ru/app/en/mainproject/endpoints) the endpoint for the Neutron service. In this example: `https://infra.mail.ru:9696`.
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

- [viewing logs](/en/manage/logging/start/view-logs) in the Cloud Logging service;
<!-- @TODO change for EN version -->
- [working](/ru/additionals/api/api-dns "change-lang") with public DNS.
