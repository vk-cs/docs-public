export const config = {
    main: {
        projectName: 'VK Cloud',
        copyright: '© %year% VK Cloud',
        analytics: null,
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
