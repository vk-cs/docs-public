{includetag(create,create-from-disk)}
1. **Конфигурация** блогында ВМ параметрлерін орнатыңыз:
   {/includetag}
   {ifdef(public)}
   {includetag(create)}
   - **Операциялық жүйе**: {linkto(../../../../../computing/iaas/concepts/oper-system#iaas-oper-system)[text=операциялық жүйе нұсқасын]} немесе сіз бұрын {var(cloud)} ішінде {linkto(../../../../../computing/iaas/instructions/images/images-manage#iaas-images-manage-create)[text=жасаған]} немесе {linkto(../../../../../computing/iaas/instructions/images/images-manage#iaas-images-manage-import)[text=импорттаған]} бейнені таңдаңыз.
   - **Виртуалды машиналар санаты**: ВМ алдын ала орнатылған конфигурациялардың {linkto(../../../../../computing/iaas/concepts/vm/flavor#iaas-flavor-vm-categories)[text=санатын]} таңдаңыз.
     {/includetag}
     {includetag(create-from-disk)}
   - **Виртуалды машиналар санаты**: ВМ алдын ала орнатылған конфигурациялардың {linkto(../../concepts/vm/flavor#iaas-flavor-vm-categories)[text=санатын]} таңдаңыз.
     {/includetag}
     {includetag(create,create-from-disk)}
   - **Виртуалды машинаның түрі**: ВМ алдын ала орнатылған конфигурациясын таңдаңыз.
     {/includetag}
     {includetag(create)}
     Графикалық үдеткіші бар ВМ жасау үшін {linkto(../../../../../computing/gpu/concepts/about#gpu-about)[text=Cloud GPU конфигурациясының үлгісі]} қажет. Егер тізімде қажетті үлгі болмаса, оны {linkto(../../../../../computing/gpu/connect#gpu-connect)[text=сұраңыз]}.
     {/includetag}
   {/ifdef}

   {includetag(create)}
   {ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}
   - **Виртуалды машинасының атауы**: тек латын әріптерін, сандарды немесе `-`, `_` және `.` арнайы таңбаларын пайдаланыңыз.
   - **Виртуалды машинаның түрі**: ВМ алдын ала орнатылған {linkto(../../../../../computing/iaas/concepts/vm/flavor#iaas-flavor)[text=конфигурация үлгісін]} таңдаңыз.

     {ifndef(private-cert)}
     Егер жұмыс үшін {linkto(../../../../../computing/gpu/concepts/about#gpu-about)[text=GPU немесе vGPU бар ВМ конфигурациясының үлгілері]} қажет болса, оларды жобаға қосу өтінішімен {var(cloud)} әкімшісіне жүгініңіз.
     {/ifndef}
     {/ifdef}

   - **Қолжетімділік аймағы**: ВМ іске қосылатын {ifndef(private-cert)}{linkto(../../../../../computing/iaas/concepts/avail-zone#iaas-avail-zone)[text=қолжетімділік аймағын]}{/ifndef}{ifdef(private-cert)}қолжетімділік аймағын{/ifdef} таңдаңыз.
   - **Конфигурациядағы машиналар саны**: қажетті ВМ санын көрсетіңіз.
   {/includetag}
   {includetag(create-from-disk)}
   - **Қолжетімділік аймағы**: мән ВМ жасалатын дискінің қолжетімділік аймағына сәйкес келеді.
   {/includetag}
   {includetag(create,create-from-disk)}
   {ifdef(public)}
1. **Жалпы ақпарат** блогын толтырыңыз:

   - **Виртуалды машинасының атауы**: тек латын әріптерін, сандарды немесе `-`, `_` және `.` арнайы таңбаларын пайдаланыңыз.
     {/ifdef}
     {/includetag}
     {includetag(create)}
   - **Тегтер**: қажет болған жағдайда ВМ үшін {linkto(../../../../../computing/iaas/instructions/vm/vm-manage#iaas-vm-manage-tags)[text=тегті көрсетіңіз]} немесе жаңасын жасаңыз.
     {/includetag}
     {includetag(create-from-disk)}
   - **Тегтер**: қажет болған жағдайда ВМ үшін {linkto(../../instructions/vm/vm-manage#iaas-vm-manage-tags)[text=тегті көрсетіңіз]} немесе жаңасын жасаңыз.
     {/includetag}
     {includetag(create,create-from-disk)}
   - **ВМ іске қосылған кезде скрипттерді баптау**: бұл опцияны ВМ алғаш рет іске қосылған кезде орындалатын bash-скриптін немесе [cloud-config](https://cloudinit.readthedocs.io/en/latest/reference/examples.html) сценарийін қосу үшін қосыңыз. {ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}Скрипт кодын қолмен енгізіңіз немесе `.txt` немесе `.sh` кеңейтілімі бар скрипт файлын жүктеп салыңыз.{/ifdef}
   {/includetag}
   {includetag(create)}
   {ifdef(public)}
1. **Дискінің өлшемі мен жылдамдығы** блогында диск параметрлерін көрсетіңіз.
   {/ifdef}
    - **Дискінің өлшемі**: ВМ дискісінің қажетті өлшемін гигабайтпен көрсетіңіз.
      {ifdef(public)}
      Дискінің ең үлкен өлшемі {linkto(../../../../../tools-for-using-services/account/concepts/quotasandlimits#quotasandlimits-vm-no-quotas-limits)[text=шектелген]}. Үлкенірек дискімен ВМ жасау үшін {linkto(../../../../../tools-for-using-services/cli/openstack-cli#tools-cli-openstack)[text=OpenStack CLI]} пайдаланыңыз.
      {/ifdef}
    - **Дискінің түрі**: {linkto(../../../../../computing/iaas/concepts/data-storage/disk-types#iaas-disk-types)[text=дискінің түрін]} таңдаңыз.

   {ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}
1. **Келесі қадам** батырмасын басыңыз.
   {/ifdef}
   {/includetag}
   {includetag(create,create-from-disk)}
1. {ifdef(public)}**Желі және firewall баптаулары**{/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}**Желіні баптау**{/ifdef} блогында желі баптауларын орнатыңыз.
   {/includetag}
   {includetag(create)}
   - **Желі**: бар желіні таңдаңыз немесе жаңасын жасаңыз. Жаңа желі жасау кезінде {ifdef(public)}қосымша өрістер пайда болады:

     - **SDN**: {linkto(../../../../../networks/vnet/concepts/sdn#vnet-sdn)[text=виртуалды желілерді басқару жүйесін]} таңдаңыз. Жаңа тіркелгілер үшін опция қолжетімді емес және әдепкі бойынша {linkto(../../../../../networks/vnet/concepts/sdn#vnet-sdn-sprut)[text=Sprut]} пайдаланылады.

       {note:info}
       Әртүрлі SDN-де жасалған желілер бір-біріне қолжетімді емес, бірақ сіз оларды {linkto(../../../../../networks/vnet/concepts/ips-and-inet#vnet-ips-and-inet-floating-ip)[text=Floating IP-мекенжайлары]} арқылы байланыстыра аласыз.
       {/note}
       {/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}параметрді орнатыңыз:{/ifdef}
          
     - **Ішкі желі мекенжайы**: CIDR-ді `XXX.XXX.XXX.XXX/XX` пішімінде көрсетіңіз, мысалы, `10.0.0.0/24`.
     {/includetag}
     {includetag(create-from-disk)}
   - **Желі**: бар желіні таңдаңыз немесе жаңасын жасаңыз. Жаңа желі жасау кезінде {ifdef(public)}қосымша өрістер пайда болады:

     - **SDN**: {linkto(../../../../networks/vnet/concepts/sdn#vnet-sdn)[text=виртуалды желілерді басқару жүйесін]} таңдаңыз. Жаңа тіркелгілер үшін опция қолжетімді емес және әдепкі бойынша {linkto(../../../../networks/vnet/concepts/sdn#vnet-sdn-sprut)[text=Sprut]} пайдаланылады.

       {note:info}
       Әртүрлі SDN-де жасалған желілер бір-біріне қолжетімді емес, бірақ сіз оларды {linkto(../../../../networks/vnet/concepts/ips-and-inet#vnet-ips-and-inet-floating-ip)[text=Floating IP-мекенжайлары]} арқылы байланыстыра аласыз.
       {/note}
       {/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}параметрді орнатыңыз:{/ifdef}

     - **Ішкі желі мекенжайы**: CIDR-ді `XXX.XXX.XXX.XXX/XX` пішімінде көрсетіңіз, мысалы, `10.0.0.0/24`.
     {/includetag}
     {includetag(create)}
   - **Конфигурациялық дискіні пайдалану**: желиде DHCP-сервері болмаған жағдайда виртуалды машинада желіні баптау қажет болса, опцияны қосыңыз. Егер {linkto(../../../../../networks/vnet/concepts/net-types#vnet-net-types-external-net)[text=сыртқы желі]} немесе {linkto(../../../../../networks/vnet/concepts/ips-and-inet#vnet-ips-and-inet-network-addressing)[text=DHCP]} өшірілген желі таңдалса, опция автоматты түрде қосылады.
   - **DNS-атауы**: {ifdef(public)}{linkto(../../../../../networks/dns/instructions/private-dns#dns-private-dns)[text=жеке DNS]}{/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../../networks/vnet/instructions/private-dns#vnet-private-dns)[text=жеке DNS]}{/ifdef} үшін домендік атауды көрсетіңіз. Оның бойынша ішкі желиде инстанстарға жүгінуге болады.
     {/includetag}
     {includetag(create-from-disk)}
   - **Конфигурациялық дискіні пайдалану**: желиде DHCP-сервері болмаған жағдайда виртуалды машинада желіні баптау қажет болса, опцияны қосыңыз. Егер {linkto(../../../../networks/vnet/concepts/net-types#vnet-net-types-external-net)[text=сыртқы желі]} немесе {linkto(../../../../networks/vnet/concepts/ips-and-inet#vnet-ips-and-inet-network-addressing)[text=DHCP]} өшірілген желі таңдалса, опция автоматты түрде қосылады.
   - **DNS-атауы**: {ifdef(public)}{linkto(../../../../networks/dns/instructions/private-dns#dns-private-dns)[text=жеке DNS]}{/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}{linkto(../../../../networks/vnet/instructions/private-dns#vnet-private-dns)[text=жеке DNS]}{/ifdef} үшін домендік атауды көрсетіңіз. Оның бойынша ішкі желиде инстанстарға жүгінуге болады.
     {/includetag}
     {includetag(create,create-from-disk)}
   - **Виртуалды машинаның кілті**: SSH арқылы қосылу үшін кілтті таңдаңыз немесе жаңасын жасаңыз.

     `Жаңа кілт жасау` таңдалған кезде ВМ жасалғаннан кейін `*.pem` жеке кілт файлы автоматты түрде жүктеледі. Оны сақтаңыз, кейін ол серверге SSH арқылы қосылу үшін қажет болады.

     Кілттің ашық бөлігі серверге автоматты түрде қосылады.

   - **Firewall баптаулары**: қажетті қауіпсіздік топтарын таңдаңыз.
     {/includetag}
     {includetag(create)}
     SSH арқылы қосылу үшін `ssh` немесе `ssh+www` тобын қосыңыз. Желілік қол жеткізу ережелерін баптау туралы толығырақ {linkto(../../../../../networks/vnet/instructions/secgroups#vnet-secgroups)[text=Қауіпсіздік топтары]} бөлімінде.

   - (Қосымша) **Сыртқы IP тағайындау**: ВМ үшін жаңа немесе бар {linkto(../../../../../networks/vnet/concepts/ips-and-inet#vnet-ips-and-inet-floating-ip)[text=Floating IP-мекенжайын]} тағайындау үшін опцияны қосыңыз. Опция {linkto(../../../../../networks/vnet/concepts/net-types#vnet-net-types-standard-net)[text=желі]} үшін интернетке қол жеткізу қосылған болса қолжетімді.

     {note:info}
     Егер бұрын ВМ үшін {linkto(../../../../../networks/vnet/concepts/net-types#vnet-net-types-external-net)[text=сыртқы желі]} таңдалған болса, опция әрқашан қосылады.
     {/note}
     {/includetag}
     {includetag(create-from-disk)}
     SSH арқылы қосылу үшін `ssh` немесе `ssh+www` тобын қосыңыз. Желілік қол жеткізу ережелерін баптау туралы толығырақ {linkto(../../../../networks/vnet/instructions/secgroups#vnet-secgroups)[text=Қауіпсіздік топтары]} бөлімінде.

   - (Қосымша) **Сыртқы IP тағайындау**: ВМ үшін жаңа немесе бар {linkto(../../../../networks/vnet/concepts/ips-and-inet#vnet-ips-and-inet-floating-ip)[text=Floating IP-мекенжайын]} тағайындау үшін опцияны қосыңыз. Опция {linkto(../../../../networks/vnet/concepts/net-types#vnet-net-types-standard-net)[text=желі]} үшін интернетке қол жеткізу қосылған болса қолжетімді.

     {note:info}
     Егер бұрын ВМ үшін {linkto(../../../../networks/vnet/concepts/net-types#vnet-net-types-external-net)[text=сыртқы желі]} таңдалған болса, опция әрқашан қосылады.
     {/note}
     {/includetag}
     {includetag(create)}
     {ifdef(public)}
   - (Қосымша) **Доменді сыртқы IP-ге байлау**: FQDN-ді сыртқы IP-мекенжайға байлау үшін опцияны қосыңыз және доменді көрсетіңіз. Таңдалған IP-мекенжай үшін DNS-аймағына {linkto(../../../../../networks/dns/instructions/publicdns/records#dns-records)[text=A-жазба]} қосылады. Опция **Сыртқы IP тағайындау** опциясы қосылған болса қолжетімді.

     {note:warn}
     Сыртқы IP-мекенжайды DNS-аймағының CNAME-жазбасымен сәйкес келетін доменге байлау мүмкін емес. Бұл жағдайда ВМ жасалады, бірақ A-жазба қосылмайды.
     {/note}
     {/ifdef}

     {ifndef(private-cert)}
   - **Мониторингті қосу**: {linkto(../../../../../monitoring-services/monitoring/concepts#monitoring-concepts)[text=мониторинг сервісіне]} метрикаларды жіберу үшін агентті орнату мақсатында қосыңыз.
     {/ifndef}
     {/includetag}
     {includetag(create-from-disk)}
     {ifdef(public)}
   - (Қосымша) **Доменді сыртқы IP-ге байлау**: FQDN-ді сыртқы IP-мекенжайға байлау үшін опцияны қосыңыз және доменді көрсетіңіз. Таңдалған IP-мекенжай үшін DNS-аймағына {linkto(../../../../networks/dns/instructions/publicdns/records#dns-records)[text=A-жазба]} қосылады. Опция **Сыртқы IP тағайындау** опциясы қосылған болса қолжетімді.

     {note:warn}
     Сыртқы IP-мекенжайды DNS-аймағының CNAME-жазбасымен сәйкес келетін доменге байлау мүмкін емес. Бұл жағдайда ВМ жасалады, бірақ A-жазба қосылмайды.
     {/note}
     {/ifdef}

     {ifndef(private-cert)}
   - **Мониторингті қосу**: {linkto(../../../../monitoring-services/monitoring/concepts#monitoring-concepts)[text=мониторинг сервісіне]} метрикаларды жіберу үшін агентті орнату мақсатында қосыңыз.
     {/ifndef}
     {/includetag}
   {includetag(create,create-from-disk)}
1. {ifdef(public)}**Резервтік көшіру**{/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}**Резервтік көшіруді баптау**{/ifdef} блогында қажетті параметрлерді көрсетіңіз.

   Әдепкі бойынша резервтік көшіру қосылған және ол үшін ұсынылатын баптаулар көрсетілген, бірақ сіз оларды өзгерте аласыз:

    - **Жоспар атауы**: резервтік көшіру жоспары үшін кез келген атауды көрсетіңіз.
    - **Толық бэкаптарды сақтау стратегиясын (GFS) қосу**: сақтау мерзімі аяқталғаннан кейін резервтік көшірмелер автоматты түрде жойылуы үшін қосыңыз.

        - **Апталық толық бэкаптарды сақтау**: резервтік көшірмені қанша апта сақтау керектігін көрсетіңіз.
        - **Айлық толық бэкаптарды сақтау**: резервтік көшірмені қанша ай сақтау керектігін көрсетіңіз.
        - **Жылдық толық бэкаптарды сақтау**: резервтік көшірмені қанша жыл сақтау керектігін көрсетіңіз.

      {note:info}
      Егер **Толық бэкаптарды сақтау стратегиясын (GFS) қосу** опциясы өшірілген болса, тек ең соңғы резервтік көшірмелер сақталады, олардың саны **Толық бэкаптардың ең көп саны** өрісінде көрсетіледі. Көрсетілген шектің аяқталуы кезінде ескі резервтік көшірмелер автоматты түрде жойылады.
      {/note}

    - **Инкременталды бэкаптарды қосу**: апта сайын бір рет толық резервтік көшірме жасалуы үшін опцияны қосыңыз. Аптаның барлық басқа күндерінде инкременталды резервтік көшірмелер жасалады.
    - **Резервтік көшіру кестесі**: апта күндерін және резервтік көшіруді іске қосу уақытын таңдаңыз. Уақыт GMT+03:00 уақыт аймағында көрсетіледі.
      {ifdef(public)}
      {/includetag}
      {includetag(create)}
    - **Жойылмайтын бэкаптарды қосу**: {linkto(../../../../../storage/s3/concepts/objects-lock#s3-concepts-object-lock)[text=объектілерді блоктау]} арқылы резервтік көшірмелерді жойылудан қорғау үшін опцияны қосыңыз. Екі блоктау түрі қолжетімді:
      {/includetag}
      {includetag(create-from-disk)}
    - **Жойылмайтын бэкаптарды қосу**: {linkto(../../../../storage/s3/concepts/objects-lock#s3-concepts-object-lock)[text=объектілерді блоктау]} арқылы резервтік көшірмелерді жойылудан қорғау үшін опцияны қосыңыз. Екі блоктау түрі қолжетімді:
      {/includetag}
      {includetag(create,create-from-disk)}
      - `Уақытша қорғау`: көшірмелерді жойылудан және қайта жазудан берілген күн саны бойынша қорғайды. Екі режимі бар:

        - `Compliance`: қатаң блоктау. Көрсетілген сақтау кезеңінде алынып тасталмайды немесе өзгертілмейді.
        - `Governance`: жобаның әкімшісі арқылы алып тастау мүмкіндігі бар икемді блоктау.

      - `Мерзімсіз қорғау`: блоктау алынып тасталғанға дейін көшірмені жойылудан қорғайды.
      {/ifdef}

1. {ifdef(public)}**Жасау**{/ifdef}{ifdef(private,private-pg,private-pdf,private-pg-pdf,private-cert)}**Инстансты жасау**{/ifdef} батырмасын басыңыз.
1. ВМ жасалуды күтіңіз. Бұл процесс біраз уақыт алуы мүмкін. Жасау аяқталған кезде ВМ сипаттамалары мен қосылу нұсқаулығы бар бет ашылады.
{/includetag}