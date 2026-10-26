
{include(/en/_includes/_translated_by_ai_en.md)}

When attempting to log in via an identity federation, the following message is displayed:

```plaintext
Forbidden: failed to parse saml response: received saml assertion with empty email (pls check user email on IdP side)
```

This error occurs if the identity provider (IdP) has incorrectly configured sending of email messages from user attributes, or if the user's email field in the IdP is not filled in.

## Solution

1. Make sure the user's email field is filled in in the IdP.
1. If the email field is filled in or filling it in did not help, check and, if necessary, change the email message sending setting in your IdP.
1. If the problem persists, contact the technical support of your IdP.