# {heading(Access management)[id=logging-concepts-iam]}

{include(/en/_includes/_translated_by_ai_en.md)}

To differentiate permissions for {linkto(../../../../tools-for-using-services/account/instructions/project-invitation#tools-account-project-invitation)[text=invited]} members of a {linkto(../../../../tools-for-using-services/account/concepts/projects#tools-account-concepts-projects)[text=project]} or {linkto(../../../../access/iam/concepts/service-accounts#iam-concepts-service-accounts)[text=service accounts]}, Cloud Logging uses a unified identity and access management service — {linkto(../../../../access/iam#iam)[text=IAM]}. Access can be managed centrally from the {var(cloud)} management console.

The list of actions available to a project member in the Cloud Logging service is determined by:

- {linkto(#logging-concepts-iam-basic-roles)[text=Basic role]} — defines user permissions at the level of all {var(cloud)} services.
- {linkto(#logging-concepts-iam-special-roles)[text=Special role]} — defines user permissions at the level of individual {var(cloud)} services.

Configuring individual {linkto(../../../../access/iam/concepts/permissions-reference#iam-permissions-reference)[text=permissions]} for Cloud Logging is not supported.

Roles can be {linkto(../../../../access/iam/instructions/access-manage#iam-access-manage-user-role-edit)[text=assigned]} only by project members with the `Project Owner`, `Super Administrator`, and `User Administrator (IAM)` roles. When choosing roles, follow the principle of least privilege: a user should have only the permissions without which their tasks cannot be completed.

## {heading(Basic roles)[id=logging-concepts-iam-basic-roles]}

The basic roles `Project Owner`, `Super Administrator`, and `Project Administrator` grant full access to all Cloud Logging operations; no need to configure individual roles.

### {heading(mcs_owner)[id=logging-concepts-iam-basic-roles-mcs_owner]}

{include(/en/_includes/_iam_roles.md)[tags=mcs_owner]}

### {heading(mcs_co_owner)[id=logging-concepts-iam-basic-roles-mcs_co_owner]}

{include(/en/_includes/_iam_roles.md)[tags=mcs_co_owner]}

### {heading(mcs_admin)[id=logging-concepts-iam-basic-roles-mcs_admin]}

{include(/en/_includes/_iam_roles.md)[tags=mcs_admin]}

### {heading(mcs_admin_security)[id=logging-concepts-iam-basic-roles-mcs_admin_security]}

{include(/en/_includes/_iam_roles.md)[tags=mcs_admin_security]}

### {heading(mcs_viewer)[id=logging-concepts-iam-basic-roles-mcs_viewer]}

{include(/en/_includes/_iam_roles.md)[tags=mcs_viewer]}

## {heading(Special roles)[id=logging-concepts-iam-special-roles]}

Cloud Logging has no special roles of its own, but special roles for other {var(cloud)} services grant permissions for specific actions.

### {heading(mcs_admin_billing)[id=logging-concepts-iam-special-mcs_admin_billing]}

{include(/en/_includes/_iam_roles.md)[tags=mcs_admin_billing]}

### {heading(mcs_admin_network)[id=logging-concepts-iam-special-mcs_admin_network]}

{include(/en/_includes/_iam_roles.md)[tags=mcs_admin_network]}

### {heading(mcs_admin_network_security)[id=logging-concepts-iam-special-mcs_admin_network_security]}

{include(/en/_includes/_iam_roles.md)[tags=mcs_admin_network_security]}

### {heading(mcs_admin_network_objects)[id=logging-concepts-iam-special-mcs_admin_network_objects]}

{include(/en/_includes/_iam_roles.md)[tags=mcs_admin_network_objects]}

### {heading(mcs_k8s_viewer)[id=logging-concepts-iam-special-mcs_k8s_viewer]}

{include(/en/_includes/_iam_roles.md)[tags=k8s-viewer-managed]}

### {heading(mcs_k8s_editor)[id=logging-concepts-iam-special-mcs_k8s_editor]}

{include(/en/_includes/_iam_roles.md)[tags=k8s-editor-managed]}

### {heading(mcs_k8s_admin)[id=logging-concepts-iam-special-mcs_k8s_admin]}

{include(/en/_includes/_iam_roles.md)[tags=k8s-admin-managed]}

### {heading(mcs_admin_vm)[id=logging-concepts-iam-special-mcs_admin_vm]}

{include(/en/_includes/_iam_roles.md)[tags=mcs_admin_vm]}

### {heading(mcs_admin_vm_junior)[id=logging-concepts-iam-special-mcs_admin_vm_junior]}

{include(/en/_includes/_iam_roles.md)[tags=mcs_admin_vm_junior]}

### {heading(mcs_operator_vm)[id=logging-concepts-iam-special-mcs_operator_vm]}

{include(/en/_includes/_iam_roles.md)[tags=mcs_operator_vm]}