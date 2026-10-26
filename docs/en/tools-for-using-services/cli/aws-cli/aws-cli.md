# {heading(AWS CLI installation)[id=tools-cli-aws]}

{include(/en/_includes/_translated_by_ai_en.md)}

The AWS Command Line Interface (AWS CLI) allows you to work with {var(cloud)} services via the console.

AWS CLI is available in two versions:

- Version 2.X — the current generally available version, it is preferable to use this version.
- Version 1.X — the previous version, available for backward compatibility.

{note:info}
The {var(s3)} service supports the following AWS CLI versions: 1.36.40 or lower, 2.22.35 or lower.
{/note}

Full information about the set of commands and additional AWS CLI settings is available on the [developer website](https://docs.aws.amazon.com/cli/index.html).

## {heading({counter(aws-cli)}. Install the AWS client)[id=aws-install]}

{tabs}

{tab(Linux)}
Requirements:

- 64-bit version of CentOS, Fedora, Ubuntu, Amazon Linux 1, Amazon Linux 2 and Linux ARM;
- ability to unpack the downloaded package: the `unzip` command or similar;
- `glibc`, `groff` and `less` packages installed and available.

For Linux x86 (64-bit), run:

```console
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

For Linux ARM, run:

```console
curl "https://awscli.amazonaws.com/awscli-exe-linux-aarch64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

{/tab}

{tab(macOS)}

Requirements:

- 64-bit version of macOS.

Installation:

1. Download and open the [AWS CLI MSI installer](https://awscli.amazonaws.com/AWSCLIV2.pkg) or run the command in the console:

   ```console
   curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o   "AWSCLIV2.pkg"
   sudo installer -pkg AWSCLIV2.pkg -target /
   ```

1. Follow the installation wizard instructions.

{/tab}

{tab(Windows)}

Requirements:

- 64-bit version of Windows;
- administrator rights.

Installation:

1. Download and open the [AWS CLI MSI installer](https://awscli.amazonaws.com/AWSCLIV2.msi) or run the command in the console:

   ```console
   msiexec.exe /i https://awscli.amazonaws.com/AWSCLIV2.msi
   ```

1. Follow the installation wizard instructions. By default, AWS CLI is installed to `C:\\Program Files\\Amazon\\AWSCLIV2`.

{/tab}

{/tabs}

## {heading({counter(aws-cli)}. Check the AWS installation)[id=aws-check]}

Run the command in the console:

```console
aws --version
```

If the AWS client is installed, its version will be displayed in the console output.