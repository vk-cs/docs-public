Cloud Desktop supports two ways to authenticate users when they connect to remote desktops:

- Authentication with an AD or LDAP user directory service. Used by default.
- Two-factor authentication with the [SAML](https://en.wikipedia.org/wiki/Security_Assertion_Markup_Language) service (available only for Windows desktop pools).

Only one of the user authentication methods is used at a time for all desktops in your Cloud Desktop infrastructure. If necessary, you can switch between the authentication methods. This does not require reconfiguring other Cloud Desktop components: the network and the connection to the user directory.

To use the SAML authentication service in Cloud Desktop, complete the following preparation steps:

1. [Configure](../setup-ldap) an AD or LDAP user directory service.
1. Connect your SAML identity provider to the same domain as the directory service.
1. Prepare your SAML identity provider for integration with Cloud Desktop. The configuration procedure depends on the chosen SAML provider.

    {note:info}

    An example of setting up a SAML identity provider is provided in the [Keycloak integration](../../../how-to-guides/keycloak) section.

    {/note}

To set up two-factor authentication using the SAML service:

1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
1. Go to **Cloud Desktop → Service settings**.
1. (Optional) On the **SAML** tab, enable the **Enable SAML** option.

    If the option is disabled, user authentication will be performed using the AD or LDAP directory service.

1. On the **SAML** tab, specify the parameters:

    - **Client ID**: specify the unique identifier of the client application in the SAML authentication service.
    - **Metadata URL**: specify the URL where the XML file with metadata for SAML integration is located.
    - **Check SSL**: enable this option to check the entire chain of certificates for validity and absence from revocation lists. If this option is disabled, only the presence of an SSL certificate will be checked.
    - **Binding Type**: select the method for sending a response to a SAML authentication request.
    - **Response Binding Type**: select the method for redirecting a user back to the service that requested SAML authorization.
    - **Name ID format**: select which NameID format will be used to map name identifiers across identity providers and service providers. The following values ​​are available:

        - `Unspecified`: the NameID format is specified directly in the SAML authentication request.
        - `NotConfigured`: the NameID format is not configured and is not passed in the request.
        - `Email address`: NameID matches the user's email address, for example, `john@company.com`.
        - `Transient`: the SAML service identifies the user using the provided NameID and grants access that is valid for only one session.
        - `Persistent`: the provided NameID is registered with the SAML service and is used for multiple sessions.
        - `X509SubjectName`: NameID matches the username in the X.509 certificate, for example, `CN=john,O=Company Ltd.,C=US`.
        - `WindowsDomainQualifiedName`: NameID matches the user name in the FQDN format, for example, `CompanyDomain\John`.
        - `KerberosPrincipalName`: NameID matches the principal name in the Kerberos protocol, for example, `john@realm`.
        - `EntityIdentifier`: NameID is in the URI format and is used to identify the SAML service provider.

    - **Group Attr Name**: specify the type of user attribute that will be returned by the SAML service and which the system will use to decide whether to grant access. The attribute can be of any type. Typically, the `memberOf` value is specified, i.e. access is granted depending on which group the user belongs to.

1. Click **Save**.
