<tabs>
<tablist>
<tab>Личный кабинет</tab>
<tab>API</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://mcs.mail.ru/app/) в личный кабинет VK Cloud.
1. Выберите проект, где нужно создать кластер.
1. Перейдите в раздел **Большие данные** → **Кластеры**.
1. Нажмите кнопку **Добавить кластер** или **Добавить**.
1. На шаге «Конфигурация»:

   1. Выберите нужную конфигурацию кластера.
   1. Укажите нужную версию конфигурации.
   1. Нажмите кнопку **Следующий шаг**.

1. На шаге «Создание кластера»:

   1. Задайте общие параметры кластера:

      - **Имя кластера**: может содержать только латинские буквы, цифры и символы `-`, `_`.
      - **Зона доступности:** [зона доступности](/ru/additionals/start/architecture#zony_dostupnosti_d9f6db93) для кластера.
      - **Сеть:** сеть, в которой будет размещаться кластер. Если нужной сети нет в списке, [создайте ее](/ru/networks/vnet/operations/manage-net#sozdanie_seti).
      - Настройка компонентов кластера:

        - **Быстрая**: выберите предустановленный [шаблон](../../concepts/components/) из списка. Вариант недоступен для [тестовых конфигураций](../../concepts/licensing/).
        - **Продвинутая**: выберите [компоненты](../../concepts/components/) для установки в кластер.

          <warn>

          Некоторые компоненты могут быть установлены только в совокупности друг с другом.

          </warn>

   1. Нажмите кнопку **Следующий шаг**.

1. На шаге «Настройка узлов»:

   1. Выберите опцию **Подключить Edge-узел**, если необходим узел-посредник между внутренними компонентами кластера и внешними ресурсами.
   1. Выберите опцию **Подключить Monitoring-узел**, если необходим узел с компонентами Carbon, Graphite, Grafana, Diamond.
   1. Задайте параметры для каждого узла:

      - **Тип инстанса**: [шаблон конфигурации](/ru/base/iaas/concepts/vm-concept#shablony_konfiguraciy_df45dc9d) для кластера.
      - **Количество узлов**: укажите нужное количество узлов, не являющимися Master.
      - **Количество дисков на один узел**: укажите минимальное количество дисков на один узел.
      - **Размер диска, GB:** размер диска (в гигабайтах).
      - **Тип диска:** [тип диска](/ru/base/iaas/concepts/vm-concept#diski) для кластера.
      - **Настройки Firewall:** список групп безопасности для кластера.

        Добавьте в список группу безопасности `ssh`, чтобы получить возможность [подключаться к хостам кластера по SSH](/ru/base/iaas/instructions/vm/vm-connect/vm-connect-nix).

   1. Выберите опцию **Назначить внешний IP на Head-узел**, если необходим доступ Head-узла через плавающий IP-адрес.
   1. **Автомасштабирование дисков**: выберите эту опцию, чтобы размер диска автоматически увеличивался при заполнении диска данными.
   1. Нажмите кнопку **Следующий шаг**.

1. На шаге «Компоненты»:

   1. Перетащите нужные компоненты на нужный узел. При необходимости воспользуйтесь опцией **Быстрая** для быстрой настройки.
   1. Нажмите кнопку **Следующий шаг**.

1. На шаге «Инициализация»:

   1. В блоке «Настройка ADCM» укажите имя и пароль пользователя ADCM.
   1. Укажите ключи для доступа к устанавливаемым компонентам кластера.
   1. Нажмите кнопку **Создать кластер**.

   Дождитесь завершения операции. Создание кластера может занять длительное время.

</tabpanel>
<tabpanel>

Воспользуйтесь методом `POST /clusters` [REST API сервиса](/ru/additionals/api/bigdata-api).

</tabpanel>
</tabs>