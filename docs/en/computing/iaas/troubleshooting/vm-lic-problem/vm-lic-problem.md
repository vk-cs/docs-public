# {heading(RDS license issue)[id=iaas-vm-lic-problem]}

{include(/en/_includes/_translated_by_ai_en.md)}

When connecting to a VM via {linkto(../../../../computing/vm-licenses/ms-lic#vm-licenses-microsoft-rds)[text=RDS]}, an information window appears about a licensing issue and about the session being terminated after 60 minutes.

The problem may occur if the {linkto(../../../../computing/vm-licenses/ms-lic#vm-licenses-microsoft-rds)[text=client access license type]} is incorrectly set in group policies.

### {heading(Solution)[id=iaas-vm-lic-problem-decision]}

Change the client access license type in group policies:

{include(../../../../_includes/_vm-lic-manage.md)}

1. Restart the RDS server.
1. If the problem persists, contact [technical support](/en/contacts).