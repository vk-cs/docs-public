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
    // UuidSnapshotIntegrityChecker,
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
    // UuidSnapshotPreparer,
    SatoriIndexPreparer,
    SitemapPreparer,
} from '@vk-tech/d11n-preparer/preparers';

import { config as docsConfig } from './docs.config.mjs';

const satoriBaseUrl = `${(process.env.D11N_PORTAL_URL || '')}${docsConfig.paths.basePath}`;

const TARGET_ENV = process.env.TARGET_ENV || 'localhost';

console.debug('TARGET_ENV', TARGET_ENV);
console.debug('SETTINGS', {
    settings: {
        satoriIndexPreparer: {
            apiKey: (process.env?.SATORI_API_KEY || '').length,
            baseUrl: satoriBaseUrl,
        },
    }
});

const checkup = [
    LinksWithHashChecker, // Проверка ссылок с хешем на портале
    LaunchPreparer,
    FolderStructureChecker,
    MetaParamUuidPreparer,
    OriginalTreeCachePreparer,
    SatoriIndexPreparer, // Индексация для Satori
];

export const config = {
    docsRelativePath: null, // Абсолютный путь до папки с исходниками документации, если null, то ./docs
    dataRelativePath: './.data', // Абсолютный путь до папки с результатами подготовки файлами, если null, то ./preparationData
    publicRelativePath: null, // Путь до папки со 'статикой', если null, то ./public/_docs
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
            // UuidSnapshotIntegrityChecker, // Проверяем целостность коллекции uuid из .meta.json файлов
            // UuidSnapshotPreparer, // Создаём snapshot всех uuid (для checker:UuidSnapshotIntegrityChecker)
            // RedirectSnapshotPreparer, // Создаём snapshot для проверки редиректов (test:RedirectChecker)
            MetaParamRelativeSectionsChecker, // Проверяем meta-параметр relativeSections, корректность ссылок
            MetaParamIntroChecker, // Проверяем meta-параметр intro, корректность ссылок
            PreprocIncludeChecker, // Проверяем корректность использования {include(path)} в .md файлах
            PreprocVariablesChecker, // Проверяем корректность использования {var(foo)} в .md файлах
            AssetFileNamesChecker, // Проверяем корректность имён файлов в папках assets
            PublicAssetsPreparer, // Переносим статичные файлы из папок "assets" в публичную директорию
            LinktoCachePreparer, // Подготавливаем кэш для linkTo препроцессора
            SearchIndexPreparer, // Создаём индекс для поиска
            ExternalFolderChecker, // Проверяем схему и корректность ссылок для файлов в папке external/sections
            LinksPreparer, // Подготовка служебных файлов для test:LinksChecker
            LinksChecker, // Подготовка служебных файлов для test:LinksChecker
            SitemapPreparer, // Создаём sitemap.xml ил robots.txt
        ],
        // Проверка портала после запуска
        // npx preparer start checkup
        checkup,
    },
    settings: {
        satoriIndexPreparer: {
            apiBaseUrl: process.env.SATORI_API_URL || '',
            baseUrl: satoriBaseUrl,
            apiKey: process.env.SATORI_API_KEY || '',
        },
        sitemapPreparer: {
            useIndex: true,
            sitemaps: [
                'https://cloud.vk.com/docs/sitemap.xml',
                'https://cloud.vk.com/docs/on-premises/private-cloud/sitemap.xml',
                'https://cloud.vk.com/docs/on-premises/dev-platform/sitemap.xml',
                'https://cloud.vk.com/docs/on-premises/registry/sitemap.xml',
                'https://cloud.vk.com/docs/on-premises/security-gate/sitemap.xml',
            ],
        },
    }
};