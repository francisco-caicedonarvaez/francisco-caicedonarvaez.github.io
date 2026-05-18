import ListLayout from '@/layouts/ListLayoutWithTags'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import siteMetadata from '@/data/siteMetadata'

type Locale = 'en' | 'es'

const POSTS_PER_PAGE = 5

export const generateStaticParams = async () => {
  const paths: Array<{ locale: Locale; page: string }> = []

  // Generate paths for both locales
  const locales: Locale[] = ['en', 'es']
  for (const locale of locales) {
    const localePosts = allBlogs.filter((blog) => ((blog as any).locale || 'en') === locale)
    const totalPages = Math.ceil(localePosts.length / POSTS_PER_PAGE)
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => (i + 1).toString())

    pageNumbers.forEach((page) => {
      paths.push({ locale, page })
    })
  }

  return paths
}

export default async function Page(props: { params: Promise<{ locale: Locale; page: string }> }) {
  const params = await props.params
  const posts = allCoreContent(
    sortPosts(allBlogs.filter((blog) => ((blog as any).locale || 'en') === params.locale))
  )
  const pageNumber = parseInt(params.page as string)
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)

  // Return 404 for invalid page numbers or empty pages
  if (pageNumber <= 0 || pageNumber > totalPages || isNaN(pageNumber)) {
    return notFound()
  }

  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
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
