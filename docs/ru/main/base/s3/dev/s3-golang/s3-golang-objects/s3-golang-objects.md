Проведя [предварительные настройки сессии](../s3-golang-setup/s3-golang-setup.md), можно приступить к работе с объектами S3.

## Загрузка объекта

Загрузка объектов в бакет инициализируется данной командой:

```go
package main

import (
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"log"
	"os"
	"strings"
)

const (
	vkCloudHotboxEndpoint = "https://hb.bizmrg.com"
	defaultRegion         = "us-east-1"
)

func main() {
	// Создание сессии
	sess, _ := session.NewSession()

	// Подключение к сервису S3
	svc := s3.New(sess, aws.NewConfig().WithEndpoint(vkCloudHotboxEndpoint).WithRegion(defaultRegion))

	bucket := "gobucket"

	// Загрузка объекта из строки в бакет
	key := "test_string.txt"
	body := "Hello World!"

	if _, err := svc.PutObject(&s3.PutObjectInput{
		Bucket: aws.String(bucket),
		Key:    aws.String(key),
		Body:   strings.NewReader(body),
	}); err != nil {
		log.Fatalf("Unable to upload %q to %q, %v\n", body, bucket, err)
	} else {
		log.Printf("File %q uploaded to bucket %q\n", body, bucket)
	}

	// Загрузка объекта из файла в бакет
	fileName := "test.txt"
	file, err := os.Open(fileName)
	if err != nil {
		log.Fatalf("Unable to open file %q, %v\n", fileName, err)
	}

	defer file.Close()

	if _, err := svc.PutObject(&s3.PutObjectInput{
		Bucket: aws.String(bucket),
		Key:    aws.String(key),
		Body:   file,
	}); err != nil {
		log.Fatalf("Unable to upload %q to %q, %v\n", fileName, bucket, err)
	} else {
		log.Printf("File %q uploaded to bucket %q\n", fileName, bucket)
	}
}
```

Подробное описание PutObject дано в [официальной документации библиотеки aws-sdk-go](https://docs.aws.amazon.com/sdk-for-go/api/service/s3/#S3.PutObject)

## Копирование объектов между бакетами

Копирование объектов между бакетами можно выполнить следующим образом:

```go
package main

import (
	"fmt"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"log"
	"strings"
)

const (
	vkCloudHotboxEndpoint = "https://hb.bizmrg.com"
	defaultRegion         = "us-east-1"
)

func main() {
	// Создание сессии
	sess, _ := session.NewSession()

	// Подключение к сервису S3
	svc := s3.New(sess, aws.NewConfig().WithEndpoint(vkCloudHotboxEndpoint).WithRegion(defaultRegion))

	// Копирование объекта из одного бакета в другой
	
	sourceBucket := "gobucket"
	sourceKey := "test_string.txt"
	destBucket := "gobucket2"
	destKey := "test_string.txt"

	if _, err := svc.CopyObject(&s3.CopyObjectInput{
		Bucket:     aws.String(destBucket),
		Key:        aws.String(destKey),
		CopySource: aws.String(fmt.Sprintf("%s/%s", sourceBucket, sourceKey)),
	}); err != nil {
		log.Fatalf("Unable to copy object from %q to %q, %v\n", sourceBucket, destBucket, err)
	} else {
		fmt.Printf("Object copied from %q to %q\n", sourceBucket, destBucket)
	}
}
```

Подробное описание команды CopyObject дано в [официальной документации библиотеки aws-sdk-go](https://docs.aws.amazon.com/sdk-for-go/api/service/s3/#S3.CopyObjecty)

## Получение объекта

Для получения объекта из бакета следует воспользоваться следующим способом:

```go
package main

import (
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"log"
	"strings"
)

const (
	vkCloudHotboxEndpoint = "https://hb.bizmrg.com"
	defaultRegion         = "us-east-1"
)

func main() {
	// Создание сессии
	sess, _ := session.NewSession()

	// Подключение к сервису S3
	svc := s3.New(sess, aws.NewConfig().WithEndpoint(vkCloudHotboxEndpoint).WithRegion(defaultRegion))

	bucket := "gobucket"
	key := "test_string.txt"

	// извлечение объекта из бакета
	if result, err := svc.GetObject(&s3.GetObjectInput{
		Bucket: aws.String(bucket),
		Key:    aws.String(key),
	}); err != nil {
		log.Fatalf("Unable to get object %q from bucket %q, %v\n", key, bucket, err)
	} else {
		data := make([]byte, *result.ContentLength)
		result.Body.Read(data)
		log.Printf("File with data %q downloaded from bucket %q", data, bucket)
	}
}
```

Подробное описание команды GetObject дано в [официальной документации библиотеки aws-sdk-go](https://docs.aws.amazon.com/sdk-for-go/api/service/s3/#S3.GetObject)

## Получение списка объектов

Для получения списка объектов в бакете необходимо:

```go
package main

import (
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"log"
)

const vkCloudHotboxEndpoint = "https://hb.bizmrg.com"

const defaultRegion = "us-east-1"

func main() {
	// Создание сессии
	sess, _ := session.NewSession()

	// Подключение к сервису S3
	svc := s3.New(sess, aws.NewConfig().WithEndpoint(vkCloudHotboxEndpoint).WithRegion(defaultRegion))

	bucket := "gobucket"
	// получение списка объектов в бакете
	result, err := svc.ListObjectsV2(&s3.ListObjectsV2Input{
		Bucket: aws.String(bucket),
	})
	if err != nil {
		log.Fatalf("Unable to list items in bucket %q, %v", bucket, err)
	} else {
        // итерирование по объектам
		for _, item := range result.Contents {
			log.Printf("Object: %s, size: %d\n", aws.StringValue(item.Key), aws.Int64Value(item.Size))
		}
	}
}
```

В [официальной документации к библиотеке aws-sdk-go](https://docs.aws.amazon.com/sdk-for-go/api/service/s3/#S3.ListObjectsV2) дано подробное описание команды ListObjectsV2.

## Удаление объекта

Чтобы удалить объекты в бакете:

```go
package main

import (
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"log"
	"strings"
)

const (
	vkCloudHotboxEndpoint = "https://hb.bizmrg.com"
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

	// Удаление объекта из бакета
    bucket := "gobucket"
	key := "test_string.txt"

	if _, err := svc.DeleteObject(&s3.DeleteObjectInput{
		Bucket: aws.String(bucket),
		Key:    aws.String(key),
	}); err != nil {
		log.Fatalf("Unable to delete object %q from bucket %q, %v\n", key, bucket, err)
	} else {
		log.Printf("Object %q deleted from bucket %q\n", key, bucket)
	}

    // Удаление множества объектов
	if _, err := svc.DeleteObjects(&s3.DeleteObjectsInput{
		Bucket: aws.String(bucket),
		Delete: &s3.Delete{
			Objects: []*s3.ObjectIdentifier{
				{
					Key: aws.String("test_string1.txt"),
				},
				{
					Key: aws.String("test_string2.txt"),
				},
			},
		},
	}); err != nil {
		log.Fatalf("Unable to delete objects from bucket %q, %v\n", bucket, err)
	} else {
		log.Printf("Objects deleted from bucket %q\n", bucket)
	}
}
```

Подробное описание команд дано в официальной документации библиотеки aws-sdk-go по методам [DeleteObject](https://docs.aws.amazon.com/sdk-for-go/api/service/s3/#S3.DeleteObject) и [DeleteObjects](https://docs.aws.amazon.com/sdk-for-go/api/service/s3/#S3.DeleteObjects).
