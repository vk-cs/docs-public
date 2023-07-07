Попробуем распознать лица на фотографии:

![](./assets/7e4c7656324f75320702af5205b1b817-jpeg)

Скачайте файл [smarty.py](https://cloud.mail.ru/public/2xP1/vWgqf332Z).

```python
python examples/python/smarty.py \
-u "https://smarty.mail.ru/api/v1/persons/recognize?oauth_provider="mcs&oauth_token=e50b000614a371ce99c01a80a4558d8ed93b313737363830" \
-p examples/friends1.jpg \
--meta '{"space":"1", "create_new":false}' \
-v
```

Получим ответ:

```json

{
    "status":200,
    "body":{
        "objects": [
            {
            "status":0,
            "name":"file_0",
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

Как видим, на фотографии нашлось 6 лиц, но все они "undefined". Что значит "undefined"?Это значит, что в базе данных еще нет ни одной распознанной персоны.

Обратите внимание на параметры `"space":"1"` и `"create_new":"false"`, их значение вскоре станет понятно из примеров.

## Добавление персоны в базу данных

Попробуем добавить в базу данных персону. На этой фотографии одна персона:

![](./assets/cac1f88286d6ae10c9abaf59abe8a944-jpeg)

Мы установим, что эта персона имеет `id=1` в базе данных. Сделаем это с помощью следующего запроса и параметра `"person_id":1`.

```python
python examples/python/smarty.py \
-u "https://smarty.mail.ru/api/v1/persons/set?oauth_provider=mcs&oauth_token=e50b000614a371ce99c01a80a4558d8ed93b313737363830" \
-p examples/rachel-green.jpg \
--meta '{"space":"1", "images":[{"person_id":1}]}' \
-v
```

Если запрос верный, ответ будет такой:

```json
{
    "status":200,
    "body":{
        "objects":[
            {"status":0,"name":"file_0"}
        ]
    },
    "htmlencoded":false,
    "last_modified":0
}
```

Теперь попробуем поискать лица снова. Выполняем тот же запрос:

```python
python examples/python/smarty.py \
-u "https://smarty.mail.ru/api/v1/persons/recognize?oauth_provider=mcs&oauth_token=e50b000614a371ce99c01a80a4558d8ed93b313737363830" \
-p examples/friends1.jpg \
--meta '{"space":"1", "create_new":false}' \
-v
```

На этот раз получим ответ:

```json
{
    "status":200,
    "body":{
        "objects": [
        {
            "status":0,
            "name":"file_0",
            "persons":[
                {"tag":"undefined","coord":[102,30,184,134],"confidence":0.99999,"awesomeness":0.5025},
                {"tag":"undefined","coord":[393,74,461,166],"confidence":0.99987,"awesomeness":0.548},
                {"tag":"undefined","coord":[458,48,535,149],"confidence":0.99976,"awesomeness":0.4766},
                {"tag":"undefined","coord":[273,45,352,147],"confidence":0.99963,"awesomeness":0.504},
                {"tag":"undefined","coord":[525,81,600,184],"confidence":0.99954,"awesomeness":0.4849},
                {"tag":"person1","coord":[194,76,258,167],"confidence":0.9984,"awesomeness":0.5725}
            ]
        }
        ],
        "aliases_changed":false
    },
    "htmlencoded":false,
    "last_modified":0
}
```

Теперь на фотографии с шестью персонами мы находим персону, которую мы загрузили с помощью метода `persons/set`. Мы загружали в базу данных персону с `id=1`, и теперь она распознана:

<table><tbody><tr><td>"tag":"person1"</td></tr></tbody></table>

### Параметр create_new

Теперь вернемся в самое начало и представим, что мы еще не загружали персоны в базу данных. Попробуем выполнить запрос с `"create_new":true`:

```python
python examples/python/smarty.py \
-u "https://smarty.mail.ru/api/v1/persons/recognize?oauth_provider=mcs&oauth_token=e50b000614a371ce99c01a80a4558d8ed93b313737363830" \
-p examples/friends1.jpg \
--meta '{"space":"1", "create_new":true}' \
-v
```

В ответе:

```json
{
    "status":200,
    "body":{
        "objects": [
            {
                "status":0,
                "name":"file_0",
                "persons":[
                    {"tag":"person1","coord":[102,30,184,134],"confidence":0.99999,"awesomeness":0.5025},
                    {"tag":"person2","coord":[393,74,461,166],"confidence":0.99987,"awesomeness":0.548},
                    {"tag":"person3","coord":[458,48,535,149],"confidence":0.99976,"awesomeness":0.4766},
                    {"tag":"person4","coord":[273,45,352,147],"confidence":0.99963,"awesomeness":0.504},
                    {"tag":"person5","coord":[525,81,600,184],"confidence":0.99954,"awesomeness":0.4849},
                    {"tag":"person6","coord":[194,76,258,167],"confidence":0.9984,"awesomeness":0.5725}
                ]
            }
        ],
        "aliases_changed":false
    },
    "htmlencoded":false,
    "last_modified":0
}
```

Видно, что все найденные персоны автоматически записались в базу данных, и им присвоены `id`. Если теперь поискать Рейчел методом `persons/recognize`, то теперь она будет распознана как `"person6"`.

### Параметр space

Позволяет создавать непересекающиеся наборы персон. Например, в `"space":"1"` можно загрузить (`persons/set`) всех персонажей сериала "Друзья", а в `"space":"2"` - всех персонажей сериала "Бригада". Теперь можно создать автоматическую пропускную систему:

- на голливудской киностудии стоит искать (вызывать `persons/recognize`) в `"space":"1"`,
- в московской — в `"space":"2"`.

## Удаление персоны из базы данных

Если нужно почистить спейс (space) или какую-то персону добавили в базу данных по ошибке, необходимо использовать запрос `persons/delete`.

```python
python examples/python/smarty.py \
-u "https://smarty.mail.ru/api/v1/persons/delete?oauth_provider=mcs&oauth_token=e50b000614a371ce99c01a80a4558d8ed93b313737363830" \
--meta '{"space":"1", "images":[{"name":"myname", "person_id":1}]}' \
-v
```

Если запрос верный, ответ будет такой:

```json

{
    "status":200,
    "body":
    {
        "objects":
        [
            {"status":0,"name":"myname"}
        ]
    },
    "htmlencoded":false,
    "last_modified":0
}
```

Для этого запроса не требуется передавать картинку, достаточно только мета-информации c указанием `id` персоны, которую надо удалить.

В настоящий момент этот запрос требуется делать с помощью multipart/form"-data, как и предыдущие запросы.

В будущем планируется возможность вызывать такие запросы (не требующие передачи файла на сервер) через обычный `application/json` или даже с помощью обычного GET-запроса.
