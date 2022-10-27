## Описание

Модуль `operational_storage` содержит следующие функции и классы ошибок для работы с `Operational Storage`:
```python
class InsertionError(Exception):
    pass

class UpsertionError(Exception):
    pass

class SelectionError(Exception):
    pass

class BadParamsError(Exception):
    pass

class NotFoundError(Exception):
    pass


def insert() -> Insert:
    """
    insert() возвращает объект для вставки значений тегов типа event в Operational Storage
    """

def select_latest(tag: Tag) -> SelectLatest:
    """
    select_latest() возвращает объект для выборки последнего значения тэга типа event из Operational Storage
    """

def select(tag: Tag, from_ts: datetime, to_ts: datetime) -> Select:
    """
    select() возвращает объект для выборки значений из Operational Storage
    Этот объект поддерживает аггрегацию, группировку, смещения и пр.
    Применим для тэгов типа event и aggregate
    """

def upsert() -> Upsert:
    """
    upsert() возвращает объект для вставки с обновлением значений тегов типа aggregate в Operational Storage
    то есть, если в хранилище значение тега в заданный timestamp уже существует - то значение тега обновляется
    """

def select_current(tag: Tag) -> SelectCurrent:
    """
    select_current() возвращает объект для выборки текущего значения тэга типа aggregate из Operational Storage
    Под текущим значением тега понимается значение тега за текущий период агрегации
    """
```

## Event

Вызов `insert()` возвращает объект `Insert` со следующим интерфейсом:
```python
class Insert:
    def values(self, tag: Tag, value: Any, timestamp: datetime) -> 'Insert':
		pass

    def msg(self, msg: Message) -> 'Insert':
		pass

    def execute(self):
		pass
```
Метод `values(tag, value, timestamp)` предназначен для вставки конкретного значения. Для вставки значения из сообщения можно использовать метод `msg(message)`:
```python
from coiiot_sdk import operational_storage as op_store, context

ctx = context.current()

# сохраняем полученное сообщение в хранилище
op_store.insert().msg(ctx.msg).execute()
```

## Получение последнего значения тега

Очень часто нам нужно именно последнее значение тэга. За это отвечает функция `select_latest(tag)`.

Вызов `select_latest(tag)` возвращает объект класса `SelectLatest` со следующим интерфейсом:
```python
class Event(TypedDict):
    payload: Dict[str, Any]
    received_at: int
    time: int
    value: Any

class LatestEvent(TypedDict):
    data: Event
    tag_id: int
    value_type: str


class SelectLatest:

    def execute(self) -> LatestEvent:
        pass
```

Пример получения последнего значения тэга:
```
from coiiot_sdk import operational_storage as op_store, context, user_logs

logger = user_logs.get_logger()
ctx = context.current()

latest = op_store.select_latest(ctx.tag).execute()
logger.info(f"{ latest.data.value }")
```

## Aggregate

Очень часто для тега типа `aggregate` нам нужно его текущее значение, то есть значение за текущий, еще не завершенный период агрегации. За это отвечает функция `select_current(tag)`.

Вызов `select_current(tag)` возвращает объект класса `SelectCurrent` со следующим интерфейсом:
```python
class Aggregate(TypedDict):
    payload: Dict[str, Any]
    received_at: int
    time: int
    value: Any

class CurrentAggregate(TypedDict):
    data: Aggregate
    tag_id: int
    value_type: str

class SelectCurrent:

    def execute(self) -> CurrentAggregate:
        pass
```

Пример получения текущего значения тэга-агрегата:
```python
from coiiot_sdk import operational_storage as op_store, context, user_logs

logger = user_logs.get_logger()
ctx = context.current()

current = op_store.select_current(ctx.tag).execute()
logger.info(f"{ current.data.value }")
```

## Вставка с обновлением значения тега

Вызов `upsert()` возвращает объект `Upsert` со следующим интерфейсом:
```python
class Upsert:
    def values(self, tag: Tag, value: Any, timestamp: datetime) -> 'Upsert':
		pass

    def msg(self, msg: Message) -> 'Upsert':
		pass

    def execute(self):
		pass
```
Метод `values(tag, value, timestamp)` предназначен для вставки или обновления конкретного значения. Для вставки значения из сообщения можно использовать метод `msg(message)`:
```python
from coiiot_sdk import operational_storage as op_store, context

ctx = context.current()

# сохраняем полученное сообщение в хранилище
op_store.upsert().msg(ctx.msg).execute()
```
Если в хранилище значение тега в заданный timestamp уже существует, то значение тега обновляется.

## Получение значений

Для более сложной выборки значений можно использовать метод `select(tag, from_ts, to_ts)`.

Метод применим как к тегам типа `event`, так и к тегам типа `aggregate`.

Метод возвращает объект класса `Select` со следующим интерфейсом:
```python
class Select:

    def with_offset(self, offset: int) -> 'Select':
		"""
		Установить смещение для начала выборки значений
		"""
    
    def with_limit(self, limit: int) -> 'Select':
		"""
		Установить ограничение на количество выбранных значений
		"""

    def order_by(self, **kwargs) -> 'Select':
		"""
		Задает порядок сортировки выборки с помощью именованных параметров.
        Имя параметра обозначает поле сортировки.
        Значение параметра задает порядок сортировки, может быть либо "asc", либо "desc"
		"""

    def with_period(self, period: str) -> 'Select':
		"""
		Делать агрегацию по заданному временному периоду
		"""

    def calc_max_as(self, alias: str) -> 'Select':
		"""
		Вычислить максимум под псевдонимом, задаваемым alias (агрегация)
		"""

    def calc_max(self) -> 'Select':
		"""
		Сокращение для calc_max_as("max")
		"""

    def calc_min_as(self, alias: str) -> 'Select':
		"""
		Вычислить минимум под псевдонимом, задаваемым alias (агрегация)
		"""
    
    def calc_min(self) -> 'Select':
		"""
		Сокращение для calc_min_as("min")
		"""

    def calc_avg_as(self, alias: str) -> 'Select':
		"""
		Вычислить среднее под псевдонимом, задаваемым alias (агрегация)
		"""

    def calc_avg(self) -> 'Select':
		"""
		Сокращение для calc_avg_as("avg")
		"""
    
    def calc_count_as(self, alias: str) -> 'Select':
		"""
		Вычислить количество под псевдонимом, задаваемым alias (агрегация)
		"""

    def calc_count(self) -> 'Select':
		"""
		Сокращение для calc_count_as("count")
		"""

    def calc_sum_as(self, alias: str) -> 'Select':
		"""
		Вычислить сумму под псевдонимом, задаваемым alias (агрегация)
		"""
    
    def calc_sum(self) -> 'Select':
		"""
		Сокращение для calc_sum_as("sum")
		"""
    
    def execute(self) -> SelectionResult:
		pass
```

Вариантов использования `Select` много, поэтому метод `execute()` возвращает достаточно сложный тип `SelectionResult`.

Ниже приводится его полное описание.
```python
class Event(TypedDict):
    payload: Dict[str, Any]
    received_at: int
    time: int
    value: Any

class Events(TypedDict):
    data: List[Event]
    tag_id: int
    value_type: str

class EventsAggregate(TypedDict):
    data: Dict[str, Union[int, float]]
    tag_id: int
    value_type: str

class GroupAggregateOfEvents(TypedDict):
    end_time: int
    start_time: int
    value: Dict[str, Union[int, float]]

class EventsGroupAggregate(TypedDict):
    data: List[GroupAggregateOfEvents]
    tag_id: int
    value_type: str

class Aggregate(TypedDict):
    payload: Dict[str, Any]
    received_at: int
    time: int
    value: Any

class Aggregates(TypedDict):
    data: List[Aggregate]
    tag_id: int
    value_type: str

class AggregatesAggregate(TypedDict):
    data: Dict[str, Union[int, float]]
    tag_id: int
    value_type: str

class GroupAggregateOfAggregates(TypedDict):
    end_time: int
    start_time: int
    value: Dict[str, Union[int, float]]

class AggregatesGroupAggregate(TypedDict):
    data: List[GroupAggregateOfAggregates]
    tag_id: int
    value_type: str

AggregateEvents = Union[EventsAggregate, EventsGroupAggregate]
EventsResult = Union[AggregateEvents, Events]

AggregateAggregates = Union[AggregatesAggregate, AggregatesGroupAggregate]
AggregatesResult = Union[AggregateAggregates, Aggregates]

SelectionResult = Union[AggregatesResult, EventsResult]
```

Пример расчета минимума и максимума за последние 30 секунд:
```python
import datetime
from coiiot_sdk import operational_storage as op_store, context, user_logs

logger = user_logs.get_logger()
ctx = context.current()

to_ts = datetime.datetime.now()
from_ts = to_ts - datetime.timedelta(seconds=30)
r = op_store.select(ctx.tag, from_ts, to_ts).calc_max_as("max").calc_min_as("min").execute()
logger.info(f'{ r.data["max"] }')
logger.info(f'{ r.data["min"] }')
```

В этом примере значения группируются в периоды по 5 секунд и в этих периодах происходит расчет значений агрегатов:
```python
import datetime
from coiiot_sdk import operational_storage as op_store, context, user_logs

logger = user_logs.get_logger()
ctx = context.current()

to_ts = datetime.datetime.now()
from_ts = to_ts - datetime.timedelta(seconds=30)
r = op_store.select(ctx.tag, from_ts, to_ts).with_period("5s").calc_count_as("count").execute()

logger.info(f'{ r.data[0].value["count"] }') # количество в первом периоде
logger.info(f'{ r.data[1].value["count"] }') # количество во втором периоде и т.д.
```

Можно использовать сортировку результатов выборки через метод `order_by(**kwargs)`. Пока что поддерживается сортировка только по полю `time`.

Пример ниже показывает, как получить последние два значения в порядке «с конца» за указанный период:
```python
import datetime
from coiiot_sdk import operational_storage as op_store, context, user_logs

logger = user_logs.get_logger()
ctx = context.current()

from_ts = datetime.datetime(2021, 1, 1)
to_ts = datetime.datetime.now()
r = op_store.select(ctx.tag, from_ts, to_ts).with_limit(2).order_by(time="desc").execute()
logger.info(str([rec.value for rec in r.data]))
```
