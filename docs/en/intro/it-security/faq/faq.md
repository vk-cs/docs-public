# {heading(Frequently asked questions)[id=it-security-faq]}

{include(/en/_includes/_translated_by_ai_en.md)}

## {heading(Compliance)[id=it-security-faq-requirements-compliance]}

{cut(What regional and international security standards does {var(cloud)} comply with?)}

Detailed information is available in the [Certificates, licenses and attestations](../certificates) section and on the [Certificates and licenses](https://cloud.vk.ru/cloud-platform/certificates/) page.

Additional documents are provided after signing a non-disclosure agreement (NDA).

{/cut}

{cut(Does {var(cloud)} comply with PCI DSS requirements?)}

Yes, it does. Detailed information is available in the [Certificates, licenses and attestations](../certificates) section and on the [Certificates and licenses](https://cloud.vk.ru/cloud-platform/certificates/) page.

{/cut}

{cut(Is there a process for independent assessment (audit) of {var(cloud)} security measures by internationally recognized companies?)}

Yes, there is. For more details, see the [Platform security](../platform-security#conducting_security_checks) section.

{/cut}

{cut(Does {var(cloud)} engage subcontractors to provide services?)}

{var(cloud)} may engage subcontractors to provide services. Clients who may be affected are informed about this.

{var(cloud)} ensures that contracts with subcontractors include the necessary information security measures that comply with {var(cloud)}'s information security obligations to its clients.

{/cut}

## {heading(Responsibility division)[id=it-security-faq-responsibility-division]}

{cut(How is responsibility divided between {var(cloud)} and the client?)}

{var(cloud)} is responsible for the security of the cloud infrastructure, while the client is responsible for the security of their systems and data deployed inside the cloud.

When using the special service [Cloud 152-FZ](https://cloud.vk.ru/solutions/152-fz/), responsibility for personal data storage is also divided.

For more details, see the [Cloud security](https://cloud.vk.ru/cloud-security/) page.

{/cut}

{cut(Is encryption of the client's application endpoints provided?)}

This is the client's own responsibility.

For more details on the division of responsibility, see the question above.

{/cut}

{cut(Is it possible to use proprietary cryptographic information protection means (CIPM) for personal data information systems (PDIS) under 152-FZ?)}

Yes, it is possible.

{/cut}

{cut(Can information stored and processed in {var(cloud)} be labeled?)}

Yes, the client chooses the possible methods for labeling their information themselves.

{/cut}

## {heading(Accounts)[id=it-security-faq-accounts]}

{cut(Who creates accounts?)}

Accounts can be created:

- by the user themselves after {linkto(../../../intro/onboarding/account#onboarding-account)[text=registration]};
- via export from LDAP systems.

After registration, the client manages access rights themselves, including inviting users, configuring the access level, two-factor authentication, etc.

{/cut}

{cut(What secure authentication methods are used for management console (management console) users?)}

Authentication is performed using a login and password, which are not transmitted in plain text. Additionally, you can {linkto(../../../tools-for-using-services/api/rest-api/enable-api#rest-api-enable-activate)[text=enable two-factor authentication (2FA)]} using TOTP.

{/cut}

{cut(What is recommended for protecting a management console account?)}

Use long and complex passwords consisting of multiple character categories, and also {linkto(../../../tools-for-using-services/api/rest-api/enable-api#rest-api-enable-activate)[text=enable two-factor authentication (2FA)]} for the account.

{/cut}

{cut(Is Single Sign-On (SSO) technology supported for {var(cloud)} users?)}

Yes, it is supported. The client's SSO system can be connected for logging in to the {var(cloud)} [management console](https://msk.cloud.vk.ru/app/) using SAML or ADFS protocols.

{/cut}

{cut(Can a password policy that meets the client's requirements be applied?)}

Yes, it can. To do this, you need to connect the client's LDAP server to the platform using SAML or ADFS protocols and control the password policy on that server.

{/cut}

{cut(Is a Role Based Access Control (RBAC) model used?)}

Yes, it is. For more details, see the {linkto(../../../../ru/access/iam/concepts/rolesandpermissions#iam-concepts-rolesandpermissions)[text=Role-based access control model]} section.

{/cut}

{cut(Is it possible to configure temporary access to resources (Just in Time Access, JIT) without creating a user?)}

Yes, it can be implemented on the client side using SAML.

{/cut}

{cut(What should be done in case of account compromise?)}

Immediately try to {linkto(../../../tools-for-using-services/vk-cloud-account/instructions/account-manage/editinfo#account-manage-editinfo-password)[text=change the password]}. If that fails, contact [technical support](/en/contacts) and select the service type in your ticket: **VK Cloud** → **Report a problem** → **Management console and account** → **Account has been hacked**.

{/cut}

## {heading(Network security)[id=it-security-faq-network-security]}

{cut(How do I configure network security groups?)}

Detailed information is available in the {linkto(../../../networks/vnet/instructions/secgroups#vnet-secgroups)[text=Security groups]} section.

{/cut}

{cut(Are Anti-DDoS protection and Web Application Firewall (WAF) used?)}

You can connect these services by submitting a request in the [management console](https://msk.cloud.vk.ru/app/) in the **Special services** section or on the [website](https://cloud.vk.ru/waf/). For more details about these special services, see the [WAF and AntiDDoS](/en/security/firewall-and-protection-ddos) section.

{/cut}

{cut(What DDoS protection and web firewall solutions are provided by {var(cloud)}?)}

- When using the **AntiDDoS** special service, the client can choose between the StormWall, ServicePipe and Variti solutions.
- When using the **WAF** special service, the client can choose between the Positive Technologies Cloud WAF, SolidWAF and WebMonitorex solutions.

{/cut}

{cut(How are clients separated?)}

Isolation between clients is provided at the following levels:

- network,
- hypervisor,
- application.

The {var(cloud)} client's {linkto(../../../tools-for-using-services/account/concepts/projects#tools-account-concepts-projects)[text=projects]} are isolated from other clients. Information flows are managed at the level of client VMs. {var(cloud)} infrastructure resources run on dedicated physical servers that are not used for operating in a virtualization environment. Access from client networks to service networks is impossible. When creating a VM, the user configures firewall rules themselves or selects a suggested security group.

{/cut}

{cut(Is it possible to gain access to someone else's data?)}

No. VK client projects are created for each client and isolated from other clients. Reuse of one client's projects by other clients is not allowed.

{/cut}

## {heading(Other)[id=it-security-faq-other]}

{cut(How is information security event monitoring performed?)}

Information security events of VK and {var(cloud)} infrastructures are monitored by the VK SOC duty shift on a 24/7 basis. SIEM is used to collect and store information security events. Access to information security event logs is restricted by SIEM tools.

{var(cloud)} users have access to the following event monitoring services:

- {linkto(../../../tools-for-using-services/account/instructions/actionslogs#tools-account-actionslogs)[text=Cloud Audit]},
- [Cloud Logging](/en/monitoring-services/logging),
- [Cloud Monitoring](/en/monitoring-services/monitoring).

{/cut}

{cut(How is time synchronized?)}

Using NTP servers of the VK infrastructure, which, in turn, are synchronized with the [NTP Pool](https://www.ntppool.org/zone/ru).

{/cut}

{cut(Is it possible to configure forwarding of the {var(cloud)} action log to external SIEM systems?)}

Yes, it is. For more details, see the {linkto(../../../tools-for-using-services/api/api-spec/logging#api-spec-logging)[text=API reference]}.

{/cut}

{cut(How long is the {var(cloud)} action log retained?)}

Approximately one year. It is recommended to configure the delivery of information from the log to the client's SIEM systems.

{/cut}

{cut(How are logs and other records obtained when using {var(cloud)} services protected?)}

Records are protected through access restriction and control over this information.

{/cut}

{cut(What should be done in case of information security incidents?)}

Report suspected information security incidents via [technical support](/en/contacts). After the request is received, the area of responsibility is determined:

- If the information security incident falls within the client's area of responsibility, the client resolves the incident themselves.
- If the information security incident falls within the {var(cloud)} area of responsibility, {var(cloud)} handles the incident.

{var(cloud)} informs clients about outages and incidents that may affect them in the [Service status](https://status.msk.cloud.vk.ru) section and in the [Telegram channel](https://t.me/vk_cloud_alerts).

{/cut}

{cut(Can {var(cloud)} services be scanned for vulnerabilities by the client's specialists or with the involvement of external organizations?)}

Yes, it is possible upon agreement.

{/cut}

{cut(Does {var(cloud)} provide a backup service?)}

Yes, for more details see the [Cloud Backup](/en/storage/backups) section.

Responsibility for organizing backup and recovery processes lies with the users themselves.

{/cut}

{cut(Is separate storage of {var(cloud)} service backups organized?)}

Yes, it is. A geographically distributed S3 storage is used for storing backups (SLA of 99.9999% for data preservation).

{/cut}

{cut(Is guaranteed data destruction provided?)}

Yes, it is.

{/cut}

{cut(How is protection against {var(cloud)} administrators accessing client data ensured?)}

{var(cloud)} is monitored by the Security Operations Center (SOC) and SIEM systems (Security Information and Event Management).

Administrators perform mandatory authentication and use specially configured intermediate hosts (jump hosts).

For more details, see the [Platform security](../platform-security) section.

{/cut}

{cut(How is data protected when transmitted over public data networks?)}

Secure TLS and HTTPS protocols are used. If necessary, clients can configure additional data encryption.

{/cut}

{cut(Can utilities capable of bypassing normal operating procedures or security procedures be used?)}

When using {var(cloud)}, it is prohibited to use service programs (utilities) capable of bypassing normal operating procedures or security procedures without agreement with {var(cloud)}. By using {var(cloud)} services, you accept the terms of the [agreements](/en/start/legal) that govern the rules for working with the platform.

In turn, {var(cloud)} guarantees that the use of such programs by {var(cloud)} personnel is strictly limited and controlled.

{/cut}

{cut(How can I learn about changes in {var(cloud)} that may affect users?)}

{var(cloud)} timely informs users about the status of services, outages and changes that may affect them in the [Service status](https://status.msk.cloud.vk.ru) section and in the [Telegram channel](https://t.me/vk_cloud_alerts).

{/cut}

{cut(How often are temporary files and documents deleted?)}

Temporary files and documents are deleted within 1 month.

{/cut}