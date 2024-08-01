Users receive financial documents from VK Cloud for all payments made. The composition of such documents differs for individuals and legal entities.

## Individuals

When replenishing an account, individuals receive a payment receipt in accordance with [Federal Law 54](https://base.garant.ru/12130951/) «О применении контрольно-кассовой техники». The receipt is sent to the VK Cloud project owner's email address. The original payment receipt is not provided.

## {heading(Legal entities and sole proprietors)[id=legal_entities]}

At the end of each reporting period, VK Cloud provides the counterparty with a package of accounting [accounting documents](#composition_of_accounting_documents). The reporting period is equal to one calendar month, the documents are signed on the last date of this month.

The documents are sent to the recipients in the [way](#methods_of_obtaining_accounting_documents) that was chosen at the beginning of the cooperation, in the following terms:

- If an agreement of amounts is required — around the 15th of the month following the reporting period.
- If approval is not required — on the 7th-10th of the month following the reporting period.

<info>

If an organization or a sole proprietor has several [projects](/en/tools-for-using-services/account/concepts/projects), one set of documents is generated for all projects. Upon request, separate packages of documents for each project can be provided.

</info>

How to start receiving reporting documents from VK Cloud, read the article [Additional project configuration for legal entities](../../service-management/corporate). If you have any questions related to accounting documents, please write to the document management department of VK Cloud at [docs_vktech@vk.company](mailto:docs_vktech@vk.company).

<warn>

The accounting documents reflect only expenses carried out as bank transfers from a legal entity or a sole proprietor.

</warn>

### {heading(Composition of accounting documents)[id=composition_of_accounting_documents]}

<tabs>
<tablist>
<tab>Work under the public offer agreement</tab>
<tab>Work under an individual contract</tab>
</tablist>
<tabpanel>

This refers to work on [service offer agreements](/en/intro/start/legal). This scheme is used by default in all projects, for individuals and legal entities.

Legal entities and sole proprietors working under such an agreement are provided with only one document — a universal transfer document. The form of the universal transfer document contains all the details of the invoice, set out in p.p. 5, 5.1, 5.2 art. 169 tax code of the Russian federation.

The invoice and the Certificate of work performed are not provided, as the universal transfer document replaces both of these documents.

</tabpanel>
<tabpanel>

The composition of the accounting documents depends on the specific terms of the contract. In particular, there are differences for organizations working [on prepayment and on post-payment](../physical-corporate#payment_scheme).

- When working on prepayment:

  - Main documents: universal transfer document.

  - Additional documents, if required by contract:

    - Invoice
    - Certificate of completed works

    <info>

    If an invoice is provided, the universal transfer document is not provided. The certificate of completed works can be provided together with the universal transfer document.

    </info>

    An invoice for payment is not provided. Organizations that work on prepayment [form](../../service-management/bill-generation) it independently in their management console.

- When working on a post-payment:

  - Basic documents:

    - Universal transfer document
    - Payment invoice

  - Additional documents, if required by contract:

    - Invoice
    - Certificate of completed works

    <info>

    If an invoice is provided, the universal transfer document is not provided. The certificate of completed works can be provided together with the universal transfer document.

    </info>

</tabpanel>
</tabs>

In addition to the documents provided for in the contract, upon request, the following documents can be provided:

- Billing report for the selected period.

    It contains details on resource consumption and is used to confirm amounts in accounting documents. You can [upload](../../service-management/detail#downloading_the_report) such a report from your management console.

- Reconciliation report with the details of mutual settlements.

### {heading(Methods of obtaining accounting documents)[id=methods_of_obtaining_accounting_documents]}

Documents are sent through the electronic document management system (EDM).

If electronic document flow with the organization is not possible, VK Cloud sends paper originals of documents to the address of the organization.

<info>

VK Cloud never sends documents to a legal address without an explicit agreement with the organization.

</info>

#### {heading(Electronic document management system (EDM))[id=edm]}

VK Cloud works in the EDM system [Kontur.Diadoc](https://www.diadoc.ru/).

If your organization or sole proprietor works with another EDI operator from the [register of the Federal Tax Service of the Russian Federation](https://www.nalog.gov.ru/rn77/oedo/search_edo/), set up roaming to exchange documents with VK LLC using its EDM participant ID — `2BM-7743001840-2012052807514600749280000000000`.

You can configure EDM with VK Cloud yourself or send a request for configuration to the document management department of VK Cloud (docs_vktech@vk.company).

<info>

EDM work is only available for projects in [region](/en/tools-for-using-services/account/concepts/regions) Moscow and only organizations and sole proprietors registered in the Russian Federation.

</info>

#### {heading(Delivery of original documents)[id=delivery_of_original_documents]}

To set up paper workflow, contact the document management department of VK Cloud:

1. Write to [docs_vktech@vk.company](mailto:docs_vktech@vk.company).
1. Specify:

   - The required method of document delivery: by mail or courier service.
   - (If courier delivery is selected) The recipient's contact phone number.
   - Full name of the recipient.
   - Recipient's address. If the address matches the legal address of the organization, specify it explicitly in the request.

#### Scanned copies of documents

VK Cloud can provide scanned copies of accounting documents in PDF format by e-mail — every month or on a one-time basis, upon request. To get scanned copies, write to the document management department of VK Cloud at [docs_vktech@vk.company](mailto:docs_vktech@vk.company).

## Tax accounting

For tax residents of the Russian Federation, the amount of VAT is indicated in payment and accounting documents.
