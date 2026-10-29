# {heading(Connecting to a service instance)[id=opensearch_connect]}

{ifdef(public)}
{include(/en/_includes/_dp-unavailable.md)}
{/ifdef}

{include(/en/_includes/_translated_by_ai_en.md)}

You can connect to an OpenSearch service instance via the web interface, curl, and third-party clients.

{include(../../../_includes/_connect.md)[tags=connect-secure]}

## {heading(Connecting via the web interface)[id=opensearch_connect-ui]}

1. Go to the **Data Platform** → **Service Instances** section.
1. Click the name of the service instance.
1. On the instance page, go to the **General Information** tab.
1. Follow the link specified in the **Opensearch UI** field.

   {include(../../../_includes/_connect.md)[tags=browser-warning]}

1. Depending on your browser:

   {include(../../../_includes/_connect.md)[tags=browsers-action]}
   
1. Enter the login and password of the OpenSearch account.
1. Click **Log In**.

## {heading(Connecting via curl)[id=opensearch_connect-curl]}

1. Go to the **Data Platform** → **Service Instances** section.
1. Click the name of the service instance.
1. On the instance page, go to the **General Information** tab.
1. Copy the URL specified in the **Opensearch API** field.
1. Open a terminal.
1. Run the command:

   ```console
   curl --insecure -u <LOGIN>:<PASSWORD> <OPENSEARCH_API_URL>
   ```

   Here:

   - `<LOGIN>` — the login of the OpenSearch account;
   - `<PASSWORD>` — the password of the OpenSearch account;
   - `<OPENSEARCH_API_URL>` — the copied Opensearch API URL.

   {include(../../../_includes/_connect.md)[tags=curl-insecure]}