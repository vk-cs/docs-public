Data and infrastructure security is a priority for VK Cloud. Consumers of cloud services can independently or with the help of contractors test the security of their applications and resources hosted in VK Cloud.

Penetration testing allows you to identify vulnerabilities, assess the effectiveness of protection, predict risks, create an incident response plan, and confirm compliance with security standards. The penetration testing policy describes the conditions and procedures for conducting such tests.

To conduct penetration tests, review the [test conditions](#conditions) and [submit a testing request](#request_procedure).

For additional advice, contact the VK Cloud security team at [CloudSecurity@vkteam.ru](mailto:CloudSecurity@vkteam.ru).

{note:info}

This policy may be updated. Check for policy updates before you conduct testing.

{/note}

## Scope

This policy applies to all public VK Cloud services and infrastructure. It is intended for customers (consumers of cloud services) who wish to conduct security testing of their applications and resources hosted in VK Cloud.

## {heading(Penetration testing conditions)[id=conditions]}

1. **Prior notification and approval:**

    * [Submit a request](#request_procedure) to conduct penetration testing. Preparing for testing will take at least 10 business days.
    * VK Cloud reserves the right to approve or reject the request to conduct tests.

1. **Areas allowed for testing:**

    * Customers may only conduct testing on their own resources and data.
    * Testing of shared VK Cloud infrastructure components such as networks, databases, storage, and management systems is prohibited. Testing such components may affect other users.
    * Testing of services provided by VK Cloud as [SaaS solutions](/en/intro/start/concepts/architecture#cloud_service_delivery_models) is prohibited.

1. **Testing methods:**

    * Only testing methods that do not harm the infrastructure and data of other customers are allowed.
    * The use of methods that may cause denial of service (DoS/DDoS), cloud service disruptions, or compromise of other customers' data is prohibited.
    * Customers are required to comply with all applicable laws and regulations during testing.

1. **Responsibility and accountability:**

    * Customers bear full responsibility for the consequences of conducting penetration tests.
    * If testing reveals vulnerabilities in VK Cloud public services or infrastructure, the customer is obligated to notify VK Cloud immediately at [CloudSecurity@vkteam.ru](mailto:CloudSecurity@vkteam.ru).

1.  **Data privacy and security:**

    * All information obtained during testing shall be treated as confidential.
    * Customers agree not to disclose information concerning VK Cloud's infrastructure and security to third parties.

## {heading(Submitting a testing request)[id=request_procedure]}

1. Write to [CloudSecurity@vkteam.ru](mailto:CloudSecurity@vkteam.ru) and specify:
    * goals and scope of the testing
    * a list of IP addresses, domain names, and other resources to be tested
    * anticipated testing methods and tools
    * contact details for the team conducting the testing on your side
1. Receive confirmation and approval of the request from the VK Cloud team.
