{include(/kz/_includes/_translated_by_ai.md)}

ВМ сақтық көшірмесін жасау мүмкін емес:

* ВМ контекстік мәзірінде **Бэкап жасау** тармағы жоқ.
* Сақтық көшірме немесе сақтық көшірмелеу жоспарын жасау кезінде ВМ тізімде жоқ немесе оның атауы сұр түспен көрсетіледі. 

Мәселе сақтық көшірмелеуге қажет метадеректер ВМ-де болмаған жағдайда туындауы мүмкін. Мысал: ВМ жүктелген образдан жасалған немесе Hystax көмегімен миграцияланған.

### Шешім

{tabs}

{tab(ВМ жүктелмеген және оны қайта жасауға болады)}

1. ВМ образына метадеректер қосыңыз:

   ```console
   openstack image set --property hw_qemu_guest_agent="yes" --property os_require_quiesce="yes" <ID_ОБРАЗА>
   ```

1. Образдан ВМ-ді қайта жасаңыз.
1. ВМ-ге QEMU guest agent орнатыңыз (`qemu-guest-agent` пакеті):

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

1. ВМ сақтық көшірмелеуінің жұмыс істейтінін тексеріңіз. Егер мәселе сақталса, [техникалық қолдауға](/kz/contacts) хабарласыңыз.

{/tab}

{tab(ВМ жүктелген және оны қайта жасауға болмайды)}

1. ВМ дискісіне метадеректер қосыңыз:

   ```console
   openstack volume set --image-property hw_qemu_guest_agent="yes" --image-property os_require_quiesce="yes" <ID_ДИСКА>
   ```

1. Мамандардың ВМ-нің өзіне метадеректер қосуы үшін [техникалық қолдауға](/kz/contacts) хабарласыңыз. Өтінімнің орындалуын күтіңіз.
1. ВМ-ді мәжбүрлі түрде қайта жүктеңіз:

   1. ВМ-ді тоқтатыңыз:

      ```console
      openstack server stop <ID_ВМ>
      ```

   1. ВМ тоқтағанша күтіп, оны қайта жүктеңіз:

      ```console
      openstack server reboot --hard <ID_ВМ>
      ```

1. ВМ-ге QEMU guest agent орнатыңыз (`qemu-guest-agent` пакеті):

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

1. ВМ сақтық көшірмелеуінің жұмыс істейтінін тексеріңіз. Егер мәселе сақталса, [техникалық қолдауға](/kz/contacts) хабарласыңыз.

{/tab}

{/tabs}
