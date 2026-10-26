{ifdef(s3-pdf)}
The limits are described in the {linkto(#tab_limit)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_limit]} — Limits)[align=right;position=above;id=tab_limit;number={const(numb_tab_limit)}]}
{/ifdef}
[cols="3,2,4,1", options="header"]
|===
|Parameter
|Limit
|Comment
|Hard

|Number of accounts
|50 pcs.
|{ifdef(public)}![](../../../../assets/no.svg "inline"){/ifdef}{ifdef(s3,s3-pdf)}![](../../assets/no.svg "inline"){/ifdef}
|{ifdef(public)}![](../../../../assets/check.svg "inline"){/ifdef}{ifdef(s3,s3-pdf)}![](../../assets/check.svg "inline"){/ifdef}

|Number of buckets
|100 pcs.
|{ifdef(public)}![](../../../../assets/no.svg "inline"){/ifdef}{ifdef(s3,s3-pdf)}![](../../assets/no.svg "inline"){/ifdef}
|{ifdef(public)}![](../../../../assets/check.svg "inline"){/ifdef}{ifdef(s3,s3-pdf)}![](../../assets/check.svg "inline"){/ifdef}

|Number of objects in a bucket
|unlimited
|{ifdef(public)}![](../../../../assets/no.svg "inline"){/ifdef}{ifdef(s3,s3-pdf)}![](../../assets/no.svg "inline"){/ifdef}
|{ifdef(public)}![](../../../../assets/no.svg "inline"){/ifdef}{ifdef(s3,s3-pdf)}![](../../assets/no.svg "inline"){/ifdef}

|Size of a single file
|32 GB for a regular file, 320 TB for a multipart upload
|{ifdef(public)}![](../../../../assets/no.svg "inline"){/ifdef}{ifdef(s3,s3-pdf)}![](../../assets/no.svg "inline"){/ifdef}
|{ifdef(public)}![](../../../../assets/check.svg "inline"){/ifdef}{ifdef(s3,s3-pdf)}![](../../assets/check.svg "inline"){/ifdef}

|Size of a single bucket
|unlimited
|{ifdef(public)}![](../../../../assets/no.svg "inline"){/ifdef}{ifdef(s3,s3-pdf)}![](../../assets/no.svg "inline"){/ifdef}
|{ifdef(public)}![](../../../../assets/no.svg "inline"){/ifdef}{ifdef(s3,s3-pdf)}![](../../assets/no.svg "inline"){/ifdef}

|Rate limit: regular requests
|1000 requests/s
|unlimited, maximum known value across all projects: 9000 requests/s
|{ifdef(public)}![](../../../../assets/no.svg "inline"){/ifdef}{ifdef(s3,s3-pdf)}![](../../assets/no.svg "inline"){/ifdef}

|Rate limit: listing requests
|250 requests/s
|unlimited, maximum known value across all projects: 500 requests/s
|{ifdef(public)}![](../../../../assets/no.svg "inline"){/ifdef}{ifdef(s3,s3-pdf)}![](../../assets/no.svg "inline"){/ifdef}

|Number of lifecycle rules
|50 pcs.
|{ifdef(public)}![](../../../../assets/no.svg "inline"){/ifdef}{ifdef(s3,s3-pdf)}![](../../assets/no.svg "inline"){/ifdef}
|{ifdef(public)}![](../../../../assets/check.svg "inline"){/ifdef}{ifdef(s3,s3-pdf)}![](../../assets/check.svg "inline"){/ifdef}
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}
