Этот модуль содержит следующие функции и классы ошибок для работы с `Digital Twins`:
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
  Изменение состояния
  """

def get_agent_by_id(agent_id: int) -> Agent:
  """
  Получить агента по его ID
  """


def get_device_by_id(device_id: int) -> Device:
  """
  Получить устройство по его ID
  """
```
Классы `Agent` и `Device` содержат много информации о соответствующем агенте/устройстве:
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

Интерфейс класса `Update` содержит только методы `change_state` и `execute`:
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

Пример изменения состояния тега и получения информации о его состоянии:
```python
from coiiot_sdk import digital_twins as dt, context, user_logs

logger = user_logs.get_logger()
ctx = context.current()

# полагаем, тэг имеет целочисленный тип
dt.change_state(ctx.tag, 7777).execute()
logger.info(ctx.tag.state.value) # 7777
```

В этом примере используется свойство `state` тега. Это не статичное свойство. Если поменять состояние тега `tag` на новое, то при следующем обращении оно уже будет доступно в `tag.state`.
