
{include(/en/_includes/_translated_by_ai_en.md)}

The parameters given in the table are specified in the [service configuration JSON file](../../../instructions/manage-saas-apps/saas-add#service_config).

[cols="2,4,1,1", options="header"]
|===
|Name
|Description
|Format
|Required

|`id`
|
The service UUID4 identifier (ID) generated using the UUID4 generator
|string (UUID4)
| ![](/ru/assets/check.svg "inline")

|`revision`
|
The service revision. The combination of the revision and the service ID determines its uniqueness in the store. The other parameters describe the characteristics of a specific service revision.

{note:err}

The combination of the service ID and revision must be unique within the store. If a service with the same ID and revision already exists in the store, the service configuration will not be updated

{/note}

|string, up to 255 characters
| ![](/ru/assets/check.svg "inline")

|`name`
|
The service name
|string, up to 255 characters
| ![](/ru/assets/check.svg "inline")

|`short_description`
|
A short description of the service that will be displayed in its card:

- in the Marketplace catalog;
- on the **Service description** tab on the service page
|string, up to 120 characters
| ![](/ru/assets/check.svg "inline")

|`full_description`
|
The [full description of the service](../../ib-apps-full-description) that will be displayed on its Marketplace page
|string
| ![](/ru/assets/check.svg "inline")

|`singleton`
|
Specifies whether there is a limit of one service instance per cloud platform project
|boolean
| ![](/en/assets/no.svg "inline")

|`auto_bind`
|
Specifies whether a service binding should be created automatically after the service is deployed
|boolean
| ![](/en/assets/no.svg "inline")

|`icon`
|
The URL of the service icon [obtained from Marketplace](../../../instructions/manage-saas-apps/saas-add#preparatory_steps)
|string, up to 512 characters
| ![](/ru/assets/check.svg "inline")

|`help`
|
The URL of the service documentation
|string, up to 512 characters
| ![](/ru/assets/check.svg "inline")

|`bindable`
|
Specifies whether service bindings can be created for this service
|boolean
| ![](/ru/assets/check.svg "inline")

|`plan_updateable`
|
Specifies whether the user can switch from one service plan to another without deleting the service.

The parameter value applies to all service plans.

The value can be overridden for a specific [plan](../saas-plan)
|boolean
| ![](/ru/assets/check.svg "inline")

|`deactivatable`
|
Specifies whether the service can be temporarily suspended
|boolean
| ![](/ru/assets/check.svg "inline")

|`bindings_retrievable`
|
Specifies whether the service binding creation attempt should be retried for some time if the previous attempt failed
|boolean
| ![](/ru/assets/check.svg "inline")

|`instances_retrievable`
|
Specifies whether the service instance creation attempt should be retried for some time if the previous attempt failed
|boolean
| ![](/ru/assets/check.svg "inline")

|`metadata`
|
Specifies the test and public store namespaces in which the service plans will be available.

Test namespaces are specified in the `test_ns` key.

Public namespaces are specified in the `prod_ns` key.

The value can be overridden for a specific service plan.

If the parameter is not set, specify the parameter with the same name for each service plan separately in the [plans section](../saas-plan).

{note:warn}

If `metadata` is not set in the service parameters or in the service plan parameters, such a plan will not be displayed in Marketplace

{/note}
|map, keys — string
| ![](/en/assets/no.svg "inline")
|===