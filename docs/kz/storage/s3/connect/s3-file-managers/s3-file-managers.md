# {heading(Файлдық менеджерлер)[id=s3-connect-file-managers]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{var(s3)} объекттерді файлдық менеджерлер көмегімен басқаруды қолдайды. Мұндай менеджерлер сақтау орнының объекттерімен құрылғыңыздың директориялары мен файлдары сияқты жұмыс жасауға мүмкіндік береді. Бұл көптеген файлдармен немесе бірнеше сақтау орнымен бір мезгілде жұмыс істеу үшін ыңғайлы.

## {heading(CyberDuck)[id=s3-connect-file-managers-cyberduck]}

CyberDuck әртүрлі сақтау орындарына бір мезгілде қосылуға мүмкіндік береді. Әрбір қосылу жеке терезеде ашылады. Файлдарды құрылғы мен сақтау орнының арасында да, әртүрлі сақтау орындарының немесе бір сақтау орнының бакеттерінің арасында да көшіруге болады. macOS және Windows үшін қолжетімді.

1. {ifdef(public)}{var(cloud)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef} жеке кабинетінде {var(s3)} үшін {linkto(../../instructions/access-management/access-keys#s3-instructions-access-keys-new-account-access-key)[text=аккаунт пен қол жеткізу кілтін жасаңыз]}. Құпия қол жеткізу кілтін (**Secret Key**) сақтаңыз.
1. CyberDuck қолданбасын [орнатыңыз](https://cyberduck.io/download).
1. Объектілік сақтау орнына қосылымды баптаңыз:

   1. **Жаңа қосылым** түймесін басыңыз.
   1. Қосылым параметрлерін көрсетіңіз:

      - Қосылым түрі: `Amazon S3`.
      - **Сервер**: {ifdef(s3,s3-pdf)}сервисті орнату кезінде көрсетілген{/ifdef}{ifdef(public)}аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес домендік атауды көрсетіңіз.

        - `hb.vkcloud-storage.ru` немесе `hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
        - `hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін{/ifdef}.

      - **Порт**: `443`.
      - **Access Key ID**: {var(s3)} аккаунтын жасау кезінде алынған қол жеткізу кілтінің идентификаторы.
      - **Secret Access Key**: {var(s3)} аккаунтын жасау кезінде алынған құпия қол жеткізу кілті. Құпия кілт **Access Key ID** өрісінде көрсеткен кілт идентификаторына сәйкес болуы тиіс.

   1. **Қосылу** түймесін басыңыз.

Сәтті қосылым нәтижесінде аккаунтқа қолжетімді бакеттер CyberDuck-та көрсетіледі.

{note:info}
Cyberduck арқылы жасалатын бакеттер мен объектілер әдепкі бойынша Cyberduck баптауларында көрсетілген {linkto(../../concepts/about#s3-concepts-about-storage-class)[text=сақтау класына]} және {linkto(../../concepts/access/s3-acl#s3-concepts-acl-permissions)[text=қолжетімділік түріне]} ие болады.
{/note}

## {heading(WinSCP)[id=s3-connect-file-managers-winscp]}

WinSCP әртүрлі сақтау орындарына бір мезгілде қосылуға мүмкіндік береді. Әрбір қосылым немесе жергілікті директория жеке вкладкада ашылады. Файлдарды құрылғы мен сақтау орнының арасында да, әртүрлі сақтау орындарының немесе бір сақтау орнының бакеттерінің арасында да көшіруге болады. Windows үшін қолжетімді.

1. {ifdef(public)}{var(cloud)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef} жеке кабинетінде {var(s3)} үшін {linkto(../../instructions/access-management/access-keys#s3-instructions-access-keys-new-account-access-key)[text=аккаунт пен қол жеткізу кілтін жасаңыз]}. Құпия қол жеткізу кілтін (**Secret Key**) сақтаңыз.
1. WinSCP қолданбасын [орнатыңыз](https://winscp.net/eng/download.php).
1. Объектілік сақтау орнына қосылымды баптаңыз:

   1. Басты мәзірден **Вкладки** → **Подключение** → **Управление подключениями** таңдаңыз.
   1. Қосылым баптауларын көрсетіңіз:

      - **Тасымалдау хаттамасы**: `Amazon S3`;
      - **Хост атауы**: {ifdef(s3,s3-pdf)}сервисті орнату кезінде көрсетілген{/ifdef}{ifdef(public)}аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес домендік атауды көрсетіңіз.

        - `hb.vkcloud-storage.ru` немесе `hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
        - `hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін{/ifdef}.

      - **Порт**: `443`.
      - **Қол жеткізу кілтінің идентификаторы**: {var(s3)} аккаунтын жасау кезінде алынған кілт идентификаторы.
      - **Құпия қол жеткізу кілті**: {var(s3)} аккаунтын жасау кезінде алынған құпия қол жеткізу кілті. Құпия кілт **Қол жеткізу кілтінің идентификаторы** өрісінде көрсеткен кілт идентификаторына сәйкес болуы тиіс.

   1. **Кіру** түймесін басыңыз.

Сәтті қосылым нәтижесінде аккаунтқа қолжетімді бакеттер WinSCP вкладкасында көрсетіледі.

{note:info}
WinSCP арқылы жасалатын бакеттерде `Hotbox` {linkto(../../concepts/about#s3-concepts-about-storage-class)[text=сақтау класы]} болады. WinSCP арқылы жасалатын объекттерде бакеттен мұраланған сақтау класы болады.
{/note}

## {heading(Диск-О:)[id=s3-connect-file-managers-disk-o]}

Диск-О: әртүрлі сақтау орындарына бір мезгілде қосылуға мүмкіндік береді. Әрбір қосылым жергілікті файлдық жүйеде жеке диск ретінде ашылады. Диск-О: бүкіл {var(s3)}-ға емес, бакетке қосылады. Бірнеше бакетпен жұмыс істеу үшін жеке қосылымдар жасау қажет. Файлдарды құрылғы мен сақтау орнының арасында да, әртүрлі сақтау орындарының немесе бір сақтау орнының бакеттерінің арасында да көшіруге болады. macOS және Windows үшін қолжетімді.

1. {ifdef(public)}{var(cloud)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef} жеке кабинетінде {var(s3)} үшін {linkto(../../instructions/access-management/access-keys#s3-instructions-access-keys-new-account-access-key)[text=аккаунт пен қол жеткізу кілтін жасаңыз]}. Құпия қол жеткізу кілтін (**Secret Key**) сақтаңыз.
1. Қажетті бакетті таңдаңыз немесе {linkto(../../instructions/buckets/create-bucket#s3-instructions-create-bucket)[text=жаңа бакет жасаңыз]}.
1. Диск-О: қолданбасын [орнатыңыз](https://disk-o.cloud/ru).
1. Объектілік сақтау орнының бакетіне қосылымды баптаңыз:

   1. **Подключить** түймесін басыңыз.
   1. **MSC S3** таңдаңыз.
   1. Қосылым баптауларын көрсетіңіз:

      - **Сақтау орнын таңдаңыз**: Hotbox {linkto(../../concepts/about#s3-concepts-about-storage-class)[text=сақтау класы]} бар бакет үшін `Горячие данные`, Icebox {linkto(../../concepts/about#s3-concepts-about-storage-class)[text=сақтау класы]} бар бакет үшін `Холодные данные`;
      - **Бакетті енгізіңіз**: бар бакеттің атауы.
      - **Access Key**: {var(s3)} аккаунтын жасау кезінде алынған кілт идентификаторы.
      - **Secret Key**: {var(s3)} аккаунтын жасау кезінде алынған құпия қол жеткізу кілті. Құпия кілт **Access Key** өрісінде көрсеткен кілт идентификаторына сәйкес болуы тиіс.

   1. **Подключить** түймесін басыңыз.

Сәтті қосылым нәтижесінде бакет объекттері жергілікті файлдық жүйеде және Диск-О: жылдам қол жеткізу терезесінде қолжетімді болады. Бакетте объекттер болмаса, қосылған диск бос болады. Диск директориясына 1 ГБ-ға дейінгі файл қосыңыз және {ifdef(public)}{var(cloud)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef} жеке кабинеты арқылы бакетте объект пайда болғанын тексеріңіз.

{note:info}
Диск-О: арқылы жасалатын объекттерде бакеттен мұраланған {linkto(../../concepts/about#s3-concepts-about-storage-class)[text=сақтау класы]} болады.
{/note}

## {heading(s3fs)[id=s3-connect-file-managers-s3fs]}

s3fs файлдық менеджері бакетті FUSE арқылы монтауға және {var(s3)} объекттерімен жергілікті файлдық жүйеңізде немесе CLI арқылы жұмыс жасауға мүмкіндік береді. Linux, macOS, Windows және FreeBSD үшін қолжетімді.

1. {ifdef(public)}{var(cloud)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef} жеке кабинетінде {var(s3)} үшін {linkto(../../instructions/access-management/access-keys#s3-instructions-access-keys-new-account-access-key)[text=аккаунт пен қол жеткізу кілтін жасаңыз]}. Құпия қол жеткізу кілтін (**Secret Key**) сақтаңыз.
1. Қажетті бакетті таңдаңыз немесе {linkto(../../instructions/buckets/create-bucket#s3-instructions-create-bucket)[text=жаңа бакет жасаңыз]}.
1. s3fs орнатыңыз.

   {tabs}

   {tab(Debian 9 немесе одан жаңа)}

   Командалы орындаңыз:

   ```console
   sudo apt install s3fs
   ```

   {/tab}

   {tab(Ubuntu 16.04 немесе одан жаңа)}

   Командалы орындаңыз:

   ```console
   sudo apt install s3fs
   ```

   {/tab}

   {tab(CentOS 7 немесе одан жаңа)}

   EPEL-де команданы орындаңыз:

   ```console
   sudo yum install epel-release
   sudo yum install s3fs-fuse
   ```

   {/tab}

   {tab(SUSE 12 және openSUSE 42.1)}

   Командалы орындаңыз:

   ```console
   sudo zypper install s3fs
   ```

   {/tab}

   {tab(macOS)}

   Homebrew-та команданы орындаңыз:

   ```console
   brew cask install osxfuse
   brew install s3fs
   ```

   {/tab}

   {/tabs}

1. Объектілік сақтау орнына қосылымды баптаңыз:

   1. Кілт идентификаторын және құпия кілтті `<КІЛТ_ИДЕНТИФИКАТОРЫ>:<ҚҰПИЯ_КІЛТ>` форматында `~/.passwd-s3fs` файлына сақтаңыз:

      ```console
      echo <КІЛТ_ИДЕНТИФИКАТОРЫ>:<ҚҰПИЯ_КІЛТ> >  ~/.passwd-s3fs
      ```

   1. `~/.passwd-s3fs` файлына қол жеткізуді шектеңіз:

      ```console
      chmod 600  ~/.passwd-s3fs
      ```

   1. Бакет монтаилетін директорияны таңдаңыз және осы директорияға оқу және жазу құқықтарының бар екеніне көз жеткізіңіз.
   1. Командалы орындаңыз:

      ```console
      s3fs <БАКЕТ_АТАУЫ> <ЖОЛ> -o passwd_file=~/.passwd-s3fs -o url=<ENDPOINT_URL> -o use_path_request_style
      ```
      Мұнда:

      - `<БАКЕТ_АТАУЫ>` — {var(s3)}-тағы бакеттің атауы;
      - `<ЖОЛ>` — бакеттің мазмұны көрсетілетін директорияға дейінгі жергілікті файлдық жүйедегі жол;
        {ifdef(public)}
      - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес болуы тиіс:

        - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
        - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.
        {/ifdef}
        {ifdef(s3,s3-pdf)}
      - `<ENDPOINT_URL>` — сіздің {var(s3)} инсталляциясында пайдаланылатын домендік атауы бар сілтеме. Атау форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге хабарласыңыз.
        {/ifdef}

Егер қосылым сәтті өтсе, `<ЖОЛ>` директориясында қосылған бакеттің барлық объекттері көрсетілуі тиіс. Бакетте объекттер болмаса, директория бос болады. Директорияға 1 ГБ-ға дейінгі файл қосыңыз және {ifdef(public)}{var(cloud)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef} жеке кабинеты арқылы бакетте объект пайда болғанын тексеріңіз.

{note:info}
s3fs арқылы жасалатын объекттерде бакеттен мұраланған {linkto(../../concepts/about#s3-concepts-about-storage-class)[text=сақтау класы]} болады.
{/note}