Подробный пример смотрите в статье «[Пример интеграции на Python](feedback:11789)». В этой статье мы выполним запросы persons/recognize, persons/set и persons/delete. Для этого потребуется:

<table><tbody><tr><td><pre class="language-shell">sudo apt-get install php5-cli
sudo apt-get install php5-curl</pre></td></tr></tbody></table>

### Запрос на распознавание

Скачайте файл [smarty.php](https://cloud.mail.ru/public/HqA7/ck6NPjotF).

<table><tbody><tr><td><pre class="language-shell">php examples/php/smarty.php \
"https://smarty.mail.ru/api/v1/persons/recognize?oauth_provider=mr&amp;oauth_token="e50b000614a371ce99c01a80a4558d8ed93b313737363830" \
examples/friends1.jpg \
'{"space":"1", "images":[{"name":"examples/friends1.jpg"}]}'</pre></td></tr></tbody></table>

Ответ:

<table><tbody><tr><td><pre class="language-shell">{
"status":200,
"body":{
"objects":[{
"status":0,
"name":"examples/friends1.jpg",
"persons":[
{"tag":"undefined","coord":[102,30,184,134],"confidence":0.99999,"awesomeness":0.5025},
{"tag":"undefined","coord":[393,74,461,166],"confidence":0.99987,"awesomeness":0.548},
{"tag":"undefined","coord":[458,48,535,149],"confidence":0.99976,"awesomeness":0.4766},
{"tag":"undefined","coord":[273,45,352,147],"confidence":0.99963,"awesomeness":0.504},
{"tag":"undefined","coord":[525,81,600,184],"confidence":0.99954,"awesomeness":0.4849},
{"tag":"undefined","coord":[194,76,258,167],"confidence":0.9984,"awesomeness":0.5725}
]}
],
"aliases_changed":false
},
"htmlencoded":false,
"last_modified":0
}</pre></td></tr></tbody></table>

### Запрос на добавление в базу данных

<table><tbody><tr><td><pre class="language-shell">php examples/php/smarty.php \
"https://smarty.mail.ru/api/v1/persons/set?oauth_provider=mr&amp;oauth_token="e50b000614a371ce99c01a80a4558d8ed93b313737363830" \
examples/rachel-green.jpg \
'{"space":"1", "images":[{"name":"examples/rachel-green.jpg", "person_id":1}]}'</pre></td></tr></tbody></table>

Если запрос верный, ответ будет такой:

<table><tbody><tr><td><pre class="language-shell">{
"status":200,
"body":{
"objects":[
{"status":0,"name":"examples/rachel-green.jpg"}
]
},
"htmlencoded":false,
"last_modified":0
}</pre></td></tr></tbody></table>

### Запрос на удаление из базы данных

Для этого запроса файл не требуется, поэтому передаем пустую строку вместо пути:

<table><tbody><tr><td><pre class="language-shell">php examples/php/smarty.php \
"https://smarty.mail.ru/api/v1/persons/delete?oauth_provider=mr&amp;oauth_token="e50b000614a371ce99c01a80a4558d8ed93b313737363830" \
"" \
'{"space":"1", "images":[{"name":"examples/rachel-green.jpg", "person_id":1}]}'</pre></td></tr></tbody></table>

Если запрос верный, ответ будет такой:

<table><tbody><tr><td><pre class="language-shell">{
"status":200,
"body":
{
"objects":[{"status":0,"name":"examples/rachel-green.jpg"}]
},
"htmlencoded":false,
"last_modified":0
}</pre></td></tr></tbody></table>