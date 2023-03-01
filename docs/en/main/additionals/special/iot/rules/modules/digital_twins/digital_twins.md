This module contains the following functions and classes of errors to work with `Digital Twins`:
```python
class NoDeviceFoundError(Exception):
    pass

class NoAgentFoundError(Exception):
    pass

class BadParamsError(Exception):
    pass

class UnknownError(Exception):
    pass


def change_state(tag: Tag, new_value: Any) -> Update:
  """
  Change status
  """

def get_agent_by_id(agent_id: int) -> Agent:
  """
  Get an agent for his ID
  """


def get_device_by_id(device_id: int) -> Device:
  """
  Get a device by it ID
  """
```
The `Agent` and `Device` classes contain a lot of information about the respective agent/device:
```python
class Driver(NamedTuple):
    id: int
    name: str

class DeviceAgentType(NamedTuple):
    id: int
    name: str
    label: str
    drivers: List[Driver]

class DeviceAgent(NamedTuple):
    id: int
    name: str
    label: str
    type: DeviceAgentType

class DeviceType(NamedTuple):
    id: int
    name: str
    label: str
    driver: Driver

class Device:
    id: int
    name: str
    label: str
    type: DeviceType
    tag: TagT
    first_seen_at: int
    last_seen_at: int
    agent: Optional[DeviceAgent]

class AgentType:
    id: int
    name: str
    label: str
    drivers: List[Driver]

class AgentDevice:
    id: int
    name: str
    label: str
    type: DeviceType

class Agent:
    id: int
    name: str
    label: str
    first_seen_at: int
    last_seen_at: int
    type: AgentType
    tag: TagT
    devices: List[AgentDevice]
```

The `Update` class interface contains only the `change_state` and `execute` methods:
```python
class State(TypedDict):
    received_at: int
    state_changed: bool
    tag_id: int
    timestamp: int
    value: Any

class ChangedStates(TypedDict):
    states: List[State]

class Update:

    def change_state(self, tag: Tag, new_value: Any) -> 'Update':
		  pass

    def execute(self) -> ChangedStates:
		  pass
```

An example of a change in the state of the tag and obtain information about its condition:
```python
from coiiot_sdk import digital_twins as dt, context, user_logs

logger = user_logs.get_logger()
ctx = context.current()

# We believe, tag has an integer type
dt.change_state(ctx.tag, 7777).execute()
logger.info(ctx.tag.state.value) # 7777
```

This example uses the `state` property of the tag. This is not a static property. If you change the state of the `tag` tag to a new one, then the next time it is accessed, it will already be available in `tag.state`.
