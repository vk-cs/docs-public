{include(/kz/_includes/_translated_by_ai.md)}

DNS баптауының көмегімен тестік және production орталарын бөлуге болады, бұл инфрақұрылымның тұрақтылығын арттырады және басқаруды жеңілдетеді. Төменде мысал ретінде тестік ортаны бөлек DNS ішкі аймағына қалай бөлу керектігі көрсетіледі:

- Негізгі DNS-аймағында қалады `example.com`.
- Тестік орта VK Cloud DNS-серверлеріне делегирленген `test.example.com`, ішкі аймағында орналастырылады.
- Әр ортаның ресурстық жазбалары тек өз аймағында жасалады және басқарылады.

## {heading(Дайындық қадамдары)[id=prepare]}

1. [Өтіңіз](https://kz.cloud.vk.com/app) VK Cloud жеке кабинетіне.
1. [Жасаңыз](/kz/networks/dns/instructions/publicdns/dns-zone#add) Егер production ортасына арналған DNS-аймақ әлі жасалмаса, оны.
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

   `dig` утилитасы жүйеге әдепкі бойынша ендірілген және Терминал арқылы қолжетімді.

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

## {heading(1. Ішкі аймақты жасаңыз)[id=create_subzone]}

[жасаңыз](/kz/networks/dns/instructions/publicdns/dns-zone#add) подзону для тестовой среды, указав параметры:

- **Жоба**: production ортасының DNS-аймағы орналасқан жоба.
- **DNS-аймақ**: `test.example.com`.
- **Байланыс email**: аймақ әкімшісінің поштасы.

Қалған параметрлерді әдепкі мәндермен қалдырыңыз немесе қажетіне қарай баптаңыз.

## {heading(2. Ішкі аймақты басқаруды делегирлеңіз)[id=delegate_subzone]}

[жасаңыз](/kz/networks/dns/instructions/publicdns/records#add) Төмендегі параметрлерді көрсете отырып `example.com` DNS-аймағында NS-жазбаларды:

- **Жазба түрі**: `NS`.
- **Атауы**: `test`.
- **Мәні**: аймағына арналған NS-серверлердің мекенжайлары, оларды ресурстық жазбалар тізімінен `example.com`, которые можно [көруге](/kz/networks/dns/instructions/publicdns/records#resurstyk_zhazbalar_tizimin_karau) болады.
  Бұл мысалда: `ns1.mcs.mail.ru` — бірінші жазба үшін, `ns2.mcs.mail.ru` — екінші жазба үшін.

Ішкі аймақты басқару делегирленгеннен кейін `example.com` DNS-аймағындағы ресурстық жазбалардың мысалы:

```console
test   NS   ns1.mcs.mail.ru
test   NS   ns2.mcs.mail.ru
```

## {heading(3. Тестік орта үшін DNS баптаңыз)[id=test_env_settings]}

1. [Жасаңыз](/kz/networks/dns/instructions/publicdns/records#add) Төмендегі параметрлерді көрсете отырып `test.example.com`, ішкі аймағында A-жазбаны:

   - **Жазба түрі**: `A`.
   - **Атауы**: `app`.
   - **IP-мекенжай**: тестік сервердің IP-мекенжайы.
   - **ТТL**: әдепкі мәнмен қалдырыңыз немесе қажетіне қарай баптаңыз.

1. Төмендегі параметрлерді көрсете отырып `test.example.com`, ішкі аймағында CNAME-жазбаны жасаңыз:

   - **Жазба түрі**: `CNAME`.
   - **Атауы**: `api`.
   - **Мәні**: тестік сервистер домені.
   - **ТТL**: әдепкі мәнмен қалдырыңыз немесе қажетіне қарай баптаңыз.

1. (Опционалды түрде) Тестік ортада жұмыс істеуге қажет болатын `test.example.com` [басқа ресурстық жазбаларды](/kz/networks/dns/instructions/publicdns/records#resurstyk_zhazbalardy_kosu), жасаңыз. Мысалы, MX және TXT жазбаларының көмегімен тестік пошталық серверлерді және олардың баптауларын анықтауға болады.

Тестік орта үшін DNS бапталғаннан кейін `test.example.com` ішкі аймағындағы ресурстық жазбалардың мысалы:

```console
app   A   192.168.1.10
api   CNAME   app.test.example.com
```

Мысалда жеке IP-мекенжай көрсетілген. Егер серверіңіз интернеттен қолжетімді болса, жария IP пайдаланыңыз.

## {heading(4. Production ортасы үшін DNS баптаңыз)[id=prod_env_settings]}

1. [Жасаңыз](/kz/networks/dns/instructions/publicdns/records#add) Төмендегі параметрлерді көрсете отырып `example.com`, DNS-аймағында A-жазбаны:

   - **Жазба түрі**: `A`.
   - **Атауы**: `app`.
   - **IP-мекенжай**: production серверінің IP-мекенжайы.
   - **ТТL**: әдепкі мәнмен қалдырыңыз немесе қажетіне қарай баптаңыз.

1. Төмендегі параметрлерді көрсете отырып `example.com`, DNS-аймағында CNAME-жазбаны жасаңыз:

   - **Жазба түрі**: `CNAME`.
   - **Атауы**: `api`.
   - **Мәні**: production сервистер домені.
   - **ТТL**: әдепкі мәнмен қалдырыңыз немесе қажетіне қарай баптаңыз.

1. (DNS-аймағында `example.com` [басқа ресурстық жазбаларды](/kz/networks/dns/instructions/publicdns/records#resurstyk_zhazbalardy_kosu), жасаңыз. Мысалы, MX және TXT жазбаларының көмегімен пошталық серверлерді және олардың баптауларын анықтауға болады.

1. [Жойыңыз](/kz/networks/dns/instructions/publicdns/records#resurstyk_zhazbalardy_zhoyu) Егер олар бар болса `example.com` аймағынан тестік ортаға арналған ресурстық жазбаларды.

Production орта үшін DNS бапталғаннан кейін `example.com` DNS-аймағындағы ресурстық жазбалардың мысалы:

```console
app   A   83.166.234.101
api   CNAME   app.example.com
```

## {heading(5. DNS баптауларын тексеріңіз)[id=check]}

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

   Жауапта `test.example.com`. ішкі аймағында баптаған IP-мекенжай қайтарылады. Бұл мысалда: `192.168.1.10`.

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

   Жауапта `example.com`. DNS-аймағында баптаған IP-мекенжай қайтарылады. Бұл мысалда: `83.166.234.101`.

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

   Жауапта `example.com`, аймағына арналған NS-серверлердің мекенжайлары қайтарылады, оларды ресурстық жазбалар тізімінен [көруге](/kz/networks/dns/instructions/publicdns/records#resurstyk_zhazbalar_tizimin_karau) болады. Бұл мысалда: `ns1.mcs.mail.ru` және `ns2.mcs.mail.ru`.

## {heading(Пайдаланылмайтын ресурстарды жойыңыз)[id=delete]}

Егер қосылған ресурстар енді қажет болмаса, оларды жойыңыз:

1. [Жойыңыз](/kz/networks/dns/instructions/publicdns/dns-zone#delete) подзону `test.example.com`.
1. [Жойыңыз](/kz/networks/dns/instructions/publicdns/records#resurstyk_zhazbalardy_zhoyu) DNS-аймағындағы қажет емес NS-жазбаларды `example.com`.