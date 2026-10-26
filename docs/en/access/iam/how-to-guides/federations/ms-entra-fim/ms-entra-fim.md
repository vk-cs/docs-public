# {heading(Setting up identity federation via MS Entra)[id=iam-ms-entra-fim]}

{include(/en/_includes/_translated_by_ai_en.md)}

You can connect your Identity Provider (IdP) to VK Cloud. This will allow your employees to log in to VK Cloud without entering a login and password, using corporate authentication credentials from the identity provider. This mode is called identity federation.

To work in federation mode, the identity provider must support the SAML 2.0 standard.

Below is the setup of identity federation for logging in to VK Cloud with [Microsoft Entra](https://www.microsoft.com/en-in/security/business/microsoft-entra) as the identity provider.

{note:info}
To set up login to the VK Cloud technical support portal using identity federation, see the [instruction](/en/access/iam/instructions/support-fim).
{/note}

## Preparation steps

[Configure](https://learn.microsoft.com/en-us/entra/fundamentals/) Microsoft Entra, create a tenant, users, and groups.

## 1. Create an identity federation in VK Cloud

{note:info}
Operations for creating a VK Cloud identity federation are available only to users with the [role](/en/access/iam/concepts/roles-reference) of project owner.
{/note}

1. [Go](https://cloud.vk.ru/account) to your VK Cloud account.
1. Go to the **Identity Federation** section.
1. Go to the **Federations** tab and click the **Create** button.
1. Click the **Download metadata** button. A metadata file will be downloaded, which will be needed for configuring Microsoft Entra.
1. Copy the value of the **URL for federated user login** parameter. This value will need to be specified when configuring Microsoft Entra.

## 2. Configure Microsoft Entra

1. Go to the [Microsoft Entra](https://www.microsoft.com/ru-ru/security/business/microsoft-entra) admin center.
1. Go to the **Applications → Enterprise applications** tab.
1. Click the **Microsoft Entra SAML Toolkit** application, then click the **Create** button to start creating a new enterprise application.
1. In the settings window of the new application, go to the **Single sign-on** tab and select **SAML**.
1. Click the **Upload metadata file** button and upload the federation metadata file.
1. Click the **Add** button.
1. In the **Sign-on URL** field, specify the URL for federated user login that was copied when creating the federation in the VK Cloud management console.
1. Click the **Save** button.
1. Go to the **Users and groups** section in the application settings.
1. [Create](https://learn.microsoft.com/ru-ru/entra/fundamentals/how-to-manage-groups) at least one group that will be used for mapping user roles in the management console.
1. Go to the **Single sign-on → SAML** section in the application settings.
1. In the **Attributes and claims** block, click the **Edit** button to edit the claims.
1. Modify the existing claims and add new ones:

    1. For the `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname` claim, click ![](/en/assets/more-icon.svg "inline") and select **Delete**.
    1. Click the `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name` claim and change the source attribute to `user.givenname`.
    1. Click the **Add group claim** button.
    1. Select **Groups assigned to the application**.
    1. In the **Source attribute** list, select **Cloud group display names**.
    1. Click **Advanced options**.
    1. Enable the **Customize the name of the group claim** option to specify the claim type.
    1. In the **Name** field, specify `http://schemas.xmlsoap.org/claims/Group`.
    1. Click the **Save** button.
    1. (Optional) Add a new claim, specifying `phone_number` as the namespace and `user.mobilephone` as the source attribute.
1. Go to the **Single sign-on → SAML** section in the application settings.
1. In the **SAML certificates** block, create a new certificate or import an existing one.
1. Click the **Federation XML metadata** button. The IdP metadata will be downloaded.

## 3. Upload Microsoft Entra metadata to the VK Cloud identity federation

1. [Go](https://cloud.vk.ru/account) to your VK Cloud account.
1. Go to the **Identity Federation** section.
1. Go to the **Federations** tab and click the **Upload IdP metadata** button to upload the new metadata.
1. Select the Microsoft Entra metadata file and click the **Upload** button.

## {heading(4. Configure the group and role mapping in VK Cloud)[id=iam-ms-entra-fim-groups-roles]}

{note:info}
Operations for configuring the group and role mapping in VK Cloud are available only to the following management console [roles](/en/access/iam/concepts/roles-reference): owner, superadministrator, and user administrator (IAM).
{/note}

1. In the same section of the [VK Cloud account](https://cloud.vk.ru/account), go to the **Groups** tab.
1. Click the name of the project for which the identity federation is being configured.
1. Add the groups you use in Microsoft Entra:

    1. Click the **Add** button. If there are already created groups on the page, click the **Add group** button.
    1. Configure the group:

        - **Group name**: specify the group name. The name of the created group must match the name of the [group](https://learn.microsoft.com/ru-ru/entra/fundamentals/quickstart-create-group-add-members) in Microsoft Entra, but it must be in lowercase.
        - **Permissions** — select the level at which the group permissions will apply:
           - **Project** — select to link the group and roles within a single project. In different projects, the same group can be linked to different roles, which allows you to differentiate the federated user's access level to projects.
           - **Domain** — select to link the group and roles across all projects of one owner and provide the federated user with a unified access level to them. The **Domain** permission is available only to the project owner.
        - **Group roles**: select the VK Cloud [roles](/en/access/iam/concepts/roles-reference) or [permissions](/en/access/iam/concepts/permissions-reference) that match your access matrix for the created group.

    1. Click the **Add** button.

## 5. Verify the ability to log in via the federation

1. [Create](https://learn.microsoft.com/ru-ru/entra/fundamentals/how-to-create-delete-users) a test user in Microsoft Entra and [add](https://learn.microsoft.com/ru-ru/entra/fundamentals/quickstart-create-group-add-members) them to the desired group.
1. (Optional) Go to the **Token encryption** menu item and add the certificate that can be obtained from the federation metadata file.
    {cut(How to obtain a certificate from the metadata file?)}
    1. Open the metadata file in a text editor.
    1. Copy the content between the `<X509Certificate>` and `</X509Certificate>` tags.
    1. Paste the copied text into a separate text file and save it with the `.cer` extension.
    {/cut}
1. Enter the URL for federated user login in the browser address bar. You will be redirected to the authentication page.
1. Enter the test user's authentication credentials. After successful authorization, you will be redirected to the main page of the VK Cloud management console.
1. Verify that the automatically assigned VK Cloud user role matches the one selected when [adding the group](#iam-ms-entra-fim-groups-roles).