# {heading(Python тіліндегі интеграция мысалы)[id=vision-htg-vision-py]}

{include(/kz/_includes/_translated_by_ai.md)}

Фотодағы беттерді танып көрейік:

![](./assets/7e4c7656324f75320702af5205b1b817.jpeg)

[smarty.py](https://cloud.mail.ru/public/2xP1/vWgqf332Z) файлын жүктеп алыңыз.

```python
python examples/python/smarty.py -u "https://smarty.mail.ru/api/v1/persons/recognize?oauth_provider="mcs&oauth_token=<ЗНАЧЕНИЕ_ТОКЕНА>" -p examples/friends1.jpg --meta '{"space":"1", "create_new":false}' -v
```

Жауап аламыз:

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

Көріп отырғанымыздай, фотодан 6 бет табылды, бірақ олардың бәрі де "undefined". "undefined" нені білдіреді? Бұл дерекқорда әлі бірде-бір танылған персона жоқ екенін білдіреді.

`"space":"1"` және `"create_new":"false"` параметрлеріне назар аударыңыз, олардың мәні мысалдардан кейін түсінікті болады.

## {heading(Персонаны дерекқорға қосу)[id=vision-htg-vision-py-add-persons]}

Дерекқорға бір персонаны қосып көрейік. Бұл фотода бір персона бар:

![](./assets/cac1f88286d6ae10c9abaf59abe8a944.jpeg)

Біз бұл персонаның дерекқорда `id=1` болатынын орнатамыз. Мұны келесі сұрау және `"person_id":1` параметрі арқылы жасаймыз.

```python
python examples/python/smarty.py -u "https://smarty.mail.ru/api/v1/persons/set?oauth_provider=mcs&oauth_token=<ЗНАЧЕНИЕ_ТОКЕНА>" -p examples/rachel-green.jpg --meta '{"space":"1", "images":[{"person_id":1}]}' -v
```

Егер сұрау дұрыс болса, жауап мынадай болады:

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

Енді беттерді қайта іздеп көрейік. Дәл сол сұрауды орындаймыз:

```python
python examples/python/smarty.py -u "https://smarty.mail.ru/api/v1/persons/recognize?oauth_provider=mcs&oauth_token=<ЗНАЧЕНИЕ_ТОКЕНА>" -p examples/friends1.jpg --meta '{"space":"1", "create_new":false}' -v
```

Бұл жолы мынадай жауап аламыз:

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

Енді алты персонасы бар фотода біз `persons/set` әдісі арқылы жүктеген персонаны табамыз. Біз дерекқорға `id=1` бар персонаны жүктедік, енді ол танылды:

<table><tbody><tr><td>"tag":"person1"</td></tr></tbody></table>

### {heading(create_new параметрі)[id=vision-htg-vision-py-add-persons-create_new]}

Енді ең басына оралайық және біз әлі дерекқорға персоналарды жүктемедік деп елестетейік. `"create_new":true` параметрімен сұрауды орындап көрейік:

```python
python examples/python/smarty.py -u "https://smarty.mail.ru/api/v1/persons/recognize?oauth_provider=mcs&oauth_token=<ЗНАЧЕНИЕ_ТОКЕНА>" -p examples/friends1.jpg --meta '{"space":"1", "create_new":true}' -v
```

Жауапта:

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

Барлық табылған персоналар дерекқорға автоматты түрде жазылғаны және оларға `id` тағайындалғаны көрінеді. Егер енді Рейчелді `persons/recognize` әдісімен іздесек, ол `"person6"` ретінде танылады.

### {heading(space параметрі)[id=vision-htg-vision-py-add-persons-space]}

Қиылыспайтын персоналар жиындарын жасауға мүмкіндік береді. Мысалы, `"space":"1"` ішіне "Друзья" сериалының барлық кейіпкерлерін (`persons/set` арқылы), ал `"space":"2"` ішіне "Бригада" сериалының барлық кейіпкерлерін жүктеуге болады. Енді автоматты өткізу жүйесін жасауға болады:

- Голливуд киностудиясында `"space":"1"` ішінде іздеу (`persons/recognize` шақыру) керек,
- Мәскеуде — `"space":"2"` ішінде.

## {heading(Персонаны дерекқордан жою)[id=vision-htg-vision-py-delete-person]}

Егер space-ті тазалау керек болса немесе қандай да бір персонаны дерекқорға қателесіп қосып қойса, `persons/delete` сұрауын пайдалану қажет.

```python
python examples/python/smarty.py -u "https://smarty.mail.ru/api/v1/persons/delete?oauth_provider=mcs&oauth_token=<ЗНАЧЕНИЕ_ТОКЕНА>" --meta '{"space":"1", "images":[{"name":"myname", "person_id":1}]}' -v
```

Егер сұрау дұрыс болса, жауап мынадай болады:

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

Бұл сұрау үшін суретті жіберу талап етілмейді, жою қажет персонаның `id` көрсетілген мета-ақпарат қана жеткілікті.

Қазіргі уақытта бұл сұрауды алдыңғы сұраулар сияқты multipart/form"-data көмегімен орындау қажет.

Болашақта мұндай сұрауларды (файлды серверге жіберуді қажет етпейтін) кәдімгі `application/json` арқылы немесе тіпті қарапайым GET-сұрау арқылы шақыру мүмкіндігі жоспарланып отыр.
