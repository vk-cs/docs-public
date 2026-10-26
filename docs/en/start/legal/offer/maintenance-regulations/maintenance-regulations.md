
{include(/en/_includes/_translated_by_ai_en.md)}

## 1. General Provisions

1.1. Purpose of the document

These Regulations (hereinafter referred to as the "Regulations") define the procedure for interaction between the Parties within the framework of Technical Support services provided by Digital Cloud LLC (hereinafter referred to as the "Company") in accordance with concluded agreements.

## 2. Communication Channels

The Company provides Technical Support services by processing incoming Requests. Interaction is carried out through the following official communication channels:

-   self-service portal (Portal): [https://support.mcs.mail.ru/](https://support.mcs.mail.ru/);
-   email: [support@mcs.mail.ru](mailto:support@mcs.mail.ru).

The initiator of a Request is the Customer or their authorized representative. Processing of Requests received through the specified communication channels is performed only after successful identification of the Request initiator (hereinafter referred to as the "Initiator") according to the following scenarios:

-   authentication on the self-service Portal;
-   identification by the sender's email address specified in the message. The message must be sent from the official contact address of the Customer or the Customer's authorized representative.

## 3. Scope of Technical Support Services

Technical Support services include the receipt, registration, and processing of the following types of Requests:

**Incident** – an unplanned event that has led or may lead to a disruption of the Product's operation, a decrease in quality, or a termination of the provision of Services. Incident processing is completed at the moment when the Technical Support Specialist has sent the Initiator information that the Product's functionality has been restored, or the provision of Services has been resumed to the extent corresponding to the description of the Services.

**Service Request** – information about the need to perform certain actions to support the Services that are not related to a failure. Standard Service Requests are executed according to a template and have a fixed scope, priority, and deadline. Providing operating instructions for Products and other consultations is considered a special case of a Service Request.

**Change Request** – information about the need to add, modify, or delete something that affects the operation of the Company's Products. Based on the results of the Change Request analysis, the implementation may be deemed inexpedient. In this case, the result of the Request processing will be a refusal to implement the proposed change without justification of the reasons for such refusal.

## 4. Priority

Requests are assigned a Priority parameter, which is determined by the Initiator when registering the Request through the Technical Support Portal.

For a Priority other than Low and Medium, the Initiator must provide a detailed description of the impact and justification in accordance with the Priority description.

The Company reserves the right to adjust the Priority of a Request based on the results of the actual impact analysis, in case the information requested as part of the Request clarification is not provided, or by agreement with the Initiator.

Table 1. "Criteria for determining Priority"

[cols="1,3", options="header"]
|===

| Priority 
| Description (definition) 

| Critical
| There is a complete inability to use the **main**\* functionality of the Service. 

| High
| Using the **main** functionality of the Service causes difficulties. There is a complete inability to use the **additional*** functionality of the Service.

| Medium
| Using the **additional** functionality of the Service causes difficulties. There is a complete inability to use the auxiliary functionality of the Services.

| Low
| The Request is not related to deviations in the operation of the Service. 

|===

\* The list of functionality for individual Services is provided in the Service documentation.

Requests are processed in the order of their receipt in accordance with the request processing mode. Work on Requests assigned the Incident type with Critical and High Priority is performed on a priority basis.

The deadline for completing work on a Request is determined by the performer.

The countdown of the deadline for completing work on a Request is suspended in the following cases:

-   The Technical Support Specialist requested additional information from the Initiator necessary to continue working on the Request. Request status – "Waiting for Customer". If no feedback is received from the Initiator within 4 business days, the Request is automatically moved to the "Completed" status, and the Initiator is notified of the completion of Request processing. Within 5 business days, the Initiator can return the Request to work; after this period, the Request status is automatically changed to "Closed", and Request processing is completed.
-   Work has been suspended by agreement with the Customer, and a date and time for resuming work has been determined. Request status – "Scheduled". After the agreed deadline for resuming work arrives, the Request status is automatically changed to "In Progress", and the countdown of the deadline continues.
-   The Technical Support Specialist has completed the work on the Request, Request status – "Completed". The Initiator has been notified of the completion of work. Within 5 business days, the Initiator can return the Request to work or confirm the completion of work; after this period, the Request status is automatically changed to "Closed", and Request processing is completed.

## 5. Request Processing Procedure

The Request processing procedure defines the sequence of steps and procedures necessary to satisfy the needs of the requester. The Request processing procedure is presented as a table description:

Table 2. "Request Processing Procedure"

[cols="1,1,1,1,1", options="header"]
|===

| **Step**
| **Input**
| **Description**
| **Output**
| **Responsible** 

|1\. Request Classification 
| Information has been received from the Initiator via an official communication channel
| The Request is recorded in the SRM system with a unique identifier assigned, and the Initiator is notified of the registration. Based on the results of the primary analysis, the Request attributes are determined, such as:

-   Request Type;
-   Product;
-   Service;
-   Priority;
-   Deadline.

| The Request has been registered in the SRM system and classified
| Technical Support Specialist 

.2+|2\. Solution Search
.2+| The Request has been registered in the SRM system and classified; Additional information has been provided upon request
.2+| Analysis of the information and planning of the necessary work on the Request is performed
| Additional information is required, a request has been sent to the Initiator
.2+| Technical Support Specialist 

| The necessary work on the Request has been identified 

.2+|3\.  Information Provision
.2+| Additional information is required, a request has been sent to the Initiator
.2+| If necessary, a request for additional information is sent to the Initiator. After the information is received, Request processing resumes
| Additional information has been provided upon request
.2+| Initiator 

| Information has not been provided upon request* 

|4\. Work Execution
| The necessary work on the Request has been identified
| The Technical Support Specialist performs the necessary work on the Request or provides the Initiator with a consultation within the scope of the user documentation
| Work on the Request has been completed
| Technical Support Specialist 

|5\. Report on Completed Work
| Work on the Request has been completed
| The Initiator is sent a message about the completion of work on the Request and a request for feedback
| The Request has been completed, the message has been sent to the Initiator
| Technical Support Specialist 

.2+|6\.  Request Feedback
.2+| The Request has been completed, the message has been sent to the Initiator
.2+| The Initiator confirms receipt of the solution to the Request or returns the Request for rework within the established time limit
| The Request has been sent for rework
.2+| Initiator 

| The solution has been confirmed\* 

|7\.  Request Closure
| The solution has been confirmed*; Information has not been provided upon request\*
| The Request is moved to the "Closed" status. Request processing has been completed
| **Process completed**
| Technical Support Specialist

|===

\* When a request for clarification is sent to the Initiator, the countdown of the deadline for the Request is suspended. If the Initiator's response is not received within 4 business days, the Request is moved to the "Completed" status. The Initiator is sent a notification about the completion of work on the Request with a request for feedback and the ability to return the Request for rework. If feedback from the Initiator is not received within 5 business days, the Request moves to the "Closed" status, and Request processing is completed in this case. In this case, to resume work, the Initiator must register a new Request.

## 6. Request Life Cycle

The life cycle is a set of statuses that allows determining the current state of the Request and the area of responsibility of the current work performer. The set of statuses used and the allowed transitions between them are given in Table 3.

The current status of the Request is available to the Initiator in the list of Requests on the Portal.

Table 3. "Request Life Cycle Statuses and Transitions Between Them"

[cols="1,2,1,2", options="header"]
|===

|**Status**
| **Status Description**
| **Next Status**
| **Transition Condition** 

.2+| **Registered** **(Initial Status)**
.2+| Assigned to the Request upon registration in the SRM system.
| **In Progress**
| The Request has been taken into work by the Technical Support Specialist 

| **Merged**
| The Request duplicates an existing one. Information from the new Request has been added to the existing one. The Request life cycle is completed 

.3+| **In Progress**
.3+| The Technical Support Specialist has started working on the Request
| **Waiting for Customer**
| Additional information from the Initiator is awaited 

| **Scheduled**
| Work on the Request has been postponed to a period agreed with the Customer

| **Completed**
| Work on the Request has been completed 

| **Scheduled**
| A date and time for performing work on the Request has been assigned
| **In Progress**
| The Request has been taken into work by the Technical Support Specialist

.2+| **Waiting for Customer**
.2+| Feedback from the Initiator is awaited, clarifying questions have been asked, and answers or any other actions are awaited
| **In Progress**
| The Request has been taken into work by the Technical Support Specialist

| **Completed**
| After 4 business days, if the Initiator has not responded to the information request 

.2+| **Completed**
.2+| All work on the Request has been completed, the Initiator has been sent a notification with the ability to return the Request for rework
| **Return to Work**
| The Initiator has returned the Request for rework.

| **Closed**
| Feedback has been received from the Initiator. The standard waiting period for feedback from the Initiator has expired 

| **Return to Work**
| The Request requires additional processing
| **In Progress**
| Request processing must be returned to work by the Technical Support Specialist 

| **Closed**
| The Request is closed. Work on the Request has been completed
| 
| The Request life cycle is completed 

|===

## 7. Requirements for Request Processing

Information for Request registration

To register a Request, the Initiator sends information through the communication channels specified in clause 2 of these Regulations. The Initiator provides a detailed description of the essence of the Request for correct classification, routing, and performance of work.

The Request description must contain the following information{footnote(The list of information is not exhaustive. Additional information is requested as necessary)}:

-   Title — the name of the feature or module and a brief description of the situation (description of the failure for an incident);
-   Reproduction steps — a numbered sequence of actions leading to the described situation;
-   Expected result — the result that the Initiator intends to receive as a result of the Technical Support services;
-   Actual result — the result that the Initiator receives at the time of Request registration;
-   Priority — specified according to the prioritization rules;
-   Configuration data of the Product for which the Request has been created (if applicable);
-   Screenshot(s);
-   Link to a document describing the situation (if available)
-   Name of the Customer's company;
-   Project ID;

Optionally:

-   Attachments (logs, video of the situation reproduction);
-   Any other data that could potentially help Specialists analyze the Request more effectively.

During primary processing, the Request is assigned a priority in accordance with the criteria described in these Regulations. Each priority corresponds to a deadline for completing the work or providing a solution.

## 8. Closing a Request Without Processing

The Company has the right to close a Request without processing in the following cases:

-   The Request has been identified as spam based on the criteria described in the Specialist's instructions;
-   The requester has not passed the identification procedure that gives them the right to register Requests on behalf of the specified Customer;
-   The Services and Products selected in the Request do not correspond to the Services and Products of the Company that the Customer contacted about.

## 9. Performing Work on a Request

The Initiator receives information that work has started when the Request is assigned the "In Progress" status.

The result of work on an Incident is considered to be the restoration of the Product's operability to a state that allows resuming the use of the agreed functionality by applying a permanent or temporary solution to the Incident.

The result of work on a Service Request is considered to be the provision of the expected result to the Initiator, corresponding to the template of a standard Service Request or agreed upon during the processing of a non-standard Service Request.

The result of processing a Change Request is considered to be the provision of information to the Initiator about the expected implementation timeframes of the requested change, about the need to agree on the scope, cost, and timeframes of work in a separate agreement/additional agreement to the contract, or a refusal to implement the proposed change. To avoid doubts, the Company's performance of a Change Request at the Initiator's request does not grant the Initiator/Customer any rights to the results of changes/modifications of the Product made by the Company in connection with the performance of the Change Request.

## 10. Closing a Request

After all necessary work on the Request has been completed, the Technical Support Specialist assigns the Request the "Completed" status. The Initiator is sent a brief report on the results of the work performed.

The Initiator is given the opportunity to return the Request for rework if the result of the work performed does not meet expectations. The Initiator must provide information confirming the need to continue working on the Request. The countdown of the deadline is resumed in this case.

The Initiator is given the opportunity to confirm the provided solution. After confirmation is received, the Request is assigned the "Closed" status.

The Request is closed upon receipt of confirmation from the Initiator, or by timeout (after 5 days). Assigning the Request the "Closed" status means the official completion of work. If the Initiator believes that work should be resumed, they must register a new Request.

## 11. Interaction During Maintenance and Emergency Recovery Works

Maintenance works are performed to ensure the quality of the Products and Services in accordance with the level agreed in the SLA. The Company notifies all Customers who may be affected by the specified works about the Maintenance works through the established communication channels.

Emergency Recovery Works are performed in the following cases:

-   An Incident has been registered that may affect the quality of Service provision to other Customers who have not yet reported detecting the impact of the failure;
-   Information about an event that may lead to a decrease in quality or termination of Services for one or more Customers has been received from infrastructure monitoring systems.

Table 4. Notification procedure for Maintenance and Emergency Recovery Works

| **Work execution mode** | **Notification procedure** |
| --- | --- |
| Maintenance works | At least 24 business hours in advance |
| Emergency Recovery Works | At the start of work |

Unavailability of Services due to Incidents registered after notification of the start of Emergency Recovery Works is not counted in the Service availability calculation for the period if the downtime does not exceed a total of 4 hours per 30 calendar days.

## 12. Areas of Responsibility and Limitations

At the Company's request, the Customer takes measures to provide access to hardware infrastructure objects in order to reproduce a failure or collect diagnostic information.

**The Company is responsible for:**

-   registering Requests received in accordance with clause 2.1 of these Regulations, and providing the Initiator with the registration details of the Request;
-   classifying Requests, determining their priority and target resolution time;
-   analyzing the Incident, investigating and diagnosing the failure, selecting the optimal path to restore the Product's operability and the provision of Services;
-   providing a solution for the Incident;
-   performing work under the SLA;
-   providing the Customer with information within the scope of the Documentation and other consultations on the use of the Products and Services;
-   providing distribution packages of new Software versions for updating the Product, if applicable.

**The Customer is responsible for:**

-   ensuring the accuracy of data when registering Requests on the Portal;
-   providing the necessary information for correct registration of a Request via email;
-   the availability of services built on the basis of the Product;
-   resolving Incidents caused by a failure on infrastructure objects owned by the Customer, on which Product components are deployed and the Company's Services are implemented;
-   collecting and providing additional data for Incident diagnostics, and providing additional information at the Company's request;
-   updating the Product's Software by deploying the provided distribution packages in the appropriate environment, if applicable.

The Company is not responsible for the operability of the Customer's infrastructure or for specific adaptation of the Product for interaction with the Customer's information systems and data sources.

The Company is not responsible for configuring and maintaining software distributed under an open license (Open Source).

Any interference with the Product's software without agreement with the Company is considered a violation of the Technical Support terms; an exception is actions of the Customer explicitly permitted in the Documentation.

The Company has the right to suspend Technical Support services if, when reviewing a Request, it is established that the Product's malfunction was caused by actions (or inaction) of the Customer or third parties. Such actions (or inaction) include, among other things, any changes to the settings or software environment of the Product made without the prior written consent of the Company that directly or indirectly affected its operation.

The Company has the right to adjust the target processing time of a Request in agreement with the Customer if, based on the analysis, the exact steps to reproduce the Incident could not be determined.

Within the scope of Technical Support, the rule of "one Request — one question" applies. The Company has the right to suggest that the Customer register an additional Request, or to independently register a Request in the Customer's interest, if the initial Request contains several unrelated questions.

The Company has the right to close a Request without further processing in the following cases:

-   If the requester was not identified as the Customer or an authorized representative of the Customer. In this case, the Company reserves the right to contact the Customer or an authorized representative of the Customer to verify the legitimacy of the Request's creation.
-   If no response was received from the Initiator upon a request for additional information.
-   If the unavailability of the Product's functionality arose due to force majeure circumstances.

Revision dated 31.08.2026.