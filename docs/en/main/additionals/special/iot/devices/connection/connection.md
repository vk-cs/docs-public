Devices are a set of data sources (Event) and states (stat).
Devices can be connected to the platform in three ways:

1. Directly.
2. Through the agent.
3. Through a third — party provider.

### Device connection diagram

![](./assets/diagram-png)

#### Connecting directly

A device is directly connected to the platform if the device itself can communicate directly with the platform.
Single device connected agent with `protocol="embedded"` driver. For example, a *RaspberryPi* based device with a software agent on board.

#### Connecting through an agent

The device is connected via a software agent if the device itself cannot communicate with the platform directly, but a platform software agent can be installed next to the device. For example, a device can only communicate using a protocol not supported by the platform, for example, *ModBus*.

#### Connecting through a third party provider

The device is connected via a third-party provider if the device cannot communicate directly with the platform and the platform software agent cannot be installed next to the device.
