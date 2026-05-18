'use client'

import Link from 'next/link'
import Image from 'next/image'
import AustralianFlag from '../public/static/images/australia_flag_icon.png'
import ColombianFlag from '../public/static/images/colombia_flag_icon.png'
import { usePathname } from 'next/navigation'

const ShowFlag = ({ locale, href }: { locale?: 'en' | 'es'; href: string }) => {
  if (!locale) return null

  let languageFlag = AustralianFlag

  if (locale === 'es') {
    languageFlag = ColombianFlag
  }
  return (
    <Link href={href}>
      <span className="p-2.5">
        <Image src={languageFlag} alt="flag" width={20} height={10} />
      </span>
    </Link>
  )
}

export default function LanguageSwitcher({ locale }: { locale?: 'en' | 'es' }) {
  const pathname = usePathname()

  if (!locale) return null

  // Get the path without the locale prefix
  const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/'
  const otherLocale = locale === 'en' ? 'es' : 'en'
  const href = `/${otherLocale}${pathWithoutLocale}`

  return (
    <div className="flex items-center space-x-2">
      <ShowFlag locale={locale} href={href} />
      {locale === 'en' ? (
        <>
          <span className="text-sm font-medium">EN</span>
          <Link
            href={href}
            className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            ES
          </Link>
        </>
      ) : (
        <>
          <Link
            href={href}
            className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            EN
          </Link>
          <span className="text-sm font-medium">ES</span>
        </>
      )}
    </div>
  )
}
