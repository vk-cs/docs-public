# {heading(Error 451 when using CDN)[id=cdn-error-451-problem]}

{include(/en/_includes/_translated_by_ai_en.md)}

CDN resource returns error `451 Unavailable For Legal Reasons`.

Main causes of this error when using CDN:

- Blocking by regulatory decision. The domain or IP address of the origin is included in the registry of prohibited sites.
- Blocking of CDN resource. The domain or IP address of the CDN server is blocked.
- Violation of service usage rules. Content on the site violates the usage rules of the {var(cloud)} CDN service.

### {heading(Solution)[id=cdn-error-451-problem-solution]}

Check the CDN resource settings:

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Select the project.
1. Navigate to the **CDN** → **CDN resources** section.
1. Open the problematic CDN resource and make sure that:
   1. The origin is specified correctly.
   1. The resource domain name is accessible and not blocked.

If the problem persists, please contact [technical support](mailto:support@mcs.mail.ru).