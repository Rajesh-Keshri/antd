// ref: https://umijs.org/config/
import routes from './router.config';
import themeColor from './theme.config';

export default {
    plugins: [
        [
            'umi-plugin-react',
            {
                antd: true,
                dva: {
                    hmr: true,
                },
                targets: {
                    ie: 11,
                },
                locale: {
                    enable: true, // default false
                    default: 'en-US', // default en-US
                    baseNavigator: true, // default true, when it is true, will use `navigator` overwrite default
                },
                dynamicImport: {
                    loadingComponent: './components/PageLoading/index',
                },
            },
        ],
        [
            'umi-plugin-pro-block',
            {
                moveMock: false,
                moveService: false,
                modifyRequest: true,
                autoAddMenu: true,
            },
        ],
    ],
    targets: {
        ie: 11,
    },
    hash: true,
    /**
     * Routes
     */
    routes,

    disableRedirectHoist: true,

    /**
     * webpack config
     */
    define: {
        APP_TYPE: process.env.APP_TYPE || 'site',
    },
    // Theme for antd
    // https://ant.design/docs/react/customize-theme-cn
    theme: themeColor,
    externals: {
        '@antv/data-set': 'DataSet',
    },
    proxy: {
        '/api': {
            target: process.env.API_REST || 'http://localhost:51051/',
            changeOrigin: true,
            pathRewrite: {
                '^/api': '',
            },
        },
    },
    ignoreMomentLocale: true,
    lessLoaderOptions: {
        javascriptEnabled: true,
    },
};
