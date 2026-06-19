# {heading({var(s3)} жүйесімен интеграциялау кезіндегі қате)[id=s3-error-tier-is-alredy-in-use]}

{include(/kz/_includes/_translated_by_ai.md)}

{var(s3)} қоймасымен MinIO арқылы интеграциялау кезінде `Tier is already in use` хабарламасы пайда болады.

Бұл S3 қашықтағы қоймасы (remote tier) үшін конфигурацияның бұрыннан бар екенін білдіреді.

### {heading(Шешімі)[id=s3-error-tier-is-alredy-in-use-resolve]}

Жаңасын жасамас бұрын MinIO ішіндегі бар конфигурацияны жойыңыз.