# {heading({var(s3)} интеграциясындағы қате)[id=s3-error-tier-is-alredy-in-use]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

{var(s3)} қоймасымен интеграция кезінде MinIO-да `Tier is already in use` хабарламасы пайда болады.

Бұл S3 қашықтан қоймасына (remote tier) арналған конфигурацияның бұрыннан бар екенін білдіреді.

### {heading(Шешім)[id=s3-error-tier-is-alredy-in-use-resolve]}

Жаңа конфигурацияны құрмас бұрын MinIO-дағы бар конфигурацияны жойыңыз.