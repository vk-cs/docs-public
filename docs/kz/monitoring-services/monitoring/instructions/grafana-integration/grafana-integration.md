{include(/kz/_includes/_translated_by_ai.md)}

Cloud Monitoring сервисі жинаған ресурс мониторингі деректерін екі тәсілмен визуализациялауға болады:

- [Жаңа ВМ-де мониторингті баптау](../mon-setup-new) мақаласында сипатталғандай, жеке кабинеттегі **Мониторинг → Дашбордтар** бөлімінде;
- Grafana сервисінің көмегімен.

Grafana сервисін пайдалану үшін оны жобаңыздағы [Қолданбалар дүкенінен](https://kz.cloud.vk.com/app/services/marketplace) [іске орналастырыңыз](/kz/applications-and-services/marketplace/initial-configuration/grafana-start).

Сервис іске орналастырылған кезде, ол Cloud Monitoring-пен автоматты түрде интеграцияланады:

- Grafana-ға Cloud Monitoring сервисінен мониторинг деректерін алуға мүмкіндік беретін байланыс орнатылады.
- Grafana-да Cloud Monitoring-пен байланысты келесі дереккөздер (data sources) бапталады:

  - `[VK Cloud] Дерекқорлар`;
  - `[VK Cloud] Виртуалды машиналар` (әдепкі бойынша дереккөз);
  - `[VK Cloud] Контейнерлер (K8S)`;
  - `[VK Cloud] Marketplace-тен қолданбалар`;
  - `[VK Cloud] Резервтік көшіру`;
  - `[VK Cloud] JupiterHub сервисі`;
  - `[VK Cloud] MLFlow сервисі`;
  - `[VK Cloud] MLflow Deploy сервисі`;
  - `[VK Cloud] k8s-тегі Spark сервисі`.
  
{note:info}

Grafana сервисі іске орналастырылған жобаның мониторинг деректерін ғана алуға болады.

{/note}
