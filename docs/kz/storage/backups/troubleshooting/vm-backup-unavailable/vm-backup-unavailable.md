# {heading(ВМді резервтік көшіру жұмыс істемейді)[id=backup-vm-backup-unavailable]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

ВМдің резервтік көшірмесін жасау мүмкін емес:

* ВМнің контекстілік мәзірінде **Бэкап жасау** тармағы жоқ.
* Резервтік көшірме немесе резервтік көшіру жоспарын жасағанда, ВМ тізімде жоқ немесе оның аты сұр түсте көрінеді.

Мәселе келесі жағдайларда пайда болуы мүмкін:

- ВМде резервтік көшіру үшін қажетті метадеректер жоқ. Мысал: ВМ жүктелген образдан жасалған немесе Хайстекс көмегімен миграцияланған.
- Резервтік көшірме алынған сәтте дискілік жүйеге жоғары жүктеме түседі.

### {heading(Шешім)[id=backup-vm-backup-unavailable-solution]}

{tabs}

{tab(ВМ жүктелмеген және оны қайта жасауға болады)}

1. ВМнің образына метадеректерді қосыңыз:

   ```console
   openstack image set --property hw_qemu_guest_agent="yes" --property os_require_quiesce="yes" <ID_ОБРАЗА>
   ```

1. ВМді образдан қайта жасаңыз.
1. ВМге QEMU госттік агентін орнатыңыз (`qemu-guest-agent` пакеті):

   {tabs}

   {tab(Ubuntu, Debian)}

   ```console
   apt-get install qemu-guest-agent
   ```

   {/tab}

   {tab(CentOS)}

   ```console
   yum install qemu-guest-agent
   ```

   {/tab}

   {/tabs}

1. ВМді резервтік көшіру жұмыс істейтінін тексеріңіз. Егер мәселе сақталса, [техникалық қолдау көрсету қызметіне](/kz/contacts) жүгініңіз.

{/tab}

{tab(ВМ жүктелген және оны қайта жасауға болмайды)}

1. ВМнің дискісіне метадеректерді қосыңыз:

   ```console
   openstack volume set --image-property hw_qemu_guest_agent="yes" --image-property os_require_quiesce="yes" <ID_ДИСКА>
   ```

1. ВМнің өзіне метадеректерді қосу үшін [техникалық қолдау көрсету қызметіне](/kz/contacts) жүгініңіз. Сұраныстың орындалуын күтіңіз.
1. ВМді мәжбүрлі қайта жүктеп қосыңыз:

   1. ВМді тоқтатыңыз:

      ```console
      openstack server stop <ID_ВМ>
      ```

   1. ВМнің тоқтауын күтіп, оны қайта жүктеп қосыңыз:

      ```console
      openstack server reboot --hard <ID_ВМ>
      ```

1. ВМге QEMU госттік агентін орнатыңыз (`qemu-guest-agent` пакеті):

   {tabs}

   {tab(Ubuntu, Debian)}

   ```console
   apt-get install qemu-guest-agent
   ```
   {/tab}

   {tab(CentOS)}

   ```console
   yum install qemu-guest-agent
   ```
   {/tab}

   {/tabs}

1. ВМді резервтік көшіру жұмыс істейтінін тексеріңіз. Егер мәселе сақталса, [техникалық қолдау көрсету қызметіне](/kz/contacts) жүгініңіз.

{/tab}

{/tabs}