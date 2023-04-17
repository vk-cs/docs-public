## Common info

To view the project data, select the desired project from the drop-down list in the header of the personal account page and go to the **Project settings** menu.

## Status of quotas

The current project quotas can be seen on the Project Settings tab under the Quotas section.

Quotas will be displayed as a list.

For detailed information on a specific quota, you can click on the **i** icon on the right.

## API endpoints

To manage VK Cloud platform resources, you can use the API to launch instances, create images, assign metadata to instances and images, create containers and storage objects, and perform other actions in projects.

<warn>

The list of endpoints varies depending on the selected region. You can learn more about regions in the article ["Regions"](../../../concepts/regions/).

</warn>

The list of available endpoints is always available in the VK Cloud panel [in the "API Endpoints" section](https://mcs.mail.ru/app/project/endpoints/).

### API usage examples

Once authenticated with Identity, you can use other APIs to create and manage resources in your project.

To start sending API requests, use one of the following methods:

- cURL is a command line tool that allows you to send HTTP requests and receive responses.
- Openstack CLI - a client that allows you to access the API through easy-to-use commands.
- REST Clients - Mozilla and Google provide browser-based GUIs for REST. For Firefox, see [RESTClient](https://addons.mozilla.org/en-US/firefox/addon/restclient/). For Chrome, see [rest-client](https://code.google.com/archive/p/rest-client/).
- OpenStack Python Software Development Kit (SDK) - An SDK for writing Python automation scripts that create and manage resources in a project. The SDK provides Python bindings to the OpenStack API, which allows you to perform automation tasks in Python by making calls to Python objects instead of direct REST calls. All OpenStack command line tools are implemented using the Python SDK.
- OpenStack APIs.

## Viewing and downloading Terraform parameters

With Terraform, you can manage infrastructure in the cloud as code (IaC). This allows you to spend less time on routine operations and reduces the risk of errors through the use of scripts.

You can learn more about working with Terraform in the VK Cloud infrastructure [on the Terraform documentation portal](/en/manage/terraform).

To use Terraform, you need to upload the openrc configuration file in [project settings in your account](https://mcs.mail.ru/app/project/terraform/). Each region has its own configuration file. For more information about regions, see the article [Regions](../../../concepts/regions/).
