import { defineConfig } from '@pandacss/dev'
import { createPreset } from '@park-ui/panda-preset'

export default defineConfig({
  // Whether to use css reset
  preflight: true,
  presets: [
    '@pandacss/preset-base',
    createPreset({ accentColor: 'green', borderRadius: 'lg' }),
  ],
  // Where to look for your css declarations
  include: [
    './app/feature/**/*.{js,jsx,ts,tsx}',
    './app/routes/**/*.{js,jsx,ts,tsx}',
    './app/components/**/*.{js,jsx,ts,tsx}',
  ],
  // Files to exclude
  exclude: [],
  jsxFramework: 'react',
  // The output directory for your css system
  outdir: 'styled-system',
})
