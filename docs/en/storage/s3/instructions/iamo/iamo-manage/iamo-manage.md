# {heading(IAM Only management)[id=s3-instructions-iamo-manage]}

{include(/en/_includes/_translated_by_ai_en.md)}

## {heading(Account management)[id=s3-instructions-iamo-manage-account]}

1. Go to your management console.
1. Click on the username in the page header and select **Account settings**.
1. On the **User profile** tab, review the information.

{note:warn}
To change your credentials or password, contact the {var(s3)} administrator.
{/note}

## {heading(Project management)[id=s3-instructions-iamo-manage-project]}

Projects are organizational units of virtual infrastructure in IAM Only. Users can be members of one or more projects. Roles define what actions users can perform. Projects are used to separate resources, roles, or other architectural aspects of the tasks being implemented.

The {var(s3)} administrator creates projects and users, assigns roles to users, and makes changes to existing projects and users.

### {heading(Selecting a project)[id=s3-instructions-iamo-manage-project-selection]}

1. Go to your management console.
1. In the page header, expand the list of projects.

   If there are more than five projects, for easier project selection use:

   - searching for a project by ID or name;
   - filtering by user roles;

1. Select a project.

### {heading(Project settings)[id=s3-instructions-iamo-manage-project-settings]}

1. Go to your management console.
1. Click on the username in the page header and select **Project settings**.
1. Select the desired tab:

   - **General information** — general information about the project.
   - **API access** — parameter values for using the API in the current project.
   - **API Endpoints** — a list of access points for the services of the current project.
   - **Terraform** — instructions for connecting Terraform software to the project, including Terraform configuration files.