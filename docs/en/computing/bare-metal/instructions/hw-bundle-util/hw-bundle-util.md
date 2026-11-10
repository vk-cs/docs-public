# {heading(Collecting diagnostic data with hw-bundle-util)[id=bare-metal-instructions-hw-bundle-util]}

{include(/en/_includes/_translated_by_ai_en.md)}

The {linkto(../../concepts/hw-bundle-util#bare-metal-concepts-hw-bundle-util)[text=hw-bundle-util utility]} is used to collect diagnostic data from a Bare Metal server.

1. Install the missing packages with the {linkto(../../concepts/hw-bundle-util#bare-metal-concepts-hw-bundle-util-collect)[text=auxiliary utilities]} that `hw-bundle-util` uses:

   {tabs}

   {tab(Red Hat Enterprise Linux)}

   ```console
   sudo dnf install -y dmidecode ethtool bind-utils smartmontools rasdaemon edac-utils
   ```

   {/tab}

   {tab(Ubuntu/Debian)}

   ```console
   sudo apt update && \
   sudo apt install -y dmidecode ethtool dnsutils smartmontools rasdaemon edac-utils
   ```

   {/tab}

   {/tabs}

1. Download and unpack the archive with the utility, and then make the file executable. Select the command for your server architecture:

   {tabs}

   {tab(amd64)}

   ```console
   curl -fLO https://bm-hw-testing-util-art.hb.ru-msk.vkcloud-storage.ru/hw-bundle-util/latest/hw-bundle-util_linux_amd64.tar.gz && \
   tar -xvf ./hw-bundle-util_linux_amd64.tar.gz && \
   chmod +x ./hw-bundle-util
   ```

   {/tab}

   {tab(arm64)}

   ```console
   curl -fLO https://bm-hw-testing-util-art.hb.ru-msk.vkcloud-storage.ru/hw-bundle-util/latest/hw-bundle-util_linux_arm64.tar.gz && \
   tar -xvf ./hw-bundle-util_linux_arm64.tar.gz && \
   chmod +x ./hw-bundle-util
   ```

   {/tab}

   {/tabs}

1. Run `hw-bundle-util` with the required {linkto(../../concepts/hw-bundle-util#bare-metal-concepts-hw-bundle-util-launch)[text=parameters]}. If it is run without additional parameters, the `bmaas-bundle.tar.gz` archive is created next to the `hw-bundle-util` executable file. If such a file already exists, it is overwritten.

   To get the most complete diagnostic data, it is recommended to run `hw-bundle-util` with superuser privileges using the `sudo` command:

   ```console
   sudo ./hw-bundle-util
   ```

1. Wait for `hw-bundle-util` to finish.
1. Check the {linkto(../../concepts/hw-bundle-util#bare-metal-concepts-hw-bundle-util-exit-codes)[text=return code]}:

   ```console
   echo $?
   ```

   If all data is collected successfully, the output contains the code `0`.

1. Check the resulting report. To do this, unpack the report archive:

   ```console
   tar -xvf bmaas-bundle.tar.gz
   ```

1. Check the required files. For detailed information about the report contents, see {linkto(../../concepts/hw-bundle-util#bare-metal-concepts-hw-bundle-util-report)[text=%text]}.
