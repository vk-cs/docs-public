export const config = {
    main: {
        projectName: 'VK Private Cloud',
        copyright: '© %year% VK Private Cloud',
        analytics: '(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");ym(46889073,"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});',
        scriptManager: 'https://vkcs-scripts.mrgcdn.ru/master/help.js',
        metaTags: [
            {
                name: 'yandex-verification',
                content: '6c9a89c60e5f8e06',
            },
        ],
        locales: ['ru'],
        defaultLocale: 'ru',
        logoLink: 'https://cloud.vk.com',
        canonicalBaseUrl: 'https://cloud.vk.com/docs',
    },
    trackers: [
        {
            enabled: true,
            id: 'yandex',
            type: 'script',
            code: '(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");ym(46889073,"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});',
        },
        {
            enabled: true,
            id: 'google',
            type: 'script',
            src: 'https://vkcs-scripts.mrgcdn.ru/master/help.js',
        },
        {
            enabled: true,
            id: 'my-tracker',
            type: 'script',
            code:
                'var _tmrId = 3118070;\n' +
                'var _tmr = window._tmr || (window._tmr = []);\n' +
                '_tmr.push({id: "3118070", type: "pageView", start: (new Date()).getTime()});\n' +
                '(function (d, w, id) {\n' +
                '  if (d.getElementById(id)) return;\n' +
                '  var ts = d.createElement("script"); ts.type = "text/javascript"; ts.async = true; ts.id = id;\n' +
                '  ts.src = "https://top-fwz1.mail.ru/js/code.js";\n' +
                '  var f = function () {var s = d.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ts, s);};\n' +
                '  if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); }\n' +
                '})(document, window, "tmr-code");',
        },
        {
            enabled: true,
            id: 'my-top-noscript',
            type: 'noscript',
            code: '<div><img src="https://top-fwz1.mail.ru/counter?id=3118070;js=na" style="position:absolute;left:-9999px;" alt="Top.Mail.Ru" /></div>',
        },
    ],
    breadcrumbs: {
        projectName: 'VK Private Cloud',
        docsName: 'Документация'
    },
    leftMenu: {
        startLevel: 3,
    },
    build: {
        defaultGroup: 'private',
        overallGroup: 'private',
        points: ['private'],
    },
    helpmate: {
        apiUrl: 'https://cloud.vk.com/helpmate/widget/api',
        consumerAlias: 'd11n_cloud_public',
    },
    plugins: {
        authProvider: '@vk-tech/d11n-auth:CloudAuthProvider',
    },

    header: {
        relatedSites: {
            ru: [
                {
                    title: 'On-Cloud',
                    fullLink: 'https://cloud.vk.com/docs',
                    selected: true,
                    iconPartialPath: '/ru/assets/public-cloud-icon.svg',
                },
                {
                    title: 'On-Premise',
                    asPath: '/on-premises',
                    iconPartialPath: '/ru/assets/private-cloud-icon.svg',
                },
            ],
            en: [
                {
                    title: 'On-Cloud',
                    fullLink: 'https://cloud.vk.com/docs',
                    selected: true,
                    iconPartialPath: '/ru/assets/public-cloud-icon.svg',
                },
                {
                    title: 'On-Premise',
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
            ]
        }
    },
    contacts: {
        useNativeSupportUrl: false,
        url: 'https://support.mcs.mail.ru/login/oauth2/authorization/vkcloud',
    },
    feedback: {
        // Параметры обратной связи для дизлайка
        dislike: {
            templateId: 26083, // Шаблон письма для фидбэка из mailer.mail.ru
            emails: ['public-docs@cloud.vk.com'], // Куда отправлять
        },
    },
    paths: {
        basePath: '/private-cloud',
    },
    contentSecurityPolicy: {
        connectSrc: [
            'https://cloud.vk.com',
            'https://mcstest.mail.ru',
            'https://satori.devint.vkc.devmail.ru',
        ],
    },
    enablers: {
        auth: false,
        likeDislike: true,
        sentry: false,
        suggester: false,
        dislikeFeedbackForm: true,
        editOnGitOps: false,
        footerPolicyLink: false,
        switchVersionViaMainPage: false,
    },
    translations: {
        en: {
            'LeftMenu.BackLink': 'Go to main page',
        },
        ru: {
            'LeftMenu.BackLink': 'На главную',
        },
        kz: {
            'LeftMenu.BackLink': 'Басты бетке',
        },
    },
};