Cloud Disaster Recovery (Cloud DR) is a cloud service for data recovery and IT infrastructure in case of unforeseen circumstances: IT system failures, data center accidents, power outages. Cloud Disaster Recovery will help to restore business processes quickly, even if the company's main data center fails completely. Using the service allows you to optimize the indicators:

- Recovery Point Objective (RPO) — the time between the creation of the last backup and the moment of the accident. It can be configured individually for each resource.
- Recovery Time Objective (RTO) — the time between the response to an accident and the restoration of infrastructure. The service allows you to minimize this indicator.

The Cloud DR service uses [Hystax Acura](https://хст.рф) as the main instrument.

## Service features

- Migration — creating and debugging a migration plan for the protected infrastructure. For more information about this step, see the section [Migration](/ru/additionals/migration/).
- Emergency recovery — prompt restoration of access to infrastructure after an accident.

## How the service works

1. Agents are installed on target VMs to synchronize with Hystax Acura.
1. Data replication is performed for synchronized VMs. If necessary, the VM backup schedule is configured.
1. A disaster recovery plan is created: a description of the infrastructure and a set of instructions for recreating a business application in the VK Cloud. It is possible to create several plans. To reduce the RPO value, disaster recovery plans must be kept up to date.
1. A backup infrastructure is created based on the plan.
1. In case of emergency situations, the backup infrastructure takes over the entire load.
