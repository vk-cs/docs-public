## Автономера

Запрос:

```bash
curl -k -v "https://smarty.mail.ru/api/v1/objects/detect?oauth_provider=mcs&oauth_token=xxx"       \
   -F file_0=@examples/car_number1.jpg                                                             \
   -F file_1=@examples/x5.png                                                                      \
   -F meta='{                                                                                      \
                "mode":["car_number"],                                                             \
                "images":[                                                                         \
                   {                                                                               \
                     "name":"file_1"                                                               \
                   },                                                                              \
                   {                                                                               \
                      "name":"file_0"                                                              \
                   }]                                                                              \
             }' 
```

Ответ:

```json
{
  "status":200,
  "body":
  {
    "car_number_labels":[
    {
      "status":0,
      "name":"file_0",
      "labels":[
         {
           "eng":"K200PT98",
           "rus":"К200РТ98",
           "prob":0.7168,
           "coord":[24,70,220,117]
         }]
    },
    {
      "status":0,
      "name":"file_1",
      "labels":[
        {
          "eng":"M505KC99",
          "rus":"М505КС99",
          "prob":0.8434,
         "coord":[955,427,1045,477]
        }]
    }]
  },
  "htmlencoded":false,
  "last_modified":0
}
```

## Объекты+сцены

```bash
curl -k -v "https://smarty.mail.ru/api/v1/objects/detect?oauth_provider=mcs&oauth_token=xxx" -F file_0=@examples/car_number1.jpg  -F file_1=@examples/x5.png  -F meta='{"mode":["object", "scene"],"images":[{"name":"file_1"}, {"name":"file_0"}]}'
```

## Персоны

```bash
curl -k -v "https://smarty.mail.ru/api/v1/persons/recognize?oauth_provider=mcs&oauth_token=xxx" -F file_0=@examples/friends1.jpg  -F file_1=@examples/rachel-green.jpg -F meta='{"images":[{"name":"file_1"}, {"name":"file_0"}], "space":"1"}'
```
