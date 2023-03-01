## Description

Module `variables` Works with variables as part of the current tanta `(client_id)`.

It defines the following functions and classes of errors:
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

Access to the variable within the Tandant is carried out by a unique name that can contain only English letters and numbers as well as a symbol.ы *_* and *-*.
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

The variable contains the following fields:

- *name* — Unique name
- *type* — Type of variable value
- *value* — Variable value (can not be null)
- *timestamp* — Time label of the last change
- *expires_at* —The timestamp to which the variable will exist, the default variable will live 30 days from the moment of the last update

The variable can have the following types of values:

- *integer*
- *float*
- *string*
- *boolean*
- *timestamp* — Time mark with accuracy to microseconds
- *location* — Object with keys `lat` and `lng`

Types of values:
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

The value of the variable can contain only the value of the specified type.

## Creation

Variable can be created by the method `create` module `variables`:
```python
def create(name: str, value: Any, value_type: Types, timestamp: datetime, ttl: int) -> 'Variable':
    pass


ttl - Lifetime of the variable in the repository in microseconds
An example of creating variables:

from datetime import datetime
from coiiot_sdk import variables, user_logs

ts=datetime.now()

logger = user_logs.get_logger()

# ttl=3600000000 - Lifetime variable 1 hour
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

Returns a new value of the variable.

## Receipt

Get a variable from the repository can be using `get` module `variables`:
```python
def get(name: str) -> Variable:
    pass
```

Example:
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

## Setting values

Modify the variable can be method `set` module `variables`:
```python
def set(name: str, value: Any, value_type: Types, create: bool, force: bool, timestamp: datetime, ttl: int) -> 'Variable':
    pass
```

Also available variable via methodд `set` object of variable`Variable`:
```python
class Variable:
    ...
    def set(self, value: Any, timestamp: datetime, ttl=None, create=False, force=False) -> 'Variable':
        pass
```

In both embodiments, the new value variable is returned.

When modifying the value of the variable should be transmitted a time stamp of the operation.This mark will be used to resolve conflict situations with competitive value update.In general, if the operation contains a more old label than the current value of the variable, the modification of the variable will not happen.

Available flags:

- `force` - if `true`, set the new value of the variable ignoring the time label of the current value
- `create` - if `true`, atomarically create a variable (if there is no)
- `value_type` - If the variable is created, then this flag can be set the value of the value for this variable

Example:
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

## Incrementation of values

Increment the value of the variable can be using`increment` module `variables`:
```python
def increment(name: str, delta: Any, value_type: Types, ttl=None, default_value=0, create=False) -> 'Variable':
    pass
```

Also available incremental variable value through the method `increment` object of variable`Variable`:
```python
class Variable:
    ...
    def increment(self, delta: Any, ttl=None, default_value=0, create=False) -> 'Variable':
            pass
```

In both embodiments, the new value variable is returned.

`increment` — atomic operation Value + = Delta over numerical data types (Integer, Float, TimeStamp), the time label is not transmitted.

Available flags:

- `create` - if `true`, Create a variable (if there is no);
- `value_type` - If the variable is created, then this flag can be set the type of value for this variable;
- `default_value` - If the variable is created, then this flag can be set the initial value of the variable before applying the operation (default 0).

Example:
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

## Decoration values

Can be decrement the value of the variable by the method`decrement` module `variables`:
```python
def decrement(name: str, delta: Any, value_type: Types, ttl=None, default_value=0, create=False) -> 'Variable':
    pass
```

Also available decrement value variable via method `decrement` object of variable`Variable`:
```python
class Variable:
    ...
    def decrement(self, delta: Any, ttl=None, default_value=0, create=False) -> 'Variable':
            pass
```

In both embodiments, the new value variable is returned.

`decrement` - Atomic operation value -= delta over numeric data types (integer, float, timestamp),The time label is not transmitted.

Доступные флаги:

- `create` - if `true`, then create a variable (if there is no)
- `value_type` - If the variable is created, then this flag can be set the type of value for this variable
- `default_value` - If the variable is created, then this flag can be set the initial value of the variable before applying the operation (default 0)

Example:
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

## Removal

You can check the removal of the vault variable using the method:
```python
def delete(name: str):
    pass
```

Also available removal variable through the method`delete` object of variable`Variable`:
```python
class Variable:
    ...
    def delete(self):
        pass
```

Example:
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

## Examination

You can check the presence of a variable to the repository using the method:
```python
def exists(name: str) -> bool:
    pass
```

Also available is available for the presence of a variable through the method `exists` object of variable `Variable`:
```python
class Variable:
    ...
    def exists(self) -> bool:
        pass
```

In both options, the value of the type is returned`bool`.

Example:
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
