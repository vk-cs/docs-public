Перед началом работы рекомендуется ознакомиться с [принципами взаимодействия агентов и платформы](/ru/additionals/iot/agents/protocol) — ключевых компонентов инфраструктуры IoT VK Cloud.

## Установка SDK

Установка проекта SDK происходит путем импорта [репозитория IoT Go Agent SDK](https://github.com/vk-cs/iot-go-agent-sdk) и его зависимостей, а затем установки пакета с помощью стандартного установщика модулей [go mod](https://go.dev/ref/mod#go-install).

### Минимальные требования

- git ([ссылка на страницу скачивания](https://git-scm.com/downloads)),
- Go 1.16+ ([инструкция по установке](https://go.dev/doc/install)),
- CMake 3.1+ ([ссылка на перечень выпусков](https://cmake.org/download/)).

### Список зависимостей репозитория

- github.com/go-openapi/errors v0.20.1
- github.com/go-openapi/runtime v0.21.0
- github.com/go-openapi/strfmt v0.21.1
- github.com/go-openapi/swag v0.19.15
- github.com/go-openapi/validate v0.20.3

### Процесс установки

Создайте рабочую директорию для хранения файлов SDK:

```bash
mkdir vkcs-iot-go-agent-sdk
cd vkcs-iot-go-agent-sdk
```

Импортируйте репозиторий IoT Go Agent SDK:

```bash
git clone https://github.com/vk-cs/iot-go-agent-sdk.git
```

Установите SDK с помощью стандартного установщика модулей go mod:

```bash
go install ./iot-go-agent-sdk
```

## Примеры использования

Перед началом разработки с помощью VK Cloud IoT SDK рекомендуется ознакомиться с типами данных, используемых платформой VK Cloud IoT, а также с методами, поддерживаемыми внешним публичным [API платформы](/additionals/iot/api/public-api).

### Обращение к компонентам платформы с помощью методов SDK

Примером использования VK Cloud IoT Go Agent SDK является имплементация обращения устройства к компонентам Агент и Платформа с целью обновления данных о статусе устройства:

```bash
package main

import (
	"context"

	httptransport "github.com/go-openapi/runtime/client"
	
	sdk "github.com/vk-cs/iot-go-agent-sdk"
	"github.com/vk-cs/iot-go-agent-sdk/gen/swagger/http_client/client/agents"
	"github.com/vk-cs/iot-go-agent-sdk/gen/swagger/http_client/client/events"
	"github.com/vk-cs/iot-go-agent-sdk/gen/swagger/http_client/models"
)

func main() {
	cli := sdk.NewHTTPClient()

	// Получение файла конфигурации Агента
	resp, _ := cli.Agents.GetAgentConfig(&agents.GetAgentConfigParams{
		// get latest version
		Version: nil,
		Context: context.Background(),
	}, httptransport.BasicAuth("login", "password"))
	cfg := resp.Payload

	// Получение тэга статуса из файла конфигурации
	statusTag, _ := sdk.FindTagByPath(cfg.Agent.Tag, sdk.StatusTagPath)
	
	// Или использование враппера для быстрого доступа
	tree := sdk.NewTagTree(cfg.Agent.Tag)
	statusTagNode, _ := tree.GetStatusTag()
	statusTag = statusTagNode.Tag
	cfgVersion, _ := tree.GetConfigVersionTag()
	cfgUpdatedAt, _ := tree.ConfigUpdatedAtTagPath()
	
	// Отправка Платформе нового статуса Агента и версии файла конфигурации
	now := sdk.Now()
	cli.Events.AddEvent(events.AddEventParams{
		Context: context.Background(),
		Body: &models.AddEvent{
			Tags: []*models.TagValueObject{
				// Обновление статуса Агента
				{
					ID: statusTag.ID,
					Timestamp: &now,
					Value: sdk.Online,
				},
				// Обновление версии файла конфигурацции Агента
				{
					ID: cfgVersion.Tag.ID,
					Timestamp: &now,
					Value: cfg.Version,
				},
				{
					ID: cfgUpdatedAt.Tag.ID,
					Timestamp: &now,
					Value: &now,
				},
			},
		},
	}, httptransport.BasicAuth("login", "password"))
	
	// Обновление тэга статуса устройства
	deviceStatusTag, _ := sdk.FindTagByPath(cfg.Agent.Devices[0].Tag, sdk.StatusTagPath)

	cli.Events.AddEvent(events.AddEventParams{
		Context: context.Background(),
		Body: &models.AddEvent{
			Tags: []*models.TagValueObject{
				{
					ID: deviceStatusTag.ID,
					Timestamp: &now,
					Value: sdk.Online,
				},				
			},
		},
	}, httptransport.BasicAuth("login", "password"))	
}
```

### Эмулятор виртуального устройства IoT

В качестве отладочного стенда можно использовать эмулятор устройства IoT, запрограммированный отправлять определенные данные на платформу. Подробнее о настройке устройства через личный кабинет пользователя платформы VK Cloud IoT можно узнать из [раздела IoT на портале документации](/additionals/iot/about-iot).

Вы можете импортировать исходный код эмулятора из [репозитория VK Cloud IoT Emulators](https://github.com/vk-cs/iot-emulators), или [скачать](https://github.com/vk-cs/iot-emulators/releases) собранный бинарный файл для вашей операционной системы.

## Сборка http клиента

Вы можете собрать http клиент по Swagger спецификации из репозитория VK Cloud IoT Go Agent SDK, выполнив следующую команду из корневой директории репозитория:

```bash
make generate
```
