'use client'

import Image from '@/components/Image'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next-intl/client'
import { ChangeEvent, useTransition } from 'react'
import { languages } from '../app/messages/settings'
import React from 'react'

const ShowFlag = () => {
  const locale = useLocale()
  let languageFlag = '/static/images/australia_flag_icon.png'

  if (locale === 'es') {
    languageFlag = '/static/images/colombia_flag_icon.png'
  } else {
    languageFlag = '/static/images/australia_flag_icon.png'
  }
  return (
    <span className="p-2.5">
      <Image src={languageFlag} alt="au" width={20} height={10} />
    </span>
  )
}

const LanguageSwitcher = () => {
  const t = useTranslations('LocaleSwitcher')
  const [isPending, startTransition] = useTransition()
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value
    startTransition(() => {
      // update blog post URL with locale
      let url =
        pathname.endsWith('-es/') && nextLocale === 'en' ? pathname.replace('-es', '') : pathname

      if (
        url.startsWith('/blog/') &&
        !url.endsWith('/blog/') &&
        !url.endsWith('-es/') &&
        nextLocale === 'es'
      ) {
        const lastIndex = url.lastIndexOf('/')
        const replacement = '-es/'
        url = url.slice(0, lastIndex) + replacement + url.slice(lastIndex + 1)
      }

      router.replace(url, { locale: nextLocale })
    })
  }

  return (
    <>
      <div className="inline-flex dark:bg-gray-950">
        <ShowFlag />
        <label>
          <select
            className="inline-flex bg-transparent pl-3 pr-7 text-sm border-0 border-b-1 border-gray-200 appearance-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-950 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            defaultValue={locale}
            disabled={isPending}
            onChange={onSelectChange}
          >
            {languages.map((cur) => (
              <option key={cur} value={cur}>
                {t('locale', { locale: cur })}
              </option>
            ))}
          </select>
        </label>
      </div>
    </>
  )
}
export default LanguageSwitcher
