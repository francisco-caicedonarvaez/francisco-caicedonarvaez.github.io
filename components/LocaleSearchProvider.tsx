'use client'

import { SearchProvider, SearchConfig } from 'pliny/search'
import { ReactNode, useMemo } from 'react'
import { useLocale } from '@/contexts/LocaleContext'
import siteMetadata from '@/data/siteMetadata'

export function LocaleSearchProvider({ children }: { children: ReactNode }) {
  const locale = useLocale()

  const searchConfig = useMemo(() => {
    const searchFileName = `${locale}/search.json`

    return {
      ...siteMetadata.search,
      kbarConfig: {
        ...siteMetadata.search?.kbarConfig,
        searchDocumentsPath: searchFileName,
      },
    } as SearchConfig
  }, [locale])

  return <SearchProvider searchConfig={searchConfig}>{children}</SearchProvider>
}
