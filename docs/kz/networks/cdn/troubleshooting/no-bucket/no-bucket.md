# {heading(NoSuchBucket қатесі)[id=cdn-no-bucket]}

{include(/kz/_includes/_translated_by_ai.md)}

CDN қызметін {var(s3)} бакеті контент көзі ретінде пайдаланғанда, пайдаланушы сұралған контенттің орнына қате туралы хабарламасы бар XML файлын алады:

```xml
<Error>
  <Code>NoSuchBucket</Code>
  <Message>The specified bucket does not exist</Message>
  <RequestId>VHT...jh1c</RequestId>
</Error>
```

Мәселе CDN ресурстарының баптауларында Host тақырыбының `Пересылать` параметрі қолданылатындықтан туындайды. Бұл баптау тақырып мәні ретінде алғашқы бапталған дербес доменнің атауын қайтарады және бакетті іздеу осы мән бойынша жүргізіледі.

### {heading(Шешім)[id=cdn-no-bucket-solving]}

Host тақырыбын `<ИМЯ_БАКЕТА>.<ДОМЕН_СЕРВИСА>` форматында {linkto(../../../../networks/cdn/instructions/manage-cdn/origin-settings#cdn-origin-settings-host-header)[text=орнатыңыз]}.

Мұнда:

- `<ИМЯ_БАКЕТА>` — қажетті контентті қамтитын {var(s3)} бакетінің атауы.
- `<ДОМЕН_СЕРВИСА>` — {var(s3)} сервисінің домені, ол аккаунттың {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=өңіріне]} сәйкес келуі керек:

    - `hb.vkcloud-storage.ru` немесе `hb.ru-msk.vkcloud-storage.ru` — Мәскеу өңірі үшін;
    - `hb.kz-ast.vkcloud-storage.ru` — Қазақстан өңірі үшін.
