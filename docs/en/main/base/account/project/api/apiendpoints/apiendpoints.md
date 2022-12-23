To manage VK Cloud platform resources, you can use the API to launch instances, create images, assign metadata to instances and images, create containers and storage objects, and perform other actions in projects.

<warn>

The list of endpoints varies depending on the selected region. You can learn more about regions in the article ["Regions"](/ru/additionals/start/user-account/regions).

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
