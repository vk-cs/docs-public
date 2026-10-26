# {heading(Hystax disaster recovery installation and configuration)[id=marketplace-dr-quick-start]}

{include(/en/_includes/_translated_by_ai_en.md)}

You can configure recovery of data and IT infrastructure in case of unexpected incidents using the [Hystax Acura — Disaster Recovery](https://msk.cloud.vk.ru/app/services/marketplace/v2/apps/service/440568b5-e418-431f-9d43-e54eb20ee05a/latest/info) service without pausing application operation. Using the service allows you to optimize the following metrics:

- Recovery Point Objective (RPO) — the time between the creation of the last backup and the moment the disaster occurs. It can be configured individually for each resource.
- Recovery Time Objective (RTO) — the time between the reaction to a disaster and the infrastructure recovery. The service allows you to minimize this metric.

{cut(How the service works)}

1. Agents are installed on the target VMs to synchronize with Hystax Acura — Disaster Recovery.
1. Data replication is performed for the synchronized VMs. If necessary, a VM backup schedule is configured.
1. A disaster recovery plan is created: a description of the infrastructure and a set of instructions for recreating the business application in the {var(cloud)} cloud. Several plans can be created. To reduce the RPO value, the disaster recovery plans must be kept up to date.
1. A backup infrastructure is created based on the plan.
1. In the event of disasters, the backup infrastructure takes over the entire load.

{/cut}

After completing all the steps of the instructions, you will:

1. Create an account in Hystax Acura — Disaster Recovery via {var(cloud)}.
1. Install the agent on the VM and perform data replication for it.
1. Create a backup infrastructure using a recovery plan.
1. Recover the backed-up infrastructure in {var(cloud)}.

{include(../../../../_includes/_disaster-recovery.md)}