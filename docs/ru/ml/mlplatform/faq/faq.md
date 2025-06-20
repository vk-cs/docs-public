
{cut(Обращение в поддержку)}

При обращении в поддержку не забудьте указать ID вашего инстанса Cloud ML Platform. ID инстанса можно найти в разделе «ML Platform» -> «Инстансы» -> Имя инстанса.

После нажатия на имя инстанса откроется страница с подробной информацией. На строке «ID» вы можете скопировать ID инстанса, нажав иконку «Копировать».

{/cut}

{cut(Действия при недоступности инстанса JupyterHub)}

В случае если интерфейс JupyterHub перестает отвечать, вам следует перезагрузить инстанс ВМ с JupyterHub.

Чтобы перезагрузить ВМ:

1. Перейдите в раздел **Облачные вычисления** -> **Виртуальные машины**.
2. Нажмите ![ ](/ru/assets/more-icon.svg "inline") для инстанса ВМ с JupyterHub и выберите пункт **Перезагрузить**.

Подробнее об управлении виртуальными машинами — в статье [«Управление ВМ»](/ru/computing/iaas/instructions/vm/vm-manage).

{/cut}

{cut(Устранение ошибок Jupyter Kernel)}

После установки библиотек или при зависании Jupyter Kernel необходимо перезапустить. Для перезапуска Kernel в интерфейсе JupyterHub выберите пункт меню «Kernel» -> «Restart Kernel».

Вы можете узнать больше о подключении к интерфейсу JupyterHub в статье [«Подключение к JupyterHub»](../jupyterhub/instructions/connect).

{/cut}
