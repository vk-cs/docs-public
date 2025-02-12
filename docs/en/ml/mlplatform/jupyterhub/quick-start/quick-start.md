This article will help you get started with the JupyterHub service and get acquainted with its capabilities.

After going through all the quick start steps, you will learn how to create and connect to a JupyterHub instance.

## 1. Create JupyterHub instance

1. [Go to](https://cloud.vk.com/app/en) your VK Cloud management console.
1. Go to **ML Platform**.
1. Click the **Create instance** button in the **JupyterHub** tile.
1. On the **Configuration** step, set the administrator password for the instance. Save the username and password you entered.

    <err>

    To recover the administrator password is impossible.

    </err>

1. Leave other parameters as default. Click the **Next Step** button.
1. On the **Select Network** step, leave the default network and click the **Create instance** button.
1. Wait for the instance to be created. This usually takes 10–15 minutes. Once the instance is created, it will appear in the list of ML Platform instances.

## 2. Connect to instance

1. Click the link in the **DNS-name** column for the created instance.
1. Sign in to the instance using your credentials.

The JupyterHub instance web interface will open.

## Delete unused resources

JupyterHub instances are priced. If you no longer need the created instance, [delete](../service-management/manage#delete) it.
