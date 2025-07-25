Далее описывается создание кластера из личного кабинета. Также возможно создать кластер [с помощью Terraform](../create-terraform).

{note:warn}

При создании кластера для него будет создан [сервисный балансировщик нагрузки](/ru/networks/balancing/concepts/load-balancer#tipy_balansirovshchikov_nagruzki).

Использование балансировщика [тарифицируется](/ru/networks/vnet/tariffication).

{/note}

## Перед созданием кластера

1. Ознакомьтесь с доступными ресурсами и [квотами](/ru/tools-for-using-services/account/concepts/quotasandlimits) для [региона](/ru/tools-for-using-services/account/concepts/regions), в котором планируется создать кластер. Для разных регионов могут быть настроены разные квоты.

   Если вы хотите увеличить квоты, напишите в [техническую поддержку](/ru/contacts).

1. Запустите мастер создания кластера:

   1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
   1. Выберите [проект](/ru/tools-for-using-services/account/concepts/projects), в котором будет размещен кластер.
   1. Перейдите в раздел **Контейнеры** → **Кластеры Kubernetes**.
   1. Нажмите кнопку **Добавить** или **Создать кластер**, если в проекте еще не создано ни одного кластера.

## 1. Задайте конфигурацию кластера

1. Выберите версию Kubernetes и конфигурацию кластера. Описание доступных версий Kubernetes приведено в разделе [Политика поддержки версий Kubernetes](../../../concepts/versions/version-support).

   Далее при прохождении мастера создания кластера нельзя будет выбрать другую версию.

   Конфигурация кластера влияет на настройки по умолчанию, которые можно будет изменить на следующих шагах. Доступны следующие конфигурации:

   <tabs>
   <tablist>
   <tab>Dev-среда</tab>
   <tab>Staging-среда</tab>
   <tab>Production</tab>
   <tab>Другое</tab>
   </tablist>
   <tabpanel>

   Конфигурация из одного master-узла и одного worker-узла:

   - минимальное количество master-узлов: один;
   - минимальный размер диска для master-узлов: 20 GB.

   Такой кластер подходит для использования при разработке приложений.

   </tabpanel>
   <tabpanel>

   Конфигурация из одного master-узла и одного worker-узла:

   - минимальное количество master-узлов: один;
   - минимальный размер диска для master-узлов: 40 GB.

   Такой кластер подходит для использования при тестировании или проведении пилотного запуска приложений.

   </tabpanel>
   <tabpanel>

   Конфигурация из нескольких master-узлов и одного worker-узла:

   - минимальное количество master-узлов: три;
   - минимальный размер диска для master-узлов: 40 GB.

   Такой кластер подходит для любых задач, в том числе для повседневной эксплуатации приложений в production-среде.

   </tabpanel>
   <tabpanel>

   Конфигурация по вашему выбору:

   - минимальное количество master-узлов: один;
   - минимальный размер диска для master-узлов: 20 GB.

   Выберите этот вариант для ручной настройки всех параметров создаваемого кластера.

   </tabpanel>
   </tabs>

   Подробнее о топологиях кластера в разделе [Архитектура сервиса](../../../concepts/architecture#topologii_klastera).

1. Нажмите кнопку **Следующий шаг**.

## 2. Настройте кластер

1. Задайте:

   - **Имя кластера**: должно начинаться с буквы. Может состоять только из латинских строчных букв, цифр и дефисов `-` в качестве разделителя.

   - **Тип кластера**:

     - **Стандартный**: все master-узлы кластера будут располагаться в одной [зоне доступности](/ru/intro/start/concepts/architecture#az). Отказоустойчивость обеспечиваетя на уровне зоны.
     - **Региональный**: master-узлы кластера будут располагаться в каждой из трех зон доступности, что позволяет сохранить управление даже при отказе одной из зон. Общее количество master-узлов — 3 или более.

   - Настройки master-узлов:

     - **Категория виртуальной машины**: выберите [категорию](/ru/computing/iaas/concepts/vm/flavor) предустановленных конфигураций ВМ.

     - **Тип виртуальной машины Master:** [шаблон виртуальной машины](../../../concepts/flavors#shablony_konfiguracii) для master-узлов.

       Шаблоны с высокопроизводительными CPU доступны по запросу в службу поддержки. Подробнее в разделе [Доступные вычислительные ресурсы](../../../concepts/flavors#shablony_konfiguracii).

     - **Зона доступности:** [зона доступности](/ru/intro/start/concepts/architecture#az) для узлов. Для регионального кластера автоматически выбраны все три зоны доступности, изменить выбор нельзя.
     - **Тип Master-диска:** [тип хранилища](../../../concepts/storage#podderzhivaemye_tipy_hranilishch_vk_cloud), который будет использоваться узлами. Выбранный тип диска влияет на производительность кластера.

     - **Количество узлов Master:** должно быть нечетным числом. Один узел не обеспечивает отказоустойчивости кластера на уровне master-узлов, три узла и более — обеспечивают. Для регионального кластера автоматически указано значение `3`.

       Подробнее о топологиях кластера в разделе [Архитектура сервиса](../../../concepts/architecture#topologii_klastera).

     - **Размер диска на Master‑узле:** чем больше размер диска, тем выше его производительность в некоторых дисковых операциях.

   - Настройки сети:

     - **Сеть:** выберите сеть и подсеть кластера, в которой будут размещаться master- и worker-узлы кластера. Если нужных сети и подсети нет в списке, [создайте](/ru/networks/vnet/instructions/net#sozdanie_seti) их.
       
        {note:info}
       
       Чтобы создать кластер без доступа в интернет, выберите в списке сеть с подключенным [Shadow port](/ru/networks/vnet/concepts/ips-and-inet#shadow_port).
       
        {/note}
       
     - **Использовать сеть Load Balancer**: включите эту опцию, чтобы для создаваемых кластером балансировщиков нагрузки использовалась отдельная подсеть в выбранной сети. Если нужной подсети нет в списке, [создайте](/ru/networks/vnet/instructions/net#sozdanie_podseti) ее.
     
       По умолчанию опция отключена, и балансировщики нагрузки используют ту же подсеть, что и узлы кластера.

     - **Использовать подсеть пода:** включите эту опцию, чтобы задать подсеть, которую будут использовать поды для коммуникации между собой.

       По умолчанию поды используют подсеть `10.100.0.0./16` для коммуникации. Если такая подсеть уже существует в сети кластера, задайте другую подсеть, не входящую в сеть кластера, которую будут использовать поды. Это необходимо, чтобы не было пересечений адресного пространства.

     - **Назначить внешний IP**: включите эту опцию, чтобы API-эндпоинту кластера и предустановленному Ingress-контроллеру (если он выбран на предыдущем шаге) были назначены внешние IP-адреса. В противном случае IP-адреса будут назначены из подсети кластера.

       По умолчанию опция включена, что позволяет получить доступ к кластеру и Ingress-контроллеру из интернета.

   - Прочие настройки:

     - **Доверенные Docker Registry:** добавьте адреса реестров Docker в список доверенных, чтобы при подключении к ним выключить проверку подлинности HTTPS-соединения.

       Это пригодится, если реестр Docker использует самоподписанный SSL- или TLS-сертификат, подлинность которого не может быть подтверждена кластером.

       Подробнее об отключении проверки подлинности рассказано в [документации Docker](https://docs.docker.com/registry/insecure/#deploy-a-plain-http-registry) (см. описание настройки `insecure-registries`).

     - **Ключ виртуальной машины:** SSH-ключ, с помощью которого можно подключиться к хостам кластера. Рекомендуемое значение  — `Без ключа`.

       {note:info}

       **Ограниченная область действия**

       Эта настройка доступна только для кластеров с версией Kubernetes 1.22.9 и ниже.

       {/note}

     - **Включить мониторинг:** включите эту опцию, чтобы установить в кластер агент сбора метрик.

       По умолчанию опция включена и позволяет отслеживать состояние кластера, [используя сервис Мониторинг VK Cloud](/ru/monitoring-services/monitoring/instructions/mon-setup-new).

1. Нажмите кнопку **Следующий шаг**.

## 3. Настройте группы узлов

1. Задайте [настройки](../../helpers/node-group-settings) для группы worker-узлов.

1. При необходимости добавьте еще одну или несколько групп worker-узлов, нажав кнопку **Добавить группу узлов**, и [настройте](../../helpers/node-group-settings) их.

1. Если на этом шаге настроено более одной группы worker-узлов, то можно удалить группу узлов, нажав кнопку **Удалить группу узлов** под соответствующей группой.

1. Нажмите кнопку **Создать кластер**.

   Начнется создание кластера Kubernetes. Этот процесс может занять длительное время, в зависимости от размера кластера.

## Что дальше?

- [Настройте окружение](../../../connect) на хосте, с которого планируется подключаться к кластеру.
- [Познакомьтесь со сценариями использования](../../../how-to-guides) кластера.
- [Познакомьтесь с концепциями](../../../concepts) сервиса Cloud Containers.
