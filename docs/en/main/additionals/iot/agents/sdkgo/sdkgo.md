This article is about VK CS IoT SDK for Go. It is intended for developers who want to develop their own application for the VK Cloud Solutions IoT platform and have a basic understanding of creating projects in the Go language environment.

Before starting work, it is recommended to familiarize yourself with the [principles of interaction between agents and the platform](https://gitlab.corp.mail.ru/infra/coiiot/coiiot-documentation/-/blob/master/user_docs/docs/agent/protocol.md ) — key components of the VK Cloud Solutions IoT infrastructure.

## Installing the SDK

The SDK project is installed by importing the [IoT Go Agent SDK repository](https://github.com/vk-cs/iot-go-agent-sdk ) and its dependencies, and then installing the package using the standard module installer [go mod](https://go.dev/ref/mod#go-install ).

### Minimum requirements

- git ([link to download page](https://git-scm.com/downloads ))
- Go 1.16+ ([installation instructions](https://go.dev/doc/install ))
- CMake 3.1+ ([link to the list of releases](https://cmake.org/download /))

### List of repository dependencies

- github.com/go-openapi/errors v0.20.1
- github.com/go-openapi/runtime v0.21.0
- github.com/go-openapi/strfmt v0.21.1
- github.com/go-openapi/swag v0.19.15
- github.com/go-openapi/validate v0.20.3

### Installation process

Create a working directory to store SDK files:

```bash
mkdir vkcs-iot-go-agent-sdk
cd vkcs-iot-go-agent-sdk
```

Import the IoT Go Agent SDK repository:

```bash
git clone https://github.com/vk-cs/iot-go-agent-sdk.git
```

Install the SDK using the standard go mod module installer:

```bash
go install ./iot-go-agent-sdk
```

## Usage Examples

Before starting development using the VK CS IoT SDK, it is recommended to familiarize yourself with [the types of data used by the VK CS platform IoT](https://gitlab.corp.mail.ru/infra/coiiot/coiiot-documentation/-/tree/master/user_docs/docs/data) , as well as with [methods supported by an external public API of the platform](https://gitlab.corp.mail.ru/infra/coiiot/coiiot-documentation/-/blob/master/user_docs/docs/public_api/index.md).

### Accessing platform components using SDK methods

An example of using the VK CS IoT Go Agent SDK is the implementation of device access to the Agent and Platform components in order to update device status data:

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

	// Getting the resp Agent configuration file
, _ := cli.Agents.GetAgentConfig(&agents.GetAgentConfigParams{
		// get latest version
		Version: nil,
		Context: context.Background(),
	}, httptransport.BasicAuth("login", "password"))
	cfg := resp.Payload

	// Getting the status tag from
the statusTag configuration file, _ := sdk.FindTagByPath(cfg.Agent.Tag, sdk.StatusTagPath)

// Or using a wrapper for quick access
	tree := sdk.NewTagTree(cfg.Agent.Tag)
	statusTagNode, _ := tree.GetStatusTag()
	statusTag = statusTagNode.Tag
	cfgVersion, _ := tree.GetConfigVersionTag()
	cfgUpdatedAt, _ := tree.ConfigUpdatedAtTagPath()

// Sending the new Agent status and configuration file version to the Platform
	now := sdk.Now()
	cli.Events.AddEvent(events.AddEventParams{
		Context: context.Background(),
		Body: &models.AddEvent{
			Tags: []*models.TagValueObject{
				// Agent Status Update
				{
					ID: statusTag.ID,
					Timestamp: &now,
					Value: sdk.Online,
				},
				// Updating the version of the Agent configuration file
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

// Updating the device status tag
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

### Virtual IoT Device Emulator

As a debugging stand, you can use an IoT device emulator programmed to send certain data to the Platform. For more information about configuring the device through the VK CS IoT platform user's personal account, see [the IoT section on the VK CS documentation portal](https://mcs.mail.ru/docs/ru/additionals/iot/about-iot ).

You can import the emulator source code from [VK CS IoT Emulators repository](https://github.com/vk-cs/iot-emulators ), or [download the compiled binary file for your operating system](https://github.com/vk-cs/iot-emulators/releases ).

## Building an http client from the VK CS IoT Go Agent SDK repository

You can build an http client according to the Swagger specification by running the following command from the root directory of the repository:

```bash
make generate
```
