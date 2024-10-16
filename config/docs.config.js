import { ESuggestType, ESchemaType } from "@vk-tech/d11n-helpers";
export const config = {
    main: {
        projectName: 'VK Cloud',
        copyright: '© %year% VK Cloud',
        analytics: '(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");ym(46889073,"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});',
        scriptManager: 'https://vkcs-scripts.mrgcdn.ru/master/help.js',
        locales: ['ru', 'en'],
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
            schema: ESchemaType.LIST,
        }
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
    },
    contacts: {
        useNativeSupportUrl: false,
        url: 'https://support.mcs.mail.ru/login/oauth2/authorization/vkcloud',
    },
    auth: {
        appUrl: 'https://msk.cloud.vk.com/app',
        signUpUrl: 'https://msk.cloud.vk.com/app/signup',
        signInUrl: 'https://msk.cloud.vk.com/app/signin',
        signOutUrl: 'https://msk.cloud.vk.com/app/signout',
    },
    gitOps: {
        type: ESuggestType.GITHUB,
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
        policy: '/additionals/start/legal/policy-privacy',
    },
    links: {
        telegramSupport: 'https://t.me/vk_tech_support_bot',
    },
    enablers: {
        auth: true,
        likeDislike: true,
        dislikeFeedbackForm: true,
        sentry: true,
        suggester: true,
        editOnGitOps: true,
        telegramSupport: true,
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
