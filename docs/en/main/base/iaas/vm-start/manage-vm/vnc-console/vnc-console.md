VNC is used to view the console output of a virtual machine, regardless of whether there is output in the console log. This allows you to transfer keyboard and mouse activity to and from the instance.

VK CS uses two methods of accessing the remote console:

## VK CS Panel

To connect to a VM running Windows or Linux, you can use a web console using HTML5 Canvas and web sockets.

To activate it, go to the information window about the virtual machine by selecting the desired one in the list of instances of the Cloud Computing service.

When you go to the Console tab, the virtual machine console will appear in the browser window.

In the console window there is a button "Ctrl+Alt+Delete" that performs a function depending on the operating system of the instance.

It is also possible to set the operating system user password using the "Set password" button and open the Console in a new window.

## Openstack CLI

To access the console, you can use the command in the CLI:

```bash
openstack console url show <instance ID>
```

<warn>

The command generates a link to the console that is available for a short period of time.

</warn>

If you need to use the console again after a while, you should use the provided command again.

As a result, you will get a link to the console, which can be opened in the browser.:

```
+-------+-------------------------------------------------------------------------------------+
| Field | Value                                                                               |
+-------+-------------------------------------------------------------------------------------+
| type  | novnc                                                                               |
| url   | https://infra.mail.ru:6080/vnc_auto.html?token=20224980-43eb-4535-85c7-310a18e27941 |
+-------+-------------------------------------------------------------------------------------+
```
