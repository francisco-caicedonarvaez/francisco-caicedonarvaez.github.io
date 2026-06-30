import { slug } from 'github-slugger'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { notFound } from 'next/navigation'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { allBlogs } from 'contentlayer/generated'
import tagData from '@/app/tag-data.json'
import { genPageMetadata } from '@/app/seo'
import { Metadata } from 'next'

type Locale = 'en' | 'es'
type TagData = Record<string, Record<string, number>>

const POSTS_PER_PAGE = 5

export async function generateMetadata(props: {
  params: Promise<{ locale: Locale; tag: string; page: string }>
}): Promise<Metadata> {
  const params = await props.params
  const tag = decodeURI(params.tag)
  return genPageMetadata({
    title: `${tag} - Page ${params.page}`,
    description: `${siteMetadata.title} ${tag} tagged content`,
  })
}

export const generateStaticParams = async () => {
  const allTagData = tagData as any as TagData
  const locales: Locale[] = ['en', 'es']
  const params: Array<{ locale: Locale; tag: string; page: string }> = []

  locales.forEach((locale) => {
    const tagCounts = allTagData[locale] || {}
    const tagKeys = Object.keys(tagCounts)

    tagKeys.forEach((tag) => {
      const tagPosts = allBlogs.filter(
        (post) =>
          ((post as any).locale || 'en') === locale &&
          post.tags &&
          post.tags.map((t) => slug(t)).includes(tag)
      )
      const totalPages = Math.ceil(tagPosts.length / POSTS_PER_PAGE)
      const pageNumbers = Array.from({ length: totalPages }, (_, i) => (i + 1).toString())

      pageNumbers.forEach((page) => {
        params.push({ locale, tag: encodeURI(tag), page })
      })
    })
  })

  return params
}

export default async function TagPage(props: {
  params: Promise<{ locale: Locale; tag: string; page: string }>
}) {
  const params = await props.params
  const tag = decodeURI(params.tag)
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  const filteredPosts = allCoreContent(
    sortPosts(
      allBlogs.filter(
        (post) =>
          ((post as any).locale || 'en') === params.locale &&
          post.tags &&
          post.tags.map((t) => slug(t)).includes(tag)
      )
    )
  )
  const pageNumber = parseInt(params.page as string)
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)

  if (pageNumber <= 0 || pageNumber > totalPages || isNaN(pageNumber)) {
    return notFound()
  }

  const initialDisplayPosts = filteredPosts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: totalPages,
  }

  return (
    <ListLayout
      posts={filteredPosts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title={title}
      locale={params.locale}
    />
  )
}
