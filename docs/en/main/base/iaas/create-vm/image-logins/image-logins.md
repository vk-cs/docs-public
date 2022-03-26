Логины образов
--------------

<table border="0" cellpadding="5" cellspacing="3"><tbody><tr><td><strong>Bitrix*</strong></td><td>&nbsp; &nbsp;root*</td></tr><tr><td><strong>CentOS</strong></td><td>&nbsp;centos</td></tr><tr><td><strong>Debian</strong></td><td>&nbsp;debian</td></tr><tr><td><strong>Fedora</strong></td><td>&nbsp;fedora</td></tr><tr><td><strong>FreeBSD</strong></td><td>&nbsp;freebsd</td></tr><tr><td><strong>Ubuntu</strong></td><td>&nbsp;ubuntu</td></tr></tbody></table>

### 

**\*****Bitrix**: Сразу после входа система попросит установить новый пароль. Для этого система запросит текущий пароль (bitrix) и дважды запросит новый пароль для пользователя root.

Также образ **Bitrix-CentOS\*** в данный момент **не поддерживает** работу в сети Ext-Net.

В общем случае для Linux-подобных ОС из списка выше пароли отсутствуют. Вы можете задать пароль на карточке виртуальной машины во вкладке "Консоль":

![](./assets/1584005505749-1584005505749.png)

Также можно задать пароль через CLI (локальный клиент для управления виртуальными машинами):

```
$ nova set-password $instance\_uuid
```

Также (для Windows) задать пароль учётной записи "**Admin**" можно череp кнопку "**Установить пароль**" на вкладке "Консоль":

![](./assets/1586006263398-1586006263398.png)