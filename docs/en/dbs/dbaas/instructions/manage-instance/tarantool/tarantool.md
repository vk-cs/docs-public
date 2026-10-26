# {heading(Tarantool)[id=dbaas-tarantool]}

{include(/en/_includes/_translated_by_ai_en.md)}

## {heading(Starting, restarting and stopping a DB instance)[id=dbaas-tarantool-start-restart]}

{note:info}
A DB instance in the **Cluster** configuration cannot be started, restarted or stopped.
{/note}

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Select the project where the desired DB instance is located.
1. Go to **Databases** → **Database instances**.
1. Perform the desired operation:

   {tabs}
   
   {tab(Start an instance)}
      
   Perform one of the following actions:

   - Select one or more DB instances using the checkboxes, then click **Start**.
   - Click ![](../../../../../assets/more-icon.svg "inline") for the DB instance host and select **Start**.

   {/tab}
   
   {tab(Restart an instance)}
   
   Perform one of the following actions:

   - Select one or more DB instances using the checkboxes, then click **Restart**.
   - Click ![](../../../../../assets/more-icon.svg "inline") for the DB instance host and select **Restart**.

   {/tab}
   
   {tab(Stop an instance)}
   
   Perform one of the following actions:

   - Select one or more DB instances using the checkboxes, then click **Stop**.
   - Click ![](../../../../../assets/more-icon.svg "inline") for the DB instance host and select **Stop**.

   {/tab}

   {/tabs}

{/tab}

{/tabs}

## {heading(Getting information about a DB instance and its hosts)[id=dbaas-tarantool-get-info]}

Different information is available for an active and a stopped DB instance.

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Select the project where the desired DB instance is located.
1. Go to **Databases** → **Database instances**.
1. Perform the desired operation:

   - To view information about a DB instance, click its name.

   - To view information about an individual host of the DB instance, click the host name.

   A page with the information will open.

{/tab}

{/tabs}

## {heading(Managing an external IP address)[id=dbaas-tarantool-ip-management]}

You can assign an external IP address or unbind it at the level of an individual host that is part of a DB instance:

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Select the project where the desired DB instance is located.
1. Go to **Databases** → **Database instances**.
1. Perform the desired operation:

   {tabs}
   
   {tab(Assign an external IP address to a host)}
      
   1. Click ![](../../../../../assets/more-icon.svg "inline") for the desired host and select **Assign external IP**.
   1. Select an existing IP address or the **Add new IP** option from the drop-down list.
   1. Click **Confirm**.

   {/tab}
   
   {tab(Unbind an external IP address from a host)}
   
   1. Click ![](../../../../../assets/more-icon.svg "inline") for the desired host and select **Unbind external IP**.
   1. Click **Confirm**.

   {/tab}

   {/tabs}

{/tab}

{/tabs}

## {heading(Vertical scaling)[id=dbaas-tarantool-vertical-scaling]}

In the **Single** configuration, you can change the virtual machine type used by a DB instance host:

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Select the project where the desired DB instance is located.
1. Go to **Databases** → **Database instances**.
1. Click ![](../../../../../assets/more-icon.svg "inline") for the DB instance host and select **Vertical scaling**.
1. Select the desired category and virtual machine type.
1. Click **Save size**.

{/tab}

{/tabs}

## {heading(Configuring disk size auto-scaling)[id=dbaas-tarantool-disk-autoscaling]}

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Select the project where the desired DB instance is located.
1. Go to **Databases** → **Database instances**.
1. Configure auto-scaling of the disk where data is stored:

   {tabs}
   
   {tab(Single configuration)}
      
   1. Perform one of the following actions:

      - Click ![](../../../../../assets/more-icon.svg "inline") for the desired DB instance and select **Edit disk auto-scaling**.
      - Click ![](../../../../../assets/more-icon.svg "inline") for the host of the desired DB instance and select **Edit disk auto-scaling**.

   1. Enable or disable the disk auto-scaling option.
   1. If the auto-scaling option is enabled, set the maximum disk size.
   1. Click **Confirm**.

   {/tab}
   
   {tab(Cluster configuration)}
   
   {note:info}
   In this configuration, the disk auto-scaling settings are changed for all hosts included in the DB instance.
   {/note}

   1. Click ![](../../../../../assets/more-icon.svg "inline") for the desired DB instance and select **Edit disk auto-scaling**.
   1. Enable or disable the disk auto-scaling option.
   1. If the auto-scaling option is enabled, set the maximum disk size.
   1. Click **Confirm**.

   {/tab}

   {/tabs}

{/tab}

{/tabs}

## {heading(Deleting a DB instance)[id=dbaas-tarantool-delete-disk]}

{tabs}

{tab(Management console)}

1. [Go to](https://msk.cloud.vk.ru/app/) the {var(cloud)} management console.
1. Select the project where the desired DB instance is located.
1. Go to **Databases** → **Database instances**.
1. To delete a DB instance:

   {tabs}
   
   {tab(Single configuration)}
      
   1. Click ![](../../../../../assets/more-icon.svg "inline") for the desired DB instance and select **Delete**.
   1. Click **Confirm**.

   {/tab}
   
   {tab(Cluster configuration)}
   
   1. Click ![](../../../../../assets/more-icon.svg "inline") for the desired DB instance and select **Delete cluster**.
   1. Click **Confirm**.

   {/tab}

   {/tabs}

{/tab}

{/tabs}