# {heading(Ошибка x-amz-content-sha256 при работе с AWS CLI v2)[id=s3-error-x-amz-content-sha256]}

При работе с объектным хранилищем появляется сообщение `x-amz-content-sha256 must be UNSIGNED-PAYLOAD`. 

Это может быть вызвано тем, что используется AWS CLI версии 2.

### {heading(Решение)[id=s3-error-x-amz-content-sha256-resolve]}

Добавьте флаг `--no-sign-request` к вашей команде или настройте профиль AWS CLI для использования подписи версии 2 (SigV2).