{include(/kz/_includes/_translated_by_ai.md)}

{note:info}

VK Cloud ішіне көші-қон қолдау көрсетілетін Windows ОС тізімі [операциялық жүйелер](../../concepts/oper-system) бөлімінде келтірілген.

{/note}

VK Cloud ішіне ВМ образын жасау және жүктеу Windows Server 2016 Standard редакциясы мысалында қарастырылады. Образды дайындау үшін Windows 11 Pro ОС-ы бар компьютер пайдаланылады. Барлық командалар Windows PowerShell консолінде орындалады.

Образды дайындау үшін пайдаланылатын компьютерге қойылатын талаптар:

[cols="1,3", options="header"]
|===
|Компонент
|Компонентке қойылатын талаптар

|Операциялық жүйе
|Windows 10/11 (Home редакциясынан басқа), Windows Server 2012 R2 және жоғары

|Процессор (CPU)
|Виртуализация технологиясын қолдайтын 2–4 ядро (Intel VT-x немесе AMD-V)

|Жедел жад (RAM)
|Виртуалды машиналармен және құралдармен жұмыс істеу үшін кемінде 8 ГБ. Windows образдарымен жайлы жұмыс істеу үшін, әсіресе бірнеше виртуалды машинаны пайдаланғанда, 16 ГБ және одан да көп ұсынылады

|Дискілік кеңістік
|Windows образдары мен уақытша файлдарды сақтау үшін дискіде кемінде 50 ГБ бос орын. Файлдарды тезірек өңдеу және образдарды жасау үшін SSD пайдалану ұсынылады
|===

## Дайындық қадамдары

1. VK Cloud ішіне көшіру жоспарланған Windows ОС-ының орнату ISO-образын жүктеп алыңыз. Образдың en-US нұсқасын пайдалану ұсынылады.
1. OpenStack клиенті [орнатылғанына](/kz/tools-for-using-services/cli/openstack-cli#1_openstack_klientin_ornatynyz) көз жеткізіңіз және жобада [аутентификациядан өтіңіз](/kz/tools-for-using-services/cli/openstack-cli#3_autentifikaciyadan_otiniz).

## 1. Құралдар жиынтығын дайындаңыз

1. Hyper-V виртуализация механизмін қосыңыз.

    1. Компьютердің басқару тақтасына өтіңіз. Ол үшін WIN+R пернелер тіркесімін басыңыз, ашылған **Орындау** терезесінде `control` енгізіп, **OK** батырмасын басыңыз.
    1. Басқару тақтасында **Бағдарламалар мен компоненттер** таңдаңыз.
    1. Сол жақ бүйірлік мәзірден **Windows компоненттерін қосу немесе өшіру** таңдаңыз.
    1. **Hyper-V** опциясын жалаушамен белгілеп, **ОК** батырмасын басыңыз.
    1. Компьютерді қайта іске қосыңыз.

1. Windows Powershell бағдарламасының нұсқасын 4 немесе одан жоғары нұсқаға жаңартыңыз.

    1. Ағымдағы нұсқаны тексеріңіз. Ол үшін Windows PowerShell-ді іске қосып, команданы орындаңыз: `$PSVersionTable.PSVersion` немесе `get-host`.
    1. Егер нұсқа төртіншіден төмен болса, Windows PowerShell-дің соңғы нұсқасын [Microsoft ресми сайтынан](https://aka.ms/PSWindows) орнатыңыз немесе ішкі ресурстан жаңартуды орнату үшін ұйымыңыздың жүйелік әкімшісіне жүгініңіз.

1. Windows Assessment and Deployment Kit (ADK) құралдар жиынтығын орнатыңыз.

    1. ADK орнатылғанын тексеріңіз. Ол үшін басқару тақтасындағы **Бағдарламалар мен компоненттер** бөліміне өтіп, **Windows Assessment and Deployment Kit** бағдарламасын табыңыз.
    1. Егер бұл бағдарлама болмаса, ADK-ны [ресми сайттан](https://learn.microsoft.com/en-us/windows-hardware/get-started/adk-install) жүктеп алып, орнатыңыз. Орнату кезінде **Windows Assessment Toolkit** компонентінен басқа барлық компоненттерді жалаушамен таңдаңыз.

1. [VirtIO (KVM) драйверлерін](https://fedorapeople.org/groups/virt/virtio-win/direct-downloads/archive-virtio/virtio-win-0.1.266-1/virtio-win.iso) жүктеп алыңыз.
1. Windows образдарын жасауды автоматтандыру құралы — Windows Imaging Tools репозиторийінің [архивін](https://github.com/cloudbase/windows-imaging-tools/archive/refs/heads/master.zip) жүктеп алыңыз.
1. Windows жаңартуларын басқару модулі — WindowsUpdateCLI репозиторийінің [архивін](https://github.com/cloudbase/WindowsUpdateCLI/archive/refs/heads/master.zip) жүктеп алыңыз.

## 2. Hyper-V ішінде сыртқы виртуалды коммутатор жасаңыз

Бұл дайындалған образдан жасалған виртуалды машиналарыңызға интернетке физикалық желілік адаптер арқылы қосылуға мүмкіндік береді.

1. Hyper-V диспетчерін іске қосыңыз. Ол үшін WIN+R пернелер тіркесімін басыңыз, ашылған **Орындау** терезесінде `virtmgmt.msc` енгізіп, **OK** батырмасын басыңыз.
1. Сол жақ мәзірден компьютеріңіздің атауын таңдаңыз.
1. Оң жақтағы **Әрекеттер** панелінен **Виртуалды коммутаторлар диспетчері** опциясын таңдаңыз.
1. **Виртуалды коммутаторлар диспетчері** терезесінің сол жақ мәзірінен **Виртуалды желілік коммутатор жасау** опциясын таңдаңыз.
1. Коммутатор түрі үшін `Сыртқы` мәнін таңдап, **Виртуалды коммутатор жасау** батырмасын басыңыз.
1. **Атауы** өрісіне коммутатор атауын енгізіңіз — `external`.
1. **Қосылу түрі** бөлімінде сыртқы желі таңдалғанына көз жеткізіп, тізімнен интернетке қолжетімді желілік адаптерді, мысалы компьютеріңіздің Ethernet немесе Wi‑Fi адаптерін таңдаңыз.
1. (Опционалды) Компьютеріңіздің ОС-ына да осы адаптерді пайдалануға рұқсат беру үшін **Басқарушы операциялық жүйеге осы желілік адаптерге ортақ қолжетімділік беруге рұқсат ету** опциясын таңдаңыз.
1. Енгізілген өзгерістерді қолданыңыз.
1. Егер бұл өзгерістер ағымдағы желілік қосылымды бұзуы мүмкін екені туралы ескерту көрсетілсе, жалғастыруға келісіңіз.
1. **OK** батырмасын басып, виртуалды коммутаторды жасауды аяқтаңыз.

## 3. Windows Imaging Tools конфигурациясын дайындаңыз

1. Windows Imaging Tools репозиторийі архивін `C:` дискінің түбірлік директориясына шығарыңыз. Нәтижесінде `C:\windows-imaging-tools-master` директориясы жасалады.
1. `C:\windows-imaging-tools-master` ішінде `ISO` және `IMG` директорияларын жасаңыз. `ISO` директориясы ISO-файлдар үшін, `IMG` — осы нұсқаулықты орындау нәтижесінде жасалатын Windows образын үшін пайдаланылады.
1. Windows орнату образы мен VirtIO драйверлері бар ISO-файлдарды `ISO` директориясына жылжытыңыз.
1. `ISO` директориясына өтіп, Windows орнату образы бар ISO-файлды тінтуірдің оң жақ батырмасымен басып, контекстік мәзірден **Қосу** тармағын таңдаңыз.

   ISO-файл виртуалды диск ретінде монталанады. Windows Explorer-де жаңа диск пайда болады, мысалы `E:`.

## 4. ОС-тың орнату WIM-файлын дайындаңыз

Windows орнату ISO-образы операциялық жүйенің бірнеше редакциясын қамтуы мүмкін. Орнату автоматты режимде өтетіндіктен, қажетті редакцияны алдын ала таңдап, оны бөлек WIM-файлға экспорттаңыз. Ол үшін:

1. Windows PowerShell-ді әкімші атынан іске қосыңыз.
1. Команда арқылы Windows-тың барлық нұсқаларының тізімін шығарыңыз:

    ```console
    Get-WindowsImage -ImagePath E:\sources\Install.wim
    ```

   Мұнда `E:\sources\Install.wim` — Windows-тың қолжетімді редакциялары бар WIM-файлға монталанған виртуалды дисктегі толық жол.

   `ImageIndex` параметрінде олардың реттік нөмірлері көрсетілген редакциялар тізімі пайда болады:

    ```txt
    ImageIndex      : 1
    ImageName       : Windows Server 2016 Standard
    ImageDescription: Это рекомендуемый вариант. Он сокращает управление и обслуживание за счет установки только того, что требуется для большинства приложений и ролей сервера. Он не включает графический интерфейс пользователя, однако вы можете полностью управлять сервером локально или удаленно с помощью Windows PowerShell или других средств. См. раздел "Варианты установки Windows Server".
    ImageSize       : 9 146 079 566 bytes

    ImageIndex      : 2
    ImageName       : Windows Server 2016 Standard (возможности рабочего стола)
    ImageDescription: Этот вариант подходит, если нужен графический пользовательский интерфейс (например, для обеспечения обратной совместимости приложения, которое не может работать при установке основных серверных компонентов). Поддерживаются все роли и компоненты сервера. Подробнее: "Варианты установки Windows Server".
    ImageSize       : 15 219 002 744 bytes
    ```

1. `Temp` дискінің түбірлік директориясында `C:` директориясын жасаңыз.
1. `ImageIndex` = `1` редакциясын команда арқылы экспорттаңыз:

    ```console
    dism `
    /export-image `
    /SourceImageFile:E:\sources\Install.wim `
    /SourceIndex:1 `
    /DestinationImageFile:C:\Temp\install.wim `
    /Compress:max `
    /CheckIntegrity
    ```

   Мұнда:

    * `SourceIndex` — экспортталатын редакцияның реттік нөмірі.
    * `DestinationImageFile` — экспортталатын редакцияны сақтау үшін толық жол.

## 5. Образды жергілікті түрде жинаңыз

1. `C:\windows-imaging-tools-master` директориясына өтіп, образ жасауды автоматтандыруға арналған скрипттері бар модульдерді импорттаңыз:

    ```console
    Import-Module .\WinImageBuilder.psm1
    Import-Module .\Config.psm1
    Import-Module .\UnattendResources\ini.psm1
    ```

1. WindowsUpdateCLI репозиторийі архивін шығарып, `WindowsUpdateCLI-master` директориясының мазмұнын `C:\windows-imaging-tools-master\UnattendResources\WindowsUpdates` ішіне көшіріңіз.
1. `config.ini` конфигурациялық файлын жасаңыз:

    ```console
    $ConfigFilePath = ".\config.ini"
    New-WindowsImageConfig -ConfigFilePath $ConfigFilePath
    ```

1. Жасалған файлды ашып, параметрлерін өңдеңіз:

    ```ini
    wim_file_path=C:\Temp\install.wim
    image_name=Windows Server 2016 Standard
    image_path=C:\windows-imaging-tools-master\IMG\Win_Server_2016_img.raw
    virtual_disk_format=RAW
    image_type=KVM
    external_switch=external
    virtio_iso_path="C:\windows-imaging-tools-master\ISO\virtio-win.iso"
    time_zone="Russian Standard Time"
    install_qemu_ga=True
    install_updates=True
    purge_updates=False
    disk_layout=BIOS
    ```

   Мұнда:

    * `wim_file_path` — бұрын таңдалған ОС редакциясының WIM-файлына толық жол.
    * `image_name` — Windows ОС редакциясының атауы. Ол таңдалған ОС редакциясы үшін `ImageName` параметрінің мәнімен сәйкес келуі керек.
    * `image_path` — жасалатын Windows образын сақтау үшін толық жол.
    * `virtual_disk_format` — виртуалды диск форматы.
    * `image_type` — образ түрі.
    * `external_switch` — бұрын жасалған виртуалды коммутатордың атауы.
    * `virtio_iso_path` — VirtIO драйверлері бар ISO-файлға толық жол.
    * `time_zone` — қажетті уақыт белдеуінің атауы. Белдеулер атауларын `tzutil /l` командасының көмегімен анықтаңыз.
    * `install_qemu_ga=True` — QEMU агентін орнату.
    * `install_updates=True` — образды генерациялау кезінде Windows жаңартуларын орнату.
    * `purge_updates=False` — жаңартулар орнатылғаннан кейін `WinSXS` директориясын тазалауға тыйым салу.
    * `disk_layout` — дискіні таңбалау түрі.

    {note:info}

   VK Cloud платформасы ОС-ты BIOS арқылы жүктеуге арналған таңбаланған жүктеу дискілерін қолдайды. UEFI арқылы жүктеуге арналған таңбалау қолдау көрсетілмейді.

    {/note}

1. Команда көмегімен образды жергілікті құрастыруды іске қосыңыз:

    ```console
    New-WindowsOnlineImage -ConfigFilePath $ConfigFilePath
    ```

1. Операцияның аяқталуын күтіп, `C:\windows-imaging-tools-master\IMG\Win_Server_2016_img.raw` файлының жасалғанына көз жеткізіңіз.

## 6. Образды VK Cloud ішіне импорттаңыз

Образды импорттау үшін [OpenStack CLI пайдаланыңыз](../../instructions/images/images-manage#obrazdy_importtau):

```console
openstack image create \
    --progress \
    --private \
    --container-format bare \
    --disk-format raw \
    --file C:\windows-imaging-tools-master\IMG\Win_Server_2016_img.raw \
    --property store=s3 \
    --property hw_qemu_guest_agent=True \
    --property os_require_quiesce=yes \
    --property mcs:lic:mswinsrv=true \
    --property mcs_name='Windows Server 2016 Standard (en)' \
    --property os_admin_user='Admin' \
    --property os_type=windows \
    <ИМЯ_ОБРАЗА>
```
`--property <ключ>=<значение>` мәнін өзекті мәнге ауыстырыңыз. `--property <КЛЮЧ>=<ЗНАЧЕНИЕ>` түріндегі аргументтер образға [метатегтерді](/kz/computing/iaas/instructions/images/image-metadata) тағайындау үшін қолданылады.

Операцияның аяқталуын күтіңіз. Образ жүктелгеннен кейін VK Cloud платформасының стандартты құралдарымен [ВМ жасауға](../../instructions/vm/vm-create) мүмкіндік пайда болады.

## Пайдаланылмайтын ресурстарды жойыңыз

Егер импортталған образ енді қажет болмаса, оны [жойыңыз](../../instructions/images/images-manage#obrazdy_zhoyu).
