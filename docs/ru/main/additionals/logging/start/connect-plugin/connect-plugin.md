Fluent Bit — инструмент с открытым исходным кодом для сбора и обработки логов. Fluent Bit собирает, парсит и фильтрует сообщения из различных источников ввода и сохраняет их в хранилище. Затем сообщения поступают в маршрутизатор, который определяет, в какой выход их отправить. Для работы с различными источниками ввода и выходами используются плагины.

Подробнее о Fluent Bit читайте в [официальной документации](https://docs.fluentbit.io/manual).

### Подключение fluent-bit плагина

1. Клонируйте репозиторий с кодом плагина:

```
git clone https://github.com/vk-cs/cloudlogs-fluent-bit
```

2. Скомпилируйте библиотеку cloudlogs-fluent-bit:

```
cd cloudlogs-fluent-bit
```
```
make
```

### Проверка работы fluent-bit плагина

Для работы плагина нужно указать следующие параметры:

| Параметр       | Значение                                                    | Где найти |
| -------------- | ----------------------------------------------------------- | --- |
| serverHostPort | Адрес сервиса логирования                                   | Указать cloudlogs.mcs.mail.ru:443 |
| project-id     | Идентификатор проекта в которым будут хранится логи         | Project ID [на странице](https://mcs.mail.ru/app/any/project/keys) |
| auth-url       | Адрес сервиса авторизации                                   | Auth URL [на станице](https://mcs.mail.ru/app/any/project/keys) |
| user-name      | Логин пользователя который пишет логи                       |  |
| password       | Пароль пользователя который пишет логи                      |  |

<details>
  <summary markdown="span">Пример запуска</summary>

```bash
/opt/fluent-bit/bin/fluent-bit -i dummy -e ./vkcloudlogs-fluent-bit.so -o vkcloudlogs -p"serverHostPort=cloudlogs.mcs.mail.ru:443" -p"auth-url=https://infra.mail.ru:35357/v3/" -p"user-name=<user name>" -p"password=<password>" -p"project-id=<project>"
```
</details>
