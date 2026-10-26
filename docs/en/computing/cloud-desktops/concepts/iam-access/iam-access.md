# {heading(Access management)[id=vdi-concepts-iam]}

{include(/en/_includes/_translated_by_ai_en.md)}

To differentiate permissions for {linkto(../../../../tools-for-using-services/account/instructions/project-invitation#tools-account-project-invitation)[text=invited]} project {linkto(../../../../tools-for-using-services/account/concepts/projects#tools-account-concepts-projects)[text=members]} or {linkto(../../../../access/iam/concepts/service-accounts#iam-concepts-service-accounts)[text=service accounts]}, Cloud Desktop uses a unified identity and access management service — {linkto(../../../../access/iam#iam)[text=IAM]}. Access can be managed centrally from the {var(cloud)} management console.

The list of actions available to a project member in the Cloud Desktop service is determined by the assigned {linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference-basic)[text=basic role]}. It defines a set of actions available by default.

The basic roles `Project Owner`, `Superadministrator`, and `Project Administrator` have full access to all operations in all services.

{linkto(../../../../access/iam/concepts/roles-reference#iam-roles-reference-special)[text=Specialized roles]} and {linkto(../../../../access/iam/concepts/permissions-reference#iam-permissions-reference)[text=permissions]} for Cloud Desktop are not available.