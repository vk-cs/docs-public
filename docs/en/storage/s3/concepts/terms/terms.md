# {heading(Терms and abbreviations)[id=s3-concepts-terms]}

{include(/en/_includes/_translated_by_ai_en.md)}

{ifdef(s3-pdf)}
This document uses the abbreviations listed in {linkto(#tab_terms)[text=table %number]}.

{caption(Table {counter(table)[id=numb_tab_terms]} — Terms and abbreviations)[align=right;position=above;id=tab_terms;number={const(numb_tab_terms)}]}
{/ifdef}
[cols="1,3", options="header"]
|===
|Abbreviation
|Definition

|ACL
|Access Control List, an access control list that defines who or what can access an object and which operations are allowed or denied for a subject

|API
|Application Programming Interface — a software interface of an application. A description of the ways (a set of classes, procedures, functions, structures, or constants) by which one computer program can interact with another program

|AWS
|Amazon Web Services — a cloud object storage that provides the Amazon Simple Storage Service (Amazon S3) object storage service

|AWS CLI
|AWS Command Line Interface. Used to manage {var(s3)} services

|JavaScript
|A multi-paradigm programming language. Supports object-oriented, imperative, and functional styles

|JSON
|JavaScript Object Notation — a text-based data exchange format based on JavaScript

|HashiCorp Vault
|A tool that provides secure storage of and access to various secrets, such as passwords

|IAM
|An administration tool via a web interface (Web UI).

|KMS
|Key Management Service — a centralized encryption key management service. Hashicorp Vault is used as the KMS for {var(s3)}

|S3
|Simple Storage Service. An object storage service

|SSE
|Server-side encryption. Each object in {var(s3)} is encrypted with a unique key using KMS (SSE-E) or with a key provided by the user (SSE-C)

|URL
|Uniform Resource Locator — a system of unified addresses for electronic resources, or a uniform resource location identifier. Used as the standard format for writing links to objects on the Internet

|OS
|Operating system

|pub/sub
|The publisher-subscriber notification model

|push model
|A model of instant notification delivery when specified conditions are met in configurations

|SNS
|Simple Notification Service, a mechanism for automatically sending notifications (via HTTP requests) to specified URLs

|EventBridge
|A notification delivery service
|===
{ifdef(s3-pdf)}
{/caption}
{/ifdef}