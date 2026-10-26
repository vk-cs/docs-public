
{include(/en/_includes/_translated_by_ai_en.md)}

To view the logs of a service instance:

1. [Log in](https://msk.cloud.vk.ru/app/) to your VK Cloud management console.
1. Go to the **Applications Marketplace** section.
1. Open the developer console and switch to the **Network** tab in it.
1. Use filters: click the **XHR/Fetch** button and type `/marketplace` in the filter input field.
1. Select the name of any successful request from the list (one not highlighted in red) and go to the **Cookies** tab.
1. Find the `sid` cookie value in the list and save it.
1. Get a JWT authorization token for Marketplace by running the command:

    {tabs}

    {tab(Linux (bash))}

    ```console
    curl -X POST https://cloud.vk.ru/marketplace/api/um/v1/tokens/sid \
    --cookie 'sid=<SID>'
    ```

    {/tab}

    {tab(Windows (cmd))}

    ```console
    curl -X POST https://cloud.vk.ru/marketplace/api/um/v1/tokens/sid ^
    --cookie "sid=<SID>"
    ```

    {/tab}

    {/tabs}

    Here `<SID>` is the value of the `sid` cookie.

    The JWT token will appear in the command response.

1. Get the service instance log:

    {tabs}

    {tab(Linux (bash))}

    ```console
    curl -v https://cloud.vk.ru/marketplace/api/notifications/api/v1/instance?uuid=<UUID> \
    -H 'Authorization: Bearer <JWT_TOKEN>'
    ```

    {/tab}

    {tab(Windows (cmd))}

    ```console
    curl -v https://cloud.vk.ru/marketplace/api/notifications/api/v1/instance?uuid=<UUID> ^
    -H "Authorization: Bearer <JWT_TOKEN>"
    ```

    {/tab}

    {/tabs}

    Here:

    - `<UUID>` is the service instance identifier. You can find the value in your VK Cloud management console on the service instance page — the `ID` parameter.
    - `<JWT_TOKEN>` is the JWT authorization token.