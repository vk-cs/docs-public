# {heading(Подключение к сервису)[id=vision-quick-start-auth-vision-connect]}

Сервис машинного обучения по умолчанию включен в проектах {var(cloud)}. Подключиться к сервису можно способами, описанными ниже.

## {heading(API Endpoint)[id=vision-quick-start-auth-vision-connect-api-endpoint]}

API Endpoint — это «точки входа», URL, по которому происходит подключение к сервису для управления. Для машинного обучения их два:

- Vision для распознавания изображений `https://smarty.mail.ru/`
- Vision для распознавания видео `https://smarty.mail.ru/`

## {heading(Доступ через идентификатор клиента и секретный ключ)[id=vision-quick-start-auth-vision-connect-ip-secret-access]}

Для управления доступом через идентификатор клиента и секретный ключ на [странице Vision API](https://msk.cloud.vk.com/app/services/machinelearning/vision/access/) отображается нужная информация. Идентификатор клиента уже сгенерирован и замене не подлежит, а ключ можно перевыпустить соответствующей кнопкой.

## {heading(Доступ через сервисный токен)[id=vision-quick-start-auth-vision-connect-service-token-access]}

Для генерации сервисного токена надо нажать кнопку и выбрать нужный скоуп:

1. Нажмите на кнопку «Добавить сервисный токен».
2. Выберите нужный скоуп.
3. Нажмите «Создать».

Токен будет создан и отображен на странице.
