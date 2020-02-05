// config/router.config.js
module.exports = [
    {
        path: '/',
        component: '../layouts/BasicLayout',
        routes: [
            { path: '/', redirect: '/sample' },
            {
                title: 'Sample Page',
                path: '/sample',
                name: 'samplePage',
                icon: 'group_rounded',
                hideChildrenInMenu: true,
                routes:[
                    {
                        title: 'Sample Page',
                        path: '/sample', 
                        name: 'samplePage',
                        component: './samplePage',
                    },
                ]
            },
        ],
    },
];
