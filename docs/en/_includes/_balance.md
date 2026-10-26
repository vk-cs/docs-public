Several accounts are automatically created for each new {linkto(../../../../tools-for-using-services/account/concepts/projects#tools-account-concepts-projects)[text=project]}:

- Current account — an account to which real money deposited is credited:

  - {ifdef(public)}It can be topped up using one of the available {linkto(../../../../intro/billing/concepts/payment-methods#billing-payment-methods)[text=payment methods]}{/ifdef}{ifndef(public)}It is topped up by the {var(cloud)} project owner{/ifndef}.
  - {ifdef(public)}Funds can be {linkto(../../../../intro/billing/instructions/refund#billing-refund)[text=refunded]} from it{/ifdef}{ifndef(public)}The project owner can refund funds from it{/ifndef}.
  - Unspent funds on it never expire.

- Bonus account — a specialized account for storing bonuses:

  - It cannot be topped up{ifdef(public)}, only {var(cloud)} can credit bonuses{/ifdef}. {ifndef(public)}Bonuses are issued by the {var(cloud)} administrator for testing the service or credited as a result of promotions, for example, for connecting a product or completing all the steps of the service setup.{/ifndef}
  - Funds cannot be refunded from it.
  - Unspent funds on it may expire.
  - There can be several bonus accounts. Bonuses are divided into several types, and a separate bonus account is created for each type.{ifdef(public)} For more information, see the {linkto(#billing-balance-bonuses)[text=Bonuses]} subsection.{/ifdef}

For users working on {ifdef(public)}{linkto(/en/intro/billing/concepts/physical-corporate#billing-physical-corporate-prepay)[text=prepayment]}{/ifdef}{ifndef(public)}prepayment{/ifndef}, the state of the current account and the balance of all bonus accounts {ifdef(public)}{linkto(../../../../intro/billing/instructions/payment#billing-payment)[text=are available]} in the header of the [management console](https://msk.cloud.vk.ru/app/){/ifdef}{ifndef(public)}are available in the header of the management console{/ifndef}. The amount of funds on the current account is reflected by **Account balance**, and the sum of bonuses on all bonus accounts is reflected by **Bonus balance**.
