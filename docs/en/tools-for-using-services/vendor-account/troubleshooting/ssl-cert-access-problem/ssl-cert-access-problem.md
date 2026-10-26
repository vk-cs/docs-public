
{include(/en/_includes/_translated_by_ai_en.md)}

An access error occurs when creating an SSL certificate on the VM instance of an image-based application.

A possible cause of the problem: the `ivkcs_cert` resource of the application's Terraform manifest specifies a user or user group that does not exist in the OS of the application's VM instance.

## Solution

1. Verify that the user specified in the `cert_files_owner` argument of the [ivkcs_cert](/en/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_resources/ivkcs_cert) resource exists in the OS of the VM instance.
1. Verify that the user group specified in the `cert_files_group` argument of the [ivkcs_cert](/en/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_resources/ivkcs_cert) resource exists in the OS of the VM instance.
1. If such a user or group does not exist, [make](/en/tools-for-using-services/vendor-account/how-to-guides/ssl-cert-usage#adjust_vm_image) the necessary changes to your application's configuration.
1. If you cannot resolve the issue on your own, [contact technical support](/en/contacts).