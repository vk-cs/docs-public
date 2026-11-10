# {heading(AWS CLI v2 жұмысы кезіндегі x-amz-content-sha256 қатесі)[id=s3-error-x-amz-content-sha256]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

Объектті сақтаумен жұмыс істеу кезінде `x-amz-content-sha256 must be UNSIGNED-PAYLOAD` хабарламасы пайда болады.

Бұл AWS CLI 2-нұсқасы қолданылатындығынан болуы мүмкін.

### {heading(Шешу)[id=s3-error-x-amz-content-sha256-resolve]}

Командаңызға `--no-sign-request` жалаушасын қосыңыз немесе AWS CLI профилін SigV2 (2-нұсқа) қолтаңбасын пайдалану үшін баптаңыз.