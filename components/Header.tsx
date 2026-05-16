'use client'

import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
//import Logo from '@/data/logo.svg'
import Logo from '../public/static/images/logo.png'
import LogoName from '../public/static/images/logo_name.png'
import Image from 'next/image'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'
import LanguageSwitcher from './LanguageSwitcher'
import { usePathname } from 'next/navigation'

type Locale = 'en' | 'es'

// Map header link keys to translation keys
const linkTranslationMap: Record<string, keyof typeof siteMetadata.translations.en> = {
  Home: 'home',
  Blog: 'blog',
  About: 'about',
  Projects: 'projects',
  Tags: 'tags',
}

const Header = () => {
  let headerClass = 'flex items-center w-full bg-white dark:bg-gray-950 justify-between py-10'
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50'
  }

  const pathname = usePathname()
  // Extract locale from pathname (e.g., /en/blog -> en)
  const locale = (pathname.split('/')[1] as Locale) || 'en'
  const translations = siteMetadata.translations[locale] || siteMetadata.translations.en

  const getTranslatedTitle = (englishTitle: string) => {
    const key = linkTranslationMap[englishTitle]
    return key ? translations[key] : englishTitle
  }

  return (
    <header className={headerClass}>
      <Link href={locale ? `/${locale}` : '/'} aria-label={siteMetadata.headerTitle}>
        <div className="flex items-center justify-between">
          <div className="mr-2">
            {/* <Logo /> */}
            <Image src={Logo} alt="logo" width={80} height={80} />
          </div>
          {/* {typeof siteMetadata.headerTitle === 'string' ? (
              <div className="hidden h-6 text-2xl font-semibold sm:block">
                {siteMetadata.headerTitle}
              </div>
            ) : (
              siteMetadata.headerTitle
            )} */}
          <div className="hidden text-2xl font-semibold sm:block">
            <Image src={LogoName} alt="logo name" width={200} height={80} />
          </div>
        </div>
      </Link>
      <div className="flex items-center space-x-4 leading-5 sm:-mr-6 sm:space-x-6">
        <div className="no-scrollbar hidden max-w-40 items-center gap-x-4 overflow-x-auto sm:flex md:max-w-72 lg:max-w-96">
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => {
              const href = locale ? `/${locale}${link.href}` : link.href
              const translatedTitle = getTranslatedTitle(link.title)
              return (
                <Link
                  key={link.title}
                  href={href}
                  className="hover:text-primary-500 dark:hover:text-primary-400 m-1 font-medium text-gray-900 dark:text-gray-100"
                >
                  {translatedTitle}
                </Link>
              )
            })}
        </div>
        <SearchButton />
        <ThemeSwitch />
        {locale && <LanguageSwitcher locale={locale} />}
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
