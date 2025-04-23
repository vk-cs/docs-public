Клиент Termidesk — это программный компонент, который устанавливается на пользовательскую рабочую станцию. Клиент необходим для подключения к виртуальным рабочим столам сервиса Cloud Desktop.

## {heading(Установка клиента для ОС Windows)[id=vdi_client_install_win]}

Клиент Termidesk для ОС Windows поставляется в виде установочного файла с расширением `msi`.

<warn>

Для установки клиента необходимы права администратора на компьютере.

</warn>

1. Скачайте и запустите установочные файлы для компонентов:

   * [Termidesk-client](https://repos.termidesk.ru/windows/windows_x86_64/termidesk-client_5.0.0.24149_x64.msi)
   * [Termidesk-viewer](https://repos.termidesk.ru/windows/windows_x86_64/termidesk-viewer_1.9.0.24150_x64.msi)

1. Разрешите внесение изменений на рабочую станцию от имени администратора и дождитесь завершения процесса установки.
1. Перезагрузите компьютер, если для завершения процесса установки запрошена перезагрузка.

## {heading(Установка клиента для ОС Astra Linux Special Edition)[id=vdi_client_install_astra]}

Дистрибутив Termidesk для ОС Astra Linux Special Edition поставляется в виде бинарных файлов пакета ПО в формате `deb`.

1. Скачайте установочные файлы для компонентов:

   * [Termidesk-client](https://repos.termidesk.ru/astra/dists/1.7_x86-64/pool/non-free/t/termidesk-client_5.0.0.24149-astra17_amd64.deb)
   * [Termidesk-viewer](https://repos.termidesk.ru/astra/dists/1.7_x86-64/pool/non-free/t/termidesk-viewer_1.9.0.24150-astra17_amd64.deb)

1. Установите компонент Termidesk-client, выполнив команду:

   ```console
   sudo apt -y install termidesk-client
   ```

1. Установите компонент Termidesk-viewer, выполнив команду:

   ```console
   sudo apt -y install termidesk-viewer
   ```

<info>

Скачать установочные файлы клиента для других ОС можно на [официальном сайте разработчика Termidesk](https://repos.termidesk.ru/).

</info>

Подробнее об установке клиента — в официальной документации [Termidesk](https://wiki.astralinux.ru/termidesk-help/5.0).
