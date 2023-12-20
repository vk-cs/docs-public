## The balance has become negative, how can the services be restored?

When working on prepayment with a negative balance, the project is automatically [frozen](/en/base/account/concepts/projects#automatic_freezing_of_the_project). Its objects are placed in the queue for deletion for a period:

- 3 days if you have never replenished the project account.
- 30 days if you have topped up the project account at least once.

   <err>

   As soon as the storage period in the queue expires, all project resources will be permanently deleted!

   </err>

To restore the services:

1. Go to VK Cloud [personal account](https://msk.cloud.vk.com/app/en/).
1. [Making a payment](../../instructions/payment#making_a_payment) the balance of the main account of the project [in a convenient way](../../concepts/payment-methods/).
1. Wait for the activation of services in the project. It can take up to 4 hours.
1. Manually activate project resources:

   - [virtual machines](/en/base/iaas/instructions/vm/vm-manage#starting_stopping_reboot_the_vm);
   - [Kubernetes containers](/en/base/k8s/operations/manage-cluster#start_cluster_ffb49399);
   - [vm backup](/en/manage/backups/vm-backup/vm-backup-manage#activating_stopping_and_deleting_a_backup_plan);
   - other resources.

<info>

To find out how long resources are in the queue for deletion, contact [technical support](/en/contacts), tell [project ID (PID)](/en/base/account/instructions/project-settings/manage#getting_the_project_id) and [region](/en/base/account/concepts/regions).

</info>

## I have topped up my balance to unblock the services. How long to wait?

Unlocking can take up to 4 hours. If you need to restore the work of the project faster, contact [technical support](/en/contacts) and ask to unblock the services manually, specify [project ID (PID)](/en/base/account/instructions/project-settings/manage#getting_the_project_id) and [region](/en/base/account/concepts/regions).

After unlocking, manually start the objects that were stopped — for example, virtual machines.

## Can I take the promised payment to avoid freezing?

The promised payment is not supported. You can avoid freezing the project if you have already made a payment, but it does not have time to arrive on the balance before the project goes into negative. Contact [technical support](/en/contacts) and ask them to disable the blocking of services for the duration of the payment. Provide information:

- [project ID (PID)](/en/base/account/instructions/project-settings/manage#getting_the_project_id);
- project [region](/en/base/account/concepts/regions);
- payment confirmation.

This situation is possible only when paying by bank transfer — when using other [payment methods](../../concepts/payment-methods), the payment is credited almost instantly.

## I don't have time to pay for services by transfer. How to avoid freezing?

There are two options for action:

- Pay for services with a bank card, payments from cards are faster.

  If you are a legal entity, you can subsequently transfer the payment from the card for correct reflection in the accounting documents.

- Pay for the services by bank transfer, contact [technical support](/en/contacts) and ask to disable the blocking of services for the duration of the payment. Provide information:

  - [project ID (PID)](/en/base/account/instructions/project-settings/manage#getting_the_project_id);
  - project [region](/en/base/account/concepts/regions);
  - payment confirmation.

## I have topped up the balance, but the payment failed. How to avoid freezing?

Contact [technical support](/en/contacts) to track down the payment.

1. Provide information:

   - [project ID (PID)](/en/base/account/instructions/project-settings/manage#getting_the_project_id);
   - project [region](/en/base/account/concepts/regions);
   - payment confirmation.

1. Ask to disable the blocking of services for the duration of the search.
