A quick start will help you get started with VK Cloud:

- register in the platform and log in to your personal account;
- configure the initial settings of the new project that is created automatically;
- connect to the project via OpenStack command line interface (CLI).

<info>

To join an existing VK Cloud project, follow the instructions in article [Join a project by invitation](/en/base/account/instructions/project-invitation).

</info>

## 1. Register an account

1. [Create](/en/additionals/start/get-started/account-registration#registration-in-the-personal-account) a VK Cloud account.

1. [Confirm](/en/additionals/start/get-started/account-registration#account-confirmation) your account.

During the registration, a new VK Cloud [project](/en/base/account/concepts/projects) is created for your account. In the personal account page that opens, you can create and connect the necessary objects: virtual machines, databases, etc.

After the account confirmation, services in the project are activated, and welcome [bonus points](/en/additionals/billing/concepts/bonus) are credited to the project [balance](/en/additionals/billing/start/balance).

## 2. Enable two-factor authentication for your account

[Configure](/en/base/account/instructions/account-manage/manage-2fa/) two-factor authentication (2FA) for your account.

2FA is required for working with the platform via API, OpenStack CLI, Terraform, and other tools.

## 3. (Optional) Invite other users

In the project that is created for your account, you have Project owner permissions. [Invite](/en/base/account/account/adduser) users to your project and assign them with [roles](/en/base/account/concepts/rolesandpermissions).

## 4. (Optional) Turn on mandatory 2FA in the project

To minimize the risk of unauthorized access, turn on mandatory 2FA for all users:

1. Click on the user login in the top bar of the personal account page. From the drop-down list, select **Manage access**.

2. On the page that opens, enable the **Mandatory two-factor authentication** option.

Mandatory 2FA can be turned on and off at any moment. After the option is turned on, all users need to set up 2FA for their accounts.

## 5. Connect to the project via OpenStack CLI

Before you begin:

- [enable](/en/base/account/instructions/account-manage/manage-2fa/) 2FA for account, if not enabled yet;
- [activate](/en/manage/tools-for-using-services/rest-api/enable-api) API access.

To connect via CLI:

1. [Install](/en/base/account/cli/setup) OpenStack сlient and [authenticate yourself](/en/base/account/cli/authorization) in the project.

1. To check the connection, open a console and run a command, for example:

    ```bash
    openstack configuration show
    ```

    Upon successful connection, the current configuration of the OpenStack client will be shown.

## What's next?

- Study the project [quotas and limits](/en/base/account/concepts/quotasandlimits).
- Learn about the [payment methods](/en/additionals/billing/operations/payment) available and the key [pricing](/en/base/account/tariffication) model principles.
- Find out how to create and connect a [virtual machine](/en/base/iaas/vm-start), a [Kubernetes cluster](/en/base/k8s/quickstart), a [database](/en/dbs/dbaas/start).
