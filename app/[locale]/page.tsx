import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Main from '../Main'

type Locale = 'en' | 'es'

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }]
}

export default async function Page(props: { params: Promise<{ locale: Locale }> }) {
  const params = await props.params
  const sortedPosts = sortPosts(allBlogs)
  // Filter posts by locale
  const localePosts = sortedPosts.filter((post) => ((post as any).locale || 'en') === params.locale)
  const posts = allCoreContent(localePosts)
  return <Main posts={posts} locale={params.locale} />
}
