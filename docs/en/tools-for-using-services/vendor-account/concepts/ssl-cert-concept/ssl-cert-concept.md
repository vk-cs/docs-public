
{include(/en/_includes/_translated_by_ai_en.md)}

Marketplace provides an automatic SSL certificate management system for instances of image-based applications. The system is based on the Terraform resource [ivkcs_cert](/en/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_resources/ivkcs_cert).

System capabilities:

- Automatic creation of SSL certificates for domains specified by the provider of an image-based application.
- Placement of SSL certificates and their private keys on the VMs of image-based application instances.
- Configuring access permissions for SSL certificate files and their private keys.
- Secure storage of SSL certificate private keys.
- Automatic renewal of SSL certificates before they expire.
- Execution of custom scripts after an SSL certificate is renewed.

The system covers all stages of the SSL certificate lifecycle:

[cols="1,2,1", options="header"]
|===
|Lifecycle stage
|Description
|Certificate status

|Creation
|The system requests an SSL certificate from the certificate authority
|`INITIAL`

|Validation request
|The system asks the provider to confirm domain ownership
|`REQUEST_VALIDATION`

|Waiting for validation
|The system waits for confirmation from the provider
|`WAIT_VALIDATION`

|Placement and usage
|When deploying an instance of an image-based application, the system saves the SSL certificate and its key on the instance VM in the directory specified by the provider. The certificate is ready for use
|`READY`

|Monitoring
|The system tracks the SSL certificate expiration date
|`READY` or `EXPIRE_SOON`

|Renewal
|The system renews the SSL certificate 30 days before its expiration date. After the renewal, the system runs a custom script if specified by the provider
|`RENEW`
|===

In case of an error during creation or renewal, the SSL certificate transitions to the `FAILED` status.

The [SSL certificate usage guide](/en/tools-for-using-services/vendor-account/how-to-guides/ssl-cert-usage) shows how to integrate the SSL certificate management system into an image-based application.