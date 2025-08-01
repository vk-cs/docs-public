На платформе VK Cloud количество процессоров и объем оперативной памяти ВМ задаются с помощью шаблонов конфигурации.

## {heading(Категории виртуальных машин)[id=vm_categories]}

В личном кабинете шаблоны ВМ сгруппированы по категориям:

[cols="1,2,2", options="header"]
|===
| Категория
| Описание
| Условие отображения

| Intel Cascade Lake (Intel Xeon Gen 2)
| ВМ на серверах с CPU Intel Cascade Lake
| Доступны по умолчанию

| Intel Ice Lake (Intel Xeon Gen 3)
| ВМ на серверах с CPU Intel Ice Lake
| Доступны по умолчанию

| Архивные типы ВМ (legacy)
| Старые шаблоны конфигурации ВМ
| При фильтрации по умолчанию не отображаются

| Высокопроизводительные CPU
| ВМ на [серверах](../cpu-generation) с увеличенной тактовой частотой CPU
| Отображаются при заказе соответствующих типов ВМ через [техническую поддержку](/ru/contacts)

| Виртуальные машины с GPU
| ВМ с подключенной [графической картой](../../../../gpu/concepts/about)
| Отображаются при заказе соответствующих типов ВМ через сервис [Cloud GPU](https://cloud.vk.com/cloud-gpu/)

| ВМ с локальными дисками
| ВМ с возможностью использования локальных дисков гипервизора
| Отображаются при заказе соответствующих типов ВМ через [техническую поддержку](/ru/contacts)

| ВМ на выделенных серверах
| ВМ на гипервизорах, выделенных под нужды одного клиента
| Отображаются при заказе соответствующих типов ВМ через вашего менеджера
|===

По умолчанию отображаются только актуальные шаблоны конфигурации: на серверах с CPU Intel Cascade Lake и Intel Ice Lake, а также ВМ с подключенной графической картой, на высокопроизводительных или выделенных серверах, если они были добавлены в проект.

Чтобы добавить в список индивидуальные конфигурации ВМ, включая ВМ с объемом ресурсов более 16 vCPU и 64 ГБ RAM, обратитесь в [техническую поддержку](/ru/contacts).

Старые шаблоны конфигурации ВМ доступны при выборе категории **Архивные типы ВМ**. Сервер для создания ВМ старой конфигурации выбирается случайным образом: Intel Cascade Lake или Intel Ice Lake, но [тарифицируются](../../../tariffication) по цене Intel Ice Lake. В случае недоступности сервера (например, при профилактических работах) эти ВМ могут переехать на сервер другого поколения.

{cut(Архивные типы ВМ)}

| Название | Параметры конфигурации | Описание |
| --- | --- | --- |
| Basic | До 2 vCPU <br/> До 4 ГБ RAM | Базовые конфигурации для создания ВМ с невысокой производительностью |
| Standard | От 2 до 4 vCPU <br/> От 4 ГБ до 16 ГБ RAM | Конфигурации с увеличенным количеством CPU и объемом RAM |
| Advanced | От 8 до 16 vCPU <br/> От 16 ГБ до 64 ГБ RAM | Конфигурации для создания высокопроизводительных ВМ |
| Heavy | От 16 vCPU <br/> От 64 ГБ RAM | Индивидуальные конфигурации для создания высокопроизводительных ВМ |
| Custom | Не ограничено | Индивидуальные конфигурации |

{/cut}

Для создания дополнительных шаблонов ВМ (например, с большим объемом ресурсов) [обратитесь в техническую поддержку](/ru/contacts). Стоимость ВМ в этом случае рассчитывается индивидуально для каждого запроса.

{note:info}

Количество и тип CPU, а также объем RAM уже созданной виртуальной машины можно изменить через смену шаблона ВМ. Этот процесс потребует перезагрузки ВМ.

{/note}

## {heading(Название шаблонов конфигурации ВМ)[id=flavor_names]}

Название шаблона ВМ на серверах с CPU Intel Cascade Lake, Intel Ice Lake и ВМ с подключенной графической картой формируется следующим образом:

```console
<категория><поколение CPU>-<число CPU>-<объем RAM>-<опции>-<модель GPU>-<число GPU>
```

Примеры:

|Название шаблона ВМ | Описание |
| --- | --- |
| STD2-2-4 | ВМ с процессором Intel Cascade Lake, 2 vCPU и 4 ГБ оперативной памяти |
| STD3-4-8 | ВМ с процессором Intel Ice Lake, 4 vCPU и 8 ГБ оперативной памяти |
| GPU1A-32-96-A100-1 | ВМ с процессором AMD EPYC 7662 и одной подключенной графической картой Nvidia Tesla A10040GB |