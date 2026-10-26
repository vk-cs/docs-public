# {heading(Managing Microsoft RDS licenses)[id=iaas-vm-lic-manage]}

{include(/en/_includes/_translated_by_ai_en.md)}

By default, after installing the Windows Server OS, only two concurrent connections to the virtual machine (console or RDP) are available. To allow more connections, use {linkto(../../../../../computing/vm-licenses/ms-lic#vm-licenses-microsoft-rds)[text=Remote Desktop Services]}.

## {heading(Activating client access licenses)[id=iaas-vm-lic-manage-activation]}

Contact [technical support](/en/contacts) and provide:

- {linkto(../../../../../tools-for-using-services/account/instructions/project-settings/manage#project-pid-view)[text=project ID (PID)]};
- the ID of the VM with Microsoft Windows Server;
- the required number of licenses;
- the remote desktop connection parameters.

## {heading(Changing the number of client access licenses)[id=iaas-vm-lic-manage-edit-licenses]}

Contact [technical support](/en/contacts) and provide:

- {linkto(../../../../../tools-for-using-services/account/instructions/project-settings/manage#project-pid-view)[text=project ID (PID)]};
- the ID of the VM with Microsoft Windows Server;
- the new number of licenses;
- the remote desktop connection parameters.

## {heading(Changing the client access license type)[id=iaas-vm-lic-manage-edit-type]}

{note:warn}
{linkto(../../../../../computing/vm-licenses/ms-lic#vm-licenses-microsoft-rds)[text=User licenses]} are available only if the RDS server is joined to an Active Directory domain.
{/note}

{include(../../../../../_includes/_vm-lic-manage.md)}

1. Contact [technical support](/en/contacts) to change the license type, providing the following details:

   - {linkto(../../../../../tools-for-using-services/account/instructions/project-settings/manage#project-pid-view)[text=project ID (PID)]};
   - the ID of the VM with Microsoft Windows Server;
   - the remote desktop connection parameters;
   - the required license type corresponding to the policy type.

   Wait until the request is processed.

1. Restart the RDS server.