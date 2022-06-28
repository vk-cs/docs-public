The first step in migrating hosts (both virtual and hardware) to Target Cloud is replication. To do this, you need to install a Replication agent on the operating system of the replicated host. There are replication agents for both Windows and Linux (Redhat- and Debian-family). In the case of using VMware vSphere on the side of the migration source, it is possible to replicate without installing agents on the OS of the client hosts.

#### Installing the replication agent on the host OS

Next, we will consider the case of installing an agent in the OS.

Log in to your account in the Hystax Acura installation. Click the "Download Agents" button.

Fill in the information about the operating system of the replicated host. At the last step, you will receive a link to download the agent and installation instructions.

After successfully installing and starting the replication agent, it will connect to the Hystax Acura installation. In your Hystax Acura account, this host will appear in the "Machine Groups" section. The "Discovered" status indicates that this host has been discovered, but replication has not yet taken place.

Next, you need to configure the replication settings. To do this, click on "..." and select "Edit Replication settings" in the drop-down menu. A window will appear in which you can specify the replication schedule and parameters such as Volume Type and Volume availability zone. Specify Volume type "dp1-ssd" and click the "Save" button.

After completing the installation and configuration of the replication agent, proceed to launch the replication of the protected infrastructure.
