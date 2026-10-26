const fs = require('fs');

// Verb translations: infinitive -> infinitive
const verbMap = {
  'арендовать': 'rent',
  'блокировать': 'lock',
  'возвращать': 'return',
  'восстанавливать': 'restore',
  'вызывать': 'invoke',
  'выполнять': 'perform',
  'добавлять': 'add',
  'запускать': 'start',
  'изменять': 'change',
  'масштабировать': 'scale',
  'обновлять': 'update',
  'отменить': 'cancel',
  'перезагружать': 'restart',
  'переустанавливать': 'reinstall',
  'получать': 'get',
  'получить': 'get',
  'просматривать': 'view',
  'разблокировать': 'unlock',
  'редактировать': 'edit',
  'скачивать': 'download',
  'создавать': 'create',
  'создать': 'create',
  'увеличивать': 'increase',
  'удалить': 'delete',
  'удалять': 'delete',
  'управлять': 'manage',
  'устанавливать': 'install',
};

// Name phrase patterns for "Название в личном кабинете"
// Longer prefixes first, then fall back to generic
const namePatterns = [
  // Quoted action names (like "Снять" запрос к X)
  { match: /^"([^"]+)" запрос к (.+)/, tmpl: '"%s" %s query' },
  { match: /Запуск резервного копирования (.+) вручную\./, tmpl: 'Starting %s backup manually.' },
  { match: /Обновление версии продукта (.+)/, tmpl: 'Updating %s product version.' },
  { match: /Добавление пользователя (.+)/, tmpl: 'Adding a %s user.' },
  { match: /Удаление пользователя (.+)/, tmpl: 'Deleting a %s user.' },
  { match: /Просмотр списка пользователей (.+)/, tmpl: 'Listing %s users.' },
  { match: /Изменение данных пользователя (.+)/, tmpl: 'Changing %s user data.' },
  { match: /Просмотр истории изменения учетных записей (.+)/, tmpl: 'Viewing the change history of %s accounts.' },
  { match: /Изменение названия или описания (.+)/, tmpl: 'Changing the %s name or description.' },
  { match: /Просмотр свойств инстанса (.+)/, tmpl: 'Viewing %s instance properties.' },
  { match: /Просмотр свойств инстансов (.+)/, tmpl: 'Viewing %s instance properties.' },
  { match: /Просмотр истории изменения экземпляра (.+)/, tmpl: 'Viewing the %s instance change history.' },
  { match: /Просмотр журналов событий (.+)/, tmpl: 'Viewing %s event logs.' },
  { match: /Просмотр показателей мониторинга (.+)/, tmpl: 'Viewing %s monitoring metrics.' },
  { match: /Просмотр настроек (.+)/, tmpl: 'Viewing %s settings.' },
  { match: /Просмотр истории изменения настроек (.+)/, tmpl: 'Viewing the change history of %s settings.' },
  { match: /Просмотр списка (.+)/, tmpl: 'Listing %s.' },
  { match: /Просмотр истории изменения (.+)/, tmpl: 'Viewing the change history of %s.' },
  { match: /Просмотр истории изменения резервных копий (.+)/, tmpl: 'Viewing the change history of %s backups.' },
  { match: /Создание (.+)/, tmpl: 'Creating %s.' },
  { match: /Создание (.+) из резервной копии/, tmpl: 'Creating %s from a backup.' },
  { match: /Изменение (.+)/, tmpl: 'Changing %s.' },
  { match: /Удаление (.+)/, tmpl: 'Deleting %s.' },
  { match: /Обновление (.+)/, tmpl: 'Updating %s.' },
  { match: /Перезагрузка (.+)/, tmpl: 'Restarting %s.' },
  { match: /Масштабирование (.+)/, tmpl: 'Scaling %s.' },
  { match: /Восстановление (.+) из резервной копии/, tmpl: 'Restoring %s from a backup.' },
  { match: /Восстановление (.+) в новый кластер/, tmpl: 'Restoring %s to a new cluster.' },
  { match: /Скачивание (.+)/, tmpl: 'Downloading %s.' },
  { match: /Скачивание резервной копии (.+)/, tmpl: 'Downloading a %s backup.' },
  { match: /Скачивание резервных копий (.+)/, tmpl: 'Downloading %s backups.' },
  { match: /Установка (.+)/, tmpl: 'Installing %s.' },
  { match: /Установка подключений (.+)/, tmpl: 'Installing %s connections.' },
  { match: /Обновление подключений (.+)/, tmpl: 'Updating %s connections.' },
  { match: /Удаление подключений (.+)/, tmpl: 'Deleting %s connections.' },
  { match: /Управление (.+)/, tmpl: 'Managing %s.' },
  { match: /Изменение настроек обслуживания (.+)/, tmpl: 'Changing %s maintenance settings.' },
  { match: /Изменение внутреннего IP-адреса (.+)/, tmpl: 'Changing the internal IP address of %s.' },
  { match: /Получение (.+)/, tmpl: 'Getting %s.' },
  { match: /Получение списка (.+)/, tmpl: 'Listing %s.' },
  { match: /Получение доступа к (.+)/, tmpl: 'Accessing %s.' },
  { match: /Доступ к (.+)/, tmpl: 'Access to %s.' },
  { match: /Выполнение (.+)/, tmpl: 'Performing %s.' },
  { match: /Вызов (.+)/, tmpl: 'Invoking %s.' },
  { match: /Переустановка (.+)/, tmpl: 'Reinstalling %s.' },
  { match: /Аренда (.+)/, tmpl: 'Renting %s.' },
  { match: /Блокировка (.+)/, tmpl: 'Locking %s.' },
  { match: /Разблокировка (.+)/, tmpl: 'Unlocking %s.' },
  { match: /Возврат (.+)/, tmpl: 'Returning %s.' },
  { match: /Обновление свойств (.+)/, tmpl: 'Updating %s properties.' },
  { match: /Изменение данных (.+)/, tmpl: 'Changing %s data.' },
  { match: /Просмотр (.+)/, tmpl: 'Viewing %s.' },
  { match: /^(.+)$/, tmpl: '$1' }, // fallback
];

// Product name translation helper
// Order matters: longer names first
const productNames = [
  'Kafka (legacy)',
  'Cloud PostgreSQL',
  'Cloud Monitoring',
  'Cloud Logging',
  'Cloud Audit',
  'Cloud Flink',
  'Cloud Kafka',
  'Cloud Airflow',
  'Cloud Trino',
  'Iceberg Metastore',
];

// Action-word translations for name phrases
const actionMap = {
  'Аренда': 'Renting',
  'Аренда серверов': 'Renting servers',
  'Блокировка': 'Locking',
  'Блокировка сервера': 'Locking a server',
  'Возврат': 'Returning',
  'Возврат сервера': 'Returning a server',
  'Вызов функций управления питанием сервера': 'Invoking server power management functions',
  'Выполнение действий с устройствами сервера': 'Performing actions on server devices',
  'Выполнение SQL запросов': 'Executing SQL queries',
  'Добавление': 'Adding',
  'Добавление пользователя': 'Adding a user',
  'Добавление роли пользователя': 'Adding a user role',
  'Доступ к UI продукта': 'Accessing the %s UI',
  'Доступ к консоли сервера': 'Accessing the server console',
  'Изменение': 'Changing',
  'Изменение записей в менеджере секретов': 'Changing records in the secret manager',
  'Изменение названия или описания': 'Changing the name or description',
  'Изменение данных пользователя': 'Changing user data',
  'Изменение внутреннего IP-адреса': 'Changing the internal IP address',
  'Изменение настроек обслуживания': 'Changing maintenance settings',
  'Обновление': 'Updating',
  'Обновление подключений': 'Updating connections',
  'Обновление свойств сервера (вкл. переименование)': 'Updating server properties (incl. renaming)',
  'Обновление версии продукта': 'Updating the product version',
  'Отмена запроса': 'Canceling a query',
  'Получение': 'Getting',
  'Получение доступа': 'Gaining access',
  'Получение списка': 'Listing',
  'Получение списка флейворов': 'Listing flavors',
  'Получение списка образов': 'Listing images',
  'Получение списка устройств сервера': 'Listing server devices',
  'Получение списка серверов': 'Listing servers',
  'Просмотр': 'Viewing',
  'Просмотр информации': 'Viewing information',
  'Просмотр логов': 'Viewing logs',
  'Просмотр дашбордов': 'Viewing dashboards',
  'Просмотр истории изменения': 'Viewing the change history of',
  'Просмотр свойств инстанса': 'Viewing instance properties',
  'Просмотр свойств инстансов': 'Viewing instance properties',
  'Просмотр списка': 'Listing',
  'Просмотр настроек': 'Viewing settings',
  'Просмотр истории изменения настроек': 'Viewing the change history of settings',
  'Просмотр настроек СУБД': 'Viewing DBMS settings',
  'Просмотр истории изменения настроек СУБД': 'Viewing the change history of DBMS settings',
  'Просмотр истории изменения расширений': 'Viewing the change history of extensions',
  'Просмотр истории изменения резервных копий': 'Viewing the change history of backups',
  'Просмотр истории изменения учетных записей': 'Viewing the change history of accounts',
  'Просмотр свойств': 'Viewing properties',
  'Просмотр показтелей мониторинга': 'Viewing monitoring metrics',
  'Просмотр журналов событий': 'Viewing event logs',
  'Просмотр событий': 'Viewing events',
  'Перезагрузка': 'Restarting',
  'Переустановка': 'Reinstalling',
  'Разблокировка': 'Unlocking',
  'Скачивание': 'Downloading',
  'Скачивание резервной копии': 'Downloading a backup',
  'Скачивание резервных копий': 'Downloading backups',
  'Создание': 'Creating',
  'Создание новой': 'Creating a new',
  'Удаление': 'Deleting',
  'Удаление подключений': 'Deleting connections',
  'Установка': 'Installing',
  'Установка подключений': 'Installing connections',
  'Установка приоритета загрузки сервера': 'Setting the server boot order',
  'Управление': 'Managing',
  'Управление горизонтальным или вертикальным масштабированием': 'Managing horizontal or vertical scaling',
  'Управление вертикальным или горизонтальным масштабированием': 'Managing vertical or horizontal scaling',
  'Управление масштабированием': 'Managing scaling',
  'Установка расширений': 'Installing extensions',
  'Получение списка расширений': 'Listing extensions',
  'Удаление расширений': 'Uninstalling extensions',
  'Выполнение SQL запросов': 'Executing SQL queries',
  'Запуск резервного копирования': 'Starting backup',
  'Восстановление': 'Restoring',
  'Получение доступа к графическому интерфейсу': 'Accessing the graphical interface',
  'Получение списка исполняемых запросов': 'Listing executing queries',
};

function translateName(name) {
  if (!name) return name;
  let n = name.trim();

  // Check exact action maps first
  if (actionMap[n]) return actionMap[n];

  // Check action prefix matches (longest first)
  const sortedActions = Object.keys(actionMap).sort((a, b) => b.length - a.length);
  for (const action of sortedActions) {
    if (n.startsWith(action + ' ') || n.startsWith(action + ' — ')) {
      const rest = n.substring(action.length).trim();
      // Strip "БД " prefix
      const cleanRest = rest.replace(/^БД\s+/, '');
      // "из резервной копии X в новый кластер"
      const restoreMatch = cleanRest.match(/из резервной копии (.+) в новый кластер/);
      if (restoreMatch) {
        return actionMap[action] + ': ' + restoreMatch[1] + ' to a new cluster';
      }
      // "к БД X" (SQL queries)
      const queryMatch = cleanRest.match(/^к БД (.+)/);
      if (queryMatch) {
        return actionMap[action] + ' ' + queryMatch[1] + ' queries';
      }
      // "Доступ к UI продукта X"
      const uiMatch = cleanRest.match(/^UI продукта (.+)/);
      if (uiMatch) {
        return actionMap[action].replace('%s', uiMatch[1]);
      }
      // Just product name
      return actionMap[action] + ' ' + cleanRest;
    }
  }

  // Fallback: return as-is
  return n;
}

function translateNameLine(line) {
  const m = line.match(/Название в личном кабинете: `(.+)`\.?/);
  if (!m) return line;
  const name = m[1];
  const translated = translateName(name);
  return `Management console name: \`${translated}\`.`;
}

// "Роль позволяет" -> "The role allows"
function translateRoleAllows(line) {
  const rest = line.replace(/^Роль позволяет\s+/, '');
  if (!rest) return 'The role allows.';
  // Take the first verb and translate it, keep the rest
  return 'The role allows ' + translateVerb(rest);
}

function translateVerb(line) {
  for (const [ru, en] of Object.entries(verbMap)) {
    if (line.startsWith(ru + ' ')) {
      return en + ' ' + line.substring(ru.length + 1).replace(/^\S/, c => c.toUpperCase());
    }
  }
  return line;
}

// Specific multi-word patterns that need special handling
const patterns = [
  // Server console
  { match: /Позволяет получать доступ к консоли сервера\./, result: 'Allows accessing the server console.' },
  { match: /Позволяет просматривать логи\./, result: 'Allows viewing logs.' },
  { match: /Позволяет просматривать дашборды\./, result: 'Allows viewing dashboards.' },
  { match: /Позволяет просматривать, создавать и редактировать дашборды, а также делать запись в систему мониторинга\./, result: 'Allows viewing, creating and editing dashboards, and writing to the monitoring system.' },
  { match: /Позволяет просматривать дашборды и делать запись в систему мониторинга\./, result: 'Allows viewing dashboards and writing to the monitoring system.' },
  { match: /Позволяет просматривать логи и генерировать учетные данные\./, result: 'Allows viewing logs and generating credentials.' },
  { match: /Позволяет просматривать логи и делать запись в систему мониторинга\./, result: 'Allows viewing logs and writing to the monitoring system.' },
  { match: /Позволяет просматривать все данные в сервисах виртуальных сетей и DNS\./, result: 'Allows viewing all data in virtual networks and DNS services.' },
  { match: /Позволяет добавлять в проект Floating IP\./, result: 'Allows adding Floating IPs to the project.' },
  { match: /Позволяет создавать и редактировать виртуальные сети и подсети, маршрутизаторы\./, result: 'Allows creating and editing virtual networks and subnets, routers.' },
  { match: /Позволяет создавать, изменять и удалять списки контроля доступа\./, result: 'Allows creating, modifying, and deleting access control lists (ACLs).' },
  { match: /Позволяет создавать, изменять и удалять сетевые настройки\./, result: 'Allows creating, modifying, and deleting network settings, including managing load balancers and DNS zones.' },
  { match: /Позволяет просматривать все события проекта и выгружать эти данные\./, result: 'Allows viewing all project events and exporting this data.' },
  { match: /Позволяет просматривать все события проекта\./, result: 'Allows viewing all project events.' },
  { match: /Позволяет просматривать события сервиса IAM и собственные действия пользователя\./, result: 'Allows viewing events of the IAM service and the user own actions.' },
  { match: /Позволяет просматривать события биллинга и собственные действия пользователя, а также выгружать эти данные\./, result: 'Allows viewing billing events and the user own actions, and exporting this data.' },
  { match: /Позволяет просматривать события сервиса и собственные действия пользователя, а также выгружать эти данные\./, result: 'Allows viewing service events and the user own actions, as well as exporting this data.' },
  // Cloud ClickHouse specific (multi-sentence)
  { match: /Позволяет масштабировать инстанс Cloud ClickHouse вертикально или горизонтально\. Позволяет любое изменение количества CPU\/RAM\./, result: 'Allows scaling the Cloud ClickHouse instance vertically or horizontally. Any changes to the number of CPUs/RAM are allowed.' },
  { match: /Позволяет масштабировать инстанс (.+) вертикально или горизонтально\. Позволяет любое изменение количества CPU\/RAM\./, tmpl: 'Allows scaling the %s instance vertically or horizontally. Any changes to the number of CPUs/RAM are allowed.' },
  { match: /Позволяет просматривать историю изменений настроек Kafka\./, result: 'Allows viewing the change history of Kafka settings.' },
  { match: /Позволяет просматривать историю изменений расширений Trino\./, result: 'Allows viewing the change history of Trino extensions.' },
  { match: /Позволяют устанавливать расширения продукта Trino\./, result: 'Allows installing Trino product extensions.' },
  { match: /Позволяет просматривать список расширений продукта Trino\./, result: 'Allows listing Trino product extensions.' },
  { match: /Позволяет удалять расширения продукта Trino\./, result: 'Allows uninstalling Trino product extensions.' },
  { match: /Позволяет создавать права доступа Trino\./, result: 'Allows creating Trino access permissions.' },
  { match: /Позволяет изменять права доступа Trino\./, result: 'Allows modifying Trino access permissions.' },
  { match: /Позволяет просматривать права доступа Trino\./, result: 'Allows viewing Trino access permissions.' },
  { match: /Позволяют просматривать историю изменений прав доступа Trino\./, result: 'Allows viewing the change history of Trino access permissions.' },
  { match: /Позволяет управлять вертикальным и горизонтальным масштабированием Jatoba\./, result: 'Allows managing vertical and horizontal scaling of Jatoba. Any changes to the number of CPUs/RAM are allowed.' },
  // Backup restore patterns
  { match: /Позволяет восстанавливать БД (.+) из резервной копии в новый кластер\./, tmpl: 'Allows restoring a %s database from a backup to a new cluster.' },
  { match: /Позволяет восстанавливать (.+) из резервной копии в новый кластер\./, tmpl: 'Allows restoring %s from a backup to a new cluster.' },
  // User patterns
  { match: /Позволяет добавлять пользователей (в сервис )?(Cloud .+)\./, tmpl: 'Allows adding %s users.' },
  { match: /Позволяет удалять пользователей (из сервиса )?(Cloud .+)\./, tmpl: 'Allows deleting %s users.' },
  { match: /Позволяет просматривать список пользователей (из сервиса )?(Cloud .+)\./, tmpl: 'Allows listing %s users.' },
  { match: /Позволяет изменять данные пользователей (Cloud .+)\./, tmpl: 'Allows changing %s user data.' },
  { match: /Позволяет изменять данные пользователя сервиса (Cloud .+)\./, tmpl: 'Allows changing %s service user data.' },
  { match: /Позволяет просматривать историю изменения учетных записей (Cloud .+)\./, tmpl: 'Allows viewing the change history of %s accounts.' },
  { match: /Позволяет просматривать историю изменения учетных записей\./, tmpl: 'Allows viewing the change history of %s accounts.' },
  { match: /Позволяет добавлять роли пользователей (Lakekeeper)\./, tmpl: 'Allows adding %s user roles.' },
  // Backup patterns
  { match: /Позволяет запускать резервное копирование (Cloud .+) вручную\./, tmpl: 'Allows manually starting %s backup.' },
  // Name patterns
  { match: /Позволяет изменять название или описание (Airflow|Trino|Kafka \(legacy\))\./, tmpl: 'Allows changing the %s name or description.' },
  { match: /Позволяет изменять название или описание (.+)\./, tmpl: 'Allows changing the %s name or description.' },
  // Balancer patterns
  { match: /Позволяет изменять внутренний IP-адрес балансировщика и порты эндпоинтов (.+)\./, tmpl: 'Allows changing the load balancer internal IP address and %s endpoint ports.' },
  // Settings patterns
  { match: /Позволяет изменять настройки (СУБД .+)\./, tmpl: 'Allows changing %s settings.' },
  { match: /Позволяет просматривать настройки (СУБД .+)\./, tmpl: 'Allows viewing %s settings.' },
  { match: /Позволяет просматривать историю изменения настроек (СУБД .+)\./, tmpl: 'Allows viewing the change history of %s settings.' },
  { match: /Позволяет обновлять версию (СУБД .+)\./, tmpl: 'Allows updating the %s version.' },
  // Maintenance patterns
  { match: /Позволяет изменять настройки обслуживания инстанса (.+): .+\./, tmpl: 'Allows changing %s instance maintenance settings: backup time, operation schedule, etc.' },
  // Service instance patterns
  { match: /Позволяет просматривать историю изменения расширений\./, tmpl: 'Allows viewing the change history of %s extensions.' },
  { match: /Позволяет скачивать резервные копии (.+)\./, tmpl: 'Allows downloading %s backups.' },
  { match: /Позволяет скачивать резервную копию\./, tmpl: 'Allows downloading a %s backup.' },
  { match: /Позволяет просматривать историю изменения резервных копий\./, tmpl: 'Allows viewing the change history of %s backups.' },
  { match: /Позволяют просматривать историю изменения резервных копий\./, tmpl: 'Allows viewing the change history of %s backups.' },
  { match: /Позволяет создавать инстансы (сервиса )?(Cloud .+)\./, tmpl: 'Allows creating %s instances.' },
  { match: /Позволяет удалять инстансы (сервиса )?(Cloud .+)\./, tmpl: 'Allows deleting %s instances.' },
  { match: /Позволяет просматривать список инстансов (сервиса )?(Cloud .+)\./, tmpl: 'Allows listing %s instances.' },
  { match: /Позволяет перезагружать инстансы (сервиса )?(Cloud .+)\./, tmpl: 'Allows restarting %s instances.' },
  { match: /Позволяет увеличивать размер диска инстансов (Cloud .+)\./, tmpl: 'Allows increasing the disk size of %s instances.' },
  { match: /Позволяет увеличивать размер диска инстанса (.+)\./, tmpl: 'Allows increasing the disk size of a %s instance.' },
  { match: /Позволяет увеличивать объем диска инстанса (.+)\./, tmpl: 'Allows increasing the disk volume of a %s instance.' },
  { match: /Позволяет увеличивать объем дисков инстанса (.+)\./, tmpl: 'Allows increasing the disk volume of a %s instance.' },
  { match: /Позволяет увеличивать диски инстанса (.+)\./, tmpl: 'Allows increasing the disk volume of a %s instance.' },
  { match: /Позволяет увеличивать размер диска в инстансе\./, tmpl: 'Allows increasing the disk size in the instance.' },
  { match: /Позволяет обновлять версию продукта (.+) в инстансе\./, tmpl: 'Allows updating the %s product version in the instance.' },
  { match: /Позволяет обновлять версию продукта (Cloud .+)\./, tmpl: 'Allows updating the %s product version.' },
  { match: /Позволяет просматривать свойства инстанса (Cloud .+)\./, tmpl: 'Allows viewing %s instance properties.' },
  { match: /Позволяет просматривать свойства инстансов (Cloud .+)\./, tmpl: 'Allows viewing %s instance properties.' },
  { match: /Позволяет просматривать свойства инстанса\./, tmpl: 'Allows viewing %s instance properties.' },
  { match: /Позволяет просматривать свойства инстансов\./, tmpl: 'Allows viewing %s instance properties.' },
  { match: /Позволяет просматривать историю изменения экземпляра (Cloud .+)\./, tmpl: 'Allows viewing the %s instance change history.' },
  { match: /Позволяет просматривать историю изменения экземпляра\./, tmpl: 'Allows viewing the %s instance change history.' },
  { match: /Позволяет просматривать журналы событий (Cloud .+)\./, tmpl: 'Allows viewing %s event logs.' },
  { match: /Позволяет просматривать журналы событий инстанса сервиса\./, tmpl: 'Allows viewing event logs of the %s service instance.' },
  { match: /Позволяет просматривать журналы событий инстанса (Cloud .+)\./, tmpl: 'Allows viewing %s instance event logs.' },
  { match: /Позволяет просматривать журналы событий\./, tmpl: 'Allows viewing %s event logs.' },
  { match: /Позволяет просматривать события инстанса\./, tmpl: 'Allows viewing %s instance events.' },
  { match: /Позволяет просматривать события в инстансе сервиса\./, tmpl: 'Allows viewing events in the %s service instance.' },
  { match: /Позволяет просматривать события по инстансу (.+)\./, tmpl: 'Allows viewing %s instance events.' },
  { match: /Позволяет просматривать события Spark в инстансе\./, tmpl: 'Allows viewing Spark events in the instance.' },
  { match: /Позволяет просматривать показатели мониторинга (Cloud .+)\./, tmpl: 'Allows viewing %s monitoring metrics.' },
  { match: /Позволяет просматривать показатели мониторинга\./, tmpl: 'Allows viewing %s monitoring metrics.' },
  { match: /Позволяет управлять вертикальным или горизонтальным масштабированием инстанса (Cloud .+)\./, tmpl: 'Allows managing vertical or horizontal scaling of the %s instance. Any changes to the number of CPUs/RAM are allowed.' },
  { match: /Позволяет управлять горизонтальным или вертикальным масштабированием инстансов (Cloud .+)\./, tmpl: 'Allows managing horizontal or vertical scaling of %s instances. Any changes to the number of CPUs/RAM are allowed.' },
  { match: /Позволяет управлять горизонтальным и вертикальным масштабированием инстанца (Spark)\./, tmpl: 'Allows managing horizontal and vertical scaling of the %s instance. Any changes to the number of CPUs/RAM are allowed.' },
  { match: /Позволяет управлять горизонтальным и вертикальным масштабированием инстанса (Spark)\./, tmpl: 'Allows managing horizontal and vertical scaling of the %s instance. Any changes to the number of CPUs/RAM are allowed.' },
  { match: /Позволяет управлять горизонтальным или вертикальным масштабированием инстанса (.+)\./, tmpl: 'Allows managing horizontal or vertical scaling of the %s instance. Any changes to the number of CPUs/RAM are allowed.' },
  { match: /Позволяет управлять горизонтальным или вертикальным масштабированием инстансов (.+)\./, tmpl: 'Allows managing horizontal or vertical scaling of %s instances. Any changes to the number of CPUs/RAM are allowed.' },
  { match: /Позволяют управлять горизонтальным или вертикальным масштабированием инстанса (.+)\./, tmpl: 'Allows managing horizontal or vertical scaling of the %s instance. Any changes to the number of CPUs/RAM are allowed.' },
  { match: /Позволяют управлять горизонтальным или вертикальным масштабированием инстансов (.+)\./, tmpl: 'Allows managing horizontal or vertical scaling of %s instances. Any changes to the number of CPUs/RAM are allowed.' },
  { match: /Позволяет управлять масштабированием инстансов (.+)\./, tmpl: 'Allows managing scaling of %s instances.' },
  { match: /Позволяет управлять масштабированием инстансов\./, tmpl: 'Allows managing scaling of instances.' },
  { match: /Позволяет управлять вертикальным или горизонтальным масштабированием инстанса\./, tmpl: 'Allows managing vertical or horizontal scaling of the instance. Any changes to the number of CPUs/RAM are allowed.' },
  { match: /Позволяет управлять горизонтальным или вертикальным масштабированием инстансов\./, tmpl: 'Allows managing horizontal or vertical scaling of instances. Any changes to the number of CPUs/RAM are allowed.' },
  { match: /Позволяют управлять вертикальным или горизонтальным масштабированием\./, tmpl: 'Allows managing vertical or horizontal scaling. Any changes to the number of CPUs/RAM are allowed.' },
  { match: /Позволяют управлять горизонтальным или вертикальным масштабированием\./, tmpl: 'Allows managing horizontal or vertical scaling. Any changes to the number of CPUs/RAM are allowed.' },
  { match: /Позволяет управлять вертикальным или горизонтальным масштабированием\./, tmpl: 'Allows managing vertical or horizontal scaling. Any changes to the number of CPUs/RAM are allowed.' },
  { match: /Позволяет управлять горизонтальным или вертикальным масштабированием\./, tmpl: 'Allows managing horizontal or vertical scaling. Any changes to the number of CPUs/RAM are allowed.' },
  { match: /Позволяет управлять масштабированием\./, tmpl: 'Allows managing scaling.' },
  { match: /Позволяет масштабировать инстанс (.+) вертикально или горизонтально\./, tmpl: 'Allows scaling the %s instance vertically or horizontally.' },
  { match: /Позволяет масштабировать инстансы (.+) вертикально или горизонтально\./, tmpl: 'Allows scaling %s instances vertically or horizontally.' },
  { match: /Позволяют масштабировать инстансы (.+) вертикально или горизонтально\./, tmpl: 'Allows scaling %s instances vertically or horizontally.' },
  { match: /Позволяет масштабировать инстанс сервиса\./, tmpl: 'Allows scaling the %s service instance vertically or horizontally.' },
  { match: /Позволяют масштабировать инстанс сервиса\./, tmpl: 'Allows scaling the %s service instance vertically or horizontally.' },
  { match: /Позволяет управлять масштабированием инстансов\./, tmpl: 'Allows managing scaling of instances.' },
  { match: /Позволяет управлять настройками обслуживания инстансов (Cloud .+)\./, tmpl: 'Allows managing %s instance maintenance settings.' },
  { match: /Позволяет управлять масштабированием инстансов (Cloud .+)\./, tmpl: 'Allows managing scaling of %s instances.' },
  // SQL query patterns
  { match: /Позволяет выполнять SQL-запросы к БД (.+)\. Для подключения используются имя пользователя БД и его пароль\./, tmpl: 'Allows executing SQL queries against the %s database. Database username and password are used for connection.' },
  { match: /Позволяет выполнять SQL-запросы к БД (.+)\./, tmpl: 'Allows executing SQL queries against the %s database. Database username and password are used for connection.' },
  { match: /Позволяет отменить запрос к БД (.+)\./, tmpl: 'Allows canceling a query to the %s database.' },
  { match: /Позволяет получать список исполняемых запросов к БД (.+)\./, tmpl: 'Allows listing queries being executed against the %s database.' },
  // Connection patterns
  { match: /Позволяют устанавливать подключения к (.+)\./, tmpl: 'Allows installing %s connections.' },
  { match: /Позволяет устанавливать подключения к (.+)\./, tmpl: 'Allows installing %s connections.' },
  { match: /Позволяет просматривать список подключений к (.+)\./, tmpl: 'Allows listing %s connections.' },
  { match: /Позволяет удалять подключения к (.+)\./, tmpl: 'Allows uninstalling %s connections.' },
  { match: /Позволяет обновлять подключения к (.+)\./, tmpl: 'Allows updating %s connections.' },
  { match: /Позволяет просматривать историю изменения настроек подключений (.+)\./, tmpl: 'Allows viewing the change history of %s connection settings.' },
  // Mirror
  { match: /Позволяет создать новое mirror-подключение к (.+)\./, tmpl: 'Allows creating a new %s mirror connection.' },
  { match: /Позволяет удалить mirror-подключение (.+)\./, tmpl: 'Allows deleting a %s mirror connection.' },
  { match: /Позволяет получить список mirror-подключений (.+)\./, tmpl: 'Allows listing %s mirror connections.' },
  // GUI
  { match: /Позволяет получить доступ к графическому интерфейсу (.+)\./, tmpl: 'Allows accessing the %s graphical interface.' },
  // Extensions
  { match: /Позволяет устанавливать расширения (.+)\./, tmpl: 'Allows installing %s extensions.' },
  { match: /Позволяет просматривать список расширений (.+)\./, tmpl: 'Allows listing %s extensions.' },
  { match: /Позволяет удалять расширения (.+)\./, tmpl: 'Allows uninstalling %s extensions.' },
  // DB patterns
  { match: /Позволяет создавать новую БД (.+)\./, tmpl: 'Allows creating a new %s database.' },
  { match: /Позволяет удалять БД (.+)\./, tmpl: 'Allows deleting %s databases.' },
  { match: /Позволяет просматривать список БД (.+)\./, tmpl: 'Allows listing %s databases.' },
  { match: /Позволяет просматривать список резервных копий (.+)\./, tmpl: 'Allows listing %s backups.' },
  { match: /Позволяет восстанавливать БД (.+)\./, tmpl: 'Allows restoring a %s database from a backup to a new cluster.' },
  // CruiseControl
  { match: /Позволяет изменять настройки инструмента CruiseControl для управления высоконагруженными кластерами в сервисе (.+)\./, tmpl: 'Allows changing CruiseControl tool settings for managing high-load clusters in the %s service.' },
  // Service instance (generic)
  { match: /Позволяет создавать инстансы сервиса\./, tmpl: 'Allows creating %s service instances.' },
  { match: /Позволяет удалять инстансы сервиса\./, tmpl: 'Allows deleting %s service instances.' },
  { match: /Позволяет просматривать список инстансов сервиса\./, tmpl: 'Allows listing %s service instances.' },
  { match: /Позволяет перезагружать инстансы сервиса\./, tmpl: 'Allows restarting %s service instances.' },
  { match: /Позволяет увеличивать объем диска в инстансе сервисе\./, tmpl: 'Allows increasing the disk volume in a %s service instance.' },
  { match: /Позволяет просматривать свойства инстансов сервиса\./, tmpl: 'Allows listing %s service instance properties.' },
  { match: /Позволяет просматривать журналы событий инстанса сервиса\./, tmpl: 'Allows viewing event logs of the %s service instance.' },
  { match: /Позволяет просматривать события в инстансе сервиса\./, tmpl: 'Allows viewing events in the %s service instance.' },
  { match: /Позволяет просматривать события инстанса\./, tmpl: 'Allows viewing %s instance events.' },
  // Instance (generic)
  { match: /Позволяет создавать инстансы\./, tmpl: 'Allows creating %s instances.' },
  { match: /Позволяет удалять инстансы\./, tmpl: 'Allows deleting %s instances.' },
  { match: /Позволяет просматривать список инстансов\./, tmpl: 'Allows listing %s instances.' },
  { match: /Позволяет перезагружать инстансы\./, tmpl: 'Allows restarting %s instances.' },
  { match: /Позволяет увеличивать размер дисков инстанса\./, tmpl: 'Allows increasing the disk size of a %s instance.' },
  { match: /Позволяет увеличивать объем дисков инстанса\./, tmpl: 'Allows increasing the disk volume of a %s instance.' },
  { match: /Позволяет увеличивать размер диска в инстансе\./, tmpl: 'Allows increasing the disk size in the instance.' },
  { match: /Позволяет обновлять версию продукта\./, tmpl: 'Allows updating the %s product version in the instance.' },
  // User (generic)
  { match: /Позволяет добавлять пользователей в сервис\./, tmpl: 'Allows adding users to the %s service.' },
  { match: /Позволяет удалять пользователей из сервиса\./, tmpl: 'Allows deleting users from the %s service.' },
  { match: /Позволяет просматривать список пользователей сервиса\./, tmpl: 'Allows listing %s service users.' },
  { match: /Позволяет изменять данные пользователя сервиса\./, tmpl: 'Allows changing %s service user data.' },
  { match: /Позволяет добавлять пользователей\./, tmpl: 'Allows adding %s users.' },
  { match: /Позволяет удалять пользователей\./, tmpl: 'Allows deleting %s users.' },
  { match: /Позволяет просматривать список пользователей\./, tmpl: 'Allows listing %s users.' },
  { match: /Позволяет изменять данные пользователей\./, tmpl: 'Allows changing %s user data.' },
  // Connection (generic)
  { match: /Позволяет устанавливать подключения\./, tmpl: 'Allows installing %s connections.' },
  { match: /Позволяют устанавливать подключения\./, tmpl: 'Allows installing %s connections.' },
  { match: /Позволяет просматривать список подключений\./, tmpl: 'Allows listing %s connections.' },
  { match: /Позволяет удалять подключения\./, tmpl: 'Allows uninstalling %s connections.' },
  { match: /Позволяет обновлять подключения\./, tmpl: 'Allows updating %s connections.' },
  { match: /Позволяет просматривать историю изменения настроек подключений\./, tmpl: 'Allows viewing the change history of %s connection settings.' },
  // DBMS
  { match: /Позволяет изменять настройки СУБД\./, tmpl: 'Allows changing %s DBMS settings.' },
  { match: /Позволяет просматривать настройки СУБД\./, tmpl: 'Allows viewing %s DBMS settings.' },
  { match: /Позволяет просматривать историю изменения настроек СУБД\./, tmpl: 'Allows viewing the change history of %s DBMS settings.' },
  { match: /Позволяет обновлять версию СУБД\./, tmpl: 'Allows updating the %s DBMS version in the instance.' },
  // Generic balancer
  { match: /Позволяет изменять внутренний IP-адрес балансировщика и порты эндпоинтов\./, tmpl: 'Allows changing the load balancer internal IP address and %s endpoint ports.' },
  // Generic extension history
  { match: /Позволяет просматривать историю изменения расширений\./, tmpl: 'Allows viewing the change history of %s extensions.' },
  { match: /Позволяет скачивать резервную копию\./, tmpl: 'Allows downloading a %s backup.' },
  { match: /Позволяет просматривать историю изменения резервных копий\./, tmpl: 'Allows viewing the change history of %s backups.' },
  { match: /Позволяют просматривать историю изменения резервных копий\./, tmpl: 'Allows viewing the change history of %s backups.' },
];

// Service line patterns
const servicePatterns = [
  {
    match: (l) => l.startsWith('В сервисе Cloud Logging') && l.includes('генерировать'),
    result: 'In the Cloud Logging service, the role allows viewing logs and generating credentials.'
  },
  {
    match: (l) => l.startsWith('В сервисе Cloud Logging'),
    result: 'In the Cloud Logging service, the role allows viewing logs.'
  },
  {
    match: (l) => l.startsWith('В сервисе Cloud Monitoring') && l.includes('создавать и редактировать'),
    result: 'In the Cloud Monitoring service, the role allows viewing, creating and editing dashboards, and writing to the monitoring system.'
  },
  {
    match: (l) => l.startsWith('В сервисе Cloud Monitoring') && l.includes('дашборды и делать запись'),
    result: 'In the Cloud Monitoring service, the role allows viewing dashboards and writing to the monitoring system.'
  },
  {
    match: (l) => l.startsWith('В сервисе Cloud Monitoring'),
    result: 'In the Cloud Monitoring service, the role allows viewing dashboards.'
  },
  {
    match: (l) => l.startsWith('В сервисе Cloud Audit') && l.includes('проекта и выгружать'),
    result: 'In the Cloud Audit service, the role allows viewing all project events and exporting this data.'
  },
  {
    match: (l) => l.startsWith('В сервисе Cloud Audit') && l.includes('биллинга'),
    result: 'In the Cloud Audit service, the role allows viewing billing events and the user own actions, and exporting this data.'
  },
  {
    match: (l) => l.startsWith('В сервисе Cloud Audit') && l.includes('IAM'),
    result: 'In the Cloud Audit service, the role allows viewing events of the IAM service and the user own actions.'
  },
  {
    match: (l) => l.startsWith('В сервисе Cloud Audit'),
    result: 'In the Cloud Audit service, the role allows viewing service events and the user own actions, as well as exporting this data.'
  },
  {
    match: (l) => l.startsWith('В сервисе Managed Containers'),
    result: 'In the Managed Containers service, the role allows viewing information about the cluster and node groups, and obtaining a secret for Headlamp access.'
  },
];

// Role definition patterns
const rolePatterns = [
  { match: (l) => l === 'Роль, предназначенная для управления участниками проекта на странице управления доступами.' || l === 'Роль, предназначенная для управления участниками проекта на странице управления доступами', result: 'A role designed for managing project members on the access management page.' },
  { match: (l) => l.startsWith('Роль предоставляет полный доступ к управлению виртуальными машинами в Cloud Servers'), result: 'The role provides full access to managing virtual machines in Cloud Servers, including creation, modification, and deletion. Also provides full access to managing networks in Cloud Network.' },
  { match: (l) => l.startsWith('Роль используется только для работы с уже созданными виртуальными машинами Cloud Servers и сетями Cloud Networks'), result: 'The role is used only for working with already created Cloud Servers virtual machines and Cloud Networks networks:' },
  { match: (l) => l.startsWith('Роль позволяет создавать, изменять и удалять списки контроля доступа'), result: 'The role allows creating, modifying, and deleting access control lists (ACLs).' },
  { match: (l) => l.startsWith('Роль, которая предоставляет разрешения на управление всеми ресурсами проекта'), result: 'A role that provides permissions to manage all project resources.' },
  { match: (l) => l.startsWith('Роль с максимальным набором прав на проекте'), result: 'The role with the most comprehensive set of permissions in the project.' },
  { match: (l) => l.startsWith('Роль, которая предоставляет все разрешения на управление балансом и функциями биллинга'), result: 'A role that provides all permissions to manage the balance and billing features.' },
  { match: (l) => l.startsWith('Роль, предназначенная'), result: 'A role designed for' },
  { match: (l) => l.startsWith('Роль не предоставляет доступ к Cloud Audit'), result: 'The role does not provide access to the Cloud Audit service.' },
  { match: (l) => l.startsWith('Роль не предоставляет доступ к Cloud Monitoring'), result: 'The role does not provide access to the Cloud Monitoring service.' },
  { match: (l) => l.startsWith('Роль не предоставляет доступ'), result: 'The role does not provide access.' },
];

function translateLine(line) {
  // Strip CR and whitespace
  const trimmed = line.replace(/\r/g, '').replace(/(^\s+|\s+$)/g, '');
  if (!trimmed) return '';

  // Name pattern
  if (trimmed.includes('Название в личном кабинете:')) {
    return translateNameLine(trimmed);
  }

  // Service patterns
  for (const sp of servicePatterns) {
    if (sp.match(trimmed)) return sp.result;
  }

  // Role patterns
  for (const rp of rolePatterns) {
    if (rp.match(trimmed)) return rp.result;
  }

  // "Роль позволяет" -> "The role allows"
  if (trimmed.startsWith('Роль позволяет')) {
    return translateRoleAllows(trimmed);
  }

  // "Позволяет" / "Позволяют" patterns
  if (trimmed.startsWith('Позволяет') || trimmed.startsWith('Позволяют')) {
    // Check for "Позволяют" (plural)
    const isPlural = trimmed.startsWith('Позволяют');

    for (const p of patterns) {
      const m = trimmed.match(p.match);
      if (m) {
        // Use the first capture group as the product/service name, or 'the' if no groups
        let product = m[1] || 'the';
        // Normalize product names: strip "БД " prefix (cyrillic) and "DB " prefix
        product = product.replace(/^(БД|DB)\s+/, '');
        return (p.tmpl || p.result).replace('%s', product);
      }
    }

    // Fallback: use verb mapping
    if (trimmed.startsWith('Позволяет') || trimmed.startsWith('Позволяют')) {
      const firstWord = trimmed.startsWith('Позволяют') ? 'Позволяют' : 'Позволяет';
      const rest = trimmed.substring(firstWord.length).replace(/^\s+/, '');
      if (rest) {
        const translated = translateVerb(rest);
        return firstWord === 'Позволяют' ? 'Allow ' + translated.charAt(0).toUpperCase() + translated.substring(1) : 'Allows ' + translated;
      }
    }
  }

  return trimmed;
}

const input = fs.readFileSync('docs/ru/_includes/_iam_permissions.md', 'utf8');
const lines = input.split('\n');
const out = lines.map(l => translateLine(l));
fs.writeFileSync('docs/en/_includes/_iam_permissions.md', out.join('\n'), 'utf8');
console.log('Done! Translated', lines.length, 'lines.');

// Count remaining Russian words
const remaining = out.filter(l => l.includes('Позволяет') || l.includes('allowing') || l.includes('позволяет')).length;
console.log('Lines still containing "Позволяет":', remaining);

// Show remaining Russian lines for debugging
const russianLines = out.filter(l => /[а-яА-Я]/.test(l));
if (russianLines.length > 0 && russianLines.length < 50) {
  console.log('\nLines with Russian characters:', russianLines.length);
  console.log('---');
  russianLines.forEach(l => console.log(l.substring(0, 200)));
}
