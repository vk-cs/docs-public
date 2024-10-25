## Payment, refund, bonuses

<details>

<summary>How do I get bonuses for registering in my management console?</summary>

[Bonuses](../concepts/balance#bonuses) are credited when registering a new user account. Bonuses are accrued after all [registration](/en/intro/start/account-registration) steps are completed.

Bonuses are not awarded when new projects are created by existing users and when a new user enters a project by invitation.

<warn>

In some cases, previously accrued bonuses may be canceled or denied. See more in [paragraph 8.3 of the VK Cloud Platform Terms of Use](/en/intro/start/legal/legal-terms#8_payment_for_company_services)

</warn>

</details>

<details>

<summary>In what order are the bonuses charged, why could they have expired?</summary>

[Bonuses](../concepts/balance#bonuses) in VK Cloud are spent on using cloud services and resources. There are different types of bonuses, each type of bonus can be spent only on VK Cloud services corresponding to it. One bonus is equal to one ruble.

Bonuses are given for 60 days, after that they burn off. You can see the details of your expenses on the **Balance** page in your management console.

<warn>

You cannot withdraw bonuses from the project.

</warn>

</details>

<details>

<summary>Are funds being charged after the end of the test period?</summary>

After the test period has expired or bonuses have been burned off, the payment account balance is used to pay for resources. If the payment account balance is zero, the project is [frozen](/en/tools-for-using-services/account/concepts/projects#automatic_freezing_of_the_project).

</details>

<details>

<summary>How are funds charged?</summary>

VK Cloud records the consumption of resources in the cloud on a minute-by-minute basis, and funds for the use of resources are charged from the payment account balance also on a minute-by-minute basis. Licenses are charged once a day.

</details>

<details>

<summary>The project does not display the balance at all. How do I turn it on?</summary>

[Balance](../concepts/balance) is displayed:

- If your [role](/en/tools-for-using-services/account/concepts/rolesandpermissions) in the project is the owner, superadministrator or billing administrator.
- After the services are activated in the project. To understand if the services are activated:

  1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
  1. Go to the section of any service. If the **Enable services** button is displayed, [activate](/en/tools-for-using-services/account/service-management/activation) them by pressing this button.

    During activation, you may need to confirm the phone number and link the payment card.

</details>

<details>

<summary>What is the risk of a negative balance?</summary>

The payment account balance in the project management console may go negative. If you work with VK Cloud on [prepay](../concepts/physical-corporate#prepayment), the work of services and resources in this case will be suspended.

No penalties are charged on negative balance, but it is necessary to [replenish the payment account](../service-management/payment#making_a_payment) to continue the work.

<warn>

Unlocking of services takes up to 4 hours from the moment of crediting.

</warn>

</details>

<details>

<summary>How much do I need to replenish my account to resume work?</summary>

The project will resume automatically when the payment account balance is positive.

It is recommended to deposit an amount equal to the daily charge, or enable [auto-top-up](../service-management/add-card#configure_auto_completion).

</details>

<details>

<summary>I have paid the bill, the services in the project are active. Why is the balance negative?</summary>

You are probably a legal entity and work with VK Cloud for a post-payment. In this case, the payment account balance of your project will always be negative.

If you do not know your payment scheme, contact the document management department of VK Cloud:

1. Write to [docs_vktech@vk.company](mailto:docs_vktech@vk.company).
1. Specify:

   - Full name of the organization.
   - Details of the organization.

</details>

<details>

<summary>How to pay for the work of a service from a legal entity?</summary>

If you work with VK Cloud on prepayment, [form an invoice](../service-management/bill-generation/) and pay it in your management console.

When working on the post-payment scheme, the invoice and [accounting documents](../concepts/report#legal_entities) for the reporting period are sent via the electronic document management system (EDM) within five working days of the month following the reporting one.

If you have not received the accounting documents, contact the document management department of VK Cloud:

1. Write to [docs_vktech@vk.company](mailto:docs_vktech@vk.company).
1. Specify:

   - Full name of the organization.
   - Details of the organization.

</details>

<details>

<summary>How to connect the post-payment scheme?</summary>

Post-payment is available:

- Only for legal entities.
- Only within the framework of an individual contract with VK Cloud.

To activate the postpayment scheme, [conclude an individual contract](../service-management/corporate/) and perform additional project configuration for legal entities in the VK Cloud management console.

</details>

<details>

<summary>How long does it take for funds to be credited when paying by bank transfer?</summary>

Up to 3 banking days.

</details>

<details>

<summary>Why should I link a card if I am a legal entity and pay according to the details?</summary>

You may need the card if you work on a prepaid basis and need to make an emergency top-up, for example, to avoid [freezing](/en/tools-for-using-services/account/concepts/projects#automatic_freezing_of_the_project) a project.

<warn>

Charges for bank card payments are not included in [accounting documents for legal entities](../concepts/report#composition_of_accounting_documents): billing report, reconciliation report.

</warn>

</details>

<details>

<summary>When and how will I receive the accounting documents after payment?</summary>

<tabs>
<tablist>
<tab>Individuals</tab>
<tab>Legal entities</tab>
</tablist>
<tabpanel>

Immediately after the funds are credited, the receipt is sent to the email address of the project owner.

</tabpanel>
<tabpanel>

As part of the package of [accounting documents](../concepts/report) for the corresponding reporting period (month).

When working through the electronic document management system (EDM), documents are available immediately. If the organization maintains a paper document flow with VK Cloud, the delivery time of the original documents is added.

If you have not received your original documents or need scanned copies, write to the document management department of VK Cloud at [docs_vktech@vk.company](mailto:docs_vktech@vk.company).

</tabpanel>
</tabs>

</details>

<details>

<summary>How do I get a payment receipt from a specific date?</summary>

1. Contact [technical support](mailto:support@mcs.mail.ru).
2. Specify:

   - [Project ID (PID)](/en/tools-for-using-services/account/service-management/project-settings/manage#getting_project_id)
   - Project [region](/en/tools-for-using-services/account/concepts/regions)
   - Amount and date of payment
   - Payment confirmation

</details>

<details>

<summary>I have topped up the balance, but the payment is not credited. What to do?</summary>

The terms of crediting funds depend on [the payment method](../concepts/payment-methods):

- Payment by bank transfer — payment can take up to three banking days from the date of transfer of funds by the bank.
- Payment by other methods — the payment is credited within 5-10 minutes after payment confirmation.

If the payment is not received within the specified time, contact [technical support](mailto:support@mcs.mail.ru) to search for it and specify:

- [Project ID (PID)](/en/tools-for-using-services/account/service-management/project-settings/manage#getting_project_id)
- Project [region](/en/tools-for-using-services/account/concepts/regions)
- Payment confirmation

</details>

<details>

<summary>How do I make a refund?</summary>

Contact [technical support](mailto:support@mcs.mail.ru). For more information about the refund conditions and the requirements for the application, see [Refund of funds](../service-management/refund).

You can refund only funds that you have previously credited to your payment account. [Bonuses](../concepts/balance#bonuses) cannot be refunded.

For individuals, the funds will be returned to the account from which the payment has been made.

</details>

## Freezing the project

<details>

<summary>The balance has become negative, how can the services be restored?</summary>

When working on prepayment with a negative payment account balance, the project is automatically [frozen](/en/tools-for-using-services/account/concepts/projects#automatic_freezing_of_the_project). Its objects are placed in the queue for deletion for a period:

- 3 days if you have never replenished the payment account of the project.
- 30 days if you have topped up the payment account of the project at least once.

   <err>

   As soon as the storage period in the queue expires, all project resources will be permanently deleted.

   </err>

To restore the services:

1. [Go to](https://msk.cloud.vk.com/app/en/) VK Cloud management console.
1. [Replenish](../service-management/payment#making_a_payment) the payment account of the project [in a convenient way](../concepts/payment-methods/). Use physical bank cards to get the funds to the payment account balance faster. Funds are credited from them immediately, but if you pay by bank transfer, the process can take up to 3 working days.
1. Wait for the activation of services in the project. It can take up to 2 hours.
1. Manually activate project resources:

   - [Virtual machines](/en/computing/iaas/service-management/vm/vm-manage#start_stop_restart_vm)
   - [Kubernetes containers](/en/kubernetes/k8s/service-management/manage-cluster#start_cluster_ffb49399)
   - [VM backup](/en/storage/backups/service-management/vm-backup/vm-backup-manage#activating_stopping_and_deleting_a_backup_plan)
   - Other resources

<info>

To find out how long resources are in the queue for deletion, contact [technical support](mailto:support@mcs.mail.ru) and specify:

- [Project ID (PID)](/en/tools-for-using-services/account/service-management/project-settings/manage#getting_project_id)
- [Region](/en/tools-for-using-services/account/concepts/regions)

</info>

</details>

<details>

<summary>I have topped up my balance to unblock the services. How long to wait?</summary>

Unlocking can take up to 4 hours.

After unlocking, manually start objects that have been stopped, such as virtual machines.

</details>

<details>

<summary>Can I take the promised payment to avoid freezing?</summary>

The promised payment is not supported.

</details>

<details>

<summary>I don't have time to pay for services by transfer. How to avoid freezing?</summary>

Pay for services with a bank card, payments from cards are faster.

<warn>

Charges for bank card payments are not included in [accounting documents for legal entities](../concepts/report#composition_of_accounting_documents): billing report, reconciliation report.

</warn>

</details>

<details>

<summary>I have topped up the balance, but the payment failed. How to avoid freezing?</summary>

1. Contact [technical support](mailto:support@mcs.mail.ru).
1. Specify:

   - [Project ID (PID)](/en/tools-for-using-services/account/service-management/project-settings/manage#getting_project_id)
   - Project [region](/en/tools-for-using-services/account/concepts/regions)
   - Payment confirmation

</details>

## Working with legal entities

<details>

<summary>We are a company not from the Russian Federation, how to start working with VK Cloud?</summary>

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
| —

| Payment for services
| Currency of payments and other payment terms are discussed at the time of contract execution
| In the region of Kazakhstan it is possible to pay for services:
  - Only in tenge.
  - If paying by card, only cards issued by banks of Armenia, Azerbaijan, Belarus, Estonia, Georgia, Kazakhstan, Kyrgyzstan, Latvia, Lithuania, Tajikistan, or Uzbekistan are accepted

|===

</details>

<details>

<summary>We are a company from the Russian Federation, how to pay for services?</summary>

<tabs>
<tablist>
<tab>Prepayment work</tab>
<tab>Post-payment work</tab>
</tablist>
<tabpanel>

1. Complete the [additional registration](../service-management/corporate#additional_registration_of_legal_entities) of the legal entity, if it has not already been done.
1. [Create an invoice](../service-management/bill-generation) for the required amount in your management console.
1. Pay the bill by bank transfer.

</tabpanel>
<tabpanel>

1. Wait for the invoice from VK Cloud. The invoice comes as part of a package of [accounting documents](../concepts/report) for the corresponding reporting period (month).
1. Pay the bill by bank transfer.

</tabpanel>
</tabs>

</details>

<details>

<summary>We are a company not from the Russian Federation, how to pay for services?</summary>

<tabs>
<tablist>
<tab>Prepayment work</tab>
<tab>Post-payment work</tab>
</tablist>
<tabpanel>

Request an invoice from the document management department of VK Cloud:

1. Write to [docs_vktech@vk.company](mailto:docs_vktech@vk.company).
1. Specify:

   - Full name and details of the organization.
   - Invoice amount.

1. Pay the invoice received from VK Cloud using a bank transfer.

</tabpanel>
<tabpanel>

1. Wait for the invoice from VK Cloud. The invoice comes as part of a package of [accounting documents](../concepts/report) for the corresponding reporting period (month).
1. Pay the invoice received from VK Cloud using a bank transfer.

</tabpanel>
</tabs>

</details>

<details>

<summary>How to conclude an individual contract with VK Cloud?</summary>

1. Write to the customer service department of VK Cloud at [sales-team@mcs.mail.ru](mailto:sales-team@mcs.mail.ru).
1. Specify:

   - Full name and details of the organization.
   - Full name and phone number of the contact person.

The manager will contact you to clarify the required terms of the contract.

</details>

<details>

<summary>How do I find out VK Cloud banking details?</summary>

<tabs>
<tablist>
<tab>Moscow</tab>
<tab>Kazakhstan</tab>
</tablist>
<tabpanel>

If your project is in [region](/en/tools-for-using-services/account/concepts/regions) Moscow, and you are working with “VK” LLC, its main details are available at https://cloud.vk.com/contacts.

You can also [generate an invoice](../service-management/bill-generation) in your management console and view the contents of the **Supplier** field.

</tabpanel>
<tabpanel>

If your project is in [region](/ru/tools-for-using-services/account/concepts/regions) Kazakhstan, and you are working with “QazCloud” LLC, its details are available at https://vkcloud.kz/contacts/.

</tabpanel>
</tabs>

</details>

<details>

<summary>How do I find out the terms of my contract with VK Cloud?</summary>

Ask this question in the document management department of VK Cloud:

1. Write to [docs_vktech@vk.company](mailto:docs_vktech@vk.company).
2. Specify:

   - Full name of the organization.
   - Details of the organization.

</details>

<details>

<summary>How to get accounting documents for accounting?</summary>

1. Write to the document management department of VK Cloud at [docs_vktech@vk.company](mailto:docs_vktech@vk.company).
1. Specify:

   - Full name and details of the organization.
   - The composition of [accounting documents](../concepts/report) that you require.
   - Method of obtaining documents: through [electronic document management system (EDM)](../concepts/report#edm) or [in paper form to the postal address](../concepts/report#delivery_of_original_documents).

   <info>

   EDM work is available only to organizations registered in the Russian Federation.

   </info>

Accounting documents will be sent once in the reporting period (month).

VK Cloud can duplicate reporting documents in the form of scanned copies in PDF format to e-mail. If you want to receive scanned copies, write about it in the request and specify email addresses of recipients.

</details>

<details>

<summary>How do I get a reconciliation report for the required period?</summary>

1. Write to the document management department of VK Cloud at [docs_vktech@vk.company](mailto:docs_vktech@vk.company).
1. Specify:

   - Full name and details of the organization.
   - The period for which the act is required.

</details>

<details>

<summary>I have unloaded the invoice, it does not contain my details. How do I add them?</summary>

To make the data of your organization appear in the **Payer** field in the invoices, that you [generate in your management console](../service-management/bill-generation), perform the the [additional registration](../service-management/corporate#additional_registration_of_legal_entities) of your legal entity.

Additional registration is only available in [region](/en/tools-for-using-services/account/concepts/regions) Moscow and only for Russian resident companies.

</details>

<details>

<summary>How to register a project to another legal entity?</summary>

<info>

You can only change the mail of the project owner via [changing the owner](/en/tools-for-using-services/account/service-management/project-settings/manage#changing_project_owner).

</info>

To register a project to another organization:

1. Write to the document management department of VK Cloud at [docs_vktech@vk.company](mailto:docs_vktech@vk.company).
1. Specify:

   - Full name and details of the organization to which the project was registered.
   - Full name and details of the organization to which the project needs to be reissued.

1. For legal entities-residents of the Russian Federation in the Moscow region: [specify](/en/intro/billing/service-management/corporate#additional_registration_of_legal_entities) new details in your management console.

</details>

<details>

<summary>How do I get scans of your constituent documents?</summary>

1. Write to the document management department of VK Cloud at [docs_vktech@vk.company](mailto:docs_vktech@vk.company).
1. Specify the list of documents that you require copies of.

</details>

<details>

<summary>How do we get scans of our accounting documents?</summary>

1. Write to the document management department of VK Cloud at [docs_vktech@vk.company](mailto:docs_vktech@vk.company).
1. Specify:

   - Full name and details of the organization.
   - List of documents copies of which you need.
   - Email address to send copies to.

Copies are provided in PDF format.

If you want to receive copies every reporting period, specify this in the request.

</details>
