Activation of API access is necessary to work with VK Cloud using the public API and additional tools such as OpenStack CLI, Terraform, kubectl and others.

## Activate API access

1. [Create](/en/access/iam/instructions/service-account-manage#create) a service account if you have not done so already.
1. Get access to the API if you have not done so already:

   1. [Download the OpenStack RC file](/en/access/iam/instructions/service-account-manage#download_rc_file).
   1. [Authorize in OpenStack CLI with a service account](/en/access/iam/instructions/service-account-manage#authorize).

1. Click the username in the header of the page and enable API access in one of the ways:

      {tabs}

      {tab(Project settings)}

      1. In the drop-down menu, select the **Project settings** option.
      1. On the **API access** tab, click **Activate API access**.

      {/tab}

      {tab(Account settings)}

      1. In the drop-down menu, select the **Account settings** option.
      1. Go to the **Security** tab.
      1. In the **Additional accesses** section, enable the **API access** option.

      {/tab}

      {/tabs}

## Deactivate API access

1. [Go to](https://msk.cloud.vk.com/app) your VK Cloud management console.
1. Click the username in the header of the page and select **Account settings**.
1. On the **Security** tab, disable the **API access** option.
