*Identity federation* is a system of trust relationships between independent security domains, in which each domain maintains its own access control system but accepts authentication results performed by another domain within the federation. With federated login, a user authenticated in one domain gains access to resources of another domain. For example, a user can access VK Cloud without entering a login and password by using their corporate network credentials.

A separate service — an *Identity Provider (IdP)* — is responsible for authentication and storage of credentials in federation mode.

You can connect your identity provider to VK Cloud. Identity federation can be configured via:

- [Active Directory](/en/access/iam/how-to-guides/federations/add-fim-for-ad),
- Keycloak,
- Microsoft Entra.

The identity provider must support the SAML 2.0 standard.
