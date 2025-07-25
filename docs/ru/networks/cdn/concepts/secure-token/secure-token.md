*Secure token* — это [подключаемая в личном кабинете](/ru/networks/cdn/instructions/manage-cdn/secure-token) опция, которая позволяет вам защитить файлы CDN-ресурса от нежелательных загрузок.
С помощью Secure token можно организовать временный доступ к контенту и обеспечить безопасность ваших данных.

Если включена опция Secure token, доступ к файлам, которые раздаются через CDN, осуществляется только по подписанным ссылкам, содержащим специальный код (secure token). Когда пользователь переходит по ссылке, CDN сверяет полученный secure token с хешем, вычисленным из секретного ключа ресурса и параметров запроса, и в зависимости от результата разрешает или запрещает доступ к контенту.

Чтобы организовать доступ к части контента по обычным ссылкам, [создайте](/ru/networks/cdn/instructions/create-resource) для него еще один ресурс с отдельным [источником](/ru/networks/cdn/concepts/origin-groups).

Подписанная ссылка имеет следующий вид:

```plaintext
http://cdn.example.com/files/image.jpg?md5=CUQ1rzAvtQCxwLS&expires=1301605293
```

Здесь:

- `md5=CUQ1rzAvtQCxwLS` — secure token в виде md5-хеша строки, которая содержит:

  - секретный ключ;
  - срок действия ссылки;
  - путь к файлу в источнике;
  - (опционально) разрешенный IP-адрес.

- `expires=1301605293` — срок действия ссылки в формате [Unix-времени](https://www.unixtimestamp.com).

Подписанная ссылка генерируется вашим сайтом, на который для этого должен быть предварительно добавлен специальный скрипт.

## {heading(Примеры скриптов)[id=scripts]}

### {heading(Скрипты для создания подписанной ссылки без ограничения доступа по IP-адресу)[id=standardscripts]}

{tabs}
{tab(PHP)}
```php
<?php

$secret = '<СЕКРЕТНЫЙ_КЛЮЧ>';
$path = '<ПУТЬ_К_ФАЙЛУ>';
$expires = time() + <СРОК_ДЕЙСТВИЯ_ССЫЛКИ>;
$hostname = '<ДОМЕННОЕ_ИМЯ>';
$link = "$expires$path $secret";
$md5 = md5($link, true);
$md5 = base64_encode($md5);
$md5 = strtr($md5, '+/', '-_');
$md5 = str_replace('=', '', $md5);
$url = "{$hostname}{$path}?md5={$md5}&expires={$expires}";

?>
```

Здесь:

- `<СЕКРЕТНЫЙ_КЛЮЧ>` — произвольный набор символов длиной от 6 до 32 знаков.
- `<ПУТЬ_К_ФАЙЛУ>` — путь к файлу, к которому необходим доступ по ссылке. Пример: `/files/photo.jpg`.
- `<СРОК_ДЕЙСТВИЯ_ССЫЛКИ>` — срок действия ссылки в секундах с момента генерации ссылки.
- `<ДОМЕННОЕ_ИМЯ>` — доменное имя CDN-ресурса с указанием протокола `HTTP` или `HTTPS`. Пример: `https://cdn.example.com`.

Строка `$url` будет содержать итоговую подписанную ссылку на файл. Чтобы вывести ссылку на экран, добавьте после этой строки код:

```php
echo $url;
echo "\n";
```
{/tab}
{tab(Python)}
```python
import base64 
from hashlib import md5 
from time import time 
secret = '<СЕКРЕТНЫЙ_КЛЮЧ>'
path = f'<ПУТЬ_К_ФАЙЛУ>'  
expires = int(time()) + <срок_действия_ссылки> 
hostname = '<ДОМЕННОЕ_ИМЯ>' 
token = base64.encodebytes(md5(f"{expires}{path} {secret}".encode()).digest()).decode().replace("\n", "").replace("+", "-").replace("/", "_").replace("=", "") 
secured_url = f"{hostname}{path}?md5={token}&expires={expires}" 
```

Здесь:

- `<СЕКРЕТНЫЙ_КЛЮЧ>` — произвольный набор символов длиной от 6 до 32 знаков.
- `<ПУТЬ_К_ФАЙЛУ>` — путь к файлу, к которому необходим доступ по ссылке. Пример: `/files/photo.jpg`.
- `<СРОК_ДЕЙСТВИЯ_ССЫЛКИ>` — срок действия ссылки в секундах с момента генерации ссылки.
- `<ДОМЕННОЕ_ИМЯ>` — доменное имя CDN-ресурса с указанием протокола `HTTP` или `HTTPS`. Пример: `https://cdn.example.com`.

Строка `secured_url` будет содержать итоговую подписанную ссылку на файл. Чтобы вывести ссылку на экран, добавьте после этой строки код:

```python
print(secured_url)
```
{/tab}
{tab(OpenSSL)}
```bash
#!/bin/bash
# Generate a pre-signed link without IP address restriction
let "EXPIRES=$(date +%s) + <СРОК_ДЕЙСТВИЯ_ССЫЛКИ>"
HOSTNAME="<ДОМЕННОЕ_ИМЯ>"
FILEPATH="<ПУТЬ_К_ФАЙЛУ>"
SECRET="<СЕКРЕТНЫЙ_КЛЮЧ>"
TOKEN=$(echo -n $EXPIRES$FILEPATH' '$SECRET | openssl md5 -binary | openssl base64 | tr +/ -_ | tr -d = )
echo $HOSTNAME$FILEPATH'?md5='$TOKEN'&expires='$EXPIRES
```

Здесь:

- `<СЕКРЕТНЫЙ_КЛЮЧ>` — произвольный набор символов длиной от 6 до 32 знаков.
- `<ПУТЬ_К_ФАЙЛУ>` — путь к файлу, к которому необходим доступ по ссылке. Пример: `/files/photo.jpg`.
- `<СРОК_ДЕЙСТВИЯ_ССЫЛКИ>` — срок действия ссылки в секундах с момента генерации ссылки.
- `<ДОМЕННОЕ_ИМЯ>` — доменное имя CDN-ресурса с указанием протокола `HTTP` или `HTTPS`. Пример: `https://cdn.example.com`.
{/tab}
{/tabs}

### {heading(Скрипты для создания подписанной ссылки с ограничением доступа по IP-адресу)[id=ipscripts]}

{tabs}
{tab(PHP)}
```php
<?php

$secret = '<СЕКРЕТНЫЙ_КЛЮЧ>';
$path = '<ПУТЬ_К_ФАЙЛУ>';
$ip = '<IP-АДРЕС>';
$expires = time() + <СРОК_ДЕЙСТВИЯ_ССЫЛКИ>;
$hostname = '<ДОМЕННОЕ_ИМЯ>';
$link = "$expires$path$ip $secret";
$md5 = md5($link, true);
$md5 = base64_encode($md5);
$md5 = strtr($md5, '+/', '-_');
$md5 = str_replace('=', '', $md5);
$url = "{$hostname}{$path}?md5={$md5}&expires={$expires}";

?>
```

Здесь:

- `<СЕКРЕТНЫЙ_КЛЮЧ>` — произвольный набор символов длиной от 6 до 32 знаков.
- `<ПУТЬ_К_ФАЙЛУ>` — путь к файлу, к которому необходим доступ по ссылке. Пример: `/files/photo.jpg`.
- `<IP-АДРЕС>` — IP-адрес, c которого будет разрешен доступ к файлу. Пример: `1.2.3.4`.
- `<СРОК_ДЕЙСТВИЯ_ССЫЛКИ>` — срок действия ссылки в секундах с момента генерации ссылки.
- `<ДОМЕННОЕ_ИМЯ>` — доменное имя CDN-ресурса с указанием протокола `HTTP` или `HTTPS`. Пример: `https://cdn.example.com`.

Строка `$url` будет содержать итоговую подписанную ссылку на файл. Чтобы вывести ссылку на экран, добавьте после этой строки код:

```php
echo $url;
echo "\n";
```
{/tab}
{tab(Python)}
```python
import base64 
from hashlib import md 
from time import time 
ip = '<IP-АДРЕС>' 
secret = '<СЕКРЕТНЫЙ_КЛЮЧ>' 
path = f'<ПУТЬ_К_ФАЙЛУ>' 
expires = int(time()) + <СРОК_ДЕЙСТВИЯ_ССЫЛКИ> 
hostname = '<ДОМЕННОЕ_ИМЯ>' 
token = base64.encodebytes(md5(f"{expires}{path}{ip} {secret}".encode()).digest()).decode().replace("\n", "").replace("+", "-").replace("/", "_").replace("=", "") 
secured_url = f"{hostname}{path}?md5={token}&expires={expires}"  
```

Здесь:

- `<IP-АДРЕС>` — IP-адрес, c которого будет разрешен доступ к файлу. Пример: `1.2.3.4`.
- `<СЕКРЕТНЫЙ_КЛЮЧ>` — произвольный набор символов длиной от 6 до 32 знаков.
- `<ПУТЬ_К_ФАЙЛУ>` — путь к файлу, к которому необходим доступ по ссылке. Пример: `/files/photo.jpg`.
- `<СРОК_ДЕЙСТВИЯ_ССЫЛКИ>` — срок действия ссылки в секундах с момента генерации ссылки.
- `<ДОМЕННОЕ_ИМЯ>` — доменное имя CDN-ресурса с указанием протокола `HTTP` или `HTTPS`. Пример: `https://cdn.example.com`.

Строка `secured_url` будет содержать итоговую подписанную ссылку на файл. Чтобы вывести ссылку на экран, добавьте после этой строки код:

```python
print(secured_url)
```
{/tab}
{tab(OpenSSL)}
```bash
#!/bin/bash
# Generate a pre-signed link with IP-based access restriction
let "EXPIRES=$(date +%s) + <срок_действия_ссылки>"
HOSTNAME="<ДОМЕННОЕ_ИМЯ>"
FILEPATH="<ПУТЬ_К_ФАЙЛУ>"
IP="<IP-АДРЕС>"
SECRET="<СЕКРЕТНЫЙ_КЛЮЧ>"
TOKEN=$(echo -n $EXPIRES$FILEPATH$IP' '$SECRET | openssl md5 -binary | openssl base64 | tr +/ -_ | tr -d = )
echo $HOSTNAME$FILEPATH'?md5='$TOKEN'&expires='$EXPIRES

```

Здесь:

- `<СЕКРЕТНЫЙ_КЛЮЧ>` — произвольный набор символов длиной от 6 до 32 знаков.
- `<ПУТЬ_К_ФАЙЛУ>` — путь к файлу, к которому необходим доступ по ссылке. Пример: `/files/photo.jpg`.
- `<IP-АДРЕС>` — IP-адрес, c которого будет разрешен доступ к файлу. Пример: `1.2.3.4`.
- `<СРОК_ДЕЙСТВИЯ_ССЫЛКИ>` — срок действия ссылки в секундах с момента генерации ссылки.
- `<ДОМЕННОЕ_ИМЯ>` — доменное имя CDN-ресурса с указанием протокола `HTTP` или `HTTPS`. Пример: `https://cdn.example.com`.
{/tab}
{/tabs}
