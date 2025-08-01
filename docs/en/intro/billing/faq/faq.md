## Payment, refund, bonuses

{cut(How do I get bonuses for registering in my management console?)}

[Bonuses](../concepts/balance#bonuses) are credited when registering a new user account. Bonuses are accrued after all [registration](/en/intro/start/account-registration) steps are completed.

Bonuses are not awarded when new projects are created by existing users and when a new user enters a project by invitation.

{note:warn}

In some cases, previously accrued bonuses may be canceled or denied. See more in [paragraph 8.3 of the VK Cloud Platform Terms of Use](/en/intro/start/legal)

{/note}

{/cut}

{cut(What do I do if I haven't received bonuses for migrating to the VK Cloud platform, testing its performance, or participating in other promotional activities?)}

If you haven't received your [bonuses](../concepts/balance#bonuses), contact your personal manager or send a request via the [feedback form](https://cloud.vk.com/form/).

{/cut}

{cut(In what order are the bonuses charged, why could they have expired?)}

[Bonuses](../concepts/balance#bonuses) in VK Cloud are spent on using cloud services and resources. There are different types of bonuses, each type of bonus can be spent only on VK Cloud services corresponding to it. One bonus is equal to one ruble.

Bonuses are given for 60 days, after that they burn off. You can see the details of your expenses on the **Balance** page in your management console.

{note:warn}

You cannot withdraw bonuses from the project.

{/note}

{/cut}

{cut(Are funds being charged after the end of the test period?)}

After the test period has expired or bonuses have been burned off, the payment account balance is used to pay for resources. If the payment account balance is zero, the project is [frozen](/en/tools-for-using-services/account/concepts/projects#automatic_freezing_of_the_project).

{/cut}

{cut(How are funds charged?)}

VK Cloud records the consumption of resources in the cloud on a minute-by-minute basis, and funds for the use of resources are charged from the payment account balance also on a minute-by-minute basis. Licenses are charged once a day.

{/cut}

{cut(The project does not display the balance at all. How do I turn it on?)}

[Balance](../concepts/balance) is displayed, if two conditions are met:

- Your [role](/en/tools-for-using-services/account/concepts/rolesandpermissions) in the project is the owner, superadministrator, or billing administrator.
- [Registration procedure](/en/intro/start/account-registration) is completed: phone, email, and card for payment are bound.

{/cut}

{cut(What is the risk of a negative balance?)}

The payment account balance in the project management console may go negative. If you work with VK Cloud on [prepay](../concepts/physical-corporate#prepayment), the work of services and resources in this case will be suspended.

No penalties are charged on negative balance, but it is necessary to [replenish the payment account](../instructions/payment#making_a_payment) to continue the work.

{note:warn}

Unlocking of services takes up to 15 minutes from the moment of crediting.

{/note}

{/cut}

{cut(How much do I need to replenish my account to resume work?)}

The project will resume automatically when the payment account balance is positive.

It is recommended to deposit an amount equal to the daily charge, or enable [auto-top-up](../instructions/add-card#configure_auto_completion).

{/cut}

{cut(I have paid the bill, the services in the project are active. Why is the balance negative?)}

You are probably a legal entity and work with VK Cloud for a post-payment. In this case, the payment account balance of your project will always be negative.

If you do not know your payment scheme, contact the document management department of VK Cloud:

1. Write to [docs_vktech@vk.company](mailto:docs_vktech@vk.company).
1. Specify:

   - Full name of the organization.
   - Details of the organization.

{/cut}

{cut(How to pay for the work of a service from a legal entity?)}

If you work with VK Cloud on prepayment, [form an invoice](../instructions/bill-generation) and pay it in your management console.

When working on the post-payment scheme, the invoice and [accounting documents](../concepts/report#legal_entities) for the reporting period are sent via the electronic document management system (EDM) within five working days of the month following the reporting one.

If you have not received the accounting documents, contact the document management department of VK Cloud:

1. Write to [docs_vktech@vk.company](mailto:docs_vktech@vk.company).
1. Specify:

   - Full name of the organization.
   - Details of the organization.

{/cut}

{cut(How to connect the post-payment scheme?)}

Post-payment is available:

- Only for legal entities.
- Only within the framework of an individual contract with VK Cloud.

To activate the postpayment scheme, [conclude an individual contract](../instructions/corporate) and perform additional project configuration for legal entities in the VK Cloud management console.

{/cut}

{cut(How long does it take for funds to be credited when paying by bank transfer?)}

Up to 3 banking days.

{/cut}

{cut(Why should I link a card if I am a legal entity and pay according to the details?)}

You may need the card if you work on a prepaid basis and need to make an emergency top-up, for example, to avoid [freezing](/en/tools-for-using-services/account/concepts/projects#automatic_freezing_of_the_project) a project.

{note:warn}

Charges for bank card payments are not included in [accounting documents for legal entities](../concepts/report#composition_of_accounting_documents): billing report, reconciliation report.

{/note}

{/cut}

{cut(When and how will I receive the accounting documents after payment?)}

{tabs}

{tab(Individuals)}

Immediately after the funds are credited, the receipt is sent to the email address of the project owner.

{/tab}

{tab(Legal entities)}

As part of the package of [accounting documents](../concepts/report) for the corresponding reporting period (month).

When working through the electronic document management system (EDM), documents are available immediately. If the organization maintains a paper document flow with VK Cloud, the delivery time of the original documents is added.

If you have not received your original documents or need scanned copies, write to the document management department of VK Cloud at [docs_vktech@vk.company](mailto:docs_vktech@vk.company).

{/tab}

{/tabs}

{/cut}

{cut(I have topped up the balance, but the payment is not credited. What to do?)}

The terms of crediting funds depend on [the payment method](../concepts/payment-methods):

- Payment by bank transfer — payment can take up to three banking days from the date of transfer of funds by the bank.
- Payment by other methods — the payment is credited within 5-10 minutes after payment confirmation.

If the payment is not received on time, write to VK Cloud document management department at [docs_vktech@vk.company](mailto:docs_vktech@vk.company). The following details will be required to trace the payment:

- [Project ID (PID)](/en/tools-for-using-services/account/instructions/project-settings/manage#getting_project_id)
- Project [region](/en/tools-for-using-services/account/concepts/regions)
- Receipt of payment

{/cut}

{cut(How do I make a refund?)}

Contact [technical support](mailto:support@mcs.mail.ru). For more information about the refund conditions and the requirements for the application, see [Refund of funds](../instructions/refund).

You can refund only funds that you have previously credited to your payment account. [Bonuses](../concepts/balance#bonuses) cannot be refunded.

For individuals, the funds will be returned to the account from which the payment has been made.

{/cut}

## Freezing the project

{cut(The balance has become negative, how can the services be restored?)}

When working on prepayment with a negative payment account balance, the project is automatically [frozen](/en/tools-for-using-services/account/concepts/projects#automatic_freezing_of_the_project). Its objects are placed in the queue for deletion for a period:

- 3 days if you have never replenished the payment account of the project.
- 30 days if you have topped up the payment account of the project at least once.

   {note:err}

   As soon as the storage period in the queue expires, all project resources will be permanently deleted.

   {/note}

To restore the services:

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
1. [Replenish](../instructions/payment#making_a_payment) the payment account of the project [in a convenient way](../concepts/payment-methods). Use physical bank cards to get the funds to the payment account balance faster. Funds are credited from them immediately, but if you pay by bank transfer, the process can take up to 3 working days.
1. Wait for the activation of services in the project. It can take up to 15 minutes.
1. Manually activate project resources:

   - [Virtual machines](/en/computing/iaas/instructions/vm/vm-manage#start_stop_restart_vm)
   - [Kubernetes containers](/en/kubernetes/k8s/instructions/manage-cluster#start)
   - [VM backup](/en/storage/backups/instructions/manage-backup-plan)
   - Other resources

{note:info}

To find out how long resources are in the queue for deletion, contact [technical support](mailto:support@mcs.mail.ru) and specify:

- [Project ID (PID)](/en/tools-for-using-services/account/instructions/project-settings/manage#getting_project_id)
- [Region](/en/tools-for-using-services/account/concepts/regions)

{/note}

{/cut}

{cut(I have topped up my balance to unblock the services. How long to wait?)}

Unlocking can take up to 15 minutes.

After unlocking, manually start objects that have been stopped, such as virtual machines.

{/cut}

{cut(Can I take the promised payment to avoid freezing?)}

The promised payment is not supported.

{/cut}

{cut(I don't have time to pay for services by transfer. How to avoid freezing?)}

Pay for services with a bank card, payments from cards are faster.

{note:warn}

Charges for bank card payments are not included in [accounting documents for legal entities](../concepts/report#composition_of_accounting_documents): billing report, reconciliation report.

{/note}

{/cut}

{cut(I have topped up the balance, but the payment failed. How to avoid freezing?)}

1. Contact [technical support](mailto:support@mcs.mail.ru).
1. Specify:

   - [Project ID (PID)](/en/tools-for-using-services/account/instructions/project-settings/manage#getting_project_id)
   - Project [region](/en/tools-for-using-services/account/concepts/regions)
   - Payment confirmation

{/cut}

## Working with legal entities

{cut(We are a company not from the Russian Federation, how to start working with VK Cloud?)}

With VK Cloud, you can work with a service infrastructure that is physically deployed:

- On the territory of Russia — to do this, [register](/en/intro/start/account-registration) an account in [region](/en/tools-for-using-services/account/concepts/regions) Moscow at https://cloud.vk.com.
- On the territory of Kazakhstan — to do this, [register](/en/intro/start/account-registration) an account in [region](/en/tools-for-using-services/account/concepts/regions) Kazakhstan at https://vkcloud.kz или https://kz.cloud.vk.com/.

Each region has its own peculiarities of work for non-residents of the Russian Federation:

[cols="1,2,2", options="header"]
|===

| Features
| Moscow
| Kazakhstan

| Contractual relations
| Non-resident organizations of the Russian Federation can work with VK Cloud as legal entities and receive [accounting documents](../concepts/report) only under an individual contract
| Legal entities-residents of Kazakhstan can work both under a public offer agreement and under an individual agreement

| Phone number
| To link a foreign phone number to your account, please contact [technical support](mailto:support@mcs.mail.ru)
| ![](/en/assets/no.svg "inline")

| Payment for services
| Currency of payments and other payment terms are discussed at the time of contract execution
| In the region of Kazakhstan it is possible to pay for services:
  - Only in tenge.
  - If paying by card, only cards issued by banks of Armenia, Azerbaijan, Belarus, Estonia, Georgia, Kazakhstan, Kyrgyzstan, Latvia, Lithuania, Tajikistan, or Uzbekistan are accepted

|===

{/cut}

{cut(We are a company from the Russian Federation, how to pay for services?)}

{tabs}

{tab(Prepayment work)}

1. Complete the [additional registration](../instructions/corporate#additional_registration_of_legal_entities) of the legal entity, if it has not already been done.
1. [Create an invoice](../instructions/bill-generation) for the required amount in your management console.
1. Pay the bill by bank transfer.

{/tab}

{tab(Post-payment work)}

1. Wait for the invoice from VK Cloud. The invoice comes as part of a package of [accounting documents](../concepts/report) for the corresponding reporting period (month).
1. Pay the bill by bank transfer.

{/tab}

{/tabs}

{/cut}

{cut(We are a company not from the Russian Federation, how to pay for services?)}

{tabs}

{tab(Prepayment work)}

Request an invoice from the document management department of VK Cloud:

1. Write to [docs_vktech@vk.company](mailto:docs_vktech@vk.company).
1. Specify:

   - Full name and details of the organization.
   - Invoice amount.

1. Pay the invoice received from VK Cloud using a bank transfer.

{/tab}

{tab(Post-payment work)}

1. Wait for the invoice from VK Cloud. The invoice comes as part of a package of [accounting documents](../concepts/report) for the corresponding reporting period (month).
1. Pay the invoice received from VK Cloud using a bank transfer.

{/tab}

{/tabs}

{/cut}

{cut(How to conclude an individual contract with VK Cloud?)}

1. Write to the customer service department of VK Cloud at [sales-team@mcs.mail.ru](mailto:sales-team@mcs.mail.ru).
1. Specify:

   - Full name and details of the organization.
   - Full name and phone number of the contact person.

The manager will contact you to clarify the required terms of the contract.

{/cut}

{cut(How do I find out VK Cloud banking details?)}

{tabs}

{tab(Moscow)}

If your project is in [region](/en/tools-for-using-services/account/concepts/regions) Moscow, and you are working with “VK” LLC, its main details are available at https://cloud.vk.com/contacts.

If you work with VK Cloud on prepayment, you can also [generate an invoice](../instructions/bill-generation) in your management console and view the contents of the **Supplier** box.

{/tab}

{tab(Kazakhstan)}

If your project is in [region](/ru/tools-for-using-services/account/concepts/regions) Kazakhstan, and you are working with “QazCloud” LLC, its details are available at https://vkcloud.kz/contacts/.

{/tab}

{/tabs}

{/cut}

{cut(How do I find out the terms of my contract with VK Cloud?)}

Ask this question in the document management department of VK Cloud:

1. Write to [docs_vktech@vk.company](mailto:docs_vktech@vk.company).
2. Specify:

   - Full name of the organization.
   - Details of the organization.

{/cut}

{cut(How to get accounting documents for accounting?)}

1. Write to the document management department of VK Cloud at [docs_vktech@vk.company](mailto:docs_vktech@vk.company).
1. Specify:

   - Full name and details of the organization.
   - The composition of [accounting documents](../concepts/report) that you require.
   - Method of obtaining documents: through [electronic document management system (EDM)](../concepts/report#edm) or [in paper form to the postal address](../concepts/report#delivery_of_original_documents).

   {note:info}

   EDM work is available only to organizations registered in the Russian Federation.

   {/note}

Accounting documents will be sent once in the reporting period (month).

VK Cloud can duplicate reporting documents in the form of scanned copies in PDF format to e-mail. If you want to receive scanned copies, write about it in the request and specify email addresses of recipients.

{/cut}

{cut(How do I get a reconciliation report for the required period?)}

1. Write to the document management department of VK Cloud at [docs_vktech@vk.company](mailto:docs_vktech@vk.company).
1. Specify:

   - Full name and details of the organization.
   - The period for which the act is required.

{/cut}

{cut(I have unloaded the invoice, it does not contain my details. How do I add them?)}

To make the data of your organization appear in the **Payer** field in the invoices, that you [generate in your management console](../instructions/bill-generation), perform the the [additional registration](../instructions/corporate#additional_registration_of_legal_entities) of your legal entity.

Additional registration is only available in [region](/en/tools-for-using-services/account/concepts/regions) Moscow and only for Russian resident companies.

{/cut}

{cut(How to register a project to another legal entity?)}

{note:info}

You can only change the mail of the project owner via [changing the owner](/en/tools-for-using-services/account/instructions/project-settings/manage#changing_project_owner).

{/note}

To register a project to another organization:

1. Write to the document management department of VK Cloud at [docs_vktech@vk.company](mailto:docs_vktech@vk.company).
1. Specify:

   - Full name and details of the organization to which the project was registered.
   - Full name and details of the organization to which the project needs to be reissued.

1. For legal entities-residents of the Russian Federation in the Moscow region: [specify](/en/intro/billing/instructions/corporate#additional_registration_of_legal_entities) new details in your management console.

{/cut}

{cut(How do I get scans of your constituent documents?)}

1. Write to the document management department of VK Cloud at [docs_vktech@vk.company](mailto:docs_vktech@vk.company).
1. Specify the list of documents that you require copies of.

{/cut}

{cut(How do we get scans of our accounting documents?)}

1. Write to the document management department of VK Cloud at [docs_vktech@vk.company](mailto:docs_vktech@vk.company).
1. Specify:

   - Full name and details of the organization.
   - List of documents copies of which you need.
   - Email address to send copies to.

Copies are provided in PDF format.

If you want to receive copies every reporting period, specify this in the request.

{/cut}
