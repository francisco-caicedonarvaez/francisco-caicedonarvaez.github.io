import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'

interface PageSEOProps {
  title: string
  description?: string
  image?: string
  locale?: 'en' | 'es'
  canonicalPath?: string

  [key: string]: any
}

export function genPageMetadata({
  title,
  description,
  image,
  locale = 'en',
  canonicalPath,
  ...rest
}: PageSEOProps): Metadata {
  const ogLocale = locale === 'es' ? 'es_ES' : 'en_US'
  const baseUrl = siteMetadata.siteUrl
  const pathPrefix = canonicalPath ? `/${locale}${canonicalPath}` : `/${locale}`
  const canonicalUrl = `${baseUrl}${pathPrefix}`

  // Build alternate links for hreflang
  const alternates: any = {
    canonical: canonicalUrl,
  }

  // Add alternate hreflang links
  const langs: Array<{ locale: 'en' | 'es'; hreflang: string }> = [
    { locale: 'en', hreflang: 'en' },
    { locale: 'es', hreflang: 'es' },
  ]

  alternates.languages = langs.reduce(
    (acc, lang) => {
      const altPath = lang.locale === locale ? pathPrefix : `/${lang.locale}${canonicalPath || ''}`
      acc[lang.hreflang] = `${baseUrl}${altPath}`
      return acc
    },
    {} as Record<string, string>
  )

  return {
    title,
    description: description || siteMetadata.description,
    openGraph: {
      title: `${title} | ${siteMetadata.title}`,
      description: description || siteMetadata.description,
      url: canonicalUrl,
      siteName: siteMetadata.title,
      images: image ? [image] : [siteMetadata.socialBanner],
      locale: ogLocale,
      type: 'website',
    },
    twitter: {
      title: `${title} | ${siteMetadata.title}`,
      card: 'summary_large_image',
      images: image ? [image] : [siteMetadata.socialBanner],
    },
    alternates,
    ...rest,
  }
}
