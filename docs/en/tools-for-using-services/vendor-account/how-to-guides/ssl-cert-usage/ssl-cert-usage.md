You can automatically install SSL certificates on the instances of your image-based applications when deploying them on the {var(cloud)} platform, as well as timely update the installed SSL certificates. This will allow your applications to use the secure HTTPS protocol for exchanging data with users.

The example below shows how to integrate the [SSL certificate management system](/en/tools-for-using-services/vendor-account/concepts/ssl-cert-concept) into an image-based application.

## {heading(Preparatory steps)[id=preparatory_steps]}

{include(/en/_includes/_translated_by_ai_en.md)}

Register a domain where the instances of the image-based application will reside, if this has not been done yet.

## {heading(1. Prepare the VM image of the application instance)[id=adjust_vm_image]}

When [preparing the image](/en/tools-for-using-services/vendor-account/manage-apps/ibservice_add/ib_image_create) of the VM where the image-based application is installed:

1. Create a directory for storing the SSL certificate file and the file with its private key.

   If several applications and SSL certificates for them will be installed on the VM, it is recommended to create a separate directory for each application for better security.

1. (Optional) Configure access to the SSL certificate files and its private key:

   1. Create a user who will be assigned as the owner of these files.
   1. Create a user group for the SSL certificate files and its private key.
   1. Grant the user and the group access permissions to the SSL certificate files and its private key, as well as to the directory where they will be placed.

      For better security, it is not recommended to grant more permissions than necessary. In this case, it is sufficient to set the access permissions:

      - for the directory — `755` (the owner has unrestricted access, while the group and other users have only read and execute permissions);
      - for the files — `644` (the owner has read and write permissions, while the group and other users have only read permission).

1. (Optional) Specify which actions need to be performed on the instance VM each time after the SSL certificate is updated:

   1. Prepare a bash script with the required actions and place the script file on the VM image.
   1. If an owner user of the SSL certificate has been created, grant them access permission to the directory where the script is located and the permission to execute the script.
   1. Verify that the script runs correctly.

## {heading(2. Prepare the application Terraform manifest)[id=adjust_manifest]}

Add the [ivkcs_cert resource](/en/tools-for-using-services/vendor-account/manage-apps/ivkcs/ivkcs_resources/ivkcs_cert) to the [Terraform manifest](/en/tools-for-using-services/vendor-account/manage-apps/ibservice_add/tf_manifest/tf_manifest_steps) with the description of the infrastructure for deploying the application instance.

{cut(Example of a resource with basic settings)}

The resource configuration shown in the example:

- Creates an SSL certificate for the `example.com` domain.
- Places the SSL certificate and its private key in the `/etc/ssl/certs/` directory.
- Runs the `/opt/scripts/reload_nginx.sh` script each time after the SSL certificate is updated.

```hcl
resource "ivkcs_cert" "web_cert" {
  uuid              = var.instance_uuid
  domain            = "example.com"
  path_cert         = "/etc/ssl/certs/"
  renewal_hook_path = "/opt/scripts/reload_nginx.sh"
}
```

Here:

- `uuid` — the identifier of the image-based application instance.
- `domain` — the FQDN of the domain where the instances of your image-based application will reside and for which the SSL certificate will be issued.
- `path_cert` — the path to the directory where the SSL certificate file and the file with its private key will be stored.
- `renewal_hook_path` — the path to the directory with the script that will be run after the SSL certificate is updated.

{/cut}

{cut(Example of a resource with advanced settings)}

The resource configuration shown in the example:

- Creates an SSL certificate for the `secure.example.com` domain.
- Places the SSL certificate and its private key in the `/opt/app/ssl/` directory.
- Runs the `/opt/app/scripts/restart_service.sh` script each time after the SSL certificate is updated.
- Assigns the `nginx` user as the owner of the SSL certificate files and its private key.
- Assigns the `ssl-cert` group for the SSL certificate files and its private key.
- Sets timeouts for operations with the SSL certificate.

```hcl
resource "ivkcs_cert" "secure_cert" {
  uuid              = var.instance_uuid
  domain            = "secure.example.com"
  path_cert         = "/opt/app/ssl/"
  renewal_hook_path = "/opt/app/scripts/restart_service.sh"
  cert_files_owner  = "nginx"
  cert_files_group  = "ssl-cert"

  timeouts {
    create = "30m"
    update = "15m"
    delete = "5m"
  }
}
```

Here:

- `uuid` — the identifier of the image-based application instance.
- `domain` — the FQDN of the domain where the instances of your image-based application will reside and for which the SSL certificate will be issued.
- `path_cert` — the path to the directory where the SSL certificate file and the file with its private key will be stored.
- `renewal_hook_path` — the path to the directory with the script that will be run after the SSL certificate is updated.
- `cert_files_owner` — the owner user of the SSL certificate files and its private key.
- `cert_files_group` — the user group for the SSL certificate files and its private key.
- `timeouts.create` — the timeout for creating the SSL certificate.
- `timeouts.update` — the timeout for updating the SSL certificate.
- `timeouts.delete` — the timeout for deleting the SSL certificate.

{/cut}