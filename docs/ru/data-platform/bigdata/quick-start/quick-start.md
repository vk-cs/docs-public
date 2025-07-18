Быстрый старт поможет вам на примере кластера ADH Community начать работу с сервисом и познакомиться с его возможностями.

Пройдя все шаги быстрого старта, вы:

1. Создадите кластер больших данных в конфигурации ADH Community Test.
1. Добавите новый компонент в развернутый кластер.

Далее на этапах создания и настройки кластера ADH для примера будут использоваться следующие значения. Замените их на актуальные для вас. При задании логина и пароля опирайтесь на требования безопасности (приведены под таблицей с данными).

| Параметр                                                    | Значение                   |
| ----------------------------------------------------------- | -------------------------- |
| Имя кластера                                                | `ADH-cluster1039`          |
| Логин пользователя кластера ADH                             | `admin`                    |
| Пароль пользователя кластера ADH                            | `6B11Z2ah5DAX53~j`         |
| Пароль MySql                                                | `6B11Z2ah5DAX53~j`         |

{cut(Требования безопасности при задании логина и пароля)}

- **Логин**: минимальная длина логина — 16 символов; максимальная длина — 50 символов. Логин может содержать только:
      - заглавные и строчные буквы латинского алфавита;
      - цифры;
      - спецсимволы `_`, `-`, `.`, начиная со второй позиции.

     Примеры разрешенных логинов: `admin`, `admin.ka`, `A5d_666mi-nk7a.vak`.

- **Пароль**: минимальная длина пароля — 16 символов; максимальная длина — 50 символов. Пароль должен содержать:
      - заглавные и строчные буквы латинского алфавита;
      - хотя бы одну цифру и спецсимвол `?`, `!`, `~`, `#`, `%`, `_`, `-`, `+`, `*`, `=`, `[`, `]`, `{`, `}`, `(`, `)`.

     Пароль не должен содержать повторяющихся групп символов — например, ``aaa123123123``.

{/cut}

## 1. Создайте кластер ADH

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект, где нужно создать кластер.
1. Перейдите в раздел **Большие данные** → **Кластеры**.
1. Нажмите кнопку **Добавить кластер**.
1. На шаге **Конфигурация**:

   1. Выберите конфигурацию кластера **ADH Community Test**.
   1. Укажите версию конфигурации `2.1.8_b3`.
   1. Нажмите кнопку **Следующий шаг**.

1. На шаге **Создание кластера** задайте:

   - **Имя кластера**: оставьте значение по умолчанию или задайте другое имя кластера.

      Требования к имени кластера:

      - Может содержать буквы, цифры, и спецсимволы `.` и `-`.
      - Должно начинаться с буквы.
      - Не должно заканчиваться спецсимволами.
      - Не должно содержать подряд два спецсимвола.

   - **Зона доступности**: `Москва (GZ1)`.
   - **Сеть**: `Создать новую сеть`.
   - **Адрес подсети:** `10.0.1.0/24`.
   - Настройка компонентов кластера: **Продвинутая**, выберите **HIVE**; зависимые компоненты будут выбраны автоматически.

1. Нажмите кнопку **Следующий шаг**.
1. На шаге **Настройка узлов** задайте:

   - **Назначить внешний IP на Head-узел**: убедитесь, что эта опция выбрана.
   - **Автомасштабирование дисков**: убедитесь, что эта опция не выбрана.

   Остальные параметры выберите на свое усмотрение.

1. Нажмите кнопку **Следующий шаг**.
1. Оставьте настройки без изменений и нажмите кнопку **Следующий шаг**.
1. В поле **Логин ADCM** задайте логин.

   Требования к логину:

   - Минимальная длина логина — 16 символов; максимальная длина — 50 символов.
   - Может содержать только заглавные и строчные буквы латинского алфавита, цифры и спецсимволы `_`, `-`, `.`.
   - Не может начинаться со спецсимвола.

   Примеры разрешенных логинов: `admin`, `admin.ka`, `A5d_666mi-nk7a.vak`.

1. В полях **Пароль ADCM** и **Пароль MySql** задайте или сгенерируйте пароль.

   Требования к паролю:

   - Минимальная длина пароля — 16 символов; максимальная длина — 50 символов.
   - Может содержать заглавные и строчные буквы латинского алфавита, цифры и спецсимволы `?`, `!`, `~`, `#`, `%`, `_`, `-`, `+`, `*`, `=`, `[`, `]`, `{`, `}`, `(`, `)`.
   - Должен содержать хотя бы одну заглавную букву, строчную букву, цифру и спецсимвол.
   - Не должен содержать повторяющихся групп символов — например, ``aaa123123123``.

   {note:warn}

   Запишите введенные пароли. Восстановить утерянные пароли нельзя.

   {/note}

1. Нажмите кнопку **Создать кластер**.

   Дождитесь завершения создания кластера, процесс может занять около 25–30 минут.

   {note:info}

   Через 5–8 минут после начала запуска станет доступен интерфейс ADCM для отслеживания хода процесса установки.

   {/note}

## 2. Добавьте в кластер компонент Airflow

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Перейдите в раздел **Большие данные** → **Кластеры**.
1. Нажмите на имя созданного кластера ADH.
1. Перейдите по адресу, указанному в **ADCM UI**. Откроется консоль ADCM.
1. Введите имя пользователя и пароль ADCM, заданные при создании кластера.
1. Перейдите в раздел **CLUSTERS**.
1. Выберите из списка нужный кластер, нажав на его название.
1. Перейдите в раздел **Services**.
1. Нажмите кнопку **Add services**.
1. В открывшемся окне выберите `Airflow2` и нажмите кнопку **Add**.
1. Перейдите в раздел **Host - Components**.
1. Распределите обязательные части компонента по нужным нодам.
1. Нажмите кнопку **Save**.
1. Перейдите в раздел **Configuration** и укажите пароли в обязательных полях.
1. В иерархии нажмите на значок запуска возле названия **AIRFLOW2** и выберите опцию **Install**.
1. Дождитесь завершения установки и перезапустите сервисы.

## Удалите неиспользуемые ресурсы

Использование кластера [тарифицируется](../tariffication) и потребляет вычислительные ресурсы. Если он вам больше не нужен:

1. [Удалите](../instructions/delete) кластер.
1. При необходимости [удалите Floating IP-адрес](/ru/networks/vnet/instructions/ip/floating-ip#delete), назначенный узлам кластера.
