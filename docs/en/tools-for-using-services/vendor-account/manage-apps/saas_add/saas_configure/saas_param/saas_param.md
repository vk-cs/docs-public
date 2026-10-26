# {heading(Service parameters)[id=saas_param]}

{include(/en/_includes/_translated_by_ai_en.md)}

In the JSON file, specify the service parameters listed in {linkto(#tab_params)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_params]} — Service parameters)[align=right;position=above;id=tab_params;number={const(numb_tab_params)}]}
[cols="2,4,1,1", options="header"]
|===
|Name
|Description
|Format
|Required

|id
|
Service identifier UUID4 (ID) generated using the UUID4 generator
|string (UUID4)
| ![](../../../../../../assets/check.svg "inline")

|revision
|
Service revision. The combination of the revision and the service ID determines its uniqueness in the store. The remaining parameters describe the characteristics of a specific service revision
|string, up to 255 characters
| ![](../../../../../../assets/check.svg "inline")

|name
|
Service name
|string, up to 255 characters
| ![](../../../../../../assets/check.svg "inline")

|short_description
|
Brief description of the service that will be displayed on its card in the store
|string, up to 120 characters
| ![](../../../../../../assets/check.svg "inline")

|full_description
|
Full description of the service that will be displayed on its page (for more details, see the section {linkto(/en/tools-for-using-services/vendor-account/manage-apps/service_description#service_description_full)[text=%text]})
|string
| ![](../../../../../../assets/check.svg "inline")

|singleton
|
Determines whether there is a limit of one service instance per cloud platform project
|boolean
| ![](../../../../../../assets/no.svg "inline")

|auto_bind
|
Determines whether a service binding should be created automatically after the service is deployed
|boolean
| ![](../../../../../../assets/no.svg "inline")

|icon
|
URL of the service icon (for more details, see the section {linkto(/en/tools-for-using-services/vendor-account/manage-apps/service_description#service_description_icon)[text=%text]}).

The icon file size must not exceed 1 MB. The image size must be at least 62×62 pixels
|string, up to 512 characters
| ![](../../../../../../assets/check.svg "inline")

|help
|
URL of the service documentation
|string, up to 512 characters
| ![](../../../../../../assets/check.svg "inline")

|bindable
|
Determines whether service bindings can be created for this service
|boolean
| ![](../../../../../../assets/check.svg "inline")

|plan_updateable
|
Determines whether a user can switch from one tariff plan to another without deleting the service.

The parameter value applies to all service plans.

The value can be overridden for a specific plan (for more details, see the section — {linkto(../saas_plan#saas_plan_param)[text=%text]})
|boolean
| ![](../../../../../../assets/check.svg "inline")

|deactivatable
|
Determines whether the use of the service can be temporarily suspended
|boolean
| ![](../../../../../../assets/check.svg "inline")

|bindings_retrievable
|
Determines whether the attempt to create a service binding should be retried for a certain period of time if the previous attempt failed
|boolean
| ![](../../../../../../assets/check.svg "inline")

|instances_retrievable
|
Determines whether the attempt to create a service instance should be retried for a certain period of time if the previous attempt failed
|boolean
| ![](../../../../../../assets/check.svg "inline")

|metadata
|
Determines the test and public store namespaces in which the service tariff plans will be available.

Test namespaces are specified in the `test_ns` key.

Public namespaces are specified in the `prod_ns` key.

To obtain the namespace names, send an email to [marketplace@cloud.vk.com](mailto:marketplace@cloud.vk.com).

The value can be overridden for a specific tariff plan.

If the parameter is not set, specify the parameter of the same name for each tariff plan separately in the `plans` section (for more details, see the section — {linkto(../saas_plan#saas_plan_param)[text=%text]}).

{note:warn}

If `metadata` is not set in the service parameters or in the tariff plan parameters, such a plan will not be displayed in the store.

{/note}
|map, keys — string
| ![](../../../../../../assets/no.svg "inline")
|===
{/caption}

{note:err}

The combination of the service ID and revision must be unique within the store. If a service with the same identifier and revision already exists in the store, the service configuration will not be updated.

{/note}