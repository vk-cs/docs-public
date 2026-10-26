# {heading(Access management)[id=event-log-concepts-iam]}

{include(/en/_includes/_translated_by_ai_en.md)}

To differentiate permissions for {linkto(../../../../tools-for-using-services/account/instructions/project-invitation#tools-account-project-invitation)[text=invited]} members of a {linkto(../../../../tools-for-using-services/account/concepts/projects#tools-account-concepts-projects)[text=project]} or {linkto(../../../../access/iam/concepts/service-accounts#iam-concepts-service-accounts)[text=service accounts]}, Cloud Audit uses a unified identity and access management service — {linkto(../../../../access/iam#iam)[text=IAM]}. Access can be managed centrally from the {var(cloud)} management console.

The list of actions available to a project member in the Cloud Audit service is determined by:

- {linkto(#event-log-concepts-iam-basic-roles)[text=Basic role]} — defines user permissions at the level of all {var(cloud)} services.
- {linkto(#event-log-concepts-iam-special-roles)[text=Specialized role]} — defines user permissions at the level of individual {var(cloud)} services.

Configuring individual {linkto(../../../../access/iam/concepts/permissions-reference#iam-permissions-reference)[text=permissions]} for Cloud Audit is not supported.

Roles can be {linkto(../../../../access/iam/instructions/access-manage#iam-access-manage-user-role-edit)[text=assigned]} only by project members with the `Project Owner`, `Super Administrator`, and `User Administrator (IAM)` roles. When choosing roles, follow the principle of least privilege: a user should have only those permissions without which their tasks cannot be performed.

## {heading(Basic roles)[id=event-log-concepts-iam-basic-roles]}

The basic roles `Project Owner`, `Super Administrator`, and `Project Administrator` get full access to all Cloud Audit operations; there is no need to configure individual roles.

### {heading(mcs_owner)[id=event-log-concepts-iam-basic-roles-mcs_owner]}

{include(/en/_includes/_iam_roles.md)[tags=mcs_owner]}

### {heading(mcs_co_owner)[id=event-log-concepts-iam-basic-roles-mcs_co_owner]}

{include(/en/_includes/_iam_roles.md)[tags=mcs_co_owner]}

### {heading(mcs_admin)[id=event-log-concepts-iam-basic-roles-mcs_admin]}

{include(/en/_includes/_iam_roles.md)[tags=mcs_admin]}

### {heading(mcs_admin_security)[id=event-log-concepts-iam-basic-roles-mcs_admin_security]}

{include(/en/_includes/_iam_roles.md)[tags=mcs_admin_security]}

### {heading(mcs_viewer)[id=event-log-concepts-iam-basic-roles-mcs_viewer]}

{include(/en/_includes/_iam_roles.md)[tags=mcs_viewer]}

## {heading(Specialized roles)[id=event-log-concepts-iam-special-roles]}

Cloud Audit has no specialized roles of its own, but permissions for certain actions are available in specialized roles for other {var(cloud)} services.

### {heading(mcs_admin_billing)[id=event-log-concepts-iam-special-mcs_admin_billing]}

{include(/en/_includes/_iam_roles.md)[tags=mcs_admin_billing]}

### {heading(mcs_admin_network)[id=event-log-concepts-iam-special-mcs_admin_network]}

{include(/en/_includes/_iam_roles.md)[tags=mcs_admin_network]}

### {heading(mcs_admin_network_security)[id=event-log-concepts-iam-special-mcs_admin_network_security]}

{include(/en/_includes/_iam_roles.md)[tags=mcs_admin_network_security]}

### {heading(mcs_admin_network_objects)[id=event-log-concepts-iam-special-mcs_admin_network_objects]}

{include(/en/_includes/_iam_roles.md)[tags=mcs_admin_network_objects]}

### {heading(mcs_k8s_viewer)[id=event-log-concepts-iam-special-mcs_k8s_viewer]}

{include(/en/_includes/_iam_roles.md)[tags=k8s-viewer-managed]}

### {heading(mcs_k8s_editor)[id=event-log-concepts-iam-special-mcs_k8s_editor]}

{include(/en/_includes/_iam_roles.md)[tags=k8s-editor-managed]}

### {heading(mcs_k8s_admin)[id=event-log-concepts-iam-special-mcs_k8s_admin]}

{include(/en/_includes/_iam_roles.md)[tags=k8s-admin-managed]}

### {heading(mcs_admin_vm)[id=event-log-concepts-iam-special-mcs_admin_vm]}

{include(/en/_includes/_iam_roles.md)[tags=mcs_admin_vm]}

### {heading(mcs_admin_vm_junior)[id=event-log-concepts-iam-special-mcs_admin_vm_junior]}

{include(/en/_includes/_iam_roles.md)[tags=mcs_admin_vm_junior]}

### {heading(mcs_operator_vm)[id=event-log-concepts-iam-special-mcs_operator_vm]}

{include(/en/_includes/_iam_roles.md)[tags=mcs_operator_vm]}