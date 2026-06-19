# {heading(Файл менеджерлері)[id=s3-connect-file-managers]}

{include(/kz/_includes/_translated_by_ai.md)}

{var(s3)} объектілерді файл менеджерлері арқылы басқаруды қолдайды. Мұндай менеджерлер қойма объектілерімен құрылғыңыздағы директориялар мен файлдар сияқты жұмыс істеуге мүмкіндік береді. Бұл көп файлмен немесе бір уақытта әртүрлі қоймалармен жұмыс істеуге ыңғайлы.

## {heading(CyberDuck)[id=s3-connect-file-managers-cyberduck]}

CyberDuck әртүрлі қоймаларға бір уақытта қосылуға мүмкіндік береді. Әр қосылым бөлек терезеде ашылады. Файлдарды құрылғы мен қойма арасында да, әртүрлі қоймалар арасында да немесе бір қойманың әртүрлі бакеттері арасында да көшіруге болады. macOS және Windows үшін қолжетімді.

1. {ifdef(public)}{var(cloud)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef} жеке кабинетінде {var(s3)} үшін {linkto(../../instructions/access-management/access-keys#s3-instructions-access-keys-new-account-access-key)[text=аккаунт пен қолжетімділік кілтін жасаңыз]}. Қолжетімділіктің құпия кілтін (**Secret Key**) сақтап қойыңыз.
1. CyberDuck-ті [орнатыңыз](https://cyberduck.io/download).
1. Объектілік қоймаға қосылуды баптаңыз:

   1. **Жаңа қосылым** түймесін басыңыз.
   1. Қосылым параметрлерін көрсетіңіз:

      - Қосылым түрі: `Amazon S3`.
      - **Сервер**: домендік атауды көрсетіңіз, {ifdef(s3,s3-pdf)}сервис орнатылған кезде көрсетілген{/ifdef}{ifdef(public)}аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келетін.

        - `hb.vkcloud-storage.ru` немесе `hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
        - `hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін{/ifdef}.

      - **Порт**: `443`.
      - **Access Key ID**: {var(s3)} аккаунтын жасау кезінде алынған қолжетімділік кілтінің идентификаторы.
      - **Secret Access Key**: {var(s3)} аккаунтын жасау кезінде алынған құпия қолжетімділік кілті. Құпия кілт **Access Key ID** өрісінде көрсеткен кілт идентификаторына сәйкес келуі тиіс.

   1. **Қосылу** түймесін басыңыз.

Сәтті қосылғаннан кейін аккаунтқа қолжетімді бакеттер CyberDuck ішінде көрсетіледі.

{note:info}
Cyberduck арқылы жасалатын бакеттер мен объектілер әдепкі бойынша Cyberduck баптауларында көрсетілген {linkto(../../concepts/about#s3-concepts-about-storage-class)[text=сақтау класына]} және {linkto(../../concepts/access/s3-acl#s3-concepts-acl-permissons)[text=қолжетімділік түріне]} ие болады.
{/note}

## {heading(WinSCP)[id=s3-connect-file-managers-winscp]}

WinSCP әртүрлі қоймаларға бір уақытта қосылуға мүмкіндік береді. Әр қосылым немесе жергілікті директория бөлек қойындыда ашылады. Файлдарды құрылғы мен қойма арасында да, әртүрлі қоймалар арасында да немесе бір қойманың әртүрлі бакеттері арасында да көшіруге болады. Windows үшін қолжетімді.

1. {ifdef(public)}{var(cloud)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef} жеке кабинетінде {var(s3)} үшін {linkto(../../instructions/access-management/access-keys#s3-instructions-access-keys-new-account-access-key)[text=аккаунт пен қолжетімділік кілтін жасаңыз]}. Қолжетімділіктің құпия кілтін (**Secret Key**) сақтап қойыңыз.
1. WinSCP-ті [орнатыңыз](https://winscp.net/eng/download.php).
1. Объектілік қоймаға қосылуды баптаңыз:

   1. Негізгі мәзірден **Қойындылар** → **Қосылу** → **Қосылымдарды басқару** тармақтарын таңдаңыз.
   1. Қосылым баптауларын көрсетіңіз:

      - **Беріліс протоколы**: `Amazon S3`;
      - **Хост атауы**: домендік атауды көрсетіңіз, {ifdef(s3,s3-pdf)}сервис орнатылған кезде көрсетілген{/ifdef}{ifdef(public)}аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келетін.

        - `hb.vkcloud-storage.ru` немесе `hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
        - `hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін{/ifdef}.

      - **Порт**: `443`.
      - **Қолжетімділік кілтінің идентификаторы**: {var(s3)} аккаунтын жасау кезінде алынған кілт идентификаторы.
      - **Құпия қолжетімділік кілті**: {var(s3)} аккаунтын жасау кезінде алынған құпия қолжетімділік кілті. Құпия кілт **Қолжетімділік кілтінің идентификаторы** өрісінде көрсеткен кілт идентификаторына сәйкес келуі тиіс.

   1. **Кіру** түймесін басыңыз.

Сәтті қосылғаннан кейін аккаунтқа қолжетімді бакеттер WinSCP қойындысында көрсетіледі.

{note:info}
WinSCP арқылы жасалатын бакеттердің {linkto(../../concepts/about#s3-concepts-about-storage-class)[text=сақтау класы]} `Hotbox` болады. WinSCP арқылы жасалатын объектілер бакеттен мұраланатын сақтау класына ие болады.
{/note}

## {heading(Диск-О:)[id=s3-connect-file-managers-disk-o]}

Диск-О: әртүрлі қоймаларға бір уақытта қосылуға мүмкіндік береді. Әр қосылым жергілікті файлдық жүйеде бөлек диск ретінде ашылады. Диск-O: бүкіл {var(s3)} сервисіне емес, бакетке қосылады. Бірнеше бакетпен жұмыс істеу үшін бөлек қосылымдар жасау қажет. Файлдарды құрылғы мен қойма арасында да, әртүрлі қоймалар арасында да немесе бір қойманың әртүрлі бакеттері арасында да көшіруге болады. macOS және Windows үшін қолжетімді.

1. {ifdef(public)}{var(cloud)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef} жеке кабинетінде {var(s3)} үшін {linkto(../../instructions/access-management/access-keys#s3-instructions-access-keys-new-account-access-key)[text=аккаунт пен қолжетімділік кілтін жасаңыз]}. Қолжетімділіктің құпия кілтін (**Secret Key**) сақтап қойыңыз.
1. Қажетті бакетті таңдаңыз немесе {linkto(../../instructions/buckets/create-bucket#s3-instructions-create-bucket)[text=жаңасын жасаңыз]}.
1. Диск-О:-ны [орнатыңыз](https://disk-o.cloud/ru).
1. Объектілік қойманың бакетіне қосылуды баптаңыз:

   1. **Қосу** түймесін басыңыз.
   1. **MSC S3** таңдаңыз.
   1. Қосылым баптауларын көрсетіңіз:

      - **Қойманы таңдаңыз**: Hotbox {linkto(../../concepts/about#s3-concepts-about-storage-class)[text=сақтау класы]} бар бакет үшін `Горячие данные`, Icebox {linkto(../../concepts/about#s3-concepts-about-storage-class)[text=сақтау класы]} бар бакет үшін `Холодные данные`;
      - **Бакетті енгізіңіз**: бар бакеттің атауы.
      - **Access Key**: {var(s3)} аккаунтын жасау кезінде алынған кілт идентификаторы.
      - **Secret Key**: {var(s3)} аккаунтын жасау кезінде алынған құпия қолжетімділік кілті. Құпия кілт **Access Key** өрісінде көрсеткен кілт идентификаторына сәйкес келуі тиіс.

   1. **Қосу** түймесін басыңыз.

Сәтті қосылғаннан кейін бакет объектілері жергілікті файлдық жүйеде және Диск-О: жылдам қолжетімділік терезесінде қолжетімді болады. Егер бакетте объектілер болмаса, қосылған диск бос болады. Диск директориясына 1 ГБ-қа дейін файл қосып, {ifdef(public)}{var(cloud)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef} жеке кабинет арқылы бакетте объект пайда болғанын тексеріңіз.

{note:info}
Диск-О: арқылы жасалатын объектілер бакеттен мұраланатын {linkto(../../concepts/about#s3-concepts-about-storage-class)[text=сақтау класына]} ие болады.
{/note}

## {heading(s3fs)[id=s3-connect-file-managers-s3fs]}

s3fs файл менеджері бакетті FUSE арқылы монтировать етуге және {var(s3)} объектілерімен жергілікті файлдық жүйеңізде немесе CLI арқылы жұмыс істеуге мүмкіндік береді. Linux, macOS, Windows және FreeBSD үшін қолжетімді.

1. {ifdef(public)}{var(cloud)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef} жеке кабинетінде {var(s3)} үшін {linkto(../../instructions/access-management/access-keys#s3-instructions-access-keys-new-account-access-key)[text=аккаунт пен қолжетімділік кілтін жасаңыз]}. Қолжетімділіктің құпия кілтін (**Secret Key**) сақтап қойыңыз.
1. Қажетті бакетті таңдаңыз немесе {linkto(../../instructions/buckets/create-bucket#s3-instructions-create-bucket)[text=жаңасын жасаңыз]}.
1. s3fs орнатыңыз.

   {tabs}

   {tab(Debian 9 немесе жаңарақ)}

   Команданы орындаңыз:

   ```console
   sudo apt install s3fs
   ```

   {/tab}

   {tab(Ubuntu 16.04 немесе жаңарақ)}

   Команданы орындаңыз:

   ```console
   sudo apt install s3fs
   ```

   {/tab}

   {tab(CentOS 7 немесе жаңарақ)}

   EPEL ішінде команданы орындаңыз:

   ```console
   sudo yum install epel-release
   sudo yum install s3fs-fuse
   ```

   {/tab}

   {tab(SUSE 12 және openSUSE 42.1)}

   Команданы орындаңыз:

   ```console
   sudo zypper install s3fs
   ```

   {/tab}

   {tab(macOS)}

   Homebrew ішінде команданы орындаңыз:

   ```console
   brew cask install osxfuse
   brew install s3fs
   ```

   {/tab}

   {/tabs}

1. Объектілік қоймаға қосылуды баптаңыз:

   1. Кілт идентификаторын және құпия кілтті `~/.passwd-s3fs` файлына `<ИДЕНТИФИКАТОР_КЛЮЧА>:<СЕКРЕТНЫЙ_КЛЮЧ>` форматында сақтаңыз:

      ```console
      echo <ИДЕНТИФИКАТОР_КЛЮЧА>:<СЕКРЕТНЫЙ_КЛЮЧ> >  ~/.passwd-s3fs
      ```

   1. `~/.passwd-s3fs` файлына қолжетімділікті шектеңіз:

      ```console
      chmod 600  ~/.passwd-s3fs
      ```

   1. Бакет монтировать етілетін директорияны таңдаңыз және осы директорияға оқу және жазу құқықтарының бар екеніне көз жеткізіңіз.
   1. Команданы орындаңыз:

      ```console
      s3fs <ИМЯ_БАКЕТА> <ПУТЬ> -o passwd_file=~/.passwd-s3fs -o url=<ENDPOINT_URL> -o use_path_request_style
      ```
      Мұнда:

      - `<ИМЯ_БАКЕТА>` — {var(s3)} ішіндегі бакет атауы;
      - `<ПУТЬ>` — бакет мазмұны көрсетілетін директорияға дейінгі жергілікті файлдық жүйедегі жол;
        {ifdef(public)}
      - `<ENDPOINT_URL>` — аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келуі тиіс:

        - `https://hb.vkcloud-storage.ru` немесе `https://hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
        - `https://hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.
        {/ifdef}
        {ifdef(s3,s3-pdf)}
      - `<ENDPOINT_URL>` — {var(s3)} инсталляцияңызда қолданылатын домендік атауы бар сілтеме. Атау форматы өзгеше болуы мүмкін. Сілтеменің нақты форматын білу үшін әкімшіңізге жүгініңіз.
        {/ifdef}

Егер қосылу сәтті болса, `<ПУТЬ>` директориясында қосылған бакеттің барлық объектілері көрсетілуі тиіс. Егер бакетте объектілер болмаса, директория бос болады. Директорияға 1 ГБ-қа дейін файл қосып, {ifdef(public)}{var(cloud)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef} жеке кабинет арқылы бакетте объект пайда болғанын тексеріңіз.

{note:info}
s3fs арқылы жасалатын объектілер бакеттен мұраланатын {linkto(../../concepts/about#s3-concepts-about-storage-class)[text=сақтау класына]} ие болады.
{/note}
