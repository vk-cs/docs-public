# {heading(Service testing in the marketplace)[id=saas_upload_testmarketplace]}

{include(/en/_includes/_translated_by_ai_en.md)}

Before publication, the service is available in the test namespaces of the marketplace specified in the `metadata` parameter in the service configuration.

{note:info}

A grant is provided for testing the service in the marketplace. To receive a grant, send an email to [marketplace@cloud.vk.com](mailto:marketplace@cloud.vk.com). The grant will be credited to the bonus account of the cloud platform project.

{/note}

To check how the service will function in the cloud platform, test the service in the test namespace of the marketplace:

1. To get access to the test namespaces of the marketplace, send an email to [marketplace@cloud.vk.com](mailto:marketplace@cloud.vk.com). In the email, specify:

   * The names of the test namespaces specified in the service configuration.
   * The email of the user who needs access to the test namespaces of the marketplace.

   If access to the test namespaces specified in the service configuration is already available, skip this step.
1. Log in to the cloud platform management console.
1. Make sure that the configuration wizard of each tariff plan is displayed correctly.
1. Connect the service.
1. Update the service instance:

   1. Change the values of the tariff options of the current tariff plan.
   1. Switch to a new tariff plan.

1. Test the main user scenarios of the service.
1. Delete the service instance.
1. If necessary, make changes to the service configuration (for more details, see the section {linkto(../../../saas_update#saas_update)[text=%text]}).

   {note:warn}

   If test values for the service cost were set in the service configuration for the duration of testing and debugging, edit them.

   {/note}
1. If changes were made to the service configuration during testing, make sure that the service revision has been updated.