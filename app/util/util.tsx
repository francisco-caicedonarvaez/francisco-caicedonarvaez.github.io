import { notFound } from 'next/navigation'
import { createTranslator } from 'next-intl'

export async function getMessages(locale: string) {
  try {
    return (await import(`../messages/${locale}.json`)).default
  } catch (error) {
    notFound()
  }
}

export async function getTranslation(locale: string) {
  const messages = await getMessages(locale)
  return createTranslator({ locale, messages })
}
