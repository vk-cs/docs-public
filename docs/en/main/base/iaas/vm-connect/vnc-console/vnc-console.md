VNC is used to view the console output of a virtual machine, regardless of whether there is output in the console log. This allows keyboard and mouse activity to be passed to and from the instance.

VK CS uses two methods to access the remote console:

## VK CS panel

You can use a web console using HTML5 Canvas and web sockets to connect to a Windows or Linux VM.

To activate it, go to the information window about the virtual machine by selecting the desired one in the list of instances of the "Cloud computing" service.

![](./assets/1597094489258-1597094489258.png)

When you go to the "Console" tab, the virtual machine console will appear in the browser window.

![](./assets/1597094896022-1597094896022.png)

In the console window there is a "Ctrl + Alt + Delete" button that performs a function depending on the operating system of the instance.

It is also possible to set a password for an operating system user using the "Set Password" button and open the Console in a new window.

## Openstack CLI

To access the console, you can use the command in the CLI:

```
 openstack console url show <instance ID>
```

**Attention**

The command generates a link to the console, available for a short period of time.

If you need to use the console again after a while, you should use the provided command again.

As a result, a link to the console will be obtained, which can be opened in a browser:

```
 + ------- + ----------------------------------------- -------------------------------------------- +
| Field | Value |
+ ------- + ----------------------------------------- -------------------------------------------- +
| type | novnc |
| url | https://infra.mail.ru:6080/vnc_auto.html?token=20224980-43eb-4535-85c7-310a18e27941 |
+ ------- + ----------------------------------------- -------------------------------------------- +
```
