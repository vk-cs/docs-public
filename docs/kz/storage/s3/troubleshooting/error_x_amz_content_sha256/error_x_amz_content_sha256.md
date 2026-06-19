# {heading(AWS CLI v2 арқылы жұмыс істегенде x-amz-content-sha256 қатесі)[id=s3-error-x-amz-content-sha256]}

{include(/kz/_includes/_translated_by_ai.md)}

Объектілік қоймамен жұмыс істеген кезде `x-amz-content-sha256 must be UNSIGNED-PAYLOAD` хабарламасы пайда болады.

Бұл AWS CLI 2-нұсқасы қолданылып жатқанынан болуы мүмкін.

### {heading(Шешімі)[id=s3-error-x-amz-content-sha256-resolve]}

Командаңызға `--no-sign-request` жалаушасын қосыңыз немесе AWS CLI профилін 2-нұсқалы қолтаңбаны (SigV2) пайдалану үшін баптаңыз.