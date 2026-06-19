# {heading(Ошибка NoSuchBucket)[id=cdn-no-bucket]}

При использовании CDN с бакетом {var(s3)} в качестве источника пользователь вместо запрошенного контента получает XML-файл с сообщением об ошибке:

```xml
<Error>
  <Code>NoSuchBucket</Code>
  <Message>The specified bucket does not exist</Message>
  <RequestId>VHT...jh1c</RequestId>
</Error>
```

Проблема возникает, так как в настройках CDN-ресурсов используется параметр заголовка Host `Пересылать`. Эта настройка в качестве значения заголовка возвращает имя первого настроенного персонального домена и поиск бакета ведется по этому значению.

### {heading(Решение)[id=cdn-no-bucket-solving]}

{linkto(../../../../networks/cdn/instructions/manage-cdn/origin-settings#cdn-origin-settings-host-header)[text=Установите]} заголовок Host в формате `<ИМЯ_БАКЕТА>.<ДОМЕН_СЕРВИСА>`.

Здесь:

- `<ИМЯ_БАКЕТА>` — имя бакета {var(s3)}, содержащего нужный контент.
- `<ДОМЕН_СЕРВИСА>` — домен сервиса {var(s3)}, должен соответствовать {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:

  - `hb.vkcloud-storage.ru` или `hb.ru-msk.vkcloud-storage.ru` — для региона Москва;
  - `hb.kz-ast.vkcloud-storage.ru` — для региона Казахстан.
