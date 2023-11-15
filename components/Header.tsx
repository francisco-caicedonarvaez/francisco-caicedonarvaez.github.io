'use client'

import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import LanguageSwitcher from './LanguageSwitcher'
import { useLocale, useTranslations } from 'next-intl'

const getLocaleLink = (url: string, locale: string) => {
  const localeUrl = `/${locale}/${url}`
  return localeUrl
}

const Header = () => {
  const locale = useLocale()
  const t = useTranslations('Menu')

  return (
    <header className="flex items-center justify-between py-10">
      <div>
        <Link href={`/${locale}`} aria-label={siteMetadata.headerTitle}>
          <div className="flex items-center justify-between">
            <div className="mr-3">
              <Logo />
            </div>
            {typeof siteMetadata.headerTitle === 'string' ? (
              <div className="hidden h-6 text-2xl font-semibold sm:block">
                {siteMetadata.headerTitle}
              </div>
            ) : (
              siteMetadata.headerTitle
            )}
          </div>
        </Link>
      </div>
      <div className="flex items-center leading-5 space-x-4 sm:space-x-6">
        {headerNavLinks
          .filter((link) => link.href !== '/')
          .map((link) => (
            <Link
              key={t(link.title)}
              href={getLocaleLink(link.href, locale)}
              className="hidden sm:block font-medium text-gray-900 dark:text-gray-100"
            >
              {t(link.title)}
            </Link>
          ))}
        <LanguageSwitcher />
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
