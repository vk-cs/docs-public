Подробный пример смотрите в статье «[Пример интеграции на Python](../vision-py)». В этой статье мы выполним запросы `persons/recognize`, `persons/set` и `persons/delete`. Для этого потребуется:

```console
sudo apt-get install php5-cli
sudo apt-get install php5-curl
```

## Запрос на распознавание

Скачайте файл [smarty.php](https://cloud.mail.ru/public/HqA7/ck6NPjotF).

```php
php examples/php/smarty.php \
"https://smarty.mail.ru/api/v1/persons/recognize?oauth_provider=mr&oauth_token="<ЗНАЧЕНИЕ_ТОКЕНА>" \
examples/friends1.jpg \
'{"space":"1", "images":[{"name":"examples/friends1.jpg"}]}'
```

Ответ:

```json
{
    "status":200,
    "body": {
        "objects": [{
            "status":0,
            "name":"examples/friends1.jpg",
            "persons":[
                {"tag":"undefined","coord":[102,30,184,134],"confidence":0.99999,"awesomeness":0.5025},
                {"tag":"undefined","coord":[393,74,461,166],"confidence":0.99987,"awesomeness":0.548},
                {"tag":"undefined","coord":[458,48,535,149],"confidence":0.99976,"awesomeness":0.4766},
                {"tag":"undefined","coord":[273,45,352,147],"confidence":0.99963,"awesomeness":0.504},
                {"tag":"undefined","coord":[525,81,600,184],"confidence":0.99954,"awesomeness":0.4849},
                {"tag":"undefined","coord":[194,76,258,167],"confidence":0.9984,"awesomeness":0.5725}
            ]
        }
        ],
        "aliases_changed":false
    },
    "htmlencoded":false,
    "last_modified":0
}
```

## Запрос на добавление в базу данных

```php
php examples/php/smarty.php \
"https://smarty.mail.ru/api/v1/persons/set?oauth_provider=mr&oauth_token="<ЗНАЧЕНИЕ_ТОКЕНА>" \
examples/rachel-green.jpg \
'{"space":"1", "images":[{"name":"examples/rachel-green.jpg", "person_id":1}]}'
```

Если запрос верный, ответ будет такой:

```json
{
    "status":200,
    "body":{
        "objects":[
            {"status":0,"name":"examples/rachel-green.jpg"}
        ]
    },
    "htmlencoded":false,
    "last_modified":0
}
```

## Запрос на удаление из базы данных

Для этого запроса файл не требуется, поэтому передаем пустую строку вместо пути:

```php
php examples/php/smarty.php \
"https://smarty.mail.ru/api/v1/persons/delete?oauth_provider=mr&oauth_token="<ЗНАЧЕНИЕ_ТОКЕНА>" \
"" \
'{"space":"1", "images":[{"name":"examples/rachel-green.jpg", "person_id":1}]}'
```

Если запрос верный, ответ будет такой:

```json
{
    "status":200,
    "body": {
        "objects":[
            {
                "status":0,"name":"examples/rachel-green.jpg"
            }
        ]
    },
    "htmlencoded":false,
    "last_modified":0
}
```
