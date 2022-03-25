Description
-----------

Object Storage or S3 can be used to store and retrieve any amount of data anytime from anywhere on the Internet. These tasks can be accomplished using the VK CS Control Panel.

S3 stores data as objects in buckets. An object is a file and any additional metadata describing the file. To save a file to S3, it must be loaded into a bucket. When the file is loaded as an object, you can set permissions on the object and any metadata.

Buckets are containers for objects. A project can have one or more buckets. Access to each bucket can be controlled by deciding who can create, delete, and enumerate objects in it. Additionally, you can view the access logs for the bucket and its objects.

The following tasks can be accomplished using the VK CS Control Panel:

*   Bucket creation
*   Loading an object into a bucket
*   Object Access Control
*   Object lifecycle management
*   Copying an item to a folder
*   Removing objects and buckets

List of terms
-------------

The Object Storage service uses the following concepts:

<table border="0" cellpadding="0" cellspacing="0" style="margin-right: calc(1%); width: 99%;" width="515"><tbody><tr><td style="width: 35.6962%; background-color: rgb(239, 239, 239);"><strong>Term</strong></td><td style="width: 64.0506%; background-color: rgb(239, 239, 239);"><strong>Description</strong></td></tr><tr><td height="19" style="width: 35.6962%;" width="47.57281553398058%">Bucket</td><td style="width: 64.0506%;" width="52.42718446601942%">An entity that contains objects and helps to organize them</td></tr><tr><td height="19" style="width: 35.6962%;">An object</td><td style="width: 64.0506%;">Free format data loaded into the bucket</td></tr><tr><td height="19" style="width: 35.6962%;">Multipart upload</td><td style="width: 64.0506%;">How to load large objects</td></tr><tr><td height="19" style="width: 35.6962%;">Access Control List (ACL)</td><td style="width: 64.0506%;">Mechanisms for granting access to buckets and objects</td></tr><tr><td style="width: 35.6962%;">Pre-signed URL</td><td style="width: 64.0506%;">The way in which an anonymous user is granted access to operations with Object Storage</td></tr><tr><td height="19" style="width: 35.6962%;">Uploading data via HTML form</td><td style="width: 64.0506%;">A method for loading objects into storage from a browser. Allows anonymous users to upload objects to the bucket</td></tr><tr><td height="19" style="width: 35.6962%;">Storage class</td><td style="width: 64.0506%;">The ability to reduce the cost of storing objects by dividing them into objects with frequent access and objects of long-term storage</td></tr><tr><td style="width: 35.6962%;">Lifecycles of objects in a bucket</td><td style="width: 64.0506%;">Set of rules for automatic deletion of objects</td></tr></tbody></table>