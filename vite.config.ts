import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import VueI18n from '@intlify/vite-plugin-vue-i18n'
import Components from 'unplugin-vue-components/vite'
import PurgeIcons from 'vite-plugin-purge-icons'
import ViteFonts from 'vite-plugin-fonts'
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 4000,
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
    // alias: [
    //   {
    //     find: '~/',
    //     replacement: path.resolve(__dirname, './src/'),
    //   },
    // ],
  },
  plugins: [
    vue(),
    // https://github.com/jpkleemans/vite-svg-loader
    svgLoader(),
    // https://github.com/antfu/unplugin-vue-components
    Components({
      extensions: ['vue'],
      dts: 'src/components.d.ts',
      // dirs: ['src/components'],
      // deep: true,
      // include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      // exclude: [
      //   /[\\/]node_modules[\\/]/,
      //   /[\\/]\.git[\\/]/,
      //   /[\\/]\.nuxt[\\/]/,
      // ],
    }),
    // https://github.com/stafyniaksacha/vite-plugin-fonts#readme
    ViteFonts({
      google: {
        families: ['Open Sans', 'Montserrat', 'Fira Sans'],
      },
    }),

    // https://github.com/antfu/vite-plugin-windicss
    WindiCSS({
      safelist: 'prose prose-sm m-auto text-left',
    }),

    // https://github.com/antfu/purge-icons/tree/main/packages/vite-plugin-purge-icons
    PurgeIcons({
      /* PurgeIcons Options */
    }),

    // https://github.com/intlify/vite-plugin-vue-i18n
    VueI18n({
      include: [path.resolve(__dirname, './locales/**')],
    }),
  ],

  optimizeDeps: {
    include: ['vue', 'vue-router', '@vueuse/core'],
    exclude: ['vue-demi'],
  },
})
