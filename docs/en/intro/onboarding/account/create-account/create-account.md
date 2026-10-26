# {heading(Create an account and your first project)[id=onboarding-create-account]}

{include(/en/_includes/_translated_by_ai_en.md)}

Individuals work with {var(cloud)} under [public offer](/en/start/legal) agreements of the respective services.

Legal entities (LEs) and individual entrepreneurs (IEs) work with {var(cloud)} either under [public offer](/en/start/legal) agreements or under an individual contract.

You can register as an individual and later complete additional registration for an LE or IE if needed.

## {heading({counter(account)}. Review the registration rules)[id=onboarding-create-account-rules]}

For successful account registration, the following requirements must be met:

- The email address used for registration was created more than 1 month ago and is not a disposable one.
- The email address does not show signs of artificial generation, i.e. it has a valid name and domain.
- Your IP address belongs to the territory of the Russian Federation. Make sure you are not using a proxy during registration.
- Your Internet provider does not belong to a data center, hosting, or backbone network.

If any of the requirements is not met, additional verification from VK Tech will be required. To do this, contact the sales department via one of the following channels:

- email: [sales-team@mcs.mail.ru](mailto:sales-team@mcs.mail.ru);
- phone: +7 (495) 790-70-70.

These measures are applied to prevent fraud and abuse when working with VK Cloud services.

## {heading({counter(account)}. Create an account)[id=onboarding-create-account-create]}

1. Go to the [VK Cloud home page](https://cloud.vk.ru/) and click the **Sign up** button in the upper right corner.
1. In the window that appears, fill in the fields:

   - **Email**: enter a valid email address.

     Special registration conditions are configured for a number of corporate domains, so it is preferable to use your corporate email.

     The maximum length of an email address is 320 characters.

     {note:warn}
     The `+` character cannot be used in the address.
     {/note}

   - **Password**: come up with a password.

     The minimum password length is 8 characters. The password must contain:

     - uppercase and lowercase Latin letters;
     - at least one digit or a special character `?`, `!`, `~`, `@`, `#`, `$`, `%`, `^`, `&`, `_`, `-`, `+`, `*`, `=`, `;`, `:`, `,`, `.`, `/`, `\`, `|`, `` ` ``, `[`, `]`, `{`, `}`, `(`, `)`.

     The password must not contain repeating groups of characters — for example, ``aaa123123123``.

1. Click the **Create account** button.

   A link to confirm your email will be sent to the specified address.

A {linkto(../../../../tools-for-using-services/account/concepts/projects#tools-account-concepts-projects)[text=project]} {var(cloud)} will be automatically created for your account.

## {heading({counter(account)}. Confirm your email)[id=onboarding-create-account-confirm-email]}

Wait for an email from {var(cloud)} with the subject "Finish registration now" and follow the **Confirm email** link.

If necessary, request the email again: click the **Send confirmation again** button in the registration form.

{note:info}
If the email is not in your **Inbox**, check the **Spam** folder.
{/note}

## {heading({counter(account)}. Confirm your phone number)[id=onboarding-create-account-confirm-phone]}

{note:warn}
One phone number can be linked to only one account.

In the Moscow {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=region]}, only numbers registered in the Russian Federation can be used.
{/note}

1. In the **Phone number** field, enter a number in the specified format and click **Confirm**.
1. Call the number shown on the screen from your phone number.
1. Using tone dialing on your mobile device, enter the digits received from the robot operator.

After confirming your phone number, the [VK Cloud management console](https://msk.cloud.vk.ru/app/) will become available to you.

## {heading({counter(account)}. Set up your account)[id=onboarding-create-account-account-settings]}

{tabs}
{tab(For individuals)}
Link a card from a {linkto(../../../../intro/billing/concepts/payment-methods#billing-payment-methods)[text=supported payment system]} to the project:

1. In the {var(cloud)} management console, go to the [project balance](https://msk.cloud.vk.ru/app/services/billing/undefined) page.
1. Click the **Link card** button.
1. In the card linking window, enter its details in the **Card number**, **month / year**, and **CV code** fields.

   {note:warn}
   A virtual card cannot be linked to a project during registration.
   {/note}

1. Click the **Add card** button.

   If there are sufficient funds in the account, a test amount will be charged from the card and credited to the {linkto(../../../../intro/billing/concepts/balance#billing-balance)[text=project balance]}. After that, the card will be successfully linked.

   If the test amount was not spent on paying for services, it can be refunded via [technical support](/en/contacts). For more information about card management, see the article {linkto(../../../../intro/billing/instructions/add-card#billing-add-card)[text=Bank card operations]}.

1. (Optional) On the **Auto-replenishment** tab, configure {linkto(../../../../intro/billing/instructions/add-card#billing-add-card-refill)[text=auto-replenishment]} of the balance.
1. Wait until you are redirected to your management console.
{/tab}

{tab(For organizations and entrepreneurs)}

1. Enter the organization details:

   {note:info}
   Filling in the details in the management console is available only in the Moscow {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=region]} and only for Russian LEs and IEs.
   {/note}
   
   1. In the {var(cloud)} management console, go to [project settings](https://msk.cloud.vk.ru/app/project/legal/) to the **General information** tab.
   1. Click the **Fill in** button.
   1. In the **Additional registration** window, enter the organization's INN (Taxpayer Identification Number) in the corresponding field.
   
      If the INN is found in the counterparty database, most of the organization details will be filled in automatically.
   
   1. Fill in the fields that remain empty and click the **Next step** button.
   1. In the window that opens, specify the legal address of the organization or IE.
   
      If the INN is found in the counterparty database, the address is filled in automatically. If necessary, the pre-filled field values can be edited.
   
   1. Click the **Save** button.

1. (Optional) Conclude an individual contract:

   1. Write to the {var(cloud)} customer relations department at sales-team@mcs.mail.ru.
   
   1. Provide:
   
      - the full name and details of the organization or IE;
      - the full name and phone number of the contact person.
   
      A manager will contact you to clarify the desired contract terms.

1. Set up document flow:

   {tabs}
   {tab(Electronic)}
   {var(cloud)} operates in the [Kontur.Diadoc](https://www.diadoc.ru/) electronic document management (EDM) system.
   
   If your organization works with another EDM operator from the [Russian Federal Tax Service registry](https://www.nalog.gov.ru/rn77/oedo/search_edo/), configure roaming to exchange documents with LLC "VK" using its EDM participant identifier — `2BM-7743001840-2012052807514600749280000000000`.
   
   You can set up EDM with {var(cloud)} yourself or send a setup request to the {var(cloud)} document management department ([docs_vktech@vk.company](mailto:docs_vktech@vk.company)). In the request, specify:
   
   - The full name of the organization and its details.
   - What reporting documents you require.
   - The format of document management: EDM.
   - The full name and phone number of the contact person.
   
   {note:info}
   EDM is available only for projects in the Moscow {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=region]} and only for LEs and IEs registered in the Russian Federation.
   {/note}
   {/tab}
   
   {tab(Paper)}
   Contact the {var(cloud)} document management department:
   
   1. Write to [docs_vktech@vk.company](mailto:docs_vktech@vk.company).
   1. Specify:
   
      - The full name of the organization and its details.
      - What reporting documents you require.
      - The format of document management: paper.
      - The desired method of document delivery: by mail or by courier service.
      - (If courier delivery is selected) The contact phone number of the recipient.
      - The full name of the recipient.
      - The recipient's address. If the address matches the legal address of the organization, explicitly state this in the request.
   {/tab}
   {/tabs}
{/tab}
{/tabs}

## {heading({counter(account)}. Secure your account)[id=onboarding-create-account-2fa-settings]}

{include(../../../../_includes/_2fa-settings.md)[tags=manage-2fa-intro,manage-2fa-on]}

## {heading({counter(account)}. (Optional) Invite participants to the project)[id=onboarding-create-account-invite-users]}

{tabs}
{tab(For individuals)}
{include(../../../../_includes/_invite-user.md)[tags=create-account]}
{/tab}

{tab(For organizations and entrepreneurs)}
{include(../../../../_includes/_invite-user.md)[tags=create-account]}

You can connect your Identity Provider to {var(cloud)}. This will allow your employees to log in to {var(cloud)} without entering a username and password, using corporate authentication data. This mode is called identity federation. Identity federation can be configured via {linkto(../../../../access/iam/how-to-guides/federations/add-fim-for-ad#iam-ad-fim)[text=Active Directory]}, {linkto(../../../../access/iam/how-to-guides/federations/keycloak-to-fim#iam-keycloak-fim)[text=Keycloak]}, and {linkto(../../../../access/iam/how-to-guides/federations/ms-entra-fim#iam-ms-entra-fim)[text=Microsoft Entra]}.
{/tab}
{/tabs}

## {heading(What's next?)[id=onboarding-create-account-next]}

{linkto(../../../../intro/onboarding/account/billing-settings#onboarding-billing-settings)[text=Set up payment and balance notifications]}. This is necessary to gain access to services and will make working with the platform more convenient.