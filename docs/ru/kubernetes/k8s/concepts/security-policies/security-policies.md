Кластер Kubernetes — сложная система, в которой можно развернуть множество ресурсов. Типичные риски, которые возникают при работе с такой системой:

- выдача слишком широких прав доступа;
- развертывание ресурсов, которые либо уязвимы к атакам, либо потребляют слишком большие мощности, либо не соответствуют корпоративным политикам.

Чтобы снизить эти риски, в Cloud Containers кроме поддержки [разграничения прав доступа](../access-management) к кластеру реализованы политики безопасности.

Возможности кластеров Cloud Containers по работе с политиками безопасности:

- В кластеры версий 1.21 и выше встроен [Gatekeeper](../../reference/gatekeeper), который позволяет реализовывать политики безопасности в кластере с помощью шаблонов ограничений (constraint template) и ограничений (constraint). Также поддержаны [преднастроенные политики безопасности по умолчанию](#politiki_bezopasnosti_po_umolchaniyu).
- В кластерах версий 1.23 и выше предусмотрена возможность [работы с политиками безопасности из личного кабинета VK Cloud](#rabota_s_politikami_bezopasnosti_cherez_lichnyy_kabinet).

Политики безопасности не действуют в кластерах версий ниже 1.21. Чтобы подключить их, [обновите такие кластера до актуальной версии](../../instructions/update). Если обновление невозможно, [установите Gatekeeper](../../install-tools/gatekeeper#ustanovka) вручную, а затем [настройте ограничения и шаблоны](../../install-tools/gatekeeper#opcionalno_nastroyka_ogranicheniy_i_shablonov).

## Политики безопасности по умолчанию

В кластерах Cloud Containers версий 1.21 и выше действуют политики безопасности по умолчанию, которые обеспечивают базовую защиту кластера от нескольких распространенных уязвимостей:

<!-- prettier-ignore -->
| Политика безопасности по умолчанию | Соответствующие ресурсы Gatekeeper |
| ---------------------------------- | ---------------------------------- |
| [Ограничение host-filesystem](#ogranichenie_host_filesystem_14877f88) | Ограничение и шаблон ограничения: `k8spsphostfilesystem` |
| [Ограничение host-namespaces](#ogranichenie_host_namespaces_7cf1c13b) | Ограничение и шаблон ограничения: `k8spsphostnamespace` |

Эти политики реализуются с помощью преднастроенных шаблонов и ограничений Gatekeeper. Не рекомендуется изменять или удалять эти шаблоны и ограничения: некорректная работа или отсутствие политик может снизить безопасность кластера.

{note:warn}

VK Cloud не несет ответственность за проблемы с кластером, напрямую или косвенно возникшие из-за указанных действий.

{/note}

## Работа с политиками безопасности через личный кабинет

В кластерах Cloud Containers версий 1.23 и выше есть возможность быстрой настройки распространенных политик безопасности через личный кабинет. В кластере будет автоматически создан необходимый набор ограничений и шаблонов ограничений Gatekeeper.

При этом можно включить синхронизацию политик с кластером, которая влияет на ресурсы Gatekeeper в кластере:

- Если из кластера удалены ограничение или шаблон, соответствующие включенной в личном кабинете политике, то они будут восстановлены.
- Если в кластере есть созданные вручную ограничения, которые не соответствуют какой-либо включенной в личном кабинете политике, то они будут удалены.

Синхронизация политик с кластером происходит каждые несколько минут.

Включите синхронизацию, чтобы в кластере соблюдались только политики безопасности, настроенные в личном кабинете. Выключите синхронизацию, если вы планируете использовать другие ограничения или шаблоны Gatekeeper для реализации сторонних политик безопасности. Примеры работы со сторонними политиками безопасности смотрите в разделе [Использование Gatekeeper](../../how-to-guides/gatekeeper).

При [работе с политиками](../../instructions/manage-security) через личный кабинет не рекомендуется редактировать, удалять или выключать [политики по умолчанию](#politiki_bezopasnosti_po_umolchaniyu). Также не рекомендуется изменять отдельные ограничения или шаблоны, соответствующие любым политикам, которые настроены в личном кабинете: некорректная работа или отсутствие политик может снизить безопасность кластера.

{note:warn}

VK Cloud не несет ответственность за проблемы с кластером, напрямую или косвенно возникшие из-за указанных действий.

{/note}

## Доступные политики безопасности и их настройки

Часть политик не имеет настроек, для них можно только выбрать пространство имен.

### Блокировать NodePort

<tabs>
<tablist>
<tab>Описание</tab>
</tablist>
<tabpanel>

Запрещает использовать сервисы (services) типа `NodePort`.

Использование сервисов типа `NodePort` дает возможность перехватывать трафик других подов или узлов в обход инструментов обеспечения сетевой безопасности.

</tabpanel>
</tabs>

### Блокировать Wildcard Ingress

<tabs>
<tablist>
<tab>Описание</tab>
</tablist>
<tabpanel>

Проверяет для ресурса Ingress наличие параметра `spec.rules.host` в правиле маршрутизации Ingress. Запрещает в качестве значения для параметра:

- пустую строку;
- wildcard `*` в значении.

Использование ресурсов Ingress c указанными значениями `spec.rules.host` дает возможность перехватывать трафик других сервисов, даже если к самим сервисам нет доступа.

</tabpanel>
</tabs>

### Блокировать обновление Service Account

<tabs>
<tablist>
<tab>Описание</tab>
<tab>Настройки</tab>
</tablist>
<tabpanel>

Запрещает обновление сервисного аккаунта для рабочей нагрузки ([workload](https://kubernetes.io/docs/concepts/workloads/)). Запрет не действует на группы и пользователей, для которых настроены исключения.

Ничем не ограниченная возможность смены сервисного аккаунта для рабочей нагрузки может привести к превышению полномочий в кластере.

</tabpanel>
<tabpanel>

- **allowedGroups**: имя группы, членам которой разрешено обновлять сервисные аккаунты.

  В поле нужно указать одно имя группы. Чтобы указать несколько групп, нажмите на ссылку ![plus-icon](./assets/plus-icon.svg "inline") **Добавить**. Ненужное поле можно удалить, нажав на значок ![trash-icon](./assets/trash-icon.svg "inline") рядом с ним.

- **allowedUsers**: имя пользователя, которому разрешено обновлять сервисные аккаунты.

  В поле нужно указать одно имя пользователя. Чтобы указать несколько пользователей, нажмите на ссылку ![plus-icon](./assets/plus-icon.svg "inline") **Добавить**. Ненужное поле можно удалить, нажав на значок ![trash-icon](./assets/trash-icon.svg "inline") рядом с ним.

</tabpanel>
</tabs>

### Запросы ресурсов контейнеров

<tabs>
<tablist>
<tab>Описание</tab>
<tab>Настройки</tab>
</tablist>
<tabpanel>

Делает обязательным [запрос вычислительных ресурсов](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#requests-and-limits) для контейнеров: CPU в параметре `requests.cpu` и памяти в параметре `requests.memory`. Проверяет, чтобы значения этих параметров не превышали настроенных порогов.

Возможность создать контейнер со слишком высокими запросами может привести к исчерпанию ресурсов, если не установлены лимиты.

</tabpanel>
<tabpanel>

- **cpu**: максимальный объем CPU, который можно запросить с помощью `requests.cpu`. Значение может включать в себя цифры и (опционально) символ `m`.
- **memory**: максимальный объем памяти, который можно запросить с помощью `requests.memory`. Значение может включать в себя цифры и один из суффиксов: `E`, `P`, `T`, `G`, `M`, `k`, `Ei`, `Pi`,`Ti`, `Gi`, `Mi`, `Ki`.

</tabpanel>
</tabs>

### Лимиты ресурсов контейнеров

<tabs>
<tablist>
<tab>Описание</tab>
<tab>Настройки</tab>
</tablist>
<tabpanel>

Делает обязательным указание [лимитов вычислительных ресурсов](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#requests-and-limits) для контейнеров: CPU в параметре `limits.cpu` и памяти в параметре `limits.memory`. Проверяет, чтобы значения этих параметров не превышали настроенных порогов.

Создание контейнера с завышенными лимитами может исчерпать вычислительные ресурсы.

</tabpanel>
<tabpanel>

- **cpu**: максимальный объем CPU, который можно ограничить с помощью `limits.cpu`. Значение может включать в себя цифры и (опционально) символ `m`.
- **memory**: максимальный объем памяти, который можно ограничить с помощью `limits.memory`. Значение может включать в себя цифры и один из суффиксов: `E`, `P`, `T`, `G`, `M`, `k`, `Ei`, `Pi`,`Ti`, `Gi`, `Mi`, `Ki`.

</tabpanel>
</tabs>

### Запуск образов с SHA-хешем

<tabs>
<tablist>
<tab>Описание</tab>
</tablist>
<tabpanel>

Запрещает использовать образы контейнеров без указания SHA-хеша (digest).

Если в значении параметра `image` не указан SHA-хеш, то не гарантируется, что будет использоваться одна и та же версия образа. При использовании тегов вместо хешей возможна ситуация, когда одна часть подов использует старый образ, а другая — новый образ, хотя теги образов будут совпадать.

</tabpanel>
</tabs>

### Разрешенные репозитории

<tabs>
<tablist>
<tab>Описание</tab>
<tab>Настройки</tab>
</tablist>
<tabpanel>

Запрещает использовать образы контейнеров с префиксами репозиториев, которые не указаны в настройках как доверенные.

Использование образов из недоверенных репозиториев может снизить безопасность кластера. Например, в такие образы может быть встроен вредоносный код.

</tabpanel>
<tabpanel>

**repos**: имя доверенного репозитория.

В поле нужно указать одно имя репозитория. Чтобы указать несколько репозиториев, нажмите на ссылку ![plus-icon](./assets/plus-icon.svg "inline") **Добавить**. Ненужное поле можно удалить, нажав на значок ![trash-icon](./assets/trash-icon.svg "inline") рядом с ним.

</tabpanel>
</tabs>

### Ограничение host-filesystem

{note:info}

Это политика по умолчанию. Она уже настроена в кластере на уровне всех пространств имен.

{/note}

<tabs>
<tablist>
<tab>Описание</tab>
<tab>Настройки</tab>
</tablist>
<tabpanel>

Запрещает использовать в контейнерах тома (volumes) типа [hostPath](https://kubernetes.io/docs/concepts/storage/volumes/#hostpath). Монтирование таких томов эквивалентно монтированию директории узла кластера Kubernetes. Запрет не действует на директории, для которых настроены исключения.

Использование `hostPath` без ограничений дает контейнеру полный доступ к файловой системе узла кластера, на котором выполняется под. Это может привести к раскрытию чувствительной информации о кластере, эскалации привилегий и другим проблемам.

</tabpanel>
<tabpanel>

**pathPrefix**: префикс пути, для которого разрешено выполнять монтирование.

Если путь, указанный в `hostPath.path`, содержит этот префикс, то директорию по этому пути можно монтировать в контейнер. Например, если задан префикс `/foo`, то с помощью `hostPath` можно примонтировать директории:

- `/foo`
- `/foo/bar`

Дополнительно для **pathPrefix** можно включить опцию **readOnly**. При включенной опции директория монтируется только для чтения. В этом случае для контейнера необходимо задать параметр `volumeMounts[].readOnly: true`.

Чтобы указать несколько префиксов, нажмите на ссылку ![plus-icon](./assets/plus-icon.svg "inline") **Добавить**. Ненужное поле можно удалить, нажав на значок ![trash-icon](./assets/trash-icon.svg "inline") рядом с ним.

</tabpanel>
</tabs>

### Ограничение host-namespaces

{note:info}

Это политика по умолчанию. Она уже настроена в кластере на уровне всех пространств имен.

{/note}

<tabs>
<tablist>
<tab>Описание</tab>
</tablist>
<tabpanel>

Запрещает получать доступ к инструментам межпроцессной коммуникации (IPC) и процессам узла кластера Kubernetes c помощью параметров `hostIPC: true` и `hostPID: true`.

Запущенный с этими параметрами под получает следующие возможности:

- Просмотр всех процессов, запущенных на хосте.
- Принудительное завершение любого процесса на хосте командой `kill`, отправленной из пода.
- Чтение переменных окружения из файла `/proc/[PID]/environ` для каждого пода или процесса на хосте.
- Доступ к данным тех процессов, которые используют IPC для коммуникации между собой.

Это очень широкие возможности, которые приравниваются к уязвимостям. Они позволяют манипулировать процессами, раскрывать чувствительные переменные окружения и эксплуатировать другие уязвимости.

</tabpanel>
</tabs>

### Ограничение количества реплик

<tabs>
<tablist>
<tab>Описание</tab>
<tab>Настройки</tab>
</tablist>
<tabpanel>

Запрещает задавать количество реплик для развертываний (deployments) Kubernetes, которое не укладывается в настроенный диапазон.

Если нет нижнего ограничения на количество реплик, можно развернуть приложения без настроенной репликации, что снижает отказоустойчивость. Если нет верхнего ограничения на количество реплик, можно избыточно масштабировать кластер или вовсе исчерпать его ресурсы. Например, возможна ситуация, когда кластер выполнит автоматическое масштабирование до заданного предела, чтобы разместить избыточные реплики, но при этом не останется доступных узлов для размещения новой рабочей нагрузки.

</tabpanel>
<tabpanel>

- **min_replicas**: минимальное число реплик;
- **max_replicas**: максимальное число реплик.

</tabpanel>
</tabs>
