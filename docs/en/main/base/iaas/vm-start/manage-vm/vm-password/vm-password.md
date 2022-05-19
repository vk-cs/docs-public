In VK CS, it is possible to set a user password for Windows and Linux operating systems. To do this, the following conditions must be met:

- The instance is created from the image provided by VK CS, or the QEMU guest agent is installed and running in the system.
- At least 15 minutes have passed since the VM was created.

## VK CS Control Panel

To set a password [in VK CS personal account](https://mcs.mail.ru/app/services/infra/servers/), should:

1. Go to the "Virtual Machines" page of the "Cloud Computing" service.
2. Click on the desired instance, go to the "Console" tab.
3. Select "Set Password". In the password setup menu that appears, enter the password into the input form or select the "Generate" option.

<warn>

The password must contain uppercase and lowercase letters of the Latin alphabet, numbers, symbols !"#$%&()\*+,-.:;<=>?@[]^\_\`{}~

The password must contain at least one letter or number, in addition to special characters.

</warn>

4. Click on "Set password". This will send a command to the instance to change the password for the user, which is displayed in the menu in step 3. If the operation completes successfully, a notification will appear in the interface.

## OpenStack CLI

To set a password in the OpenStack client, run the command:
```bash
openstack server set --root-password <instance ID>
```

A password prompt will appear.

It is possible to get the instance ID in the VK CS panel or by executing:
```bash
openstack server list
```
