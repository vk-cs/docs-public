import { tableOfContents as toc1 } from './user-guide-private.toc.js'; // Импорт содержания, который прописан в файле user-guide-private.toc.js.
import { tableOfContents as toc2 } from './user-guide-private-pg.toc.js'; // Импорт содержания, который прописан в файле user-guide-private-pg.toc.js.
import { tableOfContents as toc3 } from './user-guide-private-cert.toc.js'; // Импорт содержания, который прописан в файле user-guide-cer.toc.js.
import { tableOfContents as toc4 } from './user-guide-s3.toc.js'; // Импорт содержания, который прописан в файле user-guide-s3.toc.js.
import { tableOfContents as toc5 } from './user-guide-data-p.toc.js'; // Импорт содержания, который прописан в файле user-guide-data-p.toc.js.

export const config = {
    docsRelativePath: null, // Абсолютный путь до папки с исходниками документации, если null, то ./docs
    resultRelativePath: '/d11n-data/result', // Абсолютный путь до папки с временными файлами, если null, то ./tmp
    documents: [
        { // Первый документ
            buildPoints: ['private-pdf'], // Для каких окружений собрать документ
            description: 'Руководство пользователя', // Заголовок документа, нужен только для вывода в консоли при сборке (поле Description)
            key: 'user-guide-private', // Ключ сборки, необходим для сборки документа в docker
            htmlTemplate: null, // Какой шаблон для html использовать, необязательное поле
            fodtTemplate: 'fodt-template', // Какой fodt-шаблон использовать для сборки PDF/DOCX
            fodtParams: {
                designSet: 'pricloud',
                system: 'VK Private Cloud',
                doctitle: 'Руководство пользователя', // Название документа. Используется для формирования имения файла и выводится на титульной странице
                revnumber1: `Версия ${process.env?.CI_COMMIT_REF_NAME ?? ' 0.0.0'}` ?? 'Версия 0.0.0', // Переменная, отвечающая за версию документа. Выводится на титульной странице
                revdate1: process.env?.date1 ?? ' от 12.09.2019', // Автоподстановка даты сборки документа. По умолчанию берется текущая системная дата. Если невозможно подхватить системную, подставляется 12.09.2019
            },
            tableOfContents: toc1, // Подстановка содержания из файла user-guide-private.toc.js
        },
        { // Второй документ
            buildPoints: ['private-pg-pdf'], // Для каких окружений собрать документ
            description: 'Руководство пользователя', // Заголовок документа, нужен только для вывода в консоли при сборке (поле Description)
            key: 'user-guide-private-pg', // Ключ сборки, необходим для сборки документа в docker
            htmlTemplate: null, // Какой шаблон для html использовать, необязательное поле
            fodtTemplate: 'fodt-template', // Какой fodt-шаблон использовать для сборки PDF/DOCX
            fodtParams: {
                designSet: 'pricloud',
                system: 'VK Private Cloud',
                doctitle: 'Руководство пользователя', // Название документа. Используется для формирования имения файла и выводится на титульной странице
                revnumber1: `Версия ${process.env?.CI_COMMIT_REF_NAME ?? ' 0.0.0'}` ?? 'Версия 0.0.0', // Переменная, отвечающая за версию документа. Выводится на титульной странице
                revdate1: process.env?.date1 ?? ' от 12.09.2019', // Автоподстановка даты сборки документа. По умолчанию берется текущая системная дата. Если невозможно подхватить системную, подставляется 12.09.2019
            },
            tableOfContents: toc1, // Подстановка содержания из файла user-guide-private.toc.js
        },
        { // Третий документ
            buildPoints: ['private-cert'], // Для каких окружений собрать документ
            description: 'Руководство пользователя', // Заголовок документа, нужен только для вывода в консоли при сборке (поле Description)
            key: 'user-guide-private-cert', // Ключ сборки, необходим для сборки документа в docker
            htmlTemplate: null, // Какой шаблон для html использовать, необязательное поле
            fodtTemplate: 'fodt-template', // Какой fodt-шаблон использовать для сборки PDF/DOCX
            fodtParams: {
                designSet: 'pricloud',
                system: 'Private Cloud от VK',
                doctitle: 'Руководство пользователя', // Название документа. Используется для формирования имения файла и выводится на титульной странице
                revnumber1: `Версия ${process.env?.CI_COMMIT_REF_NAME ?? ' 0.0.0'}` ?? 'Версия 0.0.0', // Переменная, отвечающая за версию документа. Выводится на титульной странице
                revdate1: process.env?.date1 ?? ' от 12.09.2019', // Автоподстановка даты сборки документа. По умолчанию берется текущая системная дата. Если невозможно подхватить системную, подставляется 12.09.2019
            },
            tableOfContents: toc3, // Подстановка содержания из файла user-guide-private-pg.toc.js
        },
        { // Четвертый документ
            buildPoints: ['s3-pdf'], // Для каких окружений собрать документ
            description: 'Руководство пользователя', // Заголовок документа, нужен только для вывода в консоли при сборке (поле Description)
            key: 'user-guide-s3', // Ключ сборки, необходим для сборки документа в docker
            htmlTemplate: null, // Какой шаблон для html использовать, необязательное поле
            fodtTemplate: 'fodt-template', // Какой fodt-шаблон использовать для сборки PDF/DOCX
            fodtParams: {
                designSet: 'storage',
                system: 'VK Object Storage',
                doctitle: 'Руководство пользователя', // Название документа. Используется для формирования имения файла и выводится на титульной странице
                revnumber1: `Версия ${process.env?.CI_COMMIT_REF_NAME ?? ' 0.0.0'}` ?? 'Версия 0.0.0', // Переменная, отвечающая за версию документа. Выводится на титульной странице
                revdate1: process.env?.date1 ?? ' от 12.09.2019', // Автоподстановка даты сборки документа. По умолчанию берется текущая системная дата. Если невозможно подхватить системную, подставляется 12.09.2019
            },
            tableOfContents: toc4, // Подстановка содержания из файла user-guide-s3.toc.js
        },
        { // Пятый документ
            buildPoints: ['data-p-pdf'], // Для каких окружений собрать документ
            description: 'Руководство пользователя', // Заголовок документа, нужен только для вывода в консоли при сборке (поле Description)
            key: 'user-guide-data-p', // Ключ сборки, необходим для сборки документа в docker
            htmlTemplate: null, // Какой шаблон для html использовать, необязательное поле
            fodtTemplate: 'fodt-template', // Какой fodt-шаблон использовать для сборки PDF/DOCX
            fodtParams: {
                designSet: 'dataplatform',
                system: 'VK Data Platform',
                doctitle: 'Руководство пользователя', // Название документа. Используется для формирования имения файла и выводится на титульной странице
                revnumber1: `Версия ${process.env?.CI_COMMIT_REF_NAME ?? ' 0.0.0'}` ?? 'Версия 0.0.0', // Переменная, отвечающая за версию документа. Выводится на титульной странице
                revdate1: process.env?.date1 ?? ' от 12.09.2019', // Автоподстановка даты сборки документа. По умолчанию берется текущая системная дата. Если невозможно подхватить системную, подставляется 12.09.2019
            },
            tableOfContents: toc5, // Подстановка содержания из файла user-guide-s3.toc.js
        },
    ]
};