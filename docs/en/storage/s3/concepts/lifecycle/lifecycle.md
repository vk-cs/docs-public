# {heading(Object lifecycle)[id=s3-concepts-lifecycle]}

{include(/en/_includes/_translated_by_ai_en.md)}

{var(s3)} allows you to configure the lifecycle of objects in a bucket. Lifecycle is the automated deletion of objects or their {linkto(../versioning#s3-concepts-versioning)[text=versions]} from a bucket according to specified rules.

Rules are set at the level of a single bucket. It is not possible to configure the lifecycle for a group of buckets or for a project.

In the management console{ifdef(s3,s3-pdf)} IAM Only{/ifdef}, lifecycle rules can be {linkto(../../instructions/manage-lifecycle#s3-instructions-manage-lifecycle)[text=managed]} only one at a time. Adding, deleting, and modifying multiple rules at once is possible via:

- {linkto(../../connect/s3-cli#s3-connect-cli)[text=AWS CLI]} using a lifecycle {linkto(#s3-concepts-lifecycle-config)[text=JSON configuration]}.  
- {linkto(../../api/lifecycle#s3-api-lifecycle)[text=API]} using an XML configuration.

Features of creating lifecycle rules:

- The configuration must contain at least one rule.
- The rule name (the `ID` parameter) is a unique identifier consisting only of digits, Latin letters, and the `_`, `.`, and `-` characters.
- Each lifecycle rule includes:

  - A filter (the `Filter` parameter) to select objects covered by the rule. It may contain one or two types of filtering:

    - By object {linkto(../about#s3-concepts-about-object-key)[text=key]} prefix (the `Prefix` parameter). Prefix examples: `image`, `image/`, `image/photo`.

      A single rule can contain only one prefix. To filter objects by multiple prefixes, you need to create a separate rule for each prefix.

    - By object {linkto(../features#s3-concepts-features-tagging)[text=tags]} (the `Tag` or `Tags` parameter).

  - Object lifetime (the `Expiration` parameter). It defines the number of days after which the object will be deleted.

- To reduce storage costs, it is recommended to abort incomplete multipart uploads using the `AbortIncompleteMultipartUpload` parameter. It defines the number of days after the multipart upload initialization, upon expiration of which the incomplete upload will be aborted and the uploaded parts will be deleted.

- After a rule is added, it is automatically applied to the corresponding objects or object versions in the bucket.

    Afterwards, objects are deleted in the background: first, upon expiration of their lifetime, they become unavailable, and then they are deleted in queue order within the next 24 hours.

Limitations:

- Each bucket can have no more than 50 rules.
- When creating rules via the API, the size of the XML file with rules must not exceed 512 KB.

Lifecycle rules operate asynchronously in the background and do not affect the performance of the {var(s3)} service.

## {heading(Lifecycle rule configuration)[id=s3-concepts-lifecycle-config]}

- `ID` — a unique rule identifier.
- `Status` — the rule status. Possible values:

For a JSON configuration, all rules are specified as a `Rules` array containing elements `Rules[i]` of the `object` format.

{note:warn}

Before using the templates for {linkto(../../instructions/manage-lifecycle#s3-instructions-manage-lifecycle)[text=setting]} the configuration, you must:

- in the `Expiration` block, from the `Days` and `ExpiredObjectDeleteMarker` elements, keep only one and delete the rest;
- delete all comments `// <COMMENT_TEXT>`;
- fill in the fields with the required values;
- delete the `NoncurrentVersionExpiration` configuration element if the bucket has no versioning.

Otherwise, the AWS CLI command may fail.

{/note}

{cut(JSON configuration template with a prefix and multiple tags)}

```json
{
  "Rules": [
    {
      "ID": "Object expiration rule",
      "Status": "Enabled",
      "Expiration": {
        "Days": 1,                                       // Specified instead of ExpiredObjectDeleteMarker
        "ExpiredObjectDeleteMarker": true                // Specified instead of Days (only for versioned buckets)
      },
      "ID": "string",
      "Status": "Enabled",
      "Filter": {
        "And": {
          "Prefix": "string",
          "Tags": [
            { "Key": "tagKey1", "Value": "tagValue1" },
            { "Key": "tagKey2", "Value": "tagValue2" },
            { "Key": "tagKey3", "Value": "tagValue3" }
          ]
        }
      },
      "NoncurrentVersionExpiration": {                   // Only for versioned buckets
        "NoncurrentDays": 30,
        "NewerNoncurrentVersions": 50
      },
      "AbortIncompleteMultipartUpload": {                // Aborting incomplete multipart uploads
        "DaysAfterInitiation": 7
      }
    }
  ]
}
```

{ifdef(s3-pdf)}
The description of the configuration parameters is provided in {linkto(#tab_lifecycle-config1)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_lifecycle-config1]} — Configuration parameters)[align=right;position=above;id=tab_lifecycle-config1;number={const(numb_tab_lifecycle-config1)}]}
{/ifdef}
[cols="2,5", options="header"]
|===
|Name
|Description

|`Expiration`
|The object lifetime. Depending on the current version of the object, the {linkto(../versioning#s3-concepts-versioning-status)[text=versioning status]} and the presence of a {linkto(../versioning#s3-concepts-versioning-delete-marker)[text=delete marker]}, one of the actions will be applied to the object after this period expires.

For a bucket with versioning disabled, the object is deleted permanently.

For a bucket with versioning enabled:

- The current version is not a delete marker — a delete marker is created and becomes the current version.
- The current version is a delete marker — nothing happens. However, if there are no other versions and `ExpiredObjectDeleteMarker` is used instead of `Days`, the delete marker will be removed.

For a bucket with versioning suspended:

- `null` is the only version: the `null` version will be deleted.
- There are multiple versions and the current one is `null`: the `null` version will be deleted. If other versions of the object remain after deleting the `null` version, a delete marker with the `null` version will be created.
- There are multiple versions and the current one is not `null`: only a delete marker with the `null` version will be created.
- The current version is a delete marker — nothing happens. However, if there are no other versions and `ExpiredObjectDeleteMarker` is used instead of `Days`, the delete marker will be removed.

Specified using the `Days` or `ExpiredObjectDeleteMarker` configuration elements.

Format: `object`.

Full path: `Rules[i]` → `Expiration`

|`Days`
|The number of days after upload to the bucket.

Incompatible with the `Rules[i]` → `Expiration` → `ExpiredObjectDeleteMarker` configuration element.

Format: `integer`.

Full path: `Rules[i]` → `Expiration` → `Days`

|`ExpiredObjectDeleteMarker`

(only for versioned buckets)
|An option that determines whether to remove the object delete marker from the bucket when no other versions of this object remain.

Format: `boolean` with the value `true`.

Full path: `Rules[i]` → `Expiration` → `ExpiredObjectDeleteMarker`

|`ID`
|A unique rule identifier.

Format: `string`.

Full path: `Rules[i]` → `ID`

|`Status`
|The rule status.

Format: `string`.

Possible values:

- `Enabled` — the rule is applied;
- `Disabled` — the rule is not applied.

Full path: `Rules[i]` → `Status`

|`Filter`
|A filter for the objects to which the rule applies.

Format: `object`.

Full path: `Rules[i]` → `Filter`

|`And`
|A configuration element that is used when both prefix-based and multiple tag-based filtering are applied in a single rule.

Format: `object`.

Full path: `Rules[i]` → `Filter` → `And`

|`Prefix`
|The prefix of the {linkto(../about#s3-concepts-about-object-key)[text=object key]}

Format: `string`.

Full path: `Rules[i]` → `Filter` → `And` → `Prefix`

|`Tags`
|The object {linkto(../features#s3-concepts-features-tagging)[text=tags]} as an array. Each element of the `Tags[i]` array has the `object` format and contains the `Key`/`Value` key-value pairs.

Format: `array`.

Full path: `Rules[i]` → `Filter` → `And` → `Tags`

|`Key`
|The {linkto(../features#s3-concepts-features-tagging)[text=tag]} key.

Format: `string`.

Full path: `Rules[i]` → `Filter` → `And` → `Tags[i]` → `Key`

|`Value`
|The {linkto(../features#s3-concepts-features-tagging)[text=tag]} value.

Format: `string`.

Full path: `Rules[i]` → `Filter` → `And` → `Tags[i]` → `Value`

|`NoncurrentVersionExpiration`

(only for versioned buckets)
|Conditions for deleting noncurrent versions of an object.

Format: `object`.

Full path: `Rules[i]` → `NoncurrentVersionExpiration`

|`NoncurrentDays`

(only for versioned buckets)
|The number of days a noncurrent version of an object is stored, after which this version is deleted.

If used together with `NewerNoncurrentVersions`, the noncurrent version will be deleted only when both limits are reached.

Format: `integer`.

Full path: `Rules[i]` → `NoncurrentVersionExpiration` → `NoncurrentDays`

|`NewerNoncurrentVersions`

(only for versioned buckets)
|The number of stored noncurrent versions of an object. When the specified limit is reached, older versions of the object will be deleted automatically.

If used together with `NoncurrentDays`, the noncurrent version will be deleted only when both limits are reached.

Format: `integer`, but no more than 100.

Full path: `Rules[i]` → `NoncurrentVersionExpiration` → `NewerNoncurrentVersions`

|`AbortIncompleteMultipartUpload`
|Conditions for aborting incomplete multipart uploads.

- If a multipart upload is not completed within the number of days after initiation specified in `DaysAfterInitiation`, {var(s3)} aborts the multipart upload and deletes all uploaded parts associated with it.
- If the multipart upload is completed within the specified number of days, no actions under this rule are performed.

The rule applies to all incomplete uploads, including existing ones. `AbortIncompleteMultipartUpload` does not delete objects, only incomplete parts of an uploaded object.

Format: `object`.

Full path: `Rules[i]` → `AbortIncompleteMultipartUpload`

|`DaysAfterInitiation`
|The number of days after multipart upload initiation, after which the incomplete upload is aborted.

Format: `integer`.

Full path: `Rules[i]` → `AbortIncompleteMultipartUpload` → `DaysAfterInitiation`

|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}

{/cut}

{cut(JSON configuration template with prefixes only)}

```json
{
  "Rules": [
    {
      "Expiration": {
        "Days": 30,                              // Specified instead of ExpiredObjectDeleteMarker
        "ExpiredObjectDeleteMarker": true        // Specified instead of Days (only for versioned buckets)
      },
      "ID": "string",
      "Status": "Enabled",
      "Filter": {
        "Prefix": "string"
      },
      "NoncurrentVersionExpiration": {           // Only for versioned buckets
        "NoncurrentDays": 30,
        "NewerNoncurrentVersions": 50
      },
      "AbortIncompleteMultipartUpload": {        // Aborting incomplete multipart uploads
        "DaysAfterInitiation": 7
      }
    }
  ]
}
```

{ifdef(s3-pdf)}
The description of the configuration parameters is provided in {linkto(#tab_lifecycle-config2)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_lifecycle-config2]} — Configuration parameters)[align=right;position=above;id=tab_lifecycle-config2;number={const(numb_tab_lifecycle-config2)}]}
{/ifdef}
[cols="2,5", options="header"]
|===
|Name
|Description

|`Expiration`
|The object lifetime. Depending on the current version of the object, the {linkto(../versioning#s3-concepts-versioning-status)[text=versioning status]} and the presence of a {linkto(../versioning#s3-concepts-versioning-delete-marker)[text=delete marker]}, one of the actions will be applied to the object after this period expires.

For a bucket with versioning disabled, the object is deleted permanently.

For a bucket with versioning enabled:

- The current version is not a delete marker — a delete marker is created and becomes the current version.
- The current version is a delete marker — nothing happens. However, if there are no other versions and `ExpiredObjectDeleteMarker` is used instead of `Days`, the delete marker will be removed.

For a bucket with versioning suspended:

- `null` is the only version: the `null` version will be deleted.
- There are multiple versions and the current one is `null`: the `null` version will be deleted. If other versions of the object remain after deleting the `null` version, a delete marker with the `null` version will be created.
- There are multiple versions and the current one is not `null`: only a delete marker with the `null` version will be created.
- The current version is a delete marker — nothing happens. However, if there are no other versions and `ExpiredObjectDeleteMarker` is used instead of `Days`, the delete marker will be removed.

Specified using the `Days` or `ExpiredObjectDeleteMarker` configuration elements.

Format: `object`.

Full path: `Rules[i]` → `Expiration`

|`Days`
|The number of days after upload to the bucket.

Incompatible with the `Rules[i]` → `Expiration` → `ExpiredObjectDeleteMarker` configuration element.

Format: `integer`.

Full path: `Rules[i]` → `Expiration` → `Days`

|`ExpiredObjectDeleteMarker`

(only for versioned buckets)
|An option that determines whether to remove the object delete marker from the bucket when no other versions of this object remain.

Format: `boolean` with the value `true`.

Full path: `Rules[i]` → `Expiration` → `ExpiredObjectDeleteMarker`

|`ID`
|A unique rule identifier.

Format: `string`.

Full path: `Rules[i]` → `ID`

|`Status`
|The rule status.

Format: `string`.

Possible values:

- `Enabled` — the rule is applied;
- `Disabled` — the rule is not applied.

Full path: `Rules[i]` → `Status`

|`Filter`
|A filter for the objects to which the rule applies.

Format: `object`.

Full path: `Rules[i]` → `Filter`

|`Prefix`
|The prefix of the {linkto(../about#s3-concepts-about-object-key)[text=object key]}

Format: `string`.

Full path: `Rules[i]` → `Filter` → `Prefix`

|`NoncurrentVersionExpiration`

(only for versioned buckets)
|Conditions for deleting noncurrent versions of an object.

Format: `object`.

Full path: `Rules[i]` → `NoncurrentVersionExpiration`

|`NoncurrentDays`

(only for versioned buckets)
|The number of days a noncurrent version of an object is stored, after which this version is deleted.

If used together with `NewerNoncurrentVersions`, the noncurrent version will be deleted only when both limits are reached.

Format: `integer`.

Full path: `Rules[i]` → `NoncurrentVersionExpiration` → `NoncurrentDays`

|`NewerNoncurrentVersions`

(only for versioned buckets)
|The number of stored noncurrent versions of an object. When the specified limit is reached, older versions of the object will be deleted automatically.

If used together with `NoncurrentDays`, the noncurrent version will be deleted only when both limits are reached.

Format: `integer`, but no more than 100.

Full path: `Rules[i]` → `NoncurrentVersionExpiration` → `NewerNoncurrentVersions`

|`AbortIncompleteMultipartUpload`
|Conditions for aborting incomplete multipart uploads.

- If a multipart upload is not completed within the number of days after initiation specified in `DaysAfterInitiation`, {var(s3)} aborts the multipart upload and deletes all uploaded parts associated with it.
- If the multipart upload is completed within the specified number of days, no actions under this rule are performed.

The rule applies to all incomplete uploads, including existing ones. `AbortIncompleteMultipartUpload` does not delete objects, only incomplete parts of an uploaded object.

Format: `object`.

Full path: `Rules[i]` → `AbortIncompleteMultipartUpload`

|`DaysAfterInitiation`
|The number of days after multipart upload initiation, after which the incomplete upload is aborted.

Format: `integer`.

Full path: `Rules[i]` → `AbortIncompleteMultipartUpload` → `DaysAfterInitiation`

|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}
{/cut}

{cut(JSON configuration template with a single tag only)}

```json
{
  "Rules": [
    {
      "Expiration": {
        "Days": 30,                              // Specified instead of ExpiredObjectDeleteMarker
        "ExpiredObjectDeleteMarker": true        // Specified instead of Days (only for versioned buckets)
      },
      "ID": "string",
      "Status": "Enabled",
      "Filter": {
        "Tag": { "Key": "env", "Value": "prod" }
      },
      "NoncurrentVersionExpiration": {           // Only for versioned buckets
        "NoncurrentDays": 30,
        "NewerNoncurrentVersions": 50
      },
      "AbortIncompleteMultipartUpload": {        // Aborting incomplete multipart uploads
        "DaysAfterInitiation": 7
      }
    }
  ]
}
```
{ifdef(s3-pdf)}
The description of the configuration parameters is provided in {linkto(#tab_lifecycle-config3)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_lifecycle-config3]} — Configuration parameters)[align=right;position=above;id=tab_lifecycle-config3;number={const(numb_tab_lifecycle-config3)}]}
{/ifdef}
[cols="2,5", options="header"]
|===
|Name
|Description

|`Expiration`
|The object lifetime. Depending on the current version of the object, the {linkto(../versioning#s3-concepts-versioning-status)[text=versioning status]} and the presence of a {linkto(../versioning#s3-concepts-versioning-delete-marker)[text=delete marker]}, one of the actions will be applied to the object after this period expires.

For a bucket with versioning disabled, the object is deleted permanently.

For a bucket with versioning enabled:

- The current version is not a delete marker — a delete marker is created and becomes the current version.
- The current version is a delete marker — nothing happens. However, if there are no other versions and `ExpiredObjectDeleteMarker` is used instead of `Days`, the delete marker will be removed.

For a bucket with versioning suspended:

- `null` is the only version: the `null` version will be deleted.
- There are multiple versions and the current one is `null`: the `null` version will be deleted. If other versions of the object remain after deleting the `null` version, a delete marker with the `null` version will be created.
- There are multiple versions and the current one is not `null`: only a delete marker with the `null` version will be created.
- The current version is a delete marker — nothing happens. However, if there are no other versions and `ExpiredObjectDeleteMarker` is used instead of `Days`, the delete marker will be removed.

Specified using the `Days` or `ExpiredObjectDeleteMarker` configuration elements.

Format: `object`.

Full path: `Rules[i]` → `Expiration`

|`Days`
|The number of days after upload to the bucket.

Incompatible with the `Rules[i]` → `Expiration` → `ExpiredObjectDeleteMarker` configuration element.

Format: `integer`.

Full path: `Rules[i]` → `Expiration` → `Days`

|`ExpiredObjectDeleteMarker`

(only for versioned buckets)
|An option that determines whether to remove the object delete marker from the bucket when no other versions of this object remain.

Incompatible with the `Rules[i]` → `Expiration` → `Days` configuration element.

Format: `boolean` with the value `true`.

Full path: `Rules[i]` → `Expiration` → `ExpiredObjectDeleteMarker`

|`ID`
|A unique rule identifier.

Format: `string`.

Full path: `Rules[i]` → `ID`

|`Status`
|The rule status.

Format: `string`.

Possible values:

- `Enabled` — the rule is applied;
- `Disabled` — the rule is not applied.

Full path: `Rules[i]` → `Status`

|`Filter`
|A filter for the objects to which the rule applies.

Format: `object`.

Full path: `Rules[i]` → `Filter`

|`Tag`
|The object {linkto(../features#s3-concepts-features-tagging)[text=tag]} as a `Key`/`Value` key-value pair.

Format: `object`.

Full path: `Rules[i]` → `Filter` → `Tag`

|`NoncurrentVersionExpiration`

(only for versioned buckets)
|Conditions for deleting noncurrent versions of an object.

Format: `object`.

Full path: `Rules[i]` → `NoncurrentVersionExpiration`

|`NoncurrentDays`

(only for versioned buckets)
|The number of days a noncurrent version of an object is stored, after which this version is deleted.

If used together with `NewerNoncurrentVersions`, the noncurrent version will be deleted only when both limits are reached.

Format: `integer`.

Full path: `Rules[i]` → `NoncurrentVersionExpiration` → `NoncurrentDays`

|`NewerNoncurrentVersions`

(only for versioned buckets)
|The number of stored noncurrent versions of an object. When the specified limit is reached, older versions of the object will be deleted automatically.

If used together with `NoncurrentDays`, the noncurrent version will be deleted only when both limits are reached.

Format: `integer`, but no more than 100.

Full path: `Rules[i]` → `NoncurrentVersionExpiration` → `NewerNoncurrentVersions`

|`AbortIncompleteMultipartUpload`
|Conditions for aborting incomplete multipart uploads.

- If a multipart upload is not completed within the number of days after initiation specified in `DaysAfterInitiation`, {var(s3)} aborts the multipart upload and deletes all uploaded parts associated with it.
- If the multipart upload is completed within the specified number of days, no actions under this rule are performed.

The rule applies to all incomplete uploads, including existing ones. `AbortIncompleteMultipartUpload` does not delete objects, only incomplete parts of an uploaded object.

Format: `object`.

Full path: `Rules[i]` → `AbortIncompleteMultipartUpload`

|`DaysAfterInitiation`
|The number of days after multipart upload initiation, after which the incomplete upload is aborted.

Format: `integer`.

Full path: `Rules[i]` → `AbortIncompleteMultipartUpload` → `DaysAfterInitiation`

|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}
{/cut}