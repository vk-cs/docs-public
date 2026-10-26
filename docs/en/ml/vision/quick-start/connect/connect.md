# {heading(Connecting to the service)[id=vision-quick-start-auth-vision-connect-connect]}

{include(/en/_includes/_translated_by_ai_en.md)}

The machine learning service is enabled by default in {var(cloud)} projects. You can connect to the service using the methods described below.

## {heading(API Endpoint)[id=vision-quick-start-auth-vision-connect-api-endpoint]}

An API Endpoint is an "entry point", a URL used to connect to the service for management. There are two of them for machine learning:

- Vision for image recognition `https://smarty.mail.ru/`
- Vision for video recognition `https://smarty.mail.ru/`

## {heading(Access via client identifier and secret key)[id=vision-quick-start-auth-vision-connect-ip-secret-access]}

To manage access via the client identifier and secret key, the necessary information is displayed on the [Vision API page](https://msk.cloud.vk.ru/app/services/machinelearning/vision/access/). The client identifier has already been generated and cannot be replaced, while the key can be reissued using the corresponding button.

## {heading(Access via service token)[id=vision-quick-start-auth-vision-connect-service-token-access]}

To generate a service token, click the button and select the desired scope:

1. Click the "Add service token" button.
2. Select the desired scope.
3. Click "Create".

The token will be created and displayed on the page.