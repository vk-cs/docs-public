# {heading(Managing access rules)[id=iaas-fs-access-rules]}

{include(/en/_includes/_translated_by_ai_en.md)}

## {heading(Adding an access rule)[id=iaas-fs-access-rules-adding]}

{tabs}

{tab(Management console)}

1. {ifdef(public)}[Go to](https://msk.cloud.vk.ru/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifdef} the {var(cloud)} management console.
1. Select the {linkto(../../../../../tools-for-using-services/account/concepts/projects#tools-account-concepts-projects)[text=project]} where the desired file storage is located.
1. Go to the **Cloud Computing** → **File Storage** section.
1. Click on the name of the desired file storage.
1. Go to the **Access Rules** tab.
1. Click **Add new rule**.
1. Specify the IP or subnet address of the source and the access mode.
1. Click **Add rule**.

{/tab}

{tab(OpenStack CLI)}

1. Make sure that the OpenStack client is {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=installed]} and {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=authenticate]} in the project.
1. Make sure that the Manila client is {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install-package)[text=installed]}.
1. Add an access rule using the command:

   ```console
   openstack share access create <STORAGE> ip <NETWORK_IP> --access-level <ACCESS_MODE>
   ```

   Here:

   - `<STORAGE>` — name or identifier of the file storage.
   - `<NETWORK_IP>` — network address of the file storage in CIDR format.
   - `<ACCESS_MODE>` — an argument that takes the values `rw` (read and write) or `ro` (read only).

1. Verify that the rule was created successfully by requesting the list of access rules:

   ```console
   openstack share access list <STORAGE>
   ```

   Here `<STORAGE>` — name or identifier of the file storage.

{/tab}

{/tabs}

## {heading(Deleting an access rule)[id=iaas-fs-access-rules-deleting]}

{tabs}

{tab(Management console)}

1. {ifdef(public)}[Go to](https://msk.cloud.vk.ru/app/){/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf)}{linkto(../../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Go to]}{/ifdef} the {var(cloud)} management console.
1. Select the {linkto(../../../../../tools-for-using-services/account/concepts/projects#tools-account-concepts-projects)[text=project]} where the desired file storage is located.
1. Go to the **Cloud Computing** → **File Storage** section.
1. Click on the name of the desired file storage.
1. Go to the **Access Rules** tab.
1. Click ![ ](../../../../../assets/more-icon.svg "inline") for the desired rule and select **Delete**.
1. Click **Confirm**.

{/tab}

{tab(OpenStack CLI)}

1. Make sure that the OpenStack client is {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=installed]} and {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=authenticate]} in the project.
1. Make sure that the Manila client is {linkto(../../../../../tools-for-using-services/cli/openstack-cli#openstack-install-package)[text=installed]}.
1. Get the identifier of the desired rule by requesting the list of access rules:

   ```console
   openstack share access list <STORAGE>
   ```

   Here `<STORAGE>` — name or identifier of the file storage.

1. Delete the access rule using the command:

   ```console
   openstack share access delete <STORAGE> <RULE_ID>
   ```

   Here:

   - `<STORAGE>` — name or identifier of the file storage.
   - `<RULE_ID>` — identifier of the access rule to be deleted.

{/tab}

{/tabs}