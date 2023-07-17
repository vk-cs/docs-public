Для комфортной работы рекомендуется использовать библиотеку aws-sdk-go, которая упрощает интеграцию приложений, библиотек c S3-совместимыми сервисами.

Установить библиотеку можно на официальном сайте [https://docs.aws.amazon.com/sdk-for-go/api/](https://docs.aws.amazon.com/sdk-for-go/api/).

В процессе создания сессии необходимо указать endpoint url VK Cloud.

Список endpoint url:

- Общий домен (ведет в в Московский регион): `https://hb.vkcs.cloud`.
- Домен Москвы: `https://hb.ru-msk.vkcs.cloud`.
- Домен Казахстана: `https://hb.kz-ast.vkcs.cloud`.

Учетные данные для доступа к S3: secret key и access key можно хранить:

- в файле
- в переменных окружения

## Учетные данные в файле

При выборе варианта с хранением учетных данных в файле необходимо создать файл ~/.aws/credentials в формате:

```bash
[default]
aws_access_key_id = YOUR_ACCESS_KEY_ID
aws_secret_access_key = YOUR_SECRET_ACCESS_KEY
```

Или установить переменные окружения:

```bash
export AWS_ACCESS_KEY_ID=your_access_key_id
export AWS_SECRET_ACCESS_KEY=your_secret_access_key
```

Далее, происходит создание сессии с указанием учетных данных в файле ~/.aws/credentials:

```go
package main

import (
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
)

const (
	vkCloudHotboxEndpoint = "https://hb.vkcs.cloud"
	// клиент sdk не может определить регион, поэтому необходимо указать регион по умолчанию
	// достаточно указать любой регион, например us-east-1, он не повлияет на работу эндпоинта
	defaultRegion = "us-east-1"
)

func main() {
	// Создание сессии
	sess, err := session.NewSession()
	if err != nil {
		log.Fatalf("Unable to create session, %v", err)
	}
	// Подключение к сервису S3
	svc := s3.New(sess, aws.NewConfig().WithEndpoint(vkCloudHotboxEndpoint).WithRegion(defaultRegion))
}
```
