
{include(/en/_includes/_translated_by_ai_en.md)}

Solution providers are companies and developers offering ready-made software products and services for deployment in {var(cloud)}.

The *Vendor Cabinet* of {var(cloud)} is a separate tool for service providers from the [application store](/en/applications-and-services/marketplace/concepts/about) that allows you to:

* add new services;
* update existing services;
* move services to the archive;
* view statistics on key metrics;
* download service usage reports.

For a vendor, access to the listed capabilities is defined by the [role model](#xaas_vendor_roles).

Services added through the vendor cabinet are displayed in the **Application Store** section in the management console of the cloud platform.

## {heading(User Roles)[id=xaas_vendor_roles]}

Depending on the role assigned to them, vendors get access to different sections of the cabinet:

[cols="2,1,1,1,1", options="header"]
|===

| Section
| Developer
| Billing Administrator
| Administrator
| Super Administrator

| Dashboard
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")

| Service Management
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")

| User Management
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/check.svg "inline")

| Reports
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/check.svg "inline")

|===

The role of other vendor users can be changed only if you have an administrative role:
- Vendor users with the `Super Administrator` role can assign any of the roles to others.
- Vendor users with the `Administrator` role can assign only the `Developer` and `Administrator` roles to others.