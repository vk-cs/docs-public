
{include(/en/_includes/_translated_by_ai_en.md)}

To be able to add applications to the [Marketplace](https://cloud.vk.ru/docs/ru/applications-and-services/marketplace):

1. [Register](/ru/intro/onboarding/account) in {var(cloud)} a user who will upload your application to the Marketplace, if this has not been done yet.

   Upon registration, a project is automatically created for all new users. You can use this project for testing service packages and uploading them to the Marketplace.

1. Send an email to [marketplace@cloud.vk.com](mailto:marketplace@cloud.vk.com) with the following information:

   - Company name.
   - The identifier of the project ([Project ID](/ru/tools-for-using-services/api/rest-api/endpoints#rest-api-endpoints-get-project-id)) in which testing of the Terraform manifests for your application will be performed.

     The value is displayed in the VK Cloud management console on the project settings page, on the **Terraform** tab.

   - The email of the user who needs access to the test namespaces of the Marketplace to test the service before publication.
   - The email of the user who will be assigned as the owner of the service key.
   - The email of the user who will receive notifications about errors when creating application instances.

   A service key will be sent in a reply email. By default, its validity period is 1 year. The service key contains the test and public namespaces of the Marketplace in which the application will be available.

   The identifier of your project (Project ID) will be added to the list of providers. Bonus funds will be credited to the bonus account of your project in VK Cloud for testing your application in the Marketplace.