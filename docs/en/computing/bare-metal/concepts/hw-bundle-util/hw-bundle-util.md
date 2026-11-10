# {heading(hw-bundle-util diagnostic utility)[id=bare-metal-concepts-hw-bundle-util]}

{include(/en/_includes/_translated_by_ai_en.md)}

`hw-bundle-util` is a Linux utility from {var(cloud)} for collecting diagnostic data from a Bare Metal server. The utility gathers information about the hardware and the OS into a single archive, for example, to attach to a request to [technical support](/en/contacts).

The utility is run manually by the user in the OS. The following Linux distributions (`amd64` and `arm64`) are supported:
- Ubuntu 18.04/20.04/22.04/24.04,
- Debian 10/11/12,
- CentOS 8, CentOS Stream 9,
- AlmaLinux 8/9,
- Rocky Linux 8/9,
- RED OS 7/8.

Some diagnostic information is available only with superuser privileges, so it is recommended to {linkto(../../instructions/hw-bundle-util#bare-metal-instructions-hw-bundle-util)[text=run]} `hw-bundle-util` using `sudo` or directly from the `root` account.

The utility does not modify user data or OS settings. After the launch, a directory for collecting diagnostic {linkto(#bare-metal-concepts-hw-bundle-util-collect)[text=information]} is created next to the executable file. By default, after `hw-bundle-util` completes successfully and the {linkto(#bare-metal-concepts-hw-bundle-util-report)[text=report]} is generated, all temporary files are deleted. If necessary, you can set custom launch {linkto(#bare-metal-concepts-hw-bundle-util-launch)[text=parameters]}.

## {heading(Collected information)[id=bare-metal-concepts-hw-bundle-util-collect]}

To collect information about various system components, auxiliary utilities available in most Linux distributions are used. System information is also read from the `procfs` virtual file system.

`hw-bundle-util` uses the following sources:

- Bare Metal server platform characteristics (motherboard, processor, memory, BIOS/UEFI version): `dmidecode`.
- OS parameters and system metrics: `hostname`, `hostnamectl`, `lscpu`, `/proc/cpuinfo`, `uname`, `/etc/os-release`, `/proc/uptime`, `/proc/loadavg`.
- RAM state: `free -h`, `/proc/meminfo`.
- File system and storage device parameters: `lsblk`, `blkid`, `/sys/block`, `/proc/partitions`.
- SMART metrics: extended `smartctl` output for each detected device.
- Hardware errors from the EDAC subsystem: `/sys/devices/system/edac`, `ras-mc-ctl`, `edac-util`, `/var/log/mcelog`, `rasdaemon` records, and the kernel log (`dmesg`).
- Kernel log `dmesg -T` for the last 24 hours, `journalctl --dmesg`, and the latest entries of `/var/log/kern.log`.
- Network state: network interface parameters via `ethtool`, DNS configuration and name resolution check for `vk.ru` and `cloud.vk.ru` (`dig`), connectivity check (`ping`) to the gateway, the addresses of `vk.ru` and `cloud.vk.ru`, and the public DNS servers `8.8.8.8`, `8.8.4.4`, `77.88.8.8`, `77.88.8.88`.
- Current time and system time parameters: `date`, `timedatectl`.
- System files: copies of `/proc/cmdline`, `/proc/uptime`, `/proc/cpuinfo`, `/proc/meminfo`, `/proc/sys/kernel/tainted`, `/etc/os-release`, and the last 10000 bytes of `/var/log/syslog` or `/var/log/messages`.

Network speed is not tested.

## {heading(Report contents)[id=bare-metal-concepts-hw-bundle-util-report]}

When the utility finishes, the `bmaas-bundle.tar.gz` archive with the following structure is created next to the executable file:

```text
bmaas-bundle.tar.gz
├── log.log
└── bundle/
    ├── hw-bundle-util.version
    ├── sanitize.legend
    ├── collect/
    ├── exec/
    │   └── <CHECK>/
    │       ├── <UTILITY_NAME>[.<DETAIL>].stdout
    │       ├── <UTILITY_NAME>[.<DETAIL>].stderr
    │       ├── <UTILITY_NAME>.version
    │       └── legend
    └── collection.incomplete
```
Where:

- `log.log`: the `hw-bundle-util` operation log.
- `bundle/hw-bundle-util.version`: the version of `hw-bundle-util` that was used to generate the report.
- `bundle/sanitize.legend`: the list of values that were replaced in the kernel boot parameters before the report was packed.
- `bundle/collect/`: OS files copied from the system. The copy of `/proc/cmdline` is cleared of secrets beforehand.
- `bundle/exec/<CHECK>/`: results of calling auxiliary utilities. A separate directory is created for each check, containing:

  - `<UTILITY_NAME>[.<DETAIL>].stdout` and `<UTILITY_NAME>[.<DETAIL>].stderr`: files with the output from the standard output stream `stdout` and from the standard error stream `stderr`. If the auxiliary utility produced no diagnostic or debug messages, the `stderr` file is absent.

    Here `<DETAIL>` is additional information about the check. For example, for `ethtool`, the interface name is specified: `ethtool.eth0`.

  - `<UTILITY_NAME>.version`: the version of the auxiliary utility.
  - `legend`: a summary of the auxiliary utility launch: arguments and reasons for missing results.

- `bundle/collection.incomplete`: the list of checks that could not be completed, with the reasons. The file is created only if the data is not collected completely, for example, because a required auxiliary utility is missing in the system or the utility was run without root privileges.

Before the report is created, credentials that appear in the kernel boot parameters are cleared. Removal is performed using known patterns of storing sensitive information, as well as the keywords `password`, `passwd`, `token`, `secret`, `credential`, `apikey`, `api_key`, `accesskey`, `access_key`. In place of the removed value, an entry like `secret:S0:secret-key:len=<CHARACTER_COUNT>:fp=<FINGERPRINT>` remains, and the rest of the line is not changed. Here `<FINGERPRINT>` is a sequence of characters that is the same for the same secret. This way, you can find out where and which secret is used without disclosing its contents. If you run the utility again, the entries for the same secrets in the new archive will differ. This happens because the fingerprint is regenerated on each run.

Cleaning is applied to the `collect/cmdline` file, as well as to the output of `exec/kernel/dmesg.stdout` and `journalctl.stdout`. The rest of the content is included in the archive unchanged: the output of auxiliary utilities, copies of files from `/proc`, `/sys`, and `/etc`, and the operation log of the utility itself. From `/var/log/syslog` or `/var/log/messages` and `/var/log/kern.log`, only the latest entries are included in the archive, not the entire file.

{note:warn}
The method that `hw-bundle-util` uses to search for secrets does not cover all possible formats of storing sensitive information. Before sharing the resulting report outside the Bare Metal server, it is recommended to check the result.
{/note}

## {heading(Commands and launch parameters)[id=bare-metal-concepts-hw-bundle-util-launch]}

Launch format:

```console
./hw-bundle-util [COMMAND] [OPTIONS]
```

### {heading(Commands)[id=bare-metal-concepts-hw-bundle-util-launch-command]}

[cols="1,4",options="header"]
|===
|Command
|Purpose

|`collect`
|Collecting diagnostic data. Used by default if no command is specified

|`version`
|Displaying the utility version
|===

### {heading(Parameters)[id=bare-metal-concepts-hw-bundle-util-launch-options]}

[cols="2,1,4",options="header"]
|===
|Parameter
|Default value
|Purpose

3+|**Help**

|`--help`
|—
|Displaying help. `./hw-bundle-util --help` shows help for the utility, `./hw-bundle-util collect --help` shows help for the collection parameters

3+|**Working directory and logging parameters of the `collect` command**

|`--working-dir`
|`./bmaas-bundle`
|Working directory. The archive is created next to it and has the same name but with the `.tar.gz` extension. If the directory already exists, its contents are overwritten when the utility is run

|`--console-log-level`
|`info`
|Verbosity of terminal output. Valid values: `debug`, `info`, `warn`, `error`

|`--file-log-level`
|`debug`
|Verbosity of writing to the `log.log` file inside the archive. Valid values: `debug`, `info`, `warn`, `error`

|`--no-cleanup`
|Not used
|Do not delete the collected directory tree after the archive is created. By default, it is deleted because the archive already contains the same data

3+|**Archive upload parameters of the `collect` command**

|`--upload-url`
|—
|URL to which the archive must be sent. If the parameter is not specified, the archive is saved only on disk next to the executable file or in the directory set by the `--working-dir` parameter

|`--upload-method`
|`S3`
|Upload method. Valid values: `S3`, `PUT`, `POST`. For any other value, the utility exits with return code `3`. Used together with `--upload-url`. If `--upload-url` is missing, the `--upload-method` parameter is ignored

|`--upload-timeout`
|`10m`
|Time limit for the upload

|`--additional-headers`
|—
|Additional HTTP header in the `'key: value'` format. The parameter can be specified multiple times

|`--skip-ssl`
|Not used
|Do not verify the server certificate. Used in environments with a self-signed certificate
|===

## {heading(Return codes)[id=bare-metal-concepts-hw-bundle-util-exit-codes]}

[cols="1,4",options="header"]
|===
|Code
|Description

|`0`
|Success: the report is collected completely

|`1`
|Unexpected error

|`3`
|Error in command-line arguments

|`4`
|Unknown command passed

|`6`
|Failed to create the archive

|`7`, `14`
|Failed to create the directory

|`8`
|Failed to create the file

|`9`
|Failed to write the file

|`10`
|Failed to send the archive

|`11`, `12`
|Failed to determine the working directory

|`13`
|Failed to delete the directory

|`100`
|The report is collected and delivered, but some checks produced no data. For details, see the `collection.incomplete` file

|`130`
|Interrupted by `SIGINT` (`CTRL+C`)

|`143`
|Interrupted by `SIGTERM`
|===
