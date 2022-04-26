The Cloud Queues service from VK Cloud Solutions is compatible with the Amazon SQS API. To work with the queue service, you can use the [AWS CLI] tool (https://aws.amazon.com/ru/cli /) to execute commands using the command-line shell.

With the AWS CLI, you can do the following:

- Creating and deleting message queues;
- Sending, viewing, and deleting messages in queues;
- Editing message and queue attributes;
- Changing the rights of users who have access to editing queues.

On this page, you will learn:

- How to Get Started with Cloud Queues in AWS CLI;
- How to form commands in AWS CLI;
- Examples of commands.

Before you start working with the Cloud Queues service, read the service restrictions in the [Important restrictions] section (https://mcs.mail.ru/docs/ru/manage/cloud-queues/cloud-queues-limitations ).

## Getting Started with Cloud Queues in AWS CLI

To start working with Cloud Queues in the AWS CLI, you need to complete several steps:

1. Install the AWS CLI;
2. Create access keys to gain access to the AWS CLI;
3. Configure the AWS CLI to work with Cloud Queues.

## Installing the CLI

To install CLI v2, you need to perform the installation procedure corresponding to the operating system installed on your computer:

### Linux

#### Preliminary requirements

- The ability to extract or "unzip" the downloaded package. If there is no built-in unzip command in the operating system, the equivalent should be used.
- The AWS CLI version 2 uses the **glibc**, **groff** and **less** libraries. They are included by default in most major Linux distributions.

#### Installation

##### For Linux x86 (64-bit)

Run the following commands in the terminal:

```
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

##### For Linux ARM

Run the following commands in the terminal:

```
curl "https://awscli.amazonaws.com/awscli-exe-linux-aarch64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

#### Check the correctness of the installation

Run the following command in the terminal::

```
aws --version
```

### MacOS

#### Installation

Installation for macOS is done using the standard macOS user interface and browser. Follow the instructions:

1. Download the [macOS pkg] file in the browser (https://awscli.amazonaws.com/AWSCLIV2.pkg );
2. Double-click the downloaded file to launch the installer;
3. Follow the on-screen instructions.

#### Check the correctness of the installation

You can check the correctness of the installation by running the following command in the terminal:

```
aws --version
```

### Windows

#### Preliminary requirements

Before installing AWS CLI version 2 on Windows, you need to make sure that the following is available:

- 64-bit version of Windows XP or later;
- Administrator rights to install the software.

#### Installation

Follow the instructions to install:

1. Download the [AWS CLI MSI Installer](https://awscli.amazonaws.com/AWSCLIV2.msi) for Windows (64-bit version);
2. Run the downloaded MSI installer and follow the on-screen instructions. By default, the AWS command-line interface is set to **C:\Program Files\Amazon\AWSCLIV2**.

#### Confirm the installation is correct

To confirm the installation, you can use the standard Windows Command Line interface (cmd) by running the following command:

```
aws --version
```

## Getting Cloud Queues Access Keys

Access keys consist of an access key identifier and a secret access key used to sign program requests sent to VK CS. You can create access keys in the VK CS panel in the "Access Keys" menu.

You can only view or download a secret access key when the keys are created, and it will be impossible to restore them later. However, you can create new access keys at any time.

## Configuring the CLI

The fastest way to set up an AWS CLI installation is with the command:

```
aws configure
```

When you enter this command, the AWS command-line interface asks for four pieces of information:

- **Access Key ID** - the received key ID data is used when adding an account;
- **Secret access key** - the received secret key data is used when adding an account;
- **AWS region** – S3 service location region, by default it is ru-msk;
- **Output format** - defines how to format the output of the command used. If the output format is not specified, it will use JSON by default. Available options: JSON, YAML, text, and table.

An example of an AWS CLI configuration command looks like this:

```
aws configure
AWS Access Key ID [**************** rtP7]: <access key ID>
AWS Secret Access Key [**************** F2OP]: <secret access key>
Default region name [eu-west-1]: ru-msk
Default output format [None]:
```

The AWS command-line interface stores this information in a profile (a set of settings) called **default** in the **credentials** file. By default, the information in this profile is used when an AWS command-line interface command is run that does not explicitly specify the profile to use.

## Using AWS CLI Commands with Cloud Queues

The AWS CLI uses composite syntax to form commands:

```
aws sqs --endpoint-url https://sqs.mcs.mail.ru <command name> [options and parameters]
```

- 'aws sqs` - calling the Cloud Queues service;

- `<command name>` – the name of the operation being performed;

- `--endpoint-url https://sqs.mcs.mail.ru` – for all commands, the `--endpoint-url` parameter must be specified with the value `https://sqs.mcs.mail.ru` for the normal operation of the service;

- `[options and parameters]' – additional parameters of the operation being performed.

You can use the 'aws sqs help' command to call help for available commands.

A complete list of all commands available in the AWS CLI for working with Cloud Queues can also be seen on [website Amazon](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/sqs/index.html#available-commands).

## Examples of commands

### Creating standard and FIFO message queues

The following examples show how to create a standard and FIFO message queue via the AWS CLI.

- Creating a standard queue called "test-queue":

```
aws sqs create-queue --endpoint-url https://sqs.mcs.mail.ru   --queue-name test-queue
```

- Creating a FIFO queue called "test-queue":

```
aws sqs create-queue --endpoint-url https://sqs.mcs.mail.ru --queue-name test-queue --attributes FifoQueue
```

### Creating a message in a queue

The following command will create a message in the "test-queue" message queue:

```
aws sqs send-message --endpoint-url https://sqs.mcs.mail.ru --queue-url sqs.mcs.mail.ru/mcsprojectid/test-queue --message-body "test message body"
```

### Receiving messages in the queue

The following command will return the text of the messages in the "test-queue" queue:

```
aws sqs receive-message --endpoint-url https://sqs.mcs.mail.ru --queue-url sqs.mcs.mail.ru/mcsprojectid/test-queue
"'
### Deleting a message in the queue

The following command will delete the message with the `Receipt-handle AQEB6nR4' parameter... HzlvZQ==' in the "test-queue" queue:

```

aws sqs delete-message --endpoint-url https://sqs.mcs.mail.ru --queue-url sqs.mcs.mail.ru/mcsprojectid/test-queue --receipt-handle AQEB6nR4...HzlvZQ==
