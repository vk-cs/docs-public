# {heading(Өзгерістер тарихы)[id=vision-changelog]}

{include(/kz/_includes/_translated_by_ai.md)}

## {heading(03.08.23)[id=vision-changelog-03.08.23]}

- `scene_text/recognize` әдісі үшін мәтін тілін автоматты түрде анықтау қосылды. Мәтін тілін қолмен көрсету сұрауға `lang` параметрін қосқанда қолжетімді.
- `objects/detect` әдісі үшін нысандарды анықтау модельдерін таңдау тізімі кеңейтілді. API-ге `mode` параметрі үшін `object2` нұсқасы қосылды.

Толығырақ [API спецификациясында](/kz/tools-for-using-services/api/api-spec/vision-api).

## {heading(15.06.23)[id=vision-changelog-15.06.23]}

`scene_text/recognize` әдісі үшін қолжазба мәтінді тануға қолдау қосылды.

## {heading(06.04.23)[id=vision-changelog-06.04.23]}

- Көшеде түсірілген суреттегі мәтінді тану әдісі іске асырылды. Әдіс туралы толығырақ {linkto(../instructions/scene-text-recognition#vision-instructions-scene-text-recognition)[text=Көшедегі суреттегі мәтінді тану]} мақаласында.
- {linkto(../concepts/#vision-concepts-vision-limits)[text=шектеулер]} тізімі нақтыланды.

## {heading(16.12.22)[id=vision-changelog-16.12.22]}

18+ контентін тану әдісі іске асырылды, әдіс туралы толығырақ {linkto(../instructions/nsfw-recognition#vision-instructions-nsfw-recognition)[text=18+ контентін тану]} мақаласында.
