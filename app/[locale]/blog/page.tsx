import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from '@/app/seo'
import ListLayout from '@/layouts/ListLayoutWithTags'
import siteMetadata from '@/data/siteMetadata'

type Locale = 'en' | 'es'

const POSTS_PER_PAGE = 5

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }]
}

export const metadata = genPageMetadata({ title: 'Blog' })

export default async function BlogPage(props: {
  params: Promise<{ locale: Locale }>
  searchParams: Promise<{ page: string }>
}) {
  const params = await props.params
  const posts = allCoreContent(
    sortPosts(allBlogs.filter((blog) => ((blog as any).locale || 'en') === params.locale))
  )
  const pageNumber = 1
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE * pageNumber)
  const pagination = {
    currentPage: pageNumber,
    totalPages: totalPages,
  }

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title={siteMetadata.translations[params.locale].blog}
      locale={params.locale}
    />
  )
}
