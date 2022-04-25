The communication protocol between the agent and the platform consists of the following set of actions:

- receiving the configuration by the agent from the platform;
- sending data from devices to the platform by the agent;
- execution of commands received by the agent from the platform;
- sending logs to the platform by the agent.

## Get configuration

The agent's configuration has a unique version that increases monotonically when the agent's metainformation or one of the devices connected to it changes.

The first time the agent is run, it automatically retrieves the latest configuration from the Platform Gateway. Later, the agent configuration update is activated using the command.

Command example:
```bash
agent_tag/$state/$config/$version = new_version
```

After receiving and applying the configuration, the agent reports the current configuration version and update time to the platform in special system subtags like `state $state/$config/$version $state/$config/$updated_at`.

Based on the difference between the version of the agent configuration in the metainformation and the version reported by the agent, the platform and the user can understand whether the agent has the latest configuration or needs to send an update command.

## Sending data

The agent sends data to the platform:

1. Mapping of device readings to corresponding tags like `event` and `state`.
2. Your status, as well as the status of all connected devices in the `$state/$status` tags.

If the connection with the platform is lost, the agent buffers the received data for sending to the platform after the connection is restored.

## Execute commands

The agent must support receiving commands from the platform.

The command can be addressed to:

- agent;
- the device connected to the agent.

The destination of the command is calculated from the tags passed in the command, in whose tag subtree the passed tags are located. One command can only be addressed to one agent or device.

The command can contain an arbitrary set of new values ​​for any tags of the `state` type with a field
`properties.readonly = false` from the target agent/device tag subtree.

There are two types of team statuses:

1. Platform:

- `new` - The team has just been created in Digital Twins.
- `sending` - the command was taken into work in Peons.
- `sent` - the command was sent to the agent in the HTTP Gateway or MQTT Gateway.
- `failed` — Sending the command failed for some reason. Details in the `reason` field.

2. Statuses that the agent is obliged to report:

- `received` — the command was received by the agent.
- `done` - command completed successfully.
- `skipped` — the command was skipped by the agent for some reason. For example, when receiving several commands to update the configuration at once, the agent can execute only the last command, and transfer the rest to `skipped` by filling in the `reason` field).
- `failed` — the agent failed to execute the command, detailed reasons must be specified in the reason field.

Based on the results of the command execution, the agent must report the status of the command to the platform via a special API, sending the status of the command `done` or `failed` with a description of the error in the `reason` field.

This protocol describes only a transport for transferring commands from the platform to the agent, the implementation of the execution of these commands remains at the discretion of the agent.

## Send logs

The protocol supports sending arbitrary logs by the agent as an arbitrary string. At the same time, the platform can limit the number of received logs from the agent per unit of time.

The logs may contain information about the operation of:

- agent;
- connected devices.

The received logs are available for viewing on the "Logging" page in the platform's administrative console.

## Data sheet

The agent protocol can work both over HTTP(S) and over HTTP(S) + MQTT.

### Credentials

The agent login is generated according to the pattern { client_id }_{ agent_id }.
The password is taken from the agent's token field.

### HTTP(S)

The HTTP API is located [here](https://api-iot.mcs.mail.ru).

To authorize an agent in the HTTP API, Basic authentication is used.
When connecting to the platform only via the HTTP(S) protocol, the platform cannot directly send commands to the agent, so the agent must periodically poll the platform API to receive commands for execution.

This description may be incomplete/inaccurate, to get the current API specification, you need to get the corresponding [swagger specification](https://api-iot.mcs.mail.ru/v1/swagger.json).

- `GET /v1/agents/config` - endpoint for getting the configuration, called with the version=latest parameter during the agent bootstrap to get the initial configuration, as well as with the version specified in the command to update the configuration by
the incoming team.
- `POST /v1/events` - endopoint for sending data to the platform, accepts an array of values ​​like `tag_id=value`.
- `POST /v1/logs` - endpoint for sending logs to the platform, accepts an array of values ​​like
`timestamp=timestam_with_microsends`, `msg=string`.
- `GET /v1/commands` - endpoint for receiving commands for execution. This endpoint must be called periodically to receive new commands for execution. This endopoint will always return a list of all active commands.
- `PATCH /v1/agents/{ agent_id }/commands/{command_id}/status` - endpoint for transferring the taken agent command to the final status, accepts an object like `status=received/done/failed/skipped, reason=optional_string_mesage_for_failed_or_skipped_status`.
- `PATCH /v1/devices/{ device_id }/commands/{command_id}/status` - endpoint for translating the received device command to the final status, accepts an object like `status=received/done/failed/skipped, reason=optional_string_mesage_for_failed_or_skipped_status`.
- `GET /v1/devices/{device_id}/config/{version}` - endpoint for getting the configuration that needs to be physically applied to the connected device as part of the command execution (for more details, see the "Commands" section).

### HTTP(S) + MQTT

When the agent is connected to the platform via HTTP(S) + MQTT protocols, the platform can directly communicate with the agent and send commands to it without the need to constantly poll the http api.

MQTT API see [here](https://mqtt-api-iot.mcs.mail.ru).

### HTTP(S)

The MQTT-based protocol lacks support for the following operations:

- `GET /v1/agents/config`
- `GET /v1/devices/{device_id}/config/{version}`

### MQTT

#### Sending events

The agent should send data to the `iot/event/fmt/json` topic with QOS=1 in the following format:
```json
  {
  "tags": [
    {
      "id": ..., // id of the end tag that represents the sensor
      "value": ..., // value
      "timestamp": ... // timestamp in microseconds
    },
    ...
  ]
}
```

For example, to send a message for a tag with id=10 and value '100', you need to post
message:
```json
  {
    "tags": [
      {
        "id": 10,
        value: 100
        timestamp: 1
      }
    ]
  }
```

#### Commands

To receive commands from the platform, the agent must be subscribed to a topic like `iot/cmd/agent/+/fmt/json`, instead of a single-level `wildcard`. And still there should be a unique id of the client. The command message is published with the `retain=1` flag, which ensures that the client receives the last command message. For example, to subscribe to commands for an agent with id=1, you need to subscribe to the topic `iot/cmd/agent/1/fmt/json`.

The message always contains all active commands for the agent.

Commands have the following format:
```json
  {
      "command": {
        "id": "...", // command id
        "tags": [
          {
            "id": ..., // tag to change
            "value": ... // new tag value
          },
          ...
        ],
        "timestamp": ... // timestamp in microseconds
      }, // active command for agent if any
      "devices": [
        {
          "device_id": 1,
          "command": {
             "id": "...", // command id
             "tags": [
               {
                 "id": ..., // tag to change
                 "value": ... // new tag value
               },
               ...
             ],
             "timestamp": ... // timestamp in microseconds
          }
        }
      ] // active commands for devices if any
  }
```

The agent must report the status of its command in a separate topic like `iot/cmd/agent/+/status/fmt/json` with QOS=1 messages like:
```json
  {
    "id": "...", // command id
    "status": "...", // skipped | received | failed | done
    "reason": "...", // optional field for failed status
    "timestamp": ... // timestamp in microseconds
  }


The agent should report command statuses for devices in separate topics like `iot/cmd/device/+/status/fmt/json` with QOS=1 messages like:
``` json
  {
    "id": "...", // command id
    "status": "...", // skipped | received | failed | done
    "reason": "...", // optional field for failed status
    "timestamp": ... // timestamp in microseconds
  }
```

Supported command statuses:

- received — the command was received by the agent/device.
- failed — the agent/device failed to apply the command, additionally, the reason must be specified in the `reason` field.
- done - The agent/device successfully applied the command.

#### Logging

To send arbitrary logs to the platform, the agent should use the topic `iot/log/fmt/json` with QOS=1 in the format:
```json
[
  {
    "msg": "...",
    "timestamp": ... // timestamp in microseconds
  }
]
```

## General commands

### Update agent configuration

This command is mandatory for implementation by all agents. It always contains a set of values ​​for the following agent tags:

- `$state/$config/$version`

Upon receiving this command, the agent must obtain the configuration of the version specified in the command from the corresponding HTTP API endpoint.

Upon successful execution of the command, the agent must send new values ​​to the platform for the following agent tags:

- `$state/$config/$version`
- `$state/$config/$updated_at`

### Updating the configuration on the device

This command is optional for agent implementation and can only be applied to a device that supports agent configuration.

An indication that the device can be configured by the agent is the `properties.readonly` flag set to `false` for the `$state/$config/$version` device tag.

The command always contains a set of values ​​for the following device tags:

- `$state/$config/$version`

Upon receiving this command, the agent must obtain the configuration for the device of the version specified in the command from the corresponding HTTP API endpoint.

The implementation of the device configuration update is completely at the mercy of the agent.

Upon successful execution of the command, the agent must send new values ​​to the platform for the following device tags:

- `$state/$config/$version`
- `$state/$config/$updated_at`

### Firmware update on the agent

This command is optional for an agent and can only be applied to an agent that supports automatic firmware updates.

An indication that the agent can update its firmware is the properties.readonly flag set to `false` for the `$state/$firmware/$source` agent tag.

This command always contains a set of values ​​for the following agent tags:

`$state/$firmware/$source` - source, for example, http url for downloading new firmware.

The command may also contain the following optional tags:

- `$state/$firmware/$vendor`
- `$state/$firmware/$version`

The implementation of the firmware update is completely at the mercy of the agent.

Upon successful execution of the command, the agent must send new values ​​to the platform for the following agent tags:

- `$state/$firmware/$source`
- `$state/$firmware/$updated_at`

The agent can also fill in the following tags depending on the content of the command/implementation features:

- `$state/$firmware/$vendor`
- `$state/$firmware/$version`

### Firmware update on the device

This command is optional for agent implementation and can only be applied to a device that supports automatic firmware updates.

An indication that the agent can update the device firmware is the `properties.readonly` flag set to `false` for the device tag `$state/$firmware/$source`.

This command always contains a set of values ​​for the following device tags:

- `$state/$firmware/$source` - source, for example, http url to download new firmware.

The command may also contain the following optional tags:

- `$state/$firmware/$vendor`
- `$state/$firmware/$version`

The implementation of the firmware update on the device is completely at the mercy of the agent.
Upon successful execution of the command, the agent must send new values ​​to the platform for the following device tags:

- `$state/$firmware/$source`
- `$state/$firmware/$updated_at`

The agent can also fill in the following device tags depending on the content of the command/implementation features:

- `$state/$firmware/$vendor`
- `$state/$firmware/$version`
