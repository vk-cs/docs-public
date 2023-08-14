export const config = {
    main: {
        projectName: 'VK Cloud',
        copyright: '© %year% VK Cloud',
        analytics: '(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");ym(46889073,"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});',
        scriptManager: 'https://vkcs-scripts.mrgcdn.ru/master/help.js',
    },
    breadcrumbs: {
        projectName: 'VK Cloud',
    },
    contacts: {
        useNativeSupportUrl: false,
        url: 'https://support.mcs.mail.ru/login/oauth2/authorization/vkcloud',
    },
    auth: {
        appUrl: 'https://mcs.mail.ru/app',
        signUpUrl: 'https://mcs.mail.ru/app/signup',
        signInUrl: 'https://mcs.mail.ru/app/signin',
        signOutUrl: 'https://mcs.mail.ru/app/signout',
    },
    github: {
        repoUrl: 'https://github.com/vk-cs/docs-public',
        user: 'vk-cs',
        repo: 'docs-public',
        botToken: process.env.github_vkbot_token ?? null,
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
        sentry: true,
        editOnGithub: true,
        telegramSupport: true,
    },
};
