Connect your SIEM system to VK Cloud so that Cloud Audit can send it information about security events coming from your cloud services and virtual machines.

You can connect several SIEM systems to VK Cloud, and also set up several connections to the same SIEM system, for example, to receive data from VK Cloud in different formats. However, only one of these connections can be active at a time.

In your management console, you can change [parameters](#edit_siem_connection) and [activity status](#activate_siem_connection) of connections, as well as [delete](#delete_siem_connection) unnecessary connections.

## {heading(Creating SIEM connections)[id=create_siem_connections]}

1. Open the port of your SIEM system to receive messages from VK Cloud. For more information about other necessary settings, read the documentation of the SIEM system.
1. [Go](https://cloud.vk.com/app/en/) to your VK Cloud management console.
1. Go to the **Monitoring → Event log** section.
1. Click the **Settings** button and go to the **SIEM** tab.
1. Click the **Create connection** button.
1. Specify the connection parameters:

   - **Name**: enter a name for the connection.
   - **Connection point**: enter the IP address of your SIEM system and the port open to receive messages from VK Cloud.
   - **Data transfer protocol**: select the protocol for transferring data to the SIEM system. Available values: `TCP`, `UDP`, `TCP over TLS`. To use data encryption, select `TCP over TLS`.
   - **TLS key**: enter the TLS key value from your provider in PEM format. This option is available when `TCP over TLS` is selected.
   - **Message format**: select the format in which data will be provided to the SIEM system. Available values: `RAW (Syslog RFC5424)`, `CEF (Common Event Format`.

1. Click the **Create** button.
1. Wait for the connection check to complete and click the **Activate** or **Save as inactive** button.

<info>

Only one SIEM connection can be active. If you activate a new connection, the previous one will be stopped. You can [activate](#activate_siem_connection) the stopped connection later.

</info>

## {heading(Editing SIEM connection settings)[id=edit_siem_connection]}

1. [Go](https://cloud.vk.com/app/en/) to your VK Cloud management console.
1. Go to the **Monitoring → Event log** section.
1. Click the **Settings** button and go to the **SIEM** tab.
1. Click ![](/en/assets/more-icon.svg "inline") for the required connection and select **Configure**.
A page with the settings of the selected SIEM connection will open.
1. Change the connection parameters as needed:

   - **Name**: enter a name for the connection.
   - **Connection point**: enter the IP address of your SIEM system and the port open to receive messages from VK Cloud.
   - **Data transfer protocol**: select the protocol for transferring data to the SIEM system. Available values: `TCP`, `UDP`, `TCP over TLS`. To use data encryption, select `TCP over TLS`.
   - **TLS key**: enter the TLS key value from your provider in PEM format. This option is available when `TCP over TLS` is selected.
   - **Message format**: select the format in which data will be provided to the SIEM system. Available values: `RAW (Syslog RFC5424)`, `CEF (Common Event Format`.

1. Click the **Create** button.
1. Wait for the connection check to complete and click the **Activate** or **Save as inactive** button.

<info>

Only one SIEM connection can be active. If you activate a new connection, the previous one will be stopped. You can [activate](#activate_siem_connection) the stopped connection later.

</info>

## {heading(Activating or disactivating the SIEM connection)[id=activate_siem_connection]}

1. [Go](https://cloud.vk.com/app/en/) to your VK Cloud management console.
1. Go to the **Monitoring → Event log** section.
1. Click the **Settings** button and go to the **SIEM** tab.

   The connection status is displayed by the icon in the **Status** column:

      - Gray icon — inactive connection.
      - Green icon — active connection.
   
1. To activate a connection, use one of the following methods:

   - Click ![](/en/assets/more-icon.svg "inline") for the connection and select **Start**.
   - Set the checkbox for the connection and click the **Start** button.

1. To make a connection inactive, use one of the following methods:

   - Click ![](/en/assets/more-icon.svg "inline") for the connection and select **Stop**.
   - Set the checkbox for the connection and click the **Stop** button.

## {heading(Deleting SIEM connection)[id=delete_siem_connection]}

This is a group operation: if necessary, you can delete several connections at once by setting the checkboxes.

1. [Go](https://cloud.vk.com/app/en/) to your VK Cloud management console.
1. Go to the **Monitoring → Event log** section.
1. Click the **Settings** button and go to the **SIEM** tab.
1. Delete the SIEM connection in one of the following ways:

   - Click ![](/en/assets/more-icon.svg "inline") for the connection and select **Delete**.
   - Set the checkbox for the connection and click the **Delete** button.

1. Confirm the deletion.
