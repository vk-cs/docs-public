# {heading(Terms and abbreviations)[id=glossary]}

{ifdef(public)}
{include(/en/_includes/_dp-unavailable.md)}
{/ifdef}

{include(/en/_includes/_translated_by_ai_en.md)}

This document uses the terms and abbreviations listed in {linkto(#tab_glossary)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_glossary]} — Terms and abbreviations)[align=right;position=above;id=tab_glossary;number={const(numb_tab_glossary)}]}
[cols="1,3", options="header"]
|===
|Term
|Definition

|ACID transactions
|Atomicity, Consistency, Isolation, Durability, a standard in which a transaction (a sequence of operations) is executed either fully or not at all. It ensures reliable and predictable database operation and preserves data integrity in case of failures

|Airflow
|Apache Airflow, open-source software for creating, executing, monitoring, and orchestrating data processing workflows

|API
|Application Programming Interface

|Bouncer
|A connection manager that controls and optimizes connections between clients and the database server

|Ceph
|An open-source software-defined distributed file system

|CI/CD tools
|Software tools that automate continuous integration (Continuous Integration, CI) and continuous delivery/deployment (Continuous Delivery/Deployment, CD) processes in software development

|ClickHouse
|A columnar analytical DBMS for storing and processing historical data

|ClickHouse Keeper
|A service that coordinates data replication and distributes DDL queries across ClickHouse clusters

|CPU
|Central Processing Unit

|Cron expression
|A string consisting of six or seven fields. It defines the schedule for task execution in the Cron task scheduler

|DAG
|Directed Acyclic Graph

|DDL query
|Data Definition Language, a command for defining and managing the database structure

|Docker container
|A lightweight, isolated environment that contains everything needed to run an application, including code, libraries, and dependencies

|Docker image
|A template containing everything needed to create and run a Docker container

|Docker Registry
|A server application for storing and managing Docker images

|ETL processes
|Data management processes: Extract, Transform, Load

|Flink
|Apache Flink, a service for stream processing and transferring any volumes of data from sources to target systems

|GraphX
|A library for graph processing and analysis in Apache Spark that enables parallel computations on graphs and provides an API for working with graph data structures

|Greenplum
|An analytical, massively parallel processing (MPP) DBMS based on PostgreSQL, designed for storing and processing large volumes of data

|Hadoop cluster
|A set of nodes that operate as a single unit for storing and processing large volumes of data using the Apache Hadoop framework

|High IOPS SSD
|A disk that delivers high performance characterized by a large number of Input/Output Operations Per Second (IOPS)

|IP
|Internet Protocol

|Iceberg
|Apache Iceberg, an open table format for storing and organizing data structures in a Data LakeHouse

|Jatoba
|A secure DBMS based on a modernized PostgreSQL DBMS core

|Java Vector API
|A Java interface for vector computations that leverage the capabilities of SIMD processors (Single Instruction, Multiple Data). It allows writing code that can perform the same operation on multiple data elements simultaneously

|JDBC
|An API for the Java programming language that allows applications to interact with relational databases, providing a universal interface for executing SQL queries and managing data

|Job Manager
|A component of Apache Flink that manages task execution, allocates resources, and coordinates data stream execution in a cluster

|JupyterHub
|A platform for running and managing multiple Jupyter Notebook sessions for different users via a web interface

|JupyterHub Notebook
|An interactive web environment for creating and sharing documents containing code, equations, visualizations, and text

|Kafka
|Apache Kafka, an open-source distributed software message broker

|Kafka Connect
|A component for scalable and reliable streaming of data between Apache Kafka and other systems

|Kubernetes
|Open-source software for automating the deployment, scaling, and management of containerized applications

|MLflow
|An open-source platform for managing the full lifecycle of machine learning (ML) models

|MLlib
|A machine learning library for Apache Spark that provides tools for performing various machine learning tasks, such as classification, regression, clustering, and data processing

|MPP architecture
|Massively Parallel Processing, an architecture in which multiple processors work in parallel, processing different parts of a task simultaneously to improve performance and scalability

|NiFi
|Apache NiFi, a platform for automating and managing data flows

|OLAP query
|A query for analyzing multidimensional data in Online Analytical Processing systems

|OpenSearch
|A software suite for building search engines and analytical solutions

|Pandas API
|An interface of the Pandas library for Python that provides tools for convenient and efficient data handling, including processing, analysis, and visualization

|Parquet
|An open-source columnar data storage format optimized for efficient storage and processing of large volumes of data

|PostgreSQL
|A free object-relational DBMS

|PyTorch
|An open-source machine learning library that supports automatic differentiation and dynamic construction of neural networks

|RAM
|Random Access Memory

|Redis
|A high-performance, high-speed NoSQL DBMS that stores data in RAM as key/value pairs

|S3 (external S3)
|Simple Storage Service, a service where large volumes of digital data are stored. It operates via the protocol of the same name

|S3 VK Cloud
|The {var(s3)} cloud object storage provided by VK Tech. It allows storing large volumes of data at low cost

|SDN
|Software Defined Network

|Single
|A single-node service instance configuration that is not fault-tolerant. Suitable for development and testing tasks

|Scikit-learn
|A Python machine learning library that provides simple and efficient tools for data analysis and modeling

|Spark
|Apache Spark, a platform for distributed big data processing that delivers high computation speed and supports various analytical tasks

|Spark History Server
|A component of Apache Spark that allows viewing and analyzing the history of completed Spark tasks. It provides access to logs, metrics, and visualizations of task execution. It is used for troubleshooting and performance optimization

|Spark SQL
|A module of Apache Spark that provides the ability to work with data using SQL queries, as well as to integrate SQL with programs written in Scala, Java, Python, and R

|Structured Streaming
|A component of Apache Spark that allows processing streaming data in real time using a high-level API, providing support for continuous computations and fault tolerance

|SQL
|Structured Query Language

|SQL Firewall
|A security system for protecting databases from unauthorized access and malicious SQL queries

|Task Manager
|A component of Apache Flink that executes tasks, processes data, and manages the resources allocated for data stream execution in a cluster

|TensorFlow
|An open-source library for machine learning and neural networks. It supports both training and deployment of models on various platforms

|Time travel
|A feature of Apache Iceberg that allows querying and analyzing data from previous states of a table using stored snapshots

|TLS encryption
|A protocol that ensures secure data transmission over a network and prevents unauthorized access and information interception

|Trino
|A high-performance distributed SQL engine designed for executing fast analytical queries on data from various sources, such as databases, file systems, and object storages, without the need to copy it

|URL
|Uniform Resource Locator, the address of a website or service

|WAL
|Write-Ahead Logging, a logging method that ensures data integrity in a DBMS

|ZooKeeper
|A service for coordinating distributed systems that manages their configuration, synchronization, and state maintenance

|Bucket
|A container for storing data (objects) in S3 storage

|DB
|Database

|VM
|Virtual machine

|Differential backup
|A backup that contains only the differences between the previous full backup and the current point in time. If no full backup has been performed between differential backups, the size of each subsequent backup will be larger than the previous one

|Availability zone
|One or more data centers (DCs) where components of {var(data-p)} can be hosted

|Incremental backup
|A backup that contains only the data changes made after any previous backup: full or differential. The size of this backup depends only on the amount of data changed during the period between backups

|Cyber Backup
|A data backup and recovery system

|Cluster
|A fault-tolerant configuration of a service instance consisting of multiple nodes. Suitable for any tasks, including day-to-day work with data in a production environment

|Logs
|Files containing chronological records of events and actions of a user or program

|Software
|Software

|Pod
|The smallest deployable unit in Kubernetes, containing one or more containers that share network and storage resources

|Full backup
|A backup that includes the files, databases, settings, and configurations necessary to restore the system in case of its failure, data loss, or other issues

|Data stream
|The ordered movement of information from a source to a destination. It may include data transformation, processing, and transmission processes

|Replication
|The process of copying and keeping data synchronized across multiple systems or nodes

|Service
|A system integrated with {var(data-p)}

|DBMS
|Database Management System

|Topic
|A logical category or channel for grouping messages in Apache Kafka, analogous to a table in a database or a folder in a file system

|Shard
|A portion of data stored on a separate cluster node or database server

|===
{/caption}