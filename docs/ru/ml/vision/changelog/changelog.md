# {heading(История изменений)[id=vision-changelog]}

## {heading(03.08.23)[id=vision-changelog-03.08.23]}

- Добавлено автоматическое определения языка текста для метода `scene_text/recognize`. Ручное указание языка текста доступно при добавлении параметра `lang` в запрос.
- Расширен список выбора моделей определения объектов для метода `objects/detect`. В API добавлен вариант `object2` для параметра `mode`.

Подробней в [спецификации API](/ru/tools-for-using-services/api/api-spec/vision-api).

## {heading(15.06.23)[id=vision-changelog-15.06.23]}

Добавлена поддержка распознавания рукописного текста для метода `scene_text/recognize`.

## {heading(06.04.23)[id=vision-changelog-06.04.23]}

- Реализован метод распознавания текста на изображении, сделанном на улице. Подробнее о методе в статье {linkto(../instructions/scene-text-recognition#vision-instructions-scene-text-recognition)[text=Распознавание текста на уличном изображении]}.
- Уточнен список {linkto(../concepts/vision-limits#vision-concepts-vision-limits)[text=ограничений]}.

## {heading(16.12.22)[id=vision-changelog-16.12.22]}

Реализован метод распознавания контента 18+, подробнее о методе в статье {linkto(../instructions/nsfw-recognition#vision-instructions-nsfw-recognition)[text=Распознавание контента 18+]}.
