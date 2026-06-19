# {heading(Быстрый старт)[id=iaas-quick-start]}

С помощью Cloud Servers в личном кабинете {var(cloud)} будет создана виртуальная машина (ВМ) Linux и выполнено подключение к ней.

Быстрый старт поможет вам начать работу с сервисом и познакомиться с его возможностями.

Пройдя все шаги быстрого старта, вы:

1. Создадите новую виртуальную машину (ВМ).
1. Подключитесь к созданной ВМ по SSH.

{note:info}
Работающая ВМ потребляет вычислительные ресурсы.

После прохождения быстрого старта остановите или удалите ВМ, если она вам больше не нужна.
{/note}

## {heading(Подготовительные шаги)[id=iaas-quick-start-preparatory-steps]}

1. {linkto(../../../intro/onboarding/account/create-account#onboarding-create-account)[text=Зарегистрируйтесь]} в {var(cloud)}.
1. Убедитесь, что баланс лицевого счета положительный, а {linkto(../../../tools-for-using-services/account/concepts/quotasandlimits#tools-account-concepts-quotasandlimits)[text=квот]} достаточно для создания целевой конфигурации виртуальной машины.

{include(../../../_includes/_create-vm.md)}