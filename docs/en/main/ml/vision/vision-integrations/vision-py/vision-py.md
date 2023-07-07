Let's try to recognize the faces in the photo:

![](./assets/7e4c7656324f75320702af5205b1b817-jpeg)

Download the file [smarty.py](https://cloud.mail.ru/public/2xP1/vWgqf332Z).

```python

python examples/python/smarty.py\
-u "https://smarty.mail.ru/api/v1/persons/recognize?oauth_provider="mcs&oauth_token=e50b000614a371ce99c01a80a4558d8ed93b313737363830" \
-p examples/friends1.jpg \
--meta '{"space":"1", "create_new":false}' \
-v
```

We get the answer:

```json

{
"status":200,
"body":{
"objects": [
{
status:0,
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
"htmlencoded":false
"last_modified":0
}
```

As you can see, there were 6 faces in the photo, but they are all "undefined". What does "undefined" mean? It means that there are no recognized persons in the database yet.

Pay attention to the parameters "space":"1" and "create_new":false, their meaning will soon become clear from the examples.

## Adding a person to the database

Let's try to add a person to the database. There is one person in this photo:

![](./assets/cac1f88286d6ae10c9abaf59abe8a944-jpeg)

We will establish that this person has id=1 in the database. Let's do this with the following request and the "person_id":1 parameter.

```python
python examples/python/smarty.py\
-u "https://smarty.mail.ru/api/v1/persons/set?oauth_provider=mcs&oauth_token=e50b000614a371ce99c01a80a4558d8ed93b313737363830" \
-p examples/rachel-green.jpg \
--meta '{"space":"1", "images":[{"person_id":1}]}' \
-v
```

If the request is correct, the response will be:

```json
{
"status":200,
"body":{
"objects":[
{"status":0,"name":"file_0"}
]
},
"htmlencoded":false
"last_modified":0
}
```

Now let's try to search for faces again. Run the same query:

```python
python examples/python/smarty.py\
-u "https://smarty.mail.ru/api/v1/persons/recognize?oauth_provider=mcs&oauth_token=e50b000614a371ce99c01a80a4558d8ed93b313737363830" \
-p examples/friends1.jpg \
--meta '{"space":"1", "create_new":false}' \
-v
```

This time we get the answer:

```json
{
"status":200,
"body":{
"objects": [
{
status:0,
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
"htmlencoded":false
"last_modified":0
}
```

Now in the photo with six persons, we find the person we loaded with the persons/set method. We loaded a person with id=1 into the database, and now it is recognized:

<table><tbody><tr><td>"tag":"person1"</td></tr></tbody></table>

### create_new parameter

Now let's go back to the very beginning and imagine that we haven't loaded the personas into the database yet. Let's try to execute the query with "create_new":true:

```python
python examples/python/smarty.py\
-u "https://smarty.mail.ru/api/v1/persons/recognize?oauth_provider=mcs&oauth_token=e50b000614a371ce99c01a80a4558d8ed93b313737363830" \
-p examples/friends1.jpg \
--meta '{"space":"1", "create_new":true}' \
-v
```

In response:

```json
{
"status":200,
"body":{
"objects": [
{
status:0,
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
"htmlencoded":false
"last_modified":0
}
```

It can be seen that all found persons are automatically registered in the database, and they are assigned id. If Rachel is now searched using the persons/recognize method, she will now be recognized as "person6".

### space parameter

Allows you to create non-overlapping sets of persons. For example, in "space":"1" you can load (persons/set) all the characters of the series "Friends", and in "space":"2" - all the characters of the series "Brigade". Now you can create an automatic access system:

- in a Hollywood movie studio, look for (call persons/recognize) in "space":"1",
- in Moscow - in "space": "2".

## Removing a person from the database

If you need to clean up the space (space) or some person was added to the database by mistake, you must use the request persons/delete.

```python
python examples/python/smarty.py\
-u "https://smarty.mail.ru/api/v1/persons/delete?oauth_provider=mcs&oauth_token=e50b000614a371ce99c01a80a4558d8ed93b313737363830" \
--meta '{"space":"1", "images":[{"name":"myname", "person_id":1}]}' \
-v
```

If the request is correct, the response will be:

```json

{
"status":200,
body:
{
"objects":[{"status":0,"name":"myname"}]
},
"htmlencoded":false
"last_modified":0
}
```

For this request, it is not required to transfer a picture, only meta-information indicating the id of the person to be deleted is enough.

Currently, this request needs to be made using multipart/form"-data, just like the previous requests.

In the future, it is planned to be able to make such requests (which do not require transferring a file to the server) through a regular application/json or even with a regular GET request.
