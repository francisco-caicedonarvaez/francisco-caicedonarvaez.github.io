import { slug } from 'github-slugger'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
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
  params: Promise<{ locale: Locale; tag: string }>
}): Promise<Metadata> {
  const params = await props.params
  const tag = decodeURI(params.tag)
  return genPageMetadata({
    title: tag,
    description: `${siteMetadata.title} ${tag} tagged content`,
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/${params.locale}/tags/${tag}/feed.xml`,
      },
    },
  })
}

export const generateStaticParams = async () => {
  const allTagData = tagData as any as TagData
  const locales: Locale[] = ['en', 'es']
  const params: Array<{ locale: Locale; tag: string }> = []

  locales.forEach((locale) => {
    const tagCounts = allTagData[locale] || {}
    const tagKeys = Object.keys(tagCounts)
    tagKeys.forEach((tag) => {
      params.push({
        locale,
        tag: encodeURI(tag),
      })
    })
  })

  return params
}

export default async function TagPage(props: { params: Promise<{ locale: Locale; tag: string }> }) {
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
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const initialDisplayPosts = filteredPosts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
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
