<tabs>
<tablist>
<tab>Личный кабинет</tab>
</tablist>
<tabpanel>

1. [Перейдите](https://msk.cloud.vk.com/app/) в личный кабинет VK Cloud.
1. Выберите проект, где находится нужный бакет. Если у вас еще нет бакета, [создайте его](/ru/storage/s3/service-management/buckets/create-bucket).
1. Перейдите в раздел **Объектное хранилище → Бакеты**.
1. Нажмите на имя нужного бакета.
1. Перейдите на вкладку **CDN**.
1. Выберите опцию **Использовать CDN для данного бакета**.

   Чтобы бакет мог выступать в качестве источника для CDN-ресурса, выбирайте ACL `public-read` при [добавлении объектов в этот бакет](/ru/storage/s3/service-management/objects/upload-object).

1. Настройте один или несколько персональных доменов.

   1. Укажите домены, которые будут использоваться для CDN. При обращении к этим доменам за контентом контент будет доставлен с помощью CDN.

      В поле **Персональный домен** можно указать один домен. Используйте полное квалифицированное имя домена (FQDN). Не добавляйте к нему корневое доменное имя: допустима запись вида `cdn.example.com`, но не `cdn.example.com.`.

      Чтобы указать несколько доменов, нажмите на ссылку ![plus-icon](/ru/assets/plus-icon.svg "inline") **Добавить домен**. Ненужные домены можно удалить, нажав на значок ![trash-icon](/ru/assets/trash-icon.svg "inline") рядом с ними.

      <warn>

      После создания CDN-ресурса изменить эти персональные домены невозможно.

      </warn>

   1. Сохраните имя служебного домена, которое нужно задать в CNAME-записи для указанных доменов.

      Подсказка с этой информацией приведена ниже.

   1. Добавьте для каждого персонального домена CNAME-запись в настройках DNS-зоны. Используйте имя служебного домена в качестве псевдонима.

      Если вы используете сервис DNS от VK Cloud, следуйте [инструкции](/ru/networks/dns/publicdns#dobavlenie_resursnyh_zapisey).

      Добавить CNAME-записи можно и после создания CDN-ресурса.

1. Выберите нужное время жизни кеша из выпадающего списка.

   Этот параметр позволяет в течении заданного времени кешировать ответы со следующими статусами HTTP: [200](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200), [201](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201), [204](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/204), [206](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/206), [301](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/301), [302](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/302), [303](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/303), [304](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/304), [307](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/307), [308](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/308).

   Ответы с другими статусами не кешируются.

   (Опционально) Можно полностью выключить кеширование, выбрав пункт **Не кешировать**.

1. Нажмите кнопку **Сохранить изменения**.

   Начнется создание группы источников и CDN-ресурса для бакета. Созданные объекты будут доступны в разделе **CDN** личного кабинета.

</tabpanel>
</tabs>
