## {heading(Viewing information about a service instance)[id=marketplace-pr-instance-manage-view]}

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
1. Go to **Marketplace** → **My services**.
1. Open the service instance page by clicking on its name in the list.

{/tab}

{/tabs}

Possible service instance statuses:

- **Deploying** — a service instance in the process of deployment.
- **Active** — the service instance has been created or updated, ready for use.
- **Creation error** — failed to create a service instance due to an error.
- **Updating** — an instance of the service in the process of updating the tariff plan or options.
- **Update error** — failed to update the service instance due to an error.
- **Deleted** — the service instance has been deleted.
- **Suspending** — the service instance is in the process of deactivation due to insufficient amount to pay for the use of the service.
- **Suspension error** — the service instance could not be deactivated due to an error.
- **Inactive** — the service instance has been deactivated. The deactivated instance of the service is unavailable for use.
- **Resuming** — service instance in the process of [activation](#marketplace-pr-instance-manage-active).

## {heading(Activating a service instance)[id=marketplace-pr-instance-manage-active]}

Activation will be required:

- when [tariffication](../../tariffication) is prepaid;
- after replenishment of the project account, if the service instance was deactivated due to lack of funds.

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
1. Go to **Marketplace** → **My services**.
1. Open the service instance page by clicking on its name in the list.
1. Go to **Service properties** tab.
1. Click the **Activate** button.

{/tab}

{/tabs}

## {heading(Editing the tariff plan)[id=marketplace-pr-instance-manage-edit]}

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
1. Go to **Marketplace** → **My services**.
1. Open the service instance page by clicking on its name in the list.
1. Go to **Tariff plans** tab.
1. Click the **Set up a tariff** button.
1. Specify the new values of the tariff options and click **Connect the tariff** button.

{/tab}

{/tabs}

## {heading(Changing the tariff plan)[id=marketplace-pr-instance-manage-change]}

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
1. Go to **Marketplace** → **My services**.
1. Open the service instance page by clicking on its name in the list.
1. Go to **Tariff plans** tab.
1. Click the **Choose a tariff** button.
1. Specify the new tariff plan and click **Connect the tariff** button.

{/tab}

{/tabs}

The update of the service instance will begin, the process may take a long time. If the update has completed with the status **Update error**, [updating access](#marketplace-pr-instance-manage-active) to a service instance.

## {heading(Updating access to a service instance)[id=marketplace-pr-instance-manage-update-access]}

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
1. Go to **Marketplace** → **My services**.
1. Open the service instance page by clicking on its name in the list.
1. Go to the **Service properties** tab.
1. Click the **Update Access** button.
1. Confirm the update of the access parameters.

   An email to update access to the service instance will be sent to the user's email.

{/tab}

{/tabs}

## {heading(Recreating or re-updating a service instance)[id=marketplace-pr-instance-manage-update-service]}

The operation is available if the service instance is in the status **Creation error** or **Update error**.

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
1. Go to **Marketplace** → **My services**.
1. Open the service instance page by clicking on its name in the list.
1. Go to the **Service properties** tab.
1. Click the **Retry** button.

{/tab}

{/tabs}

## {heading(Deleting a service instance)[id=marketplace-pr-instance-manage-delete]}

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.com/app/en) your VK Cloud management console.
1. Go to **Marketplace** → **My services**.
1. Open the service instance page by clicking on its name in the list.
1. Go to the **Service properties** tab.
1. Click the **Delete** button.
1. Confirm the deletion.

   The service instance will be deleted, but will remain in the general list.

{/tab}

{/tabs}
