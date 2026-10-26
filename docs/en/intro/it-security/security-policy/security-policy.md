# {heading(Information Security Policy)[id=it-security-security-policy]}

{include(/en/_includes/_translated_by_ai_en.md)}

## {heading(Purpose of the policy)[id=it-security-security-policy-purpose]}

This policy specifies the requirements of the information security policies of the companies within the VK group (hereinafter — VK) as applied to managing and ensuring information security (hereinafter — InfoSec) when providing {var(cloud)} cloud services.

## {heading(Policy scope)[id=it-security-security-policy-scope]}

Applicability: {var(cloud)}

Applicable from: 01.09.2023

## {heading(Managing and ensuring InfoSec when providing {var(cloud)} services)[id=it-security-security-policy-information-security]}

### {heading(Separation of InfoSec responsibilities)[id=it-security-security-policy-responsibility-division]}

- Responsibilities and accountability in the area of information security when using cloud services are shared between {var(cloud)} and consumers of cloud services (hereinafter — the client). The description of the boundaries of responsibility separation is kept up to date within the public documentation available to potential and existing {var(cloud)} clients.

### {heading(Communication with clients)[id=it-security-security-policy-communication]}

- {var(cloud)} provides timely notification to clients about the service status, outages, and changes that may affect them. Such notifications are provided through the [Service Status](https://status.msk.cloud.vk.ru) section on the {var(cloud)} website, and, for faster notification, in a [dedicated Telegram channel](https://t.me/vk_cloud_alerts).

### {heading(InfoSec violation reports)[id=it-security-security-policy-reports]}

- Effective interaction between {var(cloud)} and clients in case of InfoSec violations is an important factor in minimizing the possible consequences of InfoSec incidents. VK has implemented and continuously improves an InfoSec incident management process.
- {var(cloud)} provides its clients with mechanisms for reporting InfoSec events and incidents. {var(cloud)} undertakes to notify users about incidents that have affected them. When incident investigation is necessary, {var(cloud)} guarantees interaction with clients and provision of the necessary information.

### {heading(InfoSec during development and deployment of cloud services)[id=it-security-security-policy-development]}

- The development and deployment of {var(cloud)} cloud services are performed in accordance with InfoSec requirements.
- InfoSec requirements for {var(cloud)} cloud services are formed based on a security analysis of the architecture of the services being developed and deployed, as well as best practices in the field of information security.
- Upon completion of development, comprehensive testing of the developed services or changes to them is carried out, including verification of InfoSec requirements implementation and code security.
- Product teams and development teams undergo training and awareness programs on secure development.

### {heading(Risks from authorized insiders, access management)[id=it-security-security-policy-access-control]}

- {var(cloud)} takes into account the risk of unauthorized access to client data by authorized insiders and takes measures to minimize it. {var(cloud)} strictly controls access to storage systems and databases.
- An access management policy for {var(cloud)} employees and contractors has been implemented, InfoSec events are logged and monitored, and authentication methods are regulated. Only authorized employees of VK or VK contractors are granted access to {var(cloud)} resources, based on the principle of least privilege.
- User accounts and their rights are reviewed to minimize InfoSec risks associated with the accumulation of excessive privileges, unauthorized access, and misuse of {var(cloud)} information resources.
- Access to client data is strictly restricted and granted only to employees who need it to perform their job duties. All employees sign a confidentiality agreement, and regular training and information security awareness programs are conducted.

### {heading(Lifecycle and client access management)[id=it-security-security-policy-lifecycle]}

- The beginning of the client lifecycle is the creation of an account on the {var(cloud)} platform. Subsequently, the management of client user access rights is performed by the client itself, including creating users, configuring access levels, two-factor authentication, etc.
- {var(cloud)} provides support to its clients at all stages of their lifecycle within the technical support service.
- Client data deletion is performed either upon account deletion on the {var(cloud)} platform or upon client deactivation in case of non-payment for the provided services.

### {heading(Virtualization security)[id=it-security-security-policy-virtualization]}

- {var(cloud)} pays attention to ensuring virtualization security. To this end, {var(cloud)} provides control and management of access to the virtual infrastructure, protection against unauthorized access to the virtual infrastructure, protection against network attacks, and vulnerability management.

### {heading(Isolation of cloud service clients)[id=it-security-security-policy-isolation]}

- {var(cloud)} infrastructure resources run on dedicated physical servers that are not used for the virtualization environment. Access from client networks to service networks is impossible.
- The client's {var(cloud)} virtual environment is isolated from other clients. Information flow management is performed at the level of client virtual machines.
- Isolation between clients is ensured: at the network level, at the hypervisor level, and at the application level. When creating a virtual machine, the client independently configures firewall rules or selects a proposed network profile.