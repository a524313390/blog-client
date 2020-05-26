
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },

    ],

  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#409EFF' },
  /*
  ** Global CSS
  */
  css: [
    'normalize.css',
    'element-ui/lib/theme-chalk/index.css',
    'element-ui/lib/theme-chalk/display.css',
    '@/assets/css/animate.css',
    'github-markdown-css',
    "highlight.js/styles/monokai-sublime.css"



  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',


    { src: "@plugins/mavon.js", ssr: false },
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy',

  ],
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    }
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    proxy: true, // 表示开启代理
    prefix: '/api', // 表示给请求url加个前缀 /api
    credentials: true, // 表示跨域请求时是否需要使用凭证
  },
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      config.devtool = '#source-map'
    }
  },
  router: {
    middleware: 'silderLeft'
  },
}
