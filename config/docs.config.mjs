export const config = {
    main: {
        projectName: 'VK Cloud',
        copyright: '© %year% VK Cloud',
        analytics: '(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");ym(46889073,"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});',
        scriptManager: 'https://vkcs-scripts.mrgcdn.ru/master/help.js',
        metaTags: [
            {
                name: 'yandex-verification',
                content: '6c9a89c60e5f8e06',
            },
        ],
        locales: ['ru', 'en'],
        defaultLocale: 'ru',
        logoLink: 'https://cloud.vk.com',
        canonicalBaseUrl: 'https://cloud.vk.com/docs',
    },
    breadcrumbs: {
        projectName: 'VK Cloud',
        docsName: 'Документация'
    },
    leftMenu: {
        startLevel: 3,
    },
    layout: {
        main: {
            schema: 'LIST',
        }
    },
    search: {
        type: 'SATORI',
        satori: {
            apiBaseUrl: 'https://cloud.vk.com/search/api',
            suppliers: ['vkcloud/docs'],
        },
        // assistant: {
        //     sourceName: 'VK Cloud',
        //     apiUrl: 'https://185.241.193.47:443/ask',
        // },
    },
    header: {
        relatedSites: {
            ru: [
                {
                    title: 'Публичное облако',
                    fullLink: 'https://cloud.vk.com/docs',
                    selected: true,
                    iconPartialPath: '/ru/assets/public-cloud-icon.svg',
                },
                {
                    title: 'Частные инсталляции',
                    asPath: '/on-premises',
                    iconPartialPath: '/ru/assets/private-cloud-icon.svg',
                },
            ],
            en: [
                {
                    title: 'Public Cloud',
                    fullLink: 'https://cloud.vk.com/docs',
                    selected: true,
                    iconPartialPath: '/ru/assets/public-cloud-icon.svg',
                },
                {
                    title: 'Private installations',
                    asPath: '/on-premises',
                    iconPartialPath: '/ru/assets/private-cloud-icon.svg',
                },
            ],
        },
        supportMenu: {
            ru: [
                {
                    title: 'Портал техподдержки',
                    absoluteLink: 'https://support.mcs.mail.ru/login/oauth2/authorization/vkcloud',
                    iconPartialPath: '/ru/assets/portal-support.svg',
                },
                {
                    title: 'Telegram-бот техподдержки',
                    absoluteLink: 'https://t.me/vk_tech_support_bot',
                    iconPartialPath: '/ru/assets/telegram-icon.svg',
                },
                {
                    title: 'ИИ-консультант в Telegram',
                    absoluteLink: 'https://t.me/vk_cloud_support_bot',
                    iconPartialPath: '/ru/assets/ai-bot.svg',
                },
                {
                    title: 'Сайт VK Cloud',
                    absoluteLink: 'https://cloud.vk.com/',
                    iconPartialPath: '/ru/assets/web-site.svg',
                },
            ],
            en: [
                {
                    title: 'Support email',
                    absoluteLink: 'mailto:support@mcs.mail.ru',
                    iconPartialPath: '/en/assets/email-icon.svg',
                },
                {
                    title: 'AI consultant in Telegram',
                    absoluteLink: 'https://t.me/vk_cloud_support_bot',
                    iconPartialPath: '/ru/assets/ai-bot.svg',
                },
                {
                    title: 'VK Cloud web site',
                    absoluteLink: 'https://cloud.vk.com/en/',
                    iconPartialPath: '/ru/assets/web-site.svg',
                },
            ]
        }
    },
    contacts: {
        useNativeSupportUrl: false,
        url: 'https://support.mcs.mail.ru/login/oauth2/authorization/vkcloud',
    },
    gitOps: {
        type: 'GITHUB',
        data: {
            repoUrl: 'https://github.com/vk-cs/docs-public',
            path: '',
            user: 'vk-cs',
            repo: 'docs-public',
        },
    },
    feedback: {
        // Параметры обратной связи для дизлайка
        dislike: {
            templateId: 26083, // Шаблон письма для фидбэка из mailer.mail.ru
            emails: ['public-docs@cloud.vk.com'], // Куда отправлять
        },
    },
    paths: {
        basePath: '/docs',
        policy: '/intro/start/legal',
    },
    // contentSecurityPolicy: {
    //     connectSrc: ['https://satori.devint.vkc.devmail.ru'],
    // },
    enablers: {
        auth: true,
        likeDislike: true,
        dislikeFeedbackForm: true,
        suggester: true,
        editOnGitOps: true,
        dpp: true,
        // aiSearch: true,
    },
    translations: {
        en: {
            'LeftMenu.BackLink': 'Go to main page',
        },
        ru: {
            'LeftMenu.BackLink': 'На главную',
        },
    },
};