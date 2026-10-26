# {heading(Managing telegraf and its plugins)[id=monitoring-telegraf-manage]}

{include(/en/_includes/_translated_by_ai_en.md)}

## {heading(Viewing agent status)[id=monitoring-telegraf-status]}

1. {linkto(../mon-setup-current#monitoring-mon-setup-current)[text=Make sure]}, that the telegraf monitoring agent is installed.
1. {ifdef(public)}{linkto(../../../../computing/iaas/instructions/vm/vm-connect#iaas-vm-connect)[text=Connect]}{/ifdef}{ifndef(public)}{linkto(../../../../computing/iaas/instructions/vm/vm-console#iaas-vm-console-vnc)[text=Connect]}{/ifndef} to the virtual machine.
1. Run the command:

   {tabs}

   {tab(Linux)}

   ```console
   systemctl -l status telegraf
   ```

   {/tab}

   {/tabs}

## {heading(Enabling or disabling the agent)[id=monitoring-telegraf-on-off]}

1. {linkto(../mon-setup-current#monitoring-mon-setup-current)[text=Make sure]}, that the telegraf monitoring agent is installed.
1. {ifdef(public)}{linkto(../../../../computing/iaas/instructions/vm/vm-connect#iaas-vm-connect)[text=Connect]}{/ifdef}{ifndef(public)}{linkto(../../../../computing/iaas/instructions/vm/vm-console#iaas-vm-console-vnc)[text=Connect]}{/ifndef} to the virtual machine.

- To enable the agent, run the command:

  {tabs}

  {tab(Linux)}

  ```console
  sudo systemctl start telegraf
  ```

  {/tab}

  {/tabs}

- To disable the agent, run the command:

  {tabs}

  {tab(Linux)}

  ```console
  sudo systemctl stop telegraf
  ```

  {/tab}

  {/tabs}

## {heading(Enabling or disabling metrics)[id=monitoring-telegraf-metrics]}

1. {linkto(../mon-setup-current#monitoring-mon-setup-current)[text=Make sure]}, that the telegraf monitoring agent is installed.
1. {ifdef(public)}{linkto(../../../../computing/iaas/instructions/vm/vm-connect#iaas-vm-connect)[text=Connect]}{/ifdef}{ifndef(public)}{linkto(../../../../computing/iaas/instructions/vm/vm-console#iaas-vm-console-vnc)[text=Connect]}{/ifndef} to the virtual machine.
1. Find and edit the file `/etc/telegraf/telegraf.conf`: add or remove the parameters for monitoring.

   Example for CPU monitoring in Linux:

   ```ini
   [[inputs.cpu]]
     percpu = false
     totalcpu = true
     collect_cpu_time = true
     report_active = false
     fieldpass = ["usage_user", "usage_system", "usage_iowait", "usage_irq", "usage_guest", "time_idle"]
   ```

1. Apply the new configuration using the command:

   {tabs}

   {tab(Linux)}

   ```console
   sudo systemctl reload telegraf.service
   ```

   {/tab}

   {/tabs}

## {heading(Enabling or disabling the plugin for configuring additional metrics)[id=monitoring-telegraf-plugin]}

1. {linkto(../mon-setup-current#monitoring-mon-setup-current)[text=Make sure]}, that the telegraf monitoring agent is installed.
1. {ifdef(public)}{linkto(../../../../computing/iaas/instructions/vm/vm-connect#iaas-vm-connect)[text=Connect]}{/ifdef}{ifndef(public)}{linkto(../../../../computing/iaas/instructions/vm/vm-console#iaas-vm-console-vnc)[text=Connect]}{/ifndef} to the virtual machine.
1. Find and edit the file `/etc/telegraf/telegraf.conf`: add or remove the [desired plugin](https://github.com/influxdata/telegraf/blob/master/docs/CONFIGURATION.md#input-plugins).

   Example of adding the `mysql` plugin in Linux:

   ```ini
   [[inputs.mysql]]
     servers = ["tcp(127.0.0.1:3306)/"]
     metric_version = 2
   ```

1. Apply the new configuration using the command:

   {tabs}

   {tab(Linux)}

   ```console
   sudo systemctl reload telegraf.service
   ```

   {/tab}

   {/tabs}

## {heading(Viewing agent logs)[id=monitoring-telegraf-logs]}

1. {linkto(../mon-setup-current#monitoring-mon-setup-current)[text=Make sure]}, that the telegraf monitoring agent is installed.
1. {ifdef(public)}{linkto(../../../../computing/iaas/instructions/vm/vm-connect#iaas-vm-connect)[text=Connect]}{/ifdef}{ifndef(public)}{linkto(../../../../computing/iaas/instructions/vm/vm-console#iaas-vm-console-vnc)[text=Connect]}{/ifndef} to the virtual machine.
1. Run the command:

   {tabs}

   {tab(Linux)}

   ```console
   journalctl -u telegraf
   ```

   {/tab}

   {/tabs}

## {heading(Deleting the agent)[id=monitoring-telegraf-delete]}

1. {linkto(../mon-setup-current#monitoring-mon-setup-current)[text=Make sure]}, that the telegraf monitoring agent is installed.
1. {ifdef(public)}{linkto(../../../../computing/iaas/instructions/vm/vm-connect#iaas-vm-connect)[text=Connect]}{/ifdef}{ifndef(public)}{linkto(../../../../computing/iaas/instructions/vm/vm-console#iaas-vm-console-vnc)[text=Connect]}{/ifndef} to the virtual machine.
1. Run the command:

   {tabs}

   {tab(CentOS 7.X)}

   ```console
   sudo yum erase telegraf
   ```

   {/tab}

   {tab(CentOS 8.X, RedOS 7, AlmaLinux 9)}

   ```console
   sudo dnf remove telegraf
   ```

   {/tab}

   {tab(Ubuntu 22.X, AltLinux Server)}

   ```console
   sudo apt-get remove telegraf
   ```

   {/tab}

   {tab(Astra Linux)}

   ```console
   sudo apt remove telegraf
   ```

   {/tab}

   {/tabs}