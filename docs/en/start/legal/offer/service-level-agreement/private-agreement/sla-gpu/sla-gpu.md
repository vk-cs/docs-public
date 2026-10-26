
{include(/en/_includes/_translated_by_ai_en.md)}

This document (hereinafter — the "Agreement") defines the Service Level of the Cloud GPU Service (Virtual servers) [1] (hereinafter — the "Service") and is an integral part of the Agreement and the General Service Level Agreement posted on the Internet at: [https://cloud.vk.ru/docs/ru/start/legal/offer/service-level-agreement/common-agreement](/ru/start/legal/offer/service-level-agreement/common-agreement).

## 1. Service Availability Percentage

1.1. The Service Availability Percentage for the Reporting Period is calculated individually for each virtual machine using the following formula:

(Maximum uptime of the virtual machine – Downtime of the virtual machine) / Maximum uptime of the virtual machine × 100%

1.2. The maximum uptime of a virtual machine is the maximum possible number of minutes of operation of the respective virtual machine during the Reporting Period, taking into account the restrictions specified in the General Service Level Agreement.

1.3. The guaranteed availability level for a single virtual machine is **99.95%** during the Reporting Period.

## 2. Conditions for Recognizing a Virtual Machine as Unavailable

2.1. For the purposes of this Agreement, Service Unavailability with respect to a virtual machine means one or more of the following events:

- loss of network connectivity of the virtual machine;
- loss of access to the virtual machine's network disk.

2.2. Loss of network connectivity of a virtual machine means the unavailability of the data transmission environment, manifested in the inability to correctly transmit and receive IP packets generated in accordance with applicable international standards (RFC) via all network interfaces of the respective virtual machine.

2.3. Loss of access to a virtual machine's network disk means the inability to perform read and/or write operations with the network disk, accompanied by the accumulation of I/O requests in the virtual machine's queue.

2.4. Unavailability of a virtual machine is counted in the Availability calculation if the respective event is recorded by the Company's monitoring tools or confirmed by the Customer through a request to the support service.

2.5. This Agreement does not apply to cases of loss of virtual machine availability due to circumstances beyond the Company's control, including external malicious impact, actions or inaction of the Customer, or particularities of the operating system configuration, software, or network settings of the Customer that resulted in the unavailability of the virtual machine.

## 3. Amount of Compensation for Unavailability

3.1. In case of violation of the guaranteed Availability level, compensation is provided in the form of bonuses to the Customer's Bonus account, in an amount depending on the actual Availability percentage of the respective virtual machine for the Reporting Period:

| Virtual machine availability percentage | Compensation amount |
| --- | --- |
| 99.95% and above | not provided |
| less than 99.95% – 99.0% and above | 10% |
| less than 99.00% – 95.0% and above | 20% |
| less than 95.0% | 25% |

3.2. The Compensation amount is calculated as a percentage of the cost of the virtual machines for the Reporting Period for which Unavailability was recorded in the respective Reporting Period.

3.3. The Compensation is credited in the form of bonus points, which are not convertible into monetary funds.

3.4. The Customer agrees that the Compensation provided for in this Agreement is an exhaustive measure of the Company's liability to the Customer for the unavailability of the Service. The Customer acknowledges that the terms of Compensation payment provided for in this Agreement are proportionate and fair consequences of the violation, and also preclude the possibility of applying other forms of liability to the Company for Service Unavailability.

3.5. In all other matters not regulated by this Agreement, the Parties shall be governed by the provisions of the General Service Level Agreement.

---

[1] This Agreement applies to GPU and vGPU.

Revision: dated 31.08.2026.