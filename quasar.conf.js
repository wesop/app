// Configuration for your app

module.exports = function (ctx) {
  return {
    // app plugins (/src/plugins)
    plugins: [
      'i18n',
      '../components/index',
      'vue-resource',
      'mixin',
      'vue2-touch-events',
      'vue-currency-filter',
      'vue-swal'
    ],
    css: [
      'app.styl'
    ],
    extras: [
      ctx.theme.mat ? 'roboto-font' : null,
      'material-icons',
      // 'ionicons',
      // 'mdi',
      'fontawesome'
    ],
    supportIE: false,
    vendor: {
      add: [],
      remove: []
    },
    build: {
      scopeHoisting: true,
      vueRouterMode: 'history',
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      // useNotifier: false,
      extendWebpack (cfg) {
      }
    },
    devServer: {
      // https: true,
      // port: 8081,
      proxy: {
        '/api': {
         // // target: 'http://127.0.0.1:3000/api',
          // target: 'http://10.40.51.22:3000/api',
          // target: 'http://10.40.50.44:3000/api',
        target: 'http://api.shop-sol.com/api',
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''
          }
        },

        '/rest': {
          target: 'http://10.40.101.37:8000/rest',
          changeOrigin: true,
          pathRewrite: {
            '^/rest': ''
          }
        },

        '/details': {
          target: 'https://play.google.com/store/apps/details',
          changeOrigin: true,
          pathRewrite: {
            '^/details': ''
          }
        }
      },
      open: false // opens browser window automatically
    },
    // framework: 'all' --- includes everything; for dev only!
    framework: {
      components: [
        'QLayout',
        'QLayoutDrawer',
        'QPageContainer',
        'QPage',
        'QToolbar',
        'QToolbarTitle',
        'QBtn',
        'QBtnGroup',
        'QIcon',
        'QList',
        'QListHeader',
        'QItem',
        'QItemMain',
        'QItemSeparator',
        'QItemSide',
        'QItemTile',
        'QField',
        'QInput',
        'QCheckbox',
        'QRadio',
        'QLayoutHeader',
        'QLayoutFooter',
        'QTabs',
        'QTab',
        'QTabPane',
        'QRouteTab',
        'QSelect',
        'QModal',
        'QModalLayout',
        'QDatetime',
        'QDatetimePicker',
        'QCard',
        'QCardTitle',
        'QCardMain',
        'QCardMedia',
        'QCardSeparator',
        'QCardActions',
        'QTable',
        'QTh',
        'QTr',
        'QTd',
        'QTableColumns',
        'QInnerLoading',
        'QSpinner',
        'QSpinnerMat',
        'QOptionGroup',
        'QRange',
        'QPageSticky',
        'QFab',
        'QFabAction',
        'QTooltip'
      ],
      directives: [
        'Ripple',
        'GoBack',
        'CloseOverlay',
        'Scroll'
      ],
      // Quasar plugins
      plugins: [
        'Notify'
      ],
      iconSet: 'fontawesome'
    },
    // animations: 'all' --- includes all animations
    animations: [
    ],
    pwa: {
      cacheExt: 'js,html,css,ttf,eot,otf,woff,woff2,json,svg,gif,jpg,jpeg,png,wav,ogg,webm,flac,aac,mp4,mp3',
      manifest: {
        // name: 'Quasar App',
        // short_name: 'Quasar-PWA',
        // description: 'Best PWA App in town!',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': '../resources/ios/icon/icon-50.png',
            'sizes': '50x50',
            'type': 'image/png'
          },
          {
            'src': '../resources/ios/icon/icon-60.png',
            'sizes': '60x60',
            'type': 'image/png'
          },
          {
            'src': '../resources/ios/icon/icon-72.png',
            'sizes': '72x72',
            'type': 'image/png'
          },
          {
            'src': '../resources/ios/icon/icon-83.5@2x.png',
            'sizes': '167x167',
            'type': 'image/png'
          },
          {
            'src': '../resources/ios/icon/icon-1024.png',
            'sizes': '1024x1024',
            'type': 'image/png'
          }
        ]
      }
    },
    cordova: {
      // id: 'org.cordova.quasar.app'
    },
    electron: {
      extendWebpack (cfg) {
        // do something with cfg
      },
      packager: {
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      }
    },

    // leave this here for Quasar CLI
    starterKit: '1.0.0'
  }
}
