import { Html, Head, Main, NextScript } from 'next/document'
import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core'

export default function Document() {
  return (
    <Html lang="zh-CN" {...mantineHtmlProps}>
      <Head>
        <ColorSchemeScript defaultColorScheme="auto" />
        {/*
         * If you drop 寒蝉全圆体 (ChillRound) into /public/fonts/, uncomment:
         *
         *   <link rel="preload" href="/fonts/ChillRound.woff2" as="font"
         *         type="font/woff2" crossOrigin="" />
         *
         * Until then the global font-family in styles/theme.css falls back to
         * the system rounded fonts.
         */}
        <meta name="theme-color" content="#617ee8" />
        <meta name="color-scheme" content="light dark" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
