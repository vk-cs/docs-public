export const config = {
    docsFullPath: null, // Абсолютный путь до папки с исходниками документации, если null, то ./docs
    dataFullPath: './.data', // Абсолютный путь до папки с результатами подготовки файлами, если null, то ./preparationData
    checkers: [
        'RedirectsChecker', // Проверяем работоспособность системы редиректов
        'SiteMapChecker', // Ищем страницы с 404 ошибкой (страница не найдена)
        'ArticleLinksChecker', // Проверяем работоспособность ссылок в статьях документации
    ],
};
