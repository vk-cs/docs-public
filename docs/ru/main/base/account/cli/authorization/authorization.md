Загрузите в панели [«API ключи»](https://mcs.mail.ru/app/project/keys/) личного кабинета openrc файл для конфигурации CLI.

<warn>

Для каждого региона используется свой файл openrc. Подробнее о регионах вы можете узнать в статье [«Регионы»](/ru/additionals/start/user-account/regions).

</warn>

Затем, выполните действия, соответствующие процедуре для операционной системы на вашем компьютере:

<tabs>
<tablist>
<tab>Linux</tab>
<tab>Windows</tab>
</tablist>
<tabpanel>

#### Linux

Выполните импорт переменных из файла openrc с помощью команды `source`:

```bash
source file.sh
```

</tabpanel>
<tabpanel>

#### Windows

Откройте загруженный из личного кабинета файл openrc, найдите в нем переменные, начинающиеся на OS_, и импортируйте в командную строку с помощью команды `SET` по примеру, в каждую переменную подставив значение из сохраненного openrc файла без кавычек:

```bash
set OS_INTERFACE=public
set OS_AUTH_URL=https://infra.mail.ru:35357/v3/
set OS_USERNAME=email
set OS_PROJECT_ID=projectID
set OS_REGION_NAME=regionName
set OS_USER_DOMAIN_NAME=users
set OS_PASSWORD=your_password
set OS_IDENTITY_API_VERSION=3
```

Для PowerShell следует использовать следующие значения переменных:

```bash
$env:OS_INTERFACE = "public"
$env:OS_AUTH_URL = "https://infra.mail.ru:35357/v3/"
$env:OS_USERNAME = "email"
$env:OS_PROJECT_ID = "projectID"
$env:OS_REGION_NAME = "regionName"
$env:OS_USER_DOMAIN_NAME = "users"
$env:OS_PASSWORD = "your_password"
$env:OS_IDENTITY_API_VERSION = "3"
```

<warn>

Для переменной `OS_PASSWORD` нужно ввести действительный пароль учетной записи, его нет в файле openrc.

</warn>

</tabpanel>
</tabs>

#### Проверка работы CLI

Проверьте работу CLI с помощью команды, например:

```bash
openstack flavor list
```

В результате будет получен список доступных конфигураций инстансов.

Или:

```bash
aws --version
```
