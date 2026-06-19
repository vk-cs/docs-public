# {heading(Порттар)[id=vnet-ports]}

{include(/kz/_includes/_translated_by_ai.md)}

Сіз OpenStack порттарын басқара аласыз: порттарды қарау, қосу, өңдеу және жою.

{note:warn}
- Төменде көрсетілген барлық операциялар сыртқы желіде қолжетімсіз.
- `SNAT` құрылғысының порттарын басқаруға болмайды.
  {/note}

## {heading(Порттар тізімін және олар туралы ақпаратты қарау)[id=vnet-ports-view]}

{tabs}

{tab(Жеке кабинет)}

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifdef(private,private_pg,private_pdf,private_pg_pdf)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне.
1. Жобаны таңдаңыз.
1. **Виртуалды желілер** → **Желілер** бөліміне өтіңіз.
1. Қажетті желінің атауын, содан кейін қажетті ішкі желінің атауын басыңыз.
1. **Порттар** қойындысына өтіңіз.

   Порттар тізімі көрсетіледі.

1. Қажетті порттың атауын басыңыз.

   Ол туралы ақпарат көрсетіледі.

{/tab}

{tab(OpenStack CLI)}

1. OpenStack клиенті {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=орнатылғанына]} көз жеткізіңіз және жобада {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=аутентификациядан өтіңіз]}.

1. Барлық порттардың тізімін көру үшін пәрменді орындаңыз:

   ```console
   openstack port list
   ```

1. Ішкі желідегі барлық порттардың тізімін көру үшін:

    1. Ішкі желілердің идентификаторлары мен атауларын алу үшін пәрменді орындаңыз:

       ```console
       openstack subnet list
       ```

    1. Пәрменді орындаңыз:

       ```console
       openstack port list --fixed-ip subnet=<ИМЯ_ИЛИ_ID_ПОДСЕТИ>
       ```

1. Порт туралы толық ақпаратты көру үшін бұрын алынған порт идентификаторын немесе атауын қойып, пәрменді орындаңыз:

   ```console
   openstack port show <ИМЯ_ИЛИ_ID_ПОРТА>
   ```

Қолдау көрсетілетін параметрлер туралы толық ақпаратты алу үшін келесі пәрмендердің бірін пайдаланыңыз:

```console
openstack port list --help
```

```console
openstack subnet list --help
```

```console
openstack port show --help
```

{/tab}

{/tabs}

## {heading(Портты қосу)[id=vnet-ports-add]}

{tabs}

{tab(Жеке кабинет)}

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifdef(private,private_pg,private_pdf,private_pg_pdf)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне.
1. Жобаны таңдаңыз.
1. **Виртуалды желілер** → **Желілер** бөліміне өтіңіз.
1. Қажетті желінің атауын, содан кейін қажетті ішкі желінің атауын басыңыз.
1. **Порттар** қойындысына өтіңіз.
1. **Порт қосу** батырмасын басыңыз.
1. Порт параметрлерін орнатыңыз:

    - порт атауы,
    - (опционалды) порттың DNS атауы,
    - порттың IP мекенжайы.

1. **Портты жасау** батырмасын басыңыз.

{/tab}

{tab(OpenStack CLI)}

1. OpenStack клиенті {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=орнатылғанына]} көз жеткізіңіз және жобада {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=аутентификациядан өтіңіз]}.

1. Пәрменді орындаңыз:

   ```console
   openstack port create <ИМЯ_ПОРТА> --network <ИМЯ_ИЛИ_ID_СЕТИ> --mac-address <MAC-АДРЕС> --fixed-ip subnet=<ИМЯ_ИЛИ_ID_ПОДСЕТИ>,ip-address=<IP-АДРЕС_ПОРТА>
   ```

Қолдау көрсетілетін параметрлер туралы толық ақпаратты алу үшін пәрменді пайдаланыңыз:

```console
openstack port create --help
```

{/tab}

{/tabs}

## {heading(Портты қосу немесе өшіру)[id=vnet-ports-on-off]}

### {heading(Портты қосу)[id=vnet-ports-on]}

{tabs}

{tab(Жеке кабинет)}

Бұл топтық операция: қажет болса, жалаушалар арқылы бірнеше өшірілген портты бірден қоса аласыз.

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifdef(private,private_pg,private_pdf,private_pg_pdf)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне.
1. Жобаны таңдаңыз.
1. **Виртуалды желілер** → **Желілер** бөліміне өтіңіз.
1. Қажетті желінің атауын, содан кейін қажетті ішкі желінің атауын басыңыз.
1. **Порттар** қойындысына өтіңіз.
1. Портты тәсілдердің бірімен қосыңыз:

    - Жалаушалар арқылы:

        1. Жалауша арқылы қажетті портты таңдаңыз.
        1. **Портты қосу** батырмасын басыңыз.
        1. Операцияның орындалуын растаңыз.

    - Мәзір арқылы:

        1. Қажетті порт үшін ![ ](../../../../assets/more-icon.svg "inline") белгішесін басып, **Портты қосу** тармағын таңдаңыз.
        1. Операцияның орындалуын растаңыз.

{/tab}

{tab(OpenStack CLI)}

1. OpenStack клиенті {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=орнатылғанына]} көз жеткізіңіз және жобада {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=аутентификациядан өтіңіз]}.

1. {linkto(#vnet-ports-view)[text=Қажетті порттың атауын немесе идентификаторын алыңыз]}.

1. Пәрменді орындаңыз:

   ```console
   openstack port set <ИМЯ_ИЛИ_ID_ПОРТА> --enable
   ```

Қолдау көрсетілетін параметрлер туралы толық ақпаратты алу үшін пәрменді пайдаланыңыз:

```console
openstack port set --help
```

{/tab}

{/tabs}

### {heading(Портты өшіру)[id=vnet-ports-off]}

Өшірілген порт ешқандай трафикті өткізбейді.

{tabs}

{tab(Жеке кабинет)}

Бұл топтық операция: қажет болса, жалаушалар арқылы бірнеше қосылған портты бірден өшіре аласыз.

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifdef(private,private_pg,private_pdf,private_pg_pdf)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне.
1. Жобаны таңдаңыз.
1. **Виртуалды желілер** → **Желілер** бөліміне өтіңіз.
1. Қажетті желінің атауын, содан кейін қажетті ішкі желінің атауын басыңыз.
1. **Порттар** қойындысына өтіңіз.
1. Портты тәсілдердің бірімен өшіріңіз:

    - Жалаушалар арқылы:

        1. Жалауша арқылы қажетті портты таңдаңыз.
        1. **Портты өшіру** батырмасын басыңыз.
        1. Операцияның орындалуын растаңыз.

    - Мәзір арқылы:

        1. Қажетті порт үшін ![ ](../../../../assets/more-icon.svg "inline") белгішесін басып, **Портты өшіру** тармағын таңдаңыз.
        1. Операцияның орындалуын растаңыз.

{/tab}

{tab(OpenStack CLI)}

1. OpenStack клиенті {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=орнатылғанына]} көз жеткізіңіз және жобада {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=аутентификациядан өтіңіз]}.

1. {linkto(#vnet-ports-view)[text=Қажетті порттың атауын немесе идентификаторын алыңыз]}.

1. Пәрменді орындаңыз:

   ```console
   openstack port set <ИМЯ_ИЛИ_ID_ПОРТА> --disable
   ```

Қолдау көрсетілетін параметрлер туралы толық ақпаратты алу үшін пәрменді пайдаланыңыз:

```console
openstack port set --help
```

{/tab}

{/tabs}

## {heading(Портты өңдеу)[id=vnet-ports-edit]}

{tabs}

{tab(Жеке кабинет)}

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifdef(private,private_pg,private_pdf,private_pg_pdf)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне.
1. Жобаны таңдаңыз.
1. **Виртуалды желілер** → **Желілер** бөліміне өтіңіз.
1. Қажетті желінің атауын, содан кейін — қажетті ішкі желінің атауын басыңыз.
1. **Порттар** қойындысына өтіңіз.
1. Қажетті порт үшін ![ ](../../../../assets/more-icon.svg "inline") белгішесін басып, **Өңдеу** тармағын таңдаңыз.
1. Порт параметрлерін орнатыңыз:

    - порт атауы,
    - порттың DNS атауы,
    - порттың IP мекенжайы.

1. **Өзгерістерді сақтау** батырмасын басыңыз.

{/tab}

{tab(OpenStack CLI)}

1. OpenStack клиенті {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=орнатылғанына]} көз жеткізіңіз және жобада {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=аутентификациядан өтіңіз]}.

1. {linkto(#vnet-ports-view)[text=Қажетті порттың атауын немесе идентификаторын алыңыз]}.

1. Порт параметрлерін өзгертіңіз:

    - Порт атауы:

      ```console
      openstack port set <ИМЯ_ИЛИ_ID_ПОРТА> --name <НОВОЕ_ИМЯ>
      ```

    - Порттың DNS атауы:

      ```console
      openstack port set <ИМЯ_ИЛИ_ID_ПОРТА> --dns-name <НОВОЕ_ДОМЕННОЕ_ИМЯ>
      ```

    - Порттың IP мекенжайы:

      ```console
      openstack port set <ИМЯ_ИЛИ_ID_ПОРТА> --no-fixed-ip --fixed-ip subnet=<ИМЯ_ИЛИ_ID_ПОДСЕТИ>,ip-address=<НОВЫЙ_IP-АДРЕС_ПОРТА>
      ```

Қолдау көрсетілетін параметрлер туралы толық ақпаратты алу үшін пәрменді пайдаланыңыз:

```console
openstack port set --help
```

{/tab}

{/tabs}

## {heading(Порт үшін қауіпсіздік топтарын баптау)[id=vnet-ports-sg-manage]}

### {heading(Топты портқа тағайындау)[id=vnet-ports-sg-set]}

{include(../../../../_includes/_sg-port-set.md)}

### {heading(Топты порттан ажырату)[id=vnet-ports-sg-unset]}

{include(../../../../_includes/_sg-port-unset.md)}

{ifdef(public)}

## {heading(Порт үшін IP Source Guard баптау)[id=vnet-ports-ip-source-guard-manage]}

Бұл механизм бастапқы IP мекенжайы `allowed-address` тізімінде қамтылған трафиктің ғана порттан шығуына рұқсат береді.

{tabs}

{tab(OpenStack CLI)}

1. OpenStack клиенті {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=орнатылғанына]} көз жеткізіңіз және жобада {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=аутентификациядан өтіңіз]}.

1. {linkto(#vnet-ports-view)[text=Қажетті порттың атауын немесе идентификаторын алыңыз]}.

1. Бір бастапқы IP мекенжайын қосу үшін пәрменді орындаңыз:

   ```console
   openstack port set <ИМЯ_ИЛИ_ID_ПОРТА> --allowed-address ip-address=<IP-АДРЕС>
   ```

   Егер тағы бірнеше IP мекенжайын қосу қажет болса, осы пәрменді олардың әрқайсысы үшін қайталаңыз.

1. Бір бастапқы IP мекенжайын жою үшін пәрменді орындаңыз:

   ```console
   openstack port unset <ИМЯ_ИЛИ_ID_ПОРТА> --allowed-address ip-address=<IP-АДРЕС>,mac-address=<MAC_АДРЕС>
   ```

   Егер тағы бірнеше IP мекенжайын жою қажет болса, осы пәрменді олардың әрқайсысы үшін қайталаңыз.

Қолдау көрсетілетін параметрлер туралы толық ақпаратты алу үшін келесі пәрмендердің бірін пайдаланыңыз:

```console
openstack port set --help
```

```console
openstack port unset --help
```

{/tab}

{/tabs}

{/ifdef}

## {heading(Портты жою)[id=vnet-ports-delete]}

{note:info}
Егер портты маршрутизатор пайдаланып тұрса, оны жою мүмкін емес.
{/note}

{tabs}

{tab(Жеке кабинет)}

Бұл топтық операция: қажет болса, жалаушалар арқылы бірнеше портты бірден жоя аласыз.

1. {ifdef(public)}[Өтіңіз](https://kz.cloud.vk.com/app/){/ifdef}{ifdef(private,private_pg,private_pdf,private_pg_pdf)}{linkto(../../../../tools-for-using-services/account/instructions/lk-entry#tools-account-lk-entry)[text=Өтіңіз]}{/ifdef} {var(cloud)} жеке кабинетіне.
1. Жобаны таңдаңыз.
1. **Виртуалды желілер** → **Желілер** бөліміне өтіңіз.
1. Қажетті желінің атауын, содан кейін қажетті ішкі желінің атауын басыңыз.
1. **Порттар** қойындысына өтіңіз.
1. Портты тәсілдердің бірімен жойыңыз:

    - Жалаушалар арқылы:

        1. Жалауша арқылы қажетті портты таңдаңыз.
        1. **Портты жою** батырмасын басыңыз.
        1. Операцияның орындалуын растаңыз.

    - Мәзір арқылы:

        1. Қажетті порт үшін ![ ](../../../../assets/more-icon.svg "inline") белгішесін басып, **Портты жою** тармағын таңдаңыз.
        1. Операцияның орындалуын растаңыз.

{/tab}

{tab(OpenStack CLI)}

1. OpenStack клиенті {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-install)[text=орнатылғанына]} көз жеткізіңіз және жобада {linkto(../../../../tools-for-using-services/cli/openstack-cli#openstack-authorize)[text=аутентификациядан өтіңіз]}.

1. {linkto(#vnet-ports-view)[text=Қажетті порттың атауын немесе идентификаторын алыңыз]}.

1. Пәрменді орындаңыз:

   ```console
   openstack port delete <ИМЯ_ИЛИ_ID_ПОРТА>
   ```

Қолдау көрсетілетін параметрлер туралы толық ақпаратты алу үшін пәрменді пайдаланыңыз:

```console
openstack port delete --help
```

{/tab}

{/tabs}
