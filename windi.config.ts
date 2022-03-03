import { defineConfig } from 'vite-plugin-windicss'
import typography from 'windicss/plugin/typography'

export default defineConfig({
  // attributify: true,
  darkMode: 'class',
  plugins: [typography()],
  theme: {
    fontFamily: {
      sans: ['Open Sans', 'ui-sans-serif', 'system-ui'],
      serif: ['Montserrat', 'ui-serif', 'Georgia'],
      mono: ['Fira Sans', 'ui-monospace', 'SFMono-Regular'],
    },
  },
})
