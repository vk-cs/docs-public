Cloud Monitoring предоставляет API для получения значения метрик. Реализована поддержка подмножества языка PromQL для работы с метриками на основе запросов.

Можно составлять и выполнять запрос на чтение метрик со следующим синтаксисом.

- Название метрики и функция агрегации:

  - `cpu:Minimum`

- Фильтрация по значению `Label`:

  - `\=` — метки, которые точно соответствуют указанной строке;
  - `!=` — метки, не совпадающие с указанной строкой;
  - `\=~` — метки, регулярное выражение которых соответствует указанной строке;
  - `!~` — метки, которые не соответствуют регулярному выражению указанной строки.

- Группировки:

  - `SUM` — сумма по размерностям;
  - `MIN` — минимум по размерностям;
  - `MAX` — максимум по размерностям;
  - `AVG` — среднее по размерностям;
  - `STDDEV` — стандартное отклонение совокупности по размерностям;
  - `STDVAR` — стандартная дисперсия генеральной совокупности по измерениям;
  - `COUNT` — количество элементов в векторе;
  - `QUANTILE` — φ-квантиль (`0 ≤ φ ≤ 1`) по измерениям.

Примеры запросов:

```promql
SUM BY(host) (cpu:Minimum{instance="server1", app!="system"})
```

```promql
SUM BY(job) (cpu:Average{host="server1", job!="system"}[12h] offset 24h)
```
