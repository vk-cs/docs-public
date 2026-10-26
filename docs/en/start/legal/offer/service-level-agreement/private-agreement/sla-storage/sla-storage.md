
{include(/en/_includes/_translated_by_ai_en.md)}

This document (hereinafter — the "Agreement") defines the Service Level of the File Storage Service (hereinafter — the "Service") and is an integral part of the Agreement and the General Service Level Agreement posted on the Internet at: [https://cloud.vk.ru/docs/ru/start/legal/offer/service-level-agreement/common-agreement](/en/start/legal/offer/service-level-agreement/common-agreement).

## 1. Service Availability Percentage

1.1. The Service Availability Percentage for the Reporting Period is calculated individually for each file storage instance using the following formula:

(Maximum Uptime of the file storage instance – Downtime of the file storage instance) / Maximum Uptime of the file storage instance × 100%

1.2. Maximum Uptime of a file storage instance is the maximum possible number of minutes of operation of the corresponding file storage instance during the Reporting Period, taking into account the limitations specified in the General Service Level Agreement.

1.3. The guaranteed availability level for a single file storage instance is **99.9%** during the Reporting Period.

## 2. Conditions for Recognizing a File Storage Instance as Unavailable

2.1. For the purposes of this Agreement, Service Unavailability with respect to a file storage instance means the loss of access to the file storage for a duration of more than 5 (five) minutes.

2.2. Loss of access to a file storage instance means a state in which all requests to the corresponding file storage instance fail with server-side errors.

2.3. Unavailability of a file storage instance is taken into account when calculating Availability if the corresponding event is registered by the Company's monitoring tools or confirmed by the Customer by contacting the support service.

2.4. The Agreement does not apply to cases of loss of Availability of a file storage instance due to circumstances beyond the Company's control, including external malicious impact, actions or inaction of the Customer, specifics of the configuration of the Customer's client resources, network settings of the Customer, software of the Customer, or other components of the Customer's infrastructure that resulted in the inability to access the file storage instance.

## 3. Amount of Compensation in Case of Unavailability

3.1. In case of violation of the guaranteed Service Availability level, a Compensation is provided in the form of bonuses credited to the Customer's Bonus account, in an amount depending on the actual Availability percentage of the corresponding file storage instance for the Reporting Period:

| File storage instance availability percentage | Compensation amount |
| --- | --- |
| 99.90% and above | not provided |
| less than 99.90% – 99.0% and above | 10% |
| less than 99.00% – 95.0% and above | 20% |
| less than 95.0% | 25% |

3.2. The Compensation amount is calculated as a percentage of the cost of the file storage instances for the Reporting Period for which Unavailability was registered in the corresponding Reporting Period.

3.3. The Compensation is credited in the form of bonus points, which are not convertible into monetary funds.

3.4. The Customer agrees that the Compensation provided for in this Agreement is the exhaustive measure of the Company's liability towards the Customer for Unavailability of the Service. The Customer acknowledges that the terms of Compensation payment provided for in this Agreement are proportionate and fair consequences of the violation, and also exclude the possibility of applying other forms of liability to the Company for Unavailability of the Service.

3.5. In all other respects not regulated by this Agreement, the Parties shall be governed by the provisions of the General Service Level Agreement.

Revision: dated 31.08.2026.