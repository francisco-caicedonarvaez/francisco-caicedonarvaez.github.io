import { LocaleProvider } from '@/contexts/LocaleContext'
import { ReactNode } from 'react'

type Locale = 'en' | 'es'

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }]
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  return <LocaleProvider locale={locale}>{children}</LocaleProvider>
}
