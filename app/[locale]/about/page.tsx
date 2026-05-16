import { Authors, allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from '@/app/seo'

type Locale = 'en' | 'es'

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }]
}

export const metadata = genPageMetadata({ title: 'About' })

export default async function Page(props: { params: Promise<{ locale: Locale }> }) {
  const params = await props.params
  // Use default author for the current locale
  const author = allAuthors.find((p) => p.slug === 'default' && p.locale === params.locale)

  if (!author) {
    throw new Error(
      `Author not found for locale: ${params.locale}. Available authors: ${allAuthors.map((a) => `${a.slug}(${a.locale})`).join(', ')}`
    )
  }

  const mainContent = coreContent(author)

  return (
    <>
      <AuthorLayout content={mainContent} locale={params.locale}>
        <MDXLayoutRenderer code={author.body.code} />
      </AuthorLayout>
    </>
  )
}
