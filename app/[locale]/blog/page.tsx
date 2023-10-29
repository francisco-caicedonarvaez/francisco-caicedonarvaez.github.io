import ListLayout from '@/layouts/ListLayoutWithTags'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/[locale]/seo'
import { languages } from '../../messages/settings'

const POSTS_PER_PAGE = 5

export async function generateStaticParams() {
  return languages.map((locale) => ({ locale }))
}

export const metadata = genPageMetadata({ title: 'Blog' })

export default function BlogPage({ params: { locale } }) {
  const filteredBlogs = allBlogs.filter((blog) => blog.locale === locale)
  const posts = allCoreContent(sortPosts(filteredBlogs))
  const pageNumber = 1
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
    previousText: '',
    nextText: '',
    locale: 'en',
  }

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title=""
      locale={locale}
    />
  )
}
