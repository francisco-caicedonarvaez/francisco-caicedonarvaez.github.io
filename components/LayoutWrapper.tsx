import { Inter } from 'next/font/google'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import { ReactNode } from 'react'
import Header from './Header'
import { languages } from '../app/messages/settings'

interface Props {
  children: ReactNode
}

const inter = Inter({
  subsets: ['latin'],
})

export async function generateStaticParams() {
  return languages.map((locale) => ({ locale }))
}

const LayoutWrapper = ({ children }: Props, params: { locale }) => {
  return (
    <SectionContainer>
      <div className={`${inter.className} flex h-screen flex-col justify-between font-sans`}>
        <Header />
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
