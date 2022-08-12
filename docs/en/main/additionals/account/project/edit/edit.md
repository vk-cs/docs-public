To rename a project, select your project from the drop-down list in the header of the personal account page, and click on the Pencil tool to rename. Enter a new name and click Save. After that, the name of the project will change in the title.

The project name can be copied by clicking on the adjacent button. This is required for use in the API, CLI, or when submitting a case to technical support.

To change additional information about the project, use the "Project settings" menu. In the project settings menu, you can fill in the data of an individual or legal entity, as well as download configuration files to access the VK Cloud platform through developer tools (API) and infrastructure management (Terraform).

## Change of ownership

If you need to change the project owner (for example, complete loss of access to the owner's account), you should [contact technical support] (https://mcs.mail.ru/docs/contacts) to change the roles of project participants. In this case, the project must have a second account, the owner of which submits an application.

The change of ownership is made after the verification of project data and participant accounts by technical support staff.

<warn>

It is recommended to use corporate mailboxes when registering on behalf of a legal entity. This will greatly simplify the verification procedure and allow you to restore access to the project without the need to contact support.

</warn>

## Project Freeze

Upon reaching the zero balance, the project resources will be automatically stopped until the project balance is replenished. In this state, API tools for Object Storage are partially available. After topping up the balance, billing tools will allow you to use the services again, however, you will need to manually start each resource.

This mechanism allows you to prevent the presence of unconscious additional costs on the project, it is especially useful if there is an attached automatic replenishment or a post-paid settlement method.

If it is necessary to freeze the project, i.e. to suspend debiting money, then you need to stop all virtual machines and delete resources that fall under automatic billing: disks, buckets, backups, etc. With this approach, you can save some of the resources of your project for a while if you plan to return to using the VK Cloud platform later. There are no other ways to freeze the project.

## Transfer resources between projects

Within the framework of the VK Cloud platform, there is a limited set of options for transferring resources between projects. Transferring data from one project to another is possible for [Disks](https://mcs.mail.ru/docs/ru/base/iaas/vm-volumes).
