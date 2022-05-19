## Импорт образа

<warn>

На текущий момент поддерживаются образы в формате \*.raw.

</warn>

Загрузить индивидуальный образ виртуальной машины, созданный ранее локально, в проект VK CS возможно при помощи следующих инструментов:

<tabs>
<tablist>
<tab>Панель VK CS</tab>
<tab>Openstack CLI</tab>
</tablist>
<tabpanel>

Для загрузки образа [в личном кабинете VK CS](https://mcs.mail.ru/app/services/infra/servers/) следует:

1. Перейти на страницу «Образы» сервиса «Облачные вычисления».
2. В верхнем меню выбрать «Создать».
3. В появившемся окне выбрать источником файл, указать файл и ввести название создаваемого образа.
4. Нажать «Создать образ».

<warn>

Включение опции «Разрешить доступ всем проектам» позволяет использовать образ во всех проектах клиента.

</warn>

</tabpanel>
<tabpanel>

Для загрузки образа в клиенте OpenStack следует выполнить команду:

```bash
openstack image create --private --container-format bare --disk-format raw --property store=s3 --file <файл.raw> <название_образа>
```

Если инстанс, созданный из образа, должен поддерживать резервное копирование, необходимо загрузить его с указанием метаданных наличия гостевого агента:

```bash
openstack image create --private --container-format bare --disk-format raw --file <файл.raw> **--property hw_qemu_guest_agent=yes** --property store=s3 **--property os_require_quiesce=yes** <название_образа>
```

В зависимости от формата загружаемого файла требуется указать соответствующее значение ключа --disk-format:

- raw
- vhd
- vhdx
- vmdk
- vdi
- iso
- qcow2

</tabpanel>
</tabs>

## Экспорт образа

Образы можно выгружать из VK CS для использования данных виртуальной машины в локальной среде.

### OpenStack CLI

Для выгрузки образа с помощью клиента OpenStack следует:

Получить список образов:

```bash
openstack image list
```

Инициировать процесс загрузки образа, выполнив команду:

```bash
openstack image save --file <путь> <ID образа>
```

### cURL

В некоторых случаях загрузка через CLI может потребовать большое количество оперативной памяти, в этом случае возможно использование cURL:

```bash
curl -H "X-Auth-Token: $(openstack token issue -c id -f value)" https://infra.mail.ru:9292/v2/images/<IMAGE_ID>/file --output <output_filename>
```
