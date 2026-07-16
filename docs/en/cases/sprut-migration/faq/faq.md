
{include(/en/_includes/_translated_by_ai_en.md)}

{cut(I received an email from VK Cloud about migration to a new SDN. What does this mean?)}

In February 2024, the VK Cloud platform released SDN Sprut, which ensures stable and efficient operation of virtual networks. In August 2024, this solution became available to all users.

Support for SDN Neutron will cease at the end of 2025. After that, SDN Neutron users may face security issues and a lack of updates.

The email contains instructions for safely migrating projects to SDN Sprut.

{/cut}

{cut(I am an executor, what should I tell management about this migration?)}

You can use the [presentations](https://github.com/vk-cs/neutron-2-sprut/tree/main/presentations):

- **Migration to SDN Sprut. Short** — a short version of the presentation, explains the need for migration without technical details. Contains basic information about SDN Sprut and its advantages, as well as development plans.
- **Migration to SDN Sprut. Full** — a full version of the presentation. Contains technical details of implementation, architecture features, etc. Created for engineers and team leads who need not only an understanding of what SDN Sprut is, but also technical implementation details, comparisons, and functional advantages.

{/cut}

{cut(What is SDN?)}

Software Defined Network is an approach to network management in which the control layer is separated from the data forwarding layer.

More details: [What is SDN](/en/networks/vnet/concepts/sdn#vnet-sdn-sprut).

{/cut}

{cut(What is the difference between SDN Sprut and Neutron?)}

SDN Sprut has a number of advantages compared to SDN Neutron:

- scales more easily and is suitable for networks of any size;
- allows free integration with VK Cloud services and third-party services;
- has higher performance;
- has services unavailable in SDN Neutron;
- is independent of OpenStack.

More details: [Why migration is needed](/en/cases/sprut-migration/about).

{/cut}

{cut(Why do I need to migrate to SDN Sprut?)}

Development of new features for SDN Neutron has been paused since the release of SDN Sprut in early 2024. In 2025, VK Cloud will discontinue support for SDN Neutron. This means that the technical support team will stop working with network infrastructure issues on SDN Neutron.

SDN Sprut has a number of advantages compared to SDN Neutron and ensures more stable operation on large projects. The development team is constantly expanding the capabilities of SDN Sprut.

More details: [Why migration is needed](/en/cases/sprut-migration/about).

{/cut}

{cut(What happens if I don't want to migrate to SDN Sprut?)}

Development of new features for SDN Neutron has been paused since the release of SDN Sprut in early 2024. Support for SDN Neutron will cease at the end of 2025. This means that the technical support team will stop working with network infrastructure issues on SDN Neutron.

After that, SDN Neutron users may face security issues and a lack of updates.

{/cut}

{cut(What is the migration sequence?)}

A schematic sequence of actions for migrating a project to Sprut is described in the [Migration sequence](../about#migration_sequence) section.

{/cut}

{cut(Where to start the migration? What should be done before starting the migration work?)}

1. Analyze the current project infrastructure.
1. Review the [schematic migration sequence](../about#migration_sequence) and the [list of services that can be migrated](../about#services_to_migrate).
1. Read the [instructions](/en/cases/sprut-migration).
1. Create a migration plan.
1. Agree on a technical window for performing the work.

{/cut}

{cut(What support will I have during the migration?)}

Use the [instructions](/en/cases/sprut-migration) for migrating to SDN Sprut, they contain a detailed description of the required actions, as well as scripts for automating some procedures.

If you encounter difficulties or questions during the migration process, contact [technical support](mailto:support@mcs.mail.ru).

{/cut}

{cut(Is there any training for the migration?)}

The migration process is described in detail in the [Migration to SDN Sprut](/en/cases/sprut-migration) section.

{/cut}

{cut(What service downtime should be expected during migration?)}

It is recommended to conduct your own tests and performance measurements before migrating the core infrastructure. The downtime of a single VM during switchover is no more than 40 seconds. The total downtime depends on the size of your infrastructure.

{/cut}

{cut(What skills will the staff performing the migration need?)}

No specific skills are required for the migration work.

General requirements:

- understanding of cloud operations and familiarity with the management console;
- experience with Linux;
- experience with Bash.

{/cut}

{cut(Can I try the migration on a few test VMs?)}

Yes, you can create a test infrastructure and verify the migration of individual VMs rather than the entire project.

{/cut}

{cut(Can there be connectivity between projects on different SDNs? Is it possible to migrate a project in parts?)}

Yes. It is possible to organize network connectivity within a single project by combining two SDNs through an [advanced router](/en/networks/vnet/how-to-guides/advanced-router).
{/cut}

{cut(Is the migration reversible if something goes wrong?)}

Yes, using scripts you can perform a reverse migration of virtual machines. After that, analyze the errors and repeat the migration.
{/cut}

{cut(What are IaaS and PaaS?)}

IaaS — services that manage dynamic resource allocation, scaling, and fault tolerance. Examples of IaaS: networks, subnets, routers, VMs, disks, security groups, IP addresses, etc.

PaaS — more complex services for performing various tasks: orchestration, data storage, data analysis, etc. Examples of PaaS: databases, file storages, DNS. PaaS services run on top of IaaS services.

More details: [Platform architecture](/en/intro/start/concepts/architecture).
{/cut}

{cut(How to migrate projects with PaaS?)}

Use the instructions from the [Platform services migration](../paas) section.
{/cut}

{cut(How to preserve Floating IP addresses during migration?)}

Floating IP addresses cannot be preserved.

{/cut}

{cut(How to find out the architecture or topology of my project?)}

VK Cloud does not have information about the architecture or network topology of your project. You can independently audit your own resources through the management console and create a diagram. This step will significantly improve your understanding of the objects you use in the cloud and will help in creating a migration plan.
{/cut}

{cut(How to migrate a project with a complex network topology?)}

The migration mechanism allows you to work with each object sequentially. This reduces the likelihood of errors during migration.

To ensure migration reliability, analyze the project and create an architectural diagram of network connectivity. Identify complex and bottleneck areas where problems may occur. Submit a request to [technical support](mailto:support@mcs.mail.ru), attaching the results of the network architecture analysis.
{/cut}

{cut(What scripts are used for migration?)}

A list of all migration scripts is provided in the [Migration tools](../about#migration_instruments) section.

If you have additional questions, create an [issue](https://github.com/vk-cs/neutron-2-sprut/issues) on GitHub and describe your question, problem, or feature request.

{/cut}

{cut(How safe are the migration scripts?)}

The scripts are written in Bash and use OpenStack CLI or direct API calls. You can review the code yourself.

Testing of the scripts has not revealed any errors or risks.
{/cut}

{cut(What permissions should the user have to run the scripts?)}

It is recommended to run the scripts as a user with the Project Administrator role.
{/cut}

{cut(Is approval from the information security department required to use the scripts?)}

Approval is required if your company's internal policies demand it.

The scripts do not contain any hidden mechanisms that could affect the information security of your project or impact adjacent projects. You can also review the code of each script.
{/cut}

<!--
{cut(Do you already have experience with successful migrations?)}

{/cut}

{cut(How complex were the projects you have already migrated?)}

{/cut}

{cut(How long did the migration take?)}

{/cut}

{cut(What factors complicated the migration work?)}

{/cut}

{cut(What factors allowed you to successfully complete the migration?)}

{/cut}

{cut(Were there any cases of unsuccessful migration where nothing could be restored/rolled back?)}

{/cut}

{cut(Give me arguments for my boss who is overly cautious and doesn't want to migrate anything)}

{/cut}

{cut(Until when can I think about the migration, I have plenty of other things to do right now)}

{/cut}

## Use case examples (either model or real)

{cut(I have these objects in my project, in what order and sequence should I run the scripts, how should I use the output, and what should I answer to questions?)}

{/cut}

{cut(Several migration examples)}

{/cut}-->