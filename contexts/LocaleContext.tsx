'use client'

import React, { createContext, useContext, ReactNode } from 'react'

export type Locale = 'en' | 'es'

interface LocaleContextType {
  locale: Locale
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

export function LocaleProvider({ children, locale }: { children: ReactNode; locale: Locale }) {
  return <LocaleContext.Provider value={{ locale }}>{children}</LocaleContext.Provider>
}

export function useLocale(): Locale {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider')
  }
  return context.locale
}
