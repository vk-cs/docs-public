# {heading(Spark Connect error: 404 unimplemented)[id=spark_connect_404]}

{ifdef(public)}
{include(/en/_includes/_dp-unavailable.md)}
{/ifdef}

{include(/en/_includes/_translated_by_ai_en.md)}

## {heading(Problem)[id=spark_connect_404_problem]}

When connecting to Spark Connect via an SSH tunnel that proxies requests from the client's `localhost` to the Spark cluster, the following error occurs:

```console
404 unimplemented
```

The error occurs because, when connecting to Spark Connect through an SSH tunnel, the user uses a local address (`localhost`) instead of the service's DNS name. As a result, the HTTP request uses `localhost` as the `HOST` header, and NGINX on the cluster cannot redirect traffic to Spark Connect.

## {heading(Solution)[id=spark_connect_404_solving]}

Connect to Spark Connect from an environment where a direct request can be made using the service's DNS name.