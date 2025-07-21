1. Отредактируйте групповую политику, которая конфигурирует тип лицензирования удаленных рабочих столов:

    1. Подключитесь к RDS-серверу.

    1. Откройте редактор групповых политик:

        1. Нажмите правой кнопкой мыши **Start** и выберите **Run**.
        1. Введите `gpedit.msc` и нажмите **ОК**.

    1. Перейдите в **Computer Configuration** → **Administrative Templates** → **Windows Components** → **Remote Desktop Services** → **Remote Desktop Session Host** → **Licensing**.

    1. Нажмите правой кнопкой мыши на политику **Set the Remote Desktop licensing mode** и выберите **Properties**.

    1. Измените тип политики на нужный: **Per Device** (на устройство) или **Per User** (на пользователя).

    1. Примените изменения.
