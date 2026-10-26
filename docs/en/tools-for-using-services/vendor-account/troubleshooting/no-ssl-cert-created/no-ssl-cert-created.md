
{include(/en/_includes/_translated_by_ai_en.md)}

An SSL certificate is not created on the instance VM when deploying an image-based application instance.

Possible causes of the problem:

- The application's Terraform manifest lacks the `ivkcs_cert` resource.
- The domain specified in the `ivkcs_cert` resource description is unavailable.
- DNS is incorrectly configured for this domain.

## Solution

1. Check that the application's [Terraform manifest](/en/tools-for-using-services/vendor-account/manage-apps/ibservice_add/tf_manifest/tf_manifest_steps) describes the [ivkcs_cert](/en/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_resources/ivkcs_cert) resource.
1. If the resource is not described, [make](/en/tools-for-using-services/vendor-account/how-to-guides/ssl-cert-usage#adjust_manifest) the necessary changes to your application configuration.
1. Check that the domain specified in the `ivkcs_cert` resource description is available.
1. Check that DNS settings for this domain are correct.
1. If you cannot resolve the issue on your own, [contact technical support](/en/contacts).