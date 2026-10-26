{includetag(api-intro)}
{ifndef(public)}
HTTP and HTTPS requests to the REST API work by default from the deploy node and control nodes. For requests to work from other subnets, access must be configured for them (Firewall and routing).
{/ifndef}

{ifdef(public)}
Interaction with the {var(cloud)} API is performed through endpoints. In some cases, a token is required for authentication.
{/ifdef}
{/includetag}

{includetag(api-token-prerequisites)}
1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Make sure that two-factor authentication is {linkto(../../../../access/iam/instructions/manage-2fa#iam-manage-2fa-on)[text=enabled]} and API access is {linkto(../../../../tools-for-using-services/api/rest-api/enable-api#rest-api-enable-activate)[text=activated]}.
1. In the header of the management console page, select the project in which you plan to use the token.
{/includetag}

{includetag(api-token-gen)}
{note:warn}
{ifdef(public)}The generated token is valid for one hour. {/ifdef}All issued tokens remain valid until the end of their lifetime.
{/note}

Get a token:

{tabs}

{tab(Management console)}
   {ifndef(public)}
   {/includetag}
   {includetag(case-keystone-token)}
1. {linkto(../../../account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]} the {var(cloud)} management console.
   {/includetag}
   {includetag(prerequisites-api)}
1. {linkto(../prerequisites-lk-entry#prerequisites-lk-entry)[text=Go to]} the {var(cloud)} management console.
   {/includetag}
   {includetag(api-token-gen)}
1. In the header of the management console page, select the project in which you plan to use the token.
   {/ifndef}
1. Click the username in the page header and select **Project settings**.
1. Go to the **API Access** tab.
   {ifdef(public)}
   When the page is opened, a new token will be automatically generated. If the page remains open, a new token is generated once an hour.
   {/ifdef}
   {/includetag}
   {includetag(case-keystone-token)}
1. At the bottom of the page, find the **API access token** parameter and click the ![Copy](../../../../assets/copy-icon.svg "inline") icon next to it. The token will be copied.
   {/includetag}
   {includetag(prerequisites-api)}
1. At the bottom of the page, find the **API access token** parameter and click the ![Copy](../../../assets/copy-icon.svg "inline") icon next to it. The token will be copied.
   {/includetag}
   {includetag(api-token-gen)}
   {ifdef(public)}
   The token's expiration time is displayed when you hover over the ![Copy](../../../../assets/copy-icon.svg "inline") icon. If the token is about to expire, use the **Reissue** button.
   {/ifdef}
{/tab}

{tab(OpenStack CLI)}
   {/includetag}
   {includetag(case-keystone-token)}
1. {linkto(../../../cli/openstack-cli#tools-cli-openstack)[text=Install]} the OpenStack client and authenticate in the project.
   {/includetag}
   {includetag(prerequisites-api)}
1. {linkto(../prerequisites-openstack-cli#prerequisites-openstack-cli)[text=Install]} the OpenStack client and authenticate in the project.
   {/includetag}
   {includetag(api-token-gen)}
1. Run the command:

   ```console
   openstack token issue -c id -f value
   ```

   The token value will be printed to the console.

{/tab}

{ifdef(public)}
{tab(cURL)}

1. Install the [cURL](https://github.com/curl/curl/blob/master/docs/INSTALL.md) utility, if it is not already installed.
1. {linkto(../../../cli/openstack-cli#openstack-authorize)[text=Authenticate]} in the project. The authentication procedure is the same for the OpenStack client and the cURL utility.
1. Run the command. The command depends on your operating system. Two authentication methods are available: 

   - `password` — generating a new token using a password; 
   - `token` — generating a new token using an existing token.

   {tabs}
    
   {tab(Linux)}
     
   Example command for the `password` method:

   ```console
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
                           "name": "'$OS_USER_DOMAIN_NAME'"
                       },
                       "name": "'$OS_USERNAME'",
                       "password": "'$OS_PASSWORD'"
                   }
               }
           },
           "scope": {
               "project": {
                   "id": "'$OS_PROJECT_ID'"
               }
           }
       }
   }' \
   -i "https://infra.mail.ru:5000/v3/auth/tokens" | grep -i '^x-subject-token'| cut -d ':' -f 1,2
   ```

   Example command for the `token` method:   

   ```console
   curl -X POST \
   -H "Content-Type: application/json" \
   -d '{
       "auth": {
           "identity": {
               "methods": [
                   "token"
               ],
               "token": {
                  "id": "'$OS_TOKEN'"
               }
           },
           "scope": {
               "project": {
                   "id": "'$OS_PROJECT_ID'"
               }
           }
       }
   }' \
   -i "https://infra.mail.ru:5000/v3/auth/tokens" | grep -i '^x-subject-token'| cut -d ':' -f 1,2
   ```
   {/tab}
    
   {tab(Windows (cmd))}

   Example command for the `password` method:

   ```console
   curl -X POST ^
   -H "Content-Type: application/json" ^
   -d "{\"auth\": {\"identity\": {\"methods\": [\"password\"], \"password\": {\"user\": {\"domain\": {\"name\": \"%OS_USER_DOMAIN_NAME%\"}, \"name\": \"%OS_USERNAME%\",\"password\": \"%OS_PASSWORD%\"}}}, \"scope\": {\"project\": {\"id\": \"%OS_PROJECT_ID%\"}}}}" ^
   -i "https://infra.mail.ru:5000/v3/auth/tokens" | findstr /B x-subject-token | findstr x-subject-token
   ```

   Example command for the `token` method:

   ```console
   curl -X POST ^
   -H "Content-Type: application/json" ^
   -d "{\"auth\": {\"identity\": {\"methods\": [\"token\"], \"token\": {\"id\": \"%$OS_TOKEN%\"}}, \"scope\": {\"project\": {\"id\": \"%OS_PROJECT_ID%\"}}}}" ^
   -i "https://infra.mail.ru:5000/v3/auth/tokens" | findstr /B x-subject-token | findstr x-subject-token
   ```
   
   {/tab}
    
   {/tabs}

The token value will be output in the `x-subject-token` parameter.

{cut(Examples of responses to the token request)}

{tabs}

{tab(Linux)}

```console
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 27038  100 26470  100   568  99259   2129 --:--:-- --:--:-- --:--:-- 99138
x-subject-token: <TOKEN_VALUE>
```
{/tab}

{tab(Windows (cmd))}

```console
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   230    0     0  100   230      0    920 --:--:-- --:--:-- --:--:--   923FINDSTR: Line 12 is too long.
FINDSTR: Line 12 is too long.
100 26700  100 26470  100   230  49114    426 --:--:-- --:--:-- --:--:-- 49628
FINDSTR: Line 12 is too long.
x-subject-token: <TOKEN_VALUE>
```

{/tab}

{/tabs}

{/cut}

{/tab}
{/ifdef}

{/tabs}
{/includetag}

{includetag(api-token-reissue)}
After the token expires, it can be reissued in the management console:

1. Click the username in the page header and select **Project settings**.
1. Go to the **API Access** tab.
1. At the bottom of the screen, click the **Reissue** button.
{/includetag}

{includetag(api-token-example)}
Task: get a list of networks via the REST API (Neutron service).

1. In the management console, [view](https://msk.cloud.vk.ru/app/project/endpoints) the endpoint used for requests to the Neutron service. In this example: `https://infra.mail.ru:9696`.
1. {linkto(#rest-api-keystone-token-gen)[text=Get a token]}: generate a new token or copy the value of an existing valid token.
1. Run the command using the cURL utility:

   ```console
   curl https://infra.mail.ru:9696/v2.0/networks -H "Accept: application/json" -H "X-Auth-Token: <token obtained in the previous step>"
   ```

   {cut(Example result)}

   ```json
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
           }
       ]
   }
   ```

   {/cut}

Other examples of using the token:

- {linkto(../../api-spec/logging#api-spec-logging)[text=viewing logs]} in the Cloud Logging service;
- {linkto(../../api-spec/network-api/api-dns#api-spec-dns)[text=working]} with public DNS.

{/includetag}
