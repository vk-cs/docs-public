# {heading(Access management)[id=iaas-concepts-iam]}

{include(/en/_includes/_translated_by_ai_en.md)}

To differentiate permissions for {linkto(../../../../tools-for-using-services/account/instructions/project-invitation#tools-account-project-invitation)[text=invited]} members of a {linkto(../../../../tools-for-using-services/account/concepts/projects#tools-account-concepts-projects)[text=project]} or {linkto(../../../../access/iam/concepts/service-accounts#iam-concepts-service-accounts)[text=service accounts]}, Cloud Servers uses a unified identity and access management service — {linkto(../../../../access/iam#iam)[text=IAM]}. Access can be managed centrally from the {var(cloud)} personal dashboard.

The list of actions available to a project member in the Cloud Servers service is determined by:

- {linkto(#iaas-concepts-iam-basic-roles)[text=Basic role]} — defines the user's permissions at the level of all {var(cloud)} services.
- {linkto(#iaas-concepts-iam-special-roles)[text=Special role]} — defines the user's permissions at the level of individual {var(cloud)} services.

Configuring individual {linkto(../../../../access/iam/concepts/permissions-reference#iam-permissions-reference)[text=permissions]} for Cloud Servers is not supported.

Roles can only be {linkto(../../../../access/iam/instructions/access-manage#iam-access-manage-user-role-edit)[text=assigned]} by project members with the `Project Owner`, `Superadministrator`, and `User Administrator (IAM)` roles. When choosing roles, follow the principle of least privilege: the user should have only the permissions without which their tasks cannot be performed.

## {heading(Basic roles)[id=iaas-concepts-iam-basic-roles]}

The basic roles `Project Owner`, `Superadministrator`, and `Project Administrator` grant full access to all Cloud Servers operations; there is no need to configure individual roles.

### {heading(mcs_owner)[id=iaas-concepts-iam-basic-roles-mcs_owner]}

{include(/en/_includes/_iam_roles.md)[tags=mcs_owner]}

### {heading(mcs_co_owner)[id=iaas-concepts-iam-basic-roles-mcs_co_owner]}

{include(/en/_includes/_iam_roles.md)[tags=mcs_co_owner]}

### {heading(mcs_admin)[id=iaas-concepts-iam-basic-roles-mcs_admin]}

{include(/en/_includes/_iam_roles.md)[tags=mcs_admin]}

### {heading(mcs_admin_security)[id=iaas-concepts-iam-basic-roles-mcs_admin_security]}

{include(/en/_includes/_iam_roles.md)[tags=mcs_admin_security]}

### {heading(mcs_viewer)[id=iaas-concepts-iam-basic-roles-mcs_viewer]}

{include(/en/_includes/_iam_roles.md)[tags=mcs_viewer]}

## {heading(Special roles)[id=iaas-concepts-iam-special-roles]}

Several {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference-special)[text=special roles]} are available for the Cloud Servers service, which can be used together with a {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference-basic)[text=basic role]} or on their own.

### {heading(mcs_admin_vm)[id=iaas-concepts-iam-special-roles-mcs_admin_vm]}

{include(/en/_includes/_iam_roles.md)[tags=mcs_admin_vm]}

### {heading(mcs_admin_vm_junior)[id=iaas-concepts-iam-special-roles-mcs_admin_vm_junior]}

{include(/en/_includes/_iam_roles.md)[tags=mcs_admin_vm_junior]}

### {heading(mcs_operator_vm)[id=iaas-concepts-iam-special-roles-mcs_operator_vm]}

{include(/en/_includes/_iam_roles.md)[tags=mcs_operator_vm]}