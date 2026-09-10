# {heading(Manage certificates)[id=certificates_manage]}

{include(/en/_includes/_translated_by_ai.md)}

TLS certificate replacement is available for the following services: Cloud Trino, Cloud Airflow, Cloud ClickHouse, Cloud PostgreSQL, Redis, OpenSearch.

## {heading(View the list of certificates)[id=certificates_view]}

1. Go to **Data Platform** → **Certificates**.
1. View the list of certificates in the table. For each certificate, the following details are displayed: name, current status, description, and expiration date.

## {heading(Create a certificate)[id=certificates_create]}

1. Go to **Data Platform** → **Certificates**.
1. Click **Add**.
1. Specify the certificate name.
1. (Optional) Specify the certificate description.
1. Upload the certificate files. For each file, choose the upload method:

   - **Upload certificate** — drag and drop the file into the upload area or select a file from your device.
   - **Paste as text** — paste the certificate content into the text field.

   Available file types:

   - **Certificate** — the server's public certificate in PEM format. The server presents it to the client during TLS handshake.
   - **Certificate chain** — intermediate certificates in PEM format. They link the server certificate to a trusted root certificate authority. Without the chain, the client cannot verify the certificate's authenticity.
   - **Private key** — the private key in PEM format corresponding to the certificate. Used by the server to complete the TLS handshake.

   To replace or delete an uploaded file, click **•••** next to the file and select the desired action.

1. Click **Create**.

## {heading(View certificate details)[id=certificates_info]}

1. Go to **Data Platform** → **Certificates**.
1. Click the name of the required certificate.
1. View the certificate information:

   - **Name** — the certificate name.
   - **Description** — the certificate description.
   - **Certificate ID** — the unique certificate identifier.
   - **Issued by** — the certificate authority that issued the certificate.
   - **Status** — the current certificate status.
   - **Expiration date** — the period during which the certificate is valid.
   - **Date added** — the date and time when the certificate was created.
   - **Added by** — the user who created the certificate.
   - **Connected instances** — service instances that the certificate is connected to.

## {heading(Delete a certificate)[id=certificates_delete]}

1. Go to **Data Platform** → **Certificates**.
1. Click **•••** for the required certificate and select **Delete**.
1. Confirm the deletion.
