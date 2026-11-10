# {heading(Тарификация)[id=captcha-tariffication]}

{include(/kz/_includes/_translated_by_ai_kz.md)}

VK Капча қызметі ақылы. Капча өткен кезіндегі әрбір пайдаланушыны тексеру тарификацияланады. Құнын есептеу үшін VK Капча командасына [captcha@corp.vk.com](mailto:captcha@corp.vk.com) поштасы арқылы жазыңыз.

Қызметті тегін тексеру үшін {linkto(../../../tools-for-using-services/api/api-spec/captcha-api#api-spec-captcha)[text=GET /captchaNotRobot.createSession]} әдісін шақырғанда `Captcha-Test` тақырыбын `true` мәнімен жіберіңіз. Тестілеу режимінде капча өтуінің барлық әрекеттері сәтті деп есептеледі, ал сұраулар тарификацияланбайды.

{note:warn}
Тестілеу режимі қосымшаның қызметпен интеграциясын тексеру үшін ғана арналған. `Captcha-Test` тақырыбын production-ортада пайдаланбаңыз — бұл режимде VK Капча автоматтандырылған шабуылдардан қорғамайды.
{/note}