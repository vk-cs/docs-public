1. Edit the group policy that configures the remote desktop licensing type:

   1. Connect to the RDS server.
   1. Open the group policy editor:

      1. Right-click **Start** and select **Run**.
      1. Enter `gpedit.msc` and click **OK**.

   1. Go to **Computer Configuration** → **Administrative Templates** → **Windows Components** → **Remote Desktop Services** → **Remote Desktop Session Host** → **Licensing**.
   1. Right-click the **Set the Remote Desktop licensing mode** policy and select **Properties**.
   1. Change the policy type to the one you need: **Per Device** or **Per User**.
   1. Apply the changes.
