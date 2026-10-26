
{include(/en/_includes/_translated_by_ai_en.md)}

On the VM instance of the application, after the SSL certificate is updated, the script specified in the `ivkcs_cert` resource description does not run.

Possible causes of the issue:

- The system cannot find the script.
- The user on whose behalf the script is executed has insufficient permissions for it.

## Solution

1. Check that the path to the script in the `renewal_hook_path` argument of the `ivkcs_cert` resource is specified correctly.
1. If the `cert_files_owner` argument is set in the `ivkcs_cert` resource description, check that the user specified in it has:

    - access to the folder with the script,
    - permission to execute the script.

1. If the checks return a negative result, [make](/en/tools-for-using-services/vendor-account/how-to-guides/ssl-cert-usage#adjust_vm_image) the necessary changes to your application configuration.
1. If you cannot solve the problem on your own, [contact technical support](/en/contacts).