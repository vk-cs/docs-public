## Описание

Модуль `variables` работает с переменными в рамках текущего тенанта `(client_id)`.

Он определяет следующие функции и классы ошибок:
```python
class BadParamsError(Exception):
    pass

class VariableNotFoundError(Exception):
    pass

class UnknownError(Exception):
    pass


def get(name: str) -> Variable:
    pass

def create(name: str, value: Any, value_type: Types, timestamp: datetime, ttl: int) -> Variable:
    pass

def set(name: str, value: Any, value_type: Types, create: bool, force: bool, timestamp: datetime, ttl: int) -> Variable:
    pass

def increment(name: str, delta: Any, value_type: Types, ttl=None, default_value=0, create=False) -> Variable:
    pass

def decrement(name: str, delta: Any, value_type: Types, ttl=None, default_value=0, create=False) -> Variable:
    pass

def delete(name: str):
    pass

def exists(name: str) -> bool:
    pass
```

Доступ к переменной в рамках тенанта осуществляется по уникальному имени, которое может содержать только английские буквы и цифры, а также символы *_* и *-*.
```python
class Variable:
	name:  str
	type:  str
	value: Any
    timestamp:  int
    expires_at: int

    def set(self, value: Any, timestamp: datetime, ttl=None, create=False, force=False) -> 'Variable':
        pass

    def increment(self, delta: Any, ttl=None, default_value=0, create=False) -> 'Variable':
        pass

    def decrement(self, delta: Any, ttl=None, default_value=0, create=False) -> 'Variable':
        pass

    def delete(self):
        pass

    def exists(self) -> bool:
            pass
```

Переменная содержит следующие поля:

- *name* — уникальное имя;
- *type* — тип значения переменной;
- *value* — значение переменной (не может быть null);
- *timestamp* — временная метка последнего изменения;
- *expires_at* — временная метка до которой будет существовать переменная, по умолчанию переменная будет жить 30 дней с момента последнего обновления.

Переменная может иметь следующие типы значений:

- *integer*;
- *float*;
- *string*;
- *boolean*;
- *timestamp* — временная отметка с точностью до микросекунд;
- *location* — объект с ключами `lat` и `lng`.

Типы значений:
```python
class Types(str, Enum):
    Integer = "integer"
    Float = "float"
    Timestamp = "timestamp"
    String = "string"
    Boolean = "boolean"
    Location = "location"

class Location(NamedTuple):
    lat: float
    lng: float
```

Значение переменной может содержать только значение указанного типа.

## Создание

Переменная может быть создана методом `create` модуля `variables`:
```python
def create(name: str, value: Any, value_type: Types, timestamp: datetime, ttl: int) -> 'Variable':
    pass


ttl - время жизни переменной в хранилище в микросекундах
Пример создания переменных:

from datetime import datetime
from coiiot_sdk import variables, user_logs

ts=datetime.now()

logger = user_logs.get_logger()

# ttl=3600000000 - время жизни переменной 1 час
create_int = variables.create(name='create_int', value=123, value_type=variables.Types.Integer, timestamp=ts, ttl=3600000000)
logger.info(f'{create_int.value}')

create_float = variables.create(name='create_float', value=123.45, value_type=variables.Types.Float, timestamp=ts, ttl=3600000000)
logger.info(f'{create_float.value}')

create_bool = variables.create(name='create_bool', value=True, value_type=variables.Types.Boolean, timestamp=ts, ttl=3600000000)
logger.info(f'{create_bool.value}')

create_string = variables.create(name='create_string', value="true", value_type=variables.Types.String, timestamp=ts, ttl=3600000000)
logger.info(f'{create_string.value}')

create_location = variables.create(name='create_location', value=variables.Location(48.89364, 2.33739), value_type=variables.Types.Location, timestamp=ts, ttl=3600000000)
logger.info(f'{create_location.value}')
logger.info(f'{create_location.value["lat"]} {create_location.value["lng"]}')

create_timestamp = variables.create(name='create_timestamp', value=1234567890000000, value_type=variables.Types.Timestamp, timestamp=ts, ttl=3600000000)
logger.info(f'{create_timestamp.value}')
```

Возвращается новое значение переменной.

## Получение

Получить переменную из хранилища можно методом `get` модуля `variables`:
```python
def get(name: str) -> Variable:
    pass
```

Пример:
```python
from datetime import datetime
from coiiot_sdk import variables, user_logs

ts=datetime.now()

logger = user_logs.get_logger()

create_int = variables.create(name='create_int', value=123, value_type=variables.Types.Integer, timestamp=ts, ttl=3600000000)

v1 = variables.get("create_int")
if v1 is not None:
    logger.info(f'{v1.name}')
    logger.info(f'{v1.type}')
    logger.info(f'{v1.value}')
    logger.info(f'{v1.timestamp}')
    logger.info(f'{v1.expires_at}')
```

## Установка значений

Модифицировать переменную можно методом `set` модуля `variables`:
```python
def set(name: str, value: Any, value_type: Types, create: bool, force: bool, timestamp: datetime, ttl: int) -> 'Variable':
    pass
```

Также доступна модификация переменной через метод `set` объекта переменной `Variable`:
```python
class Variable:
    ...
    def set(self, value: Any, timestamp: datetime, ttl=None, create=False, force=False) -> 'Variable':
        pass
```

В обоих вариантах возвращается новое значение переменной.

При модификации значения переменной должна передаваться временная отметка операции. Эта отметка будет использоваться для разрешения конфликтных ситуаций при конкурентном обновлении значения. В общем случае если операция содержит более старую метку, чем текущее значение переменной, то модификации переменной не произойдет.

Доступные флаги:

- `force` - если `true`, установить новое значение переменной игнорируя временную метку текущего значения;
- `create` - если `true`, атомарно создать переменную (если не существует);
- `value_type` - если переменная создается, то этим флагом можно задать тип значения для этой переменной.

Пример:
```python
from datetime import datetime
from coiiot_sdk import variables, user_logs

logger = user_logs.get_logger()

create_int_2 = variables.create(name='create_int_2', value=12345, value_type=variables.Types.Integer)
logger.info(f'{create_int_2.value}')

set_int_2 = variables.set(name='create_int_2', value=1234567, value_type=variables.Types.Integer)
logger.info(f'{set_int_2.value}')

create_int = create_int.set(2, timestamp=datetime.now())
logger.info(f'{create_int.value}')
 
v2 = variables.set(name="my-cool-var2", value=21.3, force=True, create=True, value_type=variables.Types.Float)
logger.info(f'{v2.value}')
```

## Инкрементация значений

Инкрементировать значение переменной можно методом `increment` модуля `variables`:
```python
def increment(name: str, delta: Any, value_type: Types, ttl=None, default_value=0, create=False) -> 'Variable':
    pass
```

Также доступна инкрементация значения переменной через метод `increment` объекта переменной `Variable`:
```python
class Variable:
    ...
    def increment(self, delta: Any, ttl=None, default_value=0, create=False) -> 'Variable':
            pass
```

В обоих вариантах возвращается новое значение переменной.

`increment` — атомарная операция value += delta над числовыми типами данных (integer, float, timestamp), временная метка не передается.

Доступные флаги:

- `create` - если `true`, создать переменную (если не существует);
- `value_type` - если переменная создается, то этим флагом можно задать тип значения для этой переменной;
- `default_value` - если переменная создается, то этим флагом можно задать начальное значение переменной перед применением операции (по умолчанию 0).

Пример:
```python
from datetime import datetime
from coiiot_sdk import variables, user_logs

logger = user_logs.get_logger()

v2 = variables.set(name="my-cool-var2", value=21.3, force=True, create=True, value_type=variables.Types.Float)
logger.info(f'{v2.value}')

v2 = v2.increment(100)
logger.info(f'{v2.value}')

v3 = variables.increment(name="my-cool-var3", delta=7.01, default_value=14.02, create=True, value_type=variables.Types.Float)
logger.info(f'{v3.value}')
```

## Декрементация значений

Декрементировать значение переменной можно методом `decrement` модуля `variables`:
```python
def decrement(name: str, delta: Any, value_type: Types, ttl=None, default_value=0, create=False) -> 'Variable':
    pass
```

Также доступна декрементация значения переменной через метод `decrement` объекта переменной `Variable`:
```python
class Variable:
    ...
    def decrement(self, delta: Any, ttl=None, default_value=0, create=False) -> 'Variable':
            pass
```

В обоих вариантах возвращается новое значение переменной.

`decrement` - атомарная операция value -= delta над числовыми типами данных (integer, float, timestamp), временная метка не передается.

Доступные флаги:

- `create` - если `true`, то создать переменную (если не существует);
- `value_type` - если переменная создается, то этим флагом можно задать тип значения для этой переменной;
- `default_value` - если переменная создается, то этим флагом можно задать начальное значение переменной перед применением операции (по умолчанию 0).

Пример:
```python
from datetime import datetime
from coiiot_sdk import variables, user_logs

logger = user_logs.get_logger()

v2 = variables.set(name="my-cool-var2", value=21.3, force=True, create=True, value_type=variables.Types.Float)
logger.info(f'{v2.value}')

v2 = v2.decrement(50)
logger.info(f'{v2.value}')

v3 = variables.decrement(name="my-cool-var3", delta=8.95, default_value=21.3, create=True, value_type=variables.Types.Float)
logger.info(f'{v3.value}')
```

## Удаление

Проверить удаление переменной из хранилища можно с помощью метода:
```python
def delete(name: str):
    pass
```

Также доступно удаление переменной через метод `delete` объекта переменной `Variable`:
```python
class Variable:
    ...
    def delete(self):
        pass
```

Пример:
```python
from datetime import datetime
from coiiot_sdk import variables, user_logs

logger = user_logs.get_logger()

v2 = variables.set(name="my-cool-var2", value=123.45, force=True, create=True, value_type=variables.Types.Float)
logger.info(f'{v2.value}')

v3 = variables.decrement(name="my-cool-var3", delta=8.95, default_value=21.3, create=True, value_type=variables.Types.Float)
logger.info(f'{v3.value}')

if v2.exists():
    v2.delete()

exists = v2.exists()
logger.info(f'{exists}')

if variables.exists(name="my-cool-var3"):
    variables.delete(name="my-cool-var3")
```

## Проверка

Проверить наличие переменной в хранилище можно с помощью метода:
```python
def exists(name: str) -> bool:
    pass
```

Также доступна проверка наличия переменной через метод `exists` объекта переменной `Variable`:
```python
class Variable:
    ...
    def exists(self) -> bool:
        pass
```

В обоих вариантах возвращается значение типа `bool`.

Пример:
```python
from datetime import datetime
from coiiot_sdk import variables, user_logs

logger = user_logs.get_logger()

v2 = variables.set(name="my-cool-var2", value=123.45, force=True, create=True, value_type=variables.Types.Float)
logger.info(f'{v2.value}')

v3 = variables.decrement(name="my-cool-var3", delta=8.95, default_value=21.3, create=True, value_type=variables.Types.Float)
logger.info(f'{v3.value}')

if v2.exists():
    v2.delete()

exists = v2.exists()
logger.info(f'{exists}')

if variables.exists(name="my-cool-var3"):
    variables.delete(name="my-cool-var3")

exists = variables.exists(name="my-cool-var3")
logger.info(f'{exists}')
```
