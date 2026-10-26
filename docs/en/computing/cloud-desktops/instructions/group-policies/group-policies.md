# {heading(Configuring AD Group Policies)[id=desktops-group-policies]}

{include(/en/_includes/_translated_by_ai_en.md)}

For end users to be able to connect to virtual desktops running the Windows OS, configure the group policies of the Active Directory domain controller.

{ifdef(public)}
{note:info}
These instructions are intended for system administrators who maintain the Active Directory service infrastructure in your company.
{/note}
{/ifdef}

## {heading(Preparatory steps)[id=desktops-ad-preparatory-steps]}

Launch the Group Policy Management snap-in on the Active Directory domain controller.

## {heading(1. Add a rule for Windows Defender Firewall)[id=desktops-ad-windows-role-add]}

For the Cloud Desktop agent installed on virtual desktops to work, enable Windows Defender Firewall and allow inbound connections for the TCP port groups 16002–16005 and UDP 14010–14012.

1. Go to **Computer Configuration** → **Policies** → **Windows Security** → **Security Settings** → **Windows Defender Firewall with Advanced Security – Local Group Police Object**.
1. Follow the **Windows Defender Firewall Properties** link.
1. On the **Domain Profile** tab, in the **Firewall state** list, select `On (recommended)` and click **OK**.
1. Follow the **Inbound Rules** link.
1. In the context menu of the section, select **New Rule…**.
1. Select the **Port** option and click **Next**.
1. Select the **TCP** and **Specific local ports** options.
1. Specify the range of values `16002–16005` and click **Next**.
1. Select the **Allow the connection** option and click **Next**.
1. Select the **Domain** option and click **Next**.
1. Specify a name for the rule (for example, `Cloud Desktop API Inbound TCP`) and click **Finish**.
1. Similarly, add a second rule. For it, select the **UDP** option instead of **TCP**, specify the range of values `14010–14012` for the ports, and the rule name `Cloud Desktop API Inbound UDP`.

## {heading(2. Configure the security negotiation mechanism for the RDP session of connecting to virtual desktops)[id=desktops-ad-windows-rdp]}

To connect to virtual desktops via the TLS gateway, change the default settings of the terminal session protection level on the Cloud Desktop agent side.

1. Go to **Computer Configuration** → **Policies** → **Administrative Templates** → **Windows Components** → **Remote Desktop Services** → **Remote Desktop Session Host** → **Security**.
1. In the context menu of **Require use of specific security layer for remote (RDP) connections**, select **Edit**.
1. Select the **Enabled** option.
1. For the **Security Layer** parameter, select the value `RDP`.
1. Click **OK**.

## {heading(3. Allow end users to connect to virtual desktops)[id=desktops-ad-windows-connect]}

Allow users who belong to your domain group for the Cloud Desktop service to connect to virtual desktops via the RDP protocol.

1. Go to **Computer Configuration** → **Policies** → **Windows Security** → **Security Settings** → **Restricted Groups**.
1. Add the group `<YOUR_DOMAIN_NAME>\<NAME_OF_YOUR_AD_USER_GROUP>` as a member of the standard group `BUILTIN\Remote Desktop Users`.
1. Go to **Configuration** → **Policies** → **Administrative Templates** → **Windows Components** → **Remote Desktop Services** → **Remote Desktop Session Host** → **Connections**.
1. In the context menu of **Allow users to connect remotely using Remote Desktop Services**, select **Edit**.
1. Select the **Enabled** option and click **OK**.