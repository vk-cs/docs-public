# {heading(Static site hosting)[id=s3-concepts-static-site-hosting]}

{include(/en/_includes/_translated_by_ai_en.md)}

*Static site hosting* — an additional option for a {linkto(../about#s3-concepts-about-bucket)[text=bucket]} in {var(s3)} that extends the capabilities of access to static content. Without this option, the content of an {linkto(../about#s3-concepts-about-object)[text=object]} is retrieved via a URL corresponding to its {linkto(../about#s3-concepts-about-object-key)[text=key]}. Static site hosting allows combining static content with redirection rules, as well as specifying an index page (for example, `index.html`) and an error page returned on request errors (for example, `404`).

Usage examples:

- a business card website,
- a personal blog,
- landing pages,
- request redirection,
- documentation.

A static website based on {var(s3)} may consist of:

- static content: HTML, CSS, media files (images, audio, video), documents (PDF, TXT) and other formats viewable in a browser.
- JavaScript script files that do not require server-side processing: expandable menus, tabs, accordions, etc.

After the configuration is {linkto(../../instructions/manage-static-site#s3-instructions-manage-static-site-setup)[text=installed]}, the static website is available at:

```text
https://<BUCKET_NAME>.hb-website.<ENDPOINT_HOSTNAME>/<PREFIX>
```

{ifdef(s3,s3-pdf)}

{note:info}

The link format may differ. For details, contact your administrator.

{/note}

{/ifdef}

Here:

- `<BUCKET_NAME>` — the name of the bucket for which the static website configuration was installed;
{ifdef(public)}
- `<ENDPOINT_HOSTNAME>` — the host name of the {var(s3)} service, must match the [region](/en/tools-for-using-services/account/concepts/regions) of the account:

  - `hb.vkcloud-storage.ru` or `hb.ru-msk.vkcloud-storage.ru` — the domain of the Moscow region;
  - `hb.kz-ast.vkcloud-storage.ru` — the domain of the Kazakhstan region.
  {/ifdef}
  {ifdef(s3,s3-pdf)}
- `<ENDPOINT_HOSTNAME>` — the host name used in your {var(s3)} installation.
  {/ifdef}
- `<PREFIX>` — the key prefix of the index page object. Can be empty.

## {heading(Static website JSON configuration)[id=s3-concepts-static-site-hosting-config]}

The configuration is provided in JSON format and is used when {linkto(../../instructions/manage-static-site#s3-instructions-manage-static-site)[text=managing the configuration]} via AWS CLI.

General structure of the configuration:

```json
{
   "IndexDocument": {           // Index page
      "Suffix": "string"
   },
   "ErrorDocument": {           // Error page
      "Key": "string"
   },
   "RoutingRules": [            // Redirection rules
      {
          "Condition": {
              "HttpErrorCodeReturnedEquals": "string",
         "KeyPrefixEquals": "string"
         },
         "Redirect": {
             "HostName": "string",
         "HttpRedirectCode": "string",
         "Protocol": "http"|"https",
         "ReplaceKeyPrefixWith": "string",
         "ReplaceKeyWith": "string"
         }
      }
   ...
   ],
    "RedirectAllRequestsTo": {   // Unconditional redirection of all requests
    "HostName": "string",
    "Protocol": "http"|"https"
    }
}
```

### {heading(Index page configuration parameters)[id=s3-concepts-static-site-hosting-indexdocument]}

`IndexDocument` — a configuration element that specifies the index page.

{ifdef(public)}
Compatibility of `IndexDocument` with other configuration elements:
{/ifdef}

{ifdef(s3,s3-pdf)}
{caption(Table {counter(table)[id=static-site-config-parameters]} — Compatibility of IndexDocument with other configuration elements)[align=right;position=above;id=static-site-config-parameters;number={const(static-site-config-parameters)}]}
{/ifdef}

[cols="2,1,3", options="header"]
|===
|Configuration element
|Compatibility
|Functionality

|`ErrorDocument`
|![](../../assets/check.svg "inline")
|{linkto(#s3-concepts-static-site-hosting-errordocument)[text=Error page]}

|`RoutingRules`
|![](../../assets/check.svg "inline")
|{linkto(#s3-concepts-static-site-hosting-routingrules)[text=Redirection rules]}

|`RedirectAllRequestsTo`
|![](../../assets/no.svg "inline")
|{linkto(#s3-concepts-static-site-hosting-redirectallrequeststo)[text=Unconditional redirection]}
|===
{ifdef(s3,s3-pdf)}
{/caption}
{/ifdef}

{ifdef(public)}
`IndexDocument` parameters:
{/ifdef}

{ifdef(s3,s3-pdf)}
{caption(Table {counter(table)[id=static-site-config-parameters]} — IndexDocument parameters)[align=right;position=above;id=static-site-config-parameters;number={const(static-site-config-parameters)}]}
{/ifdef}
[cols="1,5", options="header"]
|===
|Name
|Description

2+|`IndexDocument` — an element of the `object` format

|`Suffix`
|The suffix (name) for the index page object.

Format: `string`.

When the website page is opened, the content of the object with the specified value will be loaded.

Cannot contain the `/` character.

Full path: `IndexDocument` → `Suffix`

|===
{ifdef(s3,s3-pdf)}
{/caption}
{/ifdef}

{cut(How index page requests are processed)}

For example, your index page is an object named `index.html`{ifdef(s3,s3-pdf)}, and the URL of your installation has the format `https://<BUCKET_NAME>.hb-website.<ENDPOINT_HOSTNAME>`{/ifdef}. Depending on the structure of the requested URL, {var(s3)} will process the request differently.

- When accessing the home page, for example `https://<BUCKET_NAME>.hb-website.<ENDPOINT_HOSTNAME>` or `https://<BUCKET_NAME>.hb-website.<ENDPOINT_HOSTNAME>/`, the content of the object with the key `index.html` will be loaded.
- If the path in the URL ends with `/`, the content of the object with the key `<SUFFIX>index.html` will be loaded. For example, when accessing `https://<BUCKET_NAME>.hb-website.<ENDPOINT_HOSTNAME>/images/photos/`, `<SUFFIX>` has the value `images/photos/`. As a result, the content of the object with the key `images/photos/index.html` will be loaded.
- If the path in the URL does not end with `/`, the link is first interpreted as a request to a specific object and {var(s3)} will try to return its content. If such an object does not exist, a redirection to the path with a trailing `/` will be performed. For example, when accessing `https://<BUCKET_NAME>.hb-website.<ENDPOINT_HOSTNAME>/docs/billing`, the content of the `docs/billing` object will be requested first. If such an object does not exist, the request will be redirected to `https://<BUCKET_NAME>.hb-website.<ENDPOINT_HOSTNAME>/docs/billing/`.
- If the index page cannot be found or there is no access to it, the HTTP error codes `404` and `403` will be returned respectively.

{/cut}

### {heading(Error page configuration parameters)[id=s3-concepts-static-site-hosting-errordocument]}

`ErrorDocument` — a configuration element that specifies the error page. It is used together with the `IndexDocument` configuration element, which specifies the {linkto(#s3-concepts-static-site-hosting-indexdocument)[text=index page]}.

For example, when opening a non-existent page, a `404` error will occur. Instead of the non-existent page, the content of the specified object, for example `errordoc/file.html`, will be loaded.

{ifdef(public)}
Compatibility of `ErrorDocument` with other configuration elements:
{/ifdef}

{ifdef(s3,s3-pdf)}
{caption(Table {counter(table)[id=static-site-config-parameters]} — Compatibility of ErrorDocument with other configuration elements)[align=right;position=above;id=static-site-config-parameters;number={const(static-site-config-parameters)}]}
{/ifdef}
[cols="2,1,3", options="header"]
|===
|Configuration element
|Compatibility
|Functionality

|`IndexDocument`
(required)
|![](../../assets/check.svg "inline")
|{linkto(#s3-concepts-static-site-hosting-indexdocument)[text=Index page]}

|`RoutingRules`
|![](../../assets/check.svg "inline")
|{linkto(#s3-concepts-static-site-hosting-routingrules)[text=Redirection rules]}

|`RedirectAllRequestsTo`
|![](../../assets/no.svg "inline")
|{linkto(#s3-concepts-static-site-hosting-redirectallrequeststo)[text=Unconditional redirection]}
|===
{ifdef(s3,s3-pdf)}
{/caption}
{/ifdef}

{ifdef(public)}
`ErrorDocument` parameters:
{/ifdef}

{ifdef(s3,s3-pdf)}
{caption(Table {counter(table)[id=static-site-config-parameters]} — ErrorDocument parameters)[align=right;position=above;id=static-site-config-parameters;number={const(static-site-config-parameters)}]}
{/ifdef}
[cols="1,5", options="header"]
|===
|Name
|Description

2+|`ErrorDocument` — an element of the `object` format.

|`Key`
|The full key of the error page object.

Format: `string`.

For an HTTP response `4XX` for which there is no {linkto(#s3-concepts-static-site-hosting-routingrules)[text=redirection rule]} in `RoutingRules`, the content from the object with the specified key will be loaded. No redirection is performed.

Full path: `ErrorDocument` → `Key`

|===
{ifdef(s3,s3-pdf)}
{/caption}
{/ifdef}

### {heading(Redirection rules configuration parameters)[id=s3-concepts-static-site-hosting-routingrules]}

`RoutingRules` — a configuration element that specifies redirection rules. It is used together with the `IndexDocument` configuration element, which specifies the {linkto(#s3-concepts-static-site-hosting-indexdocument)[text=index page]}.

{note:warn}
When composing the configuration, avoid rules capable of forming an infinite redirection loop. For example, after redirection by the rule `RoutingRules[1]`, the new request satisfies the `Condition` from `RoutingRules[2]`, which redirects to the original address matching the `Condition` from `RoutingRules[1]`.
{/note}

{ifdef(public)}
Compatibility of `RoutingRules` with other configuration elements:
{/ifdef}

{ifdef(s3,s3-pdf)}
{caption(Table {counter(table)[id=static-site-config-parameters]} — Compatibility of RoutingRules with other configuration elements)[align=right;position=above;id=static-site-config-parameters;number={const(static-site-config-parameters)}]}
{/ifdef}
[cols="2,1,3", options="header"]
|===
|Configuration element
|Compatibility
|Functionality

|`IndexDocument`
(required)
|![](../../assets/check.svg "inline")
|{linkto(#s3-concepts-static-site-hosting-indexdocument)[text=Index page]}

|`ErrorDocument`
|![](../../assets/check.svg "inline")
|{linkto(#s3-concepts-static-site-hosting-errordocument)[text=Error page]}

|`RedirectAllRequestsTo`
|![](../../assets/no.svg "inline")
|{linkto(#s3-concepts-static-site-hosting-redirectallrequeststo)[text=Unconditional redirection]}
|===
{ifdef(s3,s3-pdf)}
{/caption}
{/ifdef}

{ifdef(public)}
`RoutingRules` parameters:
{/ifdef}

{ifdef(s3,s3-pdf)}
{caption(Table {counter(table)[id=static-site-config-parameters]} — RoutingRules parameters)[align=right;position=above;id=static-site-config-parameters;number={const(static-site-config-parameters)}]}
{/ifdef}
[cols="3,8", options="header"]
|===
|Name
|Description

2+|`RoutingRules` — redirection rules in the `array` format:
- Each element of the `RoutingRules[i]` array is a separate rule in the `object` format, which specifies the `Condition` and the `Redirect` parameters.
- The rules are applied in the order in which they are specified in the `RoutingRules` array.
- If a rule has triggered, a new request is formed, to which the `RoutingRules` rules are also applied

|`Condition`
|The conditions for the rule to trigger, in the `object` format.

If no condition is specified, the redirection will trigger for all requests.

Full path: `RoutingRules[i]` → `Condition`

|`HttpErrorCodeReturnedEquals`
|The error code in the `4XX` or `5XX` format at which the rule triggers.

If used together with `KeyPrefixEquals`, the rule will trigger only when both conditions are met.

Format: `string`.

Upon receiving an HTTP response with the specified error code, the rule specified in `RoutingRules[i]` → `Redirect` triggers.

Full path: `RoutingRules[i]` → `Condition` → `HttpErrorCodeReturnedEquals`

|`KeyPrefixEquals`
|The key prefix of the requested object. If a full key is specified, the rule will apply only to that object.

If used together with `HttpErrorCodeReturnedEquals`, the rule will trigger only when both conditions are met.

Format: `string`.

When opening a page with the specified key or prefix, the rule specified in `RoutingRules[i]` → `Redirect` triggers.

Full path: `RoutingRules[i]` → `Condition` → `KeyPrefixEquals`

|`Redirect`
|Specifies the redirection settings in the `object` format.

Full path: `RoutingRules[i]` → `Redirect`

|`HostName`
|The name of the host to which the redirection will be performed.

Format: `string`.

Can be used together with other `Redirect` parameters.

If the value is not specified, the host name will not be changed.

Full path: `RoutingRules[i]` → `Redirect` → `HostName`

|`HttpRedirectCode`
|The HTTP code in the `3XX` format that will be returned upon redirection.

Format: `string`.

If the value is not specified, the default response code `301` is used.

Can be used together with other `Redirect` parameters.

Full path: `RoutingRules[i]` → `Redirect` → `HttpRedirectCode`

|`Protocol`
|Specified when the protocol needs to be changed.

Format: `string`.

Possible values: `http`, `https`.

Can be used together with other `Redirect` parameters.

Full path: `RoutingRules[i]` → `Redirect` → `Protocol`

|`ReplaceKeyPrefixWith`
|The object key prefix to replace the prefix of the requested object with.

Format: `string`.

If an empty string is specified, the new request will have no prefix.

Usually used together with `RoutingRules[i]` → `Condition` → `KeyPrefixEquals` to redirect a group of objects from one prefix to another.

Can be used together with the `HostName`, `HttpRedirectCode` and `Protocol` parameters.

Incompatible with the `ReplaceKeyWith` parameter.

Full path: `RoutingRules[i]` → `Redirect` → `ReplaceKeyPrefixWith`

|`ReplaceKeyWith`
|The key of the object to redirect to.

Format: `string`.

Can be used together with the `HostName`, `HttpRedirectCode` and `Protocol` parameters.

Incompatible with the `ReplaceKeyPrefixWith` parameter.

Full path: `RoutingRules[i]` → `Redirect` → `ReplaceKeyWith`

|===
{ifdef(s3,s3-pdf)}
{/caption}
{/ifdef}

### {heading(Unconditional redirection configuration parameters)[id=s3-concepts-static-site-hosting-redirectallrequeststo]}

`RedirectAllRequestsTo` — a configuration element that specifies unconditional redirection rules for all website requests.

{note:info}

Unconditional redirection can also work with an empty bucket.

{/note}

{ifdef(public)}
Compatibility of `RedirectAllRequestsTo` with other configuration elements:
{/ifdef}

{ifdef(s3,s3-pdf)}
{caption(Table {counter(table)[id=static-site-config-parameters]} — Compatibility of RedirectAllRequestsTo with other configuration elements)[align=right;position=above;id=static-site-config-parameters;number={const(static-site-config-parameters)}]}
{/ifdef}
[cols="2,1,3", options="header"]
|===
|Configuration element
|Compatibility
|Functionality

|`IndexDocument`
|![](../../assets/no.svg "inline")
|{linkto(#s3-concepts-static-site-hosting-indexdocument)[text=Index page]}

|`ErrorDocument`
|![](../../assets/no.svg "inline")
|{linkto(#s3-concepts-static-site-hosting-errordocument)[text=Error page]}

|`RoutingRules`
|![](../../assets/no.svg "inline")
|{linkto(#s3-concepts-static-site-hosting-routingrules)[text=Redirection rules]}
|===
{ifdef(s3,s3-pdf)}
{/caption}
{/ifdef}

{ifdef(public)}
`RedirectAllRequestsTo` parameters:
{/ifdef}

{ifdef(s3,s3-pdf)}
{caption(Table {counter(table)[id=static-site-config-parameters]} — RedirectAllRequestsTo parameters)[align=right;position=above;id=static-site-config-parameters;number={const(static-site-config-parameters)}]}
{/ifdef}
[cols="1,5", options="header"]
|===
|Name
|Description

2+|`RedirectAllRequestsTo` — an element of the `object` format that specifies unconditional redirection rules for all website requests

|`HostName`
|The name of the host to which the redirection will be performed. Required parameter.

Format: `string`.

Can be used together with `Protocol`.

Full path: `RedirectAllRequestsTo` → `HostName`

|`Protocol`
|Specified when the protocol needs to be changed.

Format: `string`.

Possible values: `http`, `https`.

Can be used together with `HostName`.

Full path: `RedirectAllRequestsTo` → `Protocol`

|===
{ifdef(s3,s3-pdf)}
{/caption}
{/ifdef}

## {heading(Configuration examples)[id=s3-concepts-static-site-hosting-examples]}

Some parameters are incompatible with each other, so the number of their combinations is limited.

- Only the {linkto(#s3-concepts-static-site-hosting-indexdocument)[text=index page]} `IndexDocument`:

    ```json
    {
        "IndexDocument": {
        "Suffix": "index.html"
        }
    }
    ```

- The {linkto(#s3-concepts-static-site-hosting-indexdocument)[text=index page]} `IndexDocument` and the {linkto(#s3-concepts-static-site-hosting-errordocument)[text=error page]} `ErrorDocument`:

    ```json
    {
        "IndexDocument": {
        "Suffix": "index.html"
        },
        "ErrorDocument": {
        "Key": "error.html"
        }
    }
    ```

- The {linkto(#s3-concepts-static-site-hosting-indexdocument)[text=index page]} `IndexDocument` and the {linkto(#s3-concepts-static-site-hosting-routingrules)[text=redirection rules]} `RoutingRules`:

    ```json
    {
        "IndexDocument": {
        "Suffix": "index.html"
        },
        "RoutingRules": [
        {
            "Condition": {
            "KeyPrefixEquals": "docs/"
            },
            "Redirect": {
            "ReplaceKeyPrefixWith": "documents/",
            "HttpRedirectCode": "301"
            }
        }
        ]
    }
    ```

    In this example, all requests with the `docs/` prefix will be redirected to `documents/` and return the HTTP response code `301`.

- The {linkto(#s3-concepts-static-site-hosting-indexdocument)[text=index page]} `IndexDocument`, the {linkto(#s3-concepts-static-site-hosting-errordocument)[text=error page]} `ErrorDocument` and the {linkto(#s3-concepts-static-site-hosting-routingrules)[text=redirection rules]} `RoutingRules`:

    ```json
    {
        "IndexDocument": {
        "Suffix": "index.html"
        },
        "ErrorDocument": {
        "Key": "error.html"
        },
        "RoutingRules": [
        {
            "Condition": {
            "HttpErrorCodeReturnedEquals": "404"
            },
            "Redirect": {
            "ReplaceKeyWith": "index.html",
            "HttpRedirectCode": "302"
            }
        }
        ]
    }
    ```

    In this example, upon an HTTP `404` error, the request is redirected to `index.html`; for other errors, the content of `error.html` is returned.

- {linkto(#s3-concepts-static-site-hosting-redirectallrequeststo)[text=Unconditional redirection]} `RedirectAllRequestsTo` for all requests:

    ```json
    {
        "RedirectAllRequestsTo": {
        "HostName": "example.com",
        "Protocol": "https"
        }
    }
    ```

    In this example, all requests are redirected to `example.com` via the `https` protocol. The response always returns the code `301`.