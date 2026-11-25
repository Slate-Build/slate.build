import type { Metadata, Viewport } from 'next'
import { Archivo, Martian_Mono } from 'next/font/google'
import { PageProgress } from '@/components/site/page-progress'
import './globals.css'

const archivo = Archivo({
  subsets: ['latin'],
  weight: 'variable',
  display: 'swap',
  variable: '--font-archivo',
})

const martian = Martian_Mono({
  subsets: ['latin'],
  weight: 'variable',
  display: 'swap',
  variable: '--font-martian',
})

const SITE_URL = 'https://slate.studio'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'SLATE BUILD — Independent Digital Design & Technology Practice',
    template: '%s — SLATE BUILD',
  },
  description:
    'SLATE BUILD is an independent digital design and technology practice building thoughtful websites, distinctive digital experiences, and technology that moves businesses forward.',
  applicationName: 'SLATE BUILD',
  keywords: [
    'slate build',
    'digital design practice',
    'web design',
    'product development',
    'creative technology',
    'design systems',
  ],
  authors: [{ name: 'SLATE BUILD' }],
  creator: 'SLATE BUILD',
  openGraph: {
    type: 'website',
    locale: 'en',
    url: SITE_URL,
    siteName: 'SLATE BUILD',
    title: 'SLATE BUILD — Independent Digital Design & Technology Practice',
    description:
      'Digital experiences, websites, software products, and technology solutions. Designed and engineered by one practice.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SLATE BUILD — Independent Digital Design & Technology Practice',
    description:
      'Digital experiences, websites, software products, and technology solutions. Designed and engineered by one practice.',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
}

export const viewport: Viewport = {
  themeColor: '#111111',
  colorScheme: 'light',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${martian.variable}`}>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "setTimeout(function(){if(!window.__slateMotion){document.documentElement.classList.add('reveal-fallback');}},2500);",
          }}
        />
        <PageProgress />
        {children}
      </body>
    </html>
  )
}
