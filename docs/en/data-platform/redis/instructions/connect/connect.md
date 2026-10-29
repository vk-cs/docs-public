# {heading(Connecting to a service instance)[id=redis_connect]}

{ifdef(public)}
{include(/en/_includes/_dp-unavailable.md)}
{/ifdef}

{include(/en/_includes/_translated_by_ai_en.md)}

You can connect to a Redis service instance using any supported client.

{include(../../../_includes/_connect.md)[tags=connect-secure]}

## {heading(Connecting via Redis CLI)[id=redis_connect-redis-cli]}

1. Go to the **Data Platform** → **Service Instances** section.
1. Click the name of the service instance.
1. On the instance page, go to the **General Information** tab.
1. Copy the connection string specified in the **Redis connection string** field.
1. Open a terminal.
1. Run the command to connect to Redis:

   ```console
   redis-cli -u redis://<LOGIN>:<PASSWORD>@<HOST_AND_PORT>
   ```

   Where:
   
   - `<LOGIN>` — the Redis account login;
   - `<PASSWORD>` — the Redis account password;
   - `<HOST_AND_PORT>` — the host and port from the connection string.
   

1. If a certificate validation error occurs while running the command, add the `--tls --insecure` parameters to the command:

   ```console
   redis-cli --tls --insecure -u redis://<user>:<password>@10.101.0.111:2000
   ```

   {include(../../../_includes/_connect.md)[tags=curl-insecure]}