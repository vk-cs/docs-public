VK Cloud Solutions provides a Hystax Acura installation to seamlessly migrate your cloud infrastructure to a VK CS target project.

<info>

Target project is a VK Cloud Solutions project from which your secure cloud infrastructure will be restored.

</info>

The Hystax service connection process consists of the following steps:

- Creating a personal account for Hystax Acura user and adding a target project VK CS;
- Replication of protected infrastructure using Hystax Acura replication agents. You can learn more about this step in the Replication section.
- Creation and debugging of the migration plan for the protected infrastructure. You can learn more about this step in the Migration section.

#### Creating a Hystax Acura user account and adding a VK CS target project

To create a Hystax Acura user account, go to the [main page](https://mcs.mail.ru) VK CS and in the "Special Services" section, click on the "Submit Request" button under "Disaster Recovery".

Enter your contact details: full name, your valid email, or phone number.

In response to your request, the manager will request the following information:

|Parameter| Value|
|---|---|
|ProjectID| Project ID, (eg bf3042f1725942d3ba90ea435f25bb54).|
|ProjectName| Project name, (eg mcs123456789).|
|User Domain Name| Custom domain name, (eg users).|
|Project Domain ID| Custom domain ID, (eg a59f3e0e7d32409cae61416a17de814a).|
|Username| Username, (eg j.snow@mail.ru).|
|RegionName| Name of the project region, (eg RegionOne).|
|Interface| Project interface type name, (eg public).|
|Identity API Version| API version, (eg 3).|
|Auth URL| Authentication URL. |

These data can be obtained in your personal account by going to the "Project settings" in the "API keys" tab.

It is also necessary to provide the login and password of an MCS user with "Project Administrator" rights. You can provide data for a user that already exists in the project, but we recommend creating a separate user for the infrastructure migration task. After the end of the migration project, you can painlessly remove this user from the project.

Proceed to setting up the target project.
