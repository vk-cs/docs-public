
{include(/en/_includes/_translated_by_ai_en.md)}

The parameters given in the table are specified in the [service configuration JSON file](../../../instructions/manage-saas-apps/saas-add#service_config) in the `plans` section.

[cols="2,4,2,1,2", options="header"]
|===
|Name
|Description
|Format
|Required
|Default value

|`id`
|
Tariff plan identifier UUID4 (ID) generated using the UUID4 generator
|string (UUID4)
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")

|`revision`
|
Revision of the tariff plan. The combination of the revision and the tariff plan ID determines its uniqueness within the service. The remaining parameters describe the characteristics of a specific revision of the tariff plan.

{note:err}

The combination of the tariff plan ID and revision must be unique within the service. If a plan with the same ID and revision already exists in the service, the tariff plan will not be updated

{/note}
|string, up to 255 characters
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")

|`name`
|
Technical name of the tariff plan that is not displayed in the store interface. It must be specified in Latin letters using an underscore instead of spaces
|string, up to 255 characters
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")

|`description`
|
Name of the tariff plan that is displayed in the store interface
|string, up to 255 characters
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")

|`free`
|
Determines whether the tariff plan is free or not
|boolean
| ![](/ru/assets/check.svg "inline")
| ![](/ru/assets/no.svg "inline")

|`plan_updateable`
|Determines whether the user can switch from one tariff plan to another without deleting the service.

Overrides the value set in the identically named service parameter
|boolean
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")

|`metadata`
|Defines the test and public store namespaces in which the tariff plan will be available.

Test namespaces are specified in the `test_ns` key.

Public namespaces are specified in the `prod_ns` key.

If no namespaces are specified, the values set in the identically named [service parameter](../saas-param) will be used
|map, keys — string
| ![](/ru/assets/no.svg "inline")
| ![](/ru/assets/no.svg "inline")
|===