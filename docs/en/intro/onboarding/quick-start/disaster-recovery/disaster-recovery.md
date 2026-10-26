# {heading(Heistek Acure — Disaster Recovery from Marketplace: protect your services from failures and disasters)[id=onboarding-disaster-recovery]}

{include(/en/_includes/_translated_by_ai_en.md)}

The application store extends the capabilities of {var(cloud)} by offering third-party services for solving various tasks. One such service is [Heistek Acure — Disaster Recovery](https://msk.cloud.vk.ru/app/services/marketplace/v2/apps/service/440568b5-e418-431f-9d43-e54eb20ee05a/latest/info). With it, you can set up Disaster Recovery (DR) — a set of strategies and procedures aimed at restoring the operation of applications, data, and business processes after failures, data center disasters, or human errors.

To configure DR, you connect the service, log in to the Heistek Acure management console, and install agents on the servers that need to be replicated to the backup infrastructure. Data on the primary and backup sites is synchronized regularly.

In case of a primary infrastructure failure, the service is switched to disaster recovery mode automatically or manually. All the necessary services and applications are started on the backup site according to a pre-prepared disaster recovery plan.

Start working with Heistek Acure — Disaster Recovery in any convenient way:

- Use the [guide](#onboarding-disaster-recovery-guide) to connect the service via Marketplace and verify the DR configuration for data recovery.
- Watch the {linkto(#onboarding-disaster-recovery-video)[text=video]} about data protection with Disaster Recovery.

## {heading(Configure DR using a service from Marketplace)[id=onboarding-disaster-recovery-guide]}

After completing all the steps in this guide, you will:

1. [Replicate](#replication) the data of a virtual machine.
1. [Create](#plan_create) a disaster recovery plan.
1. [Start](#plan_start) the plan to prepare the backup infrastructure.
1. [Restore](#infrastructure_restore) the VM in {var(cloud)}.
1. [Verify](#vm_check) that the restored VM is working properly.

{include(../../../../_includes/_disaster-recovery.md)[tags=dr_onboarding_1; level=+1]}

### {heading(Preparatory steps)[id=onboarding-disaster-recovery-prepare]}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.

{include(../../../../_includes/_disaster-recovery.md)[tags=dr_onboarding_2; level=+1]}

## {heading(Video guide)[id=onboarding-disaster-recovery-video]}

This video explains the specifics of Heistek Acure — Disaster Recovery and how to configure server recovery in {var(cloud)}.

{caption()[id=position=above;align=right;id=video_create_backup]}
{video(https://vkvideo.ru/video_ext.php?oid=-164978780&id=456239704&hash=975afb49f1b7484a&hd=4)[type=vkvideo]}
{/caption}

## {heading(FAQ)[id=onboarding-disaster-recovery-faq]}

{cut(Why configure Disaster Recovery if there are backups?)}
When you use DR, services are ready to start on the backup site immediately after a failure. It is enough to power on the virtual machines.

Restoring from a backup takes more time and is not as effective for services that must run continuously.
{/cut}

{cut(Which platforms and hypervisors can data be migrated from?)}
Migration is supported from both virtual and physical platforms, including the main enterprise hypervisors. Examples: VMware vSphere, VMware ESXi, Microsoft Hyper‑V, KVM. When planning, contact [technical support](/en/contacts) to agree on the specific list.
{/cut}

{cut(Can {var(cloud)} be used as a backup site for data recovery?)}
{var(cloud)} can serve as both the primary and the backup site for your services. For maximum reliability, place the primary and backup sites in different data centers or regions.
{/cut}

{cut(How can I make sure that the data on the backup site is restored correctly?)}
After the initial setup, test data recovery on the backup site, and then regularly update the disaster recovery plan.
{/cut}

{cut(What is billed in the Heistek Acure — Disaster Recovery service?)}
Heistek Acure — Disaster Recovery licenses are provided free of charge. Only the infrastructure for running the replication agent is billed.
{/cut}