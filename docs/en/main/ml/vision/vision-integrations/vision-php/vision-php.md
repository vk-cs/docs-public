For a detailed example, see the article "[Python integration example](feedback:11789)". In this article, we will execute persons/recognize, persons/set, and persons/delete requests. This will require:

```
sudo apt-get install php5-cli
sudo apt-get install php5-curl
```

## Request for recognition

Download the file [smarty.php](https://cloud.mail.ru/public/HqA7/ck6NPjotF).

```php
php examples/php/smarty.php\
"https://smarty.mail.ru/api/v1/persons/recognize?oauth_provider=mr&oauth_token="e50b000614a371ce99c01a80a4558d8ed93b313737363830" \
examples/friends1.jpg \
'{"space":"1", "images":[{"name":"examples/friends1.jpg"}]}'
```

Answer:

```json
{
"status":200,
"body":{
"objects":[{
status:0,
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
"htmlencoded":false
"last_modified":0
}
```

## Request to add to database

```php
php examples/php/smarty.php\
"https://smarty.mail.ru/api/v1/persons/set?oauth_provider=mr&oauth_token="e50b000614a371ce99c01a80a4558d8ed93b313737363830" \
examples/rachel-green.jpg \
'{"space":"1", "images":[{"name":"examples/rachel-green.jpg", "person_id":1}]}'
```

If the request is correct, the response will be:

```json
{
"status":200,
"body":{
"objects":[
{"status":0,"name":"examples/rachel-green.jpg"}
]
},
"htmlencoded":false
"last_modified":0
}
```

## Request to delete from database

This request does not require a file, so we pass an empty string instead of the path:

```php
php examples/php/smarty.php\
"https://smarty.mail.ru/api/v1/persons/delete?oauth_provider=mr&oauth_token="e50b000614a371ce99c01a80a4558d8ed93b313737363830" \
"" \
'{"space":"1", "images":[{"name":"examples/rachel-green.jpg", "person_id":1}]}'
```

If the request is correct, the response will be:

```json

{
"status":200,
body:
{
"objects":[{"status":0,"name":"examples/rachel-green.jpg"}]
},
"htmlencoded":false
"last_modified":0
}
```
