import '@mantine/core/styles.css'
import '@/styles/theme.css'
import type { AppProps } from 'next/app'
import { MantineProvider, createTheme } from '@mantine/core'
import NoSsr from '@/components/NoSsr'
import '@/util/i18n'

/**
 * shoka theme — color tokens lifted from astro-koharu
 * (src/styles/theme/shadcn.css) and exposed as Mantine's `shoka` palette.
 * 10-step scale, #617ee8 ≈ the 6th step.
 */
const shokaTheme = createTheme({
  primaryColor: 'shoka',
  primaryShade: { light: 6, dark: 4 },
  defaultRadius: 'md',
  fontFamily:
    '"寒蝉全圆体", "ChillRound", "Noto Sans SC", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  fontFamilyMonospace:
    '"JetBrains Mono", "Fira Code", ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
  headings: {
    fontFamily:
      '"寒蝉全圆体", "ChillRound", "Noto Sans SC", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontWeight: '600',
  },
  colors: {
    shoka: [
      '#eef2ff',
      '#dce4ff',
      '#b8c8ff',
      '#91a9ff',
      '#6f8eff',
      '#5a7af0',
      '#617ee8',
      '#4f68d4',
      '#3f55b3',
      '#2f3f88',
    ],
  },
  components: {
    Card: {
      defaultProps: { radius: 'md' },
    },
    Paper: {
      defaultProps: { radius: 'md' },
    },
    Button: {
      defaultProps: { radius: 'md' },
    },
  },
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NoSsr>
      <MantineProvider defaultColorScheme="auto" theme={shokaTheme}>
        <Component {...pageProps} />
      </MantineProvider>
    </NoSsr>
  )
}
