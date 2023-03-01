## Описание

Рассмотрим работу с хранилищем `Long Term Storage`. Работа с долговременным хранилищем очень похожа на работу с `Operational Storage`.

Модуль `coiiot_sdk.long_term_storage` определяет следующие функции и классы ошибок:
```python
class BadParamsError(Exception):
    pass

class NotFoundError(Exception):
    pass

class SelectionError(Exception):
    pass

class InsertionError(Exception):
    pass

class UpsertionError(Exception):
    pass

class SQLError(Exception):
    pass


def insert() -> Insert:
	pass

def upsert() -> Upsert:
	pass

def select_latest(tag: Tag) -> SelectLatest:
	pass

def select_current(tag: Tag) -> SelectCurrent:
	pass

def select(tag: Tag, from_ts: datetime, to_ts: datetime) -> Select:
	pass
```

У `Long Term Storage` есть одно явное отличие от `Operational Storage:` в `select(tag, from_ts, to_ts)` поддерживается периодизация только по следующим периодам:
```python
def with_period_minute(self) -> 'Select':
	pass

def with_period_hour(self) -> 'Select':
	pass

def with_period_day(self) -> 'Select':
	pass

def with_period_month(self) -> 'Select':
	pass

def with_period_year(self) -> 'Select':
	pass
```

## Event

Вызов `insert()` возвращает объект `Insert` со следующим интерфейсом:
```python
class InsertT:
    def value(self, tag_id: int, value: Any, timestamp: datetime):
		pass

    def msg(self, msg: MessageT):
		pass
```
Метод `value(tag_id, value, timestamp)` предназначен для вставки конкретного значения. Для вставки значения из сообщения можно использовать метод `msg(message)`:
```python
from coiiot_sdk import long_term_storage as lt_store, context

ctx = context.current()

# сохраняем полученное сообщение в хранилище
lt_store.insert().msg(ctx.msg)
```

## Получение последнего значения тега

Здесь все аналогично работе с `Operational Storage`. Вызов `select_latest(tag)` возвращает объект класса `SelectLatest` с единственным методом `execute()`.
Пример получения последнего значения текущего тега:
```python
from coiiot_sdk import long_term_storage as lt_store, context, user_logs

logger = user_logs.get_logger()
ctx = context.current()

latest = lt_store.select_latest(ctx.tag).execute()
logger.info(f'{ latest.data.value }')
```

## Aggregate

Вызов `upsert()` возвращает объект `Upsert` со следующим интерфейсом:
```python
class UpsertT:
    def value(self, tag_id: int, value: Any, timestamp: datetime):
		pass

    def msg(self, msg: MessageT):
		pass
```

Метод `value(tag_id, value, timestamp)` предназначен для вставки с обновлением конкретного значения.

Для вставки с обновлением значения из сообщения можно использовать метод `msg(message)`:
```python
from coiiot_sdk import long_term_storage as lt_store, context

ctx = context.current()

# сохраняем полученное сообщение в хранилище
lt_store.upsert().msg(ctx.msg)
```

## Получение текущего значения тега

Здесь все аналогично работе с `Operational Storage`. Вызов `select_current(tag)` возвращает объект класса `SelectCurrent` с единственным методом `execute()`.

Пример получения текущего значения текущего тега типа `aggregate`:
```python
from coiiot_sdk import long_term_storage as lt_store, context, user_logs

logger = user_logs.get_logger()
ctx = context.current()

current = lt_store.select_current(ctx.tag).execute()
logger.info(f'{ current.data.value }')
```

## Получение значений из Long Term Storage

Аналогично работе с `Operational Storage`, даже класс `SelectionResult` имеет такое же определение.

Приведем лишь пример агрегации по периоду в одну минуту в `Long Term Storage`:
```python
import datetime
from coiiot_sdk import long_term_storage as lt_store, context, user_logs

logger = user_logs.get_logger()
ctx = context.current()

to_ts = datetime.datetime.now()
from_ts = to_ts - datetime.timedelta(minutes=30)
r = lt_store.select(ctx.tag, from_ts, to_ts).with_period_minute().calc_count_as("count").execute()
logger.info(f'{ r.data[0].value["count"] }') # количество в первом периоде
logger.info(f'{ r.data[1].value["count"] }') # количество во втором периоде и т.д.
```
