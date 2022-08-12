## Description

The Object Storage service allows you to use an automated mechanism for cleaning objects at specified intervals.

Lifecycle configuration allows you to specify rules for managing the lifecycle of objects in a bucket. A configuration is a set of one or more rules. Each rule specifies the actions to be applied to the service for a group of objects after a specified period.

Object life cycles can be configured only for each individual bucket. You cannot configure lifecycles for a bucket group, catalog, or project.

Lifecycle rules in the VK Cloud panel are managed on the "Lifecycle" tab of the selected bucket.

## Create a rule

When creating a rule in the VK Cloud panel interface, fill in the fields and confirm the creation:

![](./assets/1598059111681-1598059111681.png)

Where:

- Rule Name - The display name of the rule. Only numbers, Latin letters and symbols "-", "\_" and "."
- Object key prefix - a key prefix that is used to filter objects that are subject to the rule. A filter can contain only one prefix. Examples of prefixes for a key image, image /, image / photo
- Delete after a specified number of days - a timer after which the rule for deleting objects starts
- Activate rule - a mechanism for activating a rule that allows you to enable or disable a rule without having to delete it
