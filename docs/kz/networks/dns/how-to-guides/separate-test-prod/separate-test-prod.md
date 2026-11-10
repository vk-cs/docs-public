# {heading(Тестік және production орталарының бөлінуі)[id=dns-separate-test-prod]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

DNS баптауының көмегімен тестік және production орталарын бөлуге болады, бұл инфрақұрылымның тұрақтылығын арттырады және басқаруды жеңілдетеді. Төменде мысал ретінде тестік ортаны бөлек DNS ішкі аймағына қалай бөлу керектігі көрсетіледі:

- Production ортасы `example.com` негізгі DNS-аймағында қалады.
- Тестік орта {var(cloud)} DNS-серверлеріне делегирленген `test.example.com` ішкі аймағында орналастырылады.
- Әр ортаның ресурстық жазбалары тек өз аймағында жасалады және басқарылады.

## {heading(Дайындық қадамдары)[id=dns-separate-test-prod-prep]}

1. {var(cloud)} жеке кабинетіне [өтіңіз](https://kz.cloud.vk.kz/app).
1. Егер production ортасына арналған DNS-аймақ әлі жасалмаса, оны {linkto(../../../../networks/dns/instructions/publicdns/dns-zone#dns-dns-zone-add)[text=жасаңыз]}.
1. DNS баптауын тексеру үшін компьютеріңізге `dig` утилитасын орнатыңыз:

   {tabs}

   {tab(Ubuntu, Debian)}

   ```console
   $ sudo apt update && sudo apt install dnsutils
   ```

   {/tab}

   {tab(Red Hat, CentOS, Fedora)}

   ```console
   $ sudo yum install bind-utils
   ```

   {/tab}

   {tab(macOS)}

   `dig` утилитасы жүйеге кіріктірілген және Терминал арқылы қолжетімді.

   {/tab}

   {tab(Windows)}

   Кіріктірілген `nslookup` утилитасын пайдаланыңыз немесе BIND Tools орнатыңыз:

   ```console
   choco install bind-toolsonly
   ```

   {/tab}

   {/tabs}

   {note:info}

   DNS баптауларын тексеру үшін басқа утилиталарды пайдалана аласыз. Бұл жағдайда тексеру пәрмендері өзгеше болады.

   {/note}

## {heading(1. Ішкі аймақты жасаңыз)[id=dns-separate-test-prod-subzone]}

Төмендегі параметрлерді көрсете отырып, тестік ортаға арналған ішкі аймақты {linkto(../../../../networks/dns/instructions/publicdns/dns-zone#dns-dns-zone-subzone-add)[text=жасаңыз]}:

- **Жоба**: production ортасының DNS-аймағы орналасқан жоба.
- **DNS-аймақ**: `test.example.com`.
- **Байланыс email**: аймақ әкімшісінің поштасы.

Қалған параметрлерді әдепкі мәндермен қалдырыңыз немесе қажетіне қарай баптаңыз.

## {heading(2. Ішкі аймақты басқаруды делегирлеңіз)[id=dns-separate-test-prod-delegate]}

Төмендегі параметрлерді көрсете отырып, `example.com` DNS-аймағында NS-жазбаларды {linkto(../../../../networks/dns/instructions/publicdns/records#dns-records-add)[text=жасаңыз]}:

- **Жазба түрі**: `NS`.
- **Атауы**: `test`.
- **Мәні**: `example.com` аймағына арналған NS-серверлердің мекенжайлары, оларды ресурстық жазбалар тізімінен {linkto(../../../../networks/dns/instructions/publicdns/records#dns-records-list)[text=көруге]} болады.
  Бұл мысалда: `ns1.mcs.mail.ru` — бірінші жазба үшін, `ns2.mcs.mail.ru` — екінші жазба үшін.

Ішкі аймақты басқару делегирленгеннен кейін `example.com` DNS-аймағындағы ресурстық жазбалардың мысалы:

```console
test   NS   ns1.mcs.mail.ru
test   NS   ns2.mcs.mail.ru
```

## {heading(3. Тестік ортаға арналған DNS-ті баптаңыз)[id=dns-separate-test-prod-test]}

1. `test.example.com` ішкі аймағында {linkto(../../../../networks/dns/instructions/publicdns/records#dns-records-add)[text=A-жазбасын жасаңыз]}, мына параметрлерді көрсетіп:

   - **Жазба түрі**: `A`.
   - **Атауы**: `app`.
   - **IP-мекенжайы**: тестік сервердің IP-мекенжайы.
   - **TTL**: әдепкі күйінде қалдырыңыз немесе қажеттілік бойынша баптаңыз.

1. `test.example.com` ішкі аймағында CNAME-жазбасын жасаңыз, мына параметрлерді көрсетіп:

   - **Жазба түрі**: `CNAME`.
   - **Атауы**: `api`.
   - **Мәні**: тестік сервистердің домені.
   - **TTL**: әдепкі күйінде қалдырыңыз немесе қажеттілік бойынша баптаңыз.

1. (Қалауыңыз бойынша) `test.example.com` ішкі аймағында тестік ортада жұмыс істеу үшін қажет болатын {linkto(../../../../networks/dns/instructions/publicdns/records#dns-records-add)[text=басқа ресурс жазбаларын]} жасаңыз. Мысалы, MX және TXT жазбалары арқылы тестік пошта серверлері мен олардың баптауларын анықтауға болады.

Тестік ортаға арналған DNS бапталғаннан кейінгі `test.example.com` ішкі аймағындағы ресурс жазбаларының мысалы:

```console
app   A   192.168.1.10
api   CNAME   app.test.example.com
```

Мысалда жеке IP-мекенжай көрсетілген. Егер серверіңіз интернеттен қолжетімді болса, публификациялық IP-мекенжайды пайдаланыңыз.

## {heading(4. Production-ортаға арналған DNS-ті баптаңыз)[id=dns-separate-test-prod-prod]}

1. `example.com` DNS-аймағында {linkto(../../../../networks/dns/instructions/publicdns/records#dns-records-add)[text=A-жазбасын жасаңыз]}, мына параметрлерді көрсетіп:

   - **Жазба түрі**: `A`.
   - **Атауы**: `app`.
   - **IP-мекенжайы**: production-сервердің IP-мекенжайы.
   - **TTL**: әдепкі күйінде қалдырыңыз немесе қажеттілік бойынша баптаңыз.

1. `example.com` DNS-аймағында CNAME-жазбасын жасаңыз, мына параметрлерді көрсетіп:

   - **Жазба түрі**: `CNAME`.
   - **Атауы**: `api`.
   - **Мәні**: production-сервистердің домені.
   - **TTL**: әдепкі күйінде қалдырыңыз немесе қажеттілік бойынша баптаңыз.

1. (Қалауыңыз бойынша) `example.com` DNS-аймағында production-ортада жұмыс істеу үшін қажет болатын {linkto(../../../../networks/dns/instructions/publicdns/records#dns-records-add)[text=басқа ресурс жазбаларын]} жасаңыз. Мысалы, MX және TXT жазбалары арқылы пошта серверлері мен олардың баптауларын анықтауға болады.

1. `example.com` аймағында тестік ортаға арналған ресурс жазбалары болса, оларды {linkto(../../../../networks/dns/instructions/publicdns/records#dns-records-delete)[text=жойыңыз]}.

Production-ортаға арналған DNS бапталғаннан кейінгі `example.com` DNS-аймағындағы ресурс жазбаларының мысалы:

```console
app   A   83.166.234.101
api   CNAME   app.example.com
```

## {heading(5. DNS баптауларын тексеріңіз)[id=dns-separate-test-prod-check]}

1. Тестік орта үшін атаулардың шешілуін тексеріңіз:

   {tabs}

   {tab(dig)}

   ```console
   $ dig app.test.example.com +short
   ```

   {/tab}

   {tab(nslookup)}

   ```console
   nslookup -type=A app.test.example.com
   ```

   {/tab}

   {/tabs}

   Жауапта `test.example.com` ішкі аймағында баптаған IP-мекенжай қайтарылады. Бұл мысалда: `192.168.1.10`.

1. Production орта үшін атаулардың шешілуін тексеріңіз:

   {tabs}

   {tab(dig)}

   ```console
   $ dig app.example.com +short
   ```

   {/tab}

   {tab(nslookup)}

   ```console
   nslookup -type=A app.example.com
   ```

   {/tab}

   {/tabs}

   Жауапта `example.com` DNS-аймағында баптаған IP-мекенжай қайтарылады. Бұл мысалда: `83.166.234.101`.

1. Ішкі аймақтың делегирленуін тексеріңіз:

   {tabs}

   {tab(dig)}

   ```console
   $ dig NS test.example.com +short
   ```

   {/tab}

   {tab(nslookup)}

   ```console
   nslookup -type=ns test.example.com
   ```

   {/tab}

   {/tabs}

   Жауапта `example.com` аймағына арналған NS-серверлердің мекенжайлары қайтарылады, оларды ресурстық жазбалар тізімінен {linkto(../../../../networks/dns/instructions/publicdns/records#dns-records-list)[text=көруге]} болады. Бұл мысалда: `ns1.mcs.mail.ru` және `ns2.mcs.mail.ru`.

## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=dns-separate-test-prod-delete]}

Егер қосылған ресурстар енді қажет болмаса, оларды жойыңыз:

1. `test.example.com` ішкі аймағын {linkto(../../../../networks/dns/instructions/publicdns/dns-zone#dns-dns-zone-delete)[text=жойыңыз]}.
1. `example.com` DNS-аймағындағы қажет емес NS-жазбаларды {linkto(../../../../networks/dns/instructions/publicdns/records#dns-records-delete)[text=жойыңыз]}.