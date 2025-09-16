import {
    AssetFileNamesChecker,
    FolderStructureChecker,
    LinksChecker,
    LinksWithHashChecker,
    MetaFilesChecker,
    MetaParamIntroChecker,
    ExternalFolderChecker,
    MetaParamRelativeSectionsChecker,
    MetaParamUuidChecker,
    PreprocIncludeChecker,
    PreprocVariablesChecker,
    UuidSnapshotIntegrityChecker,
} from '@vk-tech/d11n-preparer/checkers';
import {
    DocsConfigForNextPreparer,
    LaunchPreparer,
    LinksPreparer,
    LinktoCachePreparer,
    MetaParamUuidPreparer,
    OriginalTreeCachePreparer,
    RedirectSnapshotPreparer,
    PublicAssetsPreparer,
    SearchIndexPreparer,
    UuidSnapshotPreparer,
    SatoriIndexPreparer,
} from '@vk-tech/d11n-preparer/preparers';

const satoriSupportedEnvs = ['production'];
const TARGET_ENV = process.env.TARGET_ENV || 'localhost';

console.debug('TARGET_ENV', TARGET_ENV);
console.debug('SETTINGS', {
    settings: {
        satoriIndexPreparer: {
            apiBaseUrl: process.env.SATORI_API_URL ?? '',
            baseUrl: process.env.SATORI_BASE_URL ?? '',
            apiKey: (process.env?.SATORI_API_KEY || '').length,
        },
    }
});

export const config = {
    docsRelativePath: null, // Абсолютный путь до папки с исходниками документации, если null, то ./docs
    dataRelativePath: './.data', // Абсолютный путь до папки с результатами подготовки файлами, если null, то ./preparationData
    publicAssetsRelativePath: null, // Абсолютный путь до папки со "статикой", если null, то ./public/_docs
    commands: {
        // Подготовка документации к запуску портала
        // npx preparer start prepare
        prepare: [
            LaunchPreparer, // Создаем конфиг файл с partitions
            FolderStructureChecker, // Проверяем иерархию файлов и папок документации
            MetaFilesChecker, // Проверяем .meta.json файлы на соответствие схемам
            DocsConfigForNextPreparer, // Создаём .json версию конфига docs.config.js для next.js
            MetaParamUuidPreparer, // Заполняем meta-параметр uuid для новых статей
            MetaParamUuidChecker, // Проверяем meta-параметр uuid
            OriginalTreeCachePreparer, // Создаём кэш оригинального дерева
            UuidSnapshotIntegrityChecker, // Проверяем целостность коллекции uuid из .meta.json файлов
            UuidSnapshotPreparer, // Создаём snapshot всех uuid (для checker:UuidSnapshotIntegrityChecker)
            RedirectSnapshotPreparer, // Создаём snapshot для проверки редиректов (test:RedirectChecker)
            MetaParamRelativeSectionsChecker, // Проверяем meta-параметр relativeSections, корректность ссылок
            MetaParamIntroChecker, // Проверяем meta-параметр intro, корректность ссылок
            PreprocIncludeChecker, // Проверяем корректность использования {include(path)} в .md файлах
            PreprocVariablesChecker, // Проверяем корректность использования {var(foo)} в .md файлах
            AssetFileNamesChecker, // Проверяем корректность имён файлов в папках assets
            PublicAssetsPreparer, // Переносим статичные файлы из папок "assets" в публичную директорию
            LinktoCachePreparer, // Подготавливаем кэш для linkTo препроцессора
            SearchIndexPreparer, // Создаём индекс для поиска
            // ArticleDatesPreparer, // Актуализируем даты (создание/изменение) у статей
            ExternalFolderChecker, // Проверяем схему и корректность ссылок для файлов в папке external/sections
            LinksPreparer, // Подготовка служебных файлов для test:LinksChecker
            LinksChecker, // Подготовка служебных файлов для test:LinksChecker
        ],
        // Проверка портала после запуска
        // npx preparer start checkup
        checkup: [
            LinksWithHashChecker, // Проверка ссылок с хешем на портале
            // ...(satoriSupportedEnvs.includes(TARGET_ENV) ? [LaunchPreparer, FolderStructureChecker, MetaParamUuidPreparer, OriginalTreeCachePreparer, SatoriIndexPreparer]: [])
        ],
    },
    settings: {
        satoriIndexPreparer: {
            apiBaseUrl: process.env.SATORI_API_URL ?? '',
            baseUrl: process.env.SATORI_BASE_URL ?? '',
            apiKey: process.env.SATORI_API_KEY || '',
        },
    }
};