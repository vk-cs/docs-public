VK Cloud Solutions app store includes a number of solutions for comfortable development.

**Docker** is software for automating the deployment and management of applications in containerized environments. This software allows you to package an application with all its environment and dependencies into a container that can be ported to any Linux system with support for cgroups in the kernel, and also provides an environment for managing containers.

The VK CS marketplace offers two components for correct and convenient work with applications - the Docker CE (Community Edition) software itself and the Docker Registry - a server application for hosting and distributing an unlimited number of public docker images.

The Docker Registry can be used to control where images are stored and distributed, and to integrate the storage and distribution of images during development.

**ELK** is an acronym for three product names: Elasticsearch, Logstash, kibana. These products at a certain point in time became owned by one company and developed in the same direction.

Elasticsearch is actually a mechanism for indexing and storing the received information, as well as full-text search on it. It is based on the Apache Lucene library and, in fact, is a NoSQL database solution. The main task of this tool is to organize fast and flexible search for the received data. To solve it, there is a choice of text analyzers, fuzzy search functionality, and search by information in oriental languages (Korean, Chinese, Japanese) is supported. Working with information is done using the REST API, which allows you to add, view, modify, and delete data. However, in the case of using ELK, this question remains inside the "black box", since we already have the above described Logstash and Kibana.

Logstash is a tool for getting, transforming and saving data in a shared storage. Its first task is to receive data in some form: from a file, database, logs or information channels. Further, the obtained information can be modified using filters, for example, a single row can be divided into fields, data can be added or changed, several rows can be aggregated, etc. The processed information is sent to systems - consumers of this information. Speaking of the ELK bundle, the consumer of information will be Elasticsearch, but other options are possible, for example, monitoring and management systems (Nagios, Jira, etc.), information storage systems (Google Cloud Storage, syslog, etc.), files on disk. It is even possible to run a command when a specific dataset is received.

Kibana is a user-friendly interface for Elasticsearch that has a large number of capabilities for searching data in the wilds of Elasticsearch indexes and displaying this data in readable forms of tables, graphs and charts.

ELK is now a powerful tool for collecting and analyzing information.

VK Cloud Solutions allows you to create either one virtual machine with an ELK stack, or a complex of two ELK Multi Instances - elasticsearch instance and gateway instance.

**Application Development Kits**
--------------------------------

**GitLab CE** (Community Edition) is an open source Git repository management and collaborative project management system.

The minimum requirements for installing GitLab are 4 CPU and 4 RAM to support Dot 500 users.

**Sonatype Nexus** is a private maven repository that performs the following tasks: proxying libraries for quick access to them (it is advisable if nexus is on a local network - libraries are downloaded to nexus once from different repositories and then stored there); release of libraries of different versions.

Unlike the Nexus 2, the Nexus 3 has a Docker Registry feature.

**Apache Tomcat** is an open source servlet container and web server that supports many large-scale applications across a wide variety of industries and organizations.

Implements the Servlet Specification, JavaServerPages Specification, and JavaServerFaces Specification. Allows you to run web applications and contains a number of self-configuring programs.

**Wordpress** is an open source content management system. Wordpress uses PHP and MySQL, which are supported by almost all hosting providers. Scope of application - from blogs to complex news resources. The built-in system of "themes" and "plug-ins" together with a good architecture allows you to design projects of wide functional complexity.

**Jenkins** is an open source Java software system designed to provide a continuous software integration process. Jenkins allows you to automate the non-human part of the software development process by providing continuous integration functionality. Supports version control system tools including AccuRev, CVS, Subversion, Git, Mercurial, Perforce, Clearcase, RTC. Can build projects using Apache Ant and Apache Maven, and execute arbitrary shell scripts and Windows batch files. A build can be started in different ways, for example, on a commit event in the source control system, on a schedule, on a request to a specific URL, after another build in the queue completes.

**Developer stacks**
--------------------

LAMP stack is a set of server software. Includes the following components

LEMP stack

MEAN stack

Monitoring

Prometheus Kit