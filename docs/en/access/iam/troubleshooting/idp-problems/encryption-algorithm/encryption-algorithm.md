
{include(/en/_includes/_translated_by_ai_en.md)}

When trying to log in via an identity federation, the following message is displayed:

```plaintext
Forbidden: received invalid saml response: failed to decrypt EncryptedAssertion: algorithm is not implemented: http://www.w3.org/2009/xmlenc11#aes256-gcm
```

The error occurs if the signature encryption algorithm on the IdP side is not supported by the security settings.

## Solution

1. On the IdP side, change the signature encryption algorithm to one of the following:

   - aes128-cbc,
   - aes192-cbc,
   - aes256-cbc,
   - tripledes-cbc,
   - aes128-gcm.

1. If the problem persists, contact [technical support](/en/contacts).