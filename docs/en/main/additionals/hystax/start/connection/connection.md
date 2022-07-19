VK Cloud Solutions provides a Hystax Acura installation for a seamless live migration of your infrastructure to a VK CS cloud target project.

The Hystax service connection process consists of the following steps:

- Setting up the cloud to work with the Hystax Acura controller.
- Create a Hystax Acura user account and add a VK CS target project.

## Cloud setup

In the target project, you need to create a network (Network) *hystax_network* with the "Internet access" option enabled and a security group *sg_cloud_agent* (the group must contain rules allowing incoming traffic to ports tcp/80, tcp/3260 and tcp/15000, and all outgoing traffic is allowed).

<info>

**Note**

The cloud is configured once, while there can be many target projects.

</info>

## Creating a Hystax Acura user account and adding a VK CS target project

To create a Hystax Acura user account, go to the [service page](https://mcs.mail.ru/disaster-recovery/) and click the "Submit Request" button.

Enter your contact details: full name, your valid email, phone number.

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

These data can be obtained in the personal account of VK CS by going to the "Project settings" in the "API keys" tab.

Based on this data, our specialists will create an account on the Hystax Acura controller. Log in with the username and password you received. Next, our manager will ask you to provide user data for validation in the cloud. You can provide data for a user that already exists in the project, but we recommend creating a separate user for the infrastructure migration task.
