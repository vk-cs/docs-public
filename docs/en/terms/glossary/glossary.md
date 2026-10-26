# {heading(Terms and abbreviations)[id=glossary-private]}

{include(/en/_includes/_translated_by_ai_en.md)}

{ifdef(private-pdf,private-pg-pdf,private-cert)}This document uses the terms from {linkto(#tab_terms)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_terms]} — Terms and abbreviations)[align=right;position=above;id=tab_terms;number={const(numb_tab_terms)}]}{/ifdef}
[cols="1,3", options="header"]
|===
|Term
|Definition

{ifdef(private-cert)}
|ACL
|Access Control List, a list of permissions for actions on a secret or a container
{/ifdef}

|API
|Application Programming Interface — a set of classes, procedures, functions, structures, or constants that one computer program can use to interact with another program

|BIOS
|Basic Input/Output System

|Ceph
|A software object-based fault-tolerant data storage network

{ifndef(private-cert)}
|CIFS
|Common Internet File System, also referred to as SMB (Server Message Block) — an application-layer network protocol for remote access to files, printers, and other network resources, as well as for interprocess communication
{/ifndef}

|CLI
|Command Line Interface

|CPU
|Central Processing Unit

{ifndef(private-cert)}
|DBaaS
|Database as a Service — a cloud model in which users can operate a database environment by choosing from a preconfigured catalog of services
{/ifndef}

|DHCP
|Dynamic Host Configuration Protocol

|DNS
|Domain Name System

{ifndef(private-cert)}
|GPU
|Graphics Processing Unit
{/ifndef}

|HDD
|Hard Disk Drive

|HTTP
|HyperText Transfer Protocol

|HTTPS
|HyperText Transfer Protocol Secure

{ifndef(private-cert)}
|Helm
|A package manager for Kubernetes used to quickly install complex applications such as CRM, e-commerce, databases, and others
{/ifndef}

|IaC
|Infrastructure as Code — infrastructure automation using software development principles and practices

|IaaS
|Infrastructure as a Service — a cloud computing service model in which consumers are provided with information technology resources: virtual servers with specified computing capacity, an operating system, and network access

{ifndef(private-cert)}
|Image-based application
|A product deployed on the basis of virtual machine images in the user's cloud project
{/ifndef}

|IP
|Internet Protocol

|JSON
|JavaScript Object Notation — a text-based data interchange format based on JavaScript

{ifndef(private-cert)}
|kubectl
|A command-line tool for managing Kubernetes clusters. It is used to deploy applications, inspect cluster resources, and view logs
{/ifndef}

|LLD
|Low Latency Drive, a storage type optimized for minimal latency and high performance. It is represented by the Low Latency NVMe (ef-nvme) disk type

|Low Latency NVMe
|An LLD disk based on the NVMe interface. It is located on the same hypervisor as the VM

{ifndef(private-cert)}
|Master node
|The main node responsible for managing a Kubernetes cluster and serving as its entry point
{/ifndef}

|Multiqueue
|Multiple queues that allow processing network packets by distributing them across several virtual processors

|NAT
|Network Address Translation

{ifndef(private-cert)}
|NFS
|Network File System, a protocol for network access to file systems

|PaaS
|Platform as a Service — a cloud computing model in which the consumer gets access to information technology platforms: operating systems, database management systems, middleware, development and testing tools hosted by the provider. In this model, the entire information technology infrastructure, including computing networks, servers, and storage systems, is fully managed by {var(cloud)}, which also defines the set of platform types available to consumers and the set of managed platform parameters, while the consumer is provided with the ability to use platforms, create their virtual instances, and install, develop, test, and run application software on them, dynamically changing the amount of consumed computing resources
{/ifndef}

|PCI
|Peripheral Component Interconnect — an input/output bus for connecting peripheral devices to a computer motherboard

|RAM
|Random Access Memory

|Root disk, boot disk
|The primary disk from which the operating system starts when the VM boots

{ifndef(private-cert)}
|SaaS
|Software as a Service — a cloud computing model in which the consumer gets access to the use of independent services, such as Kubernetes clusters

|SaaS application
|A centrally installed multitenant product
{/ifndef}

|SDS Ceph
|Software-Defined Storage Ceph — a software object-based fault-tolerant data storage network

|SSD
|Solid-State Drive — a non-volatile, non-mechanical storage device based on memory chips, an alternative to HDD

|SSH
|Secure Shell — a secure protocol for remote connection between a client computer and a server computer, allowing remote control and data transfer between them

|TCP
|Transmission Control Protocol

|Terraform
|Open-source Infrastructure as Code (IaC) software created by HashiCorp. It allows users to define and provision data center infrastructure using a declarative configuration language known as HashiCorp Configuration Language, or optionally JSON.

|URL
|Uniform Resource Locator — a system of unified addresses for electronic resources, or a uniform resource locator

{ifndef(private-cert)}
|VDI
|Virtual Desktop Infrastructure — a desktop virtualization technology that allows running and managing multiple virtual computers on centralized servers

|vGPU
|Virtual GPU — a graphics processing unit virtualization technology that allows a single physical GPU to serve multiple virtual machines (VMs) at once
{/ifndef}

|VLAN
|Virtual Local Area Network

|VNC
|Virtual Network Computing — a remote desktop access system

|VPN
|Virtual Private Network

{ifndef(private-cert)}
|XaaS
|Everything as a Service — a model for providing various services in a cloud environment (software, platforms, infrastructure)
{/ifndef}

|YAML
|A data serialization language commonly used in configuration files, such as Kubernetes, Docker, Ansible, and others

|Load balancer
|Load balancers allow distributing the flow of requests (or network traffic) across multiple devices, such as servers, in order to:

* Scale horizontally.
* Ensure fault tolerance (redundancy).
* Optimize resource usage (by dynamically adding or removing devices depending on the load)

|Virtual network
|A network created using virtualization (a virtual router). It operates similarly to a traditional network. It provides communication between virtual machines (VMs) and other devices

|Virtual router
|A software implementation of a network router that operates similarly to a traditional router but runs using virtualization tools

{ifndef(private-cert)}
|VRM
|Virtual workplaces
{/ifndef}

|Hypervisor
|A dedicated server with a configured software hypervisor that serves running VM instances.

Each hypervisor has an OS installed on hard disks, a configured KVM hypervisor, configured SDS Ceph and/or storage system support modules, as well as agents for handling network settings

|Security group
|Sets of configurable allow rules that regulate network access rights (login via a specific protocol, through a specific port, for specific IP addresses or security groups)

|Node group
|A set of nodes with a common VM configuration template (flavor)

|Deploy node
|An auxiliary node for deploying and configuring {var(cloud)}. It usually includes a repository that stores all artifacts required for the {var(cloud)} installation and update processes

|Volume
|A network block device that provides data storage for a VM. All disks in {var(cloud)} are network disks and are protected by data replication, which ensures storage reliability and fault tolerance

|Serial console log
|A way to gain remote access to a server regardless of the state of the network or the operating system. Access is performed via the VNC (Virtual Network Computing) remote access system

|Availability zone
|A logical division and grouping of hypervisors for their physical isolation and fault tolerance

|Instance, VM
|A virtual machine that starts and runs in the cloud

{ifndef(private-cert)}
|Service instance
|A service instance deployed for the user

|Kubernetes cluster
|A Kubernetes cluster consists of a set of machines, called nodes, that run containerized applications. A cluster must have at least one worker node
{/ifndef}

|Key pair
|An interrelated pair consisting of a public and a private asymmetric key.

The public key is used to encrypt data and can be widely distributed.

The private key is used to decrypt data and is stored only by the owner of the key pair

{ifndef(private-cert)}
|Balancing method
|A method of distributing tasks across multiple network devices, such as servers, in order to optimize resource usage
{/ifndef}

|Image, disk image
|A file containing a complete copy of the contents of a disk: the file system structure and the data on the disk. Images are used to create non-empty disks, including boot disks.

Usually, an image used in {var(cloud)} when creating a VM boot disk contains an installed operating system and, sometimes, additional software. The image name most often reflects the type and version of the operating system and other features of the image content

|OS
|Operating system

|Software
|Software

|Pod
|A group of one or more application containers that includes shared storage (volumes), an IP address, and information about launching them

|User
|A tenant of cloud resources

|Security group rule
|A set of parameters that determine the conditions for traffic passage. Rules are combined into groups, which in turn are applied to instance ports

|Backup
|A copy (of a VM or a disk) in the state in which the restore point was created

{ifndef(private-cert)}
|DBMS
|Database Management System
{/ifndef}

|Disk snapshot
|The state of a file system at a specific point in time. Creating a disk snapshot stops writing from the guest OS for a short time, saves the state of the system files, and writes all subsequent changes to a separate file

|Instance tag
|Arbitrary combinations of characters that allow indexing or filtering instances

|Node
|A separate physical or virtual machine on which {var(cloud)} components are deployed and run

|Controller node
|A node type that provides {var(cloud)} management and automation of many of its operational processes, but does not provide resources for end users. Controller nodes provide APIs and other interfaces for working with {var(cloud)}, ensure the operation of {var(cloud)} internal services and schedulers, and also provide some tools for {var(cloud)} administration

{ifndef(private-cert)}
|File storage
|A virtual file system that can be connected to a VM
{/ifndef}

|Data center
|A specialized building or premises for hosting server and network equipment, equipped with all the necessary infrastructure. Examples: power supply, cooling, communication networks, and others

|VM flavor
|An instance configuration that defines the characteristics of its resources: the number and type of CPUs, the amount of RAM, and some other parameters
|===
{ifdef(private-pdf,private-pg-pdf,private-cert)}
{/caption}{/ifdef}