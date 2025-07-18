## Запуск, перезапуск и остановка инстанса БД или его хостов

{note:info}

Инстанс БД в конфигурации **Кластер** нельзя запустить, перезапустить или остановить.

{/note}

<tabs>
<tablist>
<tab>Личный кабинет</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится нужный инстанс БД.
1. Перейдите в раздел **Базы данных** → **Инстансы баз данных**.
1. Выполните нужную операцию:

   <tabs>
   <tablist>
   <tab>Запустить инстанс</tab>
   <tab>Перезапустить инстанс</tab>
   <tab>Остановить инстанс</tab>
   </tablist>
   <tabpanel>

   - Для запуска инстанса БД целиком со всеми его хостами выполните одно из действий:

     - Выберите с помощью флажков один или несколько инстансов БД, затем нажмите кнопку **Запустить**.
     - Нажмите ![ ](/ru/assets/more-icon.svg "inline") для хоста инстанса БД с ролью `Master` и выберите пункт **Запустить**.

   - Для запуска отдельной реплики инстанса БД нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного хоста с ролью `Replica` и выберите пункт **Запустить**.

   </tabpanel>
   <tabpanel>

   - Для перезапуска инстанса БД целиком со всеми его хостами выполните одно из действий:

     - Выберите с помощью флажков один или несколько инстансов БД, затем нажмите кнопку **Перезапустить**.
     - Нажмите ![ ](/ru/assets/more-icon.svg "inline") для хоста инстанса БД с ролью `Master` и выберите пункт **Перезапустить**.

   - Для перезапуска отдельной реплики инстанса БД нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного хоста с ролью `Replica` и выберите пункт **Перезапустить**.

   </tabpanel>
   <tabpanel>

   - Для остановки инстанса БД целиком со всеми его хостами выполните одно из действий:

     - Выберите с помощью флажков один или несколько инстансов БД, затем нажмите кнопку **Остановить**.
     - Нажмите ![ ](/ru/assets/more-icon.svg "inline") для хоста инстанса БД с ролью `Master` и выберите пункт **Остановить**.

   - Для остановки отдельной реплики инстанса БД нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного хоста с ролью `Replica` и выберите пункт **Остановить**.

   </tabpanel>
   </tabs>

</tabpanel>
</tabs>

## Получение информации об инстансе БД

Для активного и остановленного инстансов БД доступна разная информация.

<tabs>
<tablist>
<tab>Личный кабинет</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится нужный инстанс БД.
1. Перейдите в раздел **Базы данных** → **Инстансы баз данных**.
1. Выполните нужную операцию:

   - Чтобы посмотреть информацию об инстансе БД, нажмите на его имя.

   - Чтобы посмотреть информацию об отдельном хосте инстанса БД, нажмите на имя хоста.

   Откроется страница с информацией.

</tabpanel>
</tabs>

## Управление внешним IP-адресом

Вы можете назначить внешний IP-адрес или отвязать его на уровне отдельного хоста, входящего в состав инстанса БД:

<tabs>
<tablist>
<tab>Личный кабинет</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится нужный инстанс БД.
1. Перейдите в раздел **Базы данных** → **Инстансы баз данных**.
1. Выполните нужную операцию:

   <tabs>
   <tablist>
   <tab>Назначить внешний IP-адрес хосту</tab>
   <tab>Отвязать внешний IP-адрес от хоста</tab>
   </tablist>
   <tabpanel>

   1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного хоста и выберите пункт **Назначить внешний IP**.
   1. Выберите существующий IP-адрес или пункт **Добавить новый IP** из выпадающего списка.
   1. Нажмите кнопку **Подтвердить**.

   </tabpanel>
   <tabpanel>

   1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного хоста и выберите пункт **Отвязать внешний IP**.
   1. Нажмите кнопку **Подтвердить**.

   </tabpanel>
   </tabs>

</tabpanel>
</tabs>

## Создание резервной копии

Операция подробно описана в разделе [Создание резервной копии вручную](/ru/storage/backups/instructions/create-backup-copy).

## Расширение инстанса БД

<tabs>
<tablist>
<tab>Конфигурация Single</tab>
<tab>Конфигурация Master-Replica</tab>
<tab>Конфигурация Кластер</tab>
</tablist>
<tabpanel>

Для расширения инстанса добавьте в него реплику. Операция подробно описана в разделе [Репликации](../../../instructions/replication).

</tabpanel>
<tabpanel>

Для расширения инстанса добавьте в него реплику. Операция подробно описана в разделе [Репликации](../../../instructions/replication).

</tabpanel>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится нужный инстанс БД.
1. Перейдите в раздел **Базы данных** → **Инстансы баз данных**.
1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного инстанса БД и выберите пункт **Расширить кластер**.
1. Задайте для добавляемой реплики:

   - зону доступности;
   - тип диска;
   - ключ для доступа по SSH.

1. При необходимости включите опцию **Мониторинг**.
1. Нажмите кнопку **Добавить**.

</tabpanel>
</tabs>

## Вертикальное масштабирование

Вы можете изменять тип виртуальной машины, который используется хостами инстанса БД:

<tabs>
<tablist>
<tab>Личный кабинет</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится нужный инстанс БД.
1. Перейдите в раздел **Базы данных** → **Инстансы баз данных**.
1. Чтобы выполнить вертикальное масштабирование:

   <tabs>
   <tablist>
   <tab>Конфигурация Single</tab>
   <tab>Конфигурация Master-Replica</tab>
   <tab>Конфигурация Кластер</tab>
   </tablist>
   <tabpanel>

   1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для хоста инстанса БД с ролью `Master` и выберите пункт **Вертикальное масштабирование**.
   1. Выберите нужную категорию и тип виртуальной машины.
   1. Нажмите кнопку **Сохранить размер**.

   </tabpanel>
   <tabpanel>

   {note:info}

   В этой конфигурации хосты масштабируются независимо друг от друга.

   {/note}

   1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для хоста инстанса БД с ролью `Master` или `Replica`, для которого нужно выполнить масштабирование, и выберите пункт **Вертикальное масштабирование**.
   1. Выберите нужную категорию и тип виртуальной машины.
   1. Нажмите кнопку **Сохранить размер**.

   </tabpanel>
   <tabpanel>

   {note:info}

   В этой конфигурации масштабирование производится для всех хостов, входящих в кластер.

   {/note}

   1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного инстанса БД и выберите пункт **Вертикальное масштабирование**.
   1. Выберите нужную категорию и тип виртуальной машины.
   1. Нажмите кнопку **Сохранить размер**.

   </tabpanel>
   </tabs>

</tabpanel>
</tabs>

## Обновление инстанса БД

Операция подробно описана в разделе [Обновление версии PostgreSQL](../../../instructions/postgre-update).

## Преобразование реплики в мастер

Для инстансов БД в конфигурации **Master-Replica** можно выделить реплику в отдельный инстанс БД.

<tabs>
<tablist>
<tab>Личный кабинет</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится нужный инстанс БД.
1. Перейдите в раздел **Базы данных** → **Инстансы баз данных**.
1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного хоста инстанса БД с ролью `Replica` и выберите пункт **Преобразовать в мастер**.
1. Прочитайте предупреждение и нажмите кнопку **Подтвердить**.

</tabpanel>
</tabs>

## Переключение мастера

Для инстансов БД в конфигурации **Кластер** можно переключить роль `Master` с текущего хоста на хост с ролью `Sync replica`:

<tabs>
<tablist>
<tab>Личный кабинет</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится нужный инстанс БД.
1. Перейдите в раздел **Базы данных** → **Инстансы баз данных**.
1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для хоста инстанса БД с ролью `Sync replica` и выберите пункт **Назначить мастером**.
1. Прочитайте предупреждение и нажмите кнопку **Назначить**.

</tabpanel>
</tabs>

## Увеличение размера WAL-диска

{note:info}

Размер диска нельзя уменьшить.

{/note}

WAL-диск — это диск, на котором хранится журнал предзаписи (Write-Ahead Log, WAL). Чтобы увеличить его размер:

<tabs>
<tablist>
<tab>Личный кабинет</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится нужный инстанс БД.
1. Перейдите в раздел **Базы данных** → **Инстансы баз данных**.
1. Увеличьте размер WAL-диска:

   <tabs>
   <tablist>
   <tab>Конфигурация Single</tab>
   <tab>Конфигурация Master-Replica</tab>
   <tab>Конфигурация Кластер</tab>
   </tablist>
   <tabpanel>

   1. Выполните одно из действий:

      - Нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного инстанса БД и выберите пункт **Изменить размер WAL-диска**.
      - Нажмите ![ ](/ru/assets/more-icon.svg "inline") для хоста инстанса БД с ролью `Master` и выберите пункт **Изменить размер WAL-диска**.

   1. Укажите новый размер диска.
   1. Нажмите кнопку **Сохранить**.

   </tabpanel>
   <tabpanel>

   {note:info}

   В этой конфигурации размер диска изменяется для каждого хоста в отдельности. Можно изменить размер диска хоста с ролью `Master` или `Replica`.

   {/note}

   1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для хоста инстанса БД с ролью `Master` или `Replica`, для которого нужно изменить размер диска, и выберите пункт **Изменить размер WAL-диска**.

      Если выбрать пункт **Изменить размер WAL-диска** в меню инстанса БД, будет изменен размер диска для хоста с ролью `Master`.

   1. Укажите новый размер диска.
   1. Нажмите кнопку **Сохранить**.

   </tabpanel>
   <tabpanel>

   {note:info}

   В этой конфигурации размер диска изменяется для всех хостов, входящих в кластер.

   {/note}

   1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного инстанса БД и выберите пункт **Изменить размер WAL-дисков**.
   1. Укажите новый размер диска.
   1. Нажмите кнопку **Сохранить**.

   </tabpanel>
   </tabs>

</tabpanel>
</tabs>

## Увеличение размера диска с данными

{note:info}

Размер диска нельзя уменьшить.

{/note}

<tabs>
<tablist>
<tab>Личный кабинет</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится нужный инстанс БД.
1. Перейдите в раздел **Базы данных** → **Инстансы баз данных**.
1. Увеличьте размер диска, на котором хранятся данные:

   <tabs>
   <tablist>
   <tab>Конфигурация Single</tab>
   <tab>Конфигурация Master-Replica</tab>
   <tab>Конфигурация Кластер</tab>
   </tablist>
   <tabpanel>

   1. Выполните одно из действий:

      - Нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного инстанса БД и выберите пункт **Изменить размер диска**.
      - Нажмите ![ ](/ru/assets/more-icon.svg "inline") для хоста инстанса БД с ролью `Master` и выберите пункт **Изменить размер диска**.

   1. Укажите новый размер диска.
   1. Нажмите кнопку **Сохранить**.

   </tabpanel>
   <tabpanel>

   {note:info}

   В этой конфигурации размер диска изменяется для каждого хоста в отдельности. Можно изменить размер диска хоста с ролью `Master` или `Replica`.

   {/note}

   1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для хоста инстанса БД с ролью `Master` или `Replica`, для которого нужно изменить размер диска, и выберите пункт **Изменить размер диска**.

      Если выбрать пункт **Изменить размер диска** в меню инстанса БД, будет изменен размер диска для хоста с ролью `Master`.

   1. Укажите новый размер диска.
   1. Нажмите кнопку **Сохранить**.

   </tabpanel>
   <tabpanel>

   {note:info}

   В этой конфигурации размер диска изменяется для всех хостов, входящих в кластер.

   {/note}

   1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного инстанса БД и выберите пункт **Изменить размер диска**.
   1. Укажите новый размер диска.
   1. Нажмите кнопку **Сохранить**.

   </tabpanel>
   </tabs>

</tabpanel>
</tabs>

## Настройка автомасштабирования размера диска с данными

<tabs>
<tablist>
<tab>Личный кабинет</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится нужный инстанс БД.
1. Перейдите в раздел **Базы данных** → **Инстансы баз данных**.
1. Настройте автомасштабирование размера диска, на котором хранятся данные:

   <tabs>
   <tablist>
   <tab>Конфигурация Single</tab>
   <tab>Конфигурация Master-Replica</tab>
   <tab>Конфигурация Кластер</tab>
   </tablist>
   <tabpanel>

   1. Выполните одно из действий:

      - Нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного инстанса БД и выберите пункт **Изменить автомасштабирование дисков**.
      - Нажмите ![ ](/ru/assets/more-icon.svg "inline") для хоста инстанса БД с ролью `Master` и выберите пункт **Изменить автомасштабирование дисков**.

   1. Включите или выключите опцию автомаштабирования дисков.
   1. Если опция автомасштабирования включена, задайте максимальный размер диска.
   1. Нажмите кнопку **Подтвердить**.

   </tabpanel>
   <tabpanel>

   {note:info}

   В этой конфигурации настройки автомасштабирования диска изменяются для каждого хоста в отдельности. Можно изменить настройки для хоста с ролью `Master` или `Replica`.

   Автомасштабирование будет проходить последовательно на каждом из хостов.

   {/note}

   1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для хоста инстанса БД с ролью `Master` или `Replica`, для которого нужно изменить настройки автомасштабирования диска, и выберите пункт **Изменить автомасштабирование дисков**.

      Если выбрать пункт **Изменить автомасштабирование дисков** в меню инстанса БД, будут изменены настройки для хоста с ролью `Master`.

   1. Включите или выключите опцию автомаштабирования дисков.
   1. Если опция автомасштабирования включена, задайте максимальный размер диска.
   1. Нажмите кнопку **Подтвердить**.

   </tabpanel>
   <tabpanel>

   {note:info}

   В этой конфигурации настройки автомасштабирования изменяются сразу для всех хостов, входящих в кластер.

   Автомасштабирование будет проходить синхронно на всех хостах.

   {/note}

   1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного инстанса БД и выберите пункт **Изменить автомасштабирование дисков**.
   1. Включите или выключите опцию автомаштабирования дисков.
   1. Если опция автомасштабирования включена, задайте максимальный размер диска.
   1. Нажмите кнопку **Подтвердить**.

   </tabpanel>
   </tabs>

</tabpanel>
</tabs>

## Удаление инстанса БД или его хостов

<tabs>
<tablist>
<tab>Личный кабинет</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится нужный инстанс БД.
1. Перейдите в раздел **Базы данных** → **Инстансы баз данных**.
1. В зависимости от конфигурации вы можете удалить как инстанс целиком, так и его отдельные реплики:

   <tabs>
   <tablist>
   <tab>Конфигурация Single</tab>
   <tab>Конфигурация Master-Replica</tab>
   <tab>Конфигурация Кластер</tab>
   </tablist>
   <tabpanel>

   1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного инстанса БД и выберите пункт **Удалить**.
   1. Нажмите кнопку **Подтвердить**.

   </tabpanel>
   <tabpanel>

   {note:warn}

   В этой конфигурации можно удалить как отдельный хост с ролью `Replica`, так и инстанс БД целиком.

   {/note}

   - Чтобы удалить отдельную реплику:

     1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для хоста инстанса БД с ролью `Replica`, который нужно удалить, и выберите пункт **Удалить инстанс**.
     1. Нажмите кнопку **Подтвердить**.

   - Чтобы удалить инстанс БД целиком:

     1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного инстанса БД и выберите пункт **Удалить**.
     1. Нажмите кнопку **Подтвердить**.

   </tabpanel>
   <tabpanel>

   {note:warn}

   В этой конфигурации можно удалить только инстанс БД целиком, со всеми входящими в него хостами.

   {/note}

   1. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для нужного инстанса БД и выберите пункт **Удалить кластер**.
   1. Нажмите кнопку **Подтвердить**.

   </tabpanel>
   </tabs>

</tabpanel>
</tabs>
