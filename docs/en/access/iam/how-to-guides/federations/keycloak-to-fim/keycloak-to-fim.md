# {heading(Setting up identity federation via Keycloak)[id=iam-keycloak-fim]}

{include(/en/_includes/_translated_by_ai_en.md)}

You can connect your Identity Provider (IdP) to VK Cloud. This will allow your employees to log in to VK Cloud without entering a login and password, using corporate authentication credentials from the identity provider. This mode is called identity federation.

To work in federation mode, the identity provider must support the SAML 2.0 standard.

The following describes how to set up identity federation for logging in to VK Cloud with [Keycloak](https://www.keycloak.org) as the identity provider.

{note:info}
To set up login to the VK Cloud technical support portal using identity federation, see the [instructions](/en/access/iam/instructions/support-fim).
{/note}

## Preparation steps

1. [Install and configure](https://www.keycloak.org/guides) a Keycloak server if you do not already use this identity provider.
1. Get the Keycloak metadata:

    1. [Log in](https://www.keycloak.org/docs/latest/server_admin/index.html#using-the-admin-console) to the Keycloak admin console.
    1. [Create](https://www.keycloak.org/docs/latest/server_admin/index.html#proc-creating-a-realm_server_administration_guide) a realm in Keycloak or use an existing one.
    1. Go to the **Realm settings** tab and click **SAML 2.0 Identity Provider Metadata**. An XML file with the Keycloak metadata will be downloaded.

## 1. Create an identity federation in VK Cloud

{include(/en/_includes/_create-fim.md)[tags=keycloak]}

## 2. Configure Keycloak

1. [Log in](https://www.keycloak.org/docs/latest/server_admin/index.html#using-the-admin-console) to the Keycloak admin console.
1. Go to the **Clients** tab.
1. Click **Import client** and upload the metadata obtained when creating the federation. Leave the parameters unchanged:

    * **Type**: `saml`.
    * **Encrypt assertions**: `On`.
    * **Client signature required**: `Off`.

1. Click **Save**.
1. Go to the **Client scopes** tab of the created client and click the scope created for the default client.
1. Click **Configure a new mapper**, select **User Property**, and fill in the parameters:

    * **Name**: `email`.
    * **Property**: `email`.
    * **SAML Attribute Name**: `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress`.
    * **SAML Attribute NameFormat**: `URI Reference`.

1. Select **Group list** and add another mapper:

    * **Name**: `groups`.
    * **Group attribute name**: `http://schemas.xmlsoap.org/claims/Group`.
    * **SAML Attribute NameFormat**: `URI Reference`.
    * **Single Group Attribute**: `On`.
    * **Full group path**: `Off`.

1. (Optional) Click **Configure a new mapper**, select **User Property**, and add two attributes to synchronize user information with the management console:

    * User first name:

        * **Name**: `firstName`.
        * **Property**: `firstName`.
        * **SAML Attribute Name**: `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name`.
        * **SAML Attribute NameFormat**: `URI Reference`.

    * User last name:

        * **Name**: `lastName`.
        * **User Attribute**: `lastName`.
        * **SAML Attribute Name**: `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname`.
        * **SAML Attribute NameFormat**: `URI Reference`.

## {heading(3. Configure the mapping of groups and roles in VK Cloud)[id=iam-keycloak-fim-groups-roles]}

{note:info}

Operations for configuring the mapping of groups and roles in VK Cloud are available only to the following [roles](/en/access/iam/concepts/roles-reference) of the management console: owner, superadministrator, and user administrator (IAM).

{/note}

1. [Go to](https://cloud.vk.ru/account) your VK Cloud account.
1. Go to the **Identity Federation** section.
1. Go to the **Groups** tab.
1. Click the name of the project for which identity federation is being configured.
1. Add the groups that you use in Keycloak:

    1. Click **Add**. If groups have already been created on the page, click the **Add group** button.
    1. Configure the group:

        * **Group name**: specify the group name. The name of the group being created must match the name of the [group](https://www.keycloak.org/docs/latest/server_admin/index.html#proc-managing-groups_server_administration_guide) in Keycloak, but it must be in lowercase.
        * **Permissions**:
           * Select **Project** to link the group and roles within a single project. In different projects, you can link the same group with different roles, which allows you to differentiate the federated user's level of access to projects.
           * Select **Domain** to link the group and roles across all projects of one owner and provide the federated user with a unified level of access to them. The **Domain** permission is available only to the project owner.
        * **Group roles**: select the VK Cloud [roles](/en/access/iam/concepts/roles-reference) or [permissions](/en/access/iam/concepts/permissions-reference) that correspond to your access matrix for the group being created.

    1. Click **Add**.

## 4. Verify the ability to log in via the federation

1. [Create](https://www.keycloak.org/docs/latest/server_admin/index.html#proc-creating-user_server_administration_guide) a user in Keycloak and [add](https://www.keycloak.org/docs/latest/server_admin/index.html#proc-managing-groups_server_administration_guide) them to the desired group.
1. Enter the URL for federated user login in the browser address bar. You will be redirected to the Keycloak authentication page.
1. Enter the user's authentication credentials. After successful authorization, you will be redirected to the main page of the VK Cloud management console.
1. Check that the automatically assigned VK Cloud user role matches the one selected when [adding the group](#iam-keycloak-fim-groups-roles).