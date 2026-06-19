# {heading(Операциялық жүйелер)[id=iaas-oper-system]}

{include(/kz/_includes/_translated_by_ai.md)}

{var(cloud)} платформасында виртуалды машинаны жасау кезінде Microsoft Windows немесе Linux тобына жататын операциялық жүйені таңдауға болады. Платформа тізімінде жоқ операциялық жүйесі бар ВМ жасау үшін қажетті ОС бар виртуалды машинаның [образ] файлын(../image-vm) пайдаланыңыз.

{var(cloud)} жүйесінде Windows ОС-тың серверлік нұсқаларын көшіру қолдау табады:

- Windows Server 2008 / 2008 R2;
- Windows Server 2012 / 2012 R2;
- Windows Server 2016;
- Windows Server 2019;
- Windows Server 2022.

{note:warn}
{var(cloud)} жүйесінде Windows 7 / 8 / 8.1 / 10 / 11 операциялық жүйелерін пайдалану мүмкін емес. Бұл шектеу барлық жобалар үшін белгіленген және оны алып тастау мүмкін емес.
{/note}

## {heading(Әдепкі тіркелгілік жазба)[id=iaas-oper-system-default-account]}

{var(cloud)} образдарының операциялық жүйелерінде ({var(cloud)} ОС Bitrix-тен басқа) қауіпсіздік мақсатында `root` тіркелгілік жазбасы бұғатталған және әдепкі бойынша пайдалануға арналған тіркелгілік жазба қосылған.

Әдепкі тіркелгілік жазбаның атауын төмендегі тізімнен немесе [құпиясөзді орнату](../../instructions/vm/vm-manage#iaas-vm-password) терезесінен көре аласыз.

{cut(Әртүрлі ОС үшін әдепкі тіркелгілік жазбалар тізімі)}

| Операциялық жүйе | Пайдаланушы аты |
| ---              | ---             |
| AlmaLinux        | almalinux       |
| ALT Linux        | altlinux        |
| Astra Linux      | astra           |
| Bitrix           | root            |
| CentOS           | centos          |
| Debian           | debian          |
| Fedora           | fedora          |
| FreeBSD          | freebsd         |
| openSUSE         | opensuse        |
| Ubuntu           | ubuntu          |
| РЕД ОС           | redos           |
| Windows          | Admin           |

{/cut}

## {heading(Лицензиялар)[id=iaas-oper-system-licenses]}

{var(cloud)} компаниялармен жасалған келісімдер негізінде бағдарламалық қамтылымды лицензиялауға құқылы:

- Microsoft (Microsoft Services Provider License Agreement — SPLA);
- РЕД СОФТ;
- BaseALT;
- Астра Линукс.

Толығырақ — [ВМ үшін лицензиялар](/kz/computing/vm-licenses) бөлімінде.
