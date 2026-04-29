{include(/kz/_includes/_translated_by_ai.md)}

[WordPress](https://wordpress.org) ― PHP тілінде жазылған және MySQL деректер қорын пайдаланатын контентті басқару жүйесі (CMS). Блогтарды, сайттарды немесе веб-қосымшаларды жасауға мүмкіндік береді.

Бұл нұсқаулық VK Cloud-та Almalinux 9 операциялық жүйесінде WordPress CMS-тің соңғы нұсқасын өрістетуге, сондай-ақ домендік ат арқылы қол жеткізу үшін DNS жазбасын баптауға көмектеседі. ДҚБЖ ретінде Single конфигурациясындағы MySQL 8.0 пайдаланылады.

## Дайындық қадамдары

1. VK Cloud-та [тіркеліңіз](/kz/intro/onboarding/account).
1. Интернетке қолжетімділігі бар және `10.0.0.0/24` ішкі желісі бар `network1` желісін [жасаңыз](/kz/networks/vnet/instructions/net#zhelini_zhasau).
1. [ВМ жасаңыз](/kz/computing/iaas/instructions/vm/vm-create):

   - атауы: `Almalinux_9_WP`;
   - операциялық жүйе: Almalinux 9;
   - желі: `10.0.0.0/24` ішкі желісі бар `network1`;
   - жария IP-мекенжайын тағайындаңыз. Мысалда `212.233.95.135` пайдаланылады;
   - қауіпсіздік топтары: `default`, `ssh+www`.

1. [ДҚ инстансын жасаңыз](/kz/dbs/dbaas/instructions/create/create-single-replica):

   - атауы: `MySQL-9341`;
   - ДҚБЖ: MySQL 8.0;
   - конфигурация түрі: Single;
   - желі: `network1`;
   - ДҚ атауы: `wordpress-db`;
   - ДҚ пайдаланушысының аты: `wordpress`;
   - пайдаланушы құпиясөзі: `AN0r25e0ae4d626p`;

   Мысалда жасалған инстанстың ішкі IP-мекенжайы: `10.0.0.7`.

1. DNS аймағын [жасаңыз](/kz/networks/dns/instructions/publicdns/dns-zone#add).

   {note:warn}

   DNS аймағы сәтті делегацияланғанына және NS жазбалары дұрыс бапталғанына көз жеткізіңіз: аймақ **NS жазбалары дұрыс бапталған** күйінде болуы тиіс.

   {/note}

1. Бөлінген аймақта жазба [жасаңыз](/kz/networks/dns/instructions/publicdns/records#add):

   - жазба түрі: `A`;
   - атауы: мысалы, `site-wp.example.vk.cloud`;
   - IP-мекенжайы: ВМ-нің сыртқы мекенжайы `212.233.95.135`.

1. (Қосымша) `nslookup site-wp.example.vk.cloud` командасының көмегімен атаудың IP-мекенжайға шешілетінін тексеріңіз. Операция сәтті орындалған кезде шығатын нәтиже:

   ```console
   Non-authoritative answer:
   Name:   site-wp.example.vk.cloud
   Address: 212.233.95.135
   ```

## 1. WordPress-ті ВМ-ге орнатыңыз

1. `Almalinux_9_WP` ВМ-іне [қосылыңыз](/kz/computing/iaas/instructions/vm/vm-connect/vm-connect-nix).
1. Пакеттерді өзекті нұсқаға дейін жаңартыңыз және ВМ-ді келесі командалар арқылы қайта жүктеңіз:

   ```console
   sudo dnf update -y
   sudo systemctl reboot
   ```

1. Қажетті репозиторийлерді жүктеп, командаларды ретімен орындаңыз:

   ```console
   sudo dnf install https://dl.fedoraproject.org/pub/epel/epel-release-latest-9.noarch.rpm -y
   sudo dnf install https://rpms.remirepo.net/enterprise/remi-release-9.rpm -y
   sudo dnf module enable php:remi-8.2 -y
   sudo dnf install wget httpd php php-mysqlnd php-gd php-intl php-bcmath php-pecl-zip -y
   ```

1. httpd-демонын іске қосыңыз:

   ```console
   sudo systemctl enable httpd.service --now
   ```

1. WordPress CMS репозиторийін жүктеп, оны іске қосылған веб-серверге өрістетіңіз:

   ```console
   sudo wget https://wordpress.org/latest.tar.gz
   sudo tar xzf latest.tar.gz -C /var/www/html/
   sudo chown -R apache:apache /var/www/html/wordpress/
   ```

1. Веб-сервердің дұрыс жұмыс істеуі үшін SELinux параметрлерін орнатыңыз:

   ```console
   sudo setsebool -P httpd_can_network_connect on
   sudo setsebool -P httpd_unified on
   sudo setsebool -P httpd_enable_cgi on
   sudo setsebool -P httpd_builtin_scripting on
   ```

1. Браузерде ВМ-нің жария IP-мекенжайын `/wordpress` жолымен енгізіңіз. Осы нұсқаулықта бұл `site-wp.example.vk.cloud/wordpress`.
1. Орнату шеберінде ағылшын тілін таңдап, CMS орнату туралы ақпаратпен танысыңыз.
1. `MySQL-9341` параметрлерін көрсетіңіз:

   - **Database name**: `wordpress-db`.
   - **Username**: `wordpress`.
   - **Password**: `AN0r25e0ae4d626p`.
   - **Database Host**: `10.0.0.7`.
   - **Table Prefix**: `wp_`

1. CMS тіркелгі деректерін көрсетіңіз:

   - **Site Title**: `site-wp.example.vk.cloud`.
   - **Username**: `admin`.
   - **Password**: әкімші құпиясөзін ойлап табыңыз.
   - **Your Email**: CMS әкімшісінің email мекенжайын көрсетіңіз.

1. **Install WordPress** түймесін басыңыз.

## 2. WordPress жұмыс қабілеттілігін тексеріңіз

1. Браузерде `http://site-wp.example.vk.cloud/wordpress/` мекенжайына өтіңіз.
1. Авторизация терезесінде CMS әкімшісінің логині мен құпиясөзін енгізіңіз.

WordPress CMS әкімші панелі ашылады.

## Пайдаланылмайтын ресурстарды жойыңыз

Өрістетілген виртуалды ресурстар тарифтелмейді. Егер олар енді қажет болмаса:

- `Almalinux_9_WP` ВМ-ін [жойыңыз](/kz/computing/iaas/instructions/vm/vm-manage#delete_vm).
- `MySQL-9341` ДҚ инстансын [жойыңыз](/kz/dbs/dbaas/instructions/manage-instance/mysql#bd_instansyn_nemese_onyn_hosttaryn_zhoyu).
- Қажет болса, `212.233.95.135` Floating IP-мекенжайын [жойыңыз](/kz/networks/vnet/instructions/ip/floating-ip#delete).
- Жасалған `site-wp.example.vk.cloud` DNS жазбасын [жойыңыз](/kz/networks/dns/instructions/publicdns/records#resurstyk_zhazbalardy_zhoyu).
