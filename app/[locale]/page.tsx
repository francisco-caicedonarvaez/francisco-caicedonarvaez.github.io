import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Main from './Main'
import { languages } from '../messages/settings'
import { getTranslation } from '../util/util'

export async function generateStaticParams() {
  return languages.map((locale) => ({ locale }))
}

export default async function Page({ params: { locale } }) {
  const filteredBlogs = allBlogs.filter((blog) => blog.locale === locale)
  const t = await getTranslation(locale)
  const sortedPosts = sortPosts(filteredBlogs)
  const posts = allCoreContent(sortedPosts)
  return (
    <Main
      posts={posts}
      title={t('IndexPage.title')}
      linkText={t('IndexPage.read-more')}
      allText={t('IndexPage.all-posts')}
      locale={locale}
    />
  )
}
