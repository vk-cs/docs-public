To ensure a high level of security for the VK Cloud platform, the security measures and practices described below are used.

Additional information is available on the [Cloud Security](https://cloud.vk.com/cloud-security/) page.

## Monitoring and countering attacks

Security Operations Center (SOC VK) provides monitoring of VK Cloud, analyzes security events of VK Cloud servers and identifies anomalies using a SIEM (Security Information and Event Management) class system.

The following mechanisms also work:

<tabs>
<tablist>
<tab>Antifraud</tab>
<tab>Tracking for suspicious activity</tab>
</tablist>
<tabpanel>

VK Cloud antifraud is a set of security measures and rules aimed at filtering automatic registrations of bots and users, as well as preventing potential attacks on the resources of the VK Cloud platform.

When activating VK Cloud services, you may need to confirm user data. In this case, use one of the proposed methods of identity verification:

- **Linking a bank card**. Link your card and, if necessary, pay for VK Cloud services.
- **Company card (for legal entities)**. In your message, please attach a file with the details of the organization on whose behalf you are registering. The postal address must indicate the name or other details of the organization.
- **Contact technical support**. Create an account activation request on the [technical support portal](mailto:support@mcs.mail.ru). Application category — account, group — activation and access.

</tabpanel>
<tabpanel>

Internet users and automated services have the right to complain both manually and automatically about suspicious activity originating from IP addresses belonging to VK Cloud. For example, suspicious activity may include accessing the same web page at short intervals, multiple password guessing attempts, etc.

To provide users with uninterrupted services, VK Cloud technical support promptly responds to such complaints.

<warn>

The VK Cloud user will be sent a warning about the presence of a complaint about suspicious activity from an IP address included in his project. If there is no response within one day, the IP address can be disconnected from the virtual machine and removed from the project to eliminate suspicious activity.

</warn>

Suspicious activity may be associated with an attacker gaining unauthorized access to a user's virtual machine. To reduce the risk of such a situation occurring, **follow safety rules**:

- do not set simple passwords for accounts
- do not provide uncontrolled access to project resources
- be careful about the software you download and install on the virtual machine
- scan virtual machines for malicious software or code

</tabpanel>
</tabs>

## Conducting security checks

External inspections are carried out at least once a year with the participation of an external contractor. The check is carried out, among other things, using the model of an internal violator.

VK Cloud also conducts its own information security audits and participates in Bug Bounty programs to find vulnerabilities:

- [Standoff 365](https://bugbounty.standoff365.com/programs/vk_cs_vk).
- [Bug Bounty Ru](https://bugbounty.ru/).
- [BI.ZONE Bug Bounty](https://bugbounty.bi.zone/).

This allows you to quickly identify and eliminate vulnerabilities in VK Cloud.

## Applying secure development principles when building the platform

- Information security training for platform developers.
- Integration and automation of security tools and practices at all stages of the development and operation life cycle (DevSecOps).
- Architectural review and security audit of each service.

## Applying industry best practices

- Isolation of VK Cloud segments and services from each other using a firewall.
- Differentiation of access to VK Cloud resources using a role model at the Identity and Access Management (IAM) level.
- Access to the platform is available only to a limited number of VK Cloud administrators with mandatory authentication. Trusted and secure hosts (jump hosts) are used for access.
- Separation of responsibility for security between VK Cloud and the user (more details on the [Cloud Security](https://cloud.vk.com/cloud-security/) page).
