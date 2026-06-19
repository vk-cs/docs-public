export const config = {
    main: {
        projectName: 'VK Object Storage',
        copyright: '© %year% VK Object Storage',
        analytics: '(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");ym(46889073,"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});',
        scriptManager: 'https://vkcs-scripts.mrgcdn.ru/master/help.js',
        canonicalBaseUrl: 'https://docs.tech.vk.com/s3',
        logoLink: 'https://cloud.vk.com/data-platform',
        metaTags: [
            {
                name: 'yandex-verification',
                content: '6c9a89c60e5f8e06',
            },
        ],
    },
    breadcrumbs: {
        projectName: null,
        docsName: 'Документация VK Object Storage',
        isDisableBaseLevel: false,
    },
    build: {
        defaultGroup: 's3',
        overallGroup: 's3',
        points: ['s3'],
    },
    leftMenu: {
        startLevel: 2,
    },
    header: {
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
                    title: 'Сайт VK Object Storage',
                    absoluteLink: 'https://cloud.vk.com/enterprisestorage/',
                    iconPartialPath: '/ru/assets/web-site.svg',
                },
            ]
        },
    },
    contacts: {
        useNativeSupportUrl: false,
        url: 'https://support.mcs.mail.ru/login/oauth2/authorization/vkcloud',
    },
    feedback: {
        // Параметры обратной связи для дизлайка
        dislike: {
            templateId: 26083, // Шаблон письма для фидбэка из mailer.mail.ru
            emails: ['private-docs@cloud.vk.com'], // Куда отправлять
        },
    },
    paths: {
        basePath: '/s3',
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
        ru: {
            'LeftMenu.BackLink': 'На главную',
        },
    },
};