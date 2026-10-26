# {heading(Password issue when connecting a network drive)[id=invalid_password_network_drive]}

{include(/en/_includes/_translated_by_ai_en.md)}

The `Invalid password` error when connecting a network drive may indicate incorrect credentials or access settings.

### {heading(Solution)[id=invalid_password_network_drive-decision]}

Check the access rules for the file storage:

1. Go to the **Cloud Computing** → **File Storage** section.
1. Click the name of the desired file storage.
1. Go to the **Access Rules** tab.

For CIFS and SMB protocols, access must be allowed for the user or IP address, and a correct password must be set.

If the problem persists, contact {ifdef(public)}[technical support](/en/contacts){/ifdef}{ifdef(private,private-pg)}the {var(cloud)} administrator{/ifdef}.