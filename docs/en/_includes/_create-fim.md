Only users with the project owner {linkto(/en/access/iam/concepts/rolesandpermissions#iam-concepts-rolesandpermissions)[text=role]} can create VK Cloud identity federations.

1. [Go to](https://cloud.vk.ru/account) your VK Cloud account.
1. Go to the **Identity federation** section, **Federations** tab.
1. Click **Create**.
1. Click **Upload IdP metadata**.

   {includetag(ad-fs)}
1. Add the XML file with the AD FS metadata and click **Upload**.
   {/includetag}

   {includetag(keycloak)}
1. Add the XML file with the Keycloak metadata and click **Upload**.
   {/includetag}

1. Click **Download metadata** to save the XML file with the federation metadata. This file will later be used to create a relying party trust.

The **Federations** tab will display the federation data:

- URL for federated users to sign in to the VK Cloud management console, for example: `https://cloud.vk.ru/v1/federation/saml/54f0267b-31f6-XXXX-XXX-2a24c5f436fb/signin`.
- Federation ID, for example: `54f0267b-31f6-XXXX-XXX-2a24c5f436fb`.
