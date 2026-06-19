# {heading(Spark Connect қатесі: 404 unimplemented)[id=spark_connect_404]}

{include(/kz/_includes/_translated_by_ai.md)}

## {heading(Мәселе)[id=spark_connect_404_problem]}

Клиенттің `localhost` мекенжайынан Spark кластеріне сұрауларды проксилайтын SSH-туннель арқылы Spark Connect-ке қосылған кезде қате пайда болады:

```console
404 unimplemented
```

Қате Spark Connect-ке SSH-туннель арқылы қосылған кезде пайдаланушы сервис DNS-атауының орнына жергілікті мекенжайды (`localhost`) қолданатындықтан туындайды. Соның салдарынан HTTP-сұрауда `HOST` тақырыбы ретінде `localhost` мәні пайдаланылады, ал кластердегі NGINX трафикті Spark Connect-ке қайта бағыттай алмайды.

## {heading(Шешім)[id=spark_connect_404_solving]}

Spark Connect-ке сервис DNS-атауы бойынша тікелей сұрау жасауға болатын ортадан қосылыңыз.