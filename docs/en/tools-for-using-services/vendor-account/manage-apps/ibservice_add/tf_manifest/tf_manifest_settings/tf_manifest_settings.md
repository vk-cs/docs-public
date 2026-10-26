# {heading(Файл settings.yaml)[id=tf_manifest_settings]}

{include(/en/_includes/_translated_by_ai_en.md)}

In the `settings.yaml` file, specify the parameters listed in {linkto(#tab_setting)[text=table %number]}.

{note:info}

If the service package does not contain a `settings.yaml` file, the default parameter values will be applied to the Terraform manifests.

{/note}

{caption(Таблица {counter(table)[id=numb_tab_setting]} — Parameters in the settings.yaml file)[align=right;position=above;id=tab_setting;number={const(numb_tab_setting)}]}
[cols="2,5,2,2", options="header"]
|===
|Name
|Description
|Required
|Default value

|preset
|
The preset version — a set of providers for Terraform manifests. Possible values:

* `base_v2` — a stable preset with VK CS 0.5.5, iVK CS 1.0.1.
* `base_v3` — a stable preset with VK CS 0.7.1, iVK CS 1.2.0.
* `base_alpha` — the current preset under testing.

When new preset versions are released, the older versions remain available for use
| ![](../../../../../../assets/no.svg "inline")
|The latest stable preset

|retry
|
Determines whether to redeploy the infrastructure if the first Terraform manifest run failed. Possible causes of the error:

* Syntax or logic errors in the manifest.
* No access to the cloud platform.
* No `health check` received during monitoring (for more details, see the section {linkto(../tf_manifest_monitoring/#tf_manifest_monitoring)[text=%text]}).
* Script execution failed.

Possible values:

* `yes` — enable infrastructure redeployment retries.
* `no` — disable infrastructure redeployment retries

| ![](../../../../../../assets/no.svg "inline")
|`yes`
|===
{/caption}

{caption(Пример файла `settings.yaml`)[align=left;position=above]}
```yaml
preset: base_v3
retry: no
```
{/caption}