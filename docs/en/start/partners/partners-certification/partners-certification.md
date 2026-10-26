# {heading(Partner Software Certification)[id=partners-certification]}

{include(/en/_includes/_translated_by_ai_en.md)}

Certification is required to verify the technological compatibility of {linkto(../about-partners#start-about-partners)[text=partners']} software with the VK cloud ecosystem. Certification helps speed up the integration of a partner's product into the {var(cloud)} platform, avoiding risks during implementation and operation.

As a result, the partner receives a certificate confirming that the product meets all established compatibility criteria, which can be used in promotional materials.

VK Tech publishes product certificates on a [dedicated page](https://cloud.vk.ru/sertifikatsiya-tekhnologicheskoy-sovmestimosti).

## {heading(Software Certification Procedure)[id=partners-certification-order]}

During certification, VK Tech specialists, together with the software vendor's employees, manually test the software product. Certification stages:

1. The software product vendor submits a certification request to VK Tech.
1. The vendor prepares a test bench for testing.
1. The vendor sends a package of documents for the certification request.
1. VK Tech specialists process and analyze the documents, and a decision is made to start certification testing.
1. The vendor sets up the test bench infrastructure for testing.
1. The vendor, together with VK Tech specialists, conducts certification tests. A final protocol is drawn up.
1. VK Tech decides whether the certification tests are passed (or not passed) based on the protocol.
1. If the tests are passed successfully, the vendor receives a software compatibility certificate.

## {heading(1. Submit a Certification Request)[id=partners-certification-request]}

To start the software certification process, fill out [the form](https://cloud.vk.ru/partner/#partners-cert).

A VK Tech employee will contact you to clarify the entered data, agree on the certification timeline, and discuss organizational issues.

## {heading(2. Prepare a Test Bench)[id=partners-certification-stand]}

Certification testing requires a separate project on the {var(cloud)} platform.

{note:warn}

Using this project for other purposes is not allowed.

{/note}

{tabs}

{tab(I am not registered in {var(cloud)})}

1. {linkto(../../../intro/onboarding/account#onboarding-account)[text=Register]} on the {var(cloud)} platform.

   Upon registration, a project is automatically created for all new users. You can use this project for certification testing or {linkto(../../../tools-for-using-services/account/instructions/project-settings/create#tools-account-project-create)[text=create]} a new one.

1. Get the project {linkto(../../../tools-for-using-services/account/instructions/project-settings/manage#project-pid-view)[text=PID]}. You will need it when sending the package of documents for certification.

{/tab}

{tab(I already have a {var(cloud)} account)}

1. {linkto(../../../tools-for-using-services/account/instructions/project-settings/create#tools-account-project-create)[text=Create]} a new project.
1. Get the project {linkto(../../../tools-for-using-services/account/instructions/project-settings/manage#project-pid-view)[text=PID]}.
You will need it when sending the package of documents for certification.

{/tab}

{/tabs}

## {heading(3. Send a Package of Documents)[id=partners-certification-send-docs]}

Write to [tech-cert@vkteam.ru](mailto:tech-cert@vkteam.ru) or to your partner relations manager and attach a package of documents.

**Required documents:**

* Test program and methodology (TPM) sufficient in scope to confirm technological compatibility. If several products are to be certified, attach a TPM for each product separately.

  If you do not have a ready-made TPM, use our [methodological recommendations](../assets/pmi.pdf "download") for preparing this document.  

  {/cut}

* Description of the solution architecture on the {var(cloud)} platform ([example](../assets/architecture.pdf "download")).
* Product description.
* PID of the project created for testing.

**Additionally:**

* Specify the numbers of signed NDAs, if any.
* Describe how the product integrates and is used together with other products. This is necessary for auxiliary software (infosec, DLP, etc.).
* Specify the VK Tech products with which compatibility will be confirmed during certification.
* Specify the desired start dates for certification tests. VK Tech does not guarantee that tests will begin exactly within these timeframes, but will make every effort to meet them.

## {heading(4. Wait for the Document Processing Results)[id=partners-certification-wait-docs]}

At this stage, VK Tech specialists review the documents submitted with the certification request. The review includes analysis of the test bench architecture, the completeness of the scenarios described in the TPM, and the product deployment scheme.

Document processing takes at least 5 business days from the moment of receipt.

The document review result can be as follows:

[cols="1,2", options="header"]
|===
|Result
|Comments

|Document review passed
|If the set of documents is complete and the TPM is sufficient for testing, VK Tech specialists will inform you that the software is admitted to certification

|Document review failed
|If the request is filled out incorrectly or the provided TPM is incomplete, you will receive a notification that the documents need to be revised
|===

## {heading(5. Deploy the Infrastructure)[id=partners-certification-deploy]}

After the grant is credited to your test project balance, deploy the software according to the architecture diagrams approved in the TPM. Instructions for creating instances and deploying services are available on the documentation portal, for example:

* {linkto(../../../kubernetes/k8s/instructions#k8s-instructions)[text=everything about creating a cluster]};
* {linkto(../../../computing/iaas/instructions/vm#iaas-vm)[text=everything about virtual machines]};
* {linkto(../../../computing/cloud-desktops/instructions#desktops-instructions)[text=everything about virtual desktops]};
* {linkto(../../../networks/vnet/instructions#vnet-instructions)[text=everything about virtual networks]}.

When the infrastructure is ready, notify your partner relations manager and agree on the date and time of the testing.

## {heading(6. Conduct Certification Testing)[id=partners-certification-test]}

At this stage, you need to test the software according to the approved test methodology.

To oversee the testing on the VK Tech side, a responsible specialist is appointed. Their task is to make sure that the tests being conducted match those approved in the TPM and that the test results are recorded correctly. The specialist may attend the testing remotely via video conferencing.

The test results are recorded in a test protocol in electronic or paper form.

## {heading(7. Wait for the Certification Test Results Evaluation)[id=partners-certification-wait-estimate]}

VK Tech recognizes the conducted tests as successful based on the analysis of the test protocol drawn up during testing. Specialists compare the software metrics obtained during testing with the expected values.

{note:info}

Certification evaluates only the compatibility of the software product with the {var(cloud)} services ecosystem. The product's quality, functionality, and usability do not affect the evaluation.

{/note}

Possible results of the test protocol analysis:

[cols="1,1", options="header"]
|===
|Conclusion
|Comments

|The obtained characteristics match the expected values
|Certification tests are passed successfully, and the software product is awarded the corresponding certificate

|The obtained characteristics differ from the expected values
|The product is returned to the software vendor for rework
|===

## {heading(Get a Compatibility Certificate)[id=partners-certification-get]}

If the certification tests are passed successfully, the software product receives a compatibility certificate. The certificate is issued for a specific software version and the corresponding VK Tech service. The certificate has a limited validity period, but VK Tech may extend it.

The compatibility certificate contains the following information:

* a unique identification number;
* the name and legal address of the organization that issued the certificate;
* the name and legal address of the software vendor;
* the full name of the certified software;
* the name under which the software product will be included in the list of {var(cloud)} services;
* the validity period.

## {heading(Delete Unused Resources)[id=partners-certification-delete]}

Running infrastructure consumes computing resources and is billed. If you no longer need the project created for certification testing, {linkto(../../../tools-for-using-services/account/instructions/project-settings/manage#project-delete)[text=delete]} it.