{include(/kz/_includes/_translated_by_ai.md)}

## 1. Көшіру мүмкіндігін тексеріңіз

Hyper-V виртуалды машинасы келесі талаптарға сай болуы керек:

- ВМ операциялық жүйесінің архитектурасы 64 бит болуы керек;
- ағымдағы пайдаланушының әкімші құқықтары болуы керек;
- ВМ-ге кемінде бір диск қосылған болуы керек;
- ВМ BIOS эмуляциясын пайдалануы керек.

{note:info}

UEFI эмуляциясы бар ВМ-ді көшіру үшін [Hystax](../migrate-hystax-mr) пайдаланыңыз немесе деректерді BIOS эмуляциясы бар жаңа Hyper-V виртуалды машинасына көшіріңіз.

{/note}

## 2. ВМ-ді көшіруге дайындаңыз

{tabs}

{tab(Linux)}

1. Жүйеде VirtIO драйверлерінің бар-жоғын [тексеріңіз](../check-virtio).
2. QEMU Guest Agent бар-жоғын тексеріңіз:

   ```console
   systemctl status qemu-guest-agent
   ```

   Қажет болса, [орнатыңыз](https://pve.proxmox.com/wiki/Qemu-guest-agent) QEMU Guest Agent.

{/tab}

{tab(Windows)}

1. [Орнатыңыз](https://github.com/virtio-win/virtio-win-pkg-scripts/blob/master/README.md) VirtIO драйверлерін.
2. [Орнатыңыз](https://pve.proxmox.com/wiki/Qemu-guest-agent) QEMU Guest Agent.
3. Windows тізіліміне драйверлер туралы ақпаратты қосыңыз:

   1. [Жүктеп алыңыз](http://migration.platform9.com.s3-us-west-1.amazonaws.com/virtio.reg) Virtio Registry File.
   2. Файлды іске қосып, тізілімге өзгерістер енгізуге рұқсат беріңіз.

{/tab}

{/tabs}

## 3. Виртуалды машинаны экспорттаңыз

{tabs}

{tab(Hyper-V диспетчері)}

1. Виртуалды машинаны тоқтатыңыз.
2. Hyper-V диспетчерін іске қосыңыз.
3. Қажетті виртуалды машинаны тінтуірдің оң жақ батырмасымен шертіп, **Экспорт** тармағын таңдаңыз.
4. ВМ файлдарын орналастыратын орынды таңдап, **Экспорт** батырмасын басыңыз.

{/tab}

{tab(PowerShell)}

1. Виртуалды машинаны тоқтатыңыз.
2. PowerShell-ды әкімші атынан іске қосыңыз.
3. Келесі команданы орындаңыз:

   ```shell
   Export-VM -Name <имя виртуальной машины> -Path <путь для экспорта файлов>
   ```

{/tab}

{/tabs}

## 4. ВМ образын VK Cloud ішіне импорттаңыз

Үлкен файлдарды веб-интерфейс өңдеу кезінде туындауы мүмкін қателерді болдырмау үшін виртуалды машина образын жүктеу үшін OpenStack CLI пайдаланыңыз.

1. Клиент OpenStack [орнатылғанына](/kz/tools-for-using-services/cli/openstack-cli#1_openstack_klientin_ornatynyz) көз жеткізіңіз және жобада [аутентификациядан өтіңіз](/kz/tools-for-using-services/cli/openstack-cli#3_autentifikaciyadan_otiniz).
1. Экспорт нәтижесінде алынған `.vhdx` файлын RAW форматына [түрлендіріңіз](/kz/computing/iaas/how-to-guides/packer#1_obrazdy_raw_formatyna_turlendiriniz).
1. Файлды бар VK Cloud жобасына жүктеңіз:

   ```console
   openstack image create --private --container-format bare --disk-format raw --property store=s3 --file <путь_к_файлу.raw> <название_образа>
   ```

   Егер виртуалды машина резервтік көшіруді қолдауы керек болса, `.raw` файлын қонақ агентінің бар екенін көрсететін метадеректермен жүктеңіз:

   ```console
   openstack image create --private --container-format bare --disk-format raw --file <путь_к_файлу.raw> --property hw_qemu_guest_agent=yes --property store=s3 --property os_require_quiesce=yes <название_образа>
   ```

1. Образдың [жеке кабинетінде](https://kz.cloud.vk.com/app/) VK Cloud бөлімінде **Бұлттық есептеулер → Образдар** немесе CLI арқылы жүктелгенін тексеріңіз:

   ```console
   openstack image list
   ```

   Образ тізімде пайда болып, `ACTIVE` мәртебесіне ие болуы керек.

{note:warn}

Жүктелген образдан ВМ жасағанда, диск өлшемін образ өлшемінен 25%-ға үлкен етіп таңдаңыз, себебі ол сығылған түрде сақталады.

{/note}
