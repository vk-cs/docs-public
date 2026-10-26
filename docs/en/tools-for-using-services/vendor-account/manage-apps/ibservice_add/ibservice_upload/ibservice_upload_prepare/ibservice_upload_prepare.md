# {heading(Preparatory operations)[id=ibservice_upload_prepare]}

{include(/en/_includes/_translated_by_ai_en.md)}

The user uploading the service package to the marketplace must have an account (management console) in the cloud platform. Registration instructions are provided in the section [Registration in {var(cloud)}](/en/intro/onboarding/account).

Send an email to [marketplace@cloud.vk.com](mailto:marketplace@cloud.vk.com) with the following information:

* Company name.
* Project ID (OpenStack PID) in which the Terraform manifests will be tested.

   The value is displayed in the cloud platform management console on the project settings page, on the Terraform tab.
* Email of the user who needs access to the marketplace test namespaces in order to test the service before publication.
* Email of the user who will be assigned as the owner of the service key.
* Email of the user who will receive error notifications when service instances are created.

   A service key will be sent in the reply email. By default, its validity period is 1 year. The service key contains the marketplace test and public namespaces in which the service will be available.

{note:info}

The OpenStack PID must be in the list of providers in order to test the Terraform manifests locally and with the deployment system.

{/note}