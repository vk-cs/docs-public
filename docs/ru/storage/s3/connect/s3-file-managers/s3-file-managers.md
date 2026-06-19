# {heading(Файловые менеджеры)[id=s3-connect-file-managers]}

{var(s3)} поддерживает управление объектами с помощью файловых менеджеров. Такие менеджеры позволяют работать с объектами хранилища, как с директориями и файлами вашего устройства. Это удобно для работы с большим количеством файлов или с разными хранилищами одновременно.

## {heading(CyberDuck)[id=s3-connect-file-managers-cyberduck]}

CyberDuck позволяет подключаться к различным хранилищам одновременно. Каждое подключение открывается в отдельном окне. Вы можете копировать файлы как между устройством и хранилищем, так и между разными хранилищами или бакетами одного хранилища. Доступен для macOS и Windows.

1. {linkto(../../instructions/access-management/access-keys#s3-instructions-access-keys-new-account-access-key)[text=Создайте аккаунт и ключ доступа]} к {var(s3)} в личном кабинете {ifdef(public)}{var(cloud)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef}. Сохраните секретный ключ доступа (**Secret Key**).
1. [Установите](https://cyberduck.io/download) CyberDuck.
1. Настройте подключение к объектному хранилищу:

   1. Нажмите кнопку **Новое подключение**.
   1. Укажите параметры подключения:

      - Тип подключения: `Amazon S3`.
      - **Сервер**: укажите доменное имя, {ifdef(s3,s3-pdf)}указанное при установке сервиса{/ifdef}{ifdef(public)}соответствующее {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта.

        - `hb.vkcloud-storage.ru` или `hb.ru-msk.vkcloud-storage.ru` — для региона Москва;
        - `hb.kz-ast.vkcloud-storage.ru` — для региона Казахстан{/ifdef}.

      - **Порт**: `443`.
      - **Access Key ID**: идентификатор ключа доступа, полученный при создании аккаунта {var(s3)}.
      - **Secret Access Key**: секретный ключ доступа, полученный при создании аккаунта {var(s3)}. Секретный ключ должен соответствовать тому идентификатору ключа, который вы указали в **Access Key ID**.

   1. Нажмите кнопку **Подключиться**.

В результате успешного подключения доступные для аккаунта бакеты отобразятся в CyberDuck.

{note:info}
Создаваемые через Cyberduck бакеты и объекты по умолчанию имеют {linkto(../../concepts/about#s3-concepts-about-storage-class)[text=класс хранения]} и {linkto(../../concepts/access/s3-acl#s3-concepts-acl-permissons)[text=тип доступа]}, указанный в настройках Cyberduck.
{/note}

## {heading(WinSCP)[id=s3-connect-file-managers-winscp]}

WinSCP позволяет подключаться к различным хранилищам одновременно. Каждое подключение или локальная директория открывается на отдельной вкладке. Вы можете копировать файлы как между устройством и хранилищем, так и между разными хранилищами или бакетами одного хранилища. Доступен для Windows.

1. {linkto(../../instructions/access-management/access-keys#s3-instructions-access-keys-new-account-access-key)[text=Создайте аккаунт и ключ доступа]} к {var(s3)} в личном кабинете {ifdef(public)}{var(cloud)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef}. Сохраните секретный ключ доступа (**Secret Key**).
1. [Установите](https://winscp.net/eng/download.php) WinSCP.
1. Настройте подключение к объектному хранилищу:

   1. Выберите в главном меню **Вкладки** → **Подключение** → **Управление подключениями**.
   1. Укажите настройки подключения:

      - **Протокол передачи**: `Amazon S3`;
      - **Имя хоста**: укажите доменное имя, {ifdef(s3,s3-pdf)}указанное при установке сервиса{/ifdef}{ifdef(public)}соответствующее {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта.

        - `hb.vkcloud-storage.ru` или `hb.ru-msk.vkcloud-storage.ru` — для региона Москва;
        - `hb.kz-ast.vkcloud-storage.ru` — для региона Казахстан{/ifdef}.

      - **Порт**: `443`.
      - **Идентификатор ключа доступа**: идентификатор ключа, полученный при создании аккаунта {var(s3)}.
      - **Секретный ключ доступа**: секретный ключ доступа, полученный при создании аккаунта {var(s3)}. Секретный ключ должен соответствовать тому идентификатору ключа, который вы указали в поле **Идентификатор ключа доступа**.

   1. Нажмите кнопку **Войти**.

В результате успешного подключения доступные для аккаунта бакеты отобразятся на вклакде WinSCP.

{note:info}
Бакеты, которые создаются через WinSCP, имеют {linkto(../../concepts/about#s3-concepts-about-storage-class)[text=класс хранения]} `Hotbox`. Объекты, которые создаются через WinSCP, имеют наследуемый от бакета класс хранения.
{/note}

## {heading(Диск-О:)[id=s3-connect-file-managers-disk-o]}

Диск-О: позволяет подключаться к различным хранилищам одновременно. Каждое подключение открывается как отдельный диск в локальной файловой системе. Диск-O: подключается не ко всему {var(s3)}, а к бакету. Для работы с несколькими бакетами нужно создавать отдельные подключения. Вы можете копировать файлы как между устройством и хранилищем, так и между разными хранилищами или бакетами одного хранилища. Доступен для macOS и Windows.

1. {linkto(../../instructions/access-management/access-keys#s3-instructions-access-keys-new-account-access-key)[text=Создайте аккаунт и ключ доступа]} к {var(s3)} в личном кабинете {ifdef(public)}{var(cloud)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef}. Сохраните секретный ключ доступа (**Secret Key**).
1. Выберите нужный бакет или {linkto(../../instructions/buckets/create-bucket#s3-instructions-create-bucket)[text=создайте новый]}.
1. [Установите](https://disk-o.cloud/ru) Диск-О:.
1. Настройте подключение к бакету объектного хранилища:

   1. Нажмите кнопку **Подключить**.
   1. Выберите **MSC S3**.
   1. Укажите настройки подключения:

      - **Выберите хранилище**: `Горячие данные` — для бакета с {linkto(../../concepts/about#s3-concepts-about-storage-class)[text=классом хранения]} Hotbox, `Холодные данные` — для бакета с {linkto(../../concepts/about#s3-concepts-about-storage-class)[text=классом хранения]} Icebox;
      - **Введите бакет**: название имеющегося бакета.
      - **Access Key**: идентификатор ключа, полученный при создании аккаунта {var(s3)}.
      - **Secret Key**: секретный ключ доступа, полученный при создании аккаунта {var(s3)}. Секретный ключ должен соответствовать тому идентификатору ключа, который вы указали в **Access Key**.

   1. Нажмите кнопку **Подключить**.

В результате успешного подключения объекты бакета будут доступны в локальной файловой системе и в окне быстрого доступа Диск-О:. Если в бакете нет объектов, подключенный диск будет пустым. Добавьте файл до 1 ГБ в директорию диска и через личный кабинет {ifdef(public)}{var(cloud)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef} убедитесь, что в бакете появился объект.

{note:info}
Объекты, которые создаются через Диск-О:, имеют наследуемый от бакета {linkto(../../concepts/about#s3-concepts-about-storage-class)[text=класс хранения]}.
{/note}

## {heading(s3fs)[id=s3-connect-file-managers-s3fs]}

Файловый менеджер s3fs позволяет монтировать бакет через FUSE и работать с объектами {var(s3)} в вашей локальной файловой системе или через CLI. Доступен для Linux, macOS, Windows и FreeBSD.

1. {linkto(../../instructions/access-management/access-keys#s3-instructions-access-keys-new-account-access-key)[text=Создайте аккаунт и ключ доступа]} к {var(s3)} в личном кабинете {ifdef(public)}{var(cloud)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef}. Сохраните секретный ключ доступа (**Secret Key**).
1. Выберите нужный бакет или {linkto(../../instructions/buckets/create-bucket#s3-instructions-create-bucket)[text=создайте новый]}.
1. Установите s3fs.

   {tabs}

   {tab(Debian 9 или новее)}

   Выполните команду:

   ```console
   sudo apt install s3fs
   ```

   {/tab}

   {tab(Ubuntu 16.04 или новее)}

   Выполните команду:

   ```console
   sudo apt install s3fs
   ```

   {/tab}

   {tab(CentOS 7 или новее)}

   В EPEL выполните команду:

   ```console
   sudo yum install epel-release
   sudo yum install s3fs-fuse
   ```

   {/tab}

   {tab(SUSE 12 и openSUSE 42.1)}

   Выполните команду:

   ```console
   sudo zypper install s3fs
   ```

   {/tab}

   {tab(macOS)}

   В Homebrew выполните команду:

   ```console
   brew cask install osxfuse
   brew install s3fs
   ```

   {/tab}

   {/tabs}

1. Настройте подключение к объектному хранилищу:

   1. Сохраните идентификатор ключа и секретный ключ в файл `~/.passwd-s3fs` в формате `<ИДЕНТИФИКАТОР_КЛЮЧА>:<СЕКРЕТНЫЙ_КЛЮЧ>`:

      ```console
      echo <ИДЕНТИФИКАТОР_КЛЮЧА>:<СЕКРЕТНЫЙ_КЛЮЧ> >  ~/.passwd-s3fs
      ```

   1. Ограничьте доступ к файлу `~/.passwd-s3fs`:

      ```console
      chmod 600  ~/.passwd-s3fs
      ```

   1. Выберите директорию, в которую будет монтироваться бакет, и убедитесь в наличии прав на чтение и запись к этой директории.
   1. Выполните команду:

      ```console
      s3fs <ИМЯ_БАКЕТА> <ПУТЬ> -o passwd_file=~/.passwd-s3fs -o url=<ENDPOINT_URL> -o use_path_request_style
      ```
      Здесь:

      - `<ИМЯ_БАКЕТА>` — имя бакета в {var(s3)};
      - `<ПУТЬ>` — путь в локальной файловой системе до директории, в которой будет отображаться содержимое бакета;
        {ifdef(public)}
      - `<ENDPOINT_URL>` — должен соответствовать {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

        - `https://hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — для региона Москва;
        - `https://hb.kz-ast.vkcloud-storage.ru` — для региона Казахстан.
        {/ifdef}
        {ifdef(s3,s3-pdf)}
      - `<ENDPOINT_URL>` — ссылка с доменным именем, которое используется в вашей инсталляции {var(s3)}. Формат имени может отличаться. Чтобы узнать точный формат ссылки обратитесь к вашему администратору.
        {/ifdef}

Если подключение успешно, в директории `<ПУТЬ>` должны отображаться все объекты подключенного бакета. Если в бакете нет объектов, директория будет пустой. Добавьте файл до 1 ГБ в директорию и через личный кабинет {ifdef(public)}{var(cloud)}{/ifdef}{ifdef(s3,s3-pdf)}IAM Only{/ifdef} убедитесь, что в бакете появился объект.

{note:info}
Объекты, которые создаются через s3fs, имеют наследуемый от бакета {linkto(../../concepts/about#s3-concepts-about-storage-class)[text=класс хранения]}.
{/note}
