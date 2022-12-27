Fluent Bit is an open source tool for collecting and processing logs. Fluent Bit collects, parses and filters messages from various input sources and stores them in storage. The messages then go to the router, which determines which exit to send them to. Plugins are used to work with various input and output sources.

Read more about Fluent Bit in the [official documentation](https://docs.fluentbit.io/manual).

### Connecting the fluent-bit plugin

1. Clone the repository with the plugin code:

```
git clone https://github.com/vk-cs/cloudlogs-fluent-bit
```

2. Compile the cloudlogs-fluent-bit library:

```
cd cloudlogs-fluent-bit
```
```
make
```

### Testing the fluent-bit plugin

For the plugin to work, you need to specify the following parameters:

| Parameter | Meaning | Where to find |
| -------------- | ----------------------- | --------------------------------- |
| serverHostPort | Logging service address | Specify cloudlogs.mcs.mail.ru:443 |
| project-id | ID of the project where the logs will be stored | Project ID [on the page](https://mcs.mail.ru/app/any/project/keys) |
| auth-url | Authorization service address | Auth URL [on the page](https://mcs.mail.ru/app/any/project/keys) |
| user-name | Login of the user who writes the logs | |
| password | Password of the user who writes the logs | |

<details>
  <summary markdown="span">Run example</summary>

```bash
/opt/fluent-bit/bin/fluent-bit -i dummy -e ./vkcloudlogs-fluent-bit.so -o vkcloudlogs -p"serverHostPort=cloudlogs.mcs.mail.ru:443" -p"auth-url =https://infra.mail.ru:35357/v3/" -p"user-name=<user name>" -p"password=<password>" -p"project-id=<project>"
```
</details>
