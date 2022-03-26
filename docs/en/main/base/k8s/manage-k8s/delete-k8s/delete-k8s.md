Before deleting a cluster, you need to make sure that it is in an enabled state. Otherwise, the delete operation cannot be performed.

In VK CS Panel
------------

To delete a cluster through the VK CS Panel, go to the list of clusters in the "Containers" section, in the context menu of the selected cluster, click the "Delete cluster" option.

![](./assets/1598991750274-1598991750274.png)

With Terraform
--------------

The **terraform destroy** command removes resources from the Terraform configuration. This command is the opposite of **terraform apply** because it removes all resources specified in the configuration. It does not destroy resources running elsewhere that are not described in the current configuration.

```
 terraform destroy
# ...
# instance.example will be destroyed
- resource "instance" "example" {
- ami = "ami-fc0b939c" -> null
# ...
```

The prefix indicates that the instance will be destroyed. As with apply, Terraform displays its execution plan and waits for approval before making any changes.

You must enter **yes** to execute the removal plan.

```
 # ...
instance.example: Destroying ... [id = i-0589469dd150b453b]
Destroy complete! Resources: 1 destroyed.
# ...
```

As with **apply** , Terraform defines the order in which objects should be destroyed. In this case, there was only one resource. In more complex cases with multiple assets, Terraform will destroy them in an appropriate order based on dependencies.