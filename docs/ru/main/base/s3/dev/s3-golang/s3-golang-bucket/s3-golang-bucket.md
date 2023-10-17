Проведя [предварительные настройки](../s3-golang-setup/), можно приступить к работе с бакетами S3.

## Получение списка бакетов

Список бакетов можно получить следующим образом:

```go
package main

import (
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"log"
)

const (
	vkCloudHotboxEndpoint = "https://hb.vkcs.cloud"
	defaultRegion = "us-east-1"
)

func main() {
	// Создание сессии
	sess, _ := session.NewSession()

	// Подключение к сервису S3
	svc := s3.New(sess, aws.NewConfig().WithEndpoint(vkCloudHotboxEndpoint).WithRegion(defaultRegion))

	if res, err := svc.ListBuckets(nil); err != nil {
		log.Fatalf("Unable to list buckets, %v", err)
	} else {
		for _, b := range res.Buckets {
			log.Printf("* %s created on %s \n", aws.StringValue(b.Name), aws.TimeValue(b.CreationDate))
		}
	}
}
```

В [официальной документации к библиотеке aws-sdk-go](https://docs.aws.amazon.com/sdk-for-go/api/service/s3/#S3.ListBuckets) дано подробное описание команды `ListBuckets`.
