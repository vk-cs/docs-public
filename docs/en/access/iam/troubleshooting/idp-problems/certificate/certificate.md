
{include(/en/_includes/_translated_by_ai_en.md)}

When attempting to log in through the identity federation, the following message is displayed:

```plaintext
Forbidden: received invalid saml response: cannot validate signature on Assertion: Could not verify certificate against trusted certs
```

The error occurs if the certificate on the Identity Provider (IdP) side has changed. For example, during automatic certificate renewal.

## Solution

Upload the IdP metadata for the federation again:

1. [Go](https://cloud.vk.ru/account) to your VK Cloud account.
1. Go to the **Identity Federation** section, to the **Federations** tab.
1. Click the **Upload IdP metadata** button and add the XML file with the Identity Provider metadata.
1. Click the **Upload** button.
1. If the problem persists or you cannot upload the metadata via your VK Cloud account, contact [technical support](/en/contacts) and attach the XML file with the Identity Provider metadata.