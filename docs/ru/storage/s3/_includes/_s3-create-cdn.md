{includetag(s3_create_cdn_all)}

{tabs}

{tab(Личный кабинет)}

1. [Перейдите](https://msk.cloud.vk.com/app) в личный кабинет {var(cloud)}.
{/includetag}
{includetag(s3_create_cdn_s3)}
1. Выберите проект, где находится нужный бакет. Если у вас еще нет бакета, {linkto(../../../../../storage/s3/instructions/buckets/create-bucket#s3-instructions-create-bucket)[text=создайте его]}.
{/includetag}
{includetag(s3_create_cdn_net)}
1. Выберите проект, где находится нужный бакет. Если у вас еще нет бакета, {linkto(../../../../storage/s3/instructions/buckets/create-bucket#s3-instructions-create-bucket)[text=создайте его]}.
{/includetag}
{includetag(s3_create_cdn_all)}
1. Перейдите в раздел **Объектное хранилище** → **Бакеты**.
1. Перейдите в настройки бакета одним из способов:
{/includetag}

{includetag(s3_create_cdn_s3)}
   - Нажмите ![ ](../../../../../assets/more-icon.svg "inline") для нужного бакета и выберите пункт **Настройки**.
   - Нажмите на имя нужного бакета, затем на странице бакета нажмите кнопку ![ ](../../../../../assets/settings-icon.svg "inline").
{/includetag}

{includetag(s3_create_cdn_net)}
   - Нажмите ![ ](../../../../assets/more-icon.svg "inline") для нужного бакета и выберите пункт **Настройки**.
   - Нажмите на имя нужного бакета, затем на странице бакета нажмите кнопку ![ ](../../../../assets/settings-icon.svg "inline").
{/includetag}

{includetag(s3_create_cdn_all)}
1. Перейдите на вкладку **CDN**.
1. Выберите опцию **Использовать CDN для данного бакета**.
{/includetag}

{includetag(s3_create_cdn_s3)}
   Чтобы бакет мог выступать в качестве источника для CDN-ресурса, выбирайте ACL `public-read` при {linkto(../../../../../storage/s3/instructions/objects/upload-object#s3-instructions-upload-object)[text=добавлении объектов в этот бакет]}.
{/includetag}

{includetag(s3_create_cdn_net)}
   Чтобы бакет мог выступать в качестве источника для CDN-ресурса, выбирайте ACL `public-read` при {linkto(../../../../storage/s3/instructions/objects/upload-object#s3-instructions-upload-object)[text=добавлении объектов в этот бакет]}.
{/includetag}

{includetag(s3_create_cdn_all)}
1. Настройте один или несколько персональных доменов.

   1. Укажите домены, которые будут использоваться для CDN. При обращении к этим доменам за контентом контент будет доставлен с помощью CDN.

      В поле **Персональный домен** можно указать один домен. Используйте полное квалифицированное имя домена (FQDN). Не добавляйте к нему корневое доменное имя: допустима запись вида `cdn.example.com`, но не `cdn.example.com.`.
{/includetag}

{includetag(s3_create_cdn_s3)}
      Чтобы указать несколько доменов, нажмите ![plus-icon](../../../../../assets/plus-icon.svg "inline") **Добавить домен**. Ненужные домены можно удалить, нажав на значок ![trash-icon](../../../../../assets/trash-icon.svg "inline") рядом с ними.
{/includetag}

{includetag(s3_create_cdn_net)}
      Чтобы указать несколько доменов, нажмите ![plus-icon](../../../../assets/plus-icon.svg "inline") **Добавить домен**. Ненужные домены можно удалить, нажав на значок ![trash-icon](../../../../assets/trash-icon.svg "inline") рядом с ними.
{/includetag}

{includetag(s3_create_cdn_all)}

      {note:warn}
      После создания CDN-ресурса изменить эти персональные домены невозможно.
      {/note}

   1. Сохраните имя служебного домена, которое нужно задать в CNAME-записи для указанных доменов.

      Подсказка с этой информацией приведена ниже.

   1. Добавьте для каждого персонального домена CNAME-запись в настройках DNS-зоны. Используйте имя служебного домена в качестве псевдонима.
{/includetag}

{includetag(s3_create_cdn_s3)}
      Если вы используете сервис DNS от {var(cloud)}, следуйте {linkto(../../../../../networks/dns/instructions/publicdns/records#dns-records-add)[text=инструкции]}.
{/includetag}

{includetag(s3_create_cdn_net)}
      Если вы используете сервис DNS от {var(cloud)}, следуйте {linkto(../../../../networks/dns/instructions/publicdns/records#dns-records-add)[text=инструкции]}.
{/includetag}

{includetag(s3_create_cdn_all)}
      Добавить CNAME-записи можно и после создания CDN-ресурса.

1. Выберите нужное время жизни кеша из выпадающего списка.

   Этот параметр позволяет в течение заданного времени кешировать ответы со следующими статусами HTTP: [200](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200), [201](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201), [204](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/204), [206](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/206), [301](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/301), [302](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/302), [303](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/303), [304](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/304), [307](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/307), [308](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/308).

   Ответы с другими статусами не кешируются.

   (Опционально) Можно полностью выключить кеширование, выбрав пункт **Не кешировать**.

1. Нажмите кнопку **Сохранить изменения**.
1. Дождитесь создания группы источников и CDN-ресурса для бакета. Созданные объекты будут доступны в разделе **CDN** личного кабинета.
{/includetag}
{includetag(s3_create_cdn_s3)}
1. {linkto(../../../../../networks/cdn/instructions/manage-cdn/origin-settings#cdn-origin-settings-host-header)[text=Установите]} заголовок Host в формате `<ИМЯ_БАКЕТА>.<ДОМЕН_СЕРВИСА>`.
{/includetag}
{includetag(s3_create_cdn_net)}
1. {linkto(../../../../networks/cdn/instructions/manage-cdn/origin-settings#cdn-origin-settings-host-header)[text=Установите]} заголовок Host в формате `<ИМЯ_БАКЕТА>.<ДОМЕН_СЕРВИСА>`.
{/includetag}
{includetag(s3_create_cdn_all)}

   Здесь:

   - `<ИМЯ_БАКЕТА>` — имя бакета VK Object Storage, содержащего нужный контент.
{/includetag}
{includetag(s3_create_cdn_s3)}
   - `<ДОМЕН_СЕРВИСА>` — домен сервиса VK Object Storage, должен соответствовать {linkto(../../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:
{/includetag}
{includetag(s3_create_cdn_net)}
   - `<ДОМЕН_СЕРВИСА>` — домен сервиса VK Object Storage, должен соответствовать {linkto(../../../../tools-for-using-services/account/concepts/regions#tools-account-concepts-regions)[text=региону]} аккаунта:
{/includetag}
{includetag(s3_create_cdn_all)}
     - `hb.vkcloud-storage.ru` или `https://hb.ru-msk.vkcloud-storage.ru` — для региона Москва;
     - `hb.kz-ast.vkcloud-storage.ru` — для региона Казахстан.

{/tab}

{/tabs}

{/includetag}