# {heading(Ошибка Spark Connect: 404 unimplemented)[id=spark_connect_404]}

## {heading(Проблема)[id=spark_connect_404_problem]}

При подключении к Spark Connect по SSH-тунелю, который проксирует запросы с `localhost` клиента до кластера Spark, возникает ошибка:

```console
404 unimplemented
```

Ошибка возникает, потому что при подключении к Spark Connect через SSH-туннель пользователь использует локальный адрес (`localhost`) вместо DNS-имени сервиса. В результате в HTTP-запросе в качестве заголовка `HOST` используется значение `localhost`, и NGINX на кластере не может перенаправить трафик на Spark Connect.

## {heading(Решение)[id=spark_connect_404_solving]}

Подключайтесь к Spark Connect из окружения, в котором можно сделать прямой запрос по DNS-имени сервиса.