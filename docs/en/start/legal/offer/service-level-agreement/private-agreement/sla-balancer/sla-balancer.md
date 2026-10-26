
{include(/en/_includes/_translated_by_ai_en.md)}

This document (hereinafter referred to as the "Agreement") defines the Service Level of the "Standard Load Balancer" Service (hereinafter referred to as the "Service") and is an integral part of the Contract and the General Service Level Agreement posted on the Internet at: [https://cloud.vk.ru/docs/ru/start/legal/offer/service-level-agreement/common-agreement](/ru/start/legal/offer/service-level-agreement/common-agreement).

## 1. Service Availability Percentage

1.1. The Service Availability Percentage for the Reporting Period is calculated individually for each load balancer using the following formula:

(Maximum uptime of the load balancer – Downtime of the load balancer) / Maximum uptime of the load balancer × 100%

1.2. Maximum uptime of the load balancer is the maximum possible number of minutes of operation of the respective load balancer during the Reporting Period, taking into account the limitations specified in the General Service Level Agreement.

1.3. The guaranteed availability level for a single load balancer is **99.9%** during the Reporting Period.

## 2. Conditions for Recognizing a Load Balancer as Unavailable

2.1. For the purposes of this Agreement, Service Unavailability with respect to a load balancer means the loss of network connectivity to the load balancing target resources through the load balancer, provided that the said target resources are in a fully operational state.

2.2. Loss of network connectivity to the load balancing target resources through the load balancer means the unavailability of the data transmission environment, manifested in the inability to correctly transmit and receive IP packets formed in accordance with applicable international standards (RFC) between the load balancer and the load balancing target resources.

2.3. Load balancer unavailability is taken into account in the Availability calculation if the respective event is recorded by the Company's monitoring tools or confirmed by the Customer through a request to the support service.

2.4. The Agreement does not apply to cases of load balancer availability loss due to circumstances beyond the Company's control, including external malicious impact, actions or inaction of the Customer, configuration features of the load balancing target resources, the Customer's network settings, or other components of the Customer's infrastructure that resulted in the unavailability of the load balancing target resources or the inability to correctly process traffic.

## 3. Compensation Amount for Unavailability

3.1. In the event of a violation of the guaranteed Availability level, Compensation is provided in the form of bonuses credited to the Customer's Bonus account, in an amount depending on the actual Availability percentage of the respective load balancer for the Reporting Period:

| Load balancer availability percentage | Compensation amount |
| --- | --- |
| 99.90% and above | not provided |
| less than 99.90% – 99.0% and above | 10% |
| less than 99.00% – 95.0% and above | 20% |
| less than 95.0% | 25% |

3.2. The Compensation amount is calculated as a percentage of the cost of the load balancers for the Reporting Period for which Unavailability was recorded in the respective Reporting Period.

3.3. Compensation is credited in the form of bonus points, which are not convertible into monetary funds.

3.4. The Customer agrees that the Compensation provided for in this Agreement is the exhaustive measure of the Company's liability to the Customer for the unavailability of the Service. The Customer acknowledges that the terms of Compensation payment provided for in this Agreement are proportionate and fair to the consequences of the violation, and also preclude the application of any other forms of liability to the Company for Service Unavailability.

3.5. In all other respects not regulated by this Agreement, the Parties shall be governed by the provisions of the General Service Level Agreement.

Revision: dated 31.08.2026.