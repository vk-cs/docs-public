You can connect your identity provider (IdP) to VK Cloud. This will allow your employees to access VK Cloud without entering their login and password, using their corporate authentication data from the IdP. This mode is called Identity Federation .

To work in federated mode, the IdP must support the SAML 2.0 standard.

The following steps will show you how to configure federated identity using the [Active Directory Federation Services (AD FS)](https://learn.microsoft.com/en-us/windows-server/identity/ad-fs/ad-fs-overview) as an example.

## Preparation

[Set up AD FS](https://learn.microsoft.com/ru-ru/windows-server/identity/ad-fs/ad-fs-deployment) and [create](https://learn.microsoft.com/en-us/powershell/module/activedirectory/add-adgroupmember?view=windowsserver2022-ps) users and groups.

## 1. Request Federated Identity Connection to VK Cloud

1. [Export](https://adfshelp.microsoft.com/MetadataExplorer/GetFederationMetadata) the XML metadata file of your AD FS
1. Contact [technical support](/en/contacts/) and request to connect federated identity. Provide the project owner's login who will configure users and groups and attach the exported XML metadata file of AD FS.

1. Wait for a response from technical support. They will provide you with the following credentials:

   - XML file for configuring the relying party trust.
   - URL for federated users to sign in to VK Cloud. Example: `https://cloud.vk.com/v1/federation/saml/54f0267b-31f6-XXXX-XXX-2a24c5f436fb/signin`.
   - Federation ID, found in the URL for signing in to VK Cloud. Example: `54f0267b-31f6-XXXX-XXX-2a24c5f436fb`.

## 2. Set up AD FS

1. Create a relying party trust using federation metadata. Use the XML metadata file provided by the technical support. [Instructions here](https://learn.microsoft.com/en-us/windows-server/identity/ad-fs/operations/create-a-relying-party-trust#to-create-a-claims-aware-relying-party-trust-using-federation-metadata).
2. Configure the mapping between user attributes and AD FS outgoing claim types (Claims Mapping). Add the following rules:
   - Sending an authentication method claim: [Send an Authentication Method Claim](https://learn.microsoft.com/en-us/windows-server/identity/ad-fs/operations/create-a-rule-to-send-an-authentication-method-claim)
   - Sending LDAP attributes as claims: [Send LDAP Attributes as Claims](https://learn.microsoft.com/en-us/windows-server/identity/ad-fs/operations/create-a-rule-to-send-ldap-attributes-as-claims)
   - Sending group membership as a claim: [Send Group Membership as a Claim](https://learn.microsoft.com/en-us/windows-server/identity/ad-fs/operations/create-a-rule-to-send-group-membership-as-a-claim)

## 3. Configure role and group mapping in VK Cloud

Configuring the relationship between AD FS groups and VK Cloud roles is available only to the following roles in the personal account [roles](../../concepts/rolesandpermissions): Project owner, Superadministrator, and user access administrator. Viewing the relationships is also available to Project administrators and Viewers.

1. [Go](https://cloud.vk.com/app/) to your VK Cloud personal account.
2. Go to the **Manage access** section.
3. Click on the **Groups** tab.
4. Add the groups that you use in Active Directory:

   1. Click the **Add** button. If there are already created groups on the page, click the **Add group** button.
   2. Configure the group:
      - **Group name**: specify the name of the Active Directory group that the user is a member of.
      - **Permissions**:
         - Select **Project** to associate the group and roles within the same project. You can associate the same group with different roles in different projects, which allows you to differentiate the level of federated user access to projects.
         - Select **Domain** to associate the group and roles across all projects. The **Domain** permission is only available to the project owner and provides the federated user with the same access level to all projects owned by the owner.
      - **Group roles**: select the [VK Cloud roles](../../concepts/rolesandpermissions/), that correspond to your access matrix for the group being created.

   1. Click the **Add group** button.

## 4. Check the possibility of logging in via federation

1. Enter the URL for federated user login in the browser address bar. You will be redirected to the AD FS authentication page.
2. Enter your corporate authentication credentials. After successful authorization, you will be redirected to the main VK Cloud personal account page.
3. Verify that the automatically assigned VK Cloud user role matches the one selected during [group configuration](#3_configure_role_and_group_mapping_in_vk_cloud).

<warn>

Active Directory is not automatically synchronized with VK Cloud. After blocking a user in Active Directory, [remove](/en/base/account/instructions/project-settings/access-manage#deleting_member) them from projects in the VK Cloud personal account.

</warn>
