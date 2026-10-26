# {heading(Cannot change the VM password)[id=iaas-vm-password-problem]}

{include(/en/_includes/_translated_by_ai_en.md)}

When changing the VM administrator password in your management console, the error **Failed to set the password. Contact technical support** occurs.

This may be related to the unavailability of the QEMU guest agent, which is used to set the VM password.

### {heading(Solution)[id=iaas-vm-password-problem-decision]}

1. Connect to the virtual machine console and log in.
1. Update the QEMU guest agent by running the command:

   ```console
   sudo sh -c "apt install -y qemu-guest-agent;systemctl enable qemu-guest-agent;systemctl start qemu-guest-agent"
   ```

1. Restart the VM and try changing the administrator password again. If the error persists, contact [technical support](/en/contacts).