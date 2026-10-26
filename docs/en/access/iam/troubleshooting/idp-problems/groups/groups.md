{include(/en/_includes/_translated_by_ai_en.md)}

When trying to log in via the identity federation, the following message is displayed:

```plaintext
Forbidden: role mapping misconfiguration: IdP group list is empty
```

This error occurs if the sending of the group membership assertion is misconfigured on the identity provider (IdP) side, or the user does not belong to any groups.

## Solution

1. Make sure that the user belongs to at least one group in your IdP.
1. If the user belongs to a group or adding them to a group did not help, check and, if necessary, configure the sending of the group membership assertion in the IdP.
1. If the problem persists, contact the technical support of your IdP.