Быстрый старт поможет вам начать работу с VK Cloud:

- зарегистрировать аккаунт и войти в личный кабинет;
- установить настройки для проекта, который создается при регистрации;
- подключиться к проекту через интерфейс командной строки OpenStack CLI.

<info>

Чтобы войти в существующий проект VK Cloud, следуйте инструкциям в статье [Вход в проект по приглашению](/ru/base/account/instructions/project-invitation).

</info>

## 1. Зарегистрируйтесь в VK Cloud

1. [Зарегистрируйтесь](/ru/additionals/start/get-started/account-registration#registraciya-v-lichnom-kabinete) в личном кабинете.

1. [Подтвердите](/ru/additionals/start/get-started/account-registration#podtverzhdenie-uchetnoy-zapisi) учетную запись.

После регистрации аккаунта для него будет создан [проект](/ru/base/account/concepts/projects) VK Cloud. Откроется личный кабинет, в нем вы сможете создавать и подключать нужные объекты: виртуальные машины, базы данных и т. д.

После подтверждения учетной записи сервисы в проекте будут активированы, на [баланс](/ru/additionals/billing/start/balance) проекта будут зачислены приветственные [бонусы](/ru/additionals/billing/concepts/bonus).

## 2. Настройте двухфакторную аутентификацию для аккаунта

[Настройте](/ru/base/account/instructions/account-manage/security#vklyuchenie-2fa) двухфакторную аутентификацию (2FA) для вашего аккаунта.

2FA необходима, чтобы работать с платформой при помощи API, OpenStack CLI, Terraform и других инструментов.

## 3. (Опционально) Пригласите в проект других пользователей

В созданном при регистрации аккаунта проекте вы являетесь владельцем. [Пригласите](../instructions/project-settings/access-manage) других пользователей, назначив им [роли](/ru/base/account/concepts/rolesandpermissions).

## 4. (Опционально) Настройте 2FA для проекта

[Включите](../instructions/project-settings/access-manage#vklyuchenie-v-proekte-obyazatelnoy-2fa) обязательную 2FA для всех участников проекта, чтобы снизить риск несанкционированного доступа.

## 5. Подключитесь к проекту через OpenStack CLI

Для работы через OpenStack CLI необходимо:

- [включить](/ru/base/account/instructions/account-manage/security#vklyuchenie-2fa) 2FA для вашего аккаунта, если она еще не включена;
- [активировать](/ru/base/account/instructions/account-manage/security#dostup-po-api) доступ по API.

Чтобы подключиться к проекту:

1. [Установите](/ru/base/account/project/cli/setup) клиент OpenStack и [пройдите аутентификацию](/ru/base/account/project/cli/authorization) в проекте.

1. Проверьте подключение через CLI, выполнив в консоли команду, например:

    ```bash
    openstack configuration show
    ```

## Что дальше?

- Изучите [квоты и лимиты](/ru/base/account/concepts/quotasandlimits) проектов.
- Ознакомьтесь со [способами пополнения баланса](/ru/additionals/billing/operations/payment) и базовыми принципами [тарификации](/ru/base/account/tariffication) сервисов.
- Узнайте, как создать и подключить [виртуальную машину](/ru/base/iaas/quick-start), [кластер Kubernetes](/ru/base/k8s/quickstart), [базу данных](/ru/dbs/dbaas/start).
