import { Authors, allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/[locale]/seo'
import { languages } from '../../messages/settings'
import { getTranslation } from '../../util/util'

export async function generateStaticParams() {
  return languages.map((locale) => ({ locale }))
}

export const metadata = genPageMetadata({ title: 'About' })

export default async function Page({ params: { locale } }) {
  const author = allAuthors.find(
    (p) => p.slug === (locale === 'en' ? 'default' : 'default-es')
  ) as Authors
  const mainContent = coreContent(author)
  const t = await getTranslation(locale)

  return (
    <>
      <AuthorLayout content={mainContent} title={t('AboutPage.title')}>
        <MDXLayoutRenderer code={author.body.code} />
      </AuthorLayout>
    </>
  )
}
