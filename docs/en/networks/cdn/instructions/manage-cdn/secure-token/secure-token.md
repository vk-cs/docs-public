# {heading(Enabling Secure token)[id=cdn-secure-token]}

{include(/en/_includes/_translated_by_ai_en.md)}

The {linkto(../../../../../networks/cdn/concepts/secure-token#cdn-secure-token)[text=Secure token]} option allows you to protect CDN resource files from unwanted downloads.

## {heading(Enabling Secure token)[id=cdn-secure-token-connect]}

{tabs}
{tab(Management console)}

{include(../../../../../_includes/_open-cdn.md)}

1. Go to the **Security** tab.
1. Enable the **Activate Secure Token** option.
1. Enter a secret key — a random set of characters from 6 to 32 characters long. Store the entered secret key in a secure place.
1. (Optional) Enable the **Add IP address to token** option to allow access only from a specific IP address. The IP address is configured outside the CDN resource by placing a {linkto(../../../../../networks/cdn/concepts/secure-token#cdn-secure-token-ipscripts)[text=script]} on the website where the content origin is located.
1. Click **Save changes**.

{/tab}
{tab(API)}
{include(../../../../../_includes/_api_cdn_create_change.md)}
In the request body, in the `options` block, set the `secure_key` parameters:

- To enable the option, specify `"enabled": true`; to disable it, specify `"enabled": false`.
- To set the secret key, enter a set of characters from 6 to 32 characters long for the `key` parameter. Example: `"key": "examplesecurekey"`.
- To enable adding an IP address to the token, enter the value `2` for the `type` parameter. To disable adding an IP address, enter the value `0`. Examples: `"type": 2`, `"type": 0`.

Example request:

```json
curl --location --request PUT 'https://msk.cloud.vk.ru/api/cdn/api/v1/projects/examplef8f67/resources/175281' \
--header 'X-Auth-Token: example6UjMOd' \
--header 'Content-Type: application/json' \
--data '{
    "originGroup": 267760,
    "originGroup_name": "exampleorigin",
    "secondaryHostnames": [],
    "options": {
        "secure_key": {
            "enabled": true, 
            "key": "examplesecurekey",
            "type": 2
        }
    }
}'
```
{/tab}
{/tabs}

{note:info}
After you enable Secure token, access to the CDN resource content via unsigned links will be impossible.
To organize access to part of the content via regular links, {linkto(../../../../../networks/cdn/instructions/create-resource#cdn-create-resource)[text=create]} another resource for it with a separate {linkto(../../../../../networks/cdn/concepts/origin-groups#cdn-origin-groups)[text=origin]}.
{/note}

## {heading(Setting up access via signed links)[id=cdn-secure-token-signed-links-access]}

The configuration is performed on the resource through which users access the content:

1. Add the required {linkto(../../../../../networks/cdn/concepts/secure-token#cdn-secure-token-scripts)[text=script]} for generating a signed link to your resource. The choice of script depends on whether you have enabled the **Add IP address to token** option.
1. Organize your resource so that users can access the required files only via signed links. At the same time, the CDN service of {var(cloud)}, when accessing the origin server, must be able to access the content regardless of the presence of the secret key.