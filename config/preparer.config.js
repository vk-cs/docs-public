export const config = {
    docsFullPath: null, // Абсолютный путь до папки с исходниками документации, если null, то ./docs
    resultFullPath: './.data', // Абсолютный путь до папки с результатами подготовки файлами, если null, то ./preparationData
    publicAssetsFullPath: null, // Абсолютный путь до папки со "статикой", если null, то ./public/_docs
    preparers: [
        'VersionMetaFilesPreparer', // Подготавливаем разделы с версиями
        'FolderStructureChecker', // Проверяем иерархию файлов и папок документации
        'MetaFilesChecker', // Проверяем .meta.json файлы на соответствие схемам
        'DocsConfigForNextPreparer', // Создаём .json версию конфига docs.config.js для next.js
        'MetaParamUuidPreparer', // Заполняем meta-параметр uuid для новых статей
        'MetaParamUuidChecker', // Проверяем meta-параметр uuid
        'OriginalTreeCachePreparer', // Создаём кэш оригинального дерева
        'UuidSnapshotIntegrityChecker', // Проверяем целостность коллекции uuid из .meta.json файлов
        'UuidSnapshotPreparer', // Создаём snapshot всех uuid (для checker:UuidSnapshotIntegrityChecker)
        'RedirectSnapshotPreparer', // Создаём snapshot для проверки редиректов (checker:RedirectHealthChecker)
        'MetaParamFaqLinksChecker', // Проверяем meta-параметр faqLinks, корректность указанных ссылок
        'MetaParamInfobarItemsChecker', // Проверяем meta-параметр infobarItems, корректность ссылок и иконок
        'PreprocIncludeChecker', // Проверяем корректность использования {include(path)} в .md файлах
        'PreprocVariablesChecker', // Проверяем корректность использования {var(foo)} в .md файлах
        'AssetFileNamesChecker', // Проверяем корректность имён файлов в папках assets
        'PublicAssetsPreparer', // Переносим статичные файлы из папок "assets" в публичную директорию
        'LinktoCachePreparer', // Подготавливаем кэш для linkTo препроцессора
        'SearchIndexPreparer', // Создаём индекс для поиска
        'ArticleDatesPreparer', // Актуализируем даты (создание/изменение) у статей
        'ExternalFolderChecker', // Проверяем схему и корректность ссылок для файлов в папке external/sections
        'ArticleLinksPreparer', // Подготовка служебных файлов для checker:ArticleLinksHealthChecker
        'SiteMapPreparer', // Подготовка служебных файлов для checker:SiteMapHealthChecker
    ],
};
