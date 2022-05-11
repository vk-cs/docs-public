Модуль `constants` работает с глобальными константами. Он определяет функцию для получения глобальной константы по ее имени:
```python
class BadParamsError(Exception):
    pass

class ConstantNotFoundError(Exception):
    pass

class UnknownError(Exception):
    pass

def get_by_name(name: str) -> Constant:
    pass
```

Сам объект-константа содержит свойства константы: ее имя, идентификатор, тип и значение:
```python
class Type(Enum):
    int = 0
    float = 1
    long = 2
    double = 3
    timestamp = 4
    string = 5
    array = 6

class Constant:
	id:    int
	name:  str
	type:  Type
	value: Any
```

Пример получения значения константы по ее имени:
```python
from coiiot_sdk import constants, user_logs

logger = user_logs.get_logger()

test_int = constants.get_by_name("test_int")
logger.info(f'{ test_int.value }')
```
