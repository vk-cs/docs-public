[Keycloak](https://www.keycloak.org/) is an authentication and access management system. You can use Keycloak in Cloud Desktop as a SAML identity provider.

The following shows how to prepare Keycloak to work with Cloud Desktop.

## Preparatory steps

1. Install Keycloak following the instructions in the [official documentation](https://www.keycloak.org/getting-started/getting-started-docker).
1. Log in to the Keycloak administrator console.
1. Create a new realm.

   1. Expand the list of realms in the left side menu and click the **Create realm** button.
   1. Specify a name for the new realm in the **Realm name** field and click the **Create** button.

## 1. Add and configure LDAP provider

1. In the side menu, go to the **User federation** section.
1. Click the **Add Ldap providers** button.
1. In the **General options** block, select `Active Directory` for the **Vendor** parameter.
1. In the **Connection and authentication settings** block, make the following settings:

   1. Specify the **Connection URL** to connect to your LDAP server, for example, `ldap://125.125.125.125:389`.
   1. To test the connection, click the **Test connection** button.
   1. Leave the **Bind type** value as `simple`.
   1. In the **Bind DN** field, specify the distinguished name (DN) of an account with read access to AD, for example, `CN=ServiceUser,CN=Users,DC=test,DC=local`. Keycloak will use this account to access your LDAP server.
   1. In the **Bind credentials** field, specify the account password.
   1. To test access to your LDAP server, click the **Test authentication** button.

1. In the **LDAP searching and updating** block, set the parameters:

   - **Edit mode**: `READ_ONLY`.
   - **Users DN**: specify a path to search for user accounts in AD, for example, `CN=users,DC=rcad3,DC=local`.
   - **Username LDAP attribute**: `sAMAccountName`.
   - **RDN LDAP attribute**: `cn`.
   - **UUID LDAP attribute**: `objectGUID`.
   - **User object classes**: `person, organizationalPerson, user`.
   - **User LDAP filter**: leave this field blank.
   - **Search scope**: `Subtree`.
   - **Read timeout**: leave this field blank.
   - **Pagination**: `Off`.
   - **Referral**: not selected.

1. In the **Synchronization settings** block, set the parameters:

   - **Import users**: `On`.
   - **Sync Registrations**: `On`.
   - **Batch size**: leave this field blank.
   - **Periodic full sync**: `On`.
   - **Periodic changed users sync**: `On`.

1. In the **Kerberos integration** block, select `Off` for all parameters.
1. In the **Cache settings** block, leave the **Cache policy** parameter set to `DEFAULT`.
1. In the **Advanced settings** block, select `Off` for all parameters.
1. Save the settings.

## 2. Configure mappers

1. In the **User federation** section, click the name of the created LDAP provider and go to the **Mappers** tab.
1. Click the **Add mapper** button.
1. Specify a name for the new mapper and select the `group-ldap-mapper` type from the list.
1. Specify the mapper parameters:

   - **LDAP Groups DN**: specify a path to search for groups in AD, for example, `CN=Groups,DC=test,DC=local`.
   - **Group Name LDAP Attribute**: `samaccountname`.
   - **Group Object Classes**: `group`.
   - **Preserve Group Inheritance**: `Off`.
   - **Ignore Missing Groups**: `Off`.
   - **Membership LDAP Attribute**: `member`.
   - **Membership Attribute Type**: `DN`.
   - **Membership User LDAP Attribute**: `sAMAccountName`.
   - **Mode**: `READ_ONLY`.
   - **User Groups Retrieve Strategy**: `LOAD_GROUPS_BY_MEMBER_ATTRIBUTE`.
   - **Member-Of LDAP Attribute**: `memberOf`.
   - **Drop non-existing groups during sync**: `Off`.
   - **Groups Path**: `/`.

1. Save the settings.
1. Click the **Add mapper** button.
1. Specify a name for the new mapper and select the `user-attribute-ldap-mapper` type from the list.
1. Specify the mapper parameters:

   - **User Model Attribute**: `username`.
   - **LDAP Attribute**: `cn`.
   - **Read Only**: `On`.
   - **Always Read Value From LDAP**: `Off`.
   - **Is Mandatory In LDAP**: `Off`.
   - **Force a Default Value**: `Off`.
   - **Is Binary Attribute**: `Off`.

1. Save the settings.
1. Click the name of the previously created mapper of the `group-ldap-mapper` type.
1. In the **Action** list, select **Sync LDAP groups to Keycloak**.
1. In the side menu, go to the **Groups** section and make sure the groups are loaded and contain users.

## 3. Create client for Keycloak

1. In the side menu, go to the **Clients** section.
1. Click the **Create client** button and set the parameters:

   - **Client type**: `SAML`.
   - **Client ID**: specify the unique identifier of your application in the SAML authentication service.
   - **Name**, **Description**: leave these fields blank.
   - **Always display in UI**: `Off`.

1. Click the **Next** button.
1. For the **Valid redirect URIs** parameter, specify the `*` value, leave the other fields blank.
1. Save the settings.

## 4. Configure mappers for client

1. On the page of the created client, go to the **Keys** tab.
1. Set the **Client signature required** parameter to `Off`.
1. Go to the **Client scopes** tab.
1. In the list, click the name of the created client with the `-dedicated` postfix.
1. Click the **Configure a new mapper** button.
1. Click **Group List** and set the parameters:

   - **Name**: specify a name for the new mapper.
   - **Group attribute name**: `memberOf`.
   - **SAML Attribute NameFormat**: `Basic`.
   - **Single Group Attribute**: `On`.
   - **Full group path**: `Off`.

1. Save the settings.

1. To add one more mapper, click the back arrow.
1. In the **Add mapper** list, select **By configuration**.
1. Click **User Attribute** and set the parameters:

   - **Name**: specify a name for the new mapper.
   - **User Attribute**: `LDAP_ID`.
   - **SAML Attribute Name**: `ldapUUID`.
   - **SAML Attribute NameFormat**: `Basic`.
   - **Aggregate attribute values**: `Off`.

1. Save the settings.

## 5. Complete Keycloak setup

1. In the side menu, go to the **Realm Settings** section.
1. Set the **Require SSL** parameter to `None`.
1. In the **Endpoints** block, copy the **SAML 2.0 Identity Provider Metadata** link. When configuring [two-factor authentication using the SAML service](../../service-management/config/setup-saml), you will need to specify it as the value of the **Metadata URL** parameter.
1. In the side menu, go to the **User Federation** section and click the name of the created LDAP provider.
1. In the **Action** list, select **Sync all users**.

Keycloak setup is complete.
