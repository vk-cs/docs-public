ADFS certificates have an expiration date, once it expires, users will not be able to sign in. To ensure authentication works correctly, update the federation certificate. You can do this [manually](#manual-update) or configure [automatic](#auto-update) updating.

## {heading(Manual certificate update)[id=manual-update]}

1. [Go](https://cloud.vk.com/account) to your VK Cloud account.
1. Go to the **Identity Federation** section.
1. Go to the **Federations** tab.
1. Click the **Download metadata** button.
1. Copy the downloaded file to the computer with ADFS.
1. Run PowerShell as administrator and run the command:

    ```bash
    Update-ADFSRelyingPartyTrust -TargetName "<RELYING_PARTY_TRUST_NAME>" -MetadataFile <PATH_TO_METADATA_XML>
    ```

    Here:

   - `<RELYING_PARTY_TRUST_NAME>` is the name of the relying party (relying party trust).
   - `<PATH_TO_METADATA_XML>` is the path to the XML file with federation metadata.

1. On your computer, open **ADFS** — **Relying Party Trust** and go to the **Encryption** tab. Check that the certificate is updated.
1. Check that federated access is working. To do this, sign in to the system under the account of any active user.

## {heading(Automatic certificate update)[id=auto-update]}

1. Get your identity federation ID:

   1. [Go](https://cloud.vk.com/account) to your VK Cloud account.
   1. Go to the **Identity Federation** section.
   1. Go to the **Federations** tab.
   1. Copy the value of the **Federation ID** parameter.

1. On your computer, open **ADFS** — **Relying Party Trust** and go to the **Monitoring** tab.
1. In the **Relying party's federation metadata URL** box, enter the URL for updating metadata:

    ```text
    https://msk.cloud.vk.com/federation-service/v1/federation/saml/<FEDERATION_ID>/metadata
    ```

    Here `<FEDERATION_ID>` is the value of the **Federation ID** parameter of the **Identity Federation** section in the VK Cloud account.

1. Check the availability of metadata by clicking the **Test URL** button.

1. Enable the **Monitor relying party** and **Automatically update relying party** options, then click the **Apply** button.

1. (Optional) Check the settings for the interval between metadata checks for ADFS by running the PowerShell command:

    ```bash
    Get-ADFSProperties | select MonitoringInterval
    ```

    The default interval between metadata checks is 1440 minutes (24 hours).

1. (Optional) Change the check interval by running the PowerShell command:

    ```bash
    Set-AdfsProperties -MonitoringInterval <MINUTES>
    ```

    Here `<MINUTES>` is the number of minutes between metadata checks.

1. Wait for the metadata to be updated. After that, on your computer, open **ADFS** — **Relying Party Trust** and go to the **Encryption** tab. Verify that the certificate is updated.
1. Check that federated access is working. To do this, sign in to the system under the account of any active user.