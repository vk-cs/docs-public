
{include(/en/_includes/_translated_by_ai_en.md)}

The `settings.yaml` file contains parameters for executing the Terraform manifest that describes the deployment of your application.

[cols="2,5,2,2", options="header"]
|===
|Name
|Description
|Required
|Default value

|`preset`
|Preset version — a set of providers for Terraform manifests. Possible values:

* `base_v2` — stable preset with VK CS 0.5.5, iVK CS 1.0.1.
* `base_v3` — stable preset with VK CS 0.7.1, iVK CS 1.2.0.
* `base_alpha` — currently tested preset.

When new preset versions are released, older versions remain available for use
| ![](/en/assets/no.svg "inline")
|Latest stable preset

|`retry`
|
Determines whether to re-deploy the infrastructure if the first execution of the Terraform manifest failed. Possible causes of the error:

* Syntax or logic errors in the manifest.
* No access to the cloud platform.
* No `health check` received during [monitoring]().
* Script execution failed.

Possible values:

* `yes` — enable infrastructure deployment retries.
* `no` — disable infrastructure deployment retries

| ![](/en/assets/no.svg "inline")
|`yes`
|===

Example of the `settings.yaml` file:

```yaml
preset: base_v3
retry: no
```