The S3 CLI, or S3 Command Line Interface, is a single tool for managing S3 services based on the AWS S3 toolkit. With just one tool downloaded, it is possible to control many VK Cloud S3 services from the command line and automate them with scripts.

The S3 CLI introduces a new set of simple commands to efficiently receive and send files to VK Cloud S3.

With minimal configuration, the S3 CLI allows you to run commands from the command line in a terminal program:

- Linux shells are common shell programs such as bash, zsh, and tcsh for executing commands on Linux or macOS.
- Windows Command Prompt - On Windows, you run commands from the Windows Command Prompt or PowerShell.

The S3 CLI is available in two versions, and the information in this guide applies to both, unless otherwise noted.

- Version 2.x is the current generally available version of the S3 CLI for use in production environments.
- Version 1.x is the previous version of the AWS CLI available for backward compatibility.

Full information about the set of commands and additional CLI settings is available on [the developer's website](https://docs.aws.amazon.com/cli/index.html).

## CLI installation

To install S3 CLI v2 in the operating system, you must install the appropriate package:

**Linux**

Prerequisites:

Ability to extract or "unzip" a downloaded package. If the operating system does not have a built-in unzip command, use the equivalent.

AWS CLI version 2 uses glibc, groff, and less. They are included by default in most major Linux distributions.

For Linux x86 (64-bit):

```
 curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

For Linux ARM

```
 curl "https://awscli.amazonaws.com/awscli-exe-linux-aarch64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

Check the correctness of the installation:

```
 aws --version
```

**MacOS**

Installation for MacOS is done using the standard MacOS user interface and browser:

1.  Load the [macOS pkg](https://awscli.amazonaws.com/AWSCLIV2.pkg) file in your browser.
2.  Double-click the downloaded file to launch the installer.
3.  Follow the instructions on the screen.

You can check the correctness of the installation in the terminal:

```
 aws --version
```

**Windows**

Before installing AWS CLI v2 on Windows, you must ensure that you have the following:

- Windows XP 64-bit or newer.
- Administrator rights to install software

For installation:

Download [the MSI AWS CLI Installer](https://awscli.amazonaws.com/AWSCLIV2.msi) for Windows (64-bit).

Run the downloaded MSI installer and follow the instructions on the screen. By default, the AWS CLI is installed to C: \\ Program Files \\ Amazon \\ AWSCLIV2.

You can use the Windows Standard Command Line Interface (cmd) to confirm the installation:

```
 aws --version
```

## Accessing the CLI

Access keys consist of an access key identifier and a secret access key, which are used to sign software requests sent to VK Cloud. If access keys are missing, they can be created in the VK Cloud Control Panel.

The only time the private access key can be viewed or downloaded is when the keys are generated. It will be impossible to restore them later. However, you can create new access keys at any time.

In the VK Cloud panel, in the "Accounts" menu of the "Object Storage" service, you need to add an account, and save the received keys for future use.

## CLI setup

The fastest way to customize your AWS CLI installation is with the command:

```
 aws configure
```

When you enter this command, the AWS CLI prompts for four pieces of information:

- Access key identifier - the received key identifier data is used when adding an account.
- Secret access key - the received secret key data is used when adding an account.
- AWS region - the region where the S3 service is located, by default it is ru-msk.
- Output Format - Determines how to format the output of the command being used. If no output format is specified, it will use `json` by default. [Available options](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html):

  - `json` – The output is formatted as a JSON string.
  - `yaml` – The output is formatted as a YAML string.
  - `yaml-stream` – The output is streamed and formatted as a YAML string. Streaming allows for faster handling of large data types.
  - `text` – The output is formatted as multiple lines of tab-separated string values. This can be useful to pass the output to a text processor, like grep, sed, or awk.
  - `table` – The output is formatted as a table using the characters `+|-` to form the cell borders. It typically presents the information in a "human-friendly" format that is much easier to read than the others, but not as programmatically useful.

The AWS CLI stores this information in a profile (set of settings) called default in the credentials file. By default, the information in this profile is used when you run an AWS CLI command that does not explicitly specify the profile to use.

## Features:

When using the AWS CLI to work with Object Storage, there are a few things to keep in mind:

- The AWS CLI treats VK Cloud S3 as a hierarchical file system and object keys are in the form of a file path.
- When running the aws command to work with VK Cloud S3, the `--endpoint-url` parameter is required because the client is configured by default to work with Amazon servers.
- Bucket creation should be done using the appropriate `--endpoint-url` - [http://hb.bizmrg.com](http://hb.bizmrg.com) for the Hotbox bucket and [http://ib.bizmrg.com](http://ib.bizmrg.com) for the Icebox bucket.
- Any operations cannot be performed using the CLI with the Backup bucket class.
- When using the storage classes `--storage-class`, the `STANDARD` values for Hotbox and `STANDARD_IA` for Icebox apply.
- When working in MacOS, in some cases it is required to run the following view:

```
 export PYTHONPATH =/Library/Python/2.7/site-packages; aws s3 <command> --endpoint-url=http://hb.bizmrg.com
```

## Examples of using

Create a hotbox bucket:

```
 aws s3 mb s3: // <bucket_name> --endpoint-url http://hb.bizmrg.com
```

Creating an icebox bucket:

```
 aws s3 mb s3: // <packet_name> --endpoint-url http://ib.bizmrg.com
```

Changing the bucket storage class:

```
 aws s3api create-bucket --bucket <bucket_name> --endpoint-url <destination storage class URL> --cli-input-json "{\" Bucket \ ": {\" storage-class \ ": \" <destination_class_value > \ "}}"
```

File upload

```
 aws s3 cp <path_to_local_file> s3: // <packet_name> --endpoint-url http://hb.bizmrg.com
```

Downloading an object

```
 aws s3 cp s3: // <batch_name> / <key_name> <path_to_local_file> --endpoint-url http://hb.bizmrg.com
```

Synchronizing a local directory with a bucket

```
 aws s3 sync <local_directory> s3: // <package_name> --endpoint-url http://hb.bizmrg.com
```

Moving an object

```
 aws s3 mv s3: // <batch_name> / <source_key_name> s3: // <bucket_name> / <destination_key_name> --endpoint-url http://hb.bizmrg.com
```

Getting a list of objects

```
 aws s3 ls s3: // <bucket_name> --endpoint-url http://hb.bizmrg.com
```

Deleting an Object

```
 aws s3 rm s3: // <bucket_name> / <key_name> --endpoint-url http://hb.bizmrg.com
```

Removing a multi-component object

```
 aws s3api abort-multipart-upload --bucket <bucket_name> --endpoint-url http://hb.bizmrg.com --key large_test_file --upload-id <multipart_upload_object_ID>
```
